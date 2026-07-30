import { useState, useEffect } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, Clock, User, Share2, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import TiltImage from '../components/TiltImage'
import { LOCAL_BLOGS } from '../data/localBlogs'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

const categoryColors = {
  'Technical Insights': 'bg-[#ed91fa] text-black',
  'Industry News': 'bg-[#ffc828] text-black',
  'Company Updates': 'bg-black text-white border border-white/20',
  'default': 'bg-weld text-white'
}

const getCategoryColor = (category) => categoryColors[category] || categoryColors.default

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [shared, setShared] = useState(false)

  // Scroll Progress Bar Setup
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  useEffect(() => {
    async function loadPost() {
      try {
        // Fetch main post
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .single()
        
        if (!error && data) {
          setPost(data)
          
          // Fetch related posts (latest 3 excluding current)
          const { data: relatedData } = await supabase
            .from('blogs')
            .select('*')
            .neq('id', data.id)
            .order('created_at', { ascending: false })
            .limit(3)
            
          if (relatedData && relatedData.length > 0) {
            setRelatedPosts(relatedData)
          } else {
            setRelatedPosts(LOCAL_BLOGS.filter(b => b.slug !== slug).slice(0, 3))
          }
        } else {
          // Fallback to local
          const localPost = LOCAL_BLOGS.find(b => b.slug === slug)
          if (localPost) {
            setPost(localPost)
            setRelatedPosts(LOCAL_BLOGS.filter(b => b.slug !== slug).slice(0, 3))
          } else {
            navigate('/not-found')
            return
          }
        }
      } catch (err) {
        const localPost = LOCAL_BLOGS.find(b => b.slug === slug)
        if (localPost) {
          setPost(localPost)
          setRelatedPosts(LOCAL_BLOGS.filter(b => b.slug !== slug).slice(0, 3))
        } else {
          navigate('/not-found')
          return
        }
      }
      setLoading(false)
    }
    loadPost()
    window.scrollTo(0, 0)
  }, [slug, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-graphite flex items-center justify-center">
        <span className="font-mono text-steel uppercase tracking-widest text-sm">Loading Article...</span>
      </div>
    )
  }

  if (!post) return null

  const date = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-graphite min-h-screen">
      {/* Top reading progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-weld z-[200] origin-[0%]"
        style={{ scaleX }}
      />
      <SEO
        title={`${post.title} | Jazeerat Al Hadeed Insights`}
        description={post.excerpt}
        path={`/blogs/${post.slug}`}
        image={post.image_url}
      />

      {/* Floating Back Button */}
      <div className="fixed top-24 left-6 lg:left-10 z-50">
        <NavLink
          to="/blogs"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-graphite/80 backdrop-blur-md border border-panel-line text-steel hover:text-white hover:border-weld/50 transition-all shadow-2xl group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        </NavLink>
      </div>

      {/* Immersive Editorial Hero */}
      <section className="relative w-full min-h-[85vh] flex items-end pb-20 pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/80 to-graphite/20" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className={`inline-block font-mono text-xs uppercase tracking-widest px-4 py-2 font-bold rounded-full mb-8 ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
          </motion.div>
          
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-white mb-8"
          >
            {post.title}
          </motion.h1>
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="flex flex-wrap items-center gap-6 font-mono text-xs tracking-widest uppercase text-steel-light border-t border-white/10 pt-8"
          >
            <span className="flex items-center gap-2"><User size={14} className="text-steel-light" /> {post.author}</span>
            <span className="w-1.5 h-1.5 bg-steel-light rounded-full" />
            <span className="flex items-center gap-2"><Clock size={14} className="text-steel-light" /> {post.read_time}</span>
            <span className="w-1.5 h-1.5 bg-steel-light rounded-full" />
            <span>{date}</span>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-20 lg:py-28 bg-graphite-light">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="mb-16 border-l-4 border-white pl-6 lg:pl-10"
          >
            <p className="text-steel-light text-2xl lg:text-3xl leading-snug font-medium italic">
              {post.excerpt}
            </p>
          </motion.div>

          {/* Prose content */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="prose prose-invert prose-xl max-w-none 
              prose-headings:font-display prose-headings:uppercase prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-5xl prose-h1:mb-10
              prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-steel-light
              prose-p:text-steel prose-p:leading-[1.8] prose-p:mb-8
              prose-a:text-white prose-a:no-underline hover:prose-a:underline hover:prose-a:text-white/80 transition-colors
              prose-strong:text-steel-light prose-strong:font-semibold
              prose-li:text-steel prose-li:leading-relaxed prose-li:marker:text-steel-light
              first-letter:text-6xl first-letter:font-display first-letter:font-bold first-letter:text-white first-letter:float-left first-letter:mr-4 first-letter:mt-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer Share actions */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}
            className="mt-24 pt-10 border-t border-panel-line flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-graphite flex items-center justify-center border border-panel-line shadow-lg">
                <User size={24} className="text-steel-light" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-steel mb-1">Written by</p>
                <p className="font-display text-xl uppercase text-steel-light font-bold">{post.author}</p>
              </div>
            </div>
            
            <button 
              onClick={handleShare}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-steel-light hover:text-white transition-colors border border-panel-line px-6 py-3 rounded-full hover:bg-white/10"
            >
              <Share2 size={16} /> {shared ? 'Link Copied!' : 'Share Article'}
            </button>
          </motion.div>
        </div>
      </article>

      {/* More Insights (Related Posts) */}
      {relatedPosts.length > 0 && (
        <section className="py-24 lg:py-32 bg-graphite relative overflow-hidden border-t border-panel-line">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between mb-16">
              <div>
                <h3 className="font-display font-extrabold uppercase text-4xl lg:text-5xl text-steel-light">
                  Keep <span className="text-white">Reading.</span>
                </h3>
              </div>
              <NavLink to="/blogs" className="hidden md:flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-steel-light hover:text-white transition-colors group">
                View all insights
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </NavLink>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((blog, i) => (
                <NavLink key={blog.id} to={`/blogs/${blog.slug}`} className="block group">
                  <motion.article
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                    custom={i} variants={fadeUp}
                    className="flex flex-col h-full bg-graphite-light border border-panel-line overflow-hidden hover:border-weld/50 transition-colors duration-300"
                  >
                    <div className="relative aspect-video w-full shrink-0 z-0">
                      <TiltImage src={blog.image_url} alt={blog.title} />
                      <div className="absolute top-4 left-4 z-20 pointer-events-none">
                        <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 font-bold shadow-lg rounded-full ${getCategoryColor(blog.category)}`}>
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <h4 className="font-display font-bold uppercase text-2xl text-steel-light mb-4 group-hover:text-white transition-colors leading-tight">
                        {blog.title}
                      </h4>
                      <p className="text-steel text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-steel-light group-hover:text-white transition-colors font-mono text-[10px] uppercase tracking-widest mt-auto font-semibold">
                        Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.article>
                </NavLink>
              ))}
            </div>
            
            <div className="mt-12 md:hidden">
              <NavLink to="/blogs" className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-graphite bg-white px-6 py-4 font-bold rounded-full">
                View all insights
                <ArrowRight size={16} />
              </NavLink>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-20 lg:py-28 bg-graphite-light relative overflow-hidden border-t border-panel-line">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <h3 className="font-display font-bold uppercase text-2xl lg:text-3xl text-steel-light mb-4">
            Get the latest <span className="text-weld">insights.</span>
          </h3>
          <p className="text-steel text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Subscribe for technical breakdowns and industry news from the team building MENA's critical infrastructure.
          </p>
          <form 
            className="flex flex-col sm:flex-row max-w-md mx-auto gap-3"
            onSubmit={(e) => { e.preventDefault(); alert('Subscribed!') }}
          >
            <input 
              type="email" 
              required
              placeholder="Enter your email" 
              className="flex-1 bg-graphite border border-panel-line focus:border-weld outline-none px-5 py-3 text-steel-light placeholder:text-steel/50 font-mono text-sm rounded-full"
            />
            <button 
              type="submit"
              className="font-display uppercase tracking-wide font-semibold bg-white text-graphite px-6 py-3 rounded-full hover:bg-steel-light transition-colors whitespace-nowrap text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </motion.main>
  )
}
