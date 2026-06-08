import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Magnetic } from './Magnetic';

type Variant = 'ink' | 'accent' | 'on-dark';

// Full static class strings so Tailwind keeps them (no dynamic concatenation).
const V: Record<Variant, { ring: string; fill: string; hoverText: string }> = {
  ink: { ring: 'border-site-ink text-site-ink', fill: 'bg-site-ink', hoverText: 'group-hover:text-white' },
  accent: { ring: 'border-site-accent text-site-accent', fill: 'bg-site-accent', hoverText: 'group-hover:text-white' },
  'on-dark': { ring: 'border-white text-white', fill: 'bg-white', hoverText: 'group-hover:text-site-ink' },
};

/**
 * FillButton — outlined pill that fills from the bottom on hover, inverting the
 * label colour (Cuberto's signature button). Magnetic by default. Renders a
 * router <Link> (to) or an <a> (href). Reduced-motion → instant fill, no slide.
 */
export default function FillButton({
  to,
  href,
  children,
  variant = 'ink',
  strength = 16,
  className = '',
  dataCursor = 'link',
  external = false,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: Variant;
  strength?: number;
  className?: string;
  dataCursor?: 'view' | 'link';
  external?: boolean;
}) {
  const v = V[variant];
  const cls = `group relative inline-flex min-h-[56px] items-center justify-center overflow-hidden rounded-full border px-9 py-4 text-[15px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
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

  return (
    <Magnetic strength={strength}>
      {to ? (
        <Link to={to} data-cursor={dataCursor} className={cls}>
          {inner}
        </Link>
      ) : (
        <a
          href={href}
          data-cursor={dataCursor}
          className={cls}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {inner}
        </a>
      )}
    </Magnetic>
  );
}
