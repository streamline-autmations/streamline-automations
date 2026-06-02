import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import MagneticCTA from './ui/MagneticCTA';

const EASE = 'cubic-bezier(0.22,1,0.36,1)';
const EASE_ARR: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SERVICES = [
  { label: 'Web Design', href: '/websites', desc: 'Custom sites that convert' },
  { label: 'Systems & Automation', href: '/systems', desc: 'Workflows on autopilot' },
  { label: 'Hosting & Maintenance', href: '/hosting', desc: 'Pay monthly, own after 18 months' },
];

const MOBILE_LINKS = [
  { label: 'Web Design', href: '/websites' },
  { label: 'Systems & Automation', href: '/systems' },
  { label: 'Hosting & Maintenance', href: '/hosting' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
];

/** Underlined corner link with active-route state. */
function NavLink({
  children,
  to,
  active,
}: {
  children: React.ReactNode;
  to: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group relative inline-flex min-h-[44px] items-center font-['DM_Sans'] text-[14px] font-medium outline-none transition-colors duration-300 focus-visible:text-[#7B3FE4] ${
        active ? 'text-[#0A0A0F]' : 'text-[#3D3D47] hover:text-[#0A0A0F]'
      }`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-[#7B3FE4] transition-transform duration-[400ms] ${
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
 * SiteHeader — the single shared floating nav used identically on every page.
 * Transparent over the hero, picks up a frosted-white blur + hairline border on
 * scroll. Services dropdown (desktop) + active-route state. Mobile: hamburger →
 * full-screen overlay with a staggered, masked link reveal.
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isActive = (href: string) => location.pathname.startsWith(href);
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

  // Close the services dropdown on outside click / Escape.
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
      className="fixed inset-x-0 top-0 z-[1000] grid grid-cols-[1fr_auto] items-center transition-all duration-500 md:grid-cols-[1fr_auto_1fr]"
      style={{ padding: scrolled ? '14px 24px' : '20px 24px', transitionTimingFunction: EASE }}
    >
      {/* Frosted backdrop fades in on scroll (or when overlay is open) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 border-b border-[#E8E8EC] transition-opacity duration-500"
        style={{
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(14px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.2)',
          opacity: scrolled ? 1 : 0,
          transitionTimingFunction: EASE,
        }}
      />

      {/* LEFT — desktop nav */}
      <nav className="hidden items-center gap-8 pl-3 md:flex">
        <div ref={servicesRef} className="relative">
          <button
            onClick={() => setServicesOpen((v) => !v)}
            aria-expanded={servicesOpen}
            className={`group inline-flex min-h-[44px] items-center gap-1.5 font-['DM_Sans'] text-[14px] font-medium outline-none transition-colors duration-300 focus-visible:text-[#7B3FE4] ${
              servicesActive ? 'text-[#0A0A0F]' : 'text-[#3D3D47] hover:text-[#0A0A0F]'
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
                className="absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
              >
                {SERVICES.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`block px-5 py-3.5 outline-none transition-colors hover:bg-[#FAFAFA] focus-visible:bg-[#F0EBFF] ${
                      isActive(item.href) ? 'bg-[#F0EBFF]' : ''
                    }`}
                  >
                    <span className="block font-['DM_Sans'] text-[13.5px] font-semibold text-[#0A0A0F]">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block font-['DM_Sans'] text-[12px] text-[#9E9EA8]">
                      {item.desc}
                    </span>
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

      {/* CENTER — wordmark */}
      <Link
        to="/"
        className="font-['DM_Sans'] text-[21px] font-bold tracking-[-0.02em] text-[#0A0A0F] outline-none md:justify-self-center"
        aria-label="Streamline Automations — home"
      >
        Streamline<span className="text-[#7B3FE4]">.</span>
      </Link>

      {/* RIGHT */}
      <div className="flex items-center justify-end gap-6">
        <span className="hidden md:inline-flex">
          <MagneticCTA strength={14}>
            <Link
              to="/contact"
              data-cursor="view"
              className="inline-flex items-center rounded-full bg-[#7B3FE4] px-6 py-3 font-['DM_Sans'] text-[14px] font-semibold text-white outline-none transition-[background-color,box-shadow] duration-300 hover:bg-[#6930D0] hover:shadow-[0_12px_32px_rgba(123,63,228,0.30)] focus-visible:ring-2 focus-visible:ring-[#7B3FE4] focus-visible:ring-offset-2"
              style={{ transitionTimingFunction: EASE }}
            >
              Book a Free Call
            </Link>
          </MagneticCTA>
        </span>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-[1001] flex min-h-[44px] min-w-[44px] items-center justify-center text-[#0A0A0F] outline-none md:hidden"
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
              {MOBILE_LINKS.map((l) => (
                <span key={l.href} className="overflow-hidden">
                  <motion.span variants={overlayItem} className="block">
                    <Link
                      to={l.href}
                      className={`block py-2 font-['DM_Sans'] text-[34px] font-bold tracking-[-0.02em] ${
                        isActive(l.href) ? 'text-[#7B3FE4]' : 'text-[#0A0A0F]'
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
                className="flex min-h-[52px] items-center justify-center rounded-full bg-[#7B3FE4] px-6 py-4 font-['DM_Sans'] text-[16px] font-semibold text-white"
              >
                Book a Free Call
              </Link>
              <div className="mt-6 flex flex-col gap-1 font-['DM_Sans'] text-[14px] text-[#6B6B7A]">
                <a href="https://wa.me/27633063861" target="_blank" rel="noopener noreferrer">
                  WhatsApp · 063 306 3861
                </a>
                <a href="mailto:christian@streamline-automations.co.za">
                  christian@streamline-automations.co.za
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
