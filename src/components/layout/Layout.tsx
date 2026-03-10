import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';
import ExitIntentPopup from '../ui/ExitIntentPopup';
import ScrollProgress from '../ui/ScrollProgress';
import BackToTop from '../ui/BackToTop';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow pt-[calc(var(--nav-h)+16px)] md:pt-24 relative z-10">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ExitIntentPopup />
      <BackToTop />
    </div>
  );
};

export default Layout;
