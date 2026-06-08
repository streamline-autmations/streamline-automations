import { ReactNode } from 'react';

type TagVariant = 'ink' | 'white' | 'outline' | 'outline-dark';

// Small mono pill label (Cuberto "DESIGN COURSE" style).
const TAG: Record<TagVariant, string> = {
  ink: 'bg-site-ink text-white', // on light sections
  white: 'bg-white text-site-ink', // on dark sections
  outline: 'border border-site-line text-site-text-secondary', // on light
  'outline-dark': 'border border-white/25 text-white/80', // on dark
};

/** Pill tag for section eyebrows / labels. */
export default function Tag({
  children,
  variant = 'outline',
  className = '',
}: {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] ${TAG[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
