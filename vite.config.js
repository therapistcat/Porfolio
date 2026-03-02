import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const GITHUB_HEADERS = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28'
}

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

const getLanguageBreakdown = (repos) => {
  const languageRepoCount = new Map()

  repos.forEach((repo) => {
    if (!repo?.language) return
    languageRepoCount.set(
      repo.language,
      (languageRepoCount.get(repo.language) || 0) + 1
    )
  })

  const total = [...languageRepoCount.values()].reduce((sum, count) => sum + count, 0)
  if (!total) return []

  const colorMap = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3776ab',
    Java: '#ed8b00',
    'C++': '#00599c',
    C: '#a8b9cc',
    HTML: '#e34f26',
    CSS: '#1572b6',
    Shell: '#89e051'
  }

  return [...languageRepoCount.entries()]
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / total) * 100),
      color: colorMap[name] || '#6b7280'
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5)
}

const fetchGitHubContributions = async (username) => {
  const response = await fetch(`https://github.com/users/${username}/contributions`)
  if (!response.ok) return 0

  const html = await response.text()
  const blockMatch = html.match(
    /id="js-contribution-activity-description"[\s\S]*?>\s*([0-9,]+)\s*contributions?\s*in the last year/i
  )

  if (blockMatch?.[1]) {
    return Number.parseInt(blockMatch[1].replaceAll(',', ''), 10) || 0
  }

  const dayMatches = [...html.matchAll(/data-count="(\d+)"/g)]
  return dayMatches.reduce((sum, match) => sum + Number.parseInt(match[1], 10), 0)
}

const fetchGitHubStats = async (username) => {
  const [userResponse, repoResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers: GITHUB_HEADERS }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: GITHUB_HEADERS
    })
  ])

  if (!userResponse.ok) {
    throw new Error(`GitHub user request failed: ${userResponse.status}`)
  }
  if (!repoResponse.ok) {
    throw new Error(`GitHub repo request failed: ${repoResponse.status}`)
  }

  const user = await userResponse.json()
  const repos = await repoResponse.json()

  const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
  const contributions = await fetchGitHubContributions(username)

  return {
    username,
    profileUrl: `https://github.com/${username}`,
    followers: user.followers || 0,
    following: user.following || 0,
    repos: user.public_repos || 0,
    stars,
    contributions,
    languages: getLanguageBreakdown(repos)
  }
}

const fetchLeetCodeStats = async (username) => {
  const query = `
    query {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: "${username}") {
        profile {
          ranking
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `

  const url = `https://leetcode.com/graphql/?query=${encodeURIComponent(query)}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`LeetCode request failed: ${response.status}`)
  }

  const payload = await response.json()
  const stats = payload?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum
  const allQuestionsCount = payload?.data?.allQuestionsCount
  const ranking = payload?.data?.matchedUser?.profile?.ranking || 0

  if (!Array.isArray(stats)) {
    throw new Error('LeetCode response format is invalid')
  }
  if (!Array.isArray(allQuestionsCount)) {
    throw new Error('LeetCode allQuestionsCount format is invalid')
  }

  const getCount = (difficulty) =>
    stats.find((entry) => entry.difficulty === difficulty)?.count || 0
  const getSubmissions = (difficulty) =>
    stats.find((entry) => entry.difficulty === difficulty)?.submissions || 0
  const getTotal = (difficulty) =>
    allQuestionsCount.find((entry) => entry.difficulty === difficulty)?.count || 0

  const totalSolved = getCount('All')
  const totalSubmissions = getSubmissions('All')
  const acceptanceRate = totalSubmissions > 0
    ? Number(((totalSolved / totalSubmissions) * 100).toFixed(1))
    : 0

  return {
    username,
    profileUrl: `https://leetcode.com/u/${username}/`,
    totalSolved,
    easySolved: getCount('Easy'),
    mediumSolved: getCount('Medium'),
    hardSolved: getCount('Hard'),
    totalQuestions: getTotal('All'),
    easyTotal: getTotal('Easy'),
    mediumTotal: getTotal('Medium'),
    hardTotal: getTotal('Hard'),
    ranking,
    acceptanceRate
  }
}

const profileStatsPlugin = () => {
  const handler = async (req, res, next) => {
    if (!req.url?.startsWith('/api/profile-stats')) {
      next()
      return
    }

    const requestUrl = new URL(req.url, 'http://localhost')
    const githubUsername = requestUrl.searchParams.get('github') || 'therapistcat'
    const leetcodeUsername = requestUrl.searchParams.get('leetcode') || 'therapistcat69'

    try {
      const [github, leetcode] = await Promise.all([
        fetchGitHubStats(githubUsername),
        fetchLeetCodeStats(leetcodeUsername)
      ])

      sendJson(res, 200, {
        github,
        leetcode,
        fetchedAt: new Date().toISOString()
      })
    } catch (error) {
      sendJson(res, 500, {
        message: 'Failed to fetch profile stats',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  }

  return {
    name: 'profile-stats-api',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), profileStatsPlugin()]
})
