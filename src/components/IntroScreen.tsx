import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ParticleTextEffect } from "./ui/ParticleTextEffectOptimized"
import DotGridBackground from "./ui/DotGridBackground"
import { getDeviceCapabilities, getAnimationSettings } from "../utils/deviceCapabilities"

const DEVICE_KEY = "sa_intro_seen_device"

interface IntroScreenProps {
  children: React.ReactNode
}

export function IntroScreen({ children }: IntroScreenProps) {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      // Check device capabilities instead of just screen width
      const capabilities = getDeviceCapabilities()
      const settings = getAnimationSettings(capabilities)
      
      // Skip if device doesn't support animation or user has seen it
      if (!settings.enabled || localStorage.getItem(DEVICE_KEY) === "true") {
        return false
      }
      
      return true
    } catch {
      return false
    }
  })
  const [introExiting, setIntroExiting] = useState(false)

  const handleComplete = () => {
    setIntroExiting(true)
    // Smoother fade out transition
    setTimeout(() => {
      setShowIntro(false)
      try {
        localStorage.setItem(DEVICE_KEY, "true")
      } catch (e) {
        // localStorage not available
        console.debug('localStorage not available:', e)
      }
    }, 800)
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
            transition={{ duration: 1.2, ease: "easeInOut" }} // Much smoother fade out
            className="fixed inset-0 z-[999] bg-[#050508] flex items-center justify-center overflow-hidden"
          >
            {/* Background DotGrid for smooth transition */}
            <motion.div 
              className="absolute inset-0 opacity-0"
              animate={{ opacity: introExiting ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
               <DotGridBackground />
            </motion.div>

            {/* The full-screen particle canvas */}
            <ParticleTextEffect
              onComplete={handleComplete}
              className="absolute inset-0 w-full h-full z-10"
            />
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
