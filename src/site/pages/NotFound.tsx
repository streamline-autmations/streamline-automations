import { Link } from 'react-router-dom';
import { PRIMARY_CTA } from '../data/site';

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center px-6">
      <div className="mx-auto w-full max-w-6xl text-center">
        <p className="mb-6 font-mono text-[12px] uppercase tracking-[0.18em] text-site-text-muted">404</p>
        <h1 className="text-[clamp(44px,9vw,120px)] font-semibold leading-[0.95] tracking-[-0.02em] text-site-ink">
          Nothing <span className="font-serif italic text-site-accent">here</span>.
        </h1>
        <p className="mx-auto mt-8 max-w-md text-[17px] leading-[1.65] text-site-text-body">
          That page moved or never existed. Let's get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link
            to="/"
            className="inline-flex min-h-[52px] items-center rounded-full bg-site-accent px-8 py-4 text-[15px] font-semibold text-white outline-none transition-colors duration-300 ease-brand hover:bg-site-accent-hover focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2"
          >
            Back home
          </Link>
          <Link
            to={PRIMARY_CTA.to}
            className="text-[15px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline"
          >
            {PRIMARY_CTA.label} →
          </Link>
        </div>
      </div>
    </section>
  );
}
