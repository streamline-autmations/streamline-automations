import { ReactNode } from 'react';

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

const variantClasses: Record<Variant, string> = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  ghost: 'btn btn-secondary',
  'ghost-purple': 'btn btn-nav',
};

const sizeClasses: Record<Size, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

export function Button({
  children, variant = 'primary', size = 'md',
  onClick, href, className = '', fullWidth = false,
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'btn-fw' : ''} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

// Default export for backward compatibility
export default Button;
