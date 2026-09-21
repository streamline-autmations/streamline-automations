import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { RD_JOURNEY } from '../../data/restaurant-direct';

/**
 * RestaurantJourney — customer and restaurant side by side, step for step.
 * The page's motion signature: one purple rail draws down through the five
 * steps as you scroll (transform-only scaleY). Mobile stacks each step with
 * its own "Your customer / Your restaurant" labels. Reduced motion renders
 * the rail fully drawn.
 */
export default function RestaurantJourney() {
  const reduced = usePrefersReducedMotion();
  const railRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 75%', 'end 55%'] });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div>
      <div className="hidden grid-cols-[3.5rem_1fr_1fr] gap-x-10 border-b border-site-line pb-5 md:grid">
        <span />
        <span className="text-[15px] font-medium text-site-text-body">Your customer</span>
        <span className="text-[15px] font-medium text-site-text-body">Your restaurant</span>
      </div>

      {/* Rails sit beside the list, not inside it — <ol> may only contain <li>. */}
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute bottom-12 left-[17.5px] top-12 w-px bg-site-line md:bottom-14 md:left-[21.5px] md:top-14"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: reduced ? 1 : drawn }}
          className="absolute bottom-12 left-[17px] top-12 w-[2px] origin-top bg-site-accent md:bottom-14 md:left-[21px] md:top-14"
        />

        <ol ref={railRef}>
        {RD_JOURNEY.map((step) => (
          <li
            key={step.no}
            className="relative grid grid-cols-[2.25rem_1fr] gap-x-5 border-b border-site-line py-8 last:border-b-0 md:grid-cols-[3.5rem_1fr_1fr] md:gap-x-10 md:py-10"
          >
            <span className="relative z-[1] grid h-9 w-9 place-items-center rounded-full border border-site-line bg-white text-[13px] font-semibold text-site-accent md:h-11 md:w-11 md:text-[14px]">
              {step.no}
            </span>

            <div>
              <span className="mb-1 block text-[13px] font-medium text-site-text-secondary md:hidden">
                Your customer
              </span>
              <h3 className="text-[clamp(20px,2.2vw,28px)] font-semibold leading-[1.15] tracking-[-0.02em] text-site-ink">
                {step.customer.title}
              </h3>
              <p className="mt-2 max-w-sm text-[16px] leading-[1.6] text-site-text-body">{step.customer.body}</p>
            </div>

            <div className="col-start-2 mt-5 md:col-start-3 md:mt-0 md:pt-1">
              <span className="mb-1 block text-[13px] font-medium text-site-text-secondary md:hidden">
                Your restaurant
              </span>
              <p className="max-w-sm text-[17px] font-medium leading-[1.5] text-site-ink">{step.restaurant}</p>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </div>
  );
}
