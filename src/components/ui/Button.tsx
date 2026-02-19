import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'orange' | 'purple' | 'glass' | 'ghost';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  to,
  href,
  onClick,
  className = '',
  type = 'button',
  size = 'md',
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-ubuntu font-bold transition-all duration-300 cursor-pointer';
  
  const sizeClasses = {
    sm: 'px-4 py-3 text-sm min-h-[44px]',
    md: 'px-6 py-4 text-sm min-h-[48px]',
    lg: 'px-8 py-4 text-base min-h-[52px]',
  };
  
  const variantClasses = {
    primary: 'bg-white/5 border border-white/10 text-white hover:bg-brand-purple hover:border-brand-purple',
    secondary: 'bg-brand-glow hover:bg-brand-purple text-white tech-glow tech-glow-hover',
    outline: 'bg-transparent border-2 border-brand-purple text-brand-purple hover:bg-brand-purple/10 hover:border-brand-glow',
    orange: 'bg-brand-orange text-white hover:brightness-110 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(249,115,22,0.4),0_0_40px_rgba(249,115,22,0.15)]',
    purple: 'bg-brand-purple text-white hover:brightness-110 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.4),0_0_40px_rgba(139,92,246,0.15)]',
    glass: 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
    ghost: 'text-gray-300 hover:text-white border border-transparent hover:border-brand-purple/50',
  };
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} btn-interactive`;
  
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;