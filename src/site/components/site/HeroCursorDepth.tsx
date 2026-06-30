import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import SplitReveal from '../craft/SplitReveal';
import FillButton from '../craft/FillButton';
import { EASE_ARR } from '../../lib/motion';
import { PRIMARY_CTA, SECONDARY_CTA } from '../../data/site';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const SPRING = { stiffness: 80, damping: 22, mass: 0.6 };

function FloatingCard({ children, className, delay = 0 }: { children: React.ReactNode; className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_ARR, delay }}
      className={`absolute rounded-2xl border border-site-line bg-white px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.07)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function HeroCursorDepth() {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const smoothX = useSpring(rawX, SPRING);
  const smoothY = useSpring(rawY, SPRING);

  // Parallax offsets — deeper layers move more
  const x1 = useTransform(smoothX, [-1, 1], [-6, 6]);
  const y1 = useTransform(smoothY, [-1, 1], [-4, 4]);
  const x2 = useTransform(smoothX, [-1, 1], [-14, 14]);
  const y2 = useTransform(smoothY, [-1, 1], [-10, 10]);
  const x3 = useTransform(smoothX, [-1, 1], [-22, 22]);
  const y3 = useTransform(smoothY, [-1, 1], [-16, 16]);

  // Glow follows cursor more aggressively
  const glowX = useTransform(smoothX, [-1, 1], [-60, 60]);
  const glowY = useTransform(smoothY, [-1, 1], [-40, 40]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-white px-6 py-32"
    >
      {/* Cursor-tracking purple glow */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-site-accent/[0.12] blur-[100px]"
          style={{ x: glowX, y: glowY, translateX: '-50%', translateY: '-50%', left: '50%', top: '50%' }}
        />
      )}

      {/* Floating UI fragments — layer 3 (deepest) */}
      {!reduced && (
        <>
          <motion.div style={{ x: x3, y: y3 }} className="pointer-events-none absolute left-[6%] top-[22%] motion-reduce:hidden">
            <FloatingCard className="w-[180px]" delay={1.0}>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-site-text-muted">Booking confirmed</span>
              <div className="mt-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-site-accent text-[11px] text-white">✓</span>
                <span className="text-[13px] font-semibold text-site-ink">Slot locked in</span>
              </div>
              <p className="mt-1 text-[11px] text-site-text-secondary">WhatsApp sent automatically</p>
            </FloatingCard>
          </motion.div>

          <motion.div style={{ x: x3, y: y3 }} className="pointer-events-none absolute right-[5%] top-[18%] motion-reduce:hidden">
            <FloatingCard className="w-[160px]" delay={1.1}>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-site-text-muted">This week</span>
              <p className="mt-2 text-[28px] font-semibold leading-none text-site-ink">24</p>
              <p className="mt-1 text-[12px] text-site-text-secondary">new leads captured</p>
            </FloatingCard>
          </motion.div>

          <motion.div style={{ x: x2, y: y2 }} className="pointer-events-none absolute bottom-[20%] left-[8%] motion-reduce:hidden">
            <FloatingCard className="w-[200px]" delay={1.2}>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-site-text-muted">Order status</span>
              <div className="mt-2 space-y-1.5">
                {['Received', 'In production', 'Ready to ship'].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${i < 2 ? 'bg-site-accent' : 'bg-site-line-mid'}`} />
                    <span className={`text-[11px] ${i < 2 ? 'font-medium text-site-ink' : 'text-site-text-muted'}`}>{step}</span>
                  </div>
                ))}
              </div>
            </FloatingCard>
          </motion.div>

          <motion.div style={{ x: x2, y: y2 }} className="pointer-events-none absolute bottom-[18%] right-[6%] motion-reduce:hidden">
            <FloatingCard className="w-[158px]" delay={1.3}>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-site-text-muted">Admin time saved</span>
              <p className="mt-2 text-[28px] font-semibold leading-none text-site-ink">
                8h<span className="text-[16px] text-site-text-muted">/wk</span>
              </p>
              <p className="mt-1 text-[11px] text-site-text-secondary">on average per client</p>
            </FloatingCard>
          </motion.div>
        </>
      )}

      {/* Headline layer — subtle parallax */}
      <motion.div
        style={reduced ? {} : { x: x1, y: y1 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_ARR }}
          className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-site-text-muted"
        >
          Web design + business systems · Vaal Triangle, SA
        </motion.p>

        <SplitReveal
          as="h1"
          trigger="mount"
          stagger={0.06}
          delay={0.1}
          segments={[
            { text: "I don't just build websites." },
            { text: 'I build systems that' },
            { text: 'sell.', serif: true },
          ]}
          className="max-w-[14ch] text-[clamp(48px,8.5vw,118px)] font-semibold leading-[0.93] tracking-[-0.04em] text-site-ink"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.55 }}
          className="mt-8 max-w-[460px] text-[17px] leading-[1.65] text-site-text-body"
        >
          Websites, booking flows and automations that keep South African small businesses organised.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          <FillButton to={PRIMARY_CTA.href} variant="solid-accent">
            {PRIMARY_CTA.label}
          </FillButton>
          <Link
            to={SECONDARY_CTA.href}
            data-cursor="link"
            className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline"
          >
            {SECONDARY_CTA.label} →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
