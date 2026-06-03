import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, viewport } from '../../../../lib/motion';

const EASE = 'cubic-bezier(0.22,1,0.36,1)';

const SERVICES = [
  {
    num: '01',
    title: 'Web Design & Creation',
    desc: 'Custom websites, e-commerce stores and course platforms — built to convert, owned by you.',
    href: '/websites',
  },
  {
    num: '02',
    title: 'Systems & Automation',
    desc: 'CRMs, admin dashboards and WhatsApp/n8n workflows that run the busywork for you.',
    href: '/systems',
  },
  {
    num: '03',
    title: 'Hosting, Email & Maintenance',
    desc: 'Fast hosting, business email and ongoing care so the whole thing keeps running.',
    href: '/hosting',
  },
];

/**
 * Three hover-expanding service rows. On hover the row slides right, a soft
 * purple-tint wash fades in, and the "Learn more" link appears.
 */
export default function ServicesRows() {
  return (
    <section
      id="services"
      data-screen-label="Services"
      className="relative py-[clamp(96px,14vh,200px)]"
    >
      <div className="relative mx-auto w-full max-w-[1000px] px-8">
        <span className="absolute right-8 top-0 font-['JetBrains_Mono'] text-[12px] tracking-[0.22em] text-[#9E9EA8]">
          02 — Services
        </span>

        <div className="mb-[clamp(56px,8vh,96px)]">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="block font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-[0.22em] text-[#7B3FE4]"
          >
            What I build
          </motion.span>
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mt-3 block h-px w-12 origin-left bg-[#7B3FE4]"
          />
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-5 font-['DM_Sans'] font-bold leading-[1.0] tracking-[-0.025em] text-[#0A0A0F]"
            style={{ fontSize: 'clamp(34px, 5vw, 72px)' }}
          >
            Three ways I help <br />
            your{' '}
            <span className="font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]">
              business.
            </span>
          </motion.h2>
        </div>

        <div>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <Link
                to={s.href}
                className={`group relative block border-t border-[#E8E8EC] py-7 transition-[padding] duration-500 hover:pl-6 md:py-11 md:px-6 md:hover:pl-11 ${
                  i === SERVICES.length - 1 ? 'border-b' : ''
                }`}
                style={{ transitionTimingFunction: EASE }}
              >
                {/* purple-tint wash */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-[#F0EBFF] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ transitionTimingFunction: EASE }}
                />

                <div className="grid grid-cols-[34px_1fr_auto] items-center gap-x-4 gap-y-2 md:grid-cols-[90px_1fr_auto] md:gap-10">
                  <span className="font-['JetBrains_Mono'] text-[13px] font-medium text-[#9E9EA8] transition-colors duration-[400ms] group-hover:text-[#7B3FE4] md:text-[14px]">
                    {s.num}
                  </span>

                  <h3
                    className="font-['DM_Sans'] font-bold leading-[1.08] tracking-[-0.02em] text-[#0A0A0F]"
                    style={{ fontSize: 'clamp(23px, 3.4vw, 44px)' }}
                  >
                    {s.title}
                  </h3>

                  {/* mobile chevron — signals the row is tappable */}
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#7B3FE4] transition-colors duration-300 group-hover:bg-[#7B3FE4]/10 md:hidden"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>

                  {/* desc — spans under the title on both layouts */}
                  <p className="col-start-2 col-end-4 max-w-[460px] font-['DM_Sans'] text-[15px] leading-[1.5] text-[#6B6B7A] md:col-end-3 md:mt-3 md:text-[16px]">
                    {s.desc}
                  </p>

                  {/* desktop "Learn more" — fades in on hover, far right */}
                  <span
                    className="col-start-3 row-start-1 hidden items-center gap-2 self-center whitespace-nowrap font-['DM_Sans'] text-[14px] font-semibold text-[#7B3FE4] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:inline-flex md:-translate-x-2.5"
                    style={{ transitionTimingFunction: EASE }}
                  >
                    Learn more <span>→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
