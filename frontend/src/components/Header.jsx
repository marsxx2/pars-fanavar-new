import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import LogoMark from './LogoMark'

export default function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#market', label: t.nav.market },
    { href: '#advantages', label: t.nav.advantages },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-ink-950/8 bg-paper-50/85 backdrop-blur-md dark:border-white/8 dark:bg-ink-950/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-ink-950 dark:text-paper-50">
          <LogoMark />
          <span className="font-display text-lg font-bold tracking-tight">{t.nav.brand}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-950/75 transition-colors hover:text-teal-600 dark:text-paper-50/75 dark:hover:text-teal-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex h-11 cursor-pointer items-center rounded-full bg-teal-500 px-5 text-sm font-semibold text-white shadow-sm shadow-teal-500/30 transition-transform hover:-translate-y-0.5 hover:bg-teal-600"
          >
            {t.nav.contact}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink-950/10 text-ink-950 dark:border-white/10 dark:text-paper-50 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-950/8 bg-paper-50 px-5 py-4 dark:border-white/8 dark:bg-ink-950 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Primary mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-950/85 hover:bg-ink-950/5 dark:text-paper-50/85 dark:hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 flex h-11 items-center justify-center rounded-full bg-teal-500 text-sm font-semibold text-white"
          >
            {t.nav.contact}
          </a>
        </div>
      )}
    </header>
  )
}
