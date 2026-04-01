export type ThemeMode = 'light' | 'dark'
export type ThemePreference = ThemeMode | 'system'

const LEGACY_THEME_STORAGE_KEY = 'phangport-theme'
export const THEME_PREFERENCE_STORAGE_KEY = 'phangport-theme-preference'

const SYSTEM_THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)'
const MOBILE_THEME_OVERRIDE_QUERY = '(max-width: 767px)'

declare global {
  interface Window {
    __phangportThemeSystemQuery?: MediaQueryList
    __phangportThemeSystemHandler?: ((event: MediaQueryListEvent) => void) | null
    __phangportThemeMobileQuery?: MediaQueryList
    __phangportThemeMobileHandler?: ((event: MediaQueryListEvent) => void) | null
  }
}

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark'
}

function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'system' || isThemeMode(value)
}

function dispatchThemeChange(theme: ThemeMode) {
  window.dispatchEvent(new CustomEvent('phangport-theme-change', { detail: theme }))
}

function applyResolvedTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function getSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia(SYSTEM_THEME_MEDIA_QUERY).matches ? 'dark' : 'light'
}

function shouldForceSystemThemeOnMobile() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia(MOBILE_THEME_OVERRIDE_QUERY).matches
}

export function getStoredThemePreference(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'system'
  }

  const storedPreference = window.localStorage.getItem(THEME_PREFERENCE_STORAGE_KEY)

  return isThemePreference(storedPreference) ? storedPreference : 'system'
}

export function getEffectiveThemePreference(): ThemePreference {
  const storedPreference = getStoredThemePreference()

  return shouldForceSystemThemeOnMobile() ? 'system' : storedPreference
}

export function resolveThemePreference(preference: ThemePreference): ThemeMode {
  return preference === 'system' ? getSystemTheme() : preference
}

export function getResolvedTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const documentTheme = document.documentElement.dataset.theme

  if (isThemeMode(documentTheme)) {
    return documentTheme
  }

  return resolveThemePreference(getEffectiveThemePreference())
}

export function setThemePreference(preference: ThemePreference): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  window.localStorage.setItem(THEME_PREFERENCE_STORAGE_KEY, preference)
  window.localStorage.removeItem(LEGACY_THEME_STORAGE_KEY)

  const resolvedTheme = resolveThemePreference(getEffectiveThemePreference())
  applyResolvedTheme(resolvedTheme)
  dispatchThemeChange(resolvedTheme)

  return resolvedTheme
}

export function initializeTheme() {
  if (typeof window === 'undefined') {
    return
  }

  const systemQuery = window.matchMedia(SYSTEM_THEME_MEDIA_QUERY)
  const mobileQuery = window.matchMedia(MOBILE_THEME_OVERRIDE_QUERY)

  const syncThemeFromEnvironment = (shouldDispatch = false) => {
    const resolvedTheme = resolveThemePreference(getEffectiveThemePreference())
    applyResolvedTheme(resolvedTheme)

    if (shouldDispatch) {
      dispatchThemeChange(resolvedTheme)
    }
  }

  const storedPreference = getStoredThemePreference()
  window.localStorage.setItem(THEME_PREFERENCE_STORAGE_KEY, storedPreference)
  window.localStorage.removeItem(LEGACY_THEME_STORAGE_KEY)
  syncThemeFromEnvironment()

  if (
    window.__phangportThemeSystemQuery &&
    window.__phangportThemeSystemHandler &&
    window.__phangportThemeSystemQuery !== systemQuery
  ) {
    window.__phangportThemeSystemQuery.removeEventListener(
      'change',
      window.__phangportThemeSystemHandler,
    )
  }

  if (
    window.__phangportThemeMobileQuery &&
    window.__phangportThemeMobileHandler &&
    window.__phangportThemeMobileQuery !== mobileQuery
  ) {
    window.__phangportThemeMobileQuery.removeEventListener(
      'change',
      window.__phangportThemeMobileHandler,
    )
  }

  if (window.__phangportThemeSystemQuery === systemQuery && window.__phangportThemeSystemHandler) {
    systemQuery.removeEventListener('change', window.__phangportThemeSystemHandler)
  }

  if (window.__phangportThemeMobileQuery === mobileQuery && window.__phangportThemeMobileHandler) {
    mobileQuery.removeEventListener('change', window.__phangportThemeMobileHandler)
  }

  const handleSystemThemeChange = () => {
    if (getEffectiveThemePreference() !== 'system') {
      return
    }

    syncThemeFromEnvironment(true)
  }

  const handleMobileThemeOverrideChange = () => {
    syncThemeFromEnvironment(true)
  }

  systemQuery.addEventListener('change', handleSystemThemeChange)
  mobileQuery.addEventListener('change', handleMobileThemeOverrideChange)

  window.__phangportThemeSystemQuery = systemQuery
  window.__phangportThemeSystemHandler = handleSystemThemeChange
  window.__phangportThemeMobileQuery = mobileQuery
  window.__phangportThemeMobileHandler = handleMobileThemeOverrideChange
}
