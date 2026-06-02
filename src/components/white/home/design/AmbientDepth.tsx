/**
 * AmbientDepth — a fixed, page-wide depth layer that shows through the
 * transparent white sections: a faint graph-paper grid plus a few soft purple
 * blooms. Sits behind all content so the tinted sections (#FAFAFA / #F0EBFF)
 * read as solid panels over a textured field, giving the page depth instead of
 * flat white. Purely decorative — pointer-events none, reduced-motion safe.
 */
export default function AmbientDepth() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* graph-paper line grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(123,63,228,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(123,63,228,0.045) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(120% 80% at 50% 0%, rgba(0,0,0,0.9), transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(120% 80% at 50% 0%, rgba(0,0,0,0.9), transparent 75%)',
        }}
      />

      {/* soft purple blooms staggered down the page */}
      <div
        className="absolute -left-[10%] top-[6%] h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(123,63,228,0.10), transparent 70%)' }}
      />
      <div
        className="absolute -right-[12%] top-[34%] h-[560px] w-[560px] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(155,95,245,0.09), transparent 70%)' }}
      />
      <div
        className="absolute -left-[8%] top-[64%] h-[480px] w-[480px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(123,63,228,0.08), transparent 70%)' }}
      />
    </div>
  );
}
