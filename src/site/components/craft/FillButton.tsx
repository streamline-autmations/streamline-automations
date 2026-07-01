import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import InvertText from './InvertText';

type Variant = 'ink' | 'on-dark';

// The sweep label's own colour, inverted — so InvertText can flip the letters
// to something visible against it (the cursor dot is already the same colour
// as the sweep label itself, since both are "opposite of the section").
const INVERT_COLOR: Record<Variant, string> = { ink: '#0A0A0F', 'on-dark': '#FFFFFF' };

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
 * Static — no magnetic pull. Renders a router <Link> (to) or an <a> (href).
 * Reduced-motion → instant swap, no slide.
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
  // Tells the cursor what colour this button's hover-fill sweep turns it —
  // it can't be inferred from computed background-color since the fill is a
  // translated sibling <span>, not the anchor's own background.
  const cursorBg = variant === 'on-dark' ? 'light' : 'dark';
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
        <span className={`${v.text} pointer-events-auto`}>
          {typeof children === 'string' ? (
            <InvertText invertColor={INVERT_COLOR[variant]}>{children}</InvertText>
          ) : (
            children
          )}
        </span>
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} data-cursor={dataCursor} data-cursor-bg={cursorBg} className={cls}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        data-cursor={dataCursor}
        data-cursor-bg={cursorBg}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} data-cursor={dataCursor} data-cursor-bg={cursorBg} className={cls}>
      {inner}
    </button>
  );
}
