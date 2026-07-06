import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia('(max-width: 1024px)').matches) return

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      const target = e.target
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      height: 12,
      width: 12,
      backgroundColor: 'var(--color-weld)',
      border: '0px solid transparent',
      opacity: 1
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(255, 90, 31, 0.1)',
      border: '1px solid var(--color-weld)',
      opacity: 1
    }
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden lg:block shadow-[0_0_10px_rgba(255,90,31,0.5)]"
      variants={variants}
      animate={isHovering ? 'hover' : 'default'}
      transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.5 }}
    />
  )
}
