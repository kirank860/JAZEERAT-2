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
import Team from './pages/Team'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppWidget from './components/WhatsAppWidget'
import CustomCursor from './components/CustomCursor'
import { useLenis } from './hooks/useLenis'

function App() {
  const location = useLocation()

  // 🌊 Lenis smooth scroll — runs globally for all pages
  useLenis()

  return (
    <div className="min-h-screen bg-graphite text-steel-light font-body">
      <CustomCursor />
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <WhatsAppWidget />
      <Footer />
    </div>
  )
}

export default App
