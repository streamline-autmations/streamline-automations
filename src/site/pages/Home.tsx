import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitReveal from '../components/craft/SplitReveal';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import ServicesSection from '../components/site/ServicesSection';
import {
  FEATURED_PROJECTS,
  PACKAGES,
  PRIMARY_CTA,
  PROOF_ITEMS,
  SECONDARY_CTA,
  type ProjectMedia,
} from '../data/site';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';

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

function HeroSystemPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE_ARR, delay: 0.25 }}
      className="relative mt-14 md:mt-0"
      aria-label="Website, booking and dashboard system preview"
    >
      <div className="absolute -inset-8 rounded-[42px] bg-site-accent-soft blur-3xl" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[32px] border border-site-line bg-white p-4 shadow-[0_40px_120px_-45px_rgba(76,29,149,0.34)]">
        <div className="rounded-[24px] border border-site-line bg-site-offwhite p-3">
          <div className="rounded-[20px] border border-site-line bg-white p-4">
            <div className="flex items-center justify-between border-b border-site-line pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-site-accent" />
                <span className="h-2.5 w-2.5 rounded-full bg-site-line-mid" />
                <span className="h-2.5 w-2.5 rounded-full bg-site-line" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-site-text-muted">
                Live system
              </span>
            </div>

            <div className="grid gap-3 pt-4 sm:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-2xl bg-site-ink p-5 text-white">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                  Website
                </span>
                <h3 className="mt-14 text-[28px] font-semibold leading-[1.02] tracking-[-0.03em]">
                  Bookings without the back-and-forth.
                </h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Mobile-first', 'Fast', 'Enquiry-led'].map((item) => (
                    <span key={item} className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/75">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-site-line bg-white p-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-site-text-muted">
                    Booking flow
                  </span>
                  <div className="mt-4 space-y-2">
                    {['Customer submits form', 'Slot confirmed', 'WhatsApp sent'].map((item, i) => (
                      <div key={item} className="flex items-center gap-2 rounded-full bg-site-offwhite px-3 py-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-site-accent text-[10px] font-semibold text-white">
                          {i + 1}
                        </span>
                        <span className="text-[12px] font-medium text-site-text-body">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-site-line bg-site-accent-soft p-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-site-text-muted">
                    Dashboard
                  </span>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {['Leads', 'Orders', 'Follow-ups'].map((item, i) => (
                      <div key={item} className="rounded-xl bg-white px-3 py-4 text-center">
                        <span className="block text-[18px] font-semibold text-site-ink">0{i}</span>
                        <span className="mt-1 block text-[10px] text-site-text-muted">{item}</span>
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

function ProofStrip() {
  return (
    <Panel bg="white" className="border-y border-site-line px-6 py-8 md:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-site-text-muted">
          Real builds
        </span>
        <div className="flex flex-wrap gap-2 md:justify-end">
          {PROOF_ITEMS.map((item) => (
            <div key={item.name} className="rounded-full border border-site-line bg-white px-4 py-2">
              <span className="text-[13px] font-semibold text-site-ink">{item.name}</span>
              <span className="ml-2 text-[12px] text-site-text-muted">{item.tags[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function ProjectMediaFrame({ media, name }: { media: ProjectMedia; name: string }) {
  const image = media.type === 'image' ? media.src : media.poster || media.mobileFallback || '';
  return (
    <div className="relative aspect-[16/11] overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.04]">
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
      <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-site-ink/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 backdrop-blur">
        {name}
      </div>
    </div>
  );
}

function FeaturedWork() {
  return (
    <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Tag variant="outline-dark" className="mb-6">
              Featured work
            </Tag>
            <SplitReveal
              as="h2"
              segments={[{ text: 'Serious builds, shown' }, { text: 'properly.', serif: true }]}
              className="max-w-[16ch] text-[clamp(34px,5vw,68px)] font-semibold leading-[1.02] tracking-[-0.02em] text-white"
            />
          </div>
          <Link
            to="/portfolio"
            data-cursor="link"
            className="text-[15px] font-medium text-white/70 underline-offset-4 outline-none transition-colors hover:text-white hover:underline focus-visible:text-white focus-visible:underline"
          >
            All work -&gt;
          </Link>
        </div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-6">
          {FEATURED_PROJECTS.slice(0, 3).map((project) => (
            <motion.article key={project.href} variants={fadeUp}>
              <Link
                to={project.href}
                data-cursor="view"
                data-cursor-label="View"
                className="group grid gap-6 rounded-[32px] border border-white/10 bg-white/[0.035] p-4 outline-none transition-[border-color,background-color,transform] duration-300 ease-brand hover:-translate-y-1 hover:border-site-accent/60 hover:bg-white/[0.055] focus-visible:ring-2 focus-visible:ring-site-accent motion-reduce:hover:translate-y-0 md:grid-cols-[1.25fr_0.75fr] md:p-5"
              >
                <ProjectMediaFrame media={project.media} name={project.no} />
                <div className="flex flex-col justify-between p-2 md:p-5">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-site-accent">
                      Project / {project.no}
                    </span>
                    <h3 className="mt-5 text-[clamp(28px,4vw,48px)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
                      {project.name}
                    </h3>
                    <p className="mt-4 max-w-md text-[15.5px] leading-[1.6] text-white/70">{project.outcome}</p>
                  </div>
                  <div className="mt-9">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-white/65">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-8 inline-flex min-h-[44px] items-center rounded-full border border-white/15 px-5 text-[14px] font-semibold text-white transition-colors group-hover:border-site-accent group-hover:bg-site-accent">
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
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-white px-6 pt-32 pb-24 md:px-10">
        <div className="absolute inset-x-0 top-0 h-[58%] bg-[linear-gradient(180deg,#F2EBFF_0%,rgba(255,255,255,0)_74%)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.08fr_0.92fr] md:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_ARR }}
              className="mb-6 font-mono text-[12px] uppercase tracking-[0.18em] text-site-text-muted"
            >
              Web design + business systems / Vaal Triangle / Gauteng
            </motion.p>

            <SplitReveal
              as="h1"
              trigger="mount"
              segments={[
                { text: "I don't just build websites. I build systems that" },
                { text: 'sell.', serif: true },
              ]}
              className="max-w-[11ch] text-[clamp(46px,7.6vw,100px)] font-semibold leading-[0.96] tracking-[-0.03em] text-site-ink"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
              className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
            >
              I help South African small businesses replace messy manual admin with professional
              websites, booking flows, dashboards and automations that keep the business organised.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <FillButton to={PRIMARY_CTA.href} variant="solid-accent">
                {PRIMARY_CTA.label}
              </FillButton>
              <Link
                to={SECONDARY_CTA.href}
                data-cursor="link"
                className="text-[15px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline"
              >
                {SECONDARY_CTA.label} -&gt;
              </Link>
            </motion.div>
          </div>

          <HeroSystemPreview />
        </div>
      </section>

      <ProofStrip />
      <ServicesSection />
      <FeaturedWork />
      <PackagesPreview />
      <HowItWorks />
      <AboutPreview />
      <PreFooterCTA />
    </>
  );
}
