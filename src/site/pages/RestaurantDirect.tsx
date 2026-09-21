import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import SplitReveal from '../components/craft/SplitReveal';
import FillButton from '../components/craft/FillButton';
import ScreenStrip from '../components/craft/ScreenStrip';
import WalkthroughVideo from '../components/craft/WalkthroughVideo';
import RestaurantJourney from '../components/site/RestaurantJourney';
import RestaurantLiveDemo from '../components/site/RestaurantLiveDemo';
import RestaurantReviewForm from '../components/site/RestaurantReviewForm';
import { useLenis } from '../providers/LenisProvider';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';
import {
  RD_ASSETS,
  RD_BOOKING_STATUSES,
  RD_CUSTOMER_FEATURES,
  RD_CUSTOMER_SCREENS,
  RD_FAQ,
  RD_FRICTION,
  RD_INCLUDED,
  RD_ORDER_STATUSES,
  RD_PROCESS,
  RD_SETUPS,
  RD_STAFF_FEATURES,
  RD_WALKTHROUGH,
} from '../data/restaurant-direct';

const FRAME_SHADOW =
  'shadow-[0_30px_80px_-20px_rgba(76,29,149,0.18),0_10px_30px_-10px_rgba(0,0,0,0.06)]';

/** Status progression as plain text steps — no badges, one accent on the end state. */
function StatusLine({ label, steps }: { label: string; steps: readonly string[] }) {
  return (
    <div>
      <p className="mb-3 text-[14px] font-medium text-white/60">{label}</p>
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[17px] font-medium">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span className={i === steps.length - 1 ? 'text-site-accent' : 'text-white'}>{s}</span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="text-white/30">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * /restaurant-direct — sales page for the Restaurant Direct offer, aimed at
 * independent restaurant owners arriving from ads, outreach and the walkthrough
 * video. One conversion goal: the free restaurant review form at the bottom.
 *
 * Rhythm: hero (white) → friction (offwhite) → journey (white, the rail-draw
 * motion signature) → walkthrough (offwhite) → customer screens (white, pinned
 * strip) → staff dashboard (ink — the page's one dark section) → Jimmy's pilot
 * (offwhite) → included (white) → two setups (offwhite) → process (white) →
 * FAQ (offwhite) → review form (purple tint).
 * No prices (quoted per restaurant). Real product screens only.
 */
export default function RestaurantDirect() {
  const lenis = useLenis();
  const reduced = usePrefersReducedMotion();

  // Lenis owns the scroll position, so a native anchor jump can fight it.
  // Drive Lenis when it's running; fall back to the native behaviour otherwise.
  const jump = (id: string) => (event: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (!el) return;
    event.preventDefault();
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      {/* 1 — HERO */}
      <section className="px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR }}
            className="mb-7"
          >
            <Tag variant="outline">Restaurant Direct</Tag>
          </motion.div>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[
              { text: 'Your website, bookings and collection orders —' },
              { text: 'directly through you.', serif: true },
            ]}
            className="max-w-5xl text-[clamp(40px,7vw,92px)] font-semibold leading-[0.99] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.45 }}
            className="mt-8 max-w-2xl text-[17px] leading-[1.65] text-site-text-body md:text-[18px]"
          >
            One clean place for customers to see your menu, book a table and order for collection
            — and one simple dashboard for your team to manage it. I build it, host it and look
            after it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <FillButton href="#review" onClick={jump('review')} variant="ink">
              Get a free restaurant review
            </FillButton>
            <a
              href="#how-it-works"
              onClick={jump('how-it-works')}
              data-cursor="link"
              className="inline-flex min-h-[44px] items-center text-[16px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline"
            >
              See how it works ↓
            </a>
          </motion.div>

          {/* Real product: staff dashboard + the customer's phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_ARR, delay: 0.5 }}
            className="relative mt-14 pb-12 md:mt-20 md:pb-16"
          >
            <div className={`overflow-hidden rounded-2xl border border-site-line bg-site-surface md:rounded-3xl ${FRAME_SHADOW}`}>
              <img
                src={RD_ASSETS.staffToday}
                alt="Jimmy’s Burger Bar staff dashboard showing today’s bookings and orders waiting to be accepted"
                width={1440}
                height={900}
                draggable={false}
                className="aspect-[1440/900] w-full select-none object-cover object-top"
              />
            </div>
            <div className={`absolute bottom-0 right-4 w-[30%] max-w-[230px] overflow-hidden rounded-[1.25rem] border-[5px] border-site-ink bg-site-ink md:right-10 md:rounded-[2rem] md:border-[7px] ${FRAME_SHADOW}`}>
              <img
                src={RD_ASSETS.mobileOrder}
                alt="Ordering for collection from the Jimmy’s Burger Bar menu on a phone"
                width={390}
                height={844}
                draggable={false}
                className="aspect-[390/844] w-full select-none object-cover object-top"
              />
            </div>
          </motion.div>
          <p className="mt-4 text-[13px] text-site-text-secondary">
            Jimmy’s Burger Bar, shown with demo data.
          </p>
        </div>
      </section>

      {/* 2 — LIVE DEMO: the real build, embedded and usable, before any pitch */}
      <RestaurantLiveDemo />

      {/* 3 — FRICTION */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <SplitReveal
            as="h2"
            segments={[
              { text: 'Customers are ready to order. Getting to you is the' },
              { text: 'messy part.', serif: true },
            ]}
            className="max-w-[20ch] text-[clamp(32px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-14 grid gap-x-12 border-t border-site-line md:mt-16 md:grid-cols-2"
          >
            {RD_FRICTION.map((f) => (
              <motion.li key={f.title} variants={fadeUp} className="border-b border-site-line py-8">
                <h3 className="text-[clamp(22px,2.6vw,30px)] font-semibold leading-[1.15] tracking-[-0.02em] text-site-ink">
                  {f.title}
                </h3>
                <p className="mt-2 max-w-md text-[16px] leading-[1.6] text-site-text-body">{f.body}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Panel>

      {/* 3 — JOURNEY (motion signature: the rail draws as you scroll) */}
      <Panel bg="white" id="how-it-works" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-7">
            How it works
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'From their phone' }, { text: 'to your kitchen.', serif: true }]}
            className="max-w-[18ch] text-[clamp(32px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />
          <div className="mt-14 md:mt-20">
            <RestaurantJourney />
          </div>
        </div>
      </Panel>

      {/* 4 — WALKTHROUGH */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'See it in' }, { text: '60 seconds.', serif: true }]}
            className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />
          <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-site-text-body">
            A customer orders from their phone, the order lands on the staff dashboard, and the
            team takes it from new to collected.
          </p>

          {RD_WALKTHROUGH.src ? (
            <WalkthroughVideo
              src={RD_WALKTHROUGH.src}
              poster={RD_WALKTHROUGH.poster}
              label="Restaurant Direct walkthrough"
              className="mt-12"
            />
          ) : (
            // Placeholder until the walkthrough export exists — swap in RD_WALKTHROUGH.
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className={`relative mt-12 overflow-hidden rounded-2xl border border-site-line bg-site-surface md:rounded-3xl ${FRAME_SHADOW}`}
            >
              <img
                src={RD_WALKTHROUGH.poster}
                alt=""
                loading="lazy"
                draggable={false}
                className="aspect-video w-full select-none object-cover object-top opacity-40"
              />
              <div className="absolute inset-0 grid place-items-center px-6 text-center">
                <p className="text-[clamp(20px,2.6vw,30px)] font-semibold tracking-[-0.02em] text-site-ink">
                  Walkthrough video coming soon
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </Panel>

      {/* 5 — CUSTOMER SIDE */}
      <Panel bg="white" className="pt-24 pb-16 md:pt-32 md:pb-8">
        <div className="px-6 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-7">
            For your customers
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Everything they need,' }, { text: 'in one place.', serif: true }]}
            className="max-w-[16ch] text-[clamp(32px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-12 grid grid-cols-1 gap-x-12 gap-y-5 border-t border-site-line pt-10 md:grid-cols-2"
          >
            {RD_CUSTOMER_FEATURES.map((item) => (
              <motion.li key={item} variants={fadeUp} className="flex items-start gap-4">
                <span aria-hidden="true" className="mt-[2px] shrink-0 text-[18px] leading-none text-site-accent">
                  ✓
                </span>
                <span className="text-[17px] leading-[1.5] text-site-text-body">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        </div>
        <div className="mt-12 md:mt-6">
          <ScreenStrip items={RD_CUSTOMER_SCREENS} />
        </div>
      </Panel>

      {/* 6 — STAFF DASHBOARD (ink — the page's one dark section) */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline-dark" className="mb-7">
            For your team
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'One simple place to' }, { text: 'run the requests.', serif: true }]}
            className="max-w-[18ch] text-[clamp(32px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-white"
          />

          <div className="mt-14 grid items-end gap-8 md:mt-16 md:grid-cols-[1fr_0.32fr]">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl"
            >
              <img
                src={RD_ASSETS.staffOrders}
                alt="Orders queue with each order’s items, total, requested time and next status"
                loading="lazy"
                draggable={false}
                className="aspect-[1440/900] w-full select-none object-cover object-top"
              />
            </motion.div>
            <div className="mx-auto hidden w-full max-w-[240px] overflow-hidden rounded-[2rem] border-[7px] border-white/10 md:block">
              <img
                src={RD_ASSETS.mobileStaffToday}
                alt="The staff dashboard on a phone"
                loading="lazy"
                draggable={false}
                className="aspect-[390/844] w-full select-none object-cover object-top"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-2">
            <div className="flex flex-col gap-8">
              <StatusLine label="Orders" steps={RD_ORDER_STATUSES} />
              <StatusLine label="Bookings" steps={RD_BOOKING_STATUSES} />
            </div>
            <ul className="flex flex-col gap-4">
              {RD_STAFF_FEATURES.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span aria-hidden="true" className="mt-[2px] shrink-0 text-[18px] leading-none text-site-accent">
                    ✓
                  </span>
                  <span className="text-[16px] leading-[1.55] text-white/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>

      {/* 7 — JIMMY'S PILOT */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-7">
            Jimmy’s Burger Bar · Meyerton
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Built around a' }, { text: 'real restaurant.', serif: true }]}
            className="max-w-[16ch] text-[clamp(32px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-8 max-w-2xl text-[17px] leading-[1.65] text-site-text-body"
          >
            Jimmy’s on Loch Street was the first restaurant I built Restaurant Direct for. It’s live
            as a pilot, and the owners’ feedback has already shaped how ordering, bookings and the
            staff dashboard work.
          </motion.p>

          <div className="mt-14 grid items-start gap-6 md:grid-cols-2 md:gap-8">
            {[
              { src: RD_ASSETS.staffBookings, alt: 'Bookings list with party size, notes and confirm or cancel actions' },
              { src: RD_ASSETS.staffCustomers, alt: 'Guest directory showing contact details, last interaction and interaction count' },
            ].map((img) => (
              <motion.div
                key={img.src}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="overflow-hidden rounded-2xl border border-site-line bg-site-surface md:rounded-3xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  draggable={false}
                  className="aspect-[1440/900] w-full select-none object-cover object-top"
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-14 grid gap-10 border-t border-site-line pt-10 sm:grid-cols-3">
            <div>
              <p className="mb-2 text-[14px] font-medium text-site-ink">What’s running</p>
              <p className="text-[15px] leading-[1.6] text-site-text-body">
                Mobile site, menu, table bookings, collection orders and the staff dashboard.
              </p>
            </div>
            <div>
              <p className="mb-2 text-[14px] font-medium text-site-ink">Where it’s at</p>
              <p className="text-[15px] leading-[1.6] text-site-text-body">
                Live as a pilot, with the first round of owner feedback built in.
              </p>
            </div>
            <div>
              <p className="mb-2 text-[14px] font-medium text-site-ink">The brand</p>
              <p className="text-[15px] leading-[1.6] text-site-text-body">
                Jimmy’s identity was designed by{' '}
                <Link to="/work/ameli" className="font-medium text-site-ink underline underline-offset-4 hover:text-site-accent">
                  Ameli Designs
                </Link>
                .
              </p>
            </div>
          </div>
          <p className="mt-8 text-[13px] text-site-text-secondary">
            Screens from the Restaurant Direct demo: Jimmy’s real menu and design, with fictional
            guests and orders.
          </p>
        </div>
      </Panel>

      {/* 8 — WHAT'S INCLUDED */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'What you' }, { text: 'get.', serif: true }]}
            className="text-[clamp(32px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />
          <div className="mt-14 md:mt-16">
            {RD_INCLUDED.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE_ARR, delay: i * 0.04 }}
                className="grid gap-4 border-t border-site-line py-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10 md:py-10"
              >
                <h3 className="text-[clamp(22px,2.8vw,34px)] font-semibold leading-[1.1] tracking-[-0.025em] text-site-ink">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-[16px] leading-[1.55] text-site-text-body">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            <div className="border-t border-site-line" />
          </div>
        </div>
      </Panel>

      {/* 9 — TWO SETUPS (scope rows, no prices) */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'Not every restaurant' }, { text: 'needs everything.', serif: true }]}
            className="max-w-[18ch] text-[clamp(32px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />
          <div className="mt-14 md:mt-16">
            {RD_SETUPS.map((row, i) => (
              <motion.div
                key={row.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE_ARR, delay: i * 0.06 }}
                className="grid gap-4 border-t border-site-line py-9 md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:py-12"
              >
                <div>
                  <h3 className="text-[clamp(24px,3.2vw,40px)] font-semibold leading-[1.1] tracking-[-0.025em] text-site-ink">
                    {row.title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-[1.6] text-site-text-secondary">{row.fit}</p>
                </div>
                <p className="text-[17px] leading-[1.6] text-site-text-body md:pt-2">{row.scope}</p>
              </motion.div>
            ))}
            <div className="border-t border-site-line" />
          </div>
          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
            <FillButton href="#review" onClick={jump('review')} variant="ink">
              Get a recommendation
            </FillButton>
            <p className="max-w-md text-[14px] leading-[1.6] text-site-text-secondary">
              Pricing depends on the setup I recommend. You get a setup fee and monthly figure in
              writing before anything starts.
            </p>
          </div>
        </div>
      </Panel>

      {/* 10 — PROCESS */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'Five steps to' }, { text: 'live.', serif: true }]}
            className="max-w-[16ch] text-[clamp(32px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />
          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-14 grid gap-8 border-t border-site-line pt-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-5 lg:gap-6"
          >
            {RD_PROCESS.map((step) => (
              <motion.li key={step.no} variants={fadeUp}>
                <span className="text-[14px] font-medium text-site-accent">{step.no}</span>
                <h3 className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-site-ink">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-site-text-body">{step.body}</p>
              </motion.li>
            ))}
          </motion.ol>
          <p className="mt-12 inline-flex items-center gap-3 rounded-full border border-site-line px-6 py-3">
            <span className="text-[14px] font-medium text-site-text-body">Usual lead time</span>
            <span className="text-[15px] font-semibold text-site-ink">7–10 business days</span>
          </p>
          <p className="mt-3 text-[13px] text-site-text-secondary">
            Counted from when I have your content, access and approvals.
          </p>
        </div>
      </Panel>

      {/* 11 — FAQ */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'Questions,' }, { text: 'answered.', serif: true }]}
            className="text-[clamp(30px,4vw,46px)] font-semibold leading-[1.05] tracking-[-0.02em] text-site-ink"
          />
          <div className="mt-10 divide-y divide-site-line border-t border-site-line">
            {RD_FAQ.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-site-ink outline-none transition-colors duration-200 hover:text-site-accent focus-visible:text-site-accent">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="ml-2 flex-shrink-0 text-[22px] font-normal leading-none text-site-accent transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15.5px] leading-[1.65] text-site-text-body">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Panel>

      {/* 12 — FREE RESTAURANT REVIEW */}
      <Panel bg="accent" id="review" className="scroll-mt-20 px-6 pt-24 pb-32 md:px-10 md:pt-32 md:pb-40">
        <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <SplitReveal
              as="h2"
              segments={[{ text: 'What could this look like for' }, { text: 'your restaurant?', serif: true }]}
              className="max-w-[14ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
            />
            <p className="mt-7 max-w-md text-[17px] leading-[1.65] text-site-text-body">
              Send me your restaurant name and your website or Instagram. I’ll have a look and tell
              you the simplest setup that makes sense. Free, no obligation.
            </p>
          </div>
          <RestaurantReviewForm />
        </div>
      </Panel>
    </>
  );
}
