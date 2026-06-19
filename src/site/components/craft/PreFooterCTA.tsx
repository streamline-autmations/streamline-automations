import { motion } from 'framer-motion';
import SplitReveal from './SplitReveal';
import FillButton from './FillButton';
import EngineBackdrop from '../three/EngineBackdrop';
import { EASE_ARR } from '../../lib/motion';
import { CONTACT, PRIMARY_CTA } from '../../data/site';

/**
 * PreFooterCTA — the Cuberto "have an idea?" moment. A rounded-top ink section
 * (its corners reveal the white page behind for a smooth section transition),
 * the scroll-reactive 3D Engine running behind one huge headline with a
 * serif-italic accent and an outlined fill-button CTA. One of only two dark
 * surfaces on the site. On mobile/reduced-motion the engine doesn't load and
 * the CSS gradient blooms carry the backdrop.
 */
export default function PreFooterCTA({
  headline = [{ text: 'Have an' }, { text: 'idea?', serif: true }],
  sub = "Tell me what you're building. No pitch, no pressure — just a plan.",
}: {
  headline?: { text: string; serif?: boolean }[];
  sub?: string;
}) {
  return (
    <section data-header-dark="" className="relative flex min-h-[78svh] flex-col items-center justify-center overflow-hidden rounded-t-[2.5rem] bg-site-ink py-28 text-white md:rounded-t-[4.5rem] md:py-32">
      {/* Living gradient backdrop (transform-only drift) — also the no-WebGL fallback. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="sc-bloom-a absolute -top-40 left-[18%] h-[560px] w-[560px] rounded-full bg-site-accent opacity-[0.16] blur-[150px]" />
        <div className="sc-bloom-b absolute -bottom-44 right-[16%] h-[480px] w-[480px] rounded-full bg-[#5b2bd6] opacity-[0.12] blur-[150px]" />
      </div>

      {/* The Engine — enquiries flow in, bookings flow out. The orb rides the
          stream left → right across the section, wrapping off-screen back to
          the start; corePos anchors the stream axis above the sub-copy. */}
      <EngineBackdrop corePos={[3.9, 0.9, -1.2]} drift />

      {/* Soft ink vignette behind the copy so the engine never fights the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[110%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(10,10,15,0.78)_0%,rgba(10,10,15,0.35)_45%,transparent_70%)]"
      />

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
          className="mx-auto mt-7 max-w-md text-[16px] leading-[1.65] text-white/70 md:text-[17px]"
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
          <FillButton to={PRIMARY_CTA.to} variant="solid-accent" className="px-12 text-[16px]">
            {PRIMARY_CTA.label}
          </FillButton>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center text-[13.5px] text-white/70 outline-none transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:underline"
          >
            Or WhatsApp me directly — {CONTACT.whatsappDisplay}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
