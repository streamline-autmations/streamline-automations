---
name: streamline-site
description: Use this skill whenever working on the Streamline Automations marketing website. Covers the full tech stack (React 18 + TypeScript + Vite + Tailwind + Framer Motion + GSAP + Lenis), brand system (colours, fonts, visual style), the Cuberto-level motion direction, site structure, portfolio clients, component conventions, and deployment setup. Always read this skill before making any changes to the site. This skill is BRAND TRUTH — it wins over ui-ux-pro-max, frontend-design, and every other design skill on colours, fonts, spacing, copy voice, clients, pricing, and structure.
---

# Streamline Automations — Site Skill (Brand Truth)

You are helping Christiaan Steffen build and maintain the Streamline Automations marketing website.

**This skill is the brand authority.** Other design skills (ui-ux-pro-max, frontend-design,
modern-web-design, gsap-scrolltrigger, etc.) supply technique and ideas only. If they suggest
a colour, font, or aesthetic outside this system — ignore the suggestion, keep the system.

---

## Active Visual Direction

**Cuberto-level motion craft on a white-minimal + single-purple-accent canvas.**

The old fluid.glass / brokerpilot "white-minimal subtle" direction is retired.
The even older dark/cyberpunk theme (orange, Bebas Neue, dot grids, corner brackets) is dead — never resurrect it.

### The reconcile rule (do not violate)
Cuberto-LEVEL craft, NOT Cuberto's maximalism. Steal the motion quality, cursor,
magnetism, scroll feel, case-cover treatment, pre-footer graphic moment, generous
whitespace and big type. Do NOT steal rainbow colour, busy collages, decorative clutter,
or multiple accents. White-dominant + purple is locked. Do not re-pivot the aesthetic.

