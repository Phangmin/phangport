import { getSkillIconSrc } from '../../content/skills'

type SkillBadgeProps = {
  label: string
  className?: string
}

function SkillBadge({ label, className = '' }: SkillBadgeProps) {
  const iconSrc = getSkillIconSrc(label)

  return (
    <span
      data-about-skill-badge="true"
      className={`inline-flex h-7 whitespace-nowrap items-center justify-center gap-1.5 rounded-full bg-gray-600/8 px-2.5 text-[0.72rem] font-bold leading-none text-gray-700 md:h-8 md:px-3 md:text-[0.76rem] ${className}`.trim()}
    >
      {iconSrc ? (
        <img
          src={iconSrc}
          alt=""
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 object-contain md:h-4 md:w-4"
        />
      ) : null}
      <span className="whitespace-nowrap leading-none">{label}</span>
    </span>
  )
}

export default SkillBadge
