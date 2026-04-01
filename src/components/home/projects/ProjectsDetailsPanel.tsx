import { Link } from 'react-router-dom'
import type { ProjectItem } from '../../../content/home'
import { SkillBadge } from '../../common'

type ProjectsDetailsPanelProps = {
  sectionLabel: string
  detailCta: string
  allProjectsCta: string
  activeProject: ProjectItem
  focusedIndex: number
  isDark: boolean
  onDetailOpen: () => void
}

function ProjectsDetailsPanel({
  sectionLabel,
  detailCta,
  allProjectsCta,
  activeProject,
  focusedIndex,
  isDark,
  onDetailOpen,
}: ProjectsDetailsPanelProps) {
  const stacks = activeProject.stacks ?? []
  const allProjectsLinkTone = isDark
    ? 'text-sky-300 hover:text-sky-200'
    : 'text-[#3182f6] hover:text-blue-700'

  return (
    <>
      <div
        data-home-projects-details-mobile="true"
        className="grid gap-2 rounded-[24px] border border-white/10 bg-white/8 p-4 text-left shadow-[0_24px_56px_rgba(2,6,23,0.18)] backdrop-blur-sm lg:hidden"
      >
        <span
          data-home-projects-card-badge="true"
          className="inline-flex h-10 w-10 items-center justify-center justify-self-center rounded-full bg-white/12 text-[0.86rem] font-bold !text-white"
        >
          {String(focusedIndex + 1).padStart(2, '0')}
        </span>
        <div className="grid gap-2">
          <h3
            data-home-projects-title-inverse="true"
            className="m-0 text-[1.35rem] leading-[1] tracking-[-0.05em] text-white"
          >
            {activeProject.title}
          </h3>
          <p
            data-home-projects-period-pill="true"
            className="m-0 w-fit rounded-full bg-white/10 px-4 py-1.5 text-sm leading-[1] tracking-[-0.05em] text-white"
          >
            {activeProject.period}
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3.5 py-[0.4rem] text-[0.78rem] font-semibold text-slate-100">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill="none">
            <path
              d="M8 7V5.8C8 4.806 8.806 4 9.8 4h4.4C15.194 4 16 4.806 16 5.8V7M5 9.2h14M7.2 20h9.6C17.791 20 18.6 19.191 18.6 18.2V8.8C18.6 7.806 17.791 7 16.8 7H7.2C6.209 7 5.4 7.806 5.4 8.8v9.4C5.4 19.191 6.209 20 7.2 20Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {activeProject.role}
        </span>
        <p
          data-home-projects-muted-inverse="true"
          className="m-0 text-[0.84rem] leading-[1.65] text-slate-200/84"
        >
          {activeProject.description}
        </p>
        {stacks.length ? (
          <div className="mt-1 flex flex-wrap justify-start gap-2">
            {stacks.map((stack) => (
              <SkillBadge
                key={`mobile-project-stack-${stack}`}
                label={stack}
                className="bg-white/10 text-slate-100 ring-1 ring-white/10"
              />
            ))}
          </div>
        ) : null}
        <div className="mt-2 flex w-full items-center justify-between gap-3">
          <button
            type="button"
            onClick={onDetailOpen}
            data-home-projects-cta="true"
            className="inline-flex items-center justify-center rounded-full border border-white/80 bg-transparent px-5 py-[0.34rem] text-[0.86rem] font-bold tracking-[-0.01em] text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-white hover:text-slate-900 hover:shadow-[0_22px_46px_rgba(2,6,23,0.22)]"
          >
            {detailCta}
          </button>
          <Link
            to="/projects"
            className={`inline-flex items-center gap-1.5 text-[0.8rem] font-semibold no-underline transition-colors duration-200 ${allProjectsLinkTone}`}
          >
            <span>{allProjectsCta}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="hidden lg:relative lg:z-10 lg:grid lg:justify-items-start lg:gap-3 lg:text-left">
        <p
          data-home-projects-label="true"
          className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-blue-200"
        >
          {sectionLabel}
        </p>
        <span
          data-home-projects-card-badge="true"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/12 text-[0.86rem] font-bold !text-white"
        >
          {String(focusedIndex + 1).padStart(2, '0')}
        </span>
        <div className="flex w-full max-w-[720px] items-end gap-4">
          <h2
            data-home-projects-title-inverse="true"
            className="m-0 min-w-0 text-[clamp(2rem,4vw,3.4rem)] leading-[0.98] tracking-[-0.05em] !text-white"
          >
            {activeProject.title}
          </h2>
          <p
            data-home-projects-period-pill="true"
            className="m-0 shrink-0 pb-[0.18rem] text-[0.9rem] leading-none tracking-[-0.03em] text-white/78"
          >
            {activeProject.period}
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-[0.4rem] text-[0.82rem] font-semibold text-slate-100">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill="none">
            <path
              d="M8 7V5.8C8 4.806 8.806 4 9.8 4h4.4C15.194 4 16 4.806 16 5.8V7M5 9.2h14M7.2 20h9.6C17.791 20 18.6 19.191 18.6 18.2V8.8C18.6 7.806 17.791 7 16.8 7H7.2C6.209 7 5.4 7.806 5.4 8.8v9.4C5.4 19.191 6.209 20 7.2 20Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {activeProject.role}
        </span>
        <p
          data-home-projects-muted-inverse="true"
          className="m-0 max-w-[560px] text-[0.95rem] leading-[1.75] text-slate-200/80"
        >
          {activeProject.description}
        </p>
        {stacks.length ? (
          <div className="mt-1 flex max-w-[560px] flex-wrap justify-start gap-2">
            {stacks.map((stack) => (
              <SkillBadge
                key={`desktop-project-stack-${stack}`}
                label={stack}
                className="bg-white/10 text-slate-100 ring-1 ring-white/10"
              />
            ))}
          </div>
        ) : null}
        <div className="mt-2 flex w-full max-w-[560px] items-center justify-between gap-4">
          <button
            type="button"
            onClick={onDetailOpen}
            data-home-projects-cta="true"
            className="inline-flex min-w-[148px] items-center justify-center rounded-full border border-white/80 bg-transparent px-[22px] py-[11px] text-[0.92rem] font-bold tracking-[-0.01em] text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-white hover:text-slate-900 hover:shadow-[0_22px_46px_rgba(2,6,23,0.22)]"
          >
            {detailCta}
          </button>
          <Link
            to="/projects"
            className={`inline-flex items-center gap-1.5 text-[0.9rem] font-semibold no-underline transition-colors duration-200 ${allProjectsLinkTone}`}
          >
            <span>{allProjectsCta}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ProjectsDetailsPanel
