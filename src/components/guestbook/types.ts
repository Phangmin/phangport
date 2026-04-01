export type GuestbookEntry = {
  id: string
  nickname: string
  message: string
  createdAt: string
}

export type SubmitState =
  | { type: 'idle'; message: '' }
  | { type: 'success' | 'error'; message: string }

export type GuestbookBoardCopy = {
  eyebrow: string
  title: string
  description: string
  empty: string
  loading: string
}

export type GuestbookFormCopy = {
  eyebrow: string
  title: string
  description: string
  nicknameLabel: string
  messageLabel: string
  nicknamePlaceholder: string
  messagePlaceholder: string
  helper: string
  submitIdle: string
  submitBusy: string
}
