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

const C = '/assets/clients/blom';

export default function BlomCosmetics() {
  return (
    <CaseShell
      seoTitle="BLOM Cosmetics — E-commerce & Automation Case Study"
      seoDescription="A full e-commerce store, custom admin dashboard, BLOM Academy course platform, and email + WhatsApp automation — unified on one Supabase backend. PayFast live."
      seoImage={`${C}/hero.webp`}
      path="/portfolio/blom-cosmetics"
      clientName="BLOM Cosmetics"
    >
      <CaseHero
        client="BLOM Cosmetics"
        title={
          <>
            An entire beauty business,{' '}
            <span className="font-['Instrument_Serif'] font-normal italic">one system.</span>
          </>
        }
        summary="A full e-commerce store, a custom admin dashboard, the BLOM Academy course platform, and email + WhatsApp automation — all running on one Supabase backend. I still maintain it on an active retainer."
        tags={['E-commerce', 'Custom Admin', 'Course Platform', 'WhatsApp + Email']}
        hero={{ src: `${C}/hero.webp`, alt: 'BLOM Cosmetics storefront', w: 2000, h: 1500, frame: 'plain' }}
        liveUrl="blom-cosmetics.co.za"
      />

      <CaseMetrics
        items={[
          { value: '1 backend', label: 'Store, admin & academy, unified' },
          { value: '24/7', label: 'WhatsApp + email order automation' },
          { value: 'Live', label: 'PayFast + ShipLogic in production' },
        ]}
      />

      <CaseModule
        index="01"
        eyebrow="The storefront"
        title="A shop that loads fast and never oversells."
        body={[
          'A clean React storefront with real product photography, instant cart updates, and a checkout flow built mobile-first. Real ZAR pricing, real PayFast and Payflex at the till.',
          'Stock syncs in real time against the backend, so customers never hit an "out of stock" surprise at checkout — and BLOM never sells something they can\'t ship.',
        ]}
        pills={['React + Vite', 'Real-time stock', 'Mobile checkout', 'PayFast + Payflex']}
        image={{ src: `${C}/shop.webp`, alt: 'BLOM Cosmetics shop page', w: 1600, h: 900, url: 'blom-cosmetics.co.za/shop' }}
      />

      <CaseModule
        index="02"
        eyebrow="The admin OS"
        title="A command centre BLOM actually owns."
        body={[
          'Instead of paying monthly for a generic dashboard, BLOM got a custom admin: edit prices, descriptions and images live, manage orders, and watch sales analytics in one place.',
          'Low-stock alerts and order statuses surface the moment they matter — no spreadsheets, no plugins, no platform fees.',
        ]}
        pills={['Live product editing', 'Order management', 'Sales analytics', 'Owner-editable']}
        image={{ src: `${C}/admin-analytics.webp`, alt: 'BLOM admin analytics dashboard', w: 1600, h: 900 }}
        frame="browser"
        reverse
        tone="surface"
      />

      <CaseModule
        index="03"
        eyebrow="BLOM Academy"
        title="A course platform, built into the same login."
        body={[
          'BLOM teaches as well as sells, so the Academy lives inside the same platform — students browse courses, work through lessons, and pick up their materials without ever leaving the site.',
          'On the admin side it\'s the same story: schedule courses, track students, and upload materials from the dashboard BLOM already knows.',
        ]}
        pills={['Course player', 'Student management', 'Lesson materials', 'One account']}
        image={{ src: `${C}/academy-lesson.webp`, alt: 'BLOM Academy course lesson', w: 1600, h: 900, url: 'blom-cosmetics.co.za/academy' }}
      />

      <CaseModule
        index="04"
        eyebrow="The automation layer"
        title="The work that happens while BLOM sleeps."
        body={[
          'Every order kicks off a chain automatically: a branded PDF receipt, an order-ready email, and a WhatsApp confirmation straight to the customer — wired through n8n.',
          'It\'s the invisible part of the build, and it\'s the part that quietly saves hours every single week.',
        ]}
        pills={['WhatsApp Business API', 'Branded email', 'PDF receipts', 'n8n']}
        image={{ src: `${C}/whatsapp.webp`, alt: 'BLOM WhatsApp order confirmation', w: 711, h: 530 }}
        frame="browser"
        reverse
        tone="surface"
      />

      <CaseGallery
        title={<>The build, <span className="font-['Instrument_Serif'] font-normal italic">screen by screen.</span></>}
        items={[
          { src: `${C}/categories.webp`, alt: 'BLOM home categories', w: 1600, h: 900, wide: true },
          { src: `${C}/product.webp`, alt: 'BLOM product page', w: 1600, h: 900 },
          { src: `${C}/courses.webp`, alt: 'BLOM courses listing', w: 1600, h: 900 },
          { src: `${C}/admin-edit.webp`, alt: 'BLOM admin product editor', w: 1600, h: 900 },
          { src: `${C}/admin-orders.webp`, alt: 'BLOM admin orders', w: 1600, h: 972 },
          { src: `${C}/account.webp`, alt: 'BLOM customer account', w: 1600, h: 900 },
          { src: `${C}/academy-login.webp`, alt: 'BLOM Academy login', w: 1600, h: 900 },
        ]}
      />

      <PhoneShowcase
        title={<>Built mobile-first, <span className="font-['Instrument_Serif'] font-normal italic">because that's where they shop.</span></>}
        phones={[
          { src: `${C}/mobile-shop.webp`, alt: 'BLOM shop on mobile', w: 720, h: 1560 },
          { src: `${C}/mobile-academy.webp`, alt: 'BLOM Academy on mobile', w: 720, h: 1560 },
        ]}
      />

      <CaseTech items={['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'n8n', 'PayFast', 'ShipLogic', 'WhatsApp API', 'Resend', 'Vercel']} />

      <CaseNav
        prev={{ to: '/portfolio/ameli', label: 'Ameli Designs' }}
        next={{ to: '/portfolio/recklessbear', label: 'RecklessBear' }}
      />
    </CaseShell>
  );
}
