# CLAUDE.md — Streamline Automations Website
# Christiaan Steffen | streamline-automations.co.za
# Drop this in the repo root. Claude Code reads it automatically every session.

---

## WHO I AM

Christiaan Steffen — solo founder of Streamline Automations, web design and automation agency,
Vaal Triangle, Gauteng, South Africa.

- Email: christiaan@streamline-automations.co.za
- WhatsApp: +27 68 757 9940
- Site: streamline-automations.co.za
- GitHub: github.com/streamline-autmations/streamline-site-main

**When writing copy: casual, confident, South African founder voice. First person "I" — never "we".
Short sentences. Direct. No corporate fluff. Never lorem ipsum.**

---

## TECH STACK

| Layer        | Tool                  | Notes                                              |
|--------------|-----------------------|----------------------------------------------------|
| Frontend     | React 18 + TypeScript | Functional components + hooks only                 |
| Build        | Vite 5                | Always use vite-plugin-compression                 |
| Routing      | React Router DOM      | Client-side routing                                |
| Styling      | Tailwind CSS          | Utility classes only — no CSS modules              |
| Animation    | Framer Motion         | Hover/tap, page transitions, simple in-view fades  |
| Animation    | GSAP + @gsap/react    | Pinning, scrub, cycler, automation flow            |
| Smooth scroll| Lenis                 | Buttery smooth-scroll wrapper at app root          |
| Components   | 21st.dev Magic        | Pull from library before building from scratch     |
| Backend      | Supabase              | Auth, Postgres, Storage                            |
| Deployment   | Vercel                | Auto-deploy from main branch                       |
| Analytics    | PostHog               | Env var: VITE_POSTHOG_KEY                          |

### Animation split
- **Framer Motion:** hover, tap, page transitions, simple `whileInView` fades, micro-interactions.
- **GSAP:** anything pinned, anything scrub-linked to scroll, image sequences, the case study
  cycler on home, the 6-stage automation flow on /systems.
- Never duplicate the same animation in both libraries on the same element.

### 21st.dev Magic
Before building any new UI component, check if a production-quality version already exists in
21st.dev. Use it as-is or adapt it — don't rebuild from scratch unless there's no match.

### UI/UX Pro Max Design Skill
Design decisions follow the UI/UX Pro Max skill system. All new sections must feel premium —
not generic AI output. Reference the brand system below when in doubt.

---

## BRAND SYSTEM

### Direction: "White Minimal" (fluid.glass / brokerpilot inspired)
Clean white-dominant aesthetic. Generous whitespace. Hairline borders. Restrained purple accent.
No dark backgrounds, no orange, no glassmorphism, no dot grids, no corner brackets — that was
the old dark cyberpunk version and is retired on the white-version site.

### Colours
```css
/* Backgrounds */
--white:          #FFFFFF;  /* primary page bg */
--off-white:      #FAFAFA;  /* alternate section bg */
--surface:        #F5F5F7;  /* card surfaces, subtle panels */
--surface-hover:  #EEEEEF;  /* card hover */
--purple-tint:    #F0EBFF;  /* accent bg — rental callout, badges */

/* Borders */
--border-light:   #E8E8EC;  /* default, hairline */
--border-mid:     #D4D4DA;  /* hover, active */

/* Text */
--text-primary:   #0A0A0F;  /* near-black, headlines */
--text-body:      #3D3D47;  /* body copy */
--text-secondary: #6B6B7A;  /* supporting */
--text-muted:     #9E9EA8;  /* labels, captions */

/* Accent — used sparingly: CTAs, links, highlights */
--accent:         #7B3FE4;
--accent-hover:   #6930D0;
```

### Typography
- **Everything:** DM Sans (body, headings, UI)
- **Highlight words only:** Instrument Serif *italic* — used sparingly inside headlines for
  emphasis on a single word or short phrase

### Motion & layout tokens
- Easing for all transitions: `cubic-bezier(0.22, 1, 0.36, 1)`
- Minimum section padding: `py-24 md:py-32`
- Container max-width: `max-w-5xl`
- Primary buttons: `rounded-full` (pill shape)
- Section viewport height: `min-h-[100svh]` — never `min-h-screen` (iOS Safari URL bar fix)

### Navbar behaviour
Transparent over the hero, then frosted white (`bg-white/80 backdrop-blur`) on scroll.

---

## SITE STRUCTURE

### Navigation
```
Home → Websites → Systems → Hosting → Portfolio → About → Contact
```

