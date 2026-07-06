import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function MaskReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
