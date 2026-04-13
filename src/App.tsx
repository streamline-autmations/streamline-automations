import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/layout/ScrollToTop';
import MouseTracker from './components/MouseTracker';
import DotGridBackground from './components/ui/DotGridBackground';
import Layout from './components/layout/Layout';
import { IntroScreen } from './components/IntroScreen';
import PageTransition from './components/layout/PageTransition';
import LenisProvider from './components/providers/LenisProvider';
import CustomCursor from './components/ui/CustomCursor';
import { trackScrollDepth, resetScrollTracking, initOutboundLinkTracking, initBounceDetection, resetSessionTiming } from './lib/analytics';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Packages = lazy(() => import('./pages/Packages'));
const Results = lazy(() => import('./pages/Results'));
const AddOnsPage = lazy(() => import('./pages/AddOnsPage'));
const OnlinePresencePage = lazy(() => import('./pages/packages/OnlinePresencePage'));
const ClientMagnetPage = lazy(() => import('./pages/packages/ClientMagnetPage'));
const BusinessAcceleratorPage = lazy(() => import('./pages/packages/BusinessAcceleratorPage'));
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

// Animated Routes Component
function AnimatedRoutes() {
  const location = useLocation();

  // Track scroll depth and handle bounce on route change
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Reset scroll tracking for new page
    resetScrollTracking();
    resetSessionTiming();
    
    // Track scroll depth only on homepage
    if (currentPath === '/') {
      trackScrollDepth(currentPath);
    }
    
    // Initialize bounce detection for each page
    initBounceDetection(currentPath);
  }, [location.pathname]);

  // Initialize outbound link tracking once
  useEffect(() => {
    initOutboundLinkTracking();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <PageTransition><Home /></PageTransition>
          } />
          <Route path="services" element={
            <PageTransition><Services /></PageTransition>
          } />
          {/* New service pages */}
          <Route path="websites" element={
            <PageTransition><WebsitesPage /></PageTransition>
          } />
          <Route path="systems" element={
            <PageTransition><SystemsPage /></PageTransition>
          } />
          <Route path="hosting" element={
            <PageTransition><HostingPage /></PageTransition>
          } />
          {/* Redirects for old package routes */}
          <Route path="packages" element={<Navigate to="/websites" replace />} />
          <Route path="packages/online-presence" element={<Navigate to="/websites" replace />} />
          <Route path="packages/client-magnet" element={<Navigate to="/systems" replace />} />
          <Route path="packages/business-accelerator" element={<Navigate to="/systems" replace />} />
          {/* Keep old pages accessible but not in nav */}
          <Route path="results" element={
            <PageTransition><Results /></PageTransition>
          } />
          <Route path="add-ons" element={
            <PageTransition><AddOnsPage /></PageTransition>
          } />
          <Route path="services/branding" element={
            <PageTransition><Branding /></PageTransition>
          } />
          <Route path="services/development" element={
            <PageTransition><WebDevelopment /></PageTransition>
          } />
          <Route path="services/automation" element={
            <PageTransition><Automation /></PageTransition>
          } />
          <Route path="portfolio" element={
            <PageTransition><Portfolio /></PageTransition>
          } />
          <Route path="portfolio/ameli-van-zyl-design" element={
            <PageTransition><AmeliVanZyl /></PageTransition>
          } />
          <Route path="portfolio/blom-cosmetics" element={
            <PageTransition><BlomCosmetics /></PageTransition>
          } />
          <Route path="portfolio/recklesbear" element={
            <PageTransition><RecklessBearPage /></PageTransition>
          } />
          <Route path="portfolio/:id" element={
            <PageTransition><ProjectDetails /></PageTransition>
          } />
          <Route path="contact" element={
            <PageTransition><Contact /></PageTransition>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <IntroScreen>
        <LenisProvider>
          <Router>
            <CustomCursor />
            <MouseTracker />
            <ScrollToTop />
            <DotGridBackground />
            <div className="relative min-h-screen">
              <Suspense fallback={<div className="min-h-screen bg-[#050508]" />}>
                <AnimatedRoutes />
              </Suspense>
            </div>
          </Router>
        </LenisProvider>
      </IntroScreen>
    </HelmetProvider>
  );
}

export default App;