### The dark-section rule
White-dominant pages. Maximum 1–2 surgical ink sections per page (#0A0A0F, ink-soft #15151C,
text-on-dark #F5F5F7) — used as a deliberate contrast moment (e.g. the pre-footer), never as a default.

---

## Project Overview

**Business:** Streamline Automations — solo web design and automation agency, Vaal Triangle, Gauteng, South Africa.

**Owner:** Christiaan Steffen
**Email:** christiaan@streamline-automations.co.za
**WhatsApp:** +27 68 757 9940 (https://wa.me/27687579940)
**Site URL:** streamline-automations.co.za

**Copy voice:** casual, confident, South African founder voice. First person "I" — never "we".
Short sentences. Direct. No corporate fluff. Never lorem ipsum.

---

## Tech Stack

| Tool | Notes |
|------|-------|
| React 18 + TypeScript | Functional components + hooks only |
| Vite 5 | Build tool — always vite-plugin-compression |
| React Router DOM | Client-side routing |
| Tailwind CSS | Utility classes only — no CSS modules |
| Framer Motion | Hover/tap, micro-interactions, simple in-view fades |
| GSAP + @gsap/react | Pinning, scrub, SplitText reveals, page choreography |
| Lenis | Smooth scroll, synced to ScrollTrigger |
| Supabase | Auth, Postgres, Storage |
| Vercel | Auto-deploy from main branch |
| PostHog | Analytics — env var VITE_POSTHOG_KEY |

**Repository:** https://github.com/streamline-autmations/streamline-site-main

---

## Brand System

### Colours
```css
/* Backgrounds */
--white:          #FFFFFF;  /* primary page bg */
--off-white:      #FAFAFA;  /* alternate section bg */
--surface:        #F5F5F7;  /* card surfaces, subtle panels */
--surface-hover:  #EEEEEF;  /* card hover */
--purple-tint:    #F0EBFF;  /* accent bg — rental callout, badges */

/* Dark sections — surgical, 1–2 max per page */
--ink:            #0A0A0F;
--ink-soft:       #15151C;
--text-on-dark:   #F5F5F7;

/* Borders */
--border-light:   #E8E8EC;  /* default, hairline */
--border-mid:     #D4D4DA;  /* hover, active */

/* Text */
--text-primary:   #0A0A0F;  /* near-black, headlines */
--text-body:      #3D3D47;  /* body copy */
--text-secondary: #6B6B7A;  /* supporting */
--text-muted:     #9E9EA8;  /* labels, captions */

/* Accent — ONE only, used sparingly: CTAs, links, highlights */
--accent:         #7B3FE4;
--accent-hover:   #6930D0;
```

No orange. No dark default backgrounds. No glassmorphism, dot grids, or corner brackets.

### Typography
- **Everything:** Inter Tight (body, headings, UI) — free stand-in for the Nimbus Sans Novus
  reference (tight Helvetica-family grotesque), loaded from Google Fonts
- **Highlight words:** same font, purple #7B3FE4 — the Instrument Serif italic accent is retired
- **JetBrains Mono:** survives ONLY in the contact-orb ring + 3D node micro-labels — the
  uppercase mono eyebrow/label pattern is retired site-wide

### Layout tokens
- Easing for all transitions: `cubic-bezier(0.22, 1, 0.36, 1)`
- Generous section padding: `py-28` minimum
- Container max-width: `max-w-5xl`
- Primary buttons: `rounded-full` (pill shape)
- Full-viewport sections: `min-h-[100svh]` — never `min-h-screen` (iOS Safari URL bar)
- Min 44px tap targets. No horizontal scroll anywhere.

---

## Motion & Craft

The craft layer that separates this site from generic agency output. Target: Cuberto-level feel.

### Architecture (single source each — never duplicate)
- One `src/lib/gsap-setup.ts` registering all GSAP plugins (ScrollTrigger, ScrollSmoother,
  SplitText, etc.) exactly once. Import from there, never re-register.
- One `<LenisProvider>` at app root, synced to GSAP ScrollTrigger. Never two scroll systems.
- Framer Motion for hover/tap/micro; GSAP for anything pinned, scrubbed, or choreographed.
  Never the same animation in both libraries on one element.

### The craft vocabulary
- Masked/SplitText text reveals on headlines (lines rise from clipped containers)
- Custom cursor with contextual states (off on touch/coarse pointers)
- Magnetic interactions on primary CTAs and nav
- Smooth Lenis scroll feel, scrub-pinned showcase sections
- Page transitions between routes
- Full-bleed case-study covers with parallax/scale on scroll
- The ink pre-footer graphic moment (one of the 1–2 dark sections)

### Performance & accessibility rules
- Animate `transform` + `opacity` only — never layout properties
- `gsap.matchMedia()` to simplify/disable heavy motion under 768px — mobile stays 60fps
- `prefers-reduced-motion`: skip pins/scrubs/cursor, render the end state
- ScrollTrigger pins need `pinType: 'transform'` (the `#top` overflow-x-hidden root breaks fixed pins)
- Target 90+ Lighthouse performance on mobile

---

## Site Structure

```
/            Home
/websites    Web Design & Creation
/systems     Systems & Automation
/hosting     Hosting, Email & Maintenance — rental tiers live HERE only
/portfolio   Full client work grid with case studies
/about       Founder bio, stack, location, photo
/contact     Form + WhatsApp button
```

**Pricing only on /hosting** (website rental tiers). Every other service page ends with
"Contact for a quote". Rental model: free build upfront, pay monthly, own it after 18 months.
Tiers: Starter R699/mo · Business R1,099/mo · Pro R1,799/mo.

---

## Portfolio Clients

| Client | Built |
|--------|-------|
| BLOM Cosmetics | E-commerce + admin + BLOM Academy course platform + email/WhatsApp automation. Supabase, n8n, PayFast, ShipLogic. Active retainer. |
| RecklessBear | Website + admin + CRM + 12-stage Trello production tracking + WhatsApp automation + AI quote engine (Voiceflow). Active retainer. |
| CW Electronics | Full e-commerce + custom admin, 700+ products live in under 2 weeks, retail + wholesale pricing, PayFast live. cw-electronics.co.za. Active retainer. |
| Ameli Designs | Portfolio site for a graphic designer, contact form, automated email lead capture. 4-day turnaround. |
| JJ Glasswork | Service site, contact form, automated email lead notifications |
| NSA Mining | Internal employee gift system, eligibility lookup, slip printing, reporting |
| Tuscany SA | Email hosting, domain management, IT support, logo, email banner |
| African Nomad | Logo, sublimation artwork, banner design, social media content |

**Madiega Trading was a proposal/demo only — NEVER display it as a signed/live client.**

Real client screenshots only. Never stock, placeholder, or AI-generated mockups.
No fake testimonials, no invented metrics.

---

## Component Rules

- TypeScript functional components only
- Tailwind utility classes only — no CSS modules, styled-components, inline styles
- Mobile-first — test 375px before desktop
- Images: /public/assets/ or /src/assets/ · Components: /src/components/ · Pages: /src/pages/

```tsx
// Standard in-view fade (Framer Motion) — brand easing
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}
```

---

## Definition of done for ANY visual change

Run the dev server, screenshot with Playwright (desktop 1440 + mobile 390), compare against
the Cuberto reference intent (`/design-refs/cuberto/`). Code that "should look right" is not
done — seen-and-matched is done.

---

## Do NOT

- Show pricing anywhere except /hosting
- Use "we" — solo agency, "I" is correct
- Use orange, Bebas Neue, dot grids, corner brackets, or dark default backgrounds (dead theme)
- Use CSS modules, styled-components, or inline styles
- Use placeholder/stock/AI images — real client screenshots only
- Use lorem ipsum or fake testimonials
- Use `min-h-screen` (use `min-h-[100svh]`)
- Display Madiega Trading as a client
- Re-pivot the aesthetic — white + single purple accent is locked
