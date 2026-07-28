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
                className="w-8 h-8 border border-panel-line bg-graphite/90 flex items-center justify-center text-steel hover:text-weld hover:border-weld/40 transition-colors"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={onNext}
                className="w-8 h-8 border border-panel-line bg-graphite/90 flex items-center justify-center text-steel hover:text-weld hover:border-weld/40 transition-colors"
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

const LOCAL_PROJECTS = [
  {
    title: 'Industrial Fabrication',
    location: 'Sharjah, UAE',
    scope: 'Portal frames, columns and steel decks',
    desc: 'A massive 40,000 sqm industrial fabrication facility requiring over 2,500 tons of structural steel. Included full portal frames, mezzanine decks, and heavy gantry crane runway beams.',
    icon: Factory,
    image: '/assets/project-truss-install.jpg',
    gallery: [
      '/assets/project-truss-install.jpg',
      '/assets/project-crane-hoist.jpg',
      '/assets/project-facade-canopy.jpg'
    ]
  },
  {
    title: 'Heavy Erection & Lift',
    location: 'Kuwait',
    scope: 'Column splicing and crane rigging',
    desc: 'Heavy steel structural erection for industrial columns and A-frame modules. Coordinated complex heavy lifting and modular pre-assemblies at height.',
    icon: Truck,
    image: '/assets/project-crane-hoist.jpg',
    gallery: [
      '/assets/project-crane-hoist.jpg',
      '/assets/project-truss-install.jpg',
      '/assets/project-sobha-aerial.jpg'
    ]
  },
  {
    title: 'Sobha One Facades',
    location: 'Dubai, UAE',
    scope: 'Architectural facade steel and balcony structures',
    desc: 'Fabrication and erection of custom high-rise structural facade elements and balcony framing for the landmark Sobha One tower development in Dubai, adhering to AESS (Architecturally Exposed Structural Steel) finishing standards.',
    icon: Layers,
    image: '/assets/project-sobha-rendering.jpg',
    gallery: [
      '/assets/project-sobha-rendering.jpg',
      '/assets/project-sobha-aerial.jpg',
      '/assets/project-facade-canopy.jpg'
    ]
  },
  {
    title: 'Logistics Hub Canopy',
    location: 'Qatar',
    scope: 'Warehouse steelwork and loading canopies',
    desc: 'A regional distribution center featuring wide-span steel trusses and extensive cantilevered loading canopies. Engineered for fast on-site bolted assembly, significantly reducing the main contractor\'s erection timeline.',
    icon: Home,
    image: '/assets/project-facade-canopy.jpg',
    gallery: [
      '/assets/project-facade-canopy.jpg',
      '/assets/project-sobha-aerial.jpg',
      '/assets/project-truss-install.jpg'
    ]
  },
  {
    title: 'Sobha One Erection',
    location: 'Dubai, UAE',
    scope: 'Structural framework and tower modules',
    desc: 'Erection of main structural framing and heavy girder modules for the waterfront tower units at Sobha One.',
    icon: ShieldCheck,
    image: '/assets/project-sobha-aerial.jpg',
    gallery: [
      '/assets/project-sobha-aerial.jpg',
      '/assets/project-sobha-rendering.jpg',
      '/assets/project-crane-hoist.jpg'
    ]
  }
]

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
            let localImg = p.image_url
            const titleLower = p.title.toLowerCase()
            if (titleLower.includes('industrial')) {
              localImg = '/assets/project-truss-install.jpg'
            } else if (titleLower.includes('oil & gas') || titleLower.includes('erection') || titleLower.includes('heavy') || titleLower.includes('kuwait')) {
              localImg = '/assets/project-crane-hoist.jpg'
            } else if (titleLower.includes('architectural') || titleLower.includes('sobha')) {
              localImg = '/assets/project-sobha-rendering.jpg'
            } else if (titleLower.includes('logistics') || titleLower.includes('canopy')) {
              localImg = '/assets/project-facade-canopy.jpg'
            } else if (titleLower.includes('compliance')) {
              localImg = '/assets/project-sobha-aerial.jpg'
            }

            let gallery = [localImg]
            if (localImg === '/assets/project-truss-install.jpg') {
              gallery = ['/assets/project-truss-install.jpg', '/assets/project-crane-hoist.jpg', '/assets/project-facade-canopy.jpg']
            } else if (localImg === '/assets/project-crane-hoist.jpg') {
              gallery = ['/assets/project-crane-hoist.jpg', '/assets/project-truss-install.jpg', '/assets/project-sobha-aerial.jpg']
            } else if (localImg === '/assets/project-sobha-rendering.jpg') {
              gallery = ['/assets/project-sobha-rendering.jpg', '/assets/project-sobha-aerial.jpg', '/assets/project-facade-canopy.jpg']
            } else if (localImg === '/assets/project-facade-canopy.jpg') {
              gallery = ['/assets/project-facade-canopy.jpg', '/assets/project-sobha-aerial.jpg', '/assets/project-truss-install.jpg']
            } else if (localImg === '/assets/project-sobha-aerial.jpg') {
              gallery = ['/assets/project-sobha-aerial.jpg', '/assets/project-sobha-rendering.jpg', '/assets/project-crane-hoist.jpg']
            } else {
              gallery = [localImg, '/assets/project-truss-install.jpg', '/assets/project-sobha-rendering.jpg']
            }

            return {
              ...p,
              icon: iconMap[p.icon] || Layers,
              image: localImg,
              gallery: gallery,
              desc: p.description
            }
          }))
        } else {
          setProjects(LOCAL_PROJECTS)
        }
      } catch (err) {
        setProjects(LOCAL_PROJECTS)
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
        pageKey="projects"
        videoSrc="/assets/projects-hero.mp4"
        poster="/assets/slides/slide-3.webp"
        showSparks={false}
        className="pt-40 pb-20 lg:pt-48 lg:pb-28"
      >
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={projectFadeInLeft}>
            <SectionLabel index="PROJECTS">Project Gallery</SectionLabel>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" custom={1} variants={projectFadeInLeft}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-steel-light"
          >
            Delivered steel work with clarity and control.
          </motion.h1>
          <motion.p initial="hidden" animate="visible" custom={2} variants={projectFadeInLeft}
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
