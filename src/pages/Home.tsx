import SEO from '../components/seo/SEO';
import HeroSection from '../components/home/HeroSection';
import SocialProofBar from '../components/home/SocialProofBar';
import ServicesBentoGrid from '../components/home/ServicesBentoGrid';
import FeaturedCaseStudies from '../components/home/FeaturedCaseStudies';
import HowItWorks from '../components/home/HowItWorks';
import TechStack from '../components/home/TechStack';
import FinalCTA from '../components/home/FinalCTA';
import GlowDivider from '../components/ui/GlowDivider';
import GradientText from '../components/ui/GradientText';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Streamline Automations — Websites & Automation for SA Businesses"
        description="We build websites, CRMs, WhatsApp automations and booking systems for local South African businesses. 7-day delivery. You own everything."
      />

      {/* 1. Hero */}
      <HeroSection />

      <GlowDivider />

      {/* 2. Social proof */}
      <SocialProofBar />

      <GlowDivider color="white" />

      {/* 3. Services preview */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-2">
            <span className="label">What We Build</span>
          </div>
          <h2 className="h2 text-center mb-0">
            Three pillars. <GradientText>One agency.</GradientText>
          </h2>
          <ServicesBentoGrid />
        </div>
      </section>

      <GlowDivider />

      {/* 4. Featured builds */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-2">
            <span className="label">Featured Builds</span>
          </div>
          <h2 className="h2 text-center mb-0">
            Real systems. <GradientText>Real businesses.</GradientText>
          </h2>
          <FeaturedCaseStudies />
        </div>
      </section>

      <GlowDivider />

      {/* 5. How it works */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-2">
            <span className="label">The Process</span>
          </div>
          <h2 className="h2 text-center mb-0">
            Live in under <GradientText>two weeks.</GradientText>
          </h2>
          <HowItWorks />
        </div>
      </section>

      <GlowDivider color="white" />

      {/* 6. Tech stack */}
      <TechStack />

      <GlowDivider />

      {/* 7. Final CTA */}
      <section className="section">
        <div className="container">
          <FinalCTA />
        </div>
      </section>
    </div>
  );
}
