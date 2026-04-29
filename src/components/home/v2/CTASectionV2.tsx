/**
 * CTASectionV2 — Full-width closing call-to-action.
 * GSAP SplitType char reveal on headline when section scrolls into view.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
import { gsap, ScrollTrigger } from '../../../lib/gsap-setup';
import MagneticButton from '../../ui/MagneticButton';

export default function CTASectionV2() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    const sub = subRef.current;
    if (!el || !sub) return;

    const split = new SplitType(el, { types: 'chars,words' });

    gsap.set(split.chars || [], { yPercent: 110, opacity: 0 });
    gsap.set(el, { opacity: 1 });
    gsap.set(sub, { opacity: 0, y: 16 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 72%',
        once: true,
      },
    });

    tl.to(split.chars || [], {
      yPercent: 0,
      opacity: 1,
      stagger: 0.025,
      duration: 0.85,
      ease: 'power4.out',
    }).to(sub, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <section
      className="relative px-6 md:px-12 lg:px-16 py-32 md:py-40 overflow-hidden"
      style={{ background: '#030303' }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(119,76,252,0.08), transparent 65%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10 text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/25 mb-8"
        >
          Ready to start?
        </motion.p>

        {/* Headline — GSAP char reveal */}
        <h2
          ref={headingRef}
          className="hero-split-line font-bebas text-white leading-[0.9] opacity-0 mx-auto"
          style={{ fontSize: 'clamp(52px, 9vw, 140px)', letterSpacing: '-0.01em' }}
        >
          STOP DOING IT MANUALLY.
        </h2>

        {/* Sub-copy + CTA */}
        <div ref={subRef} className="mt-10 opacity-0 flex flex-col items-center gap-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30 max-w-sm">
            Free 20-min strategy call. No commitment. We'll tell you exactly what we'd build.
          </p>

          <MagneticButton strength={0.25}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#F26A3D] hover:bg-[#e05528] text-white font-mono text-[11px] uppercase tracking-[0.2em] px-8 py-4 transition-colors duration-200"
            >
              Book a Free Call →
            </Link>
          </MagneticButton>

          <p className="font-mono text-[10px] text-white/15 uppercase tracking-widest">
            Free consultation · No commitment · Results-driven
          </p>
        </div>
      </div>

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
    </section>
  );
}
