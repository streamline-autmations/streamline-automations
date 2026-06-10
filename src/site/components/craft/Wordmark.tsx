/**
 * Wordmark — the "Streamline" text logo. One shared component so the header,
 * footer, and mobile menu always match. DM Sans extrabold, tight tracking,
 * with a small purple full-stop accent (easily removable: delete the <span>).
 *
 * tone="ink"   → near-black text, for white surfaces (default)
 * tone="light" → off-white text, for ink surfaces
 * Size is controlled by the caller via className (text-[...px] / clamp).
 */
export default function Wordmark({
  tone = 'ink',
  className = '',
}: {
  tone?: 'ink' | 'light';
  className?: string;
}) {
  return (
    <span
      className={`select-none font-sans font-extrabold leading-none tracking-[-0.02em] ${
        tone === 'ink' ? 'text-site-ink' : 'text-site-text-on-dark'
      } ${className}`}
    >
      Streamline<span className="text-site-accent">.</span>
    </span>
  );
}
