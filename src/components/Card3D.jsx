import React, { useRef, useEffect } from 'react'
import { useSound } from '../contexts/SoundContext'
import './Card3D.css'

const Card3D = ({ 
  children, 
  intensity = 15, 
  className = '', 
  glowEffect = true,
  shadowEffect = true,
  ...props 
}) => {
  const { playHover } = useSound()
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card) return

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY
      
      const rotateX = (mouseY / rect.height) * intensity
      const rotateY = -(mouseX / rect.width) * intensity
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(20px)
        scale3d(1.02, 1.02, 1.02)
      `
      
      if (glow && glowEffect) {
        const glowX = (mouseX / rect.width) * 100
        const glowY = (mouseY / rect.height) * 100
        glow.style.background = `
          radial-gradient(
            circle at ${50 + glowX}% ${50 + glowY}%, 
            rgba(59, 130, 246, 0.3) 0%, 
            rgba(139, 92, 246, 0.2) 50%, 
            transparent 100%
          )
        `
      }
    }

    const handleMouseEnter = () => {
      playHover()
      card.style.transition = 'transform 0.1s ease-out'
      if (glow && glowEffect) {
        glow.style.opacity = '1'
      }
    }

    const handleMouseLeave = () => {
      card.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg) 
        translateZ(0px)
        scale3d(1, 1, 1)
      `
      card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      
      if (glow && glowEffect) {
        glow.style.opacity = '0'
        glow.style.background = `
          radial-gradient(
            circle at 50% 50%, 
            rgba(59, 130, 246, 0.3) 0%, 
            rgba(139, 92, 246, 0.2) 50%, 
            transparent 100%
          )
        `
      }
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [intensity, playHover, glowEffect])

  return (
    <div className={`card-3d-container ${className}`} {...props}>
      <div 
        ref={cardRef}
        className={`card-3d ${shadowEffect ? 'with-shadow' : ''}`}
      >
        {glowEffect && (
          <div 
            ref={glowRef}
            className="card-3d-glow"
          />
        )}
        <div className="card-3d-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Card3D
