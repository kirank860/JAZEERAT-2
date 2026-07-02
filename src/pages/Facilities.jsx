import { motion } from 'framer-motion'
import { Factory, Wrench, ShieldCheck, Truck, Boxes, Flame } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'
import { NavLink } from 'react-router-dom'
import VideoHero from '../components/VideoHero'

const facilities = [
  {
    icon: Factory,
    title: 'CNC Plasma Cutting',
    desc: 'High-capacity plate cutting for structural steel profiles and architectural components.',
    image: '/assets/slides/slide-1.webp',
  },
  {
    icon: Flame,
    title: 'CNC Laser & Fiber Cutting',
    desc: 'Fine-detail cutting for precision work, openings, and intricate fabrication pieces.',
    image: '/assets/slides/slide-2.webp',
  },
  {
    icon: Wrench,
    title: 'CNC Machine Workshop',
    desc: 'Drilling, boring, and machining with digital tolerance control in one facility.',
    image: '/assets/slides/slide-3.webp',
  },
  {
    icon: ShieldCheck,
    title: 'Welding Bays',
    desc: 'Dedicated welding stations with certified welders and multi-process capability.',
  },
  {
    icon: Boxes,
    title: 'Surface Finishing',
    desc: 'Shot blasting, priming, painting and protective coating optimised for MENA climates.',
  },
  {
    icon: Truck,
    title: 'Logistics & Storage',
    desc: 'Site-ready staging, secure storage and coordinated transport from the workshop.',
    image: '/assets/what-we-do.webp',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: 'easeOut' },
  }),
}

export default function Facilities() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <VideoHero videoSrc="/assets/">
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <SectionLabel index="FACILITIES">Our Facilities</SectionLabel>
        </motion.div>
        <motion.h1
          initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-8xl leading-[0.9] text-steel-light drop-shadow-lg mt-2"
        >
          Built for precision,
          <br /><span className="text-weld">capacity and speed.</span>
        </motion.h1>
        <motion.div
          className="mt-5 h-[3px] bg-weld origin-left shadow-[0_0_12px_rgba(255,90,31,0.7)]"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }}
          style={{ width: 120 }}
        />
        <motion.p
          initial="hidden" animate="visible" custom={2} variants={fadeUp}
          className="mt-8 max-w-xl text-steel-light/80 text-base leading-relaxed"
        >
          Our facility blends heavy fabrication with precision machining, coating and logistics
          so steel work is prepared, inspected and dispatched from one workshop.
        </motion.p>
        <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-7 py-4 hover:bg-signal transition-colors"
          >
            Request a Quote
          </NavLink>
          <NavLink
            to="/services"
            className="inline-flex items-center gap-2 font-display uppercase tracking-wide text-steel-light border-b border-steel pb-1 hover:text-weld hover:border-weld transition-colors"
          >
            Our Services
          </NavLink>
        </motion.div>
      </VideoHero>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 01 — Facility Highlights" />
      </div>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, i) => {
            const Icon = facility.icon
            return (
              <motion.div key={facility.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} custom={i} variants={fadeUp}
                className="rounded-3xl border border-panel-line bg-graphite p-8 hover:border-weld transition-colors"
              >
                <div className="mb-6 overflow-hidden rounded-xl">
                  <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url('${facility.image}')` }} />
                </div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-weld">Facility</p>
                    <h3 className="mt-3 font-display text-2xl uppercase text-steel-light">{facility.title}</h3>
                  </div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-weld text-graphite">
                    <Icon size={24} />
                  </span>
                </div>
                <p className="text-steel text-sm leading-relaxed">{facility.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-graphite-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display font-extrabold uppercase text-4xl sm:text-5xl text-steel-light"
          >
            Visit the workshop or request a facility tour.
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="mt-10">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-8 py-4 hover:bg-signal transition-colors"
            >
              Schedule a Tour
            </NavLink>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
