import type { LanguageCode } from '../hooks/useLanguage'
import { projectsByLanguage, type ProjectPageProject } from './projects'

type HeroContent = {
  eyebrow: string
  title: [string, string]
  description: [string, string]
  primaryCta: string
  secondaryCta: string
  scrollLabel: string
  portraitAlt: string
}

export type ProjectItem = {
  id?: string
  title: string
  period: string
  role: string
  description: string
  stacks?: string[]
  imageSrc?: string
  backgroundUrl?: string
  coverLabel?: string
  coverGradientFrom?: string
  coverGradientTo?: string
}

export type ProjectsContent = {
  sectionLabel: string
  heading: string
  summary: string
  detailCta: string
  allProjectsCta: string
  swipeHint: string
  projects: ProjectItem[]
}

function toHomeProjectItem(project: ProjectPageProject): ProjectItem {
  return {
    ...(project.id ? { id: project.id } : {}),
    title: project.title,
    period: project.period,
    role: project.role,
    description: project.summary,
    ...(project.stacks ? { stacks: project.stacks } : {}),
    ...(project.imageSrc ? { imageSrc: project.imageSrc } : {}),
    ...(project.backgroundUrl ? { backgroundUrl: project.backgroundUrl } : {}),
    ...(project.coverLabel ? { coverLabel: project.coverLabel } : {}),
    ...(project.coverGradientFrom ? { coverGradientFrom: project.coverGradientFrom } : {}),
    ...(project.coverGradientTo ? { coverGradientTo: project.coverGradientTo } : {}),
  }
}

function getLatestFirstProjects(projects: ProjectPageProject[]) {
  return [...projects].sort((left, right) => right.endedAt.localeCompare(left.endedAt))
}

export const heroContent: Record<LanguageCode, HeroContent> = {
  ko: {
    eyebrow: '보이지 않는 비효율을 찾아 서비스의 가치를 만듭니다',
    title: ["Gwangmin's", 'Workspace'],
    description: [
      '복잡한 과정을 단순한 화면 구조로 개선하고, 서비스 기획과 개발을 연결하는 서비스를 지향합니다.',
      '단순한 기능 추가를 넘어서 현장의 문제를 근본적으로 해결하는 직관적인 경험을 만드는 데 집중합니다.',
    ],
    primaryCta: '프로젝트 보기',
    secondaryCta: '대화 시작하기',
    scrollLabel: '다음 섹션으로 이동',
    portraitAlt: '천광민 프로필 사진',
  },
  en: {
    eyebrow: 'I uncover hidden inefficiencies and turn them into product value.',
    title: ["Gwangmin's", 'Workspace'],
    description: [
      'I simplify complex workflows into clear interfaces and connect product planning with implementation.',
      'I focus on building intuitive experiences that solve real operational problems, not just add features.',
    ],
    primaryCta: 'View Projects',
    secondaryCta: 'Start a Conversation',
    scrollLabel: 'Scroll to next section',
    portraitAlt: 'Portrait of Gwangmin',
  },
}

export const projectsContent: Record<LanguageCode, ProjectsContent> = {
  ko: {
    sectionLabel: 'Projects',
    heading: '',
    summary: '기획 의도와 구현 디테일 사이를 연결하면서, 사용자가 흐름을 자연스럽게 따라가도록 화면을 구성합니다.',
    detailCta: '자세히 보기',
    allProjectsCta: '전체 프로젝트 보기',
    swipeHint: '좌우로 드래그하거나 스크롤해 카드 넘기기',
    projects: getLatestFirstProjects(projectsByLanguage.ko).map(toHomeProjectItem),
  },
  en: {
    sectionLabel: 'Projects',
    heading: '',
    summary: 'I bridge planning and implementation so users can move through complex flows with less friction and clearer focus.',
    detailCta: 'See Details',
    allProjectsCta: 'View All Projects',
    swipeHint: 'Drag or scroll sideways to move one card at a time',
    projects: getLatestFirstProjects(projectsByLanguage.en).map(toHomeProjectItem),
  },
}
