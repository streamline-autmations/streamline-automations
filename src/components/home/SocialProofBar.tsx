const clients = [
  'BLOM Cosmetics',
  'RecklessBear Apparel',
  'Ameli Studio',
  'NSA Mining',
  'Madiega Trading',
];

export default function SocialProofBar() {
  const items = [...clients, ...clients]; // duplicate for seamless loop

  return (
    <section className="py-4 border-y border-white/5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((client, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-bebas text-xl text-white/40 hover:text-white/75 transition-colors px-8 tracking-widest uppercase cursor-default">
              {client}
            </span>
            <span className="text-[#774CFC]/30 text-xs">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
