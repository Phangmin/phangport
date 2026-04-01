import { useEffect, useRef, useState } from 'react'
import { RevealOnScroll } from '../common'
import type { LanguageCode } from '../../hooks/useLanguage'
import type { GuestbookBoardCopy, GuestbookEntry } from './types'

const ENTRY_BATCH_SIZE = 10

type GuestbookEntryListProps = {
  copy: GuestbookBoardCopy
  entries: GuestbookEntry[]
  isLoading: boolean
  loadError: string
  language: LanguageCode
  deletingEntryId: string | null
  isAdminMode: boolean
  onDeleteEntry: (entryId: string) => void
}

function formatDisplayDate(value: string, language: LanguageCode) {
  return new Intl.DateTimeFormat(language === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric',
    month: language === 'ko' ? 'numeric' : 'short',
    day: 'numeric',
  }).format(new Date(value))
}

function GuestbookEntryList({
  copy,
  entries,
  isLoading,
  loadError,
  language,
  deletingEntryId,
  isAdminMode,
  onDeleteEntry,
}: GuestbookEntryListProps) {
  const [visibleCount, setVisibleCount] = useState(ENTRY_BATCH_SIZE)
  const previousEntryCountRef = useRef(entries.length)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const previousCount = previousEntryCountRef.current
    const nextCount = entries.length

    setVisibleCount((current) => {
      if (nextCount === 0) {
        return ENTRY_BATCH_SIZE
      }

      const hadShownAllEntries = previousCount <= current

      if (hadShownAllEntries && nextCount > previousCount) {
        return Math.min(nextCount, current + (nextCount - previousCount))
      }

      return Math.min(nextCount, Math.max(ENTRY_BATCH_SIZE, current))
    })

    previousEntryCountRef.current = nextCount
  }, [entries])

  const visibleEntries = entries.slice(0, visibleCount)
  const hasMoreEntries = visibleCount < entries.length

  useEffect(() => {
    const loadMoreNode = loadMoreRef.current

    if (!loadMoreNode || !hasMoreEntries) {
      return
    }

    const observer = new IntersectionObserver(
      (observerEntries) => {
        const [entry] = observerEntries

        if (!entry?.isIntersecting) {
          return
        }

        setVisibleCount((current) => Math.min(entries.length, current + ENTRY_BATCH_SIZE))
      },
      {
        rootMargin: '240px 0px',
      },
    )

    observer.observe(loadMoreNode)

    return () => {
      observer.disconnect()
    }
  }, [entries.length, hasMoreEntries])

  return (
    <RevealOnScroll delay={0.08} distance={-18} as="section" className="grid gap-5 p-1 md:p-0" data-guestbook-board="true">
      {isLoading ? (
        <div className="rounded-[24px] border border-dashed border-slate-900/12 bg-slate-50/70 px-5 py-8 text-center" data-guestbook-surface="empty">
          <p className="m-0 text-[0.9rem] text-slate-500" data-guestbook-muted="true">
            {copy.loading}
          </p>
        </div>
      ) : loadError ? (
        <div className="rounded-[24px] border border-rose-200 bg-rose-50/80 px-5 py-8 text-center">
          <p className="m-0 text-[0.9rem] text-rose-700">{loadError}</p>
        </div>
      ) : entries.length > 0 ? (
        <div className="grid gap-4">
          <div className="relative grid w-full gap-4">
            <div className="pointer-events-none absolute bottom-2 left-[13px] top-2 w-px bg-slate-200" data-guestbook-line="true" />
            {visibleEntries.map((entry, index) => (
              <RevealOnScroll
                key={entry.id}
                delay={0.03 + index * 0.02}
                distance={-18}
                as="article"
                className="relative grid w-full grid-cols-[28px_minmax(0,1fr)] gap-4"
                data-guestbook-row="true"
              >
                <div className="relative z-10 flex justify-center pt-2">
                  <span
                    className="block h-4 w-4 rounded-full border-4 border-white bg-blue-600 shadow-[0_0_0_6px_rgba(37,99,235,0.12)]"
                    data-guestbook-dot="true"
                  />
                </div>

                <div
                  className="grid gap-3 rounded-[20px] border border-slate-900/8 bg-white p-[22px] text-left shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
                  data-guestbook-surface="entry"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <strong
                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-0.5 text-[0.7rem] font-semibold text-slate-700"
                        data-guestbook-badge="true"
                      >
                        {entry.nickname}
                      </strong>
                      <span className="text-[0.74rem] font-normal text-slate-700" data-guestbook-date="true">
                        {formatDisplayDate(entry.createdAt, language)}
                      </span>
                    </div>

                    {isAdminMode ? (
                      <button
                        type="button"
                        onClick={() => {
                          onDeleteEntry(entry.id)
                        }}
                        disabled={deletingEntryId === entry.id}
                        className="inline-flex min-h-8 items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[0.72rem] font-semibold text-rose-700 transition-colors duration-200 hover:border-rose-300 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-55"
                      >
                        {deletingEntryId === entry.id ? '삭제 중...' : '삭제'}
                      </button>
                    ) : null}
                  </div>

                  <p
                    className="m-0 pl-3 whitespace-pre-wrap text-[0.88rem] leading-[1.72] text-slate-900"
                    data-guestbook-message="true"
                  >
                    {entry.message}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {hasMoreEntries ? <div ref={loadMoreRef} className="h-10 w-full" aria-hidden="true" /> : null}
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-slate-900/12 bg-slate-50/70 px-5 py-8 text-center" data-guestbook-surface="empty">
          <p className="m-0 text-[0.9rem] text-slate-500" data-guestbook-muted="true">
            {copy.empty}
          </p>
        </div>
      )}
    </RevealOnScroll>
  )
}

export default GuestbookEntryList
