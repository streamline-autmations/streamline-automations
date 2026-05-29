import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollToHash from './useScrollToHash';

const EASE = 'cubic-bezier(0.22,1,0.36,1)';

/** Corner nav link with a purple underline that wipes in on hover. */
function NavLink({
  children,
  to,
  onClick,
  accent = false,
}: {
  children: React.ReactNode;
  to: string;
  onClick?: (e: React.MouseEvent) => void;
  accent?: boolean;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
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
 * Floating top nav — transparent over the hero, frosted white once scrolled.
 * Mirrors the handoff design: Services / Portfolio · Streamline. · About / Book a Call.
 */
export default function DesignNav() {
  const [scrolled, setScrolled] = useState(false);
  const scrollTo = useScrollToHash();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[1000] grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] items-center transition-all duration-500"
      style={{
        padding: scrolled ? '16px 40px' : '24px 40px',
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
          opacity: scrolled ? 1 : 0,
          transitionTimingFunction: EASE,
        }}
      />

      {/* LEFT — hidden on mobile */}
      <nav className="hidden md:flex items-center gap-8">
        <NavLink to="/#services" onClick={(e) => scrollTo(e, '#services')}>
          Services
        </NavLink>
        <NavLink to="/#work" onClick={(e) => scrollTo(e, '#work')}>
          Portfolio
        </NavLink>
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
      <nav className="flex items-center justify-end gap-8">
        <span className="hidden md:inline-flex">
          <NavLink to="/about">About</NavLink>
        </span>
        <NavLink to="/contact" accent>
          Book a Call
        </NavLink>
      </nav>
    </header>
  );
}
