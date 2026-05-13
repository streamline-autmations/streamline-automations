# Asset Placeholders — Upload Checklist

All placeholder images/videos are marked below. Upload the real asset to Cloudinary and
swap the URL in the referenced file. Account: `dnlgohkcc` (images) · `dy1gw7dr2` (videos).

---

## About Page — Founder Photo

**File:** `src/pages/AboutWhite.tsx` → `FOUNDER_PHOTO` constant (line ~20)

```
Current: https://placehold.co/1600x900/F5F5F7/9E9EA8?text=Founder+Photo+Coming+Soon
Upload to: cloudinary.com/dnlgohkcc → folder: streamline-site/about/
Replace with: https://res.cloudinary.com/dnlgohkcc/image/upload/w_1600,f_webp,q_85/streamline-site/about/founder-photo.jpg
```

**Spec:** Landscape 16:9 or 21:9. Christiaan Steffen in workspace or outdoors. Natural light.
Fill the frame. Not a headshot — environmental portrait. Use the parallax placeholder section
on the About page to preview the composition before uploading.

---

## About Page — Workspace Photo

**File:** `src/pages/AboutWhite.tsx` → `WORKSPACE_IMG` constant (line ~22)

```
Current: https://placehold.co/1200x900/F0EBFF/7B3FE4?text=Workspace
Upload to: cloudinary.com/dnlgohkcc → folder: streamline-site/about/
Replace with: https://res.cloudinary.com/dnlgohkcc/image/upload/w_1200,f_webp,q_85/streamline-site/about/workspace.jpg
```

**Spec:** 4:3 ratio. Desk, monitor(s), optional coffee. No harsh overhead lighting.
Rendered at `rotate(-1.5deg)` tilt — portrait orientation works well here.

---

## Homepage Case Study Cycler — Mockup Images

**File:** `src/pages/HomeWhite.tsx` → `BLOM_MOCKUP`, `RECKLESSBEAR_MOCKUP`, `CW_MOCKUP`, `AMELI_MOCKUP` constants

```
BLOM:        streamline-site/clients/blom-mockup.png
RECKLESSBEAR: streamline-site/clients/recklessbear-mockup.png
CW:          streamline-site/clients/cw-mockup.png
AMELI:       streamline-site/clients/ameli-mockup.png
```

**Spec:** 16:9 landscape. Flat device mockup (MacBook or browser frame) showing the real
client site. White or light grey bg. PNG with transparent shadow preferred. Minimum 1600px wide.

---

## ScrollZoomHero — Frame Sequence (scaffold, not mounted)

**Component:** `src/components/white/home/ScrollZoomHero.tsx`

Not yet mounted on any page. To activate:
1. Export ~80 frames of the hero sequence as 001.webp → 080.webp
2. Upload the full folder to Cloudinary: `streamline-site/hero-sequence/`
3. Use the path: `https://res.cloudinary.com/dnlgohkcc/image/upload/streamline-site/hero-sequence/frame-`
4. Mount `<ScrollZoomHero framesPath="..." frameCount={80} staticFallback="..." />` in HomeWhite.tsx

**Spec:** Each frame: 1920×1080, WebP quality 85, < 80 KB. Sequence: slow zoom into a
desk/workspace or abstract brand visual. First frame = last frame position for loop continuity.
`staticFallback` should be frame 001 as a static image URL.

---

## Systems Page — Automation Stage Screens

**File:** `src/pages/Systems.tsx` → `STAGE_1_SCREEN` through `STAGE_6_SCREEN` constants

```
Upload to: cloudinary.com/dnlgohkcc → folder: streamline-site/automation/
stage-1-quote-form.png
stage-2-ai-quote.png
stage-3-crm.png
stage-4-trello.png
stage-5-whatsapp.png
stage-6-summary.png
```

**Spec:** Browser screenshots of the live RecklessBear systems (or sanitised demo data).
Minimum 1200px wide. No visible personal customer data. WebP preferred.

---

## Portfolio — Client Screenshots

**File:** `src/pages/PortfolioWhite.tsx` → image URL constants at the top

Client images currently reuse BLOM/Ameli hero images as placeholders:

| Client | Current | Replace with |
|--------|---------|-------------|
| CW Electronics | reuses BLOM image | real CW store screenshot |
| JJ Glasswork | reuses BLOM image | real site screenshot |
| NSA Mining | reuses BLOM image | redacted/sanitised screenshot |
| Tuscany SA | reuses Ameli image | logo/email mockup |
| African Nomad | reuses Ameli image | brand design work |

**Spec:** All 4:3 landscape. Real screenshots only — no mockups, no AI-generated images.
Minimum 800×600.

---

## Notes

- All Cloudinary images should include `f_webp,q_85` or `f_auto,q_auto` transforms
- Video URLs should include `f_auto,q_auto` (already applied on FeaturedWork)
- Never commit real credentials or API keys in asset URLs
