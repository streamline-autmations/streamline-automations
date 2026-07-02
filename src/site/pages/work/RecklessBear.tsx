import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Panel from '../../components/craft/Panel';
import Tag from '../../components/craft/Tag';
import SplitReveal from '../../components/craft/SplitReveal';
import FillButton from '../../components/craft/FillButton';
import PreFooterCTA from '../../components/craft/PreFooterCTA';
import { EASE_ARR, fadeUp, viewport } from '../../lib/motion';

const C = '/assets/clients/recklessbear';
const NEXT = '/work/cw-electronics';

/**
 * RecklessBear Apparel — Cuberto-style case study for the white-minimal v2 build.
 * Full-bleed cover, then alternating ink/white/offwhite Panels. One font (DM Sans);
 * accent words via SplitReveal {serif:true} or text-site-accent. Real local
 * screenshots only from /assets/clients/recklessbear/. Ends on a big "Next project"
 * link to CW Electronics, then the shared PreFooterCTA.
 */
export default function RecklessBear() {
  return (
    <>
      {/* 1 · COVER — white, full-bleed */}
      <section className="px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR }}
            className="mb-7"
          >
            <Tag variant="outline">Case study · Site + CRM + AI</Tag>
          </motion.div>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[
              { text: 'A custom apparel site that turns visitors into' },
              { text: 'quoted', serif: true },
              { text: 'orders.' },
            ]}
            className="max-w-[16ch] text-[clamp(40px,7.5vw,96px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
            className="mt-8 max-w-2xl text-[17px] leading-[1.65] text-site-text-body md:text-[19px]"
          >
            RecklessBear runs on custom apparel orders. I built them the full stack behind that — a
            bold website, a 24/7 AI quote engine that qualifies every lead, a custom admin and CRM,
            a 12-stage production tracker, and WhatsApp automation tying it all together. I still run
            it on an active retainer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {['Custom Website', 'AI Quote Engine', 'Admin + CRM', '12-Stage Production', 'WhatsApp Automation'].map(
              (t) => <Tag key={t} variant="outline">{t}</Tag>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_ARR, delay: 0.65 }}
            className="mt-14 overflow-hidden rounded-2xl border border-site-line bg-site-surface shadow-[0_30px_80px_-20px_rgba(76,29,149,0.18),0_10px_30px_-10px_rgba(0,0,0,0.06)] md:mt-16 md:rounded-3xl"
          >
            <img
              src={`${C}/hero.webp`}
              alt="RecklessBear custom apparel website homepage"
              loading="eager"
              draggable={false}
              className="aspect-[16/10] w-full select-none object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 2 · OVERVIEW — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline-dark" className="mb-8">
            The overview
          </Tag>
          <SplitReveal
            as="h2"
            segments={[
              { text: 'One system that handles the order from' },
              { text: 'first', serif: true },
              { text: 'message to the door.' },
            ]}
            className="max-w-[18ch] text-[clamp(30px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-white"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-16 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 md:grid-cols-4"
          >
            <div>
              <div className="mb-3 text-[14px] font-medium text-white/80">Client</div>
              <p className="text-[16px] leading-[1.6] text-white/[0.78]">
                RecklessBear Apparel — custom and branded clothing, South Africa.
              </p>
            </div>
            <div>
              <div className="mb-3 text-[14px] font-medium text-white/80">What it is</div>
              <p className="text-[16px] leading-[1.6] text-white/[0.78]">
                Website, custom admin + CRM, production tracker, and an AI quote engine — wired into
                one flow.
              </p>
            </div>
            <div>
              <div className="mb-3 text-[14px] font-medium text-white/80">Built with</div>
              <p className="text-[16px] leading-[1.6] text-white/[0.78]">
                React, TypeScript, Tailwind, Supabase, Voiceflow, n8n, the WhatsApp API and Trello.
              </p>
            </div>
            <div>
              <div className="mb-3 text-[14px] font-medium text-white/80">Status</div>
              <p className="text-[16px] leading-[1.6] text-white/[0.78]">
                Live and running on an active retainer since launch.
              </p>
            </div>
          </motion.div>
        </div>
      </Panel>

      {/* 3 · WHAT I BUILT — white */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-6">
            What I built
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Five pieces, one' }, { text: 'pipeline', serif: true }]}
            className="max-w-[16ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
          />

          {/* 3a — the website */}
          <div className="mt-16 grid items-center gap-10 md:mt-20 md:grid-cols-2 md:gap-14">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
              <span className="text-[14px] font-medium text-site-accent">01 · The website</span>
              <h3 className="mt-3 text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-site-ink md:text-[32px]">
                A loud brand site that turns browsers into briefs.
              </h3>
              <p className="mt-5 text-[16px] leading-[1.65] text-site-text-body md:text-[17px]">
                RecklessBear lives on custom orders, so the site is dark, fast and unapologetically
                on-brand — heavy type, that signature red, built mobile-first because that's where
                most people land.
              </p>
              <p className="mt-4 text-[16px] leading-[1.65] text-site-text-body md:text-[17px]">
                Every path pushes the visitor toward a proper custom-order request instead of a DM.
                No "slide into the inbox" — they hit a structured form, and I capture exactly what
                the team needs to quote.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="overflow-hidden rounded-2xl border border-site-line bg-site-surface md:rounded-3xl"
            >
              <img
                src={`${C}/home.webp`}
                alt="RecklessBear homepage with bold branding and a custom-order call to action"
                loading="lazy"
                draggable={false}
                className="aspect-[16/10] w-full object-cover"
              />
            </motion.div>
          </div>

          {/* 3b — the AI quote engine (reverse) */}
          <div className="mt-16 grid items-center gap-10 md:mt-24 md:grid-cols-2 md:gap-14">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="overflow-hidden rounded-2xl border border-site-line bg-site-surface md:order-1 md:rounded-3xl"
            >
              <img
                src={`${C}/chatbot.webp`}
                alt="RecklessBear AI quote assistant chat that qualifies a lead and books an appointment"
                loading="lazy"
                draggable={false}
                className="aspect-[16/10] w-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="md:order-2"
            >
              <span className="text-[14px] font-medium text-site-accent">
                02 · The AI quote engine
              </span>
              <h3 className="mt-3 text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-site-ink md:text-[32px]">
                An assistant that qualifies the lead before anyone replies.
              </h3>
              <p className="mt-5 text-[16px] leading-[1.65] text-site-text-body md:text-[17px]">
                This is the standout. A Voiceflow assistant answers instantly, 24/7 — it asks the
                product, the quantity, the design and the timeline, qualifies whether the lead is
                real, and books an appointment automatically when it is.
              </p>
              <p className="mt-4 text-[16px] leading-[1.65] text-site-text-body md:text-[17px]">
                Then it drops a structured brief straight into admin. The team opens it already
                knowing what they're quoting. And if a lead goes unanswered, it escalates to the CEO
                so nothing slips.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {['Voiceflow', '24/7 capture', 'Books appointments', 'Escalates to CEO'].map((p) => (
                  <Tag key={p} variant="outline">{p}</Tag>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 3c — admin, CRM + production (full-width image under) */}
          <div className="mt-16 md:mt-24">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="max-w-2xl"
            >
              <span className="text-[14px] font-medium text-site-accent">
                03 · Admin, CRM + production
              </span>
              <h3 className="mt-3 text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-site-ink md:text-[32px]">
                A command centre that tracks every order to the door.
              </h3>
              <p className="mt-5 text-[16px] leading-[1.65] text-site-text-body md:text-[17px]">
                Behind the site sits a custom admin — manage orders, keep a real customer database,
                and run a 12-stage production board that follows every job from quote to delivery.
                As an order moves through the board the customer gets WhatsApp status updates
                automatically. The result: 100% lead visibility and a clean quote-to-order flow,
                with no spreadsheets and no guessing where a job is.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-10 overflow-hidden rounded-2xl border border-site-line bg-site-surface md:rounded-3xl"
            >
              <img
                src={`${C}/admin.webp`}
                alt="RecklessBear custom admin showing the 12-stage production tracking board"
                loading="lazy"
                draggable={false}
                className="aspect-[21/9] w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </Panel>

      {/* 4 · GALLERY — offwhite */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-6">
            The build
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Screen by' }, { text: 'screen', serif: true }]}
            className="max-w-[14ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
          />

          <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
            {/* wide — all products */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="overflow-hidden rounded-2xl border border-site-line bg-white md:col-span-2 md:rounded-3xl"
            >
              <img
                src={`${C}/all-products.webp`}
                alt="RecklessBear product catalogue listing every apparel item"
                loading="lazy"
                draggable={false}
                className="aspect-[16/9] w-full object-cover"
              />
            </motion.div>

            {/* 2-col — product + forms */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="overflow-hidden rounded-2xl border border-site-line bg-white md:rounded-3xl"
            >
              <img
                src={`${C}/product.webp`}
                alt="RecklessBear single product page"
                loading="lazy"
                draggable={false}
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="overflow-hidden rounded-2xl border border-site-line bg-white md:rounded-3xl"
            >
              <img
                src={`${C}/forms.webp`}
                alt="RecklessBear structured custom-order request form"
                loading="lazy"
                draggable={false}
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>

            {/* mobile shot — narrow, centred panel beside a note */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex items-center justify-center overflow-hidden rounded-2xl border border-site-line bg-site-surface p-8 md:rounded-3xl"
            >
              <img
                src={`${C}/mobile-home.webp`}
                alt="RecklessBear homepage on mobile, built mobile-first"
                loading="lazy"
                draggable={false}
                className="h-auto w-[58%] max-w-[260px] rounded-2xl border border-site-line object-cover shadow-[0_24px_60px_-20px_rgba(76,29,149,0.22)]"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex items-center overflow-hidden rounded-2xl border border-site-line bg-white p-8 md:rounded-3xl md:p-12"
            >
              <div>
                <span className="text-[14px] font-medium text-site-accent">
                  Mobile-first
                </span>
                <h3 className="mt-3 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-site-ink md:text-[30px]">
                  Built for the phone, because that's where they browse.
                </h3>
                <p className="mt-4 text-[16px] leading-[1.65] text-site-text-body md:text-[17px]">
                  Most RecklessBear traffic comes through Instagram on a phone. So the whole flow —
                  catalogue, product, quote request, chat — was designed mobile-first and tested
                  small before it ever went wide.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Panel>

      {/* 5 · OUTCOME — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline-dark" className="mb-8">
            The outcome
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Every lead' }, { text: 'visible', serif: true }, { text: 'no order lost.' }]}
            className="max-w-[18ch] text-[clamp(30px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-white"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 md:rounded-3xl"
          >
            {[
              { value: '12-stage', label: 'Production pipeline, fully tracked from quote to delivery' },
              { value: '24/7', label: 'AI quote engine qualifies and books appointments automatically' },
              { value: '100%', label: 'Lead visibility — unanswered leads escalate to the CEO' },
            ].map((m) => (
              <div key={m.value} className="bg-site-ink p-8 md:p-10">
                <div className="text-[clamp(36px,5vw,56px)] font-semibold leading-none tracking-[-0.02em] text-white">
                  {m.value}
                </div>
                <p className="mt-4 text-[15px] leading-[1.55] text-white/[0.7]">{m.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-12 max-w-2xl text-[17px] leading-[1.65] text-white/70 md:text-[19px]"
          >
            The honest result: leads get qualified and booked without anyone watching the inbox,
            quotes go out faster because the brief is already structured, and nothing falls through —
            if a lead sits unanswered it lands on the CEO's phone. I keep it running on a retainer so
            it stays sharp.
          </motion.p>
        </div>
      </Panel>

      {/* 6 · NEXT PROJECT — white */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8 text-[14px] font-medium text-site-text-body">
            Next project
          </div>
          <Link
            to={NEXT}
            data-cursor="view"
            data-cursor-label="Explore"
            className="group flex flex-col gap-6 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-4 md:flex-row md:items-center md:justify-between md:gap-12"
          >
            <div className="min-w-0">
              <span className="text-[14px] font-medium text-site-accent">
                E-commerce + Admin
              </span>
              <h2 className="mt-3 text-[clamp(40px,7vw,88px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink">
                CW{' '}
                <span className="inline-block transition-transform duration-500 ease-brand group-hover:translate-x-2 motion-reduce:group-hover:translate-x-0">
                  Electronics
                </span>{' '}
                <span aria-hidden="true" className="text-site-text-muted transition-colors duration-300 group-hover:text-site-accent">
                  →
                </span>
              </h2>
              <p className="mt-5 max-w-md text-[16px] leading-[1.6] text-site-text-body md:text-[17px]">
                700+ products live in under two weeks. Retail and wholesale pricing, stock
                analytics, PayFast — owner-editable.
              </p>
            </div>
            <div className="w-full shrink-0 overflow-hidden rounded-2xl border border-site-line bg-site-surface md:w-[42%] md:rounded-3xl">
              <img
                src="/assets/clients/cw-electronics/tile.webp"
                alt="CW Electronics e-commerce store"
                loading="lazy"
                draggable={false}
                className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
              />
            </div>
          </Link>

          <div className="mt-12">
            <FillButton to="/portfolio" variant="ink">
              See all work
            </FillButton>
          </div>
        </div>
      </Panel>

      {/* 7 · PRE-FOOTER CTA */}
      <PreFooterCTA />
    </>
  );
}
