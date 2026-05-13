import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../../lib/gsap-setup';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';

const LOGO_URL =
  'https://res.cloudinary.com/dnlgohkcc/image/upload/v1777354607/Untitled_design_80_bcjybe.png';
const SESSION_KEY = 'streamline_intro_seen';

export default function IntroAnimation() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on home route, and only on first visit per session
    const isHome = window.location.pathname === '/';
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (!isHome || seen || reduced) return;

    setVisible(true);
    // Lock scroll during intro
    document.body.classList.add('intro-active');
  }, [reduced]);

  useEffect(() => {
    if (!visible) return;
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const line = lineRef.current;
    if (!overlay || !logo || !line) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, 'true');
        document.body.classList.remove('intro-active');
        setVisible(false);
      },
    });

    tl
      // Wordmark fades in at 1.5x scale
      .fromTo(logo,
        { opacity: 0, scale: 1.5 },
        { opacity: 1, scale: 1.5, duration: 0.45, ease: 'power2.out' }
      )
      // Scale down to normal size
      .to(logo,
        { scale: 1, duration: 0.65, ease: 'power3.out' },
        '+=0.1'
      )
      // Purple line draws left-to-right
      .fromTo(line,
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, duration: 0.45, ease: 'power2.inOut' },
        '-=0.1'
      )
      // Everything fades out
      .to([logo, line],
        { opacity: 0, duration: 0.35, ease: 'power2.in' },
        '+=0.15'
      )
      .to(overlay,
        { opacity: 0, duration: 0.4, ease: 'power2.in' },
        '-=0.15'
      );

    return () => {
      tl.kill();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] bg-white flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      {/* Wordmark */}
      <div
        ref={logoRef}
        className="flex items-center gap-3 will-change-transform"
        style={{ opacity: 0 }}
      >
        <img src={LOGO_URL} alt="" className="h-10 w-auto" />
        <span className="text-[24px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em]">
          Streamline<span className="text-[#9E9EA8]">.</span>
        </span>
      </div>

      {/* Purple line — draws across full viewport */}
      <div
        ref={lineRef}
        className="absolute left-0 right-0 h-[1px] bg-[#7B3FE4] origin-left"
        style={{ opacity: 0, top: '50%', transform: 'translateY(32px) scaleX(0)' }}
      />
    </div>
  );
}
