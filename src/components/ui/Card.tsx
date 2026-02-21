import { ReactNode } from 'react';

type AccentColor = 'none' | 'purple' | 'orange' | 'white';

interface CardProps {
  children: ReactNode;
  accent?: AccentColor;
  hover?: boolean;       // enables lift + border glow on hover
  topBar?: boolean;      // 2px accent line at top
  className?: string;
  onClick?: () => void;
}

const topBarClass = (accent: AccentColor) => {
  if (accent === 'white') return 'card-bar-white'
  if (accent === 'orange') return 'card-bar-orange'
  if (accent === 'purple') return 'card-bar'
  return ''
}

const hoverAccentClass = (accent: AccentColor) => {
  if (accent === 'purple') return 'card-interactive-purple'
  if (accent === 'orange') return 'card-interactive-orange'
  if (accent === 'white') return 'card-interactive-white'
  return ''
}

export function Card({
  children, accent = 'none', hover = true,
  topBar = false, className = '', onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`${topBar ? topBarClass(accent) : ''} card ${hover ? `card-interactive ${hoverAccentClass(accent)}` : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

// Default export for backward compatibility
export default Card;
