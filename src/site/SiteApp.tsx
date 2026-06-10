import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import LenisProvider from './providers/LenisProvider';
import ScrollToTop from './components/layout/ScrollToTop';
import SiteLayout from './components/layout/SiteLayout';
import Cursor from './components/craft/Cursor';
import ContactOrb from './components/craft/ContactOrb';
import PageTransition from './components/craft/PageTransition';
import './styles/site.css';

// Code-split every route (brief §10).
const Home = lazy(() => import('./pages/Home'));
const Websites = lazy(() => import('./pages/Websites'));
const Systems = lazy(() => import('./pages/Systems'));
const Hosting = lazy(() => import('./pages/Hosting'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blom = lazy(() => import('./pages/work/Blom'));
const RecklessBear = lazy(() => import('./pages/work/RecklessBear'));
const CWElectronics = lazy(() => import('./pages/work/CWElectronics'));
const Ameli = lazy(() => import('./pages/work/Ameli'));
const NotFound = lazy(() => import('./pages/NotFound'));
// Isolated 3D scroll lab (lives outside src/site) — no header/footer/orb
const Lab = lazy(() => import('../pages/lab/LabPage'));

/** Animated route swap — ink wipe between pages, keyed by pathname. */
function AnimatedRoutes() {
  const location = useLocation();
  const t = (el: React.ReactNode) => <PageTransition>{el}</PageTransition>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={t(<Home />)} />
        <Route path="/websites" element={t(<Websites />)} />
        <Route path="/systems" element={t(<Systems />)} />
        <Route path="/hosting" element={t(<Hosting />)} />
        <Route path="/portfolio" element={t(<Portfolio />)} />
        <Route path="/about" element={t(<About />)} />
        <Route path="/contact" element={t(<Contact />)} />

        {/* Case studies */}
        <Route path="/work/blom" element={t(<Blom />)} />
        <Route path="/work/recklessbear" element={t(<RecklessBear />)} />
        <Route path="/work/cw-electronics" element={t(<CWElectronics />)} />
        <Route path="/work/ameli" element={t(<Ameli />)} />

        {/* Keep legacy portfolio slugs alive */}
        <Route path="/portfolio/blom-cosmetics" element={<Navigate to="/work/blom" replace />} />
        <Route path="/portfolio/recklessbear" element={<Navigate to="/work/recklessbear" replace />} />
        <Route path="/portfolio/cw-electronics" element={<Navigate to="/work/cw-electronics" replace />} />
        <Route path="/portfolio/ameli" element={<Navigate to="/work/ameli" replace />} />

        <Route path="*" element={t(<NotFound />)} />
      </Routes>
    </AnimatePresence>
  );
}

/**
 * Shell — routes /lab to the isolated 3D scroll test (no SiteLayout chrome,
 * no ContactOrb — it owns its own scroll via drei ScrollControls). Everything
 * else gets the normal header/content/footer tree.
 */
function Shell() {
  const { pathname } = useLocation();

  if (pathname === '/lab') {
    return (
      <Suspense fallback={<div className="min-h-[100svh] bg-site-ink" />}>
        <Lab />
      </Suspense>
    );
  }

  return (
    <>
      <ContactOrb />
      <SiteLayout>
        <Suspense fallback={<div className="min-h-[100svh] bg-white" />}>
          <AnimatedRoutes />
        </Suspense>
      </SiteLayout>
    </>
  );
}

/**
 * SiteApp — root of the v2 (white-minimal, Cuberto-calibrated) site. Owns its
 * own Router + smooth-scroll provider + custom cursor, fully decoupled from the
 * legacy app. Mounted by App.tsx when VITE_SITE_V2 === 'true'.
 */
export default function SiteApp() {
  return (
    // reducedMotion="user" makes every Framer Motion component honour
    // prefers-reduced-motion automatically — transforms/layout animations are
    // skipped, opacity fades still run. One switch for the whole v2 app.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <LenisProvider>
          <ScrollToTop />
          <Cursor />
          <Shell />
        </LenisProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}
