import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import './Skills.css'

const skills = [
  {
    name: 'HTML',
    level: 90,
    color: '#f59e42',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS',
    level: 85,
    color: '#2965f1',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    name: 'JavaScript',
    level: 88,
    color: '#f7df1e',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'React',
    level: 85,
    color: '#61dafb',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'Node.js',
    level: 80,
    color: '#3c873a',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Express',
    level: 75,
    color: '#6b7280',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  },
  {
    name: 'Python',
    level: 82,
    color: '#3776ab',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'GraphQL',
    level: 70,
    color: '#e535ab',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  },
  {
    name: 'C++',
    level: 75,
    color: '#00599c',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  },
  {
    name: 'MongoDB',
    level: 78,
    color: '#47a248',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
]

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">

        {/* Header */}
        <div className="skills-header">
          <div className="skills-badge">
            <span className="badge-dot"></span>
            My Skills
          </div>
          <h2 className="skills-title">
            Technologies I
            <span className="text-gradient"> Work With</span>
          </h2>
          <p className="skills-subtitle">
            A comprehensive toolkit of modern technologies and frameworks that I use to build innovative solutions.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card">
              {/* Progress Circle */}
              <div className="skill-progress">
                <CircularProgressbar
                  value={skill.level}
                  text={`${skill.level}%`}
                  styles={buildStyles({
                    pathColor: skill.color,
                    textColor: skill.color,
                    trailColor: '#f1f5f9',
                    strokeLinecap: 'round',
                    pathTransitionDuration: 1.5,
                    textSize: '16px',
                    pathWidth: 8,
                    trailWidth: 8,
                  })}
                  strokeWidth={8}
                />

                {/* Icon overlay */}
                <div className="skill-icon-overlay">
                  <div className="skill-icon-wrapper">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="skill-icon"
                    />
                  </div>
                </div>
              </div>

              {/* Skill Name */}
              <h4 className="skill-name">{skill.name}</h4>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="additional-skills">
          <div className="skills-tags">
            {['Git', 'Docker', 'AWS', 'Firebase', 'Figma', 'VS Code', 'Postman', 'Linux'].map((tool) => (
              <span key={tool} className="skill-tag">
                {tool}
              </span>
            ))}
          </div>
          <p className="additional-text">And many more tools and technologies...</p>
        </div>
      </div>
    </section>
  )
}

export default Skills
