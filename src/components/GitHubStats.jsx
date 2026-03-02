import React, { useEffect, useMemo, useState } from 'react'
import { useSound } from '../contexts/SoundContext'
import './GitHubStats.css'

const DEFAULT_LEETCODE_TOTALS = {
  easyTotal: 929,
  mediumTotal: 2018,
  hardTotal: 912,
  totalQuestions: 3859
}

const LEETCODE_PUBLIC_API_BASE_URLS = [
  'https://leetcode-api-faisalshohag.vercel.app/',
  'https://leetcode-stats-api.vercel.app/'
]

const numberOrZero = (value) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

const firstNumber = (source, keys, fallback = 0) => {
  for (const key of keys) {
    if (source?.[key] !== undefined && source?.[key] !== null) {
      return numberOrZero(source[key])
    }
  }
  return fallback
}

const findDifficultyMetric = (items, difficulty, key) => {
  if (!Array.isArray(items)) return 0
  const matched = items.find((entry) => entry?.difficulty === difficulty)
  return numberOrZero(matched?.[key])
}

const normalizeLeetCodePayload = (payload, fallbackTotals) => {
  const totalSubmissions = payload?.totalSubmissions || payload?.matchedUserStats?.totalSubmissionNum
  const acceptedSubmissions = payload?.matchedUserStats?.acSubmissionNum

  const easyTotal = firstNumber(payload, ['totalEasy', 'easyTotal'], fallbackTotals.easyTotal)
  const mediumTotal = firstNumber(payload, ['totalMedium', 'mediumTotal'], fallbackTotals.mediumTotal)
  const hardTotal = firstNumber(payload, ['totalHard', 'hardTotal'], fallbackTotals.hardTotal)

  const derivedAll = easyTotal + mediumTotal + hardTotal
  const totalQuestions = firstNumber(
    payload,
    ['totalQuestions', 'allQuestions', 'allQuestionsCount'],
    derivedAll || fallbackTotals.totalQuestions
  )

  const fallbackTotalSolved = findDifficultyMetric(acceptedSubmissions, 'All', 'count')
  const totalSolved = firstNumber(payload, ['totalSolved', 'solvedQuestion', 'solvedProblem'], fallbackTotalSolved)

  const solvedSubmissions = findDifficultyMetric(totalSubmissions, 'All', 'count')
  const allSubmissions = findDifficultyMetric(totalSubmissions, 'All', 'submissions')
  const derivedAcceptanceRate = allSubmissions > 0
    ? Number(((solvedSubmissions / allSubmissions) * 100).toFixed(1))
    : 0

  return {
    totalSolved,
    easySolved: firstNumber(payload, ['easySolved'], 0),
    mediumSolved: firstNumber(payload, ['mediumSolved'], 0),
    hardSolved: firstNumber(payload, ['hardSolved'], 0),
    easyTotal,
    mediumTotal,
    hardTotal,
    totalQuestions,
    ranking: firstNumber(payload, ['ranking'], 0),
    acceptanceRate: firstNumber(payload, ['acceptanceRate'], derivedAcceptanceRate)
  }
}

const fetchGitHubPublicStats = async (username) => {
  const [userResponse, reposResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`),
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`)
  ])

  if (!userResponse.ok || !reposResponse.ok) {
    throw new Error(
      `GitHub public API failed: ${userResponse.status}/${reposResponse.status}`
    )
  }

  const [userPayload, reposPayload] = await Promise.all([userResponse.json(), reposResponse.json()])
  const stars = Array.isArray(reposPayload)
    ? reposPayload.reduce((sum, repo) => sum + numberOrZero(repo?.stargazers_count), 0)
    : 0

  return {
    username,
    profileUrl: `https://github.com/${username}`,
    contributions: 0,
    repos: numberOrZero(userPayload?.public_repos),
    followers: numberOrZero(userPayload?.followers),
    stars
  }
}

const fetchLeetCodePublicStats = async (username, fallbackTotals) => {
  for (const baseUrl of LEETCODE_PUBLIC_API_BASE_URLS) {
    const url = `${baseUrl}${encodeURIComponent(username)}`

    try {
      const response = await fetch(url)
      if (!response.ok) continue

      const payload = await response.json()
      if (!payload || payload.status === 'error') continue

      return normalizeLeetCodePayload(payload, fallbackTotals)
    } catch {
      // Try the next backup endpoint.
    }
  }

  return null
}

