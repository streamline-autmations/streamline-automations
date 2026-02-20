import React, { useState } from 'react';
import { ShoppingCart, Database, GraduationCap, Zap, Mail, FileText, MessageSquare } from 'lucide-react';
import CaseStudyLayout from '../../components/layout/CaseStudyLayout';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';

const BlomCosmetics: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState('Product Control');

  const techStack = [
    { icon: ShoppingCart, label: 'React E-commerce' },
    { icon: Database, label: 'Supabase' },
    { icon: Zap, label: 'Custom Admin' },
    { icon: Mail, label: 'Email Automation' },
  ];

  return (
    <CaseStudyLayout
      title="BLOM Cosmetics"
      subtitle="Full-stack beauty store with automated stock tracking, WhatsApp order updates, and a custom admin dashboard."
      techStack={techStack}
    >
      {/* Module 1: The Storefront */}
      <section className="relative py-24">
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
            <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-brand-purple/50 transition-all duration-300 overflow-hidden">
              <span className="text-gray-500 font-ubuntu text-sm">IMAGE 1: STOREFRONT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Module 2: The Command Center (Tabs Section) */}
      <section className="relative py-24 bg-black/30 border-y border-white/10">

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
                  <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-brand-purple/50 transition-all duration-300 overflow-hidden">
                    <span className="text-gray-500 font-ubuntu text-sm">IMAGE 2: PRODUCT EDITOR FORM</span>
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
                  <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-brand-purple/50 transition-all duration-300 overflow-hidden">
                    <span className="text-gray-500 font-ubuntu text-sm">IMAGE 3: ANALYTICS DASHBOARD</span>
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
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-brand-purple/50 transition-all duration-300 overflow-hidden">
                  <span className="text-gray-500 font-ubuntu text-xs text-center px-2">IMAGE 4: ACADEMY FRONT</span>
                </div>
                <div className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-brand-purple/50 transition-all duration-300 overflow-hidden">
                  <span className="text-gray-500 font-ubuntu text-xs text-center px-2">IMAGE 5: ACADEMY BACK</span>
                </div>
              </div>
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
      <section className="relative py-24 bg-black/30 border-y border-white/10">

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
                <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:border-brand-purple/50 transition-all duration-300 overflow-hidden">
                  <span className="text-gray-500 font-ubuntu text-xs">IMAGE 7: PDF INVOICE</span>
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
                <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:border-brand-purple/50 transition-all duration-300 overflow-hidden">
                  <span className="text-gray-500 font-ubuntu text-xs">IMAGE 6: EMAIL SCREENSHOT</span>
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
