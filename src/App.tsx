import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/layout/ScrollToTop';
import BackToTop from './components/ui/BackToTop';
import PageTransition from './components/layout/PageTransition';
import LenisProvider from './components/providers/LenisProvider';
import DotRingCursor from './components/white/ui/DotRingCursor';
import SiteLoader from './components/white/ui/SiteLoader';
import CookieConsent from './components/layout/CookieConsent';
import ComingSoon from './pages/ComingSoon';
import { trackScrollDepth, resetScrollTracking, initOutboundLinkTracking, initBounceDetection, resetSessionTiming } from './lib/analytics';

// ⚠️ v2-preview BRANCH ONLY — forces the new white-minimal site ON so this
// branch gets its own Vercel preview URL for side-by-side comparison with the
// live (old) site on main. DO NOT MERGE THIS BRANCH TO MAIN.
const COMING_SOON = false;
const SITE_V2 = true;
const SiteApp = lazy(() => import('./site/SiteApp'));

// Lazy load pages for performance
const Home = lazy(() => import('./pages/HomeWhite'));
const WebsitesPage = lazy(() => import('./pages/WebsitesWhite'));
const SystemsPage = lazy(() => import('./pages/Systems'));
const HostingPage = lazy(() => import('./pages/HostingWhite'));
const Portfolio = lazy(() => import('./pages/PortfolioWhite'));
const Contact = lazy(() => import('./pages/ContactWhite'));
const About = lazy(() => import('./pages/AboutWhite'));
const Results = lazy(() => import('./pages/Results'));
const AddOnsPage = lazy(() => import('./pages/AddOnsPage'));
const Packages = lazy(() => import('./pages/Packages'));
const Services = lazy(() => import('./pages/Services'));
const BlomCosmetics = lazy(() => import('./pages/portfolio/BlomCosmetics'));
const RecklessBear = lazy(() => import('./pages/portfolio/RecklessBear'));
const CWElectronics = lazy(() => import('./pages/portfolio/CWElectronics'));
const Ameli = lazy(() => import('./pages/portfolio/Ameli'));
const HomeVariant1 = lazy(() => import('./pages/HomeVariant1'));
const HomeVariant2 = lazy(() => import('./pages/HomeVariant2'));
const HomeVariant3 = lazy(() => import('./pages/HomeVariant3'));
const HomeVariant4 = lazy(() => import('./pages/HomeVariant4'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Privacy = lazy(() => import('./pages/Privacy'));
// Isolated 3D scroll lab — self-contained test route, no header/footer
const Lab = lazy(() => import('./pages/lab/LabPage'));

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    resetScrollTracking();
    resetSessionTiming();
    if (currentPath === '/') {
      trackScrollDepth(currentPath);
    }
    initBounceDetection(currentPath);
  }, [location.pathname]);

  useEffect(() => {
    initOutboundLinkTracking();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Homepage */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />

        {/* Homepage variants — design exploration */}
        <Route path="/v1" element={<PageTransition><HomeVariant1 /></PageTransition>} />
        <Route path="/v2" element={<PageTransition><HomeVariant2 /></PageTransition>} />
        <Route path="/v3" element={<PageTransition><HomeVariant3 /></PageTransition>} />
        <Route path="/v4" element={<PageTransition><HomeVariant4 /></PageTransition>} />

        {/* All other pages — self-contained with their own WhiteNavbar/WhiteFooter */}
        <Route path="/websites" element={<PageTransition><WebsitesPage /></PageTransition>} />
        <Route path="/systems" element={<PageTransition><SystemsPage /></PageTransition>} />
        <Route path="/hosting" element={<PageTransition><HostingPage /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/portfolio/blom-cosmetics" element={<PageTransition><BlomCosmetics /></PageTransition>} />
        <Route path="/portfolio/recklessbear" element={<PageTransition><RecklessBear /></PageTransition>} />
        <Route path="/portfolio/cw-electronics" element={<PageTransition><CWElectronics /></PageTransition>} />
        <Route path="/portfolio/ameli" element={<PageTransition><Ameli /></PageTransition>} />

        {/* Old case-study slugs — keep links alive */}
        <Route path="/portfolio/recklesbear" element={<Navigate to="/portfolio/recklessbear" replace />} />
        <Route path="/portfolio/ameli-van-zyl-design" element={<Navigate to="/portfolio/ameli" replace />} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/results" element={<PageTransition><Results /></PageTransition>} />
        <Route path="/add-ons" element={<PageTransition><AddOnsPage /></PageTransition>} />
        <Route path="/packages" element={<PageTransition><Packages /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />

        {/* Legacy/deprecated routes — redirect to /websites */}
        <Route path="/services/branding" element={<Navigate to="/websites" replace />} />
        <Route path="/services/development" element={<Navigate to="/websites" replace />} />
        <Route path="/services/automation" element={<Navigate to="/websites" replace />} />
        <Route path="/websites-old" element={<Navigate to="/websites" replace />} />
        <Route path="/systems-old" element={<Navigate to="/systems" replace />} />
        <Route path="/hosting-old" element={<Navigate to="/hosting" replace />} />

        {/* Scroll-driven 3D test — isolated, owns its own scroll (no PageTransition) */}
        <Route path="/lab" element={<Lab />} />

        {/* Catch-all — branded 404 */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  if (COMING_SOON) {
    return (
      <HelmetProvider>
        <ComingSoon />
      </HelmetProvider>
    );
  }

  // v2 white-minimal rebuild — self-contained (own Router + LenisProvider).
  if (SITE_V2) {
    return (
      <HelmetProvider>
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
          <SiteApp />
        </Suspense>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <LenisProvider>
          <ScrollToTop />
          <div className="relative min-h-screen">
            <Suspense fallback={<div className="min-h-screen" />}>
              <AnimatedRoutes />
            </Suspense>
          </div>
          <SiteLoader />
          <DotRingCursor />
          <BackToTop />
          <CookieConsent />
        </LenisProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
