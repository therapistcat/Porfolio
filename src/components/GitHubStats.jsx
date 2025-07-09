import React, { useState, useEffect } from 'react'
import { useSound } from '../contexts/SoundContext'
import './GitHubStats.css'

const GitHubStats = ({ username = 'therapistcat' }) => {
  const { playNotification } = useSound()
  const [stats, setStats] = useState({
    repos: 0,
    followers: 0,
    following: 0,
    stars: 0,
    commits: 0,
    languages: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate fetching GitHub stats (replace with real API calls)
    const fetchGitHubStats = async () => {
      try {
        setIsLoading(true)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mock data (replace with real GitHub API calls)
        const mockStats = {
          repos: 42,
          followers: 156,
          following: 89,
          stars: 234,
          commits: 1247,
          languages: [
            { name: 'JavaScript', percentage: 45, color: '#f7df1e' },
            { name: 'Python', percentage: 25, color: '#3776ab' },
            { name: 'React', percentage: 20, color: '#61dafb' },
            { name: 'CSS', percentage: 10, color: '#1572b6' }
          ]
        }
        
        setStats(mockStats)
        setIsLoading(false)
        setIsVisible(true)
        playNotification()
      } catch (error) {
        console.error('Error fetching GitHub stats:', error)
        setIsLoading(false)
      }
    }

    fetchGitHubStats()
  }, [username, playNotification])

  const StatCard = ({ icon, label, value, delay = 0 }) => (
    <div 
      className="stat-card"
      style={{ '--delay': `${delay}s` }}
    >
      <div className="stat-icon">
        {icon}
      </div>
      <div className="stat-content">
        <div className="stat-value">
          <AnimatedNumber value={value} />
        </div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  )

  const AnimatedNumber = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
      if (!isVisible) return

      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }, [value, isVisible])

    return <span>{displayValue.toLocaleString()}</span>
  }

  const LanguageBar = ({ language, delay = 0 }) => (
    <div 
      className="language-bar"
      style={{ '--delay': `${delay}s` }}
    >
      <div className="language-info">
        <span className="language-name">{language.name}</span>
        <span className="language-percentage">{language.percentage}%</span>
      </div>
      <div className="language-progress">
        <div 
          className="language-fill"
          style={{ 
            '--percentage': `${language.percentage}%`,
            '--color': language.color
          }}
        />
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="github-stats loading">
        <div className="stats-header">
          <h3>📊 Loading GitHub Stats...</h3>
        </div>
        <div className="loading-animation">
          <div className="loading-bar"></div>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`github-stats ${isVisible ? 'visible' : ''}`}>
      <div className="stats-header">
        <div className="stats-title">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <h3>GitHub Activity</h3>
        </div>
        <div className="stats-subtitle">Live coding statistics</div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={<span>📁</span>}
          label="Repositories"
          value={stats.repos}
          delay={0.1}
        />
        <StatCard
          icon={<span>👥</span>}
          label="Followers"
          value={stats.followers}
          delay={0.2}
        />
        <StatCard
          icon={<span>⭐</span>}
          label="Stars"
          value={stats.stars}
          delay={0.3}
        />
        <StatCard
          icon={<span>💻</span>}
          label="Commits"
          value={stats.commits}
          delay={0.4}
        />
      </div>

      <div className="languages-section">
        <h4>Most Used Languages</h4>
        <div className="languages-list">
          {stats.languages.map((language, index) => (
            <LanguageBar
              key={language.name}
              language={language}
              delay={0.5 + index * 0.1}
            />
          ))}
        </div>
      </div>

      <div className="stats-footer">
        <div className="last-updated">
          <span>🔄 Updated just now</span>
        </div>
        <a 
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  )
}

export default GitHubStats
