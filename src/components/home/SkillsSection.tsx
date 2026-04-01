import { useMemo, useState } from 'react'
import { getSkillIconSrc } from '../common/SkillBadge'
import useLanguage, { type LanguageCode } from '../../hooks/useLanguage'

type SkillsTabId = 'language' | 'frontend' | 'backend' | 'database' | 'etc'

type SkillItem = {
  label: string
  description: string
}

type SkillsTab = {
  id: SkillsTabId
  label: string
  title: string
  summary: string
  items: SkillItem[]
}

type SkillsSectionCopy = {
  sectionLabel: string
  heading: string
  description: string
  tabs: SkillsTab[]
}

const skillsSectionCopyByLanguage: Record<LanguageCode, SkillsSectionCopy> = {
  ko: {
    sectionLabel: 'Skills',
    heading: '다음과 같은 기술들을 경험했어요!',
    description:
      '사용한 방식 등에 대해 카테고리별로 정리해두었으니 편하게 살펴보세요 :)',
    tabs: [
      {
        id: 'language',
        label: 'Language',
        title: 'Language Stack',
        summary: '웹과 서비스 구현의 기본이 되는 언어들입니다.',
        items: [
          { label: 'HTML', description: '정보 구조와 시맨틱 마크업을 기준으로 화면 뼈대를 구성했습니다.' },
          { label: 'JavaScript', description: '상호작용과 상태 흐름을 제어하는 기본 언어로 꾸준히 사용했습니다.' },
          { label: 'TypeScript', description: '컴포넌트와 데이터 구조를 더 명확하게 유지하기 위해 적극적으로 사용했습니다.' },
          { label: 'Python', description: 'Django 기반 프로젝트와 데이터 처리 맥락에서 활용했습니다.' },
          { label: 'Kotlin', description: 'Android Studio 기반 모바일 앱 구현 경험에 사용했습니다.' },
        ],
      },
      {
        id: 'frontend',
        label: 'FrontEnd',
        title: 'Frontend Stack',
        summary: '사용자 경험을 실제 인터페이스로 연결할 때 주로 쓰는 기술들입니다.',
        items: [
          { label: 'React', description: '가장 익숙한 프론트엔드 프레임워크로, 상태와 UI 흐름을 구조적으로 설계했습니다.' },
          { label: 'Next.js', description: '서비스 구조화와 라우팅, 실제 운영을 고려한 프론트엔드 경험을 쌓았습니다.' },
          { label: 'Vue.js', description: '프로젝트 요구사항에 맞춰 다른 프레임워크 문법과 흐름도 유연하게 대응했습니다.' },
          { label: 'Vite', description: '빠른 개발 환경과 프론트엔드 빌드 흐름 구성에 반복적으로 사용했습니다.' },
          { label: 'Tailwind CSS', description: '컴포넌트 단위로 화면을 빠르게 정리하고 디자인 톤을 일관되게 맞췄습니다.' },
          { label: 'Bootstrap CSS', description: '빠른 MVP 구성과 구조 검증이 필요할 때 활용했습니다.' },
        ],
      },
      {
        id: 'backend',
        label: 'BackEnd',
        title: 'Backend & API',
        summary: '화면 뒤에서 데이터와 기능을 연결할 때 사용한 도구들입니다.',
        items: [
          { label: 'Django', description: '웹 서비스 백엔드와 관리자 기능, 데이터 흐름을 빠르게 구축한 경험이 있습니다.' },
          { label: 'Swagger', description: 'API 구조를 확인하고 프론트엔드 연동 전에 흐름을 정리할 때 사용했습니다.' },
          { label: 'Postman', description: '엔드포인트 테스트와 요청/응답 검증에 실무적으로 활용했습니다.' },
        ],
      },
      {
        id: 'database',
        label: 'Database',
        title: 'Database',
        summary: '서비스 데이터 구조를 저장하고 검증할 때 다뤘던 데이터베이스입니다.',
        items: [
          { label: 'MySQL', description: '실제 서비스 프로젝트에서 사용자와 도메인 데이터를 다루는 기본 DB로 사용했습니다.' },
          { label: 'SQLite3', description: '가벼운 프로젝트나 초기 프로토타입에서 빠른 구성용으로 활용했습니다.' },
        ],
      },
      {
        id: 'etc',
        label: 'ETC',
        title: 'ETC Stack',
        summary: '배포, 협업, 버전 관리, 데스크톱 앱 등 구현 바깥의 흐름까지 다루는 도구들입니다.',
        items: [
          { label: 'Figma', description: 'UI 구조와 화면 흐름을 정리하고, 구현 전 기획 의도를 시각화할 때 사용했습니다.' },
          { label: 'Git', description: '코드 변경 이력 관리와 브랜치 기반 작업 흐름에 기본적으로 사용했습니다.' },
          { label: 'GitHub', description: '프로젝트 저장소 운영과 협업 기록 관리에 사용했습니다.' },
          { label: 'GitLab', description: '외부 저장소 및 협업 환경에 맞춰 유연하게 사용했습니다.' },
          { label: 'Jira', description: '작업 단위를 이슈 기반으로 나누고 일정 흐름을 정리할 때 활용했습니다.' },
          { label: 'Notion', description: '문서 정리와 기획, 회의 기록 공유에 사용했습니다.' },
          { label: 'Mattermost', description: '팀 커뮤니케이션과 프로젝트 진행 상황 공유에 사용했습니다.' },
          { label: 'Microsoft Teams', description: '조직 협업 환경에 맞춘 커뮤니케이션 도구로 사용했습니다.' },
          { label: 'Electron', description: '데스크톱 앱 형태로 확장되는 프로젝트 구현 경험이 있습니다.' },
          { label: 'Vercel', description: '프론트엔드 프로젝트 배포와 미리보기 환경 확인에 사용했습니다.' },
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

function SkillsSection() {
  const language = useLanguage()
  const copy = skillsSectionCopyByLanguage[language]
  const [activeTabId, setActiveTabId] = useState<SkillsTabId>('frontend')

  const activeTab = useMemo(
    () => copy.tabs.find((tab) => tab.id === activeTabId) ?? copy.tabs[0]!,
    [activeTabId, copy.tabs]
  )

  return (
    <section
      id="skills"
      className="relative min-h-screen overflow-hidden bg-transparent text-slate-950 dark:text-white"
      data-home-skills-section="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.16] dark:opacity-[0.08]" />

      <div className="relative z-[1] mx-auto grid min-h-screen w-[min(1126px,calc(100%-48px))] content-center gap-8 py-[calc(var(--navbar-offset,104px)+28px)] max-md:w-[min(calc(100%-32px),1126px)] max-md:content-start max-md:gap-6 max-md:py-[calc(var(--navbar-offset,96px)+18px)] md:w-[min(1126px,calc(100%-128px))]">
        <div className="grid justify-items-center gap-3 text-center max-md:gap-2">
          <p className="m-0 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-sky-200">
            {copy.sectionLabel}
          </p>
          <h2 className="m-0 text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-slate-950 dark:text-white">
            {copy.heading}
          </h2>
          <p className="m-0 text-[0.98rem] leading-[1.82] text-slate-600 dark:text-slate-300">
            {copy.description}
          </p>
        </div>

        <div className="grid gap-4 rounded-[32px] border border-slate-900/8 bg-transparent p-4 shadow-[0_26px_80px_rgba(148,163,184,0.16)] backdrop-blur-[14px] dark:border-white/10 dark:bg-transparent dark:shadow-[0_26px_80px_rgba(2,6,23,0.3)] md:grid-cols-[180px_minmax(0,1fr)] md:gap-0 md:p-0">
          <div className="grid content-start gap-1 border-b border-slate-900/8 pb-3 md:border-b-0 md:border-r md:border-slate-900/8 md:p-5 dark:border-white/10">
            {copy.tabs.map((tab) => {
              const isActive = tab.id === activeTab.id

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center justify-between rounded-[16px] px-3 py-2.5 text-left text-[0.92rem] font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-[0_14px_34px_rgba(37,99,235,0.26)] dark:bg-sky-400 dark:text-slate-950'
                      : 'text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[0.72rem] ${isActive ? 'text-inherit/80' : 'text-slate-400 dark:text-slate-500'}`}>
                    {tab.items.length}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="grid content-start gap-5 px-1 pt-1 md:p-6">
            <div className="grid gap-2 border-b border-slate-900/8 pb-4 dark:border-white/10">
              <p className="m-0 text-[1.3rem] font-semibold tracking-[-0.04em] text-slate-950 dark:text-white">{activeTab.title}</p>
              <p className="m-0 text-[0.94rem] leading-[1.72] text-slate-600 dark:text-slate-300">{activeTab.summary}</p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {activeTab.items.map((item) => {
                const iconSrc = getSkillIconSrc(item.label)

                return (
                  <article
                    key={`${activeTab.id}-${item.label}`}
                    className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-5 rounded-[24px] border border-slate-900/8 bg-transparent p-4 transition-transform duration-200 hover:-translate-y-0.5 dark:border-white/10 dark:bg-transparent"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/70 bg-[radial-gradient(circle_at_center,rgba(49,130,246,0.16)_0%,rgba(49,130,246,0.05)_56%,transparent_72%)] shadow-[inset_0_0_0_1px_rgba(49,130,246,0.18)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/[0.03] dark:bg-white/[0.04]">
                        {iconSrc ? (
                          <img src={iconSrc} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
                        ) : (
                          <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{item.label.slice(0, 2)}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid items-center gap-1.5 text-left">
                      <h3 className="m-0 text-[1.08rem] font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">{item.label}</h3>
                      <p className="m-0 text-[0.84rem] leading-[1.68] text-left text-slate-600 dark:text-slate-300">{item.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
