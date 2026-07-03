import { motion } from 'framer-motion'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Factory, Wrench, Ruler, ShieldCheck, Flame, Boxes, Truck, PenTool, ArrowUpRight,
} from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'
import SEO from '../components/SEO'
import VideoHero from '../components/VideoHero'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: 'easeOut' },
  }),
}

const services = [
  {
    icon: PenTool,
    title: 'Design & Detailing',
    desc: 'Shop drawings, structural detailing and material takeoffs prepared in-house before a single plate is cut.',
    category: 'design',
    spec: 'Detailing tolerance ±0.5mm',
  },
  {
    icon: Flame,
    title: 'CNC Plasma & Laser Cutting',
    desc: 'High-accuracy plate cutting for structural and architectural steel components at production scale.',
    category: 'cutting',
    spec: 'Plate thickness up to 50mm',
  },
  {
    icon: Factory,
    title: 'Structural Steel Fabrication',
    desc: 'Portal frames, trusses, columns and beams fabricated and pre-assembled for site-ready installation.',
    spec: 'Spans up to 30,000mm',
  },
  {
    icon: Wrench,
    title: 'Machine Workshop',
    desc: 'In-house CNC machining, drilling and boring for precision components and custom mechanical parts.',
    category: 'machining',
    spec: 'Full workshop, one roof',
  },
  {
    icon: Boxes,
    title: 'Custom Fabrication',
    desc: 'Bespoke steelwork built directly to client specification — tanks, platforms, ducting and enclosures.',
    category: 'fabrication',
    spec: 'Built to client drawing',
  },
  {
    icon: ShieldCheck,
    title: 'Welding & QA',
    desc: 'Certified welders working to code, with every joint logged against our internal QA record.',
    spec: 'Certified welders on shift',
  },
  {
    icon: Ruler,
    title: 'Surface Finishing',
    desc: 'Shot blasting, priming, painting and galvanizing prepared for MENA climate and site conditions.',
    category: 'finishing',
    spec: 'Coating to spec or standard',
  },
  {
    icon: Truck,
    title: 'Delivery & Installation',
    desc: 'Coordinated transport and on-site installation support for contractors across the region.',
    category: 'logistics',
    spec: 'Site-coordinated logistics',
  },
]

export default function Services() {
  const [filter, setFilter] = useState('all')
  const categories = ['all', 'design', 'cutting', 'machining', 'fabrication', 'finishing', 'logistics']
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO
        title="Steel Fabrication Services | UAE & GCC"
        description="Comprehensive steel fabrication services: CNC plasma cutting, structural fabrication, machine workshop, welding & QA, surface finishing and delivery. One integrated workshop across the UAE."
        path="/services"
      />

      <VideoHero
        videoSrc="/assets/about-hero.mp4"
        poster="/assets/slides/slide-1.webp"
        showSparks={false}
        className="pt-40 pb-20 lg:pt-48 lg:pb-28"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <SectionLabel index="SERVICES">Capabilities</SectionLabel>
          </motion.div>
          <motion.h1
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-steel-light"
          >
            Every stage,
            <br /><span className="text-weld">one workshop.</span>
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="mt-6 text-lg text-steel max-w-2xl font-light leading-relaxed"
          >
            From raw structural steel to precision-machined components. 
            Jazeerat Al Hadeed provides a complete, in-house industrial fabrication cycle. 
            No outsourcing, no delays.
          </motion.p>
        </div>
      </VideoHero>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 01 — Service Index" />
      </div>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-sm px-3 py-2 rounded-full border ${filter === c ? 'bg-weld text-graphite border-weld' : 'border-panel-line text-steel'}`}
              >
                {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-panel-line border border-panel-line">
            {services.filter(s => filter === 'all' ? true : s.category === filter).map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} custom={i % 4} variants={fadeUp}
                className="bg-graphite p-10 hover:bg-panel transition-colors group"
              >
                <div className="flex items-start justify-between mb-6">
                  <s.icon size={30} className="text-weld" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] text-steel tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display uppercase text-2xl text-steel-light mb-3 group-hover:text-weld transition-colors">
                  {s.title}
                </h3>
                <p className="text-steel text-sm leading-relaxed mb-4">{s.desc}</p>
                <p className="font-mono text-[11px] text-steel/80 uppercase tracking-wide border-t border-panel-line pt-4">
                  {s.spec}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-graphite-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display font-extrabold uppercase text-4xl sm:text-5xl text-steel-light"
          >
            Send us a drawing. <span className="text-weld">We'll send back a quote.</span>
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="mt-10">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-8 py-4 hover:bg-signal transition-colors"
            >
              Get in Touch
              <ArrowUpRight size={18} />
            </NavLink>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
