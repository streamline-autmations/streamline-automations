/**
 * GSAP setup — import from here everywhere, not from 'gsap' directly.
 * Ensures ScrollTrigger + SplitText + CustomEase + useGSAP are registered once.
 * SplitText & CustomEase are free as of GSAP 3.13 and ship with the package.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);

// Brand easing — the exact cubic-bezier(0.22, 1, 0.36, 1) used across the site,
// registered once so any GSAP tween can reference it by name: `ease: 'brand'`.
// (Control points map directly to the SVG path below.)
CustomEase.create('brand', 'M0,0 C0.22,1 0.36,1 1,1');

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP };
