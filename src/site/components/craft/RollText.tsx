import { ReactNode } from 'react';
import InvertText from './InvertText';

/**
 * RollText — vertical roll-on-hover label (Cuberto / Locomotive style). The
 * visible word rolls up and out while an identical copy rolls in from below.
 * Trigger it by placing this inside an element that carries the `group` class
 * (e.g. a nav <Link className="group">). Reduced-motion → static label.
 *
 * `invertColor`, when set, wraps the label in InvertText so the letters
 * themselves flip colour under the cursor's circle — needed because the
 * cursor dot's own colour is the inverse of the section background, which is
 * exactly the label's colour too (e.g. white text, white dot, on a dark
 * section) and would otherwise be invisible against it.
 */
export default function RollText({
  children,
  className = '',
  invertColor,
}: {
  children: ReactNode;
  className?: string;
  invertColor?: string;
}) {
  const label =
    invertColor && typeof children === 'string' ? (
      <InvertText invertColor={invertColor}>{children}</InvertText>
    ) : (
      children
    );
  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className}`}>
      <span className="block transition-transform duration-[450ms] ease-brand group-hover:-translate-y-[120%] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 block translate-y-[120%] transition-transform duration-[450ms] ease-brand group-hover:translate-y-0 motion-reduce:hidden"
      >
        {label}
      </span>
    </span>
  );
}
