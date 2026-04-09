import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '../../data/portfolio';
import { springStagger, bentoCard, viewport } from '../../lib/motion';

// Real testimonials + 2 placeholder slots
const allTestimonials = [
  ...testimonials.map(t => ({ ...t, placeholder: false })),
  {
    quote: 'Review coming soon — ask us for a reference call.',
    company: 'Client · 2025',
    placeholder: true,
  },
  {
    quote: 'Review coming soon — ask us for a reference call.',
    company: 'Client · 2025',
    placeholder: true,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-2">
          <span className="label">What Clients Say</span>
        </div>
        <h2 className="h2 text-center mb-12">
          Don't take our word for it.
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={springStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {allTestimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={bentoCard}
              className={`relative bg-white/5 backdrop-blur-md border rounded-2xl p-7 flex flex-col gap-5 transition-colors duration-300 ${
                t.placeholder
                  ? 'border-white/5 opacity-40'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Corner accent */}
              {!t.placeholder && (
                <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-[#774CFC]/60 to-transparent" />
              )}

              <Quote size={18} className="text-[#774CFC]/50 flex-shrink-0" />

              <p className={`text-base leading-relaxed flex-1 ${t.placeholder ? 'text-white/30 italic' : 'text-white/80'}`}>
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: t.placeholder ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #774CFC, #F26A3D)' }}
                >
                  {t.placeholder ? '?' : t.company[0]}
                </div>
                <span className={`text-sm font-mono ${t.placeholder ? 'text-white/20' : 'text-white/50'}`}>
                  {t.company}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
