import { useState } from 'react'
import { motion } from 'framer-motion'
import { PenTool, Flame, Factory, Wrench, ShieldCheck, Truck, ArrowRight, ArrowUpRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const servicesData = [
  {
    icon: Factory,
    num: '01',
    title: 'Structural Fabrication',
    short: 'Portal frames, trusses and columns pre-assembled for site-ready installation.',
    spec: 'Spans up to 30,000mm',
    spanClass: 'md:col-span-2 md:row-span-2',
    image: '/assets/team-in-jah-uniform.jpg'
  },
  {
    icon: PenTool,
    num: '02',
    title: 'Design & Detailing',
    short: 'Shop drawings and structural detailing prepared before a single plate is cut.',
    spec: 'Tolerance ±0.5mm',
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Flame,
    num: '03',
    title: 'CNC Plasma & Laser',
    short: 'High-accuracy plate cutting for structural and architectural steel at production scale.',
    spec: 'Plate up to 50mm',
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Wrench,
    num: '04',
    title: 'Machine Workshop',
    short: 'CNC machining, drilling and boring for precision components and mechanical parts.',
    spec: 'Full workshop, one roof',
    spanClass: 'md:col-span-2 md:row-span-1',
  },
  {
    icon: ShieldCheck,
    num: '05',
    title: 'Welding & QC',
    short: 'Certified welders working to code — every joint logged against our QC record.',
    spec: 'Certified welders on shift',
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Truck,
    num: '06',
    title: 'Delivery & Install',
    short: 'Coordinated transport and on-site installation support across the MENA region.',
    spec: 'Site-coordinated logistics',
    spanClass: 'md:col-span-3 md:row-span-1',
    image: '/assets/project-crane-hoist.jpg'
  },
]

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

// Custom Mask Reveal for headers
function MaskReveal({ children, delay = 0 }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: false, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

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
      className={`relative group overflow-hidden cursor-pointer rounded-3xl bg-graphite-light border border-white/5 transition-colors hover:border-white/20 ${svc.spanClass || ''}`}
    >
      {/* Background Image if available */}
      {svc.image && (
        <div className="absolute inset-0 z-0">
          <img src={svc.image} alt={svc.title} className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-transform duration-700 ease-out group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite-light via-graphite-light/60 to-graphite-light/20" />
        </div>
      )}

      {/* Active state subtle background glow */}
      {!svc.image && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-weld/10 to-transparent"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />
      )}

      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full min-h-[320px]">
        {/* large watermark number */}
        <span className="absolute -bottom-4 right-4 text-[8rem] leading-none font-display font-bold text-white/[0.02] pointer-events-none select-none transition-all duration-500 group-hover:text-weld/[0.05] group-hover:-translate-y-2">
          {svc.num}
        </span>

        {/* number + icon row */}
        <div className="flex items-start justify-between mb-8">
          <motion.div
            className="text-weld bg-white/5 p-4 rounded-2xl relative border border-white/10 backdrop-blur-sm shadow-xl"
            animate={{ rotate: hovered ? 12 : 0, scale: hovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Icon size={28} strokeWidth={1.5} />
          </motion.div>
          <span className="font-mono text-xs text-steel/60 tracking-widest bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">{svc.num}</span>
        </div>

        <div className="mt-auto">
          <h3 className="font-display uppercase text-2xl lg:text-3xl text-white mb-3 group-hover:text-weld transition-colors duration-300">
            {svc.title}
          </h3>
          <p className="text-steel text-base leading-relaxed mb-6 max-w-sm">{svc.short}</p>

          {/* spec tag */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono text-xs text-steel/70 uppercase tracking-widest">{svc.spec}</span>
            <motion.div
              animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
              transition={{ duration: 0.25 }}
            >
              <ArrowRight size={16} className="text-weld" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function WhatWeDoSection() {
  return (
    <div className="min-h-screen bg-graphite flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-8 lg:py-16">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: false }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-4 mb-4">
              <span className="w-2 h-2 bg-weld rounded-full animate-pulse" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-weld">01 — What We Do</span>
            </motion.div>
            <MaskReveal delay={0.1}>
              <h2 className="font-display font-bold uppercase text-5xl lg:text-7xl text-white max-w-2xl mt-2 leading-[0.9]">
                Every stage, <br/>one workshop.
              </h2>
            </MaskReveal>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <NavLink
              to="/services"
              className="group inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 font-mono uppercase tracking-widest text-xs hover:border-weld hover:text-weld transition-all duration-300"
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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {servicesData.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} i={i} />
          ))}
        </div>

        {/* Bottom CTA bar matching screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-between border border-panel-line bg-graphite-light p-6 md:p-8"
        >
          <p className="text-steel text-sm font-serif italic border-l-2 border-white pl-4 mb-6 md:mb-0">
            From first drawing to final install — all under one roof.
          </p>
          <NavLink
            to="/services"
            className="inline-flex items-center gap-2 font-display uppercase tracking-wider font-semibold text-sm bg-white text-graphite px-8 py-4 hover:bg-graphite-light hover:text-white border border-transparent hover:border-white transition-colors"
          >
            Explore Capabilities <ArrowUpRight size={16} />
          </NavLink>
        </motion.div>

      </div>
    </div>
  )
}
