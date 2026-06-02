/**
 * GSAP setup — import from here everywhere, not from 'gsap' directly.
 * Ensures ScrollTrigger + SplitText + useGSAP are registered exactly once.
 * SplitText is free as of GSAP 3.13 and ships with the standard package.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };
