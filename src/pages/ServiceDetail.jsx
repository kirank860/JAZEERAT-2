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
  'design-detailing': {
    icon: PenTool,
    title: 'Design & Detailing',
    desc: 'Shop drawings, structural detailing and material takeoffs prepared in-house before a single plate is cut.',
    category: 'Design & Engineering',
    spec: 'Detailing tolerance ±0.5mm',
    video: '/assets/about-hero.mp4',
    poster: '/assets/slides/slide-1.webp',
    overview: 'Before manufacturing begins, our engineering department constructs a complete "digital twin" of the structure. We utilize Tekla Structures to detail connections, cross-verify drawing dimensions, and perform automated clash detection between steelwork and MEP systems.',
    capabilities: [
      '3D BIM Modeling (Tekla Structures)',
      'AISC & BS Connection Design & Verification',
      'CNC Data Generation (NC/DXF files)',
      'Architecturally Exposed Structural Steel (AESS) Detailing',
      'Structural Steel Material Takeoffs (MTO)'
    ],
    machinery: [
      { name: 'Tekla Structures Licenses', cap: 'BIM modeling & shop detailing' },
      { name: 'STAAD.Pro Connect', cap: 'Connection design verification' },
      { name: 'AutoCAD & Revit Integration', cap: 'Client drawing alignment' }
    ],
    standards: 'AISC Code of Standard Practice / BS EN 1090-2'
  },
  'estimation-takeoff': {
    icon: Ruler,
    title: 'Estimation & Takeoff',
    desc: 'Comprehensive structural steel material takeoffs and commercial cost estimations prepared from client drawings.',
    category: 'Design & Engineering',
    spec: 'Accurate MTO within 24-48 hours',
    video: '/assets/about-hero.mp4',
    poster: '/assets/slides/slide-1.webp',
    overview: 'Our dedicated estimation team provides contractors with rapid, precise, and mill-certified quantity takeoffs. We analyze design drawings to optimize steel nesting and reduce scrap percentages, ensuring competitive bidding and transparent material costs.',
    capabilities: [
      'Detail-level Material Takeoffs (MTO)',
      'Scrap & Nesting Optimization Analysis',
      'Raw Material Grade & Section Availability Verification',
      'Cross-border Transport & Customs Duty Cost Estimation',
      'Budgetary Estimates for Tender Submissions'
    ],
    machinery: [
      { name: 'Bluebeam Revu Extreme', cap: 'Digital takeoff & drawing markup' },
      { name: 'Custom Nesting Software', cap: 'Linear & plate nesting optimization' },
      { name: 'Mill Direct Price Sync', cap: 'Real-time global steel index tracking' }
    ],
    standards: 'Standard Method of Measurement (SMM7) / POMI'
  },
  'bandsaw-cutting': {
    icon: Wrench,
    title: 'Bandsaw Cutting',
    desc: 'Precision bandsaw cutting for structural steel sections, UB/UC beams, channels, and hollow profiles.',
    category: 'Cutting Services',
    spec: 'Section size up to 1000mm',
    video: '/assets/services-hero.mp4',
    poster: '/assets/slides/slide-2.webp',
    overview: 'Equipped with heavy-duty semi-automatic bandsaw machines, our workshop cuts structural sections (beams, columns, hollow sections, and angles) to exact lengths. Clean, deburred edges ensure that parts fit together perfectly during fit-up and welding.',
    capabilities: [
      'Straight & Mitre Cutting (up to 60° angles)',
      'Bundle Cutting for Hollow Profiles',
      'High-speed Sectioning for Structural Members',
      'Precision Length Tolerances (within ±1mm)',
      'Deburring & Edge Preparation'
    ],
    machinery: [
      { name: 'Heavy-Duty Semi-Automatic Bandsaw', cap: 'Cuts up to 1000mm sections' },
      { name: 'High-Speed Circular Cold Saws', cap: 'For smaller tubes and angles' },
      { name: 'Infeed & Outfeed Conveyor Lines', cap: 'Automatic length positioning' }
    ],
    standards: 'ISO 2768-m (General Tolerances)'
  },
  'rolling-bending-shearing': {
    icon: Boxes,
    title: 'Rolling, Bending & Shearing',
    desc: 'Plate rolling, section bending, press-brake folding, and shearing services for custom steel elements.',
    category: 'Forming & Erection',
    spec: 'Plate thickness up to 25mm',
    video: '/assets/facilities-hero.mp4',
    poster: '/assets/slides/slide-2.webp',
    overview: 'Our plate-forming department rolls and bends flat steel plates into curved cylinders, cone shapes, and custom profiles. Using heavy-duty press brakes and hydraulic shears, we create structural segments, tanks, and facades exactly to your drawings.',
    capabilities: [
      'Heavy Plate Rolling (for silos, tanks, and pipes)',
      'CNC Press-Brake Folding & Flanging',
      'Structural Section & Pipe Bending',
      'Hydraulic Plate Shearing (up to 12mm thickness)',
      'Architectural Facade Panel Forming'
    ],
    machinery: [
      { name: '3-Roll Plate Rolling Machine', cap: 'Rolls up to 25mm thick plates' },
      { name: '300-Ton CNC Press Brake', cap: 'Bends lengths up to 4000mm' },
      { name: 'Hydraulic Guillotine Shear', cap: 'Shears plates up to 3000mm width' }
    ],
    standards: 'ASTM A6 / EN 10029 Tolerances'
  },
  'structural-fabrication': {
    icon: Factory,
    title: 'Structural Steel Fabrication',
    desc: 'Portal frames, trusses, columns and beams fabricated and pre-assembled for site-ready installation.',
    category: 'Fabrication',
    spec: 'Spans up to 30,000mm',
    video: '/assets/projects-hero.mp4',
    poster: '/assets/slides/slide-3.webp',
    overview: 'As our core capability, we fabricate heavy structural steel frameworks for warehouses, industrial plants, logistics hubs, and commercial high-rises. Beams and columns are cut, drilled, fitted with connection plates, and pre-assembled inside our workshop to guarantee site alignment.',
    capabilities: [
      'Portal Frame & Truss Fabrication',
      'Built-up Box Columns & Plate Girders',
      'Heavy Gantry Crane Runways & Runway Beams',
      'Fit-up Trial Assemblies (Shop Pre-assembly)',
      'Mezzanine Steel Deck Framing'
    ],
    machinery: [
      { name: 'Automated Beam Drilling Line', cap: 'Drills 3 sides simultaneously' },
      { name: 'Heavy overhead cranes', cap: 'Dual-lift capacity up to 30 tons' },
      { name: 'Built-up Girder SAW Line', cap: 'Submerged arc welding for girders' }
    ],
    standards: 'AWS D1.1 / BS EN 1090-2 (Execution Class EX3)'
  },
  'precision-machining': {
    icon: Wrench,
    title: 'Machine Workshop',
    desc: 'In-house CNC machining, drilling and boring for precision components and custom mechanical parts.',
    category: 'Machining',
    spec: 'CNC milling & lathe boring',
    video: '/assets/facilities-hero.mp4',
    poster: '/assets/slides/slide-2.webp',
    overview: 'Our integrated machine shop fabricates tight-tolerance components that conventional structural steel shops must outsource. We machine heavy pins, custom anchor bolts, base plates, and bored connections, keeping the entire project lifecycle under one roof.',
    capabilities: [
      'Precision Lathe Turning & Shaft Machining',
      'CNC Vertical Milling & Boring',
      'Flange Drilling & Facing',
      'Thread Cutting & Custom Anchor Bolt Fabrication',
      'High-tolerance Machined Connection Pins'
    ],
    machinery: [
      { name: 'CNC Vertical Machining Center', cap: 'Milling envelope 1500x750mm' },
      { name: 'Heavy-Duty Manual & CNC Lathes', cap: 'Bores up to 600mm diameter' },
      { name: 'Radial Drilling Machines', cap: 'Drills up to 75mm hole diameter' }
    ],
    standards: 'ISO 286 (Tolerances for Limits and Fits)'
  },
  'custom-fabrication': {
    icon: Boxes,
    title: 'Custom Fabrication',
    desc: 'Bespoke steelwork built directly to client specification — tanks, platforms, ducting and enclosures.',
    category: 'Fabrication',
    spec: 'Built to client drawing',
    video: '/assets/projects-hero.mp4',
    poster: '/assets/slides/slide-3.webp',
    overview: 'Beyond conventional framing, we design and build specialized steel items. Our custom fabricators handle non-standard structures like industrial silos, storage tanks, hopper chutes, access stair towers, and safety cages, aligning with detailed engineering specs.',
    capabilities: [
      'Industrial Storage Silos & Tanks',
      'Hopper Chutes & Material Handling Ducts',
      'Stair Towers, Ladders & Safety Handrails',
      'Heavy Equipment Skids & Base Frames',
      'Custom Steel Enclosures & Platforms'
    ],
    machinery: [
      { name: 'Plate Shearing & Punching Workstations', cap: 'For secondary plate prep' },
      { name: 'Profile Pipe Cutters', cap: 'Contours handrail pipe joints' },
      { name: 'Specialty Jigging Fixtures', cap: 'Ensures squareness of frames' }
    ],
    standards: 'ASME Section VIII (Pressure Vessels) / OSHA Safety Standards'
  },
  'welding-qc': {
    icon: ShieldCheck,
    title: 'Welding & QC',
    desc: 'Certified welders working to code, with every joint logged against our internal QC record.',
    category: 'Quality Control',
    spec: 'Certified welders (AWS/ASME)',
    video: '/assets/about-hero.mp4',
    poster: '/assets/slides/slide-1.webp',
    overview: 'Quality is built into every joint. Our welders are qualified to AWS D1.1 and ASME Section IX codes. A dedicated QA/QC inspector monitors pre-heat, fit-up, and logs welder IDs against each structural weld, which is verified using advanced non-destructive testing.',
    capabilities: [
      'SMAW, GMAW (MIG), and GTAW (TIG) Welding',
      'Submerged Arc Welding (SAW)',
      'Ultrasonic Testing (UT) & Radiographic Testing (RT)',
      'Magnetic Particle (MPI) & Dye Penetrant (DPT) Testing',
      'Full Welder Traceability & Weld Mapping Logs'
    ],
    machinery: [
      { name: 'Multi-Process Inverter Welders', cap: 'High-efficiency arc control' },
      { name: 'NDT Ultrasonic Flaw Detector', cap: 'Sub-surface weld inspection' },
      { name: 'Welding Electrode Baking Ovens', cap: 'Maintains low-hydrogen conditions' }
    ],
    standards: 'AWS D1.1 / ASME Sec IX / ISO 3834-2'
  },
  'surface-finishing': {
    icon: Flame,
    title: 'Surface Finishing',
    desc: 'Shot blasting, priming, painting and galvanizing prepared for MENA climate and site conditions.',
    category: 'Finishing',
    spec: 'Coating thickness to spec',
    video: '/assets/services-hero.mp4',
    poster: '/assets/slides/slide-1.webp',
    overview: 'Structural steel must be shielded from the GCC region\'s high humidity and salinity. Our blasting and painting facility cleans raw steel to SA 2.5 profile standards before applying protective primers, epoxies, polyurethanes, or intumescent fireproofing coatings.',
    capabilities: [
      'Automatic & Manual Shot Blasting (SA 2.5/SA 3.0)',
      'Epoxy Priming & Corrosion-Resistant Undercoats',
      'Polyurethane Gloss Topcoating',
      'Intumescent (Fireproofing) Paint Application',
      'Hot-Dip Galvanizing Coordination (ASTM A123)'
    ],
    machinery: [
      { name: 'Enclosed Shot-Blasting Chamber', cap: 'Abrasive blast to SA 2.5' },
      { name: 'Airless Spray Painting Stations', cap: 'Applies up to 300 microns DFT' },
      { name: 'Elcometer DFT Gauges', cap: 'Electronic coating thickness measurement' }
    ],
    standards: 'ISO 8501-1 (Blasting Grade) / SSPC Painting Manual'
  },
  'delivery-installation': {
    icon: Truck,
    title: 'Delivery & Installation',
    desc: 'Coordinated transport and on-site installation support for contractors across the region.',
    category: 'Logistics & Erection',
    spec: 'Site-coordinated logistics',
    video: '/assets/contact-hero.mp4',
    poster: '/assets/slides/slide-3.webp',
    overview: 'We ensure that fabricated steel is safely transported and erected on-site. By matching the fabrication schedule with the erection sequences, we load and deliver members phase-by-phase, avoiding site congestion and ensuring structural alignment.',
    capabilities: [
      'Over-dimensional (ODC) Transport & Permits',
      'Cross-Border GCC Customs Handling & Logistics',
      'Site Erection Lifting Plans & Tandem Crane Lifting Coordination',
      'High-Strength Bolt Tightening & Torque Testing',
      'Erection Alignment & Plumb Surveys'
    ],
    machinery: [
      { name: 'Fleet of Heavy Flatbed & Low-Bed Trailers', cap: 'Transport loads up to 40 tons' },
      { name: 'Mobile Cranes (Partner Fleet)', cap: 'Lifts up to 150 tons on-site' },
      { name: 'Calibrated Hydraulic Torque Wrenches', cap: 'Bolt pre-tensioning verification' }
    ],
    standards: 'AISC Code of Standard Practice / OSHA 1926 Subpart R'
  }
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const detail = serviceDetails[slug]

  if (!detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-graphite text-center p-6">
        <ShieldAlert size={48} className="text-weld mb-4 animate-bounce" />
        <h1 className="font-display uppercase text-2xl text-steel-light mb-2">Service Not Found</h1>
        <p className="text-steel text-sm mb-6">The service page you are looking for does not exist or has been relocated.</p>
        <button
          onClick={() => navigate('/services')}
          className="inline-flex items-center gap-2 font-mono uppercase text-weld text-sm border border-weld/30 px-5 py-3 hover:bg-weld/10 transition-colors"
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
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-weld hover:opacity-80 transition-opacity mb-8 border border-weld/20 bg-graphite/40 px-3 py-1.5 backdrop-blur-sm"
          >
            <ArrowLeft size={12} /> Back to Services
          </button>
          
          <SectionLabel index={detail.category.toUpperCase()}>Capabilities</SectionLabel>
          <h1 className="font-display font-extrabold uppercase text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-steel-light">
            {detail.title}
          </h1>
          <p className="mt-6 text-lg text-steel max-w-2xl font-light leading-relaxed">
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
              <div className="absolute top-0 left-0 w-[3px] h-full bg-weld" />
              <div className="flex items-center gap-2 mb-6">
                <Activity size={16} className="text-weld" />
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
                <Cpu size={16} className="text-weld" />
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
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-weld">Overview</span>
              <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl text-steel-light mt-3 mb-6">
                Execution with zero deviations.
              </h2>
              <p className="text-steel text-base leading-relaxed pl-6 border-l-2 border-weld/30">
                {detail.overview}
              </p>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-weld">Core Capabilities</span>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {detail.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-3 rounded-2xl border border-panel-line bg-graphite/40 p-4">
                    <CheckCircle2 size={16} className="text-weld shrink-0 mt-0.5" />
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
                className="inline-flex items-center gap-2 font-display uppercase font-semibold text-xs bg-weld text-graphite px-6 py-3.5 hover:bg-signal transition-colors shrink-0"
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
