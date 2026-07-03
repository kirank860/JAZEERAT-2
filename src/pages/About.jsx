import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {
  Target, Eye, Handshake, Award, Users, Calendar, TrendingUp,
  ArrowRight, Factory, Wrench, ShieldCheck, Ruler, PenTool, Boxes, ChevronsDown,
  Quote,
} from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'
import CoordinateTicker from '../components/CoordinateTicker'
import WeldingCanvas from '../components/WeldingCanvas'
import SEO from '../components/SEO'

/* ─── data ───────────────────────────────────────────────── */
const timeline = [
  { year: '2007', title: 'Workshop Founded', desc: 'Jazeerat Al Hadeed opens its first fabrication bay in the UAE.' },
  { year: '2012', title: 'CNC Line Installed', desc: 'In-house CNC plasma and machining capability brought online.' },
  { year: '2016', title: 'Regional Expansion', desc: 'Fabrication and delivery extended across GCC construction sites.' },
  { year: '2021', title: 'ISO-Aligned QA', desc: 'Quality control processes aligned to international fabrication standards.' },
  { year: 'Today', title: 'Full-Service Workshop', desc: 'A single integrated facility for design, cut, weld, finish and delivery.' },
]

const values = [
  { icon: Target, title: 'Precision', desc: 'Every cut and weld is measured against tolerance, not approximation.' },
  { icon: Eye, title: 'Transparency', desc: 'Clients see the drawing, the process and the inspection record.' },
  { icon: Handshake, title: 'Reliability', desc: 'Delivery schedules built for construction sites that cannot wait.' },
]

const capabilities = [
  { icon: Factory, title: 'Structural Steel', desc: 'Portal frames, trusses and heavy structural assemblies.', side: 'left' },
  { icon: Wrench, title: 'Machine Workshop', desc: 'CNC cutting, machining and precision finishing in-house.', side: 'left' },
  { icon: PenTool, title: 'Design & Detailing', desc: 'Shop drawings and detailing engineered to your structural spec.', side: 'left' },
  { icon: Boxes, title: 'Custom Fabrication', desc: 'Bespoke steelwork built to client drawings and tolerances.', side: 'right' },
  { icon: ShieldCheck, title: 'QA & Compliance', desc: 'Every weld and cut logged against international standards.', side: 'right' },
  { icon: Ruler, title: 'Surface Finishing', desc: 'Shot blasting, priming and coating for MENA climates.', side: 'right' },
]

const stats = [
  { icon: Award, value: 18, suffix: '+', label: 'Years Fabricating' },
  { icon: Users, value: 450, suffix: '+', label: 'Projects Delivered' },
  { icon: Calendar, value: 6, suffix: '', label: 'Countries Served' },
  { icon: TrendingUp, value: 98, suffix: '%', label: 'On-Time Delivery' },
]

/* ─── mission pillars ─────────────────────────────────────── */
const missionPillars = [
  {
    number: '01',
    heading: 'Build Without Compromise',
    body: 'Our mission is to manufacture structural steel that performs precisely as designed — no short-cuts, no substitutions. We hold every joint to the same standard whether the structure is a mezzanine or a portal-frame warehouse.',
  },
  {
    number: '02',
    heading: 'Empower Every Project',
    body: 'From the first DXF file to the final coat, we give project teams a single fabrication partner who handles design, cut, weld, blast and delivery — removing the co-ordination overhead that delays sites.',
  },
  {
    number: '03',
    heading: 'Raise the Regional Standard',
    body: 'The MENA construction market deserves fabricators who log tolerances and produce inspection records. We are building that expectation into every delivery so that precision becomes the norm, not the premium.',
  },
]

/* ─── team ────────────────────────────────────────────────── */
const team = [
  {
    name: 'Ahmed Al Mansoori',
    role: 'Founder & Managing Director',
    quote: 'Steel doesn\'t lie. Neither do we.',
    img: null,
    initials: 'AA',
  },
  {
    name: 'Khalid Ibrahim',
    role: 'Head of Fabrication',
    quote: 'If the drawing says ±1 mm, we hit ±0.5.',
    img: null,
    initials: 'KI',
  },
  {
    name: 'Priya Nair',
    role: 'QA & Compliance Lead',
    quote: 'Quality is in the record, not the promise.',
    img: null,
    initials: 'PN',
  },
  {
    name: 'Rami Haddad',
    role: 'Structural Design Engineer',
    quote: 'Every weld starts as a calculation.',
    img: null,
    initials: 'RH',
  },
  {
    name: 'James Okafor',
    role: 'Project Delivery Manager',
    quote: 'On-time is the only acceptable default.',
    img: null,
    initials: 'JO',
  },
]

