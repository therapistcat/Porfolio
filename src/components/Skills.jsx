import React from 'react'
import './Skills.css'

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      {
        name: 'HTML5',
        level: 90,
        color: '#e34f26',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        description: 'Semantic markup & accessibility'
      },
      {
        name: 'CSS3',
        level: 85,
        color: '#1572b6',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        description: 'Modern layouts & animations'
      },
      {
        name: 'JavaScript',
        level: 88,
        color: '#f7df1e',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        description: 'ES6+ & DOM manipulation'
      },
      {
        name: 'React',
        level: 85,
        color: '#61dafb',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        description: 'Hooks, Context & Components'
      }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      {
        name: 'Node.js',
        level: 80,
        color: '#339933',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        description: 'Server-side JavaScript'
      },
      {
        name: 'Express',
        level: 75,
        color: '#000000',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
        description: 'RESTful APIs & middleware'
      },
      {
        name: 'Python',
        level: 82,
        color: '#3776ab',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        description: 'Flask, Django & automation'
      },
      {
        name: 'MongoDB',
        level: 78,
        color: '#47a248',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        description: 'NoSQL database design'
      }
    ]
  },
  {
    title: "Blockchain & Other",
    skills: [
      {
        name: 'Solidity',
        level: 70,
        color: '#363636',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg',
        description: 'Smart contracts & DApps'
      },
      {
        name: 'C++',
        level: 75,
        color: '#00599c',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        description: 'System programming'
      },
      {
        name: 'GraphQL',
        level: 70,
        color: '#e535ab',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
        description: 'Query language & APIs'
      },
      {
        name: 'Git',
        level: 85,
        color: '#f05032',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        description: 'Version control & collaboration'
      }
    ]
  }
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
            <span className="text-gradient"> Master</span>
          </h2>
          <p className="skills-subtitle">
            A comprehensive toolkit of modern technologies and frameworks that I use to build innovative solutions.
          </p>
        </div>

        {/* Skills Categories */}
        <div className="skills-categories">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className="skill-category">
              <div className="category-header">
                <h3 className="category-title">{category.title}</h3>
                <div className="category-line"></div>
              </div>

              <div className="category-skills">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="skill-card"
                    style={{ '--delay': `${(categoryIndex * 4 + skillIndex) * 0.1}s` }}
                  >
                    {/* Skill Icon */}
                    <div className="skill-icon-container">
                      <div className="skill-icon-bg" style={{ '--skill-color': skill.color }}>
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="skill-icon"
                        />
                      </div>
                    </div>

                    {/* Skill Info */}
                    <div className="skill-info">
                      <h4 className="skill-name">{skill.name}</h4>
                      <p className="skill-description">{skill.description}</p>

                      {/* Progress Bar */}
                      <div className="skill-progress-container">
                        <div className="skill-progress-bar">
                          <div
                            className="skill-progress-fill"
                            style={{
                              '--progress': `${skill.level}%`,
                              '--skill-color': skill.color
                            }}
                          ></div>
                        </div>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="skill-card-glow" style={{ '--skill-color': skill.color }}></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tools */}
        <div className="additional-tools">
          <h3 className="tools-title">Tools & Technologies</h3>
          <div className="tools-grid">
            {[
              { name: 'Docker', icon: '🐳' },
              { name: 'AWS', icon: '☁️' },
              { name: 'Firebase', icon: '🔥' },
              { name: 'Figma', icon: '🎨' },
              { name: 'VS Code', icon: '💻' },
              { name: 'Postman', icon: '📮' },
              { name: 'Linux', icon: '🐧' },
              { name: 'Webpack', icon: '📦' }
            ].map((tool, index) => (
              <div
                key={tool.name}
                className="tool-item"
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <span className="tool-icon">{tool.icon}</span>
                <span className="tool-name">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
