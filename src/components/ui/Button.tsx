import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost' | 'ghost-purple';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  href?: string;
  className?: string;
  fullWidth?: boolean;
}

const base = `
  inline-flex items-center justify-center gap-2
  font-semibold tracking-wide rounded-full
  transition-all duration-200 ease-out
  cursor-pointer select-none whitespace-nowrap
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
`;

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4   text-base',
};

const variants: Record<Variant, string> = {
  // Solid orange — primary CTA
  primary: `
    bg-[#f97316] text-white
    hover:bg-[#ea6c0e]
    hover:shadow-[0_0_24px_rgba(249,115,22,0.4),0_0_48px_rgba(249,115,22,0.15)]
    active:scale-[0.97]
  `,
  // White ghost — like Featured Works cards
  secondary: `
    bg-transparent text-white/70
    border border-white/12
    hover:text-white
    hover:border-white/25
    hover:bg-white/5
    hover:shadow-[0_0_16px_rgba(255,255,255,0.06)]
    active:scale-[0.97]
  `,
  // Pure ghost — minimal, text only with subtle border
  ghost: `
    bg-transparent text-white/50
    border border-white/8
    hover:text-white/80
    hover:border-white/15
    hover:bg-white/[0.03]
    active:scale-[0.97]
  `,
  // Purple ghost — for purple accent sections
  'ghost-purple': `
    bg-transparent text-purple-400
    border border-purple-500/25
    hover:text-purple-300
    hover:border-purple-500/50
    hover:bg-purple-500/[0.07]
    hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]
    active:scale-[0.97]
  `,
};

export function Button({
  children, variant = 'primary', size = 'md',
  onClick, href, className = '', fullWidth = false,
}: ButtonProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap:   { scale: 0.97 },
    transition: { duration: 0.15 },
  };

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} className={classes} {...motionProps}>
      {children}
    </motion.button>
  );
}

// Default export for backward compatibility
export default Button;
