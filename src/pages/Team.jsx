import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { X, ArrowLeft, ArrowRight, Mail, ArrowUpRight } from 'lucide-react'
import Lenis from 'lenis'
import SEO from '../components/SEO'

import { supabase } from '../lib/supabase'

/* ─── Globe rotation constants ───────────────────────────── */
// Each card sits on a circle. As the user scrolls, the circle rotates.
// scroll down → rotate clockwise (negative translateX for left-side cards)
// scroll up → counter-clockwise
const CARD_W = 280
const CARD_H = 380

/* ─── TeamMemberCard ─────────────────────────────────────── */
function MemberModal({ member, onClose, onPrev, onNext, total, index }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 bg-graphite/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* panel */}
      <motion.div
        className="relative z-10 w-full max-w-4xl bg-graphite-light border border-panel-line overflow-hidden"
        initial={{ scale: 0.92, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* weld accent top border */}
        <div className="h-[3px] bg-gradient-to-r from-weld via-weld/60 to-transparent" />

        <div className="grid md:grid-cols-2">
          {/* LEFT — photo */}
          <div className="relative h-72 md:h-full min-h-[340px] overflow-hidden">
            <motion.img
              key={member.id}
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover object-top"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-graphite-light/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-light via-transparent to-transparent" />

            {/* nav arrows */}
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
            {/* counter */}
            <span className="absolute bottom-5 right-5 font-mono text-[10px] text-steel tracking-widest">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* RIGHT — details */}
          <div className="p-8 flex flex-col">
            <button
              onClick={onClose}
              className="self-end w-9 h-9 border border-panel-line flex items-center justify-center text-steel hover:text-weld hover:border-weld/40 transition-colors mb-6"
            >
              <X size={16} />
            </button>

            <motion.div
              key={member.id + '-text'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* role tag */}
              <span className="font-mono text-[10px] tracking-[0.25em] text-weld uppercase">{member.role}</span>

              <h2 className="font-display font-extrabold uppercase text-3xl text-steel-light mt-2 mb-1">
                {member.name}
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs text-steel">{member.location}</span>
                <span className="w-1 h-1 rounded-full bg-panel-line" />
                <span className="font-mono text-xs text-steel">{member.years} experience</span>
              </div>

              <motion.div
                className="h-[2px] bg-weld mb-6 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ width: 48 }}
              />

              {/* quote */}
              <blockquote className="font-display uppercase text-lg text-steel-light/80 italic mb-5 border-l-2 border-weld pl-4">
                "{member.quote}"
              </blockquote>

              {/* bio */}
              <p className="text-steel text-sm leading-relaxed mb-6">{member.bio}</p>

              {/* skills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {member.skills.map((s) => (
                  <span key={s} className="font-mono text-[10px] tracking-widest uppercase border border-panel-line px-3 py-1 text-steel">
                    {s}
                  </span>
                ))}
              </div>

              {/* contact */}
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 font-mono text-xs text-weld tracking-widest uppercase hover:text-signal transition-colors"
              >
                <Mail size={12} /> {member.email}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Globe Card ─────────────────────────────────────────── */
