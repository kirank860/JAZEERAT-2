import { useEffect } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'

export function useLenis() {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      // 🌊 Linear interpolation (lerp) controls scrolling smoothness
      // 0.08 is the sweet spot: silky smooth but extremely responsive
      lerp: 0.08,
      
      // Orientation configuration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      
      // Mouse wheel settings
      smoothWheel: true,
      wheelMultiplier: 1.0, // Standard scroll speed
      
      // Touch/mobile device settings
      // syncTouch: false uses high-performance native momentum scrolling on mobile
      // to keep inputs responsive. Set to true if scroll-linked animations require
      // strict sync on mobile trackpads/screens.
      syncTouch: false,
      touchMultiplier: 1.0,
      
      infinite: false,
    })

    // Sync Lenis scroll tick with requestAnimationFrame loop
    let rafId
    function loop(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    // Scroll back to top on page change
    window.scrollTo(0, 0)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [pathname]) // re-init on route change so scroll resets cleanly
}
