import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, viewport } from '../../../../lib/motion';

const NAV: Array<[string, string]> = [
  ['Services', '/websites'],
  ['Portfolio', '/portfolio'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

/**
 * Dark editorial footer — oversized wordmark, three columns, bottom bar.
 * id="contact" so the in-page "Book a Call" anchors land here.
 */
export default function DesignFooter() {
  return (
    <footer
      id="contact"
      data-screen-label="Footer"
      className="relative bg-[#0A0A0F] pb-12 pt-[clamp(80px,12vh,130px)] text-white"
    >
      <div className="mx-auto w-full max-w-[1000px] px-8">
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
            <div className="flex flex-col">
              {NAV.map(([label, href]) => (
                <Link
                  key={href}
                  to={href}
                  className="mb-3 font-['DM_Sans'] text-[16px] text-white/[0.78] transition-colors duration-300 hover:text-white"
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
                href="mailto:christian@streamline-automations.agency"
                className="mb-3 font-['DM_Sans'] text-[16px] text-white/[0.78] transition-colors duration-300 hover:text-white"
              >
                christian@streamline-automations.agency
              </a>
              <a
                href="https://wa.me/27633063861"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 font-['DM_Sans'] text-[16px] text-white/[0.78] transition-colors duration-300 hover:text-white"
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
            © {new Date().getFullYear()} Streamline Automations
          </span>
          <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.14em] text-white/40">
            Designed &amp; built in the Vaal Triangle, SA
          </span>
        </div>
      </div>
    </footer>
  );
}
