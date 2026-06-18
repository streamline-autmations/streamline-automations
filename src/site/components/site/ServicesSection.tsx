import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Panel from '../craft/Panel';
import Tag from '../craft/Tag';
import SplitReveal from '../craft/SplitReveal';
import { OFFER_PILLARS } from '../../data/site';
import { fadeUp, stagger, viewport } from '../../lib/motion';

export default function ServicesSection() {
  return (
    <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <Tag variant="outline" className="mb-6">
          What I build
        </Tag>
        <SplitReveal
          as="h2"
          segments={[{ text: 'Websites,' }, { text: 'systems', serif: true }, { text: 'and the care behind them.' }]}
          className="max-w-[17ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {OFFER_PILLARS.map((pillar) => (
            <motion.div key={pillar.href} variants={fadeUp}>
              <Link
                to={pillar.href}
                data-cursor="link"
                className="group relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[28px] border border-site-line bg-white p-7 outline-none transition-[transform,border-color,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:border-site-accent/40 hover:shadow-[0_30px_80px_-30px_rgba(123,63,228,0.34)] focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 md:p-8"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-site-accent-soft opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">
                    {pillar.no} / {pillar.label}
                  </span>
                  <h3 className="mt-6 text-[25px] font-semibold leading-[1.12] tracking-[-0.02em] text-site-ink md:text-[30px]">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-[15.5px] leading-[1.55] text-site-text-body">{pillar.description}</p>
                </div>

                <div className="relative mt-10">
                  <div className="flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-site-line bg-site-offwhite px-3 py-1.5 text-[12px] font-medium text-site-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-site-line text-[18px] text-site-ink transition-all duration-300 ease-brand group-hover:border-site-accent group-hover:bg-site-accent group-hover:text-white"
                  >
                    -&gt;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Panel>
  );
}
