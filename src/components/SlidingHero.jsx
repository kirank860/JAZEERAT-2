import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronsDown } from 'lucide-react'

const HeroVideo = ({ src, isActive, isAdjacent, animate, transition, style }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isActive])

  if (!isActive && !isAdjacent) return null

  return (
    <motion.video
      ref={videoRef}
      src={src}
      className="w-full h-full object-cover"
      muted
      loop
      playsInline
      preload={isActive ? "auto" : "metadata"}
      animate={animate}
      transition={transition}
      style={style}
    />
  )
}

export default function SlidingHero({ slides }) {
  const allSlides = slides || []
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const startX = useRef(0)
  const isPointerDown = useRef(false)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  // Momentum-based vertical scroll moving slightly upwards as user scrolls down
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -180])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  useEffect(() => {
    if (isPaused || allSlides.length === 0) return undefined
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

  if (allSlides.length === 0) return null

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
          {(s.type === 'video' || s.src?.match(/\.(mp4|webm)$/i)) ? (
            <HeroVideo
              src={s.src}
              isActive={i === index}
              isAdjacent={Math.abs(i - index) === 1 || (index === 0 && i === allSlides.length - 1) || (index === allSlides.length - 1 && i === 0)}
              animate={i === index ? { scale: [1, 1.06] } : { scale: 1 }}
              transition={{ duration: 6.5, ease: 'easeOut' }}
              style={{ y: i === index ? bgY : 0 }}
            />
          ) : (
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
          )}
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
        style={{ background: 'radial-gradient(ellipse 80% 60% at 0% 100%, rgba(214,47,34,0.10) 0%, transparent 55%)' }}
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
          className="absolute inset-0 z-[22] pointer-events-none bg-white/5"
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
                initial={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 24, filter: 'blur(8px)' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/70">
                  {allSlides[index].tag}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* orange accent bar + headline */}
            <div className="flex items-start gap-5">
              <motion.div
                className="w-[3px] bg-white/80 rounded-sm mt-2 shrink-0"
                initial={{ height: 0 }}
                animate={{ height: 160 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`h1-${index}`}
                  initial={{ opacity: 0, y: 30, filter: 'blur(12px)', scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(12px)', scale: 1.02 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-extrabold uppercase text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.0] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
                >
                  {allSlides[index].caption}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${index}`}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 ml-8 text-white/75 text-[15px] leading-relaxed max-w-md"
              >
                {allSlides[index].sub}
              </motion.p>
            </AnimatePresence>

            {/* CTA buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.4 }
                }
              }}
              className="mt-9 ml-8 flex flex-wrap items-center gap-3"
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}>
                <NavLink
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-graphite font-display uppercase font-semibold tracking-wide px-6 py-3 text-sm hover:bg-steel-light transition-colors"
                >
                  Start a Project <ArrowUpRight size={16} />
                </NavLink>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}>
                <NavLink
                  to="/services"
                  className="inline-flex items-center gap-2 border border-white/40 text-white font-display uppercase tracking-wide px-6 py-3 text-sm hover:border-white hover:text-graphite hover:bg-white transition-colors backdrop-blur-sm"
                >
                  Our Services
                </NavLink>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}>
                <NavLink
                  to="/projects"
                  className="inline-flex items-center gap-2 border border-white/40 text-white font-display uppercase tracking-wide px-6 py-3 text-sm hover:border-white hover:text-graphite hover:bg-white transition-colors backdrop-blur-sm"
                >
                  View Projects
                </NavLink>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* scroll cue — bottom center */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute bottom-[6.5rem] left-0 right-0 z-40 flex flex-col items-center gap-1 text-white/50 text-[10px] uppercase tracking-[0.35em]">
        <span>Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronsDown size={16} className="text-white/70" />
        </motion.div>
      </motion.div>

      {/* aria-live (screen readers) */}
      <div aria-live="polite" className="sr-only">{allSlides[index].caption}</div>
    </section>
  )
}
