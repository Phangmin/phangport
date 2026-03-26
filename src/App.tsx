import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar, ThemeToggle } from './components/common'
import SkyScreen from './components/common/SkyScreen'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ExperiencesPage from './pages/ExperiencesPage'
import SkillsPage from './pages/SkillsPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [])

  if (loading) {
    return <SkyScreen />
  }

  return (
    <BrowserRouter>
      <Navbar variant="light" />
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
