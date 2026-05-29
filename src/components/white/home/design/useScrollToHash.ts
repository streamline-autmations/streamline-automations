import { useLenis } from '../../../providers/LenisProvider';

/**
 * Returns a click handler that smooth-scrolls to an in-page anchor.
 * Uses the shared Lenis instance when present, otherwise native smooth scroll.
 */
export default function useScrollToHash() {
  const lenis = useLenis();

  return (e: React.MouseEvent, hash: string) => {
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };
}
