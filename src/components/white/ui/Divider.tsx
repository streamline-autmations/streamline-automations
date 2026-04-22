interface Props {
  className?: string;
  dashed?: boolean;
}

export default function Divider({ className = '', dashed = false }: Props) {
  if (dashed) {
    return (
      <div
        className={`h-px w-full border-t border-dashed border-[#E8E8EC] ${className}`}
        aria-hidden="true"
      />
    );
  }
  return <div className={`h-px w-full bg-[#E8E8EC] ${className}`} aria-hidden="true" />;
}
