import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import SiteHeader from '../components/white/SiteHeader';
import SiteFooter from '../components/white/SiteFooter';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const QUICK_LINKS = [
  { label: 'Web Design', href: '/websites' },
  { label: 'Systems & Automation', href: '/systems' },
  { label: 'Hosting', href: '/hosting' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <SEO
        title="Page not found (404)"
        description="That page doesn't exist — but the work, the systems, and a free call all do."
        noindex
      />

      <main className="flex min-h-[100svh] flex-col bg-white font-['DM_Sans']">
        <section className="relative flex flex-1 items-center justify-center overflow-hidden px-6 pt-32 pb-24 md:pt-40">
          {/* Ambient brand depth */}
          <div aria-hidden="true" className="gradient-mesh opacity-70" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
            style={{
              background:
                'radial-gradient(900px 500px at 50% 0%, rgba(123,63,228,0.08), transparent 70%)',
            }}
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="block font-['JetBrains_Mono'] text-[11px] font-medium uppercase tracking-[0.18em] text-[#7B3FE4]"
            >
              Error 404
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
              className="mt-4 font-['DM_Sans'] text-[88px] font-semibold leading-none tracking-[-0.04em] text-[#0A0A0F] sm:text-[120px] md:text-[150px]"
            >
              4<span className="font-['Instrument_Serif'] font-normal italic text-[#7B3FE4]">0</span>4
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
              className="mx-auto mt-6 max-w-md text-[16px] leading-[1.6] text-[#3D3D47] md:text-[18px]"
            >
              This page took a wrong turn. The link's broken or the page moved — but
              everything else is exactly where it should be.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                to="/"
                data-cursor="view"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#7B3FE4] px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_6px_20px_rgba(123,63,228,0.28)] transition-[background-color,box-shadow] duration-300 hover:bg-[#6930D0] hover:shadow-[0_12px_34px_rgba(123,63,228,0.38)]"
              >
                Back to home
              </Link>
              <Link
                to="/portfolio"
                data-cursor="view"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#E8E8EC] bg-white px-7 py-3.5 text-[14.5px] font-semibold text-[#0A0A0F] transition-colors duration-300 hover:border-[#D4D4DA] hover:text-[#7B3FE4]"
              >
                See the work
                <span className="text-[#7B3FE4] transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.34 }}
              className="mt-14 border-t border-[#E8E8EC] pt-8"
            >
              <p className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.16em] text-[#9E9EA8]">
                Or jump to
              </p>
              <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
                {QUICK_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-[14px] font-medium text-[#6B6B7A] transition-colors duration-200 hover:text-[#0A0A0F]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
