import React, { useEffect, useMemo, useState } from 'react'
import { useSound } from '../contexts/SoundContext'
import './GitHubStats.css'

const DEFAULT_LEETCODE_TOTALS = {
  easyTotal: 929,
  mediumTotal: 2018,
  hardTotal: 912,
  totalQuestions: 3859
}

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

const normalizeLeetCodeUnofficial = (payload, fallbackTotals) => {
  const easyTotal = firstNumber(payload, ['totalEasy', 'easyTotal'], fallbackTotals.easyTotal)
  const mediumTotal = firstNumber(payload, ['totalMedium', 'mediumTotal'], fallbackTotals.mediumTotal)
  const hardTotal = firstNumber(payload, ['totalHard', 'hardTotal'], fallbackTotals.hardTotal)

  const derivedAll = easyTotal + mediumTotal + hardTotal
  const totalQuestions = firstNumber(
    payload,
    ['totalQuestions', 'allQuestions', 'allQuestionsCount'],
    derivedAll || fallbackTotals.totalQuestions
  )

  return {
    totalSolved: firstNumber(payload, ['totalSolved', 'solvedQuestion'], 0),
    easySolved: firstNumber(payload, ['easySolved'], 0),
    mediumSolved: firstNumber(payload, ['mediumSolved'], 0),
    hardSolved: firstNumber(payload, ['hardSolved'], 0),
    easyTotal,
    mediumTotal,
    hardTotal,
    totalQuestions,
    ranking: firstNumber(payload, ['ranking'], 0),
    acceptanceRate: firstNumber(payload, ['acceptanceRate'], 0)
  }
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
      let unofficialLeetCode = null

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

      try {
        const unofficialResponse = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${encodeURIComponent(leetcodeUsername)}`
        )

        if (unofficialResponse.ok) {
          const payload = await unofficialResponse.json()
          if (payload && payload.status !== 'error') {
            const fallbackTotals = apiData?.leetcode || DEFAULT_LEETCODE_TOTALS
            unofficialLeetCode = normalizeLeetCodeUnofficial(payload, fallbackTotals)
          }
        }
      } catch (unofficialError) {
        console.error('Unofficial LeetCode API request failed:', unofficialError)
      }

      if (!apiData && !unofficialLeetCode) {
        setError('Unable to load live stats right now. Please try again in a moment.')
        setIsLoading(false)
        return
      }

      const nextStats = {
        github: {
          username,
          profileUrl: `https://github.com/${username}`,
          contributions: apiData?.github?.contributions || 0,
          repos: apiData?.github?.repos || 0,
          followers: apiData?.github?.followers || 0,
          stars: apiData?.github?.stars || 0
        },
        leetcode: {
          username: leetcodeUsername,
          profileUrl: `https://leetcode.com/u/${leetcodeUsername}/`,
          totalSolved: apiData?.leetcode?.totalSolved || 0,
          easySolved: apiData?.leetcode?.easySolved || 0,
          mediumSolved: apiData?.leetcode?.mediumSolved || 0,
          hardSolved: apiData?.leetcode?.hardSolved || 0,
          easyTotal: apiData?.leetcode?.easyTotal || DEFAULT_LEETCODE_TOTALS.easyTotal,
          mediumTotal: apiData?.leetcode?.mediumTotal || DEFAULT_LEETCODE_TOTALS.mediumTotal,
          hardTotal: apiData?.leetcode?.hardTotal || DEFAULT_LEETCODE_TOTALS.hardTotal,
          totalQuestions: apiData?.leetcode?.totalQuestions || DEFAULT_LEETCODE_TOTALS.totalQuestions,
          ranking: apiData?.leetcode?.ranking || 0,
          acceptanceRate: apiData?.leetcode?.acceptanceRate || 0
        },
        fetchedAt: apiData?.fetchedAt || new Date().toISOString()
      }

      if (unofficialLeetCode) {
        nextStats.leetcode = {
          ...nextStats.leetcode,
          ...unofficialLeetCode
        }
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
