import { useEffect, useState } from 'react'

// Ambient detail evoking the machine workshop: a live-looking coordinate
// readout, as if pulled from a CNC plasma table mid-cut.
export default function CoordinateTicker({ className = '' }) {
  const [coords, setCoords] = useState({ x: 240.15, y: 88.2, f: 1200 })

  useEffect(() => {
    const id = setInterval(() => {
      setCoords((c) => ({
        x: +(c.x + (Math.random() - 0.5) * 6).toFixed(2),
        y: +(c.y + (Math.random() - 0.5) * 4).toFixed(2),
        f: 1150 + Math.round(Math.random() * 100),
      }))
    }, 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={`font-mono text-[11px] text-steel tracking-wider ${className}`}>
      <div className="flex gap-4">
        <span>X {coords.x.toFixed(2)}</span>
        <span>Y {coords.y.toFixed(2)}</span>
        <span>F {coords.f}mm/min</span>
      </div>
    </div>
  )
}
