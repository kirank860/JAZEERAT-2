import { motion } from 'framer-motion'
import { Target, Eye, Handshake } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

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

export default function About() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      <section className="bp-grid pt-40 pb-20 lg:pt-48 lg:pb-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <SectionLabel index="ABOUT">Who We Are</SectionLabel>
          </motion.div>
          <motion.h1
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-steel-light"
          >
            Built on the shop floor,
            <br /><span className="text-weld">not the sales floor.</span>
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="mt-8 max-w-2xl text-steel text-base leading-relaxed"
          >
            Jazeerat Al Hadeed is an innovative, reliable and efficient steel fabrication
            solution provider with an integrated machine workshop, catering to the
            industrial construction and mechanical engineering industries across the
            MENA region. Our work is judged in millimeters, not marketing.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 01 — Values" />
      </div>

      {/* VALUES */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <SectionLabel index="§ 01">What Drives the Work</SectionLabel>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-px bg-panel-line mt-12 border border-panel-line">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                className="bg-graphite p-10 hover:bg-panel transition-colors"
              >
                <v.icon size={28} className="text-weld mb-6" strokeWidth={1.5} />
                <h3 className="font-display uppercase text-2xl text-steel-light mb-3">{v.title}</h3>
                <p className="text-steel text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 02 — Timeline" />
      </div>

      {/* TIMELINE */}
      <section className="py-24 lg:py-32 bg-graphite-light">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
            <SectionLabel index="§ 02">Milestones</SectionLabel>
          </motion.div>

          <div className="mt-12 relative pl-8 border-l border-panel-line">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} custom={i} variants={fadeUp}
                className="relative pb-12 last:pb-0"
              >
                <span className="absolute -left-[37px] top-1 w-3 h-3 rounded-full bg-weld shadow-[0_0_0_4px_rgba(19,21,25,1)]" />
                <span className="font-mono text-weld text-sm">{t.year}</span>
                <h3 className="font-display uppercase text-2xl text-steel-light mt-1 mb-2">{t.title}</h3>
                <p className="text-steel text-sm leading-relaxed max-w-md">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  )
}
