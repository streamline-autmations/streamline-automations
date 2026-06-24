import { useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { EASE_ARR } from '../../lib/motion';

type LogoItem = { type: 'image'; name: string; src: string };
type TextItem = { type: 'text'; name: string };
type ClientItem = LogoItem | TextItem;

const CLIENTS: ClientItem[] = [
  { type: 'image', name: 'BLOM Cosmetics',       src: '/assets/clients/blom/logo.webp' },
  { type: 'image', name: 'RecklessBear Apparel', src: '/assets/clients/recklessbear/logo-word.webp' },
  { type: 'image', name: 'CW Electronics',       src: '/assets/clients/cw-electronics/logo.webp' },
  { type: 'image', name: 'Ameli Designs',        src: '/assets/clients/ameli/logo.webp' },
  { type: 'image', name: 'JJ Glasswork',         src: '/assets/clients/jj-glass/logo.webp' },
  { type: 'image', name: 'NSA Mining',           src: '/assets/clients/nsa-mining/logo.jpg' },
  { type: 'text',  name: 'TUSCANY SA' },
  { type: 'text',  name: 'AFRICAN NOMAD' },
];

function ClientItem({ item }: { item: ClientItem }) {
  if (item.type === 'image') {
    return (
      <div className="group flex h-10 shrink-0 cursor-default items-center">
        <img
          src={item.src}
          alt={item.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-auto max-w-[130px] select-none object-contain grayscale opacity-[0.45] transition-opacity duration-200 ease-brand group-hover:opacity-[0.75]"
        />
      </div>
    );
  }

  return (
    <div className="group flex h-10 shrink-0 cursor-default items-center">
      <span className="select-none font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-site-text-muted transition-colors duration-200 ease-brand group-hover:text-site-text-secondary whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

/** Two identical sets for the seamless -50% loop. */
function TrackSet() {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden>
      {CLIENTS.map((item, i) => (
        <ClientItem key={i} item={item} />
      ))}
    </div>
  );
}

/**
 * ClientLogos — continuous marquee trust strip on all screen sizes.
 * Pauses on hover. Respects prefers-reduced-motion (animation stops via CSS).
 */
export default function ClientLogos() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="border-t border-site-line bg-white py-16">
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_ARR }}
        className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-site-text-muted"
      >
        Trusted by businesses across South Africa
      </motion.p>

      {/* Marquee — all screen sizes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.1 }}
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="sc-marquee-track flex w-max items-center"
          style={
            {
              '--marquee-dur': '42s',
              animationPlayState: paused ? 'paused' : 'running',
            } as CSSProperties
          }
          aria-label="Client logos"
        >
          <TrackSet />
          <TrackSet />
        </div>
      </motion.div>
    </section>
  );
}
