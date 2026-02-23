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
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
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

            {/* Right Column - Single Vertical Image */}
            <div>
              <div className="aspect-[3/4] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center transition-all duration-300 overflow-hidden cursor-pointer"
                style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(139,92,246,0.3), 0 0 40px rgba(109,40,217,0.2)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(255,255,255,0.06)';
                }}
              >
                {/* IMAGE: replace src with Cloudinary URL — portfolio website homepage screenshot */}
                <span className="text-gray-500 font-ubuntu text-sm uppercase tracking-widest">portfolio website homepage screenshot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section B: Lead Capture & Notification */}
      <section className="relative py-20 md:py-32 border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Image */}
            <div className="order-2 md:order-1">
              <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center transition-all duration-300 overflow-hidden cursor-pointer"
                 style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}
                 onMouseEnter={e => {
                   (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                   (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(139,92,246,0.3), 0 0 40px rgba(109,40,217,0.2)';
                 }}
                 onMouseLeave={e => {
                   (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                   (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(255,255,255,0.06)';
                 }}
              >
                {/* IMAGE: replace src with Cloudinary URL — Ameli's contact form on the website */}
                <span className="text-gray-500 font-ubuntu text-sm uppercase tracking-widest">Ameli's contact form on the website</span>
              </div>
            </div>

            {/* Right Side - Text */}
            <div className="order-1 md:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white mb-6">
                Never Miss an Enquiry
              </h2>
              <p className="text-lg text-gray-300 mb-6 font-inter leading-relaxed">
                When someone fills in the contact form on Ameli's site, two things happen automatically — she gets a WhatsApp message and an email. Instantly. No checking inboxes. No missed commissions.
              </p>
              <p className="text-lg text-gray-300 mb-8 font-inter leading-relaxed">
                We connected the contact form to n8n, which routes every submission to her WhatsApp and email at the same time. She knows the moment someone's interested.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {["WhatsApp Notification", "Email Alert", "n8n Automation", "Zero Manual Follow-up"].map((pill, i) => (
                  <div key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:border-brand-purple/50 transition-colors cursor-default">
                    <span className="text-sm font-ubuntu font-medium text-gray-300">{pill}</span>
                  </div>
                ))}
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
