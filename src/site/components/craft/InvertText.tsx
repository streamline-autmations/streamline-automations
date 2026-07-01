import { useRef } from 'react';

interface Props {
  children: string;
  /** Colour the letters flip to under the circle — the opposite of this text's own colour. */
  invertColor: string;
  className?: string;
  /** Radius of the reveal circle in px — matches the cursor dot's link-hover size. */
  radius?: number;
}

/**
 * InvertText — wraps a short text label with a duplicate overlay clipped to a
 * small circle that follows the pointer in element-local coordinates. Only the
 * letters directly under the circle flip to `invertColor`. Used for plain
 * text links that don't already have their own hover animation (e.g. RollText
 * nav items keep their roll — this would fight with that).
 */
export default function InvertText({ children, invertColor, className = '', radius = 11 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const setPoint = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--ix', `${e.clientX - rect.left}px`);
    el.style.setProperty('--iy', `${e.clientY - rect.top}px`);
  };

  const onEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    setPoint(e);
    ref.current?.style.setProperty('--ir', `${radius}px`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty('--ir', '0px');
  };

  return (
    <span
      ref={ref}
      data-cursor="text"
      className={`sc-invert-text ${className}`}
      style={{ '--invert-color': invertColor } as React.CSSProperties}
      onMouseEnter={onEnter}
      onMouseMove={setPoint}
      onMouseLeave={onLeave}
    >
      {children}
      <span className="sc-invert-text-overlay" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
