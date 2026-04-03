import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { FloatingControls, Navbar } from './components/common'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ExperiencesPage from './pages/ExperiencesPage'
import ProjectsPage from './pages/ProjectsPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'
import GuestbookPage from './pages/GuestbookPage'
import { pageBackgroundStyle } from './styles/pageBackground'

function RouteScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined' || !('scrollRestoration' in window.history)) {
      return
    }

    const previousScrollRestoration = window.history.scrollRestoration

    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useEffect(() => {
    const root = document.getElementById('root')
    let timeoutId = 0

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      root?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })

    timeoutId = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      root?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, 120)

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [location.pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
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
