import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import SEO from '../components/seo/SEO';
import WhiteNavbar from '../components/white/Navbar';
import WhiteFooter from '../components/white/Footer';
import CustomCursor from '../components/white/ui/CustomCursor';
import Preloader from '../components/white/ui/Preloader';
import ScrollProgress from '../components/white/ui/ScrollProgress';
import Hero from '../components/white/home/Hero';
import ClientBar from '../components/white/home/ClientBar';
import Services from '../components/white/home/Services';
import ShowcaseZoom from '../components/white/home/ShowcaseZoom';
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

  // Smooth scroll — Lenis intercepts wheel input and interpolates scroll
  // position so scroll feels continuous instead of discrete wheel-clicks.
  // wheelMultiplier < 1 reduces how far a single wheel click scrolls.
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative z-10 bg-white min-h-screen font-['DM_Sans'] text-[#0A0A0F] antialiased overflow-x-hidden">
      {/* Page-level purple ambient — persists through all sections on scroll */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-[55%]"
          style={{
            background:
              'radial-gradient(1300px 700px at 50% 2%, rgba(123,63,228,0.10), transparent 60%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[50%]"
          style={{
            background:
              'radial-gradient(900px 600px at 70% 90%, rgba(123,63,228,0.07), transparent 65%)',
          }}
        />
      </div>

      <SEO
        title="Streamline Automations — Websites that work. Systems that scale."
        description="Custom websites and automation systems for South African businesses. Fast, clean, and ready to go. Based in the Vaal Triangle, serving all of SA."
      />

      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <WhiteNavbar />

      <main>
        <Hero />
        <ClientBar />
        <Services />
        <ShowcaseZoom />
        <FeaturedWork />
        <RentalCallout />
        <HowItWorks />
        <FinalCTA />
      </main>

      <WhiteFooter />
    </div>
  );
}
