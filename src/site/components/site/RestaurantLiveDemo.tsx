import { useEffect, useRef, useState } from 'react';
import Panel from '../craft/Panel';
import SplitReveal from '../craft/SplitReveal';
import { RD_DEMO } from '../../data/restaurant-direct';

type View = 'customer' | 'staff';

const VIEWS: { id: View; label: string; hint: string; path: string }[] = [
  {
    id: 'customer',
    label: 'Customer site',
    hint: 'Order a couple of burgers and pick a collection time.',
    path: RD_DEMO.customerPath,
  },
  {
    id: 'staff',
    label: 'Staff console',
    hint: 'The order you just placed is sitting in the kitchen queue.',
    path: RD_DEMO.staffPath,
  },
];

/**
 * RestaurantLiveDemo — the real Restaurant Direct build, embedded and usable.
 *
 * Both views stay mounted once opened (the staff console loads on first use)
 * because they share a browser origin and therefore share the demo's records:
 * an order placed in the customer frame shows up in the staff frame's queue
 * moments later. Remounting on every tab switch would throw that away, and
 * that hand-off IS the sales moment.
 *
 * The frames are inert until the visitor clicks "Click to use it": an active
 * iframe swallows wheel events, so someone merely scrolling past the section
 * would get stuck inside the demo. Escape (or the Done button) hands scrolling
 * back. The demo build carries its own navy "DEMO" strip and fictional data,
 * so nothing here needs to pretend to be real.
 */
export default function RestaurantLiveDemo() {
  const [view, setView] = useState<View>('customer');
  const [live, setLive] = useState(false);
  // Staff console is only fetched once the visitor asks for it.
  const [loaded, setLoaded] = useState<Record<View, boolean>>({ customer: true, staff: false });
  const frameWrapRef = useRef<HTMLDivElement>(null);

  const open = (next: View) => {
    setView(next);
    setLoaded((l) => (l[next] ? l : { ...l, [next]: true }));
  };

  // Escape releases the demo so the page scrolls normally again.
  useEffect(() => {
    if (!live) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLive(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [live]);

  // A click anywhere outside the frame also releases it.
  useEffect(() => {
    if (!live) return;
    const onDown = (e: PointerEvent) => {
      if (!frameWrapRef.current?.contains(e.target as Node)) setLive(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [live]);

  const current = VIEWS.find((v) => v.id === view)!;

  return (
    <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'Stop reading.' }, { text: 'Go and use it.', serif: true }]}
            className="text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.03em] text-site-ink"
          />
          <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.65] text-site-text-body md:text-[18px]">
            This is the real system, running live below. Place an order on the customer site,
            then switch to the staff console and watch it land in the kitchen queue. It&rsquo;s
            Jimmy&rsquo;s Burger Bar with invented guests and orders — nothing you do reaches
            anyone, and you can&rsquo;t break it.
          </p>
        </div>

        {/* View switch */}
        <div className="mt-10 flex flex-wrap items-center gap-3" role="tablist" aria-label="Demo view">
          {VIEWS.map((v) => {
            const selected = v.id === view;
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                id={`rd-tab-${v.id}`}
                aria-selected={selected}
                aria-controls="rd-demo-panel"
                data-cursor="link"
                onClick={() => open(v.id)}
                className={`inline-flex min-h-[48px] items-center rounded-full border px-6 text-[15px] font-semibold outline-none transition-colors duration-300 ease-brand focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 md:text-[16px] ${
                  selected
                    ? 'border-site-ink bg-site-ink text-white'
                    : 'border-site-line-mid bg-white text-site-ink hover:border-site-ink'
                }`}
              >
                {v.label}
              </button>
            );
          })}
          <a
            href={RD_DEMO.origin + current.path}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="inline-flex min-h-[48px] items-center text-[15px] font-medium text-site-text-secondary underline-offset-4 outline-none transition-colors duration-300 hover:text-site-accent hover:underline focus-visible:ring-2 focus-visible:ring-site-accent"
          >
            Open in a new tab ↗
          </a>
        </div>

        <p className="mt-4 text-[15px] leading-[1.6] text-site-text-secondary">{current.hint}</p>

        {/* The frame */}
        <div
          ref={frameWrapRef}
          id="rd-demo-panel"
          role="tabpanel"
          aria-labelledby={`rd-tab-${view}`}
          className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-site-line bg-site-surface shadow-[0_30px_80px_-24px_rgba(10,10,15,0.22)] md:rounded-[2rem]"
        >
          {/* Frame bar — says what you're looking at, and hands scrolling back */}
          <div className="flex items-center justify-between gap-4 border-b border-site-line bg-white px-5 py-3 md:px-6">
            <span className="truncate text-[13px] font-medium text-site-text-secondary md:text-[14px]">
              {RD_DEMO.label}
              {current.path}
            </span>
            {live && (
              <button
                type="button"
                onClick={() => setLive(false)}
                data-cursor="link"
                className="shrink-0 rounded-full border border-site-line-mid px-4 py-1.5 text-[13px] font-semibold text-site-ink outline-none transition-colors duration-200 hover:border-site-ink focus-visible:ring-2 focus-visible:ring-site-accent"
              >
                Done
              </button>
            )}
          </div>

          <div className="relative h-[560px] bg-white md:h-[74vh] md:max-h-[820px] md:min-h-[600px]">
            {VIEWS.map((v) =>
              loaded[v.id] ? (
                <iframe
                  key={v.id}
                  src={RD_DEMO.origin + v.path}
                  title={`Restaurant Direct demo — ${v.label}`}
                  loading="lazy"
                  hidden={v.id !== view}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  referrerPolicy="no-referrer"
                  className={`h-full w-full border-0 ${live ? '' : 'pointer-events-none'}`}
                />
              ) : null,
            )}

            {/* Inert until asked — an active iframe eats the page's scroll. */}
            {!live && (
              <button
                type="button"
                onClick={() => setLive(true)}
                data-cursor="link"
                aria-label={`Use the ${current.label} demo`}
                className="absolute inset-0 grid place-items-center bg-site-ink/[0.04] outline-none backdrop-blur-[1px] transition-colors duration-300 ease-brand hover:bg-site-ink/[0.08] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-site-accent"
              >
                <span className="rounded-full bg-site-ink px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(10,10,15,0.45)] md:text-[16px]">
                  Click to use it
                </span>
              </button>
            )}
          </div>
        </div>

        <p className="mt-5 text-[14px] leading-[1.6] text-site-text-muted">
          Live demo build — fictional guests, orders and bookings. Press Escape to carry on
          scrolling. Jimmy&rsquo;s Burger Bar shown with demo data; branding by Ameli Designs.
        </p>
      </div>
    </Panel>
  );
}
