import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/layout/ScrollToTop';
import DotGridBackground from './components/ui/DotGridBackground';
import Layout from './components/layout/Layout';
import PageTransition from './components/layout/PageTransition';
import { trackScrollDepth, resetScrollTracking, initOutboundLinkTracking, initBounceDetection, resetSessionTiming } from './lib/analytics';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/HomeWhite'));
const Services = lazy(() => import('./pages/Services'));
const Results = lazy(() => import('./pages/Results'));
const AddOnsPage = lazy(() => import('./pages/AddOnsPage'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const Branding = lazy(() => import('./pages/services/Branding'));
const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'));
const Automation = lazy(() => import('./pages/services/Automation'));
const BlomCosmetics = lazy(() => import('./pages/portfolio/BlomCosmetics'));
const AmeliVanZyl = lazy(() => import('./pages/portfolio/AmeliVanZyl'));
const RecklessBearPage = lazy(() => import('./pages/portfolio/RecklessBearPage'));
const WebsitesPage = lazy(() => import('./pages/Websites'));
const SystemsPage = lazy(() => import('./pages/Systems'));
const HostingPage = lazy(() => import('./pages/Hosting'));

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
        {/* Homepage uses the new white redesign — self-contained layout, no dark chrome */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />

        {/* All other pages continue to use the existing dark Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="websites" element={<PageTransition><WebsitesPage /></PageTransition>} />
          <Route path="systems" element={<PageTransition><SystemsPage /></PageTransition>} />
          <Route path="hosting" element={<PageTransition><HostingPage /></PageTransition>} />
          {/* Package route redirects to service pages */}
          <Route path="packages" element={<Navigate to="/websites" replace />} />
          <Route path="packages/online-presence" element={<Navigate to="/websites" replace />} />
          <Route path="packages/client-magnet" element={<Navigate to="/systems" replace />} />
          <Route path="packages/business-accelerator" element={<Navigate to="/systems" replace />} />
          <Route path="results" element={<PageTransition><Results /></PageTransition>} />
          <Route path="add-ons" element={<PageTransition><AddOnsPage /></PageTransition>} />
          <Route path="services/branding" element={<PageTransition><Branding /></PageTransition>} />
          <Route path="services/development" element={<PageTransition><WebDevelopment /></PageTransition>} />
          <Route path="services/automation" element={<PageTransition><Automation /></PageTransition>} />
          <Route path="portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="portfolio/ameli-van-zyl-design" element={<PageTransition><AmeliVanZyl /></PageTransition>} />
          <Route path="portfolio/blom-cosmetics" element={<PageTransition><BlomCosmetics /></PageTransition>} />
          <Route path="portfolio/recklesbear" element={<PageTransition><RecklessBearPage /></PageTransition>} />
          <Route path="portfolio/:id" element={<PageTransition><ProjectDetails /></PageTransition>} />
          <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <DotGridBackground />
        <div className="relative min-h-screen">
          <Suspense fallback={<div className="min-h-screen" />}>
            <AnimatedRoutes />
          </Suspense>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
