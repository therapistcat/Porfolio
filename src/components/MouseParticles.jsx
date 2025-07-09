import React, { useEffect, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './MouseParticles.css'

const MouseParticles = () => {
  const { isDark } = useTheme()
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const lastParticleTime = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class
    class Particle {
      constructor(x, y, type = 'normal') {
        this.x = x
        this.y = y
        this.type = type
        this.size = type === 'burst' ? Math.random() * 4 + 2 : Math.random() * 3 + 1
        this.speedX = type === 'burst' ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 2
        this.speedY = type === 'burst' ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 2
        this.life = type === 'burst' ? 1.5 : 1
        this.decay = type === 'burst' ? Math.random() * 0.015 + 0.005 : Math.random() * 0.02 + 0.01
        this.color = this.getRandomColor()
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.1
      }

      getRandomColor() {
        const lightColors = [
          'rgba(59, 130, 246, ',   // Blue
          'rgba(139, 92, 246, ',   // Purple
          'rgba(236, 72, 153, ',   // Pink
          'rgba(16, 185, 129, ',   // Green
          'rgba(245, 158, 11, ',   // Orange
          'rgba(168, 85, 247, ',   // Violet
          'rgba(34, 197, 94, '     // Emerald
        ]

        const darkColors = [
          'rgba(96, 165, 250, ',   // Light Blue
          'rgba(167, 139, 250, ',  // Light Purple
          'rgba(244, 114, 182, ',  // Light Pink
          'rgba(52, 211, 153, ',   // Light Green
          'rgba(251, 191, 36, ',   // Light Orange
          'rgba(196, 181, 253, ',  // Light Violet
          'rgba(74, 222, 128, '    // Light Emerald
        ]

        const colors = isDark ? darkColors : lightColors
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life -= this.decay
        this.size *= 0.99
        this.rotation += this.rotationSpeed

        // Add gravity for burst particles
        if (this.type === 'burst') {
          this.speedY += 0.1
        }
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.life
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        if (this.type === 'burst') {
          // Draw star shape for burst particles
          this.drawStar()
        } else {
          // Draw circle for normal particles
          ctx.beginPath()
          ctx.arc(0, 0, this.size, 0, Math.PI * 2)
          ctx.fillStyle = this.color + this.life + ')'
          ctx.fill()
        }

        // Add glow effect
        ctx.shadowBlur = this.type === 'burst' ? 15 : 10
        ctx.shadowColor = this.color + '0.6)'
        ctx.fill()
        ctx.restore()
      }

      drawStar() {
        const spikes = 5
        const outerRadius = this.size
        const innerRadius = this.size * 0.5

        ctx.beginPath()
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius
          const angle = (i * Math.PI) / spikes
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.fillStyle = this.color + this.life + ')'
        ctx.fill()
      }

      isDead() {
        return this.life <= 0 || this.size <= 0.1
      }
    }

    // Create particles on mouse move with throttling
    const createParticles = (x, y, isHovering = false) => {
      const now = Date.now()
      const throttleDelay = isHovering ? 50 : 100 // More frequent particles when hovering

      if (now - lastParticleTime.current < throttleDelay) return
      lastParticleTime.current = now

      const particleCount = isHovering ? 3 : 1
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(
          x + (Math.random() - 0.5) * 10,
          y + (Math.random() - 0.5) * 10,
          isHovering ? 'burst' : 'normal'
        ))
      }
    }

    // Check if mouse is over interactive element
    const isOverInteractiveElement = (x, y) => {
      const element = document.elementFromPoint(x, y)
      if (!element) return false

      const interactiveSelectors = [
        'button', 'a', 'input', 'textarea', 'select',
        '[role="button"]', '.btn', '.button', '.link',
        '.nav-link', '.social-link', '.animated-btn',
        '.project-card', '.skill-card', '.tool-item'
      ]

      return interactiveSelectors.some(selector =>
        element.matches(selector) || element.closest(selector)
      )
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      const isHovering = isOverInteractiveElement(e.clientX, e.clientY)
      createParticles(e.clientX, e.clientY, isHovering)
    }

    // Touch move handler
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0]
        mouseRef.current.x = touch.clientX
        mouseRef.current.y = touch.clientY
        createParticles(touch.clientX, touch.clientY)
      }
    }

    // Click handler for burst effect
    const handleClick = (e) => {
      // Create burst particles
      for (let i = 0; i < 12; i++) {
        particlesRef.current.push(new Particle(
          e.clientX + (Math.random() - 0.5) * 15,
          e.clientY + (Math.random() - 0.5) * 15,
          'burst'
        ))
      }

      // Create additional normal particles
      for (let i = 0; i < 8; i++) {
        particlesRef.current.push(new Particle(
          e.clientX + (Math.random() - 0.5) * 25,
          e.clientY + (Math.random() - 0.5) * 25,
          'normal'
        ))
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.update()
        particle.draw()
        return !particle.isDead()
      })

      // Limit particle count for performance
      if (particlesRef.current.length > 200) {
        particlesRef.current = particlesRef.current.slice(-200)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('click', handleClick)
    
    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('click', handleClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="mouse-particles" />
}

export default MouseParticles
