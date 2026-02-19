import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, stagger, cardItem, viewport } from '../lib/motion';

// Add-on data
const automationAddons = [
  {
    icon: '🤖',
    name: 'Advanced AI Chatbot',
    price: 'R2,000 – R5,000',
    description: 'Multi-step conversation flows, objection handling, lead qualification and custom personality.',
    availableOn: 'Client Magnet, Business Accelerator'
  },
  {
    icon: '📅',
    name: 'Advanced Booking Logic',
    price: 'R1,500 – R3,000',
    description: 'Complex scheduling rules, multi-staff calendars, service-based availability and buffer times.',
    availableOn: 'Client Magnet, Business Accelerator'
  },
  {
    icon: '🗄️',
    name: 'CRM Expansion',
    price: 'R2,000 – R6,000',
    description: 'Full pipeline view, deal stages, client notes, tags, and automated status updates.',
    availableOn: 'All packages'
  },
  {
    icon: '🔍',
    name: 'SEO Upgrade',
    price: 'R2,500 – R8,000',
    description: 'Keyword research, on-page optimisation, schema markup, and Google Search Console setup.',
    availableOn: 'All packages'
  },
  {
    icon: '📧',
    name: 'Email Marketing Setup',
    price: 'R1,500 – R3,500',
    description: 'Welcome sequence, newsletter template, list segmentation and automation triggers.',
    availableOn: 'Client Magnet, Business Accelerator'
  },
  {
    icon: '📊',
    name: 'Analytics Dashboard',
    price: 'R2,000 – R4,000',
    description: 'Custom reporting view showing leads, bookings, conversions and revenue trends.',
    availableOn: 'Online Presence, Client Magnet'
  }
];

const brandingAddons = [
  {
    icon: '✏️',
    name: 'Logo Design',
    price: 'R2,000 – R5,000',
    description: 'Primary logo, alternate version, favicon, and all file formats (SVG, PNG, PDF).',
    availableOn: 'All packages'
  },
  {
    icon: '🎨',
    name: 'Brand Guidelines',
    price: 'R1,500 – R3,000',
    description: 'Color palette, typography system, logo usage rules, and a one-page brand reference sheet.',
    availableOn: 'All packages'
  },
  {
    icon: '🖨️',
    name: 'Business Card Design',
    price: 'R500 – R1,200',
    description: 'Front and back design, print-ready files, digital version for WhatsApp sharing.',
    availableOn: 'All packages'
  },
  {
    icon: '📄',
    name: 'Proposal / Pitch Deck',
    price: 'R2,000 – R4,000',
    description: 'Branded PDF or slide deck for presenting your business, services, or offers to clients.',
    availableOn: 'All packages'
  },
  {
    icon: '🏷️',
    name: 'Brand Stationery Pack',
    price: 'R1,500 – R3,500',
    description: 'Email signature, letterhead, invoice template and document cover — all branded consistently.',
    availableOn: 'All packages'
  }
];

const socialMediaAddons = [
  {
    icon: '📱',
    name: 'Profile Setup & Optimisation',
    price: 'R750 – R1,500',
    description: 'Instagram and LinkedIn bios, profile photos, link-in-bio setup and highlight structure.',
    availableOn: 'All packages'
  },
  {
    icon: '🖼️',
    name: 'Branded Post Templates',
    price: 'R1,500 – R3,000',
    description: '10 Canva templates in your brand colors — tips, promos, quotes, and announcements.',
    availableOn: 'All packages'
  },
  {
    icon: '⭕',
    name: 'Instagram Highlight Covers',
    price: 'R500 – R800',
    description: '5–8 custom branded highlight covers matching your site and brand identity.',
    availableOn: 'All packages'
  },
  {
    icon: '📋',
    name: 'Content Strategy Document',
    price: 'R1,500 – R2,500',
    description: '30-day posting plan, content pillars, caption formulas and hashtag sets for your niche.',
    availableOn: 'All packages'
  },
  {
    icon: '🎬',
    name: 'Reel / Short-Form Templates',
    price: 'R1,000 – R2,000',
    description: '5 CapCut or Canva video templates with your branding for consistent Reels and TikToks.',
    availableOn: 'All packages'
  }
];

interface AddonCardProps {
  icon: string;
  name: string;
  price: string;
  description: string;
  availableOn: string;
  accentColor: 'purple' | 'orange' | 'white';
}

