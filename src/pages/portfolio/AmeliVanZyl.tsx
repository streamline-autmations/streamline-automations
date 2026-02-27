import React from 'react';
import { Layout, MessageSquare, Zap } from 'lucide-react';
import CaseStudyLayout from '../../components/layout/CaseStudyLayout';
import Button from '../../components/ui/Button';

const AmeliVanZyl: React.FC = () => {
  const techStack = [
    { icon: Layout, label: 'Portfolio Site' },
    { icon: MessageSquare, label: 'Contact Form Integration' },
    { icon: Zap, label: 'Built in 3 days' },
  ];

  return (
    <CaseStudyLayout
      title="Ameli van Zyl: Digital Portfolio"
      subtitle="A personal, original, high-quality graphic design portfolio with seamless booking form integration. Professional, polished, and built to convert."
      techStack={techStack}
    >
      {/* Hero Image - Full Screen Raw */}
      <section className="relative w-full">
        <img 
          src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772170847/ameli_long_scroll_fnptut.png" 
          alt="Ameli Portfolio Full Page" 
          className="w-full h-auto object-cover"
        />
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

            {/* Right Column - Images */}
            <div className="flex flex-col gap-12">
              {/* Mobile Version Image - 3 Phones */}
              <div className="w-full flex items-center justify-center transition-all duration-500 hover:scale-[1.02]">
                <img 
                  src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772172127/3_phone_u7sdxg.png" 
                  alt="Ameli Portfolio Mobile View" 
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
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
              <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
                 onMouseEnter={e => {
                   const img = e.currentTarget.querySelector('img');
                   if (img) {
                     img.style.transform = 'scale(1.15)';
                   }
                 }}
                 onMouseLeave={e => {
                   const img = e.currentTarget.querySelector('img');
                   if (img) {
                     img.style.transform = 'scale(1)';
                   }
                 }}
              >
                <img 
                  src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772136965/msedge_s6W5xpIiBL_c4jjuf.png" 
                  alt="Ameli Contact Form" 
                  className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-in-out"
                />
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
