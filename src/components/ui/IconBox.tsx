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
  purple: '',
  orange: '',
  white: 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.12)] text-white/80',
};

export function IconBox({ children, accent = 'purple', size = 'md' }: IconBoxProps) {
  return (
    <div className={`
      icon-box
      flex items-center justify-center
      ${sizes[size]} ${iconSizes[size]} ${accents[accent]}
    `}>
      {children}
    </div>
  );
}

// Default export for backward compatibility
export default IconBox;
