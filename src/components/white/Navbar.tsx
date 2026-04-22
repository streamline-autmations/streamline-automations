import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'Services', href: '/websites' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
];

export default function WhiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-[#E8E8EC]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-[15px] font-['DM_Sans'] font-semibold text-[#0A0A0F]
                     tracking-[-0.02em] hover:opacity-70 transition-opacity duration-200"
        >
          Streamline<span className="text-[#7B3FE4]">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-[14px] font-['DM_Sans'] transition-colors duration-200 ${
                isActive(l.href) ? 'text-[#0A0A0F]' : 'text-[#6B6B7A] hover:text-[#0A0A0F]'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5
                       bg-[#0A0A0F] hover:bg-[#1a1a24] text-white text-[13.5px]
                       font-['DM_Sans'] font-medium rounded-full transition-colors
                       duration-200 min-h-[40px]"
          >
            Book a Free Call
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[#0A0A0F] min-h-[44px] min-w-[44px]
                     flex items-center justify-center"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <div className="flex flex-col gap-[5px] w-5">
            <span
              className={`h-px bg-current transition-all duration-200 ${
                open ? 'rotate-45 translate-y-[6px]' : ''
              }`}
            />
            <span
              className={`h-px bg-current transition-all duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-px bg-current transition-all duration-200 ${
                open ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-white border-b border-[#E8E8EC] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="py-3 text-[16px] font-['DM_Sans'] font-medium text-[#0A0A0F]"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center justify-center px-6 py-3.5
                           bg-[#0A0A0F] text-white text-sm font-['DM_Sans'] font-medium
                           rounded-full min-h-[48px]"
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
