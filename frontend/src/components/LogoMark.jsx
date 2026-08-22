export default function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="9" cy="28" r="4.5" fill="var(--color-teal-500)" />
      <circle cx="31" cy="12" r="4.5" fill="var(--color-copper-500)" />
      <path
        d="M12.5 25 C 18 20, 22 20, 27.5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  )
}
