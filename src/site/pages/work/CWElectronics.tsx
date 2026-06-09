import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Panel from '../../components/craft/Panel';
import Tag from '../../components/craft/Tag';
import SplitReveal from '../../components/craft/SplitReveal';
import FillButton from '../../components/craft/FillButton';
import PreFooterCTA from '../../components/craft/PreFooterCTA';
import { EASE_ARR, fadeUp, stagger, viewport } from '../../lib/motion';
import { STOCK } from '../../data/site';

const C = '/assets/clients/cw-electronics';

/**
 * CWElectronics — Cuberto-style case study for the white-minimal v2 build.
 * Full-bleed white cover, then alternating ink/white/offwhite Panels:
 * overview → what I built (with screenshots interspersed) → gallery → outcome,
 * a big "next project" link, and the shared PreFooterCTA. One font (DM Sans);
 * accents are purple via SplitReveal serif segments / text-site-accent.
 */
export default function CWElectronics() {
  return (
    <>
      {/* COVER — white, full-bleed */}
      <section className="px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR }}
          >
            <Tag variant="outline" className="mb-7">
              CW Electronics · E-commerce + Admin
            </Tag>
          </motion.div>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[
              { text: '700+ products,' },
              { text: 'live', serif: true },
              { text: 'in under two weeks.' },
            ]}
            className="max-w-[16ch] text-[clamp(40px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.45 }}
            className="mt-8 max-w-2xl text-[17px] leading-[1.65] text-site-text-body"
          >
            A full e-commerce store with retail and wholesale pricing, stock analytics, and a
            fully owner-editable admin — built for a Johannesburg electronics importer. PayFast is
            live, the catalogue runs at cw-electronics.co.za, and I still maintain it on an active
            retainer.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            {['E-commerce', 'Retail + Wholesale', 'Custom Admin', 'PayFast', 'Active retainer'].map(
              (t) => (
                <motion.span key={t} variants={fadeUp}>
                  <Tag variant="outline">{t}</Tag>
                </motion.span>
              )
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <FillButton
              href="https://cw-electronics.co.za"
              external
              variant="ink"
              dataCursor="view"
            >
              Visit the live store
            </FillButton>
            <Link
              to="/portfolio"
              data-cursor="link"
              className="text-[15px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline"
            >
              All work →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_ARR, delay: 0.5 }}
            className="mt-14 overflow-hidden rounded-2xl border border-site-line bg-site-surface shadow-[0_30px_80px_-20px_rgba(76,29,149,0.18),0_10px_30px_-10px_rgba(0,0,0,0.06)] md:mt-20 md:rounded-3xl"
          >
            <img
              src={`${C}/hero.webp`}
              alt="CW Electronics storefront homepage showing the electronics catalogue"
              loading="lazy"
              draggable={false}
              className="aspect-[16/9] w-full select-none object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline-dark" className="mb-8">
            The brief
          </Tag>
          <SplitReveal
            as="h2"
            segments={[
              { text: 'One importer.' },
              { text: 'Two markets.', serif: true },
              { text: 'A catalogue that fills itself.' },
            ]}
            className="max-w-[20ch] text-[clamp(30px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-16 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 md:grid-cols-3"
          >
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                What it is
              </div>
              <p className="text-[16px] leading-[1.6] text-white/[0.78]">
                A retail and wholesale e-commerce store for a JHB-based Chinese electronics
                importer — Shop C15, China Mart, Crown Mines.
              </p>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                The stack
              </div>
              <p className="text-[16px] leading-[1.6] text-white/[0.78]">
                React, TypeScript and Tailwind on the front, Supabase behind it, PayFast for
                checkout, deployed on Vercel.
              </p>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                Status
              </div>
              <p className="text-[16px] leading-[1.6] text-white/[0.78]">
                Live at cw-electronics.co.za with PayFast in production. Active retainer — I still
                maintain it.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-16 grid gap-8 border-t border-white/10 pt-12 sm:grid-cols-3"
          >
            {[
              { value: '700+', label: 'Products live in under 2 weeks' },
              { value: '2-tier', label: 'Retail + wholesale pricing' },
              { value: 'Live', label: 'PayFast checkout in production' },
            ].map((m) => (
              <motion.div key={m.label} variants={fadeUp}>
                <div className="text-[clamp(40px,7vw,72px)] font-semibold leading-none tracking-[-0.03em] text-white">
                  {m.value}
                </div>
                <div className="mt-3 max-w-[22ch] text-[14px] leading-[1.5] text-white/60">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Panel>

      {/* WHAT I BUILT — white */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-8">
            What I built
          </Tag>

          {/* 01 — storefront */}
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-site-accent">
                01 — The storefront
              </span>
              <SplitReveal
                as="h3"
                segments={[
                  { text: 'A fast store for a' },
                  { text: 'big', serif: true },
                  { text: 'catalogue.' },
                ]}
                className="mt-4 max-w-[16ch] text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em] text-site-ink"
              />
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-6 space-y-4 text-[16px] leading-[1.65] text-site-text-body"
              >
                <p>
                  I built the storefront to carry 700+ products without ever feeling heavy. Sharp
                  category browsing, clean product pages, and a checkout that just works.
                </p>
                <p>
                  It loads fast and stays fast — because when someone's scrolling a catalogue this
                  big, a slow shop is a closed tab.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: EASE_ARR }}
              className="overflow-hidden rounded-2xl border border-site-line bg-site-surface shadow-[0_24px_60px_-24px_rgba(76,29,149,0.16)] md:rounded-3xl"
            >
              <img
                src={`${C}/home-2.webp`}
                alt="CW Electronics home page with featured electronics and category tiles"
                loading="lazy"
                draggable={false}
                className="aspect-[16/10] w-full select-none object-cover"
              />
            </motion.div>
          </div>

          {/* 02 — retail + wholesale (reversed) */}
          <div className="mt-24 grid items-center gap-12 md:mt-32 md:grid-cols-2 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: EASE_ARR }}
              className="overflow-hidden rounded-2xl border border-site-line bg-site-surface shadow-[0_24px_60px_-24px_rgba(76,29,149,0.16)] md:order-1 md:rounded-3xl"
            >
              <img
                src={`${C}/categories.webp`}
                alt="CW Electronics category browsing across the product range"
                loading="lazy"
                draggable={false}
                className="aspect-[16/10] w-full select-none object-cover"
              />
            </motion.div>
            <div className="md:order-2">
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-site-accent">
                02 — Retail + wholesale
              </span>
              <SplitReveal
                as="h3"
                segments={[{ text: 'One store, two' }, { text: 'prices.', serif: true }]}
                className="mt-4 max-w-[16ch] text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em] text-site-ink"
              />
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-6 space-y-4 text-[16px] leading-[1.65] text-site-text-body"
              >
                <p>
                  CW sells to walk-in retail customers and bulk wholesale buyers from the same
                  catalogue, so the store shows each one the right price automatically — no separate
                  site, no second login.
                </p>
                <p>
                  There's a nudge baked in: add a few more units and you unlock wholesale pricing.
                  It's a simple mechanic that quietly lifts basket size, and it suits an importer
                  model perfectly.
                </p>
              </motion.div>
              <div className="mt-7 flex flex-wrap gap-3">
                {['Dual pricing', 'Wholesale unlock', 'Stock analytics'].map((p) => (
                  <Tag key={p} variant="outline">
                    {p}
                  </Tag>
                ))}
              </div>
            </div>
          </div>

          {/* 03 — owner-editable */}
          <div className="mt-24 grid items-center gap-12 md:mt-32 md:grid-cols-2 md:gap-16">
            <div>
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-site-accent">
                03 — Owner-editable admin
              </span>
              <SplitReveal
                as="h3"
                segments={[
                  { text: 'Built so the owner runs it' },
                  { text: 'himself.', serif: true },
                ]}
                className="mt-4 max-w-[16ch] text-[clamp(28px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em] text-site-ink"
              />
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-6 space-y-4 text-[16px] leading-[1.65] text-site-text-body"
              >
                <p>
                  No developer in the loop for day-to-day work. The owner adds products, edits
                  pricing, manages stock, and works through orders straight from the admin — all of
                  it his to control.
                </p>
                <p>
                  That's how 700+ products went live in under two weeks: I built the system, handed
                  over the keys, and the catalogue filled itself out. No platform fees, no waiting
                  on me.
                </p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: EASE_ARR }}
              className="overflow-hidden rounded-2xl border border-site-line bg-site-surface shadow-[0_24px_60px_-24px_rgba(76,29,149,0.16)] md:rounded-3xl"
            >
              <img
                src={`${C}/product.webp`}
                alt="CW Electronics product page with pricing and stock detail"
                loading="lazy"
                draggable={false}
                className="aspect-[16/10] w-full select-none object-cover"
              />
            </motion.div>
          </div>
        </div>
      </Panel>

      {/* GALLERY — offwhite */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-6">
            The build
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Screen by' }, { text: 'screen.', serif: true }]}
            className="max-w-[14ch] text-[clamp(32px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
          />

          <div className="mt-14 grid gap-6 md:gap-8">
            {/* full-width shop */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: EASE_ARR }}
              className="overflow-hidden rounded-2xl border border-site-line bg-white shadow-[0_24px_60px_-24px_rgba(76,29,149,0.16)] md:rounded-3xl"
            >
              <img
                src={`${C}/shop.webp`}
                alt="CW Electronics shop page listing products with retail and wholesale pricing"
                loading="lazy"
                draggable={false}
                className="aspect-[16/9] w-full select-none object-cover"
              />
            </motion.div>

            {/* 2-col: categories + product */}
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.7, ease: EASE_ARR }}
                className="overflow-hidden rounded-2xl border border-site-line bg-white shadow-[0_24px_60px_-24px_rgba(76,29,149,0.16)] md:rounded-3xl"
              >
                <img
                  src={`${C}/categories.webp`}
                  alt="CW Electronics category navigation across the catalogue"
                  loading="lazy"
                  draggable={false}
                  className="aspect-[4/3] w-full select-none object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.7, ease: EASE_ARR, delay: 0.08 }}
                className="overflow-hidden rounded-2xl border border-site-line bg-white shadow-[0_24px_60px_-24px_rgba(76,29,149,0.16)] md:rounded-3xl"
              >
                <img
                  src={`${C}/product.webp`}
                  alt="CW Electronics product detail page"
                  loading="lazy"
                  draggable={false}
                  className="aspect-[4/3] w-full select-none object-cover"
                />
              </motion.div>
            </div>

            {/* 2-col: home-2 wide + mobile shot */}
            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.7, ease: EASE_ARR }}
                className="overflow-hidden rounded-2xl border border-site-line bg-white shadow-[0_24px_60px_-24px_rgba(76,29,149,0.16)] md:rounded-3xl"
              >
                <img
                  src={`${C}/home-2.webp`}
                  alt="CW Electronics home page layout"
                  loading="lazy"
                  draggable={false}
                  className="h-full min-h-[260px] w-full select-none object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.7, ease: EASE_ARR, delay: 0.08 }}
                className="flex items-center justify-center overflow-hidden rounded-2xl border border-site-line bg-site-surface p-6 md:rounded-3xl"
              >
                <img
                  src={`${C}/mobile-product.webp`}
                  alt="CW Electronics product page on mobile"
                  loading="lazy"
                  draggable={false}
                  className="max-h-[440px] w-auto select-none rounded-xl object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </Panel>

      {/* OUTCOME — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <Tag variant="outline-dark" className="mb-8">
            The outcome
          </Tag>
          <SplitReveal
            as="h2"
            segments={[
              { text: 'I built the system and handed over the' },
              { text: 'keys.', serif: true },
            ]}
            className="max-w-[20ch] text-[clamp(30px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white"
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-8 max-w-2xl space-y-4 text-[17px] leading-[1.65] text-white/70"
          >
            <p>
              700+ products went live in under two weeks, with retail and wholesale pricing running
              from one catalogue and PayFast checkout in production. The owner runs the whole thing
              himself — products, pricing, stock, orders — with no platform fees and no developer in
              the loop.
            </p>
            <p>
              The store is live at cw-electronics.co.za and I keep it maintained on an active
              retainer. Same site, two markets, fully in the owner's hands.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-12"
          >
            <FillButton
              href="https://cw-electronics.co.za"
              external
              variant="on-dark"
              dataCursor="view"
            >
              Visit cw-electronics.co.za
            </FillButton>
          </motion.div>
        </div>
      </Panel>

      {/* NEXT PROJECT — white */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-site-text-muted">
            Next project
          </span>
          <Link
            to="/work/ameli"
            data-cursor="view"
            data-cursor-label="Explore"
            className="group mt-4 block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-4"
          >
            <div className="flex items-end justify-between gap-6">
              <SplitReveal
                as="h2"
                segments={[{ text: 'Ameli' }, { text: 'Designs', serif: true }]}
                className="text-[clamp(44px,10vw,128px)] font-semibold leading-[0.95] tracking-[-0.03em] text-site-ink"
              />
              <span
                aria-hidden="true"
                className="mb-3 shrink-0 text-[clamp(32px,6vw,64px)] leading-none text-site-text-muted transition-all duration-300 ease-brand group-hover:translate-x-2 group-hover:text-site-accent motion-reduce:group-hover:translate-x-0"
              >
                →
              </span>
            </div>
            <p className="mt-4 max-w-md text-[16px] leading-[1.6] text-site-text-body">
              Portfolio + lead capture — a fast portfolio for a skin and brow studio with automated
              email lead capture. 4-day build.
            </p>
          </Link>
        </div>
      </Panel>

      <PreFooterCTA videoSrc={STOCK.ctaLoop} />
    </>
  );
}
