import { useRef } from 'react';
import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import MagneticCTA from '../../ui/MagneticCTA';
import usePrefersReducedMotion from '../../../../hooks/usePrefersReducedMotion';
import useScrollToHash from './useScrollToHash';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LINE_1 = ['Websites', 'that', 'work.'];
const LINE_2 = ['Systems', 'that', 'scale.'];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};
const word: Variants = {
  hidden: { y: '118%' },
  visible: { y: 0, transition: { duration: 0.9, ease: EASE } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** A single masked word that rises into view. */
function Word({ children, serif = false }: { children: string; serif?: boolean }) {
  return (
    <span className="inline-block overflow-hidden align-top px-[0.06em] pb-[0.02em]">
      <motion.span
        variants={word}
        className={`inline-block pb-[0.14em] ${
          serif ? "font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]" : ''
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Text-only editorial hero — word-by-word mask reveal, cursor-tracked purple
 * glow, magnetic primary CTA. Matches the handoff design 1:1.
 */
export default function HeroText() {
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const scrollTo = useScrollToHash();

  // Cursor-tracked ambient glow (desktop only; springs settle smoothly).
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const sx = useSpring(gx, { stiffness: 40, damping: 20, mass: 0.6 });
  const sy = useSpring(gy, { stiffness: 40, damping: 20, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    gx.set(e.clientX - r.left - r.width / 2);
    gy.set(e.clientY - r.top - r.height / 2);
  };

  const animateProps = reduced
    ? { initial: 'visible' as const }
    : { initial: 'hidden' as const, animate: 'visible' as const };

  return (
    <section
      ref={heroRef}
      onMouseMove={onMove}
      data-screen-label="Hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      {/* cursor-tracked glow */}
      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(circle, rgba(123,63,228,0.10) 0%, transparent 60%)',
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1000px] px-8">
        <motion.div {...animateProps} variants={container}>
          <motion.div
            variants={fade}
            className="mb-9 font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-[0.22em] text-[#9E9EA8]"
          >
            Web Design &amp; Automation · Vaal Triangle, SA
          </motion.div>

          <h1
            aria-label="Websites that work. Systems that scale."
            className="font-['DM_Sans'] font-bold leading-[1.0] tracking-[-0.03em] text-[#0A0A0F]"
            style={{ fontSize: 'clamp(38px, 5.4vw, 84px)' }}
          >
            <span className="block">
              {LINE_1.map((w) => (
                <Word key={w}>{w}</Word>
              ))}
            </span>
            <span className="-mt-[0.04em] block">
              {LINE_2.map((w, i) => (
                <Word key={w} serif={i === LINE_2.length - 1}>
                  {w}
                </Word>
              ))}
            </span>
          </h1>

          <motion.p
            variants={fade}
            className="mt-11 max-w-[480px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.5]"
            style={{ fontSize: 'clamp(17px, 1.7vw, 21px)' }}
          >
            I build the websites and automation systems South African businesses
            use to stop doing everything manually.
          </motion.p>

          <motion.div variants={fade} className="mt-12 flex flex-wrap items-center gap-8">
            <MagneticCTA strength={16}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#7B3FE4] px-9 py-[18px] font-['DM_Sans'] text-[16px] font-semibold text-white transition-[background-color,box-shadow] duration-300 hover:bg-[#6930D0] hover:shadow-[0_14px_40px_rgba(123,63,228,0.32)]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
              >
                Book a Free Call
              </Link>
            </MagneticCTA>

            <a
              href="#work"
              onClick={(e) => scrollTo(e, '#work')}
              className="group inline-flex items-center gap-2.5 font-['DM_Sans'] text-[16px] font-semibold text-[#0A0A0F]"
            >
              See the work
              <span className="text-[#7B3FE4] transition-transform duration-[400ms] group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.24em] text-[#9E9EA8]">
          Scroll
        </span>
        <span className="relative h-[54px] w-px overflow-hidden bg-[#E8E8EC]">
          <span className="absolute left-0 top-0 h-[40%] w-full bg-[#7B3FE4] [animation:cueSlide_2.2s_cubic-bezier(0.22,1,0.36,1)_infinite] motion-reduce:hidden" />
        </span>
      </div>
    </section>
  );
}
