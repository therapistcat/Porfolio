import React, { useState } from 'react'
import { useAchievements } from '../contexts/AchievementContext'
import './AchievementProgress.css'

const AchievementProgress = () => {
  const { achievements, achievementList, getTotalPoints, getProgress } = useAchievements()
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={`achievement-progress ${isExpanded ? 'expanded' : ''}`}>
      <button className="progress-toggle" onClick={toggleExpanded}>
        <div className="progress-summary">
          <div className="progress-icon">🏆</div>
          <div className="progress-info">
            <div className="progress-text">
              {Object.keys(achievements).length}/{Object.keys(achievementList).length} Achievements
            </div>
            <div className="progress-points">{getTotalPoints()} points</div>
          </div>
          <div className="progress-percentage">{getProgress()}%</div>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="achievement-list">
          <div className="achievement-header">
            <h3>🎯 Achievement Gallery</h3>
            <p>Unlock achievements by exploring the portfolio!</p>
          </div>
          
          <div className="achievements-grid">
            {Object.values(achievementList).map(achievement => {
              const isUnlocked = achievements[achievement.id]
              return (
                <div 
                  key={achievement.id}
                  className={`achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="achievement-item-icon">
                    {isUnlocked ? achievement.icon : '🔒'}
                  </div>
                  <div className="achievement-item-content">
                    <div className="achievement-item-title">
                      {isUnlocked ? achievement.title : '???'}
                    </div>
                    <div className="achievement-item-description">
                      {isUnlocked ? achievement.description : 'Hidden achievement'}
                    </div>
                    <div className="achievement-item-points">
                      {achievement.points} points
                    </div>
                  </div>
                  {isUnlocked && (
                    <div className="achievement-item-date">
                      Unlocked {new Date(isUnlocked.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default AchievementProgress
