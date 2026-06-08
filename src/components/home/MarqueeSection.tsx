const CLIENTS = [
  'BLOM Cosmetics',
  'RecklessBear Apparel',
  'Ameli Designs',
  'NSA Mining',
  'JJ Glasswork',
  'Tuscany SA',
  'African Nomad',
];

export default function MarqueeSection() {
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <div className="relative overflow-hidden py-6 border-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div
        className="flex"
        style={{
          width: 'max-content',
          animation: 'marquee-text 35s linear infinite',
        }}
      >
        {items.map((client, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-6 whitespace-nowrap"
            style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.18em', textTransform: 'uppercase' }}
          >
            {client}
            <span style={{ color: 'rgba(119,76,252,0.35)' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
