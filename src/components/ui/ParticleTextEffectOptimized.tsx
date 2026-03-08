import { useCallback, useEffect, useRef, useState } from "react"
import { getDeviceCapabilities, getAnimationSettings, fpsMonitor } from "../../utils/deviceCapabilities"

interface Vector2D { 
  x: number
  y: number
}

// Optimized particle class with object pooling
class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }
  origin: Vector2D = { x: 0, y: 0 }
  
  closeEnoughTarget = 50
  maxSpeed = 12
  maxForce = 1
  particleSize = 3
  isKilled = false
  
  currentColor = { r: 0, g: 0, b: 0, a: 0 }
  targetColor = { r: 0, g: 0, b: 0, a: 255 }
  colorBlendRate = 0.08
  
  friction = 0.95
  spring = 0.4
  
  reset() {
    this.vel = { x: 0, y: 0 }
    this.acc = { x: 0, y: 0 }
    this.isKilled = false
    this.currentColor.a = 0
  }

  updatePhysics() {
    if (this.isKilled) {
      // Smooth exit physics with swirl effect
      this.vel.x *= 0.96
      this.vel.y *= 0.96
      this.pos.x += this.vel.x
      this.pos.y += this.vel.y
      // Slower fade out for smoother exit
      this.currentColor.a = Math.max(0, this.currentColor.a - 4)
      return
    }

    // Spring physics for smooth movement
    const dx = this.target.x - this.pos.x
    const dy = this.target.y - this.pos.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    // Apply spring force - increased for faster formation
    this.acc.x = dx * this.spring * 1.5
    this.acc.y = dy * this.spring * 1.5
    
    // Update velocity with friction
    this.vel.x = (this.vel.x + this.acc.x) * this.friction
    this.vel.y = (this.vel.y + this.acc.y) * this.friction
    
    // Limit velocity
    const speed = Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y)
    if (speed > this.maxSpeed) {
      this.vel.x = (this.vel.x / speed) * this.maxSpeed
      this.vel.y = (this.vel.y / speed) * this.maxSpeed
    }
    
    // Update position
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    
    // Faster color blending for clearer word formation
    const colorSpeed = dist < 10 ? 0.2 : 0.12
    this.currentColor.r += (this.targetColor.r - this.currentColor.r) * colorSpeed
    this.currentColor.g += (this.targetColor.g - this.currentColor.g) * colorSpeed
    this.currentColor.b += (this.targetColor.b - this.currentColor.b) * colorSpeed
    // Faster opacity increase for clearer visibility
    this.currentColor.a = Math.min(255, this.currentColor.a + 25)
  }

  draw(ctx: CanvasRenderingContext2D, settings: any) {
    const alpha = this.currentColor.a / 255
    
    if (alpha <= 0) return
    
    ctx.save()
    ctx.globalAlpha = alpha
    
    // Add glow effect for high-end devices
    if (settings.effects && !this.isKilled) {
      ctx.shadowBlur = 8
      ctx.shadowColor = `rgba(${Math.round(this.currentColor.r)}, ${Math.round(this.currentColor.g)}, ${Math.round(this.currentColor.b)}, 0.5)`
    }
    
    ctx.fillStyle = `rgb(${Math.round(this.currentColor.r)}, ${Math.round(this.currentColor.g)}, ${Math.round(this.currentColor.b)})`
    
    // Draw particle (circle for smoother look)
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.restore()
  }

  fadeOut() {
    if (!this.isKilled) {
      // Gentle fade out instead of explosion
      this.vel.x *= 0.5
      this.vel.y = -Math.random() * 2 - 1 // Gentle upward drift
      this.targetColor = { r: 139, g: 92, b: 246, a: 0 } // Fade to transparent purple
      this.colorBlendRate = 0.05
      this.isKilled = true
    }
  }
  
  explode(canvasWidth: number, canvasHeight: number) {
    if (!this.isKilled) {
      // More controlled exit with swirl pattern
      const centerX = canvasWidth / 2
      const centerY = canvasHeight / 2
      const angle = Math.atan2(this.pos.y - centerY, this.pos.x - centerX)
      
      // Add swirl effect
      const swirl = angle + Math.PI / 4
      const force = 8 + Math.random() * 6
      
      this.vel.x = Math.cos(swirl) * force
      this.vel.y = Math.sin(swirl) * force
      
      this.targetColor = { r: 139, g: 92, b: 246, a: 255 } // Purple flash
      this.colorBlendRate = 0.15
      this.isKilled = true
    }
  }
}

