import { useEffect, useRef } from 'react'

/* ─── WeldingCanvas: live spark/particle animation (OPTIMIZED) ───
   Simulates a CNC plasma cutter arc moving across a steel plate.
   Optimized for performance: removed shadowBlur, reduced particle count.
──────────────────────────────────────────────────────────────── */
export default function WeldingCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width, height, raf
    const sparks = []
    const arcPoints = []
    let arcX = 0
    let arcDir = 1
    let arcSpeed = 0.6
    let t = 0

    function resize() {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      arcX = width * 0.15
    }

    class Spark {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = (Math.random() - 0.5) * 4
        this.vy = -(Math.random() * 4 + 1)
        this.life = 1
        this.decay = Math.random() * 0.04 + 0.02 // Faster decay
        this.size = Math.random() * 2 + 0.5
        this.hue = Math.random() > 0.5 ? 20 : 45
      }
      update() {
        this.vy += 0.15 // Gravity
        this.vx *= 0.96 // Friction
        this.x += this.vx
        this.y += this.vy
        this.life -= this.decay
      }
      draw(ctx) {
        // Removed expensive shadowBlur. Using simple opacity instead.
        ctx.globalAlpha = Math.max(0, this.life)
        ctx.fillStyle = `hsl(${this.hue}, 100%, ${65 + (1 - this.life) * 25}%)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, Math.max(0, this.size * this.life), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function spawnSparks(x, y, count = 2) {
      for (let i = 0; i < count; i++) sparks.push(new Spark(x, y))
    }

    // Pre-create the gradient to avoid doing it every frame
    let arcGradient = null
    function getArcGradient(x, y) {
      // Recreate only if the center changes significantly, but since x,y move constantly,
      // creating it per frame is okay if we drop shadowBlur.
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 32)
      grad.addColorStop(0, 'rgba(255,255,240,1)')
      grad.addColorStop(0.15, 'rgba(255,200,40,0.8)')
      grad.addColorStop(0.4, 'rgba(255,90,31,0.4)')
      grad.addColorStop(1, 'rgba(255,90,31,0)')
      return grad
    }

    function drawArc(x, y) {
      ctx.globalAlpha = 1
      ctx.fillStyle = getArcGradient(x, y)
      // Removed shadowBlur = 40
      ctx.beginPath()
      ctx.arc(x, y, 32, 0, Math.PI * 2)
      ctx.fill()
    }

    function drawTrail() {
      // Draw as a single continuous path for much better performance
      if (arcPoints.length < 2) return
      ctx.globalAlpha = 0.4
      ctx.strokeStyle = '#ff5a1f'
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      ctx.beginPath()
      ctx.moveTo(arcPoints[0].x, arcPoints[0].y)
      for (let i = 1; i < arcPoints.length; i++) {
        ctx.lineTo(arcPoints[i].x, arcPoints[i].y)
      }
      ctx.stroke()
    }

    function drawGrid() {
      ctx.strokeStyle = 'rgba(139,146,154,0.06)'
      ctx.lineWidth = 0.5
      const step = 40
      ctx.beginPath()
      for (let x = 0; x < width; x += step) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height)
      }
      for (let y = 0; y < height; y += step) {
        ctx.moveTo(0, y); ctx.lineTo(width, y)
      }
      ctx.stroke()
    }

    function loop() {
      ctx.clearRect(0, 0, width, height)
      drawGrid()

      t += 0.007
      arcX += arcSpeed * arcDir
      if (arcX > width * 0.9) arcDir = -1
      if (arcX < width * 0.1) arcDir = 1
      const arcY = height * 0.42 + Math.sin(t * 2) * height * 0.1

      arcPoints.push({ x: arcX, y: arcY })
      if (arcPoints.length > 30) arcPoints.shift() // Reduced trail length from 80 to 30

      drawTrail()
      drawArc(arcX, arcY)

      // Drastically reduced spawn rates
      if (Math.random() < 0.25) spawnSparks(arcX, arcY, Math.floor(Math.random() * 2 + 1))
      if (Math.random() < 0.05) spawnSparks(arcX, arcY, 5)

      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update()
        sparks[i].draw(ctx)
        if (sparks[i].life <= 0) sparks.splice(i, 1)
      }

      // Reset alpha for next frame clearing
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    loop()

    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
