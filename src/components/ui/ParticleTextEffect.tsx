import { useCallback, useEffect, useRef } from "react"

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
  colorBlendRate = 0.02 // Increased blend rate for faster color transition

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
      // Increased speed multiplier for faster formation
      towards.x = (towards.x / mag) * this.maxSpeed * proximityMult * 1.5
      towards.y = (towards.y / mag) * this.maxSpeed * proximityMult * 1.5
    }
    const steer = { x: towards.x - this.vel.x, y: towards.y - this.vel.y }
    const steerMag = Math.sqrt(steer.x ** 2 + steer.y ** 2)
    if (steerMag > 0) {
      // Increased force for snappier movement
      steer.x = (steer.x / steerMag) * this.maxForce * 1.5
      steer.y = (steer.y / steerMag) * this.maxForce * 1.5
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
    // Larger, more solid particles for clearer words
    ctx.fillRect(this.pos.x, this.pos.y, 4, 4)
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
// Dynamic pixel steps - will be set in component
const BASE_PIXEL_STEPS = 2  

// Reduced hold frames for faster pacing (was [135, 135, 135, 150])
const HOLD_FRAMES = [90, 90, 90, 110]

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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  // Start recording when 'R' is pressed
  const startRecording = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || mediaRecorderRef.current) return
    
    const stream = canvas.captureStream(60) // 60fps
    const recorder = new MediaRecorder(stream, { 
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 8000000 // 8Mbps high quality
    })
    
    chunksRef.current = []
    
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }
    
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'streamline-intro.webm'
      a.click()
      URL.revokeObjectURL(url)
    }
    
    recorder.start()
    mediaRecorderRef.current = recorder
    console.log('Recording started...')
  }, [])

  // Stop recording when 'R' is pressed again
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current = null
      console.log('Recording saved!')
    }
  }, [])

  const spawnFromEdge = useCallback((canvas: HTMLCanvasElement): Vector2D => {
    const edge = Math.floor(Math.random() * 4)
    switch (edge) {
      case 0: return { x: Math.random() * canvas.width, y: -20 }
      case 1: return { x: canvas.width + 20, y: Math.random() * canvas.height }
      case 2: return { x: Math.random() * canvas.width, y: canvas.height + 20 }
      default: return { x: -20, y: Math.random() * canvas.height }
    }
  }, [])

  const showWord = useCallback((word: string, canvas: HTMLCanvasElement, colorIndex: number) => {
    const offscreen = document.createElement("canvas")
    offscreen.width  = canvas.width
    offscreen.height = canvas.height
    const octx = offscreen.getContext("2d")!

    // Bold, large — fills the canvas width
    // Responsive: larger on mobile for readability
    const isMobile = canvas.width < 768 // Standard mobile breakpoint
    const fontSize = isMobile 
      ? Math.min(canvas.width * 0.15, 60)  // Mobile: Increased to 15% width, max 60px
      : Math.min(canvas.width * 0.14, 130)  // Desktop: 14% of width, max 130px
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
    // Adjust pixel steps for mobile to reduce particle count (higher steps = fewer particles)
    // LOWER steps = MORE particles = SHARPER text
    // Mobile was 3, changing to 2 for better clarity (same as base)
    const pixelSteps = isMobile ? 2 : BASE_PIXEL_STEPS
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) coords.push(i)
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
          // Smaller particles on mobile for better performance
          // Adjusted for mobile clarity: slightly larger and uniform
          const isMobile = canvas.width < 768
          p.maxSpeed     = isMobile ? Math.random() * 6 + 5 : Math.random() * 10 + 8
          p.maxForce     = p.maxSpeed * 0.1
          // Mobile size: 3.5 min + 1 random variance (tighter range for consistency)
          p.particleSize = isMobile ? Math.random() * 1 + 3.5 : Math.random() * 4 + 4
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
  }, [spawnFromEdge])

  const animate = useCallback(() => {
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
        // All words shown — trigger exit animation then completion
        if (!completedRef.current) {
          completedRef.current = true
          // Exit: particles explode outward with a swirl
          const particles = particlesRef.current
          for (const p of particles) {
            const angle = Math.atan2(p.pos.y - canvas.height/2, p.pos.x - canvas.width/2)
            // Faster explosion speed for premium feel
            const speed = Math.random() * 12 + 10
            p.target.x = p.pos.x + Math.cos(angle) * speed * 60
            p.target.y = p.pos.y + Math.sin(angle) * speed * 60
            // Flash to white/purple then fade
            p.targetColor = { r: 139, g: 92, b: 246 } // Brand purple flash
            p.colorBlendRate = 0.15 // Fast flash
          }
          // Reduced wait time before unmounting to match the faster exit
          setTimeout(() => { onComplete?.() }, 600)
        }
      } else {
        wordIdxRef.current = nextIdx
        showWord(WORDS[nextIdx], canvas, nextIdx)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [onComplete, showWord])

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
    
    // Handle 'R' key for recording
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        if (!mediaRecorderRef.current) {
          startRecording()
        } else {
          stopRecording()
        }
      }
    }
    
    window.addEventListener("resize", handleResize)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeyDown)
      // Stop any ongoing recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [animate, showWord, startRecording, stopRecording])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label="Intro animation"
      aria-hidden="true"
    />
  )
}
