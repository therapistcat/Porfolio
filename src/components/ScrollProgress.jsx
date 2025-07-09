import React, { useState, useEffect } from 'react'
import './ScrollProgress.css'

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      
      setScrollProgress(scrollPercent)
      setIsVisible(scrollTop > 100) // Show after scrolling 100px
    }

    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress() // Initial call

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <>
      {/* Top Progress Bar */}
      <div className="scroll-progress-bar">
        <div 
          className="scroll-progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Circular Progress Indicator */}
      <div
        className={`scroll-progress-circle ${isVisible ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to top"
      >
        <svg className="progress-ring" width="60" height="60">
          <circle
            className="progress-ring-background"
            cx="30"
            cy="30"
            r="26"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
          />
          <circle
            className="progress-ring-progress"
            cx="30"
            cy="30"
            r="26"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 26}`}
            strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
          />
        </svg>
        <div className="progress-percentage">
          {Math.round(scrollProgress)}%
        </div>
        <div className="click-ripple"></div>
      </div>
    </>
  )
}

export default ScrollProgress
