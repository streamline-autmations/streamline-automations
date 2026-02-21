import { useEffect, useRef } from 'react'

type Activation = {
  x: number
  y: number
  start: number
  life: number
  strength: number
}

const PURPLE: [number, number, number] = [119, 76, 252]

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const smooth01 = (t: number) => t * t * (3 - 2 * t)

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const stateRef = useRef({
    w: 0,
    h: 0,
    dpr: 1,
    activations: [] as Activation[],
    lastPointer: { x: 0, y: 0, has: false },
    lastMoveAdd: 0,
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

    const addActivation = (x: number, y: number, strength: number, life: number) => {
      const s = stateRef.current
      const now = performance.now()
      s.activations.push({ x, y, start: now, life, strength })
      if (s.activations.length > 40) s.activations.splice(0, s.activations.length - 40)
    }

    const onPointerMove = (e: PointerEvent) => {
      const s = stateRef.current
      s.lastPointer = { x: e.clientX, y: e.clientY, has: true }
      const now = performance.now()
      if (now - s.lastMoveAdd < 46) return
      s.lastMoveAdd = now
      if (reduced) return
      addActivation(e.clientX, e.clientY, 0.10, 900)
    }

    const onPointerDown = (e: PointerEvent) => {
      addActivation(e.clientX, e.clientY, 0.60, 1500)
    }

    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches.length) return
      const t = e.touches[0]
      addActivation(t.clientX, t.clientY, 0.62, 1500)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })

    let raf = 0

    const render = () => {
      const s = stateRef.current
      const now = performance.now()
      const w = s.w || window.innerWidth
      const h = s.h || window.innerHeight

      const activations = s.activations
      for (let i = activations.length - 1; i >= 0; i--) {
        if (now - activations[i].start > activations[i].life) activations.splice(i, 1)
      }

      ctx.clearRect(0, 0, w, h)

      const gap = Math.max(22, Math.min(44, Math.round(w / 34)))
      const isMobile = w < 768
      const baseR = isMobile ? 0.85 : 0.95
      const maxGrow = isMobile ? 2.35 : 1.9
      const baseAlpha = isMobile ? 0.045 : 0.075
      const influenceRadius = isMobile ? 180 : 160
      const invTwoSigma2 = 1 / (2 * influenceRadius * influenceRadius)

      for (let y = -gap; y <= h + gap; y += gap) {
        for (let x = -gap; x <= w + gap; x += gap) {
          const px = x
          const py = y

          let intensity = 0
          for (let i = 0; i < activations.length; i++) {
            const a = activations[i]
            const age = now - a.start
            const tLife = 1 - age / a.life
            const t = smooth01(clamp(tLife, 0, 1))
            const dx = px - a.x
            const dy = py - a.y
            const d2 = dx * dx + dy * dy
            const falloff = Math.exp(-d2 * invTwoSigma2)
            intensity += a.strength * t * falloff
          }

          const iC = clamp(intensity, 0, 1)
          const r = baseR + iC * maxGrow
          const alpha = clamp(baseAlpha + iC * (isMobile ? 0.55 : 0.48), 0.03, isMobile ? 0.52 : 0.46)

          const cr = PURPLE[0]
          const cg = PURPLE[1]
          const cb = PURPLE[2]

          ctx.beginPath()
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`
          ctx.arc(px, py, r, 0, Math.PI * 2)
          ctx.fill()

          if (iC > 0.12) {
            const glowA = clamp((iC - 0.12) * 0.10, 0.006, 0.07)
            ctx.beginPath()
            ctx.fillStyle = `rgba(${cr},${cg},${cb},${glowA})`
            ctx.arc(px, py, r * 1.9, 0, Math.PI * 2)
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
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('touchstart', onTouchStart)
      prefersReduced?.removeEventListener?.('change', onReduced)
    }
  }, [])

  return <canvas ref={canvasRef} className="dotgrid-canvas" aria-hidden="true" />
}
