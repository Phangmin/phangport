import { useEffect, useState } from 'react'
import { Footer } from '../components/common'
import {
  AboutSection,
  ExperiencesSection,
  SkillsSection,
  AwardsSection,
  HeroSection,
  HeroPaperPlanes,
  ProjectsSection,
} from '../components/home'

function HomePage() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const root = document.getElementById('root')
    const sectionIds = ['home', 'about', 'experiences', 'skills', 'portfolio', 'contact']

    if (!root) {
      return undefined
    }

    const rootNode = root
    rootNode.classList.add('home-scroll-snap')

    function updateNavbarVariant() {
      const rootRect = rootNode.getBoundingClientRect()
      const viewportCenter = rootRect.top + rootNode.clientHeight / 2
      let closestSection = 'home'
      let closestDistance = Number.POSITIVE_INFINITY

      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId)

        if (!section) {
          return
        }

        const rect = section.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const distance = Math.abs(sectionCenter - viewportCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestSection = sectionId
        }
      })

      setActiveSection(closestSection)
    }

    updateNavbarVariant()
    rootNode.addEventListener('scroll', updateNavbarVariant, { passive: true })
    window.addEventListener('resize', updateNavbarVariant)

    return () => {
      rootNode.classList.remove('home-scroll-snap')
      rootNode.removeEventListener('scroll', updateNavbarVariant)
      window.removeEventListener('resize', updateNavbarVariant)
    }
  }, [])

  return (
    <main className="[--navbar-offset:104px] bg-white text-slate-900 max-md:[--navbar-offset:132px]">
      <HeroPaperPlanes visible={activeSection === 'home'} />
      <HeroSection />
      <AboutSection />
      <ExperiencesSection />
      <SkillsSection />
      <ProjectsSection />
      <AwardsSection />
      <Footer />
    </main>
  )
}

export default HomePage