function GlobeCard({ member, onClick }) {
  return (
    <motion.div
      className="flex-none relative group cursor-pointer"
      style={{ width: CARD_W, height: CARD_H }}
      whileHover={{ y: -12, rotate: 0, transition: { duration: 0.3 } }}
      initial={{ rotate: member.rotate }}
      onClick={onClick}
    >
      {/* photo card */}
      <div className="absolute inset-0 overflow-hidden border border-panel-line group-hover:border-weld/50 transition-colors duration-300">
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-700"
          loading="lazy"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/30 to-transparent" />

        {/* weld corner brackets */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-weld/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-weld/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* name overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="font-mono text-[9px] tracking-[0.25em] text-weld uppercase mb-1">{member.role}</p>
        <h3 className="font-display uppercase font-bold text-lg text-steel-light leading-tight group-hover:text-weld transition-colors">
          {member.name}
        </h3>
        <motion.div
          className="mt-2 h-px bg-weld origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ width: 24 }}
        />
      </div>

      {/* hover arrow */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-weld flex items-center justify-center">
          <ArrowUpRight size={14} className="text-graphite" />
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Team page ─────────────────────────────────────── */
export default function Team() {
  const containerRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [scrollY, setScrollY] = useState(0)
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)

  // fetch data
  useEffect(() => {
    async function loadTeam() {
      const { data, error } = await supabase.from('team').select('*').order('created_at', { ascending: true })
      if (!error && data) {
        setTeam(data.map(m => ({
          ...m,
          img: m.image_url,
          offsetX: m.offset_x,
          offsetY: m.offset_y
        })))
      }
      setLoading(false)
    }
    loadTeam()
  }, [])

  /* Lenis — page-level smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // track raw scrollY for globe transform
    lenis.on('scroll', ({ scroll }) => setScrollY(scroll))

    return () => lenis.destroy()
  }, [])

  /* modal navigation */
  const openMember = useCallback((i) => setSelectedIndex(i), [])
  const closeMember = useCallback(() => setSelectedIndex(null), [])
  const prevMember = useCallback(() =>
    setSelectedIndex((i) => (i - 1 + team.length) % team.length), [team.length])
  const nextMember = useCallback(() =>
    setSelectedIndex((i) => (i + 1) % team.length), [team.length])

  // split team into 3 rows for the globe parallax
  const row1 = team
  const row2 = [...team].reverse()
  const row3 = team

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-graphite text-steel-light overflow-x-hidden"
    >
      <SEO
        title="Our Team | Jazeerat Al Hadeed"
        description="Meet the engineers, fabricators and managers behind our precision steel in the MENA region."
        path="/team"
      />

      {/* ── BACK NAV ─────────────────────────────── */}
      <div className="fixed top-6 left-6 z-50">
        <NavLink
          to="/about"
          className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-steel hover:text-weld transition-colors group"
        >
          <motion.div
            className="w-8 h-8 border border-panel-line group-hover:border-weld/50 flex items-center justify-center transition-colors"
            whileHover={{ x: -3 }}
          >
            <ArrowLeft size={14} />
          </motion.div>
          Back
        </NavLink>
      </div>

      {/* ── HERO HEADER ──────────────────────────── */}
      <section className="pt-32 pb-16 px-6 lg:px-16 relative overflow-hidden">
        {/* giant bg text */}
        <motion.span
          className="absolute right-0 top-0 font-display font-extrabold uppercase text-[clamp(6rem,22vw,20rem)] leading-none text-weld/[0.04] select-none pointer-events-none"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          TEAM
        </motion.span>

        {/* bp grid */}
        <div className="absolute inset-0 bp-grid opacity-10 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-weld tracking-[0.25em] uppercase">Jazeerat</span>
              <span className="h-px w-8 bg-weld" />
              <span className="font-mono text-xs text-steel tracking-[0.2em] uppercase">The People</span>
            </div>

            <h1 className="font-display font-extrabold uppercase text-6xl sm:text-7xl lg:text-9xl leading-[0.88] text-steel-light">
              The people
              <br />
              <span className="text-weld">behind the</span>
              <br />
              steel.
            </h1>

            <motion.div
              className="mt-6 h-[3px] bg-weld origin-left shadow-[0_0_12px_rgba(255,90,31,0.6)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{ width: 100 }}
            />

            <p className="mt-8 text-steel text-lg leading-relaxed max-w-xl">
              Over 5 years of precision steel delivered by this team —
              engineers, fabricators and managers who treat every
              project as their personal signature.
            </p>
          </motion.div>

          {/* stat row */}
          <motion.div
            className="flex flex-wrap gap-8 mt-12 pt-10 border-t border-panel-line"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { n: '200+', label: 'Workshop Staff' },
              { n: '5+ yrs', label: 'Average Tenure: Leadership' },
              { n: '6', label: 'Countries Served' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display font-extrabold text-3xl text-weld">{s.n}</p>
                <p className="font-mono text-[10px] tracking-widest uppercase text-steel mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SCROLL HINT ──────────────────────────── */}
      <div className="px-6 lg:px-16 mb-6 flex items-center gap-2 text-steel/40 font-mono text-[10px] tracking-widest uppercase">
        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          ←
        </motion.div>
        Scroll to rotate · Click to explore
        <motion.div
          animate={{ x: [0, -6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          →
        </motion.div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          GLOBE ROTATION SECTION
          3 rows, alternating direction, parallax speed.
          Each row moves horizontally based on window scrollY —
          row 1 moves left, row 2 moves right, row 3 moves left.
          This creates the "earth rotating" feel.
      ───────────────────────────────────────────────────────────── */}
      <section ref={containerRef} className="relative py-8 overflow-hidden">
        {/* subtle radial glow from center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,90,31,0.04)_0%,transparent_70%)] pointer-events-none" />

        {/* ROW 1 — moves LEFT as you scroll down */}
        <div className="overflow-hidden mb-4">
          <motion.div
            className="flex gap-6 px-6 py-3"
            style={{ x: -scrollY * 0.25, willChange: 'transform' }}
          >
            {[...row1, ...row1].map((m, i) => (
              <GlobeCard
                key={`r1-${m.id}-${i}`}
                member={m}
                onClick={() => openMember(m.id - 1)}
              />
            ))}
          </motion.div>
        </div>

        {/* ROW 2 — moves RIGHT as you scroll down */}
        <div className="overflow-hidden mb-4">
          <motion.div
            className="flex gap-6 px-6 py-3"
            style={{ x: scrollY * 0.3 - 140, willChange: 'transform' }}
          >
            {[...row2, ...row2].map((m, i) => (
              <GlobeCard
                key={`r2-${m.id}-${i}`}
                member={m}
                onClick={() => openMember(m.id - 1)}
              />
            ))}
          </motion.div>
        </div>

        {/* ROW 3 — moves LEFT (slightly faster) */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 px-6 py-3"
            style={{ x: -scrollY * 0.2 - 60, willChange: 'transform' }}
          >
            {[...row3, ...row3].map((m, i) => (
              <GlobeCard
                key={`r3-${m.id}-${i}`}
                member={m}
                onClick={() => openMember(m.id - 1)}
              />
            ))}
          </motion.div>
        </div>

        {/* perspective edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-graphite to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-graphite to-transparent pointer-events-none z-10" />
      </section>

      {/* ── TEAM LIST — accessible fallback + detail trigger ── */}
      <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-weld tracking-[0.25em] uppercase">§ Full Roster</span>
          <span className="h-px flex-1 bg-panel-line" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {loading ? (
            <div className="col-span-1 lg:col-span-3 py-10 font-mono text-steel uppercase tracking-widest text-sm">
              Loading Team...
            </div>
          ) : team.map((m, i) => (
            <motion.button
              key={m.id}
              className="text-left border border-panel-line bg-graphite-light p-5 group hover:border-weld/50 transition-colors relative overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              onClick={() => openMember(i)}
            >
              <div className="absolute inset-0 bg-weld/0 group-hover:bg-weld/[0.03] transition-colors pointer-events-none" />

              <div className="w-14 h-14 overflow-hidden mb-4 border border-panel-line group-hover:border-weld/40 transition-colors">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover object-top" />
              </div>

              <p className="font-mono text-[9px] tracking-[0.2em] text-weld uppercase mb-1">{m.role}</p>
              <h3 className="font-display uppercase text-base text-steel-light group-hover:text-weld transition-colors leading-tight">
                {m.name}
              </h3>
              <p className="font-mono text-[9px] text-steel mt-2">{m.location}</p>

              <motion.div
                className="mt-3 h-px bg-weld origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 + 0.3 }}
                style={{ width: 20 }}
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────── */}
      <section className="py-20 px-6 lg:px-16 border-t border-panel-line">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-mono text-xs tracking-widest text-steel uppercase mb-2">Join the team</p>
            <h2 className="font-display font-extrabold uppercase text-4xl text-steel-light">
              Build with us.
            </h2>
          </div>
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-8 py-4 hover:bg-signal transition-colors"
          >
            Get in Touch <ArrowUpRight size={18} />
          </NavLink>
        </div>
      </section>

      {/* ── MEMBER MODAL ─────────────────────────── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <MemberModal
            member={team[selectedIndex]}
            index={selectedIndex}
            total={team.length}
            onClose={closeMember}
            onPrev={prevMember}
            onNext={nextMember}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
