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
    icon: Ruler,
    title: 'Estimation & Material Takeoff',
    desc: 'We provide accurate estimation and material takeoff services through detailed drawing and specification analysis. Our precise quantity calculations support cost control, efficient procurement, reduced waste, and effective project planning.',
    category: 'design',
    spec: 'Accurate MTO & estimation',
    slug: 'estimation-takeoff'
  },
  {
    icon: PenTool,
    title: 'Structural Design & Engineering',
    desc: 'Our experienced structural engineers deliver innovative steel design solutions, including structural analysis, complex and iconic structures, and value engineering. We optimize performance, safety, material efficiency, and constructability for successful project execution.',
    category: 'design',
    spec: 'Innovative steel design',
    slug: 'structural-design-engineering'
  },
  {
    icon: PenTool,
    title: 'Design & Detailing',
    desc: 'Using Tekla Structures and AutoCAD, we develop accurate 3D models, fabrication drawings, erection drawings, and connection details. With PowerFab for project tracking and production management, we ensure seamless coordination from design through fabrication and installation.',
    category: 'design',
    spec: 'Tekla & AutoCAD detailing',
    slug: 'design-detailing'
  },
  {
    icon: Factory,
    title: 'State-of-the-Art Fabrication Facility',
    desc: 'Our modern fabrication facility combines advanced technology with a skilled workforce of engineers, supervisors, fabricators, welders, and quality inspectors. We deliver high-quality structural steel components through efficient production processes and strict quality control.',
    category: 'fabrication',
    spec: 'Modern integrated workshop',
    slug: 'fabrication-facility'
  },
  {
    icon: Wrench,
    title: 'Advanced Machinery & Technology',
    desc: 'Equipped with CNC laser cutting, press brake, plate rolling, band saw cutting, MIG welding, ARC welding, and supporting fabrication equipment, we ensure precision, efficiency, and consistent quality in every project.',
    category: 'machining',
    spec: 'Precision CNC & welding tech',
    slug: 'advanced-machinery'
  },
  {
    icon: Flame,
    title: 'CNC Laser Cutting',
    desc: 'Our CNC laser cutting technology delivers high-precision cutting with excellent accuracy, clean finishes, and minimal material waste, enabling the production of complex steel components with superior quality.',
    category: 'cutting',
    spec: 'High-precision finishes',
    slug: 'cnc-laser-cutting'
  },
  {
    icon: Boxes,
    title: 'Custom Steel Fabrication',
    desc: 'We provide customized steel fabrication solutions including tanks, platforms, architectural structures, and specialized metal works, delivering durable and precise solutions tailored to client requirements.',
    category: 'fabrication',
    spec: 'Bespoke steel solutions',
    slug: 'custom-fabrication'
  },
  {
    icon: ShieldCheck,
    title: 'Welding & Quality Control',
    desc: 'Our qualified welding team applies advanced welding techniques and strict inspection procedures to ensure strong, reliable, and high-quality fabricated structures that meet project specifications and industry standards.',
    category: 'fabrication',
    spec: 'Strict inspection protocols',
    slug: 'welding-qc'
  },
  {
    icon: Ruler,
    title: 'Surface Finishing',
    desc: 'We provide professional surface protection solutions including industrial painting, protective coatings, and hot-dip galvanizing (HDG) to enhance durability, corrosion resistance, and long-term performance.',
    category: 'finishing',
    spec: 'Protective coatings & HDG',
    slug: 'surface-finishing'
  },
  {
    icon: Truck,
    title: 'Delivery & Installation',
    desc: 'Our experienced installation teams provide safe and efficient steel erection services, ensuring accurate assembly, quality workmanship, and timely project completion from fabrication to final installation.',
    category: 'logistics',
    spec: 'Safe & efficient erection',
    slug: 'delivery-installation'
  }
]

export default function Services() {
  const [filter, setFilter] = useState('all')
  const categories = ['all', 'design', 'cutting', 'machining', 'fabrication', 'finishing', 'logistics']
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO
        title="Steel Fabrication Services | UAE & GCC"
        description="Comprehensive steel fabrication services: CNC plasma cutting, structural fabrication, machine workshop, welding & QC, surface finishing and delivery. One integrated workshop across the UAE."
        path="/services"
      />

      <VideoHero
        pageKey="services"
        videoSrc="/assets/services-hero.mp4"
        poster="/assets/assetsJazeerat/mild-steel-fabrication-works.jpeg"
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
            <br /><span className="text-white">one workshop.</span>
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
                className={`text-sm px-3 py-2 rounded-full border ${filter === c ? 'bg-white text-graphite border-white' : 'border-panel-line text-steel'}`}
              >
                {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-panel-line border border-panel-line">
            {services.filter(s => filter === 'all' ? true : s.category === filter).map((s, i) => (
              <NavLink
                key={s.title}
                to={`/services/${s.slug}`}
                className="bg-graphite p-10 hover:bg-panel transition-colors group block relative"
              >
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} custom={i % 4} variants={fadeUp}
                >
                  <div className="flex items-start justify-between mb-6">
                    <s.icon size={30} className="text-steel-light" strokeWidth={1.5} />
                    <span className="font-mono text-[10px] text-steel tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display uppercase text-2xl text-steel-light mb-3 group-hover:text-white transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-steel text-sm leading-relaxed mb-4">{s.desc}</p>
                  
                  <div className="flex items-center justify-between border-t border-panel-line pt-4 mt-6">
                    <span className="font-mono text-[11px] text-steel/80 uppercase tracking-wide">
                      {s.spec}
                    </span>
                    <span className="font-mono text-[10px] text-steel-light group-hover:text-white uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-all">
                      Details →
                    </span>
                  </div>
                </motion.div>
              </NavLink>
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
            Send us a drawing. <span className="text-white">We'll send back a quote.</span>
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="mt-10">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-white text-graphite px-8 py-4 hover:bg-steel-light transition-colors"
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
