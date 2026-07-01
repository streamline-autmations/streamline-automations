import { motion } from 'framer-motion';
import SplitReveal from './SplitReveal';
import FillButton from './FillButton';
import EngineBackdrop from '../three/EngineBackdrop';
import { EASE_ARR } from '../../lib/motion';

/**
 * PreFooterCTA — the Cuberto "have an idea?" moment. A big, quiet, centred
 * moment: just the headline, the scroll-reactive 3D Engine (centred behind
 * it, no side offset) and one giant pill CTA — no supporting copy. A
 * rounded-top ink section (its corners reveal the white page behind for a
 * smooth section transition). One of only two dark surfaces on the site.
 * On mobile/reduced-motion the engine doesn't load and the plain ink bg +
 * gradient blooms carry the backdrop.
 */
export default function PreFooterCTA({
  headline = [{ text: 'Have an' }, { text: 'idea?' }],
}: {
  headline?: { text: string; serif?: boolean }[];
}) {
  return (
    <section data-header-dark="" className="relative z-[1] -mt-[2rem] flex min-h-[100svh] flex-col items-center justify-center overflow-hidden rounded-t-[2.5rem] bg-site-ink py-32 text-white md:-mt-[4rem] md:rounded-t-[4.5rem] md:py-40">
      {/* Bottom fade — blends into the footer's bg-site-ink with no hard edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#0A0A0F] via-[rgba(10,10,15,0.7)] to-transparent"
      />

      {/* The Engine — enquiries flow in, bookings flow out. Centred directly
          behind the headline/button instead of offset to a corner. */}
      <EngineBackdrop corePos={[0, 0.7, -1.2]} drift />

      {/* Soft ink vignette behind the copy so the engine never fights the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[110%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(10,10,15,0.78)_0%,rgba(10,10,15,0.35)_45%,transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <SplitReveal
          as="h2"
          segments={headline}
          className="mx-auto max-w-[16ch] text-[clamp(52px,11vw,128px)] font-semibold leading-[0.95] tracking-[-0.03em] text-white"
        />

        <SplitReveal
          as="p"
          segments={[{ text: 'Tell us.', serif: true }]}
          delay={0.15}
          className="mx-auto mt-4 text-[clamp(32px,5.5vw,56px)] leading-none tracking-[-0.02em]"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.3 }}
          className="mt-12"
        >
          <FillButton to="/contact" variant="on-dark" className="px-20 py-9 text-[26px] uppercase tracking-[0.02em] md:px-24 md:py-10 md:text-[30px]">
            Tell us
          </FillButton>
        </motion.div>
      </div>
    </section>
  );
}
