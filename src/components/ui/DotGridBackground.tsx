import { useEffect, useRef } from 'react'

type Activation = {
  x: number
  y: number
  start: number
  life: number
  strength: number
  isDragging?: boolean
}

const PURPLE: [number, number, number] = [119, 76, 252]

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
// Smoother easing function for more elegant transitions
const smooth01 = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const stateRef = useRef({
    w: 0,
    h: 0,
    dpr: 1,
    activations: [] as Activation[],
    lastPointer: { x: 0, y: 0, has: false },
    activeTouchId: null as number | null,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    let reduced = !!prefersReduced?.matches
    const onReduced = () => { reduced = !!prefersReduced?.matches }
    prefersReduced?.addEventListener?.('change', onReduced)

    const resize = () => {
      const s = stateRef.current
      const w = window.innerWidth
      const h = window.innerHeight
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      s.w = w
      s.h = h
      s.dpr = dpr
    }

    const addActivation = (x: number, y: number, strength: number, life: number, isDragging = false) => {
      const s = stateRef.current
      const now = performance.now()
      
      // If dragging, update the existing drag activation instead of adding a new one
      if (isDragging) {
        const existingDrag = s.activations.find(a => a.isDragging);
        if (existingDrag) {
          existingDrag.x = x;
          existingDrag.y = y;
          existingDrag.start = now; // Refresh life
          return;
        }
      }
      
      s.activations.push({ x, y, start: now, life, strength, isDragging })
      // Keep array size manageable
      if (s.activations.length > 20) s.activations.splice(0, s.activations.length - 20)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // Handled by touch events
      if (reduced) return;
      // Lower strength for mouse hover (0.10 -> 0.05)
      addActivation(e.clientX, e.clientY, 0.05, 1200)
    }

    // Touch Handling for Mobile Drag
    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches.length) return
      const t = e.touches[0]
      stateRef.current.activeTouchId = t.identifier
      // Initial tap strength reduced (0.62 -> 0.3) for less harshness
      // Life increased (1500 -> 2500) for smoother fade
      addActivation(t.clientX, t.clientY, 0.3, 2500, true)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return
      // Prevent scrolling while dragging the effect
      // e.preventDefault() // Optional: might block scrolling too much
      
      const t = Array.from(e.touches).find(t => t.identifier === stateRef.current.activeTouchId) || e.touches[0]
      addActivation(t.clientX, t.clientY, 0.3, 2500, true)
    }

    const onTouchEnd = () => {
      const s = stateRef.current
      s.activeTouchId = null
      // Remove drag flag so it fades out naturally
      const dragActivation = s.activations.find(a => a.isDragging)
      if (dragActivation) {
        dragActivation.isDragging = false
        dragActivation.start = performance.now() // Reset start time for full fade-out duration
      }
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    
    // Use passive: false for touchmove if we want to prevent default scrolling (optional)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })

    let raf = 0

    const render = () => {
      const s = stateRef.current
      const now = performance.now()
      const w = s.w || window.innerWidth
      const h = s.h || window.innerHeight

      const activations = s.activations
      // Clean up old activations
      for (let i = activations.length - 1; i >= 0; i--) {
        const a = activations[i]
        // If dragging, it stays alive
        if (a.isDragging) {
            a.start = now; 
        } else if (now - a.start > a.life) {
            activations.splice(i, 1)
        }
      }

      ctx.clearRect(0, 0, w, h)

      // Grid settings
      const gap = Math.max(22, Math.min(44, Math.round(w / 34)))
      const isMobile = w < 768
      
      // Adjusted sizes for "proximity" effect
      const baseR = isMobile ? 0.85 : 0.95
      // Max grow increased slightly for the "bigger dots" effect requested
      const maxGrow = isMobile ? 3.5 : 2.5 
      
      // Reduced brightness/opacity constants by ~50% as requested
      const baseAlpha = isMobile ? 0.025 : 0.04 
      const activeAlphaMax = isMobile ? 0.25 : 0.22 
      
      // Influence radius
      const influenceRadius = isMobile ? 220 : 180 

      for (let y = -gap; y <= h + gap; y += gap) {
        for (let x = -gap; x <= w + gap; x += gap) {
          const px = x
          const py = y

          let intensity = 0
          for (let i = 0; i < activations.length; i++) {
            const a = activations[i]
            // Calculate age factor
            const age = now - a.start
            const lifeProgress = 1 - age / a.life
            
            // Use smooth easing for fade out
            const t = smooth01(clamp(lifeProgress, 0, 1))
            
            // Distance calculation
            const dx = px - a.x
            const dy = py - a.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            
            // Proximity falloff - Gaussian-ish
            if (dist < influenceRadius) {
                const proximityFactor = 1 - smooth01(dist / influenceRadius)
                intensity += a.strength * t * proximityFactor
            }
          }

          const iC = clamp(intensity, 0, 1)
          
          // Size calculation: grow dots based on intensity
          const r = baseR + (iC * maxGrow)
          
          // Alpha calculation: fade in based on intensity
          const alpha = clamp(baseAlpha + iC * activeAlphaMax, 0.02, activeAlphaMax)

          const cr = PURPLE[0]
          const cg = PURPLE[1]
          const cb = PURPLE[2]

          ctx.beginPath()
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`
          ctx.arc(px, py, r, 0, Math.PI * 2)
          ctx.fill()
          
          // Optional: Subtle glow for very active dots, but much softer now
          if (iC > 0.2) {
            const glowA = clamp((iC - 0.2) * 0.05, 0, 0.03)
            ctx.beginPath()
            ctx.fillStyle = `rgba(${cr},${cg},${cb},${glowA})`
            ctx.arc(px, py, r * 2.5, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      prefersReduced?.removeEventListener?.('change', onReduced)
    }
  }, [])

  return <canvas ref={canvasRef} className="dotgrid-canvas" aria-hidden="true" />
}
