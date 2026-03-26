import { useState } from 'react'
import { Footer } from '../components/common'

const contactItems = [
  {
    title: '주소',
    value: 'Busan, South Korea',
    ariaLabel: 'Address',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 3L10 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 3L14 21L10 14L3 10L21 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: '이메일',
    value: 'phangmin03@gmail.com',
    ariaLabel: 'Email',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 8L12 13L19 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: '전화번호',
    value: '+81 10 2025 041',
    ariaLabel: 'Phone',
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
]

function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit() {
    const subject = `[PHANGPORT] Contact from ${name || 'Visitor'}`
    const body = [`Name: ${name || '-'}`, `Email: ${email || '-'}`, '', message || '-'].join('\n')

    window.location.href = `mailto:phangmin03@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main
      className="[--navbar-offset:104px] min-h-screen text-slate-900 max-md:[--navbar-offset:132px]"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(37, 99, 235, 0.12), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
      }}
    >
      <section className="mx-auto grid h-screen w-[min(920px,calc(100%-48px))] content-center gap-6 px-0 pb-12 pt-[calc(var(--navbar-offset,104px)+18px)] max-md:content-start md:w-[min(920px,calc(100%-128px))]">
        <div className="grid justify-items-center gap-2 text-center">
          <h1 className="m-0 text-[clamp(1.8rem,4vw,2.6rem)] leading-none tracking-[-0.05em] text-[var(--text-h)]">
            Contact Me
          </h1>
        </div>

        <div className="grid items-center gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-7">
          <div className="grid w-full justify-self-start gap-[14px] lg:w-[320px] lg:auto-rows-[minmax(92px,1fr)] lg:self-center">
            {contactItems.map((item) => (
              <article
                key={item.title}
                className="grid min-h-[92px] grid-cols-[44px_minmax(0,1fr)] items-center gap-3 rounded-[18px] border border-blue-600/15 bg-white/95 px-[18px] py-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)]"
              >
                <div
                  aria-label={item.ariaLabel}
                  className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border-[1.5px] border-blue-600/75 bg-white text-blue-600"
                >
                  <span className="h-[14px] w-[14px]">{item.icon}</span>
                </div>
                <div className="grid content-center gap-1 text-left">
                  <h2 className="m-0 text-[0.92rem] leading-[1.15] text-[var(--text-h)]">{item.title}</h2>
                  <p className="m-0 break-words text-[0.76rem] leading-[1.5] text-slate-600">
                    {item.value}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="w-full justify-self-stretch lg:max-w-[520px]">
            <form className="grid gap-[14px]">
              <input
                lang="ko"
                type="text"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-[50px] w-full rounded-[14px] border border-blue-600/30 bg-white/95 px-4 text-[0.88rem] text-slate-900 outline-none transition-[border-color,box-shadow,transform] duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
              />
              <input
                lang="ko"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-[50px] w-full rounded-[14px] border border-blue-600/30 bg-white/95 px-4 text-[0.88rem] text-slate-900 outline-none transition-[border-color,box-shadow,transform] duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
              />
              <textarea
                lang="ko"
                placeholder="메시지를 입력해주세요"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-h-[180px] w-full resize-y rounded-[14px] border border-blue-600/30 bg-white/95 px-4 py-[14px] text-[0.88rem] leading-[1.55] text-slate-900 outline-none transition-[border-color,box-shadow,transform] duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="min-h-[50px] rounded-full bg-[linear-gradient(135deg,#2563eb_0%,#0f62fe_100%)] text-[0.9rem] font-bold text-white shadow-[0_16px_32px_rgba(37,99,235,0.2)] transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-px hover:brightness-[1.02] hover:shadow-[0_20px_40px_rgba(37,99,235,0.24)] focus-visible:outline-none"
              >
                메시지 보내기
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default ContactPage
