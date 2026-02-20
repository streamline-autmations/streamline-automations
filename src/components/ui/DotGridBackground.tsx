import { useEffect, useRef } from 'react'

type Accent = 'purple' | 'amber'

type Activation = {
  x: number
  y: number
  start: number
  life: number
  strength: number
  color: Accent
}

const PURPLE: [number, number, number] = [139, 92, 246]
const AMBER: [number, number, number] = [249, 115, 22]
const WHITE: [number, number, number] = [255, 255, 255]

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const stateRef = useRef({
    w: 0,
    h: 0,
    dpr: 1,
    activations: [] as Activation[],
    lastInteract: 0,
    lastPointer: { x: 0, y: 0, has: false },
    lastScrollY: 0,
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

    const addActivation = (x: number, y: number, strength: number, life: number, color: Accent) => {
      const s = stateRef.current
      const now = performance.now()
      s.lastInteract = now
      s.activations.push({ x, y, start: now, life, strength, color })
      if (s.activations.length > 80) s.activations.splice(0, s.activations.length - 80)
    }

    const onPointerMove = (e: PointerEvent) => {
      const s = stateRef.current
      s.lastPointer = { x: e.clientX, y: e.clientY, has: true }
      addActivation(e.clientX, e.clientY, 0.55, 420, 'purple')
    }

    const onPointerDown = (e: PointerEvent) => {
      const color: Accent = Math.random() < 0.22 ? 'amber' : 'purple'
      addActivation(e.clientX, e.clientY, 1.1, 900, color)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return
      const t = e.touches[0]
      const s = stateRef.current
      s.lastPointer = { x: t.clientX, y: t.clientY, has: true }
      addActivation(t.clientX, t.clientY, 0.45, 420, 'purple')
    }

    const onScroll = () => {
      const s = stateRef.current
      const y = window.scrollY || 0
      const dy = Math.abs(y - (s.lastScrollY || 0))
      s.lastScrollY = y
      if (dy < 2) return
      const x = s.lastPointer.has ? s.lastPointer.x : Math.random() * (s.w || window.innerWidth)
      const cy = s.lastPointer.has ? s.lastPointer.y : ((y * 0.4) % (s.h || window.innerHeight))
      addActivation(x, cy, 0.5, 520, 'purple')
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    let raf = 0
    let lastIdlePulse = 0

    const render = () => {
      const s = stateRef.current
      const now = performance.now()
      const w = s.w || window.innerWidth
      const h = s.h || window.innerHeight

      const activations = s.activations
      for (let i = activations.length - 1; i >= 0; i--) {
        if (now - activations[i].start > activations[i].life) activations.splice(i, 1)
      }

      const idle = now - s.lastInteract > 1200
      if (!reduced && idle && now - lastIdlePulse > 190) {
        lastIdlePulse = now
        const x = Math.random() * w
        const y = Math.random() * h
        const color: Accent = Math.random() < 0.18 ? 'amber' : 'purple'
        addActivation(x, y, 0.35 + Math.random() * 0.25, 700 + Math.random() * 500, color)
      }

      ctx.clearRect(0, 0, w, h)

      const gap = Math.max(22, Math.min(42, Math.round(w / 38)))
      const baseR = w < 480 ? 0.9 : 1.05
      const maxGrow = w < 480 ? 4.4 : 3.8
      const influenceRadius = w < 480 ? 140 : 120
      const invTwoSigma2 = 1 / (2 * influenceRadius * influenceRadius)
      const drift = !reduced && idle ? 1 : 0
      const ox = drift ? Math.sin(now / 6500) * 6 : 0
      const oy = drift ? Math.cos(now / 7200) * 6 : 0

      for (let y = -gap; y <= h + gap; y += gap) {
        for (let x = -gap; x <= w + gap; x += gap) {
          const px = x + ox
          const py = y + oy

          let intensity = 0
          let pW = 0
          let aW = 0

          for (let i = 0; i < activations.length; i++) {
            const a = activations[i]
            const age = now - a.start
            const t = 1 - age / a.life
            const dx = px - a.x
            const dy = py - a.y
            const d2 = dx * dx + dy * dy
            const falloff = Math.exp(-d2 * invTwoSigma2)
            const sV = a.strength * t * falloff
            intensity += sV
            if (a.color === 'purple') pW += sV
            else aW += sV
          }

          const iC = clamp(intensity, 0, 1.25)
          const r = baseR + iC * maxGrow
          const alpha = clamp(0.11 + iC * 0.62, 0.06, 0.78)

          let cr = WHITE[0], cg = WHITE[1], cb = WHITE[2]
          const wSum = pW + aW
          if (wSum > 0.001) {
            const t = clamp(aW / wSum, 0, 1)
            cr = Math.round(PURPLE[0] * (1 - t) + AMBER[0] * t)
            cg = Math.round(PURPLE[1] * (1 - t) + AMBER[1] * t)
            cb = Math.round(PURPLE[2] * (1 - t) + AMBER[2] * t)
          }

          ctx.beginPath()
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`
          ctx.arc(px, py, r, 0, Math.PI * 2)
          ctx.fill()

          if (iC > 0.22) {
            const glowA = clamp((iC - 0.18) * 0.35, 0.02, 0.22)
            ctx.beginPath()
            ctx.fillStyle = `rgba(${cr},${cg},${cb},${glowA})`
            ctx.arc(px, py, r * 2.6, 0, Math.PI * 2)
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
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('scroll', onScroll)
      prefersReduced?.removeEventListener?.('change', onReduced)
    }
  }, [])

  return <canvas ref={canvasRef} className="dotgrid-canvas" aria-hidden="true" />
}
