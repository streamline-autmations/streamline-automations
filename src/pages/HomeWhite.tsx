import { useEffect } from 'react';
import SEO from '../components/seo/SEO';
import WhiteNavbar from '../components/white/Navbar';
import WhiteFooter from '../components/white/Footer';
import Hero from '../components/white/home/Hero';
import ClientBar from '../components/white/home/ClientBar';
import Services from '../components/white/home/Services';
import FeaturedWork from '../components/white/home/FeaturedWork';
import RentalCallout from '../components/white/home/RentalCallout';
import HowItWorks from '../components/white/home/HowItWorks';
import FinalCTA from '../components/white/home/FinalCTA';

export default function HomeWhite() {
  // Force body + html to render white while on the homepage so the existing
  // dark globals (body::after gradient, dotgrid canvas) never peek through.
  useEffect(() => {
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = '#FFFFFF';
    document.documentElement.style.backgroundColor = '#FFFFFF';
    return () => {
      document.body.style.backgroundColor = prevBodyBg;
      document.documentElement.style.backgroundColor = prevHtmlBg;
    };
  }, []);

  return (
    <div className="relative z-10 bg-white min-h-screen font-['DM_Sans'] text-[#0A0A0F] antialiased">
      <SEO
        title="Streamline Automations — Websites that work. Systems that scale."
        description="Custom websites and automation systems for South African businesses. Fast, clean, and ready to go. Based in the Vaal Triangle, serving all of SA."
      />

      <WhiteNavbar />

      <main>
        <Hero />
        <ClientBar />
        <Services />
        <FeaturedWork />
        <RentalCallout />
        <HowItWorks />
        <FinalCTA />
      </main>

      <WhiteFooter />
    </div>
  );
}
