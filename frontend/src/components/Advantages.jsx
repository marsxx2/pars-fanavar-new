import { Layers, ShieldCheck, TrendingUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const icons = [Layers, TrendingUp, ShieldCheck]

export default function Advantages() {
  const { t } = useLanguage()

  return (
    <section id="advantages" className="bg-paper-50 py-20 dark:bg-ink-950 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-copper-600 dark:text-copper-400">
            {t.advantages.eyebrow}
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-950 dark:text-paper-50 sm:text-4xl">
            {t.advantages.title}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.advantages.items.map((item, idx) => {
            const Icon = icons[idx]
            return (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-ink-950/8 bg-gradient-to-b from-white to-paper-100 p-7 dark:border-white/8 dark:from-white/[0.04] dark:to-transparent"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="font-display mt-5 text-lg font-semibold text-ink-950 dark:text-paper-50">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-6.5 text-ink-950/65 dark:text-paper-50/65">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
