import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  PenTool, Wrench, Ruler, ShieldCheck, Flame, Boxes, Truck, Factory,
  ArrowLeft, CheckCircle2, Cpu, Calendar, Activity, ShieldAlert
} from 'lucide-react'
import SEO from '../components/SEO'
import VideoHero from '../components/VideoHero'
import Cutline from '../components/Cutline'
import SectionLabel from '../components/SectionLabel'

const iconMap = {
  PenTool, Wrench, Ruler, ShieldCheck, Flame, Boxes, Truck, Factory
}

const serviceDetails = {
  'estimation-takeoff': {
    icon: Ruler,
    title: 'Estimation & Material Takeoff',
    desc: 'We provide accurate estimation and material takeoff services through detailed drawing and specification analysis. Our precise quantity calculations support cost control, efficient procurement, reduced waste, and effective project planning.',
    category: 'design',
    spec: 'Accurate MTO & estimation',
    video: '/assets/about-hero.mp4',
    poster: '/assets/slides/slide-1.webp',
    overview: 'Our dedicated estimation team provides contractors with rapid, precise, and mill-certified quantity takeoffs. We analyze design drawings to optimize steel nesting and reduce scrap percentages, ensuring competitive bidding and transparent material costs.',
    capabilities: [
      'Detail-level Material Takeoffs (MTO)',
      'Advanced Steel Nesting & Scrap Optimization',
      'Cost Planning & Value Engineering',
      'Preliminary Connection Design Assumptions',
      'Logistics & Freight Cost Modeling'
    ],
    machinery: [
      { name: 'Tekla Structures', cap: 'Automated 3D quantity extraction' },
      { name: 'PowerFab', cap: 'Material allocation & tracking' }
    ],
    standards: 'AISC Code of Standard Practice'
  },
  'structural-design-engineering': {
    icon: PenTool,
    title: 'Structural Design & Engineering',
    desc: 'Our experienced structural engineers deliver innovative steel design solutions, including structural analysis, complex and iconic structures, and value engineering. We optimize performance, safety, material efficiency, and constructability for successful project execution.',
    category: 'design',
    spec: 'Innovative steel design',
    video: '/assets/about-hero.mp4',
    poster: '/assets/slides/slide-2.webp',
    overview: 'We offer full-scale structural design services tailored to commercial, industrial, and architectural projects. Our engineering team leverages cutting-edge analysis software to optimize member sizes, reduce overall tonnage, and verify structural integrity against seismic and wind loads.',
    capabilities: [
      'Comprehensive Structural Analysis',
      'Wind & Seismic Load Modeling',
      'Value Engineering for Tonnage Reduction',
      'Connection Design Verification',
      'PE / SE Stamped Drawings'
    ],
    machinery: [
      { name: 'STAAD.Pro Connect', cap: 'Advanced 3D structural analysis' },
      { name: 'ETABS & SAP2000', cap: 'Seismic & wind load simulations' }
    ],
    standards: 'AISC 360-16 / IBC / ASCE 7'
  },
  'design-detailing': {
    icon: PenTool,
    title: 'Design & Detailing',
    desc: 'Using Tekla Structures and AutoCAD, we develop accurate 3D models, fabrication drawings, erection drawings, and connection details. With PowerFab for project tracking and production management, we ensure seamless coordination from design through fabrication and installation.',
    category: 'design',
    spec: 'Tekla & AutoCAD detailing',
    video: '/assets/services-hero.mp4',
    poster: '/assets/slides/slide-1.webp',
    overview: 'Before manufacturing begins, our engineering department constructs a complete "digital twin" of the structure. We utilize Tekla Structures to detail connections, cross-verify drawing dimensions, and perform automated clash detection between steelwork and MEP systems.',
    capabilities: [
      '3D BIM Modeling (Tekla Structures)',
      'Fabrication & Erection Shop Drawings',
      'CNC Data Generation (NC/DXF files)',
      'Architecturally Exposed Structural Steel (AESS) Detailing',
      'Clash Detection & Resolution'
    ],
    machinery: [
      { name: 'Tekla Structures Licenses', cap: 'BIM modeling & shop detailing' },
      { name: 'AutoCAD', cap: 'Drafting & 2D verification' }
    ],
    standards: 'AISC Code of Standard Practice / BS EN 1090-2'
  },
  'fabrication-facility': {
    icon: Factory,
    title: 'State-of-the-Art Fabrication Facility',
    desc: 'Our modern fabrication facility combines advanced technology with a skilled workforce of engineers, supervisors, fabricators, welders, and quality inspectors. We deliver high-quality structural steel components through efficient production processes and strict quality control.',
    category: 'fabrication',
    spec: 'Modern integrated workshop',
    video: '/assets/services-hero.mp4',
    poster: '/assets/slides/slide-3.webp',
    overview: 'Our integrated, state-of-the-art facility operates around the clock to meet aggressive project deadlines. With a heavily optimized floor layout, materials move seamlessly from raw stock to CNC processing, assembly, welding, and finally into our surface treatment bays.',
    capabilities: [
      'High-Volume Structural Steel Output',
      'Automated Conveyor Material Handling',
      'Dedicated Heavy-Lift Assembly Bays',
      'In-House Non-Destructive Testing (NDT)',
      'Climate-Controlled Paint & Blast Booths'
    ],
    machinery: [
      { name: 'Overhead Gantry Cranes', cap: '20T to 50T heavy lifting capacity' },
      { name: 'Automated Roller Conveyors', cap: 'Seamless material routing' }
    ],
    standards: 'ISO 9001 / ISO 45001'
  },
  'advanced-machinery': {
    icon: Wrench,
    title: 'Advanced Machinery & Technology',
    desc: 'Equipped with CNC laser cutting, press brake, plate rolling, band saw cutting, MIG welding, ARC welding, and supporting fabrication equipment, we ensure precision, efficiency, and consistent quality in every project.',
    category: 'machining',
    spec: 'Precision CNC & welding tech',
    video: '/assets/services-hero.mp4',
    poster: '/assets/slides/slide-2.webp',
    overview: 'We continuously invest in top-tier fabrication technology to ensure every cut, bend, and weld is exact. By integrating our 3D detailing software directly with our CNC machine floor, we eliminate human transcription errors and vastly accelerate production timelines.',
    capabilities: [
      'Direct NC-to-Machine Processing',
      'Heavy Plate Rolling & Forming',
      'Multi-Axis CNC Beam Drilling',
      'Automated Press-Brake Folding',
      'Robotic Welding Integration'
    ],
    machinery: [
      { name: 'CNC Multi-Spindle Drill Line', cap: 'High-speed beam drilling & coping' },
      { name: 'Heavy-Duty Press Brakes', cap: 'Complex plate folding & forming' },
      { name: 'Plate Rolling Machines', cap: 'Cylindrical & conical forming' }
    ],
    standards: 'AWS D1.1 / ASME Section IX'
  },
  'cnc-laser-cutting': {
    icon: Flame,
    title: 'CNC Laser Cutting',
    desc: 'Our CNC laser cutting technology delivers high-precision cutting with excellent accuracy, clean finishes, and minimal material waste, enabling the production of complex steel components with superior quality.',
    category: 'cutting',
    spec: 'High-precision finishes',
    video: '/assets/services-hero.mp4',
    poster: '/assets/slides/slide-1.webp',
    overview: 'Our fiber laser cutting machines provide unmatched precision for intricate steel components, gusset plates, and architectural metalwork. The laser leaves an exceptionally clean, dross-free edge that requires zero secondary grinding before welding or finishing.',
    capabilities: [
      'High-Speed Fiber Laser Cutting',
      'Intricate Architectural Metal Profiles',
      'Thick Plate Piercing & Slicing',
      'Dross-Free Edge Quality',
      'Automated Nesting for Scrap Reduction'
    ],
    machinery: [
      { name: 'High-Power Fiber Lasers', cap: 'Cuts up to 25mm mild steel' },
      { name: 'Automated Sheet Loaders', cap: 'Continuous lights-out operation' }
    ],
    standards: 'ISO 9013 Thermal Cutting Quality'
  },
  'custom-fabrication': {
    icon: Boxes,
    title: 'Custom Steel Fabrication',
    desc: 'We provide customized steel fabrication solutions including tanks, platforms, architectural structures, and specialized metal works, delivering durable and precise solutions tailored to client requirements.',
    category: 'fabrication',
    spec: 'Bespoke steel solutions',
    video: '/assets/about-hero.mp4',
    poster: '/assets/slides/slide-3.webp',
    overview: 'Beyond standard structural frames, our team excels in highly customized, bespoke fabrication. From complex spiral staircases and architectural canopies to heavy-duty industrial hoppers, we adapt our expertise to meet unique geometric and load-bearing requirements.',
    capabilities: [
      'Architectural Canopies & Facades',
      'Industrial Storage Tanks & Hoppers',
      'Custom Mezzanines & Catwalks',
      'Complex Tubular Structures',
      'Stainless Steel & Aluminum Specialties'
    ],
    machinery: [
      { name: 'TIG & MIG Welding Stations', cap: 'Specialized alloy welding' },
      { name: 'Section Bending Rolls', cap: 'Curved structural profiles' }
    ],
    standards: 'AESS Custom Guidelines / AWS D1.1'
  },
  'welding-qc': {
    icon: ShieldCheck,
    title: 'Welding & Quality Control',
    desc: 'Our qualified welding team applies advanced welding techniques and strict inspection procedures to ensure strong, reliable, and high-quality fabricated structures that meet project specifications and industry standards.',
    category: 'fabrication',
    spec: 'Strict inspection protocols',
    video: '/assets/services-hero.mp4',
    poster: '/assets/slides/slide-2.webp',
    overview: 'Quality isn\'t just inspected at the end—it is built into every phase. Our certified welding inspectors (CWI) monitor joint fit-up, pre-heat temperatures, and weld passes. All critical welds undergo rigorous Non-Destructive Testing (NDT) to guarantee absolute structural integrity.',
    capabilities: [
      'FCAW, SMAW, GMAW, & SAW Welding',
      'Ultrasonic Testing (UT) & Radiography (RT)',
      'Magnetic Particle (MT) & Dye Penetrant (PT)',
      'Weld Procedure Specification (WPS) Development',
      '100% Traceability & Mill Certificate Logging'
    ],
    machinery: [
      { name: 'Submerged Arc Welding (SAW) Tractors', cap: 'High-deposition continuous welding' },
      { name: 'Phased Array UT Scanners', cap: 'Advanced volumetric flaw detection' }
    ],
    standards: 'AWS D1.1 / ASME Section IX / ASNT Level II'
  },
  'surface-finishing': {
    icon: Ruler,
    title: 'Surface Finishing',
    desc: 'We provide professional surface protection solutions including industrial painting, protective coatings, and hot-dip galvanizing (HDG) to enhance durability, corrosion resistance, and long-term performance.',
    category: 'finishing',
    spec: 'Protective coatings & HDG',
    video: '/assets/contact-hero.mp4',
    poster: '/assets/slides/slide-1.webp',
    overview: 'Steel in the MENA region faces extreme UV, high humidity, and coastal salinity. We apply rigorous surface preparation (up to SA 2.5) followed by multi-coat epoxy/polyurethane systems or Hot-Dip Galvanizing to ensure the structure lasts for decades without degradation.',
    capabilities: [
      'Automatic Steel Shot Blasting (SA 2.5 / SA 3)',
      'Airless Spray Application of Epoxies & PU',
      'Intumescent Fireproofing Coatings',
      'Hot-Dip Galvanizing (HDG) Coordination',
      'Dry Film Thickness (DFT) & Adhesion Testing'
    ],
    machinery: [
      { name: 'Automated Shot Blasting Cabinet', cap: 'Uniform surface profile preparation' },
      { name: 'Climate-Controlled Paint Bays', cap: 'Dust-free, temperature-controlled curing' }
    ],
    standards: 'ISO 12944 / SSPC-SP10 / ASTM A123'
  },
  'delivery-installation': {
    icon: Truck,
    title: 'Delivery & Installation',
    desc: 'Our experienced installation teams provide safe and efficient steel erection services, ensuring accurate assembly, quality workmanship, and timely project completion from fabrication to final installation.',
    category: 'logistics',
    spec: 'Safe & efficient erection',
    video: '/assets/contact-hero.mp4',
    poster: '/assets/slides/slide-3.webp',
    overview: 'Fabrication is only half the job. We ensure that fabricated steel is safely transported and erected on-site. By matching the fabrication schedule with the erection sequences, we load and deliver members phase-by-phase, avoiding site congestion and ensuring structural alignment.',
    capabilities: [
      'Phased Site Delivery & Logistics Planning',
      'Over-dimensional (ODC) Transport',
      'Site Erection & Heavy Crane Lifting',
      'High-Strength Bolt Tightening & Tensioning',
      'Final Plumb Surveys & Handover'
    ],
    machinery: [
      { name: 'Fleet of Heavy Flatbed Trailers', cap: 'Phased transport to site' },
      { name: 'Calibrated Hydraulic Torque Wrenches', cap: 'Bolt pre-tensioning verification' }
    ],
    standards: 'OSHA 1926 Subpart R / AISC Erection Tolerances'
  }
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const detail = serviceDetails[slug]

  if (!detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-graphite text-center p-6">
        <ShieldAlert size={48} className="text-white mb-4 animate-bounce" />
        <h1 className="font-display uppercase text-2xl text-steel-light mb-2">Service Not Found</h1>
        <p className="text-steel text-sm mb-6">The service page you are looking for does not exist or has been relocated.</p>
        <button
          onClick={() => navigate('/services')}
          className="inline-flex items-center gap-2 font-mono uppercase text-white text-sm border border-panel-line px-5 py-3 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Services
        </button>
      </div>
    )
  }

  const Icon = detail.icon

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <SEO
        title={`${detail.title} | Steel Fabrication Services`}
        description={detail.desc}
        path={`/services/${slug}`}
      />

      <VideoHero
        videoSrc={detail.video}
        poster={detail.poster}
        showSparks={slug === 'welding-qc' || slug === 'design-detailing'}
        className="pt-40 pb-20 lg:pt-48 lg:pb-28"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white hover:opacity-80 transition-opacity mb-8 border border-white/10 bg-graphite/40 px-3 py-1.5 backdrop-blur-sm"
          >
            <ArrowLeft size={12} /> Back to Services
          </button>
          
          <SectionLabel index={detail.category.toUpperCase()}>Capabilities</SectionLabel>
          <h1 className="font-display font-extrabold uppercase text-3xl sm:text-5xl lg:text-6xl leading-[0.95] text-steel-light">
            {detail.title}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-steel max-w-2xl font-light leading-relaxed">
            {detail.desc}
          </p>
        </div>
      </VideoHero>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label={`JZH-CAPABILITY // ${detail.title.toUpperCase()}`} />
      </div>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* LEFT: Specs Sidebar (40% width) */}
          <div className="w-full lg:w-[40%] flex flex-col gap-8">
            
            {/* Tech Specs Card */}
            <div className="rounded-3xl border border-panel-line bg-graphite p-8 shadow-lg shadow-black/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-steel-light" />
              <div className="flex items-center gap-2 mb-6">
                <Activity size={16} className="text-steel-light" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-steel-light">Technical Specifications</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-steel">Standard Capability</p>
                  <p className="text-steel-light text-sm font-semibold mt-1">{detail.spec}</p>
                </div>
                <div className="h-px bg-panel-line" />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-steel">Design & Code Standard</p>
                  <p className="text-steel-light text-sm font-semibold mt-1">{detail.standards}</p>
                </div>
                <div className="h-px bg-panel-line" />
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-steel">Quality Check</p>
                  <p className="text-steel-light text-sm font-semibold mt-1">100% Traceability & Mill Test Certified</p>
                </div>
              </div>
            </div>

            {/* Machinery / Capacity list */}
            <div className="rounded-3xl border border-panel-line bg-graphite p-8 shadow-lg shadow-black/20">
              <div className="flex items-center gap-2 mb-6">
                <Cpu size={16} className="text-steel-light" />
                <h4 className="font-mono text-xs uppercase tracking-widest text-steel-light">Machinery & Capacity</h4>
              </div>
              
              <ul className="space-y-5">
                {detail.machinery.map((m) => (
                  <li key={m.name} className="flex flex-col">
                    <span className="text-sm font-bold text-steel-light">{m.name}</span>
                    <span className="text-xs text-steel mt-1 leading-relaxed">{m.cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Detailed scope (60% width) */}
          <div className="w-full lg:w-[60%] flex flex-col gap-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-steel-light">Overview</span>
              <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl text-steel-light mt-3 mb-6">
                Execution with zero deviations.
              </h2>
              <p className="text-steel text-base leading-relaxed pl-6 border-l-2 border-weld/30">
                {detail.overview}
              </p>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-steel-light">Core Capabilities</span>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {detail.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3 rounded-2xl border border-panel-line bg-graphite/40 p-4">
                    <CheckCircle2 size={16} className="text-steel-light shrink-0 mt-0.5" />
                    <span className="text-sm text-steel-light leading-relaxed">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-panel-line bg-graphite-light p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-6">
              <div>
                <h4 className="font-display uppercase text-lg text-steel-light">Have a project drawing?</h4>
                <p className="text-xs text-steel mt-1">Get an accurate cost estimation in 24 hours.</p>
              </div>
              <NavLink
                to="/contact"
                className="inline-flex items-center gap-2 font-display uppercase font-semibold text-xs bg-white/5 border border-panel-line text-white px-6 py-3.5 hover:bg-white/10 transition-colors shrink-0"
              >
                Send Us Drawing
              </NavLink>
            </div>
          </div>

        </div>
      </section>
    </motion.main>
  )
}
