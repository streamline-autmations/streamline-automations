/**
 * SplitReveal — the canonical shared masked heading reveal.
 *
 * Implemented via word-level masking (WordReveal) rather than GSAP SplitText's
 * line-splitting: SplitText measures and rewraps lines, which fights max-width
 * + centered display headings and can overflow them. Word-masking gives the
 * same staggered "lines rise into place" effect, wraps naturally at any size,
 * and never breaks layout — so it's safe to use site-wide.
 *
 * Re-exported under the spec name; `WordReveal` remains the implementation.
 */
export { default, type Segment } from './WordReveal';
