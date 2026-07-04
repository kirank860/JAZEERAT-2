import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/projects', label: 'Projects' },
  // { to: '/team', label: 'Team' },
  { to: '/blogs', label: 'Insights' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-graphite/90 backdrop-blur-md border-b border-panel-line' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <NavLink to="/" className="flex flex-col leading-none group">
          <span className="font-display font-extrabold text-2xl tracking-wide text-steel-light group-hover:text-weld transition-colors">
            JAZEERAT
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-steel">AL HADEED · STEEL FABRICATION</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative font-display text-base tracking-wide uppercase pb-1 transition-colors ${isActive ? 'text-weld' : 'text-steel-light hover:text-weld'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-weld"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="font-display uppercase tracking-wide text-sm font-semibold bg-weld text-graphite px-5 py-2.5 hover:bg-signal transition-colors"
          >
            Request a Quote
          </NavLink>
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-steel-light"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 h-[100dvh] bg-graphite/95 backdrop-blur-3xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between h-20 px-6 shrink-0">
              <span className="font-display font-extrabold text-2xl text-steel-light">JAZEERAT</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="w-12 h-12 flex items-center justify-center text-white hover:text-weld transition-colors bg-white/5 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links Container */}
            <div className="flex flex-col gap-6 px-8 mt-8 overflow-y-auto pb-8 flex-1 min-h-0">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -30, rotate: 2 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.06 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-end gap-6 font-display uppercase transition-colors block w-full ${isActive ? 'text-weld' : 'text-steel-light hover:text-white'}`
                    }
                  >
                    {({ isActive }) => (
                      <motion.div
                        className="flex items-end gap-4 w-full"
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="font-mono text-sm tracking-widest text-steel/50 mb-2 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-4xl sm:text-5xl tracking-tight truncate pb-1">
                          {l.label}
                        </span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-weld mb-4 ml-auto shrink-0" />}
                      </motion.div>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Bottom Contact Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-auto pt-6 pb-10 px-8 border-t border-white/5 shrink-0 bg-graphite"
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col gap-1 text-xs font-mono text-steel uppercase tracking-widest truncate">
                  <span className="text-white/30 mb-1">Email</span>
                  <a href="mailto:info@jahsteel.ae" className="hover:text-weld transition-colors truncate">info@jahsteel.ae</a>
                </div>
                <div className="flex flex-col gap-1 text-xs font-mono text-steel uppercase tracking-widest truncate">
                  <span className="text-white/30 mb-1">Phone</span>
                  <a href="tel:+971000000000" className="hover:text-weld transition-colors truncate">+971 00 000 0000</a>
                </div>
              </div>
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full font-display uppercase tracking-wider text-sm font-semibold bg-weld text-graphite px-5 py-4 rounded-full hover:bg-signal transition-colors"
              >
                Request a Quote
              </NavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
