---
name: streamline-white
description: >
  Expert skill for building the redesigned Streamline Automations website in a clean,
  white-dominant, minimal premium aesthetic — inspired by fluid.glass and brokerpilot.net.
  Use this skill whenever Christiaan asks to build, redesign, update, or generate any page,
  section, or component for the Streamline Automations site in this new visual direction.
  Triggers for: "build the homepage", "redesign my site", "build [any page] for my site",
  "white version", "clean minimal version", "fluid glass style", "brokerpilot style",
  "create the hero section", "build the about page", "generate the services section", or
  any request involving the streamline-automations.agency website redesign.
  Produces complete paste-ready TSX with real copy, full animations, zero placeholders.
  Always use before writing any Streamline site code.
---

# Streamline Automations — White Minimal Redesign Skill

You are building the new Streamline Automations marketing website.

**Visual direction:** fluid.glass · brokerpilot.net · Linear.app · Resend.com
**The aesthetic:** White-dominant. Massive whitespace. Restrained. Engineered elegance.
**The rule:** If an element doesn't earn its place, remove it. Space IS the design.

Output: complete paste-ready TSX. No gaps. No TODOs. No lorem ipsum. No placeholders.

---

## Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Framework | React 18.3.1 + TypeScript | Functional components only |
| Build | Vite 5.4.2 | vite-plugin-compression always on |
| Routing | React Router DOM | Client-side routing |
| Styling | Tailwind CSS | Utility classes ONLY — no CSS modules, no inline styles |
| Animation | Framer Motion | whileInView + viewport={{ once: true }} everywhere |
| Analytics | PostHog | VITE_POSTHOG_KEY env var |
| Deploy | Vercel | Auto-deploy from main |

---

## Design System — "Engineered White"

### Philosophy
This aesthetic works because of what's NOT there. Whitespace is not empty — it is the primary
design element. Every pixel of breathing room is intentional. Resist the urge to fill space.

### Colour Palette (strict — no exceptions)

```css
/* Backgrounds */
--white:         #FFFFFF;   /* primary page bg */
--off-white:     #FAFAFA;   /* alternate section bg */
--surface:       #F5F5F7;   /* card surfaces, subtle panels */
--surface-hover: #EEEEEF;   /* card hover state */

/* Borders */
--border-light:  #E8E8EC;   /* default border — hairline */
--border-mid:    #D4D4DA;   /* hover/active borders */

/* Text */
--text-primary:  #0A0A0F;   /* near-black — headlines */
--text-body:     #3D3D47;   /* body copy */
--text-secondary:#6B6B7A;   /* supporting text, captions */
--text-muted:    #9E9EA8;   /* labels, metadata */

/* Accent — one only, used sparingly */
--accent:        #7B3FE4;   /* purple — CTAs, links, highlights */
--accent-soft:   #F0EBFF;   /* accent background tint */
--accent-hover:  #6930D0;   /* CTA hover */
```

**In Tailwind:** `bg-white`, `bg-[#FAFAFA]`, `text-[#0A0A0F]`, `border-[#E8E8EC]`, `text-[#6B6B7A]`, `bg-[#7B3FE4]`

**What NOT to use:**
- ❌ No dark backgrounds on any section
- ❌ No orange (reserve for the dark-theme version)
- ❌ No gradients except the faintest bg transition
- ❌ No glass/blur effects
- ❌ No noise textures
- ❌ No neon glows

### Typography System

```
Hero H1:           Instrument Serif or Playfair Display — italic — 80–100px desktop, 48px mobile
OR
Hero H1 (sans):    DM Sans SemiBold — 72–96px desktop, clean, tracking -0.02em

Section headlines: DM Sans SemiBold — 40–56px, tracking -0.01em
Card titles:       DM Sans Medium — 18–22px
Body copy:         DM Sans Regular — 15–16px, line-height 1.65, color #3D3D47
Labels/tags:       DM Sans Medium — 11–12px, tracking 0.08em, uppercase, color #9E9EA8
```

**Font loading:**
```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

**Tailwind font classes:**
- `font-['DM_Sans']` — all UI, body, labels
- `font-['Instrument_Serif'] italic` — hero headline accent (optional, mixing with sans creates tension)

### Spacing System — Generous by Default

```
Section padding (y): py-24 md:py-32 lg:py-40
Container max-width: max-w-5xl mx-auto px-6   (narrow — forces breathing room)
Card padding:        p-8 or p-10
Grid gaps:           gap-6 md:gap-8
Between headline and body: mt-5 or mt-6
Between sections:    space-y-16 or space-y-20 inside sections
```

**The single most important spacing rule:** When in doubt, add more vertical space. Every section
needs room to breathe. Tight spacing makes the whole thing feel cheap.

### Motion System — Subtle and Purposeful

```tsx
// Default — every element entering the viewport
const fadeUp = {
  initial: { opacity: 0, y: 16 },        // small y — not dramatic
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }  // custom ease — silky
}

