import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Marquee from '../craft/Marquee';
import { EASE_ARR } from '../../lib/motion';

const LOGOS = [
  { name: 'BLOM Cosmetics', src: '/assets/clients/blom/logo.webp' },
  { name: 'RecklessBear Apparel', src: '/assets/clients/recklessbear/logo-word.webp' },
  { name: 'CW Electronics', src: '/assets/clients/cw-electronics/logo.webp' },
  { name: 'Ameli Designs', src: '/assets/clients/ameli/logo.webp' },
  { name: 'JJ Glasswork', src: '/assets/clients/jj-glass/logo.webp' },
];

const LOGO_NAMES = LOGOS.map((l) => l.name);

/**
 * ClientLogos — trust bar under the hero.
 * Mobile: Marquee drift (no cramped wrapping).
 * Desktop: interactive tap buttons, greyscale→colour + purple glow on active.
 */
export default function ClientLogos() {
  const [activeLogo, setActiveLogo] = useState<string | null>(null);
  const clearTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (clearTimer.current) window.clearTimeout(clearTimer.current);
    };
  }, []);

  const activateLogo = (name: string) => {
    setActiveLogo(name);
    if (clearTimer.current) window.clearTimeout(clearTimer.current);
    clearTimer.current = window.setTimeout(() => setActiveLogo(null), 900);
  };

  return (
    <section className="border-t border-site-line bg-white py-8 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_ARR }}
        className="mb-6 px-6 text-center md:mb-8 md:px-10 md:text-left"
      >
        <span className="mx-auto block max-w-6xl font-mono text-[10px] uppercase tracking-[0.22em] text-site-text-muted md:mx-0 md:text-[11px]">
          Trusted by real SA businesses
        </span>
      </motion.div>

      {/* Mobile — continuous Marquee drift */}
      <div className="md:hidden">
        <Marquee
          items={LOGO_NAMES}
          durationSec={28}
          itemClassName="text-[13px] font-semibold text-site-text-muted"
          separator="·"
        />
      </div>

      {/* Desktop — interactive tap buttons with active glow */}
      <div className="mx-auto hidden w-full max-w-6xl items-center justify-between gap-x-8 px-10 md:flex">
        {LOGOS.map((l, i) => (
          <motion.button
            key={l.name}
            type="button"
            aria-label={`${l.name} project logo`}
            onClick={() => activateLogo(l.name)}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.96 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASE_ARR, delay: 0.07 * i }}
            className="group flex min-h-[44px] items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2"
          >
            <img
              src={l.src}
              alt={l.name}
              loading="lazy"
              decoding="async"
              draggable={false}
              className={`h-7 w-auto max-w-[130px] select-none object-contain transition-[opacity,filter,transform] duration-300 ease-brand ${
                activeLogo === l.name
                  ? 'scale-[1.04] opacity-100 grayscale-0'
                  : 'opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0'
              }`}
            />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
