import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTiktok, FaYoutube, FaFacebookF } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { fadeUp, viewport } from '../../lib/motion';
import { CONTACT, FOOTER_NAV, SOCIALS } from '../../data/site';
import { Magnetic } from '../craft/Magnetic';
import RollText from '../craft/RollText';
import Wordmark from '../craft/Wordmark';

/**
 * ContactPill — a big outlined pill that fills white (ink text) on hover, with a
 * vertical sweep. Magnetic. Used for the email + WhatsApp contact details.
 */
function ContactPill({ href, label, external = false }: { href: string; label: string; external?: boolean }) {
  return (
    <Magnetic strength={10} className="inline-block">
      <a
        href={href}
        data-cursor="link"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group relative inline-flex min-h-[60px] items-center overflow-hidden rounded-full border border-white/20 px-8 py-4 outline-none transition-colors duration-300 ease-brand focus-visible:ring-2 focus-visible:ring-white"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-y-full bg-white transition-transform duration-[450ms] ease-brand group-hover:translate-y-0 motion-reduce:transition-none"
        />
        <span className="relative z-10 text-[clamp(17px,2vw,20px)] font-medium text-white transition-colors duration-300 ease-brand group-hover:text-site-ink">
          {label}
        </span>
      </a>
    </Magnetic>
  );
}

/**
 * SocialIcon — circular outlined icon button that fills white (ink icon) on
 * hover. Magnetic. Big and generously spaced.
 */
function SocialIcon({ href, label, Icon }: { href: string; label: string; Icon: IconType }) {
  return (
    <Magnetic strength={12} className="inline-block">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        data-cursor="link"
        className="group relative flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-full border border-white/15 outline-none transition-colors duration-300 ease-brand focus-visible:ring-2 focus-visible:ring-white"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 scale-0 rounded-full bg-white transition-transform duration-[400ms] ease-brand group-hover:scale-100 motion-reduce:transition-none"
        />
        <Icon className="relative z-10 h-[22px] w-[22px] text-white transition-colors duration-300 ease-brand group-hover:text-site-ink" />
      </a>
    </Magnetic>
  );
}

/**
 * SiteFooter — the single shared ink footer used identically on every v2 page.
 * Oversized wordmark, contact-detail pills, big roll-on-hover nav (same effect
 * as the top navbar), social row, bottom bar.
 * Ink #0A0A0F — one of the only two dark surfaces on the site.
 */
export default function SiteFooter() {
  return (
    <footer data-header-dark="" className="relative bg-site-ink pb-12 pt-[clamp(80px,12vh,130px)] text-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <Link to="/" data-cursor="link" className="inline-block outline-none" aria-label="Streamline Automations — home">
            <Wordmark tone="light" className="text-[clamp(44px,8vw,104px)]" />
          </Link>
        </motion.div>

        <div className="mt-[clamp(48px,7vh,80px)] grid grid-cols-1 gap-x-12 gap-y-14 border-t border-white/10 pt-[clamp(40px,6vh,64px)] md:grid-cols-[1fr_auto]">
          {/* LEFT — contact details as pill buttons */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Get in touch</div>
            <div className="flex flex-wrap gap-4">
              <ContactPill href={`mailto:${CONTACT.email}`} label={CONTACT.email} />
              <ContactPill href={CONTACT.whatsappUrl} label={`WhatsApp · ${CONTACT.whatsappDisplay}`} external />
            </div>
            <p className="mt-7 text-[16px] text-white/[0.78]">{CONTACT.location}</p>
          </motion.div>

          {/* RIGHT — big nav, same roll-on-hover as the top navbar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="md:justify-self-end"
          >
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 md:text-right">
              Navigate
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-2 md:text-right">
              {FOOTER_NAV.map(([label, href]) => (
                <Link
                  key={href}
                  to={href}
                  data-cursor="link"
                  className="group inline-flex min-h-[48px] items-center text-[clamp(22px,2.6vw,30px)] font-semibold leading-none tracking-[-0.01em] text-white outline-none focus-visible:text-[#9B5FF5] md:justify-self-end"
                >
                  <RollText>{label}</RollText>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-[clamp(56px,8vh,90px)] flex flex-col gap-8 border-t border-white/10 pt-[36px] md:flex-row md:items-center md:justify-between">
          {/* Social icons */}
          <div className="flex flex-wrap items-center gap-4">
            <SocialIcon href={SOCIALS.instagram} label="Instagram" Icon={FaInstagram} />
            <SocialIcon href={SOCIALS.tiktok} label="TikTok" Icon={FaTiktok} />
            <SocialIcon href={SOCIALS.youtube} label="YouTube" Icon={FaYoutube} />
            <SocialIcon href={SOCIALS.facebook} label="Facebook" Icon={FaFacebookF} />
          </div>

          <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/60 md:items-end">
            <span>© 2026 Streamline Automations · CIPC {CONTACT.cipc}</span>
            <span className="flex items-center gap-4">
              <Link
                to="/privacy"
                data-cursor="link"
                className="inline-flex min-h-[44px] items-center outline-none transition-colors duration-300 hover:text-white focus-visible:text-white"
              >
                Privacy
              </Link>
              <span>Built in the Vaal Triangle, SA</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
