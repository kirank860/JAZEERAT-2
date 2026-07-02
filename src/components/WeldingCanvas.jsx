import { useEffect, useRef } from 'react'

/* ─── WeldingCanvas: live spark/particle animation ──────────
   Simulates a CNC plasma cutter arc moving across a steel plate
   with flying sparks, matching the Cutline and CoordinateTicker motifs.
────────────────────────────────────────────────────────────── */
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
        this.vx = (Math.random() - 0.5) * 6
        this.vy = -(Math.random() * 5 + 2)
        this.life = 1
        this.decay = Math.random() * 0.025 + 0.012
        this.size = Math.random() * 2.5 + 0.5
        this.hue = Math.random() > 0.5 ? 20 : 45
      }
      update() {
        this.vy += 0.14
        this.vx *= 0.96
        this.x += this.vx
        this.y += this.vy
        this.life -= this.decay
      }
      draw(ctx) {
        ctx.save()
        ctx.globalAlpha = Math.max(0, this.life)
        ctx.shadowBlur = 18
        ctx.shadowColor = `hsl(${this.hue},100%,70%)`
        ctx.fillStyle = `hsl(${this.hue},100%,${65 + (1 - this.life) * 25}%)`
        ctx.beginPath()
        ctx.arc(this.x, this.y, Math.max(0, this.size * this.life), 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    function spawnSparks(x, y, count = 8) {
      for (let i = 0; i < count; i++) sparks.push(new Spark(x, y))
    }

    function drawArc(x, y) {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 32)
      grad.addColorStop(0, 'rgba(255,255,240,1)')
      grad.addColorStop(0.15, 'rgba(255,200,40,0.9)')
      grad.addColorStop(0.4, 'rgba(255,90,31,0.6)')
      grad.addColorStop(1, 'rgba(255,90,31,0)')
      ctx.save()
      ctx.globalAlpha = 1
      ctx.shadowBlur = 40
      ctx.shadowColor = '#ff5a1f'
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, 32, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    function drawTrail() {
      for (let i = 0; i < arcPoints.length; i++) {
        const p = arcPoints[i]
        const alpha = (i / arcPoints.length) * 0.6
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.shadowBlur = 10
        ctx.shadowColor = '#ff5a1f'
        ctx.fillStyle = '#ff5a1f'
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    function drawGrid() {
      ctx.save()
      ctx.strokeStyle = 'rgba(139,146,154,0.06)'
      ctx.lineWidth = 0.5
      const step = 40
      for (let x = 0; x < width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
      }
      ctx.restore()
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
      if (arcPoints.length > 80) arcPoints.shift()

      drawTrail()
      drawArc(arcX, arcY)

      if (Math.random() < 0.85) spawnSparks(arcX, arcY, Math.floor(Math.random() * 6 + 3))
      if (Math.random() < 0.15) spawnSparks(arcX, arcY, 16)

      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update()
        sparks[i].draw(ctx)
        if (sparks[i].life <= 0) sparks.splice(i, 1)
      }

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
