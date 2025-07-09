import React, { useEffect, useState } from 'react'
import { useAchievements } from '../contexts/AchievementContext'
import './AchievementNotification.css'

const AchievementNotification = () => {
  const { notifications } = useAchievements()
  const [animatingNotifications, setAnimatingNotifications] = useState([])

  useEffect(() => {
    notifications.forEach(notification => {
      if (!animatingNotifications.find(n => n.id === notification.id)) {
        setAnimatingNotifications(prev => [...prev, { ...notification, isNew: true }])

        // Remove the isNew flag after animation
        setTimeout(() => {
          setAnimatingNotifications(prev =>
            prev.map(n => n.id === notification.id ? { ...n, isNew: false } : n)
          )
        }, 100)
      }
    })

    // Clean up old notifications
    setAnimatingNotifications(prev =>
      prev.filter(n => notifications.find(notif => notif.id === n.id))
    )
  }, [notifications])

  return (
    <div className="achievement-notifications">
      {animatingNotifications.map(notification => (
        <div
          key={notification.id}
          className={`achievement-notification ${notification.isNew ? 'achievement-entering' : ''}`}
        >
          <div className="achievement-sparkles">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`sparkle sparkle-${i + 1}`}>✨</div>
            ))}
          </div>

          <div className="achievement-icon">
            <div className="icon-container">
              {notification.achievement.icon}
            </div>
          </div>

          <div className="achievement-content">
            <div className="achievement-header">
              <span className="achievement-badge">🎉 Achievement Unlocked!</span>
              <span className="achievement-points">+{notification.achievement.points} pts</span>
            </div>
            <div className="achievement-title">
              {notification.achievement.title}
            </div>
            <div className="achievement-description">
              {notification.achievement.description}
            </div>
          </div>

          <div className="achievement-glow"></div>
          <div className="achievement-border"></div>
        </div>
      ))}
    </div>
  )
}

export default AchievementNotification
