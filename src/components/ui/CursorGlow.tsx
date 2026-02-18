import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorGlow: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const hoveringRef = useRef(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 150,
    damping: 15,
  });

  const springY = useSpring(mouseY, {
    stiffness: 150,
    damping: 15,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(hover: none)').matches);
    };

    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 24);
      mouseY.set(e.clientY - 24);
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);

      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const nextHovering = Boolean(
        el?.closest('a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]')
      );

      if (nextHovering !== hoveringRef.current) {
        hoveringRef.current = nextHovering;
        setIsHoveringInteractive(nextHovering);
      }
    };

    if (isVisible && !isMobile) {
      // Keep default cursor - don't hide it
      document.documentElement.style.cursor = 'auto';
    } else {
      document.documentElement.style.cursor = 'auto';
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', checkMobile);

    return () => {
      document.documentElement.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  // Remove 3-click toggle - always show cursor
  // useEffect for click handler removed

  if (isMobile) return null;
  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        scale: isHoveringInteractive ? 1.55 : 1,
        opacity: isHoveringInteractive ? 1 : 0.85,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 26,
      }}
      className="fixed w-12 h-12 pointer-events-none z-50"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-orange rounded-full blur-lg mix-blend-screen shadow-lg shadow-brand-purple/50"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-orange rounded-full blur-3xl scale-150 mix-blend-lighten shadow-lg shadow-brand-orange/40"></div>
      <motion.div
        animate={{
          opacity: isHoveringInteractive ? 0.9 : 0,
          scale: isHoveringInteractive ? 0.85 : 0.65,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 22,
        }}
        className="absolute inset-0 rounded-full border border-white/20"
      />
      <motion.div
        animate={{
          opacity: isHoveringInteractive ? 0.9 : 0.6,
          scale: isHoveringInteractive ? 0.65 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 22,
        }}
        className="absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 mix-blend-overlay"
      />
    </motion.div>
  );
};

export default CursorGlow;
