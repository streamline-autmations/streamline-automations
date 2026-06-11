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

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:justify-end">
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
              transition={{ duration: 0.5, ease: EASE_ARR, delay: 0.06 * i }}
              className="h-6 w-auto select-none object-contain opacity-55 grayscale transition-[opacity,filter] duration-300 ease-brand hover:opacity-100 hover:grayscale-0 md:h-7"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
