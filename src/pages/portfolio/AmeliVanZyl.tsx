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
    <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-purple-500/30">
      {/* Custom Hero Section based on Image Analysis */}
      <section className="relative min-h-screen flex flex-col pt-8 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0514] via-[#020205] to-[#020205] z-0"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-900/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Huge Background Number */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
          <span className="text-[40vw] font-bold text-white/[0.02] leading-none select-none translate-y-20">01</span>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col h-full">
          {/* Top Bar */}
          <div className="flex justify-between items-start mb-20 md:mb-32">
            {/* Branding - Top Left */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                <span className="font-ubuntu font-bold text-white text-lg tracking-wider">SA</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-0.5">Streamline Automations</span>
                <span className="text-sm font-bold text-white tracking-wide">Christiaan Steffen</span>
              </div>
            </div>

            {/* Pagination - Top Right */}
            <div className="hidden md:block">
              <span className="text-sm font-mono text-gray-500 tracking-widest">01 / 05</span>
            </div>
          </div>

          {/* Main Hero Content - Centered */}
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full">
            {/* Label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-[1px] bg-orange-500/50"></div>
              <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-orange-500 font-medium">Featured Project</span>
              <div className="w-8 h-[1px] bg-orange-500/50"></div>
            </div>

            {/* Title */}
            <h1 className="text-7xl md:text-8xl lg:text-[9rem] leading-[0.9] font-serif font-medium text-white mb-4 tracking-tight">
              Ameli <br />
              <span className="text-white">van</span> <span className="text-[#8B5CF6] italic">Zyl.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-400 font-light mb-12 tracking-wide">
              Graphic Designer Portfolio
            </p>

            {/* Description (User Requested Update) */}
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-12 font-inter leading-relaxed opacity-80">
              A high converting mobile optimized personal made portfolio website for Ameli, showcasing all her designs and bringing in work. Short and powerful.
            </p>

            {/* Badges Row */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <div className="px-6 py-2.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                Online Presence
              </div>
              <div className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-medium tracking-wide">
                Portfolio Site
              </div>
              <div className="px-6 py-2.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-200 text-sm font-medium tracking-wide">
                Built in 4 days
              </div>
              <div className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm font-medium tracking-wide">
                Integrated contact form
              </div>
            </div>
          </div>

          {/* Bottom Elements */}
          <div className="flex justify-between items-end mt-auto pt-12">
            {/* Bottom Left Decor */}
            <div className="hidden md:flex gap-1 items-end">
               <div className="w-1 h-8 bg-orange-500"></div>
               <div className="w-8 h-1 bg-purple-500"></div>
            </div>

            {/* Bottom Right CTA */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-gray-500 group cursor-pointer hover:text-white transition-colors">
              <span>Swipe to see the build</span>
              <span className="text-orange-500 text-lg">»</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Placeholder - Long Scroll */}
      <section className="relative py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-[100vw] mx-auto px-0 md:px-0">
            <div className="relative w-full">
              <div className="absolute inset-0 bg-white/5 blur-[100px] z-0 opacity-20"></div>
              <img 
                src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772136418/ameli_long_scroll_fnptut.png" 
                alt="Ameli van Zyl Portfolio - Full Page Scroll" 
                className="w-full h-auto object-cover relative z-10 shadow-[0_0_100px_rgba(255,255,255,0.1)]"
              />
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

            {/* Right Column - Images */}
            <div className="flex flex-col gap-12">
              {/* Homepage Screenshot - 4:3 Full Screen */}
              <div className="w-full flex items-center justify-center transition-all duration-500 hover:scale-[1.02]">
                <img 
                  src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772136272/Ameli_Portfolio_Mockup_2_l55rg8.png" 
                  alt="Ameli Portfolio Homepage Mockup" 
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Mobile Version Image - 3 Phones */}
              <div className="w-full flex items-center justify-center transition-all duration-500 hover:scale-[1.02]">
                <img 
                  src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772136421/3_phone_jabicu.png" 
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
    </div>
  );
};

export default AmeliVanZyl;
