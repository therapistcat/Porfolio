import React, { useRef, useEffect } from 'react'
import { useSound } from '../contexts/SoundContext'
import './MagneticEffect.css'

const MagneticEffect = ({ children, strength = 0.3, className = '', ...props }) => {
  const { playHover } = useSound()
  const elementRef = useRef(null)
  const isHovering = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e) => {
      if (!isHovering.current) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`
    }

    const handleMouseEnter = () => {
      isHovering.current = true
      playHover()
      element.style.transition = 'transform 0.1s ease-out'
    }

    const handleMouseLeave = () => {
      isHovering.current = false
      element.style.transform = 'translate(0px, 0px) scale(1)'
      element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength, playHover])

  return (
    <div 
      ref={elementRef}
      className={`magnetic-element ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default MagneticEffect
