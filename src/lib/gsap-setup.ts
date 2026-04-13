/**
 * GSAP setup — import from here everywhere, not from 'gsap' directly.
 * Ensures ScrollTrigger + useGSAP are registered exactly once.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
