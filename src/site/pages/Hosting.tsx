import PagePlaceholder from '../components/PagePlaceholder';

export default function Hosting() {
  return (
    <PagePlaceholder
      eyebrow="Hosting, Email & Maintenance"
      title={
        <>
          Your foundation. <span className="font-serif italic text-site-accent">Handled</span>.
        </>
      }
      blurb="Hosting, email, SSL, domains and updates — plus the rent-to-own model: no upfront cost, pay monthly, own it after 18 months. Full pricing lives here."
      phase="Phase 4"
    />
  );
}
