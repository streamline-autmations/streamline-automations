import { ReactNode } from 'react';

type BadgeVariant = 'purple' | 'orange' | 'white' | 'green';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const styles: Record<BadgeVariant, string> = {
  purple: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
  orange: 'bg-orange-500/10 text-orange-300 border-orange-500/25',
  white:  'bg-white/6 text-white/60 border-white/12',
  green:  'bg-green-500/10 text-green-300 border-green-500/25',
};

export function Badge({ children, variant = 'purple', className = '' }: BadgeProps) {
  return (
    <span className={`
      inline-flex items-center
      font-mono text-[10px] tracking-[3px] uppercase
      px-3 py-1.5 rounded-full
      border
      ${styles[variant]}
      ${className}
    `}>
      {children}
    </span>
  );
}

// Default export for backward compatibility
export default Badge;
