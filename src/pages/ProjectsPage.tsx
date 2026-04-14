import { useEffect, useState } from 'react'
import { Footer, RevealOnScroll, SkillBadge } from '../components/common'
import FeaturedProjectCarousel from '../components/projects/FeaturedProjectCarousel'
import ProjectDetailGrid from '../components/projects/ProjectDetailGrid'
import awardIcon from '../assets/award-icon.png'
import {
  projectsByLanguage,
  projectsPageCopyByLanguage,
  type ProjectPageProject,
  type ProjectSortKey,
} from '../content/projects'
import useLanguage from '../hooks/useLanguage'

function ProjectCover({ project }: { project: ProjectPageProject }) {
  return project.imageSrc ? (
    <img src={project.imageSrc} alt={project.title} className="block h-full w-full object-cover" />
  ) : (
    <div
      className="relative grid h-full w-full place-items-end p-4 sm:p-5"
      style={{
        background: `linear-gradient(135deg, ${project.coverGradientFrom} 0%, ${project.coverGradientTo} 100%)`,
      }}
    >
      <div className="h-12 w-12 rounded-full bg-white/22 blur-[2px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.32),transparent_42%)]" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-20 w-20 rounded-full border border-white/22 bg-white/10" />
      <div className="pointer-events-none absolute left-4 top-4 h-10 w-10 rounded-full border border-white/18 bg-white/10" />
      <div className="sr-only">
        <h3>{project.title}</h3>
      </div>
    </div>
  )
}

function ProjectCardStacks({ stacks }: { stacks: string[] }) {
  const visibleStacks = stacks.slice(0, 4)
  const hasOverflow = stacks.length > 4

  return (
    <div className="flex flex-wrap content-start gap-1.5 md:min-h-[74px]">
      {visibleStacks.map((stack) => (
        <SkillBadge key={stack} label={stack} />
      ))}
      {hasOverflow ? <SkillBadge label="..." className="min-w-[44px] justify-center" /> : null}
    </div>
  )
}

