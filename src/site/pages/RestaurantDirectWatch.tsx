import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import SplitReveal from '../components/craft/SplitReveal';
import FillButton from '../components/craft/FillButton';
import { EASE_ARR } from '../lib/motion';
import { CONTACT } from '../data/site';
import { RD_DEMO, RD_PROMO } from '../data/restaurant-direct';

const FRAME_SHADOW =
  'shadow-[0_30px_80px_-20px_rgba(76,29,149,0.18),0_10px_30px_-10px_rgba(0,0,0,0.06)]';

const LINK =
  'inline-flex min-h-[44px] items-center text-[16px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline';

/**
 * /restaurant-direct/watch — where the outreach email's video GIF lands.
 * One video, one ask: the 36s Jimmy's promo, then "want this for yours?".
 * Not in the nav or sitemap (noindex). No prices — they're in the email and
 * on /hosting only. Motion: the headline reveal and the frame rising in, nothing else.
 */
export default function RestaurantDirectWatch() {
  return (
    <>
      <section className="px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28">
        <div className="mx-auto w-full max-w-5xl">
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
            segments={[{ text: 'Here’s how it works' }, { text: 'at Jimmy’s.', serif: true }]}
            className="max-w-4xl text-[clamp(40px,6.5vw,84px)] font-semibold leading-[0.99] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.4 }}
            className="mt-8 max-w-2xl text-[17px] leading-[1.65] text-site-text-body md:text-[18px]"
          >
            36 seconds. A customer finds the menu, orders for collection and books a table — and
            the team handles all of it from one dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_ARR, delay: 0.5 }}
            className={`relative mt-12 aspect-video overflow-hidden rounded-2xl border border-site-line bg-site-surface md:mt-16 md:rounded-3xl ${FRAME_SHADOW}`}
          >
            <iframe
              src={`${RD_PROMO.embed}?autoplay=false&preload=true&responsive=true`}
              title="Restaurant Direct at Jimmy’s Burger Bar"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </motion.div>
          <p className="mt-4 text-[13px] text-site-text-secondary">
            Jimmy’s Burger Bar, shown with demo data.
          </p>
        </div>
      </section>

      <Panel bg="accent" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'Want this for' }, { text: 'your restaurant?', serif: true }]}
            className="max-w-[16ch] text-[clamp(32px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />
          <p className="mt-6 max-w-xl text-[17px] leading-[1.65] text-site-text-body">
            Reply to my email or send me a WhatsApp. I’ll show you what I’d build for yours.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <FillButton
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Restaurant Direct')}`}
              variant="ink"
            >
              Email me
            </FillButton>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" data-cursor="link" className={LINK}>
              WhatsApp {CONTACT.whatsappDisplay} →
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-site-line pt-6">
            <a href={RD_DEMO.origin} target="_blank" rel="noopener noreferrer" data-cursor="link" className={LINK}>
              Try the live demo →
            </a>
            <Link to="/restaurant-direct" data-cursor="link" className={LINK}>
              See everything it does →
            </Link>
          </div>
        </div>
      </Panel>
    </>
  );
}
