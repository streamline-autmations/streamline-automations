import React from 'react';
import { Atom, Bot, Calendar, Code, TrendingDown, Eye, Bell } from 'lucide-react';
import CaseStudyLayout from '../../components/layout/CaseStudyLayout';
import Button from '../../components/ui/Button';

const RecklessBear: React.FC = () => {
  const techStack = [
    { icon: Atom, label: 'React' },
    { icon: Bot, label: 'AI Agent (OpenAI)' },
    { icon: Calendar, label: 'Booking System' },
    { icon: Code, label: 'Quote Engine' },
  ];

  return (
    <CaseStudyLayout
      title="RecklessBear Apparel"
      subtitle="Custom quote-engine website with a 24/7 AI Chatbot that automates bookings and qualifies leads."
      techStack={techStack}
    >
      {/* Hero Image */}
      <section className="relative py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="aspect-video bg-neutral-900 border border-white/10 rounded-3xl flex items-center justify-center text-gray-500 font-ubuntu text-sm">
              HERO: JERSEY CUSTOMIZER UI
            </div>
          </div>
        </div>
      </section>

      {/* The Brief - Challenge vs Solution */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            {/* Left Column - The Challenge */}
            <div className="glass-card p-8 md:p-10 border border-white/10 hover:border-brand-purple/50 transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center mr-4">
                  <TrendingDown className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-3xl md:text-4xl font-ubuntu font-bold text-white">
                  The Challenge
                </h2>
              </div>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-inter">
                Sales follow-up and bookings were manual, leading to missed opportunities. Management lacked visibility on team activity.
              </p>
            </div>

            {/* Right Column - The Solution */}
            <div className="glass-card p-8 md:p-10 border border-white/10 hover:border-brand-purple/50 transition-all">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center mr-4">
                  <Bot className="w-6 h-6 text-brand-purple" />
                </div>
                <h2 className="text-3xl md:text-4xl font-ubuntu font-bold text-white">
                  The Solution
                </h2>
              </div>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-inter">
                We built a custom Quote-Engine Website and integrated a 24/7 AI Chatbot. The system qualifies leads, books appointments automatically, and escalates unanswered leads to the CEO.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Automation Showcase - 3 Features */}
      <section className="relative py-20 md:py-32 bg-black/30 border-y border-white/10">

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white mb-4">
                The Sales Automation Suite
              </h2>
              <p className="text-lg md:text-xl text-gray-300 font-inter">
                Three systems working in harmony to close deals 24/7.
              </p>
            </div>

            {/* Feature 1: The Quote Engine */}
            <div className="mb-12 md:mb-20">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left - Visual */}
                <div className="order-2 md:order-1">
                  <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-brand-purple/50 transition-all duration-300 overflow-hidden">
                    <span className="text-gray-500 font-ubuntu text-sm text-center px-4">
                      DESIGN YOUR KIT: Step-by-step form
                    </span>
                  </div>
                </div>

                {/* Right - Text */}
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-brand-purple/20 rounded-lg border border-brand-purple/30">
                      <Code className="w-6 h-6 text-brand-purple" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-ubuntu font-bold text-white">
                      The Quote Engine
                    </h3>
                  </div>
                  <p className="text-lg text-gray-300 mb-6 font-inter leading-relaxed">
                    Seamless Quote-to-Order. Customers build their own products visually, reducing back-and-forth emails by 90%.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                      <span className="font-inter">Step-by-step product customization</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                      <span className="font-inter">Real-time pricing calculations</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                      <span className="font-inter">Instant PDF quote generation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature 2: The AI Sales Agent */}
            <div className="mb-12 md:mb-20">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left - Text */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-brand-purple/20 rounded-lg border border-brand-purple/30">
                      <Bot className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-ubuntu font-bold text-white">
                      The AI Sales Agent
                    </h3>
                  </div>
                  <p className="text-lg text-gray-300 mb-6 font-inter leading-relaxed">
                    24/7 Lead Qualification. The AI answers FAQs, checks availability, and books meetings directly into the calendar.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                      <span className="font-inter">Instant FAQ responses</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                      <span className="font-inter">Calendar integration for bookings</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                      <span className="font-inter">Lead qualification logic</span>
                    </li>
                  </ul>
                </div>

                {/* Right - Visual */}
                <div>
                  <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-brand-purple/50 transition-all duration-300 overflow-hidden">
                    <span className="text-gray-500 font-ubuntu text-sm text-center px-4">
                      CHAT WIDGET: AI conversation
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: The CEO Escalation Protocol */}
            <div>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left - Visual */}
                <div className="order-2 md:order-1">
                  <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:border-white/30 transition-all duration-300 overflow-hidden">
                    <span className="text-gray-500 font-ubuntu text-sm text-center px-4">
                      ADMIN DASHBOARD: Missed Lead Alert
                    </span>
                  </div>
                </div>

                {/* Right - Text */}
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                      <Bell className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-ubuntu font-bold text-white">
                      The CEO Escalation Protocol
                    </h3>
                  </div>
                  <p className="text-lg text-gray-300 mb-6 font-inter leading-relaxed">
                    Zero Slippage. If a lead isn't answered in 30 minutes, the system automatically flags it to the CEO.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="font-inter">30-minute response timer</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="font-inter">Automatic CEO notifications</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="font-inter">Complete lead activity history</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Results - ROI Grid */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold mb-6 bg-gradient-to-r from-brand-purple to-transparent bg-clip-text text-transparent">
                The Impact
              </h2>
              <p className="text-lg md:text-xl text-gray-300 font-inter">
                Measurable results that transformed their sales operations.
              </p>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Card 1 - Reduction in Manual Admin */}
              <div className="glass-card p-8 md:p-10 border border-white/10 hover:border-brand-purple/50 transition-all duration-300 group">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingDown className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-ubuntu font-bold text-white mb-4 text-center">
                  Reduction in Manual Admin
                </h3>
                <p className="text-gray-300 font-inter leading-relaxed text-center">
                  Automated quote generation and booking system eliminated hours of manual follow-up every week.
                </p>
              </div>

              {/* Card 2 - 100% Lead Visibility */}
              <div className="glass-card p-8 md:p-10 border border-white/10 hover:border-brand-purple/50 transition-all duration-300 group">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye className="w-8 h-8 text-brand-purple" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-ubuntu font-bold text-white mb-4 text-center">
                  100% Lead Visibility
                </h3>
                <p className="text-gray-300 font-inter leading-relaxed text-center">
                  CEO Dashboard provides complete oversight of all leads, conversations, and team performance.
                </p>
              </div>

              {/* Card 3 - Automated Reminders */}
              <div className="glass-card p-8 md:p-10 border border-white/10 hover:border-white/30 transition-all duration-300 group">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bell className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-ubuntu font-bold text-white mb-4 text-center">
                  Automated Reminders
                </h3>
                <p className="text-gray-300 font-inter leading-relaxed text-center">
                  Booking confirmations and follow-ups sent automatically, ensuring zero no-shows.
                </p>
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
              Need a Digital Sales Manager?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 font-inter leading-relaxed">
              Let's build an AI-powered sales system that qualifies leads, books appointments, and never misses an opportunity.
            </p>
            <Button to="/contact" variant="orange" size="lg" className="text-lg">
              Automate Your Sales
            </Button>
          </div>
        </div>
      </section>
    </CaseStudyLayout>
  );
};

export default RecklessBear;
