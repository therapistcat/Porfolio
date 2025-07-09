import React from 'react'
import { useSound } from '../contexts/SoundContext'
import './SoundToggle.css'

const SoundToggle = () => {
  const { isEnabled, toggleSound, playClick } = useSound()

  const handleToggle = () => {
    playClick()
    toggleSound()
  }

  return (
    <button 
      className={`sound-toggle ${isEnabled ? 'enabled' : 'disabled'}`}
      onClick={handleToggle}
      aria-label={`Sound ${isEnabled ? 'enabled' : 'disabled'}`}
      title={`Click to ${isEnabled ? 'disable' : 'enable'} sound effects`}
    >
      <div className="sound-icon">
        {isEnabled ? (
          // Sound on icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M11 5L6 9H2v6h4l5 4V5z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="currentColor"
            />
            <path 
              d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          // Sound off icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M11 5L6 9H2v6h4l5 4V5z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="currentColor"
            />
            <line 
              x1="23" 
              y1="9" 
              x2="17" 
              y2="15" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            <line 
              x1="17" 
              y1="9" 
              x2="23" 
              y2="15" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      
      {/* Sound waves animation */}
      <div className={`sound-waves ${isEnabled ? 'active' : ''}`}>
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
    </button>
  )
}

export default SoundToggle
