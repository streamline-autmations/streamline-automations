import SEO from '../components/seo/SEO';
import HeroSection from '../components/home/HeroSection';
import SocialProofBar from '../components/home/SocialProofBar';
import ResultsBar from '../components/home/ResultsBar';
import ServicesBentoGrid from '../components/home/ServicesBentoGrid';
import FeaturedCaseStudies from '../components/home/FeaturedCaseStudies';
import TestimonialsSection from '../components/home/TestimonialsSection';
import VideoWalkthrough from '../components/home/VideoWalkthrough';
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
        description="We build websites, CRMs, WhatsApp automations and booking systems for Johannesburg & Pretoria businesses. 7-day delivery. You own everything."
      />

      {/* 1. Hero */}
      <HeroSection />

      <GlowDivider />

      {/* 2. Social proof marquee */}
      <SocialProofBar />

      <GlowDivider color="white" />

      {/* 3. Real results */}
      <ResultsBar />

      <GlowDivider />

      {/* 4. Services */}
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

      {/* 5. Featured builds */}
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

      <GlowDivider color="white" />

      {/* 6. Testimonials */}
      <TestimonialsSection />

      <GlowDivider />

      {/* 7. Video walkthroughs */}
      <VideoWalkthrough />

      <GlowDivider color="white" />

      {/* 8. How it works */}
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

      <GlowDivider />

      {/* 9. Tech stack */}
      <TechStack />

      <GlowDivider />

      {/* 10. Final CTA */}
      <section className="section">
        <div className="container">
          <FinalCTA />
        </div>
      </section>
    </div>
  );
}
