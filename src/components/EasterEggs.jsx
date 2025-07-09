import React, { useEffect, useRef, useState } from 'react'
import { useSound } from '../contexts/SoundContext'
import { useAchievements } from '../contexts/AchievementContext'
import './EasterEggs.css'

const EasterEggs = () => {
  const { playSuccess, playNotification, playWhoosh } = useSound()
  const { trackEasterEgg, trackKonamiCode } = useAchievements()
  const [showMessage, setShowMessage] = useState('')
  const [isMatrixMode, setIsMatrixMode] = useState(false)
  const [isGravityMode, setIsGravityMode] = useState(false)
  const keysRef = useRef([])
  const messageTimeoutRef = useRef(null)

  // Konami Code: ↑↑↓↓←→←→BA
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ]

  // Secret word triggers
  const secretWords = {
    'matrix': () => activateMatrixMode(),
    'gravity': () => activateGravityMode(),
    'dance': () => activateDanceMode(),
    'rainbow': () => activateRainbowMode(),
    'developer': () => showDeveloperMessage(),
    'awesome': () => showCompliment(),
    'hello': () => showGreeting(),
    'magic': () => activateMagicMode()
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Add key to sequence
      keysRef.current.push(e.code)
      
      // Keep only last 10 keys
      if (keysRef.current.length > 10) {
        keysRef.current = keysRef.current.slice(-10)
      }

      // Check for Konami code
      if (keysRef.current.length >= konamiCode.length) {
        const lastKeys = keysRef.current.slice(-konamiCode.length)
        if (JSON.stringify(lastKeys) === JSON.stringify(konamiCode)) {
          activateKonamiCode()
          keysRef.current = []
        }
      }

      // Check for secret words (only letters)
      if (e.key.match(/[a-zA-Z]/)) {
        const currentWord = keysRef.current
          .filter(key => key.startsWith('Key'))
          .map(key => key.replace('Key', '').toLowerCase())
          .join('')
          .slice(-10) // Keep last 10 letters

        Object.keys(secretWords).forEach(word => {
          if (currentWord.includes(word)) {
            secretWords[word]()
            keysRef.current = []
          }
        })
      }
    }

    // Double click easter egg
    let clickCount = 0
    const handleDoubleClick = (e) => {
      clickCount++
      if (clickCount === 5) {
        activateClickFrenzy()
        clickCount = 0
      }
      setTimeout(() => { clickCount = 0 }, 2000)
    }

    // Shake detection for mobile
    let lastX, lastY, lastZ
    const handleDeviceMotion = (e) => {
      const acceleration = e.accelerationIncludingGravity
      const x = acceleration.x
      const y = acceleration.y
      const z = acceleration.z

      if (lastX !== undefined) {
        const deltaX = Math.abs(x - lastX)
        const deltaY = Math.abs(y - lastY)
        const deltaZ = Math.abs(z - lastZ)

        if (deltaX + deltaY + deltaZ > 30) {
          activateShakeMode()
        }
      }

      lastX = x
      lastY = y
      lastZ = z
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('dblclick', handleDoubleClick)
    window.addEventListener('devicemotion', handleDeviceMotion)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('dblclick', handleDoubleClick)
      window.removeEventListener('devicemotion', handleDeviceMotion)
    }
  }, [])

  const showEasterEggMessage = (message, duration = 3000) => {
    setShowMessage(message)
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current)
    }
    messageTimeoutRef.current = setTimeout(() => {
      setShowMessage('')
    }, duration)
  }

  const activateKonamiCode = () => {
    playSuccess()
    trackKonamiCode()
    showEasterEggMessage('🎉 KONAMI CODE ACTIVATED! You found the secret! 🎉', 5000)

    // Add special effects
    document.body.classList.add('konami-mode')
    setTimeout(() => {
      document.body.classList.remove('konami-mode')
    }, 5000)
  }

  const activateMatrixMode = () => {
    playWhoosh()
    trackEasterEgg()
    setIsMatrixMode(true)
    showEasterEggMessage('🔴 ENTERING THE MATRIX... 🔴', 3000)

    setTimeout(() => {
      setIsMatrixMode(false)
    }, 10000)
  }

  const activateGravityMode = () => {
    playNotification()
    setIsGravityMode(true)
    showEasterEggMessage('🌍 GRAVITY ACTIVATED! 🌍', 3000)
    
    document.body.classList.add('gravity-mode')
    setTimeout(() => {
      setIsGravityMode(false)
      document.body.classList.remove('gravity-mode')
    }, 8000)
  }

  const activateDanceMode = () => {
    playSuccess()
    showEasterEggMessage('💃 DANCE PARTY! 💃', 3000)
    
    document.body.classList.add('dance-mode')
    setTimeout(() => {
      document.body.classList.remove('dance-mode')
    }, 5000)
  }

  const activateRainbowMode = () => {
    playNotification()
    showEasterEggMessage('🌈 RAINBOW MODE! 🌈', 3000)
    
    document.body.classList.add('rainbow-mode')
    setTimeout(() => {
      document.body.classList.remove('rainbow-mode')
    }, 6000)
  }

  const activateMagicMode = () => {
    playWhoosh()
    showEasterEggMessage('✨ MAGIC ACTIVATED! ✨', 3000)
    
    // Create floating sparkles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        createSparkle()
      }, i * 100)
    }
  }

  const activateClickFrenzy = () => {
    playSuccess()
    showEasterEggMessage('🖱️ CLICK FRENZY! You clicked 5 times! 🖱️', 3000)
    
    document.body.classList.add('click-frenzy')
    setTimeout(() => {
      document.body.classList.remove('click-frenzy')
    }, 3000)
  }

  const activateShakeMode = () => {
    playNotification()
    showEasterEggMessage('📱 SHAKE DETECTED! 📱', 2000)
    
    document.body.classList.add('shake-mode')
    setTimeout(() => {
      document.body.classList.remove('shake-mode')
    }, 2000)
  }

  const showDeveloperMessage = () => {
    playNotification()
    showEasterEggMessage('👨‍💻 Hello fellow developer! Nice to meet you! 👨‍💻', 4000)
  }

  const showCompliment = () => {
    playSuccess()
    showEasterEggMessage('😊 You are awesome too! Thanks for exploring! 😊', 3000)
  }

  const showGreeting = () => {
    playNotification()
    showEasterEggMessage('👋 Hello there! Welcome to my portfolio! 👋', 3000)
  }

  const createSparkle = () => {
    const sparkle = document.createElement('div')
    sparkle.className = 'magic-sparkle'
    sparkle.style.left = Math.random() * window.innerWidth + 'px'
    sparkle.style.top = Math.random() * window.innerHeight + 'px'
    sparkle.innerHTML = '✨'
    
    document.body.appendChild(sparkle)
    
    setTimeout(() => {
      if (document.body.contains(sparkle)) {
        document.body.removeChild(sparkle)
      }
    }, 2000)
  }

  return (
    <>
      {/* Easter Egg Message Display */}
      {showMessage && (
        <div className="easter-egg-message">
          {showMessage}
        </div>
      )}

      {/* Matrix Rain Effect */}
      {isMatrixMode && (
        <div className="matrix-rain">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="matrix-column" style={{ left: `${i * 2}%` }}>
              {Array.from({ length: 20 }, (_, j) => (
                <span key={j} className="matrix-char">
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default EasterEggs
