import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/layout/ErrorBoundary';
import './styles/design-system.css';
import './index.css';

// The site owns its own Router, smooth scroll and cursor — see src/site/SiteApp.
const SiteApp = lazy(() => import('./site/SiteApp'));

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

if (posthogKey && posthogHost) {
  // Hold capturing until the visitor accepts cookies (POPIA). CookieConsent opts in.
  let consented = false;
  try {
    consented = localStorage.getItem('sl_consent') === 'granted';
  } catch {
    consented = false;
  }
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: '2025-11-30',
    opt_out_capturing_by_default: !consented,
  });
}

const app = (
  <HelmetProvider>
    <Suspense fallback={<div className="min-h-[100svh] bg-white" />}>
      <SiteApp />
    </Suspense>
  </HelmetProvider>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      {posthogKey && posthogHost ? (
        <PostHogProvider client={posthog}>{app}</PostHogProvider>
      ) : (
        app
      )}
    </ErrorBoundary>
  </StrictMode>
);
