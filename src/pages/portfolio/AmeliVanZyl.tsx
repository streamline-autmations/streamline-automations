import React from 'react';
import { Atom, Paintbrush, Send } from 'lucide-react';
import CaseStudyLayout from '../../components/layout/CaseStudyLayout';
import Button from '../../components/ui/Button';

const AmeliVanZyl: React.FC = () => {
  const techStack = [
    { icon: Atom, label: 'React' },
    { icon: Paintbrush, label: 'Tailwind CSS' },
    { icon: Send, label: 'Netlify Forms' },
  ];

  return (
    <CaseStudyLayout
      title="Ameli van Zyl: Digital Portfolio"
      subtitle="A minimalist digital canvas. Custom identity synthesis and rapid deployment."
      techStack={techStack}
    >
      {/* Hero Image Placeholder */}
      <section className="relative py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="aspect-video bg-neutral-900 border border-white/10 rounded-3xl flex items-center justify-center text-gray-500 font-ubuntu text-sm">
              HERO IMAGE: HOMEPAGE ART
            </div>
          </div>
        </div>
      </section>

      {/* Section A: Visual Identity Gallery */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            {/* Left Column - The Story */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white mb-6">
                Curated to Convert
              </h2>
              <p className="text-lg text-gray-300 mb-8 font-inter leading-relaxed">
                We didn't just dump images into a template. We analyzed Ameli's art style to define a custom color palette and typography system that complements her work.
              </p>

              {/* Bullet Points */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-ubuntu font-bold text-white mb-1">
                      Custom Color Synthesis
                    </h3>
                    <p className="text-gray-400 font-inter">
                      Dark Mode / Art Grey palette designed to enhance artwork visibility
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-ubuntu font-bold text-white mb-1">
                      Rapid Iteration
                    </h3>
                    <p className="text-gray-400 font-inter">
                      Final build delivered in less than 5 days
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-ubuntu font-bold text-white mb-1">
                      Seamless Mobile Responsiveness
                    </h3>
                    <p className="text-gray-400 font-inter">
                      Optimized viewing experience across all devices
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - The Visuals (Masonry-style Gallery) */}
            <div className="space-y-6">
              {/* Image 1 - Tall */}
              <div className="aspect-[3/4] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-brand-purple/50 transition-all duration-300 overflow-hidden">
                <span className="text-gray-500 font-ubuntu text-sm">POSTER ART (Vertical)</span>
              </div>

              {/* Image 2 - Wide */}
              <div className="aspect-[16/9] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-brand-purple/50 transition-all duration-300 overflow-hidden">
                <span className="text-gray-500 font-ubuntu text-sm">LOGO COLLECTION (Horizontal)</span>
              </div>

              {/* Image 3 - Square */}
              <div className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-brand-purple/50 transition-all duration-300 overflow-hidden">
                <span className="text-gray-500 font-ubuntu text-sm">ILLUSTRATION (Square)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section B: Invisible Automation */}
      <section className="relative py-20 md:py-32 border-y border-white/10">

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white mb-4">
                Lead Capture & Notification
              </h2>
              <p className="text-lg md:text-xl text-gray-300 font-inter">
                Zero-friction inquiries. Custom forms connect directly to Ameli's WhatsApp via n8n, ensuring she never misses a commission.
              </p>
            </div>

            {/* Feature Card - 50/50 Split */}
            <div className="glass-card overflow-hidden border border-white/10 hover:border-brand-purple/50 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side - Contact Form */}
                <div className="aspect-[4/3] md:aspect-auto bg-white/5 border-r-0 md:border-r border-white/10 flex items-center justify-center p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-purple/20 rounded-xl border border-brand-purple/30 flex items-center justify-center">
                      <Paintbrush className="w-8 h-8 text-brand-purple" />
                    </div>
                    <span className="text-gray-500 font-ubuntu text-sm">CONTACT FORM DESIGN</span>
                  </div>
                </div>

                {/* Right Side - WhatsApp Notification */}
                <div className="aspect-[4/3] md:aspect-auto bg-white/5 flex items-center justify-center p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-purple/20 rounded-xl border border-brand-purple/30 flex items-center justify-center">
                      <Send className="w-8 h-8 text-accent" />
                    </div>
                    <span className="text-gray-500 font-ubuntu text-sm">WHATSAPP NOTIFICATION SCREEN</span>
                  </div>
                </div>
              </div>

              {/* Bottom Detail Bar */}
              <div className="border-t border-white/10 bg-[color:var(--surface)] p-6">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 font-inter">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Instant Notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>n8n Workflow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Zero Manual Follow-up</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white mb-6">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 font-inter leading-relaxed">
              Let's create a stunning digital presence that showcases your work beautifully.
            </p>
            <Button to="/contact" variant="orange" size="lg" className="text-lg">
              Start Your Project
            </Button>
          </div>
        </div>
      </section>
    </CaseStudyLayout>
  );
};

export default AmeliVanZyl;
