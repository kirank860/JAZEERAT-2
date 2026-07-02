import { motion } from 'framer-motion'

/**
 * Reveal — wraps any children with a scroll-triggered fade+slide animation.
 *
 * Props:
 *   delay    — stagger delay in seconds (default 0)
 *   y        — slide distance in px (default 36)
 *   duration — animation duration in seconds (default 0.7)
 *   once     — only animate once (default true)
 *   className — forwarded to the wrapper div
 */
export default function Reveal({
  children,
  delay = 0,
  y = 36,
  duration = 0.7,
  once = true,
  className = '',
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // custom cubic-bezier — feels premium
      }}
    >
      {children}
    </motion.div>
  )
}
