import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users, Award, ArrowRight } from 'lucide-react';
import SEO from '../components/seo/SEO';
import DotGridBackground from '../components/ui/DotGridBackground';
import { Link } from 'react-router-dom';

const Results: React.FC = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "127+",
      label: "Businesses Automated",
      description: "From startups to established enterprises"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "94%",
      label: "Average Lead Capture Rate",
      description: "Leads captured automatically, 24/7"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "4.2hrs",
      label: "Avg. Daily Time Saved",
      description: "Per client, every single day"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "3x",
      label: "Average ROI",
      description: "Within first 90 days"
    }
  ];

  const industries = [
    "E-commerce & Retail",
    "Professional Services",
    "Healthcare & Wellness",
    "Food & Beverage",
    "Real Estate",
    "Creative Agencies"
  ];

  return (
    <div className="min-h-screen bg-[#0d0b1a] pt-20 md:pt-24 font-inter text-white relative">
      <SEO 
        title="Our Results"
        description="See the impact we've made for 127+ businesses. Average 94% lead capture rate and 3x ROI."
      />
      <DotGridBackground />

      {/* Hero */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block border border-brand-purple/30 bg-brand-purple/10 rounded-full px-4 py-1.5 font-mono text-xs tracking-[3px] uppercase text-brand-purple">
                PROVEN RESULTS
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-ubuntu font-bold mb-8">
              Numbers that{' '}
              <span className="bg-gradient-to-r from-brand-purple to-brand-orange bg-clip-text text-transparent">
                speak for themselves
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We've helped over 127 businesses automate their operations and scale without burnout. 
              Here's what our clients achieve on average.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-brand-purple/30 transition-colors group"
              >
                <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-purple group-hover:bg-brand-purple/20 transition-colors">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-ubuntu font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-brand-orange mb-2">
                  {stat.label}
                </div>
                <p className="text-sm text-gray-400">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-ubuntu font-bold mb-4">
              Industries We've Transformed
            </h2>
            <p className="text-gray-400">
              Our automation solutions work across diverse business types
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <span
                key={index}
                className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-gray-300 hover:border-brand-purple/30 hover:text-white transition-colors"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Highlights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-ubuntu font-bold mb-4">
              Featured Results
            </h2>
            <p className="text-gray-400">
              Real outcomes from real projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                client: "RecklessBear",
                result: "3x Quote Conversion",
                description: "Automated quote system now captures 94% of leads automatically",
                link: "/portfolio/recklesbear"
              },
              {
                client: "BLOM Cosmetics",
                result: "15hrs/week Saved",
                description: "Real-time inventory sync eliminates manual stock checks",
                link: "/portfolio/blom-cosmetics"
              },
              {
                client: "Ameli Van Zyl",
                result: "0.5s Load Time",
                description: "Portfolio loads instantly, converting visitors to clients",
                link: "/portfolio/ameli-van-zyl-design"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-orange/30 transition-colors"
              >
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  {item.client}
                </div>
                <div className="text-2xl font-ubuntu font-bold text-white mb-3">
                  {item.result}
                </div>
                <p className="text-gray-400 mb-6">
                  {item.description}
                </p>
                <Link 
                  to={item.link}
                  className="inline-flex items-center text-brand-orange hover:text-white transition-colors"
                >
                  View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="container relative z-10 text-center max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-ubuntu font-bold mb-6">
            Ready to add to these numbers?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Book your free automation audit and see how much you could be saving.
          </p>
          <Link 
            to="/contact" 
            className="btn btn-orange btn-xl"
          >
            Get Your Free Audit
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Results;
