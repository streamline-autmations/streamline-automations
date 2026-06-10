/**
 * /lab — Scroll-driven 3D test (Engine / Core)
 *
 * Learning build, fully isolated:
 * - No SiteHeader / SiteFooter / PageTransition — this route is self-contained.
 * - The R3F canvas is lazy-loaded so three.js never blocks first paint.
 * - On small screens (≤768px) or prefers-reduced-motion, NO WebGL loads at all —
 *   we render a clean static hero instead (same copy, stacked normally).
 */
import { lazy, Suspense, useEffect, useState } from 'react';

// Lazy import = three.js + R3F only download when a capable desktop asks for it.
const LabScene = lazy(() => import('./LabScene'));

/** True when WebGL should NOT load: small screens or reduced-motion users. */
function useBlockWebGL() {
  const [blocked, setBlocked] = useState(
    () =>
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const queries = [
      window.matchMedia('(max-width: 768px)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ];
    const update = () => setBlocked(queries.some((q) => q.matches));
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);

  return blocked;
}

/** Static ink + purple-glow gradient — doubles as the loading placeholder. */
function Glow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(123,63,228,0.30),transparent_70%)]"
    />
  );
}

function BackLink() {
  return (
    <a
      href="/"
      className="fixed left-5 top-5 z-[60] inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.22em] text-site-text-muted transition-colors duration-300 ease-brand hover:text-site-text-on-dark"
    >
      &larr; Back to site
    </a>
  );
}

/** No-WebGL version: the three beats stacked normally on the glow background. */
function StaticLabHero() {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-site-ink">
      <BackLink />
      <Glow />
      <div className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col justify-center gap-20 px-6 py-28 md:gap-28">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-site-accent">
            The Problem
          </p>
          <h2 className="mt-5 font-sans text-4xl font-medium leading-[1.08] tracking-tight text-site-text-on-dark md:text-6xl">
            Enquiries come in. Most of them leak out.
          </h2>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-site-accent">
            The Fix
          </p>
          <h2 className="mt-5 font-sans text-4xl font-medium leading-[1.08] tracking-tight text-site-text-on-dark md:text-6xl">
            Streamline is the{' '}
            <em className="font-serif italic text-site-accent">engine</em> that
            runs your business.
          </h2>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-site-accent">
            The Result
          </p>
          <h2 className="mt-5 font-sans text-4xl font-medium leading-[1.08] tracking-tight text-site-text-on-dark md:text-6xl">
            Bookings out. Revenue up. Nothing dropped.
          </h2>
          <a
            href="/contact"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-site-accent px-8 font-sans text-sm font-medium text-white transition-colors duration-300 ease-brand hover:bg-site-accent-hover"
          >
            Book a Free Call
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LabPage() {
  const blockWebGL = useBlockWebGL();

  if (blockWebGL) return <StaticLabHero />;

  return (
    // The page itself is only one viewport tall — ScrollControls (inside the
    // scene) creates its own internal scroll container that is 3 pages deep.
    <div className="relative h-[100svh] w-full overflow-hidden bg-site-ink">
      <BackLink />
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-site-ink">
            <Glow />
          </div>
        }
      >
        <LabScene />
      </Suspense>
    </div>
  );
}
