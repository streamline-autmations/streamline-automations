import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LOGO =
  'https://res.cloudinary.com/dnlgohkcc/image/upload/v1777354607/Untitled_design_80_bcjybe.png';

const WORK_LINKS = [
  { label: 'Websites', href: '/websites', desc: 'Custom sites that convert' },
  { label: 'Systems', href: '/systems', desc: 'Workflows on autopilot' },
  { label: 'Hosting', href: '/hosting', desc: 'Rent monthly, own after 18 months' },
];

const MOBILE_LINKS = [
  { label: 'Websites', href: '/websites' },
  { label: 'Systems', href: '/systems' },
  { label: 'Hosting', href: '/hosting' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
];

/**
 * A single corner nav link with a dot that fades in on hover.
 * `light` (over the video hero) = white text; otherwise near-black.
 * The accent CTA stays purple once scrolled, white over the hero.
 */
function NavLink({
  to,
  children,
  accent = false,
  light,
  textClass,
}: {
  to: string;
  children: React.ReactNode;
  accent?: boolean;
  light: boolean;
  textClass: string;
}) {
  const color = light
    ? 'text-white hover:text-white/80'
    : accent
      ? 'text-[#7B3FE4] hover:text-[#6930D0]'
      : 'text-[#0A0A0F] hover:text-[#3D3D47]';
  const dot = light ? 'bg-white' : accent ? 'bg-[#7B3FE4]' : 'bg-[#0A0A0F]';

  return (
    <Link
      to={to}
      className={`group relative inline-flex items-center font-['DM_Sans'] font-medium tracking-[-0.01em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] min-h-[44px] ${textClass} ${color}`}
    >
      {children}
      {/* Hover dot underneath */}
      <span
        aria-hidden="true"
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${dot}`}
      />
    </Link>
  );
}

/** "Work" trigger + dropdown panel — opens on hover (desktop). */
function WorkDropdown({ light, textClass }: { light: boolean; textClass: string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // Small close delay so the cursor can cross the gap into the panel.
  const onLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const color = light ? 'text-white hover:text-white/80' : 'text-[#0A0A0F] hover:text-[#3D3D47]';

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        className={`group inline-flex items-center gap-1.5 font-['DM_Sans'] font-medium tracking-[-0.01em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] min-h-[44px] ${textClass} ${color}`}
        aria-expanded={open}
      >
        Work
        <svg
          aria-hidden="true"
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-[#E8E8EC] shadow-[0_16px_48px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            {WORK_LINKS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-5 py-3.5 hover:bg-[#FAFAFA] transition-colors"
              >
                <span className="block text-[14px] font-['DM_Sans'] font-semibold text-[#0A0A0F]">
                  {item.label}
                </span>
                <span className="block text-[12px] font-['DM_Sans'] text-[#9E9EA8] mt-0.5">
                  {item.desc}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Over the video hero the nav is "light" (white text); once scrolled onto
  // the white page it flips to dark text on a frosted-white backdrop.
  const light = !scrolled;

  // Slightly larger, friendlier sizing; eases down a touch once scrolled.
  const linkSize = scrolled ? 'text-[14px]' : 'text-[16px]';
  const logoHeight = scrolled ? 'h-7' : 'h-9';
  const wordmarkSize = scrolled ? 'text-base' : 'text-lg';

  // Soft shadow so white links stay readable over a bright video frame.
  const lightShadow: React.CSSProperties = light
    ? { textShadow: '0 1px 14px rgba(0,0,0,0.4)' }
    : {};

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? 'backdrop-blur-sm bg-white/40' : 'bg-transparent'
      }`}
    >
      <div className="relative w-full px-6 py-6 flex items-center justify-between" style={lightShadow}>
        {/* LEFT — desktop links */}
        <nav className="hidden md:flex items-center gap-9">
          <WorkDropdown light={light} textClass={linkSize} />
          <NavLink to="/portfolio" light={light} textClass={linkSize}>
            Portfolio
          </NavLink>
        </nav>

        {/* CENTER — logo image over the video, wordmark on the white page */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center"
          aria-label="Streamline Automations — home"
        >
          {light ? (
            <img
              src={LOGO}
              alt=""
              aria-hidden="true"
              className={`w-auto transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${logoHeight}`}
              style={{ filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.35))' }}
            />
          ) : (
            <span
              className={`font-['DM_Sans'] font-bold tracking-[-0.02em] text-[#0A0A0F] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${wordmarkSize}`}
            >
              Streamline<span className="text-[#7B3FE4]">.</span>
            </span>
          )}
        </Link>

        {/* RIGHT — desktop links */}
        <nav className="hidden md:flex items-center gap-9">
          <NavLink to="/about" light={light} textClass={linkSize}>
            About
          </NavLink>
          <NavLink to="/contact" accent light={light} textClass={linkSize}>
            Book a Free Call
          </NavLink>
        </nav>

        {/* MOBILE — hamburger on far right, logo stays centred */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden ml-auto p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors duration-300 ${
            light ? 'text-white' : 'text-[#0A0A0F]'
          }`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <div className="flex flex-col gap-[5px] w-5">
            <span className={`h-px bg-current transition-all duration-200 ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`h-px bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-px bg-current transition-all duration-200 ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* MOBILE menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="md:hidden overflow-hidden backdrop-blur-md bg-white/90 border-b border-[#E8E8EC]"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {MOBILE_LINKS.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="py-3 text-[16px] font-['DM_Sans'] font-medium text-[#0A0A0F] hover:text-[#7B3FE4] transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center px-6 py-3.5 bg-[#7B3FE4] hover:bg-[#6930D0] text-white text-sm font-['DM_Sans'] font-semibold rounded-full min-h-[48px] transition-colors duration-200"
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
