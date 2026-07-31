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

const projectFadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 1.2, delay: 5.0 + i * 0.2, ease: 'easeOut' },
  }),
}

function ProjectModal({ project, index, total, onClose, onPrev, onNext }) {
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    setImgIndex(0)
  }, [project.title])

  const Icon = project.icon
  const currentImg = project.gallery && project.gallery[imgIndex] ? project.gallery[imgIndex] : project.image

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
        className="relative z-10 w-full max-w-5xl bg-graphite-light border border-panel-line overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[600px]"
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT — Image & Gallery Controls */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full bg-graphite overflow-hidden shrink-0 flex flex-col justify-between">
          <div className="relative w-full h-full">
            <motion.img
              key={currentImg}
              src={currentImg}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/95 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-graphite-light/95" />
          </div>

          {/* Bottom Bar: Prev/Next, Thumbnails, Index */}
          <div className="absolute bottom-0 left-0 right-0 bg-graphite/90 backdrop-blur-md border-t border-panel-line p-3 flex items-center justify-between z-20">
            <div className="flex gap-2">
              <button
                onClick={onPrev}
                className="w-8 h-8 border border-panel-line bg-graphite/90 flex items-center justify-center text-steel hover:text-white hover:border-white/40 transition-colors"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={onNext}
                className="w-8 h-8 border border-panel-line bg-graphite/90 flex items-center justify-center text-steel hover:text-white hover:border-white/40 transition-colors"
              >
                <ArrowRight size={14} />
              </button>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className="flex gap-1.5">
                {project.gallery.map((img, idx) => (
                  <button
                    key={img + idx}
                    onClick={() => setImgIndex(idx)}
                    className={`w-12 h-8 border transition-all overflow-hidden ${idx === imgIndex ? 'border-weld scale-105 opacity-100' : 'border-panel-line opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <span className="font-mono text-[9px] text-steel-light tracking-widest bg-graphite px-2.5 py-1 border border-panel-line rounded">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* RIGHT — Details */}
        <div className="relative w-full md:w-1/2 p-6 md:p-10 flex flex-col h-1/2 md:h-full overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 border border-panel-line flex items-center justify-center text-steel hover:text-white hover:border-white/40 transition-colors bg-graphite z-20"
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
              <span className="flex h-8 w-8 items-center justify-center rounded bg-white/5 text-white border border-white/10">
                <Icon size={14} />
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-steel-light uppercase">
                {project.location}
              </span>
            </div>

            <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl text-steel-light leading-tight mb-4">
              {project.title}
            </h2>

            <div className="h-[2px] bg-steel-light mb-6 w-12" />

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

// Removed LOCAL_PROJECTS array

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: true })
        if (!error && data && data.length > 0) {
          setProjects(data.map(p => {
            const gallery = p.gallery && p.gallery.length > 0 ? p.gallery : [p.image_url]

            return {
              ...p,
              icon: iconMap[p.icon] || Layers,
              image: p.image_url,
              gallery: gallery,
              desc: p.description
            }
          }))
        } else {
          setProjects([])
        }
      } catch (err) {
        setProjects([])
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
      <section className="relative pt-56 pb-32 lg:pt-64 lg:pb-40 overflow-hidden">
        {/* Clean Static Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url('/assets/project-sobha-aerial.jpg')` }} 
          />
          {/* Heavy gradient overlay to make the massive white text pop flawlessly */}
          <div className="absolute inset-0 bg-gradient-to-b from-graphite via-graphite/80 to-graphite" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
              <SectionLabel index="PROJECTS">Project Gallery</SectionLabel>
            </motion.div>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="font-display font-black uppercase text-[clamp(4rem,9vw,9rem)] tracking-tighter leading-[0.85] text-steel-light max-w-5xl"
            >
              Delivered steel work with clarity and control.
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
              className="mt-12 max-w-2xl text-steel text-lg sm:text-xl font-light leading-relaxed"
            >
              Browse a curated selection of our recent fabrication and erection projects across the Gulf, with emphasis on structural quality and execution speed.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative h-16 flex items-center">
        {/* Animated Line Intro Synchronized */}
        <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 1000 60" preserveAspectRatio="none">
          <line x1="0" y1="30" x2="1000" y2="30" stroke="#2a2e34" strokeWidth="1" />
          <motion.line
            x1="0" y1="30" x2="1000" y2="30"
            stroke="#c7cdd3" strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "circOut", delay: 0.4 }}
          />
        </svg>
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-steel bg-graphite pr-4"
        >
          Fig. 01 — Project Gallery
        </motion.span>
      </div>

      <section className="py-32 lg:py-48 overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-6 lg:px-10 grid gap-8 lg:grid-cols-3"
          initial="hidden" animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 1.0 } }
          }}
        >
          {loading ? (
            <div className="col-span-1 lg:col-span-3 py-32 text-center font-mono text-steel uppercase tracking-widest text-sm">
              Loading Projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-1 lg:col-span-3 py-32 text-center font-mono text-steel uppercase tracking-widest text-sm">
              No projects found.
            </div>
          ) : projects.map((project, i) => {
            const Icon = project.icon

            // Asymmetric CSS Grid sizing for editorial layout
            let colSpan = 'lg:col-span-1'
            let minHeight = 'min-h-[500px]'

            if (i === 0) {
              colSpan = 'lg:col-span-2'
              minHeight = 'min-h-[600px] lg:min-h-[700px]'
            } else if (i === 1) {
              colSpan = 'lg:col-span-1'
              minHeight = 'min-h-[600px] lg:min-h-[700px]'
            } else if (i === 2) {
              colSpan = 'lg:col-span-3'
              minHeight = 'min-h-[600px] lg:min-h-[800px]'
            } else if (i === 3) {
              colSpan = 'lg:col-span-1'
              minHeight = 'min-h-[500px]'
            } else if (i === 4) {
              colSpan = 'lg:col-span-2'
              minHeight = 'min-h-[500px]'
            }

            return (
              <motion.div
                key={project.title}
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
                }}
                className={`group relative overflow-hidden bg-graphite flex flex-col cursor-pointer ${colSpan} ${minHeight}`}
                onClick={() => openModal(i)}
              >
                {/* Ken Burns effect image container */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  {/* Dynamic gradient overlay that lightens on hover */}
                  <div className="absolute inset-0 transition-opacity duration-700 bg-gradient-to-t from-graphite-light via-graphite-light/50 to-transparent opacity-95 group-hover:opacity-75" />
                </div>

                {/* Content Overlay */}
                <div className="p-8 lg:p-12 relative z-10 flex-1 flex flex-col justify-end">
                  <div className="flex items-center justify-between gap-4 mb-auto">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/80 font-mono">{project.location}</span>
                    <span className="flex text-white/80 transition-colors group-hover:text-white">
                      <Icon size={24} strokeWidth={1.5} />
                    </span>
                  </div>

                  <div className="mt-12 transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 translate-y-4">
                    <h3 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase text-white tracking-tighter leading-[0.9] mb-4">
                      {project.title}
                    </h3>

                    <div className="flex items-end justify-between gap-6 overflow-hidden">
                      <p className="text-steel-light text-base sm:text-lg leading-relaxed max-w-md font-light flex-1">
                        {project.scope}
                      </p>
                      <button className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full border border-white/20 text-white group-hover:bg-white group-hover:text-graphite transition-all duration-300">
                        <ArrowRight size={20} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

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
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-white text-graphite px-8 py-4 hover:bg-steel-light transition-colors"
            >
              Talk to Sales
            </NavLink>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
