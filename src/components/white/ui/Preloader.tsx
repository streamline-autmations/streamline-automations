import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ORANGE_LOGO = "https://res.cloudinary.com/dnlgohkcc/image/upload/v1777354607/Untitled_design_81_wmcnee.png";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Preloader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return !sessionStorage.getItem("streamline-preloaded");
  });

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("streamline-preloaded", "1");
      } catch {
        /* ignore storage errors */
      }
    }, 1700);
    return () => clearTimeout(t);
  }, [visible]);

  // Lock body scroll while preloader is up
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="preloader"
          exit={{
            opacity: 0,
            scale: 1.08,
            transition: { duration: 0.65, ease: EASE },
          }}
          className="fixed inset-0 z-[200] bg-[#7B3FE4] flex items-center justify-center overflow-hidden"
        >
          {/* Soft white bloom */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(700px 500px at 50% 50%, rgba(255,255,255,0.10), transparent 70%)",
            }}
          />

          {/* Subtle rotating ring behind the logo */}
          <motion.svg
            viewBox="0 0 200 200"
            aria-hidden="true"
            className="absolute w-[320px] h-[320px] md:w-[380px] md:h-[380px] opacity-40"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            <circle
              cx="100"
              cy="100"
              r="78"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
              strokeDasharray="3 8"
            />
          </motion.svg>

          {/* Logo with clip-mask line reveal */}
          <div className="relative flex flex-col items-center gap-7">
            {/* Icon logo */}
            <div className="overflow-hidden">
              <motion.img
                src={ORANGE_LOGO}
                alt=""
                aria-hidden="true"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
                className="h-14 md:h-16 w-auto mx-auto"
              />
            </div>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                className="flex items-end leading-none"
              >
                <span className="text-[52px] md:text-[72px] font-['DM_Sans'] font-semibold text-white tracking-[-0.04em]">
                  Streamline
                </span>
                <motion.span
                  animate={{ scale: [1, 1.35, 1], opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 0.9, ease: "easeInOut", repeat: Infinity }}
                  className="text-[52px] md:text-[72px] font-['DM_Sans'] font-semibold text-white/70 inline-block"
                >
                  .
                </motion.span>
              </motion.div>
            </div>

            {/* Tagline — fades in just after logo */}
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
              className="text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.18em] text-white/60"
            >
              Websites &middot; Systems &middot; SA
            </motion.span>

            {/* Sliding progress bar */}
            <div className="relative w-[160px] h-px bg-white/15 overflow-hidden mt-2">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, ease: "linear" }}
                className="absolute inset-y-0 left-0 w-full bg-white"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
