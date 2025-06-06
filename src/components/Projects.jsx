import React from 'react'
import './Projects.css'

const projectsData = [
  {
    title: "Financial Dashboard",
    image: "https://cdn-icons-png.flaticon.com/512/4149/4149653.png",
    description: (
      <>
        Track <span className="desc-highlight">expenses</span>, visualize <span className="desc-highlight">budgets</span>, and analyze <span className="desc-highlight">spending patterns</span> in real time.
      </>
    ),
    details: "Built with React, Node.js, and Chart.js. Features authentication, export options, and customizable categories for smarter financial planning.",
    frameworks: ["React", "Node.js", "Chart.js"]
  },
  {
    title: "Smart Study Scheduler",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
    description: (
      <>
        An intelligent planner that helps students <span className="desc-highlight">organize</span> and <span className="desc-highlight">optimize study sessions</span>.
      </>
    ),
    details: "Uses React, Flask, and MongoDB. Integrates reminders, adaptive scheduling, productivity analytics, and a smart calendar that adjusts to your learning pace.",
    frameworks: ["React", "Flask", "MongoDB"]
  },
  {
    title: "IoT Home Automation",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
    description: (
      <>
        Control and monitor <span className="desc-highlight">home devices</span> remotely via a <span className="desc-highlight">secure web dashboard</span>.
      </>
    ),
    details: "Developed with React, Node.js, and MQTT. Supports real-time device status, automation rules, notifications, and secure remote access for smart homes.",
    frameworks: ["React", "Node.js", "MQTT"]
  }
]

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <h2 className="projects-header">Projects</h2>
      <div className="projects-container">
        {projectsData.map((project, idx) => (
          <div
            className={`project-row ${idx % 2 === 1 ? 'reverse' : ''}`}
            key={idx}
          >
            <div className="project-image-col">
              <div className="project-img-glass">
                <img src={project.image} alt={project.title} className="project-img-main" />
              </div>
            </div>
            <div className="project-card">
              <div className="card-inner">
                <div className={`card-front ${idx % 2 === 1 ? 'align-right' : 'align-left'}`}>
                  <h3>{project.title}</h3>
                  <div className="project-desc">{project.description}</div>
                </div>
                <div className="card-back">
                  <h4>Details</h4>
                  <p>{project.details}</p>
                  <div className="frameworks">
                    {project.frameworks.map((fw, i) => (
                      <span className="framework" key={i}>{fw}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
