# Phase 2: Conversion Optimization Plan

Based on the comprehensive analysis, here are the remaining fixes needed:

## Current Status
✅ Already Completed (Phase 1):
- Hero Section Rewrite (result-driven copy)
- Metrics Ticker
- Client Logos (text placeholders)
- Homepage Reorder (Proof First)
- Case Studies ROI Metrics & Before/After
- Pricing Page (Comparison Table & ROI Calculator)
- Urgency Banner on Pricing
- Floating WhatsApp Button
- Testimonials with quantified results

## Phase 2: Implementation Plan

### 1. Fix Accessibility Issues (Priority: HIGH)
**Files to modify:**
- `src/components/home/Hero.tsx` - Add ARIA labels to buttons
- `src/components/home/FeaturedWorkSection.tsx` - Add keyboard navigation
- `src/components/contact/ContactForm.tsx` - Add ARIA labels
- `src/components/ui/*.tsx` - Add focus states

**Actions:**
- Add `aria-label` to all icon buttons
- Add visible focus states for keyboard navigation
- Fix color contrast issues on CTAs

---

### 2. Image Optimization (Priority: HIGH)
**Actions:**
- Add `loading="lazy"` to all images below the fold
- Add `srcset` for responsive images
- Convert PNGs to WebP where possible (requires actual image conversion)

---

### 3. Add FAQ Section to Pricing Page (Priority: HIGH)
**File: `src/pages/Packages.tsx`**

Add FAQ section with common objections:
- "What if I need changes after launch?"
- "Do I own the code?"
- "How long does setup take?"
- "What if I outgrow the package?"

---

### 4. Rewrite Package Descriptions (Job-to-be-Done) (Priority: HIGH)
**File: `src/pages/Packages.tsx`**

Current: "5-Page Professional Website"
New: "For new businesses who need credibility FAST. Get found on Google, look legit to first customers. Outcome: 15-30 inquiries/month within 60 days."

---

### 5. Add Trust Signals to Contact Page (Priority: HIGH)
**File: `src/pages/Contact.tsx`**

Add above the form:
- "No spam. 127 businesses automated."
- "Avg. response: 4 hours"
- Stats counter

---

### 6. Add Exit-Intent Popup (Priority: MEDIUM)
**New file: `src/components/ui/ExitIntentPopup.tsx`**

Trigger when user mouse leaves document:
- "Wait! Get Our Free Guide: '10 Tasks Every Service Business Should Automate First'"
- Email capture form

---

### 7. Add Schema Markup for Local SEO (Priority: MEDIUM)
**File: `index.html`**

Add JSON-LD structured data:
```json
{
  "@type": "ProfessionalService",
  "name": "Streamline Automations",
  "address": { "addressLocality": "Gauteng", "addressCountry": "ZA" },
  "aggregateRating": { "ratingValue": "4.9", "reviewCount": "23" }
}
```

---

### 8. Add "Results" Page (Priority: MEDIUM)
**New file: `src/pages/Results.tsx`**

Create dedicated page showing:
- Total businesses helped
- Total hours saved (calculate)
- Industries served
- Average ROI
- Case study snippets

---

### 9. Improve CTAs with Urgency (Priority: HIGH)
**Multiple files:**
- `src/components/home/Hero.tsx` - More urgent CTAs
- `src/components/home/FinalCTA.tsx` - Add scarcity
- `src/pages/Packages.tsx` - Better CTAs

Current: "Book a Free Strategy Call"
Better: "Book Your Free Automation Audit (2 Spots Left This Week)"

---

### 10. Add Process Visuals to Services Pages (Priority: LOW)
**Files: `src/pages/services/*.tsx`**

Add automation flow diagrams showing:
- Lead fills form → AI qualifies → Books calendar → Sends SMS → Logs in CRM

---

## Execution Order

1. **Week 1 - Quick Wins:**
   - FAQ Section
   - Trust Signals on Contact
   - Improve CTAs
   - Accessibility fixes

2. **Week 2 - Technical:**
   - Schema Markup
   - Image Optimization
   - Exit-Intent Popup

3. **Week 3 - Content:**
   - Package Description Rewrite
   - Results Page
   - Process Visuals

---

## User Action Required
- Provide actual client logos (SVG format) to replace text placeholders
- Record video testimonials (Phase 3)
- Provide specific ROI numbers for Results page
