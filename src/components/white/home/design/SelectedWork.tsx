import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import WordReveal from '../../ui/WordReveal';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Real client builds — Cloudinary renders (unchanged URLs).
const FEATURED = [
  {
    name: 'BLOM Cosmetics',
    tags: ['E-commerce', 'Automation'],
    imageSrc: 'https://res.cloudinary.com/dtkiwrm6u/image/upload/v1779986676/1_k68mu6.png',
    href: '/portfolio#blom',
  },
  {
    name: 'RecklessBear',
    tags: ['Quote Engine', 'Production'],
    imageSrc: 'https://res.cloudinary.com/dtkiwrm6u/image/upload/v1779986676/2_n9aw8a.png',
    href: '/portfolio#recklessbear',
  },
  {
    name: 'CW Electronics',
    tags: ['Wholesale', 'Custom Admin'],
    imageSrc: 'https://res.cloudinary.com/dtkiwrm6u/image/upload/v1779986676/3_py5ioc.png',
    href: '/portfolio#cw',
  },
  {
    name: 'Ameli Designs',
    tags: ['Portfolio', 'Lead Capture'],
    imageSrc: 'https://res.cloudinary.com/dtkiwrm6u/image/upload/v1779986676/4_b8wyjj.png',
    href: '/portfolio#ameli',
  },
];

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Selected Work — full-bleed, Studio375-style work cards. Edge-to-edge client
 * imagery; the client name sits permanently bottom-left, tags + "View case
 * study" deepen in on hover. Replaces the old pinned cycler on the homepage.
 * Animates transform + opacity only.
 */
export default function SelectedWork() {
  return (
    <section
      data-screen-label="Work"
      className="relative bg-[#FAFAFA] py-[clamp(96px,14vh,180px)]"
    >
      <div className="relative mx-auto w-full max-w-[1100px] px-8">
        <span className="absolute right-8 top-0 font-['JetBrains_Mono'] text-[12px] tracking-[0.22em] text-[#9E9EA8]">
          03 — Work
        </span>

        <div className="mb-[clamp(40px,6vh,72px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="block font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-[0.22em] text-[#7B3FE4]">
              Selected work
            </span>
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mt-3 block h-px w-12 origin-left bg-[#7B3FE4]"
            />
            <WordReveal
              as="h2"
              segments={[{ text: 'Selected work.' }, { text: 'All real.', serif: true }]}
              className="mt-5 font-['DM_Sans'] text-[clamp(34px,5vw,72px)] font-bold leading-[1.0] tracking-[-0.025em] text-[#0A0A0F]"
            />
          </div>

          <Link
            to="/portfolio"
            className="group hidden items-center gap-2 font-['DM_Sans'] text-[15px] font-semibold text-[#0A0A0F] md:inline-flex"
          >
            See all work
            <span className="text-[#7B3FE4] transition-transform duration-[400ms] group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {FEATURED.map((item) => (
            <motion.div key={item.name} variants={card}>
              <Link
                to={item.href}
                data-cursor="view"
                aria-label={`${item.name} — view case study`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-[20px] border border-[#E8E8EC] bg-[#F0EBFF] outline-none transition-[border-color,box-shadow] duration-500 hover:border-[#7B3FE4]/40 hover:shadow-[0_20px_50px_-20px_rgba(123,63,228,0.45)] focus-visible:ring-2 focus-visible:ring-[#7B3FE4] focus-visible:ring-offset-2"
              >
                {/* full-bleed image — greyscale at rest, saturates + zooms on hover */}
                <img
                  src={item.imageSrc}
                  alt={`${item.name} — real client build`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 h-full w-full select-none object-cover object-top transition-[transform,filter] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:grayscale md:group-hover:grayscale-0 group-hover:scale-[1.06]"
                />

                {/* subtle resting scrim — keeps the name readable at rest */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0A0F]/55 to-transparent"
                />

                {/* purple gradient — slides up on hover (static end-state on mobile) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#5B22B8] via-[#7B3FE4]/45 to-transparent opacity-100 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                />

                {/* content overlay */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-['DM_Sans'] text-[22px] font-bold tracking-[-0.02em] text-white">
                      {item.name}
                    </h3>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-white/30 bg-white/10 px-2.5 py-[5px] font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.1em] text-white opacity-100 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="hidden h-11 w-11 shrink-0 translate-y-1 items-center justify-center rounded-full bg-white text-[#0A0A0F] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 md:flex">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 md:hidden">
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 font-['DM_Sans'] text-[15px] font-semibold text-[#0A0A0F]"
          >
            See all work
            <span className="text-[#7B3FE4] transition-transform duration-[400ms] group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
