import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import FillButton from '../craft/FillButton';
import { EASE_ARR } from '../../lib/motion';
import { PRIMARY_CTA, SECONDARY_CTA } from '../../data/site';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

// ─── Before side: illustrated chaos ──────────────────────────────────────────

const MESSAGES = [
  { from: 'client', text: 'When can you fit me in?',   time: '08:14' },
  { from: 'me',     text: 'Let me check my diary...',  time: '08:31' },
  { from: 'client', text: 'Still waiting 😅',           time: '10:02' },
  { from: 'me',     text: 'Sorry just saw this!!',      time: '14:55' },
  { from: 'client', text: 'Nvm found someone else',     time: '15:01' },
];

function ChaosSide() {
  return (
    <div className="relative flex h-full flex-col gap-3 overflow-hidden bg-[#F7F4F0] px-6 py-8 md:px-10">
      {/* Sticky note */}
      <motion.div
        initial={{ opacity: 0, rotate: -3, y: 10 }}
        animate={{ opacity: 1, rotate: -3, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_ARR, delay: 0.5 }}
        className="absolute right-6 top-10 w-36 bg-[#FEF08A] px-3 py-3 shadow-md"
        aria-hidden="true"
      >
        <p className="whitespace-pre-line font-mono text-[10px] leading-[1.6] text-[#713F12]">
          {'check bookings!!\n📋 transfer to sheet\n❌ missed 3 calls'}
        </p>
      </motion.div>

      {/* Missed call banner */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: EASE_ARR, delay: 0.35 }}
        className="flex w-fit items-center gap-2 rounded-full bg-red-100 px-3 py-1.5"
      >
        <span className="h-2 w-2 rounded-full bg-red-500" />
        <span className="text-[11px] font-medium text-red-700">3 missed calls today</span>
      </motion.div>

      {/* WhatsApp thread */}
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-[#E5DDD5] pb-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D1D5DB] text-[12px] font-semibold text-white">C</div>
          <div>
            <p className="text-[11px] font-semibold text-[#111B21]">Client</p>
            <p className="text-[10px] text-[#667781]">WhatsApp</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {MESSAGES.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_ARR, delay: 0.55 + i * 0.1 }}
              className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[78%] rounded-2xl px-3 py-2 text-[11.5px] leading-[1.45] shadow-sm ${
                  msg.from === 'me'
                    ? 'rounded-br-sm bg-[#D9FDD3] text-[#111B21]'
                    : 'rounded-bl-sm bg-white text-[#111B21]'
                }`}
              >
                {msg.text}
                <span className="ml-2 text-[9.5px] text-[#999]">{msg.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Paper booking form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_ARR, delay: 1.15 }}
        className="rounded-xl border border-dashed border-[#C4B99A] bg-white px-4 py-3"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#A8956E]">Booking form (paper)</p>
        <div className="mt-2 space-y-1.5">
          {['Name: ____________', 'Date: ____________', 'Time: ____________'].map((line) => (
            <p key={line} className="text-[11px] text-[#6B6B7A]">{line}</p>
          ))}
        </div>
        <div className="mt-2 rounded bg-red-50 px-2 py-1">
          <p className="text-[10px] text-red-500">⚠ No confirmation. No reminder. No record.</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── After side: real screenshot ──────────────────────────────────────────────

function CleanSide() {
  return (
    <div className="relative flex h-full flex-col bg-white px-4 py-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: EASE_ARR, delay: 0.4 }}
        className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#E8E8EC] shadow-[0_20px_80px_-20px_rgba(123,63,228,0.2)]"
      >
        {/* Browser chrome */}
        <div className="flex shrink-0 items-center gap-2 border-b border-[#E8E8EC] bg-[#F5F5F7] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <div className="mx-3 flex flex-1 items-center gap-1.5 rounded-md bg-white px-3 py-1 shadow-sm">
            <span className="text-[10px] text-[#28C840]">●</span>
            <span className="font-mono text-[10px] text-[#6B6B7A]">blom-cosmetics.co.za</span>
          </div>
        </div>
        {/* Screenshot */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src="/assets/clients/blom/shop.webp"
            alt="BLOM Cosmetics — clean e-commerce site built by Streamline"
            className="h-full w-full object-cover object-top"
            draggable={false}
          />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
        </div>
      </motion.div>
    </div>
  );
}

// ─── Reactive split panels ────────────────────────────────────────────────────

function SplitPanel({ splitPct }: { splitPct: MotionValue<number> }) {
  // Width of the "after" clip (left side)
  const afterWidth = useTransform(splitPct, (v) => `${v}%`);
  // Inner div must be 100/split * 100% wide so its content fills correctly
  const afterInnerWidth = useTransform(splitPct, (v) => `${(100 / v) * 100}%`);
  // Divider left position
  const dividerLeft = useTransform(splitPct, (v) => `${v}%`);

  return (
    <div className="absolute inset-0">
      {/* BEFORE — full width base layer */}
      <div className="absolute inset-0">
        <ChaosSide />
      </div>

      {/* AFTER — clips from the left */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ width: afterWidth }}>
        <motion.div className="absolute inset-0" style={{ width: afterInnerWidth }}>
          <CleanSide />
        </motion.div>
      </motion.div>

      {/* Purple divider + handle */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 z-20 flex items-center"
        style={{ left: dividerLeft, translateX: '-50%' }}
      >
        <div className="h-full w-[2px] bg-site-accent shadow-[0_0_12px_rgba(123,63,228,0.5)]" />
        <div className="absolute flex h-11 w-11 items-center justify-center rounded-full border-2 border-site-accent bg-white shadow-[0_4px_24px_rgba(123,63,228,0.3)]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M6 5l-4 4 4 4M12 5l4 4-4 4" stroke="#7B3FE4" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>

      {/* Labels */}
      <div className="pointer-events-none absolute bottom-4 right-5 z-10 rounded-full bg-[#F0EBFF] px-3 py-1" aria-hidden="true">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-site-accent">After</span>
      </div>
      <div className="pointer-events-none absolute bottom-4 left-5 z-10 rounded-full bg-black/20 px-3 py-1 backdrop-blur-sm" aria-hidden="true">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white">Before</span>
      </div>
    </div>
  );
}

// ─── Hero root ────────────────────────────────────────────────────────────────

export default function HeroBeforeAfter() {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0.5);
  const springX = useSpring(rawX, { stiffness: 55, damping: 16, mass: 0.9 });
  // Map 0–1 to 22%–78% so edges always show some content
  const splitPct = useTransform(springX, [0, 1], [22, 78]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
  }

  function handleMouseLeave() {
    rawX.set(0.5);
  }

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white">
      {/* Headline + CTAs */}
      <div className="relative z-20 flex flex-col items-center px-6 pb-8 pt-32 text-center md:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_ARR }}
          className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-site-text-muted"
        >
          This is what I fix
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_ARR, delay: 0.1 }}
          className="max-w-[22ch] text-[clamp(32px,4.8vw,68px)] font-semibold leading-[0.97] tracking-[-0.03em] text-site-ink"
        >
          Replace the chaos with a{' '}
          <span className="font-instrument italic text-site-accent">system</span>{' '}
          that works.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.28 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-6"
        >
          <FillButton to={PRIMARY_CTA.href} variant="ink">
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
      </div>

      {/* Split panel — mouse drives the divider */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: EASE_ARR, delay: 0.38 }}
        className="relative mx-4 mb-6 flex-1 cursor-none overflow-hidden rounded-[28px] border border-site-line select-none"
        style={{ minHeight: 420 }}
      >
        <SplitPanel splitPct={splitPct} />
      </motion.div>
    </section>
  );
}
