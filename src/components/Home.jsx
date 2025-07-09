import React from 'react'
import TypewriterEffect from './TypewriterEffect'
import ParticleBackground from './ParticleBackground'
import GitHubStats from './GitHubStats'
import './Home.css'

const Home = () => {
  const typewriterTexts = [
    "Full-Stack Developer",
    "Blockchain Enthusiast",
    "Problem Solver",
    "Tech Innovator"
  ]

  return (
    <section className="home-section" id="home">
      <ParticleBackground />
      <div className="home-container">

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Hello, I'm <span className="hero-name">Jivanshu</span>
            </h1>
            <div className="hero-subtitle">
              <span className="subtitle-text">Computer Engineering Student • </span>
              <TypewriterEffect texts={typewriterTexts} speed={80} deleteSpeed={40} pauseTime={1500} />
            </div>
            <p className="hero-description">
              Passionate about creating innovative solutions through modern web technologies,
              blockchain development, and cutting-edge software engineering.
            </p>
          </div>

          {/* Floating Elements */}
          <div className="floating-elements">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
            <div className="floating-shape shape-4"></div>
          </div>
        </div>

        {/* About Section */}
        <div className="about-section">

          {/* Content */}
          <div className="about-content">
            <div className="about-badge">
              <span className="badge-dot"></span>
              About Me
            </div>

            <h2 className="about-title">
              Passionate about creating
              <span className="text-gradient"> innovative solutions</span>
            </h2>

            <div className="about-text">
              <p>
                I'm an <span className="highlight-dark">18-year-old Computer Engineering student</span> at
                DJ Sanghvi College, specializing in <span className="highlight-blue">Blockchain, Cybersecurity, and Web3</span>.
              </p>

              <p>
                As a <span className="highlight-dark">full-stack developer</span> skilled in the
                <span className="highlight-green"> MERN stack</span> and
                <span className="highlight-purple"> Flask</span>, I'm currently focused on building
                practical projects like a smart study scheduler and a financial dashboard.
              </p>

              <p>
                I'm passionate about <span className="highlight-orange">Blockchain technology</span>, exploring how
                decentralized systems can revolutionize industries. With a solid foundation in
                <span className="highlight-dark"> Data Structures & Algorithms</span>, I enjoy solving
                complex problems and turning innovative ideas into efficient solutions.
              </p>

              <p>
                Outside of tech, I love mentoring kids in science, staying fit, and exploring new technologies.
                I'm always eager to learn about emerging trends in <span className="highlight-dark">Web3</span> and
                <span className="highlight-dark">decentralized applications</span>.
              </p>
            </div>

            {/* Stats */}
            <div className="stats-section">
              <div className="stat-item">
                <div className="stat-number blue">18</div>
                <div className="stat-label">Years Old</div>
              </div>
              <div className="stat-item">
                <div className="stat-number green">10+</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-item">
                <div className="stat-number purple">5+</div>
                <div className="stat-label">Projects</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="about-image-section">
            <div className="image-container">
              <div className="image-background"></div>

              <div className="image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Jivanshu Mishra"
                  className="profile-image"
                />
                <div className="image-overlay"></div>
              </div>

              {/* Floating elements */}
              <div className="floating-dot dot-1"></div>
              <div className="floating-dot dot-2"></div>
              <div className="floating-dot dot-3"></div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-buttons">
            <button
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              View My Work
            </button>
            <button
              onClick={() => document.getElementById('skills').scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              My Skills
            </button>
          </div>
        </div>

        {/* GitHub Stats Section */}
        <div className="github-stats-section">
          <GitHubStats />
        </div>
      </div>
    </section>
  )
}

export default Home