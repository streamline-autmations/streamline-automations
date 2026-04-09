# CLAUDE.md — Streamline Automations Website
# Christiaan Steffen | streamline-automations.agency
# Drop this in the repo root. Claude Code reads it automatically every session.

---

## WHO I AM

Christiaan Steffen — solo founder of Streamline Automations, web design and automation agency,
Vaal Triangle, Gauteng, South Africa.

- Email: christian@streamline-automations.agency
- WhatsApp: +27 63 306 3861
- Site: streamline-automations.agency
- GitHub: github.com/streamline-autmations/streamline-site-main

**When writing copy: casual, confident, South African. Never corporate. Never lorem ipsum.**

---

## TECH STACK

| Layer      | Tool                  | Notes                                         |
|------------|-----------------------|-----------------------------------------------|
| Frontend   | React 18 + TypeScript | Functional components + hooks only            |
| Build      | Vite 5                | Always use vite-plugin-compression            |
| Routing    | React Router DOM      | Client-side routing                           |
| Styling    | Tailwind CSS          | Utility classes only — no CSS modules         |
| Animation  | Framer Motion         | whileInView + viewport={{ once: true }}       |
| Components | 21st.dev Magic        | Pull from library before building from scratch|
| Backend    | Supabase              | Auth, Postgres, Storage                       |
| Deployment | Vercel                | Auto-deploy from main branch                  |
| Analytics  | PostHog               | Env var: VITE_POSTHOG_KEY                     |

### 21st.dev Magic
This project uses the 21st.dev component library. Before building any new UI component, check
if a production-quality version already exists in 21st.dev. Use it as-is or adapt it — don't
rebuild from scratch unless there's no match.

### UI/UX Pro Max Design Skill
Design decisions follow the UI/UX Pro Max skill system (50+ styles, 161 palettes, 57 font
pairings). All new sections must feel premium — not generic AI output. Reference the brand
system below when in doubt.

---

## BRAND SYSTEM

### Colours
```css
--purple-primary:   #7B3FE4;
--purple-secondary: #8b5cf6;
--orange-primary:   #FF6B2B;
--orange-secondary: #f97316;
--bg-base:          #06040f;
--bg-layer:         #0d0a1a;
--bg-card:          #130f22;
--border-subtle:    #1e1830;
--border-mid:       #2a2050;
--text-primary:     #e2dff0;
--text-muted:       #6b6485;
```

### Typography
- **Headlines/Display:** Bebas Neue
- **Body:** DM Sans
- **Code/Tech accents:** JetBrains Mono or Syne

### Visual Style: "Dark Glass / Cyberpunk Blueprint"
- Forced dark mode always — `class="dark"` on HTML element
- Background: deep `#06040f` with dot grid texture
- Dot grid: `radial-gradient(circle, #2a2050 1px, transparent 1px) / 28px 28px` at 0.3 opacity
- Glassmorphism cards: `bg-white/5 backdrop-blur`
- Purple + orange ambient glow blobs in section corners
- Corner bracket `[ ]` decorations on cards and sections
- Color logic: Purple = brand/identity | Orange = automation/action | White = structure/code

---

## SITE STRUCTURE

### Navigation
```
Home → Packages → Portfolio → About → Contact
```

### Pages
```
/            Home
/packages    3-tier package cards + add-ons
/portfolio   Full client work grid with case studies
/about       Founder bio, stack, location, photo
/contact     Form + WhatsApp button
```

### Old pages to remove / redirect
- /websites, /systems, /hosting → all replaced by /packages
- Remove any fake "Sarah Chen" or "Michael Rodriguez" testimonials

---

## PACKAGES (Source of Truth)

### 1. Online Presence — Starting from R6,500
- Up to 5 pages, responsive, contact form, basic SEO, Google Maps, social links
- Timeline: 3–5 working days
- Does NOT include automations, CRM, booking, or AI

