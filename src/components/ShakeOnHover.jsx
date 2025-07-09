import React, { useState } from 'react'
import { useSound } from '../contexts/SoundContext'
import './ShakeOnHover.css'

const ShakeOnHover = ({ children, intensity = 'medium', className = '', ...props }) => {
  const { playHover } = useSound()
  const [isShaking, setIsShaking] = useState(false)

  const handleMouseEnter = () => {
    setIsShaking(true)
    playHover()
    
    // Stop shaking after animation completes
    setTimeout(() => {
      setIsShaking(false)
    }, 500)
  }

  return (
    <div 
      className={`shake-element ${isShaking ? `shake-${intensity}` : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </div>
  )
}

export default ShakeOnHover
