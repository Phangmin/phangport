import { useEffect, useState } from 'react'

export const LANGUAGE_STORAGE_KEY = 'phangport-language'

export type LanguageCode = 'ko' | 'en'

function getStoredLanguage(): LanguageCode {
  if (typeof window === 'undefined') {
    return 'ko'
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return savedLanguage === 'en' ? 'en' : 'ko'
}

function useLanguage() {
  const [language, setLanguage] = useState<LanguageCode>(() => getStoredLanguage())

  useEffect(() => {
    function handleLanguageChange(event: Event) {
      if (!(event instanceof CustomEvent)) {
        return
      }

      setLanguage(event.detail === 'en' ? 'en' : 'ko')
    }

    function handleStorage(event: StorageEvent) {
      if (event.key !== LANGUAGE_STORAGE_KEY) {
        return
      }

      setLanguage(event.newValue === 'en' ? 'en' : 'ko')
    }

    window.addEventListener('phangport-language-change', handleLanguageChange)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('phangport-language-change', handleLanguageChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  return language
}

export default useLanguage
