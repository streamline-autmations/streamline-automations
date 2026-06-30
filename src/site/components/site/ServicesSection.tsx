import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Panel from '../craft/Panel';
import SplitReveal from '../craft/SplitReveal';
import { OFFER_PILLARS } from '../../data/site';
import { fadeUp, stagger, viewport } from '../../lib/motion';

const [WEBSITES, SYSTEMS, CARE] = OFFER_PILLARS;

export default function ServicesSection() {
  return (
    <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <SplitReveal
          as="h2"
          segments={[{ text: 'Websites, systems and the care behind them.' }]}
          className="mb-14 max-w-[17ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
        />

        {/* Asymmetric grid: featured ink card left, two smaller cards stacked right */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4 md:grid-cols-[1.15fr_0.85fr] md:grid-rows-[1fr_1fr]"
        >
          {/* Featured card — Websites, full-height ink */}
          <motion.div variants={fadeUp} className="md:row-span-2">
            <Link
              to={WEBSITES.href}
              data-cursor="link"
              className="group relative flex h-full min-h-[460px] flex-col justify-between overflow-hidden rounded-[28px] bg-site-ink p-8 outline-none transition-transform duration-300 ease-brand hover:-translate-y-1 active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-white/60 md:min-h-0 md:p-10"
            >
              {/* Ambient purple glow top-right */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-site-accent opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
              />

              <div className="relative">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                  {WEBSITES.no} / {WEBSITES.label}
                </span>
                <h3 className="mt-8 text-[clamp(30px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
                  {WEBSITES.title}
                </h3>
                <p className="mt-5 max-w-[34ch] text-[16px] leading-[1.6] text-white/65">
                  {WEBSITES.description}
                </p>
              </div>

              <div className="relative mt-10">
                <div className="flex flex-wrap gap-2">
                  {WEBSITES.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-[12px] text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  aria-hidden="true"
                  className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-[18px] text-white/70 transition-all duration-300 ease-brand group-hover:border-white group-hover:bg-white group-hover:text-site-ink"
                >
                  -&gt;
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Systems card — top-right */}
          <motion.div variants={fadeUp}>
            <Link
              to={SYSTEMS.href}
              data-cursor="link"
              className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[28px] border border-site-line bg-white p-7 outline-none transition-[transform,border-color,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:border-site-accent/40 hover:shadow-[0_20px_60px_-24px_rgba(123,63,228,0.28)] active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
            >
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-site-accent-soft opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">
                  {SYSTEMS.no} / {SYSTEMS.label}
                </span>
                <h3 className="mt-4 text-[22px] font-semibold leading-[1.1] tracking-[-0.02em] text-site-ink md:text-[26px]">
                  {SYSTEMS.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.55] text-site-text-body">{SYSTEMS.description}</p>
              </div>
              <span
                aria-hidden="true"
                className="relative mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-site-line text-[16px] text-site-ink transition-all duration-300 ease-brand group-hover:border-site-accent group-hover:bg-site-accent group-hover:text-white"
              >
                -&gt;
              </span>
            </Link>
          </motion.div>

          {/* Care card — bottom-right */}
          <motion.div variants={fadeUp}>
            <Link
              to={CARE.href}
              data-cursor="link"
              className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[28px] border border-site-line bg-white p-7 outline-none transition-[transform,border-color,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:border-site-accent/40 hover:shadow-[0_20px_60px_-24px_rgba(123,63,228,0.28)] active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0"
            >
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-site-accent-soft opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">
                  {CARE.no} / {CARE.label}
                </span>
                <h3 className="mt-4 text-[22px] font-semibold leading-[1.1] tracking-[-0.02em] text-site-ink md:text-[26px]">
                  {CARE.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.55] text-site-text-body">{CARE.description}</p>
              </div>
              <span
                aria-hidden="true"
                className="relative mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-site-line text-[16px] text-site-ink transition-all duration-300 ease-brand group-hover:border-site-accent group-hover:bg-site-accent group-hover:text-white"
              >
                -&gt;
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Panel>
  );
}
