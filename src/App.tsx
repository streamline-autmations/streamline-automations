import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/layout/ScrollToTop';
import CursorHint from './components/ui/CursorHint';
import MouseTracker from './components/MouseTracker';
import DotGridBackground from './components/ui/DotGridBackground';
import Layout from './components/layout/Layout';
import { IntroScreen } from './components/IntroScreen';
import PageTransition from './components/layout/PageTransition';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Packages = lazy(() => import('./pages/Packages'));
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

// Animated Routes Component
function AnimatedRoutes() {
  const location = useLocation();

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
          <Route path="packages" element={
            <PageTransition><Packages /></PageTransition>
          } />
          <Route path="add-ons" element={
            <PageTransition><AddOnsPage /></PageTransition>
          } />
          <Route path="packages/online-presence" element={
            <PageTransition><OnlinePresencePage /></PageTransition>
          } />
          <Route path="packages/client-magnet" element={
            <PageTransition><ClientMagnetPage /></PageTransition>
          } />
          <Route path="packages/business-accelerator" element={
            <PageTransition><BusinessAcceleratorPage /></PageTransition>
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
        <Router>
          <MouseTracker />
          <ScrollToTop />
          <CursorHint />
          <DotGridBackground />
          <div className="relative min-h-screen">
            <Suspense fallback={<div className="min-h-screen bg-[#050508]" />}>
              <AnimatedRoutes />
            </Suspense>
          </div>
        </Router>
      </IntroScreen>
    </HelmetProvider>
  );
}

export default App;
