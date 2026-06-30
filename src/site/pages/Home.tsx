import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitReveal from '../components/craft/SplitReveal';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import ServicesSection from '../components/site/ServicesSection';
import ClientLogos from '../components/site/ClientLogos';
import StatsSection from '../components/site/StatsSection';
import AutomationScrolly from '../components/site/AutomationScrolly';
import CaseStudyCycler from '../components/site/CaseStudyCycler';
import HeroVideoScroll from '../components/site/HeroVideoScroll';
import {
  FEATURED_PROJECTS,
  PRIMARY_CTA,
  SECONDARY_CTA,
  type ProjectMedia,
} from '../data/site';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';

// ProofStrip removed — ClientLogos handles the trust bar with real logos + hover colour

const STEPS = [
  {
    no: '01',
    title: 'Map the business',
    body: 'I look at how enquiries, bookings, payments and admin move through the business now.',
  },
  {
    no: '02',
    title: 'Build the front',
    body: 'The website becomes the public face: clear, fast, mobile-first and designed to get action.',
  },
  {
    no: '03',
    title: 'Wire the system',
    body: 'Forms, bookings, dashboards and notifications get connected behind the scenes.',
  },
] as const;



function ProjectMediaFrame({ media, name }: { media: ProjectMedia; name: string }) {
  const image = media.type === 'image' ? media.src : media.poster || media.mobileFallback || '';
  return (
    <div className="relative aspect-[16/11] overflow-hidden rounded-[26px] border border-site-line bg-site-surface">
      {media.type === 'video' ? (
        <video
          src={media.src}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={media.alt}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-[1.03]"
        />
      ) : (
        <picture>
          <source media="(max-width: 767px)" srcSet={media.mobileFallback || media.src} />
          <img
            src={media.src}
            alt={media.alt}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-[1.03]"
          />
        </picture>
      )}
      <div className="absolute left-4 top-4 rounded-full border border-site-line bg-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-site-text-secondary backdrop-blur">
        {name}
      </div>
    </div>
  );
}

function FeaturedWork() {
  return (
    <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SplitReveal
              as="h2"
              segments={[{ text: 'Serious builds, shown properly.' }]}
              className="max-w-[16ch] text-[clamp(34px,5vw,68px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
            />
          </div>
          <Link
            to="/portfolio"
            data-cursor="link"
            className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-site-text-secondary underline-offset-4 outline-none transition-colors hover:text-site-ink hover:underline focus-visible:text-site-ink focus-visible:underline"
          >
            All work →
          </Link>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-6">
          {FEATURED_PROJECTS.slice(0, 3).map((project) => (
            <motion.article key={project.href} variants={fadeUp}>
              <Link
                to={project.href}
                data-cursor="view"
                data-cursor-label="View"
                className="group grid gap-6 rounded-[32px] border border-site-line bg-white p-4 outline-none transition-[border-color,background-color,transform] duration-300 ease-brand hover:-translate-y-1 hover:border-site-accent/50 hover:bg-white active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-site-accent motion-reduce:hover:translate-y-0 md:grid-cols-[1.25fr_0.75fr] md:p-5"
              >
                <ProjectMediaFrame media={project.media} name={project.no} />
                <div className="flex flex-col justify-between p-2 md:p-5">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-site-accent">
                      Project / {project.no}
                    </span>
                    <h3 className="mt-5 text-[clamp(28px,4vw,48px)] font-semibold leading-[1.02] tracking-[-0.03em] text-site-ink">
                      {project.name}
                    </h3>
                    <p className="mt-4 max-w-md text-[15.5px] leading-[1.6] text-site-text-body">{project.outcome}</p>
                  </div>
                  <div className="mt-9">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-site-line px-3 py-1.5 text-[12px] text-site-text-secondary">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="relative mt-8 inline-flex min-h-[44px] items-center overflow-hidden rounded-full border border-site-line px-5 group-hover:border-site-ink motion-reduce:transition-none">
                      <span aria-hidden="true" className="absolute inset-0 translate-y-full bg-site-ink transition-transform duration-[600ms] ease-brand group-hover:translate-y-0 motion-reduce:transition-none" />
                      <span className="relative z-10 text-[14px] font-semibold text-site-ink transition-colors duration-[350ms] ease-brand group-hover:text-white">View project</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Panel>
  );
}

function RentalCallout() {
  return (
    <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto w-full max-w-6xl overflow-hidden rounded-[32px] bg-site-accent-soft px-8 py-16 md:px-16 md:py-20"
      >
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[22ch]">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">
              Website rental
            </p>
            <h2 className="mt-5 text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.03em] text-site-ink">
              No upfront cost. Pay monthly. Own it after 18 months.
            </h2>
          </div>

          <div className="flex flex-col gap-8 md:items-end">
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
              className="flex flex-col gap-3"
            >
              {[
                'I build the site free upfront',
                'You pay a fixed monthly fee',
                "After 18 months — it's yours",
              ].map((point) => (
                <motion.div
                  key={point}
                  variants={fadeUp}
                  className="flex items-center gap-3"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-site-accent" aria-hidden="true" />
                  <span className="text-[15px] text-site-text-body">{point}</span>
                </motion.div>
              ))}
            </motion.div>
            <FillButton to="/hosting" variant="ink">
              See plans
            </FillButton>
          </div>
        </div>
      </motion.div>
    </Panel>
  );
}

function HowItWorks() {
  return (
    <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-[0.85fr_1.15fr] md:items-start">
        <div>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Simple process. Useful output.' }]}
            className="max-w-[14ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
          />
        </div>

        <motion.ol variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="divide-y divide-site-line border-y border-site-line">
          {STEPS.map((step) => (
            <motion.li key={step.no} variants={fadeUp} className="py-7">
              <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-site-ink">{step.title}</h3>
              <p className="mt-2 max-w-xl text-[15.5px] leading-[1.6] text-site-text-body">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Panel>
  );
}

function AboutPreview() {
  return (
    <Panel bg="white" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto w-full max-w-6xl">
        <div
          className="text-[clamp(40px,6vw,80px)] font-semibold leading-[0.95] tracking-[-0.04em] text-site-ink"
          aria-label="Solo. Direct. No layers."
        >
          <SplitReveal as="div" segments={[{ text: 'Solo.' }]} delay={0} />
          <SplitReveal as="div" segments={[{ text: 'Direct.' }]} delay={0.12} />
          <SplitReveal as="div" segments={[{ text: 'No layers.' }]} delay={0.24} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: EASE_ARR, delay: 0.18 }}
          className="mt-12 flex flex-col gap-8 border-t border-site-line pt-10 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-[44ch] text-[17px] leading-[1.65] text-site-text-body">
            Based in the Vaal Triangle. You deal with the person planning,
            designing, building and supporting the system — not an account manager.
          </p>
          <Link
            to="/about"
            data-cursor="link"
            className="shrink-0 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-site-ink underline-offset-4 outline-none transition-colors hover:text-site-accent hover:underline focus-visible:text-site-accent focus-visible:underline"
          >
            About me →
          </Link>
        </motion.div>
      </div>
    </Panel>
  );
}

export default function Home() {
  return (
    <>
      <HeroVideoScroll />
      <ClientLogos />
      <ServicesSection />
      <CaseStudyCycler />
      <StatsSection />
      <FeaturedWork />
      <RentalCallout />
      <HowItWorks />
      <AutomationScrolly />
      <AboutPreview />
      <PreFooterCTA />
    </>
  );
}
