import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { EASE, EASE_ARR } from '../../lib/motion';
import { SERVICES, NAV_LINKS, CONTACT } from '../../data/site';
import { Magnetic } from '../craft/Magnetic';
import RollText from '../craft/RollText';
import Wordmark from '../craft/Wordmark';

/** Top-level nav link with the vertical roll-on-hover + active-route state. */
function NavRoll({ to, label, active, dark }: { to: string; label: string; active: boolean; dark: boolean }) {
  return (
    <Link
      to={to}
      data-cursor="link"
      className={`group inline-flex min-h-[44px] items-center text-[15px] font-medium outline-none transition-colors duration-300 ${
        active ? 'text-site-accent' : dark ? 'text-white' : 'text-site-ink'
      }`}
    >
      <RollText>{label}</RollText>
    </Link>
  );
}

const overlayContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};
const overlayItem: Variants = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.6, ease: EASE_ARR } },
  exit: { y: '110%', transition: { duration: 0.3, ease: EASE_ARR } },
};

/**
 * SiteHeader — clean Cuberto-style nav: logo left, text links right with a
 * vertical roll-on-hover (no underline). Magnetic logo. Transparent over the
 * hero, frosted-white + hairline border on scroll. Services dropdown (desktop);
 * mobile hamburger → full-screen overlay.
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);
  const servicesActive = ['/websites', '/systems', '/hosting'].some((p) => location.pathname.startsWith(p));

  // Scroll state + "is an ink section under the header right now?" — sections
  // opt in via data-header-dark. Rect check (not scroll math) so it survives
  // pinned/transformed sections and route changes.
  useEffect(() => {
    const probeY = 40; // vertical centre of the header bar
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const dark = Array.from(document.querySelectorAll<HTMLElement>('[data-header-dark]')).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= probeY && r.bottom >= probeY;
      });
      setOverDark(dark);
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('scroll', fn);
      window.removeEventListener('resize', fn);
    };
  }, [location]);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] flex items-center justify-between px-6 py-[18px] md:px-10">
      {/* Frosted backdrop fades in on scroll — frosted ink over dark sections */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 border-b transition-[opacity,background-color,border-color] duration-500 ${
          overDark ? 'border-white/10' : 'border-site-line'
        }`}
        style={{
          background: overDark ? 'rgba(10,10,15,0.55)' : 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(14px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.2)',
          opacity: scrolled ? 1 : 0,
          transitionTimingFunction: EASE,
        }}
      />

      {/* LEFT — magnetic wordmark */}
      <Magnetic strength={10}>
        <Link to="/" data-cursor="link" className="inline-block outline-none" aria-label="Streamline Automations — home">
          <Wordmark tone={overDark ? 'light' : 'ink'} className="text-[21px] transition-colors duration-300 md:text-[23px]" />
        </Link>
      </Magnetic>

      {/* RIGHT — desktop nav */}
      <nav className="hidden items-center gap-9 md:flex">
        <div ref={servicesRef} className="relative">
          <button
            onClick={() => setServicesOpen((v) => !v)}
            aria-expanded={servicesOpen}
            data-cursor="link"
            className={`group inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-medium outline-none transition-colors duration-300 ${
              servicesActive ? 'text-site-accent' : overDark ? 'text-white' : 'text-site-ink'
            }`}
          >
            <RollText>Services</RollText>
            <svg
              aria-hidden="true"
              className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {servicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18, ease: EASE_ARR }}
                className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-site-line bg-white shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
              >
                {SERVICES.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`block px-5 py-3.5 outline-none transition-colors hover:bg-site-offwhite focus-visible:bg-site-accent-soft ${
                      isActive(item.href) ? 'bg-site-accent-soft' : ''
                    }`}
                  >
                    <span className="block text-[13.5px] font-semibold text-site-ink">{item.label}</span>
                    <span className="mt-0.5 block text-[12px] text-site-text-muted">{item.desc}</span>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <NavRoll to="/portfolio" label="Portfolio" active={isActive('/portfolio')} dark={overDark} />
        <NavRoll to="/about" label="About" active={isActive('/about')} dark={overDark} />
        <NavRoll to="/contact" label="Contact" active={isActive('/contact')} dark={overDark} />
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`relative z-[1001] flex min-h-[44px] min-w-[44px] items-center justify-center outline-none transition-colors duration-300 md:hidden ${
          open || !overDark ? 'text-site-ink' : 'text-white'
        }`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <div className="flex w-6 flex-col gap-[6px]">
          <span className={`h-[2px] rounded bg-current transition-all duration-300 motion-reduce:transition-none ${open ? 'translate-y-[8px] rotate-45' : ''}`} />
          <span className={`h-[2px] rounded bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`h-[2px] rounded bg-current transition-all duration-300 motion-reduce:transition-none ${open ? '-translate-y-[8px] -rotate-45' : ''}`} />
        </div>
      </button>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_ARR }}
            className="fixed inset-0 z-[1000] flex flex-col overflow-y-auto bg-white md:hidden"
          >
            {/* Overlay wordmark (header one sits underneath the white sheet) */}
            <div className="px-8 pt-[22px]">
              <Link to="/" className="inline-block outline-none" aria-label="Streamline Automations — home">
                <Wordmark className="text-[21px]" />
              </Link>
            </div>

            <motion.nav
              variants={overlayContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-14 flex flex-1 flex-col gap-1 px-8"
            >
              <span className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-site-text-muted">
                Menu
              </span>
              {NAV_LINKS.map((l, i) => (
                <span key={l.href} className="overflow-hidden">
                  <motion.span variants={overlayItem} className="block">
                    <Link
                      to={l.href}
                      className={`flex min-h-[48px] items-baseline gap-3 py-1.5 text-[clamp(34px,9vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em] outline-none focus-visible:text-site-accent ${
                        isActive(l.href) ? 'text-site-accent' : 'text-site-ink'
                      }`}
                    >
                      <span className="font-mono text-[12px] font-normal tracking-[0.1em] text-site-text-muted">
                        0{i + 1}
                      </span>
                      {l.label}
                    </Link>
                  </motion.span>
                </span>
              ))}
            </motion.nav>

            <div className="px-8 pb-10 pt-8">
              <div className="mb-7 flex flex-col gap-2 border-t border-site-line pt-7">
                <span className="mb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-site-text-muted">
                  Get in touch
                </span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="min-h-[44px] py-1 text-[15px] font-medium text-site-text-body outline-none"
                >
                  {CONTACT.email}
                </a>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] py-1 text-[15px] font-medium text-site-text-body outline-none"
                >
                  WhatsApp · {CONTACT.whatsappDisplay}
                </a>
              </div>
              <Link
                to="/contact"
                className="flex min-h-[52px] items-center justify-center rounded-full bg-site-accent px-6 py-4 text-[16px] font-semibold text-white"
              >
                Book a Free Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
