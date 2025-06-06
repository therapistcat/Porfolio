import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import './Skills.css'

const skills = [
  {
    name: 'HTML',
    color: '#f59e42',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS',
    color: '#2965f1',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    name: 'JavaScript',
    color: '#f7df1e',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'React',
    color: '#61dafb',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'Node.js',
    color: '#3c873a',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Tailwind',
    color: '#38bdf8',
    icon: 'https://www.svgrepo.com/show/374118/tailwind.svg',
  },
  {
    name: 'GraphQL',
    color: '#e535ab',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  },
  {
    name: 'Express',
    color: '#6b7280', // subtle gray
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  },
  {
    name: 'Python',
    color: '#3776ab',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'C++',
    color: '#00599c',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  },
]

const Skills = () => {
  return (
    <div className="skills-section" id="skills">
      <h1 className="skills-header">SKILLS</h1>
      <div className="skills-container">
        {skills.map((skill, idx) => (
          <div className={`skill-item ${skill.name}`} key={skill.name}>
            <CircularProgressbar
              value={80}
              text={''}
              styles={buildStyles({
                pathColor: skill.color,
                trailColor: '#f8fafc', // matches section background
                strokeLinecap: 'round',
                pathTransitionDuration: 0.7,
                trailWidth: 10,
                pathWidth: 10,
              })}
              strokeWidth={10}
            />
            <span className="skill-icon-bg"></span>
            <img
              src={skill.icon}
              alt={skill.name}
              className="skill-icon"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
