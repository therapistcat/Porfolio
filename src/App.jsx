import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Skills from './components/Skills'
import Home from './components/Home'
import Projects from './components/Projects'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    // Only show follower on non-touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return

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

    // Animate the follower with a much slower trailing effect
    const animate = () => {
      currentX += (mouseX - currentX) * 0.04 // SLOW trailing
      currentY += (mouseY - currentY) * 0.04
      follower.style.left = `${currentX}px`
      follower.style.top = `${currentY}px`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', moveFollower)
    animate()

    return () => {
      window.removeEventListener('mousemove', moveFollower)
      document.body.removeChild(follower)
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
