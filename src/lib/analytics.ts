import posthog from 'posthog-js';

// Button click tracking
export function trackCtaClick(buttonText: string, location: string) {
  posthog.capture('cta_clicked', {
    button_text: buttonText,
    location: location,
  });
}

// Form submission tracking
export function trackFormSubmitted(formName: string, additionalProps?: Record<string, unknown>) {
  posthog.capture('form_submitted', {
    form_name: formName,
    ...additionalProps,
  });
}

// Scroll depth tracking
const SCROLL_DEPTHS = [25, 50, 75, 100];
const trackedDepths = new Set<number>();

export function trackScrollDepth(page: string) {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    SCROLL_DEPTHS.forEach((depth) => {
      if (scrollPercent >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth);
        posthog.capture('scroll_depth', {
          depth: depth as 25 | 50 | 75 | 100,
          page: page,
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}

// Reset scroll depth tracking (call on route change)
export function resetScrollTracking() {
  trackedDepths.clear();
}

// Outbound link tracking
export function trackOutboundLink(destination: string) {
  posthog.capture('outbound_link_clicked', {
    destination: destination,
  });
}

// Initialize outbound link tracking
export function initOutboundLinkTracking() {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const anchor = target.closest('a');

    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href && !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('javascript')) {
        // Check if it's an external link
        try {
          const url = new URL(href, window.location.origin);
          if (url.origin !== window.location.origin) {
            trackOutboundLink(href);
          }
        } catch {
          // Invalid URL, ignore
        }
      }
    }
  });
}

// Bounce detection
let sessionStartTime = Date.now();
const BOUNCE_THRESHOLD = 10000; // 10 seconds

export function initBounceDetection(page: string) {
  const handleBeforeUnload = () => {
    const sessionDuration = Date.now() - sessionStartTime;
    if (sessionDuration < BOUNCE_THRESHOLD) {
      posthog.capture('bounce', {
        page: page,
        session_duration_ms: sessionDuration,
      });
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}

// Reset session timing (call on route change)
export function resetSessionTiming() {
  sessionStartTime = Date.now();
}

// Initialize all tracking
export function initAnalytics(page: string) {
  initOutboundLinkTracking();
  initBounceDetection(page);
}
