import { Languages } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { t, toggleLang } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.langToggle.aria}
      className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-ink-950/10 px-4 text-sm font-medium text-ink-950 transition-colors hover:border-teal-500 hover:text-teal-600 dark:border-white/10 dark:text-paper-50 dark:hover:border-teal-400 dark:hover:text-teal-400"
    >
      <Languages size={16} aria-hidden="true" />
      <span>{t.langToggle.label}</span>
    </button>
  )
}
