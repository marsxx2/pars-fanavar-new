import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t.themeToggle.aria}
      className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink-950/10 text-ink-950 transition-colors hover:border-teal-500 hover:text-teal-600 dark:border-white/10 dark:text-paper-50 dark:hover:border-teal-400 dark:hover:text-teal-400"
    >
      {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}
