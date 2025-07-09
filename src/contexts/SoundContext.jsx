import React, { createContext, useContext, useState, useRef, useEffect } from 'react'

const SoundContext = createContext()

export const useSound = () => {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}

export const SoundProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled')
    return saved !== null ? saved === 'true' : true
  })
  
  const audioContextRef = useRef(null)
  const gainNodeRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('soundEnabled', isEnabled.toString())
  }, [isEnabled])

  // Initialize Web Audio API
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.connect(audioContextRef.current.destination)
      gainNodeRef.current.gain.value = 0.3 // Set volume to 30%
    }
  }

  // Create different types of sounds using Web Audio API
  const createTone = (frequency, duration, type = 'sine') => {
    if (!isEnabled) return
    
    initAudioContext()
    
    const oscillator = audioContextRef.current.createOscillator()
    const envelope = audioContextRef.current.createGain()
    
    oscillator.connect(envelope)
    envelope.connect(gainNodeRef.current)
    
    oscillator.frequency.value = frequency
    oscillator.type = type
    
    // Create envelope for smooth sound
    const now = audioContextRef.current.currentTime
    envelope.gain.setValueAtTime(0, now)
    envelope.gain.linearRampToValueAtTime(0.1, now + 0.01)
    envelope.gain.exponentialRampToValueAtTime(0.001, now + duration)
    
    oscillator.start(now)
    oscillator.stop(now + duration)
  }

  // Sound effects
  const playHover = () => {
    createTone(800, 0.1, 'sine')
  }

  const playClick = () => {
    createTone(1000, 0.15, 'square')
    setTimeout(() => createTone(1200, 0.1, 'sine'), 50)
  }

  const playSuccess = () => {
    createTone(523, 0.2, 'sine') // C5
    setTimeout(() => createTone(659, 0.2, 'sine'), 100) // E5
    setTimeout(() => createTone(784, 0.3, 'sine'), 200) // G5
  }

  const playError = () => {
    createTone(300, 0.3, 'sawtooth')
  }

  const playNotification = () => {
    createTone(880, 0.1, 'sine')
    setTimeout(() => createTone(1760, 0.15, 'sine'), 100)
  }

  const playWhoosh = () => {
    // Sweep from high to low frequency
    if (!isEnabled) return
    
    initAudioContext()
    
    const oscillator = audioContextRef.current.createOscillator()
    const envelope = audioContextRef.current.createGain()
    
    oscillator.connect(envelope)
    envelope.connect(gainNodeRef.current)
    
    oscillator.type = 'sine'
    
    const now = audioContextRef.current.currentTime
    oscillator.frequency.setValueAtTime(1500, now)
    oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.3)
    
    envelope.gain.setValueAtTime(0, now)
    envelope.gain.linearRampToValueAtTime(0.05, now + 0.01)
    envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
    
    oscillator.start(now)
    oscillator.stop(now + 0.3)
  }

  const toggleSound = () => {
    setIsEnabled(prev => !prev)
    if (!isEnabled) {
      playNotification() // Play a sound when enabling
    }
  }

  const value = {
    isEnabled,
    toggleSound,
    playHover,
    playClick,
    playSuccess,
    playError,
    playNotification,
    playWhoosh
  }

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  )
}
