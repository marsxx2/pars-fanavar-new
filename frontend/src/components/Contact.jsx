import { useLanguage } from '../context/LanguageContext'
import ConsultationForm from './ConsultationForm'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="dark relative overflow-hidden bg-ink-950 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(500px circle at 20% 10%, color-mix(in srgb, var(--color-teal-500) 20%, transparent), transparent), radial-gradient(500px circle at 80% 90%, color-mix(in srgb, var(--color-copper-500) 18%, transparent), transparent)',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 text-paper-50 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
            {t.form.eyebrow}
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-paper-50 sm:text-4xl">
            {t.form.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-paper-50/65">{t.form.subtitle}</p>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-10">
          <ConsultationForm />
        </div>
      </div>
    </section>
  )
}
