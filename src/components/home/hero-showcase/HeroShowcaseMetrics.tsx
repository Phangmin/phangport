type HeroShowcaseMetric = {
  value: string
  label: string
}

type HeroShowcaseFocus = {
  label: string
  detail: string
}

type HeroShowcaseMetricsContent = {
  metrics: HeroShowcaseMetric[]
  focus: HeroShowcaseFocus[]
}

type HeroShowcaseMetricsProps = {
  content: HeroShowcaseMetricsContent
  hoveredMetricIndex: number | null
  onHoveredMetricChange: (index: number | null) => void
  tones: {
    panelTone: string
    hoverPanelTone: string
    titleTone: string
    minorTextTone: string
    subtleTextTone: string
  }
}

const metricLayouts = [
  { left: '0px', width: 'calc((100% - 24px) / 3)' },
  { left: 'calc(((100% - 24px) / 3) + 12px)', width: 'calc((100% - 24px) / 3)' },
  { left: 'calc((((100% - 24px) / 3) * 2) + 24px)', width: 'calc((100% - 24px) / 3)' },
]

function HeroShowcaseMetrics({
  content,
  hoveredMetricIndex,
  onHoveredMetricChange,
  tones,
}: HeroShowcaseMetricsProps) {
  return (
    <>
      <div className="hidden gap-3 opacity-0 motion-safe:animate-[rise-in_1.06s_ease-out_0.5s_forwards] motion-reduce:opacity-100 md:grid md:grid-cols-3 lg:hidden">
        {content.metrics.map((metric, index) => (
          <div
            key={`compact-${metric.label}`}
            className={`grid min-w-0 gap-2 rounded-[24px] px-4 py-4 text-left ${tones.panelTone}`}
            data-home-showcase-card="compact"
          >
            <strong className={`block text-[1.5rem] font-semibold leading-none tracking-[-0.05em] ${tones.titleTone}`}>
              {metric.value}
            </strong>
            <span
              data-home-showcase-muted="true"
              className={`block text-[0.74rem] font-medium uppercase tracking-[0.12em] ${tones.minorTextTone}`}
            >
              {metric.label}
            </span>
            <p className={`m-0 text-[0.8rem] leading-[1.55] ${tones.subtleTextTone}`}>
              {content.focus[index]?.label}
            </p>
          </div>
        ))}
      </div>

      <div
        className="relative hidden h-[182px] opacity-0 motion-safe:animate-[rise-in_1.06s_ease-out_0.5s_forwards] motion-reduce:opacity-100 lg:block"
        onMouseLeave={() => onHoveredMetricChange(null)}
      >
        {content.metrics.map((metric, index) => {
          const isExpanded = hoveredMetricIndex === index
          const layout = metricLayouts[index] ?? metricLayouts[0]!

          return (
            <button
              key={metric.label}
              type="button"
              onMouseEnter={() => onHoveredMetricChange(index)}
              onFocus={() => onHoveredMetricChange(index)}
              onBlur={() => onHoveredMetricChange(null)}
              data-home-showcase-card={isExpanded ? 'hovered' : 'default'}
              className={`absolute top-0 overflow-hidden rounded-[28px] px-5 py-4 text-left transition-[left,width,transform,box-shadow,border-color,background-color,opacity] duration-300 ${
                isExpanded
                  ? `${tones.hoverPanelTone} -translate-y-0.5`
                  : `${tones.panelTone} hover:-translate-y-0.5`
              } ${isExpanded ? 'z-[8] h-[120px]' : hoveredMetricIndex !== null ? 'z-[3] h-[120px] opacity-60' : 'z-[4] h-[120px]'}`}
              style={{
                left: isExpanded ? '0px' : layout.left,
                width: isExpanded ? '100%' : layout.width,
              }}
            >
              <div className="flex h-full items-center gap-5">
                <div className="flex flex-col items-start shrink-0">
                  <strong className={`block text-[1.8rem] font-semibold tracking-[-0.05em] ${tones.titleTone}`}>{metric.value}</strong>
                  <span data-home-showcase-muted="true" className={`mt-1 block text-[0.8rem] font-medium uppercase tracking-[0.12em] ${tones.minorTextTone}`}>
                    {metric.label}
                  </span>
                </div>

                <div
                  className={`ml-auto flex h-full flex-col items-end justify-center text-right transition-opacity duration-300 ${
                    isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <p className={`text-[0.92rem] font-medium leading-[1.55] ${tones.subtleTextTone}`}>
                    {content.focus[index]?.label}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

    </>
  )
}

export default HeroShowcaseMetrics