/* ─── animation presets ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

/* ─── sub-components ─────────────────────────────────────── */
function CapabilityItem({ cap, delay, direction }) {
  const Icon = cap.icon
  return (
    <motion.div
      className="flex flex-col group"
      initial={{ x: direction === 'left' ? -30 : 30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          className="relative text-weld bg-weld/10 p-3 rounded-none border border-weld/20 group-hover:bg-weld/20 transition-colors"
          whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.4 } }}
        >
          <Icon size={20} strokeWidth={1.5} />
        </motion.div>
        <h3 className="font-display uppercase text-lg text-steel-light group-hover:text-weld transition-colors">
          {cap.title}
        </h3>
      </div>
      <p className="text-sm text-steel leading-relaxed pl-[52px]">{cap.desc}</p>
      <div className="mt-2 pl-[52px] flex items-center gap-1 text-weld text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        View capability <ArrowRight size={12} />
      </div>
    </motion.div>
  )
}

function StatCounter({ icon: Icon, value, suffix, label, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })
  const [animated, setAnimated] = useState(false)

  const spring = useSpring(0, { stiffness: 60, damping: 12 })
  const display = useTransform(spring, (v) => Math.floor(v))

  useEffect(() => {
    if (isInView && !animated) { spring.set(value); setAnimated(true) }
    if (!isInView && animated) { spring.set(0); setAnimated(false) }
  }, [isInView, value, spring, animated])

  return (
    <motion.div
      className="border border-panel-line bg-graphite p-6 flex flex-col items-center text-center group hover:border-weld/50 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-14 h-14 border border-panel-line flex items-center justify-center mb-4 text-weld group-hover:border-weld/50 transition-colors"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        <Icon size={22} strokeWidth={1.5} />
      </motion.div>
      <div ref={ref} className="font-display font-extrabold text-4xl text-steel-light flex items-end gap-0.5">
        <motion.span>{display}</motion.span>
        <span className="text-weld">{suffix}</span>
      </div>
      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-steel mt-2">{label}</p>
      <motion.div
        className="mt-3 h-px bg-weld"
        initial={{ width: 24 }}
        whileInView={{ width: 48 }}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
      />
    </motion.div>
  )
}

/* ─── MissionPillar ──────────────────────────────────────── */
function MissionPillar({ pillar, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="relative border-b border-panel-line pb-10 last:border-0 last:pb-0 group"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
    >
      {/* number */}
      <motion.span
        className="absolute -left-2 -top-1 font-display font-extrabold text-[7rem] leading-none text-weld/5 select-none pointer-events-none group-hover:text-weld/10 transition-colors duration-500"
        aria-hidden
      >
        {pillar.number}
      </motion.span>

      <div className="relative pl-2">
        <motion.div
          className="h-[2px] bg-weld origin-left mb-6"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
          style={{ width: 48 }}
        />
        <p className="font-mono text-xs text-weld tracking-[0.25em] uppercase mb-3">{pillar.number}</p>
        <h3 className="font-display font-bold uppercase text-3xl lg:text-4xl text-steel-light mb-5 group-hover:text-weld transition-colors duration-300">
          {pillar.heading}
        </h3>
        <p className="text-steel text-base leading-relaxed max-w-2xl">{pillar.body}</p>
      </div>
    </motion.div>
  )
}

