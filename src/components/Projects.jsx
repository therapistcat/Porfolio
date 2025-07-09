import React from 'react'
import './Projects.css'

const projectsData = [
  {
    title: "Financial Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    description: "A comprehensive financial management platform that helps users track expenses, visualize budgets, and analyze spending patterns in real time.",
    frameworks: ["React", "Node.js", "Chart.js", "MongoDB"],
    github: "https://github.com/therapistcat/financial-dashboard",
    demo: "https://financial-dashboard-demo.vercel.app",
    category: "Web Development"
  },
  {
    title: "Smart Study Scheduler",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
    description: "An intelligent study planner that helps students organize and optimize their study sessions using AI-powered scheduling algorithms.",
    frameworks: ["React", "Flask", "MongoDB", "Python"],
    github: "https://github.com/therapistcat/study-scheduler",
    demo: "https://study-scheduler-demo.vercel.app",
    category: "AI & Machine Learning"
  },
  {
    title: "Blockchain Voting System",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    description: "A decentralized voting platform built on blockchain technology ensuring transparency, security, and immutable vote records.",
    frameworks: ["React", "Solidity", "Web3.js", "Ethereum"],
    github: "https://github.com/therapistcat/blockchain-voting",
    demo: "https://blockchain-voting-demo.vercel.app",
    category: "Blockchain"
  }
]

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        {/* Header */}
        <div className="projects-header">
          <div className="projects-badge">
            <span className="badge-dot"></span>
            My Projects
          </div>
          <h2 className="projects-title">
            Featured
            <span className="text-gradient"> Work</span>
          </h2>
          <p className="projects-subtitle">
            A showcase of projects that demonstrate my skills in full-stack development, Blockchain, and modern web technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div key={index} className="project-card">

              {/* Category Badge */}
              <div className="project-category">
                <span className="category-badge">{project.category}</span>
              </div>

              {/* Project Image */}
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                />
                <div className="image-gradient"></div>
              </div>

              {/* Project Content */}
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-links">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-icon demo-link"
                      title="Live Demo"
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-icon github-link"
                      title="View Code"
                    >
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                {/* Tech Stack */}
                <div className="tech-stack">
                  {project.frameworks.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="project-actions">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>View Project</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="projects-cta">
          <div className="cta-card">
            <h3 className="cta-title">
              Interested in working together?
            </h3>
            <p className="cta-text">
              I'm always open to discussing new opportunities and exciting projects.
            </p>
            <a
              href="mailto:mishrajivanshu02@gmail.com"
              className="cta-button"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
