export default function BridgeDivider({ className = '' }) {
  return (
    <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`} aria-hidden="true">
      <div className="bridge-rule rounded-full" />
    </div>
  )
}
