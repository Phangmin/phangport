import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Footer, RevealOnScroll } from '../components/common'
import {
  GuestbookEntryForm,
  GuestbookEntryList,
  type GuestbookBoardCopy,
  type GuestbookEntry,
  type GuestbookFormCopy,
  type SubmitState,
} from '../components/guestbook'
import useLanguage, { type LanguageCode } from '../hooks/useLanguage'

type PageCopy = {
  eyebrow: string
  description: string
  board: GuestbookBoardCopy
  form: GuestbookFormCopy & {
    success: string
    loadError: string
  }
}

const GUESTBOOK_CACHE_KEY = 'phangport-guestbook-cache'

const pageCopyByLanguage: Record<LanguageCode, PageCopy> = {
  ko: {
    eyebrow: 'Guestbook',
    description:
      '짧은 인사도 좋고, 프로젝트를 본 인상도 좋습니다. 지나간 흔적이 쌓이듯 한 줄씩 남겨주세요.',
    board: {
      eyebrow: 'Latest Notes',
      title: '최신 방명록',
      description: '최근에 남겨진 메시지를 최신순으로 확인할 수 있습니다.',
      empty: '아직 작성된 방명록이 없습니다. 첫 메시지를 남겨보세요.',
      loading: '방명록을 불러오는 중입니다.',
    },
    form: {
      eyebrow: 'Leave a Note',
      title: '방명록 남기기',
      description: '닉네임과 메시지만 입력하면 바로 방명록에 등록됩니다.',
      nicknameLabel: '닉네임',
      messageLabel: '메시지',
      nicknamePlaceholder: '닉네임을 입력해주세요',
      messagePlaceholder: '짧은 인사, 프로젝트 인상, 응원의 한 줄 등 남기고 싶은 말을 100자 이내로 남겨보세요.',
      helper: '작성일은 서버에서 자동으로 기록됩니다.',
      submitIdle: '방명록 남기기',
      submitBusy: '등록 중...',
      success: '방명록이 등록되었습니다.',
      loadError: '방명록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
    },
  },
  en: {
    eyebrow: 'Guestbook',
    description:
      'A short hello is enough. Leave a small note, an impression, or a quick message so your visit becomes part of the page.',
    board: {
      eyebrow: 'Latest Notes',
      title: 'Recent guestbook entries',
      description: 'Browse the most recent notes in reverse chronological order.',
      empty: 'There are no guestbook entries yet. Leave the first note.',
      loading: 'Loading guestbook entries.',
    },
    form: {
      eyebrow: 'Leave a Note',
      title: 'Write in the guestbook',
      description: 'Only a nickname and a message are required.',
      nicknameLabel: 'Nickname',
      messageLabel: 'Message',
      nicknamePlaceholder: 'Enter your nickname',
      messagePlaceholder: 'Leave a short hello, an impression, or a quick note within 100 characters.',
      helper: 'The created date is stored automatically by the server.',
      submitIdle: 'Add to guestbook',
      submitBusy: 'Submitting...',
      success: 'Your guestbook entry has been added.',
      loadError: 'Could not load the guestbook. Please try again later.',
    },
  },
}

function readCachedEntries() {
  if (typeof window === 'undefined') {
    return [] as GuestbookEntry[]
  }

  try {
    const storedValue = window.localStorage.getItem(GUESTBOOK_CACHE_KEY)

    if (!storedValue) {
      return [] as GuestbookEntry[]
    }

    const parsedValue = JSON.parse(storedValue) as unknown
    return Array.isArray(parsedValue) ? (parsedValue as GuestbookEntry[]) : []
  } catch {
    return [] as GuestbookEntry[]
  }
}

function writeCachedEntries(entries: GuestbookEntry[]) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(GUESTBOOK_CACHE_KEY, JSON.stringify(entries.slice(0, 100)))
  } catch {
    // Ignore cache write errors.
  }
}

