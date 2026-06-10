import { useEffect, useRef, useState } from 'react';
import Tag from '../craft/Tag';
import SplitReveal from '../craft/SplitReveal';
import { ScrollTrigger, useGSAP } from '../../lib/gsap';

const STEPS = [
  { no: '01', title: 'Enquiry on WhatsApp', body: 'A customer messages your business number — day or night, no one waiting.' },
  { no: '02', title: 'Auto-reply + capture', body: 'They get an instant, on-brand reply. Their details are saved automatically.' },
  { no: '03', title: 'Into the CRM', body: 'The lead lands in your dashboard — tagged, sorted, impossible to lose.' },
  { no: '04', title: 'Quote or booking', body: 'A quote or a booking slot goes out automatically, in seconds.' },
  { no: '05', title: 'Invoice sent', body: 'They accept, and the invoice fires off on its own. PayFast handles the rest.' },
  { no: '06', title: 'Done', body: 'You did nothing. The system ran the whole thing while you slept.' },
];

/**
 * AutomationScrolly — the pinned showpiece. On desktop (motion allowed) the
 * section pins and scrubs through the 6 automation stages as you scroll. On
 * mobile / reduced-motion it renders as a clean stacked timeline (no pin).
 * Pin uses pinType:'transform' to play nice with Lenis + the overflow-x root.
 */
export default function AutomationScrolly() {
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const scopeRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnhanced(desktop && !reduce);
  }, []);

  useGSAP(
    () => {
      if (!enhanced || !pinRef.current) return;
      const st = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: '+=' + STEPS.length * 320,
        pin: pinRef.current,
        pinType: 'transform',
        onUpdate: (self) => {
          const i = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
          setActive((cur) => (cur === i ? cur : i));
        },
      });
      return () => st.kill();
    },
    { scope: scopeRef, dependencies: [enhanced] }
  );

  if (!enhanced) {
    // Stacked timeline fallback (mobile / reduced-motion).
    return (
      <section className="relative rounded-t-[2rem] bg-site-ink px-6 py-24 text-white md:rounded-t-[4rem] md:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <Tag variant="outline-dark" className="mb-8">
            How the automation runs
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'From enquiry to' }, { text: 'done', serif: true }, { text: 'while you sleep.' }]}
            className="text-[clamp(30px,8vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white"
          />
          <ol className="mt-12 flex flex-col gap-9 border-l border-white/15 pl-8">
            {STEPS.map((s) => (
              <li key={s.no} className="relative">
                <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full bg-site-accent font-mono text-[9px] font-semibold text-white">
                  {s.no.replace('0', '')}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">{s.no}</span>
                <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.01em] text-white">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-white/70">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={scopeRef} className="relative rounded-t-[2rem] bg-site-ink text-white md:rounded-t-[4rem]">
      <div ref={pinRef} className="flex min-h-[100svh] items-center overflow-hidden px-6 py-24 md:px-10">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT — active stage, big */}
          <div>
            <Tag variant="outline-dark" className="mb-8">
              How the automation runs
            </Tag>
            <div className="relative min-h-[300px]">
              {STEPS.map((s, i) => (
                <div
                  key={s.no}
                  aria-hidden={i !== active}
                  // React 18 passes `inert` through as a raw attribute — boolean
                  // false leaks into the DOM as "false" (truthy). String/undefined is correct.
                  {...(i !== active ? { inert: '' } : {})}
                  className={`absolute inset-0 transition-opacity duration-500 ease-brand ${
                    i === active ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <span className="block text-[clamp(64px,9vw,120px)] font-semibold leading-none tracking-[-0.04em] text-site-accent">
                    {s.no}
                  </span>
                  <h3 className="mt-6 text-[clamp(28px,3.5vw,44px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[17px] leading-[1.6] text-white/70">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — stage list + progress rail */}
          <ol className="flex flex-col">
            {STEPS.map((s, i) => (
              <li
                key={s.no}
                className={`flex items-center gap-5 border-l-2 py-4 pl-6 transition-colors duration-300 ease-brand ${
                  i === active ? 'border-site-accent' : 'border-white/10'
                }`}
              >
                <span
                  className={`font-mono text-[13px] transition-colors duration-300 ${
                    i <= active ? 'text-site-accent' : 'text-white/30'
                  }`}
                >
                  {s.no}
                </span>
                <span
                  className={`text-[17px] font-medium transition-colors duration-300 ${
                    i === active ? 'text-white' : 'text-white/35'
                  }`}
                >
                  {s.title}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
