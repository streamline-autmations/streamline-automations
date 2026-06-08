import { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

type ButtonVariant = 'primary' | 'on-dark' | 'ghost';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-site-accent text-white shadow-[0_8px_24px_rgba(123,63,228,0.3)] hover:bg-site-accent-hover hover:shadow-[0_14px_36px_rgba(123,63,228,0.4)]',
  'on-dark': 'bg-white text-site-accent hover:bg-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.18)]',
  ghost: 'border border-site-line text-site-ink hover:border-site-line-mid hover:bg-site-surface',
};

/**
 * MagneticButton — a pill CTA wrapped in <Magnetic>. Renders a router <Link>
 * (internal `to`) or an <a> (external `href`). Brand-eased, 52px min height.
 */
export function MagneticButton({
  to,
  href,
  children,
  variant = 'primary',
  strength = 16,
  className = '',
  dataCursor = 'view',
  external = false,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  strength?: number;
  className?: string;
  dataCursor?: 'view' | 'link';
  /** For href links — adds target=_blank + rel. */
  external?: boolean;
}) {
  const classes = `inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold outline-none transition-[background-color,box-shadow,border-color] duration-300 ease-brand focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 ${VARIANTS[variant]} ${className}`;

  return (
    <Magnetic strength={strength}>
      {to ? (
        <Link to={to} data-cursor={dataCursor} className={classes}>
          {children}
        </Link>
      ) : (
        <a
          href={href}
          data-cursor={dataCursor}
          className={classes}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )}
    </Magnetic>
  );
}

export default Magnetic;