function GuestbookPage() {
  const language = useLanguage()
  const copy = pageCopyByLanguage[language]
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => readCachedEntries())
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(() => readCachedEntries().length === 0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>({ type: 'idle', message: '' })
  const [refreshKey, setRefreshKey] = useState(0)
  const [adminPassword, setAdminPassword] = useState('')
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null)
  const submitLockRef = useRef(false)
  const nicknameRef = useRef('')
  const messageRef = useRef('')

  useEffect(() => {
    nicknameRef.current = nickname
  }, [nickname])

  useEffect(() => {
    messageRef.current = message
  }, [message])

  useEffect(() => {
    writeCachedEntries(entries)
  }, [entries])

  useEffect(() => {
    function handleGuestbookCleared() {
      setEntries([])
      setLoadError('')
      setRefreshKey((current) => current + 1)
    }

    window.addEventListener('phangport-guestbook-cleared', handleGuestbookCleared)

    return () => {
      window.removeEventListener('phangport-guestbook-cleared', handleGuestbookCleared)
    }
  }, [])

  useEffect(() => {
    function handleGuestbookAdminAuth(event: Event) {
      if (!(event instanceof CustomEvent) || typeof event.detail !== 'string') {
        return
      }

      setAdminPassword(event.detail)
    }

    function handleGuestbookAdminExit() {
      setAdminPassword('')
      setDeletingEntryId(null)
    }

    window.addEventListener('phangport-guestbook-admin-auth', handleGuestbookAdminAuth)
    window.addEventListener('phangport-guestbook-admin-exit', handleGuestbookAdminExit)

    return () => {
      window.removeEventListener('phangport-guestbook-admin-auth', handleGuestbookAdminAuth)
      window.removeEventListener('phangport-guestbook-admin-exit', handleGuestbookAdminExit)
    }
  }, [])

  useEffect(() => {
    let isCancelled = false

    async function loadEntries() {
      if (entries.length === 0) {
        setIsLoading(true)
      }
      setLoadError('')

      try {
        const response = await fetch('/api/guestbook')
        const payload = (await response.json().catch(() => null)) as
          | { entries?: GuestbookEntry[]; error?: string }
          | null

        if (!response.ok) {
          throw new Error(payload?.error ?? copy.form.loadError)
        }

        if (!isCancelled) {
          setEntries(Array.isArray(payload?.entries) ? payload.entries : [])
        }
      } catch (error) {
        if (!isCancelled) {
          setLoadError(error instanceof Error ? error.message : copy.form.loadError)
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadEntries()

    return () => {
      isCancelled = true
    }
  }, [copy.form.loadError, refreshKey])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting || submitLockRef.current) {
      return
    }

    const submittedNickname = nickname.trim()
    const submittedMessage = message.trim()

    if (!submittedNickname || !submittedMessage) {
      setSubmitState({ type: 'error', message: copy.form.loadError })
      return
    }

    const optimisticId = crypto.randomUUID()
    const optimisticEntry: GuestbookEntry = {
      id: optimisticId,
      nickname: submittedNickname,
      message: submittedMessage,
      createdAt: new Date().toISOString(),
    }

    submitLockRef.current = true
    setIsSubmitting(true)
    setSubmitState({ type: 'idle', message: '' })
    setEntries((current) => [optimisticEntry, ...current])
    setNickname('')
    setMessage('')
    setIsSubmitting(false)

    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: optimisticId,
          nickname: submittedNickname,
          message: submittedMessage,
        }),
      })

      const payload = (await response.json().catch(() => null)) as
        | { entry?: GuestbookEntry; error?: string }
        | null

      const createdEntry = payload?.entry

      if (!response.ok || !createdEntry) {
        throw new Error(payload?.error ?? copy.form.loadError)
      }

      setEntries((current) => current.map((entry) => (entry.id === optimisticId ? createdEntry : entry)))
      setSubmitState({ type: 'success', message: copy.form.success })
    } catch (error) {
      setEntries((current) => current.filter((entry) => entry.id !== optimisticId))

      if (!nicknameRef.current && !messageRef.current) {
        setNickname(submittedNickname)
        setMessage(submittedMessage)
      }

      setSubmitState({
        type: 'error',
        message: error instanceof Error ? error.message : copy.form.loadError,
      })
    } finally {
      submitLockRef.current = false
      setIsSubmitting(false)
    }
  }

  async function handleDeleteEntry(entryId: string) {
    if (!adminPassword || deletingEntryId) {
      return
    }

    const previousEntries = entries
    setDeletingEntryId(entryId)
    setLoadError('')
    setEntries((current) => current.filter((entry) => entry.id !== entryId))

    try {
      const response = await fetch('/api/guestbook', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: entryId,
          password: adminPassword,
        }),
      })

      const payload = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(payload?.error ?? '방명록을 삭제하지 못했습니다.')
      }
    } catch (error) {
      setEntries(previousEntries)
      setLoadError(error instanceof Error ? error.message : '방명록을 삭제하지 못했습니다.')
    } finally {
      setDeletingEntryId(null)
    }
  }

  return (
    <main className="min-h-screen text-left text-[var(--text-h)] [--navbar-offset:104px] max-md:[--navbar-offset:96px]">
      <section className="mx-auto grid w-[min(1126px,calc(100%-24px))] gap-5 pb-[60px] pt-[calc(var(--navbar-offset)+12px)] md:w-[min(1126px,calc(100%-128px))] md:gap-7 md:pt-[calc(var(--navbar-offset)+16px)]">
        <RevealOnScroll className="px-1 py-1">
          <div className="grid gap-2">
            <p className="m-0 text-[0.76rem] font-bold uppercase tracking-[0.2em] text-blue-600" data-guestbook-accent="true">
              {copy.eyebrow}
            </p>
            <p className="m-0 max-w-[780px] text-[0.9rem] leading-[1.8] text-slate-600 md:text-[0.94rem]" data-guestbook-muted="true">
              {copy.description}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-10 xl:grid-cols-[minmax(320px,0.92fr)_minmax(0,1.08fr)] xl:items-start">
          <GuestbookEntryForm
            copy={copy.form}
            nickname={nickname}
            message={message}
            isSubmitting={isSubmitting}
            submitState={submitState}
            onNicknameChange={(value) => {
              setNickname(value)
              setSubmitState({ type: 'idle', message: '' })
            }}
            onMessageChange={(value) => {
              setMessage(value)
              setSubmitState({ type: 'idle', message: '' })
            }}
            onSubmit={handleSubmit}
          />

          <GuestbookEntryList
            copy={copy.board}
            entries={entries}
            isLoading={isLoading}
            loadError={loadError}
            language={language}
            deletingEntryId={deletingEntryId}
            isAdminMode={Boolean(adminPassword)}
            onDeleteEntry={handleDeleteEntry}
          />
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default GuestbookPage
