import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { trackCtaClick } from '../../lib/analytics';

type Variant = 'primary' | 'secondary' | 'ghost' | 'ghost-purple' | 'orange' | 'ghost-orange';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  href?: string;
  className?: string;
  fullWidth?: boolean;
  trackingLocation?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variantClasses: Record<Variant, string> = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  ghost: 'btn btn-secondary',
  'ghost-purple': 'btn btn-nav',
  orange: 'btn btn-orange',
  'ghost-orange': 'btn btn-ghost-orange',
};

const sizeClasses: Record<Size, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

export function Button({
  children, variant = 'primary', size = 'md',
  onClick, href, className = '', fullWidth = false, trackingLocation,
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'btn-fw' : ''} ${className}`.trim();

  const handleClick = () => {
    if (trackingLocation) {
      const buttonText = typeof children === 'string' ? children : 'button';
      trackCtaClick(buttonText, trackingLocation);
    }
    onClick?.();
  };

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={classes} onClick={handleClick}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={classes}>
      {children}
    </button>
  );
}

// Default export for backward compatibility
export default Button;
