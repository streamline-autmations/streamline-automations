import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LEFT_LINKS = [
  { label: 'Services', href: '/websites' },
  { label: 'Portfolio', href: '/portfolio' },
];

const MOBILE_LINKS = [
  { label: 'Services', href: '/websites' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
];

/** A single corner nav link — black text with a dot that fades in on hover. */
function NavLink({
  to,
  children,
  accent = false,
  textClass,
}: {
  to: string;
  children: React.ReactNode;
  accent?: boolean;
  textClass: string;
}) {
  return (
    <Link
      to={to}
      className={`group relative inline-flex items-center font-['DM_Sans'] font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] min-h-[44px] ${textClass} ${
        accent ? 'text-[#7B3FE4] hover:text-[#6930D0]' : 'text-[#0A0A0F] hover:text-[#3D3D47]'
      }`}
    >
      {children}
      {/* Hover dot underneath */}
      <span
        aria-hidden="true"
        className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          accent ? 'bg-[#7B3FE4]' : 'bg-[#0A0A0F]'
        }`}
      />
    </Link>
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

  // Text size shrinks slightly once scrolled past the hero threshold.
  const linkSize = scrolled ? 'text-xs' : 'text-sm';
  const logoSize = scrolled ? 'text-sm' : 'text-base';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? 'backdrop-blur-sm bg-white/40' : 'bg-transparent'
      }`}
    >
      <div className="relative w-full px-6 py-6 flex items-center justify-between">
        {/* LEFT — desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {LEFT_LINKS.map((l) => (
            <NavLink key={l.href} to={l.href} textClass={linkSize}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* CENTER — logo (absolutely centred so corner widths never shift it) */}
        <Link
          to="/"
          className={`absolute left-1/2 -translate-x-1/2 font-['DM_Sans'] font-bold tracking-[-0.02em] text-[#0A0A0F] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${logoSize}`}
        >
          Streamline<span className="text-[#7B3FE4]">.</span>
        </Link>

        {/* RIGHT — desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/about" textClass={linkSize}>
            About
          </NavLink>
          <NavLink to="/contact" accent textClass={linkSize}>
            Book a Free Call
          </NavLink>
        </nav>

        {/* MOBILE — hamburger on far right, logo stays centred */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden ml-auto p-2 text-[#0A0A0F] min-h-[44px] min-w-[44px] flex items-center justify-center"
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
