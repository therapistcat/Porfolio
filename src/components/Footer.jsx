import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="foot">
      <div className="footer-suggestions">
        <h3>Suggestions?</h3>
        <p>
          Have feedback or ideas to make this portfolio better?<br />
          <a href="mailto:jivanshu@example.com" className="footer-link">Email me</a>
          {" "}or connect on{" "}
          <a href="https://github.com/therapistcat" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          {" "}|
          <a href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
        </p>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Jivanshu Mishra. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
