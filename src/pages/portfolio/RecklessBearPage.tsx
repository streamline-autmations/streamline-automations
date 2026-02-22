import React, { useState } from 'react';
import { ShoppingBag, LayoutDashboard, Bot, CheckCircle, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, stagger, cardItem, viewport } from '../../lib/motion';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';

const ImgPlaceholder = ({ label, aspect = "aspect-video" }: { label: string; aspect?: string }) => (
  <div className={`w-full ${aspect} rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center`}>
    <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
      {label}
    </span>
  </div>
);

const ImageWrapper = ({ children, label }: { children: React.ReactNode, label: string }) => {
  return (
    <div className="rounded-xl overflow-hidden transition-all duration-500 cursor-pointer group relative"
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
      {/* IMAGE: replace src with Cloudinary URL — {label} */}
      {children}
    </div>
  );
};

const RecklessBearPage: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState('Leads');

  const adminTabs = ['Leads', 'Jobs', 'Stock', 'WhatsApp', 'Analytics'];

  return (
    <div className="min-h-screen bg-[#0d0b1a] pt-20 md:pt-24 text-white font-inter">
      {/* SECTION 1 — HERO */}
      <section className="relative pb-24 px-4 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0d0b1a] to-[#0d0b1a] -z-10" />

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Type Tags Row */}
          <motion.div variants={fadeUp} className="flex justify-center gap-3 flex-wrap mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full">
              <ShoppingBag className="w-4 h-4 text-brand-purple" />
              <span className="text-sm font-ubuntu font-medium text-brand-purple">Service Website</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full">
              <LayoutDashboard className="w-4 h-4 text-brand-purple" />
              <span className="text-sm font-ubuntu font-medium text-brand-purple">Admin System</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-purple/10 border border-brand-purple/30 rounded-full">
              <Bot className="w-4 h-4 text-brand-purple" />
              <span className="text-sm font-ubuntu font-medium text-brand-purple">AI Lead Capture</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-ubuntu font-bold mb-6 tracking-tight">
            RecklessBear
          </motion.h1>

          {/* Body */}
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            A custom clothing brand running on custom orders. We built their website, an AI that qualifies every lead automatically, and the admin system that runs the whole business.
          </motion.p>

          {/* Hero Image */}
          <motion.div variants={fadeUp} className="max-w-5xl mx-auto">
            <ImageWrapper label="hero — website on laptop mockup">
              <ImgPlaceholder label="hero — website on laptop mockup" aspect="aspect-[16/9]" />
            </ImageWrapper>
          </motion.div>
        </motion.div>
      </section>

      <SectionDivider />

      {/* SECTION 2 — OVERVIEW STATS */}
      <section className="py-12 border-b border-white/5 bg-[#0d0b1a]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 max-w-4xl mx-auto"
          >
            <motion.div variants={cardItem} className="text-center py-4 md:py-0 px-4">
              <div className="text-3xl md:text-4xl font-ubuntu font-bold text-white mb-2">2</div>
              <div className="text-sm font-mono uppercase tracking-widest text-gray-500">Products Built</div>
            </motion.div>
            <motion.div variants={cardItem} className="text-center py-4 md:py-0 px-4">
              <div className="text-3xl md:text-4xl font-ubuntu font-bold text-white mb-2">&lt; 7 Days</div>
              <div className="text-sm font-mono uppercase tracking-widest text-gray-500">Delivered In</div>
            </motion.div>
            <motion.div variants={cardItem} className="text-center py-4 md:py-0 px-4">
              <div className="text-3xl md:text-4xl font-ubuntu font-bold text-white mb-2">100%</div>
              <div className="text-sm font-mono uppercase tracking-widest text-gray-500">Leads Automated</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — THE WEBSITE */}
      <section className="py-24 bg-[#13111f]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-ubuntu font-bold mb-4">The Website</h2>
            <p className="text-lg text-gray-400">Built for the brand. Designed to convert.</p>
          </motion.div>

          {/* SPLIT BLOCK A */}
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
            >
              <h3 className="text-2xl md:text-3xl font-ubuntu font-bold mb-6">Built for custom orders</h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                A fast, bold site that speaks to RecklessBear's audience. Their products are shown properly, the brand comes through clearly, and every page pushes visitors toward placing a custom order.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                The order request flow guides customers step by step — product type, size, quantity, design brief. Clean. Structured. No DMs.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Custom Brand Design", "Mobile-First", "Order Request Flow", "WhatsApp Integration", "SEO Setup"].map((pill, i) => (
                  <div key={i} className="px-3 py-1.5 border border-brand-purple/30 bg-brand-purple/10 rounded-full">
                    <span className="text-xs font-ubuntu font-medium text-brand-purple uppercase tracking-wide">{pill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
            >
              <ImageWrapper label="website — homepage">
                <ImgPlaceholder label="website — homepage" />
              </ImageWrapper>
            </motion.div>
          </div>

          {/* SPLIT BLOCK B */}
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div 
              className="order-2 md:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
            >
              <ImageWrapper label="website — order request form">
                <ImgPlaceholder label="website — order request form" />
              </ImageWrapper>
            </motion.div>
            <motion.div 
              className="order-1 md:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
            >
              <h3 className="text-2xl md:text-3xl font-ubuntu font-bold mb-6">Every order starts here</h3>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                The order form walks customers through product type, quantity, size, and design brief — step by step. When they submit, they get a confirmation automatically. Their brief goes straight into the system. No back-and-forth.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Multi-step form", "Design brief capture", "Auto confirmation", "Instant lead routing"].map((pill, i) => (
                  <div key={i} className="px-3 py-1.5 border border-brand-purple/30 bg-brand-purple/10 rounded-full">
                    <span className="text-xs font-ubuntu font-medium text-brand-purple uppercase tracking-wide">{pill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SECTION 4 — THE AI LEAD FLOW */}
      <section className="py-24 bg-[#0f0d1e]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-ubuntu font-bold mb-4">The AI Lead Flow</h2>
            <p className="text-lg text-gray-400">Every lead that comes through the website is handled automatically before it reaches the team.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {/* Card 1 */}
            <motion.div variants={cardItem} className="bg-[#13111f] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 border border-white/10">
                <MessageSquare className="w-5 h-5 text-gray-300" />
              </div>
              <h3 className="text-xl font-ubuntu font-bold mb-3">Visitor enquires</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                A customer lands on the site and starts an order request. The AI responds immediately — no wait, no missed messages, any time of day.
              </p>
              <div className="mt-auto">
                <ImageWrapper label="chatbot — widget on website">
                  <ImgPlaceholder label="chatbot — widget on website" aspect="aspect-[4/3]" />
                </ImageWrapper>
              </div>
            </motion.div>

            {/* Card 2 (Featured) */}
            <motion.div variants={cardItem} className="bg-[#13111f] border border-brand-purple/50 rounded-xl p-6 relative shadow-[0_0_30px_rgba(139,92,246,0.1)]">
              <div className="absolute top-4 right-4 px-2 py-1 bg-brand-purple/20 border border-brand-purple/40 rounded text-[10px] font-mono uppercase tracking-wider text-brand-purple">
                AI Layer
              </div>
              <div className="w-10 h-10 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4 border border-brand-purple/30">
                <Bot className="w-5 h-5 text-brand-purple" />
              </div>
              <h3 className="text-xl font-ubuntu font-bold mb-3">AI qualifies the lead</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                The AI asks the right questions — product type, quantity, design brief, timeline. It handles FAQs and only sends the lead through once everything is complete.
              </p>
              <div className="h-32 bg-brand-purple/5 rounded-lg border border-brand-purple/20 flex items-center justify-center">
                 <Bot className="w-12 h-12 text-brand-purple/40" />
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={cardItem} className="bg-[#13111f] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 border border-white/10">
                <CheckCircle className="w-5 h-5 text-gray-300" />
              </div>
              <h3 className="text-xl font-ubuntu font-bold mb-3">Lands in admin — ready to action</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                A fully structured lead arrives in the dashboard with the brief attached. The team can quote straight away. No chasing. No clarifying messages.
              </p>
              <div className="mt-auto">
                 <div className="h-32 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-white/20" />
                 </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — THE ADMIN SYSTEM */}
      <section className="py-24 bg-[#0d0b1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-ubuntu font-bold mb-4">The Admin System</h2>
            <p className="text-lg text-gray-400">One dashboard that runs the whole operation.</p>
          </div>

          {/* TABS */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-4 md:pb-0">
            <div className="inline-flex p-1 bg-white/5 rounded-xl border border-white/10 whitespace-nowrap">
              {adminTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveAdminTab(tab)}
                  className={`px-6 py-3 rounded-lg font-ubuntu font-medium transition-all duration-300 ${
                    activeAdminTab === tab
                      ? 'bg-brand-purple/20 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* TAB CONTENT */}
          <div className="max-w-6xl mx-auto bg-[#13111f] border border-white/10 rounded-2xl p-8 md:p-12">
            {activeAdminTab === 'Leads' && (
              <div className="grid md:grid-cols-2 gap-12 items-center animate-fadeIn">
                <div>
                  <h3 className="text-2xl font-ubuntu font-bold mb-4">Every lead, ready to action</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">AI-qualified leads land here with the full brief attached. Track each one from first contact to closed deal. Nothing slips through.</p>
                  <ul className="space-y-3">
                    {["Status tracking", "Full brief attached", "Quote from here", "Auto-assigned on arrival"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-purple"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ImageWrapper label="admin — leads page">
                  <ImgPlaceholder label="admin — leads page" />
                </ImageWrapper>
              </div>
            )}
            {activeAdminTab === 'Jobs' && (
              <div className="grid md:grid-cols-2 gap-12 items-center animate-fadeIn">
                <div>
                  <h3 className="text-2xl font-ubuntu font-bold mb-4">From quote to delivery</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">When a lead is accepted it becomes a job automatically. Track every order through production and delivery with full visibility.</p>
                  <ul className="space-y-3">
                    {["Quote to job in one click", "Production status", "Delivery tracking", "Client notes attached"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-purple"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ImageWrapper label="admin — jobs page">
                  <ImgPlaceholder label="admin — jobs page" />
                </ImageWrapper>
              </div>
            )}
            {activeAdminTab === 'Stock' && (
              <div className="grid md:grid-cols-2 gap-12 items-center animate-fadeIn">
                <div>
                  <h3 className="text-2xl font-ubuntu font-bold mb-4">Always know what you have</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">Materials inventory tracked in one place. Low stock alerts fire automatically so nothing runs out mid-job.</p>
                  <ul className="space-y-3">
                    {["Live inventory counts", "Low stock alerts", "Per-material tracking", "Synced with jobs"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-purple"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ImageWrapper label="admin — stock page">
                  <ImgPlaceholder label="admin — stock page" />
                </ImageWrapper>
              </div>
            )}
            {activeAdminTab === 'WhatsApp' && (
              <div className="grid md:grid-cols-2 gap-12 items-center animate-fadeIn">
                <div>
                  <h3 className="text-2xl font-ubuntu font-bold mb-4">All messages. One place.</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">Every customer WhatsApp message is pulled into the admin system. No switching between phones and apps. The whole team sees everything.</p>
                  <ul className="space-y-3">
                    {["Centralised inbox", "Full conversation history", "Linked to lead records", "Team-wide visibility"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-purple"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ImageWrapper label="admin — whatsapp inbox">
                  <ImgPlaceholder label="admin — whatsapp inbox" />
                </ImageWrapper>
              </div>
            )}
            {activeAdminTab === 'Analytics' && (
              <div className="grid md:grid-cols-2 gap-12 items-center animate-fadeIn">
                <div>
                  <h3 className="text-2xl font-ubuntu font-bold mb-4">See how the business is doing</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">Lead volume, job completion rate, revenue trends — visible at a glance. No spreadsheets. No guessing.</p>
                  <ul className="space-y-3">
                    {["Lead volume over time", "Job completion rate", "Revenue tracking", "Exportable reports"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-purple"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ImageWrapper label="admin — analytics dashboard">
                  <ImgPlaceholder label="admin — analytics dashboard" />
                </ImageWrapper>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 6 — TECH STACK */}
      <section className="py-24 bg-[#13111f] border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-ubuntu font-bold mb-8">Built With</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "n8n", "OpenAI", "Voiceflow", "Resend", "Vercel"].map((tech, i) => (
              <div key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:border-brand-purple/40 transition-colors cursor-default">
                <span className="text-sm font-ubuntu font-medium text-gray-300">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — NEXT / PREV + CTA */}
      <section className="py-24 bg-[#0d0b1a] border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-24 max-w-5xl mx-auto text-sm font-mono uppercase tracking-widest">
            <Link to="/portfolio/ameli-van-zyl-design" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Ameli Designs
            </Link>
            <Link to="/portfolio/blom-cosmetics" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2">
              BLOM Cosmetics <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-ubuntu font-bold mb-6">Want a system like this?</h2>
            <p className="text-xl text-gray-400 mb-10">Book a free strategy call. We'll scope exactly what your business needs.</p>
            <Button href="/contact" variant="primary" size="xl" className="px-12">
              Book a Free Strategy Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecklessBearPage;
