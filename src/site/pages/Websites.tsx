import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitReveal from '../components/craft/SplitReveal';
import WorkCard from '../components/craft/WorkCard';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import FAQSection from '../components/site/FAQSection';
import { ProcessSteps, ServiceRows } from '../components/site/ServiceBlocks';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';
import { PROJECT_FLOORS, RENT_TO_OWN, TURNAROUND } from '../data/site';
import { WEBSITES_FAQ } from '../data/service-faq';

// Real, local, optimised client tiles.
const TILE = (c: string) => `/assets/clients/${c}/tile.webp`;

const H2 = 'text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em]';
const BODY = 'text-[16px] leading-[1.65] text-site-text-body md:text-[17px]';
const INLINE_LINK =
  'font-semibold text-site-ink underline underline-offset-4 decoration-site-line outline-none hover:text-site-accent hover:decoration-site-accent focus-visible:text-site-accent';

// What every build includes — no templates, no upsell.
const INCLUDED = [
  ['Custom design, no templates', 'Designed around your brand and your customers, not a theme a hundred other businesses are using.'],
  ['Mobile-first', 'Built for a 375px phone screen first, because that’s where people check you out before they call.'],
  ['Fast load + SEO basics', 'Compressed images, clean code, page titles, descriptions and a sitemap, so Google can read every page.'],
  ['Contact form + WhatsApp button', 'A clear way for people to reach you the moment they’re ready. Form enquiries go straight to your inbox.'],
  ['Copywriting in your voice', 'I write every word from what I learn about your business during onboarding.'],
  ['Hosting, domain + SSL setup', 'I set up the domain, the hosting and the security certificate. You never touch the technical side.'],
  ['Owner-editable where it makes sense', 'Change the things you change often yourself. Anything bigger is covered by a maintenance plan.'],
] as const;

const STEPS = [
  {
    title: 'Free call',
    body: 'We talk through your business, your customers and what the site needs to do. No obligation.',
  },
  {
    title: 'Onboarding',
    body: 'I gather everything: your brand, how you speak to customers, your services, photos and logo.',
  },
  {
    title: 'Copy, design + build',
    body: 'I write the copy in your voice, design every page and build it, phone screen first.',
  },
  {
    title: 'Launch + two-week check',
    body: 'The site goes live on your domain. For two weeks after launch I fix anything that comes up.',
  },
];

const KINDS = [
  {
    title: 'Service websites',
    body: 'For trades and service businesses that live on quotes, built so enquiries reach you fast. JJ Glassworks has been fitting glass across Gauteng since 1988; now every path on the site leads to a quote.',
    link: { to: '/work/jj-glass', label: 'See the JJ Glassworks build →' },
  },
  {
    title: 'Online stores',
    body: 'Product catalogues, PayFast checkout and an admin you run yourself. CW Electronics went live with 700+ products in under two weeks, with retail and wholesale pricing from one catalogue.',
    link: { to: '/work/cw-electronics', label: 'See the CW Electronics build →' },
  },
  {
    title: 'Portfolio sites',
    body: 'For creatives whose work has to do the selling. Ameli Designs went from brief to live in four days, with every enquiry emailed to her the moment it comes in.',
    link: { to: '/work/ameli', label: 'See the Ameli Designs build →' },
  },
  {
    title: 'Websites with a system behind them',
    body: 'Bookings, lead capture, a simple CRM and WhatsApp updates, built into the same site. BLOM Cosmetics runs its store, admin, course platform and order automation on one backend.',
    link: { to: '/systems', label: 'See business automation →' },
  },
];

/** Small inline check mark for the "what you get" list. */
function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-1 h-[18px] w-[18px] shrink-0 text-site-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

/**
 * Websites — the web design service page. Hero (white) → who it's for + local
 * (offwhite) → what you get (ink) → how a build runs (white) → kinds of site,
 * each tied to a real build (offwhite) → what it costs (purple tint) → FAQ →
 * recent builds → end CTA. Dark budget: the ink checklist + the pre-footer.
 * One floor figure only, from PROJECT_FLOORS / RENT_TO_OWN — never a grid.
 */
