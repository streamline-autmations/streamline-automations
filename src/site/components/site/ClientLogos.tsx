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
 * Desktop: staggered fade-in row, greyscale→colour on hover.
 * Mobile: continuous Marquee drift so logos don't wrap/crunch.
 */
export default function ClientLogos() {
  return (
    <section className="border-t border-site-line bg-white py-8 md:py-14">
      {/* Label */}
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

      {/* Mobile — Marquee */}
      <div className="md:hidden">
        <Marquee
          items={LOGO_NAMES}
          durationSec={28}
          itemClassName="text-[13px] font-semibold text-site-text-muted"
          separator="·"
        />
      </div>

      {/* Desktop — staggered row with image logos */}
      <div className="mx-auto hidden w-full max-w-6xl items-center justify-between gap-x-8 px-10 md:flex">
        {LOGOS.map((l, i) => (
          <motion.img
            key={l.name}
            src={l.src}
            alt={l.name}
            loading="lazy"
            decoding="async"
            draggable={false}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASE_ARR, delay: 0.07 * i }}
            className="h-7 max-w-[130px] select-none object-contain opacity-50 grayscale transition-[opacity,filter] duration-300 ease-brand hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </section>
  );
}
