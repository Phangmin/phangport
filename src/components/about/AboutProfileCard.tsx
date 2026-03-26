// @ts-nocheck

function EducationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] shrink-0 text-slate-900"
      fill="currentColor"
    >
      <path d="M12 3.75 2.5 8.9l9.5 5.1 7.1-3.82V16h1.5V8.9L12 3.75Zm-5.76 8.11V15c0 .38.22.73.56.9 1.54.77 3.35 1.35 5.2 1.35s3.66-.58 5.2-1.35c.34-.17.56-.52.56-.9v-3.14L12 15l-5.76-3.14Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] shrink-0 text-slate-900"
      fill="currentColor"
    >
      <path d="M3.5 7.25C3.5 6.56 4.06 6 4.75 6h14.5c.69 0 1.25.56 1.25 1.25v9.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-9.5Zm1.5.12V8l7 4.67L19 8v-.63l-6.72 4.48a.5.5 0 0 1-.56 0L5 7.37Z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] shrink-0 text-slate-900"
      fill="currentColor"
    >
      <path d="M6.62 4.5c-.97 0-1.78.74-1.86 1.7A15.64 15.64 0 0 0 17.8 19.24c.96-.08 1.7-.89 1.7-1.86v-1.7c0-.4-.27-.76-.65-.87l-3.04-.84a1.13 1.13 0 0 0-1.08.28l-1.5 1.5a12.77 12.77 0 0 1-4.98-4.98l1.5-1.5c.29-.29.4-.72.29-1.09l-.85-3.03a.9.9 0 0 0-.87-.65H6.62Z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] shrink-0 text-slate-900"
      fill="currentColor"
    >
      <path d="M12 2.75a6.25 6.25 0 0 0-6.25 6.25c0 4.38 5.1 10.26 5.32 10.5a1.24 1.24 0 0 0 1.86 0c.22-.24 5.32-6.12 5.32-10.5A6.25 6.25 0 0 0 12 2.75Zm0 8.75A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  )
}

function AboutProfileCard(props) {
  const { imageSrc } = props

  return (
    <aside className="grid content-start gap-4 rounded-[30px] border border-slate-900/8 bg-white/95 p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <div className="mx-auto aspect-square w-full max-w-[240px] overflow-hidden rounded-full border border-slate-900/8 shadow-[0_20px_48px_rgba(15,23,42,0.12)]">
        <img
          src={imageSrc}
          alt="Profile portrait"
          className="block h-full w-full object-cover object-top"
        />
      </div>

      <div className="grid gap-3 text-center">
        <div className="grid gap-2">
          <p className="m-0 text-2xl font-bold leading-none tracking-[0.08em] text-[var(--text-h)]">
            천광민
          </p>
          <p className="m-0 text-xs leading-none font-normal text-slate-500">Cheon Gwang Min</p>
        </div>

        <div className="mx-auto h-px w-16 bg-slate-900/10" />

        <div className="mx-auto grid gap-3 text-left">
          <div className="flex items-center gap-2 text-sm font-normal text-[var(--text-h)]">
            <EducationIcon />
            <span>동아대학교 전자공학과</span>
          </div>
          <p className="m-0 pl-[26px] text-xs text-slate-500">2022. 02. 23. 졸업</p>

          <div className="flex items-center gap-2 text-sm font-normal text-[var(--text-h)]">
            <MailIcon />
            <span>phangmin03@gmail.com</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-normal text-[var(--text-h)]">
            <PhoneIcon />
            <span>+81 10 2025 041</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-normal text-[var(--text-h)]">
            <PinIcon />
            <span>부산, 대한민국</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AboutProfileCard
