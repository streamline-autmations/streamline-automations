import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import posthog from 'posthog-js';

const STORAGE_KEY = 'sl_consent';

type Gtag = (...args: unknown[]) => void;
interface ConsentWindow extends Window {
  gtag?: Gtag;
  __initApollo?: () => void;
}

/**
 * POPIA cookie-consent banner. Analytics (GA, PostHog, Apollo) default to OFF
 * (see index.html Consent Mode + main.tsx). Accepting grants consent and starts
 * them; declining keeps them off. Choice is remembered in localStorage.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* storage blocked — don't nag */
    }
  }, []);

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied');
    } catch {
      /* ignore */
    }
    const w = window as ConsentWindow;
    if (granted) {
      w.gtag?.('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
      w.__initApollo?.();
      try {
        posthog.opt_in_capturing();
      } catch {
        /* ignore */
      }
    } else {
      try {
        posthog.opt_out_capturing();
      } catch {
        /* ignore */
      }
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[1000] mx-auto max-w-2xl rounded-2xl border border-[#E8E8EC] bg-white/95 p-5 shadow-[0_12px_40px_rgba(10,10,15,0.12)] backdrop-blur-md sm:inset-x-auto sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-['DM_Sans'] text-[14px] leading-[1.6] text-[#3D3D47]">
          I use cookies for analytics to understand how the site is used. You can accept or
          decline — declining keeps only what's essential.{' '}
          <Link to="/privacy" className="font-medium text-[#7B3FE4] underline-offset-2 hover:underline">
            Privacy policy
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 gap-3">
          <button
            onClick={() => decide(false)}
            className="min-h-[44px] rounded-full border border-[#E8E8EC] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#0A0A0F] transition-colors duration-200 hover:border-[#D4D4DA]"
          >
            Decline
          </button>
          <button
            onClick={() => decide(true)}
            className="min-h-[44px] rounded-full bg-[#7B3FE4] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#6930D0]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
