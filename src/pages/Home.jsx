import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight, Factory, Wrench, Ruler, ShieldCheck } from 'lucide-react'
import SlidingHero from '../components/SlidingHero'
import Cutline from '../components/Cutline'
import SectionLabel from '../components/SectionLabel'
import WhatWeDoSection from '../components/WhatWeDoSection'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const capabilities = [
  { icon: Factory, title: 'Structural Steel', desc: 'Portal frames, trusses and heavy structural assemblies engineered to load.' },
  { icon: Wrench, title: 'Machine Workshop', desc: 'In-house CNC cutting, machining and precision finishing under one roof.' },
  { icon: Ruler, title: 'Custom Fabrication', desc: 'Bespoke steelwork built to client drawings and site-specific tolerances.' },
  { icon: ShieldCheck, title: 'QA & Compliance', desc: 'Every weld and cut logged against international fabrication standards.' },
]

const process = [
  { n: '01', title: 'Design & Detailing', desc: 'Shop drawings and detailing engineered against your structural spec.' },
  { n: '02', title: 'Cutting & Machining', desc: 'CNC plasma, laser and machining tolerance-checked at every pass.' },
  { n: '03', title: 'Welding & Assembly', desc: 'Certified welders assemble to code, inspected at each joint.' },
  { n: '04', title: 'Finishing & Coating', desc: 'Surface prep, galvanizing and coating for MENA climate durability.' },
  { n: '05', title: 'Delivery & Install', desc: 'Site-coordinated delivery and installation support across the region.' },
]

const stats = [
  { value: '18+', label: 'Years Fabricating' },
  { value: '450+', label: 'Projects Delivered' },
  { value: '±0.5mm', label: 'Tolerance Standard' },
  { value: 'MENA', label: 'Region Served' },
]

export default function Home() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 4 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* HERO — full-width sliding carousel */}
      <SlidingHero />

      <WhatWeDoSection />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 01 — Capabilities" />
      </div>

      {/* CAPABILITIES */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} custom={0} variants={fadeUp}>
            <SectionLabel index="§ 02">Our Capabilities</SectionLabel>
            <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl text-steel-light max-w-xl">
              One workshop, full fabrication capability.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-panel-line mt-14 border border-panel-line">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} custom={i} variants={fadeUp}
                className="bg-graphite p-8 hover:bg-panel transition-colors group"
              >
                <c.icon size={28} className="text-weld mb-6" strokeWidth={1.5} />
                <h3 className="font-display uppercase text-xl text-steel-light mb-2">{c.title}</h3>
                <p className="text-steel text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 02 — Process" />
      </div>

      {/* PROCESS */}
      <section className="py-24 lg:py-32 bg-graphite-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} custom={0} variants={fadeUp}>
            <SectionLabel index="§ 02">From Drawing to Delivery</SectionLabel>
            <h2 className="font-display font-bold uppercase text-4xl lg:text-5xl text-steel-light max-w-xl">
              A fabrication line, not a black box.
            </h2>
          </motion.div>

          <div className="mt-16 divide-y divide-panel-line border-t border-b border-panel-line">
            {process.map((p, i) => (
              <motion.div
                key={p.n}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} custom={i} variants={fadeUp}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-7 group"
              >
                <span className="font-mono text-weld text-sm w-10 shrink-0">{p.n}</span>
                <h3 className="font-display uppercase text-2xl text-steel-light w-full sm:w-72 shrink-0 group-hover:text-weld transition-colors">
                  {p.title}
                </h3>
                <p className="text-steel text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bp-grid-fine border-y border-panel-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
              className="text-center lg:text-left"
            >
              <p className="font-display font-extrabold text-4xl lg:text-5xl text-weld">{s.value}</p>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-steel mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 lg:py-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display font-extrabold uppercase text-4xl sm:text-5xl lg:text-6xl text-steel-light leading-tight"
          >
            Have a spec? <span className="text-weld">Let's cut it.</span>
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="mt-10">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-8 py-4 hover:bg-signal transition-colors"
            >
              Start a Project
              <ArrowUpRight size={18} />
            </NavLink>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
