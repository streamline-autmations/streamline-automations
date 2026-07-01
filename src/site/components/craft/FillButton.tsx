import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Magnetic } from './Magnetic';

type Variant = 'ink' | 'on-dark';

// Full static class strings so Tailwind keeps them (no dynamic concatenation).
// Every button is transparent by default — it takes on whatever colour the
// section behind it already is — with an outline + label in the inverse
// colour. On hover, that inverse colour fills in and the label flips back.
const V: Record<Variant, { ring: string; fill: string; hoverText: string }> = {
  ink: { ring: 'border-site-ink text-site-ink', fill: 'bg-site-ink', hoverText: 'group-hover:text-white' },
  'on-dark': { ring: 'border-white text-white', fill: 'bg-white', hoverText: 'group-hover:text-site-ink' },
};

/**
 * FillButton — transparent-by-default outlined pill that fills from the
 * bottom on hover, inverting the label colour (Cuberto's signature button),
 * with a subtle magnetic pull (auto-disabled on touch + reduced-motion).
 * Renders a router <Link> (to) or an <a> (href). Reduced-motion → instant
 * fill, no slide.
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
      <span
        aria-hidden="true"
        className={`absolute inset-0 z-0 translate-y-full transition-transform duration-[600ms] ease-brand group-hover:translate-y-0 motion-reduce:transition-none ${v.fill}`}
      />
      <span className={`relative z-10 transition-colors duration-[350ms] ease-brand ${v.hoverText}`}>{children}</span>
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
