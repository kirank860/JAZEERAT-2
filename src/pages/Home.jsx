import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {
  ArrowUpRight, ArrowRight, Factory, Wrench,
  ShieldCheck, Flame, PenTool, Truck, MapPin, ExternalLink,
} from 'lucide-react'
import SEO from '../components/SEO'
import SlidingHero from '../components/SlidingHero'
import Cutline from '../components/Cutline'
import SectionLabel from '../components/SectionLabel'
import WhatWeDoSection from '../components/WhatWeDoSection'
import CoordinateTicker from '../components/CoordinateTicker'
import Reveal from '../components/Reveal'

/* ─── data ───────────────────────────────────────────────── */
const services = [
  {
    icon: PenTool,
    num: '01',
    title: 'Design & Detailing',
    short: 'Shop drawings and structural detailing prepared before a single plate is cut.',
    spec: 'Tolerance ±0.5mm',
    color: 'from-weld/10',
  },
  {
    icon: Flame,
    num: '02',
    title: 'CNC Plasma & Laser',
    short: 'High-accuracy plate cutting for structural and architectural steel at production scale.',
    spec: 'Plate up to 50mm',
    color: 'from-signal/10',
  },
  {
    icon: Factory,
    num: '03',
    title: 'Structural Fabrication',
    short: 'Portal frames, trusses and columns pre-assembled for site-ready installation.',
    spec: 'Spans up to 30,000mm',
    color: 'from-weld/10',
  },
  {
    icon: Wrench,
    num: '04',
    title: 'Machine Workshop',
    short: 'CNC machining, drilling and boring for precision components and mechanical parts.',
    spec: 'Full workshop, one roof',
    color: 'from-signal/10',
  },
  {
    icon: ShieldCheck,
    num: '05',
    title: 'Welding & QA',
    short: 'Certified welders working to code — every joint logged against our QA record.',
    spec: 'Certified welders on shift',
    color: 'from-weld/10',
  },
  {
    icon: Truck,
    num: '06',
    title: 'Delivery & Install',
    short: 'Coordinated transport and on-site installation support across the MENA region.',
    spec: 'Site-coordinated logistics',
    color: 'from-signal/10',
  },
]

const projects = [
  {
    title: 'Industrial Fabrication',
    location: 'UAE',
    scope: 'Portal frames, columns and steel decks for a major industrial facility.',
    image: '/assets/slides/slide-1.webp',
    tag: 'Structural',
  },
  {
    title: 'Oil & Gas Structure',
    location: 'Oman',
    scope: 'Pipe racks, access platforms and bracing systems for upstream plant.',
    image: '/assets/slides/slide-2.webp',
    tag: 'Industrial',
  },
  {
    title: 'Logistics Hub',
    location: 'Qatar',
    scope: 'Warehouse steelwork and loading canopy structures across a 12,000m² site.',
    image: '/assets/slides/slide-3.webp',
    tag: 'Commercial',
  },
]

const process = [
  { n: '01', title: 'Design & Detailing', desc: 'Shop drawings and detailing engineered against your structural spec.' },
  { n: '02', title: 'Cutting & Machining', desc: 'CNC plasma, laser and machining tolerance-checked at every pass.' },
  { n: '03', title: 'Welding & Assembly', desc: 'Certified welders assemble to code, inspected at each joint.' },
  { n: '04', title: 'Finishing & Coating', desc: 'Surface prep, galvanizing and coating for MENA climate durability.' },
  { n: '05', title: 'Delivery & Install', desc: 'Site-coordinated delivery and installation support across the region.' },
]

const stats = [
  { value: '5+', label: 'Years Fabricating' },
  { value: '450+', label: 'Projects Delivered' },
  { value: '±0.5mm', label: 'Tolerance Standard' },
  { value: 'MENA', label: 'Region Served' },
]

