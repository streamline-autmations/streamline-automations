import SplitReveal from './SplitReveal';
import FillButton from './FillButton';
import { CONTACT } from '../../data/site';
import EngineBackdrop from '../three/EngineBackdrop';

/**
 * PreFooterCTA — the closing moment. Big headline over the scroll-reactive
 * 3D Engine, one reassurance line, then the booking pill (filled) and a
 * WhatsApp pill — real button affordances, since touch has no hover. A rounded-top ink section (its corners reveal the white page behind
 * for a smooth section transition). One of only two dark surfaces on the
 * site. Under reduced-motion the engine doesn't load and the plain ink
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
          "Tell me." line rather than the headline above it. */}
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

        <p className="mx-auto mt-8 max-w-[40ch] text-pretty text-[18px] leading-[1.6] text-white/75 md:text-[20px]">
          Tell me what&rsquo;s eating your time. It&rsquo;s a free call, no obligation.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <FillButton to="/contact" variant="on-dark" solid>
            Book a Free Call
          </FillButton>
          <FillButton href={CONTACT.whatsappUrl} external variant="on-dark">
            WhatsApp me
          </FillButton>
        </div>
      </div>
    </section>
  );
}
