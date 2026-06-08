import { motion } from 'framer-motion';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import SplitReveal from '../components/craft/SplitReveal';
import FillButton from '../components/craft/FillButton';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';

// Rent-to-own monthly plans — single source for the three pricing cards.
const PLANS = [
  {
    name: 'Starter',
    price: 'R699',
    blurb: 'A clean 5-page site, hosted and looked after.',
    features: ['5-page site', 'Hosting + SSL', 'Domain included', '1 update a month'],
    popular: false,
  },
  {
    name: 'Business',
    price: 'R1,099',
    blurb: 'Room to grow, a WhatsApp CTA and SEO basics.',
    features: ['5–8 pages', 'WhatsApp CTA', 'SEO basics', '2 updates a month'],
    popular: true,
  },
  {
    name: 'Pro',
    price: 'R1,799',
    blurb: 'Bookings or a store, with priority support.',
    features: ['Booking system or e-commerce', 'Priority support', '4 updates a month', 'Everything in Business'],
    popular: false,
  },
] as const;

// Rent-to-own terms — plain, no fine print hidden anywhere.
const TERMS = [
  'I build the whole site free upfront — you only pay monthly.',
  'Minimum 3 months, then month-to-month.',
  'One calendar month written notice to cancel.',
  'Cancel before 18 months → access is revoked and the files do not transfer.',
  'After 18 months → the site is yours outright, with the full files.',
  'Once you own it, an optional R399/mo keeps it maintained.',
] as const;

// Own-it-upfront one-off ranges.
const UPFRONT = [
  { name: 'Websites', range: 'R5,000 – R20,000', desc: 'Designed, built and yours from day one.' },
  { name: 'Systems', range: 'R10,000 – R35,000', desc: 'Admin, CRM and automation built to spec.' },
] as const;

// Ongoing care retainers (separate from rent-to-own).
const RETAINERS = [
  { name: 'Essential', price: 'R499', desc: 'Updates, backups and uptime kept in check.', popular: false },
  { name: 'Growth', price: 'R1,199', desc: 'Faster turnaround, content tweaks, small features.', popular: true },
  { name: 'Partner', price: 'R2,499', desc: 'I act as your in-house team — first in the queue.', popular: false },
] as const;

const Check = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    className="mt-[3px] h-[18px] w-[18px] shrink-0 text-site-accent"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 10.5l4 4 8-9" />
  </svg>
);

