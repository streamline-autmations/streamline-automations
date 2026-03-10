import React from 'react';
import { motion } from 'framer-motion';

interface Metric {
  label: string;
  value: string;
  subtext?: string;
}

interface CaseStudyMetricsProps {
  metrics: Metric[];
}

const CaseStudyMetrics: React.FC<CaseStudyMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-ubuntu">
              {metric.value}
            </div>
            <div className="text-sm uppercase tracking-wider text-brand-purple font-semibold mb-1">
              {metric.label}
            </div>
            {metric.subtext && (
              <div className="text-xs text-gray-400">
                {metric.subtext}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CaseStudyMetrics;
