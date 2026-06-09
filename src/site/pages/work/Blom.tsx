import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Panel from '../../components/craft/Panel';
import Tag from '../../components/craft/Tag';
import SplitReveal from '../../components/craft/SplitReveal';
import FillButton from '../../components/craft/FillButton';
import PreFooterCTA from '../../components/craft/PreFooterCTA';
import { EASE_ARR, fadeUp, stagger, viewport } from '../../lib/motion';

const C = '/assets/clients/blom';

/**
 * Blom — Cuberto-style case study for BLOM Cosmetics (v2 white-minimal).
 * Full-bleed cover → alternating ink/white/offwhite Panels → next-project link
 * → PreFooterCTA. One font (DM Sans); purple accents via SplitReveal serif
 * segments + text-site-accent. Real local screenshots only.
 */
export default function Blom() {
  return (
    <>
      {/* COVER — white, full-bleed hero */}
      <section className="px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR }}
            className="mb-8"
          >
            <Tag variant="outline">Case study · E-commerce + Automation</Tag>
          </motion.div>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[
              { text: 'An entire beauty business, run on' },
              { text: 'one system.', serif: true },
            ]}
            className="max-w-[16ch] text-[clamp(40px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.45 }}
            className="mt-8 max-w-2xl text-[17px] leading-[1.65] text-site-text-body md:text-[19px]"
          >
            A full e-commerce store, a custom admin dashboard, the BLOM Academy course platform, and
            email plus WhatsApp automation — all running on one Supabase backend. I built it, and I
            still run it on an active retainer.
          </motion.p>

          <motion.ul
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mt-9 flex flex-wrap gap-3"
          >
            {['E-commerce', 'Custom Admin', 'Course Platform', 'WhatsApp + Email'].map((t) => (
              <motion.li key={t} variants={fadeUp}>
                <Tag variant="outline">{t}</Tag>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <FillButton href="https://blom-cosmetics.co.za" external variant="ink">
              Visit the live site
            </FillButton>
            <Link
              to="/portfolio"
              data-cursor="link"
              className="text-[15px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline"
            >
              All work →
            </Link>
          </motion.div>
        </div>

        {/* Hero image — full-bleed rounded */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_ARR, delay: 0.35 }}
          className="mx-auto mt-14 w-full max-w-7xl md:mt-20"
        >
          <img
            src={`${C}/hero.webp`}
            alt="BLOM Cosmetics storefront homepage"
            loading="lazy"
            draggable={false}
            className="aspect-[16/10] w-full select-none rounded-2xl border border-site-line object-cover md:rounded-3xl"
          />
        </motion.div>
      </section>

      {/* OVERVIEW — ink, facts strip */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline-dark" className="mb-8">
            Overview
          </Tag>
          <SplitReveal
            as="h2"
            segments={[
              { text: 'One backend behind the store, the admin, and the' },
              { text: 'academy.', serif: true },
            ]}
            className="max-w-[22ch] text-[clamp(28px,5vw,60px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white"
          />

          <motion.dl
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-16 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 md:grid-cols-3"
          >
            <motion.div variants={fadeUp}>
              <dt className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                What it is
              </dt>
              <dd className="text-[16px] leading-[1.6] text-white/70">
                A full online store, a custom owner-run admin, and the BLOM Academy course platform —
                one login, one system.
              </dd>
            </motion.div>
            <motion.div variants={fadeUp}>
              <dt className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                The stack
              </dt>
              <dd className="text-[16px] leading-[1.6] text-white/70">
                React, TypeScript and Tailwind on Supabase. PayFast for payments, n8n for the
                automation, WhatsApp and email for the customer.
              </dd>
            </motion.div>
            <motion.div variants={fadeUp}>
              <dt className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                Status
              </dt>
              <dd className="text-[16px] leading-[1.6] text-white/70">
                Live in production at blom-cosmetics.co.za. PayFast running. Active retainer — I still
                maintain it.
              </dd>
            </motion.div>
          </motion.dl>
        </div>
      </Panel>

      {/* WHAT I BUILT — white, the storefront */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <Tag variant="outline" className="mb-7">
                01 · The storefront
              </Tag>
              <SplitReveal
                as="h2"
                segments={[
                  { text: 'A shop that loads fast and never' },
                  { text: 'oversells.', serif: true },
                ]}
                className="max-w-[16ch] text-[clamp(30px,4.5vw,56px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
              />
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-7 space-y-5 text-[16px] leading-[1.65] text-site-text-body"
              >
                <p>
                  I built a clean storefront with real product photography, instant cart updates, and a
                  checkout flow that's mobile-first from the ground up. Real ZAR pricing, real PayFast
                  at the till.
                </p>
                <p>
                  Stock syncs in real time against the backend, so a customer never hits an
                  out-of-stock surprise at checkout — and BLOM never sells something they can't ship.
                </p>
              </motion.div>
              <ul className="mt-8 flex flex-wrap gap-3">
                {['Real-time inventory', 'Mobile checkout', 'PayFast live', 'Custom discount logic'].map(
                  (p) => (
                    <li key={p}>
                      <Tag variant="outline">{p}</Tag>
                    </li>
                  )
                )}
              </ul>
            </div>

            <motion.img
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: EASE_ARR }}
              src={`${C}/shop.webp`}
              alt="BLOM Cosmetics shop page with product grid and live ZAR pricing"
              loading="lazy"
              draggable={false}
              className="aspect-[4/3] w-full select-none rounded-2xl border border-site-line object-cover md:rounded-3xl"
            />
          </div>

          {/* Two-up: product + categories */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2 md:gap-8"
          >
            <motion.img
              variants={fadeUp}
              src={`${C}/product.webp`}
              alt="BLOM Cosmetics product detail page"
              loading="lazy"
              draggable={false}
              className="aspect-[4/3] w-full select-none rounded-2xl border border-site-line object-cover md:rounded-3xl"
            />
            <motion.img
              variants={fadeUp}
              src={`${C}/categories.webp`}
              alt="BLOM Cosmetics shop categories browsing page"
              loading="lazy"
              draggable={false}
              className="aspect-[4/3] w-full select-none rounded-2xl border border-site-line object-cover md:rounded-3xl"
            />
          </motion.div>
        </div>
      </Panel>

      {/* THE ADMIN OS — offwhite */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <motion.img
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: EASE_ARR }}
              src={`${C}/admin-analytics.webp`}
              alt="BLOM Cosmetics custom admin dashboard with sales analytics"
              loading="lazy"
              draggable={false}
              className="order-2 aspect-[16/10] w-full select-none rounded-2xl border border-site-line object-cover md:order-1 md:rounded-3xl"
            />
            <div className="order-1 md:order-2">
              <Tag variant="outline" className="mb-7">
                02 · The admin OS
              </Tag>
              <SplitReveal
                as="h2"
                segments={[
                  { text: 'A command centre BLOM actually' },
                  { text: 'owns.', serif: true },
                ]}
                className="max-w-[16ch] text-[clamp(30px,4.5vw,56px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
              />
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-7 space-y-5 text-[16px] leading-[1.65] text-site-text-body"
              >
                <p>
                  Instead of paying a monthly fee for a generic dashboard, BLOM got a custom admin they
                  own outright: edit prices, descriptions and images live, manage orders, and watch
                  sales analytics in one place.
                </p>
                <p>
                  Low-stock alerts and order statuses surface the moment they matter — no spreadsheets,
                  no plugins, and zero monthly platform fees.
                </p>
              </motion.div>
              <ul className="mt-8 flex flex-wrap gap-3">
                {['Live product editing', 'Order management', 'Low-stock alerts', 'Owner-editable'].map(
                  (p) => (
                    <li key={p}>
                      <Tag variant="outline">{p}</Tag>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </Panel>

      {/* BLOM ACADEMY — white */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <Tag variant="outline" className="mb-7">
              03 · BLOM Academy
            </Tag>
            <SplitReveal
              as="h2"
              segments={[
                { text: 'A course platform, built into the same' },
                { text: 'login.', serif: true },
              ]}
              className="max-w-[18ch] text-[clamp(30px,4.5vw,56px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
            />
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-7 space-y-5 text-[16px] leading-[1.65] text-site-text-body"
            >
              <p>
                BLOM teaches as well as sells, so the Academy lives inside the same platform. Students
                browse courses, work through lessons, and pick up their materials without ever leaving
                the site.
              </p>
              <p>
                On the admin side it's the same story: schedule courses, track students, and upload
                lesson materials from the dashboard BLOM already knows.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-14 grid gap-6 md:gap-8 lg:grid-cols-2"
          >
            <motion.img
              variants={fadeUp}
              src={`${C}/courses.webp`}
              alt="BLOM Academy courses listing page"
              loading="lazy"
              draggable={false}
              className="aspect-[16/10] w-full select-none rounded-2xl border border-site-line object-cover md:rounded-3xl"
            />
            <motion.img
              variants={fadeUp}
              src={`${C}/academy-lesson.webp`}
              alt="BLOM Academy lesson player with course content"
              loading="lazy"
              draggable={false}
              className="aspect-[16/10] w-full select-none rounded-2xl border border-site-line object-cover md:rounded-3xl"
            />
          </motion.div>
        </div>
      </Panel>

      {/* THE AUTOMATION LAYER — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <Tag variant="outline-dark" className="mb-7">
                04 · The automation layer
              </Tag>
              <SplitReveal
                as="h2"
                segments={[
                  { text: 'The work that happens while BLOM' },
                  { text: 'sleeps.', serif: true },
                ]}
                className="max-w-[16ch] text-[clamp(30px,4.5vw,56px)] font-semibold leading-[1.04] tracking-[-0.02em] text-white"
              />
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="mt-7 space-y-5 text-[16px] leading-[1.65] text-white/70"
              >
                <p>
                  Every order kicks off a chain automatically: a branded PDF invoice, an order-ready
                  email, and a WhatsApp confirmation straight to the customer — all wired through n8n.
                </p>
                <p>
                  It's the invisible part of the build, and it's the part that quietly saves hours
                  every single week.
                </p>
              </motion.div>
              <ul className="mt-8 flex flex-wrap gap-3">
                {['WhatsApp order updates', 'Branded email', 'PDF invoicing', 'n8n'].map((p) => (
                  <li key={p}>
                    <Tag variant="outline-dark">{p}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            <motion.img
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.7, ease: EASE_ARR }}
              src={`${C}/whatsapp.webp`}
              alt="Automated WhatsApp order confirmation message sent to a BLOM customer"
              loading="lazy"
              draggable={false}
              className="mx-auto aspect-[3/4] w-full max-w-sm select-none rounded-2xl border border-white/10 object-cover md:rounded-3xl"
            />
          </div>
        </div>
      </Panel>

      {/* GALLERY — white, the strong shots */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-7">
            The build
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Screen by' }, { text: 'screen.', serif: true }]}
            className="text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
          />

          {/* Wide hero shot */}
          <motion.img
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE_ARR }}
            src={`${C}/home-full.webp`}
            alt="Full BLOM Cosmetics homepage layout, top to bottom"
            loading="lazy"
            draggable={false}
            className="mt-12 w-full select-none rounded-2xl border border-site-line object-cover md:rounded-3xl"
          />

          {/* 2-col grid of details */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2 md:gap-8"
          >
            {[
              { src: 'admin-edit.webp', alt: 'BLOM admin product editor with live pricing and image fields' },
              { src: 'admin-orders.webp', alt: 'BLOM admin order management table' },
              { src: 'account.webp', alt: 'BLOM customer account and order history page' },
              { src: 'academy-login.webp', alt: 'BLOM Academy student login screen' },
            ].map((shot) => (
              <motion.img
                key={shot.src}
                variants={fadeUp}
                src={`${C}/${shot.src}`}
                alt={shot.alt}
                loading="lazy"
                draggable={false}
                className="aspect-[16/10] w-full select-none rounded-2xl border border-site-line object-cover md:rounded-3xl"
              />
            ))}
          </motion.div>

          {/* Mobile shot — narrow, centred */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE_ARR }}
            className="mt-6 flex justify-center md:mt-8"
          >
            <img
              src={`${C}/mobile-shop.webp`}
              alt="BLOM Cosmetics shop on a mobile phone — built mobile-first"
              loading="lazy"
              draggable={false}
              className="aspect-[9/19] w-full max-w-[280px] select-none rounded-[2rem] border border-site-line object-cover"
            />
          </motion.div>
        </div>
      </Panel>

      {/* OUTCOME — offwhite, honest results */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-7">
            Outcome
          </Tag>
          <SplitReveal
            as="h2"
            segments={[
              { text: 'One platform, no monthly platform' },
              { text: 'fees.', serif: true },
            ]}
            className="max-w-[20ch] text-[clamp(30px,4.5vw,60px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-7 max-w-2xl text-[17px] leading-[1.65] text-site-text-body"
          >
            The store, the admin, and the Academy all run off one Supabase backend BLOM owns. No
            Shopify-style cut on every sale, no plugin subscriptions. Orders confirm, invoice, and
            notify the customer on their own. It's live, it's in production, and I still maintain it on
            an active retainer.
          </motion.p>

          <motion.dl
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-14 grid gap-10 border-t border-site-line pt-12 sm:grid-cols-3"
          >
            {[
              ['1 backend', 'Store, admin and academy, unified on Supabase'],
              ['24/7', 'WhatsApp and email order automation, hands-off'],
              ['Live', 'PayFast in production on blom-cosmetics.co.za'],
            ].map(([value, label]) => (
              <motion.div key={value} variants={fadeUp}>
                <dt className="text-[clamp(34px,5vw,56px)] font-semibold tracking-[-0.02em] text-site-ink">
                  <span className="text-site-accent">{value}</span>
                </dt>
                <dd className="mt-3 text-[15px] leading-[1.6] text-site-text-secondary">{label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </Panel>

      {/* NEXT PROJECT — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            Next project
          </span>
          <Link
            to="/work/recklessbear"
            data-cursor="view"
            data-cursor-label="Explore"
            className="group mt-6 block outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-site-ink"
          >
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SplitReveal
                as="h2"
                segments={[{ text: 'RecklessBear' }, { text: 'Apparel', serif: true }]}
                serifClassName="text-white/70"
                className="max-w-[14ch] text-[clamp(40px,8vw,108px)] font-semibold leading-[0.96] tracking-[-0.03em] text-white"
              />
              <span
                aria-hidden="true"
                className="pb-3 text-[clamp(40px,8vw,88px)] leading-none text-white/40 transition-all duration-300 ease-brand group-hover:translate-x-2 group-hover:text-white motion-reduce:group-hover:translate-x-0"
              >
                →
              </span>
            </div>
            <p className="mt-5 max-w-xl text-[16px] leading-[1.65] text-white/70">
              Website, admin and CRM, 12-stage production tracking, WhatsApp automation, and an AI quote
              engine. Active retainer.
            </p>
          </Link>
        </div>
      </Panel>

      <PreFooterCTA />
    </>
  );
}
