import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Navbar } from '../components/common'
import {
  AboutSection,
  AwardsSection,
  HeroSection,
  HeroPaperPlanes,
  ProjectsSection,
} from '../components/home'

const Page = styled.main`
  --navbar-offset: 104px;
  color: #0f172a;
  background: white;

  @media (max-width: 767px) {
    --navbar-offset: 132px;
  }
`

function HomePage() {
  const [activeSection, setActiveSection] = useState('home')
  const [navbarVariant, setNavbarVariant] = useState('light')

  useEffect(() => {
    const root = document.getElementById('root')
    const sectionIds = ['home', 'about', 'projects', 'awards']

    if (!root) {
      return undefined
    }

    const rootNode = root

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
      setNavbarVariant(closestSection === 'projects' ? 'dark' : 'light')
    }

    updateNavbarVariant()
    rootNode.addEventListener('scroll', updateNavbarVariant, { passive: true })
    window.addEventListener('resize', updateNavbarVariant)

    return () => {
      rootNode.removeEventListener('scroll', updateNavbarVariant)
      window.removeEventListener('resize', updateNavbarVariant)
    }
  }, [])

  return (
    <Page>
      <HeroPaperPlanes visible={activeSection === 'home'} />
      <Navbar variant={navbarVariant} />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <AwardsSection />
    </Page>
  )
}

export default HomePage
