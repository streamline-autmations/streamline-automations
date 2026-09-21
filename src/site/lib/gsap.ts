/**
 * src/site GSAP entry — re-exports the single, already-configured setup so the
 * app keeps ONE source of truth. ScrollTrigger + CustomEase +
 * useGSAP are registered there once, the 'brand' CustomEase is created, and the
 * pinType:'transform' + Lenis-sync wisdom lives there too. Never import 'gsap'
 * directly in components — import from here.
 */
export { gsap, ScrollTrigger, CustomEase, useGSAP } from '../../lib/gsap-setup';
