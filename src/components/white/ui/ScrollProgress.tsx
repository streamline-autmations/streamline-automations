import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Sticky scroll-progress indicator at the very top of the viewport.
 * 2px purple gradient bar that scales horizontally based on document
 * scroll progress. Uses a spring so the fill feels silky, not jittery.
 *
 * Sits above the navbar (z-[60]) so it's always visible.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="hidden md:block fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left
                 bg-gradient-to-r from-[#7B3FE4] via-[#A77BFF] to-[#7B3FE4]
                 shadow-[0_0_12px_rgba(123,63,228,0.45)] pointer-events-none"
      style={{ scaleX }}
    />
  );
}
