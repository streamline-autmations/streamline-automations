import PagePlaceholder from '../components/PagePlaceholder';

export default function About() {
  return (
    <PagePlaceholder
      eyebrow="About"
      title={
        <>
          Solo founder. <span className="font-serif italic text-site-accent">Self-taught</span>. Vaal Triangle.
        </>
      }
      blurb="I'm Christiaan. I plan it, build it fast, then keep it running on a retainer. No agency layers, no handoffs — you work directly with the person building the thing."
      phase="Phase 4"
    />
  );
}
