# Homepage Sections — Exact Spec

---

## 1. Navbar

- Left: "Streamline." wordmark — DM Sans SemiBold, text-[#0A0A0F]
- Center: Home · Services · Portfolio · About
- Right: "Book a Free Call" — pill button, bg-[#7B3FE4]
- Behaviour: transparent on load → frosted white bg-white/80 + backdrop-blur-xl + border-b on scroll
- Mobile: hamburger icon, full-screen drawer

---

## 2. Hero Section

**Container:** max-w-4xl centered, pt-32 md:pt-40 pb-20 md:pb-32

**Layout option A — Text-only centered (Fluid Glass style):**
```
[eyebrow label]
[Massive headline — 2–3 lines]
[Subtext — 1–2 sentences max]
[CTA row]
[Optional: clean stat row below]
```

**Eyebrow:**
`Web Design & Automation · Vaal Triangle, SA`
— 12px, DM Sans Medium, uppercase, tracking-[0.1em], text-[#9E9EA8]

**Headline options (pick one per build):**
- "Websites that work. Systems that scale."
- "Your business, running without you."
- "Less manual work. More growth."
- "Built clean. Built fast. Built to last."

**Subtext:**
"I build custom websites and automation systems for South African businesses that are done
doing everything manually. Fast, clean, and ready to go."
— 17px, DM Sans Regular, text-[#6B6B7A], max-w-2xl, line-height 1.65

**CTA row:**
Primary: "Book a Free Call" (purple pill)
Secondary: "See the work →" (text link, purple)
— gap-4, flex items-center

**Optional stat row (below CTAs, mt-12):**
`8+ Clients delivered · 3 countries · 2-week avg turnaround`
— 13px, DM Sans, text-[#9E9EA8], separated by · or thin pipe

**Divider below hero:**
`<div className="h-px bg-[#E8E8EC]" />`

---

## 3. Client Bar — "Trusted by"

**Container:** py-12, bg-[#FAFAFA]
**Label:** "Trusted by" — 12px, uppercase, tracking-[0.08em], text-[#9E9EA8], mb-6
**Layout:** Flex row, wrap, gap-x-10 gap-y-3, justify-center

**Client names (text only — no logos):**
BLOM Cosmetics · RecklessBear Apparel · Ameli Designs · NSA Mining · Madiega Trading

**Style per name:**
`text-sm font-['DM_Sans'] font-medium text-[#6B6B7A] hover:text-[#0A0A0F] transition-colors`

**Effect:** Subtle fade-in stagger — each name 0.06s apart

---

## 4. Services Section

**Container:** py-24 md:py-32, max-w-5xl
**Eyebrow:** "What I build"
**Headline:** "Three ways I help your business."
**Subtext:** "Whether you need a site, a system, or just to get your hosting sorted — I've got it covered."

**Grid:** 3 columns desktop, 1 column mobile, gap-5

**Card 1 — Web Design & Creation**
Number tag: `01`
Headline: "Web Design & Creation"
Body: "Portfolio sites, e-commerce stores, service sites, landing pages. Built from scratch in 3–7 days."
Link: "View service →" — purple text link
Border accent: thin left border `border-l-2 border-[#7B3FE4]` inside card (optional)

**Card 2 — Systems & Automation** (can be slightly taller / featured)
Number tag: `02`
Headline: "Systems & Automation"
Body: "CRMs, WhatsApp bots, admin dashboards, n8n workflows. Stop running on spreadsheets."
Link: "View service →"

**Card 3 — Hosting & Maintenance**
Number tag: `03`
Headline: "Hosting, Email & Maintenance"
Body: "Domain, email, SSL, IT support — and a website rental model if you don't want upfront costs."
Link: "View service →"

**Card visual rule:** White bg, 1px border-[#E8E8EC], p-8, rounded-2xl.
On hover: border darkens, shadow-[0_4px_24px_rgba(0,0,0,0.06)], y -2px.

---

## 5. Featured Work Section

**Container:** py-24 md:py-32, max-w-5xl
**Eyebrow:** "Selected work"
**Headline:** "Not just websites. Whole systems."

**Layout:** 2-column grid desktop, 1-column mobile, gap-6

**Card 1 — BLOM Cosmetics**
Image: blom screenshot — rounded-xl, aspect-[16/10], object-cover, bg-[#F5F5F7] if no image
Tag: `E-commerce + Automation`
Title: "BLOM Cosmetics"
Body: "Full e-commerce platform, course academy, CRM, and WhatsApp automation — all on one Supabase backend."
Tech tags: React · Supabase · n8n
Link: "View case study →"

**Card 2 — RecklessBear Apparel**
Image: recklessbear screenshot
Tag: `Full Business System`
Title: "RecklessBear Apparel"
Body: "Website, CRM, inventory tracking, 12-stage production pipeline, and WhatsApp automation."
Tech tags: React · Supabase · WhatsApp API
Link: "View case study →"

**Below grid:** "See all work →" center-aligned link to /portfolio

---

## 6. Rental Callout Strip

**Container:** py-16, bg-[#F5F5F7], full-bleed or max-w-5xl with rounded-2xl

**Layout:** 2 columns (text left, CTA right) on desktop, stacked on mobile

**Left:**
Tag badge: `New offering`
Headline: "No upfront cost. Own your site after 18 months."
Body: "Pay a small monthly fee. I build the site, handle the hosting, and after 18 months — it's yours. Full files, full control."

**Right:**
Stat blocks (2 in a row):
- "R699/mo" → "Starting from"
- "18 months" → "Then you own it"
CTA: "How it works →"

---

## 7. How It Works

**Container:** py-24 md:py-32, max-w-4xl
**Eyebrow:** "The process"
**Headline:** "Simple. Fast. No surprises."

**Layout:** 3 steps, horizontal on desktop, vertical on mobile
**Connecting element:** thin dashed line `border-t border-dashed border-[#E8E8EC]` between steps on desktop

**Step 1:**
Number: `01` — large, DM Sans, text-[#E8E8EC], position above
Headline: "We talk"
Body: "Quick 30-minute call. You tell me what the business needs, I map out exactly what to build."

**Step 2:**
Number: `02`
Headline: "I build"
Body: "Design, code, automations. You get updates throughout. Most projects are live in under 2 weeks."

**Step 3:**
Number: `03`
Headline: "You grow"
Body: "Site is live, systems run in the background. I stay on retainer if you need me."

---

## 8. Final CTA Banner

**Container:** py-32 md:py-40, max-w-3xl, centered — massive whitespace intentional

**Headline:** "Ready to stop doing everything manually?"
— Largest text on the page, DM Sans SemiBold, text-[#0A0A0F], tracking-tight

**Subtext:** "Book a free 30-minute call. No pitch, no pressure — just a plan."
— text-[#6B6B7A], max-w-md, centered

**CTA:** "Book a Free Call" — large purple pill button, px-8 py-4
**Below button:** "Or WhatsApp me directly — 063 306 3861" — text-[#9E9EA8], text-sm

**Rule:** No bg color change here. Pure white. The contrast of full white + centered text + one button is what makes this section feel premium. Do NOT add a colored background.

---

## Footer

**Layout:** max-w-5xl, py-16
**Top:** divider line `h-px bg-[#E8E8EC] mb-12`
**3 columns:** Brand · Services · Contact
**Bottom bar:** © year · Privacy · built in SA
**All text:** text-[#9E9EA8], hover: text-[#6B6B7A]