### 2. Client Magnet ⭐ Most Popular — Starting from R12,000
Everything in Online Presence plus:
- Appointment booking integration
- Smart enquiry forms + lead capture CRM
- Email/WhatsApp notifications, booking confirmations, reminders
- Basic automated follow-ups
- Basic AI chatbot (FAQ + booking help)
- Timeline: 5–7 working days

### 3. Business Accelerator — Starting from R25,000 setup + R3,500–R7,000/month
Everything in Client Magnet plus:
- Analytics dashboard (lead + booking visibility)
- Editable site sections (CMS-style)
- Advanced follow-up sequences
- Monthly optimisation + priority support + automation tuning
- Timeline: 7–10 days setup + ongoing

### Add-Ons (only sold on top of a package — never standalone)
| Add-On               | Guide Price         |
|----------------------|---------------------|
| Logo & branding      | R2,000–R5,000       |
| Extra page           | R750                |
| Email setup          | R750                |
| Hosting              | R250–R699/month     |
| Advanced AI chatbot  | R2,000–R5,000       |
| Advanced booking     | R1,500–R3,000       |
| CRM expansion        | R2,000–R6,000       |
| SEO upgrade          | R2,500–R8,000       |

**Never show add-ons without a package attached.**

---

## HOMEPAGE SECTION ORDER

1. **Hero** — Strong hook, ONE CTA: "Book a Free Strategy Call" → /contact
2. **Why Streamline** — 3 cards: Built for Speed / Systems Not Sites / You Own Everything
3. **Featured Builds** — BLOM Cosmetics + RecklessBear (real screenshots only)
4. **Tech Stack Marquee** — logos scrolling
5. **Package Preview** — 3 package cards linking to /packages
6. **How It Works** — 3 steps
7. **Final CTA Banner** — "Ready to stop doing everything manually?" + orange button

No testimonials until real client quotes are confirmed. Replace with How It Works if needed.

---

## PORTFOLIO CLIENTS

| Client               | What Was Built                                                                        |
|----------------------|---------------------------------------------------------------------------------------|
| RecklessBear Apparel | Website, admin dashboard, CRM, inventory, 12-stage order tracking, WhatsApp automation, monthly retainer |
| BLOM Cosmetics       | E-commerce store, admin dashboard, CRM, BLOM Academy, email + WhatsApp automation, monthly retainer |
| Ameli Designs        | Portfolio site for skin & brow studio, contact form, email notifications              |
| JJ Glasswork         | Service website, contact form, automated email lead notifications                     |
| NSA Mining           | Internal gift issuing system, eligibility lookup, slip printing, management reporting |
| Madiega Trading      | 9-page site, solar lead gen, admin dashboard, PDF invoicing, WhatsApp order alerts    |
| Tuscany SA           | Email hosting, domain management, logo, email banner, IT support                      |
| African Nomad        | Logo, sublimation artwork, banner design, social media content                        |

**Real screenshots only. Never use stock or placeholder images.**

---

## COMPONENT RULES

```tsx
// Standard animation — use this everywhere
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
}
```

- TypeScript functional components ONLY — no class components
- Tailwind utility classes ONLY — no CSS modules, styled-components, inline styles
- Framer Motion for ALL animations
- Mobile-first always — check mobile before desktop
- Min 44px tap targets on all interactive elements
- No horizontal scroll anywhere
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

// Lazy-load heavy components
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

- Show pricing on any individual service page — all pricing is on /packages
- Use fake testimonials — real clients only or remove the section
- Use stock/placeholder images — real client screenshots only
- Write corporate copy — casual, confident, South African voice only
- Use CSS modules, styled-components, or inline styles
- Build for light mode — dark always
- Add unnecessary npm packages
- Use lorem ipsum anywhere

---

## CLAUDE CODE SESSION RULES

- Run `/compact` every 15–20 messages to keep context lean
- Use `/plan` before any task that can't be described in one sentence
- Add `ultrathink` to a prompt for hard bugs — one-off deep reasoning
- Run `/clear` when switching between major features
- Default effort: medium — only go high for genuinely hard problems
- If something will cost more money to run: say so before building it
- Show the code, not just the explanation
