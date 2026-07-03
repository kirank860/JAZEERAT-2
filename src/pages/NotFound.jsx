import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { ArrowLeft, AlertTriangle } from 'lucide-react'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <SEO title="Page Not Found | Jazeerat Al Hadeed" description="The page you are looking for does not exist." />

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bp-grid opacity-15 pointer-events-none" />

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-weld/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-10 text-center flex flex-col items-center">
        
        {/* Error icon/badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center w-20 h-20 rounded-full border border-weld/20 bg-weld/5 text-weld mb-8"
        >
          <AlertTriangle size={32} />
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-mono text-sm tracking-[0.3em] text-weld uppercase mb-4">Error 404</p>
          <h1 className="font-display font-extrabold uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-steel-light leading-[0.9] mb-6">
            Page Not<br /><span className="text-steel">Found.</span>
          </h1>
          <p className="text-steel text-lg font-light leading-relaxed max-w-md mx-auto mb-10">
            The fabrication drawing you are looking for doesn't exist, has been moved, or was temporarily taken offline.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <NavLink
            to="/"
            className="inline-flex items-center justify-center gap-3 bg-weld text-graphite font-display uppercase font-semibold tracking-wide px-8 py-4 text-sm hover:bg-signal transition-colors w-full sm:w-auto"
          >
            <ArrowLeft size={18} /> Return to Home
          </NavLink>
        </motion.div>
      </div>
    </motion.main>
  )
}
