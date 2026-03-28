export type ThemeMode = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'phangport-theme'

export function getResolvedTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const documentTheme = document.documentElement.dataset.theme

  if (documentTheme === 'dark' || documentTheme === 'light') {
    return documentTheme
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
