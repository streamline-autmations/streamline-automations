import { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

/**
 * CountUp — animates a number from 0 to `to` once it scrolls into view.
 * Reduced-motion renders the final value immediately.
 */
export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1600,
  className = '',
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (reduced) {
      setVal(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let started = false;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(to * eased));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}
