import { Link } from 'react-router-dom'
import useLanguage, { type LanguageCode } from '../../hooks/useLanguage'

type ContactSectionCopy = {
  sectionLabel: string
  heading: string
  description: string
  primaryCta: string
  secondaryCta: string
}

const contactSectionCopyByLanguage: Record<LanguageCode, ContactSectionCopy> = {
  ko: {
    sectionLabel: 'Contact',
    heading: '같이 만들고 싶은 프로젝트가 있다면, 편하게 연락 주세요.',
    description:
      '저와 함께 작업하고 싶거나, 더 많은 정보를 원하신다면 언제든지 연락주세요. 새로운 기회를 기다리고 있습니다!',
    primaryCta: '연락하기',
    secondaryCta: '이메일과 링크 확인하기',
  },
  en: {
    sectionLabel: 'Contact',
    heading: 'If you have a project in mind, feel free to reach out.',
    description:
      'I am interested in building new services and improving existing products with clearer user experience. If you want to collaborate or get in touch, you can leave a message from the contact page.',
    primaryCta: 'Go to Contact Page',
    secondaryCta: 'View email and links',
  },
}

function ContactSection() {
  const language = useLanguage()
  const copy = contactSectionCopyByLanguage[language]

  return (
    <section
      id="home-contact"
      className="relative overflow-hidden bg-transparent text-slate-950 dark:text-white"
      data-home-contact-section="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.16] dark:opacity-[0.08]" />

      <div className="relative z-[1] mx-auto grid w-[min(1126px,calc(100%-48px))] justify-items-center gap-8 py-[calc(var(--navbar-offset,104px)+28px)] max-md:w-[min(calc(100%-32px),1126px)] max-md:gap-6 max-md:py-[calc(var(--navbar-offset,96px)+18px)] md:w-[min(1126px,calc(100%-128px))]">
        <div className="grid justify-items-center gap-3 text-center">
          <p className="m-0 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-blue-700 dark:text-sky-200">
            {copy.sectionLabel}
          </p>
          <p className="m-0 text-[1rem] leading-[1.82] text-slate-600 dark:text-slate-300">
            {copy.description}
          </p>
        </div>

        <Link
        to="/contact"
        className="inline-flex w-fit min-h-[52px] justify-self-center items-center justify-center rounded-full bg-[#3182f6] px-6 py-3 text-[0.96rem] font-semibold text-white no-underline shadow-[0_18px_40px_rgba(49,130,246,0.28)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
        >
        {copy.primaryCta}
        </Link>
        
      </div>
    </section>
  )
}

export default ContactSection
