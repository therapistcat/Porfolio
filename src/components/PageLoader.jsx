import React, { useState, useEffect } from 'react'
import './PageLoader.css'

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Ensure loader disappears after maximum time
    const timeout = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setIsLoading(false), 500)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="page-loader">
      <div className="loader-content">
        <div className="loader-logo">
          <div className="logo-circle">
            <span className="logo-text">J</span>
          </div>
          <div className="logo-rings">
            <div className="ring ring-1"></div>
            <div className="ring ring-2"></div>
            <div className="ring ring-3"></div>
          </div>
        </div>
        
        <div className="loader-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="progress-text">
            {Math.round(Math.min(progress, 100))}%
          </div>
        </div>
        
        <div className="loader-text">
          <span className="loading-word">Loading</span>
          <div className="loading-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
      
      <div className="loader-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              '--delay': `${i * 0.1}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default PageLoader
