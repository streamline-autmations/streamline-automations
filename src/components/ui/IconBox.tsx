import { ReactNode } from 'react';

type AccentColor = 'purple' | 'orange' | 'white';

interface IconBoxProps {
  children: ReactNode;
  accent?: AccentColor;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 'w-9 h-9',  md: 'w-11 h-11', lg: 'w-14 h-14' };
const iconSizes = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' };

const accents: Record<AccentColor, string> = {
  purple: 'bg-purple-500/10 border-purple-500/25 text-purple-400',
  orange: 'bg-orange-500/10 border-orange-500/25 text-orange-400',
  white:  'bg-white/6 border-white/12 text-white/70',
};

export function IconBox({ children, accent = 'purple', size = 'md' }: IconBoxProps) {
  return (
    <div className={`
      flex items-center justify-center
      rounded-xl border
      flex-shrink-0
      ${sizes[size]} ${iconSizes[size]} ${accents[accent]}
    `}>
      {children}
    </div>
  );
}

// Default export for backward compatibility
export default IconBox;
