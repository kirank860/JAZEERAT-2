import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import CoordinateTicker from './CoordinateTicker'
import SectionLabel from './SectionLabel'

const STAGES = [
  { label: 'Site & Foundation', range: [0, 0.18] },
  { label: 'Structural Steel Erection', range: [0.18, 0.42] },
  { label: 'Roof & Bracing', range: [0.42, 0.55] },
  { label: 'Envelope & Cladding', range: [0.55, 0.78] },
  { label: 'Finishing & Handover', range: [0.78, 1] },
]

export default function ConstructionScrollHero() {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  })

  // --- camera / depth ---
  const sceneRotate = useTransform(scrollYProgress, [0, 1], [7, 0])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [0.92, 1.03])
  const skyY = useTransform(scrollYProgress, [0, 1], [0, -60]) // slow parallax layer
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -20])

  // --- foundation ---
  const foundationOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1])
  const rebarOpacity = useTransform(scrollYProgress, [0.03, 0.1], [0, 0.5])

  // --- crane (present early, drifts off once structure rises) ---
  const craneIn = useTransform(scrollYProgress, [0.02, 0.1], [0, 1])
  const craneOut = useTransform(scrollYProgress, [0.5, 0.66], [1, 0])
  const craneX = useTransform(scrollYProgress, [0.5, 0.7], [0, 60])

  // --- columns (baseY 500 -> topY 180) ---
  const colRanges = [
    [0.08, 0.17], [0.1, 0.19], [0.12, 0.21], [0.14, 0.23], [0.16, 0.25],
  ]
  const col1 = useTransform(scrollYProgress, colRanges[0], [500, 180])
  const col2 = useTransform(scrollYProgress, colRanges[1], [500, 180])
  const col3 = useTransform(scrollYProgress, colRanges[2], [500, 180])
  const col4 = useTransform(scrollYProgress, colRanges[3], [500, 180])
  const col5 = useTransform(scrollYProgress, colRanges[4], [500, 180])
  const colTops = [col1, col2, col3, col4, col5]
  const colX = [200, 350, 500, 650, 800]

  // --- roof / bracing ---
  const roofDraw = useTransform(scrollYProgress, [0.24, 0.36], [0, 1])
  const braceDraw = useTransform(scrollYProgress, [0.36, 0.46], [0, 1])

  // --- cladding panels (grow downward from roofline) ---
  const panelRanges = [[0.46, 0.56], [0.5, 0.6], [0.54, 0.64], [0.58, 0.68]]
  const p1 = useTransform(scrollYProgress, panelRanges[0], [0, 300])
  const p2 = useTransform(scrollYProgress, panelRanges[1], [0, 300])
  const p3 = useTransform(scrollYProgress, panelRanges[2], [0, 300])
  const p4 = useTransform(scrollYProgress, panelRanges[3], [0, 300])
  const panelHeights = [p1, p2, p3, p4]

  // --- windows + finishing glow ---
  const windowOpacity = useTransform(scrollYProgress, [0.64, 0.76], [0, 1])
  const glowOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1])
  const glowScale = useTransform(scrollYProgress, [0.82, 1], [0.6, 1.15])

  // --- progress readout ---
  const pct = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`)

  return (
    <section ref={scrollRef} className="relative" style={{ height: '360vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-graphite" style={{ perspective: 1400 }}>

        {/* ambient sky glow — slow parallax layer */}
        <motion.div
          style={{ y: skyY }}
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-30 blur-3xl"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.25)_0%,rgba(19,21,25,0)_70%)]" />
        </motion.div>

        {/* blueprint grid — faster parallax layer */}
        <motion.div style={{ y: gridY }} className="absolute inset-0 bp-grid opacity-40" />

        {/* dark scrim so overlaid text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-graphite via-graphite/40 to-graphite pointer-events-none z-10" />

        {/* --- construction scene --- */}
        <motion.div
          style={{ rotateX: sceneRotate, scale: sceneScale, transformOrigin: 'center 70%' }}
          className="absolute inset-0 flex items-end justify-center pb-10"
        >
          <svg viewBox="0 0 1000 600" className="w-full max-w-5xl h-[70vh]" fill="none">
            {/* ground */}
            <line x1="60" y1="520" x2="940" y2="520" stroke="#2a2e34" strokeWidth="1.5" />

            {/* crane */}
            <motion.g style={{ opacity: craneIn }}>
              <motion.g style={{ x: craneX, opacity: craneOut }}>
                <line x1="880" y1="520" x2="880" y2="140" stroke="#8b929a" strokeWidth="2" />
                <line x1="880" y1="140" x2="960" y2="150" stroke="#8b929a" strokeWidth="2" />
                <line x1="880" y1="140" x2="800" y2="148" stroke="#8b929a" strokeWidth="2" />
                <line x1="940" y1="150" x2="940" y2="190" stroke="#8b929a" strokeWidth="1.5" />
                <circle cx="880" cy="140" r="3" fill="#ff5a1f" />
              </motion.g>
            </motion.g>

            {/* foundation slab */}
            <motion.rect x="120" y="500" width="760" height="20" fill="#1e2126" stroke="#8b929a" strokeWidth="1.5" style={{ opacity: foundationOpacity }} />
            <motion.g style={{ opacity: rebarOpacity }}>
              {[160, 220, 280, 340, 400, 460, 520, 580, 640, 700, 760, 820, 860].map((x) => (
                <line key={x} x1={x} y1="502" x2={x} y2="518" stroke="#3a4048" strokeWidth="1" />
              ))}
            </motion.g>

            {/* columns */}
            {colX.map((x, i) => (
              <motion.line
                key={x}
                x1={x} x2={x}
                y1="500"
                y2={colTops[i]}
                stroke="#8b929a"
                strokeWidth="3"
              />
            ))}

            {/* roofline */}
            <motion.path
              d="M200 180 L350 180 L500 180 L650 180 L800 180"
              stroke="#ff5a1f"
              strokeWidth="2.5"
              style={{ pathLength: roofDraw }}
            />

            {/* bracing */}
            <motion.path
              d="M200 500 L500 180 M500 500 L200 180 M500 500 L800 180 M800 500 L500 180"
              stroke="#3a4048"
              strokeWidth="1.25"
              style={{ pathLength: braceDraw }}
            />

            {/* cladding panels */}
            {[
              { x: 210, w: 130 },
              { x: 360, w: 130 },
              { x: 510, w: 130 },
              { x: 660, w: 130 },
            ].map((panel, i) => (
              <motion.rect
                key={panel.x}
                x={panel.x}
                y="180"
                width={panel.w}
                height={panelHeights[i]}
                fill="#1e2126"
                stroke="#2a2e34"
                strokeWidth="1"
                fillOpacity="0.9"
              />
            ))}

            {/* windows */}
            <motion.g style={{ opacity: windowOpacity }}>
              {[210, 360, 510, 660].map((x) =>
                [0, 1].map((row) =>
                  [0, 1].map((c) => (
                    <rect
                      key={`${x}-${row}-${c}`}
                      x={x + 20 + c * 55}
                      y={210 + row * 110}
                      width="40"
                      height="55"
                      fill="#ffb020"
                      fillOpacity="0.12"
                      stroke="#8b929a"
                      strokeWidth="1"
                    />
                  ))
                )
              )}
            </motion.g>

            {/* finishing glow at ridge */}
            <motion.circle
              cx="500" cy="178" r="14"
              fill="#ff5a1f"
              style={{ opacity: glowOpacity, scale: glowScale }}
            />

            {/* dimension caption */}
            <text x="500" y="560" fill="#8b929a" fontSize="12" fontFamily="IBM Plex Mono, monospace" textAnchor="middle">
              PROJECT REF. JZH-2026 · FRAME ELEVATION
            </text>
          </svg>
        </motion.div>

        {/* --- overlaid content --- */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 pt-36 lg:pt-40">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionLabel index="EST. WORKSHOP">Steel Fabrication · MENA</SectionLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-steel-light max-w-2xl"
          >
            From bare site to <span className="text-weld">finished steel.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-md text-steel text-base leading-relaxed"
          >
            Scroll to watch a build move through fabrication — the same integrated
            workshop process behind every Jazeerat Al Hadeed project.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <NavLink
              to="/contact"
              className="group inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-7 py-4 hover:bg-signal transition-colors"
            >
              Request a Quote
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </NavLink>
            <NavLink
              to="/services"
              className="font-display uppercase tracking-wide text-steel-light border-b border-steel pb-1 hover:text-weld hover:border-weld transition-colors"
            >
              Our Capabilities
            </NavLink>
          </motion.div>
        </div>

        {/* stage rail — right side */}
        <div className="hidden lg:flex flex-col gap-6 absolute right-10 top-1/2 -translate-y-1/2 z-20">
          {STAGES.map((s) => (
            <StageDot key={s.label} stage={s} progress={scrollYProgress} />
          ))}
        </div>

        {/* bottom progress readout */}
        <div className="absolute bottom-8 left-0 right-0 z-20 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <span className="font-mono text-[11px] text-steel tracking-widest shrink-0">BUILD PROGRESS</span>
            <div className="relative h-px flex-1 bg-panel-line">
              <motion.div
                className="absolute left-0 top-0 h-px bg-weld origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <motion.span className="font-mono text-[11px] text-weld w-10 text-right shrink-0">{pct}</motion.span>
          </div>
          <CoordinateTicker className="mt-3" />
        </div>
      </div>
    </section>
  )
}

function StageDot({ stage, progress }) {
  const opacity = useTransform(progress, stage.range, [0.35, 1])
  const scale = useTransform(progress, stage.range, [0.8, 1])
  return (
    <div className="flex items-center gap-3 justify-end">
      <motion.span
        style={{ opacity }}
        className="font-mono text-[10px] uppercase tracking-widest text-steel-light whitespace-nowrap"
      >
        {stage.label}
      </motion.span>
      <motion.span
        style={{ opacity, scale }}
        className="w-2.5 h-2.5 rounded-full bg-weld shrink-0"
      />
    </div>
  )
}
