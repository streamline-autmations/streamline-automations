import { ReactNode } from 'react';

type TagVariant = 'ink' | 'white' | 'outline' | 'outline-dark';

// Plain label, same font as everything else — no pill, no mono, no grey.
const TAG: Record<TagVariant, string> = {
  ink: 'text-site-ink', // on light sections
  white: 'text-white', // on dark sections
  outline: 'text-site-ink', // on light sections
  'outline-dark': 'text-white', // on dark sections
};

/** Section label — sits above a headline, or as a chip in a tag cloud. */
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
    <span className={`inline-block text-[15px] font-medium tracking-[-0.01em] ${TAG[variant]} ${className}`}>
      {children}
    </span>
  );
}
