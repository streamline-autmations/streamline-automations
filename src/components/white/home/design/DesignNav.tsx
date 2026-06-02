import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

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

/** Corner nav link with a purple underline that wipes in on hover. */
function NavLink({
  children,
  to,
  accent = false,
}: {
  children: React.ReactNode;
  to: string;
  accent?: boolean;
}) {
  return (
    <Link
      to={to}
      data-cursor={accent ? 'view' : undefined}
      className={`group relative inline-flex items-center min-h-[44px] font-['DM_Sans'] text-[14px] font-medium transition-colors duration-300 ${
        accent ? 'text-[#7B3FE4] hover:text-[#6930D0] font-semibold' : 'text-[#3D3D47] hover:text-[#0A0A0F]'
      }`}
    >
      {children}
      {!accent && (
        <span
          aria-hidden="true"
          className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-[#7B3FE4] transition-transform duration-[400ms] group-hover:scale-x-100"
          style={{ transitionTimingFunction: EASE }}
        />
      )}
    </Link>
  );
}

/**
 * Floating homepage nav — transparent over the hero, frosted white once
 * scrolled. Real page navigation: Services dropdown (Web Design / Systems /
 * Hosting), Portfolio, About, Book a Call — plus a full mobile menu.
 */
export default function DesignNav() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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

  // Close the services dropdown on outside click.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[1000] grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center transition-all duration-500"
      style={{
        padding: scrolled ? '16px 24px' : '20px 24px',
        transitionTimingFunction: EASE,
      }}
    >
      {/* Frosted backdrop fades in on scroll */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 border-b border-[#E8E8EC] transition-opacity duration-500"
        style={{
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(14px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.2)',
          opacity: scrolled || open ? 1 : 0,
          transitionTimingFunction: EASE,
        }}
      />

      {/* LEFT — desktop nav */}
      <nav className="hidden md:flex items-center gap-8 pl-4">
        <div ref={servicesRef} className="relative">
          <button
            onClick={() => setServicesOpen((v) => !v)}
            className="group inline-flex items-center gap-1.5 min-h-[44px] font-['DM_Sans'] text-[14px] font-medium text-[#3D3D47] transition-colors duration-300 hover:text-[#0A0A0F]"
            aria-expanded={servicesOpen}
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
                    className={`block px-5 py-3.5 transition-colors hover:bg-[#FAFAFA] ${
                      location.pathname.startsWith(item.href) ? 'bg-[#F0EBFF]' : ''
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

        <NavLink to="/portfolio">Portfolio</NavLink>
      </nav>

      {/* CENTER — wordmark */}
      <Link
        to="/"
        className="font-['DM_Sans'] text-[21px] font-bold tracking-[-0.02em] text-[#0A0A0F] whitespace-nowrap md:justify-self-center"
        aria-label="Streamline Automations — home"
      >
        Streamline<span className="text-[#7B3FE4]">.</span>
      </Link>

      {/* RIGHT */}
      <div className="flex items-center justify-end gap-7">
        <span className="hidden md:inline-flex">
          <NavLink to="/about">About</NavLink>
        </span>
        <span className="hidden md:inline-flex">
          <NavLink to="/contact" accent>
            Book a Call
          </NavLink>
        </span>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex min-h-[44px] min-w-[44px] items-center justify-center text-[#0A0A0F]"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <div className="flex w-5 flex-col gap-[5px]">
            <span className={`h-px bg-current transition-all duration-200 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`h-px bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-px bg-current transition-all duration-200 ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE_ARR }}
            className="absolute inset-x-0 top-full px-4 md:hidden"
          >
            <div className="mb-4 overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white/95 p-2 shadow-[0_16px_48px_rgba(0,0,0,0.12)] backdrop-blur-xl">
              {MOBILE_LINKS.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`block rounded-xl px-4 py-3.5 font-['DM_Sans'] text-[16px] font-medium transition-colors ${
                    location.pathname.startsWith(l.href) ? 'bg-[#F0EBFF] text-[#7B3FE4]' : 'text-[#0A0A0F] hover:bg-[#FAFAFA]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 flex min-h-[48px] items-center justify-center rounded-full bg-[#7B3FE4] px-6 py-3.5 font-['DM_Sans'] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#6930D0]"
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
