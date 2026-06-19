import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE_ARR } from '../../lib/motion';

// Real client logos only (already optimised webp in /public/assets/clients).
const LOGOS = [
  { name: 'BLOM Cosmetics', src: '/assets/clients/blom/logo.webp' },
  { name: 'RecklessBear Apparel', src: '/assets/clients/recklessbear/logo-word.webp' },
  { name: 'CW Electronics', src: '/assets/clients/cw-electronics/logo.webp' },
  { name: 'Ameli Designs', src: '/assets/clients/ameli/logo.webp' },
  { name: 'JJ Glasswork', src: '/assets/clients/jj-glass/logo.webp' },
];

/**
 * ClientLogos — the trust bar directly under the hero. Greyscale at rest,
 * full colour on hover; quiet by design so the hero keeps the stage.
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
    <section className="border-t border-site-line bg-white px-6 py-12 md:px-10 md:py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 md:flex-row md:justify-between md:gap-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE_ARR }}
          className="shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-site-text-muted"
        >
          Trusted by real SA businesses
        </motion.span>

        <div
          className="sc-logo-rail -mx-6 flex w-screen snap-x snap-mandatory items-center gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:w-auto md:flex-wrap md:justify-end md:gap-x-8 md:gap-y-6 md:overflow-visible md:px-0 md:pb-0"
          aria-label="Client logos"
        >
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
              transition={{ duration: 0.5, ease: EASE_ARR, delay: 0.06 * i }}
              className={`group flex min-h-[56px] shrink-0 snap-center items-center justify-center rounded-2xl border px-5 outline-none transition-[border-color,box-shadow,background-color,transform] duration-300 ease-brand focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 md:min-h-[44px] md:border-transparent md:px-0 ${
                activeLogo === l.name
                  ? 'border-site-accent bg-site-accent-soft shadow-[0_18px_40px_-24px_rgba(123,63,228,0.85)]'
                  : 'border-site-line bg-white'
              }`}
            >
              <img
                src={l.src}
                alt={l.name}
                loading="lazy"
                decoding="async"
                draggable={false}
                className={`h-8 w-auto max-w-[128px] select-none object-contain transition-[opacity,filter,transform] duration-300 ease-brand md:h-7 md:max-w-[150px] ${
                  activeLogo === l.name
                    ? 'scale-[1.02] opacity-100 grayscale-0'
                    : 'opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0'
                }`}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
