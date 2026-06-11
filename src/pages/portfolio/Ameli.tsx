import {
  CaseShell,
  CaseHero,
  CaseMetrics,
  CaseModule,
  CaseGallery,
  PhoneShowcase,
  CaseTech,
  CaseNav,
} from '../../components/white/case/CaseKit';

const C = '/assets/clients/ameli';

export default function Ameli() {
  return (
    <CaseShell
      seoTitle="Ameli Designs — Portfolio Site & Lead Automation Case Study"
      seoDescription="A fast, mobile-first portfolio site for a graphic designer, with automated email lead capture wired through n8n. Built and handed over in 4 days."
      seoImage={`${C}/hero.webp`}
      path="/portfolio/ameli"
      clientName="Ameli Designs"
    >
      <CaseHero
        client="Ameli Designs"
        title={
          <>
            A portfolio that{' '}
            <span className="font-['Instrument_Serif'] font-normal italic">feels like her work.</span>
          </>
        }
        summary="A polished, mobile-first portfolio for a graphic designer, with lead capture that runs itself. Every enquiry lands in her inbox the second it comes in. Built and handed over in 4 days."
        tags={['Portfolio Site', 'Lead Automation', 'Mobile-first', '4-day build']}
        accentDot="#9F1239"
        hero={{ src: `${C}/hero.webp`, alt: 'Ameli Designs portfolio', w: 2000, h: 1126, frame: 'plain' }}
      />

      <CaseMetrics
        items={[
          { value: '4 days', label: 'From brief to live' },
          { value: 'Automated', label: 'Every enquiry captured instantly' },
          { value: 'Mobile-first', label: 'Built for how people browse' },
        ]}
      />

      <CaseModule
        index="01"
        eyebrow="The portfolio"
        title="A site that lets her work do the talking."
        body={[
          'An editorial, warm-toned portfolio with a custom palette pulled straight from her own brand. Big imagery, generous spacing, and type that carries her style — it reads like one of her projects, not a template.',
          'Every section quietly pushes a visitor toward the same thing: getting in touch. It looks like a showcase, but it works like a sales tool.',
        ]}
        pills={['Editorial design', 'Custom palette', 'Fast load', 'Built to convert']}
        image={{ src: `${C}/my-work.webp`, alt: 'Ameli Designs work overview', w: 1600, h: 900, url: 'ameli-designs.co.za' }}
      />

      <CaseModule
        index="02"
        eyebrow="The work, framed"
        title="Each project gets the room it deserves."
        body={[
          'Every piece gets its own case page — the Jimmy\'s Burger Bar branding, the Habitat Cosmic Oasis festival, the "Extra" packaging — so a potential client can see the full story behind each job, not just a thumbnail.',
          'It frames her range properly: brand identity, packaging, motion. The kind of work that wins commissions, shown the way it should be.',
        ]}
        pills={['Project case pages', 'Brand identity', 'Packaging', 'Motion']}
        image={{ src: `${C}/jimmys.webp`, alt: "Jimmy's Burger Bar branding case page", w: 1600, h: 900, url: 'ameli-designs.co.za/work' }}
        frame="browser"
        reverse
        tone="surface"
      />

      <CaseModule
        index="03"
        eyebrow="Never miss an enquiry"
        title="The moment someone reaches out, she knows."
        body={[
          'The contact form is wired straight into n8n. The second someone enquires, she gets an instant email notification with all their details — no checking inboxes, no logging into a dashboard, no waiting.',
          'For a creative running her own show, that\'s the difference between landing a commission and losing it to a slow reply. The follow-up is automatic, so the only job left is the design.',
        ]}
        pills={['n8n automation', 'Instant email alert', 'Contact form', 'Zero manual follow-up']}
        image={{ src: `${C}/contact.webp`, alt: 'Ameli Designs contact page', w: 1600, h: 914, url: 'ameli-designs.co.za/contact' }}
      />

      <CaseGallery
        title={<>The work, <span className="font-['Instrument_Serif'] font-normal italic">screen by screen.</span></>}
        items={[
          { src: `${C}/portfolio.webp`, alt: 'Ameli Designs portfolio grid', w: 1600, h: 900, wide: true },
          { src: `${C}/jimmys.webp`, alt: "Jimmy's Burger Bar branding", w: 1600, h: 900 },
          { src: `${C}/extra.webp`, alt: 'Extra packaging design', w: 1600, h: 900 },
          { src: `${C}/my-work.webp`, alt: 'Ameli Designs work overview', w: 1600, h: 900 },
        ]}
      />

      <PhoneShowcase
        title={<>Built mobile-first, <span className="font-['Instrument_Serif'] font-normal italic">because that's where they find her.</span></>}
        phones={[
          { src: `${C}/mobile-home.webp`, alt: 'Ameli Designs home on mobile', w: 720, h: 1566 },
          { src: `${C}/mobile-about.webp`, alt: 'Ameli Designs about on mobile', w: 720, h: 1566 },
          { src: `${C}/mobile-habitat.webp`, alt: 'Habitat Cosmic Oasis case page on mobile', w: 720, h: 1566 },
        ]}
      />

      <CaseTech items={['React', 'TypeScript', 'Tailwind CSS', 'n8n', 'Resend', 'Vercel']} />

      <CaseNav
        prev={{ to: '/portfolio/cw-electronics', label: 'CW Electronics' }}
        next={{ to: '/portfolio/blom-cosmetics', label: 'BLOM Cosmetics' }}
      />
    </CaseShell>
  );
}
