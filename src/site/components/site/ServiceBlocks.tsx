import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, stagger, viewport } from '../../lib/motion';

const LINK =
  'inline-flex min-h-[44px] items-center text-[15px] font-semibold text-site-ink underline-offset-4 outline-none hover:text-site-accent hover:underline focus-visible:text-site-accent focus-visible:underline';

export type ServiceRow = { title: string; body: string; link?: { to: string; label: string } };

/**
 * Editorial rows on hairlines: heading left, explanation right. Used for the
 * long-form "what it is / proof" content on service pages.
 */
export function ServiceRows({ rows }: { rows: ReadonlyArray<ServiceRow> }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="mt-14 divide-y divide-site-line border-y border-site-line"
    >
      {rows.map((row) => (
        <motion.div
          key={row.title}
          variants={fadeUp}
          className="grid gap-3 py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:py-10"
        >
          <h3 className="text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.2] tracking-[-0.015em] text-site-ink">
            {row.title}
          </h3>
          <div>
            <p className="max-w-xl text-[16px] leading-[1.65] text-site-text-body md:text-[17px]">{row.body}</p>
            {row.link && (
              <Link to={row.link.to} data-cursor="link" className={`mt-2 ${LINK}`}>
                {row.link.label}
              </Link>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** Numbered process steps — how a project actually runs, start to finish. */
export function ProcessSteps({ steps }: { steps: ReadonlyArray<{ title: string; body: string }> }) {
  return (
    <motion.ol
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="mt-14 grid gap-x-10 gap-y-10 border-t border-site-line pt-10 sm:grid-cols-2 lg:grid-cols-4"
    >
      {steps.map((step, i) => (
        <motion.li key={step.title} variants={fadeUp}>
          <span className="text-[15px] font-semibold text-site-accent">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-3 text-[20px] font-semibold leading-[1.25] tracking-[-0.01em] text-site-ink">{step.title}</h3>
          <p className="mt-3 text-[15.5px] leading-[1.65] text-site-text-body">{step.body}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}

/** One closing line on a case study pointing back to the service(s) it shows. */
export function ServiceCrossLink({
  services,
  dark = false,
}: {
  services: ReadonlyArray<'websites' | 'systems'>;
  dark?: boolean;
}) {
  const NAMES = { websites: 'website design', systems: 'business automation' } as const;
  const cls = dark
    ? 'font-semibold text-white underline underline-offset-4 decoration-white/30 outline-none hover:decoration-white focus-visible:decoration-white'
    : 'font-semibold text-site-ink underline underline-offset-4 decoration-site-line outline-none hover:text-site-accent hover:decoration-site-accent focus-visible:text-site-accent';
  return (
    <p className={`mb-14 text-[16px] leading-[1.6] ${dark ? 'text-white/70' : 'text-site-text-body'}`}>
      Want something like this? See my{' '}
      {services.map((s, i) => (
        <span key={s}>
          {i > 0 && ' and '}
          {/* inline padding grows the tap target to 44px without changing line spacing */}
          <Link to={`/${s}`} data-cursor="link" className={`py-3.5 ${cls}`}>
            {NAMES[s]}
          </Link>
        </span>
      ))}{' '}
      {services.length > 1 ? 'services' : 'service'}.
    </p>
  );
}
