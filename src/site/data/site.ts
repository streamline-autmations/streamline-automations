/**
 * Single source of truth for v2 site constants — contact details, nav, logo,
 * social links. Change a number once, here, and it's correct everywhere.
 */

// WhatsApp — confirmed 2026-06-08 by Christiaan: +27 68 757 9940 (local 068 757 9940).
const WHATSAPP_DISPLAY = '068 757 9940';
const WHATSAPP_E164 = '27687579940';

export const CONTACT = {
  email: 'christiaan@streamline-automations.co.za',
  whatsappDisplay: WHATSAPP_DISPLAY,
  whatsappUrl: `https://wa.me/${WHATSAPP_E164}`,
  instagram: '@streamline_automations',
  instagramUrl: 'https://instagram.com/streamline_automations',
  location: 'Vaal Triangle · Gauteng · South Africa',
  hours: [
    ['Mon – Fri', '8:00 – 17:00'],
    ['Saturday', '9:00 – 13:00'],
    ['Sunday', 'Closed'],
  ] as const,
  cipc: '2025/069691/07',
} as const;

export const SOCIALS = {
  instagram: 'https://instagram.com/streamline_automations',
  facebook: 'https://www.facebook.com/people/Streamline-Automations/61587739632609/',
  linkedin: 'https://www.linkedin.com/in/christiaan-steffen-703805177/',
} as const;

// Black wordmark — sits on white nav/footer as-is; invert to white on ink.
export const LOGO_URL =
  'https://res.cloudinary.com/dtkiwrm6u/image/upload/v1780412723/Streamline-black-word-logo_rpzvgh.png';

export const PRIMARY_CTA = { label: 'Book a Free Call', to: '/contact' } as const;
export const SECONDARY_CTA = { label: 'See the work', to: '/portfolio' } as const;

/** Services for the nav dropdown. */
export const SERVICES = [
  { label: 'Web Design & Creation', href: '/websites', desc: 'Sites that convert. Built in days.' },
  { label: 'Systems & Automation', href: '/systems', desc: 'Build the system once.' },
  { label: 'Hosting, Email & Maintenance', href: '/hosting', desc: 'Your foundation. Handled.' },
] as const;

/** Primary nav (desktop right + mobile overlay). */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Web Design', href: '/websites' },
  { label: 'Systems', href: '/systems' },
  { label: 'Hosting', href: '/hosting' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
] as const;

/** Footer nav columns. */
export const FOOTER_NAV: Array<[string, string]> = [
  ['Web Design', '/websites'],
  ['Systems', '/systems'],
  ['Hosting', '/hosting'],
  ['Portfolio', '/portfolio'],
  ['About', '/about'],
  ['Contact', '/contact'],
];
