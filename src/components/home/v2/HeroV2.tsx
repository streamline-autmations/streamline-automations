/**
 * HeroV2 — Cuberto-style full-screen hero
 * Three-line Bebas display headline with GSAP SplitType char reveals.
 * Chars slide up from below the line (overflow:hidden clips the travel).
 * Below-fold elements fade in after the headline completes.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
import { gsap } from '../../../lib/gsap-setup';
import MagneticButton from '../../ui/MagneticButton';

export default function HeroV2() {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    const sub = subRef.current;
    if (!l1 || !l2 || !l3 || !sub) return;

    const split1 = new SplitType(l1, { types: 'chars,words' });
    const split2 = new SplitType(l2, { types: 'chars,words' });
    const split3 = new SplitType(l3, { types: 'chars,words' });

    // Initial hidden state — chars sit below the word overflow mask
    gsap.set([...(split1.chars || []), ...(split2.chars || []), ...(split3.chars || [])], {
      yPercent: 110,
      opacity: 0,
      rotateX: 15,
    });
    gsap.set([l1, l2, l3], { opacity: 1 });
    gsap.set(sub, { opacity: 0, y: 18 });

    const tl = gsap.timeline({ delay: 0.25 });

    tl.to(split1.chars || [], {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      stagger: 0.022,
      duration: 0.85,
      ease: 'power4.out',
    })
      .to(
        split2.chars || [],
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.022,
          duration: 0.85,
          ease: 'power4.out',
        },
        '-=0.55'
      )
      .to(
        split3.chars || [],
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.022,
          duration: 0.85,
          ease: 'power4.out',
        },
        '-=0.55'
      )
      .to(
        sub,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      );

    return () => {
      tl.kill();
      split1.revert();
      split2.revert();
      split3.revert();
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 py-28 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Subtle purple glow — top-left ambient */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '-5%',
          left: '-15%',
          width: '70vw',
          height: '70vh',
          background:
            'radial-gradient(ellipse at center, rgba(119,76,252,0.10), transparent 65%)',
        }}
      />

      {/* Small orange accent dot — bottom-right */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: '12%',
          right: '8%',
          width: '320px',
          height: '320px',
          background:
            'radial-gradient(ellipse at center, rgba(242,106,61,0.07), transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/25 mb-8 md:mb-10"
        >
          Streamline Automations · Vaal Triangle
        </motion.p>

        {/* Three-line display headline */}
        <div style={{ perspective: '1200px' }}>
          <div
            ref={line1Ref}
            className="hero-split-line font-bebas text-white leading-[0.9] opacity-0 select-none"
            style={{ fontSize: 'clamp(68px, 14vw, 220px)', letterSpacing: '-0.01em' }}
          >
            WE BUILD
          </div>
          <div
            ref={line2Ref}
            className="hero-split-line font-bebas text-white leading-[0.9] opacity-0 select-none"
            style={{ fontSize: 'clamp(68px, 14vw, 220px)', letterSpacing: '-0.01em' }}
          >
            DIGITAL
          </div>
          <div
            ref={line3Ref}
            className="hero-split-line font-bebas leading-[0.9] opacity-0 select-none"
            style={{
              fontSize: 'clamp(68px, 14vw, 220px)',
              letterSpacing: '-0.01em',
              color: '#774CFC',
            }}
          >
            SYSTEMS.
          </div>
        </div>

        {/* Tagline row + CTAs */}
        <div ref={subRef} className="opacity-0 mt-10 md:mt-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30 max-w-xs leading-relaxed">
              Websites · Automation&nbsp;Systems · Hosting
              <br />
              Built for local businesses that want to grow.
            </p>

            <div className="flex items-center gap-5">
              <MagneticButton strength={0.35}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#F26A3D] hover:bg-[#e05528] text-white font-mono text-[11px] uppercase tracking-[0.2em] px-7 py-3.5 transition-colors duration-200"
                >
                  Book a Free Call →
                </Link>
              </MagneticButton>

              <a
                href="#work"
                className="font-mono text-[11px] text-white/30 hover:text-white/60 uppercase tracking-[0.2em] transition-colors duration-200 whitespace-nowrap"
              >
                View Work ↓
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-6 md:left-12 lg:left-16 flex items-center gap-3"
      >
        <div className="w-px h-8 bg-white/15" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/20">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
