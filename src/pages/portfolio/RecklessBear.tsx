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

const C = '/assets/clients/recklessbear';

export default function RecklessBear() {
  return (
    <CaseShell
      seoTitle="RecklessBear — Case Study | Streamline Automations"
      seoDescription="A bold custom apparel site, a custom admin + CRM, a 12-stage production tracking pipeline, WhatsApp order automation, and an AI quote engine that qualifies every lead. Active retainer."
      seoImage={`${C}/hero.webp`}
    >
      <CaseHero
        client="RecklessBear"
        title={
          <>
            Custom orders,{' '}
            <span className="font-['Instrument_Serif'] font-normal italic">handled end to end.</span>
          </>
        }
        summary="A bold custom apparel site, an AI quote engine that qualifies every lead, a custom admin + CRM, a 12-stage production pipeline, and WhatsApp order automation — all wired together. I still run it on an active retainer."
        tags={['Custom Website', 'AI Quote Engine', 'Admin + CRM', 'Production Tracking']}
        hero={{ src: `${C}/hero.webp`, alt: 'RecklessBear custom apparel site', w: 2000, h: 1500, frame: 'plain' }}
        accentDot="#E11D2A"
        liveUrl="recklessbear.co.za"
      />

      <CaseMetrics
        items={[
          { value: '12-stage', label: 'Production pipeline, fully tracked' },
          { value: 'AI', label: 'Quote engine qualifies every lead' },
          { value: 'Active', label: 'Ongoing retainer since launch' },
        ]}
      />

      <CaseModule
        index="01"
        eyebrow="The website"
        title="A loud brand site that turns visitors into briefs."
        body={[
          'RecklessBear runs on custom orders, so the site is dark, fast, and unapologetically on-brand — heavy condensed type, bold red accent, built mobile-first.',
          'Every path pushes the visitor toward a structured custom-order request instead of a DM. No "slide into our inbox" — they land on a proper form, and I capture exactly what the team needs to quote.',
        ]}
        pills={['Custom brand design', 'Mobile-first', 'Order request flow', 'WhatsApp']}
        image={{ src: `${C}/home.webp`, alt: 'RecklessBear home page', w: 1600, h: 900, url: 'recklessbear.co.za' }}
      />

      <CaseModule
        index="02"
        eyebrow="The AI quote engine"
        title="An assistant that qualifies the lead before anyone replies."
        body={[
          'This is the standout. An AI assistant answers instantly, 24/7 — it asks the product, the quantity, the design, the timeline, and works out whether the lead is real before a single human touches it.',
          'Once it has the answers, it drops a structured brief straight into admin. The team opens it already knowing what they\'re quoting, so they can price the job without chasing the customer back and forth.',
        ]}
        pills={['Voiceflow', '24/7 capture', 'Lead qualification', 'Structured brief']}
        image={{ src: `${C}/chatbot.webp`, alt: 'RecklessBear AI quote assistant', w: 1600, h: 900, url: 'recklessbear.co.za' }}
        frame="browser"
        reverse
        tone="surface"
      />

      <CaseModule
        index="03"
        eyebrow="Admin, CRM + production"
        title="A command centre that tracks every order to the door."
        body={[
          'Behind the site sits a custom admin: manage orders, keep a real customer database, and run a 12-stage production board that tracks every order from quote all the way to delivery.',
          'As an order moves through the board, the customer gets WhatsApp status updates automatically. Need the data elsewhere? CSV exports are one click. No spreadsheets, no guessing where a job is.',
        ]}
        pills={['Order management', 'Customer database', '12-stage tracking', 'WhatsApp updates']}
        image={{ src: `${C}/admin.webp`, alt: 'RecklessBear admin and production board', w: 1900, h: 858 }}
        frame="plain"
      />

      <CaseGallery
        title={<>The build, <span className="font-['Instrument_Serif'] font-normal italic">screen by screen.</span></>}
        items={[
          { src: `${C}/all-products.webp`, alt: 'RecklessBear all products', w: 1600, h: 900, wide: true },
          { src: `${C}/product.webp`, alt: 'RecklessBear product page', w: 1600, h: 900 },
          { src: `${C}/categories.webp`, alt: 'RecklessBear categories', w: 1600, h: 900 },
          { src: `${C}/forms.webp`, alt: 'RecklessBear custom order form', w: 1600, h: 902 },
        ]}
      />

      <PhoneShowcase
        title={<>Built mobile-first, <span className="font-['Instrument_Serif'] font-normal italic">because that's where they browse.</span></>}
        phones={[
          { src: `${C}/mobile-home.webp`, alt: 'RecklessBear home on mobile', w: 720, h: 1566 },
          { src: `${C}/mobile-product.webp`, alt: 'RecklessBear product on mobile', w: 720, h: 1566 },
          { src: `${C}/mobile-contact.webp`, alt: 'RecklessBear contact on mobile', w: 720, h: 1566 },
        ]}
      />

      <CaseTech items={['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Voiceflow', 'n8n', 'WhatsApp API', 'Trello', 'Vercel']} />

      <CaseNav
        prev={{ to: '/portfolio/blom-cosmetics', label: 'BLOM Cosmetics' }}
        next={{ to: '/portfolio/cw-electronics', label: 'CW Electronics' }}
      />
    </CaseShell>
  );
}
