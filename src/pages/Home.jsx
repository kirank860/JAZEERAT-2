import { useState, useRef, useEffect } from 'react'
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
import CinematicIntro from '../components/CinematicIntro'
import Reveal from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import MaskReveal from '../components/MaskReveal'

/* ─── data ───────────────────────────────────────────────── */

import { supabase } from '../lib/supabase'

const process = [
  { n: '01', title: 'Engineering & Draft', desc: 'Every millimeter calculated. We translate architectural vision into executable shop drawings with zero ambiguity.' },
  { n: '02', title: 'Precision Cutting', desc: 'Sub-millimeter accuracy at production scale using advanced CNC plasma and laser systems.' },
  { n: '03', title: 'Fabrication & Welding', desc: 'Code-compliant assembly by certified welders, with exhaustive quality control at every critical joint.' },
  { n: '04', title: 'Surface Treatment', desc: 'Industrial-grade surface preparation, blasting, and protective coatings engineered for harsh MENA climates.' },
  { n: '05', title: 'Site Deployment', desc: 'Seamless heavy logistics, site coordination, and structural erection delivered on spec, on time.' },
]

const stats = [
  { value: '5+', label: 'Years Of Precision' },
  { value: '450+', label: 'Structures Delivered' },
  { value: '±0.5mm', label: 'Tolerance Standard' },
  { value: 'MENA', label: 'Deployment Range' },
]

