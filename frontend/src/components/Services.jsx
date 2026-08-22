import { useLanguage } from '../context/LanguageContext'

export default function Services() {
  const { t } = useLanguage()

  return (
    <section id="services" className="bg-paper-50 py-20 dark:bg-ink-950 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-copper-600 dark:text-copper-400">
            {t.services.eyebrow}
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-950 dark:text-paper-50 sm:text-4xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-950/65 dark:text-paper-50/65">
            {t.services.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, idx) => (
            <article
              key={item.id}
              className={`group relative flex flex-col rounded-2xl border border-ink-950/8 bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-ink-950/5 dark:border-white/8 dark:bg-white/[0.03] dark:hover:shadow-black/20 ${
                idx === 3 ? 'lg:col-start-1' : ''
              }`}
            >
              <span className="font-display text-3xl font-bold text-ink-950/10 dark:text-paper-50/10">
                {item.id}
              </span>
              <h3 className="font-display mt-3 text-lg font-semibold text-ink-950 dark:text-paper-50">
                {item.title}
              </h3>
              <span className="mt-1 inline-block text-[11px] font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                {item.tag}
              </span>
              <p className="mt-3 text-sm leading-6.5 text-ink-950/65 dark:text-paper-50/65">
                {item.description}
              </p>
              <span
                className="mt-6 h-0.5 w-10 rounded-full bg-gradient-to-r from-teal-500 to-copper-500 transition-all group-hover:w-16"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
