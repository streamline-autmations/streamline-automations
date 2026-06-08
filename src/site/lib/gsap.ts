/**
 * src/site GSAP entry — re-exports the single, already-configured setup so the
 * v2 app keeps ONE source of truth. ScrollTrigger + SplitText + CustomEase +
 * useGSAP are registered there once, the 'brand' CustomEase is created, and the
 * pinType:'transform' + Lenis-sync wisdom lives there too. Never import 'gsap'
 * directly in v2 components — import from here.
 */
export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP } from '../../lib/gsap-setup';
