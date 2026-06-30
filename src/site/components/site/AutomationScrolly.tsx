import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Tag from '../craft/Tag';
import SplitReveal from '../craft/SplitReveal';
import { ScrollTrigger, useGSAP } from '../../lib/gsap';

const JourneyScene = lazy(() => import('../three/JourneyScene'));

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
 * section pins and a 3D node flow plays behind the text: the camera travels
 * node→node through the pipeline as you scrub the 6 stages, packets flowing
 * along completed edges. The same ScrollTrigger drives BOTH the step state
 * (React) and the scene (progress ref read in useFrame — Lenis-safe, same
 * pattern as HeroVisual). On mobile / reduced-motion it renders as a clean
 * stacked timeline (no pin, no WebGL).
 * Pin uses pinType:'transform' to play nice with Lenis + the overflow-x root.
 */
export default function AutomationScrolly() {
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const scopeRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

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
        end: '+=' + STEPS.length * 400,
        pin: pinRef.current,
        pinType: 'transform',
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const i = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
          setActive((cur) => (cur === i ? cur : i));
        },
      });
      return () => st.kill();
    },
    { scope: scopeRef, dependencies: [enhanced] }
  );

  // Halt the scene's frameloop entirely while the section is off-screen.
  useEffect(() => {
    if (!enhanced) return;
    const el = pinRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [enhanced]);

  if (!enhanced) {
    // Stacked timeline fallback (mobile / reduced-motion).
    return (
      <section data-header-dark="" className="relative rounded-t-[2rem] bg-site-ink px-6 py-24 text-white md:rounded-t-[4rem] md:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <Tag variant="outline-dark" className="mb-8">
            How the automation runs
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'From enquiry to' }, { text: 'done', serif: true }, { text: '— without you touching it.' }]}
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
    <section ref={scopeRef} data-header-dark="" className="relative z-[1] -mt-[2rem] rounded-t-[2rem] bg-site-ink text-white md:-mt-[4rem] md:rounded-t-[4rem]">
      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-24 md:px-10"
      >
        {/* 3D node flow behind the text — opaque ink canvas, rounded to
            match the section's card top while it slides over the white panel */}
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-t-[2rem] md:rounded-t-[4rem]"
        >
          <Suspense fallback={null}>
            <JourneyScene progressRef={progressRef} active={inView} />
          </Suspense>
        </div>
        {/* soft scrims so step copy + index list stay readable over the scene */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-site-ink/85 via-site-ink/35 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[35%] bg-gradient-to-l from-site-ink/75 via-site-ink/30 to-transparent"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
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
