import { ReactNode } from 'react';

/**
 * RollText — vertical roll-on-hover label (Cuberto / Locomotive style). The
 * visible word rolls up and out while an identical copy rolls in from below.
 * Trigger it by placing this inside an element that carries the `group` class
 * (e.g. a nav <Link className="group">). Reduced-motion → static label.
 */
export default function RollText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className}`}>
      <span className="block transition-transform duration-[450ms] ease-brand group-hover:-translate-y-[120%] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 block translate-y-[120%] transition-transform duration-[450ms] ease-brand group-hover:translate-y-0 motion-reduce:hidden"
      >
        {children}
      </span>
    </span>
  );
}
