import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const isInteractive = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return !!target.closest(INTERACTIVE);
    };

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const over = (e: MouseEvent) => {
      if (isInteractive(e.target)) setHovering(true);
    };
    const out = (e: MouseEvent) => {
      if (isInteractive(e.target) && !isInteractive(e.relatedTarget)) {
        setHovering(false);
      }
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    document.documentElement.addEventListener('mouseenter', enter);

    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.setAttribute('data-custom-cursor', 'true');
    style.textContent = `
      a, button, [role="button"], input, textarea, select, label, [data-cursor-hover] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.removeEventListener('mouseenter', enter);
      document.body.style.cursor = '';
      style.remove();
    };
  }, [enabled, x, y, visible]);

  if (!enabled) return null;

  const size = hovering ? 40 : 8;
  const offset = -size / 2;

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      aria-hidden="true"
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          x: offset,
          y: offset,
          backgroundColor: hovering ? 'rgba(123, 63, 228, 0.10)' : '#7B3FE4',
          borderColor: hovering ? '#7B3FE4' : 'rgba(123, 63, 228, 0)',
          scale: pressed ? 0.85 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.22,
          ease: [0.22, 1, 0.36, 1],
          opacity: { duration: 0.18 },
        }}
        className="rounded-full border-[1.5px]"
      />
    </motion.div>
  );
}
