// @ts-nocheck

function AboutEducationSection(props) {
  const { items } = props

  return (
    <section className="grid gap-5 px-1 py-2">
      <div className="grid gap-2">
        <div className="flex items-end gap-2">
          <h2 className="m-0 text-[1.32rem] font-bold text-[var(--text-h)]">교육사항</h2>
          <p className="m-0 self-end leading-none text-sm text-gray-400">Educations</p>
        </div>
        <p className="m-0 text-sm leading-7 text-slate-500">
          기술을 익히는 과정에서도 단순한 구현보다 실제 사용자에게 어떤 경험을 줄 수 있는지
          고민하며 학습해 왔습니다.
        </p>
      </div>

      <div className="grid gap-[14px]">
        {items.map((item) =>
          item.url ? (
            <a
              key={`${item.period}-${item.title}`}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="grid gap-2 rounded-[22px] border border-slate-900/8 bg-white px-5 py-[18px] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-px hover:border-blue-600/30 hover:shadow-[0_16px_36px_rgba(37,99,235,0.10)] focus-visible:-translate-y-px focus-visible:border-blue-600/30 focus-visible:shadow-[0_16px_36px_rgba(37,99,235,0.10)] focus-visible:outline-none"
            >
              <span className="text-[0.76rem] font-bold uppercase tracking-[0.08em] text-blue-600">
                {item.period}
              </span>
              <h3 className="m-0 text-base font-semibold text-[var(--text-h)]">{item.title}</h3>
              <p className="m-0 text-sm leading-[1.7] text-slate-500">{item.description}</p>
            </a>
          ) : (
            <article
              key={`${item.period}-${item.title}`}
              className="grid gap-2 rounded-[22px] border border-slate-900/8 bg-white px-5 py-[18px]"
            >
              <span className="text-[0.76rem] font-bold uppercase tracking-[0.08em] text-blue-600">
                {item.period}
              </span>
              <h3 className="m-0 text-base font-semibold text-[var(--text-h)]">{item.title}</h3>
              <p className="m-0 text-sm leading-[1.7] text-slate-500">{item.description}</p>
            </article>
          ),
        )}
      </div>
    </section>
  )
}

export default AboutEducationSection
