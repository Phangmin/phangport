import gwangminPicture from '../../../assets/profiles/gwangmin-picture.png'

type HeroShowcaseFocus = {
  label: string
  detail: string
}

type HeroShowcaseVisualContent = {
  focus: HeroShowcaseFocus[]
  portraitAlt: string
  profileName: string
  profileSecondaryName: string
  profileRole: string
  profileSummary: string
  profileHint: string
  capabilityLabel: string
  deliveryLabel: string
  deliveryTitle: string
  deliverySummary: string
  responsiveBadge: string
  dynamicBadge: string
}

type HeroShowcaseProfileBackFact = {
  emoji: string
  label: string
  value: string
  detail: string
}

type HeroShowcaseOrbitSkill = {
  icon: string
  label: string
  positionClass: string
}

type HeroShowcaseVisualProps = {
  content: HeroShowcaseVisualContent
  activeFocus: HeroShowcaseFocus
  activeFocusIndex: number
  isDark: boolean
  isProfileFlipped: boolean
  onActiveFocusChange: (index: number) => void
  onProfileCardFlip: () => void
  orbitSkills: HeroShowcaseOrbitSkill[]
  profileBackFacts: HeroShowcaseProfileBackFact[]
  profileBackRotation: string
  profileFlipRotation: string
  tones: {
    panelTone: string
    strongPanelTone: string
    phoneSurfaceTone: string
    phoneSummaryTone: string
    strengthBadgeTone: string
    minorTextTone: string
    subtleTextTone: string
    titleTone: string
    orbitRingTone: string
    orbitBadgeTone: string
    profileHintTooltipTone: string
  }
}

type HeroShowcaseMobileProfileCardProps = {
  content: Pick<HeroShowcaseVisualContent, 'portraitAlt' | 'profileName' | 'profileSecondaryName' | 'profileHint'>
  isProfileFlipped: boolean
  onProfileCardFlip: () => void
  orbitSkills: HeroShowcaseOrbitSkill[]
  profileBackFacts: HeroShowcaseProfileBackFact[]
  profileBackRotation: string
  profileFlipRotation: string
  tones: Pick<
    HeroShowcaseVisualProps['tones'],
    | 'strongPanelTone'
    | 'phoneSurfaceTone'
    | 'phoneSummaryTone'
    | 'strengthBadgeTone'
    | 'minorTextTone'
    | 'subtleTextTone'
    | 'titleTone'
    | 'orbitRingTone'
    | 'orbitBadgeTone'
  >
}

type HeroShowcasePortraitProps = {
  alt: string
  className: string
  imageClassName: string
}