const GitHubStats = ({
  username = 'therapistcat',
  leetcodeUsername = 'therapistcat69'
}) => {
  const { playNotification } = useSound()
  const [stats, setStats] = useState({
    github: {
      username,
      profileUrl: `https://github.com/${username}`,
      contributions: 0,
      repos: 0,
      followers: 0,
      stars: 0
    },
    leetcode: {
      username: leetcodeUsername,
      profileUrl: `https://leetcode.com/u/${leetcodeUsername}/`,
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ...DEFAULT_LEETCODE_TOTALS,
      ranking: 0,
      acceptanceRate: 0
    },
    fetchedAt: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError('')

      let apiData = null
      let githubFallback = null
      let leetCodeFallback = null

      try {
        const apiResponse = await fetch(
          `/api/profile-stats?github=${encodeURIComponent(username)}&leetcode=${encodeURIComponent(leetcodeUsername)}`
        )

        if (apiResponse.ok) {
          apiData = await apiResponse.json()
        }
      } catch (apiError) {
        console.error('Portfolio API request failed:', apiError)
      }

      if (!apiData?.github) {
        try {
          githubFallback = await fetchGitHubPublicStats(username)
        } catch (githubError) {
          console.error('GitHub fallback API request failed:', githubError)
        }
      }

      if (!apiData?.leetcode) {
        const fallbackTotals = apiData?.leetcode || DEFAULT_LEETCODE_TOTALS
        leetCodeFallback = await fetchLeetCodePublicStats(leetcodeUsername, fallbackTotals)
      }

      if (!apiData && !githubFallback && !leetCodeFallback) {
        setError('Unable to load live stats right now. Please try again in a moment.')
        setIsLoading(false)
        return
      }

      const nextStats = {
        github: {
          username,
          profileUrl: `https://github.com/${username}`,
          contributions: apiData?.github?.contributions || githubFallback?.contributions || 0,
          repos: apiData?.github?.repos || githubFallback?.repos || 0,
          followers: apiData?.github?.followers || githubFallback?.followers || 0,
          stars: apiData?.github?.stars || githubFallback?.stars || 0
        },
        leetcode: {
          username: leetcodeUsername,
          profileUrl: `https://leetcode.com/u/${leetcodeUsername}/`,
          totalSolved: apiData?.leetcode?.totalSolved || leetCodeFallback?.totalSolved || 0,
          easySolved: apiData?.leetcode?.easySolved || leetCodeFallback?.easySolved || 0,
          mediumSolved: apiData?.leetcode?.mediumSolved || leetCodeFallback?.mediumSolved || 0,
          hardSolved: apiData?.leetcode?.hardSolved || leetCodeFallback?.hardSolved || 0,
          easyTotal: apiData?.leetcode?.easyTotal || leetCodeFallback?.easyTotal || DEFAULT_LEETCODE_TOTALS.easyTotal,
          mediumTotal: apiData?.leetcode?.mediumTotal || leetCodeFallback?.mediumTotal || DEFAULT_LEETCODE_TOTALS.mediumTotal,
          hardTotal: apiData?.leetcode?.hardTotal || leetCodeFallback?.hardTotal || DEFAULT_LEETCODE_TOTALS.hardTotal,
          totalQuestions: apiData?.leetcode?.totalQuestions || leetCodeFallback?.totalQuestions || DEFAULT_LEETCODE_TOTALS.totalQuestions,
          ranking: apiData?.leetcode?.ranking || leetCodeFallback?.ranking || 0,
          acceptanceRate: apiData?.leetcode?.acceptanceRate || leetCodeFallback?.acceptanceRate || 0
        },
        fetchedAt: apiData?.fetchedAt || new Date().toISOString()
      }

      setStats(nextStats)
      setIsVisible(true)
      playNotification()
      setIsLoading(false)
    }

    fetchData()
  }, [username, leetcodeUsername, playNotification])

  const ringMetrics = useMemo(() => {
    const ringRadius = 108
    const circumference = 2 * Math.PI * ringRadius
    const easySolved = Math.max(0, numberOrZero(stats.leetcode.easySolved))
    const mediumSolved = Math.max(0, numberOrZero(stats.leetcode.mediumSolved))
    const hardSolved = Math.max(0, numberOrZero(stats.leetcode.hardSolved))
    const solvedTotal = Math.max(0, easySolved + mediumSolved + hardSolved)

    if (solvedTotal <= 0) {
      return {
        ringRadius,
        circumference,
        easyArcLength: 0,
        mediumArcLength: 0,
        hardArcLength: 0,
        easyOffset: 0,
        mediumOffset: 0,
        hardOffset: 0
      }
    }

    const segmentGap = 10
    const totalGap = segmentGap * 3
    const drawableLength = Math.max(0, circumference - totalGap)

    const easyArcLength = (easySolved / solvedTotal) * drawableLength
    const mediumArcLength = (mediumSolved / solvedTotal) * drawableLength
    const hardArcLength = (hardSolved / solvedTotal) * drawableLength

    return {
      ringRadius,
      circumference,
      easyArcLength,
      mediumArcLength,
      hardArcLength,
      easyOffset: 0,
      mediumOffset: -(easyArcLength + segmentGap),
      hardOffset: -(easyArcLength + segmentGap + mediumArcLength + segmentGap)
    }
  }, [stats.leetcode])

  if (isLoading) {
    return (
      <div className="github-stats loading">
        <div className="stats-header">
          <h3>Loading coding charts...</h3>
        </div>
      </div>
    )
  }

  return (
    <div className={`github-stats ${isVisible ? 'visible' : ''}`}>
      <div className="stats-header">
        <div className="stats-title">
          <h3>Coding Profiles</h3>
        </div>
        <div className="stats-subtitle">Live GitHub contribution chart and LeetCode solved stats</div>
        {error ? <div className="stats-error">{error}</div> : null}
      </div>

      <div className="charts-grid">
        <article className="chart-panel github-panel">
          <div className="panel-header">
            <h4>{stats.github.contributions.toLocaleString()} contributions in the last year</h4>
            <a href={stats.github.profileUrl} target="_blank" rel="noopener noreferrer">@{stats.github.username}</a>
          </div>

          <div className="heatmap-wrap">
            <img
              src={`https://ghchart.rshah.org/${stats.github.username}`}
              alt={`${stats.github.username} GitHub contribution chart`}
              className="heatmap-image"
              loading="lazy"
            />
          </div>

          <div className="github-meta">
            <div className="meta-card">
              <span>Repos</span>
              <strong>{stats.github.repos}</strong>
            </div>
            <div className="meta-card">
              <span>Followers</span>
              <strong>{stats.github.followers}</strong>
            </div>
            <div className="meta-card">
              <span>Stars</span>
              <strong>{stats.github.stars}</strong>
            </div>
          </div>
        </article>

        <article className="chart-panel leetcode-panel">
          <div className="panel-header">
            <h4>LeetCode Progress</h4>
            <a href={stats.leetcode.profileUrl} target="_blank" rel="noopener noreferrer">@{stats.leetcode.username}</a>
          </div>

          <div className="leetcode-layout">
            <div className="leetcode-ring">
              <svg className="leetcode-ring-svg" viewBox="0 0 240 240" aria-hidden="true">
                <circle className="ring-track" cx="120" cy="120" r={ringMetrics.ringRadius} />
                <circle
                  className="ring-arc ring-arc-medium"
                  cx="120"
                  cy="120"
                  r={ringMetrics.ringRadius}
                  style={{
                    strokeDasharray: `${ringMetrics.mediumArcLength} ${ringMetrics.circumference}`,
                    strokeDashoffset: ringMetrics.mediumOffset
                  }}
                />
                <circle
                  className="ring-arc ring-arc-easy"
                  cx="120"
                  cy="120"
                  r={ringMetrics.ringRadius}
                  style={{
                    strokeDasharray: `${ringMetrics.easyArcLength} ${ringMetrics.circumference}`,
                    strokeDashoffset: ringMetrics.easyOffset
                  }}
                />
                <circle
                  className="ring-arc ring-arc-hard"
                  cx="120"
                  cy="120"
                  r={ringMetrics.ringRadius}
                  style={{
                    strokeDasharray: `${ringMetrics.hardArcLength} ${ringMetrics.circumference}`,
                    strokeDashoffset: ringMetrics.hardOffset
                  }}
                />
              </svg>
              <div className="leetcode-ring-inner">
                <div className="leetcode-total">
                  {stats.leetcode.totalSolved}
                  <span>/{stats.leetcode.totalQuestions}</span>
                </div>
                <div className="leetcode-solved-label">Solved</div>
                <div className="leetcode-extra">
                  Rank: {stats.leetcode.ranking ? stats.leetcode.ranking.toLocaleString() : '-'}
                </div>
              </div>
            </div>

            <div className="difficulty-stack">
              <div className="difficulty-card easy">
                <span>Easy</span>
                <strong>{stats.leetcode.easySolved}/{stats.leetcode.easyTotal}</strong>
              </div>
              <div className="difficulty-card medium">
                <span>Med.</span>
                <strong>{stats.leetcode.mediumSolved}/{stats.leetcode.mediumTotal}</strong>
              </div>
              <div className="difficulty-card hard">
                <span>Hard</span>
                <strong>{stats.leetcode.hardSolved}/{stats.leetcode.hardTotal}</strong>
              </div>
            </div>
          </div>

          <div className="leetcode-footer">
            <span>Acceptance Rate: {stats.leetcode.acceptanceRate ? `${stats.leetcode.acceptanceRate}%` : '-'}</span>
            <span>Updated: {new Date(stats.fetchedAt).toLocaleString()}</span>
          </div>
        </article>
      </div>
    </div>
  )
}

export default GitHubStats
