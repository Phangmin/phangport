import { useState } from 'react'
import { projectsContent } from '../../content/home'
import useLanguage from '../../hooks/useLanguage'
import ProjectsDesktopArc from './projects/ProjectsDesktopArc'
import ProjectsDetailsPanel from './projects/ProjectsDetailsPanel'
import ProjectsMobileCarousel from './projects/ProjectsMobileCarousel'

function ProjectsSection() {
  const language = useLanguage()
  const content = projectsContent[language]
  const projects = content.projects
  const [focusedIndex, setFocusedIndex] = useState(2)

  const activeProject =
    projects[focusedIndex] || projects[0] || { title: '', period: '', role: '', description: '' }

  return (
    <section
      id="portfolio"
      className="h-screen w-full bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.16),transparent_32%),linear-gradient(180deg,#081120_0%,#0f172a_46%,#111827_100%)]"
      data-home-projects-section="true"
    >
      <div className="mx-auto grid h-screen w-[min(1126px,calc(100%-48px))] content-center gap-7 px-0 pb-[72px] pt-[calc(var(--navbar-offset,104px)+12px)] max-md:content-start max-md:gap-4 max-md:pb-5 max-md:pt-[calc(var(--navbar-offset,96px)+10px)] md:w-[min(1126px,calc(100%-128px))] lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-center lg:gap-[42px]">
        <div className="grid gap-2 text-center lg:hidden">
          <p data-home-projects-label="true" className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-200">
            {content.sectionLabel}
          </p>
          <h2 className="m-0 text-[clamp(1.5rem,7vw,2.2rem)] leading-[0.98] tracking-[-0.05em] !text-white">
            {content.heading}
          </h2>
        </div>

        <ProjectsDesktopArc
          projects={projects}
          focusedIndex={focusedIndex}
          onFocusChange={setFocusedIndex}
        />

        <ProjectsMobileCarousel
          projects={projects}
          sectionLabel={content.sectionLabel}
          swipeHint={content.swipeHint}
          focusedIndex={focusedIndex}
          onFocusChange={setFocusedIndex}
        />

        <ProjectsDetailsPanel
          sectionLabel={content.sectionLabel}
          detailCta={content.detailCta}
          activeProject={activeProject}
          focusedIndex={focusedIndex}
        />
      </div>
    </section>
  )
}

export default ProjectsSection
