import PagePlaceholder from '../components/PagePlaceholder';

export default function Portfolio() {
  return (
    <PagePlaceholder
      eyebrow="Selected work"
      title={
        <>
          Real builds for real <span className="font-serif italic text-site-accent">businesses</span>.
        </>
      }
      blurb="BLOM Cosmetics, RecklessBear, CW Electronics, Ameli Designs — and more. E-commerce, admin systems, automation and portfolio sites, all live."
      phase="Phase 4"
    />
  );
}
