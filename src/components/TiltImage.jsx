import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltImage({ src, alt, className = '' }) {
  const ref = useRef(null)
  
  // Motion values for tracking mouse position
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animation for smooth return to center
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  // Map mouse position to rotation angles (max tilt is 10 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    
    const width = rect.width
    const height = rect.height
    
    // Calculate mouse position relative to the center of the image (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    // Reset to center when mouse leaves
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full [perspective:1200px] ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full relative"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover shadow-2xl rounded-sm"
          style={{ transform: "translateZ(30px)" }} // Pops the image forward slightly
        />
        {/* Subtle glare effect that moves with mouse */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)",
            x: useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]),
          }}
        />
      </motion.div>
    </motion.div>
  )
}
