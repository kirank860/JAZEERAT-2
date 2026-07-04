import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Check, MessageCircle } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import SEO from '../components/SEO'
import VideoHero from '../components/VideoHero'
import { supabase } from '../lib/supabase'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

const inputClass =
  'w-full bg-transparent border-b border-panel-line focus:border-weld outline-none py-3 text-steel-light placeholder:text-steel/60 transition-colors'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('enquiries').insert([
        {
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message
        }
      ])

      if (!error) {
        setSent(true)
      } else {
        console.error(error)
        alert("Something went wrong saving to database. Please try again.")
      }
    } catch (err) {
      console.error(err)
      alert("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <SEO
        title="Contact Us | Get a Steel Fabrication Quote"
        description="Get in touch with Jazeerat Al Hadeed for a steel fabrication quote. Send your drawings, spec or scope and our team will respond with a price and timeline — fast."
        path="/contact"
      />

      <VideoHero
        videoSrc="/assets/about-hero.mp4"
        poster="/assets/slides/slide-1.webp"
        showSparks={false}
        className="pt-40 pb-20 lg:pt-48 lg:pb-24"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <SectionLabel index="CONTACT">Start a Project</SectionLabel>
          </motion.div>
          <motion.h1
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-steel-light"
          >
            Tell us what
            <br />you're <span className="text-weld">building.</span>
          </motion.h1>
        </div>
      </VideoHero>

      <section id="contact-form" className="pb-28 lg:pb-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-5 gap-16">

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
            className="lg:col-span-3"
          >
            {sent ? (
              <div className="border border-panel-line p-10 flex flex-col items-start gap-4">
                <span className="w-12 h-12 flex items-center justify-center bg-weld text-graphite">
                  <Check size={24} />
                </span>
                <h3 className="font-display uppercase text-2xl text-steel-light">Request received</h3>
                <p className="text-steel text-sm leading-relaxed max-w-sm">
                  Thanks — our team will review your spec and get back to you shortly with
                  next steps and a quote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="font-mono text-[11px] text-steel uppercase tracking-widest">Name</label>
                    <input
                      required name="name" value={form.name} onChange={handleChange}
                      placeholder="Your full name" className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] text-steel uppercase tracking-widest">Email</label>
                    <input
                      required type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="you@company.com" className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[11px] text-steel uppercase tracking-widest">Company</label>
                  <input
                    name="company" value={form.company} onChange={handleChange}
                    placeholder="Company / contractor name" className={inputClass}
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-steel uppercase tracking-widest">Project details</label>
                  <textarea
                    required rows={5} name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us about scope, materials, tolerances and timeline"
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 font-display uppercase tracking-wide font-semibold bg-weld text-graphite px-8 py-4 hover:bg-signal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                  {!isSubmitting && <ArrowUpRight size={18} />}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: MapPin, label: 'Workshop', value: 'Industrial Area, Dubai, UAE', link: null },
              { icon: MessageCircle, label: 'WhatsApp', value: '+971 54 305 8357', link: 'https://wa.me/971543058357' },
              { icon: Phone, label: 'Phone', value: '+971 54 305 8357', link: 'tel:+971543058357' },
              { icon: Mail, label: 'Email', value: 'info@jahsteel.ae', link: 'mailto:info@jahsteel.ae' },
              { icon: Clock, label: 'Hours', value: 'Sat – Thu, 07:00 – 18:00', link: null },
            ].map((c) => {
              const content = (
                <>
                  <c.icon size={22} className="text-weld shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-steel">{c.label}</p>
                    <p className="text-steel-light mt-1 group-hover:text-weld transition-colors">{c.value}</p>
                  </div>
                </>
              )

              return c.link ? (
                <a
                  key={c.label}
                  href={c.link}
                  target={c.link.startsWith('http') ? '_blank' : undefined}
                  rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group border border-panel-line p-6 flex items-start gap-4 hover:border-weld/50 transition-colors block cursor-pointer"
                >
                  {content}
                </a>
              ) : (
                <div key={c.label} className="group border border-panel-line p-6 flex items-start gap-4 hover:border-weld/50 transition-colors">
                  {content}
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}
