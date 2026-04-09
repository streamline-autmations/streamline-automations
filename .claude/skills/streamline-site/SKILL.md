---
name: streamline-site
description: Use this skill whenever working on the Streamline Automations marketing website. Covers the full tech stack (React 18 + TypeScript + Vite + Tailwind + Framer Motion), brand system (colours, fonts, visual style), site structure, portfolio clients, component conventions, and deployment setup. Always read this skill before making any changes to the site.
---

# Streamline Automations — Site Skill

You are helping Christiaan Steffen build and maintain the Streamline Automations marketing website.

---

## Project Overview

**Business:** Streamline Automations — solo web design and automation agency, Vaal Triangle, Gauteng, South Africa.

**Owner:** Christiaan Steffen
**Email:** christian@streamline-automations.agency
**Phone:** +27 63 306 3861
**Site URL:** streamline-automations.agency

---

## Tech Stack

| Tool | Version | Notes |
|------|---------|-------|
| React | 18.3.1 | Functional components + hooks only |
| TypeScript | Latest | Strict mode preferred |
| Vite | 5.4.2 | Build tool |
| React Router DOM | Latest | Client-side routing |
| Tailwind CSS | Latest | Utility-first styling |
| Framer Motion | Latest | Animations |
| PostHog | Latest | Analytics |

---

## Repository

- **GitHub:** https://github.com/streamline-autmations/streamline-site-main
- **Repo name:** streamline-site-main
- **Deployment:** Vercel (auto-deploy from main branch)

---

## Brand System

### Colours
```css
--purple-primary: #7B3FE4;
--purple-secondary: #8b5cf6;
--orange-primary: #FF6B2B;
--orange-secondary: #f97316;
--bg-base: #06040f;
--bg-layer: #0d0a1a;
--bg-card: #130f22;
--border-subtle: #1e1830;
--border-mid: #2a2050;
--text-primary: #e2dff0;
--text-muted: #6b6485;
```

### Typography
- Display/Headlines: Bebas Neue
- Body: DM Sans
- Code accents: JetBrains Mono

### Visual Style
- Dark background (#06040f)
- Dot grid texture: radial-gradient(circle, #2a2050 1px, transparent 1px) / 28px 28px / opacity 0.3
- Corner bracket decorations on cards
- Purple and orange gradient bloom effects
- Aesthetic: Dark Glass / Cyberpunk Blueprint

---

## Site Structure

```
/           Home — hero, 3 service cards, portfolio preview, testimonials, CTA
/websites   Websites service page
/systems    Systems & Automation service page
/hosting    Email, Domain & Hosting service page
/portfolio  Full client work grid
/about      Bio, stack, location
/contact    Form + WhatsApp button
```

---

## Services (NO pricing shown anywhere)

1. **Websites** — portfolio, service, e-commerce, restaurant sites
2. **Systems & Automation** — CRMs, dashboards, WhatsApp automation, n8n workflows
3. **Email, Domain & Hosting** — setup, management, IT support

All service pages end with: "Contact for a quote"

---

## Portfolio Clients

| Client | Built |
|--------|-------|
| RecklessBear Apparel | Website, admin dashboard, CRM, inventory, order tracking, WhatsApp automation |
| BLOM Cosmetics | E-commerce, admin, CRM, BLOM Academy, email + WhatsApp automation |
| Ameli Designs | Portfolio site, contact form, email notifications |
| JJ Glasswork | Service site, contact form, email notifications |
| NSA Mining | Gift issuing system, eligibility tracking, print + reporting |
| Madiega Trading | 9-page site, solar lead gen, admin dashboard, PDF invoicing |
| Tuscany SA | Email hosting, domain, logo, IT support |
| African Nomad | Logo, sublimation artwork, social media content |

---

## Component Rules

- Functional components with TypeScript only
- Tailwind utility classes only — no CSS modules or styled-components
- Framer Motion for all animations — use whileInView + viewport={{ once: true }}
- Images: /public/assets/ or /src/assets/
- Components: /src/components/
- Pages: /src/pages/

---

## Animation Defaults

```tsx
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
}
```

---

## Contact

- Form → christian@streamline-automations.agency
- WhatsApp → https://wa.me/27633063861
- PostHog env var: VITE_POSTHOG_KEY

---

## Do NOT

- Show pricing on any page
- Use CSS modules, styled-components, or inline styles
- Use placeholder images — real client screenshots only
- Use lorem ipsum — write in Christiaan's voice: casual, confident, South African
