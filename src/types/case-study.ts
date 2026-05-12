/**
 * Shared types for the scroll-driven case-study + automation moments.
 */

export interface CaseStudySlide {
  /** Uppercase eyebrow tag, e.g. "01 — E-commerce + Automation" */
  tag: string;
  /** Slide headline. Wrap a single italic word in <em>…</em> if you want serif emphasis. */
  headline: string;
  /** Body paragraph below the headline. */
  body: string;
  /** Small pill tags shown under the body. */
  chips: string[];
  /** Link to the case study (or anchor on /portfolio). */
  link: { href: string; label: string };
  /** Full mockup image (browser frame already baked in). */
  imageSrc: string;
  imageAlt: string;
}

export interface AutomationStage {
  /** Step indicator, e.g. "Step 01 / 06". */
  indicator: string;
  title: string;
  caption: string;
  /** Screen UI image — composed *inside* the static phone frame at render time. */
  screenSrc: string;
  screenAlt: string;
}

export interface StatItem {
  /** Number to count up to. */
  value: number;
  /** Optional suffix appended to the number, e.g. "s", "/7", "+". */
  suffix?: string;
  /** Short label below the number. */
  label: string;
  /** Source attribution, e.g. "on RecklessBear". */
  source: string;
}
