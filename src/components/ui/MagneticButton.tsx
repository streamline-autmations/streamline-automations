/**
 * MagneticButton
 * Wraps any element with a GSAP magnetic pull effect.
 * The element drifts toward the cursor on hover and springs back on leave.
 * Use it around CTA buttons and nav links for that premium agency feel.
 *
 * Usage:
 *   <MagneticButton>
 *     <Link to="/contact" className="btn btn-orange">Book a Call</Link>
 *   </MagneticButton>
 */
import { useRef, ReactNode } from 'react';
import { gsap } from '../../lib/gsap-setup';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** 0–1. How strongly the element follows the cursor. Default 0.3 */
  strength?: number;
  /** Disable on mobile automatically (default true) */
  disableOnMobile?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  disableOnMobile = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    if (disableOnMobile && window.matchMedia('(max-width: 768px)').matches) return;
    const el = ref.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * strength;
    const y = (e.clientY - top - height / 2) * strength;

    gsap.to(el, { x, y, duration: 0.35, ease: 'power2.out' });
  };

  const onMouseLeave = () => {
    // Elastic spring-back — the signature Cuberto feel
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.75,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
