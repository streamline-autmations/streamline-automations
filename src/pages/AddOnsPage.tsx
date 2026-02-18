import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

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
  const purpleStyles = 'bg-purple-500/10 text-purple-300 border-purple-500/20';
  const orangeStyles = 'bg-orange-500/10 text-orange-300 border-orange-500/20';
  const whiteStyles = 'bg-white/5 text-white/60 border-white/10';

  const badgeStyles = accentColor === 'purple' ? purpleStyles : accentColor === 'orange' ? orangeStyles : whiteStyles;

  return (
    <motion.div
      variants={fadeUpVariants}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
    >
      {/* Top row: icon + name + price */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl filter drop-shadow-lg">{icon}</span>
          <h3 className="font-semibold text-white text-lg leading-tight">{name}</h3>
        </div>
        <span className={`font-mono text-xs rounded-full px-3 py-1 border ${badgeStyles} whitespace-nowrap`}>
          {price}
        </span>
      </div>

      {/* Description */}
      <p className="text-white/50 text-sm mt-3 leading-relaxed">{description}</p>

      {/* Available on */}
      <div className="mt-4 pt-4 border-t border-white/5">
        <span className="font-mono text-[10px] text-white/30">Available on: {availableOn}</span>
      </div>
    </motion.div>
  );
};

const AddOnsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-white/40 font-mono">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>→</span>
          <span className="text-white">Add-Ons & Branding</span>
        </nav>
      </div>

      {/* HERO SECTION */}
      <section className="py-20 md:py-32 text-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Top Badge */}
          <motion.div variants={fadeUpVariants} className="inline-flex mb-8">
            <span className="border border-purple-500/30 bg-purple-500/10 rounded-full px-4 py-1.5 font-mono text-xs tracking-[3px] uppercase text-purple-400">
              POWER-UPS · ADD-ONS & BRANDING
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUpVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Enhance Your
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Package.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={fadeUpVariants} className="text-white/50 text-lg max-w-xl mx-auto mt-6 leading-relaxed">
            Every add-on is only available when combined with a core package.
            <br className="hidden md:block" />
            Pick what your business actually needs — nothing more.
          </motion.p>
        </motion.div>
      </section>

      {/* SECTION 2 — AUTOMATION ADD-ONS */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Section label */}
          <motion.div variants={fadeUpVariants} className="mb-2">
            <span className="font-mono text-[10px] tracking-[4px] uppercase text-purple-400">
              01 — AUTOMATION
            </span>
          </motion.div>

          {/* Section title */}
          <motion.h2 variants={fadeUpVariants} className="text-3xl font-bold text-white mb-3">
            Automation Add-Ons
          </motion.h2>

          {/* Section subtitle */}
          <motion.p variants={fadeUpVariants} className="text-white/40 text-sm mb-10">
            Extend your system with advanced logic, integrations, and AI.
          </motion.p>

          {/* Grid */}
          <motion.div 
            variants={staggerContainer}
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
      </section>

      {/* SECTION 3 — BRANDING & IDENTITY */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Section label */}
          <motion.div variants={fadeUpVariants} className="mb-2">
            <span className="font-mono text-[10px] tracking-[4px] uppercase text-orange-400">
              02 — BRANDING
            </span>
          </motion.div>

          {/* Section title */}
          <motion.h2 variants={fadeUpVariants} className="text-3xl font-bold text-white mb-3">
            Branding & Identity
          </motion.h2>

          {/* Section subtitle */}
          <motion.p variants={fadeUpVariants} className="text-white/40 text-sm mb-10">
            Look the part before you say a word.
          </motion.p>

          {/* Grid */}
          <motion.div 
            variants={staggerContainer}
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
      </section>

      {/* SECTION 4 — SOCIAL MEDIA */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Section label */}
          <motion.div variants={fadeUpVariants} className="mb-2">
            <span className="font-mono text-[10px] tracking-[4px] uppercase text-white/60">
              03 — SOCIAL MEDIA
            </span>
          </motion.div>

          {/* Section title */}
          <motion.h2 variants={fadeUpVariants} className="text-3xl font-bold text-white mb-3">
            Social Media Setup
          </motion.h2>

          {/* Section subtitle */}
          <motion.p variants={fadeUpVariants} className="text-white/40 text-sm mb-10">
            Show up consistently. Look like you mean it.
          </motion.p>

          {/* Grid */}
          <motion.div 
            variants={staggerContainer}
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
      </section>

      {/* SECTION 5 — PRICING NOTE BANNER */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="bg-orange-500/5 backdrop-blur-md border border-orange-500/20 rounded-2xl p-8 max-w-3xl mx-auto text-center"
        >
          <p className="font-mono text-[10px] tracking-[3px] text-orange-400 uppercase mb-3">
            IMPORTANT NOTE
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            Add-ons are only available when combined with a core package — 
            they are never sold as standalone services. 
            Pricing varies based on complexity and scope. 
            All quotes are confirmed on your free strategy call.
          </p>
        </motion.div>
      </section>

      {/* SECTION 6 — FINAL CTA BANNER */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Subtle orange radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUpVariants} className="text-4xl md:text-5xl font-bold text-white">
              Not sure what you need?
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="text-white/50 text-lg mt-4 max-w-lg mx-auto">
              Book a free 20-minute strategy call. We'll scope your 
              package and add-ons together — no guessing.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-8">
              <Link
                to="/contact"
                className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-full px-8 py-4 text-base transition-all duration-200 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
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
