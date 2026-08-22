import { Mail, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import LogoMark from './LogoMark'

export default function Footer() {
  const { t } = useLanguage()

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#market', label: t.nav.market },
    { href: '#advantages', label: t.nav.advantages },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <footer className="border-t border-ink-950/8 bg-paper-50 py-14 dark:border-white/8 dark:bg-ink-950">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 text-ink-950 dark:text-paper-50">
              <LogoMark />
              <span className="font-display text-lg font-bold">{t.nav.brand}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-6 text-ink-950/55 dark:text-paper-50/55">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-950 dark:text-paper-50">
              {t.footer.quickLinksTitle}
            </h3>
            <ul className="mt-3 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-ink-950/60 hover:text-teal-600 dark:text-paper-50/60 dark:hover:text-teal-400"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-950 dark:text-paper-50">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-ink-950/60 dark:text-paper-50/60">
              <li className="flex items-center gap-2">
                <Mail size={15} aria-hidden="true" />
                <span dir="ltr">{t.footer.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} aria-hidden="true" />
                <span dir="ltr">{t.footer.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} aria-hidden="true" />
                <span>{t.footer.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-950/8 pt-6 text-center text-xs text-ink-950/45 dark:border-white/8 dark:text-paper-50/45">
          © {new Date().getFullYear()} {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