// Brand colors
const WORD_COLORS = [
  { r: 249, g: 115, b: 22, a: 255 },  // Orange
  { r: 109, g: 40,  b: 217, a: 255 }, // Deep purple
  { r: 139, g: 92,  b: 246, a: 255 }, // Mid purple
  { r: 255, g: 255, b: 255, a: 255 }, // White
]

const WORDS = ["WEBSITES", "SYSTEMS", "AUTOMATION", "WE DO IT ALL"]

interface ParticleTextEffectProps {
  onComplete?: () => void
  className?: string
}

export function ParticleTextEffect({ onComplete, className = "" }: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const particlePoolRef = useRef<Particle[]>([])
  const frameRef = useRef(0)
  const wordIdxRef = useRef(0)
  const isCompletingRef = useRef(false)
  
  const [deviceCapabilities] = useState(() => getDeviceCapabilities())
  const [animationSettings] = useState(() => getAnimationSettings(deviceCapabilities))
  
  // Skip hint state
  const [showSkipHint, setShowSkipHint] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setShowSkipHint(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Get particle from pool or create new
  const getParticle = useCallback((): Particle => {
    if (particlePoolRef.current.length > 0) {
      const p = particlePoolRef.current.pop()!
      p.reset()
      return p
    }
    return new Particle()
  }, [])

  // Return particle to pool
  const returnParticle = useCallback((particle: Particle) => {
    particle.reset()
    particlePoolRef.current.push(particle)
  }, [])

  const createTextBitmap = useCallback((text: string, canvas: HTMLCanvasElement) => {
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas')
    }
    
    const offscreen = offscreenCanvasRef.current
    offscreen.width = canvas.width
    offscreen.height = canvas.height
    const ctx = offscreen.getContext('2d', { willReadFrequently: true })!
    
    ctx.clearRect(0, 0, offscreen.width, offscreen.height)
    
    // Dynamic font sizing
    const isMobile = deviceCapabilities.hasTouch
    const baseFontSize = Math.min(canvas.width * 0.12, 120)
    const fontSize = isMobile ? baseFontSize * 0.8 : baseFontSize
    
    ctx.font = `900 ${fontSize}px 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = 'white'
    
    // Handle multi-line text
    const lines = text.split('\n')
    if (lines.length > 1) {
      const lineHeight = fontSize * 1.1
      const totalHeight = lines.length * lineHeight
      const startY = (canvas.height - totalHeight) / 2 + lineHeight / 2
      
      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, startY + index * lineHeight)
      })
    } else {
      ctx.fillText(text, canvas.width / 2, canvas.height / 2)
    }
    
    return ctx.getImageData(0, 0, canvas.width, canvas.height)
  }, [deviceCapabilities])

  const showWord = useCallback((word: string, canvas: HTMLCanvasElement, colorIndex: number) => {
    const imageData = createTextBitmap(word, canvas)
    const pixels = imageData.data
    const particles = particlesRef.current
    const color = WORD_COLORS[colorIndex % WORD_COLORS.length]
    
    // Clear old particles that are too far
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      if (p.isKilled) {
        particles.splice(i, 1)
        returnParticle(p)
      }
    }
    
    // Calculate particle positions
    const positions: Vector2D[] = []
    const pixelSteps = animationSettings.pixelSteps || 2
    
    for (let y = 0; y < canvas.height; y += pixelSteps) {
      for (let x = 0; x < canvas.width; x += pixelSteps) {
        const i = (y * canvas.width + x) * 4
        if (pixels[i + 3] > 128) { // Alpha threshold
          positions.push({ x, y })
        }
      }
    }
    
    // Shuffle for organic formation
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[positions[i], positions[j]] = [positions[j], positions[i]]
    }
    
    // Limit particle count based on device
    const maxParticles = animationSettings.particleCount || 3000
    if (positions.length > maxParticles) {
      positions.length = maxParticles
    }
    
    // Reuse or create particles
    let particleIndex = 0
    
    for (const pos of positions) {
      let particle: Particle
      
      if (particleIndex < particles.length) {
        particle = particles[particleIndex]
        particle.isKilled = false
      } else {
        particle = getParticle()
        // Spawn from edges
        const edge = Math.floor(Math.random() * 4)
        switch (edge) {
          case 0:
            particle.pos = { x: Math.random() * canvas.width, y: -50 }
            break
          case 1:
            particle.pos = { x: canvas.width + 50, y: Math.random() * canvas.height }
            break
          case 2:
            particle.pos = { x: Math.random() * canvas.width, y: canvas.height + 50 }
            break
          default:
            particle.pos = { x: -50, y: Math.random() * canvas.height }
        }
        particles.push(particle)
      }
      
      particle.target = { ...pos }
      particle.origin = { ...pos }
      particle.targetColor = { ...color }
      particle.particleSize = animationSettings.particleSize || 3
      particle.spring = 0.03 + Math.random() * 0.05 // Increased for faster formation
      particle.friction = 0.88 + Math.random() * 0.08
      particle.maxSpeed = 10 + Math.random() * 10 // Faster movement
      
      particleIndex++
    }
    
    // Gently fade excess particles for smoother transition
    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].fadeOut()
    }
  }, [createTextBitmap, animationSettings, getParticle, returnParticle])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true 
    })!
    
    // Update FPS
    fpsMonitor.update()
    
    // Clear or trail effect - lighter trail for better visibility
    if (animationSettings.trail) {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    
    // Update and draw particles
    const particles = particlesRef.current
    
    for (const particle of particles) {
      particle.updatePhysics()
      particle.draw(ctx, animationSettings)
    }
    
    frameRef.current++
    
    // Word timing - hold words for 2.5 seconds on all devices
    const holdFrames = 150 // ~2.5 seconds at 60fps
    
    if (frameRef.current >= holdFrames && !isCompletingRef.current) {
      frameRef.current = 0
      const nextIdx = wordIdxRef.current + 1
      
      if (nextIdx >= WORDS.length) {
        // Trigger completion
        if (!isCompletingRef.current) {
          isCompletingRef.current = true
          
          // Gentle fade out with staggered timing
          particles.forEach((particle, index) => {
            setTimeout(() => {
              particle.fadeOut()
            }, index * 0.5) // Stagger the fade out
          })
          
          // Complete after fade
          setTimeout(() => {
            onComplete?.()
          }, 1500)
        }
      } else {
        wordIdxRef.current = nextIdx
        const displayWord = deviceCapabilities.hasTouch && nextIdx === 3 
          ? "WE DO\nIT ALL" 
          : WORDS[nextIdx]
        showWord(displayWord, canvas, nextIdx)
      }
    }
    
    rafRef.current = requestAnimationFrame(animate)
  }, [showWord, animationSettings, deviceCapabilities, onComplete])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !animationSettings.enabled) {
      onComplete?.()
      return
    }
    
    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Re-show current word on resize
      if (!isCompletingRef.current) {
        const currentWord = deviceCapabilities.hasTouch && wordIdxRef.current === 3
          ? "WE DO\nIT ALL"
          : WORDS[wordIdxRef.current]
        showWord(currentWord, canvas, wordIdxRef.current)
      }
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    // Initialize first word
    showWord(WORDS[0], canvas, 0)
    
    // Start animation
    animate()
    
    // Touch/click to skip
    const handleInteraction = (e: Event) => {
      e.preventDefault()
      if (!isCompletingRef.current) {
        isCompletingRef.current = true
        const particles = particlesRef.current
        // Gentle fade on skip
        particles.forEach((particle) => {
          particle.fadeOut()
        })
        setTimeout(() => onComplete?.(), 600)
      }
    }
    
    canvas.addEventListener('click', handleInteraction)
    canvas.addEventListener('touchstart', handleInteraction, { passive: false })
    
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('click', handleInteraction)
      canvas.removeEventListener('touchstart', handleInteraction)
    }
  }, [animate, showWord, animationSettings, deviceCapabilities, onComplete])

  if (!animationSettings.enabled) {
    return null
  }

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className={`${className} cursor-pointer touch-none`}
        style={{ 
          willChange: 'transform',
          contain: 'layout style paint'
        }}
        aria-label="Intro animation - click or tap to skip"
      />
      
      {/* Skip hint */}
      {showSkipHint && !isCompletingRef.current && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none animate-fadeIn">
          <p className="text-white/40 text-sm font-inter">
            {deviceCapabilities.hasTouch ? 'Tap to skip' : 'Click or press ESC to skip'}
          </p>
        </div>
      )}
    </div>
  )
}