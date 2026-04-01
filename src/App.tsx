import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { FloatingControls, Navbar } from './components/common'
import SkyScreen from './components/common/SkyScreen'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ExperiencesPage from './pages/ExperiencesPage'
import ProjectsPage from './pages/ProjectsPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'
import GuestbookPage from './pages/GuestbookPage'
import { pageBackgroundStyle } from './styles/pageBackground'

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
      <div className="relative min-h-full isolate">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={pageBackgroundStyle} />
        <div className="relative z-10">
          <Navbar variant="light" />
          <FloatingControls />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<Navigate to="/projects" replace />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/guestbook" element={<GuestbookPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
