import { motion } from 'framer-motion'

// A technical line-drawing of a steel portal frame / warehouse truss,
// as if lifted from a fabrication shop drawing. Draws itself in on load.
export default function HeroDrawing() {
  const draw = (delay = 0) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.6, delay, ease: 'easeInOut' }, opacity: { duration: 0.3, delay } },
    },
  })

  return (
    <svg viewBox="0 0 520 480" className="w-full h-full" fill="none">
      {/* dimension frame */}
      <motion.rect
        x="40" y="40" width="440" height="400"
        stroke="#2a2e34" strokeWidth="1"
        initial="hidden" animate="visible" variants={draw(0)}
      />

      {/* portal frame legs */}
      <motion.path
        d="M100 400 L100 140 L260 60 L420 140 L420 400"
        stroke="#8b929a" strokeWidth="2"
        initial="hidden" animate="visible" variants={draw(0.2)}
      />
      {/* apex brace */}
      <motion.path
        d="M100 140 L260 60 L420 140"
        stroke="#ff5a1f" strokeWidth="2.5"
        initial="hidden" animate="visible" variants={draw(0.9)}
      />
      {/* cross bracing */}
      <motion.path
        d="M100 400 L420 140 M420 400 L100 140"
        stroke="#3a4048" strokeWidth="1.5"
        initial="hidden" animate="visible" variants={draw(1.3)}
      />
      {/* base plates */}
      <motion.rect x="82" y="400" width="36" height="10" stroke="#8b929a" strokeWidth="1.5" initial="hidden" animate="visible" variants={draw(1.7)} />
      <motion.rect x="402" y="400" width="36" height="10" stroke="#8b929a" strokeWidth="1.5" initial="hidden" animate="visible" variants={draw(1.7)} />

      {/* dimension callouts */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.6 }}>
        <line x1="100" y1="430" x2="420" y2="430" stroke="#3a4048" strokeWidth="1" />
        <line x1="100" y1="424" x2="100" y2="436" stroke="#3a4048" strokeWidth="1" />
        <line x1="420" y1="424" x2="420" y2="436" stroke="#3a4048" strokeWidth="1" />
        <text x="260" y="448" fill="#8b929a" fontSize="11" fontFamily="IBM Plex Mono, monospace" textAnchor="middle">
          SPAN 24,000mm
        </text>
        <text x="260" y="30" fill="#8b929a" fontSize="11" fontFamily="IBM Plex Mono, monospace" textAnchor="middle">
          TOL ±0.5mm
        </text>
      </motion.g>

      {/* weld point marker */}
      <motion.circle
        cx="260" cy="60" r="4" fill="#ffb020"
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.3, duration: 0.4 }}
      />
    </svg>
  )
}
