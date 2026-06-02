import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, viewport } from '../../lib/motion';

const NAV: Array<[string, string]> = [
  ['Websites', '/websites'],
  ['Systems', '/systems'],
  ['Hosting', '/hosting'],
  ['Portfolio', '/portfolio'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

/**
 * SiteFooter — the single shared dark footer used identically on every page.
 * Oversized "Streamline." wordmark, three columns (pitch / navigate / contact),
 * bottom bar. Dark #0A0A0F (one of the only two dark surfaces on the site).
 */
export default function SiteFooter() {
  return (
    <footer
      id="contact"
      data-screen-label="Footer"
      className="relative bg-[#0A0A0F] pb-12 pt-[clamp(80px,12vh,130px)] text-white"
    >
      <div className="mx-auto w-full max-w-[1100px] px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="font-['DM_Sans'] font-bold leading-[0.82] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(64px, 16vw, 220px)' }}
        >
          Streamline<span className="text-[#7B3FE4]">.</span>
        </motion.div>

        <div className="mt-[clamp(48px,7vh,80px)] grid grid-cols-1 gap-10 border-t border-white/10 pt-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <div className="mb-[18px] font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-white/40">
              The Pitch
            </div>
            <p className="max-w-[320px] font-['DM_Sans'] text-[16px] leading-[1.6] text-white/[0.78]">
              Websites that work. Systems that scale. Custom builds and automation
              for South African businesses.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <div className="mb-[18px] font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-white/40">
              Navigate
            </div>
            <div className="grid grid-cols-2 gap-x-6">
              {NAV.map(([label, href]) => (
                <Link
                  key={href}
                  to={href}
                  className="mb-3 font-['DM_Sans'] text-[16px] text-white/[0.78] outline-none transition-colors duration-300 hover:text-white focus-visible:text-[#9B5FF5]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <div className="mb-[18px] font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em] text-white/40">
              Get in touch
            </div>
            <div className="flex flex-col">
              <a
                href="mailto:christian@streamline-automations.co.za"
                className="mb-3 font-['DM_Sans'] text-[16px] text-white/[0.78] outline-none transition-colors duration-300 hover:text-white focus-visible:text-[#9B5FF5]"
              >
                christian@streamline-automations.co.za
              </a>
              <a
                href="https://wa.me/27633063861"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 font-['DM_Sans'] text-[16px] text-white/[0.78] outline-none transition-colors duration-300 hover:text-white focus-visible:text-[#9B5FF5]"
              >
                WhatsApp · 063 306 3861
              </a>
              <p className="font-['DM_Sans'] text-[16px] text-white/[0.78]">
                Vaal Triangle · Gauteng · South Africa
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-[clamp(56px,8vh,90px)] flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-[30px]">
          <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.14em] text-white/40">
            © 2026 Streamline Automations
          </span>
          <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.14em] text-white/40">
            Designed &amp; built in the Vaal Triangle, SA
          </span>
        </div>
      </div>
    </footer>
  );
}
