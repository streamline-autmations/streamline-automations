/**
 * Restaurant Direct (/restaurant-direct) — page content in one place.
 *
 * Scope mirrors the V1 offer template (Streamline_Automations_Restaurant_Direct_
 * Offer_Template.pdf). Don't add a claim here the proposal doesn't cover: no
 * payments, delivery, POS, self-service menu editing or invented results.
 * No prices on this page — they're quoted per restaurant (pricing lives on /hosting).
 *
 * Screens come from the Restaurant Direct demo build (Jimmy's real design and
 * menu, fictional guests/orders, visible Demo strip).
 */

const A = '/assets/restaurant-direct';

/**
 * The embedded live demo (components/site/RestaurantLiveDemo).
 *
 * `restaurant-direct-demo` is the SEPARATE Vercel project built with
 * `npm run build:demo` — fictional guests/orders, no Supabase, its own navy
 * DEMO strip, staff console already signed in as a fictional staff member.
 * NEVER point this at jimmys-burger-bar.vercel.app: that is Jimmy's real site
 * and real staff console.
 */
export const RD_DEMO = {
  origin: 'https://restaurant-direct-demo.vercel.app',
  label: 'restaurant-direct-demo.vercel.app',
  customerPath: '/',
  staffPath: '/admin',
} as const;

export const RD_ASSETS = {
  mobileHome: `${A}/mobile-home.webp`,
  mobileMenu: `${A}/mobile-menu.webp`,
  mobileOrder: `${A}/mobile-order.webp`,
  mobileBooking: `${A}/mobile-booking.webp`,
  mobileConfirmation: `${A}/mobile-confirmation.webp`,
  mobileStaffToday: `${A}/mobile-staff-today.webp`,
  staffToday: `${A}/staff-today.webp`,
  staffOrders: `${A}/staff-orders.webp`,
  staffBookings: `${A}/staff-bookings.webp`,
  staffCustomers: `${A}/staff-customers.webp`,
} as const;

/** The 60–75s walkthrough. `src: null` renders the poster placeholder — drop the
 *  exported MP4 into /assets/videos/work/ and set src + poster when it's ready. */
export const RD_WALKTHROUGH: { src: string | null; poster: string } = {
  src: null,
  poster: RD_ASSETS.staffToday,
};

export const RD_FRICTION = [
  {
    title: 'The menu is a PDF.',
    body: 'Or a photo on Instagram. On a phone, it’s a pinch-and-zoom job.',
  },
  {
    title: 'Bookings arrive everywhere.',
    body: 'DMs, WhatsApp, phone calls and a note next to the till.',
  },
  {
    title: 'Orders sit in the chat.',
    body: 'Collection orders share a WhatsApp thread with everything else.',
  },
  {
    title: 'Nobody sees the whole day.',
    body: 'There’s no single place showing what’s booked and what’s cooking.',
  },
] as const;

/** Customer ↔ restaurant, step for step (offer template, “The customer journey”). */
export const RD_JOURNEY = [
  {
    no: '01',
    customer: { title: 'Finds you', body: 'A clear mobile site with your brand, hours and location.' },
    restaurant: 'They know what you offer and how to reach you.',
  },
  {
    no: '02',
    customer: { title: 'Browses the menu', body: 'Then books a table or orders for collection.' },
    restaurant: 'The request comes straight to you.',
  },
  {
    no: '03',
    customer: { title: 'Sends the request', body: 'Name, contact details, the time and what they want.' },
    restaurant: 'A proper booking or order record is saved.',
  },
  {
    no: '04',
    customer: { title: 'Gets a confirmation', body: 'On screen, with a reference number.' },
    restaurant: 'You get the full request and can update its status.',
  },
  {
    no: '05',
    customer: { title: 'Hears back', body: 'As you confirm the booking or move the order along.' },
    restaurant: 'Your team takes it through to done.',
  },
] as const;

export const RD_CUSTOMER_FEATURES = [
  'A mobile-first site on your own brand',
  'A menu that’s easy to read on a phone',
  'Hours, location and Google Maps directions',
  'Table bookings with date, time, guests and notes',
  'Collection orders with a requested pickup time',
  'A confirmation with a reference number',
] as const;

export const RD_CUSTOMER_SCREENS = [
  { src: RD_ASSETS.mobileHome, alt: 'Jimmy’s Burger Bar home page on a phone', aspect: '390/844' },
  { src: RD_ASSETS.mobileMenu, alt: 'Jimmy’s food and drinks menu on a phone', aspect: '390/844' },
  { src: RD_ASSETS.mobileOrder, alt: 'Ordering for collection from the Jimmy’s menu on a phone', aspect: '390/844' },
  { src: RD_ASSETS.mobileBooking, alt: 'Table booking form on a phone', aspect: '390/844' },
  { src: RD_ASSETS.mobileConfirmation, alt: 'Order placed confirmation with a reference and requested time', aspect: '390/844' },
] as const;

