import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Panel from '../../components/craft/Panel';
import Tag from '../../components/craft/Tag';
import SplitReveal from '../../components/craft/SplitReveal';
import FillButton from '../../components/craft/FillButton';
import PreFooterCTA from '../../components/craft/PreFooterCTA';
import { EASE_ARR, fadeUp, viewport } from '../../lib/motion';

const C = '/assets/clients/ameli';

/**
 * Ameli Designs — Cuberto-style case study for the white-minimal v2 build.
 * Full-bleed cover → alternating ink/white/offwhite Panels. One font (DM Sans);
 * accent words via SplitReveal {serif} (purple) or text-site-accent. Real local
 * screenshots only, from /assets/clients/ameli/. Next project → BLOM.
 */
export default function Ameli() {
  return (
    <>
      {/* 1 — COVER (plain section, full-bleed) */}
      <section className="px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-7">
            Case study · Portfolio + Lead capture
          </Tag>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[
              { text: 'A portfolio that lets her' },
              { text: 'work', serif: true },
              { text: 'do the talking.' },
            ]}
            className="max-w-5xl text-[clamp(40px,7.5vw,96px)] font-semibold leading-[0.99] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.45 }}
            className="mt-8 max-w-2xl text-[17px] leading-[1.65] text-site-text-body"
          >
            Ameli is a graphic designer. She needed a fast, polished portfolio that frames her work
            properly — and quietly turns visitors into commission enquiries. So I built one with a
            custom design system, an optimised gallery, and lead capture that runs itself. Brief to
            live in four days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {['Portfolio site', 'Lead automation', 'Optimised gallery', '4-day build'].map((t) => (
              <Tag key={t} variant="outline">{t}</Tag>
            ))}
          </motion.div>

          {/* Hero image — full-bleed rounded */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_ARR, delay: 0.5 }}
            className="mt-14 overflow-hidden rounded-2xl border border-site-line bg-site-surface shadow-[0_30px_80px_-20px_rgba(76,29,149,0.18),0_10px_30px_-10px_rgba(0,0,0,0.06)] md:mt-20 md:rounded-3xl"
          >
            <img
              src={`${C}/hero.webp`}
              alt="Ameli Designs portfolio homepage on desktop"
              loading="lazy"
              draggable={false}
              className="aspect-[16/9] w-full select-none object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 2 — OVERVIEW (ink) */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline-dark" className="mb-8">
            The overview
          </Tag>

          <SplitReveal
            as="h2"
            segments={[
              { text: 'A showcase that works like a' },
              { text: 'sales tool.', serif: true },
            ]}
            className="max-w-[18ch] text-[clamp(30px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-white"
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
              <p className="text-[15px] leading-[1.6] text-white/70">
                A fast, high-performance portfolio for a working graphic designer — built to show the
                range of her work and pull in commission enquiries.
              </p>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                Stack
              </div>
              <p className="text-[15px] leading-[1.6] text-white/70">
                React, TypeScript, Tailwind CSS. Lead capture wired through n8n with instant email
                alerts. Deployed on Vercel.
              </p>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                Turnaround
              </div>
              <p className="text-[15px] leading-[1.6] text-white/70">
                Brief to live in 4 days. Custom design system, optimised gallery, and automated lead
                notifications — handed over and running.
              </p>
            </div>
          </motion.div>
        </div>
      </Panel>

      {/* 3 — WHAT I BUILT (white) */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-7">
            What I built
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Three things that earn her' }, { text: 'commissions.', serif: true }]}
            className="max-w-[20ch] text-[clamp(30px,5vw,60px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />

          {/* 3a — custom design system + gallery (text left, image right) */}
          <div className="mt-20 grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">
                01 · The design system
              </span>
              <h3 className="mt-4 text-[clamp(24px,3.2vw,38px)] font-semibold leading-[1.1] tracking-[-0.02em] text-site-ink">
                A site that reads like one of her projects.
              </h3>
              <p className="mt-5 text-[16px] leading-[1.65] text-site-text-body">
                I pulled a custom palette straight from her own brand and built the whole thing around
                it — big imagery, generous spacing, type that carries her style. It doesn't feel like
                a template. It feels like her work.
              </p>
              <p className="mt-4 text-[16px] leading-[1.65] text-site-text-body">
                Every section quietly pushes a visitor toward the same thing: getting in touch.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="overflow-hidden rounded-2xl border border-site-line bg-site-surface shadow-[0_24px_60px_-24px_rgba(76,29,149,0.16)] md:rounded-3xl"
            >
              <img
                src={`${C}/my-work.webp`}
                alt="Ameli Designs work overview page with custom palette and editorial layout"
                loading="lazy"
                draggable={false}
                className="aspect-[16/10] w-full select-none object-cover"
              />
            </motion.div>
          </div>

          {/* 3b — work framed (image left, text right) */}
          <div className="mt-20 grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="order-2 overflow-hidden rounded-2xl border border-site-line bg-site-surface shadow-[0_24px_60px_-24px_rgba(76,29,149,0.16)] md:order-1 md:rounded-3xl"
            >
              <img
                src={`${C}/jimmys.webp`}
                alt="Jimmy's Burger Bar branding project case page on Ameli Designs"
                loading="lazy"
                draggable={false}
                className="aspect-[16/10] w-full select-none object-cover"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="order-1 md:order-2"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">
                02 · The work, framed
              </span>
              <h3 className="mt-4 text-[clamp(24px,3.2vw,38px)] font-semibold leading-[1.1] tracking-[-0.02em] text-site-ink">
                Each project gets the room it deserves.
              </h3>
              <p className="mt-5 text-[16px] leading-[1.65] text-site-text-body">
                Every piece gets its own case page — the Jimmy's Burger Bar branding, the Habitat
                Cosmic Oasis festival, the "Extra" packaging — so a potential client can see the full
                story behind each job, not just a thumbnail.
              </p>
              <p className="mt-4 text-[16px] leading-[1.65] text-site-text-body">
                It frames her range the way it should be shown: brand identity, packaging, motion. And
                I kept the gallery optimised so all of it loads fast, even on a phone.
              </p>
            </motion.div>
          </div>

          {/* 3c — automation (text left, image right) */}
          <div className="mt-20 grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">
                03 · Never miss an enquiry
              </span>
              <h3 className="mt-4 text-[clamp(24px,3.2vw,38px)] font-semibold leading-[1.1] tracking-[-0.02em] text-site-ink">
                The moment someone reaches out, she knows.
              </h3>
              <p className="mt-5 text-[16px] leading-[1.65] text-site-text-body">
                The contact form is wired straight into n8n. The second someone enquires, she gets an
                instant email with all their details — no checking inboxes, no logging into a
                dashboard, no waiting.
              </p>
              <p className="mt-4 text-[16px] leading-[1.65] text-site-text-body">
                For a creative running her own show, that's the difference between landing a commission
                and losing it to a slow reply. The follow-up is automatic, so the only job left is the
                design.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="overflow-hidden rounded-2xl border border-site-line bg-site-surface shadow-[0_24px_60px_-24px_rgba(76,29,149,0.16)] md:rounded-3xl"
            >
              <img
                src={`${C}/contact.webp`}
                alt="Ameli Designs contact page with the form that feeds automated email lead capture"
                loading="lazy"
                draggable={false}
                className="aspect-[16/10] w-full select-none object-cover"
              />
            </motion.div>
          </div>
        </div>
      </Panel>

      {/* 4 — SCREENSHOTS GALLERY (offwhite) */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-7">
            The work
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Screen by' }, { text: 'screen.', serif: true }]}
            className="text-[clamp(30px,5vw,60px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />

          {/* wide portfolio grid */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-14 overflow-hidden rounded-2xl border border-site-line bg-white shadow-[0_24px_60px_-24px_rgba(76,29,149,0.14)] md:rounded-3xl"
          >
            <img
              src={`${C}/portfolio.webp`}
              alt="Ameli Designs portfolio grid showing the full body of work"
              loading="lazy"
              draggable={false}
              className="aspect-[16/9] w-full select-none object-cover"
            />
          </motion.div>

          {/* two-up */}
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="overflow-hidden rounded-2xl border border-site-line bg-white shadow-[0_24px_60px_-24px_rgba(76,29,149,0.14)] md:rounded-3xl"
            >
              <img
                src={`${C}/extra.webp`}
                alt="Extra packaging design project on Ameli Designs"
                loading="lazy"
                draggable={false}
                className="aspect-[4/3] w-full select-none object-cover"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="overflow-hidden rounded-2xl border border-site-line bg-white shadow-[0_24px_60px_-24px_rgba(76,29,149,0.14)] md:rounded-3xl"
            >
              <img
                src={`${C}/mobile-home.webp`}
                alt="Ameli Designs home page on mobile, built mobile-first"
                loading="lazy"
                draggable={false}
                className="aspect-[4/3] w-full select-none object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </Panel>

      {/* 5 — OUTCOME (ink) */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline-dark" className="mb-8">
            The outcome
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Fast to ship. Built to' }, { text: 'convert.', serif: true }]}
            className="max-w-[18ch] text-[clamp(30px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-white"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3"
          >
            {[
              { value: '4 days', label: 'From brief to live' },
              { value: 'Zero', label: 'Manual follow-up — enquiries land instantly' },
              { value: 'Mobile-first', label: 'Built for how people actually browse' },
            ].map((m) => (
              <div key={m.label} className="bg-site-ink px-7 py-10">
                <div className="text-[clamp(30px,4vw,46px)] font-semibold leading-none tracking-[-0.02em] text-white">
                  {m.value}
                </div>
                <div className="mt-4 text-[14px] leading-[1.5] text-white/60">{m.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.15 }}
            className="mt-12 max-w-2xl text-[17px] leading-[1.65] text-white/70"
          >
            She got a portfolio that looks like her own work, loads fast, and captures every enquiry
            the second it comes in. No upfront cost wasted on a slow build, no leads slipping through —
            just a clean site doing its job in the background while she designs.
          </motion.p>
        </div>
      </Panel>

      {/* 6 — NEXT PROJECT (white) */}
      <Panel bg="white" className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-10 font-mono text-[11px] uppercase tracking-[0.2em] text-site-text-muted">
            Next project
          </div>
          <Link
            to="/work/blom"
            data-cursor="view"
            data-cursor-label="Explore"
            className="group block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-4"
          >
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SplitReveal
                as="h2"
                segments={[{ text: 'BLOM' }, { text: 'Cosmetics', serif: true }]}
                className="text-[clamp(40px,8vw,104px)] font-semibold leading-[0.96] tracking-[-0.03em] text-site-ink"
              />
              <span
                aria-hidden="true"
                className="mb-3 text-[clamp(30px,5vw,56px)] text-site-text-muted transition-all duration-300 ease-brand group-hover:translate-x-2 group-hover:text-site-accent motion-reduce:group-hover:translate-x-0"
              >
                →
              </span>
            </div>
            <p className="mt-4 max-w-xl text-[16px] leading-[1.6] text-site-text-body">
              Full e-commerce, custom admin, a course platform, and email + WhatsApp automation.
              Active retainer.
            </p>
          </Link>

          <div className="mt-12">
            <FillButton to="/portfolio" variant="ink">
              See all work
            </FillButton>
          </div>
        </div>
      </Panel>

      {/* 7 — PRE-FOOTER CTA */}
      <PreFooterCTA />
    </>
  );
}
