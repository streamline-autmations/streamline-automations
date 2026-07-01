import { Link } from 'react-router-dom';
import SplitReveal from './SplitReveal';
import EngineBackdrop from '../three/EngineBackdrop';

/**
 * PreFooterCTA — the Cuberto "have an idea?" moment. A big, quiet, centred
 * moment: the headline, the scroll-reactive 3D Engine (centred behind it)
 * and "Tell us." itself doubling as the CTA — no separate pill button below
 * it. A rounded-top ink section (its corners reveal the white page behind
 * for a smooth section transition). One of only two dark surfaces on the
 * site. On mobile/reduced-motion the engine doesn't load and the plain ink
 * bg + gradient blooms carry the backdrop.
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

      {/* The Engine — enquiries flow in, bookings flow out. Centred behind
          the headline/button, sat a touch lower so it drifts through the
          "Tell us." line rather than the headline above it. */}
      <EngineBackdrop corePos={[0, 0.15, -1.2]} drift />

      {/* Soft ink vignette behind the copy so the engine never fights the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[110%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(10,10,15,0.7)_0%,rgba(10,10,15,0.28)_45%,transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-5xl translate-y-4 flex-col items-center px-6 text-center md:translate-y-8">
        <SplitReveal
          as="h2"
          segments={headline}
          className="mx-auto max-w-[16ch] text-[clamp(52px,11vw,128px)] font-semibold leading-[0.95] tracking-[-0.03em] text-white"
        />

        <Link
          to="/contact"
          data-cursor="link"
          className="group relative mt-6 inline-block"
        >
          <SplitReveal
            as="p"
            segments={[{ text: 'Tell us.', serif: true }]}
            delay={0.15}
            className="mx-auto text-[clamp(40px,7.5vw,80px)] leading-none tracking-[-0.02em] transition-transform duration-500 ease-brand group-hover:scale-[1.05]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-1 -bottom-2 h-[3px] origin-left scale-x-0 bg-site-accent transition-transform duration-500 ease-brand group-hover:scale-x-100"
          />
        </Link>
      </div>
    </section>
  );
}
