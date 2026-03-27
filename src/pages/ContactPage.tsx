import { Footer, RevealOnScroll } from '../components/common'
import ContactMessageForm from '../components/contact/ContactMessageForm'

const contactItems = [
  {
    title: '주소',
    value: 'Busan, South Korea',
    ariaLabel: 'Address',
    href: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 3 10 14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 3 14 21 10 14 3 10 21 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: '이메일',
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
    title: '전화번호',
    value: '+82 10 2025 041',
    ariaLabel: 'Phone',
    href: null,
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
] as const

function ContactPage() {
  return (
    <main
      className="[--navbar-offset:104px] min-h-screen text-slate-900 max-md:[--navbar-offset:96px]"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(37, 99, 235, 0.12), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
      }}
    >
      <section className="mx-auto grid min-h-screen w-[min(1040px,calc(100%-24px))] content-start gap-7 pb-[72px] pt-[calc(var(--navbar-offset)+28px)] md:w-[min(1040px,calc(100%-128px))] md:gap-8">
        <RevealOnScroll className="grid gap-3 text-center lg:text-left">
          <p className="m-0 text-[0.76rem] font-bold uppercase tracking-[0.18em] text-blue-600">Contact</p>
          <h1 className="m-0 text-[clamp(2.1rem,5vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-[var(--text-h)]">
            함께 이야기해볼까요?
          </h1>
          <p
            className="mx-auto m-0 max-w-[680px] text-[0.92rem] leading-[1.78] text-slate-600 lg:mx-0 md:text-[0.98rem]"
            data-contact-muted="true"
          >
            프로젝트 문의, 협업 제안, 가벼운 인사까지 괜찮습니다. 가장 빠른 연결은 이메일 카드이고, 오른쪽 폼은 이후 실제 전송 기능을 붙이기 위한 구조로 정리했습니다.
          </p>
        </RevealOnScroll>

        <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="grid gap-4">
            <div className="grid gap-[14px]">
              {contactItems.map((item, index) => (
                <RevealOnScroll key={item.title} delay={0.08 + index * 0.06}>
                  {item.href ? (
                    <a
                      href={item.href}
                      aria-label={item.ariaLabel}
                      className="grid min-h-[98px] grid-cols-[48px_minmax(0,1fr)] items-center gap-4 rounded-[22px] border border-blue-600/14 bg-white/95 px-5 py-[18px] text-left no-underline shadow-[0_18px_42px_rgba(15,23,42,0.05)] transition-colors duration-200 hover:border-blue-600/28 focus-visible:border-blue-600/28 focus-visible:outline-none"
                      data-contact-surface="true"
                      data-contact-email-card="true"
                    >
                      <div className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1.5px] border-blue-600/70 bg-white text-blue-600">
                        <span className="h-[16px] w-[16px]">{item.icon}</span>
                      </div>
                      <div className="grid gap-1.5 text-left">
                        <h2 className="m-0 text-[0.96rem] font-semibold leading-[1.15] text-[var(--text-h)]">
                          {item.title}
                        </h2>
                        <p className="m-0 break-words text-[0.82rem] leading-[1.6] text-slate-600" data-contact-muted="true">
                          {item.value}
                        </p>
                        <p className="m-0 text-[0.72rem] leading-[1.55] text-slate-400" data-contact-muted="true">
                          클릭하면 메일 보내기로 연결됩니다.
                        </p>
                      </div>
                    </a>
                  ) : (
                    <article
                      className="grid min-h-[98px] grid-cols-[48px_minmax(0,1fr)] items-center gap-4 rounded-[22px] border border-blue-600/14 bg-white/95 px-5 py-[18px] shadow-[0_18px_42px_rgba(15,23,42,0.05)]"
                      data-contact-surface="true"
                    >
                      <div
                        aria-label={item.ariaLabel}
                        className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1.5px] border-blue-600/70 bg-white text-blue-600"
                      >
                        <span className="h-[16px] w-[16px]">{item.icon}</span>
                      </div>
                      <div className="grid gap-1.5 text-left">
                        <h2 className="m-0 text-[0.96rem] font-semibold leading-[1.15] text-[var(--text-h)]">
                          {item.title}
                        </h2>
                        <p className="m-0 break-words text-[0.82rem] leading-[1.6] text-slate-600" data-contact-muted="true">
                          {item.value}
                        </p>
                      </div>
                    </article>
                  )}
                </RevealOnScroll>
              ))}
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
