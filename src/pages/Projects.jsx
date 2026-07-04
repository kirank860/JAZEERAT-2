import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { Layers, Home, Truck, ShieldCheck, Factory, ArrowUpRight, X, ArrowLeft, ArrowRight } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'
import SEO from '../components/SEO'
import VideoHero from '../components/VideoHero'

import { supabase } from '../lib/supabase'

const iconMap = {
  Factory, Home, Truck, ShieldCheck, Layers
}
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: 'easeOut' },
  }),
}

function ProjectModal({ project, index, total, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const Icon = project.icon

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-graphite/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-5xl bg-graphite-light border border-panel-line overflow-hidden flex flex-col md:flex-row h-[80vh] md:h-[600px]"
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT — Image */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-graphite overflow-hidden shrink-0">
          <motion.img
            key={project.title}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-graphite-light/90" />
          
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button
              onClick={onPrev}
              className="w-10 h-10 border border-panel-line bg-graphite/80 flex items-center justify-center text-steel hover:text-weld hover:border-weld/40 transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={onNext}
              className="w-10 h-10 border border-panel-line bg-graphite/80 flex items-center justify-center text-steel hover:text-weld hover:border-weld/40 transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          </div>
          <span className="absolute bottom-6 right-6 font-mono text-[10px] text-steel-light tracking-widest bg-graphite/60 px-2 py-1 rounded backdrop-blur-sm border border-panel-line">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* RIGHT — Details */}
        <div className="relative w-full md:w-1/2 p-6 md:p-10 flex flex-col h-1/2 md:h-full overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 border border-panel-line flex items-center justify-center text-steel hover:text-weld hover:border-weld/40 transition-colors bg-graphite z-20"
          >
            <X size={16} />
          </button>

          <motion.div
            key={project.title + '-text'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="my-auto"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-weld/10 text-weld border border-weld/20">
                <Icon size={14} />
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-weld uppercase">
                {project.location}
              </span>
            </div>

            <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl text-steel-light leading-tight mb-4">
              {project.title}
            </h2>

            <div className="h-[2px] bg-weld mb-6 w-12" />

            <h3 className="font-mono text-xs uppercase tracking-widest text-steel-light mb-2">Scope of Work</h3>
            <p className="text-steel text-sm leading-relaxed mb-6 border-l-2 border-panel-line pl-4">
              {project.scope}
            </p>

            <h3 className="font-mono text-xs uppercase tracking-widest text-steel-light mb-2">Project Overview</h3>
            <p className="text-steel text-sm leading-relaxed">
              {project.desc}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    async function loadProjects() {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: true })
      if (!error && data) {
        setProjects(data.map(p => ({
          ...p,
          icon: iconMap[p.icon] || Layers,
          image: p.image_url,
          desc: p.description
        })))
      }
      setLoading(false)
    }
    loadProjects()
  }, [])

  const openModal = useCallback((i) => setActiveIndex(i), [])
  const closeModal = useCallback(() => setActiveIndex(null), [])
  const nextProject = useCallback(() => setActiveIndex((i) => (i + 1) % projects.length), [projects.length])
  const prevProject = useCallback(() => setActiveIndex((i) => (i - 1 + projects.length) % projects.length), [projects.length])

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO
        title="Steel Fabrication Projects | GCC Region"
        description="Browse Jazeerat Al Hadeed's steel fabrication project gallery: industrial structures, oil & gas platforms, logistics hubs and architectural steelwork delivered across UAE, Oman, Qatar and Saudi Arabia."
        path="/projects"
        image="https://jazeerat-2.vercel.app/assets/slides/slide-2.webp"
      />
      <VideoHero
        videoSrc="/assets/about-hero.mp4"
        poster="/assets/slides/slide-3.webp"
        showSparks={false}
        className="pt-40 pb-20 lg:pt-48 lg:pb-28"
      >
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
          <SectionLabel index="PROJECTS">Project Gallery</SectionLabel>
          <motion.h1 initial="hidden" animate="visible" custom={0} variants={fadeUp}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-steel-light"
          >
            Delivered steel work with clarity and control.
          </motion.h1>
          <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="mt-8 max-w-2xl text-steel text-base leading-relaxed"
          >
            Browse a curated selection of our recent fabrication and erection projects across the Gulf, with emphasis on structural quality and execution speed.
          </motion.p>
        </div>
      </VideoHero>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Fig. 01 — Project Gallery" />
      </div>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid gap-6 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-1 lg:col-span-3 py-20 text-center font-mono text-steel uppercase tracking-widest text-sm">
              Loading Projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-1 lg:col-span-3 py-20 text-center font-mono text-steel uppercase tracking-widest text-sm">
              No projects found.
            </div>
          ) : projects.map((project, i) => {
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
                  <button onClick={() => openModal(i)} className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.2em] text-weld text-sm">
                    View Details
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* modal for project preview */}
        <AnimatePresence>
          {activeIndex !== null && (
            <ProjectModal
              project={projects[activeIndex]}
              index={activeIndex}
              total={projects.length}
              onClose={closeModal}
              onPrev={prevProject}
              onNext={nextProject}
            />
          )}
        </AnimatePresence>
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
