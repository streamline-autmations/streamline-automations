interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p className={`
      font-mono text-[10px] tracking-[4px] uppercase
      text-purple-400/80
      mb-3
      ${className}
    `}>
      {children}
    </p>
  );
}

// Default export for backward compatibility
export default SectionLabel;
