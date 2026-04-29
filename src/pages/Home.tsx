import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';
import Hero from '../components/home/Hero';
import MarqueeSection from '../components/home/MarqueeSection';
import ServicesBentoGrid from '../components/home/ServicesBentoGrid';
import FeaturedBuilds from '../components/home/FeaturedBuilds';
import HowItWorks from '../components/home/HowItWorks';
import PackagePreview from '../components/home/PackagePreview';
import FinalCTA from '../components/home/FinalCTA';
import GlowDivider from '../components/ui/GlowDivider';
import GradientText from '../components/ui/GradientText';
import { springFadeUp, viewport } from '../lib/motion';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Streamline Automations — Websites & Automation for SA Businesses"
        description="We build websites, CRMs, WhatsApp automations and booking systems for Johannesburg & Pretoria businesses. 7-day delivery. You own everything."
      />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Client name marquee */}
      <MarqueeSection />

      {/* 3. Services bento */}
      <section className="section">
        <div className="container">
          <motion.div variants={springFadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="text-center mb-2">
            <span className="label">What We Build</span>
          </motion.div>
          <motion.h2 variants={springFadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="h2 text-center mb-0">
            Three pillars. <GradientText>One agency.</GradientText>
          </motion.h2>
          <ServicesBentoGrid />
        </div>
      </section>

      <GlowDivider />

      {/* 4. Featured builds */}
      <section className="section">
        <div className="container">
          <motion.div variants={springFadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="text-center mb-2">
            <span className="label">Featured Builds</span>
          </motion.div>
          <motion.h2 variants={springFadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="h2 text-center mb-0">
            Real systems. Real results.
          </motion.h2>
          <FeaturedBuilds />
        </div>
      </section>

      <GlowDivider />

      {/* 5. How it works */}
      <section className="section">
        <div className="container">
          <motion.div variants={springFadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="text-center mb-2">
            <span className="label">The Process</span>
          </motion.div>
          <motion.h2 variants={springFadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="h2 text-center mb-0">
            Live in under two weeks.
          </motion.h2>
          <HowItWorks />
        </div>
      </section>

      <GlowDivider />

      {/* 6. Package preview */}
      <section className="section">
        <div className="container">
          <motion.div variants={springFadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="text-center mb-2">
            <span className="label">What It Costs</span>
          </motion.div>
          <motion.h2 variants={springFadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="h2 text-center mb-0">
            Pick your package.
          </motion.h2>
          <PackagePreview />
        </div>
      </section>

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
