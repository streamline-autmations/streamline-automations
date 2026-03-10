import React, { useState } from 'react';
import { ShoppingCart, Database, GraduationCap, Zap, Mail, FileText, MessageSquare } from 'lucide-react';
import CaseStudyLayout from '../../components/layout/CaseStudyLayout';
import SEO from '../../components/seo/SEO';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';
import CaseStudyMetrics from '../../components/portfolio/CaseStudyMetrics';
import { portfolioProjects } from '../../data/portfolio';

const BlomCosmetics: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState('Product Control');
  const project = portfolioProjects.find(p => p.id === 'blom-cosmetics');

  const techStack = [
    { icon: ShoppingCart, label: 'E-commerce Store' },
    { icon: MessageSquare, label: 'WhatsApp Integration' },
    { icon: GraduationCap, label: 'Blom Academy' },
    { icon: Zap, label: 'Custom Admin' },
  ];

  return (
    <CaseStudyLayout
      title="BLOM Cosmetics"
      subtitle="Full-stack beauty store with automated stock tracking, WhatsApp order updates, and a custom admin dashboard."
      techStack={techStack}
      heroImageMobileSrc="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771692574/blom_hero-mobile_1_lsp6zo.png"
      heroImageDesktopSrc="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771692572/blom_hero-desktop_2_u99qeu.png"
    >
      <SEO 
        title="BLOM Cosmetics Case Study"
        description="A full-stack beauty store with automated stock tracking and WhatsApp order updates."
      />
      <SectionDivider />
      
      {/* METRICS */}
      <section className="py-12 border-b border-white/5 bg-[#0d0b1a]">
        <div className="container mx-auto px-4">
          {project?.metrics && <CaseStudyMetrics metrics={project.metrics} />}
        </div>
      </section>

      {/* BEFORE VS AFTER */}
      <section className="py-20 bg-[#0d0b1a]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-red-900/5 border border-red-500/20 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"/> Before Streamline
              </h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex gap-3">
                  <span className="text-red-500/50">✕</span>
                  Manual stock updates across spreadsheets
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500/50">✕</span>
                  Overselling "out of stock" items
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500/50">✕</span>
                  High monthly fees for Shopify plugins
                </li>
              </ul>
            </div>
            <div className="bg-green-900/5 border border-green-500/20 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"/> After Automation
              </h3>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-green-500">✓</span>
                  Real-time sync between store and warehouse
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500">✓</span>
                  Automated low-stock alerts via WhatsApp
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500">✓</span>
                  Zero platform fees (Custom Supabase Backend)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Module 1: The Storefront */}
      <section className="relative py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left - Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white mb-6">
                The Customer Experience
              </h2>
              <p className="text-lg text-gray-300 mb-6 font-inter leading-relaxed">
                A seamless shopping experience built on React and Vite. Lightning-fast product browsing, instant cart updates, and a checkout flow optimized for mobile.
              </p>
              <p className="text-lg text-gray-300 mb-6 font-inter leading-relaxed">
                Real-time inventory syncing ensures customers never see "out of stock" surprises at checkout.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <div className="px-4 py-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full">
                  <span className="text-sm font-ubuntu font-medium text-brand-purple">Sub-1s Load Time</span>
                </div>
                <div className="px-4 py-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full">
                  <span className="text-sm font-ubuntu font-medium text-brand-purple">Mobile Optimized</span>
                </div>
                <div className="px-4 py-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full">
                  <span className="text-sm font-ubuntu font-medium text-brand-purple">Real-time Cart</span>
                </div>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772366335/M003T1514_C_long_scroll_Macbook_Mockup_08Agu25_gkqqad.png"
                alt="Blom Storefront MacBook Mockup"
                className="w-full h-auto object-contain scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Module 2: The Command Center (Tabs Section) */}
      <section className="relative py-24 border-y border-white/10">

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white mb-4">
                The Admin OS
              </h2>
              <p className="text-lg md:text-xl text-gray-300 font-inter">
                A custom-built command center for total business control.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
              <Tabs
                tabs={['Product Control', 'Inventory Intelligence']}
                activeTab={activeAdminTab}
                onChange={setActiveAdminTab}
              />
            </div>

            {/* Content Container */}
            <div className="glass-card p-8 md:p-12 border border-white/10">
              {activeAdminTab === 'Product Control' && (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Left - Text */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-6">
                      Zero-Friction Product Management
                    </h3>
                    <p className="text-lg text-gray-300 mb-4 font-inter leading-relaxed">
                      Edit prices, descriptions, and images in real-time. No more fighting with generic CMS dashboards.
                    </p>
                    <p className="text-lg text-gray-300 mb-6 font-inter leading-relaxed">
                      Bulk operations let you update entire categories in seconds. Changes go live instantly.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                        <span className="font-inter">Live product editing</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                        <span className="font-inter">Image upload & optimization</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                        <span className="font-inter">Category management</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                        <span className="font-inter">Bulk price updates</span>
                      </li>
                    </ul>
                  </div>

                  {/* Right - Visual */}
                  <div className="relative aspect-[4/3] bg-white/5 border border-white/10 rounded-2xl hover:border-brand-purple/50 transition-all duration-300 overflow-hidden tech-glow-hover group">
                    <img
                      src="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771685600/2_g2i54c.png"
                      alt="Product Editor Form"
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              )}

              {activeAdminTab === 'Inventory Intelligence' && (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Left - Text */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-6">
                      Real-Time Business Intelligence
                    </h3>
                    <p className="text-lg text-gray-300 mb-4 font-inter leading-relaxed">
                      Live dashboards showing sales velocity, top products, and low-stock alerts.
                    </p>
                    <p className="text-lg text-gray-300 mb-6 font-inter leading-relaxed">
                      Automated alerts ensure you never run out of bestsellers. Data exports for accounting integration.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                        <span className="font-inter">Sales analytics</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                        <span className="font-inter">Stock level monitoring</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                        <span className="font-inter">Low-stock alerts</span>
                      </li>
                      <li className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                        <span className="font-inter">CSV/PDF exports</span>
                      </li>
                    </ul>
                  </div>

                  {/* Right - Visual */}
                  <div className="relative aspect-[4/3] bg-white/5 border border-white/10 rounded-2xl hover:border-brand-purple/50 transition-all duration-300 overflow-hidden tech-glow-hover group">
                    <img
                      src="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771685600/3_qdkh3g.png"
                      alt="Analytics Dashboard"
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Module 3: The BLOM Academy */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left - Visual (Reversed Order) */}
            <div className="order-2 md:order-1 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772518479/3_phone-blom-academy_chau8b.png"
                alt="Blom Academy Mobile Mockup"
                className="w-full h-auto object-contain scale-110"
              />
            </div>

            {/* Right - Text */}
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-8 h-8 text-brand-purple" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white">
                  The Academy Portal
                </h2>
              </div>
              <p className="text-lg text-gray-300 mb-6 font-inter leading-relaxed">
                A full-featured course booking system built into the main platform. Customers can browse makeup courses, check availability, and book sessions.
              </p>
              <p className="text-lg text-gray-300 mb-6 font-inter leading-relaxed">
                The admin dashboard includes a dedicated academy management section for scheduling, student tracking, and course material uploads.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <div className="px-4 py-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full">
                  <span className="text-sm font-ubuntu font-medium text-brand-purple">Calendar Integration</span>
                </div>
                <div className="px-4 py-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full">
                  <span className="text-sm font-ubuntu font-medium text-brand-purple">Student Management</span>
                </div>
                <div className="px-4 py-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full">
                  <span className="text-sm font-ubuntu font-medium text-brand-purple">Auto Reminders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 4: The Automation Layer (Bento Grid) */}
      <section className="relative py-24 border-y border-white/10">

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white mb-4">
                Invisible Automation
              </h2>
              <p className="text-lg md:text-xl text-gray-300 font-inter">
                Systems that work silently in the background.
              </p>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1 - Invoice */}
              <div className="glass-card p-8 border border-white/10 hover:border-brand-purple/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-brand-purple/10 rounded-lg border border-brand-purple/30">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-ubuntu font-bold text-white">Auto-Invoicing</h3>
                </div>
                <p className="text-gray-300 font-inter leading-relaxed mb-6">
                  Every order generates a branded PDF invoice automatically. Sent via email and stored in the admin portal.
                </p>
                <div className="relative aspect-[4/3] bg-white/5 border border-white/10 rounded-xl hover:border-brand-purple/50 transition-all duration-300 overflow-hidden tech-glow-hover group">
                  <img
                    src="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771685602/7_xqpqys.png"
                    alt="PDF Invoice"
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              {/* Card 2 - Emails */}
              <div className="glass-card p-8 border border-white/10 hover:border-brand-purple/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-brand-purple/10 rounded-lg border border-brand-purple/30">
                    <Mail className="w-6 h-6 text-brand-purple" />
                  </div>
                  <h3 className="text-xl font-ubuntu font-bold text-white">Branded Comms</h3>
                </div>
                <p className="text-gray-300 font-inter leading-relaxed mb-6">
                  Order confirmations, shipping updates, and Academy reminders—all sent automatically with custom branding.
                </p>
                <div className="group relative aspect-[4/3] bg-white/5 border border-white/10 rounded-xl hover:border-brand-purple/50 transition-all duration-300 overflow-hidden tech-glow-hover">
                  <img
                    src="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771685601/6_bqrtys.png"
                    alt="Email Screenshot"
                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ease-out group-hover:opacity-0 group-hover:scale-[1.03]"
                  />
                  <img
                    src="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771685603/6-back_kfy7zd.png"
                    alt="Email Screenshot Hover"
                    className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              {/* Card 3 - WhatsApp */}
              <div className="glass-card p-8 border border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/20">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-ubuntu font-bold text-white">Instant Updates</h3>
                </div>
                <p className="text-gray-300 font-inter leading-relaxed mb-6">
                  WhatsApp Business API integration sends real-time order updates. Customers get instant confirmation and tracking info.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-inter">Order Placed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-inter">Payment Confirmed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-inter">Shipped</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-inter">Delivered</span>
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
              Ready to Build Your E-commerce Command Center?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 font-inter leading-relaxed">
              Let's create a custom platform that scales with your business—no monthly platform fees, just powerful infrastructure you own.
            </p>
            <Button to="/contact" variant="orange" size="lg" className="text-lg">
              Start Your Build
            </Button>
          </div>
        </div>
      </section>
    </CaseStudyLayout>
  );
};

export default BlomCosmetics;
