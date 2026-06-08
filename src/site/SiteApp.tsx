import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LenisProvider from './providers/LenisProvider';
import ScrollToTop from './components/layout/ScrollToTop';
import SiteLayout from './components/layout/SiteLayout';
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

/**
 * SiteApp — root of the v2 (white-minimal, Cuberto-calibrated) site. Owns its
 * own Router + smooth-scroll provider so it's fully decoupled from the legacy
 * app. Mounted by App.tsx when VITE_SITE_V2 === 'true'.
 */
export default function SiteApp() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-[100svh] bg-white" />}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/websites" element={<Websites />} />
              <Route path="/systems" element={<Systems />} />
              <Route path="/hosting" element={<Hosting />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Case studies */}
              <Route path="/work/blom" element={<Blom />} />
              <Route path="/work/recklessbear" element={<RecklessBear />} />
              <Route path="/work/cw-electronics" element={<CWElectronics />} />
              <Route path="/work/ameli" element={<Ameli />} />

              {/* Keep legacy portfolio slugs alive */}
              <Route path="/portfolio/blom-cosmetics" element={<Navigate to="/work/blom" replace />} />
              <Route path="/portfolio/recklessbear" element={<Navigate to="/work/recklessbear" replace />} />
              <Route path="/portfolio/cw-electronics" element={<Navigate to="/work/cw-electronics" replace />} />
              <Route path="/portfolio/ameli" element={<Navigate to="/work/ameli" replace />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </LenisProvider>
    </BrowserRouter>
  );
}
