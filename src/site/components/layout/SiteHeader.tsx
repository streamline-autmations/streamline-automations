import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { EASE, EASE_ARR } from '../../lib/motion';
import { LOGO_URL, SERVICES, NAV_LINKS } from '../../data/site';
import { Magnetic } from '../craft/Magnetic';

/** Underlined nav link with active-route state. */
function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      data-cursor="link"
      className={`group relative inline-flex min-h-[44px] items-center text-[14.5px] font-medium outline-none transition-colors duration-300 focus-visible:text-site-accent ${
        active ? 'text-site-ink' : 'text-site-ink hover:text-site-accent'
      }`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-site-accent transition-transform duration-[400ms] ${
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
        style={{ transitionTimingFunction: EASE }}
      />
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
 * SiteHeader — the single shared nav used identically on every v2 page.
 * Transparent over the hero, frosted-white + hairline border on scroll.
 * Services dropdown (desktop) + active-route state. Mobile: hamburger →
 * full-screen overlay with staggered masked link reveal.
 * (Magnetic links land in Phase 2 — kept plain here.)
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);
  const servicesActive = ['/websites', '/systems', '/hosting'].some((p) =>
    location.pathname.startsWith(p)
  );

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location]);

  // Lock body scroll while the full-screen overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close the dropdown on outside click / Escape.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
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
    <header
      className="fixed inset-x-0 top-0 z-[1000] grid grid-cols-[1fr_auto] items-center px-6 py-[18px] md:grid-cols-[1fr_auto_1fr]"
    >
      {/* Frosted backdrop fades in on scroll */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 border-b border-site-line transition-opacity duration-500"
        style={{
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(14px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.2)',
          opacity: scrolled ? 1 : 0,
          transitionTimingFunction: EASE,
        }}
      />

      {/* LEFT — desktop nav */}
      <nav className="hidden items-center gap-9 md:flex md:justify-end md:pr-12">
        <div ref={servicesRef} className="relative">
          <button
            onClick={() => setServicesOpen((v) => !v)}
            aria-expanded={servicesOpen}
            data-cursor="link"
            className={`group inline-flex min-h-[44px] items-center gap-1.5 text-[14.5px] font-medium outline-none transition-colors duration-300 focus-visible:text-site-accent ${
              servicesActive ? 'text-site-ink' : 'text-site-ink hover:text-site-accent'
            }`}
          >
            Services
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
                className="absolute left-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-site-line bg-white shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
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

        <NavLink to="/portfolio" active={isActive('/portfolio')}>
          Portfolio
        </NavLink>
        <NavLink to="/about" active={isActive('/about')}>
          About
        </NavLink>
      </nav>

      {/* CENTER — logo wordmark */}
      <Link to="/" className="outline-none md:justify-self-center" aria-label="Streamline Automations — home">
        <img
          src={LOGO_URL}
          alt="Streamline Automations"
          draggable={false}
          className="h-[26px] w-auto select-none md:h-[30px]"
        />
      </Link>

      {/* RIGHT — sole CTA + mobile hamburger */}
      <div className="flex items-center justify-end gap-6">
        <span className="hidden md:inline-flex">
          <Magnetic strength={14}>
            <Link
              to="/contact"
              data-cursor="view"
              className="inline-flex items-center rounded-full bg-site-accent px-7 py-3 text-[14.5px] font-semibold text-white shadow-[0_6px_20px_rgba(123,63,228,0.28)] outline-none transition-[background-color,box-shadow] duration-300 hover:bg-site-accent-hover hover:shadow-[0_12px_34px_rgba(123,63,228,0.38)] focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2"
              style={{ transitionTimingFunction: EASE }}
            >
              Book a Free Call
            </Link>
          </Magnetic>
        </span>

        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-[1001] flex min-h-[44px] min-w-[44px] items-center justify-center text-site-ink outline-none md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <div className="flex w-6 flex-col gap-[6px]">
            <span className={`h-[2px] rounded bg-current transition-all duration-300 ${open ? 'translate-y-[8px] rotate-45' : ''}`} />
            <span className={`h-[2px] rounded bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] rounded bg-current transition-all duration-300 ${open ? '-translate-y-[8px] -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_ARR }}
            className="fixed inset-0 z-[1000] flex flex-col bg-white md:hidden"
          >
            <motion.nav
              variants={overlayContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-24 flex flex-1 flex-col gap-2 px-8"
            >
              {NAV_LINKS.map((l) => (
                <span key={l.href} className="overflow-hidden">
                  <motion.span variants={overlayItem} className="block">
                    <Link
                      to={l.href}
                      className={`block py-2 text-[34px] font-semibold tracking-[-0.02em] ${
                        isActive(l.href) ? 'text-site-accent' : 'text-site-ink'
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.span>
                </span>
              ))}
            </motion.nav>

            <div className="px-8 pb-12">
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
