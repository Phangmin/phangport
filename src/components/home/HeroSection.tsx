import { useEffect, useState } from 'react'
import nextjsIcon from '../../assets/skillsicons/nextjs-icon.png'
import reactIcon from '../../assets/skillsicons/react-icon.webp'
import tailwindIcon from '../../assets/skillsicons/tailwind-icon.png'
import typescriptIcon from '../../assets/skillsicons/typescript-icon.png'
import vercelIcon from '../../assets/skillsicons/vercel-icon.png'
import viteIcon from '../../assets/skillsicons/vite-icon.png'
import neonIcon from '../../assets/skillsicons/neon-icon.webp'
import { experiencesPageContentByLanguage } from '../../content/experiences'
import { projectsByLanguage } from '../../content/projects'
import useLanguage, { type LanguageCode } from '../../hooks/useLanguage'
import { ScrollIndicator } from '../common'
import { getResolvedTheme, type ThemeMode } from '../common/theme'
import HeroShowcaseContent from './hero-showcase/HeroShowcaseContent'
import HeroShowcaseVisual, { HeroShowcaseMobileProfileCard } from './hero-showcase/HeroShowcaseVisual'
import { scrollToNextSection, wrapIndex } from './hero-showcase/utils'

type ShowcaseMetric = {
  value: string
  label: string
}

type ShowcaseFocus = {
  label: string
  detail: string
}

type ShowcaseContent = {
  eyebrow: string
  title: [string, string]
  description: string
  primaryCta: string
  secondaryCta: string
  scrollLabel: string
  portraitAlt: string
  profileName: string
  profileSecondaryName: string
  profileRole: string
  profileSummary: string
  profileHint: string
  profileBackTitle: string
  profileStrengthTitle: string
  capabilityLabel: string
  stack: string[]
  metrics: ShowcaseMetric[]
  focus: ShowcaseFocus[]
  systemLabel: string
  systemTitle: string
  systemSummary: string
  deliveryLabel: string
  deliveryTitle: string
  deliverySummary: string
  craftLabel: string
  craftSummary: string
  mobileSummaryLabel: string
  mobileSummaryTitle: string
  mobileSummaryBody: string
  liveBadge: string
  responsiveBadge: string
  dynamicBadge: string
}

type OrbitSkill = {
  icon: string
  label: string
  positionClass: string
}

type ProfileBackFact = {
  emoji: string
  label: string
  value: string
  detail: string
}

const orbitSkills: OrbitSkill[] = [
  { icon: reactIcon, label: 'React', positionClass: 'left-[8%] top-[17%]' },
  { icon: typescriptIcon, label: 'TypeScript', positionClass: 'right-[10%] top-[12%]' },
  { icon: nextjsIcon, label: 'Next.js', positionClass: 'right-[4%] top-[44%]' },
  { icon: tailwindIcon, label: 'Tailwind CSS', positionClass: 'right-[18%] bottom-[10%]' },
  { icon: viteIcon, label: 'Vite', positionClass: 'left-[16%] bottom-[9%]' },
  { icon: neonIcon, label: 'NeonDB', positionClass: 'left-[2%] top-[50%]' },
  { icon: vercelIcon, label: 'Vercel', positionClass: 'left-[22%] top-[2%]' },
]

