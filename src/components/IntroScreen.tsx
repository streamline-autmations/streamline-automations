import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ParticleTextEffect } from "./ui/ParticleTextEffect"

const SESSION_KEY = "sa_intro_seen"

interface IntroScreenProps {
  children: React.ReactNode
}

export function IntroScreen({ children }: IntroScreenProps) {
  // Check if intro already played this session
  const alreadySeen = typeof window !== "undefined"
    && sessionStorage.getItem(SESSION_KEY) === "true"

  const [showIntro, setShowIntro] = useState(!alreadySeen)
  const [introExiting, setIntroExiting] = useState(false)

  const handleComplete = () => {
    setIntroExiting(true)
    // Fade out takes 500ms, then unmount
    setTimeout(() => {
      setShowIntro(false)
      sessionStorage.setItem(SESSION_KEY, "true")
    }, 600)
  }

  // Escape key skips intro
  useEffect(() => {
    if (!showIntro) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleComplete()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [showIntro])

  // Prevent background scroll while intro plays
  useEffect(() => {
    if (showIntro) {
      document.body.classList.add("intro-active")
    } else {
      document.body.classList.remove("intro-active")
    }
    return () => document.body.classList.remove("intro-active")
  }, [showIntro])

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            animate={{ opacity: introExiting ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] bg-[#050508] flex items-center justify-center overflow-hidden"
          >
            {/* The full-screen particle canvas */}
            <ParticleTextEffect
              onComplete={handleComplete}
              className="absolute inset-0 w-full h-full"
            />

            {/* Skip hint — bottom center, fades in after 1.5s */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.28 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[3px] uppercase text-white pointer-events-none"
            >
              Press ESC to skip
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero and rest of site — visible underneath, fades in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  )
}
