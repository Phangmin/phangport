import androidStudioIcon from '../assets/skillsicons/andriod-studio-icon.png'
import bootstrapIcon from '../assets/skillsicons/bootstrap-icon.png'
import djangoIcon from '../assets/skillsicons/django-icon.png'
import electronIcon from '../assets/skillsicons/electron-icon.png'
import figmaIcon from '../assets/skillsicons/firma-icon.svg'
import gitIcon from '../assets/skillsicons/git-icon.png'
import githubIcon from '../assets/icons/github-icon.png'
import gitlabIcon from '../assets/skillsicons/gitlab-icon.png'
import html5Icon from '../assets/skillsicons/html5-icon.png'
import javascriptIcon from '../assets/skillsicons/javascript-icon.png'
import jiraIcon from '../assets/skillsicons/jira-icon.png'
import kotlinIcon from '../assets/skillsicons/kotlin-icon.png'
import mattermostIcon from '../assets/skillsicons/mattermost-icon.webp'
import microsoftTeamsIcon from '../assets/skillsicons/microsoftteams-icon.png'
import mysqlIcon from '../assets/skillsicons/mysql-icon.png'
import neonIcon from '../assets/skillsicons/neon-icon.webp'
import nextjsIcon from '../assets/skillsicons/nextjs-icon.png'
import notionIcon from '../assets/icons/notion-icon.webp'
import piniaIcon from '../assets/skillsicons/pinia-icon.svg'
import postmanIcon from '../assets/skillsicons/postman-icon.svg'
import pythonIcon from '../assets/skillsicons/python-icon.png'
import reactIcon from '../assets/skillsicons/React-icon.png'
import sqlite3Icon from '../assets/skillsicons/sqlite3-icon.svg'
import swaggerIcon from '../assets/skillsicons/swagger-icon.png'
import tailwindIcon from '../assets/skillsicons/tailwind-icon.png'
import typescriptIcon from '../assets/skillsicons/typescript-icon.png'
import vercelIcon from '../assets/skillsicons/vercel-icon.png'
import viteIcon from '../assets/skillsicons/vite-icon.png'
import vueIcon from '../assets/skillsicons/vue-icon.png'
import type { LanguageCode } from '../hooks/useLanguage'

export type SkillLabel = string

export type SkillsTabId = 'language' | 'frontend' | 'backend' | 'database' | 'etc'

export type SkillItem = {
  label: SkillLabel
  description: string
}

export type SkillsTab = {
  id: SkillsTabId
  label: string
  title: string
  summary: string
  items: SkillItem[]
}

export type SkillsSectionCopy = {
  sectionLabel: string
  heading: string
  description: string
  tabs: SkillsTab[]
}

export type SkillGroup = {
  title: string
  items: SkillLabel[]
}

export type HeroOrbitSkillPreset = {
  label: SkillLabel
  icon: string
  positionClass: string
}

const SKILL_ICON_MAP: Record<string, string> = {
  React: reactIcon,
  'React Native': reactIcon,
  'Vue.js': vueIcon,
  'Next.js': nextjsIcon,
  Vite: viteIcon,
  Pinia: piniaIcon,
  HTML: html5Icon,
  JavaScript: javascriptIcon,
  TypeScript: typescriptIcon,
  'Bootstrap CSS': bootstrapIcon,
  'Tailwind CSS': tailwindIcon,
  Figma: figmaIcon,
  Django: djangoIcon,
  Python: pythonIcon,
  Swagger: swaggerIcon,
  Postman: postmanIcon,
  Electron: electronIcon,
  Git: gitIcon,
  GitHub: githubIcon,
  GitLab: gitlabIcon,
  SQLite3: sqlite3Icon,
  MySQL: mysqlIcon,
  NeonDB: neonIcon,
  'Android Studio': androidStudioIcon,
  Kotlin: kotlinIcon,
  Jira: jiraIcon,
  Notion: notionIcon,
  Mattermost: mattermostIcon,
  'Microsoft Teams': microsoftTeamsIcon,
  Vercel: vercelIcon,
}

export function getSkillIconSrc(label: string) {
  return SKILL_ICON_MAP[label]
}

export const heroOrbitSkills: HeroOrbitSkillPreset[] = [
  { icon: reactIcon, label: 'React', positionClass: 'left-[8%] top-[17%]' },
  { icon: typescriptIcon, label: 'TypeScript', positionClass: 'right-[10%] top-[12%]' },
  { icon: nextjsIcon, label: 'Next.js', positionClass: 'right-[4%] top-[44%]' },
  { icon: tailwindIcon, label: 'Tailwind CSS', positionClass: 'right-[18%] bottom-[10%]' },
  { icon: viteIcon, label: 'Vite', positionClass: 'left-[16%] bottom-[9%]' },
  { icon: neonIcon, label: 'NeonDB', positionClass: 'left-[2%] top-[50%]' },
  { icon: vercelIcon, label: 'Vercel', positionClass: 'left-[22%] top-[2%]' },
]

