import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * WordReveal
 * Splits a string into words and reveals them via a staggered upward mask.
 * Excellent for standard headings.
 */
export function WordReveal({ children, className = '', delay = 0, stagger = 0.05 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  
  if (typeof children !== 'string') return <span className={className}>{children}</span>

  const words = children.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      }
    }
  }

  const child = {
    hidden: { y: '120%', opacity: 0, rotate: 2 },
    visible: {
      y: '0%',
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
      aria-label={children} // accessibility
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-block pb-2 -mb-2 mr-[0.3em]">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/**
 * LetterReveal
 * Splits a string into characters and staggers them with a rapid blur reveal.
 * Perfect for massive hero text or precise numbers.
 */
export function LetterReveal({ children, className = '', delay = 0, stagger = 0.02 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  
  if (typeof children !== 'string') return <span className={className}>{children}</span>

  const letters = Array.from(children)

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      }
    }
  }

  const child = {
    hidden: { y: 20, opacity: 0, filter: 'blur(8px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
      aria-label={children}
    >
      {letters.map((letter, index) => (
        <motion.span 
          key={index} 
          variants={child} 
          className="inline-block whitespace-pre"
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

/**
 * LineReveal
 * Fades and slides up block content. Best for <p> tags.
 */
export function LineReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: 30, opacity: 0, filter: 'blur(5px)' }}
        animate={isInView ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
