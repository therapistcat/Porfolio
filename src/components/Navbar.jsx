import React, { useState } from 'react'
import "./Navbar.css"

const Navbar = () => {

  
  const [scrolled,SetScrolled] = useState()
  
  
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav>
      <div className="nav-socials">
        <a
          href="https://wa.me/918928411910?text=I%2C%20will%20touch%20you!"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/768px-WhatsApp.svg.png?20220228223904"
            alt="whatsapp"
            style={{ width: 32, height: 32 }}
          />
        </a>
        <a
          href="https://github.com/therapistcat"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="github"
            style={{ width: 32, height: 32 }}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/your-linkedin-profile" // Update with your LinkedIn profile
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://www.citypng.com/public/uploads/preview/hd-linkedin-official-logo-transparent-background-701751694779193uxxevujc5p.png"
            alt="linkedin"
            style={{ width: 32, height: 32 }}
          />
        </a>
      </div>
      <div className="nav-links">
        <button className="home" onClick={() => handleScroll('home')}>Home</button>
        <button className="skills" onClick={() => handleScroll('skills')}>Skills</button>
        <button className="projects" onClick={() => handleScroll('projects')}>Projects</button>
      </div>
    </nav>
  )
}

export default Navbar
