import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// The page's signature: a section divider that traces like a plasma/laser
// cutter tracking across a steel plate as the reader scrolls past it.
export default function Cutline({ label }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 40%'],
  })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const dotX = useTransform(scrollYProgress, [0, 1], ['2%', '98%'])

  return (
    <div ref={ref} className="relative w-full h-16 flex items-center">
      <svg className="w-full h-full" viewBox="0 0 1000 60" preserveAspectRatio="none">
        <line x1="0" y1="30" x2="1000" y2="30" stroke="#2a2e34" strokeWidth="1" />
        <motion.line
          x1="0" y1="30" x2="1000" y2="30"
          stroke="#ff5a1f"
          strokeWidth="2"
          style={{ pathLength }}
        />
        {[0, 250, 500, 750, 1000].map((x) => (
          <line key={x} x1={x} y1="24" x2={x} y2="36" stroke="#2a2e34" strokeWidth="1" />
        ))}
      </svg>
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-signal shadow-[0_0_8px_2px_rgba(255,176,32,0.6)]"
        style={{ left: dotX }}
      />
      {label && (
        <span className="absolute -top-5 left-0 font-mono text-[10px] tracking-[0.25em] text-steel uppercase">
          {label}
        </span>
      )}
    </div>
  )
}
