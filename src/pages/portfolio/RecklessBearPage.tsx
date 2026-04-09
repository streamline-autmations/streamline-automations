import React, { useState } from 'react';
import { ShoppingBag, LayoutDashboard, Bot, CheckCircle, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import { fadeUp, stagger, cardItem, viewport } from '../../lib/motion';
import Button from '../../components/ui/Button';
import SectionDivider from '../../components/ui/SectionDivider';
import CaseStudyMetrics from '../../components/portfolio/CaseStudyMetrics';
import { portfolioProjects } from '../../data/portfolio';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImgPlaceholder = ({ label, aspect = "aspect-video" }: { label: string; aspect?: string }) => (
  <div className={`w-full ${aspect} rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center`}>
    <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
      {label}
    </span>
  </div>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeAdminTab, setActiveAdminTab] = useState('Leads');
  const project = portfolioProjects.find(p => p.id === 'recklesbear');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const adminTabs = ['Leads', 'Jobs', 'Stock', 'WhatsApp', 'Analytics'];

  return (
    <div className="min-h-screen bg-[#0d0b1a] pt-20 md:pt-24 text-white font-inter">
      <SEO 
        title="RecklessBear Case Study"
        description="How we built a custom clothing brand website with AI lead qualification and an automated admin system."
      />
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
          <motion.div variants={fadeUp} className="max-w-[100vw] w-full mx-auto px-0 md:px-4">
            <div className="relative w-full aspect-[16/9] flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772612036/Recklessbear_Home_Page_Mockup_gzktrh.png" 
                alt="Reckless Bear Homepage Mockup" 
                className="w-full h-full object-contain scale-[1.6] md:scale-100"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <SectionDivider />

      {/* SECTION 2 — OVERVIEW STATS */}
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
                  Manual quote follow-up taking 4 hours/day
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500/50">✕</span>
                  30% of leads ignored due to capacity
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500/50">✕</span>
                  Limited visibility on sales pipeline
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
                  Automated quotes sent in 4 minutes/day
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500">✓</span>
                  94% lead capture rate (24/7 coverage)
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500">✓</span>
                  100% visibility via custom admin dashboard
                </li>
              </ul>
            </div>
          </div>
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
              className="w-full"
            >
              <div className="relative w-full aspect-[16/9] flex items-center justify-center">
                <div className="absolute inset-0 bg-orange-500/5 blur-[50px] z-0"></div>
                <img 
                  src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772612035/Reckless_long_scroll_uwe4be.png" 
                  alt="Reckless Bear Long Scroll Mockup" 
                  className="w-full h-full object-contain relative z-10 scale-[1.4]"
                />
              </div>
            </motion.div>
          </div>

          {/* SPLIT BLOCK B */}
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div 
              className="order-2 md:order-1 flex items-center justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
            >
              {/* Icon Card replacing the placeholder */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors w-full max-w-sm shadow-[0_0_60px_rgba(119,76,252,0.1)]">
                <div className="w-16 h-16 bg-brand-purple/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-brand-purple/20">
                  <MessageSquare className="w-8 h-8 text-brand-purple" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Live Chat & Support</h3>
                <p className="text-gray-400 text-sm">Instant connection with customers for real-time assistance.</p>
              </div>
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
                <div className="h-32 bg-brand-orange/5 rounded-lg border border-brand-orange/20 flex items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-brand-orange/40" />
                </div>
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
                 <div className="h-32 bg-brand-orange/5 rounded-lg border border-brand-orange/20 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-brand-orange/40" />
                 </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — THE ADMIN SYSTEM (Simplified) */}
      <section className="py-24 relative overflow-hidden bg-[#0d0b1a]">
        <div className="absolute inset-0 bg-brand-dark/50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-ubuntu font-bold text-white mb-6">
              Backend Administration
            </h2>
            <p className="text-gray-300 font-inter text-lg leading-relaxed">
              A powerful, custom-built admin panel allows the Reckless Bear team to manage orders, track enquiries, and update product details without needing any technical knowledge.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Order Management</h3>
                <p className="text-gray-400 text-sm">View, track, and update custom order statuses in real-time.</p>
             </div>
             
             <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" x2="20" y1="8" y2="14"/><line x1="23" x2="17" y1="11" y2="11"/></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Customer Database</h3>
                <p className="text-gray-400 text-sm">Securely store and manage customer details and history.</p>
             </div>
             
             <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Export & Reports</h3>
                <p className="text-gray-400 text-sm">Download order data for accounting and shipping processing.</p>
             </div>
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
            <Button href="/contact" variant="primary" size="xl" className="px-12" trackingLocation="portfolio">
              Book a Free Strategy Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecklessBearPage;
