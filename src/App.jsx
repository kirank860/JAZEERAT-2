import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Facilities from './pages/Facilities'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
// import Team from './pages/Team'
import ServiceDetail from './pages/ServiceDetail'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppWidget from './components/WhatsAppWidget'
import PageTransition from './components/PageTransition'
import InitialLoader from './components/InitialLoader'

import { useLenis } from './hooks/useLenis'

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // 🌊 Lenis smooth scroll — runs globally for all pages
  useLenis()

  return (
    <div className="min-h-screen bg-graphite text-steel-light font-body">
      <AnimatePresence mode="wait">
        {loading && <InitialLoader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/services/:slug" element={<PageTransition><ServiceDetail /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/facilities" element={<PageTransition><Facilities /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          {/* <Route path="/team" element={<PageTransition><Team /></PageTransition>} /> */}
          <Route path="/blogs" element={<PageTransition><Blogs /></PageTransition>} />
          <Route path="/blogs/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <WhatsAppWidget />
      <Footer />
    </div>
  )
}

export default App