// Stagger parent
const staggerParent = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-60px" },
  transition: { staggerChildren: 0.08, delayChildren: 0.05 }
}

// Stagger child (use with staggerParent)
const staggerChild = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

// Fade only — for subtle elements, labels, borders
const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}
```

**Motion rules:**
- Keep y offsets small (12–20px max) — large offsets feel cheap on white
- Use the custom cubic-bezier `[0.22, 1, 0.36, 1]` — it's what makes Fluid Glass feel silky
- Hover states: `whileHover={{ y: -2 }}` on cards — subtle lift, not dramatic
- Never animate color — only position, opacity, scale
- Scale hover on cards: `whileHover={{ scale: 1.015 }}` — barely perceptible, premium feel

### Border & Shadow System

```tsx
// Card default border
className="border border-[#E8E8EC]"

// Card hover border
className="border border-[#E8E8EC] hover:border-[#D4D4DA] transition-colors duration-200"

// Divider line
<div className="h-px bg-[#E8E8EC]" />

// Shadow levels (use sparingly)
shadow-none          → default cards
shadow-sm            → hover state on interactive cards
shadow-[0_2px_16px_rgba(0,0,0,0.06)]   → elevated cards, modals
```

**Shadow rule:** Almost never use shadow on default state. Only on hover or intentional elevation.
This is what separates "clean premium" from "generic SaaS template".

---

## Site Structure

```
/           Home
/websites   Web Design & Creation
/systems    Systems & Automation
/hosting    Hosting, Email & Maintenance
/portfolio  All client work
/about      Founder story + stack
/contact    Form + WhatsApp
```

Nav: Home · Services ▾ · Portfolio · About · Contact

---

## Services — 3 Pillars (no pricing on any page)

**1. Web Design & Creation** `/websites`
Tagline: *"Websites that convert. Built in days, not months."*
Covers: Portfolio sites, service sites, e-commerce, restaurant, landing pages, booking pages
Timeline callout: 3–7 days

**2. Systems & Automation** `/systems`
Tagline: *"Stop doing it manually. Build the system once."*
Covers: CRMs, admin dashboards, WhatsApp automation, n8n workflows, booking systems, client portals, PDF invoicing, order management
Timeline callout: 5–14 days

**3. Hosting, Email & Maintenance** `/hosting`
Tagline: *"Your foundation. Handled."*
Covers: Domain, email, DNS, SSL, ongoing support, maintenance retainers
Special: Website rental model — R699–R1,799/mo, own it after 18 months

**All service pages end with: "Contact for a quote" — never show pricing**

---

## Website Rental Model (feature on /hosting + homepage)

- No upfront cost — pay monthly only
- R699/mo (Starter) to R1,799/mo (Pro)
- 3-month minimum, 1-month cancellation notice
- After 18 months: full ownership, all files, no strings
- After ownership: optional R399/mo maintenance

**Copy:** *"No upfront cost. Pay monthly. Own it after 18 months."*

---

## Portfolio Clients

| Client | What | Category |
|--------|------|----------|
| BLOM Cosmetics | E-commerce, admin, CRM, BLOM Academy, email + WhatsApp automation | Systems + Web |
| RecklessBear Apparel | Website, admin, CRM, inventory, production tracking, WhatsApp automation | Systems + Web |
| Ameli Designs | Portfolio site, skin & brow studio, contact form, email notifications | Web |
| JJ Glasswork | Service site, contact form, email notifications | Web |
| NSA Mining | Internal gift issuing system, eligibility tracking, print + reporting | Systems |
| Madiega Trading | 9-page site, solar lead gen, admin dashboard, PDF invoicing | Systems + Web |
| Tuscany SA | Email hosting, domain, logo, IT support | Hosting |
| African Nomad | Logo, artwork, social media content | Design |

Featured (real screenshots needed): BLOM Cosmetics, RecklessBear, Ameli Designs

---

## Homepage Section Order

1. **Nav** — sticky, transparent → frosted white on scroll
2. **Hero** — massive headline, minimal subtext, single CTA, one clean visual
3. **Client bar** — "Trusted by" + client name list (not logos — just clean text)
4. **Services** — 3 clean cards in a row
5. **Featured work** — 2 large portfolio cards
6. **Rental callout** — minimal strip: "No upfront cost" offer
7. **How it works** — 3 numbered steps, generous spacing
8. **Final CTA** — one headline, one button, lots of white space

---

## Copy Voice

- Casual, confident, South African founder — not corporate
- Short sentences. Direct. No fluff.
- First person "I" is fine — this is a solo agency
- ✅ "Your website should work while you sleep."
- ✅ "Most SA businesses are still running on WhatsApps and spreadsheets."
- ✅ "I build the system. You run the business."
- ❌ "We leverage innovative digital transformation solutions."

Primary CTA everywhere: **"Book a Free Call"**
Secondary CTA: **"See the work"** → /portfolio

---

## Component Patterns

### Button

```tsx
// Primary
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="px-6 py-3 bg-[#7B3FE4] text-white text-sm font-['DM_Sans'] font-medium rounded-full
             transition-colors duration-200 hover:bg-[#6930D0]"
>
  Book a Free Call
</motion.button>

// Secondary / ghost
<motion.button
  whileHover={{ scale: 1.02 }}
  className="px-6 py-3 border border-[#E8E8EC] text-[#0A0A0F] text-sm font-['DM_Sans'] font-medium
             rounded-full hover:border-[#D4D4DA] hover:bg-[#FAFAFA] transition-all duration-200"
>
  See the work
</motion.button>

// Text link with arrow
<a className="text-sm font-['DM_Sans'] font-medium text-[#7B3FE4] hover:text-[#6930D0]
              flex items-center gap-1.5 transition-colors duration-200 group">
  Learn more
  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
</a>
```

**Button rule:** Rounded-full (pill) for primary CTAs. Rounded-xl for secondary card actions.
Never use square corners — they're too corporate for this aesthetic.

### Card

```tsx
<motion.div
  whileHover={{ y: -2, scale: 1.008 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  className="p-8 rounded-2xl border border-[#E8E8EC] bg-white
             hover:border-[#D4D4DA] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]
             transition-all duration-300 cursor-pointer"
>
  {/* content */}
</motion.div>
```

### Section Label / Eyebrow

```tsx
<span className="inline-block text-xs font-['DM_Sans'] font-medium uppercase tracking-[0.1em]
                 text-[#9E9EA8] mb-4">
  What I build
</span>
```

### Divider

```tsx
<div className="h-px bg-[#E8E8EC] my-16 md:my-24" />
```

### Stat Block

```tsx
<div className="flex flex-col gap-1">
  <span className="text-4xl font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-tight">8+</span>
  <span className="text-sm font-['DM_Sans'] text-[#6B6B7A]">Clients delivered</span>
</div>
```

### Tag / Badge

```tsx
<span className="inline-block px-3 py-1 text-xs font-['DM_Sans'] font-medium
                 bg-[#F0EBFF] text-[#7B3FE4] rounded-full">
  Systems & Automation
</span>
```

---

## Navbar Pattern

```tsx
// Transparent → frosted white on scroll
const [scrolled, setScrolled] = useState(false)
useEffect(() => {
  const fn = () => setScrolled(window.scrollY > 20)
  window.addEventListener('scroll', fn)
  return () => window.removeEventListener('scroll', fn)
}, [])

className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
  scrolled
    ? 'bg-white/80 backdrop-blur-xl border-b border-[#E8E8EC]'
    : 'bg-transparent'
}`}
```

---

## Output Format

Every request must produce:
1. **Complete TSX** — imports, component, export. Paste and run.
2. **Real copy** — actual headlines and body text in Christiaan's voice
3. **Framer Motion** — whileInView on every meaningful element
4. **Mobile-first** — responsive from 375px
5. **Tailwind only** — no CSS files, no inline styles

Page scaffold:
```tsx
export default function PageName() {
  return (
    <main className="bg-white min-h-screen font-['DM_Sans']">
      {/* sections */}
    </main>
  )
}
```

---

## Hard Rules

- ❌ No dark backgrounds
- ❌ No price on any service page
- ❌ No stock or placeholder images
- ❌ No lorem ipsum
- ❌ No fake testimonials
- ❌ No CSS modules or inline styles
- ❌ No heavy drop shadows on default states
- ❌ No gradients except faint bg transitions
- ✅ Always mobile-first
- ✅ Always min 44px tap targets
- ✅ Always pill buttons (rounded-full) for primary CTAs
- ✅ Always generous section padding (py-24 minimum)
- ✅ Max container width max-w-5xl — narrower is more premium

---

## Reference Files

- `references/sections.md` — Section-by-section homepage spec with exact copy
- `references/components.md` — Full TSX for Navbar, Footer, all UI components
- `references/copy.md` — Complete copy library for every page
