import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    // Prevent the browser from automatically restoring the scroll position on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    // Force scroll to top on route change or initial load
    window.scrollTo(0, 0)
  }, [pathname])

  // Extra precaution: scroll to top just before the page unloads/refreshes
  useEffect(() => {
    const onBeforeUnload = () => {
      window.scrollTo(0, 0)
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [])

  return null
}
