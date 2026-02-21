import { useEffect, useRef } from 'react'

type Accent = 'purple' | 'orange'

type Activation = {
  x: number
  y: number
  start: number
  life: number
  strength: number
  color: Accent
}

const PURPLE: [number, number, number] = [139, 92, 246]
const ORANGE: [number, number, number] = [240, 85, 35]
const WHITE: [number, number, number] = [230, 220, 255]

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const smooth01 = (t: number) => t * t * (3 - 2 * t)

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
      const now = performance.now()
      if (now - s.lastMoveAdd < 26) return
      s.lastMoveAdd = now
      addActivation(e.clientX, e.clientY, 0.22, 1400, 'purple')
    }

    const onPointerDown = (e: PointerEvent) => {
      const color: Accent = Math.random() < 0.10 ? 'orange' : 'purple'
      addActivation(e.clientX, e.clientY, 0.55, 2000, color)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return
      const t = e.touches[0]
      const s = stateRef.current
      s.lastPointer = { x: t.clientX, y: t.clientY, has: true }
      const now = performance.now()
      if (now - s.lastMoveAdd < 26) return
      s.lastMoveAdd = now
      addActivation(t.clientX, t.clientY, 0.22, 1400, 'purple')
    }

    const onScroll = () => {
      const s = stateRef.current
      const y = window.scrollY || 0
      const dy = Math.abs(y - (s.lastScrollY || 0))
      s.lastScrollY = y
      if (dy < 2) return
      const x = s.lastPointer.has ? s.lastPointer.x : Math.random() * (s.w || window.innerWidth)
      const cy = s.lastPointer.has ? s.lastPointer.y : ((y * 0.4) % (s.h || window.innerHeight))
      addActivation(x, cy, 0.22, 1500, 'purple')
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
      if (!reduced && idle && now - lastIdlePulse > 900) {
        lastIdlePulse = now
        const x = Math.random() * w
        const y = Math.random() * h
        const color: Accent = Math.random() < 0.10 ? 'orange' : 'purple'
        const dx = (Math.random() - 0.5) * 22
        const dy = (Math.random() - 0.5) * 22
        const strength = 0.42 + Math.random() * 0.14
        addActivation(x, y, strength, 2000, color)
        addActivation(x + dx, y + dy, strength * 0.72, 1800, color)
      }

      ctx.clearRect(0, 0, w, h)

      const gap = Math.max(22, Math.min(42, Math.round(w / 38)))
      const baseR = w < 480 ? 0.95 : 1.05
      const maxGrow = w < 480 ? 2.0 : 1.6
      const influenceRadius = w < 480 ? 125 : 110
      const invTwoSigma2 = 1 / (2 * influenceRadius * influenceRadius)
      const drift = !reduced && idle ? 1 : 0
      const ox = drift ? Math.sin(now / 12000) * 6 : 0
      const oy = drift ? Math.cos(now / 11000) * 6 : 0
      const hoverRadius = gap * (w < 480 ? 3.2 : 3.4)
      const hoverGridRadius = 3
      const hoverGrow = w < 480 ? 1.55 : 1.28
      const hoverAlphaAdd = 0.16
      const cursorX = s.lastPointer.has ? s.lastPointer.x : -99999
      const cursorY = s.lastPointer.has ? s.lastPointer.y : -99999
      const cix = s.lastPointer.has ? Math.round(cursorX / gap) : 0
      const ciy = s.lastPointer.has ? Math.round(cursorY / gap) : 0

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

          let hover = 0
          if (s.lastPointer.has) {
            const ix = Math.round(px / gap)
            const iy = Math.round(py / gap)
            const dxI = Math.abs(ix - cix)
            const dyI = Math.abs(iy - ciy)
            if (dxI <= hoverGridRadius && dyI <= hoverGridRadius) {
              const dx = px - cursorX
              const dy = py - cursorY
              const d = Math.hypot(dx, dy)
              const t = clamp(1 - d / hoverRadius, 0, 1)
              hover = smooth01(t)
            }
          }

          const iC = clamp(intensity, 0, 0.85)
          const r = baseR + iC * maxGrow + hover * hoverGrow
          const alpha = clamp(0.12 + iC * 0.30 + hover * hoverAlphaAdd, 0.08, 0.42)

          let cr = WHITE[0], cg = WHITE[1], cb = WHITE[2]
          const baseTint = 0.25
          cr = Math.round(cr * (1 - baseTint) + PURPLE[0] * baseTint)
          cg = Math.round(cg * (1 - baseTint) + PURPLE[1] * baseTint)
          cb = Math.round(cb * (1 - baseTint) + PURPLE[2] * baseTint)
          const wSum = pW + aW
          if (wSum > 0.001) {
            const t = clamp(aW / wSum, 0, 1)
            cr = Math.round(PURPLE[0] * (1 - t) + ORANGE[0] * t)
            cg = Math.round(PURPLE[1] * (1 - t) + ORANGE[1] * t)
            cb = Math.round(PURPLE[2] * (1 - t) + ORANGE[2] * t)
          }
          if (hover > 0) {
            const t = clamp(hover * 0.65, 0, 0.65)
            cr = Math.round(cr * (1 - t) + PURPLE[0] * t)
            cg = Math.round(cg * (1 - t) + PURPLE[1] * t)
            cb = Math.round(cb * (1 - t) + PURPLE[2] * t)
          }

          ctx.beginPath()
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`
          ctx.arc(px, py, r, 0, Math.PI * 2)
          ctx.fill()

          const glowBasis = Math.max(iC * 0.8, hover * 0.65)
          if (glowBasis > 0.12) {
            const glowA = clamp((glowBasis - 0.12) * 0.12, 0.006, 0.06)
            ctx.beginPath()
            ctx.fillStyle = `rgba(${cr},${cg},${cb},${glowA})`
            ctx.arc(px, py, r * 1.85, 0, Math.PI * 2)
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
