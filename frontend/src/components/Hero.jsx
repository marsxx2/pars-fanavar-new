import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import HeroVisual from './HeroVisual'

export default function Hero() {
  const { t, dir } = useLanguage()
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <section id="top" className="relative overflow-hidden bg-paper-50 dark:bg-ink-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-30"
        style={{
          background:
            'radial-gradient(600px circle at 15% 20%, color-mix(in srgb, var(--color-teal-500) 18%, transparent), transparent), radial-gradient(500px circle at 85% 75%, color-mix(in srgb, var(--color-copper-500) 16%, transparent), transparent)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div>
          <span className="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400">
            {t.hero.eyebrow}
          </span>

          <h1 className="font-display mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-ink-950 dark:text-paper-50 sm:text-5xl lg:text-[3.4rem]">
            {t.hero.titleLine1}{' '}
            <span className="text-teal-500">{t.hero.titleAccent1}</span>{' '}
            {t.hero.titleLine2}{' '}
            <span className="text-copper-500">{t.hero.titleAccent2}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-ink-950/70 dark:text-paper-50/70">
            {t.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-teal-500 px-6 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-transform hover:-translate-y-0.5 hover:bg-teal-600"
            >
              {t.hero.ctaPrimary}
              <Arrow size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </a>
            <a
              href="#services"
              className="inline-flex h-12 cursor-pointer items-center rounded-full border border-ink-950/15 px-6 text-sm font-semibold text-ink-950 transition-colors hover:border-copper-500 hover:text-copper-600 dark:border-white/15 dark:text-paper-50 dark:hover:text-copper-400"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {t.hero.badges.map((b) => (
              <div key={b.label} className="border-s-2 border-teal-500/40 ps-4">
                <dt className="text-sm font-semibold text-ink-950 dark:text-paper-50">{b.label}</dt>
                <dd className="mt-0.5 text-xs text-ink-950/55 dark:text-paper-50/55">{b.sub}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="rounded-3xl border border-ink-950/8 bg-white/60 p-8 shadow-xl shadow-ink-950/5 backdrop-blur dark:border-white/8 dark:bg-white/[0.03] dark:shadow-black/20">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
