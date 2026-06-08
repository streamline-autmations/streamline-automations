import PagePlaceholder from '../components/PagePlaceholder';

export default function Contact() {
  return (
    <PagePlaceholder
      eyebrow="Let's talk"
      title={
        <>
          Book a <span className="font-serif italic text-site-accent">free</span> call.
        </>
      }
      blurb="Tell me what you're building. WhatsApp, email, or the form — whatever's easiest. Mon–Fri 8:00–17:00, Sat 9:00–13:00."
      phase="Phase 4"
      cta={false}
    />
  );
}
