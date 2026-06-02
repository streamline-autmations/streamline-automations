import { useState } from 'react';
import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Real, signed clients only. Madiega Trading is intentionally excluded —
// it was a proposal/demo and must never appear as live work.
const CLIENTS = [
  'BLOM Cosmetics',
  'RecklessBear Apparel',
  'CW Electronics',
  'Ameli Designs',
  'NSA Mining',
  'JJ Glasswork',
  'Tuscany SA',
  'African Nomad',
];

const CIRCLE_PATH = 'M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0';
const BADGE_TEXT = 'TRUSTED ACROSS SOUTH AFRICA · TRUSTED ACROSS SOUTH AFRICA · ';

/**
 * Light editorial trust strip — a rotating "TRUSTED ACROSS SOUTH AFRICA" badge
 * over a faded marquee of real client names. Soft purple-tint background gives
 * the homepage a clean section break without breaking the white-minimal system.
 */
export default function TrustBar() {
  const [paused, setPaused] = useState(false);
  const items = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section
      data-screen-label="Trust"
      className="relative overflow-hidden border-y border-[#E8E8EC] bg-[#F0EBFF]"
    >
      <div className="relative mx-auto w-full max-w-[1000px] px-8 pb-0 pt-14 md:pt-20">
        {/* Rotating circular badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: EASE }}
          className="relative mx-auto mb-10 h-[140px] w-[140px] md:mb-12 md:h-[160px] md:w-[160px]"
        >
          <motion.svg
            viewBox="0 0 200 200"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          >
            <defs>
              <path id="tb-circle" d={CIRCLE_PATH} />
            </defs>
            <text
              fill="#7B3FE4"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10.5px',
                fontWeight: 500,
                letterSpacing: '0.22em',
              }}
            >
              <textPath href="#tb-circle" startOffset="0">
                {BADGE_TEXT}
              </textPath>
            </text>
          </motion.svg>

          {/* Centre pulsing dot */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="relative inline-flex items-center justify-center">
              <motion.span
                aria-hidden="true"
                className="absolute inline-flex h-6 w-6 rounded-full bg-[#7B3FE4]"
                animate={{ scale: [1, 2.8, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.6, ease: 'easeOut', repeat: Infinity }}
              />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#7B3FE4] shadow-[0_0_18px_rgba(123,63,228,0.5)]" />
            </span>
          </div>

          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-[#7B3FE4]/20"
          />
        </motion.div>
      </div>

      {/* Marquee strip — edge-faded, pauses on hover */}
      <div
        className="relative border-t border-[#7B3FE4]/12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}
      >
        <div
          className="flex items-center py-4"
          style={{
            width: 'max-content',
            animation: 'marquee-text 42s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center gap-6 whitespace-nowrap px-6"
            >
              <span className="font-['JetBrains_Mono'] text-[11px] font-medium uppercase tracking-[0.16em] text-[#6B6B7A] transition-colors duration-200 hover:text-[#0A0A0F] md:text-[12px]">
                {name}
              </span>
              <motion.span
                aria-hidden="true"
                className="inline-block flex-shrink-0 text-[10px] text-[#7B3FE4]"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
              >
                &#10022;
              </motion.span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
