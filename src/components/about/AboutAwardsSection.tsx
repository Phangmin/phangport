// @ts-nocheck

function AboutAwardsSection(props) {
  const { items } = props

  return (
    <section className="grid gap-5 px-1 py-2">
      <div className="grid gap-2">
        <h2 className="m-0 text-[1.32rem] font-bold text-[var(--text-h)]">수상내역</h2>
      </div>

      <div className="grid gap-[14px] md:grid-cols-2">
        {items.map((item) => (
          <article
            key={`${item.awardName || item.title}-${item.awardDate || item.date || ''}`}
            className="grid gap-1 rounded-[22px] border border-slate-900/8 bg-white px-5 py-[18px]"
          >
            <h3 className="m-0 text-base font-semibold text-[var(--text-h)]">
              {item.awardName || item.title}
            </h3>
            <div className="flex gap-3">
              <p className="text-blue-700 font-semibold text-xs">{item.organization || item.institution}</p>
              <div className="flex flex-wrap w-fit items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span>{item.awardDate || item.date}</span>
              </div>
            </div>
            <p className="m-0 text-xs leading-[1.7] text-slate-500">
              {item.content || item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AboutAwardsSection