/* ─── animation variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const fadeRight = {
  hidden: { opacity: 0, x: -32 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const fadeLeft = {
  hidden: { opacity: 0, x: 32 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const fadeDown = {
  hidden: { opacity: 0, y: -32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const cardPop = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15, delay: i * 0.1 }
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/* ─── Project Card ───────────────────────────────────────── */
function ProjectCard({ proj, i, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  const isActive = active === i

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group overflow-hidden border border-panel-line bg-graphite cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isActive ? 'md:col-span-3 min-h-[500px]' : 'md:col-span-1 min-h-[300px] md:min-h-[500px]'}`}
    >
      {/* image container */}
      <div className={`relative overflow-hidden transition-all duration-700 h-full absolute inset-0 z-0`}>
        <motion.img
          src={proj.image}
          alt={proj.title}
          className={`w-full object-cover transition-all duration-1000 h-full absolute inset-0`}
          animate={{ scale: hovered && !isActive ? 1.08 : 1 }}
        />
        {/* image overlay gradient */}
        <div className={`absolute inset-0 transition-all duration-700 ${isActive ? 'bg-gradient-to-t from-graphite via-graphite/40 to-graphite/10' : 'bg-gradient-to-t from-graphite via-graphite/60 to-graphite/30'}`} />

        {/* tag */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`font-mono text-[10px] uppercase tracking-[0.25em] border border-panel-line px-2 py-1 backdrop-blur-sm transition-colors ${isActive ? 'bg-white/10 text-white' : 'bg-graphite-light/80 text-steel-light'}`}>
            {proj.tag}
          </span>
        </div>

        {/* location badge */}
        <div className={`absolute top-4 right-4 z-20 flex items-center gap-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
          <MapPin size={11} className={isActive ? 'text-white' : 'text-steel/80'} />
          <span className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-steel/80'}`}>{proj.location}</span>
        </div>
      </div>

      {/* text content */}
      <div className={`p-6 transition-all duration-700 relative z-10 flex flex-col justify-end h-full absolute bottom-0 left-0 right-0 ${isActive ? 'lg:p-12' : 'p-6'}`}>
        <div className={`${isActive ? 'max-w-2xl' : ''}`}>
          <h3 className={`font-display uppercase mb-2 group-hover:text-white transition-all duration-500 ${isActive ? 'text-4xl md:text-5xl text-white' : 'text-2xl text-white md:-rotate-90 md:origin-bottom-left md:absolute md:bottom-8 md:left-10 md:whitespace-nowrap'}`}>
            {proj.title}
          </h3>

          <div className={`overflow-hidden transition-all duration-700 ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className={`leading-relaxed text-white/80 text-lg md:text-xl`}>{proj.scope}</p>

            {/* animated CTA row */}
            <NavLink
              to="/projects"
              className={`mt-5 flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors text-white hover:text-white/80 w-fit`}
            >
              <span>View Project</span>
              <motion.div animate={{ x: hovered ? 3 : 0 }}>
                <ExternalLink size={13} />
              </motion.div>
            </NavLink>
          </div>
        </div>
      </div>

      {/* active state indicator line */}
      <div className={`absolute bottom-0 left-0 h-[3px] bg-white transition-all duration-700 z-20 ${isActive ? 'w-full' : 'w-0 group-hover:w-full bg-steel-light'}`} />
    </motion.div>
  )
}

/* ─── Main Page ──────────────────────────────────────────── */
const LOCAL_PROJECTS = [
  {
    title: 'Industrial Fabrication',
    location: 'Sharjah, UAE',
    scope: 'Portal frames, columns and steel decks',
    tag: 'Fabrication',
    image: '/assets/assetsJazeerat/mild-steel-fabrication-works.jpeg'
  },
  {
    title: 'Heavy Erection & Lift',
    location: 'Kuwait',
    scope: 'Column splicing and crane rigging',
    tag: 'Erection',
    image: '/assets/project-crane-hoist.jpg'
  },
  {
    title: 'Sobha One Facades',
    location: 'Dubai, UAE',
    scope: 'Architectural facade steel and balcony structures',
    tag: 'Architectural',
    image: '/assets/assetsJazeerat/sobha-one-element-tower-dubai.jpg'
  }
]

/* ─── Main Page ──────────────────────────────────────────── */
export default function Home() {
  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [activeProject, setActiveProject] = useState(0)
  const [slides, setSlides] = useState(null) // null means it will use the fallback in SlidingHero initially

  useEffect(() => {
    async function loadData() {
      // Load projects
      try {
        const { data: projData, error: projError } = await supabase.from('projects').select('*').order('created_at', { ascending: true }).limit(3)
        if (!projError && projData && projData.length > 0) {
          setProjects(projData.map((p, idx) => {
            return {
              ...p,
              image: p.image_url,
              tag: idx === 0 ? 'Fabrication' : idx === 1 ? 'Erection' : 'Architectural'
            }
          }))
        } else {
          setProjects([])
        }

        // Fetch dynamic hero slides
        const { data: heroData, error: heroError } = await supabase.from('hero_assets').select('*')
        if (!heroError && heroData) {
          // Find rows meant for the slider by excluding known page heroes
          const excludedKeys = ['about', 'services', 'facilities', 'projects', 'contact']
          const sliderRows = heroData.filter(h => {
            if (h.page_key && excludedKeys.includes(h.page_key.toLowerCase())) return false
            if (h.title && h.title.includes('Request a Quote')) return false
            if (h.title && h.title.includes('About Jazeerat')) return false
            if (h.title && h.title.includes('Project Gallery')) return false
            if (h.title && h.title.includes('Our Facilities')) return false
            if (h.title && h.title.includes('Our Services')) return false
            return true
          })

          if (sliderRows.length > 0) {
            sliderRows.sort((a, b) => (a.page_key || '').localeCompare(b.page_key || ''))
            setSlides(sliderRows.map(h => ({
              src: h.asset_url,
              type: h.asset_type,
              caption: h.title && h.title !== 'EMPTY' ? h.title : '',
              sub: h.subtitle || '',
              tag: h.tag || ''
            })))
          }
        }
      } catch (err) {
        setProjects(LOCAL_PROJECTS)
      }
      setLoadingProjects(false)


    }
    loadData()
  }, [])

  const containerRef = useRef(null)
  const processRef = useRef(null)
  const servicesRef = useRef(null)
  const projectsRef = useRef(null)
  const projectsWrapperRef = useRef(null)
  const processWrapperRef = useRef(null)

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
      <SlidingHero slides={slides} />

      {/* ── CINEMATIC APPLE-STYLE INTRO */}
      <CinematicIntro />

      {/* ── STICKY SECTION STACK WRAPPER */}
      <div className="relative">

        {/* ═══════════════════════════════════════════════════
            SERVICES SECTION (What We Do)
        ═══════════════════════════════════════════════════ */}
        <div ref={servicesRef} className="relative z-0 bg-graphite w-full py-16">
          <WhatWeDoSection />
        </div>

        {/* ═══════════════════════════════════════════════════
            PROJECT GALLERY PREVIEW
        ═══════════════════════════════════════════════════ */}
        <div ref={projectsWrapperRef} className="relative z-10 bg-graphite-light shadow-[0_-30px_60px_rgba(0,0,0,0.5)] w-full py-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-40px' }} variants={fadeRight}>
            <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16">
              <Cutline label="Fig. 02 — Project Gallery" />
            </div>
          </motion.div>

          <section ref={projectsRef} className="py-24 lg:py-32 relative overflow-hidden">
            {/* ambient dot pattern */}
            <div className="absolute inset-0 bp-grid-fine opacity-40 pointer-events-none" />

            {/* floating ambient glow */}
            <motion.div
              style={{ y: glowY2 }}
              className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-white/5 blur-3xl rounded-full pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              {/* header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: false }}
                  variants={stagger}
                >
                  <motion.div variants={fadeRight} custom={0}>
                    <SectionLabel index="§ 02">Recent Projects</SectionLabel>
                  </motion.div>
                  <MaskReveal delay={0.1}>
                    <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl text-steel-light max-w-lg mt-2">
                      Delivered with{' '}
                      <span className="text-white">precision.</span>
                    </h2>
                  </MaskReveal>
                  <motion.p
                    variants={fadeRight} custom={2}
                    className="mt-3 text-steel text-sm max-w-md leading-relaxed"
                  >
                    A selection of recent fabrication and erection projects across the Gulf.
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <NavLink
                    to="/projects"
                    className="inline-flex items-center gap-3 border border-panel-line text-steel-light px-6 py-3 font-display uppercase tracking-wide text-sm hover:bg-white hover:text-graphite hover:border-white transition-all duration-300"
                  >
                    Full Gallery <ArrowRight size={16} />
                  </NavLink>
                </motion.div>
              </div>

              {/* project cards horizontal accordion */}
              <div className="grid md:grid-cols-5 gap-2 lg:gap-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {loadingProjects ? (
                  <div className="md:col-span-5 flex items-center justify-center py-20 font-mono text-steel uppercase tracking-widest text-sm">
                    Loading Projects...
                  </div>
                ) : projects.slice(0, 3).map((proj, i) => (
                  <ProjectCard
                    key={proj.title}
                    proj={proj}
                    i={i}
                    active={activeProject}
                    onClick={() => setActiveProject(i)}
                  />
                ))}
              </div>

              {/* full-width "View All Projects" teaser banner */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-10 relative overflow-hidden group"
              >
                <NavLink to="/projects" className="block">
                  <div className="relative border border-panel-line bg-graphite flex items-center justify-between px-8 py-6 overflow-hidden">
                    {/* animated fill on hover */}
                    <motion.div
                      className="absolute inset-0 bg-white origin-left"
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
                    <div className="relative z-10 flex items-center gap-2 font-display uppercase text-sm font-semibold text-steel-light group-hover:text-graphite transition-colors duration-300">
                      View All <ArrowUpRight size={16} />
                    </div>
                  </div>
                </NavLink>
              </motion.div>
            </div>
          </section>
        </div>

        {/* ═══════════════════════════════════════════════════
            PROCESS TIMELINE
        ═══════════════════════════════════════════════════ */}
        <div ref={processWrapperRef} className="relative z-20 bg-graphite shadow-[0_-30px_60px_rgba(0,0,0,0.5)]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-40px' }} variants={fadeRight}>
            <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16">
              <Cutline label="Fig. 03 — Process" />
            </div>
          </motion.div>

          <section ref={processRef} className="py-24 lg:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-80px' }}
                custom={0} variants={fadeLeft}
              >
                <SectionLabel index="§ 03">From Drawing to Delivery</SectionLabel>
                <MaskReveal delay={0.1}>
                  <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl text-steel-light max-w-xl mt-2">
                    A fabrication line,{' '}
                    <span className="text-white">not a black box.</span>
                  </h2>
                </MaskReveal>
              </motion.div>

              <div className="relative mt-20">
                {process.map((p, i) => (
                  <motion.div
                    key={p.n}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: '-40px' }}
                    custom={i}
                    variants={fadeUp}
                    className="sticky top-32 flex flex-col sm:flex-row gap-6 sm:gap-12 bg-graphite border border-panel-line p-8 lg:p-12 shadow-2xl mb-8 group"
                    style={{ zIndex: i }}
                  >
                    {/* subtle top reflection line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {/* massive background number */}
                    <div className="absolute -top-4 -right-4 font-display font-extrabold text-[120px] lg:text-[180px] leading-none text-white/[0.02] pointer-events-none group-hover:text-white/[0.04] transition-colors duration-500">
                      {p.n}
                    </div>

                    <div className="relative z-10 shrink-0">
                      <span className="font-mono text-white/50 text-sm tracking-widest uppercase border border-white/10 px-3 py-1 bg-white/5">Step {p.n}</span>
                    </div>

                    <div className="relative z-10 flex-1">
                      <h3 className="font-display uppercase text-3xl lg:text-4xl text-steel-light mb-4 group-hover:text-white transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-steel text-lg leading-relaxed max-w-2xl">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          STATS STRIP (Redesigned)
      ═══════════════════════════════════════════════════ */}
      <Reveal y={20} duration={0.8}>
        <section className="py-24 lg:py-40 relative overflow-hidden bg-graphite border-y border-panel-line">
          {/* Ambient background noise */}
          <div className="absolute inset-0 bp-grid-fine opacity-20 pointer-events-none" />

          {/* Massive Background Typography Watermark */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <span className="font-display font-extrabold text-[150px] md:text-[250px] lg:text-[400px] leading-none text-white/[0.02] uppercase whitespace-nowrap tracking-tighter mix-blend-screen">
              Scale
            </span>
          </motion.div>

          {/* Floating Glassmorphic Cards */}
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-40px' }}
                custom={i}
                variants={fadeUp}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 lg:p-8 text-center lg:text-left group hover:bg-white/10 transition-colors shadow-2xl flex flex-col justify-center"
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              >
                {/* sleek micro-accent line */}
                <div className="w-12 h-[2px] bg-white/30 mb-8 group-hover:bg-white group-hover:w-20 transition-all duration-300" />

                <p className="font-display font-extrabold text-4xl lg:text-5xl xl:text-6xl text-white mb-2 tracking-tighter break-words">
                  {s.value}
                </p>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 group-hover:text-white/80 transition-colors">
                  {s.label}
                </p>
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,47,34,0.07),transparent_60%)] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: false }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeDown} custom={1}
                className="font-display font-extrabold uppercase text-4xl sm:text-5xl lg:text-6xl text-steel-light leading-tight"
              >
                Have a spec?{' '}
                <span className="text-white">Let's cut it.</span>
              </motion.h2>

              <motion.p
                variants={fadeDown} custom={2}
                className="mt-5 text-steel text-base max-w-xl mx-auto leading-relaxed"
              >
                Send us a drawing and we'll send back a quote — typically within 24 hours.
              </motion.p>

              <motion.div
                variants={fadeDown} custom={3}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Magnetic>
                  <NavLink
                    to="/contact"
                    className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-white text-graphite px-8 py-4 hover:bg-steel-light transition-colors"
                  >
                    Start a Project <ArrowUpRight size={18} />
                  </NavLink>
                </Magnetic>
                <NavLink
                  to="/projects"
                  className="inline-flex items-center gap-2 font-display uppercase tracking-wide text-steel-light border-b border-steel pb-1 hover:text-white hover:border-white transition-colors"
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
