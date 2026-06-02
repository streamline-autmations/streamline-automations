import { useEffect, useRef, useState } from 'react';

/**
 * SiteLoader — a real, asset-aware loading screen (not a fake timer).
 *
 * Tracks genuine progress of the critical above-the-fold assets: web fonts
 * (document.fonts.ready) + the hero browser mockup + the first batch of
 * Cloudinary work images. A live percentage counts up tied to the real loaded
 * count, with a thin progress bar. The site is revealed only once those assets
 * resolve — with a hard ~6s timeout so it can never hang — and because the hero
 * image is decoded before the curtain lifts, there's no pop-in afterwards.
 *
 * Runs once per session (sessionStorage). Respects prefers-reduced-motion:
 * skips the eased count animation and resolves immediately.
 */

const LOGO_URL =
  'https://res.cloudinary.com/dtkiwrm6u/image/upload/v1780412723/Streamline-black-word-logo_rpzvgh.png';

// Above-the-fold critical images — decoded before the curtain lifts so the
// homepage hero + first work cards never pop in after reveal.
const CRITICAL_IMAGES = [
  LOGO_URL,
  'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png',
  'https://res.cloudinary.com/dtkiwrm6u/image/upload/v1779986676/1_k68mu6.png',
  'https://res.cloudinary.com/dtkiwrm6u/image/upload/v1779986676/2_n9aw8a.png',
];

const SESSION_KEY = 'streamline_loaded';
const MAX_DURATION = 6000; // hard fallback — never hang
const MIN_DURATION = 650; // avoid a one-frame flash on warm caches

export default function SiteLoader() {
  // Decide synchronously so the curtain paints on the very first frame
  // (no flash of the site behind it) — but never on reduced-motion / repeat.
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    const seen = sessionStorage.getItem(SESSION_KEY);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !seen && !reduce;
  });
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;

    document.body.style.overflow = 'hidden';
    const start = performance.now();

    // total work units = each critical image + the fonts step
    const total = CRITICAL_IMAGES.length + 1;
    let done = 0;
    let target = 0;
    let displayed = 0;
    let finished = false;
    let raf = 0;

    const bump = () => {
      done += 1;
      target = done / total;
    };

    // Preload + decode every critical image (failures still count — never hang)
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = bump;
      img.onerror = bump;
      img.src = src;
    });

    // Fonts are one unit
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(bump).catch(bump);
    } else {
      bump();
    }

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      setPct(100);
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      window.setTimeout(() => {
        setLeaving(true);
        // unlock after the curtain has animated up
        window.setTimeout(() => {
          document.body.style.overflow = '';
          sessionStorage.setItem(SESSION_KEY, 'true');
          setShow(false);
        }, 620);
      }, wait);
    };

    // Ease the displayed value toward the real loaded fraction
    const tick = () => {
      displayed += (target - displayed) * 0.12;
      const shown = Math.min(99, Math.round(displayed * 100));
      setPct(shown);
      if (target >= 1 && displayed > 0.985) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const hardStop = window.setTimeout(finish, MAX_DURATION);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hardStop);
      document.body.style.overflow = '';
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white"
      style={{
        transform: leaving ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.62s cubic-bezier(0.76,0,0.24,1)',
        willChange: 'transform',
      }}
    >
      {/* faint brand bloom behind the mark */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
        style={{ background: 'radial-gradient(circle, rgba(123,63,228,0.12), transparent 68%)' }}
      />

      <div
        className="relative flex flex-col items-center"
        style={{
          opacity: leaving ? 0 : 1,
          transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <img
          src={LOGO_URL}
          alt="Streamline Automations"
          className="h-9 w-auto md:h-10"
          style={{ animation: 'fadeIn 0.6s cubic-bezier(0.22,1,0.36,1) both' }}
        />

        {/* progress track */}
        <div className="relative mt-10 h-px w-[200px] overflow-hidden bg-[#E8E8EC] md:w-[260px]">
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 bg-[#7B3FE4]"
            style={{
              width: `${pct}%`,
              transition: 'width 0.2s linear',
            }}
          />
        </div>

        <div className="mt-5 flex w-[200px] items-center justify-between md:w-[260px]">
          <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#9E9EA8]">
            Loading
          </span>
          <span className="font-['JetBrains_Mono'] text-[11px] tabular-nums tracking-[0.1em] text-[#0A0A0F]">
            {pct}%
          </span>
        </div>
      </div>
    </div>
  );
}
