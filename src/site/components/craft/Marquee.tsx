import { Fragment, type CSSProperties } from 'react';

/**
 * Marquee — a continuous horizontal drift of repeated labels. The track holds two
 * identical sets and translates -50% on loop, so the wrap is invisible. CSS
 * animation (.sc-marquee-track in site.css) pauses under prefers-reduced-motion.
 */
export default function Marquee({
  items,
  durationSec = 40,
  className = '',
  itemClassName = '',
  separator = '·',
}: {
  items: string[];
  durationSec?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
}) {
  const Set = () => (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <Fragment key={i}>
          <span className={`whitespace-nowrap ${itemClassName}`}>{t}</span>
          <span aria-hidden="true" className={`mx-6 select-none opacity-40 ${itemClassName}`}>
            {separator}
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="sc-marquee-track flex w-max"
        style={{ '--marquee-dur': `${durationSec}s` } as CSSProperties}
      >
        <Set />
        <Set />
      </div>
    </div>
  );
}
