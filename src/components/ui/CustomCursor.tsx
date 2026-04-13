/**
 * CustomCursor
 * Replaces the browser cursor with a small dot + larger ring follower.
 * The ring has intentional lag for a fluid feel.
 * On hover over interactive elements: ring expands and turns purple.
 * Automatically disabled on touch/stylus devices (pointer: coarse/none).
 */
import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap-setup';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on fine-pointer (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide the native OS cursor
    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      // Dot snaps to cursor instantly
      gsap.to(dot, {
        x: e.clientX - 4,  // 4 = radius of 8px dot
        y: e.clientY - 4,
        duration: 0.06,
        ease: 'none',
        overwrite: 'auto',
      });
      // Ring follows with inertia
      gsap.to(ring, {
        x: e.clientX - 20,  // 20 = radius of 40px ring
        y: e.clientY - 20,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      // Fade in on first move
      gsap.to([dot, ring], { opacity: 1, duration: 0.3, overwrite: false });
    };

    // Hover state — ring expands + turns brand purple
    const onEnter = () => {
      gsap.to(ring, { scale: 2.2, borderColor: 'rgba(119,76,252,0.65)', duration: 0.25, ease: 'power2.out' });
      gsap.to(dot, { scale: 0.4, backgroundColor: '#774CFC', duration: 0.25 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.25)', duration: 0.35, ease: 'power3.out' });
      gsap.to(dot, { scale: 1, backgroundColor: 'rgba(255,255,255,0.9)', duration: 0.35 });
    };

    const attachToInteractives = () => {
      document.querySelectorAll<HTMLElement>('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        el.style.cursor = 'none';
      });
    };

    attachToInteractives();

    // Re-attach when dynamic content is added (lazy-loaded sections etc)
    const observer = new MutationObserver(attachToInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
      document.documentElement.style.cursor = '';
      document.querySelectorAll<HTMLElement>('a, button, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.style.cursor = '';
      });
    };
  }, []);

  return (
    <>
      {/* Small dot — instant position */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-white/90 pointer-events-none opacity-0 will-change-transform"
        aria-hidden="true"
      />
      {/* Ring — lagged position */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] w-10 h-10 rounded-full pointer-events-none opacity-0 will-change-transform"
        style={{ border: '1px solid rgba(255,255,255,0.25)' }}
        aria-hidden="true"
      />
    </>
  );
}
