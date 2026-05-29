import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from '../../../lib/gsap-setup';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';

type CursorState = 'default' | 'link' | 'view' | 'drag' | 'text' | 'reel';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Shape variants for the inner morphing element.
// The outer wrapper is positioned by GSAP quickTo — no React state on every frame.
const variants = {
  default: {
    width: 8,
    height: 8,
    borderRadius: 9999,
    backgroundColor: '#0A0A0F',
    border: '0px solid transparent',
    x: '-50%',
    y: '-50%',
    scale: 1,
    opacity: 1,
  },
  link: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: 'rgba(123,63,228,0)',
    border: '1.5px solid #7B3FE4',
    x: '-50%',
    y: '-50%',
    scale: 1,
    opacity: 1,
  },
  view: {
    width: 72,
    height: 32,
    borderRadius: 9999,
    backgroundColor: '#0A0A0F',
    border: '0px solid transparent',
    x: '-50%',
    y: '-50%',
    scale: 1,
    opacity: 1,
  },
  drag: {
    width: 72,
    height: 32,
    borderRadius: 9999,
    backgroundColor: '#0A0A0F',
    border: '0px solid transparent',
    x: '-50%',
    y: '-50%',
    scale: 1,
    opacity: 1,
  },
  text: {
    width: 2,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#0A0A0F',
    border: '0px solid transparent',
    x: '-50%',
    y: '-50%',
    scale: 1,
    opacity: 0.7,
  },
  // Big translucent circle over the video hero — holds the rotating
  // "VIEW WORK" badge + a small play arrow.
  reel: {
    width: 96,
    height: 96,
    borderRadius: 9999,
    backgroundColor: 'rgba(10,10,15,0.45)',
    border: '0px solid transparent',
    x: '-50%',
    y: '-50%',
    scale: 1,
    opacity: 1,
  },
};

// Pressed overlay — brief pulse on click
const pressVariants = {
  idle: { scale: 1, opacity: 0 },
  pressed: { scale: 0.5, opacity: 0.3, transition: { duration: 0.12 } },
};

export default function SmartCursor() {
  const reduced = usePrefersReducedMotion();

  // Pointer-fine check — only show on mouse devices, not touch
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>('default');
  const [pressed, setPressed] = useState(false);

  const outerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<CursorState>('default');

  // Keep stateRef in sync so event handlers always read fresh state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Detect pointer:fine (mouse) vs touch
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // GSAP quickTo for position — runs once, never re-registers
  useEffect(() => {
    if (!enabled || reduced) return;
    const el = outerRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3' });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.documentElement.addEventListener('pointerenter', onEnter);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.removeEventListener('pointerenter', onEnter);
    };
  }, [enabled, reduced]); // visible excluded intentionally — avoid re-registering

  // State detection via delegated events
  useEffect(() => {
    if (!enabled || reduced) return;

    const detect = (el: Element | null): CursorState => {
      if (!el) return 'default';
      if (el.closest('[data-cursor="reel"]')) return 'reel';
      if (el.closest('[data-cursor="view"]')) return 'view';
      if (el.closest('[data-cursor="drag"]')) return 'drag';
      if (el.closest('a, button, [role="button"]')) return 'link';
      if (el.closest('p, li, blockquote') && !el.closest('a, button')) return 'text';
      return 'default';
    };

    const onOver = (e: MouseEvent) => {
      const next = detect(e.target as Element | null);
      if (next !== stateRef.current) setState(next);
    };

    document.addEventListener('mouseover', onOver);
    return () => document.removeEventListener('mouseover', onOver);
  }, [enabled, reduced]);

  // Press feedback
  useEffect(() => {
    if (!enabled || reduced) return;
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [enabled, reduced]);

  // Hide native cursor while SmartCursor is active
  useEffect(() => {
    if (!enabled || reduced) return;

    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.setAttribute('data-smart-cursor', '');
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = '';
      style.remove();
    };
  }, [enabled, reduced]);

  // Don't render on touch devices or when reduced motion is requested
  if (!enabled || reduced) return null;

  const showLabel = state === 'view' || state === 'drag';

  return (
    <div
      ref={outerRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    >
      <motion.div
        animate={pressed ? { ...variants[state], scale: 0.6 } : variants[state]}
        transition={{ duration: 0.28, ease: EASE }}
        className="absolute flex items-center justify-center overflow-hidden"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {/* Reel state — rotating "VIEW WORK" ring + centre play arrow */}
        {state === 'reel' && (
          <>
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            >
              <defs>
                <path
                  id="reel-text-path"
                  d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                />
              </defs>
              <text
                fill="#FFFFFF"
                style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px' }}
                fontFamily="DM Sans, sans-serif"
              >
                <textPath href="#reel-text-path">
                  VIEW WORK • VIEW WORK •
                </textPath>
              </text>
            </motion.svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#FFFFFF"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </>
        )}

        <AnimatePresence mode="wait">
          {showLabel && (
            <motion.span
              key={state}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15, ease: EASE }}
              className="text-[9px] font-['DM_Sans'] font-bold uppercase tracking-[0.14em] text-white select-none"
            >
              {state === 'view' ? 'VIEW' : 'DRAG'}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
