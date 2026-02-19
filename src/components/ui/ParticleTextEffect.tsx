import { useEffect, useRef } from "react"

interface Vector2D { x: number; y: number }

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }
  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  particleSize = 10
  isKilled = false
  startColor = { r: 0, g: 0, b: 0 }
  targetColor = { r: 0, g: 0, b: 0 }
  colorWeight = 0
  colorBlendRate = 0.01

  move() {
    let proximityMult = 1
    const distance = Math.sqrt(
      Math.pow(this.pos.x - this.target.x, 2) +
      Math.pow(this.pos.y - this.target.y, 2)
    )
    if (distance < this.closeEnoughTarget) proximityMult = distance / this.closeEnoughTarget
    const towards = { x: this.target.x - this.pos.x, y: this.target.y - this.pos.y }
    const mag = Math.sqrt(towards.x ** 2 + towards.y ** 2)
    if (mag > 0) {
      towards.x = (towards.x / mag) * this.maxSpeed * proximityMult
      towards.y = (towards.y / mag) * this.maxSpeed * proximityMult
    }
    const steer = { x: towards.x - this.vel.x, y: towards.y - this.vel.y }
    const steerMag = Math.sqrt(steer.x ** 2 + steer.y ** 2)
    if (steerMag > 0) {
      steer.x = (steer.x / steerMag) * this.maxForce
      steer.y = (steer.y / steerMag) * this.maxForce
    }
    this.acc.x += steer.x; this.acc.y += steer.y
    this.vel.x += this.acc.x; this.vel.y += this.acc.y
    this.pos.x += this.vel.x; this.pos.y += this.vel.y
    this.acc.x = 0; this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1.0)
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight)
    const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight)
    const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight)
    ctx.fillStyle = `rgb(${r},${g},${b})`
    ctx.fillRect(this.pos.x, this.pos.y, 2.5, 2.5)
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const dir = { x: Math.random() * width - width / 2, y: Math.random() * height - height / 2 }
      const m = Math.sqrt(dir.x ** 2 + dir.y ** 2)
      const mag = (width + height) / 2
      this.target.x = width / 2 + (dir.x / m) * mag
      this.target.y = height / 2 + (dir.y / m) * mag
      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 0, g: 0, b: 0 }
      this.colorWeight = 0
      this.isKilled = true
    }
  }
}

// Brand palette — one colour per word
// WEBSITES  → brand orange
// SYSTEMS   → deep purple
// AUTOMATION → mid purple / lavender  
// RESULTS   → pure white (arrival)
const WORD_COLORS = [
  { r: 249, g: 115, b: 22  },  // orange
  { r: 109, g: 40,  b: 217 },  // deep purple
  { r: 139, g: 92,  b: 246 },  // mid purple
  { r: 255, g: 255, b: 255 },  // white — final word, clean arrival
]

const WORDS = ["WEBSITES", "SYSTEMS", "AUTOMATION", "WE DO IT ALL"]
const PIXEL_STEPS = 5

interface ParticleTextEffectProps {
  onComplete?: () => void  // called after last word hold
  className?: string
}

export function ParticleTextEffect({ onComplete, className = "" }: ParticleTextEffectProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const rafRef       = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const frameRef     = useRef(0)
  const wordIdxRef   = useRef(0)
  const completedRef = useRef(false)

  // How long each word stays after forming (frames at ~60fps)
  // Each word: quick form (~40 frames) + hold 180 frames = 220 total (~3.6 seconds per word)
  const HOLD_FRAMES = [180, 180, 180, 150]

  const spawnFromEdge = (canvas: HTMLCanvasElement): Vector2D => {
    const edge = Math.floor(Math.random() * 4)
    switch (edge) {
      case 0: return { x: Math.random() * canvas.width, y: -20 }
      case 1: return { x: canvas.width + 20, y: Math.random() * canvas.height }
      case 2: return { x: Math.random() * canvas.width, y: canvas.height + 20 }
      default: return { x: -20, y: Math.random() * canvas.height }
    }
  }

  const showWord = (word: string, canvas: HTMLCanvasElement, colorIndex: number) => {
    const offscreen = document.createElement("canvas")
    offscreen.width  = canvas.width
    offscreen.height = canvas.height
    const octx = offscreen.getContext("2d")!

    // Bold, large — fills the canvas width
    const fontSize = Math.min(canvas.width * 0.16, 130)
    octx.fillStyle    = "white"
    octx.font         = `900 ${fontSize}px 'Inter', 'Helvetica Neue', Arial, sans-serif`
    octx.textAlign    = "center"
    octx.textBaseline = "middle"
    octx.fillText(word, canvas.width / 2, canvas.height / 2)

    const imageData = octx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels    = imageData.data
    const newColor  = WORD_COLORS[colorIndex % WORD_COLORS.length]
    const particles = particlesRef.current
    let pIdx = 0

    const coords: number[] = []
    for (let i = 0; i < pixels.length; i += PIXEL_STEPS * 4) coords.push(i)
    // Shuffle for fluid assembly
    for (let i = coords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coords[i], coords[j]] = [coords[j], coords[i]]
    }

    for (const ci of coords) {
      if (pixels[ci + 3] > 0) {
        const x = (ci / 4) % canvas.width
        const y = Math.floor(ci / 4 / canvas.width)
        let p: Particle
        if (pIdx < particles.length) {
          p = particles[pIdx]; p.isKilled = false; pIdx++
        } else {
          p = new Particle()
          const spawn = spawnFromEdge(canvas)
          p.pos.x = spawn.x; p.pos.y = spawn.y
          p.maxSpeed     = Math.random() * 14 + 10
          p.maxForce     = p.maxSpeed * 0.12
          p.particleSize = Math.random() * 3 + 3
          p.colorBlendRate = Math.random() * 0.06 + 0.03
          particles.push(p)
        }
        p.startColor = {
          r: p.startColor.r + (p.targetColor.r - p.startColor.r) * p.colorWeight,
          g: p.startColor.g + (p.targetColor.g - p.startColor.g) * p.colorWeight,
          b: p.startColor.b + (p.targetColor.b - p.startColor.b) * p.colorWeight,
        }
        p.targetColor = newColor
        p.colorWeight = 0
        p.target.x = x; p.target.y = y
      }
    }
    for (let i = pIdx; i < particles.length; i++) particles[i].kill(canvas.width, canvas.height)
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    // Motion blur trail — lighter for smoother look
    ctx.fillStyle = "rgba(5, 5, 8, 0.08)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const particles = particlesRef.current
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.move(); p.draw(ctx)
      if (p.isKilled && (
        p.pos.x < -30 || p.pos.x > canvas.width + 30 ||
        p.pos.y < -30 || p.pos.y > canvas.height + 30
      )) particles.splice(i, 1)
    }

    frameRef.current++
    const holdFrames = HOLD_FRAMES[wordIdxRef.current]

    if (frameRef.current >= holdFrames) {
      frameRef.current = 0
      const nextIdx = wordIdxRef.current + 1

      if (nextIdx >= WORDS.length) {
        // All words shown — hold the last one then trigger completion
        if (!completedRef.current) {
          completedRef.current = true
          setTimeout(() => { onComplete?.() }, 600)
        }
      } else {
        wordIdxRef.current = nextIdx
        showWord(WORDS[nextIdx], canvas, nextIdx)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Fill viewport
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    showWord(WORDS[0], canvas, 0)
    animate()

    const handleResize = () => {
      if (completedRef.current) return
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      showWord(WORDS[wordIdxRef.current], canvas, wordIdxRef.current)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label="Intro animation"
      aria-hidden="true"
    />
  )
}
