import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Panel from '../craft/Panel';
import SplitReveal from '../craft/SplitReveal';
import { OFFER_PILLARS } from '../../data/site';
import { fadeUp, viewport } from '../../lib/motion';

const [WEBSITES, SYSTEMS, CARE] = OFFER_PILLARS;

const SERVICES = [
  {
    no: '01',
    pillar: WEBSITES,
    headline: [{ text: 'Websites that' }, { text: 'convert.', serif: true }],
    body: 'Custom-built, mobile-first, fast. Most sites go live in 3–7 days. Made to turn visitors into enquiries — not just look good.',
  },
  {
    no: '02',
    pillar: SYSTEMS,
    headline: [{ text: 'Boring stuff,' }, { text: 'automated.', serif: true }],
    body: 'Booking flows, WhatsApp automation, dashboards and CRMs. The admin that eats your day — handled.',
  },
  {
    no: '03',
    pillar: CARE,
    headline: [{ text: 'Keep it' }, { text: 'running.', serif: true }],
    body: 'Hosting, domain, SSL, monthly updates and ongoing support. The site stays live, current and looked after.',
  },
] as const;

export default function ServicesSection() {
  return (
    <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">

        {/* Section intro */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SplitReveal
            as="h2"
            segments={[
              { text: 'Three ways I can' },
              { text: 'help.', serif: true },
            ]}
            className="max-w-[14ch] text-[clamp(38px,5.5vw,72px)] font-semibold leading-[0.98] tracking-[-0.03em] text-site-ink"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-[38ch] text-[16px] leading-[1.65] text-site-text-body md:text-right"
          >
            Websites, systems and the care behind them — built solo, delivered fast, supported long-term.
          </motion.p>
        </div>

        {/* Indexed service rows */}
        <div className="divide-y divide-site-line border-t border-site-line">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.no}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                to={svc.pillar.href}
                data-cursor="link"
                className="group flex flex-col gap-6 py-10 outline-none transition-colors duration-300 md:flex-row md:items-start md:gap-12 md:py-12"
              >
                {/* Number */}
                <span className="shrink-0 font-mono text-[13px] uppercase tracking-[0.18em] text-site-text-muted transition-colors duration-300 group-hover:text-site-accent md:w-[3.5rem] md:pt-1">
                  {svc.no}
                </span>

                {/* Headline */}
                <div className="flex-1">
                  <h3 className="text-[clamp(28px,4vw,52px)] font-semibold leading-[1.02] tracking-[-0.03em] text-site-ink">
                    {svc.headline.map((seg, si) =>
                      seg.serif ? (
                        <em key={si} className="font-instrument not-italic text-site-accent">
                          {seg.text}
                        </em>
                      ) : (
                        <span key={si}>{seg.text}{' '}</span>
                      )
                    )}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-[15.5px] leading-[1.65] text-site-text-body">
                    {svc.body}
                  </p>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {svc.pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-site-line px-3 py-1.5 text-[12px] text-site-text-secondary transition-colors duration-300 group-hover:border-site-accent/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex shrink-0 items-center md:pt-2">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-site-line text-[18px] text-site-text-secondary transition-all duration-300 ease-brand group-hover:border-site-accent group-hover:bg-site-accent group-hover:text-white">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </Panel>
  );
}
