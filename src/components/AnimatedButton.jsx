import React from 'react'
import { useSound } from '../contexts/SoundContext'
import './AnimatedButton.css'

const AnimatedButton = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  href,
  target,
  rel,
  className = '',
  disabled = false,
  ...props
}) => {
  const { playHover, playClick } = useSound()
  const baseClasses = `animated-btn animated-btn--${variant} animated-btn--${size} ${className}`

  const handleMouseEnter = () => {
    if (!disabled) playHover()
  }

  const handleClick = (e) => {
    if (!disabled) {
      playClick()
      if (onClick) onClick(e)
    }
  }
  
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        {...props}
      >
        <span className="btn-content">
          {children}
        </span>
        <div className="btn-ripple"></div>
        <div className="btn-glow"></div>
      </a>
    )
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={baseClasses}
      disabled={disabled}
      {...props}
    >
      <span className="btn-content">
        {children}
      </span>
      <div className="btn-ripple"></div>
      <div className="btn-glow"></div>
    </button>
  )
}

export default AnimatedButton