const showcaseContent: Record<LanguageCode, ShowcaseContent> = {
  ko: {
    eyebrow: '보이지 않는 비효율을 찾아 서비스의 가치를 만듭니다',
    title: ['복잡한 흐름을', '직관적인 경험으로 바꿉니다'],
    description: '복잡한 흐름을 단순한 화면으로 정리하고, 기획과 개발을 연결해 실제 문제를 해결하는 프론트엔드를 만듭니다.',
    primaryCta: '전체 프로젝트',
    secondaryCta: '연락하기',
    scrollLabel: '다음 섹션으로 이동',
    portraitAlt: '천광민 프로필 사진',
    profileName: '천광민',
    profileSecondaryName: 'Gwangmin Cheon',
    profileRole: 'Front-end Developer',
    profileSummary: '기획과 개발을 연결해 사용자가 이해하기 쉬운 화면 흐름을 설계합니다.',
    profileHint: '클릭시 더 많은 내용을 볼 수 있습니다',
    profileBackTitle: '주로 사용하는 기술',
    profileStrengthTitle: '강점',
    capabilityLabel: '핵심 강점',
    stack: ['React', 'Next.js', 'TypeScript', 'Zustand', 'NeonDB', 'Figma'],
    metrics: [
      { value: 'Flow', label: '복잡한 흐름 단순화' },
      { value: 'PM×FE', label: '기획과 개발 연결' },
      { value: 'UX First', label: '문제 해결 중심 경험' },
    ],
    focus: [
      {
        label: '복잡한 과정을 단순한 화면 구조로 정리합니다',
        detail: '정보 우선순위를 분명하게 잡아 빠른 이해와 자연스러운 다음 행동을 만듭니다.',
      },
      {
        label: '기획 의도와 구현 디테일을 하나의 흐름으로 연결합니다',
        detail: '기획, UI 구조, 상태 설계, 구현 디테일이 하나의 흐름으로 이어지게 조율합니다.',
      },
      {
        label: '현장의 문제를 직관적인 사용자 경험으로 바꿉니다',
        detail: '기능 추가보다 실제 운영 과정의 불편과 비효율을 줄이는 경험 설계에 집중합니다.',
      },
    ],
    systemLabel: '작업 방식',
    systemTitle: '화면을 빠르게 만드는 것보다 흐름을 명확하게 설계합니다',
    systemSummary: '먼저 흐름을 정리하고, 그다음에 완성도를 더합니다.',
    deliveryLabel: '결과물 기준',
    deliveryTitle: '보기 좋은 시안보다 실제로 동작하는 프론트엔드를 만듭니다',
    deliverySummary: '컴포넌트 구조, 상태 관리, 반응형을 한 흐름으로 설계합니다.',
    craftLabel: '프로필',
    craftSummary: 'UI 방향성, 구조 설계, 상태 관리, 디테일 조정을 함께 다룹니다.',
    mobileSummaryLabel: '반응형 구조',
    mobileSummaryTitle: '모바일에서도 정보 위계가 무너지지 않는 화면을 만듭니다',
    mobileSummaryBody: '작은 화면에서도 핵심 메시지가 먼저 읽히도록 카드 흐름을 다시 설계합니다.',
    liveBadge: '활성',
    responsiveBadge: '반응형',
    dynamicBadge: '동적 전환',
  },
  en: {
    eyebrow: 'I uncover hidden inefficiencies and turn them into product value.',
    title: ['I simplify complex flows', 'into intuitive experiences'],
    description:
      'I turn complex flows into clear interfaces and connect planning with implementation to solve real operational problems.',
    primaryCta: 'View Projects',
    secondaryCta: 'Start a Conversation',
    scrollLabel: 'Scroll to next section',
    portraitAlt: 'Portrait of Gwangmin',
    profileName: 'Gwangmin Cheon',
    profileSecondaryName: '천광민',
    profileRole: 'Front-end Developer',
    profileSummary: 'I connect planning and implementation through interface flows that feel clear and natural to users.',
    profileHint: 'Click the card to reveal core background and strengths',
    profileBackTitle: 'Primary stack',
    profileStrengthTitle: 'Strengths',
    capabilityLabel: 'Core strengths',
    stack: ['React', 'Next.js', 'TypeScript', 'Zustand', 'NeonDB', 'Figma'],
    metrics: [
      { value: 'Flow', label: 'Complexity to clarity' },
      { value: 'PM×FE', label: 'Planning to implementation' },
      { value: 'UX First', label: 'Experience before features' },
    ],
    focus: [
      {
        label: 'I turn complex processes into clear interface structures',
        detail: 'I shape hierarchy so users can understand the screen quickly and move forward without hesitation.',
      },
      {
        label: 'I connect product intent with implementation detail',
        detail: 'Planning, UI structure, state design, and execution stay aligned through delivery.',
      },
      {
        label: 'I solve operational problems through intuitive product experiences',
        detail: 'I focus less on adding features and more on reducing friction in real workflows.',
      },
    ],
    systemLabel: 'Working style',
    systemTitle: 'I prioritize clarity of flow before visual complexity',
    systemSummary: 'I organize the flow first, then add polish.',
    deliveryLabel: 'Delivery standard',
    deliveryTitle: 'I build frontends that stay coherent from concept to implementation',
    deliverySummary: 'Architecture, state flow, and responsiveness are treated as one system.',
    craftLabel: 'Profile',
    craftSummary: 'I work across UI direction, interface structure, state flow, and detail refinement.',
    mobileSummaryLabel: 'Responsive structure',
    mobileSummaryTitle: 'I keep information hierarchy intact on smaller screens',
    mobileSummaryBody: 'I restack the flow so key messages stay legible on smaller screens.',
    liveBadge: 'Active',
    responsiveBadge: 'Responsive',
    dynamicBadge: 'Dynamic',
  },
}

