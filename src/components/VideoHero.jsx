import { motion } from 'framer-motion'
import { ChevronsDown } from 'lucide-react'
import WeldingCanvas from './WeldingCanvas'
import CoordinateTicker from './CoordinateTicker'

/**
 * VideoHero — reusable full-viewport hero with video background,
 * welding canvas animation, dark scrim and blueprint grid overlay.
 *
 * Props:
 *  - videoSrc   : path to the .mp4 file  (default: /assets/about-hero.mp4)
 *  - children   : the text/button content inside the hero
 *  - showTicker : show coordinate ticker bottom-left (default: true)
 */
export default function VideoHero({
  videoSrc = '/assets/about-hero.mp4',
  children,
  showTicker = true,
}) {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── LAYER 1: background video ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        onError={(e) => { e.target.style.display = 'none' }}
      />

      {/* ── LAYER 2: dark gradient scrim ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/65 via-graphite/45 to-graphite/88 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite/55 via-transparent to-transparent pointer-events-none" />

      {/* ── LAYER 3: live welding spark canvas ── */}
      <div className="absolute inset-0 z-[1]">
        <WeldingCanvas />
      </div>

      {/* ── LAYER 4: blueprint grid overlay ── */}
      <div className="absolute inset-0 bp-grid opacity-15 pointer-events-none z-[2]" />

      {/* ── LAYER 5: page content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 pt-32 pb-24">
        {children}
      </div>

      {/* ── coordinate ticker — bottom left ── */}
      {showTicker && (
        <div className="absolute bottom-8 left-6 lg:left-10 z-10">
          <CoordinateTicker />
        </div>
      )}

      {/* ── scroll indicator — bottom center ── */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1 text-steel/70 text-xs uppercase tracking-[0.3em]">
        <span>Scroll to explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronsDown size={18} className="text-weld" />
        </motion.div>
      </div>

    </section>
  )
}
