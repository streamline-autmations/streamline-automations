import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Magnetic } from './Magnetic';

type Variant = 'ink' | 'on-dark';

// Full static class strings so Tailwind keeps them (no dynamic concatenation).
// Every button is transparent by default — it takes on whatever colour the
// section behind it already is — with an outline + label in the inverse
// colour. On hover, a whole new "sheet" (fill colour + inverted label,
// together as one unit) slides up and covers it.
const V: Record<Variant, { ring: string; fill: string; text: string }> = {
  ink: { ring: 'border-site-ink text-site-ink', fill: 'bg-site-ink', text: 'text-white' },
  'on-dark': { ring: 'border-white text-white', fill: 'bg-white', text: 'text-site-ink' },
};

/**
 * FillButton — transparent-by-default outlined pill. On hover, a second full
 * copy of the button — inverted fill + inverted label, moving as one piece —
 * slides up from below and covers the base label, so it reads as a new
 * button sliding in rather than the same label just recolouring in place.
 * Subtle magnetic pull (auto-disabled on touch + reduced-motion). Renders a
 * router <Link> (to) or an <a> (href). Reduced-motion → instant swap, no slide.
 */
export default function FillButton({
  to,
  href,
  onClick,
  children,
  variant = 'ink',
  className = '',
  dataCursor = 'link',
  external = false,
}: {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  dataCursor?: 'view' | 'link';
  external?: boolean;
}) {
  const v = V[variant];
  const cls = `group relative inline-flex min-h-[60px] items-center justify-center overflow-hidden rounded-full border px-11 py-5 text-[16px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:min-h-[64px] md:px-12 md:text-[17px] ${
    variant === 'on-dark' ? 'focus-visible:ring-white' : 'focus-visible:ring-site-accent'
  } ${v.ring} ${className}`;

  const inner = (
    <>
      {/* Base label — sits underneath, in the outline colour, always present */}
      <span className="relative z-0">{children}</span>

      {/* The incoming "sheet" — fill colour + inverted label riding together
          as one unit, translated fully off-screen at rest. On hover it
          slides up and over the base label as a single piece, instead of
          the label just recolouring where it already sits. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-10 flex translate-y-full items-center justify-center transition-transform duration-[550ms] ease-brand group-hover:translate-y-0 motion-reduce:transition-none ${v.fill}`}
      >
        <span className={v.text}>{children}</span>
      </span>
    </>
  );

  if (to) {
    return (
      <Magnetic strength={10}>
        <Link to={to} data-cursor={dataCursor} className={cls}>
          {inner}
        </Link>
      </Magnetic>
    );
  }
  if (href) {
    return (
      <Magnetic strength={10}>
        <a
          href={href}
          data-cursor={dataCursor}
          className={cls}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {inner}
        </a>
      </Magnetic>
    );
  }
  return (
    <Magnetic strength={10}>
      <button type="button" onClick={onClick} data-cursor={dataCursor} className={cls}>
        {inner}
      </button>
    </Magnetic>
  );
}
