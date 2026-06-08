import { motion } from 'framer-motion';
import SplitReveal from './SplitReveal';
import { MagneticButton } from './Magnetic';
import Marquee from './Marquee';
import { EASE_ARR } from '../../lib/motion';
import { CONTACT, PRIMARY_CTA } from '../../data/site';

/**
 * PreFooterCTA — the Cuberto "let's work together" moment, restrained. A near-
 * full-viewport ink section: one huge headline with a serif-italic purple accent
 * word, a magnetic CTA, and a slow service marquee drifting beneath. One big
 * idea, lots of black space. (One of only two dark surfaces on the site.)
 */
export default function PreFooterCTA({
  headline = [
    { text: "Let's build the thing that" },
    { text: 'books', serif: true },
    { text: 'your business out.' },
  ],
  sub = 'Book a free 30-minute call. No pitch, no pressure — just a plan.',
}: {
  headline?: { text: string; serif?: boolean }[];
  sub?: string;
}) {
  return (
    <section className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden bg-site-ink py-28 text-white">
      {/* faint purple bloom for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-site-accent opacity-[0.14] blur-[160px]"
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 text-center">
        <SplitReveal
          as="h2"
          segments={headline}
          className="mx-auto max-w-[18ch] text-[clamp(40px,7vw,84px)] font-semibold leading-[1.04] tracking-[-0.03em] text-white"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE_ARR, delay: 0.1 }}
          className="mx-auto mt-7 max-w-md text-[16px] leading-[1.65] text-white/60 md:text-[17px]"
        >
          {sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.2 }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <MagneticButton to={PRIMARY_CTA.to} variant="on-dark">
            {PRIMARY_CTA.label}
          </MagneticButton>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13.5px] text-white/50 outline-none transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:underline"
          >
            Or WhatsApp me directly — {CONTACT.whatsappDisplay}
          </a>
        </motion.div>
      </div>

      {/* drifting service marquee */}
      {/* Service marquee — DM Sans (serif reserved for headline accent words). */}
      <Marquee
        items={['Websites', 'Systems', 'WhatsApp Automation', 'Hosting', 'Custom Admin', 'AI Quote Engines']}
        durationSec={45}
        className="mt-20"
        itemClassName="font-semibold tracking-[-0.01em] text-[clamp(34px,6vw,64px)] leading-none text-white/[0.07]"
      />
    </section>
  );
}
