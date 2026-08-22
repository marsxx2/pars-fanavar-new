import { useState } from 'react'
import { CheckCircle2, Loader2, AlertTriangle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9+\s-]{8,15}$/

const initialState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  interests: [],
  message: '',
}

export default function ConsultationForm() {
  const { t, lang } = useLanguage()
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function setField(field, value) {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function toggleInterest(option) {
    setValues((v) => ({
      ...v,
      interests: v.interests.includes(option)
        ? v.interests.filter((i) => i !== option)
        : [...v.interests, option],
    }))
    if (errors.interests) setErrors((e) => ({ ...e, interests: undefined }))
  }

  function validate() {
    const next = {}
    if (!values.name.trim()) next.name = t.form.required
    if (!values.company.trim()) next.company = t.form.required
    if (!values.email.trim()) next.email = t.form.required
    else if (!EMAIL_RE.test(values.email.trim())) next.email = t.form.invalidEmail
    if (!values.phone.trim()) next.phone = t.form.required
    else if (!PHONE_RE.test(values.phone.trim())) next.phone = t.form.invalidPhone
    if (values.interests.length === 0) next.interests = t.form.pickOne
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validation = validate()
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus('submitting')
    try {
      const apiBase = import.meta.env.VITE_API_URL || ''
      const res = await fetch(`${apiBase}/api/consultations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, language: lang }),
      })
      if (!res.ok) throw new Error('request_failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function resetForm() {
    setValues(initialState)
    setErrors({})
    setStatus('idle')
  }

  const inputClasses = (field) =>
    `h-12 w-full rounded-xl border bg-white px-4 text-sm text-ink-950 outline-none transition-colors placeholder:text-ink-950/35 focus:border-teal-500 dark:bg-ink-900 dark:text-paper-50 dark:placeholder:text-paper-50/30 ${
      errors[field] ? 'border-red-400' : 'border-ink-950/12 dark:border-white/12'
    }`

  if (status === 'success') {
    return (
      <div
        className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-teal-500/25 bg-teal-500/5 p-10 text-center"
        role="status"
      >
        <CheckCircle2 size={44} className="text-teal-500" aria-hidden="true" />
        <h3 className="font-display mt-4 text-xl font-bold text-ink-950 dark:text-paper-50">
          {t.form.successTitle}
        </h3>
        <p className="mt-2 text-sm leading-6 text-ink-950/65 dark:text-paper-50/65">
          {t.form.successBody}
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-6 inline-flex h-11 cursor-pointer items-center rounded-full border border-ink-950/15 px-5 text-sm font-semibold text-ink-950 hover:border-teal-500 hover:text-teal-600 dark:border-white/15 dark:text-paper-50 dark:hover:text-teal-400"
        >
          {t.form.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-2xl">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={t.form.fields.name} error={errors.name} htmlFor="pf-name">
          <input
            id="pf-name"
            type="text"
            autoComplete="name"
            placeholder={t.form.fields.namePlaceholder}
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            className={inputClasses('name')}
            aria-invalid={Boolean(errors.name)}
          />
        </Field>

        <Field label={t.form.fields.company} error={errors.company} htmlFor="pf-company">
          <input
            id="pf-company"
            type="text"
            autoComplete="organization"
            placeholder={t.form.fields.companyPlaceholder}
            value={values.company}
            onChange={(e) => setField('company', e.target.value)}
            className={inputClasses('company')}
            aria-invalid={Boolean(errors.company)}
          />
        </Field>

        <Field label={t.form.fields.email} error={errors.email} htmlFor="pf-email">
          <input
            id="pf-email"
            type="email"
            autoComplete="email"
            dir="ltr"
            placeholder={t.form.fields.emailPlaceholder}
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            className={`${inputClasses('email')} text-start`}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>

        <Field label={t.form.fields.phone} error={errors.phone} htmlFor="pf-phone">
          <input
            id="pf-phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder={t.form.fields.phonePlaceholder}
            value={values.phone}
            onChange={(e) => setField('phone', e.target.value)}
            className={`${inputClasses('phone')} text-start`}
            aria-invalid={Boolean(errors.phone)}
          />
        </Field>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-1 text-sm font-medium text-ink-950 dark:text-paper-50">
          {t.form.fields.interest}
        </legend>
        <p className="mb-3 text-xs text-ink-950/50 dark:text-paper-50/50">{t.form.fields.interestHelp}</p>
        <div className="flex flex-wrap gap-2.5">
          {t.form.interestOptions.map((option) => {
            const active = values.interests.includes(option)
            return (
              <button
                type="button"
                key={option}
                onClick={() => toggleInterest(option)}
                aria-pressed={active}
                className={`h-10 cursor-pointer rounded-full border px-4 text-sm font-medium transition-colors ${
                  active
                    ? 'border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300'
                    : 'border-ink-950/15 text-ink-950/70 hover:border-teal-500/50 dark:border-white/15 dark:text-paper-50/70'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
        {errors.interests && <p className="mt-2 text-xs text-red-500">{errors.interests}</p>}
      </fieldset>

      <Field label={t.form.fields.message} className="mt-5" htmlFor="pf-message">
        <textarea
          id="pf-message"
          rows={4}
          placeholder={t.form.fields.messagePlaceholder}
          value={values.message}
          onChange={(e) => setField('message', e.target.value)}
          className="w-full resize-none rounded-xl border border-ink-950/12 bg-white px-4 py-3 text-sm text-ink-950 outline-none transition-colors placeholder:text-ink-950/35 focus:border-teal-500 dark:border-white/12 dark:bg-ink-900 dark:text-paper-50 dark:placeholder:text-paper-50/30"
        />
      </Field>

      {status === 'error' && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-500/5 p-4 text-red-600 dark:text-red-400">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold">{t.form.errorTitle}</p>
            <p className="text-sm opacity-80">{t.form.errorBody}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-7 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-teal-500 text-sm font-semibold text-white shadow-lg shadow-teal-500/25 transition-transform hover:-translate-y-0.5 hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto sm:px-10"
      >
        {status === 'submitting' && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
        {status === 'submitting' ? t.form.submitting : t.form.submit}
      </button>
    </form>
  )
}

function Field({ label, htmlFor, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink-950 dark:text-paper-50">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
