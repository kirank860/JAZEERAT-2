import { useState, useEffect, forwardRef } from 'react'
import { supabase } from '../lib/supabase'
import WeldingCanvas from './WeldingCanvas'

/**
 * VideoHero — reusable section wrapper with video background and dark scrim.
 *
 * Props:
 *  - videoSrc   : path to the .mp4 file
 *  - poster     : path to the placeholder image to load instantly
 *  - showSparks : boolean to enable the welding canvas (default: false)
 *  - className  : classes for padding/layout
 *  - pageKey    : optional key to fetch dynamic media from Supabase ('about', 'services', etc.)
 *  - children   : the text/button content
 */
const VideoHero = forwardRef(({
  videoSrc = '/assets/about-hero.mp4',
  poster = '/assets/slides/slide-1.webp',
  showSparks = false,
  className = '',
  pageKey,
  children,
}, ref) => {
  const [mediaUrl, setMediaUrl] = useState(videoSrc)
  const [isImage, setIsImage] = useState(false)

  useEffect(() => {
    async function loadHeroAsset() {
      if (!pageKey) return
      const { data, error } = await supabase.from('hero_assets').select('*').eq('page_key', pageKey).single()
      if (!error && data && data.asset_url) {
        setMediaUrl(data.asset_url)
        setIsImage(data.asset_type === 'image')
      }
    }
    loadHeroAsset()
  }, [pageKey])

  return (
    <section ref={ref} className={`relative w-full overflow-hidden ${className}`}>
      {/* ── LAYER 1: background video or image ── */}
      {isImage ? (
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={mediaUrl}
          alt="Hero Background"
        />
      ) : (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={mediaUrl}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => { e.target.style.display = 'none' }}
        />
      )}

      {/* ── LAYER 2: dark gradient scrim for text readability ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/65 via-graphite/45 to-graphite/88 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite/55 via-transparent to-transparent pointer-events-none" />

      {/* ── LAYER 3: optional welding spark canvas ── */}
      {showSparks && (
        <div className="absolute inset-0 z-[1]">
          <WeldingCanvas />
        </div>
      )}

      {/* ── LAYER 4: blueprint grid overlay ── */}
      <div className="absolute inset-0 bp-grid opacity-15 pointer-events-none z-[2]" />

      {/* ── LAYER 5: page content (padding defined by className) ── */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
})

export default VideoHero
