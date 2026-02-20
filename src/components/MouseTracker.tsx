import { useEffect } from 'react'

export default function MouseTracker() {
  useEffect(() => {
    let raf = 0, tx = window.innerWidth/2, ty = window.innerHeight/2, cx = tx, cy = ty
    const lerp = (a: number, b: number, t: number) => a + (b-a)*t
    const tick = () => {
      cx = lerp(cx, tx, 0.07); cy = lerp(cy, ty, 0.07)
      document.documentElement.style.setProperty('--mx', `${cx}px`)
      document.documentElement.style.setProperty('--my', `${cy}px`)
      raf = requestAnimationFrame(tick)
    }
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const onTouch = (e: TouchEvent) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); window.removeEventListener('touchmove', onTouch) }
  }, [])
  return null
}