function HeroSection() {
  const language = useLanguage()
  const content = showcaseContent[language]
  const [theme, setTheme] = useState<ThemeMode>(() => getResolvedTheme())
  const [activeFocusIndex, setActiveFocusIndex] = useState(0)
  const [hoveredMetricIndex, setHoveredMetricIndex] = useState<number | null>(null)
  const [isProfileFlipped, setIsProfileFlipped] = useState(false)
  const [profileFlipDirection, setProfileFlipDirection] = useState<'left' | 'right'>('right')
  const isDark = theme === 'dark'

  useEffect(() => {
    function handleThemeChange(event: Event) {
      if (!(event instanceof CustomEvent)) {
        return
      }

      setTheme(event.detail === 'dark' ? 'dark' : 'light')
    }

    window.addEventListener('phangport-theme-change', handleThemeChange)

    return () => {
      window.removeEventListener('phangport-theme-change', handleThemeChange)
    }
  }, [])

  const sectionTone = isDark ? 'text-white' : 'text-slate-950'
  const panelTone = isDark
    ? 'border border-white/10 bg-white/[0.06] shadow-[0_24px_80px_rgba(2,6,23,0.34)]'
    : 'border border-slate-900/6 bg-white/88 shadow-[0_22px_60px_rgba(148,163,184,0.18)]'
  const strongPanelTone = isDark
    ? 'border border-white/12 bg-[#111827]/88 shadow-[0_30px_90px_rgba(2,6,23,0.4)]'
    : 'border border-slate-900/8 bg-white shadow-[0_28px_70px_rgba(148,163,184,0.22)]'
  const hoverPanelTone = isDark
    ? 'border border-white/12 bg-[#111827] shadow-[0_30px_90px_rgba(2,6,23,0.4)]'
    : 'border border-slate-900/8 bg-white shadow-[0_28px_70px_rgba(148,163,184,0.22)]'
  const subtleTextTone = isDark ? 'text-slate-300' : 'text-slate-600'
  const minorTextTone = isDark ? 'text-slate-400' : 'text-slate-500'
  const titleTone = isDark ? 'text-white' : 'text-slate-950'
  const accentLabelTone = isDark ? 'text-sky-200' : 'text-blue-700'
  const secondaryButtonTone = isDark
    ? 'border border-white/14 bg-white/[0.06] text-white hover:bg-white/[0.1]'
    : 'border border-slate-900/8 bg-white text-slate-800 hover:bg-slate-50'
  const primaryButtonTone =
    '!bg-[#3182f6] !text-white shadow-[0_16px_36px_rgba(49,130,246,0.28)] hover:!bg-[#2563eb] hover:!text-white'
  const phoneSurfaceTone = isDark
    ? 'border border-white/12 bg-[linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(17,24,39,0.92)_100%)]'
    : 'border border-blue-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]'
  const phoneSummaryTone = isDark
    ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)]'
    : 'bg-[linear-gradient(180deg,#f8fbff_0%,#eef5ff_100%)]'
  const strengthBadgeTone = isDark
    ? 'border border-white/10 bg-white/[0.06]'
    : 'border border-slate-900/6 bg-white shadow-[0_10px_24px_rgba(148,163,184,0.1)]'
  const orbitRingTone = isDark ? 'border-white/8 bg-white/[0.02]' : 'border-blue-200/70 bg-white/28'
  const orbitBadgeTone = isDark
    ? 'border border-white/10 bg-slate-950/32 shadow-[0_18px_44px_rgba(2,6,23,0.16)]'
    : 'border border-white/70 bg-white/56 shadow-[0_18px_44px_rgba(148,163,184,0.16)]'
  const profileHintTooltipTone = isDark
    ? 'bg-white text-slate-950 shadow-[0_18px_40px_rgba(2,6,23,0.18)]'
    : 'bg-slate-800 text-white shadow-[0_18px_40px_rgba(15,23,42,0.28)]'

  const resolvedActiveFocusIndex = wrapIndex(activeFocusIndex, content.focus.length)
  const activeFocus = content.focus[resolvedActiveFocusIndex] ?? content.focus[0]
  const experienceItems = experiencesPageContentByLanguage[language].items
  const educationItem = experienceItems.find((item) => item.category === 'education')
  const trainingItem = experienceItems.find((item) => item.category === 'training')
  const projectCount = projectsByLanguage[language].length
  const awardCount =
    experienceItems.filter((item) => item.category === 'award').length +
    projectsByLanguage[language].filter((project) => project.hasAward).length
  const profileBackFacts: ProfileBackFact[] =
    language === 'ko'
      ? [
          { emoji: '🚀', label: '프로젝트', value: `${projectCount}`, detail: '포트폴리오 기준' },
          { emoji: '🏆', label: '수상', value: `${awardCount}`, detail: '공모전 · 프로젝트' },
          {
            emoji: '🎓',
            label: '학력',
            value: '동아대학교 졸업',
            detail: '전자공학과 전공',
          },
          {
            emoji: '💻',
            label: '교육',
            value: trainingItem?.title ?? 'Samsung Youth SW·AI Academy',
            detail: trainingItem?.meta ?? 'Python · JavaScript · Web · Database · Team Project',
          },
        ]
      : [
          { emoji: '🚀', label: 'Projects', value: `${projectCount}`, detail: 'Portfolio selected' },
          { emoji: '🏆', label: 'Awards', value: `${awardCount}`, detail: 'Contests and builds' },
          {
            emoji: '🎓',
            label: 'Education',
            value: educationItem?.meta ?? 'Dong-A University',
            detail: educationItem?.title ?? 'Graduated in Electronic Engineering',
          },
          {
            emoji: '💻',
            label: 'Training',
            value: trainingItem?.title ?? 'Samsung Youth SW·AI Academy',
            detail: trainingItem?.meta ?? 'Python · JavaScript · Web · Database · Team Project',
          },
        ]

  const profileFlipRotation = isProfileFlipped
    ? profileFlipDirection === 'right'
      ? 'rotateY(180deg)'
      : 'rotateY(-180deg)'
    : 'rotateY(0deg)'
  const profileBackRotation = profileFlipDirection === 'right' ? 'rotateY(180deg)' : 'rotateY(-180deg)'

  function handleProfileCardFlip() {
    setIsProfileFlipped((current) => !current)
    setProfileFlipDirection((current) => (current === 'right' ? 'left' : 'right'))
  }

  if (!activeFocus) {
    return null
  }

  return (
    <section
      id="home"
      className={`relative z-[1] min-h-[100svh] overflow-visible lg:min-h-[100svh] lg:snap-start lg:snap-always lg:overflow-hidden ${sectionTone}`}
      data-home-hero-section="true"
      data-home-showcase="true"
    >
      <div
        aria-hidden="true"
        data-home-showcase-grid="true"
        className={`pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:88px_88px] motion-safe:animate-[showcase-grid-pan_22s_linear_infinite] ${
          isDark ? 'opacity-30' : 'opacity-20'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-[8%] top-[14%] h-36 w-36 rounded-full blur-[80px] motion-safe:animate-[showcase-orb-float_10s_ease-in-out_infinite] ${
          isDark ? 'bg-sky-400/22' : 'bg-sky-200/70'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-[16%] right-[10%] h-40 w-40 rounded-full blur-[100px] motion-safe:animate-[showcase-orb-float_13s_ease-in-out_infinite_reverse] ${
          isDark ? 'bg-blue-500/18' : 'bg-blue-100/90'
        }`}
      />

      <div className="relative z-[1] mx-auto grid w-[min(1180px,calc(100%-48px))] items-center gap-12 py-[calc(var(--navbar-offset,104px)+34px)] max-md:w-[min(calc(100%-32px),1180px)] max-md:gap-8 max-md:pb-[calc(var(--navbar-offset,96px)+5px)] max-md:pt-[calc(var(--navbar-offset,96px)+20px)] lg:min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.94fr)]">
        <HeroShowcaseContent
          content={content}
          isDark={isDark}
          mobileVisual={
            <HeroShowcaseMobileProfileCard
              content={{
                portraitAlt: content.portraitAlt,
                profileName: content.profileName,
                profileSecondaryName: content.profileSecondaryName,
                profileHint: content.profileHint,
              }}
              isProfileFlipped={isProfileFlipped}
              onProfileCardFlip={handleProfileCardFlip}
              orbitSkills={orbitSkills}
              profileBackFacts={profileBackFacts}
              profileBackRotation={profileBackRotation}
              profileFlipRotation={profileFlipRotation}
              tones={{
                strongPanelTone,
                phoneSurfaceTone,
                phoneSummaryTone,
                strengthBadgeTone,
                minorTextTone,
                subtleTextTone,
                titleTone,
                orbitRingTone,
                orbitBadgeTone,
              }}
            />
          }
          activeFocusIndex={resolvedActiveFocusIndex}
          hoveredMetricIndex={hoveredMetricIndex}
          onActiveFocusChange={setActiveFocusIndex}
          onHoveredMetricChange={setHoveredMetricIndex}
          tones={{
            titleTone,
            accentLabelTone,
            subtleTextTone,
            primaryButtonTone,
            secondaryButtonTone,
            panelTone,
            strongPanelTone,
            hoverPanelTone,
            minorTextTone,
          }}
        />

        <HeroShowcaseVisual
          content={content}
          activeFocus={activeFocus}
          activeFocusIndex={resolvedActiveFocusIndex}
          isDark={isDark}
          isProfileFlipped={isProfileFlipped}
          onActiveFocusChange={setActiveFocusIndex}
          onProfileCardFlip={handleProfileCardFlip}
          orbitSkills={orbitSkills}
          profileBackFacts={profileBackFacts}
          profileBackRotation={profileBackRotation}
          profileFlipRotation={profileFlipRotation}
          tones={{
            panelTone,
            strongPanelTone,
            phoneSurfaceTone,
            phoneSummaryTone,
            strengthBadgeTone,
            minorTextTone,
            subtleTextTone,
            titleTone,
            orbitRingTone,
            orbitBadgeTone,
            profileHintTooltipTone,
          }}
        />
      </div>

      <button
        type="button"
        aria-label={content.scrollLabel}
        onClick={scrollToNextSection}
        data-home-hero-scroll="true"
        className={`absolute bottom-7 left-1/2 z-[2] hidden -translate-x-1/2 bg-transparent p-0 md:block ${minorTextTone}`}
      >
        <ScrollIndicator />
      </button>
    </section>
  )
}

export default HeroSection