/* ─── animation variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/* ─── Service Card ───────────────────────────────────────── */
function ServiceCard({ svc, i }) {
  const [hovered, setHovered] = useState(false)
  const Icon = svc.icon

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={i}
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group border border-panel-line bg-graphite overflow-hidden cursor-pointer"
    >
      {/* animated background gradient on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${svc.color} to-transparent`}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* glowing top border on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-weld"
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />

      <div className="relative p-8 flex flex-col h-full min-h-[240px]">
        {/* number + icon row */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            className="text-weld bg-weld/10 border border-weld/20 p-3"
            animate={{ rotate: hovered ? 12 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon size={22} strokeWidth={1.5} />
          </motion.div>
          <span className="font-mono text-[11px] text-steel/60 tracking-widest">{svc.num}</span>
        </div>

        <h3 className="font-display uppercase text-xl text-steel-light mb-3 group-hover:text-weld transition-colors duration-300">
          {svc.title}
        </h3>
        <p className="text-steel text-sm leading-relaxed flex-1">{svc.short}</p>

        {/* spec tag */}
        <div className="mt-5 pt-4 border-t border-panel-line flex items-center justify-between">
          <span className="font-mono text-[10px] text-steel/70 uppercase tracking-widest">{svc.spec}</span>
          <motion.div
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.25 }}
          >
            <ArrowRight size={14} className="text-weld" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Project Card ───────────────────────────────────────── */
function ProjectCard({ proj, i }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      custom={i}
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group overflow-hidden border border-panel-line bg-graphite"
    >
      {/* image container */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={proj.image}
          alt={proj.title}
          className="absolute w-full h-[130%] -top-[15%] object-cover"
          style={{ y: imgY }}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        {/* image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/30 to-transparent" />

        {/* tag */}
        <div className="absolute top-4 left-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] bg-weld text-graphite px-2 py-1">
            {proj.tag}
          </span>
        </div>

        {/* location badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1">
          <MapPin size={11} className="text-steel/80" />
          <span className="font-mono text-[10px] text-steel/80 uppercase tracking-widest">{proj.location}</span>
        </div>
      </div>

      {/* text content */}
      <div className="p-6">
        <h3 className="font-display uppercase text-xl text-steel-light mb-2 group-hover:text-weld transition-colors">
          {proj.title}
        </h3>
        <p className="text-steel text-sm leading-relaxed line-clamp-2">{proj.scope}</p>

        {/* animated CTA row */}
        <motion.div
          className="mt-5 flex items-center gap-2 text-weld text-xs font-mono uppercase tracking-widest"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <span>View Project</span>
          <motion.div animate={{ x: hovered ? 3 : 0 }}>
            <ExternalLink size={13} />
          </motion.div>
        </motion.div>
      </div>

      {/* bottom weld line that draws on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-weld"
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  )
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function Home() {
  const processRef = useRef(null)
  const servicesRef = useRef(null)
  const projectsRef = useRef(null)
  
  const { scrollYProgress: processProgress } = useScroll({ target: processRef, offset: ['start end', 'end start'] })
  const lineH = useTransform(processProgress, [0.1, 0.9], ['0%', '100%'])

  const { scrollYProgress: servicesProgress } = useScroll({ target: servicesRef, offset: ['start end', 'end start'] })
  const glowY1 = useTransform(servicesProgress, [0, 1], [-120, 120])

  const { scrollYProgress: projectsProgress } = useScroll({ target: projectsRef, offset: ['start end', 'end start'] })
  const glowY2 = useTransform(projectsProgress, [0, 1], [150, -150])

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO
        title="Steel Fabrication & Machine Workshop UAE"
        description="Jazeerat Al Hadeed — precision structural steel fabrication, CNC plasma & laser cutting and machine workshop delivering projects across UAE, Oman, Qatar and the wider GCC region."
        path="/"
      />

      {/* ── HERO — full-width sliding carousel */}
      <SlidingHero />

      {/* ── WHAT WE DO */}
      <Reveal>
        <WhatWeDoSection />
      </Reveal>

      {/* ═══════════════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════════════ */}
      <Reveal>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Cutline label="Fig. 01 — Services" />
        </div>
      </Reveal>

      <section ref={servicesRef} className="py-24 lg:py-32 relative overflow-hidden">
        {/* subtle ambient glow */}
        <motion.div 
          style={{ y: glowY1 }}
          className="absolute top-0 right-0 w-[500px] h-[400px] bg-weld/5 blur-3xl rounded-full pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* header row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} custom={0}>
                <SectionLabel index="§ 01">What We Do</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp} custom={1}
                className="font-display font-bold uppercase text-4xl lg:text-5xl text-steel-light max-w-lg mt-2"
              >
                Every stage,{' '}
                <span className="text-weld">one workshop.</span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <NavLink
                to="/services"
                className="group inline-flex items-center gap-3 border border-weld/50 text-weld px-6 py-3 font-display uppercase tracking-wide text-sm hover:bg-weld hover:text-graphite transition-all duration-300"
              >
                All Services
                <motion.span
                  className="inline-flex"
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </NavLink>
            </motion.div>
          </div>

          {/* 3×2 service grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-panel-line border border-panel-line">
            {services.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} i={i} />
            ))}
          </div>

          {/* bottom CTA bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center justify-between border border-panel-line bg-graphite-light px-8 py-5"
          >
            <p className="text-steel text-sm">
              From first drawing to final install — all under one roof.
            </p>
            <NavLink
              to="/services"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold text-sm bg-weld text-graphite px-5 py-2.5 hover:bg-signal transition-colors"
            >
              Explore Capabilities <ArrowUpRight size={15} />
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROJECT GALLERY PREVIEW
      ═══════════════════════════════════════════════════ */}
      <Reveal>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Cutline label="Fig. 02 — Project Gallery" />
        </div>
      </Reveal>

      <section ref={projectsRef} className="py-24 lg:py-32 bg-graphite-light relative overflow-hidden">
        {/* ambient dot pattern */}
        <div className="absolute inset-0 bp-grid-fine opacity-40 pointer-events-none" />
        
        {/* floating ambient glow */}
        <motion.div 
          style={{ y: glowY2 }}
          className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-weld/5 blur-3xl rounded-full pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} custom={0}>
                <SectionLabel index="§ 02">Recent Projects</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp} custom={1}
                className="font-display font-bold uppercase text-4xl lg:text-5xl text-steel-light max-w-lg mt-2"
              >
                Delivered with{' '}
                <span className="text-weld">precision.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp} custom={2}
                className="mt-3 text-steel text-sm max-w-md leading-relaxed"
              >
                A selection of recent fabrication and erection projects across the Gulf.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <NavLink
                to="/projects"
                className="inline-flex items-center gap-3 border border-weld/50 text-weld px-6 py-3 font-display uppercase tracking-wide text-sm hover:bg-weld hover:text-graphite transition-all duration-300"
              >
                Full Gallery <ArrowRight size={16} />
              </NavLink>
            </motion.div>
          </div>

          {/* project cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, i) => (
              <NavLink key={proj.title} to="/projects" className="block">
                <ProjectCard proj={proj} i={i} />
              </NavLink>
            ))}
          </div>

          {/* full-width "View All Projects" teaser banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 relative overflow-hidden group"
          >
            <NavLink to="/projects" className="block">
              <div className="relative border border-panel-line bg-graphite flex items-center justify-between px-8 py-6 overflow-hidden">
                {/* animated fill on hover */}
                <motion.div
                  className="absolute inset-0 bg-weld origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
                <div className="relative z-10 flex items-center gap-4">
                  <span className="font-mono text-[10px] text-steel/60 uppercase tracking-widest">JZH-2026</span>
                  <span className="h-px w-10 bg-panel-line" />
                  <p className="font-display uppercase text-xl text-steel-light group-hover:text-graphite transition-colors duration-300">
                    Browse all projects across the MENA region
                  </p>
                </div>
                <div className="relative z-10 flex items-center gap-2 font-display uppercase text-sm font-semibold text-weld group-hover:text-graphite transition-colors duration-300">
                  View All <ArrowUpRight size={16} />
                </div>
              </div>
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROCESS TIMELINE
      ═══════════════════════════════════════════════════ */}
      <Reveal>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Cutline label="Fig. 03 — Process" />
        </div>
      </Reveal>

      <section ref={processRef} className="py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            custom={0} variants={fadeUp}
          >
            <SectionLabel index="§ 03">From Drawing to Delivery</SectionLabel>
            <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl text-steel-light max-w-xl mt-2">
              A fabrication line,{' '}
              <span className="text-weld">not a black box.</span>
            </h2>
          </motion.div>

          <div className="mt-16 relative">
            {/* scrolling progress line */}
            <div className="hidden lg:block absolute left-[74px] top-0 bottom-0 w-px bg-panel-line">
              <motion.div
                className="absolute top-0 left-0 w-full bg-weld origin-top"
                style={{ height: lineH }}
              />
            </div>

            <div className="divide-y divide-panel-line border-t border-b border-panel-line">
              {process.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  custom={i}
                  variants={fadeUp}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-7 group relative"
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                >
                  {/* step number with pulsing ring on hover */}
                  <div className="relative w-10 shrink-0 flex items-center justify-center">
                    <motion.div
                      className="absolute w-8 h-8 rounded-full border border-weld/30"
                      animate={{ scale: [1, 1.4, 1], opacity: [0, 0.4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    />
                    <span className="font-mono text-weld text-sm relative z-10">{p.n}</span>
                  </div>

                  <h3 className="font-display uppercase text-2xl text-steel-light sm:w-72 shrink-0 group-hover:text-weld transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-steel text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STATS STRIP
      ═══════════════════════════════════════════════════ */}
      <Reveal y={20} duration={0.8}>
      <section className="py-20 bp-grid-fine border-y border-panel-line overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-panel-line border border-panel-line">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-graphite text-center lg:text-left p-10 group hover:bg-panel transition-colors relative overflow-hidden"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              {/* corner bracket on hover */}
              <motion.div
                className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-weld"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.4 }}
              />
              <p className="font-display font-extrabold text-4xl lg:text-5xl text-weld">{s.value}</p>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-steel mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
      </Reveal>

      {/* ═══════════════════════════════════════════════════
          FINAL CTA BANNER
      ═══════════════════════════════════════════════════ */}
      <Reveal y={24} duration={0.9} delay={0.05}>
      <section className="py-28 lg:py-36 relative overflow-hidden">
        {/* weld glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,90,31,0.07),transparent_60%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0}>
              <CoordinateTicker className="justify-center mb-6" />
            </motion.div>

            <motion.h2
              variants={fadeUp} custom={1}
              className="font-display font-extrabold uppercase text-4xl sm:text-5xl lg:text-6xl text-steel-light leading-tight"
            >
              Have a spec?{' '}
              <span className="text-weld">Let's cut it.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp} custom={2}
              className="mt-5 text-steel text-base max-w-xl mx-auto leading-relaxed"
            >
              Send us a drawing and we'll send back a quote — typically within 24 hours.
            </motion.p>

            <motion.div
              variants={fadeUp} custom={3}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <NavLink
                to="/contact"
                className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-8 py-4 hover:bg-signal transition-colors"
              >
                Start a Project <ArrowUpRight size={18} />
              </NavLink>
              <NavLink
                to="/projects"
                className="inline-flex items-center gap-2 font-display uppercase tracking-wide text-steel-light border-b border-steel pb-1 hover:text-weld hover:border-weld transition-colors"
              >
                Browse Projects
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </section>
      </Reveal>

    </motion.main>
  )
}