export const RD_STAFF_FEATURES = [
  'Today’s bookings and new orders at a glance',
  'Confirm or cancel bookings in one tap',
  'Items, total, collection time and contact details on every order',
  'Simple guest history — who came, when, how often',
  'A secure login for your team',
] as const;

export const RD_ORDER_STATUSES = ['New', 'Accepted', 'Preparing', 'Ready', 'Completed'] as const;
export const RD_BOOKING_STATUSES = ['Pending', 'Confirmed'] as const;

export const RD_INCLUDED = [
  {
    title: 'Website',
    items: [
      'Custom mobile-first design on your brand',
      'Menu, hours, contact details and location',
      'Google Maps directions and social links',
    ],
  },
  {
    title: 'Direct bookings',
    items: [
      'Booking form with date, time, guests and notes',
      'Notification to you, confirmation to the customer',
      'Pending, confirmed and cancelled statuses',
    ],
  },
  {
    title: 'Collection ordering',
    items: [
      'Menu, cart and a requested collection time',
      'The full order to you, a confirmation to the customer',
      'Status from new through to completed',
      'WhatsApp handoff where it suits your setup',
    ],
  },
  {
    title: 'Staff dashboard',
    items: [
      'Secure login for your team',
      'Today’s bookings, upcoming bookings and new orders',
      'Simple customer history',
    ],
  },
  {
    title: 'Looked after',
    items: [
      'Hosting and SSL',
      'Routine maintenance and security monitoring',
      'Launch, team handover and agreed support',
    ],
  },
] as const;

/** Two setups as stacked rows — scope only, never prices side by side. */
export const RD_SETUPS = [
  {
    title: 'Restaurant Website',
    fit: 'For restaurants that mainly need one clear place online.',
    scope: 'Mobile-first site, menu, hours, directions, contact and socials. Hosted and looked after.',
  },
  {
    title: 'Restaurant Direct',
    fit: 'For restaurants that want customers to book and order straight through them.',
    scope: 'Everything in the website, plus direct bookings, collection ordering and the staff dashboard.',
  },
] as const;

export const RD_PROCESS = [
  { no: '01', title: 'Confirm', body: 'I confirm the setup, scope, pricing and launch window.' },
  { no: '02', title: 'Supply', body: 'You send the menu, prices, hours, logo, photos and account access.' },
  { no: '03', title: 'Build', body: 'I set up the site, bookings, ordering and dashboard.' },
  { no: '04', title: 'Review', body: 'You give one round of feedback. I make the fixes.' },
  { no: '05', title: 'Launch', body: 'Final checks, go live, and I show your team how it works.' },
] as const;

export const RD_FAQ = [
  {
    question: 'Does it replace my POS?',
    answer:
      'No. Restaurant Direct handles your website, bookings and collection requests. Your till and POS carry on as normal.',
  },
  {
    question: 'Do I have to drop Uber Eats or Mr D?',
    answer:
      'No, keep them. This gives customers who already know you a direct way to book and order for collection.',
  },
  {
    question: 'Can customers pay online?',
    answer:
      'Not in the first version. Orders are requests you confirm, and customers pay when they collect. Online payments can be added later.',
  },
  {
    question: 'Do you do delivery?',
    answer:
      'Not in the first version. It’s built around bookings and collection. Delivery zones and fees can be looked at once that’s running smoothly.',
  },
  {
    question: 'Can I still take orders on WhatsApp?',
    answer: 'Yes. Where it suits your setup, orders can hand off to WhatsApp too.',
  },
  {
    question: 'Can I update the menu myself?',
    answer:
      'Not in the first version. Send me the changes and I’ll make them, within the support included in your monthly service.',
  },
  {
    question: 'Does it work with Dineplan?',
    answer:
      'It doesn’t connect to Dineplan or replace it. If you need advanced table allocation, keep Dineplan — I’ll tell you on the review whether a simple booking form is enough for you.',
  },
  {
    question: 'Can I use my own domain?',
    answer:
      'Yes. If you already have a website, I’ll look at it on the review and recommend the simplest route from there.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Usually 7–10 business days once I have your menu, content, account access and approvals.',
  },
  {
    question: 'Is hosting included?',
    answer:
      'Yes. Hosting, SSL, routine maintenance, security monitoring and agreed support are part of the monthly service.',
  },
  {
    question: 'Is there a contract?',
    answer:
      'The monthly service has a three-month minimum. After that it’s one calendar month’s written notice.',
  },
  {
    question: 'Can more be added later?',
    answer:
      'Yes. Online payments, delivery, menu management, loyalty and multi-branch can all be added once the first version is live.',
  },
] as const;
