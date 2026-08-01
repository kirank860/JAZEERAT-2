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
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group overflow-hidden cursor-pointer bg-graphite border border-panel-line transition-all duration-500 hover:border-white/30 ${svc.spanClass || ''}`}
    >
      {/* Liquid Glass Background Reveal */}
      {svc.image && (
        <div className="absolute inset-0 z-0">
          <img src={svc.image} alt={svc.title} className="w-full h-full object-cover opacity-20 group-hover:opacity-70 transition-transform duration-[1.5s] ease-out group-hover:scale-110 blur-[4px] group-hover:blur-none" />
          <div className="absolute inset-0 bg-graphite/80 backdrop-blur-md group-hover:backdrop-blur-none transition-all duration-[1s]" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/40 to-transparent" />
        </div>
      )}

      {/* Default hover glow if no image */}
      {!svc.image && (
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.05),transparent_70%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.7 }}
        />
      )}

      <motion.div 
        className="relative z-10 p-8 lg:p-10 flex flex-col h-full min-h-[340px]"
        animate={{ padding: hovered ? '2.5rem' : '2rem' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Top Header Row */}
        <div className="flex items-start justify-between mb-12">
          <motion.div
            className="text-steel-light bg-white/5 p-3 relative border border-white/5 group-hover:text-white group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-500"
          >
            <Icon size={24} strokeWidth={1} />
          </motion.div>
          <span className="font-display text-[10px] text-steel/30 tracking-[0.4em] uppercase group-hover:text-white/60 transition-colors duration-500">Step {svc.num}</span>
        </div>

        <div className="mt-auto">
          <h3 className="font-display uppercase text-2xl lg:text-3xl font-bold text-steel-light mb-4 group-hover:text-white transition-colors duration-300">
            {svc.title}
          </h3>
          <p className="text-steel/80 text-sm leading-relaxed mb-8 max-w-sm font-serif italic">
            {svc.short}
          </p>

          {/* Hairline Divider & Spec */}
          <div className="pt-5 border-t border-panel-line flex items-center justify-between group-hover:border-white/20 transition-colors duration-500">
            <span className="font-mono text-[10px] text-steel/60 uppercase tracking-widest">{svc.spec}</span>
            <motion.div
              animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight size={14} className="text-white" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function WhatWeDoSection() {
  return (
    <div className="min-h-screen bg-graphite flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-8 lg:py-16">
        {/* Header Row */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, margin: '-40px' }} variants={stagger} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div variants={fadeRight} className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-2 h-2 bg-weld rounded-full animate-pulse" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-weld">01 — What We Do</span>
            </div>
            <MaskReveal delay={0.1}>
              <h2 className="font-display font-extrabold uppercase text-4xl sm:text-5xl md:text-7xl text-white mt-4 md:mt-6 leading-[1] md:leading-[0.9]">
                Precision at <br className="md:hidden" /><span className="text-white">Scale.</span>
              </h2>
            </MaskReveal>
          </motion.div>
          <motion.div variants={fadeLeft}>
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
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: '-40px' }} 
          variants={stagger} 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
        >
          {servicesData.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} i={i} />
          ))}
        </motion.div>

        {/* Bottom CTA bar matching screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-between border border-panel-line bg-graphite-light p-6 md:p-8"
        >
          <p className="text-steel text-xs md:text-sm font-serif italic border-l-2 border-white pl-4 mb-6 md:mb-0 max-w-sm">
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
