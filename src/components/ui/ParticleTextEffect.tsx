import { useEffect, useRef } from "react"

interface Vector2D { x: number; y: number }

// Solid fill word animation - words fill in smoothly without pixels
class WordFiller {
  ctx: CanvasRenderingContext2D
  word: string
  fontSize: number
  progress: number = 0
  targetProgress: number = 1
  color: { r: number; g: number; b: number }
  
  constructor(ctx: CanvasRenderingContext2D, word: string, fontSize: number, color: { r: number; g: number; b: number }) {
    this.ctx = ctx
    this.word = word
    this.fontSize = fontSize
    this.color = color
  }
  
  update(): boolean {
    // Smooth easing
    this.progress += (this.targetProgress - this.progress) * 0.04
    return Math.abs(this.targetProgress - this.progress) < 0.001
  }
  
  draw() {
    const { ctx, word, fontSize, progress, color } = this
    
    // Calculate width for clipping
    const metrics = ctx.measureText(word)
    const wordWidth = metrics.width
    const x = (ctx.canvas.width - wordWidth) / 2
    const y = ctx.canvas.height / 2
    
    // Draw filled word (clipped from left)
    ctx.save()
    ctx.beginPath()
    ctx.rect(x - 20, y - fontSize, (wordWidth + 40) * progress, fontSize * 2)
    ctx.clip()
    
    ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`
    ctx.font = `900 ${fontSize}px 'Inter', 'Helvetica Neue', Arial, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(word, ctx.canvas.width / 2, y)
    
    ctx.restore()
  }
  
  isComplete(): boolean {
    return this.progress > 0.99
  }
}

const WORD_COLORS = [
  { r: 249, g: 115, b: 22  },  // orange
  { r: 109, g: 40,  b: 217 },  // deep purple
  { r: 139, g: 92,  b: 246 },  // mid purple
  { r: 255, g: 255, b: 255 },  // white
]

const WORDS = ["WEBSITES", "SYSTEMS", "AUTOMATION", "WE DO IT ALL"]

interface ParticleTextEffectProps {
  onComplete?: () => void
  className?: string
}

export function ParticleTextEffect({ onComplete, className = "" }: ParticleTextEffectProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const rafRef       = useRef<number>(0)
  const wordFillerRef = useRef<WordFiller | null>(null)
  const frameRef     = useRef(0)
  const wordIdxRef   = useRef(0)
  const completedRef = useRef(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const HOLD_FRAMES = [120, 120, 120, 150]

  const startRecording = () => {
    const canvas = canvasRef.current
    if (!canvas || mediaRecorderRef.current) return
    
    const stream = canvas.captureStream(60)
    const recorder = new MediaRecorder(stream, { 
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 8000000
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
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current = null
    }
  }

  const showWord = (word: string, canvas: HTMLCanvasElement, colorIndex: number) => {
    const ctx = canvas.getContext("2d")!
    const isMobile = canvas.width < 640
    const fontSize = isMobile 
      ? Math.min(canvas.width * 0.1, 48)
      : Math.min(canvas.width * 0.14, 130)
    
    wordFillerRef.current = new WordFiller(
      ctx, 
      word, 
      fontSize, 
      WORD_COLORS[colorIndex % WORD_COLORS.length]
    )
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    // Clear with background color
    ctx.fillStyle = "#050508"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw word filler
    if (wordFillerRef.current) {
      const isDone = wordFillerRef.current.update()
      wordFillerRef.current.draw()
      
      // Auto-advance when word is complete
      if (isDone && frameRef.current > 20) {
        frameRef.current = -1 // Will increment to 0 next frame
      }
    }

    frameRef.current++
    const holdFrames = HOLD_FRAMES[wordIdxRef.current]

    if (frameRef.current >= holdFrames) {
      frameRef.current = 0
      const nextIdx = wordIdxRef.current + 1

      if (nextIdx >= WORDS.length) {
        if (!completedRef.current) {
          completedRef.current = true
          // Exit animation - fade out
          setTimeout(() => { onComplete?.() }, 800)
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
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        if (!mediaRecorderRef.current) startRecording()
        else stopRecording()
      }
    }
    
    window.addEventListener("resize", handleResize)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeyDown)
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
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
