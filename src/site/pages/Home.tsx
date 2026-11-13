import { motion } from 'framer-motion';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import SplitReveal from '../components/craft/SplitReveal';
import Tag from '../components/craft/Tag';
import ServicesSection from '../components/site/ServicesSection';
import ClientLogos from '../components/site/ClientLogos';
import CaseStudyCycler from '../components/site/CaseStudyCycler';
import StatsSection from '../components/site/StatsSection';
import { Link } from 'react-router-dom';
import { EASE_ARR, fadeUp, viewport } from '../lib/motion';

/**
 * RentalCallout — one strong idea: headline making the offer plainly, paired
 * with a single bold R0-upfront card (the floor price lives on /hosting only) so the section isn't text-only. No small
 * mono labels carrying the message — the price and the payoff are both big.
 */
function RentalCallout() {
  return (
    <Panel bg="white" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16">
        <div>
          <SplitReveal
            as="h2"
            segments={[
              { text: 'I build it.' },
              { text: 'You pay monthly.' },
              { text: "It's yours", serif: true },
              { text: 'in 18 months.' },
            ]}
            className="max-w-[14ch] text-[clamp(38px,5.5vw,72px)] font-semibold leading-[0.98] tracking-[-0.03em] text-site-ink"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-8 max-w-[42ch] text-[18px] leading-[1.65] text-site-text-body"
          >
            No deposit, no upfront invoice. Just a flat monthly fee for the build and hosting —
            and after 18 months the site is yours outright, full files, no strings.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <FillButton to="/contact" variant="ink" solid>
              Book a Free Call
            </FillButton>
            <Link
              to="/hosting"
              className="inline-flex min-h-[44px] items-center text-[16px] font-semibold text-site-ink underline decoration-site-ink/25 underline-offset-[6px] transition-colors duration-300 ease-brand hover:decoration-site-accent"
            >
              See how it works
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] bg-site-accent-soft px-9 py-11 md:px-11 md:py-14"
        >
          <p className="text-[15px] font-medium text-site-text-body">Upfront cost</p>
          <p className="mt-2 text-[clamp(64px,9vw,104px)] font-semibold leading-none tracking-[-0.03em] text-site-ink">
            R0
          </p>
          <p className="mt-5 border-t border-site-ink/10 pt-6 text-balance text-[19px] font-semibold leading-[1.4] text-site-ink">
            Own it outright at 18 months.
          </p>
        </motion.div>
      </div>
    </Panel>
  );
}

// Step bodies 2–3 are the same promises as About's "How I work" — keep the two in step.
const HOW_IT_WORKS = [
  {
    n: '01',
    title: 'A free call',
    body: 'Tell me about the business and what’s slowing it down. No obligation.',
  },
  {
    n: '02',
    title: 'Plan',
    body: 'I map exactly what you need — pages, systems, the lot. You see the shape of it before I touch a line of code.',
  },
  {
    n: '03',
    title: 'Build fast',
    body: 'Most sites ship in days. Systems and automations in one to two weeks. You stay in the loop the whole way.',
  },
] as const;

/**
 * HowItWorks — answers "what happens after I book?" right before the final CTA,
 * with the founder's face so the visitor knows who they'll be talking to.
 * Hairline rows, not cards; the step numbers carry the sequence.
 */
function HowItWorks() {
  return (
    <Panel bg="white" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <div>
          <SplitReveal
            as="h2"
            segments={[{ text: 'How it' }, { text: 'works.', serif: true }]}
            className="text-[clamp(38px,5.5vw,72px)] font-semibold leading-[0.98] tracking-[-0.03em] text-site-ink"
          />
          <div className="mt-10 flex items-center gap-4">
            <img
              src="/assets/about/founder-headshot.webp"
              width={526}
              height={526}
              alt="Christiaan Steffen, founder of Streamline Automations"
              loading="lazy"
              decoding="async"
              className="h-16 w-16 shrink-0 rounded-full object-cover"
            />
            <p className="text-[16px] leading-[1.5] text-site-text-body">
              <span className="font-semibold text-site-ink">Christiaan Steffen</span>
              <br />
              You deal with me, start to finish.
            </p>
          </div>
        </div>

        <ol className="border-t border-site-line">
          {HOW_IT_WORKS.map((step) => (
            <li
              key={step.n}
              className="grid grid-cols-[2.75rem_1fr] gap-x-4 border-b border-site-line py-8 md:grid-cols-[4rem_1fr] md:py-10"
            >
              <span aria-hidden="true" className="pt-2 text-[15px] font-semibold text-site-accent">
                {step.n}
              </span>
              <div>
                <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-site-ink md:text-[28px]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-pretty text-[17px] leading-[1.6] text-site-text-body">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Panel>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO — the phone screen IS the headline (it's baked into the image), so the
          H1 is kept for SEO / screen readers only. One motion beat: the hand rises in. */}
      <section className="overflow-hidden px-6 pt-28 pb-16 md:flex md:min-h-[100svh] md:items-center md:px-10 md:pt-32 md:pb-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-12 md:gap-6">
          <h1 className="sr-only">
            Built to work, not just look good — web design and automation in the Vaal Triangle, Gauteng.
          </h1>

          <div className="order-2 md:order-1 md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_ARR }}
              className="mb-6"
            >
              <Tag variant="outline">Web design &amp; automation · Vaal Triangle</Tag>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.2 }}
              className="max-w-sm text-pretty text-[17px] leading-[1.65] text-site-text-body"
            >
              I build websites and automation systems for South African businesses. Fast. Clean.
              Connected.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.3 }}
              className="mt-9"
            >
              <FillButton to="/contact" variant="ink" solid>
                Book a Free Call
              </FillButton>
            </motion.div>
          </div>

          <motion.div
            // Opacity stays 1 — this image is the LCP element; only the rise animates.
            initial={{ y: 56 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: EASE_ARR }}
            className="order-1 -mr-6 md:order-2 md:col-span-8 md:-mr-10 lg:-mr-[calc((100vw-72rem)/2+2.5rem)]"
          >
            <img
              src="/assets/hero/hero-phone.webp"
              srcSet="/assets/hero/hero-phone-900.webp 900w, /assets/hero/hero-phone.webp 1487w"
              sizes="(min-width: 768px) 62vw, 100vw"
              width={1487}
              height={886}
              alt="A hand holding a phone that reads: Built to work, not just look good."
              {...{ fetchpriority: 'high' }}
              decoding="async"
              className="block h-auto w-[118%] max-w-none select-none md:w-full"
            />
          </motion.div>
        </div>
      </section>

      <ClientLogos />
      <RentalCallout />
      <ServicesSection />
      <CaseStudyCycler />
      <StatsSection />
      <HowItWorks />
      <PreFooterCTA
        headline={[{ text: 'What’s slowing' }, { text: 'you down?', serif: true }]}
      />
    </>
  );
}