/** Monthly rent-to-own plan card. Business gets an accent border + popular tag. */
function PriceCard({
  name,
  price,
  blurb,
  features,
  popular,
  index,
}: {
  name: string;
  price: string;
  blurb: string;
  features: readonly string[];
  popular: boolean;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`relative flex flex-col rounded-3xl border bg-white p-8 md:p-9 ${
        popular ? 'border-site-accent shadow-[0_30px_80px_-24px_rgba(123,63,228,0.28)]' : 'border-site-line'
      }`}
      style={{ zIndex: index }}
    >
      {popular && (
        <Tag variant="outline" className="absolute right-7 top-7 border-site-accent text-site-accent">
          Most popular
        </Tag>
      )}

      <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-site-ink md:text-[24px]">{name}</h3>
      <p className="mt-2 max-w-[28ch] text-[14.5px] leading-[1.55] text-site-text-body">{blurb}</p>

      <div className="mt-7 flex items-baseline gap-1.5">
        <span className="text-[clamp(36px,5vw,52px)] font-semibold leading-none tracking-[-0.03em] text-site-ink">
          {price}
        </span>
        <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-site-text-muted">/mo</span>
      </div>

      <ul className="mt-8 flex flex-1 flex-col gap-3.5 border-t border-site-line pt-8">
        {features.map((f) => (
          <li key={f} className="flex gap-3 text-[15px] leading-[1.45] text-site-text-body">
            <Check />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-9">
        <FillButton to="/contact" variant="ink" className="w-full">
          Book a Free Call
        </FillButton>
      </div>
    </motion.div>
  );
}

/**
 * Hosting, Email & Maintenance — the only page on the site with pricing.
 * Alternating stacked panels: white hero → ink rent-to-own model → white
 * monthly plans → offwhite own-upfront + care retainers → ink pre-footer CTA.
 */
export default function Hosting() {
  return (
    <>
      {/* HERO — white */}
      <section className="flex min-h-[100svh] items-center px-6 pt-32 pb-24 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR }}
            className="mb-7"
          >
            <Tag variant="outline">Hosting, Email & Maintenance</Tag>
          </motion.div>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[{ text: 'Your foundation.' }, { text: 'Handled', serif: true }, { text: '.' }]}
            className="max-w-[16ch] text-[clamp(44px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
          >
            No upfront cost. Pay monthly. Own it after 18 months. Hosting, email, SSL, domains and
            updates — all looked after.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.6 }}
            className="mt-10"
          >
            <FillButton to="/contact" variant="ink">
              Book a Free Call
            </FillButton>
          </motion.div>
        </div>
      </section>

      {/* THE MODEL — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-[1fr_0.9fr] md:gap-20">
          <div>
            <Tag variant="outline-dark" className="mb-8">
              Rent-to-own
            </Tag>
            <SplitReveal
              as="h2"
              segments={[{ text: 'Pay monthly.' }, { text: 'Own it', serif: true }, { text: 'after 18 months.' }]}
              className="max-w-[14ch] text-[clamp(30px,5vw,68px)] font-semibold leading-[1.04] tracking-[-0.02em] text-white"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.15 }}
              className="mt-8 max-w-md text-[16px] leading-[1.65] text-white/70"
            >
              I carry the build cost so you don't have to. You get a proper site live now, and a
              simple monthly fee that covers everything to keep it running. Stick around long enough
              and it's yours — no catch.
            </motion.p>
          </div>

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-0 self-center divide-y divide-white/10 border-y border-white/10"
          >
            {TERMS.map((t) => (
              <motion.li
                key={t}
                variants={fadeUp}
                className="flex gap-4 py-4 text-[15.5px] leading-[1.5] text-white/[0.78]"
              >
                <span aria-hidden="true" className="mt-[2px] shrink-0 font-mono text-[12px] text-site-accent">
                  —
                </span>
                <span>{t}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Panel>

      {/* MONTHLY PLANS — white */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-14 max-w-2xl">
            <Tag variant="outline" className="mb-6">
              Monthly plans
            </Tag>
            <SplitReveal
              as="h2"
              segments={[{ text: 'Pick a plan. I' }, { text: 'build', serif: true }, { text: 'the rest.' }]}
              className="max-w-[16ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.15 }}
              className="mt-6 text-[16px] leading-[1.65] text-site-text-body"
            >
              Hosting, SSL, domain and your updates are all baked in. No setup invoice, ever.
            </motion.p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {PLANS.map((plan, i) => (
              <PriceCard key={plan.name} {...plan} index={PLANS.length - i} />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.2 }}
            className="mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-site-text-muted"
          >
            Minimum 3 months · 1 calendar month notice · Yours outright after 18 months
          </motion.p>
        </div>
      </Panel>

      {/* OWN UPFRONT + CARE RETAINERS — offwhite */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-2 md:gap-12">
          {/* Own it upfront */}
          <div>
            <Tag variant="outline" className="mb-6">
              Prefer to own it upfront
            </Tag>
            <h2 className="max-w-[16ch] text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em] text-site-ink">
              Buy it <span className="text-site-accent">outright</span> from day one.
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-[1.65] text-site-text-body">
              Not into a monthly model? Pay once, own it immediately. Hosting and care are optional
              add-ons after that.
            </p>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-10 flex flex-col gap-4"
            >
              {UPFRONT.map((u) => (
                <motion.div
                  key={u.name}
                  variants={fadeUp}
                  className="flex items-center justify-between gap-6 rounded-2xl border border-site-line bg-white px-6 py-6"
                >
                  <div>
                    <div className="text-[18px] font-semibold tracking-[-0.01em] text-site-ink">{u.name}</div>
                    <p className="mt-1 max-w-[34ch] text-[14px] leading-[1.5] text-site-text-secondary">{u.desc}</p>
                  </div>
                  <div className="shrink-0 text-right font-mono text-[13px] font-medium tracking-[0.02em] text-site-ink">
                    {u.range}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Care retainers */}
          <div>
            <Tag variant="outline" className="mb-6">
              Care retainers
            </Tag>
            <h2 className="max-w-[16ch] text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em] text-site-ink">
              Already own a site? I'll <span className="text-site-accent">look after it</span>.
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-[1.65] text-site-text-body">
              Ongoing maintenance for sites and systems — yours or ones I didn't build. Pick the
              level of attention you need.
            </p>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-10 flex flex-col gap-4"
            >
              {RETAINERS.map((r) => (
                <motion.div
                  key={r.name}
                  variants={fadeUp}
                  className={`flex items-center justify-between gap-6 rounded-2xl border bg-white px-6 py-6 ${
                    r.popular ? 'border-site-accent' : 'border-site-line'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[18px] font-semibold tracking-[-0.01em] text-site-ink">{r.name}</span>
                      {r.popular && (
                        <span className="rounded-full border border-site-accent px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-site-accent">
                          Most popular
                        </span>
                      )}
                    </div>
                    <p className="mt-1 max-w-[34ch] text-[14px] leading-[1.5] text-site-text-secondary">{r.desc}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-[22px] font-semibold tracking-[-0.02em] text-site-ink">{r.price}</span>
                    <span className="ml-0.5 font-mono text-[11px] uppercase tracking-[0.1em] text-site-text-muted">/mo</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-site-text-muted">
              3-month minimum · 1-month notice
            </p>
          </div>
        </div>
      </Panel>

      <PreFooterCTA />
    </>
  );
}
