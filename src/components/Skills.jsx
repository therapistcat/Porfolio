import React, { useEffect } from 'react'
import { useAchievements } from '../contexts/AchievementContext'
import './Skills.css'

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      {
        name: 'Python',
        level: 90,
        color: '#3776ab',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        description: 'Problem solving, scripting, and backend logic'
      },
      {
        name: 'C',
        level: 80,
        color: '#a8b9cc',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
        description: 'Core programming and memory fundamentals'
      },
      {
        name: 'C++',
        level: 84,
        color: '#00599c',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
        description: 'OOP and performance-oriented coding'
      },
      {
        name: 'Java',
        level: 82,
        color: '#ed8b00',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        description: 'Object-oriented application development'
      }
    ]
  },
  {
    title: "Frameworks",
    skills: [
      {
        name: 'React',
        level: 88,
        color: '#61dafb',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        description: 'Component-driven frontend architecture'
      },
      {
        name: 'Node.js',
        level: 86,
        color: '#339933',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        description: 'Backend services and APIs'
      },
      {
        name: 'Express.js',
        level: 84,
        color: '#000000',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
        description: 'REST APIs, middleware, and auth'
      },
      {
        name: 'FastAPI',
        level: 82,
        color: '#009688',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
        description: 'High-performance Python API development'
      }
    ]
  },
  {
    title: "Databases & Concepts",
    skills: [
      {
        name: 'MongoDB',
        level: 85,
        color: '#47a248',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        description: 'NoSQL schema design and aggregation'
      },
      {
        name: 'MySQL',
        level: 80,
        color: '#4479a1',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        description: 'Relational modeling and SQL querying'
      },
      {
        name: 'PostgreSQL',
        level: 78,
        color: '#336791',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
        description: 'Advanced relational data management'
      },
      {
        name: 'REST APIs',
        level: 88,
        color: '#85ea2d',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg',
        description: 'API design, JWT auth, and WebSockets'
      }
    ]
  }
]

const Skills = () => {
  const { trackSectionVisit, trackSkillCategoryView } = useAchievements()

  useEffect(() => {
    trackSectionVisit('skills')
  }, [trackSectionVisit])

  const handleCategoryView = (categoryTitle) => {
    trackSkillCategoryView(categoryTitle)
  }

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
            <span className="text-gradient"> Use in Production</span>
          </h2>
          <p className="skills-subtitle">
            Core languages, frameworks, databases, and engineering concepts from my resume and project work.
          </p>
        </div>

        {/* Skills Categories */}
        <div className="skills-categories">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="skill-category"
              onMouseEnter={() => handleCategoryView(category.title)}
            >
              <div className="category-header">
                <h3 className="category-title">{category.title}</h3>
                <div className="category-line"></div>
              </div>

              <div className="category-skills">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="skill-card modern-card"
                    style={{
                      '--delay': `${(categoryIndex * 4 + skillIndex) * 0.1}s`,
                      '--skill-color': skill.color
                    }}
                  >
                    {/* Skill Icon */}
                    <div className="skill-icon-container">
                      <div className="skill-icon-bg">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="skill-icon"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<span class="skill-fallback-icon">${skill.name.charAt(0)}</span>`;
                          }}
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
                              '--progress': `${skill.level}%`
                            }}
                          ></div>
                        </div>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="skill-card-glow"></div>
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
              {
                name: 'JavaScript',
                short: 'JS',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
              },
              {
                name: 'Next.js',
                short: 'N',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
              },
              {
                name: 'Django',
                short: 'D',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg'
              },
              {
                name: 'Spring Boot',
                short: 'SB',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
              },
              {
                name: 'Flask',
                short: 'F',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg'
              },
              {
                name: 'Three.js',
                short: '3D',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg'
              },
              {
                name: 'Microservices',
                short: 'MS',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
              },
              {
                name: 'JWT Auth',
                short: 'JWT',
                icon: 'https://cdn.simpleicons.org/jsonwebtokens/ffffff'
              }
            ].map((tool, index) => (
              <div
                key={tool.name}
                className="tool-item"
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <span className="tool-icon">
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="tool-icon-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.textContent = tool.short;
                    }}
                  />
                </span>
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
