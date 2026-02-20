import React from 'react';
import { Quote } from 'lucide-react';

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

const Testimonials: React.FC = () => {
  return (
    <section className="section section-line-white">
      <div className="container">
        <div className="max-w-4xl mx-auto mb-12 md:mb-16 text-center">
          <h2 className="h2 mb-6">
            Client Success Stories
          </h2>
          <p className="body">
            Real feedback from businesses we've transformed.
          </p>
        </div>

        <div className="grid-2 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card card-bar-white card-interactive group"
            >
              <div className="flex items-start mb-6">
                <div className="icon-box" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="text-accent font-ubuntu font-bold text-lg mb-6">
                {testimonial.metric}
              </div>

              <p className="body mb-8 font-inter text-lg leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center">
                <div className="w-1 h-12 bg-gradient-to-b from-brand-purple to-transparent rounded-full mr-4"></div>
                <div>
                  <div className="font-ubuntu font-bold text-white text-lg">
                    {testimonial.author}
                  </div>
                  <div className="text-[color:var(--text-low)] font-inter">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
