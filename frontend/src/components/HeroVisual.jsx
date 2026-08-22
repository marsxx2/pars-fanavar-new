import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

// A 5x4 grid of target nodes. Each node starts scattered (defined via a
// deterministic pseudo-random offset) and animates into its grid slot,
// visualizing the brief's core idea: unstructured input becoming
// structured, actionable intelligence.
const COLS = 5
const ROWS = 4
const CELL = 44

function scatterOffset(i) {
  // deterministic "randomness" so SSR/CSR and reloads stay consistent
  const seedX = Math.sin(i * 12.9898) * 43758.5453
  const seedY = Math.sin(i * 78.233) * 12433.111
  const dx = (seedX - Math.floor(seedX) - 0.5) * 140
  const dy = (seedY - Math.floor(seedY) - 0.5) * 140
  return { dx, dy }
}

export default function HeroVisual() {
  const { t } = useLanguage()
  const reducedMotion = usePrefersReducedMotion()
  const width = COLS * CELL
  const height = ROWS * CELL
  const nodes = Array.from({ length: COLS * ROWS }, (_, i) => {
    const col = i % COLS
    const row = Math.floor(i / COLS)
    const x = col * CELL + CELL / 2
    const y = row * CELL + CELL / 2
    const { dx, dy } = scatterOffset(i)
    const isCopper = (col + row) % 3 === 0
    return { i, x, y, dx, dy, isCopper }
  })

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-md"
        role="img"
        aria-label={t.hero.visualCaption}
      >
        <defs>
          <pattern id="grid-dots" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <circle cx={CELL / 2} cy={CELL / 2} r="1" fill="currentColor" opacity="0.08" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#grid-dots)" className="text-ink-950 dark:text-paper-50" />

        {/* connective lines drawn after nodes settle */}
        {nodes.map((n, idx) => {
          if (idx % COLS === COLS - 1) return null
          const next = nodes[idx + 1]
          return (
            <line
              key={`line-${n.i}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="currentColor"
              strokeWidth="1"
              className="animate-coalesce text-ink-950/15 dark:text-paper-50/15"
              style={{ animationDelay: `${0.9 + n.i * 0.02}s` }}
            />
          )
        })}

        {nodes.map((n) => (
          <circle
            key={n.i}
            cx={reducedMotion ? n.x : n.x + n.dx}
            cy={reducedMotion ? n.y : n.y + n.dy}
            r={n.isCopper ? 3.4 : 2.6}
            fill={n.isCopper ? 'var(--color-copper-500)' : 'var(--color-teal-500)'}
            className={reducedMotion ? '' : 'animate-coalesce'}
            style={{
              animationDelay: `${(n.i % (COLS * ROWS)) * 0.045}s`,
              transformOrigin: `${n.x}px ${n.y}px`,
            }}
          >
            {!reducedMotion && (
              <>
                <animate
                  attributeName="cx"
                  from={n.x + n.dx}
                  to={n.x}
                  begin={`${n.i * 0.045}s`}
                  dur="1.1s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.16 1 0.3 1"
                  keyTimes="0;1"
                />
                <animate
                  attributeName="cy"
                  from={n.y + n.dy}
                  to={n.y}
                  begin={`${n.i * 0.045}s`}
                  dur="1.1s"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.16 1 0.3 1"
                  keyTimes="0;1"
                />
              </>
            )}
          </circle>
        ))}
      </svg>
      <p className="mt-3 text-center text-xs font-medium text-ink-950/45 dark:text-paper-50/45">
        {t.hero.visualCaption}
      </p>
    </div>
  )
}
