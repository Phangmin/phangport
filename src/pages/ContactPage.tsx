import { useState } from 'react'
import { Footer } from '../components/common'

const contactItems = [
  {
    title: '주소',
    value: 'Busan, South Korea',
    ariaLabel: 'Address',
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
    const subject = `[PHANGPORT] ${name || '방문자'}님의 문의`
    const body = [`이름: ${name || '-'}`, `이메일: ${email || '-'}`, '', message || '-'].join('\n')

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
      <section className="mx-auto grid min-h-screen w-[min(1040px,calc(100%-48px))] content-start gap-8 px-0 pb-[72px] pt-[calc(var(--navbar-offset)+36px)] md:w-[min(1040px,calc(100%-128px))]">
        <div className="grid gap-3 text-center lg:text-left">
          <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-blue-600">Contact</p>
          <h1 className="m-0 text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-[var(--text-h)]">
            함께 이야기해볼까요?
          </h1>
          <p className="mx-auto m-0 max-w-[620px] text-sm leading-7 text-slate-600 lg:mx-0">
            프로젝트 문의, 협업 제안, 가벼운 인사까지 편하게 남겨주세요. 입력 후 버튼을 누르면
            기본 메일 앱으로 바로 연결됩니다.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="grid gap-4">
            <div className="rounded-[28px] border border-slate-900/8 bg-white/95 p-6 shadow-[0_20px_48px_rgba(15,23,42,0.06)]">
              <div className="grid gap-2">
                <h2 className="m-0 text-[1.18rem] font-bold text-[var(--text-h)]">연락처</h2>
                <p className="m-0 text-sm leading-7 text-slate-500">
                  가장 빠른 연락은 이메일입니다. 아래 정보나 문의 폼 중 편한 방법으로
                  연락해주세요.
                </p>
              </div>
            </div>

            <div className="grid gap-[14px]">
              {contactItems.map((item) => (
                <article
                  key={item.title}
                  className="grid min-h-[98px] grid-cols-[48px_minmax(0,1fr)] items-center gap-4 rounded-[22px] border border-blue-600/14 bg-white/95 px-5 py-[18px] shadow-[0_18px_42px_rgba(15,23,42,0.05)]"
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
                    <p className="m-0 break-words text-[0.82rem] leading-[1.6] text-slate-600">
                      {item.value}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </aside>

          <div className="rounded-[30px] border border-slate-900/8 bg-white/95 p-6 shadow-[0_24px_58px_rgba(15,23,42,0.07)] md:p-7">
            <form className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="contact-name" className="text-sm font-semibold text-[var(--text-h)]">
                  이름
                </label>
                <input
                  id="contact-name"
                  lang="ko"
                  type="text"
                  placeholder="이름을 입력해주세요"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-[54px] w-full rounded-[16px] border border-blue-600/24 bg-white px-4 text-[0.92rem] text-slate-900 outline-none transition-[border-color,box-shadow,transform] duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="contact-email" className="text-sm font-semibold text-[var(--text-h)]">
                  이메일
                </label>
                <input
                  id="contact-email"
                  lang="ko"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-[54px] w-full rounded-[16px] border border-blue-600/24 bg-white px-4 text-[0.92rem] text-slate-900 outline-none transition-[border-color,box-shadow,transform] duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="contact-message" className="text-sm font-semibold text-[var(--text-h)]">
                  메시지
                </label>
                <textarea
                  id="contact-message"
                  lang="ko"
                  placeholder="메시지를 입력해주세요"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="min-h-[220px] w-full resize-y rounded-[16px] border border-blue-600/24 bg-white px-4 py-4 text-[0.92rem] leading-[1.6] text-slate-900 outline-none transition-[border-color,box-shadow,transform] duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="mt-1 min-h-[54px] rounded-full bg-[linear-gradient(135deg,#2563eb_0%,#0f62fe_100%)] px-6 text-[0.94rem] font-bold text-white transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-px hover:brightness-[1.02] hover:shadow-[0_18px_40px_rgba(37,99,235,0.22)] focus-visible:outline-none"
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