function HeroShowcasePortrait({ alt, className, imageClassName }: HeroShowcasePortraitProps) {
  return (
    <div
      className={`relative flex h-full min-h-0 items-end justify-center overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-[10%] top-[6%] h-[44%] rounded-full bg-white/28 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
      <img
        src={gwangminPicture}
        alt={alt}
        className={`relative z-[1] block max-h-full max-w-full object-contain object-center ${imageClassName}`}
      />
    </div>
  )
}

function HeroShowcaseMobileProfileCard({
  content,
  isProfileFlipped,
  onProfileCardFlip,
  orbitSkills,
  profileBackFacts,
  profileBackRotation,
  profileFlipRotation,
  tones,
}: HeroShowcaseMobileProfileCardProps) {
  const getFactSpanClass = (index: number) => (index >= 2 ? 'col-span-2' : '')

  return (
    <div className="relative isolate mx-auto grid w-[80%] max-w-[300px] gap-2.5 overflow-visible lg:hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[47%] z-0 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 opacity-80"
      >
        <div className={`absolute inset-[10%] rounded-full border ${tones.orbitRingTone}`} />
        <div
          className={`absolute inset-0 rounded-full border ${tones.orbitRingTone} motion-safe:animate-[showcase-orbit-spin_26s_linear_infinite]`}
        >
          {orbitSkills.map((skill) => (
            <div key={`mobile-orbit-${skill.label}`} className={`absolute ${skill.positionClass}`}>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-[16px] backdrop-blur-[8px] opacity-60 ${tones.orbitBadgeTone}`}
              >
                <img src={skill.icon} alt="" className="h-5 w-5 object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ perspective: '1800px' }}>
        <button
          type="button"
          onClick={onProfileCardFlip}
          aria-pressed={isProfileFlipped}
          className="relative z-[2] block w-full bg-transparent p-0 text-left"
        >
          <div
            className="relative min-h-[398px] w-full transition-transform duration-700"
            style={{ transform: profileFlipRotation, transformStyle: 'preserve-3d' }}
          >
            <div
              className={`absolute inset-0 overflow-hidden rounded-[28px] p-3 ${tones.strongPanelTone}`}
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <div className={`grid h-full grid-rows-[minmax(0,1fr)_auto] rounded-[22px] p-3 ${tones.phoneSurfaceTone}`}>
                <HeroShowcasePortrait
                  alt={content.portraitAlt}
                  className="rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(226,232,240,0.9)_100%)] px-2 pt-3"
                  imageClassName="h-full w-full"
                />
                <div className={`mt-2.5 rounded-[18px] px-3 py-2.5 ${tones.phoneSummaryTone}`}>
                  <div className="grid justify-items-center gap-0.5 text-center">
                    <strong className={`block text-[0.96rem] font-semibold ${tones.titleTone}`}>{content.profileName}</strong>
                    <span className={`block text-[0.72rem] leading-[1.4] ${tones.subtleTextTone}`}>{content.profileSecondaryName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`absolute inset-0 overflow-hidden rounded-[28px] p-3 ${tones.strongPanelTone}`}
              style={{
                transform: profileBackRotation,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="grid h-full content-start gap-2">
                <strong className={`block text-center text-[0.92rem] font-bold tracking-[-0.03em] ${tones.titleTone}`}>
                  Introductions
                </strong>
                <div className="grid grid-cols-2 gap-2">
                {profileBackFacts.map((item, index) => (
                  <div
                    key={`inline-mobile-fact-${item.label}`}
                    className={`rounded-[16px] px-3 py-2.5 ${tones.strengthBadgeTone} ${getFactSpanClass(index)}`}
                  >
                    <span className={`flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${tones.minorTextTone}`}>
                      <span aria-hidden="true" className="text-[0.82rem] leading-none">
                        {item.emoji}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <span className={`mt-1.5 block text-[0.82rem] font-semibold leading-[1.35] ${tones.titleTone}`}>{item.value}</span>
                    <span className={`mt-1 block text-[0.68rem] leading-[1.4] ${tones.subtleTextTone}`}>{item.detail}</span>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>

      <p className={`m-0 text-center text-[0.72rem] leading-[1.55] ${tones.subtleTextTone}`}>{content.profileHint}</p>
    </div>
  )
}

function HeroShowcaseVisual({
  content,
  activeFocus,
  activeFocusIndex,
  isDark,
  isProfileFlipped,
  onActiveFocusChange,
  onProfileCardFlip,
  orbitSkills,
  profileBackFacts,
  profileBackRotation,
  profileFlipRotation,
  tones,
}: HeroShowcaseVisualProps) {
  const getFactSpanClass = (index: number) => (index >= 2 ? 'col-span-2' : '')

  return (
    <>
      <div className="hidden lg:hidden" />

      <div className="relative mx-auto hidden h-[clamp(540px,58vw,640px)] w-full max-w-[clamp(380px,40vw,560px)] overflow-visible lg:block">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[clamp(420px,46vw,520px)] w-[clamp(420px,46vw,520px)] -translate-x-1/2 -translate-y-1/2"
        >
          <div className={`absolute inset-[8%] rounded-full border ${tones.orbitRingTone}`} />
          <div
            className={`absolute inset-0 rounded-full border ${tones.orbitRingTone} motion-safe:animate-[showcase-orbit-spin_26s_linear_infinite]`}
          >
            {orbitSkills.map((skill) => (
              <div key={skill.label} className={`absolute ${skill.positionClass}`}>
                <div
                  className={`flex h-[clamp(52px,5vw,64px)] w-[clamp(52px,5vw,64px)] items-center justify-center rounded-[22px] backdrop-blur-[10px] opacity-55 ${tones.orbitBadgeTone}`}
                >
                  <img src={skill.icon} alt="" className="h-[clamp(24px,2.4vw,32px)] w-[clamp(24px,2.4vw,32px)] object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 z-[6] w-[min(58%,340px)] min-w-[clamp(300px,28vw,340px)] -translate-x-1/2 -translate-y-1/2 overflow-visible">
          <div
            className={`pointer-events-none absolute left-[calc(100%+28px)] top-1 z-[10] w-[clamp(188px,18vw,240px)] rounded-[18px] px-4 py-2.5 text-[0.72rem] font-semibold leading-[1.5] transition-opacity duration-300 ${tones.profileHintTooltipTone} ${
              isProfileFlipped ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {content.profileHint}
            <span
              aria-hidden="true"
              className={`absolute -left-1 top-4 h-3 w-3 rotate-45 rounded-[2px] ${
                isDark ? 'bg-white' : 'bg-slate-800'
              }`}
            />
          </div>

          <div style={{ perspective: '1800px' }}>
            <button
              type="button"
              onClick={onProfileCardFlip}
              aria-pressed={isProfileFlipped}
              className="block w-full bg-transparent p-0 text-left"
            >
              <div
                className="relative min-h-[clamp(430px,46vw,518px)] w-full transition-transform duration-700"
                style={{ transform: profileFlipRotation, transformStyle: 'preserve-3d' }}
              >
                <div
                  className={`absolute inset-0 overflow-hidden rounded-[36px] p-4 ${tones.strongPanelTone}`}
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <div className={`grid h-full grid-rows-[minmax(0,1fr)_auto] rounded-[30px] p-4 ${tones.phoneSurfaceTone}`}>
                    <HeroShowcasePortrait
                      alt={content.portraitAlt}
                      className="rounded-[26px] bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(226,232,240,0.92)_100%)] px-3 pt-4"
                      imageClassName="h-full w-full"
                    />
                    <div className={`mt-4 rounded-[24px] p-4 ${tones.phoneSummaryTone}`}>
                      <div className="flex min-h-[44px] items-center justify-center">
                        <div className="grid justify-items-center gap-0.5 text-center">
                          <strong className={`text-[1rem] font-semibold ${tones.titleTone}`}>{content.profileName}</strong>
                          <span className={`text-[0.74rem] leading-[1.4] ${tones.subtleTextTone}`}>{content.profileSecondaryName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 overflow-hidden rounded-[36px] p-4 ${tones.strongPanelTone}`}
                  style={{
                    transform: profileBackRotation,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <div className="grid h-full content-start gap-3">
                    <strong className={`block text-center text-[1rem] font-bold tracking-[-0.03em] ${tones.titleTone}`}>
                      Introductions
                    </strong>
                    <div className="grid grid-cols-2 gap-3">
                    {profileBackFacts.map((item, index) => (
                      <div
                        key={`desktop-fact-${item.label}`}
                        className={`rounded-[20px] px-4 py-3.5 ${tones.strengthBadgeTone} ${getFactSpanClass(index)}`}
                      >
                        <span className={`flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] ${tones.minorTextTone}`}>
                          <span aria-hidden="true" className="text-[0.9rem] leading-none">
                            {item.emoji}
                          </span>
                          <span>{item.label}</span>
                        </span>
                        <span className={`mt-2 block text-[0.92rem] font-semibold leading-[1.35] ${tones.titleTone}`}>{item.value}</span>
                        <span className={`mt-1 block text-[0.72rem] leading-[1.45] ${tones.subtleTextTone}`}>{item.detail}</span>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroShowcaseVisual
export { HeroShowcaseMobileProfileCard }
