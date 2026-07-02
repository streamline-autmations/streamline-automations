import { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Magnetic — child slides a few px toward the cursor as it approaches, springing
 * back on leave. Subtle, tactile premium feel for CTAs / nav / footer links.
 *
 * Disabled on touch (coarse pointers fire no mousemove) and on reduced-motion.
 * NB: all hooks run unconditionally before the reduced-motion branch — fixing a
 * rules-of-hooks bug in the legacy MagneticCTA, which returned early first.
 */
export function Magnetic({
  children,
  strength = 14,
  className = '',
}: {
  children: ReactNode;
  /** Max pixel pull toward the cursor. */
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.35 });

  // Touch / coarse pointers never fire mousemove — skip the spring entirely.
  const coarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (reduced || coarse) return <span className={className}>{children}</span>;

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const py = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    x.set(px * strength);
    y.set(py * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

export default Magnetic;
