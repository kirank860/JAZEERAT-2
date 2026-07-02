import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {
  Target, Eye, Handshake, Award, Users, Calendar, TrendingUp,
  ArrowRight, Factory, Wrench, ShieldCheck, Ruler, PenTool, Boxes, ChevronsDown,
} from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'
import CoordinateTicker from '../components/CoordinateTicker'

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

/* ─── animation presets ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

/* ─── WeldingCanvas: live spark/particle animation ──────────
   Simulates a CNC plasma cutter arc moving across a steel plate
   with flying sparks, matching the Cutline and CoordinateTicker motifs.
────────────────────────────────────────────────────────────── */
function WeldingCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width, height, raf
    const sparks = []
    const arcPoints = []
    let arcX = 0
    let arcDir = 1
    let arcSpeed = 0.6
    let t = 0

    function resize() {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      arcX = width * 0.15
    }

    class Spark {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 6
        this.vy = -(Math.random() * 5 + 2)
        this.life = 1
        this.decay = Math.random() * 0.025 + 0.012
        this.size = Math.random() * 2.5 + 0.5
        // orange → yellow → white colour progression
        this.hue = Math.random() > 0.5 ? 20 : 45
      }
      update() {
        this.vy += 0.14   // gravity
        this.vx *= 0.96
        this.x += this.vx
        this.y += this.vy
        this.life -= this.decay
      }
      draw(ctx) {
        ctx.save()
        ctx.globalAlpha = Math.max(0, this.life)
        ctx.shadowBlur = 18
        ctx.shadowColor = `hsl(${this.hue},100%,70%)`
        ctx.fillStyle = `hsl(${this.hue},100%,${65 + (1 - this.life) * 25}%)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, Math.max(0, this.size * this.life), 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    function spawnSparks(x, y, count = 8) {
      for (let i = 0; i < count; i++) sparks.push(new Spark(x, y))
    }

    function drawArc(x, y) {
      // bright weld-pool glow at cut point
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 32)
      grad.addColorStop(0, 'rgba(255,255,240,1)')
      grad.addColorStop(0.15, 'rgba(255,200,40,0.9)')
      grad.addColorStop(0.4, 'rgba(255,90,31,0.6)')
      grad.addColorStop(1, 'rgba(255,90,31,0)')
      ctx.save()
      ctx.globalAlpha = 1
      ctx.shadowBlur = 40
      ctx.shadowColor = '#ff5a1f'
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, 32, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    function drawTrail() {
      // keep last 80 arc positions as a fading orange trail
      for (let i = 0; i < arcPoints.length; i++) {
        const p = arcPoints[i]
        const alpha = (i / arcPoints.length) * 0.6
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.shadowBlur = 10
        ctx.shadowColor = '#ff5a1f'
        ctx.fillStyle = '#ff5a1f'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    function drawGrid() {
      // faint blueprint grid — matches .bp-grid class
      ctx.save()
      ctx.strokeStyle = 'rgba(139,146,154,0.06)'
      ctx.lineWidth = 0.5
      const step = 40
      for (let x = 0; x < width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
      }
      ctx.restore()
    }

    function loop() {
      ctx.clearRect(0, 0, width, height)

      drawGrid()

      // move arc head in a smooth sine wave at ~40% height
      t += 0.007
      arcX += arcSpeed * arcDir
      if (arcX > width * 0.9) arcDir = -1
      if (arcX < width * 0.1) arcDir = 1
      const arcY = height * 0.42 + Math.sin(t * 2) * height * 0.1

      // record trail
      arcPoints.push({ x: arcX, y: arcY })
      if (arcPoints.length > 80) arcPoints.shift()

      drawTrail()
      drawArc(arcX, arcY)

      // constant moderate spark emission
      if (Math.random() < 0.85) spawnSparks(arcX, arcY, Math.floor(Math.random() * 6 + 3))
      // frequent small burst
      if (Math.random() < 0.15) spawnSparks(arcX, arcY, 16)

      // update & draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update()
        sparks[i].draw(ctx)
        if (sparks[i].life <= 0) sparks.splice(i, 1)
      }

      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    loop()

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
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

/* ─── main page ──────────────────────────────────────────── */
export default function About() {
  const heroRef = useRef(null)
  const sectionRef = useRef(null)
  
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const canvasY = useTransform(heroProgress, [0, 1], [0, 250]) // Cinematic parallax for canvas layer
  
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]) // Deeper vertical drift
  const y2 = useTransform(scrollYProgress, [0, 1], [-150, 150]) // Deeper vertical drift
  const rot1 = useTransform(scrollYProgress, [0, 1], [0, 18])
  const rot2 = useTransform(scrollYProgress, [0, 1], [0, -18])

  const leftCaps = capabilities.filter(c => c.side === 'left')
  const rightCaps = capabilities.filter(c => c.side === 'right')

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* ── HERO — full-viewport with video/canvas background ── */}
      <section ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden">

        {/* ── LAYER 1: optional background video
            Download a .mp4 (e.g. from Pexels: "welding sparks" or "CNC cutting")
            and save it to /public/assets/about-hero.mp4
            The video hides itself automatically if the file is missing.
        */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dmb7nfmyj/video/upload/q_auto/jazeerat/about-hero"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => { e.target.style.display = 'none' }}
        />

        {/* ── LAYER 2: dark gradient scrim — rendered before canvas so sparks show on top */}
        <div className="absolute inset-0 bg-gradient-to-b from-graphite/60 via-graphite/40 to-graphite/85 pointer-events-none" />
        {/* left edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-graphite/55 via-transparent to-transparent pointer-events-none" />

        {/* ── LAYER 3: live canvas spark animation — above scrim */}
        <motion.div style={{ y: canvasY }} className="absolute inset-0 z-[1]">
          <WeldingCanvas />
        </motion.div>

        {/* ── LAYER 4: blueprint grid overlay */}
        <div className="absolute inset-0 bp-grid opacity-15 pointer-events-none z-[2]" />

        {/* ── LAYER 5: content ──────────────────────────────── */}
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

            {/* animated weld underline */}
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

        {/* ── coordinate ticker — bottom left */}
        <div className="absolute bottom-8 left-6 lg:left-10 z-10">
          <CoordinateTicker />
        </div>

        {/* ── scroll indicator — bottom center */}
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
        {/* parallax background blobs */}
        <motion.div
          className="absolute top-16 left-8 w-60 h-60 rounded-full bg-weld/5 blur-3xl pointer-events-none"
          style={{ y: y1, rotate: rot1 }}
        />
        <motion.div
          className="absolute bottom-16 right-8 w-72 h-72 rounded-full bg-signal/5 blur-3xl pointer-events-none"
          style={{ y: y2, rotate: rot2 }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* section header */}
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

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 items-center">

            {/* left capabilities */}
            <div className="space-y-14">
              {leftCaps.map((cap, i) => (
                <CapabilityItem key={cap.title} cap={cap} delay={i * 0.15} direction="left" />
              ))}
            </div>

            {/* center image */}
            <div className="flex justify-center items-center order-first md:order-none mb-12 md:mb-0">
              <motion.div
                className="relative w-full max-w-xs"
                initial={{ scale: 0.88, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
              >
                {/* outer decorative border */}
                <motion.div
                  className="absolute inset-0 border-2 border-weld/40 -m-4 z-[-1]"
                  initial={{ opacity: 0, scale: 1.12 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />

                {/* image */}
                <motion.div
                  className="overflow-hidden border border-panel-line"
                  whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                >
                  <img
                    src="https://res.cloudinary.com/dmb7nfmyj/image/upload/q_auto,f_auto/jazeerat/slide-1"
                    alt="Jazeerat Al Hadeed workshop"
                    className="w-full h-72 md:h-96 object-cover"
                  />
                  {/* gradient overlay with CTA */}
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

                {/* floating accent circles */}
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

                {/* pulsing weld dot */}
                <motion.div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-weld hidden md:block"
                  animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>

            {/* right capabilities */}
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
                  {/* hover glow */}
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

      {/* ── CUTLINE 03 ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 03 — Timeline" />
      </div>

      {/* ── TIMELINE ───────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-graphite-light">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <SectionLabel index="§ 03">Milestones</SectionLabel>
            <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl text-steel-light mt-2 max-w-xl">
              Two decades of <span className="text-weld">steel craft.</span>
            </h2>
          </motion.div>

          <div className="mt-14 relative pl-8 border-l border-panel-line">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={i}
                variants={fadeUp}
                className="relative pb-12 last:pb-0 group"
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                {/* dot */}
                <motion.span
                  className="absolute -left-[37px] top-1 w-3 h-3 rounded-full bg-weld shadow-[0_0_0_4px_rgba(19,21,25,1)]"
                  whileInView={{ scale: [0.5, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
                {/* glowing line segment */}
                <motion.div
                  className="absolute -left-[33px] top-4 w-[1px] bg-gradient-to-b from-weld to-transparent"
                  style={{ height: i < timeline.length - 1 ? '100%' : 0 }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                />

                <span className="font-mono text-weld text-sm">{t.year}</span>
                <h3 className="font-display uppercase text-2xl text-steel-light mt-1 mb-2 group-hover:text-weld transition-colors">
                  {t.title}
                </h3>
                <p className="text-steel text-sm leading-relaxed max-w-md">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            {/* animated background line */}
            <motion.div
              className="absolute inset-0 border-l-2 border-weld/0 group-hover:border-weld/20 transition-colors pointer-events-none"
            />
            {/* orange glow on hover */}
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
