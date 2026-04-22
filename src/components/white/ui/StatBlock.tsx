interface Props {
  value: string;
  label: string;
  align?: 'left' | 'center';
}

export default function StatBlock({ value, label, align = 'left' }: Props) {
  return (
    <div className={`flex flex-col gap-1 ${align === 'center' ? 'items-center text-center' : ''}`}>
      <span
        className="text-[32px] md:text-[40px] font-['DM_Sans'] font-semibold
                   text-[#0A0A0F] tracking-[-0.02em] leading-none"
      >
        {value}
      </span>
      <span className="text-sm font-['DM_Sans'] text-[#6B6B7A]">{label}</span>
    </div>
  );
}
