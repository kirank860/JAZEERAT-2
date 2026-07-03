import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronsDown } from 'lucide-react'
import CoordinateTicker from './CoordinateTicker'

const SLIDES = [
  {
    src: '/assets/slides/slide-3.webp',
    caption: 'Leading Manufacturers of Versatile Steel Products',
    sub: 'Structural steel, CNC fabrication and precision machining for the MENA region.',
    tag: 'GCC Fabrication',
  },
  {
    src: '/assets/slides/slide-2.webp',
    caption: 'Precision Fabrication. Reliable Delivery.',
    sub: 'Every weld certified, every deadline met — from first drawing to final installation.',
    tag: 'Machine Workshop',
  },
  {
    src: '/assets/slides/slide-1.webp',
    caption: 'Engineering Steel Solutions Across The Region',
    sub: 'One integrated workshop. Full capability. On-time delivery to any GCC site.',
    tag: 'Structural Steel',
  },
]

export default function SlidingHero({ slides }) {
  const allSlides = slides || SLIDES
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const startX = useRef(0)
  const isPointerDown = useRef(false)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -180])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  useEffect(() => {
    if (isPaused) return undefined
    const t = setInterval(() => setIndex(i => (i + 1) % allSlides.length), 6000)
    return () => clearInterval(t)
  }, [isPaused, allSlides.length])

  const go = i => setIndex((i + allSlides.length) % allSlides.length)

  function handlePointerDown(e) {
    isPointerDown.current = true
    setIsPaused(true)
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0
  }
  function handlePointerUp(e) {
    if (!isPointerDown.current) return
    isPointerDown.current = false
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0
    const dx = endX - startX.current
    if (dx > 60) go(index - 1)
    else if (dx < -60) go(index + 1)
    setTimeout(() => setIsPaused(false), 1200)
  }
  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1) }
    if (e.key === ' ') { e.preventDefault(); setIsPaused(p => !p) }
  }

  return (
    <section
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero carousel"
      tabIndex={0}
      className="relative w-full min-h-[99vh] max-h-screen overflow-hidden bg-graphite"
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* ── film grain SVG filter (applied via className) */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="film-grain" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blend" />
            <feComposite in="blend" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* ═══════════════════════════════════════════
          LAYER 1 — Slide images with parallax
      ═══════════════════════════════════════════ */}
      {allSlides.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute inset-0 ${i === index ? 'z-10' : 'z-0'}`}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ scale: i === index ? bgScale : 1 }}
        >
          {/* Ken Burns zoom on active slide */}
          <motion.img
            src={s.src}
            alt={s.caption}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={i === 0 ? 'high' : 'auto'}
            animate={i === index ? { scale: [1, 1.06] } : { scale: 1 }}
            transition={{ duration: 6.5, ease: 'easeOut' }}
            style={{ y: i === index ? bgY : 0 }}
          />
        </motion.div>
      ))}

      {/* ═══════════════════════════════════════════
          LAYER 2 — Cinematic shading stack
      ═══════════════════════════════════════════ */}

      {/* 2a. Primary base dark scrim */}
      <div className="absolute inset-0 z-20 bg-black/35 pointer-events-none" />

      {/* 2b. Left-side directional vignette — text side gets deeper shadow */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, transparent 100%)' }}
      />

      {/* 2c. Bottom vignette — ground the composition */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(13,15,19,0.92) 0%, rgba(13,15,19,0.5) 20%, transparent 55%)' }}
      />

      {/* 2d. Top vignette — cinematic sky darkening */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.15) 18%, transparent 40%)' }}
      />

      {/* 2e. Radial center-reveal — brightens just the focal point */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 55% at 62% 48%, transparent 0%, rgba(0,0,0,0.28) 100%)' }}
      />

      {/* 2f. Orange weld-tone tint — very subtle brand colour warmth */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 0% 100%, rgba(255,90,31,0.10) 0%, transparent 55%)' }}
      />

      {/* 2g. Film grain overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* 2h. Letterbox bars — classic cinematic 2.39:1 crop bars */}
      <div className="absolute top-0 left-0 right-0 h-[5.5vh] z-21 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.0) 100%)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-[12vh] z-21 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)' }}
      />

      {/* 2i. Slide-transition chromatic flash */}
      <AnimatePresence>
        <motion.div
          key={`flash-${index}`}
          className="absolute inset-0 z-[22] pointer-events-none bg-weld/8"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        />
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          LAYER 3 — Hero text content
      ═══════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0 z-30 flex items-center"
        style={{ y: overlayY, opacity: overlayOpacity }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-2xl">

            {/* slide tag pill */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${index}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-weld animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/70">
                  {allSlides[index].tag}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* orange accent bar + headline */}
            <div className="flex items-start gap-5">
              <motion.div
                className="w-[3px] bg-weld rounded-sm mt-2 shrink-0 shadow-[0_0_16px_rgba(255,90,31,0.8)]"
                initial={{ height: 0 }}
                animate={{ height: 160 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`h1-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className="font-display font-extrabold uppercase text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.0] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
                >
                  {allSlides[index].caption}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${index}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="mt-6 ml-0 sm:ml-8 text-white/80 text-[15px] sm:text-base leading-relaxed max-w-md"
              >
                {allSlides[index].sub}
              </motion.p>
            </AnimatePresence>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 sm:mt-9 ml-0 sm:ml-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <NavLink
                to="/contact"
                className="inline-flex justify-center items-center gap-2 bg-weld text-graphite font-display uppercase font-semibold tracking-wide px-6 py-4 sm:py-3 text-[15px] sm:text-sm hover:bg-signal transition-colors w-full sm:w-auto"
              >
                Start a Project <ArrowUpRight size={18} className="sm:w-4 sm:h-4" />
              </NavLink>
              <NavLink
                to="/services"
                className="inline-flex justify-center items-center gap-2 border border-white/40 text-white font-display uppercase tracking-wide px-6 py-4 sm:py-3 text-[15px] sm:text-sm hover:border-weld hover:text-weld transition-colors backdrop-blur-sm w-full sm:w-auto"
              >
                Our Services
              </NavLink>
              <NavLink
                to="/projects"
                className="inline-flex justify-center items-center gap-2 border border-white/40 text-white font-display uppercase tracking-wide px-6 py-4 sm:py-3 text-[15px] sm:text-sm hover:border-weld hover:text-weld transition-colors backdrop-blur-sm w-full sm:w-auto"
              >
                View Projects
              </NavLink>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════
          LAYER 4 — HUD chrome
      ═══════════════════════════════════════════ */}

      {/* slide counter — top right */}
      <div className="absolute top-6 right-8 z-40 flex items-center gap-2 font-mono text-xs text-white/50 tracking-widest">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="text-weld font-bold text-sm"
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        <span>/</span>
        <span>{String(allSlides.length).padStart(2, '0')}</span>
      </div>

      {/* coordinate ticker — bottom left */}
      <div className="absolute bottom-20 left-6 lg:left-10 z-40">
        <CoordinateTicker />
      </div>

      {/* progress bar — bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-40 bg-white/10">
        <motion.div
          className="h-full bg-weld shadow-[0_0_8px_rgba(255,90,31,0.8)]"
          key={index}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
        />
      </div>

      {/* dot pagination */}
      <div className="absolute bottom-14 left-0 right-0 z-40 flex justify-center gap-3">
        {allSlides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => { go(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 1200) }}
            aria-label={`Go to slide ${i + 1}`}
            className="relative"
            whileHover={{ scale: 1.4 }}
          >
            <span className={`block w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-weld' : 'bg-white/40 hover:bg-white/70'}`} />
            {i === index && (
              <motion.span
                layoutId="activeDot"
                className="absolute inset-0 rounded-full border border-weld/50 scale-150"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* prev / next arrows */}
      {[
        { label: 'prev', side: 'left-5', dir: -1, Icon: ArrowLeft },
        { label: 'next', side: 'right-5', dir: 1, Icon: ArrowRight },
      ].map(({ label, side, dir, Icon }) => (
        <motion.button
          key={label}
          aria-label={label}
          onClick={() => { go(index + dir); setIsPaused(true); setTimeout(() => setIsPaused(false), 1200) }}
          className={`absolute top-1/2 -translate-y-1/2 ${side} z-40 group`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center justify-center w-11 h-11 border border-white/20 bg-black/30 backdrop-blur-sm group-hover:border-weld group-hover:bg-weld/10 transition-all">
            <Icon size={18} className="text-white group-hover:text-weld transition-colors" />
          </span>
        </motion.button>
      ))}

      {/* scroll cue — bottom center */}
      <div className="absolute bottom-[6.5rem] left-0 right-0 z-40 flex flex-col items-center gap-1 text-white/50 text-[10px] uppercase tracking-[0.35em]">
        <span>Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronsDown size={16} className="text-weld/70" />
        </motion.div>
      </div>

      {/* aria-live (screen readers) */}
      <div aria-live="polite" className="sr-only">{allSlides[index].caption}</div>
    </section>
  )
}
