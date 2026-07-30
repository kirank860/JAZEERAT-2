import { useState } from 'react'
import { motion } from 'framer-motion'
import { PenTool, Flame, Factory, Wrench, ShieldCheck, Truck, ArrowRight, ArrowUpRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const servicesData = [
  {
    icon: PenTool,
    num: '01',
    title: 'Design & Detailing',
    short: 'Shop drawings and structural detailing prepared before a single plate is cut.',
    spec: 'Tolerance ±0.5mm',
  },
  {
    icon: Flame,
    num: '02',
    title: 'CNC Plasma & Laser',
    short: 'High-accuracy plate cutting for structural and architectural steel at production scale.',
    spec: 'Plate up to 50mm',
  },
  {
    icon: Factory,
    num: '03',
    title: 'Structural Fabrication',
    short: 'Portal frames, trusses and columns pre-assembled for site-ready installation.',
    spec: 'Spans up to 30,000mm',
  },
  {
    icon: Wrench,
    num: '04',
    title: 'Machine Workshop',
    short: 'CNC machining, drilling and boring for precision components and mechanical parts.',
    spec: 'Full workshop, one roof',
  },
  {
    icon: ShieldCheck,
    num: '05',
    title: 'Welding & QC',
    short: 'Certified welders working to code — every joint logged against our QC record.',
    spec: 'Certified welders on shift',
  },
  {
    icon: Truck,
    num: '06',
    title: 'Delivery & Install',
    short: 'Coordinated transport and on-site installation support across the MENA region.',
    spec: 'Site-coordinated logistics',
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
      viewport={{ once: false, margin: '-40px' }}
      custom={i}
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group border-b border-r border-panel-line bg-graphite overflow-hidden cursor-pointer"
    >
      {/* active state subtle background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-weld/5 to-transparent"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      <div className="relative p-10 md:p-12 flex flex-col h-full min-h-[360px]">
        {/* number + icon row */}
        <div className="flex items-start justify-between mb-8">
          <motion.div
            className="text-weld border border-weld/30 p-4 relative"
            animate={{ rotate: hovered ? 12 : 0, scale: hovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* pulse dot behind icon on hover */}
            <motion.div 
              className="absolute -bottom-1 -right-1 w-2 h-2 bg-weld rounded-full shadow-[0_0_10px_rgba(214,47,34,0.8)]"
              initial={{ scale: 0 }}
              animate={{ scale: hovered ? 1 : 0 }}
              transition={{ delay: 0.1 }}
            />
            <Icon size={28} strokeWidth={1.5} />
          </motion.div>
          <span className="font-mono text-xs text-steel/60 tracking-widest">{svc.num}</span>
        </div>

        <h3 className="font-display uppercase text-2xl text-white mb-4 group-hover:text-weld transition-colors duration-300">
          {svc.title}
        </h3>
        <p className="text-steel text-base leading-relaxed flex-1">{svc.short}</p>

        {/* spec tag */}
        <div className="mt-8 pt-6 border-t border-panel-line flex items-center justify-between">
          <span className="font-mono text-xs text-steel/70 uppercase tracking-widest">{svc.spec}</span>
          <motion.div
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.25 }}
          >
            <ArrowRight size={16} className="text-weld" />
          </motion.div>
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

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-panel-line">
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
