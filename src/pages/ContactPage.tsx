import instagramIcon from '../assets/icons/instagram-icon.png'
import kakaoTalkIcon from '../assets/icons/kakaotalk-icon.png'
import linkedinIcon from '../assets/icons/linkedin-icon.png'
import { Footer, RevealOnScroll } from '../components/common'
import ContactInfoCard, { type ContactInfoCardProps } from '../components/contact/ContactInfoCard'
import ContactMessageForm from '../components/contact/ContactMessageForm'
import useLanguage, { type LanguageCode } from '../hooks/useLanguage'

type ContactPageCopy = {
  items: ContactInfoCardProps[]
  heading: string
  description: string
  helper: string
}

function createContactItems(emailTitle: string, phoneTitle: string): ContactInfoCardProps[] {
  return [
    {
      title: emailTitle,
      value: 'phangmin03@gmail.com',
      ariaLabel: 'Email',
      href: 'mailto:phangmin03@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="6" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M5 8 12 13 19 8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: phoneTitle,
      value: '+82 2370 0028',
      ariaLabel: 'Phone',
      href: 'tel:+8223700028',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M8.7 5.5C8.3 4.5 7.2 4 6.2 4H5.4C4.1 4 3.1 5.1 3.2 6.4C3.5 11 5.5 15.2 8.8 18.5C12 21.7 16.3 23.7 20.8 24C22.1 24.1 23.2 23.1 23.2 21.8V21C23.2 20 22.6 18.9 21.7 18.5L18.9 17.3C18 16.9 17 17.1 16.3 17.8L15.1 19C12.5 17.7 10.3 15.6 8.9 12.9L10.2 11.7C10.9 11 11.1 10 10.7 9.1L8.7 5.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-1.2 -2)"
          />
        </svg>
      ),
    },
    {
      title: 'Instagram',
      ariaLabel: 'Instagram',
      href: 'https://instagram.com/gwang._.min/',
      tone: 'instagram',
      framedIcon: false,
      icon: (
        <img
          src={instagramIcon}
          alt=""
          aria-hidden="true"
          className="block h-full w-full object-contain transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
        />
      ),
    },
    {
      title: 'LinkedIn',
      ariaLabel: 'LinkedIn',
      href: 'https://www.linkedin.com/in/phangmin',
      tone: 'linkedin',
      framedIcon: false,
      icon: (
        <img
          src={linkedinIcon}
          alt=""
          aria-hidden="true"
          className="block h-full w-full object-contain transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
        />
      ),
    },
    {
      title: 'KakaoTalk',
      ariaLabel: 'KakaoTalk',
      href: 'https://open.kakao.com/o/g4LnG6ni',
      tone: 'kakao',
      framedIcon: false,
      icon: (
        <img
          src={kakaoTalkIcon}
          alt=""
          aria-hidden="true"
          className="block h-full w-full object-contain transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert"
        />
      ),
    },
  ]
}

const contactPageCopyByLanguage: Record<LanguageCode, ContactPageCopy> = {
  ko: {
    items: createContactItems('이메일', '연락처'),
    heading: '연락과 제안을 기다립니다.',
    description:
      '프로젝트 문의, 작업 제안, 가벼운 커피챗도 환영합니다. 남겨주신 메시지를 확인하는 대로 빠르게 회신드리겠습니다.',
    helper: '각 카드를 누르면 연결된 링크로 바로 이동할 수 있습니다.',
  },
  en: {
    items: createContactItems('Email', 'Phone'),
    heading: 'Open to conversations and collaboration.',
    description:
      'Project inquiries, collaboration proposals, and even a casual coffee chat are all welcome. I will get back to you as soon as I review your message.',
    helper: 'Click any card to open its linked destination right away.',
  },
}

function ContactPage() {
  const language = useLanguage()
  const copy = contactPageCopyByLanguage[language]
  const primaryContactItems = copy.items.slice(0, 2)
  const socialContactItems = copy.items.slice(2)

  return (
    <main className="[--navbar-offset:104px] flex min-h-screen flex-col text-slate-900 max-md:[--navbar-offset:96px]">
      <section className="mx-auto grid w-[min(1040px,calc(100%-24px))] flex-1 content-start gap-7 pb-[36px] pt-[calc(var(--navbar-offset)+28px)] md:w-[min(1040px,calc(100%-128px))] md:gap-8 md:pb-[44px]">
        <RevealOnScroll className="grid gap-3 text-left max-md:px-4">
          <p
            className="m-0 text-[0.76rem] font-bold uppercase tracking-[0.18em] text-blue-600"
            data-contact-accent="true"
          >
            Contact
          </p>
          <h1 className="m-0 text-[clamp(1.44rem,3.45vw,2.48rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--text-h)]">
            {copy.heading}
          </h1>
          <p
            className="m-0 text-[0.92rem] leading-[1.78] text-slate-600 md:text-[0.98rem]"
            data-contact-muted="true"
          >
            {copy.description}
          </p>
        </RevealOnScroll>

        <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="grid gap-4">
            <RevealOnScroll delay={0.04}>
              <div className="border-l-2 border-slate-900/18 pl-4 text-left" data-contact-accent-border="true">
                <p className="m-0 text-[0.78rem] leading-[1.65] text-slate-500" data-contact-muted="true">
                  {copy.helper}
                </p>
              </div>
            </RevealOnScroll>
            <div className="grid gap-[14px]">
              {primaryContactItems.map((item, index) => (
                <RevealOnScroll key={item.title} delay={0.08 + index * 0.06}>
                  <ContactInfoCard {...item} />
                </RevealOnScroll>
              ))}
              <div className="grid gap-[14px]">
                {socialContactItems.map((item, index) => (
                  <RevealOnScroll key={item.title} delay={0.2 + index * 0.06}>
                    <ContactInfoCard {...item} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </aside>

          <ContactMessageForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default ContactPage
