/**
 * Single source of truth for v2 site constants, offer structure, pricing,
 * project proof and contact details.
 */

const WHATSAPP_DISPLAY = '068 757 9940';
const WHATSAPP_E164 = '27687579940';

export const CONTACT = {
  email: 'christiaan@streamline-automations.co.za',
  whatsappDisplay: WHATSAPP_DISPLAY,
  whatsappUrl: `https://wa.me/${WHATSAPP_E164}`,
  instagram: '@streamline_automations',
  instagramUrl: 'https://instagram.com/streamline_automations',
  location: 'Vaal Triangle / Gauteng / South Africa',
  hours: [
    ['Mon - Fri', '8:00 - 17:00'],
    ['Saturday', '9:00 - 13:00'],
    ['Sunday', 'Closed'],
  ] as const,
  cipc: '2025/069691/07',
} as const;

export const SOCIALS = {
  instagram: 'https://instagram.com/streamline_automations',
  facebook: 'https://www.facebook.com/people/Streamline-Automations/61587739632609/',
  tiktok: 'https://www.tiktok.com/@streamline_automations',
  youtube: 'https://www.youtube.com/@streamline_automations',
  linkedin: 'https://www.linkedin.com/in/christiaan-steffen-703805177/',
} as const;

export const PRIMARY_CTA = { label: 'Book a Free Call', href: '/contact', to: '/contact' } as const;
export const SECONDARY_CTA = { label: 'See real work', href: '/portfolio', to: '/portfolio' } as const;

export const OFFER_PILLARS = [
  {
    no: '01',
    label: 'Websites',
    title: 'Websites',
    href: '/websites',
    description: 'Clean professional websites that turn visitors into enquiries.',
    tags: ['Business websites', 'Service websites', 'E-commerce', 'Landing pages', 'Portfolio sites'],
  },
  {
    no: '02',
    label: 'Systems',
    title: 'Systems & Automation',
    href: '/systems',
    description: 'Booking flows, smart forms and dashboards that reduce manual admin.',
    tags: [
      'Booking flows',
      'Smart forms',
      'Simple CRM capture',
      'WhatsApp/email notifications',
      'Admin dashboards',
      'Order/lead tracking',
    ],
  },
  {
    no: '03',
    label: 'Care',
    title: 'Hosting & Maintenance',
    href: '/hosting',
    description: 'The ongoing support that keeps the site live, secure and updated.',
    tags: ['Hosting', 'Domain/DNS help', 'Email setup', 'SSL', 'Updates', 'Minor changes', 'Support retainers'],
  },
] as const;

