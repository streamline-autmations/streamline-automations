import Panel from '../craft/Panel';
import Tag from '../craft/Tag';
import CountUp from './CountUp';

// Real numbers only — no invented metrics.
const STATS: { to: number; prefix?: string; suffix?: string; label: string }[] = [
  { to: 8, suffix: '+', label: 'Clients delivered, end to end' },
  { to: 700, suffix: '+', label: 'Products live in under two weeks — CW Electronics' },
  { to: 4, suffix: '-day', label: 'Portfolio build — Ameli Designs' },
  { to: 12, suffix: '-stage', label: 'Production tracking — RecklessBear' },
];

/** By the numbers — honest stats, count up on scroll-in. White treatment so
 *  ink stays reserved for the scrolly + pre-footer moments. */
export default function StatsSection() {
  return (
    <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <Tag variant="outline" className="mb-10">
          By the numbers
        </Tag>
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="border-t border-site-line-mid pt-6">
              <CountUp
                to={s.to}
                prefix={s.prefix}
                suffix={s.suffix}
                className="block text-[clamp(48px,7vw,84px)] font-semibold leading-none tracking-[-0.03em] text-site-ink"
              />
              <p className="mt-4 max-w-[24ch] text-[14px] leading-[1.5] text-site-text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