/* ─── TeamCard ───────────────────────────────────────────── */
function TeamCard({ member, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      className="flex-none w-72 lg:w-80 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => setFlipped(!flipped)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="relative h-96"
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 border border-panel-line bg-graphite-light group hover:border-weld/40 transition-colors overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* avatar area */}
          <div className="relative h-52 bg-panel flex items-center justify-center overflow-hidden">
            {member.img ? (
              <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-panel to-graphite">
                <span className="font-display font-extrabold text-6xl text-weld/20">{member.initials}</span>
              </div>
            )}
            {/* subtle weld glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-light/80 to-transparent" />
            {/* animated corner bracket */}
            <motion.div
              className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-weld/50"
              whileHover={{ scale: 1.2 }}
            />
            <motion.div
              className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-weld/50"
              whileHover={{ scale: 1.2 }}
            />
          </div>

          {/* info */}
          <div className="p-6">
            <h4 className="font-display uppercase text-xl text-steel-light group-hover:text-weld transition-colors">
              {member.name}
            </h4>
            <p className="font-mono text-xs text-steel tracking-widest uppercase mt-1">{member.role}</p>
            <motion.div
              className="mt-4 h-px bg-weld origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              style={{ width: 32 }}
            />
            <p className="mt-3 font-mono text-[10px] text-weld/60 tracking-widest uppercase">Tap to read →</p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 border border-weld/30 bg-graphite flex flex-col items-center justify-center p-8 text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <Quote size={32} className="text-weld/40 mb-4" />
          <p className="font-display uppercase text-2xl text-steel-light leading-snug">
            "{member.quote}"
          </p>
          <p className="mt-6 font-mono text-xs text-steel uppercase tracking-widest">— {member.name}</p>
          <motion.div className="mt-6 h-px bg-weld" style={{ width: 48 }} />
          <p className="mt-3 font-mono text-[10px] text-weld/60 tracking-widest uppercase">Tap to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── stage images mapped to each timeline entry ────────── */
const stageImages = [
  '/assets/milestone-stage1.jpg',
  '/assets/milestone-stage2.jpg',
  '/assets/milestone-stage3.jpg',
  '/assets/milestone-stage4.jpg',
  '/assets/milestone-stage5.jpg',
]

const stageLabels = [
  'Workshop Founded',
  'CNC Line Installed',
  'Regional Expansion',
  'ISO-Aligned QA',
  'Full-Service Today',
]

/* ─── MilestoneScroller ──────────────────────────────────── */
function MilestoneScroller({ timeline }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll 0→1 across N stages
  const N = timeline.length
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      // clamp to last index
      const idx = Math.min(Math.floor(v * N), N - 1)
      setActiveIndex(idx)
    })
  }, [scrollYProgress, N])

  // Full-section progress bar (bottom bar, 0→100% as whole section scrolls)
  const fullProgressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Per-stage progress bar width — recalculated whenever activeIndex changes
  const stageStart = activeIndex / N
  const stageEnd = (activeIndex + 1) / N
  const progressWidth = useTransform(
    scrollYProgress,
    [stageStart, stageEnd],
    ['0%', '100%']
  )

  return (
    /* outer: tall enough to give 300vh of scroll room */
    <div ref={containerRef} style={{ height: `${N * 100}vh` }} className="relative">

      {/* sticky inner — stays in view the whole time */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── FULL-BLEED IMAGE LAYER ────────────────────── */}
        <div className="absolute inset-0">
          {stageImages.map((src, i) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              animate={{
                opacity: i === activeIndex ? 1 : 0,
                scale: i === activeIndex ? 1 : 1.04,
              }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            >
              <img
                src={src}
                alt={`Stage ${i + 1}`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </motion.div>
          ))}

          {/* heavy dark overlay — left side for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-graphite/95 via-graphite/75 to-graphite/30" />
          {/* top & bottom fade for smooth blending */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-graphite to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-graphite to-transparent" />
          {/* weld glow on active image */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-weld/40" />
        </div>

        {/* ── CONTENT LAYER ─────────────────────────────── */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 max-w-5xl">

          {/* section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel index="§ 05">Milestones</SectionLabel>
          </motion.div>

          {/* main heading — always visible */}
          <h2 className="font-display font-extrabold uppercase text-5xl lg:text-7xl text-steel-light leading-[0.9] mt-4 mb-10">
            Two decades of<br />
            <span className="text-weld">steel craft.</span>
          </h2>

          {/* milestone card — swaps per stage */}
          <div className="relative overflow-hidden" style={{ minHeight: 200 }}>
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                className="absolute inset-0 flex flex-col justify-start"
                animate={{
                  opacity: i === activeIndex ? 1 : 0,
                  y: i === activeIndex ? 0 : i < activeIndex ? -24 : 24,
                }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              >
                {/* year badge */}
                <div className="flex items-center gap-3 mb-3">
                  <motion.span
                    className="font-display font-extrabold text-[5rem] lg:text-[7rem] leading-none text-weld"
                    animate={{ opacity: i === activeIndex ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {t.year}
                  </motion.span>
                </div>

                <div className="border-l-2 border-weld pl-6">
                  <h3 className="font-display uppercase text-3xl lg:text-4xl text-steel-light mb-3">
                    {t.title}
                  </h3>
                  <p className="text-steel text-base leading-relaxed max-w-lg">
                    {t.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* stage progress dots */}
          <div className="flex items-center gap-3 mt-16">
            {timeline.map((_, i) => (
              <motion.div
                key={i}
                className="h-[3px] rounded-full bg-panel-line overflow-hidden"
                animate={{ width: i === activeIndex ? 40 : 16 }}
                transition={{ duration: 0.35 }}
              >
                <motion.div
                  className="h-full bg-weld"
                  animate={{ width: i < activeIndex ? '100%' : i === activeIndex ? undefined : '0%' }}
                  style={i === activeIndex ? { width: progressWidth } : {}}
                />
              </motion.div>
            ))}
            <span className="font-mono text-xs text-steel tracking-widest uppercase ml-2">
              {activeIndex + 1} / {N}
            </span>
          </div>

          {/* scroll hint */}
          <motion.div
            className="flex items-center gap-2 mt-6 text-steel/50 text-xs font-mono uppercase tracking-widest"
            animate={{ opacity: activeIndex === N - 1 ? 0 : 1 }}
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <ChevronsDown size={14} className="text-weld/50" />
            </motion.div>
            Scroll to advance
          </motion.div>
        </div>

        {/* ── RIGHT SIDE stage label ─────────────────────── */}
        <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3 items-end">
          {stageLabels.map((label, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2"
              animate={{
                opacity: i === activeIndex ? 1 : 0.25,
                x: i === activeIndex ? 0 : 8,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-mono text-[10px] tracking-widest uppercase text-right hidden lg:block"
                style={{ color: i === activeIndex ? 'var(--color-steel-light)' : 'var(--color-steel)' }}
              >
                {label}
              </span>
              <motion.div
                className="rounded-full"
                animate={{
                  width: i === activeIndex ? 10 : 6,
                  height: i === activeIndex ? 10 : 6,
                  backgroundColor: i === activeIndex ? 'var(--color-weld)' : 'var(--color-panel-line)',
                  boxShadow: i === activeIndex ? '0 0 10px rgba(255,90,31,0.7)' : 'none',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── bottom weld progress bar ───────────────────── */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-weld shadow-[0_0_8px_rgba(255,90,31,0.6)]"
          style={{ width: fullProgressWidth }}
        />
      </div>
    </div>
  )
}

/* ─── main page ──────────────────────────────────────────── */
export default function About() {
  const heroRef = useRef(null)
  const sectionRef = useRef(null)
  const teamTrackRef = useRef(null)

  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const canvasY = useTransform(heroProgress, [0, 1], [0, 250])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150])
  const y2 = useTransform(scrollYProgress, [0, 1], [-150, 150])
  const rot1 = useTransform(scrollYProgress, [0, 1], [0, 18])
  const rot2 = useTransform(scrollYProgress, [0, 1], [0, -18])

  /* horizontal scroll for team strip */
  const teamContainerRef = useRef(null)
  const { scrollYProgress: teamScroll } = useScroll({
    target: teamContainerRef,
    offset: ['start end', 'end start'],
  })
  const teamX = useTransform(teamScroll, [0, 1], ['0%', '-30%'])

  const leftCaps = capabilities.filter(c => c.side === 'left')
  const rightCaps = capabilities.filter(c => c.side === 'right')

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO
        title="About Us | Steel Fabrication Company UAE"
        description="Jazeerat Al Hadeed is an integrated machine workshop and steel fabrication company with 18+ years of experience delivering precision structural steel projects across the MENA region."
        path="/about"
      />

      {/* ── HERO — full-viewport with video/canvas background ── */}
      <section ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">

        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/about-hero.mp4"
          poster="/assets/slides/slide-4.webp"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => { e.target.style.display = 'none' }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-graphite/60 via-graphite/40 to-graphite/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite/55 via-transparent to-transparent pointer-events-none" />

        <motion.div style={{ y: canvasY }} className="absolute inset-0 z-[1]">
          <WeldingCanvas />
        </motion.div>

        <div className="absolute inset-0 bp-grid opacity-15 pointer-events-none z-[2]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 pt-32 pb-24">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <SectionLabel index="ABOUT">Who We Are</SectionLabel>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={container} className="mt-2">
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-8xl leading-[0.9] text-steel-light drop-shadow-lg"
            >
              Built on the
              <br />
              <span className="text-weld">shop floor.</span>
            </motion.h1>

            <motion.div
              className="mt-5 h-[3px] bg-weld origin-left shadow-[0_0_12px_rgba(255,90,31,0.7)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }}
              style={{ width: 120 }}
            />

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-8 max-w-xl text-steel-light/80 text-base leading-relaxed"
            >
              Jazeerat Al Hadeed is an integrated machine workshop and steel fabrication
              solution provider delivering precision structural steel projects across the
              MENA region. Our work is judged in millimeters, not marketing.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 flex flex-wrap gap-4"
            >
              <NavLink
                to="/contact"
                className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-7 py-4 hover:bg-signal transition-colors"
              >
                Request a Quote <ArrowRight size={18} />
              </NavLink>
              <NavLink
                to="/services"
                className="inline-flex items-center gap-2 font-display uppercase tracking-wide text-steel-light border-b border-steel pb-1 hover:text-weld hover:border-weld transition-colors"
              >
                Our Services
              </NavLink>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-6 lg:left-10 z-10">
          <CoordinateTicker />
        </div>

        <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1 text-steel/70 text-xs uppercase tracking-[0.3em]">
          <span>Scroll to explore</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronsDown size={18} className="text-weld" />
          </motion.div>
        </div>
      </section>

      {/* ── CUTLINE 01 ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 01 — Capabilities & Identity" />
      </div>

      {/* ── 3-COLUMN CAPABILITIES + CENTER IMAGE ───────── */}
      <section
        ref={sectionRef}
        className="py-24 lg:py-32 relative overflow-hidden"
      >
        <motion.div
          className="absolute top-16 left-8 w-60 h-60 rounded-full bg-weld/5 blur-3xl pointer-events-none"
          style={{ y: y1, rotate: rot1 }}
        />
        <motion.div
          className="absolute bottom-16 right-8 w-72 h-72 rounded-full bg-signal/5 blur-3xl pointer-events-none"
          style={{ y: y2, rotate: rot2 }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={container}
            className="flex flex-col items-center mb-16 text-center"
          >
            <motion.div variants={fadeUp} custom={0}>
              <SectionLabel index="§ 01">Our Capabilities</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp} custom={1}
              className="font-display font-bold uppercase text-4xl lg:text-5xl text-steel-light max-w-2xl mt-2"
            >
              One workshop, <span className="text-weld">full capability.</span>
            </motion.h2>
            <motion.div
              className="mt-4 h-px bg-weld"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 items-center">

            <div className="space-y-14">
              {leftCaps.map((cap, i) => (
                <CapabilityItem key={cap.title} cap={cap} delay={i * 0.15} direction="left" />
              ))}
            </div>

            <div className="flex justify-center items-center order-first md:order-none mb-12 md:mb-0">
              <motion.div
                className="relative w-full max-w-xs"
                initial={{ scale: 0.88, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 border-2 border-weld/40 -m-4 z-[-1]"
                  initial={{ opacity: 0, scale: 1.12 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />

                <motion.div
                  className="overflow-hidden border border-panel-line"
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                  <img
                    src="/assets/slides/slide-1.webp"
                    alt="Jazeerat Al Hadeed workshop"
                    className="w-full h-72 md:h-96 object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-graphite/80 to-transparent flex items-end justify-center pb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <NavLink
                      to="/projects"
                      className="flex items-center gap-2 border border-weld text-weld px-4 py-2 font-display uppercase text-sm tracking-widest hover:bg-weld hover:text-graphite transition-colors"
                    >
                      Our Projects <ArrowRight size={14} />
                    </NavLink>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute -top-5 -right-8 w-14 h-14 rounded-full bg-weld/10 border border-weld/20 hidden md:block"
                  style={{ y: y1 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-signal/10 border border-signal/20 hidden md:block"
                  style={{ y: y2 }}
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />

                <motion.div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-weld hidden md:block"
                  animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>

            <div className="space-y-14">
              {rightCaps.map((cap, i) => (
                <CapabilityItem key={cap.title} cap={cap} delay={i * 0.15} direction="right" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CUTLINE 02 ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 02 — Core Values" />
      </div>

      {/* ── VALUES ─────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <SectionLabel index="§ 02">What Drives the Work</SectionLabel>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-px bg-panel-line mt-12 border border-panel-line">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-graphite p-10 hover:bg-panel transition-colors group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-weld/0 group-hover:bg-weld/[0.03] transition-colors pointer-events-none" />

                  <motion.div
                    whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                  >
                    <Icon size={28} className="text-weld mb-6" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="font-display uppercase text-2xl text-steel-light mb-3 group-hover:text-weld transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-steel text-sm leading-relaxed">{v.desc}</p>
                  <motion.div
                    className="mt-4 h-px bg-weld origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                    style={{ width: 32 }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────── */}
      <section className="py-20 bp-grid-fine border-y border-panel-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-panel-line border border-panel-line">
          {stats.map((s, i) => (
            <StatCounter key={s.label} icon={s.icon} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ── MISSION ── NEW SECTION (cula.tech inspired)
      ════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 03 — Our Mission" />
      </div>

      <section className="py-24 lg:py-36 relative overflow-hidden">
        {/* ── BG IMAGE with parallax scroll ── */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          <img
            src="/assets/timeline-growth.webp"
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* dark gradient overlay — keeps text readable, preserves brand colors */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-graphite via-graphite/90 to-graphite/70 pointer-events-none" />
        {/* bottom fade for smooth section blend */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] bg-gradient-to-t from-graphite to-transparent pointer-events-none" />
        {/* top fade */}
        <div className="absolute top-0 left-0 right-0 h-24 z-[1] bg-gradient-to-b from-graphite to-transparent pointer-events-none" />
        {/* subtle weld-tinted vignette on the right */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-l from-weld/[0.06] to-transparent pointer-events-none" />

        {/* large background word — sits above image, below content */}
        <motion.span
          className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-extrabold text-[clamp(5rem,20vw,18rem)] leading-none text-weld/[0.06] select-none pointer-events-none uppercase z-[2]"
          aria-hidden
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          MISSION
        </motion.span>

        <div className="relative z-[3] max-w-7xl mx-auto px-6 lg:px-10">
          {/* heading row */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeLeft}
            >
              <SectionLabel index="§ 03">Our Mission</SectionLabel>
              <h2 className="font-display font-extrabold uppercase text-5xl lg:text-6xl text-steel-light leading-[0.92] mt-4">
                Precision steel.<br />
                <span className="text-weld">Real purpose.</span>
              </h2>
              <motion.div
                className="mt-6 h-[3px] bg-weld origin-left shadow-[0_0_10px_rgba(255,90,31,0.5)]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{ width: 80 }}
              />
            </motion.div>

            <motion.p
              className="text-steel text-lg leading-relaxed self-end pt-8 lg:pt-16 border-l border-panel-line pl-8"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeRight}
              custom={1}
            >
              We exist to eliminate the gap between engineering intent and fabricated reality.
              Every drawing that enters our workshop leaves as a component — measured, tested,
              documented and ready for site. This commitment to verifiable precision is not
              a marketing statement; it is the operating standard our clients rely on.
            </motion.p>
          </div>

          {/* pillars */}
          <div className="space-y-10 lg:space-y-12 relative">
            {/* vertical line */}
            <motion.div
              className="absolute left-0 top-0 w-px bg-gradient-to-b from-weld via-weld/30 to-transparent"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <div className="pl-8">
              {missionPillars.map((pillar, index) => (
                <MissionPillar key={pillar.number} pillar={pillar} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ── TEAM ── NEW SECTION (cula.tech inspired)
      ════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 04 — The Team" />
      </div>

      <section ref={teamContainerRef} className="py-24 lg:py-32 overflow-hidden relative">
        {/* subtle grid */}
        <div className="absolute inset-0 bp-grid opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp}
            >
              <SectionLabel index="§ 04">The Team</SectionLabel>
              <h2 className="font-display font-extrabold uppercase text-5xl lg:text-6xl text-steel-light leading-[0.92] mt-4">
                The people<br />
                <span className="text-weld">behind the steel.</span>
              </h2>
            </motion.div>

            <motion.p
              className="text-steel text-base leading-relaxed max-w-md"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={1}
            >
              Our team brings together engineers, fabricators and quality managers
              who treat every project as a reflection of their personal craft.
              Tap a card to hear what drives them.
            </motion.p>
          </div>
        </div>

        {/* horizontal scroll strip */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 px-6 lg:px-10"
            style={{ x: teamX }}
          >
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}

            {/* filler "Join Us" card */}
            <motion.div
              className="flex-none w-72 lg:w-80 h-96 border border-dashed border-panel-line bg-graphite/50 flex flex-col items-center justify-center gap-4 group hover:border-weld/40 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: team.length * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="w-16 h-16 border border-panel-line group-hover:border-weld/50 flex items-center justify-center text-weld transition-colors"
                whileHover={{ rotate: 90, transition: { duration: 0.3 } }}
              >
                <span className="text-3xl font-display font-thin">+</span>
              </motion.div>
              <p className="font-display uppercase text-lg text-steel group-hover:text-weld transition-colors">
                Join Our Team
              </p>
              <NavLink
                to="/contact"
                className="font-mono text-xs tracking-widest text-weld/60 uppercase hover:text-weld flex items-center gap-1 transition-colors"
              >
                Get in touch <ArrowRight size={12} />
              </NavLink>
            </motion.div>
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          className="flex items-center gap-2 px-6 lg:px-10 mt-8 text-steel/50 text-xs font-mono uppercase tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="w-8 h-px bg-weld/40"
            animate={{ scaleX: [1, 1.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          Scroll or drag to explore
          <motion.div
            className="w-8 h-px bg-weld/40"
            animate={{ scaleX: [1, 1.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </motion.div>

        {/* ── SEE ALL TEAM CTA ─────────────────────── */}
        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <NavLink
            to="/team"
            className="group relative inline-flex items-center gap-3 border border-weld/40 hover:border-weld px-8 py-4 font-display uppercase tracking-widest text-sm text-steel-light hover:text-weld transition-all duration-300 overflow-hidden"
          >
            {/* animated bg sweep */}
            <span className="absolute inset-0 bg-weld/0 group-hover:bg-weld/[0.06] transition-colors duration-300 pointer-events-none" />
            <span className="relative">See All Team Members</span>
            <motion.span
              className="relative"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </NavLink>
        </motion.div>
      </section>

      {/* ── CUTLINE 05 ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 05 — Milestones" />
      </div>

      {/* ════════════════════════════════════════════════════
          ── SCROLL-JACKED MILESTONE SECTION (cula.tech style)
          The outer wrapper is tall enough to give scroll room.
          The inner sticky container stays fixed in view while
          the user scrolls, driving image + text transitions.
      ════════════════════════════════════════════════════ */}
      <MilestoneScroller timeline={timeline} />

      {/* ── CTA BANNER ─────────────────────────────────── */}
      <motion.section
        className="py-16 border-t border-panel-line"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="border border-panel-line bg-graphite-light p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 border-l-2 border-weld/0 group-hover:border-weld/20 transition-colors pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-weld/0 group-hover:from-weld/[0.04] to-transparent transition-colors pointer-events-none" />

            <div className="relative">
              <p className="font-mono text-xs tracking-widest text-steel uppercase mb-2">Work with us</p>
              <h3 className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-steel-light leading-tight">
                Have a spec?{' '}
                <span className="text-weld">Let's cut it.</span>
              </h3>
              <p className="mt-3 text-steel text-sm max-w-md leading-relaxed">
                Send us a drawing and we'll send back a quote — typically within 24 hours.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <NavLink
                to="/contact"
                className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-8 py-4 hover:bg-signal transition-colors"
              >
                Start a Project
                <ArrowRight size={18} />
              </NavLink>
            </motion.div>
          </div>
        </div>
      </motion.section>

    </motion.main>
  )
}
