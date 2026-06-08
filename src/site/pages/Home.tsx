import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitReveal from '../components/craft/SplitReveal';
import WorkCard from '../components/craft/WorkCard';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import { MagneticButton } from '../components/craft/Magnetic';
import { EASE_ARR } from '../lib/motion';

// Real client hero screenshots (Cloudinary).
const IMG = {
  blom: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png',
  reckless: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png',
};

/**
 * Home — Phase 2 craft-layer integration demo (SplitReveal hero, magnetic CTA,
 * WorkCards, ink PreFooterCTA). Phase 3 expands this to the full 9 sections.
 */
export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="flex min-h-[100svh] items-center px-6 pt-32 pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR }}
            className="mb-6 font-mono text-[12px] uppercase tracking-[0.18em] text-site-text-muted"
          >
            Web design + automation · South Africa
          </motion.p>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[
              { text: 'Websites and systems that run the' },
              { text: 'business', serif: true },
              { text: 'while you sleep.' },
            ]}
            className="max-w-5xl text-[clamp(44px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
          >
            Web design and automation for South African businesses. I build the website, the systems
            behind it, and the automations that do the busywork — so you don't have to.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <MagneticButton to="/contact">Book a Free Call</MagneticButton>
            <Link
              to="/portfolio"
              data-cursor="link"
              className="text-[15px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline"
            >
              See the work →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="border-t border-site-line px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12 flex items-end justify-between gap-6">
            <SplitReveal
              as="h2"
              segments={[{ text: 'Selected' }, { text: 'work', serif: true }]}
              className="text-[clamp(34px,5vw,60px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
            />
            <Link
              to="/portfolio"
              data-cursor="link"
              className="hidden shrink-0 pb-2 text-[15px] font-medium text-site-text-secondary outline-none hover:text-site-accent focus-visible:text-site-accent md:inline"
            >
              All work →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <WorkCard
              to="/work/blom"
              label="E-commerce + Automation"
              title="BLOM Cosmetics"
              blurb="Full store, custom admin, course platform, and WhatsApp automation."
              image={IMG.blom}
              index={0}
            />
            <WorkCard
              to="/work/recklessbear"
              label="Site + CRM + AI"
              title="RecklessBear Apparel"
              blurb="Quote engine, 12-stage production tracking, and an AI booking bot."
              image={IMG.reckless}
              index={1}
            />
          </div>
        </div>
      </section>

      <PreFooterCTA />
    </>
  );
}
