import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Skills from './components/Skills'
import Home from './components/Home'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import PageLoader from './components/PageLoader'
import MouseParticles from './components/MouseParticles'
import EasterEggs from './components/EasterEggs'
import { ThemeProvider } from './contexts/ThemeContext'
import { SoundProvider } from './contexts/SoundContext'
import { AchievementProvider } from './contexts/AchievementContext'
import AchievementNotification from './components/AchievementNotification'
import AchievementProgress from './components/AchievementProgress'
import { useEffect } from 'react'

function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <AchievementProvider>
          <AchievementNotification />
          <AchievementProgress />
          <EasterEggs />
          <MouseParticles />
          <PageLoader />
          <ScrollProgress />
          <BackToTop />
          <Navbar/>
          <Home/>
          <Skills/>
          <Projects/>
          <Contact/>
          <Footer/>
        </AchievementProvider>
      </SoundProvider>
    </ThemeProvider>
  )
}

export default App