export default function Websites() {
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
            <Tag variant="outline">Web Design &amp; Creation</Tag>
          </motion.div>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[
              { text: 'Websites for small businesses,' },
              { text: 'built to bring in' },
              { text: 'enquiries.', serif: true },
            ]}
            className="max-w-5xl text-[clamp(44px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
          >
            I do website design for South African small businesses: custom-built, written in your voice,
            fast on a phone, and set up to turn visitors into enquiries. Most sites go live in {TURNAROUND}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <FillButton to="/contact" variant="ink">
              Book a Free Call
            </FillButton>
            <FillButton to="/portfolio" variant="ink">
              See the work →
            </FillButton>
          </motion.div>
        </div>
      </section>

      {/* WHO IT'S FOR + LOCAL — offwhite */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <SplitReveal
              as="h2"
              segments={[{ text: 'For businesses that run on' }, { text: 'enquiries.', serif: true }]}
              className={`max-w-[14ch] text-site-ink ${H2}`}
            />
            <p className={`mt-8 max-w-lg ${BODY}`}>
              Salons, spas and gyms. Contractors and trades. Shops, creatives and service businesses. If
              customers find you on Google, check you out on their phone and then WhatsApp or call, the
              website is where you win them or lose them.
            </p>
          </div>
          <div className="md:pt-3">
            <h3 className="text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.2] tracking-[-0.015em] text-site-ink">
              Based in the Vaal
            </h3>
            <p className={`mt-4 max-w-lg ${BODY}`}>
              I&rsquo;m based in the Vaal Triangle and build for businesses in Vanderbijlpark,
              Vereeniging, Meyerton and Sasolburg. Jimmy&rsquo;s Burger Bar in Meyerton runs its
              bookings and collection orders on{' '}
              <Link to="/restaurant-direct" data-cursor="link" className={`py-3.5 ${INLINE_LINK}`}>
                Restaurant Direct
              </Link>
              , a system I built.
            </p>
            <p className={`mt-4 max-w-lg ${BODY}`}>
              I also work with businesses across Gauteng and the rest of South Africa. The whole process
              runs over WhatsApp, email and calls, so distance doesn&rsquo;t slow anything down.
            </p>
          </div>
        </div>
      </Panel>

      {/* WHAT YOU GET — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline-dark" className="mb-8">
            What you get
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Everything,' }, { text: 'handled.', serif: true }]}
            className="max-w-[16ch] text-[clamp(34px,5vw,68px)] font-semibold leading-[1.02] tracking-[-0.02em] text-white"
          />

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2"
          >
            {INCLUDED.map(([item, detail]) => (
              <motion.li key={item} variants={fadeUp} className="flex items-start gap-3">
                <Check />
                <span>
                  <span className="block text-[16px] font-semibold leading-[1.5] text-white md:text-[17px]">
                    {item}
                  </span>
                  <span className="mt-1 block text-[15px] leading-[1.6] text-white/70">{detail}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.15 }}
            className="mt-14 flex flex-col gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-[clamp(18px,2.4vw,26px)] font-medium leading-[1.3] tracking-[-0.01em] text-white">
              Typical turnaround: <span className="text-site-accent">{TURNAROUND}</span>.
            </p>
            <FillButton to="/contact" variant="on-dark">
              Book a Free Call
            </FillButton>
          </motion.div>
        </div>
      </Panel>

      {/* HOW A BUILD RUNS — white */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'How a build' }, { text: 'runs.', serif: true }]}
            className={`max-w-[16ch] text-site-ink ${H2}`}
          />
          <ProcessSteps steps={STEPS} />
          <p className={`mt-12 max-w-2xl ${BODY}`}>
            After the two-week check, changes are quoted per job or covered by a maintenance plan. Most
            sites go live in {TURNAROUND}; bigger builds with bookings or a shop take longer, and you get
            a clear timeline before I start.
          </p>
        </div>
      </Panel>

      {/* KINDS OF SITE — offwhite, every row tied to a real build */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'What I' }, { text: 'build.', serif: true }]}
            className={`max-w-[16ch] text-site-ink ${H2}`}
          />
          <ServiceRows rows={KINDS} />
        </div>
      </Panel>

      {/* WHAT IT COSTS — purple tint, one floor line, no grid */}
      <Panel bg="accent" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'What it' }, { text: 'costs.', serif: true }]}
            className={`text-site-ink ${H2}`}
          />
          <p className="mt-8 max-w-3xl text-[clamp(22px,2.8vw,32px)] font-medium leading-[1.3] tracking-[-0.015em] text-site-ink">
            Websites start {PROJECT_FLOORS[0].floor.replace(/^From/, 'from')}. Rather not pay upfront?
            Rent-to-own starts {RENT_TO_OWN.floor.replace(/^From/, 'from')}: I build it first, you pay
            monthly, and after 18 months it&rsquo;s yours outright.
          </p>
          <p className={`mt-6 max-w-2xl ${BODY}`}>
            Every build is quoted on a free call, so you know the full price before anything starts.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <FillButton to="/contact" variant="ink">
              Book a Free Call
            </FillButton>
            <Link
              to="/hosting"
              data-cursor="link"
              className="inline-flex min-h-[44px] items-center text-[15px] font-semibold text-site-ink underline-offset-4 outline-none hover:text-site-accent hover:underline focus-visible:text-site-accent focus-visible:underline"
            >
              See all pricing →
            </Link>
          </div>
        </div>
      </Panel>

      <FAQSection items={WEBSITES_FAQ} bg="white" />

      {/* RECENT BUILD — offwhite */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <Tag variant="outline" className="mb-6">
                Recent build
              </Tag>
              <SplitReveal
                as="h2"
                segments={[{ text: 'Fresh out the' }, { text: 'studio', serif: true }]}
                className="max-w-[18ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
              />
            </div>
            <Link
              to="/portfolio"
              data-cursor="link"
              className="group hidden min-h-[44px] shrink-0 items-center text-[15px] font-medium text-site-text-body outline-none focus-visible:text-site-accent focus-visible:underline md:inline-flex"
            >
              <span className="transition-colors duration-300 group-hover:text-site-accent">All work →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
            <WorkCard
              to="/work/ameli"
              label="Portfolio + Lead capture"
              title="Ameli Designs"
              blurb="A fast portfolio with automated email lead capture. 4-day build."
              image={TILE('ameli')}
              ratio="4/5"
              index={0}
            />
            <WorkCard
              to="/work/blom"
              label="E-commerce + Automation"
              title="BLOM Cosmetics"
              blurb="Full store, custom admin, and WhatsApp automation."
              image={TILE('blom')}
              ratio="4/5"
              index={1}
            />
          </div>
        </div>
      </Panel>

      <PreFooterCTA />
    </>
  );
}
