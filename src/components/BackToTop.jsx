import React, { useState, useEffect } from 'react'
import { useSound } from '../contexts/SoundContext'
import MagneticEffect from './MagneticEffect'
import './BackToTop.css'

const BackToTop = () => {
  const { playClick, playWhoosh } = useSound()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    playClick()
    playWhoosh()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <MagneticEffect strength={0.4} className={`back-to-top ${isVisible ? 'visible' : ''}`}>
      <button
        className="back-to-top-btn"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <div className="btn-icon">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
        <div className="btn-ripple"></div>
        <div className="btn-3d-layer"></div>
      </button>
    </MagneticEffect>
  )
}

export default BackToTop
