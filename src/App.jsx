import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Skills from './components/Skills'
import Home from './components/Home'
import Projects from './components/Projects'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    const follower = document.createElement('div')
    follower.className = 'cursor-follower'
    document.body.appendChild(follower)

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let currentX = mouseX
    let currentY = mouseY

    const moveFollower = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const moveTouchFollower = (e) => {
      if (e.touches && e.touches[0]) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
      }
    }

    // Animate the follower with smooth trailing effect
    const animate = () => {
      currentX += (mouseX - currentX) * 0.1 // Smooth trailing
      currentY += (mouseY - currentY) * 0.1
      follower.style.left = `${currentX}px`
      follower.style.top = `${currentY}px`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', moveFollower)
    window.addEventListener('touchmove', moveTouchFollower)
    window.addEventListener('touchstart', moveTouchFollower)
    animate()

    return () => {
      window.removeEventListener('mousemove', moveFollower)
      window.removeEventListener('touchmove', moveTouchFollower)
      window.removeEventListener('touchstart', moveTouchFollower)
      if (document.body.contains(follower)) {
        document.body.removeChild(follower)
      }
    }
  }, [])

  return (
    <>
      <Navbar/>
      <Home/>
      <Skills/>
      <Projects/>
      <Footer/>
    </>
  )
}

export default App