### Pages
```
/            Home
/websites    Web Design & Creation
/systems     Systems & Automation
/hosting     Hosting, Email & Maintenance — rental tiers live here
/portfolio   Full client work grid with case studies
/about       Founder bio, stack, location, photo
/contact     Form + WhatsApp button
```

3 service pillars replace the old 11-service sprawl. Pricing lives only on /hosting (rental
tiers) — every other service page is pricing-free.

---

## WEBSITE RENTAL MODEL

The new core offering. Documented in full so copy and pricing stays consistent across pages.

### Terms
- I build the site **free upfront**. Client pays monthly only.
- Minimum 3 months. 1 calendar month written notice to cancel.
- Cancel **before 18 months** → access revoked, files do NOT transfer.
- **After 18 months** → client owns the site outright. Full files. No strings.
- Post-ownership: optional **R399/mo** maintenance retainer.

### Tiers

| Tier      | Monthly  | Includes                                                                 | Buyout (after 12 months) |
|-----------|----------|--------------------------------------------------------------------------|--------------------------|
| Starter   | R699/mo  | 5-page site, hosting, SSL, domain, 1 update/mo                           | R5,500                   |
| Business  | R1,099/mo| 5–8 pages, WhatsApp CTA, SEO basics, 2 updates/mo                        | R8,500                   |
| Pro       | R1,799/mo| Booking system or e-commerce, priority support, 4 updates/mo             | R14,000                  |

### Tagline
> **"No upfront cost. Pay monthly. Own it after 18 months."**

---

## HOMEPAGE SECTION ORDER

1. **Navbar** — transparent → frosted white on scroll
2. **Hero** — text-only, generous whitespace, ONE CTA: "Book a Free Call" → /contact
3. **Client logos / trust bar**
4. **Services preview** — 3 cards linking to /websites, /systems, /hosting
5. **Case Study Cycler** — pinned, GSAP — BLOM → RecklessBear → CW Electronics → Ameli
6. **By The Numbers** — stats strip, count-up on scroll, real numbers only
7. **Featured Work** — video-on-scroll-into-view (BLOM + Ameli walkthroughs)
8. **Rental callout** — soft `#F0EBFF` purple-tint bg
9. **How It Works** — 3 numbered steps
10. **Final CTA** — pure white, headline + single button

No fake testimonials anywhere. Real client logos and real numbers only.

### Systems page extra
Insert a **6-stage pinned automation flow** (RecklessBear quote-to-production) between the
hero and the "what's included" section. GSAP scrub-pinned.

---

## PORTFOLIO CLIENTS

### Featured (homepage cycler — 4 slides, in order)

| # | Client            | What Was Built                                                                                    |
|---|-------------------|---------------------------------------------------------------------------------------------------|
| 1 | BLOM Cosmetics    | Full e-commerce + admin + course platform (BLOM Academy) + email + WhatsApp automation. Supabase, n8n, PayFast, ShipLogic. **Active retainer.** |
| 2 | RecklessBear      | Website + admin + CRM + 12-stage Trello production tracking + WhatsApp automation + AI quote engine (Voiceflow). **Active retainer.** |
| 3 | CW Electronics    | Full e-commerce + custom admin for a JHB-based Chinese electronics importer (Shop C15, China Mart, Crown Mines). 700+ products live in under 2 weeks. Retail + wholesale pricing, stock analytics, order management, customer updates, owner-editable. PayFast live. cw-electronics.co.za. **Active retainer.** |
| 4 | Ameli Designs     | Portfolio site for skin & brow studio, contact form, automated email lead capture. 4-day turnaround. |

### Full portfolio grid (/portfolio)

| Client               | What Was Built                                                                |
|----------------------|-------------------------------------------------------------------------------|
| BLOM Cosmetics       | *see featured row above*                                                      |
| RecklessBear         | *see featured row above*                                                      |
| CW Electronics       | *see featured row above*                                                      |
| Ameli Designs        | *see featured row above*                                                      |
| JJ Glasswork         | Service site, contact form, automated email lead notifications                |
| NSA Mining           | Internal employee gift system, eligibility lookup, slip printing, reporting   |
| Tuscany SA           | Email hosting, domain management, IT support, logo, email banner             |
| African Nomad        | Logo, sublimation artwork, banner design, social media content                |

### Not signed — do NOT display as live work
- **Madiega Trading** — was a proposal / demo only. Never list as a client on the public site.

**Real client screenshots only. Never stock, never placeholder, never AI-generated mockups.**

---

## COMPONENT RULES

```tsx
// Standard in-view fade (Framer Motion) — uses brand easing
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}
```

