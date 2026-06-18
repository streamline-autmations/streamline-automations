import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { EASE, EASE_ARR } from '../../lib/motion';
import { NAV_LINKS, CONTACT, PRIMARY_CTA } from '../../data/site';
import { Magnetic } from '../craft/Magnetic';
import RollText from '../craft/RollText';
import Wordmark from '../craft/Wordmark';

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

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  useEffect(() => {
    const probeY = 40;
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
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] flex items-center justify-between px-6 py-[18px] md:px-10">
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

      <Magnetic strength={10}>
        <Link to="/" data-cursor="link" className="inline-block outline-none" aria-label="Streamline Automations home">
          <Wordmark tone={overDark ? 'light' : 'ink'} className="text-[21px] transition-colors duration-300 md:text-[23px]" />
        </Link>
      </Magnetic>

      <nav className="hidden items-center gap-9 md:flex">
        {NAV_LINKS.map((link) => (
          <NavRoll key={link.href} to={link.href} label={link.label} active={isActive(link.href)} dark={overDark} />
        ))}
        <Link
          to={PRIMARY_CTA.href}
          data-cursor="link"
          className="inline-flex min-h-[44px] items-center rounded-full bg-site-accent px-5 text-[14px] font-semibold text-white outline-none transition-colors duration-300 hover:bg-site-accent-hover focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2"
        >
          {PRIMARY_CTA.label}
        </Link>
      </nav>

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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_ARR }}
            className="fixed inset-0 z-[1000] flex flex-col overflow-y-auto bg-white md:hidden"
          >
            <div className="px-8 pt-[22px]">
              <Link to="/" className="inline-block outline-none" aria-label="Streamline Automations home">
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
                <a href={`mailto:${CONTACT.email}`} className="min-h-[44px] py-1 text-[15px] font-medium text-site-text-body outline-none">
                  {CONTACT.email}
                </a>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] py-1 text-[15px] font-medium text-site-text-body outline-none"
                >
                  WhatsApp / {CONTACT.whatsappDisplay}
                </a>
              </div>
              <Link
                to={PRIMARY_CTA.href}
                className="flex min-h-[52px] items-center justify-center rounded-full bg-site-accent px-6 py-4 text-[16px] font-semibold text-white"
              >
                {PRIMARY_CTA.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
