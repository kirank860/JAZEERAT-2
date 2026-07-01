import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function SlidingHero({ slides }) {
  // use public `public/assets/slides` for simpler paths and caching
  const defaultSlides = slides || [
    { src: '/assets/slides/slide-3.jpg', caption: 'Leading Manufacturers of Versatile Steel Products' },
    { src: '/assets/slides/slide-2.jpg', caption: 'Precision Fabrication. Reliable Delivery.' },
    { src: '/assets/slides/slide-1.jpg', caption: 'Engineering Steel Solutions Across The Region' },
  ]

  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const startX = useRef(0)
  const isPointerDown = useRef(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.72])

  useEffect(() => {
    if (isPaused) return undefined
    const t = setInterval(() => setIndex((i) => (i + 1) % defaultSlides.length), 6000)
    return () => clearInterval(t)
  }, [isPaused])

  const go = (i) => setIndex((i + defaultSlides.length) % defaultSlides.length)

  // Pointer / touch handlers for swipe support
  function handlePointerDown(e) {
    isPointerDown.current = true
    setIsPaused(true)
    startX.current = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0
  }

  function handlePointerMove(e) {
    if (!isPointerDown.current) return
    // noop — we only need startX and endX on up
  }

  function handlePointerUp(e) {
    if (!isPointerDown.current) return
    isPointerDown.current = false
    const endX = e.clientX ?? (e.changedTouches && e.changedTouches[0]?.clientX) ?? 0
    const dx = endX - startX.current
    const threshold = 60 // px
    if (dx > threshold) go(index - 1)
    else if (dx < -threshold) go(index + 1)
    // resume autoplay after short delay
    setTimeout(() => setIsPaused(false), 1200)
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(index - 1)
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), 1200)
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(index + 1)
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), 1200)
    }
    if (e.key === ' ' || e.key === 'Spacebar') {
      // toggle pause on space
      e.preventDefault()
      setIsPaused((p) => !p)
    }
  }

  return (
    <section
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero carousel"
      tabIndex={0}
      className="relative w-full min-h-[99vh] max-h-screen overflow-hidden"
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {defaultSlides.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ scale: i === index ? bgScale : 1 }}
        >
          <img
            src={s.src}
            alt={s.caption}
            className="w-full h-full object-cover"
            loading={i === index ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={i === index ? 'high' : 'auto'}
            srcSet={`${s.src} 1200w, ${s.src} 800w, ${s.src} 400w`}
            sizes="(max-width: 640px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      ))}

      {/* overlay text */}
      <motion.div className="absolute inset-0 z-20 flex items-center" style={{ y: overlayY, opacity: overlayOpacity }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 flex items-center">
          <div className="max-w-2xl text-white">
            <div className="flex items-start gap-6">
              <div className="w-1 bg-weld h-40 rounded-sm mt-6" />
              <h1 className="font-display font-bold mt-10 text-4xl sm:text-5xl lg:text-6xl leading-tight">
                {defaultSlides[index].caption.split('.').join('. ')}
              </h1>
            </div>
            <p className="mt-6 text-white/90 max-w-lg">Industrial steelwork, precision manufacturing and on-time project delivery across the MENA region.</p>
            <div className="mt-8 flex items-center gap-4">
              <a href="/contact" className="lg:inline-flex  items-center gap-2 bg-weld text-graphite  lg:px-6 lg:py-2 font-semibold uppercase">Fabric shades</a>
              <a href="/services" className="lg:inline-flex  items-center gap-2 bg-weld text-graphite  lg:px-6 lg:py-2 font-semibold uppercase">Steel Fabrication</a>
              <a href="/services" className="lg:inline-flex  items-center gap-2 bg-weld text-graphite  lg:px-6 lg:py-2 font-semibold uppercase">Industrial Steel</a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* aria-live caption for screen readers (visually hidden) */}
      <div
        aria-live="polite"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {defaultSlides[index].caption}
      </div>

      {/* arrows */}
      <button aria-label="prev" onClick={() => go(index - 1)} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 p-3 rounded-full hover:bg-black/60">
        <ArrowLeft size={18} className="text-white" />
      </button>
      <button aria-label="next" onClick={() => go(index + 1)} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 p-3 rounded-full hover:bg-black/60">
        <ArrowRight size={18} className="text-white" />
      </button>

      {/* pagination dots */}
      <div className="absolute bottom-20 left-0 right-0 z-30 flex justify-center gap-3">
        {defaultSlides.map((_, i) => (
          <button key={i} onClick={() => go(i)} className={`w-3 h-3 rounded-full ${i === index ? 'bg-weld' : 'bg-white/60'}`} aria-label={`Go to slide ${i+1}`} />
        ))}
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-30 flex flex-col items-center gap-2 text-white/80 text-xs uppercase tracking-[0.3em]">
        <span>Scroll to explore</span>
        <span className="animate-bounce">⌄</span>
      </div>
    </section>
  )
}
