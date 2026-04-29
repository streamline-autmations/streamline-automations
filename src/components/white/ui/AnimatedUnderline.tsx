import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  /** Path width in viewBox units. Container is responsive. */
  width?: number;
  /** Line color. Defaults to brand purple. */
  color?: string;
  /** Stroke width in viewBox units. */
  strokeWidth?: number;
  /** Slight wave amplitude — set 0 for a perfectly straight line. */
  wave?: number;
  className?: string;
  /** Animation delay in seconds. */
  delay?: number;
}

/**
 * Scroll-triggered SVG line that draws itself in from left to right
 * the first time it enters the viewport. Used as a premium accent
 * underneath section eyebrows and key headlines.
 */
export default function AnimatedUnderline({
  width = 220,
  color = "#7B3FE4",
  strokeWidth = 2,
  wave = 1.8,
  className = "",
  delay = 0.05,
}: Props) {
  // Subtle hand-drawn wave so it doesn't look CSS-flat
  const path = wave === 0
    ? `M 1 ${strokeWidth} L ${width - 1} ${strokeWidth}`
    : `M 1 ${strokeWidth} C ${width * 0.3} ${strokeWidth - wave}, ${width * 0.65} ${strokeWidth + wave}, ${width - 1} ${strokeWidth}`;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${strokeWidth * 2 + 2}`}
      preserveAspectRatio="none"
      className={`block ${className}`}
    >
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          pathLength: { duration: 1.1, ease: EASE, delay },
          opacity: { duration: 0.3, ease: "linear", delay },
        }}
      />
    </svg>
  );
}
