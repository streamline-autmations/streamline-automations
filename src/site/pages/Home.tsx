import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitReveal from '../components/craft/SplitReveal';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import ServicesSection from '../components/site/ServicesSection';
import ClientLogos from '../components/site/ClientLogos';
import StatsSection from '../components/site/StatsSection';
import AutomationScrolly from '../components/site/AutomationScrolly';
import CaseStudyCycler from '../components/site/CaseStudyCycler';
import CountUp from '../components/site/CountUp';
import HeroParticleNetwork from '../components/site/HeroParticleNetwork';
import {
  FEATURED_PROJECTS,
  PACKAGES,
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

const BOOKING_STEPS = ['Customer submits form', 'Slot confirmed', 'WhatsApp sent'] as const;
const DASHBOARD_STATS = [
  { label: 'Leads', to: 24 },
  { label: 'Orders', to: 8 },
  { label: 'Follow-ups', to: 12 },
] as const;

function HeroSystemPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE_ARR, delay: 0.3 }}
      className="relative mt-14 md:mt-0"
      aria-label="Website, booking and dashboard system preview"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-8 rounded-[42px] bg-site-accent-soft blur-3xl" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-[32px] border border-site-line bg-white p-4 shadow-[0_40px_120px_-45px_rgba(76,29,149,0.34)]">
        <div className="rounded-[24px] border border-site-line bg-site-offwhite p-3">
          <div className="rounded-[20px] border border-site-line bg-white p-4">

            {/* Browser chrome */}
            <div className="flex items-center justify-between border-b border-site-line pb-4">
              <div className="flex items-center gap-2">
                {/* Pulsing accent dot */}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-site-accent opacity-60" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-site-accent" />
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-site-line-mid" />
                <span className="h-2.5 w-2.5 rounded-full bg-site-line" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-site-text-muted">
                Live system
              </span>
            </div>

            <div className="grid gap-3 pt-4 sm:grid-cols-[1.15fr_0.85fr]">
              {/* Website preview card */}
              <div className="rounded-2xl bg-site-ink p-5 text-white">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Website
                </span>
                <h3 className="mt-14 text-[28px] font-semibold leading-[1.02] tracking-[-0.03em]">
                  Bookings without the back-and-forth.
                </h3>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } } }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {['Mobile-first', 'Fast', 'Enquiry-led'].map((tag) => (
                    <motion.span
                      key={tag}
                      variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_ARR } } }}
                      className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/75"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <div className="grid gap-3">
                {/* Booking flow */}
                <div className="rounded-2xl border border-site-line bg-white p-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-site-text-muted">
                    Booking flow
                  </span>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.7 } } }}
                    className="mt-4 space-y-2"
                  >
                    {BOOKING_STEPS.map((item, i) => (
                      <motion.div
                        key={item}
                        variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_ARR } } }}
                        className="flex items-center gap-2 rounded-full bg-site-offwhite px-3 py-2"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-site-accent text-[10px] font-semibold text-white">
                          {i + 1}
                        </span>
                        <span className="text-[12px] font-medium text-site-text-body">{item}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Dashboard stats with CountUp */}
                <div className="rounded-2xl border border-site-line bg-site-accent-soft p-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-site-text-muted">
                    Dashboard
                  </span>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {DASHBOARD_STATS.map((stat) => (
                      <div key={stat.label} className="rounded-xl bg-white px-3 py-4 text-center">
                        <CountUp
                          to={stat.to}
                          duration={1800}
                          className="block text-[18px] font-semibold text-site-ink"
                        />
                        <span className="mt-1 block text-[10px] text-site-text-muted">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}


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
    <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Tag variant="outline" className="mb-6">
              Featured work
            </Tag>
            <SplitReveal
              as="h2"
              segments={[{ text: 'Serious builds, shown' }, { text: 'properly.', serif: true }]}
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
                    <span className="mt-8 inline-flex min-h-[44px] items-center rounded-full border border-site-line px-5 text-[14px] font-semibold text-site-ink transition-colors group-hover:border-site-accent group-hover:bg-site-accent group-hover:text-white">
                      View project
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

function PackagesPreview() {
  return (
    <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Tag variant="outline" className="mb-6">
              Packages
            </Tag>
            <SplitReveal
              as="h2"
              segments={[{ text: 'Start with the' }, { text: 'right', serif: true }, { text: 'level.' }]}
              className="max-w-[16ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
            />
          </div>
          <FillButton to="/hosting" variant="ink">
            See pricing
          </FillButton>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-5 md:grid-cols-3">
          {PACKAGES.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              className={`rounded-[28px] border bg-white p-7 ${
                item.popular ? 'border-site-accent shadow-[0_30px_80px_-34px_rgba(123,63,228,0.42)]' : 'border-site-line'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[24px] font-semibold leading-[1.1] tracking-[-0.02em] text-site-ink">{item.name}</h3>
                {item.popular && (
                  <span className="rounded-full border border-site-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-site-accent">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-5 text-[28px] font-semibold tracking-[-0.03em] text-site-ink">{item.price}</p>
              <p className="mt-3 text-[14.5px] leading-[1.55] text-site-text-body">{item.bestFor}</p>
              <ul className="mt-6 flex flex-col gap-2 border-t border-site-line pt-5">
                {item.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex gap-2 text-[13.5px] leading-[1.45] text-site-text-secondary">
                    <span aria-hidden="true" className="mt-[1px] text-site-accent">
                      +
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-site-text-muted">
                {item.timeframe}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Panel>
  );
}

function HowItWorks() {
  return (
    <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-[0.85fr_1.15fr] md:items-start">
        <div>
          <Tag variant="outline" className="mb-6">
            How it works
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Simple process.' }, { text: 'Useful', serif: true }, { text: 'output.' }]}
            className="max-w-[14ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
          />
        </div>

        <motion.ol variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="divide-y divide-site-line border-y border-site-line">
          {STEPS.map((step) => (
            <motion.li key={step.no} variants={fadeUp} className="grid gap-4 py-7 sm:grid-cols-[72px_1fr]">
              <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-site-accent">{step.no}</span>
              <div>
                <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-site-ink">{step.title}</h3>
                <p className="mt-2 max-w-xl text-[15.5px] leading-[1.6] text-site-text-body">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Panel>
  );
}

function AboutPreview() {
  return (
    <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-10 rounded-[32px] border border-site-line bg-white p-7 md:grid-cols-[1fr_0.9fr] md:p-10">
        <div>
          <Tag variant="outline" className="mb-6">
            Built by Christiaan
          </Tag>
          <h2 className="max-w-[13ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink">
            Solo founder. Direct build. No layers.
          </h2>
        </div>
        <div className="self-end">
          <p className="text-[16px] leading-[1.65] text-site-text-body">
            I am based around the Vaal Triangle and Gauteng. You deal with the person planning,
            designing, building and supporting the system.
          </p>
          <Link
            to="/about"
            data-cursor="link"
            className="mt-7 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-site-ink underline-offset-4 outline-none hover:text-site-accent hover:underline focus-visible:text-site-accent focus-visible:underline"
          >
            About me -&gt;
          </Link>
        </div>
      </div>
    </Panel>
  );
}

export default function Home() {
  return (
    <>
      <HeroParticleNetwork />
      <ClientLogos />
      <ServicesSection />
      <CaseStudyCycler />
      <StatsSection />
      <FeaturedWork />
      <PackagesPreview />
      <HowItWorks />
      <AutomationScrolly />
      <AboutPreview />
      <PreFooterCTA />
    </>
  );
}
