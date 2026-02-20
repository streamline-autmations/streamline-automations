import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Headset, Building2, ShoppingBag, Briefcase } from 'lucide-react';

const benefits = [
  {
    icon: <Clock className="h-8 w-8 text-accent" />,
    title: 'Save 15+ Hours Weekly',
    text: 'Automate repetitive tasks and customer interactions'
  },
  {
    icon: <Users className="h-8 w-8 text-brand-purple" />,
    title: '3X More Qualified Leads',
    text: 'AI-powered lead qualification and nurturing'
  },
  {
    icon: <Headset className="h-8 w-8 text-accent" />,
    title: '24/7 Customer Support',
    text: 'Instant responses, even after hours'
  }
];

const industries = [
  { icon: <Building2 className="h-6 w-6" />, name: 'Professional Services', id: 'professional-services' },
  { icon: <ShoppingBag className="h-6 w-6" />, name: 'E-commerce', id: 'e-commerce' },
  { icon: <Briefcase className="h-6 w-6" />, name: 'Agencies', id: 'agencies' }
];

const testimonials = [
  {
    quote: "90% faster response time. Our AI assistant handles customer inquiries automatically, giving our team back hours every day to focus on strategy.",
    author: "Sarah Chen",
    role: "Operations Director, TechFlow",
    metric: "90% Faster Response Time"
  },
  {
    quote: "3X more qualified leads. We're booking 3x more sales calls without adding staff — their AI qualification system is a game changer.",
    author: "Michael Rodriguez",
    role: "Sales Manager, GrowthForce",
    metric: "3X More Qualified Leads"
  }
];

const IntroMessage: React.FC = () => {
  const navigate = useNavigate();

  const handleIndustryClick = (industryId: string) => {
    navigate(`/services#${industryId}`);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute -right-40 top-1/3 w-[800px] h-[800px] bg-gradient-to-l from-brand-purple/20 to-transparent rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-ubuntu font-bold mb-12 px-2 leading-tight">
            We build AI-powered systems that do the work for you – 
            <span className="text-accent"> while you sleep.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16 px-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass-card p-8 md:p-10 tech-glow-hover group">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-[color:var(--surface)] border border-white/20 group-hover:border-brand-purple/50 transition-colors">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-ubuntu font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-300 font-inter leading-relaxed">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Help Section */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-ubuntu font-bold mb-12 text-white px-2">
            Who We Help
          </h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4">
            {industries.map((industry, index) => (
              <button
                key={index}
                onClick={() => handleIndustryClick(industry.id)}
                className="glass-card px-6 md:px-8 py-4 md:py-5 rounded-full flex items-center hover:bg-white/10 tech-glow-hover transition-all duration-300 text-base md:text-lg min-h-[56px] group"
              >
                <div className="text-brand-purple group-hover:text-accent transition-colors">
                  {industry.icon}
                </div>
                <span className="ml-3 md:ml-4 text-gray-200 font-inter">{industry.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-ubuntu font-bold mb-12 text-center text-white px-2">
            Client Success Stories
          </h3>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 px-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-8 md:p-10 tech-glow-hover group">
                <div className="text-accent font-ubuntu font-bold text-lg mb-6">{testimonial.metric}</div>
                <p className="text-gray-300 mb-8 font-inter text-lg leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <div className="font-ubuntu font-bold text-white text-lg">{testimonial.author}</div>
                  <div className="text-gray-400 font-inter">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroMessage;
