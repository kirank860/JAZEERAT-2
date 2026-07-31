import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function InitialLoader({ onComplete }) {
  useEffect(() => {
    // 2.2s duration for the initial loader
    const timer = setTimeout(() => {
      onComplete()
    }, 2200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-graphite"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex flex-col items-center gap-8"
      >
        <img src="/logo.svg" alt="Jazeerat Al Hadeed" className="h-32 md:h-40 w-auto object-contain" />
        
        <div className="h-[1px] w-48 bg-white/10 overflow-hidden relative">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.2,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-white"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