- TypeScript functional components ONLY — no class components
- Tailwind utility classes ONLY — no CSS modules, styled-components, inline styles
- Framer Motion for hover/tap/in-view; GSAP for pinned/scrub
- Mobile-first always — test 375px before desktop
- Min 44px tap targets on all interactive elements
- No horizontal scroll anywhere
- Use `min-h-[100svh]` not `min-h-screen` for full-viewport sections
- Primary CTAs are `rounded-full` pills
- All scroll animations must have a `prefers-reduced-motion` fallback (skip the pin/scrub,
  render the end state)
- Images: `/public/assets/` or `/src/assets/`
- Components: `/src/components/`
- Pages: `/src/pages/`

---

## SUPABASE RULES

```typescript
// NEVER — always select explicit columns
const { data } = await supabase.from('table').select('*')

// ALWAYS — only what the UI needs
const { data } = await supabase
  .from('table')
  .select('id, name, email, created_at')
  .eq('active', true)

// NEVER — N+1 queries
for (const item of items) {
  await supabase.from('related').select('*').eq('parent_id', item.id)
}

// ALWAYS — use joins
const { data } = await supabase
  .from('orders')
  .select(`id, total, status, order_items ( id, quantity, price )`)
  .order('created_at', { ascending: false })
  .limit(50)

// ALWAYS — transform images to WebP
supabase.storage.from('bucket').getPublicUrl('file.jpg', {
  transform: { width: 800, format: 'webp', quality: 85 }
})

// ALWAYS — clean up Realtime subscriptions
useEffect(() => {
  const channel = supabase.channel('changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, handler)
    .subscribe()
  return () => { supabase.removeChannel(channel) }
}, [])
```

---

## VITE / VERCEL RULES

```typescript
// vite.config.ts — always add compression
import viteCompression from 'vite-plugin-compression'

export default {
  plugins: [
    viteCompression({ algorithm: 'brotliCompress' }),
    viteCompression({ algorithm: 'gzip' })
  ]
}

// Named imports only — never import *
import { debounce } from 'lodash-es'  // GOOD
import * as _ from 'lodash'           // BAD

// Lazy-load heavy components (GSAP plugins, video players, etc.)
const HeavySection = lazy(() => import('./HeavySection'))
```

---

## COST RULES — FLAG ANY OF THESE

| Pattern                                  | Fix                                  |
|------------------------------------------|--------------------------------------|
| `.select('*')` anywhere                  | Replace with explicit column list    |
| Fetch inside a loop                      | Replace with Supabase join           |
| Raw image URL from Storage               | Add WebP transform                   |
| `import * as x from 'library'`           | Use named imports                    |
| Heavy component loaded on every page     | Wrap in `lazy()`                     |
| Missing cleanup on useEffect subscription| Add `return () => cleanup()`         |
| No compression in vite.config            | Add vite-plugin-compression          |

---

## WHAT NEVER TO DO

- Show pricing on any service page — rental tiers live on /hosting only
- Use fake testimonials — real clients only, or remove the section
- Use stock/placeholder/AI-generated images — real client screenshots only
- Use lorem ipsum anywhere
- Use "we" — solo agency, "I" is correct
- Use dark backgrounds on the white-version site
- Use orange anywhere on the white-version site (reserved for the old dark theme)
- Use CSS modules, styled-components, or inline styles
- Use `min-h-screen` (use `min-h-[100svh]` for iOS Safari)
- `import * as x from 'library'` — named imports only
- Display Madiega Trading as a signed/live client
- Add unnecessary npm packages

---

## ALWAYS

- Mobile-first — test 375px before desktop
- Min 44px tap targets on interactive elements
- Pill-shaped (`rounded-full`) primary CTAs
- Minimum section padding: `py-24 md:py-32`
- Cubic-bezier `[0.22, 1, 0.36, 1]` for all transitions
- `prefers-reduced-motion` fallbacks on every scroll animation
- `min-h-[100svh]` for full-viewport sections
- Real client screenshots only

---

## COPY VOICE

- Casual, confident, South African founder voice
- Short sentences. Direct. No corporate fluff.
- First person **"I"** — solo agency, never "we"
- Primary CTA: **"Book a Free Call"**
- Secondary CTA: **"See the work"**

---

## CLAUDE CODE SESSION RULES

- Run `/compact` every 15–20 messages to keep context lean
- Use `/plan` before any task that can't be described in one sentence
- Add `ultrathink` to a prompt for hard bugs — one-off deep reasoning
- Run `/clear` when switching between major features
- Default effort: medium — only go high for genuinely hard problems
- If something will cost more money to run: say so before building it
- Show the code, not just the explanation
