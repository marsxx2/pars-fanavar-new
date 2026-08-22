import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

const DIRS = { fa: 'rtl', en: 'ltr' }

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'fa'
    return localStorage.getItem('pf-lang') || 'fa'
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = DIRS[lang]
    localStorage.setItem('pf-lang', lang)
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      dir: DIRS[lang],
      setLang,
      toggleLang: () => setLang((l) => (l === 'fa' ? 'en' : 'fa')),
      t: translations[lang],
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
