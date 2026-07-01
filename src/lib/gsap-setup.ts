/**
 * GSAP setup — import from here everywhere, not from 'gsap' directly.
 * Ensures ScrollTrigger + SplitText + CustomEase + useGSAP are registered once.
 * SplitText & CustomEase are free as of GSAP 3.13 and ship with the package.
 *
 * Smooth scroll: Lenis (see LenisProvider) — NOT GSAP ScrollSmoother. Both do
 * smooth-scroll and both can drive ScrollTrigger; running both double-inits and
 * conflicts. Lenis is wired and synced to ScrollTrigger (lenis.on('scroll',
 * ScrollTrigger.update) + lenis.raf on gsap.ticker), so ScrollSmoother is
 * intentionally never registered. Pinning uses pinType:'transform' to play
 * nicely with Lenis + the overflow-x-hidden homepage root.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);

// Mobile browsers resize the viewport (and fire `resize`) when the address
// bar shows/hides on scroll. Without this, every pinned ScrollTrigger
// recalculates mid-scroll and the pinned section visibly jumps/shakes.
ScrollTrigger.config({ ignoreMobileResize: true });

// Brand easing — the exact cubic-bezier(0.22, 1, 0.36, 1) used across the site,
// registered once so any GSAP tween can reference it by name: `ease: 'brand'`.
// (Control points map directly to the SVG path below.)
CustomEase.create('brand', 'M0,0 C0.22,1 0.36,1 1,1');

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP };
