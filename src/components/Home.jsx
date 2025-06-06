import React from 'react'
import "./Home.css"

const Home = () => {
  return (
    <div className="home-container" id="home">
      <h1 className='about-header'>ABOUT</h1>
      <div className="about-content">
        <div className="about-accent"></div>
        <div className="about-main">
          <p className="para">
            I'm <strong>Jivanshu Mishra</strong>, an 18-year-old Computer Engineering student at DJ Sanghvi College, specializing in IoT, Cybersecurity, and Blockchain.<br /><br />
            I'm a <strong>full-stack developer</strong> skilled in the MERN stack and Flask, currently focused on building practical projects like a smart study scheduler and a financial dashboard.<br /><br />
            I’m also passionate about IoT systems, exploring how hardware and software interact. With a solid base in DSA, I enjoy solving problems and turning ideas into efficient solutions.<br /><br />
            Outside tech, I love mentoring kids in science, staying fit, and watching story-driven shows and games like <strong>Peaky Blinders</strong> and <strong>Ghost of Tsushima</strong>.
          </p>
          <img
            src="https://static.wikia.nocookie.net/chhotabheem/images/7/7e/Placeholder.jpeg/revision/latest/scale-to-width-down/1000?cb=20211108091929"
            alt="meri photo"
            className="about-image"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
