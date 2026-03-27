import { useState } from 'react'
import { RevealOnScroll } from '../common'

const fieldClassName =
  'min-h-[54px] w-full rounded-[16px] border border-blue-600/24 bg-white px-4 text-[0.92rem] text-slate-900 outline-none transition-[border-color,box-shadow,transform] duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]'

function ContactMessageForm() {
  const [name, setName] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  return (
    <RevealOnScroll
      className="rounded-[30px] border border-slate-900/8 bg-white/95 p-5 shadow-[0_24px_58px_rgba(15,23,42,0.07)] md:p-7"
      data-contact-surface="true"
    >
      <form className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            id="contact-name"
            aria-label="이름"
            lang="ko"
            type="text"
            placeholder="이름"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClassName}
          />

          <input
            id="contact-email"
            aria-label="이메일"
            lang="ko"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClassName}
          />
        </div>

        <input
          id="contact-affiliation"
          aria-label="소속"
          lang="ko"
          type="text"
          placeholder="소속"
          value={affiliation}
          onChange={(event) => setAffiliation(event.target.value)}
          className={fieldClassName}
        />

        <textarea
          id="contact-message"
          aria-label="메시지"
          lang="ko"
          placeholder="메시지를 입력해주세요"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="min-h-[220px] w-full resize-y rounded-[18px] border border-blue-600/24 bg-white px-4 py-4 text-[0.92rem] leading-[1.68] text-slate-900 outline-none transition-[border-color,box-shadow,transform] duration-200 placeholder:text-slate-400 focus:-translate-y-px focus:border-blue-600 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
        />

        <div className="flex flex-col gap-3 pt-1 md:flex-row md:items-center md:justify-between">
          <p className="m-0 text-[0.8rem] leading-[1.6] text-slate-500" data-contact-muted="true">
            현재 이 폼은 레이아웃 초안입니다. 실제 전송은 백엔드나 메일 서비스 연결이 필요합니다.
          </p>
          <button
            type="button"
            disabled
            className="min-h-[54px] rounded-full bg-[linear-gradient(135deg,#2563eb_0%,#0f62fe_100%)] px-6 text-[0.94rem] font-bold text-white opacity-55"
          >
            메시지 보내기
          </button>
        </div>
      </form>
    </RevealOnScroll>
  )
}

export default ContactMessageForm
