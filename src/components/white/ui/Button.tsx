import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-[15px]',
};

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-[#7B3FE4] text-white hover:bg-[#6930D0] shadow-[0_1px_2px_rgba(123,63,228,0.18)]',
  secondary:
    'border border-[#E8E8EC] text-[#0A0A0F] bg-white hover:border-[#D4D4DA] hover:bg-[#FAFAFA]',
  ghost:
    'text-[#0A0A0F] hover:bg-[#F5F5F7]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  onClick,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-['DM_Sans'] font-medium rounded-full " +
    'transition-colors duration-200 min-h-[44px] whitespace-nowrap select-none cursor-pointer';

  const classes = `${base} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  const inner = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </motion.span>
  );

  if (!href) return inner;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={href} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}
