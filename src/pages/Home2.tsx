/**
 * Home2 — Cuberto-style homepage redesign.
 * Preview at /home2. Swap to / once approved.
 */
import SEO from '../components/seo/SEO';
import HeroV2 from '../components/home/v2/HeroV2';
import SocialProofBar from '../components/home/SocialProofBar';
import WorkSection from '../components/home/v2/WorkSection';
import ServicesAccordion from '../components/home/v2/ServicesAccordion';
import StatsSection from '../components/home/v2/StatsSection';
import ProcessSection from '../components/home/v2/ProcessSection';
import TechStack from '../components/home/TechStack';
import CTASectionV2 from '../components/home/v2/CTASectionV2';

export default function Home2() {
  return (
    <>
      <SEO
        title="Streamline Automations — Websites, Systems & Hosting"
        description="We build websites, automation systems and digital infrastructure for local businesses in the Vaal Triangle and beyond."
      />

      <HeroV2 />
      <SocialProofBar />
      <WorkSection />
      <ServicesAccordion />
      <StatsSection />
      <ProcessSection />
      <TechStack />
      <CTASectionV2 />
    </>
  );
}
