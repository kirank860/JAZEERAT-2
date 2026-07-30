import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function CinematicIntro() {
  const containerRef = useRef(null)
  
  // The outer container is 300vh, so scrollYProgress maps 0 to 1 over that distance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── SEQUENCE 1: Headline (0% -> 40%) ──
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.4], [0, 1, 1, 0])
  const headlineY = useTransform(scrollYProgress, [0, 0.4], [50, -100])
  
  // ── SEQUENCE 2: Cinematic Image Reveal (30% -> 70%) ──
  // The image starts as a small crop on the right and expands to full screen
  const imageClip = useTransform(scrollYProgress, [0.3, 0.7], ['inset(20% 10% 20% 70%)', 'inset(0% 0% 0% 0%)'])
  const imageScale = useTransform(scrollYProgress, [0.3, 0.7], [1.3, 1])
  const imageOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1])

  // Background overlay (darkens as image expands)
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 0.6])

  // ── SEQUENCE 3: Body Text & CTA (65% -> 85%) ──
  const textOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1])
  const textY = useTransform(scrollYProgress, [0.65, 0.8], [60, 0])

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-graphite">
      {/* ── STICKY VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 bp-grid-fine opacity-20 pointer-events-none" />

        {/* ── STAGE 1: HEADLINE ── */}
        <motion.div 
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-px bg-steel-light/50" />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-steel-light">Phase 01 / Integration</span>
            <span className="w-12 h-px bg-steel-light/50" />
          </div>
          
          <h2 className="font-display font-extrabold uppercase text-6xl md:text-[80px] lg:text-[120px] leading-[0.85] text-white tracking-tighter mix-blend-screen">
            <span className="block">WE FORGE</span>
            <span className="block text-steel-light">THE FUTURE</span>
          </h2>
        </motion.div>

        {/* ── STAGE 2: CINEMATIC IMAGE ── */}
        <motion.div 
          style={{ clipPath: imageClip, opacity: imageOpacity }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          <motion.div 
            style={{ scale: imageScale }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-[url('/assets/what-we-do.webp')] bg-cover bg-center" />
            {/* Soft directional spotlight effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-graphite/80 via-transparent to-transparent" />
          </motion.div>
        </motion.div>

        {/* Darkening Overlay for text readability */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 z-30 bg-graphite pointer-events-none"
        />

        {/* ── STAGE 3: BODY TEXT & CTA ── */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="absolute z-40 left-6 lg:left-24 bottom-24 lg:bottom-40 max-w-lg pointer-events-auto"
        >
          <h3 className="font-display font-bold uppercase text-3xl md:text-5xl text-white mb-6">
            Industrial Reality
          </h3>
          <p className="text-steel-light text-sm md:text-lg leading-relaxed mb-10 font-serif italic border-l-2 border-weld pl-6">
            "A seamless transition from digital architecture to heavy industrial reality. Our workshop bridges the gap between ambitious design and structural execution."
          </p>
          <NavLink
            to="/about"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-mono uppercase tracking-widest px-8 py-4 text-xs hover:border-white hover:bg-white hover:text-graphite transition-all group"
          >
            Read Our Story <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </NavLink>
        </motion.div>

        {/* Background "IN STEEL." watermark (always present, subtly layered) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 mix-blend-overlay opacity-10">
          <span className="font-display font-extrabold text-[150px] md:text-[250px] lg:text-[400px] leading-none text-white whitespace-nowrap tracking-tighter">
            IN STEEL.
          </span>
        </div>

      </div>
    </section>
  )
}
