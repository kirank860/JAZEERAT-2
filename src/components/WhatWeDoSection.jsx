import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Factory, Wrench, Ruler } from 'lucide-react'
import SectionLabel from './SectionLabel'

const cards = [
  {
    title: 'What We Do',
    subtitle: 'Fabrication & erection',
    text: 'Shop-to-site steelwork for industrial, commercial and infrastructure projects.',
    icon: Factory,
  },
  {
    title: 'About Us',
    subtitle: 'Integrated workshop',
    text: 'A full-service fabrication hub with CNC machining, welding and coating under one roof.',
    icon: Wrench,
  },
  {
    title: 'Who We Are',
    subtitle: 'Engineering team',
    text: 'Experienced structural fabricators, site contractors and project coordinators.',
    icon: Ruler,
  },
]

export default function WhatWeDoSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [-150, 150]) // Deep cinematic background parallax
  const titleY = useTransform(scrollYProgress, [0, 1], [100, -50]) // Floating foreground text
  const cardY = useTransform(scrollYProgress, [0, 1], [150, -100]) // Vertical float for cards
  const cardX = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  return (
    <section ref={ref} className="relative overflow-hidden bg-black">
      <motion.div
        style={{ y: bgY, backgroundImage: "url('https://res.cloudinary.com/dmb7nfmyj/image/upload/q_auto,f_auto/jazeerat/what-we-do')" }}
        className="absolute inset-0 bg-cover bg-center opacity-80"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-32">
        <motion.div style={{ y: titleY }} className="max-w-3xl">
          <SectionLabel index="§ 01">What We Do</SectionLabel>
          <h2 className="font-display font-bold uppercase text-4xl sm:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
            A parallax steel story from workshop design to site delivery.
          </h2>
          <p className="mt-6 text-white/80 max-w-2xl text-sm leading-relaxed">
            Scroll down to explore how our fabrication process, in-house engineering and field teams come together to deliver structural steel projects across the region.
          </p>
        </motion.div>

        <motion.div style={{ x: cardX, y: cardY }} className="mt-16 grid gap-6 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-lg shadow-black/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-weld text-graphite">
                    <Icon size={24} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-weld opacity-85">{card.title}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">{card.subtitle}</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-white/80">{card.text}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="mt-12">
          <NavLink
            to="/about"
            className="inline-flex items-center gap-2 rounded-full border border-weld px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-weld transition hover:bg-weld/10"
          >
            Explore Our Story
          </NavLink>
        </div>
      </div>
    </section>
  )
}
