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
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-graphite/85 backdrop-blur-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between h-20 px-6">
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
            <div className="flex flex-col gap-1 px-6 mt-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center justify-between font-display text-5xl sm:text-6xl uppercase py-4 border-b border-white/10 transition-colors ${isActive ? 'text-weld' : 'text-steel-light hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{l.label}</span>
                        {isActive && <span className="w-3 h-3 rounded-full bg-weld" />}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Bottom Contact Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-auto mb-10 px-6 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-1 text-sm font-mono text-steel">
                <a href="mailto:info@jahsteel.ae" className="hover:text-weld transition-colors">info@jahsteel.ae</a>
                <a href="tel:+971000000000" className="hover:text-weld transition-colors">+971 00 000 0000</a>
              </div>
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="font-display uppercase tracking-wider text-center text-base font-semibold bg-weld text-graphite px-5 py-4 rounded-sm hover:bg-signal transition-colors"
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
