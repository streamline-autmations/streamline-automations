import { useRef } from 'react';
import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../../../../lib/gsap-setup';
import MagneticCTA from '../../ui/MagneticCTA';
import usePrefersReducedMotion from '../../../../hooks/usePrefersReducedMotion';
import useScrollToHash from './useScrollToHash';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const LINE_1 = ['Websites', 'that', 'work.'];
const LINE_2 = ['Systems', 'that', 'scale.'];

// Real client site behind the portal — the live BLOM build, no mockup.
const PORTAL_IMAGE =
  'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};
const word: Variants = {
  hidden: { y: '118%' },
  visible: { y: 0, transition: { duration: 0.9, ease: EASE } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** A single masked word that rises into view on load (Framer, inner span). */
function Word({ children, serif = false }: { children: string; serif?: boolean }) {
  return (
    <span className="inline-block overflow-hidden align-top px-[0.06em] pb-[0.02em]">
      <motion.span
        variants={word}
        className={`inline-block pb-[0.14em] ${
          serif ? "font-['Instrument_Serif'] italic font-normal" : ''
        }`}
      >
        {serif ? <span className="text-gradient-brand">{children}</span> : children}
      </motion.span>
    </span>
  );
}

/**
 * HeroPortal — the signature scroll-zoom "portal" reveal.
 *
 * Load:  the headline rises word-by-word (Framer, on the inner word spans).
 * Scroll (desktop, no-reduced-motion only): the section pins for ~300vh and a
 *   scrubbed GSAP timeline drives a `--progress` CSS var while the two headline
 *   lines split apart (left −X / right +X) with blur + opacity falloff, the
 *   secondary copy fades up, and a real client site scales up through the gap —
 *   a Fey-style "image out of the screen" reveal into the work below.
 *
 * GSAP only ever touches the OUTER wrappers; Framer only the inner content —
 * so the two libraries never animate the same element. Mobile / reduced-motion
 * skip the pin entirely and get the clean, static text hero.
 */
export default function HeroPortal() {
  const reduced = usePrefersReducedMotion();
  const scrollTo = useScrollToHash();

  const pinRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  // Cursor-tracked ambient glow (desktop only; springs settle smoothly).
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);
  const sx = useSpring(gx, { stiffness: 40, damping: 20, mass: 0.6 });
  const sy = useSpring(gy, { stiffness: 40, damping: 20, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const r = pinRef.current?.getBoundingClientRect();
    if (!r) return;
    gx.set(e.clientX - r.left - r.width / 2);
    gy.set(e.clientY - r.top - r.height / 2);
  };

  // The portal pin + scrub. Desktop + no-reduced-motion only.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          const section = pinRef.current;
          if (!section) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: '+=2400',
              pin: true,
              // The homepage root has overflow-x:hidden (→ overflow-y:auto),
              // which breaks the default `fixed` pin. Transform-pinning holds
              // the section with its own transform and is robust here + Lenis.
              pinType: 'transform',
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) =>
                section.style.setProperty('--progress', self.progress.toFixed(4)),
            },
          });

          // Secondary copy + eyebrow + cue clear out first.
          tl.to(eyebrowRef.current, { autoAlpha: 0, duration: 0.18 }, 0)
            .to(secondaryRef.current, { autoAlpha: 0, yPercent: -45, duration: 0.28 }, 0)
            .to(cueRef.current, { autoAlpha: 0, duration: 0.14 }, 0)
            // Headline splits open — left line drifts left, right line right,
            // both blur + fade as the gap widens.
            .to(
              line1Ref.current,
              { xPercent: -62, autoAlpha: 0, filter: 'blur(6px)', ease: 'power2.in', duration: 0.85 },
              0.04
            )
            .to(
              line2Ref.current,
              { xPercent: 62, autoAlpha: 0, filter: 'blur(6px)', ease: 'power2.in', duration: 0.85 },
              0.04
            )
            // The real client site scales up through the gap and sharpens.
            .fromTo(
              visualRef.current,
              { autoAlpha: 0, scale: 0.6, filter: 'blur(10px)' },
              { autoAlpha: 1, scale: 1.12, filter: 'blur(0px)', ease: 'power1.out', duration: 0.95 },
              0.08
            );
        }
      );

      return () => mm.revert();
    },
    { scope: pinRef }
  );

  const animateProps = reduced
    ? { initial: 'visible' as const }
    : { initial: 'hidden' as const, animate: 'visible' as const };

  return (
    <section
      ref={pinRef}
      onMouseMove={onMove}
      data-screen-label="Hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden [--progress:0]"
    >
      {/* ── Atmosphere (E): drifting gradient mesh + grain + glow orbs ── */}
      <div aria-hidden="true" className="gradient-mesh" />
      <div aria-hidden="true" className="grain-layer" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute -left-[6%] top-[8%] h-[560px] w-[560px] rounded-full blur-[70px]"
          style={{ background: 'radial-gradient(circle, rgba(123,63,228,0.18), transparent 65%)' }}
          animate={reduced ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-[8%] bottom-[6%] h-[620px] w-[620px] rounded-full blur-[80px]"
          style={{ background: 'radial-gradient(circle, rgba(155,95,245,0.16), transparent 65%)' }}
          animate={reduced ? undefined : { x: [0, -36, 0], y: [0, -28, 0] }}
          transition={{ duration: 22, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>

      {/* cursor-tracked glow */}
      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-full w-full"
          style={{ background: 'radial-gradient(circle, rgba(123,63,228,0.10) 0%, transparent 60%)' }}
        />
      </motion.div>

      {/* ── Portal visual (A): real client site, scales up through the gap ── */}
      <div
        ref={visualRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] grid place-items-center px-6"
        style={{ opacity: 0, willChange: 'transform, opacity' }}
      >
        {/* purple portal glow that intensifies with --progress */}
        <div
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(123,63,228,0.28), transparent 62%)',
            opacity: 'var(--progress, 0)',
          }}
        />
        <div className="relative w-[92%] max-w-4xl overflow-hidden rounded-[14px] shadow-[0_40px_100px_-24px_rgba(76,29,149,0.45),0_12px_36px_-12px_rgba(0,0,0,0.22)] ring-1 ring-black/5">
          <div className="flex items-center gap-2 border-b border-white/5 bg-[#13101F] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1">
              <span className="h-1 w-1 rounded-full bg-[#28C840]" />
              <span className="font-['DM_Sans'] text-[10px] tracking-wide text-white/55">
                blomcosmetics.co.za
              </span>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-[#0D051F]">
            <img
              src={PORTAL_IMAGE}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className="absolute inset-x-0 top-0 w-full select-none"
            />
          </div>
        </div>
      </div>

      {/* ── Hero copy ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1000px] px-8">
        <motion.div {...animateProps} variants={container}>
          <div ref={eyebrowRef}>
            <motion.div
              variants={fade}
              className="mb-9 font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-[0.22em] text-[#9E9EA8]"
            >
              Web Design &amp; Automation · Vaal Triangle, SA
            </motion.div>
          </div>

          <h1
            aria-label="Websites that work. Systems that scale."
            className="font-['DM_Sans'] font-bold leading-[1.0] tracking-[-0.03em] text-[#0A0A0F]"
            style={{ fontSize: 'clamp(38px, 5.4vw, 84px)' }}
          >
            <span ref={line1Ref} className="block will-change-transform">
              {LINE_1.map((w) => (
                <Word key={w}>{w}</Word>
              ))}
            </span>
            <span ref={line2Ref} className="-mt-[0.04em] block will-change-transform">
              {LINE_2.map((w, i) => (
                <Word key={w} serif={i === LINE_2.length - 1}>
                  {w}
                </Word>
              ))}
            </span>
          </h1>

          <div ref={secondaryRef}>
            <motion.p
              variants={fade}
              className="mt-11 max-w-[480px] font-['DM_Sans'] leading-[1.5] text-[#6B6B7A]"
              style={{ fontSize: 'clamp(17px, 1.7vw, 21px)' }}
            >
              I build the websites and automation systems South African businesses
              use to stop doing everything manually.
            </motion.p>

            <motion.div variants={fade} className="mt-12 flex flex-wrap items-center gap-8">
              <MagneticCTA strength={16}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#7B3FE4] px-9 py-[18px] font-['DM_Sans'] text-[16px] font-semibold text-white transition-[background-color,box-shadow] duration-300 hover:bg-[#6930D0] hover:shadow-[0_14px_40px_rgba(123,63,228,0.32)]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
                >
                  Book a Free Call
                </Link>
              </MagneticCTA>

              <a
                href="#work"
                onClick={(e) => scrollTo(e, '#work')}
                className="group inline-flex items-center gap-2.5 font-['DM_Sans'] text-[16px] font-semibold text-[#0A0A0F]"
              >
                See the work
                <span className="text-[#7B3FE4] transition-transform duration-[400ms] group-hover:translate-x-1.5">
                  →
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div
        ref={cueRef}
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.24em] text-[#9E9EA8]">
          Scroll
        </span>
        <span className="relative h-[54px] w-px overflow-hidden bg-[#E8E8EC]">
          <span className="absolute left-0 top-0 h-[40%] w-full bg-[#7B3FE4] [animation:cueSlide_2.2s_cubic-bezier(0.22,1,0.36,1)_infinite] motion-reduce:hidden" />
        </span>
      </div>
    </section>
  );
}
