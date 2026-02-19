import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type AccentColor = 'none' | 'purple' | 'orange' | 'white';

interface CardProps {
  children: ReactNode;
  accent?: AccentColor;
  hover?: boolean;       // enables lift + border glow on hover
  topBar?: boolean;      // 2px accent line at top
  className?: string;
  onClick?: () => void;
}

const accentBorder: Record<AccentColor, string> = {
  none:   'border-white/8',
  purple: 'border-purple-500/20',
  orange: 'border-orange-500/20',
  white:  'border-white/15',
};

const accentHoverBorder: Record<AccentColor, string> = {
  none:   'hover:border-white/16',
  purple: 'hover:border-purple-500/45',
  orange: 'hover:border-orange-500/45',
  white:  'hover:border-white/30',
};

const accentHoverGlow: Record<AccentColor, string> = {
  none:   '',
  purple: 'hover:shadow-[0_0_32px_rgba(139,92,246,0.18),0_8px_32px_rgba(0,0,0,0.4)]',
  orange: 'hover:shadow-[0_0_32px_rgba(249,115,22,0.18),0_8px_32px_rgba(0,0,0,0.4)]',
  white:  'hover:shadow-[0_0_24px_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.4)]',
};

const accentTopBar: Record<AccentColor, string> = {
  none:   'from-white/10 to-white/5',
  purple: 'from-purple-500 to-purple-400',
  orange: 'from-orange-500 to-orange-400',
  white:  'from-white/40 to-white/20',
};

export function Card({
  children, accent = 'none', hover = true,
  topBar = false, className = '', onClick,
}: CardProps) {
  const hoverClasses = hover
    ? `${accentHoverBorder[accent]} ${accentHoverGlow[accent]} hover:-translate-y-1`
    : '';

  return (
    <motion.div
      onClick={onClick}
      className={`
        relative
        bg-white/[0.04] backdrop-blur-md
        border ${accentBorder[accent]}
        rounded-2xl overflow-hidden
        transition-all duration-250 ease-out
        shadow-[0_4px_24px_rgba(0,0,0,0.35)]
        ${hoverClasses}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Optional accent top bar */}
      {topBar && (
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accentTopBar[accent]}`} />
      )}
      {children}
    </motion.div>
  );
}

// Default export for backward compatibility
export default Card;
