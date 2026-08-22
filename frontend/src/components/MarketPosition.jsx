import { Landmark, Stethoscope, Truck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const verticalIcons = [Landmark, Stethoscope, Truck]

export default function MarketPosition() {
  const { t } = useLanguage()

  return (
    <section id="market" className="bg-paper-100 py-20 dark:bg-ink-900 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            {t.market.eyebrow}
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-950 dark:text-paper-50 sm:text-4xl">
            {t.market.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-950/65 dark:text-paper-50/65">
            {t.market.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {t.market.points.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-ink-950/8 bg-white p-7 dark:border-white/8 dark:bg-white/[0.03]"
            >
              <h3 className="font-display text-lg font-semibold text-ink-950 dark:text-paper-50">
                {p.title}
              </h3>
              <p className="mt-2.5 text-sm leading-6.5 text-ink-950/65 dark:text-paper-50/65">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <h3 className="font-display mt-16 text-xl font-semibold text-ink-950 dark:text-paper-50">
          {t.market.verticalsTitle}
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {t.market.verticals.map((v, idx) => {
            const Icon = verticalIcons[idx]
            return (
              <div
                key={v.title}
                className="flex items-start gap-4 rounded-2xl border border-ink-950/8 bg-white p-6 dark:border-white/8 dark:bg-white/[0.03]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-copper-500/10 text-copper-600 dark:text-copper-400">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h4 className="font-semibold text-ink-950 dark:text-paper-50">{v.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-ink-950/60 dark:text-paper-50/60">
                    {v.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
