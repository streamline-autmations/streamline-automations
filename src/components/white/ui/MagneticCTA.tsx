import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface Props {
  children: ReactNode;
  /** Max pixel pull toward cursor. */
  strength?: number;
  className?: string;
}

/**
 * Magnetic wrapper — child slides toward the cursor as it approaches.
 * Used on primary CTAs to add tactile premium feel. Disabled on touch
 * (no mousemove events fire on coarse pointers).
 */
export default function MagneticCTA({
  children,
  strength = 14,
  className = "",
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  if (reduced) return <span className={className}>{children}</span>;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.35 });

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const py = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    x.set(px * strength);
    y.set(py * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
