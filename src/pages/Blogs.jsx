import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Clock, User, ArrowRight, Mail } from 'lucide-react'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import SectionLabel from '../components/SectionLabel'
import TiltImage from '../components/TiltImage'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const categoryColors = {
  'Technical Insights': 'bg-[#ed91fa] text-black',
  'Industry News': 'bg-[#05aa82] text-black',
  'Company Updates': 'bg-[#ffc828] text-black',
  'default': 'bg-weld text-black'
}

const getCategoryColor = (category) => categoryColors[category] || categoryColors.default

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    async function loadBlogs() {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        setBlogs(data)
      }
      setLoading(false)
    }
    loadBlogs()
  }, [])

  // Filter blogs based on category
  const filteredBlogs = activeCategory === 'All' 
    ? blogs 
    : blogs.filter(b => b.category === activeCategory)

  const featuredPost = filteredBlogs.length > 0 ? filteredBlogs[0] : null
  const regularPosts = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : []

  const categories = ['All', 'Technical Insights', 'Industry News', 'Company Updates']

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-graphite">
      <SEO
        title="Insights & News | Jazeerat Al Hadeed"
        description="Read our latest insights, case studies, and technical deep dives into structural steel fabrication, CNC processing, and site erection across the MENA region."
        path="/blogs"
      />

      {/* Hero Section */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <SectionLabel index="INSIGHTS">Knowledge Base</SectionLabel>
          </motion.div>
          <motion.h1
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-8xl leading-[0.9] text-steel-light max-w-4xl mt-6 mb-8"
          >
            The science of<br />
            <span className="text-weld">structural steel.</span>
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="text-steel text-lg lg:text-xl max-w-2xl leading-relaxed"
          >
            Industry news, technical deep dives, and company updates from the team building the region's most critical infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-graphite pt-4 pb-12 relative z-20 border-b border-panel-line mb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap gap-4">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-xs uppercase tracking-widest px-6 py-3 rounded-full font-bold transition-all border ${
                activeCategory === cat
                  ? cat === 'All' ? 'bg-weld border-weld text-black' : `${getCategoryColor(cat).split(' ')[0]} border-transparent text-black`
                  : 'bg-transparent border-panel-line text-steel hover:border-weld/50 hover:text-weld'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="pb-20 lg:pb-32 bg-graphite relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {loading ? (
            <div className="py-32 text-center">
              <span className="font-mono text-steel uppercase tracking-widest text-sm">Loading Articles...</span>
            </div>
          ) : blogs.length === 0 ? (
            <div className="py-32 text-center">
              <span className="font-mono text-steel uppercase tracking-widest text-sm">No articles found.</span>
            </div>
          ) : (
            <>
              {/* Featured Post (Editorial Style) */}
              {featuredPost && (
                <NavLink to={`/blogs/${featuredPost.slug}`} className="block group mb-20 lg:mb-32">
                  <motion.article 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
                    className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                  >
                    <div className="relative h-[400px] lg:h-[600px] w-full rounded-sm z-0">
                      <TiltImage src={featuredPost.image_url} alt={featuredPost.title} />
                      <div className="absolute top-6 left-6 z-20 pointer-events-none">
                        <span className={`font-mono text-xs uppercase tracking-widest px-4 py-2 font-bold shadow-lg rounded-full ${getCategoryColor(featuredPost.category)}`}>
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4 mb-6 font-mono text-[11px] tracking-widest uppercase text-steel">
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-weld" /> {featuredPost.read_time}</span>
                        <span className="w-1 h-1 bg-panel-line rounded-full" />
                        <span className="flex items-center gap-1.5"><User size={14} className="text-weld" /> {featuredPost.author}</span>
                      </div>
                      
                      <h2 className="font-display font-extrabold uppercase text-4xl lg:text-6xl text-steel-light mb-6 leading-[1.05] group-hover:text-weld transition-colors">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-steel text-lg lg:text-xl leading-relaxed mb-10 border-l-2 border-weld pl-6">
                        {featuredPost.excerpt}
                      </p>

                      <div className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-weld font-semibold group-hover:text-signal transition-colors">
                        Read Featured Article 
                        <motion.div className="group-hover:translate-x-2 transition-transform">
                          <ArrowRight size={16} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                </NavLink>
              )}

              {/* Masonry-style Grid for Remaining Posts */}
              {regularPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {regularPosts.map((blog, i) => (
                    <NavLink key={blog.id} to={`/blogs/${blog.slug}`} className="block group">
                      <motion.article
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                        custom={i % 3} variants={fadeUp}
                        className={`flex flex-col h-full ${i % 3 === 1 ? 'md:mt-12 lg:mt-24' : ''} ${i % 3 === 2 ? 'lg:mt-12' : ''}`}
                      >
                        <div className="relative aspect-[4/3] w-full mb-6 rounded-sm z-0">
                          <TiltImage src={blog.image_url} alt={blog.title} />
                          <div className="absolute top-4 left-4 z-20 pointer-events-none">
                            <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 font-bold shadow-lg rounded-full ${getCategoryColor(blog.category)}`}>
                              {blog.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col flex-1">
                          <h3 className="font-display font-bold uppercase text-2xl lg:text-3xl text-steel-light mb-4 group-hover:text-weld transition-colors leading-tight">
                            {blog.title}
                          </h3>
                          
                          <p className="text-steel text-base leading-relaxed mb-6 line-clamp-3 flex-1">
                            {blog.excerpt}
                          </p>

                          <div className="flex items-center justify-between mt-auto pt-6 border-t border-panel-line">
                            <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-steel">
                              <span className="flex items-center gap-1.5"><Clock size={12} className="text-weld" /> {blog.read_time}</span>
                            </div>
                            <div className="text-weld group-hover:translate-x-1 transition-transform">
                              <ArrowRight size={16} />
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 lg:py-32 bg-graphite relative overflow-hidden border-t border-panel-line">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,90,31,0.05),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            custom={0} variants={fadeUp}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-graphite border border-panel-line mb-8"
          >
            <Mail size={24} className="text-weld" />
          </motion.div>
          
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="font-display font-extrabold uppercase text-4xl lg:text-5xl text-steel-light mb-6"
          >
            Get the latest <span className="text-weld">insights.</span>
          </motion.h2>
          
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}
            className="text-steel max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Subscribe to our newsletter for technical breakdowns, industry news, and inside looks at major MENA infrastructure projects.
          </motion.p>
          
          <motion.form 
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeUp}
            className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4"
            onSubmit={(e) => { e.preventDefault(); alert('Subscribed!') }}
          >
            <input 
              type="email" 
              required
              placeholder="Enter your email address" 
              className="flex-1 bg-graphite-light border border-panel-line focus:border-weld outline-none px-6 py-4 text-steel-light placeholder:text-steel/50 font-mono text-sm"
            />
            <button 
              type="submit"
              className="font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-8 py-4 hover:bg-signal transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </motion.form>
        </div>
      </section>
    </motion.main>
  )
}
