import { ReactNode } from 'react';

type BadgeVariant = 'purple' | 'orange' | 'white' | 'green';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const styles: Record<BadgeVariant, string> = {
  purple: 'bg-[color:var(--purple-dim)] text-[color:var(--text-high)] border-[color:var(--purple-border)]',
  orange: 'bg-[color:var(--orange-dim)] text-[color:var(--text-high)] border-[color:var(--orange-border)]',
  white:  'bg-[color:var(--surface)] text-[color:var(--text-mid)] border-[color:var(--border)]',
  green:  'bg-[color:var(--surface)] text-[color:var(--text-mid)] border-[color:var(--border)]',
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
