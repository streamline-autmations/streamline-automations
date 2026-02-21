import React from 'react';
import { TrendingUp, ShieldCheck, Zap } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  return (
    <section className="section section-panel section-line">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="h2 mb-6">
              Built for ROI, Not Just Looks
            </h2>
            <p className="body max-w-3xl mx-auto">
              Real business value. Measurable impact.
            </p>
          </div>

          <div className="grid-3">
            {/* Card 1 - Reduce Operational Costs */}
            <div className="card card-bar card-interactive card-interactive-purple group">
              <div className="mb-6">
                <div className="icon-box group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="h3 mb-3">
                  Reduce Operational Costs
                </h3>
              </div>

              <p className="body">
                Automate repetitive admin to cut overhead by up to 40%.
              </p>
            </div>

            {/* Card 2 - Enterprise Reliability */}
            <div className="card card-bar-white card-interactive card-interactive-white group">
              <div className="mb-6">
                <div className="icon-box group-hover:scale-110 transition-transform" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <ShieldCheck className="w-7 h-7 text-white" />
                </div>
                <h3 className="h3 mb-3">
                  Enterprise Reliability
                </h3>
              </div>

              <p className="body">
                99.9% Uptime with Supabase & n8n. Your business never goes offline.
              </p>
            </div>

            {/* Card 3 - Launch in Weeks */}
            <div className="card card-bar-orange card-interactive card-interactive-orange group">
              <div className="mb-6">
                <div className="icon-box bg-[color:var(--orange-dim)] border-[color:var(--orange-border)] text-[color:var(--orange)] group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="h3 mb-3">
                  Launch in Weeks
                </h3>
              </div>

              <p className="body">
                We deploy custom infrastructure faster than traditional agencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
