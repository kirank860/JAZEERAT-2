import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-graphite/90 backdrop-blur-md border-b border-panel-line' : 'bg-transparent'
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
                `relative font-display text-base tracking-wide uppercase pb-1 transition-colors ${
                  isActive ? 'text-weld' : 'text-steel-light hover:text-weld'
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-graphite/98 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between h-20 px-6">
              <span className="font-display font-extrabold text-2xl text-steel-light">JAZEERAT</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-steel-light">
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-2 px-6 mt-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block font-display text-4xl uppercase py-3 border-b border-panel-line ${
                        isActive ? 'text-weld' : 'text-steel-light'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-6 font-display uppercase tracking-wide text-center text-lg font-semibold bg-weld text-graphite px-5 py-4"
              >
                Request a Quote
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
