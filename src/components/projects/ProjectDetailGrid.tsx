import type { ReactNode } from 'react'
import { SkillBadge } from '../common'
import type { ProjectCopyLabels, ProjectPageProject } from '../../content/projects'
import awardIcon from '../../assets/award-icon.png'
import githubIcon from '../../assets/skillsicons/github-icon.png'

type ProjectDetailGridProps = {
  project: ProjectPageProject
  labels: ProjectCopyLabels
  projectTypeLabel: string
  media: ReactNode
}

type ProjectActionLink = {
  key: 'github' | 'website' | 'download'
  href: string
  label: string
}

function ProjectDetailGrid({ project, labels, projectTypeLabel, media }: ProjectDetailGridProps) {
  const resultLabel = labels.result ?? (labels.period === 'Period' ? 'Outcome' : '결과')
  const missionItems = Array.isArray(project.contribution) ? project.contribution : [project.contribution]
  const troubleshootingItems = Array.isArray(project.troubleshooting)
    ? project.troubleshooting
    : [project.troubleshooting]
  const resultItems = project.results ?? []
  const actionLinks = [
    { key: 'github', href: project.githubUrl?.trim(), label: labels.github },
    { key: 'website', href: project.websiteUrl?.trim(), label: labels.website },
    { key: 'download', href: project.downloadUrl?.trim(), label: labels.download },
  ].filter((link): link is ProjectActionLink => Boolean(link.href))

  function renderActionIcon(key: ProjectActionLink['key']) {
    if (key === 'github') {
      return <img src={githubIcon} alt="" aria-hidden="true" className="h-4 w-4 object-contain" />
    }

    if (key === 'website') {
      return (
        <span aria-hidden="true" className="text-[0.95rem] leading-none">
          🌐
        </span>
      )
    }

    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none">
        <path
          d="M12 4v10m0 0 4-4m-4 4-4-4M5 18h14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <div
      className="grid overflow-hidden rounded-[30px] border border-slate-900/8 bg-white/95 p-4 shadow-[0_28px_68px_rgba(15,23,42,0.08)] md:gap-6 md:rounded-[34px] md:p-6"
      data-projects-surface="featured"
    >
      <section className="grid gap-8 pb-6 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] xl:items-stretch">
        <div className="min-w-0">{media}</div>

        <div className="grid min-w-0 gap-5 xl:h-full xl:grid-rows-[auto_auto_minmax(0,1fr)]">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[0.74rem] font-semibold ${
                project.type === 'individual'
                  ? 'bg-amber-400/18 text-amber-700'
                  : 'bg-blue-600/10 text-blue-700'
              }`}
              data-projects-type-badge={project.type}
            >
              {projectTypeLabel}
            </span>
            {project.type === 'team' && project.teamSize ? (
              <span
                className="inline-flex items-center rounded-full border border-slate-900/8 bg-slate-900/4 px-3 py-1 text-[0.74rem] font-semibold text-slate-700"
                data-projects-contribution-badge="true"
              >
                {labels.team === '팀 프로젝트' ? `${project.teamSize}인 팀` : `${project.teamSize}-person team`}
              </span>
            ) : null}
            <span
              className="inline-flex items-center rounded-full border border-slate-900/8 bg-slate-900/4 px-3 py-1 text-[0.74rem] font-semibold text-slate-700"
              data-projects-contribution-badge="true"
            >
              {labels.contribution} {project.contributionRate}%
            </span>
            {actionLinks.map((link) => (
              <a
                key={`${project.id}-${link.key}`}
                href={link.href}
                target={link.key === 'download' ? undefined : '_blank'}
                rel={link.key === 'download' ? undefined : 'noreferrer noopener'}
                download={link.key === 'download' ? true : undefined}
                aria-label={link.label}
                title={link.label}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-900/10 bg-white text-slate-700 transition-colors duration-200 hover:border-blue-600/20 hover:text-blue-700 focus-visible:border-blue-600/20 focus-visible:text-blue-700 focus-visible:outline-none"
                data-projects-action="true"
              >
                {renderActionIcon(link.key)}
              </a>
            ))}
          </div>

          <div className="grid gap-3">
            <h2 className="m-0 flex min-w-0 items-center gap-2 text-[clamp(1.55rem,4.6vw,2.5rem)] font-bold leading-[0.98] tracking-[-0.05em] text-[var(--text-h)]">
              {project.hasAward ? (
                <img
                  src={awardIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 object-contain md:h-8 md:w-8"
                />
              ) : null}
              <span className="min-w-0 break-words font-bold">{project.title}</span>
            </h2>
            <p
              className="m-0 text-[0.92rem] leading-[1.75] text-slate-600 md:text-[1rem]"
              data-projects-muted="true"
            >
              {project.summary}
            </p>
          </div>

          <div
            className="grid h-full content-center gap-3 rounded-[24px] border border-slate-900/8 bg-slate-900/[0.02] p-4 md:p-5"
            data-projects-featured-meta="true"
          >
            <div className="grid h-full items-center gap-3 sm:grid-cols-2">
              <div className="grid gap-1">
                <p
                  className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
                  data-projects-secondary="true"
                >
                  {labels.period}
                </p>
                <p className="m-0 text-[0.92rem] text-slate-800" data-projects-meta="true">
                  {project.period}
                </p>
              </div>
              <div className="grid gap-1">
                <p
                  className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
                  data-projects-secondary="true"
                >
                  {labels.role}
                </p>
                <p className="m-0 text-[0.92rem] text-slate-800" data-projects-meta="true">
                  {project.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-0 divide-y divide-slate-900/8" data-projects-featured-list="true">
        <div className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
          <p
            className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
            data-projects-secondary="true"
          >
            {labels.stack}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stacks.map((stack) => (
              <SkillBadge key={`${project.id}-${stack}`} label={stack} />
            ))}
          </div>
        </div>

        <div className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
          <p
            className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
            data-projects-secondary="true"
          >
            {labels.introduction}
          </p>
          <p className="m-0 text-[0.88rem] leading-[1.74] text-slate-700" data-projects-body="true">
            {project.introduction}
          </p>
        </div>

        <div className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
          <p
            className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
            data-projects-secondary="true"
          >
            {labels.mission}
          </p>
          <ul
            className="grid list-disc gap-2 pl-[1.2rem] text-[0.88rem] leading-[1.72] text-slate-700 marker:text-slate-500"
            data-projects-body="true"
          >
            {missionItems.map((mission) => (
              <li key={`${project.id}-${mission}`}>{mission}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
          <p
            className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
            data-projects-secondary="true"
          >
            {labels.features}
          </p>
          <ul
            className="grid list-disc gap-2 pl-[1.2rem] text-[0.88rem] leading-[1.72] text-slate-700 marker:text-slate-500"
            data-projects-body="true"
          >
            {project.features.map((feature) => (
              <li key={`${project.id}-${feature}`}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
          <p
            className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
            data-projects-secondary="true"
          >
            {labels.troubleshooting}
          </p>
          <ul
            className="grid list-disc gap-2 pl-[1.2rem] text-[0.88rem] leading-[1.72] text-slate-700 marker:text-slate-500"
            data-projects-body="true"
          >
            {troubleshootingItems.map((troubleshooting) => (
              <li key={`${project.id}-${troubleshooting}`}>{troubleshooting}</li>
            ))}
          </ul>
        </div>

        {resultItems.length ? (
          <div className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
            <p
              className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400"
              data-projects-secondary="true"
            >
              {resultLabel}
            </p>
            <ul
              className="grid list-disc gap-2 pl-[1.2rem] text-[0.88rem] leading-[1.72] text-slate-700 marker:text-slate-500"
              data-projects-body="true"
            >
              {resultItems.map((result) => (
                <li key={`${project.id}-${result}`}>{result}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ProjectDetailGrid
