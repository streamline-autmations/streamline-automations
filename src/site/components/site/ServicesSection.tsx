import { Link } from 'react-router-dom';
import Panel from '../craft/Panel';
import Tag from '../craft/Tag';
import SplitReveal from '../craft/SplitReveal';

const SERVICES = [
  {
    no: '01',
    label: 'Web Design',
    title: 'Web Design & Creation',
    outcome: 'Websites that convert. Built in days, not months.',
    href: '/websites',
  },
  {
    no: '02',
    label: 'Automation',
    title: 'Systems & Automation',
    outcome: 'Stop doing it manually. Build the system once.',
    href: '/systems',
  },
  {
    no: '03',
    label: 'Hosting',
    title: 'Hosting, Email & Maintenance',
    outcome: 'Your foundation. Handled.',
    href: '/hosting',
  },
];

/** Three ways I help — 3 cards linking to the service pages. */
export default function ServicesSection() {
  return (
    <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <Tag variant="outline" className="mb-6">
          Three ways I help
        </Tag>
        <SplitReveal
          as="h2"
          segments={[{ text: 'Pick where it' }, { text: 'hurts', serif: true }, { text: 'most.' }]}
          className="max-w-[16ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              to={s.href}
              data-cursor="link"
              className="group flex flex-col justify-between rounded-3xl border border-site-line bg-white p-8 outline-none transition-[transform,border-color,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:border-site-line-mid hover:shadow-[0_24px_60px_-24px_rgba(76,29,149,0.2)] focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 md:p-10"
            >
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">
                  {s.no} / {s.label}
                </span>
                <h3 className="mt-6 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-site-ink md:text-[25px]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-site-text-body">{s.outcome}</p>
              </div>
              <span
                aria-hidden="true"
                className="mt-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-site-line text-[18px] text-site-ink transition-all duration-300 ease-brand group-hover:border-site-accent group-hover:bg-site-accent group-hover:text-white"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Panel>
  );
}
