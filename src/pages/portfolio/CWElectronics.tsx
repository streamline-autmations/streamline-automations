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

const C = '/assets/clients/cw-electronics';

export default function CWElectronics() {
  return (
    <CaseShell
      seoTitle="CW Electronics — E-commerce & Custom Admin Case Study"
      seoDescription="A full e-commerce store and custom owner-editable admin for a Johannesburg electronics importer — 700+ products live in under two weeks, retail + wholesale pricing, PayFast live."
      seoImage={`${C}/hero.webp`}
      path="/portfolio/cw-electronics"
      clientName="CW Electronics"
    >
      <CaseHero
        client="CW Electronics"
        title={
          <>
            700+ products, live in{' '}
            <span className="font-['Instrument_Serif'] font-normal italic">under two weeks.</span>
          </>
        }
        summary="A full e-commerce store with retail and wholesale pricing, stock analytics, and a fully owner-editable admin — built for a Johannesburg-based electronics importer. PayFast live, and I still maintain it on an active retainer."
        tags={['E-commerce', 'Retail + Wholesale', 'Custom Admin', 'PayFast']}
        hero={{ src: `${C}/hero.webp`, alt: 'CW Electronics storefront', w: 1800, h: 1012, frame: 'browser', url: 'cw-electronics.co.za' }}
        accentDot="#C8102E"
        liveUrl="cw-electronics.co.za"
      />

      <CaseMetrics
        items={[
          { value: '700+', label: 'Products live in under 2 weeks' },
          { value: '2-tier', label: 'Retail + wholesale pricing' },
          { value: 'Live', label: 'PayFast checkout in production' },
        ]}
      />

      <CaseModule
        index="01"
        eyebrow="The storefront"
        title="A fast, dark storefront for a huge catalogue."
        body={[
          'A premium commerce UI in deep navy and red, built to carry 700+ products without ever feeling heavy. Sharp category browsing, clean product pages, and a checkout that just works.',
          'It loads fast and stays fast — because when someone is scrolling a catalogue this big, a slow shop is a closed tab.',
        ]}
        pills={['700+ products', 'Fast browse', 'Category nav', 'Mobile-first']}
        image={{ src: `${C}/home-2.webp`, alt: 'CW Electronics home page', w: 1600, h: 900, url: 'cw-electronics.co.za' }}
      />

      <CaseModule
        index="02"
        eyebrow="Retail + wholesale"
        title="One store, two markets."
        body={[
          'CW sells to walk-in retail customers and bulk wholesale buyers from the same catalogue, so the store shows each one the right price automatically — no separate site, no second login.',
          'There\'s a nudge baked in: add a few more units and you unlock wholesale pricing. It\'s a simple mechanic that quietly lifts basket size, and it suits an importer model perfectly.',
        ]}
        pills={['Dual pricing', 'Wholesale unlock', 'Importer model', 'Stock analytics']}
        image={{ src: `${C}/categories.webp`, alt: 'CW Electronics categories', w: 1600, h: 900, url: 'cw-electronics.co.za' }}
        frame="browser"
        reverse
        tone="surface"
      />

      <CaseModule
        index="03"
        eyebrow="Owner-editable"
        title="Built so the owner runs it himself."
        body={[
          'No developer in the loop for day-to-day work. The owner adds products, edits pricing, manages stock, and works through orders straight from the admin — all of it his to control.',
          'That\'s how 700+ products went live in under two weeks: I built the system, handed over the keys, and the catalogue filled itself out. No platform fees, no waiting on me.',
        ]}
        pills={['Owner-editable', 'Bulk catalogue', 'Order management', 'No platform fees']}
        image={{ src: `${C}/product.webp`, alt: 'CW Electronics product page', w: 1600, h: 900, url: 'cw-electronics.co.za' }}
      />

      <CaseGallery
        title={<>The build, <span className="font-['Instrument_Serif'] font-normal italic">screen by screen.</span></>}
        items={[
          { src: `${C}/shop.webp`, alt: 'CW Electronics shop page', w: 1600, h: 900, wide: true },
          { src: `${C}/categories.webp`, alt: 'CW Electronics categories', w: 1600, h: 900 },
          { src: `${C}/product.webp`, alt: 'CW Electronics product page', w: 1600, h: 900 },
          { src: `${C}/home-2.webp`, alt: 'CW Electronics home page', w: 1600, h: 900 },
        ]}
      />

      <PhoneShowcase
        title={<>Built mobile-first, <span className="font-['Instrument_Serif'] font-normal italic">because that's where they buy.</span></>}
        phones={[
          { src: `${C}/mobile-home.webp`, alt: 'CW Electronics home on mobile', w: 591, h: 1280 },
          { src: `${C}/mobile-product.webp`, alt: 'CW Electronics product on mobile', w: 591, h: 1280 },
          { src: `${C}/mobile-categories.webp`, alt: 'CW Electronics categories on mobile', w: 591, h: 1280 },
        ]}
      />

      <CaseTech items={['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PayFast', 'Vercel']} />

      <CaseNav
        prev={{ to: '/portfolio/recklessbear', label: 'RecklessBear' }}
        next={{ to: '/portfolio/ameli', label: 'Ameli Designs' }}
      />
    </CaseShell>
  );
}
