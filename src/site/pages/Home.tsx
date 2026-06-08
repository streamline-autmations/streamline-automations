import PagePlaceholder from '../components/PagePlaceholder';

export default function Home() {
  return (
    <PagePlaceholder
      eyebrow="Web design + automation · South Africa"
      title={
        <>
          Websites and systems that run the{' '}
          <span className="font-serif italic text-site-accent">business</span> while you sleep.
        </>
      }
      blurb="Web design and automation for South African businesses. I build the website, the systems behind it, and the automations that do the busywork — so you don't have to."
      phase="Phase 3"
    />
  );
}