export const aboutSkillGroups: SkillGroup[] = [
  {
    title: 'Frontend Core',
    items: ['React', 'Vue.js', 'Next.js', 'Vite', 'HTML', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'State & Styling',
    items: ['Zustand', 'Bootstrap CSS', 'Tailwind CSS', 'Figma'],
  },
  {
    title: 'Backend & API',
    items: ['Python', 'Django', 'REST API', 'Swagger', 'Postman'],
  },
  {
    title: 'Database',
    items: ['SQLite3', 'MySQL', 'NeonDB'],
  },
  {
    title: 'Mobile',
    items: ['Android Studio', 'Kotlin', 'React Native'],
  },
  {
    title: 'Desktop App',
    items: ['Electron'],
  },
  {
    title: 'Version Control',
    items: ['Git', 'GitHub', 'GitLab'],
  },
  {
    title: 'Collaboration',
    items: ['Jira', 'Notion', 'Mattermost', 'Microsoft Teams'],
  },
  {
    title: 'Deployment',
    items: ['Vercel'],
  },
]

export const skillsSectionCopyByLanguage: Record<LanguageCode, SkillsSectionCopy> = {
  ko: {
    sectionLabel: 'Skills',
    heading: '다음과 같은 기술들을 경험했어요',
    description: '사용한 기술을 나열하기보다, 어떤 맥락에서 연결해 썼는지 중심으로 정리해두었어요.',
    tabs: [
      {
        id: 'language',
        label: 'Language',
        title: 'Language Stack',
        summary: '화면과 서비스의 기본 구조를 만들 때 사용하는 언어들입니다.',
        items: [
          { label: 'HTML', description: '정보 구조와 의미를 분명하게 잡기 위한 마크업의 기준으로 사용합니다.' },
          { label: 'JavaScript', description: '상호작용과 상태 흐름을 다루는 기본 언어로 꾸준히 사용하고 있습니다.' },
          { label: 'TypeScript', description: '컴포넌트 계약과 데이터 구조를 더 명확하게 유지하기 위해 적극적으로 사용합니다.' },
          { label: 'Python', description: 'Django 기반 서비스와 데이터 처리 흐름을 구현할 때 사용했습니다.' },
          { label: 'Kotlin', description: 'Android Studio 기반 모바일 앱 구현 경험에서 사용했습니다.' },
        ],
      },
      {
        id: 'frontend',
        label: 'FrontEnd',
        title: 'Frontend Stack',
        summary: '기획 의도를 실제 인터페이스와 동작으로 연결할 때 가장 자주 쓰는 기술들입니다.',
        items: [
          { label: 'React', description: 'UI 구조와 상태 흐름을 안정적으로 설계하기 위한 주력 프레임워크입니다.' },
          { label: 'Next.js', description: '라우팅, 배포 구조, 실제 서비스 운영을 함께 고려해야 할 때 사용했습니다.' },
          { label: 'Vue.js', description: '프로젝트 특성에 맞춰 다른 컴포넌트 모델이 더 적합할 때 적용했습니다.' },
          { label: 'Vite', description: '빠른 개발 환경과 가벼운 프론트엔드 빌드 흐름을 위해 반복적으로 사용했습니다.' },
          { label: 'Tailwind CSS', description: '화면 단위 작업 속도를 높이면서도 시각적 일관성을 유지하는 데 사용합니다.' },
          { label: 'Bootstrap CSS', description: '빠른 MVP 구성이나 초기 레이아웃 검증이 필요한 상황에서 사용했습니다.' },
        ],
      },
      {
        id: 'backend',
        label: 'BackEnd',
        title: 'Backend & API',
        summary: '프론트엔드 뒤에서 실제 데이터와 기능을 연결할 때 사용했던 도구들입니다.',
        items: [
          { label: 'Django', description: '웹 백엔드, 관리자 기능, 서비스 로직을 직접 구현할 때 사용했습니다.' },
          { label: 'Swagger', description: 'API 구조를 확인하고 프론트엔드 연동 전에 흐름을 정리하는 데 활용했습니다.' },
          { label: 'Postman', description: '엔드포인트 테스트와 요청/응답 검증을 위해 실무적으로 사용했습니다.' },
        ],
      },
      {
        id: 'database',
        label: 'Database',
        title: 'Database',
        summary: '서비스 데이터 구조를 다루고 검증할 때 사용한 데이터베이스들입니다.',
        items: [
          { label: 'MySQL', description: '실제 서비스형 프로젝트에서 주요 관계형 데이터베이스로 사용했습니다.' },
          { label: 'SQLite3', description: '가벼운 프로토타입이나 빠른 검증이 필요한 초기 프로젝트에서 사용했습니다.' },
          { label: 'NeonDB', description: '현재 포트폴리오 프로젝트를 포함한 개인 프로젝트에서 서버리스 Postgres 기반 데이터 저장소로 사용하고 있습니다.' },
        ],
      },
      {
        id: 'etc',
        label: 'ETC',
        title: 'ETC Stack',
        summary: '디자인, 협업, 배포, 버전 관리, 데스크톱 확장까지 포함한 주변 도구들입니다.',
        items: [
          { label: 'Figma', description: '화면 구조와 사용자 흐름을 정리하고 구현 전 기획 의도를 시각화할 때 사용합니다.' },
          { label: 'Git', description: '코드 변경 이력과 브랜치 기반 작업 흐름을 관리하는 기본 도구로 사용합니다.' },
          { label: 'GitHub', description: '저장소 운영과 협업 기록 관리에 꾸준히 사용했습니다.' },
          { label: 'GitLab', description: '프로젝트 환경에 따라 다른 저장소 체계가 필요할 때 유연하게 사용했습니다.' },
          { label: 'Jira', description: '작업 단위를 이슈 기준으로 나누고 일정 흐름을 관리하는 데 사용했습니다.' },
          { label: 'Notion', description: '문서 정리, 회의 기록, 기획 메모 공유를 위해 사용했습니다.' },
          { label: 'Mattermost', description: '팀 커뮤니케이션과 프로젝트 진행 상황 공유에 사용했습니다.' },
          { label: 'Microsoft Teams', description: '조직 단위 협업 환경에서 커뮤니케이션 도구로 사용했습니다.' },
          { label: 'Electron', description: '웹 경험을 데스크톱 앱 형태로 확장하는 프로젝트에서 사용했습니다.' },
          { label: 'Vercel', description: '프론트엔드 프로젝트의 배포와 프리뷰 검증을 위해 사용했습니다.' },
        ],
      },
    ],
  },
  en: {
    sectionLabel: 'Skills',
    heading: 'What matters is not how many tools I know, but how I connect them in real work',
    description:
      'Instead of listing tools on their own, this section shows how I have applied them across real projects and delivery contexts. The tabbed structure makes it easier to scan only the areas you care about.',
    tabs: [
      {
        id: 'language',
        label: 'Language',
        title: 'Language Stack',
        summary: 'The core languages behind the interfaces and services I build.',
        items: [
          { label: 'HTML', description: 'Used to build semantic structure and readable information hierarchy.' },
          { label: 'JavaScript', description: 'Used as the base language for interaction and UI flow control.' },
          { label: 'TypeScript', description: 'Used to keep component contracts and data structures explicit.' },
          { label: 'Python', description: 'Used in Django-based products and data-related workflows.' },
          { label: 'Kotlin', description: 'Used for Android Studio based mobile app implementation.' },
        ],
      },
      {
        id: 'frontend',
        label: 'FrontEnd',
        title: 'Frontend Stack',
        summary: 'The tools I use most when turning product intent into interface behavior.',
        items: [
          { label: 'React', description: 'My primary frontend framework for structuring UI and state flow.' },
          { label: 'Next.js', description: 'Used when routing, production structure, and service delivery matter.' },
          { label: 'Vue.js', description: 'Used when project context called for a different component model.' },
          { label: 'Vite', description: 'Used to keep the frontend build setup fast and lightweight.' },
          { label: 'Tailwind CSS', description: 'Used to move quickly while keeping visual consistency across screens.' },
          { label: 'Bootstrap CSS', description: 'Used in early-stage MVP work and fast layout validation.' },
        ],
      },
      {
        id: 'backend',
        label: 'BackEnd',
        title: 'Backend & API',
        summary: 'The tools I have used to connect interfaces with real data and endpoints.',
        items: [
          { label: 'Django', description: 'Used to build web backends, admin features, and service logic.' },
          { label: 'Swagger', description: 'Used to inspect and organize API structure before frontend integration.' },
          { label: 'Postman', description: 'Used for endpoint testing and request/response validation.' },
        ],
      },
      {
        id: 'database',
        label: 'Database',
        title: 'Database',
        summary: 'The databases I have worked with while shaping product data structures.',
        items: [
          { label: 'MySQL', description: 'Used as the main relational database in service-oriented projects.' },
          { label: 'SQLite3', description: 'Used for lighter prototypes and smaller scoped applications.' },
          { label: 'NeonDB', description: 'Used as the serverless Postgres datastore for this portfolio and other personal projects.' },
        ],
      },
      {
        id: 'etc',
        label: 'ETC',
        title: 'ETC Stack',
        summary: 'Tools for design, deployment, collaboration, version control, and desktop delivery.',
        items: [
          { label: 'Figma', description: 'Used to organize interface structure and visualize product intent before implementation.' },
          { label: 'Git', description: 'Used as the baseline for version control and branch-based workflows.' },
          { label: 'GitHub', description: 'Used for repository management and collaboration history.' },
          { label: 'GitLab', description: 'Used when project context required a different repository environment.' },
          { label: 'Jira', description: 'Used to structure tasks and track delivery flow through issues.' },
          { label: 'Notion', description: 'Used to organize planning notes, meeting records, and documentation.' },
          { label: 'Mattermost', description: 'Used for team communication in project environments.' },
          { label: 'Microsoft Teams', description: 'Used in organization-based collaboration settings.' },
          { label: 'Electron', description: 'Used in projects that expanded beyond the web into desktop apps.' },
          { label: 'Vercel', description: 'Used for deployment and preview validation of frontend projects.' },
        ],
      },
    ],
  },
}
