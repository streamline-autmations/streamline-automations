import { motion } from 'framer-motion';
import SplitReveal from './SplitReveal';
import FillButton from './FillButton';
import Marquee from './Marquee';
import { EASE_ARR } from '../../lib/motion';
import { CONTACT, PRIMARY_CTA } from '../../data/site';

/**
 * PreFooterCTA — the Cuberto "have an idea?" moment. A rounded-top ink section
 * (its corners reveal the white page behind for a smooth section transition),
 * a living gradient backdrop (drop in a looping video via `videoSrc`), one huge
 * headline with a serif-italic accent, an outlined fill-button CTA, and a slow
 * service marquee. One of only two dark surfaces on the site.
 */
export default function PreFooterCTA({
  headline = [{ text: 'Have an' }, { text: 'idea?', serif: true }],
  sub = "Tell me what you're building. No pitch, no pressure — just a plan.",
  videoSrc,
  poster,
}: {
  headline?: { text: string; serif?: boolean }[];
  sub?: string;
  videoSrc?: string;
  poster?: string;
}) {
  return (
    <section className="relative flex min-h-[78svh] flex-col items-center justify-center overflow-hidden rounded-t-[2.5rem] bg-site-ink py-28 text-white md:rounded-t-[4.5rem] md:py-32">
      {/* Optional looping background video (muted, plays on its own) + ink scrim. */}
      {videoSrc && (
        <>
          <video
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.32]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-site-ink/50 via-site-ink/45 to-site-ink/85" />
        </>
      )}

      {/* Living gradient backdrop (transform-only drift). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="sc-bloom-a absolute -top-40 left-[18%] h-[560px] w-[560px] rounded-full bg-site-accent opacity-[0.16] blur-[150px]" />
        <div className="sc-bloom-b absolute -bottom-44 right-[16%] h-[480px] w-[480px] rounded-full bg-[#5b2bd6] opacity-[0.12] blur-[150px]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 text-center">
        <SplitReveal
          as="h2"
          segments={headline}
          className="mx-auto max-w-[16ch] text-[clamp(52px,11vw,128px)] font-semibold leading-[0.95] tracking-[-0.03em] text-white"
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
          <FillButton to={PRIMARY_CTA.to} variant="on-dark" className="px-12 text-[16px]">
            {PRIMARY_CTA.label}
          </FillButton>
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

      {/* Service marquee pinned to the bottom edge — DM Sans (serif reserved for accents). */}
      <Marquee
        items={['Websites', 'Systems', 'WhatsApp Automation', 'Hosting', 'Custom Admin', 'AI Quote Engines']}
        durationSec={45}
        className="absolute inset-x-0 bottom-9"
        itemClassName="font-semibold tracking-[-0.01em] text-[clamp(34px,6vw,64px)] leading-none text-white/[0.07]"
      />
    </section>
  );
}
