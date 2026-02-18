import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';
import CursorGlow from './components/ui/CursorGlow';
import CursorHint from './components/ui/CursorHint';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Packages from './pages/Packages';
import OnlinePresencePage from './pages/packages/OnlinePresencePage';
import ClientMagnetPage from './pages/packages/ClientMagnetPage';
import BusinessAcceleratorPage from './pages/packages/BusinessAcceleratorPage';
import Portfolio from './pages/Portfolio';
import ProjectDetails from './pages/ProjectDetails';
import Contact from './pages/Contact';
import Branding from './pages/services/Branding';
import WebDevelopment from './pages/services/WebDevelopment';
import Automation from './pages/services/Automation';
import BlomCosmetics from './pages/portfolio/BlomCosmetics';
import AmeliVanZyl from './pages/portfolio/AmeliVanZyl';
import RecklessBear from './pages/portfolio/RecklessBear';

function App() {
  return (
    <Router>
      <CursorGlow />
      <CursorHint />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="packages" element={<Packages />} />
          <Route path="packages/online-presence" element={<OnlinePresencePage />} />
          <Route path="packages/client-magnet" element={<ClientMagnetPage />} />
          <Route path="packages/business-accelerator" element={<BusinessAcceleratorPage />} />
          <Route path="services/branding" element={<Branding />} />
          <Route path="services/development" element={<WebDevelopment />} />
          <Route path="services/automation" element={<Automation />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/ameli-van-zyl-design" element={<AmeliVanZyl />} />
          <Route path="portfolio/blom-cosmetics" element={<BlomCosmetics />} />
          <Route path="portfolio/reckless-bear" element={<RecklessBear />} />
          <Route path="portfolio/:id" element={<ProjectDetails />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;