import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

/** Holds the live Lenis instance; null on touch / reduced-motion (native scroll). */
export const LenisContext = createContext<Lenis | null>(null);

/** Access the Lenis instance anywhere inside the provider tree. */
export function useLenis() {
  return useContext(LenisContext);
}
