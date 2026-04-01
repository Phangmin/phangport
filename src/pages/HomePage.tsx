import { useEffect } from 'react'
import { Footer } from '../components/common'
import {
  ContactSection,
  HeroSection,
  HomeSectionNavigator,
  ProjectsSection,
  SkillsSection,
} from '../components/home'

function HomePage() {
  useEffect(() => {
    const root = document.getElementById('root')

    if (!root) {
      return undefined
    }

    const rootNode = root
    rootNode.classList.add('home-scroll-snap')

    return () => {
      rootNode.classList.remove('home-scroll-snap')
    }
  }, [])

  return (
    <main className="[--navbar-offset:104px] bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.14),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(14,165,233,0.08),transparent_22%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_52%,#f7fbff_100%)] text-[var(--text-h)] dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(59,130,246,0.14),transparent_24%),linear-gradient(180deg,#08101d_0%,#0b1220_56%,#0f172a_100%)] max-md:[--navbar-offset:96px]">
      <HomeSectionNavigator />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

export default HomePage
