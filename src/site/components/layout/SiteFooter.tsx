import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, viewport } from '../../lib/motion';
import { CONTACT, FOOTER_NAV } from '../../data/site';
import { Magnetic } from '../craft/Magnetic';
import Wordmark from '../craft/Wordmark';

/**
 * SiteFooter — the single shared ink footer used identically on every v2 page.
 * Oversized wordmark, three columns (pitch / navigate / contact), bottom bar.
 * Ink #0A0A0F — one of the only two dark surfaces on the site.
 */
export default function SiteFooter() {
  return (
    <footer className="relative bg-site-ink pb-12 pt-[clamp(80px,12vh,130px)] text-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <Link to="/" data-cursor="link" className="inline-block outline-none" aria-label="Streamline Automations — home">
            <Wordmark tone="light" className="text-[clamp(44px,8vw,104px)]" />
          </Link>
        </motion.div>

        <div className="mt-[clamp(48px,7vh,80px)] grid grid-cols-1 gap-10 border-t border-white/10 pt-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">The pitch</div>
            <p className="max-w-[320px] text-[16px] leading-[1.6] text-white/[0.78]">
              Websites that convert. Systems that run themselves. Custom builds and automation for
              South African businesses.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Navigate</div>
            <div className="grid grid-cols-2 gap-x-6">
              {FOOTER_NAV.map(([label, href]) => (
                <Magnetic key={href} strength={6} className="mb-3 inline-block self-start">
                  <Link
                    to={href}
                    data-cursor="link"
                    className="text-[16px] text-white/[0.78] outline-none transition-colors duration-300 hover:text-white focus-visible:text-[#9B5FF5]"
                  >
                    {label}
                  </Link>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <div className="mb-[18px] font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Get in touch</div>
            <div className="flex flex-col">
              <a
                href={`mailto:${CONTACT.email}`}
                className="mb-3 text-[16px] text-white/[0.78] outline-none transition-colors duration-300 hover:text-white focus-visible:text-[#9B5FF5]"
              >
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 text-[16px] text-white/[0.78] outline-none transition-colors duration-300 hover:text-white focus-visible:text-[#9B5FF5]"
              >
                WhatsApp · {CONTACT.whatsappDisplay}
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 text-[16px] text-white/[0.78] outline-none transition-colors duration-300 hover:text-white focus-visible:text-[#9B5FF5]"
              >
                Instagram · {CONTACT.instagram}
              </a>
              <p className="text-[16px] text-white/[0.78]">{CONTACT.location}</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-[clamp(56px,8vh,90px)] flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-[30px]">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
            © 2026 Streamline Automations · CIPC {CONTACT.cipc}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
            Built in the Vaal Triangle, SA
          </span>
        </div>
      </div>
    </footer>
  );
}
