export default function Logo({ className = '', showText = true, variant = 'light', stacked = false }) {
  // Using the exact logo.png provided by the user in the public folder.
  // The 'stacked', 'variant', and 'showText' props are kept for API compatibility with existing code,
  // but since we are using a static image, the logo will always look exactly as provided.
  
  return (
    <img
      src="/logo.png"
      alt="Jazeerat Al Hadeed Logo"
      className={`${className} object-contain`}
    />
  )
}
