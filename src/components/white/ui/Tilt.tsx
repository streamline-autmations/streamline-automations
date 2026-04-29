import { ReactNode, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltProps {
  children: ReactNode;
  /** Max rotation in degrees on each axis. */
  max?: number;
  /** Shine overlay alpha (0-1). Set 0 to disable. */
  shine?: number;
  className?: string;
}

/**
 * 3D parallax tilt that follows the mouse. Used to give portfolio cards
 * subtle depth on hover. Spring-smoothed rotation for fluid motion.
 *
 * Includes an optional cursor-tracked purple shine overlay rendered
 * via useMotionTemplate so it stays in sync with the pointer at 60fps.
 */
export default function Tilt({
  children,
  max = 6,
  shine = 0.18,
  className = "",
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0); // -0.5 .. 0.5 normalized
  const y = useMotionValue(0);

  const rx = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), {
    stiffness: 180,
    damping: 18,
    mass: 0.4,
  });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), {
    stiffness: 180,
    damping: 18,
    mass: 0.4,
  });

  // Cursor-tracked shine — useMotionTemplate keeps the gradient string
  // re-evaluated on every frame as the motion values change.
  const shineX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const shineY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const shineBg = useMotionTemplate`radial-gradient(420px circle at ${shineX}% ${shineY}%, rgba(123,63,228,${shine}), transparent 55%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {shine > 0 && (
        <motion.div
          aria-hidden="true"
          style={{
            backgroundImage: shineBg,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
        />
      )}
    </motion.div>
  );
}
