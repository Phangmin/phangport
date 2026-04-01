import type { ReactNode } from 'react'
import HeroShowcaseHeading from './HeroShowcaseHeading'
import HeroShowcaseMetrics from './HeroShowcaseMetrics'

type HeroShowcaseContentMetric = {
  value: string
  label: string
}

type HeroShowcaseContentFocus = {
  label: string
  detail: string
}

type HeroShowcaseContentData = {
  eyebrow: string
  title: [string, string]
  description: string
  primaryCta: string
  secondaryCta: string
  metrics: HeroShowcaseContentMetric[]
  focus: HeroShowcaseContentFocus[]
}

type HeroShowcaseContentProps = {
  content: HeroShowcaseContentData
  isDark: boolean
  mobileVisual?: ReactNode
  hoveredMetricIndex: number | null
  onHoveredMetricChange: (index: number | null) => void
  tones: {
    titleTone: string
    accentLabelTone: string
    subtleTextTone: string
    primaryButtonTone: string
    secondaryButtonTone: string
    panelTone: string
    strongPanelTone: string
    hoverPanelTone: string
    minorTextTone: string
  }
}

function HeroShowcaseContent({
  content,
  isDark,
  mobileVisual,
  hoveredMetricIndex,
  onHoveredMetricChange,
  tones,
}: HeroShowcaseContentProps) {
  return (
    <div className="grid gap-7 text-left max-lg:justify-items-center max-lg:text-center max-md:gap-5">
      <HeroShowcaseHeading
        content={content}
        isDark={isDark}
        mobileInsert={mobileVisual}
        tones={{
          titleTone: tones.titleTone,
          accentLabelTone: tones.accentLabelTone,
          subtleTextTone: tones.subtleTextTone,
          primaryButtonTone: tones.primaryButtonTone,
          secondaryButtonTone: tones.secondaryButtonTone,
        }}
      />

      <HeroShowcaseMetrics
        content={content}
        hoveredMetricIndex={hoveredMetricIndex}
        onHoveredMetricChange={onHoveredMetricChange}
        tones={{
          panelTone: tones.panelTone,
          hoverPanelTone: tones.hoverPanelTone,
          titleTone: tones.titleTone,
          minorTextTone: tones.minorTextTone,
          subtleTextTone: tones.subtleTextTone,
        }}
      />
    </div>
  )
}

export default HeroShowcaseContent
