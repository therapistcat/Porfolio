import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSound } from './SoundContext'

const AchievementContext = createContext()

export const useAchievements = () => {
  const context = useContext(AchievementContext)
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementProvider')
  }
  return context
}

export const AchievementProvider = ({ children }) => {
  const { playSuccess, playEpicSuccess, playLegendarySuccess, playNotification } = useSound()
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('portfolio-achievements')
    return saved ? JSON.parse(saved) : {}
  })
  const [notifications, setNotifications] = useState([])

  // Achievement definitions
  const achievementList = {
    'first-visit': {
      id: 'first-visit',
      title: '👋 Welcome Explorer!',
      description: 'Your journey begins here, partner',
      icon: '🎉',
      points: 10
    },
    'section-explorer': {
      id: 'section-explorer',
      title: '🗺️ Section Explorer',
      description: 'Mapped out the entire territory',
      icon: '🧭',
      points: 25
    },
    'dark-mode-user': {
      id: 'dark-mode-user',
      title: '🌙 Night Owl',
      description: 'Embraced the darkness within',
      icon: '🦉',
      points: 15
    },
    'sound-lover': {
      id: 'sound-lover',
      title: '🔊 Sound Enthusiast',
      description: 'Tuned into the digital frequency',
      icon: '🎵',
      points: 15
    },
    'easter-egg-hunter': {
      id: 'easter-egg-hunter',
      title: '🥚 Easter Egg Hunter',
      description: 'Uncovered hidden secrets',
      icon: '🕵️',
      points: 50
    },
    'konami-master': {
      id: 'konami-master',
      title: '🎮 Konami Master',
      description: 'Unlocked the ancient code',
      icon: '👑',
      points: 100
    },
    'click-master': {
      id: 'click-master',
      title: '🖱️ Click Master',
      description: 'Your trigger finger is legendary',
      icon: '⚡',
      points: 30
    },
    'scroll-champion': {
      id: 'scroll-champion',
      title: '📜 Scroll Champion',
      description: 'Reached the end of the trail',
      icon: '🏆',
      points: 20
    },
    'contact-initiator': {
      id: 'contact-initiator',
      title: '📧 Contact Initiator',
      description: 'Made the first move',
      icon: '💌',
      points: 25
    },
    'project-viewer': {
      id: 'project-viewer',
      title: '👀 Project Viewer',
      description: 'Investigated the evidence',
      icon: '🔍',
      points: 15
    },
    'speed-reader': {
      id: 'speed-reader',
      title: '⚡ Speed Reader',
      description: 'Quick on the draw',
      icon: '💨',
      points: 10
    },
    'dedicated-visitor': {
      id: 'dedicated-visitor',
      title: '⏰ Dedicated Visitor',
      description: 'Set up camp and stayed a while',
      icon: '🎯',
      points: 40
    },
    'skill-explorer': {
      id: 'skill-explorer',
      title: '🔍 Skill Explorer',
      description: 'Viewed all skill categories',
      icon: '🧠',
      points: 30
    },
    'project-enthusiast': {
      id: 'project-enthusiast',
      title: '💼 Project Enthusiast',
      description: 'Clicked on multiple project links',
      icon: '🚀',
      points: 35
    },
    'theme-switcher': {
      id: 'theme-switcher',
      title: '🎨 Theme Switcher',
      description: 'Switched themes multiple times',
      icon: '🌈',
      points: 20
    },
    'achievement-hunter': {
      id: 'achievement-hunter',
      title: '🏆 Achievement Hunter',
      description: 'Unlocked 5 achievements',
      icon: '👑',
      points: 75
    },
    'portfolio-master': {
      id: 'portfolio-master',
      title: '🎖️ Portfolio Master',
      description: 'Unlocked all achievements',
      icon: '🌟',
      points: 200
    },
    'code-outlaw': {
      id: 'code-outlaw',
      title: '🤠 Code Outlaw',
      description: 'Explored every corner of the portfolio frontier',
      icon: '🏜️',
      points: 45
    },
    'survivor': {
      id: 'survivor',
      title: '🧟 Survivor',
      description: 'Made it through the entire portfolio journey',
      icon: '🔦',
      points: 50
    },
    'observer': {
      id: 'observer',
      title: '👁️ Observer',
      description: 'Watched every section with keen interest',
      icon: '🔍',
      points: 35
    },
    'sharp-mind': {
      id: 'sharp-mind',
      title: '🎩 Sharp Mind',
      description: 'Quickly navigated through complex sections',
      icon: '⚡',
      points: 40
    },
    'camp-visitor': {
      id: 'camp-visitor',
      title: '🏕️ Camp Visitor',
      description: 'Settled in and explored thoroughly',
      icon: '🔥',
      points: 30
    },
    'infected-by-code': {
      id: 'infected-by-code',
      title: '🦠 Infected by Code',
      description: 'Caught the programming bug',
      icon: '💻',
      points: 25
    }
  }

  // Tracking state
  const [visitedSections, setVisitedSections] = useState(new Set())
  const [clickCount, setClickCount] = useState(0)
  const [visitStartTime] = useState(Date.now())
  const [themeChanges, setThemeChanges] = useState(0)
  const [projectClicks, setProjectClicks] = useState(0)
  const [skillCategoriesViewed, setSkillCategoriesViewed] = useState(new Set())
  const [totalInteractions, setTotalInteractions] = useState(0)
  const [quickNavigations, setQuickNavigations] = useState(0)

  useEffect(() => {
    localStorage.setItem('portfolio-achievements', JSON.stringify(achievements))
  }, [achievements])

  useEffect(() => {
    // First visit achievement
    if (!achievements['first-visit']) {
      unlockAchievement('first-visit')
    }

    // Track clicks and interactions
    const handleClick = () => {
      setClickCount(prev => {
        const newCount = prev + 1
        if (newCount >= 100 && !achievements['click-master']) {
          unlockAchievement('click-master')
        }
        return newCount
      })

      setTotalInteractions(prev => {
        const newCount = prev + 1
        if (newCount >= 50 && !achievements['infected-by-code']) {
          unlockAchievement('infected-by-code')
        }
        return newCount
      })
    }

    // Track scroll completion
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent >= 90 && !achievements['scroll-champion']) {
        unlockAchievement('scroll-champion')
      }
    }

    // Track visit duration and navigation patterns
    const checkVisitDuration = () => {
      const duration = Date.now() - visitStartTime
      if (duration < 30000 && !achievements['speed-reader']) {
        unlockAchievement('speed-reader')
        setQuickNavigations(prev => prev + 1)
      } else if (duration > 300000 && !achievements['dedicated-visitor']) {
        unlockAchievement('dedicated-visitor')
        if (!achievements['camp-visitor']) {
          unlockAchievement('camp-visitor')
        }
      } else if (duration > 120000 && !achievements['survivor']) {
        unlockAchievement('survivor')
      }

      // Sharp mind achievement for quick navigation
      if (quickNavigations >= 3 && !achievements['sharp-mind']) {
        unlockAchievement('sharp-mind')
      }
    }

    document.addEventListener('click', handleClick)
    window.addEventListener('scroll', handleScroll)
    
    const durationTimer = setInterval(checkVisitDuration, 10000)

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(durationTimer)
    }
  }, [achievements, visitStartTime])

  const unlockAchievement = (achievementId) => {
    if (achievements[achievementId]) return // Already unlocked

    const achievement = achievementList[achievementId]
    if (!achievement) return

    setAchievements(prev => {
      const newAchievements = {
        ...prev,
        [achievementId]: {
          ...achievement,
          unlockedAt: Date.now()
        }
      }

      // Check for meta achievements
      const unlockedCount = Object.keys(newAchievements).length
      if (unlockedCount >= 5 && !newAchievements['achievement-hunter']) {
        setTimeout(() => unlockAchievement('achievement-hunter'), 1000)
      }
      if (unlockedCount >= Object.keys(achievementList).length - 1 && !newAchievements['portfolio-master']) {
        setTimeout(() => unlockAchievement('portfolio-master'), 2000)
      }

      return newAchievements
    })

    // Show notification
    const notification = {
      id: Date.now(),
      achievement
    }

    setNotifications(prev => [...prev, notification])

    // Play different sounds based on achievement tier
    if (achievement.points >= 75) {
      playLegendarySuccess() // Legendary achievements
    } else if (achievement.points >= 30) {
      playEpicSuccess() // Epic achievements
    } else {
      playSuccess() // Regular achievements
    }

    // Remove notification after 6 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id))
    }, 6000)
  }

  const trackSectionVisit = (sectionId) => {
    setVisitedSections(prev => {
      const newSet = new Set(prev)
      newSet.add(sectionId)

      // Check if all main sections visited
      const mainSections = ['home', 'skills', 'projects', 'contact']
      const allVisited = mainSections.every(section => newSet.has(section))

      if (allVisited && !achievements['section-explorer']) {
        unlockAchievement('section-explorer')
      }

      // Code outlaw achievement for exploring everything
      if (newSet.size >= 4 && !achievements['code-outlaw']) {
        unlockAchievement('code-outlaw')
      }

      // Observer achievement for watching sections
      if (newSet.size >= 3 && !achievements['observer']) {
        unlockAchievement('observer')
      }

      return newSet
    })
  }

  const trackThemeChange = (isDark) => {
    if (isDark && !achievements['dark-mode-user']) {
      unlockAchievement('dark-mode-user')
    }

    setThemeChanges(prev => {
      const newCount = prev + 1
      if (newCount >= 3 && !achievements['theme-switcher']) {
        unlockAchievement('theme-switcher')
      }
      return newCount
    })
  }

  const trackSoundEnabled = () => {
    if (!achievements['sound-lover']) {
      unlockAchievement('sound-lover')
    }
  }

  const trackEasterEgg = () => {
    if (!achievements['easter-egg-hunter']) {
      unlockAchievement('easter-egg-hunter')
    }
  }

  const trackKonamiCode = () => {
    if (!achievements['konami-master']) {
      unlockAchievement('konami-master')
    }
  }

  const trackContactForm = () => {
    if (!achievements['contact-initiator']) {
      unlockAchievement('contact-initiator')
    }
  }

  const trackProjectView = () => {
    if (!achievements['project-viewer']) {
      unlockAchievement('project-viewer')
    }

    setProjectClicks(prev => {
      const newCount = prev + 1
      if (newCount >= 3 && !achievements['project-enthusiast']) {
        unlockAchievement('project-enthusiast')
      }
      return newCount
    })
  }

  const trackSkillCategoryView = (categoryName) => {
    setSkillCategoriesViewed(prev => {
      const newSet = new Set(prev)
      newSet.add(categoryName)

      // Check if all skill categories viewed
      const allCategories = ['Frontend Development', 'Backend Development', 'Blockchain & Other']
      const allViewed = allCategories.every(category => newSet.has(category))

      if (allViewed && !achievements['skill-explorer']) {
        unlockAchievement('skill-explorer')
      }

      return newSet
    })
  }

  const getTotalPoints = () => {
    return Object.values(achievements).reduce((total, achievement) => {
      return total + (achievement.points || 0)
    }, 0)
  }

  const getProgress = () => {
    const totalAchievements = Object.keys(achievementList).length
    const unlockedCount = Object.keys(achievements).length
    return Math.round((unlockedCount / totalAchievements) * 100)
  }

  const value = {
    achievements,
    notifications,
    achievementList,
    unlockAchievement,
    trackSectionVisit,
    trackThemeChange,
    trackSoundEnabled,
    trackEasterEgg,
    trackKonamiCode,
    trackContactForm,
    trackProjectView,
    trackSkillCategoryView,
    getTotalPoints,
    getProgress
  }

  return (
    <AchievementContext.Provider value={value}>
      {children}
    </AchievementContext.Provider>
  )
}
