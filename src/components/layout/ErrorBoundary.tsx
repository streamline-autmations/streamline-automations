import React from 'react';

interface State {
  hasError: boolean;
}

/**
 * App-wide error boundary. A render-time JS error shows an on-brand fallback with a
 * way back home instead of a blank white screen. Errors are logged (and forwarded to
 * PostHog if available) for monitoring.
 */
export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App error boundary caught:', error, info);
    const w = window as unknown as { posthog?: { capture: (e: string, p?: Record<string, unknown>) => void } };
    if (w.posthog) {
      w.posthog.capture('app_error', { message: error.message, stack: error.stack });
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="flex min-h-[100svh] flex-col items-center justify-center bg-white px-6 text-center font-['DM_Sans']">
        <span className="font-['JetBrains_Mono'] text-[11px] font-medium uppercase tracking-[0.18em] text-[#7B3FE4]">
          Something broke
        </span>
        <h1 className="mt-4 max-w-lg text-[32px] font-semibold leading-tight tracking-[-0.03em] text-[#0A0A0F] sm:text-[40px]">
          That wasn't supposed to happen.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-[1.6] text-[#3D3D47]">
          A glitch on my end stopped this page loading. Reload, or head back home — everything
          else is working.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#7B3FE4] px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-[#6930D0]"
          >
            Reload page
          </button>
          <a
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#E8E8EC] bg-white px-7 py-3.5 text-[14.5px] font-semibold text-[#0A0A0F] transition-colors duration-300 hover:border-[#D4D4DA] hover:text-[#7B3FE4]"
          >
            Back to home
          </a>
        </div>
      </div>
    );
  }
}
