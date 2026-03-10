import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MetricItem {
  value: string;
  label: string;
  suffix?: string;
}

const metrics: MetricItem[] = [
  { value: "127", label: "Businesses Automated", suffix: "+" },
  { value: "4.2", label: "Avg. Daily Time Saved", suffix: "hrs" },
  { value: "94", label: "Leads Captured", suffix: "%" },
  { value: "3.5", label: "Revenue Increase", suffix: "x" },
];

const Counter = ({ value, suffix }: { value: string, suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-20px" });
  
  // Parse number from string (handling decimals)
  const numericValue = parseFloat(value);
  const isDecimal = value.includes('.');
  const decimals = isDecimal ? value.split('.')[1].length : 0;
  
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000; // 2 seconds animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutExpo)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const current = numericValue * ease;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numericValue]);

  return (
    <span ref={nodeRef} className="font-bold text-3xl md:text-4xl text-white">
      {displayValue.toFixed(decimals)}
      <span className="text-brand-purple">{suffix}</span>
    </span>
  );
};

const MetricsTicker: React.FC = () => {
  return (
    <div className="w-full py-8 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <Counter value={metric.value} suffix={metric.suffix} />
              <span className="text-sm text-gray-400 mt-1 font-inter uppercase tracking-wide">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsTicker;
