interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className = '' }: Props) {
  return (
    <span
      className={`inline-block text-[11px] font-['DM_Sans'] font-medium uppercase
                  tracking-[0.14em] text-[#9E9EA8] ${className}`}
    >
      {children}
    </span>
  );
}