export const NAV_LINKS = [
  { label: 'Work', href: '/portfolio' },
  { label: 'Pricing', href: '/hosting' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const FOOTER_NAV: Array<[string, string]> = [
  ['Work', '/portfolio'],
  ['Pricing', '/hosting'],
  ['About', '/about'],
  ['Contact', '/contact'],
  ['Websites', '/websites'],
  ['Systems', '/systems'],
];

export const PACKAGES = [
  {
    name: 'Online Presence',
    price: 'From R6,500',
    bestFor: 'A clean professional website.',
    timeframe: '3-5 working days',
    popular: false,
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Contact form',
      'Basic SEO setup',
      'Google Maps/social links',
      'Fast performance',
      '3-5 working days',
    ],
  },
  {
    name: 'Client Magnet',
    price: 'From R12,000',
    bestFor: 'Websites that capture leads and bookings.',
    timeframe: '5-7 working days',
    popular: true,
    features: [
      'Everything in Online Presence',
      'Booking integration',
      'Smart enquiry forms',
      'Lead capture into simple CRM',
      'Email/WhatsApp notifications',
      'Booking confirmations/reminders',
      'Basic follow-ups',
      '5-7 working days',
    ],
  },
  {
    name: 'Business Accelerator',
    price: 'From R25,000 setup + monthly support',
    bestFor: 'Businesses that need a system, not just a site.',
    timeframe: '7-10 working days setup',
    popular: false,
    features: [
      'Everything in Client Magnet',
      'Dashboard/admin visibility',
      'Lead/order/booking tracking',
      'Editable site sections where practical',
      'Advanced follow-up logic',
      'Monthly optimisation',
      'Priority support',
      '7-10 working days setup',
    ],
  },
] as const;

export const MAINTENANCE_PLANS = {
  floor: 'From R499/month',
  description:
    'Hosting checks, updates, backups and support — scoped to your site once it\'s live. Tell me what you need and I\'ll put together a plan.',
} as const;

export const RENT_TO_OWN = {
  title: 'Rent-to-own is still available',
  note: 'No upfront build fee. Pay monthly. Own the site outright after 18 months.',
  floor: 'From R699/month',
} as const;

export type ProjectMedia = {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  mobileFallback?: string;
  alt: string;
};

export const FEATURED_PROJECTS = [
  {
    no: '01',
    name: 'BLOM Cosmetics',
    href: '/work/blom',
    label: 'E-commerce / Academy / Automation',
    outcome: 'A store, course platform, admin system and WhatsApp workflow in one build.',
    tags: ['E-commerce', 'Course platform', 'Admin dashboard', 'PayFast', 'n8n'],
    media: {
      type: 'image',
      src: '/assets/clients/blom/mockup-1.webp',
      mobileFallback: '/assets/clients/blom/mobile-shop.webp',
      alt: 'BLOM Cosmetics e-commerce and academy screens',
    },
  },
  {
    no: '02',
    name: 'CW Electronics',
    href: '/work/cw-electronics',
    label: 'E-commerce / Custom Admin',
    outcome: 'A product catalogue and owner-editable store for a Johannesburg electronics importer.',
    tags: ['Product catalogue', 'Retail/wholesale', 'Admin dashboard', 'PayFast'],
    media: {
      type: 'image',
      src: 'https://res.cloudinary.com/dbhiu7lv0/image/upload/v1782914584/3_phone_abyyj6.png',
      mobileFallback: 'https://res.cloudinary.com/dbhiu7lv0/image/upload/v1782914584/3_phone_abyyj6.png',
      alt: 'CW Electronics e-commerce website interface',
    },
  },
  {
    no: '03',
    name: 'Ameli Designs',
    href: '/work/ameli',
    label: 'Portfolio / Lead Capture',
    outcome: 'A fast portfolio site with automated email lead capture.',
    tags: ['Portfolio site', 'Lead capture', 'Email automation'],
    media: {
      type: 'image',
      src: '/assets/clients/ameli/mockup-1.webp',
      mobileFallback: '/assets/clients/ameli/mobile-home.webp',
      alt: 'Ameli Designs portfolio website mockup',
    },
  },
  {
    no: '04',
    name: 'RecklessBear',
    href: '/work/recklessbear',
    label: 'Site / CRM / AI Quote Flow',
    outcome: 'A custom apparel system with CRM, production tracking and quote automation.',
    tags: ['CRM', 'Production tracking', 'AI quote engine', 'WhatsApp'],
    media: {
      type: 'image',
      src: '/assets/clients/recklessbear/mockup-3phone.webp',
      mobileFallback: '/assets/clients/recklessbear/mobile-home.webp',
      alt: 'RecklessBear website and automation screens',
    },
  },
] as const;

export const PROOF_ITEMS = [
  { name: 'BLOM Cosmetics', tags: ['E-commerce', 'Course platform', 'Admin dashboard'] },
  { name: 'CW Electronics', tags: ['Product catalogue', 'PayFast', 'Owner admin'] },
  { name: 'RecklessBear', tags: ['CRM', 'Automation workflow', 'AI quote flow'] },
  { name: 'Ameli Designs', tags: ['Portfolio', 'Lead capture'] },
  { name: 'JJ Glasswork', tags: ['Service site', 'Email leads'] },
] as const;
