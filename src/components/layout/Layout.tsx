import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import DotGridBackground from '../ui/DotGridBackground';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <DotGridBackground />
      <Navbar />
      <main className="flex-grow pt-20 md:pt-24 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;