function ProjectsPage() {
  const language = useLanguage()
  const copy = projectsPageCopyByLanguage[language]
  const projects = projectsByLanguage[language]
  const pageDescription =
    language === 'ko'
      ? '이 페이지에서는 주요 프로젝트의 배경과 핵심 문제 해결 과정을 먼저 보여드리고, 아래에서 전체 프로젝트를 차례로 살펴보실 수 있습니다.'
      : 'This page first highlights the context and problem-solving behind the main project, then lets visitors browse the full project archive below.'
  const [sortKey, setSortKey] = useState<ProjectSortKey>('latest')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const featuredProject = projects.find((project) => project.isFeatured) ?? projects[0]
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null
  const sortedProjects = [...projects].sort((left, right) => {
    if (sortKey === 'latest') {
      return right.endedAt.localeCompare(left.endedAt)
    }

    if (sortKey === 'oldest') {
      return left.endedAt.localeCompare(right.endedAt)
    }

    return right.importance - left.importance
  })

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

  if (!featuredProject) {
    return (
      <main className="min-h-screen pt-[var(--navbar-offset)] text-[var(--text-h)] [--navbar-offset:104px] max-md:[--navbar-offset:96px]">
        <Footer />
      </main>
    )
  }

  function getProjectTypeLabel(projectType: ProjectPageProject['type']) {
    return projectType === 'individual' ? copy.labels.personal : copy.labels.team
  }

  return (
    <main className="min-h-screen text-left text-[var(--text-h)] [--navbar-offset:104px] max-md:[--navbar-offset:96px]">
      <section className="mx-auto grid w-[min(1126px,calc(100%-24px))] gap-7 pb-[72px] pt-[calc(var(--navbar-offset)+20px)] md:w-[min(1126px,calc(100%-128px))] md:gap-9 md:pt-[calc(var(--navbar-offset)+28px)]">
        <RevealOnScroll className="grid gap-2 max-md:px-4 md:gap-3">
          <p className="m-0 text-[0.76rem] font-bold uppercase tracking-[0.2em] text-blue-600">
            {copy.eyebrow}
          </p>
          <p
            className="m-0 text-[0.92rem] leading-[1.78] text-slate-600 md:text-[1rem] md:leading-[1.9]"
            data-projects-muted="true"
          >
            {pageDescription}
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="grid gap-4">
          <div className="grid gap-1 max-md:pl-4">
            <div className="flex items-end gap-2">
              <h2 className="m-0 text-[1.2rem] font-bold text-[var(--text-h)] md:text-[1.38rem]">
                {copy.featuredLabel}
              </h2>
              <p
                className="m-0 text-[0.8rem] leading-none text-slate-400 md:text-sm"
                data-projects-secondary="true"
              >
                Featured
              </p>
            </div>
          </div>

          <ProjectDetailGrid
            project={featuredProject}
            labels={copy.labels}
            projectTypeLabel={getProjectTypeLabel(featuredProject.type)}
            media={<FeaturedProjectCarousel project={featuredProject} />}
          />
        </RevealOnScroll>

        <RevealOnScroll className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="grid gap-1 max-md:pl-4">
              <div className="flex items-end gap-2">
                <h2 className="m-0 text-[1.2rem] font-bold text-[var(--text-h)] md:text-[1.38rem]">
                  {copy.allProjectsLabel}
                </h2>
                <p
                  className="m-0 text-[0.8rem] leading-none text-slate-400 md:text-sm"
                  data-projects-secondary="true"
                >
                  {projects.length}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap border border-slate-200 px-4 py-2 rounded-full items-center gap-2">
              <span
                className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
                data-projects-secondary="true"
              >
                {copy.sortLabel}
              </span>
              {(['latest', 'oldest', 'importance'] as ProjectSortKey[]).map((option) => {
                const isActive = sortKey === option
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSortKey(option)}
                    data-projects-sort={isActive ? 'active' : 'inactive'}
                    className={`rounded-full border px-3.5 py-0.5 text-[0.8rem] font-semibold transition-colors duration-200 focus-visible:outline-none ${
                      isActive
                        ? 'border-blue-600/15 bg-blue-600/10 text-blue-700'
                        : 'border-slate-900/10 bg-white/82 text-slate-700 hover:border-blue-600/18 hover:text-blue-700'
                    }`}
                  >
                    {copy.sortOptions[option]}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sortedProjects.map((project) => (
              <RevealOnScroll
                key={project.id}
                className="grid"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProjectId(project.id)}
                  className="grid overflow-hidden rounded-[26px] border border-slate-900/8 bg-white/95 p-3.5 text-left shadow-[0_22px_54px_rgba(15,23,42,0.07)] transition-transform duration-200 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none md:p-4"
                  data-projects-surface="card"
                >
                  <div
                    className="overflow-hidden rounded-[18px] border border-slate-900/6 bg-slate-100 aspect-[16/9]"
                    data-projects-cover="true"
                  >
                    <ProjectCover project={project} />
                  </div>

                  <div className="grid gap-3 pt-3 md:h-full md:[grid-template-rows:auto_auto_auto_auto_auto]">
                    <div className="flex flex-wrap content-start items-start gap-2 md:min-h-[38px]">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[0.7rem] font-semibold ${
                          project.type === 'individual'
                            ? 'bg-amber-400/18 text-amber-700'
                            : 'bg-blue-600/10 text-blue-700'
                        }`}
                        data-projects-type-badge={project.type}
                      >
                        {getProjectTypeLabel(project.type)}
                      </span>
                      {project.type === 'team' && project.teamSize ? (
                        <span
                          className="inline-flex items-center rounded-full border border-slate-900/8 bg-slate-900/4 px-3 py-1 text-[0.7rem] font-semibold text-slate-700"
                          data-projects-contribution-badge="true"
                        >
                          {language === 'ko' ? `${project.teamSize}인 팀` : `${project.teamSize}-person team`}
                        </span>
                      ) : null}
                      <span
                        className="inline-flex items-center rounded-full border border-slate-900/8 bg-slate-900/4 px-3 py-1 text-[0.7rem] font-semibold text-slate-700"
                        data-projects-contribution-badge="true"
                      >
                        {copy.labels.contribution} {project.contributionRate}%
                      </span>
                    </div>

                    <div className="grid content-start gap-1 md:min-h-[64px]">
                      <h3 className="m-0 text-[1.08rem] font-bold leading-[1.08] tracking-[-0.04em] text-[var(--text-h)] md:min-h-[40px]">
                        <span className="flex items-start gap-2">
                        {project.hasAward ? (
                          <img
                            src={awardIcon}
                            alt=""
                            aria-hidden="true"
                            className="h-5 w-5 shrink-0 object-contain"
                          />
                        ) : null}
                          <span className="[display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                            {project.title}
                          </span>
                        </span>
                      </h3>
                      <p
                        className="m-0 overflow-hidden text-[0.82rem] leading-[1.7] text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] md:min-h-[44px]"
                        data-projects-muted="true"
                      >
                        {project.summary}
                      </p>
                    </div>

                    <div className="grid content-start gap-1.5 md:min-h-[62px]">
                      <p className="m-0 text-[0.78rem] leading-[1.6] text-slate-700" data-projects-meta="true">
                        <strong>{copy.labels.period}</strong> {project.period}
                      </p>
                      <p className="m-0 text-[0.78rem] leading-[1.6] text-slate-700" data-projects-meta="true">
                        <strong>{copy.labels.role}</strong> {project.role}
                      </p>
                    </div>

                    <ProjectCardStacks stacks={project.stacks} />
                  </div>
                </button>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>
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
                  className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-400 transition-colors duration-200 hover:border-blue-600 hover:text-blue-600 focus-visible:border-blue-600 focus-visible:text-blue-600 focus-visible:outline-none"
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
                    labels={copy.labels}
                    projectTypeLabel={getProjectTypeLabel(selectedProject.type)}
                    media={<FeaturedProjectCarousel project={selectedProject} />}
                  />
                </div>
            </div>
          </div>
        </div>
      ) : null}
      <Footer />
    </main>
  )
}

export default ProjectsPage
