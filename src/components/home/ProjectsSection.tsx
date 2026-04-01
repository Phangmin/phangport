import { useEffect, useState } from 'react'
import { projectsContent } from '../../content/home'
import { projectsByLanguage, projectsPageCopyByLanguage } from '../../content/projects'
import useLanguage from '../../hooks/useLanguage'
import FeaturedProjectCarousel from '../projects/FeaturedProjectCarousel'
import ProjectDetailGrid from '../projects/ProjectDetailGrid'
import ProjectsBackgroundMedia from './projects/ProjectsBackgroundMedia'
import ProjectsDesktopArc from './projects/ProjectsDesktopArc'
import ProjectsDetailsPanel from './projects/ProjectsDetailsPanel'
import ProjectsMobileCarousel from './projects/ProjectsMobileCarousel'

function ProjectsSection() {
  const language = useLanguage()
  const content = projectsContent[language]
  const projects = content.projects
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const activeProject =
    projects[focusedIndex] || projects[0] || { title: '', period: '', role: '', description: '', stacks: [] }
  const detailProjects = projectsByLanguage[language]
  const projectCopy = projectsPageCopyByLanguage[language]
  const selectedProject = detailProjects.find((project) => project.id === selectedProjectId) ?? null
  const backgroundUrl = activeProject.backgroundUrl

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedProjectId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const root = document.getElementById('root')

    if (!root) {
      return undefined
    }

    const previousOverflow = root.style.overflowY
    root.style.overflowY = selectedProject ? 'hidden' : previousOverflow || 'auto'

    return () => {
      root.style.overflowY = previousOverflow
    }
  }, [selectedProject])

  function getProjectTypeLabel(projectType: 'individual' | 'team') {
    return projectType === 'individual' ? projectCopy.labels.personal : projectCopy.labels.team
  }

  function handleDetailOpen() {
    if (!activeProject.id) {
      return
    }

    setSelectedProjectId(activeProject.id)
  }

  return (
    <>
      <section
        id="portfolio"
        className="relative min-h-[100svh] w-full overflow-hidden bg-transparent"
        data-home-projects-section="true"
      >
        <ProjectsBackgroundMedia backgroundUrl={backgroundUrl} />

        <div className="relative z-[1] mx-auto grid min-h-[100svh] w-[min(1126px,calc(100%-48px))] content-center gap-7 px-0 pb-[72px] pt-[calc(var(--navbar-offset,104px)+12px)] max-md:content-start max-md:gap-4 max-md:pb-2.5 max-md:pt-[calc(var(--navbar-offset,96px)+5px)] md:w-[min(1126px,calc(100%-128px))] lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-center lg:gap-[42px]">
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
            allProjectsCta={content.allProjectsCta}
            activeProject={activeProject}
            focusedIndex={focusedIndex}
            onDetailOpen={handleDetailOpen}
          />
        </div>
      </section>

      {selectedProject ? (
        <div
          className="fixed inset-0 z-50 bg-slate-950/56 px-3 py-4 backdrop-blur-sm md:px-8 md:py-8"
          onClick={() => setSelectedProjectId(null)}
        >
          <div className="mx-auto flex h-full w-full max-w-[1180px] items-center justify-center">
            <div className="relative w-full" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                onClick={() => setSelectedProjectId(null)}
                className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-transparent text-slate-400 transition-colors duration-200 hover:border-blue-600 hover:text-blue-600 focus-visible:border-blue-600 focus-visible:text-blue-600 focus-visible:outline-none"
                data-projects-modal-close="true"
                aria-label="Close project detail modal"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
                  <path
                    d="M6 6 18 18M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="max-h-[90vh] overflow-y-auto rounded-[30px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:rounded-[34px]">
                <ProjectDetailGrid
                  project={selectedProject}
                  labels={projectCopy.labels}
                  projectTypeLabel={getProjectTypeLabel(selectedProject.type)}
                  media={<FeaturedProjectCarousel project={selectedProject} />}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ProjectsSection
