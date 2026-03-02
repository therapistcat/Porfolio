import React from 'react'
import TypewriterEffect from './TypewriterEffect'
import ParticleBackground from './ParticleBackground'
import GitHubStats from './GitHubStats'
import profileImage from '../assets/profile.jpg'
import './Home.css'

const Home = () => {
  const typewriterTexts = [
    "Full-Stack Developer",
    "Backend Developer",
    "MERN + FastAPI Builder",
    "ML + Blockchain Explorer"
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
              <span className="subtitle-text">Computer Science Undergraduate | </span>
              <TypewriterEffect texts={typewriterTexts} speed={80} deleteSpeed={40} pauseTime={1500} />
            </div>
            <p className="hero-description">
              Computer Science undergraduate specializing in full-stack and backend development
              with hands-on experience in MERN, FastAPI, Next.js, YOLOv8, and blockchain systems.
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
              Building production-ready systems
              <span className="text-gradient"> from idea to deployment</span>
            </h2>

            <div className="about-text">
              <p>
                I'm a <span className="highlight-dark">B.Tech CSE (ICB) student</span> at
                DJ Sanghvi College of Engineering (2024-2028) with a
                <span className="highlight-blue"> CGPA of 8.05</span>.
              </p>

              <p>
                As a <span className="highlight-dark">Web Development Intern at Cognifyz Technologies</span>
                (Feb 2026 - Present), I build full-stack modules using
                <span className="highlight-green"> React, Node.js, Express, and MongoDB</span> with
                <span className="highlight-purple"> REST APIs, JWT authentication, and RBAC</span>.
              </p>

              <p>
                I improved API response times by around
                <span className="highlight-orange"> 15%</span> through query optimization and indexing,
                and built reusable UI components with Axios-based integration for faster delivery.
              </p>

              <p>
                I'm also part of <span className="highlight-dark">Trinity, ISACA, and IEEE technical committees</span>,
                and I enjoy solving engineering problems grounded in
                <span className="highlight-dark"> DSA, OOP, and system design</span>.
              </p>
            </div>

            {/* Stats */}
            <div className="stats-section">
              <div className="stat-item">
                <div className="stat-number blue">8.05</div>
                <div className="stat-label">CGPA</div>
              </div>
              <div className="stat-item">
                <div className="stat-number green">3</div>
                <div className="stat-label">Tech Committees</div>
              </div>
              <div className="stat-item">
                <div className="stat-number purple">3</div>
                <div className="stat-label">Featured Projects</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="about-image-section">
            <div className="image-container">
              <div className="image-background"></div>

              <div className="image-wrapper">
                <img
                  src={profileImage}
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
