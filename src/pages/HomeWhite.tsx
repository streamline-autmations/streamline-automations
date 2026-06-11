import { useEffect } from 'react';
import SEO from '../components/seo/SEO';
import SiteHeader from '../components/white/SiteHeader';
import HeroPortal from '../components/white/home/design/HeroPortal';
import TrustBar from '../components/white/home/design/TrustBar';
import IntroStatement from '../components/white/home/design/IntroStatement';
import ServicesRows from '../components/white/home/design/ServicesRows';
import SelectedWork from '../components/white/home/design/SelectedWork';
import StatsRow from '../components/white/home/design/StatsRow';
import AutomationFlowRow from '../components/white/home/design/AutomationFlowRow';
import BuiltWith from '../components/white/home/design/BuiltWith';
import RentalCallout from '../components/white/home/RentalCallout';
import FinalCTAOrbs from '../components/white/home/design/FinalCTAOrbs';
import SiteFooter from '../components/white/SiteFooter';
import AmbientDepth from '../components/white/home/design/AmbientDepth';

export default function HomeWhite() {
  // Force body + html white while on the homepage so the dark globals
  // (body::after gradient, dotgrid canvas) never peek through.
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
    <div
      id="top"
      className="relative z-10 min-h-[100svh] overflow-x-hidden bg-white font-['DM_Sans'] text-[#0A0A0F] antialiased"
    >
      <SEO
        title="Web Design & Automation in the Vaal Triangle, Gauteng"
        description="Custom websites and automation systems for South African businesses. Built by Christiaan Steffen in the Vaal Triangle. No upfront cost — rent monthly, own after 18 months."
        url="/"
      />

      <SiteHeader />

      <AmbientDepth />

      <main className="relative z-10">
        <HeroPortal />
        <TrustBar />
        <IntroStatement />
        <ServicesRows />
        <div id="work">
          <SelectedWork />
        </div>
        <StatsRow />
        <AutomationFlowRow />
        <BuiltWith />
        <RentalCallout />
        <FinalCTAOrbs />
      </main>

      <SiteFooter />
    </div>
  );
}
