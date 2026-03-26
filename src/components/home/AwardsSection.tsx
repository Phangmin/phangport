function AwardsSection() {
  return (
    <section
      id="contact"
      className="mx-auto grid h-screen w-[min(1126px,calc(100%-48px))] content-center gap-[18px] px-0 pb-[72px] pt-[calc(var(--navbar-offset,104px)+12px)] md:w-[min(1126px,calc(100%-128px))]"
    >
      <p className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-blue-600">
        Contact
      </p>
      <h2 className="m-0 text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.04em] text-[var(--text-h)]">
        문의와 협업 제안을 기다리고 있습니다.
      </h2>
      <div className="rounded-[24px] border border-slate-900/8 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <p className="m-0 max-w-[640px] leading-[1.8] text-slate-500">
          메일이나 연락처를 통해 프로젝트, 협업, 포트폴리오 관련 문의를 남겨주세요.
          실제 연락 기능은 Contact 페이지에서 계속 확장할 수 있도록 분리해 두었습니다.
        </p>
      </div>
    </section>
  )
}

export default AwardsSection
