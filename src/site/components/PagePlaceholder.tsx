import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { EASE_ARR } from '../lib/motion';
import { PRIMARY_CTA } from '../data/site';

/**
 * Phase-1 scaffold placeholder — an on-brand routed page so navigation, smooth
 * scroll and chrome can be verified before the real sections land. Replaced
 * page-by-page in Phases 3–5.
 */
export default function PagePlaceholder({
  eyebrow,
  title,
  blurb,
  phase,
  cta = true,
}: {
  eyebrow: string;
  title: ReactNode;
  blurb: string;
  phase: string;
  cta?: boolean;
}) {
  return (
    <>
      <section className="flex min-h-[100svh] items-center px-6 pt-32 pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR }}
            className="mb-6 font-mono text-[12px] uppercase tracking-[0.18em] text-site-text-muted"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_ARR, delay: 0.06 }}
            className="max-w-4xl text-[clamp(44px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.14 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
          >
            {blurb}
          </motion.p>

          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <Link
                to={PRIMARY_CTA.to}
                data-cursor="view"
                className="inline-flex min-h-[52px] items-center rounded-full bg-site-accent px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(123,63,228,0.3)] transition-colors duration-300 ease-brand hover:bg-site-accent-hover"
              >
                {PRIMARY_CTA.label}
              </Link>
              <Link
                to="/portfolio"
                data-cursor="link"
                className="text-[15px] font-medium text-site-ink underline-offset-4 hover:underline"
              >
                See the work →
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Second band — gives the page real height so smooth scroll is verifiable */}
      <section className="border-t border-site-line bg-site-offwhite px-6 py-28">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3">
          <span className="inline-block h-2 w-2 rounded-full bg-site-accent" />
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-site-text-secondary">
            {phase} — real content lands here
          </p>
        </div>
      </section>
    </>
  );
}
