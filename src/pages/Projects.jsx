import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Layers, Home, Truck, ShieldCheck, Factory, ArrowUpRight } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'
import VideoHero from '../components/VideoHero'

const projects = [
  {
    title: 'Industrial Fabrication',
    location: 'UAE',
    scope: 'Portal frames, columns and steel decks',
    icon: Factory,
    image: '/assets/slides/slide-1.webp',
  },
  {
    title: 'Oil & Gas Structure',
    location: 'Oman',
    scope: 'Pipe racks, access platforms and bracing systems',
    icon: Home,
    image: '/assets/slides/slide-2.webp',
  },
  {
    title: 'Logistics Hub',
    location: 'Qatar',
    scope: 'Warehouse steelwork and loading canopies',
    icon: Truck,
    image: '/assets/slides/slide-3.webp',
  },
  {
    title: 'Compliance Works',
    location: 'Saudi Arabia',
    scope: 'Inspection-ready welded assemblies and stair packs',
    icon: ShieldCheck,
  },
  {
    title: 'Architectural Steel',
    location: 'Bahrain',
    scope: 'Custom balustrades, facades and structural trusses',
    icon: Layers,
  },
  {
    title: 'Heavy Erection',
    location: 'UAE',
    scope: 'Pre-assembled modules and site erection support',
    icon: Truck,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: 'easeOut' },
  }),
}

export default function Projects() {
  const [active, setActive] = useState(null)
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <VideoHero videoSrc="/assets/about-hero.mp4">
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <SectionLabel index="PROJECTS">Project Gallery</SectionLabel>
        </motion.div>
        <motion.h1
          initial="hidden" animate="visible" custom={1} variants={fadeUp}
          className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-8xl leading-[0.9] text-steel-light drop-shadow-lg mt-2"
        >
          Delivered steel work
          <br /><span className="text-weld">with clarity and control.</span>
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
          A curated selection of our recent fabrication and erection projects across the Gulf,
          with emphasis on structural quality and execution speed.
        </motion.p>
        <motion.div initial="hidden" animate="visible" custom={3} variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-7 py-4 hover:bg-signal transition-colors"
          >
            Start a Project <ArrowUpRight size={18} />
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
        <Cutline label="Fig. 01 — Project Gallery" />
      </div>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid gap-6 lg:grid-cols-3">
          {projects.map((project, i) => {
            const Icon = project.icon
            return (
              <motion.div key={project.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} custom={i} variants={fadeUp}
                className="group overflow-hidden rounded-3xl border border-panel-line bg-graphite shadow-lg shadow-black/20"
              >
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.24),rgba(0,0,0,0.45)),url('${project.image}')` }} />
                <div className="p-7">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="text-sm uppercase tracking-[0.3em] text-steel">{project.location}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-weld text-graphite">
                      <Icon size={20} />
                    </span>
                  </div>
                  <h3 className="font-display text-2xl uppercase text-steel-light mb-3 group-hover:text-weld transition-colors">{project.title}</h3>
                  <p className="text-steel text-sm leading-relaxed mb-6">{project.scope}</p>
                  <button onClick={() => setActive(project)} className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.2em] text-weld text-sm">
                    View Details
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* modal for project preview */}
        {active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
            <div className="max-w-4xl w-full bg-graphite rounded-2xl overflow-hidden">
              <div className="h-72 bg-cover bg-center" style={{ backgroundImage: `url('${active.image}')` }} />
              <div className="p-6">
                <h3 className="font-display text-2xl text-steel-light">{active.title}</h3>
                <p className="text-steel mt-2">{active.scope}</p>
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setActive(null)} className="px-4 py-2 bg-weld text-graphite rounded">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="py-24 lg:py-32 bg-graphite-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="font-display font-extrabold uppercase text-4xl sm:text-5xl text-steel-light"
          >
            See your next project move from drawing to delivery.
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="mt-10">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-8 py-4 hover:bg-signal transition-colors"
            >
              Talk to Sales
            </NavLink>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
