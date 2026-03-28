import type { RefObject } from 'react'

type LanguageCode = 'ko' | 'en'

type LanguageOption = {
  code: LanguageCode
  label: string
  icon: string
}

type LanguageMenuProps = {
  language: LanguageCode
  options: readonly LanguageOption[]
  isOpen: boolean
  onToggle: () => void
  onSelect: (code: LanguageCode) => void
  menuRef: RefObject<HTMLDivElement | null>
  activeLanguageIcon: string
  activeLanguageLabel: string
  textClass: string
  hoverTextClass: string
  languageBorderClass: string
  languageMenuClass: string
  activeOptionTextClass: string
  wrapperClassName?: string
  buttonClassName?: string
  menuPositionClassName?: string
  menuClassName?: string
}

function LanguageMenu({
  language,
  options,
  isOpen,
  onToggle,
  onSelect,
  menuRef,
  activeLanguageIcon,
  activeLanguageLabel,
  textClass,
  hoverTextClass,
  languageBorderClass,
  languageMenuClass,
  activeOptionTextClass,
  wrapperClassName,
  buttonClassName,
  menuPositionClassName,
  menuClassName,
}: LanguageMenuProps) {
  return (
    <div
      ref={menuRef}
      data-language-menu="true"
      className={`relative inline-flex ${wrapperClassName ?? ''}`}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={onToggle}
        data-language-menu-trigger="true"
        className={`inline-flex min-w-24 items-center justify-center gap-[7px] rounded-full border bg-transparent px-[11px] py-[7px] text-[0.73rem] font-bold leading-none tracking-[0.02em] transition-[color,transform,opacity,border-color] duration-200 hover:-translate-y-px hover:opacity-95 focus-visible:-translate-y-px focus-visible:opacity-95 focus-visible:outline-none ${languageBorderClass} ${textClass} ${hoverTextClass} ${buttonClassName ?? ''}`}
      >
        <img
          src={activeLanguageIcon}
          alt=""
          aria-hidden="true"
          className="h-[14px] w-[14px] shrink-0 object-contain"
        />
        <span className="whitespace-nowrap">{activeLanguageLabel}</span>
      </button>

      {isOpen ? (
        <div
          role="menu"
          className={`absolute z-20 grid min-w-[122px] gap-1 rounded-2xl border p-1.5 backdrop-blur ${menuPositionClassName ?? 'left-1/2 top-[calc(100%+8px)] -translate-x-1/2'} ${languageMenuClass} ${menuClassName ?? ''}`}
        >
          {options.map((option) => (
            <button
              key={option.code}
              type="button"
              role="menuitemradio"
              aria-checked={option.code === language}
              onClick={() => onSelect(option.code)}
              data-language-menu-option={option.code === language ? 'active' : 'inactive'}
              className={
                option.code === language
                  ? `inline-flex w-full items-center gap-2 rounded-xl bg-blue-600/10 px-[10px] py-2 text-left text-[0.74rem] font-semibold transition-colors duration-200 focus-visible:outline-none ${activeOptionTextClass}`
                  : `inline-flex w-full items-center gap-2 rounded-xl px-[10px] py-2 text-left text-[0.74rem] font-semibold transition-colors duration-200 hover:bg-blue-600/8 focus-visible:bg-blue-600/8 focus-visible:outline-none ${textClass} ${hoverTextClass}`
              }
            >
              <img
                src={option.icon}
                alt=""
                aria-hidden="true"
                className="h-[14px] w-[14px] shrink-0 object-contain"
              />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default LanguageMenu