const AddonCard: React.FC<AddonCardProps> = ({ icon, name, price, description, availableOn, accentColor }) => {
  const cardClass = accentColor === 'purple' 
    ? 'card card-sm card-bar card-bar-purple card-h-purple' 
    : accentColor === 'orange' 
    ? 'card card-sm card-bar card-bar-orange card-h-orange' 
    : 'card card-sm card-bar card-bar-white card-h';

  const badgeStyles = accentColor === 'purple' 
    ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' 
    : accentColor === 'orange' 
    ? 'bg-orange-500/10 text-orange-300 border-orange-500/20' 
    : 'bg-white/5 text-white/60 border-white/10';

  return (
    <motion.div
      variants={cardItem}
      className={cardClass}
    >
      {/* Top row: icon + name + price */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl filter drop-shadow-lg">{icon}</span>
          <h3 className="h3">{name}</h3>
        </div>
        <span className={`font-mono text-xs rounded-full px-3 py-1 border ${badgeStyles} whitespace-nowrap`}>
          {price}
        </span>
      </div>

      {/* Description */}
      <p className="body-text mt-3">{description}</p>

      {/* Available on */}
      <div className="mt-4 pt-4 border-t border-white/5">
        <span className="font-mono text-[10px] text-white/30">Available on: {availableOn}</span>
      </div>
    </motion.div>
  );
};

const AddOnsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-white/40 font-mono">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>→</span>
          <span className="text-white">Add-Ons & Branding</span>
        </nav>
      </div>

      {/* HERO SECTION - s */}
      <section className="s">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {/* Top Badge */}
            <motion.div variants={fadeUp} className="inline-flex mb-8">
              <span className="border border-purple-500/30 bg-purple-500/10 rounded-full px-4 py-1.5 font-mono text-xs tracking-[3px] uppercase text-purple-400">
                POWER-UPS · ADD-ONS & BRANDING
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="h1">
              Enhance Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Package.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={fadeUp} className="body-text-bright max-w-xl mx-auto mt-6">
              Every add-on is only available when combined with a core package.
              <br className="hidden md:block" />
              Pick what your business actually needs — nothing more.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — AUTOMATION ADD-ONS - s-panel s-line-purple */}
      <section className="s s-panel s-line-purple">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {/* Section label */}
            <motion.div variants={fadeUp} className="mb-2">
              <span className="label">01 — AUTOMATION</span>
            </motion.div>

            {/* Section title */}
            <motion.h2 variants={fadeUp} className="h2 mb-3">
            Automation Add-Ons
            </motion.h2>

            {/* Section subtitle */}
            <motion.p variants={fadeUp} className="body-text mb-10">
              Extend your system with advanced logic, integrations, and AI.
            </motion.p>

            {/* Grid */}
            <motion.div 
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {automationAddons.map((addon, index) => (
                <AddonCard
                  key={index}
                  icon={addon.icon}
                  name={addon.name}
                  price={addon.price}
                  description={addon.description}
                  availableOn={addon.availableOn}
                  accentColor="purple"
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — BRANDING & IDENTITY - s-line-orange */}
      <section className="s s-line-orange">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {/* Section label */}
            <motion.div variants={fadeUp} className="mb-2">
              <span className="label" style={{ color: 'rgba(249,115,22,0.7)' }}>02 — BRANDING</span>
            </motion.div>

            {/* Section title */}
            <motion.h2 variants={fadeUp} className="h2 mb-3">
              Branding & Identity
            </motion.h2>

            {/* Section subtitle */}
            <motion.p variants={fadeUp} className="body-text mb-10">
              Look the part before you say a word.
            </motion.p>

            {/* Grid */}
            <motion.div 
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {brandingAddons.map((addon, index) => (
                <AddonCard
                  key={index}
                  icon={addon.icon}
                  name={addon.name}
                  price={addon.price}
                  description={addon.description}
                  availableOn={addon.availableOn}
                  accentColor="orange"
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — SOCIAL MEDIA - s-panel s-line-white */}
      <section className="s s-panel s-line-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {/* Section label */}
            <motion.div variants={fadeUp} className="mb-2">
              <span className="label" style={{ color: 'rgba(255,255,255,0.5)' }}>03 — SOCIAL MEDIA</span>
            </motion.div>

            {/* Section title */}
            <motion.h2 variants={fadeUp} className="h2 mb-3">
              Social Media Setup
            </motion.h2>

            {/* Section subtitle */}
            <motion.p variants={fadeUp} className="body-text mb-10">
              Show up consistently. Look like you mean it.
            </motion.p>

            {/* Grid */}
            <motion.div 
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {socialMediaAddons.map((addon, index) => (
                <AddonCard
                  key={index}
                  icon={addon.icon}
                  name={addon.name}
                  price={addon.price}
                  description={addon.description}
                  availableOn={addon.availableOn}
                  accentColor="white"
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — PRICING NOTE BANNER - s-line-orange */}
      <section className="s s-line-orange">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            className="card max-w-3xl mx-auto text-center"
          >
            <p className="font-mono text-[10px] tracking-[3px] text-orange uppercase mb-3">
              IMPORTANT NOTE
            </p>
            <p className="body-text">
              Add-ons are only available when combined with a core package — 
              they are never sold as standalone services. 
              Pricing varies based on complexity and scope. 
              All quotes are confirmed on your free strategy call.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 — FINAL CTA BANNER - s-panel s-line-orange */}
      <section className="s s-panel s-line-orange">
        {/* Subtle orange radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="h2">
              Not sure what you need?
            </motion.h2>
            <motion.p variants={fadeUp} className="body-text mt-4 max-w-lg mx-auto">
              Book a free 20-minute strategy call. We'll scope your 
              package and add-ons together — no guessing.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                to="/contact"
                className="btn btn-primary btn-lg"
              >
                Book a Free Strategy Call →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AddOnsPage;
