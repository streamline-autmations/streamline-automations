# Asset Manifest — Scroll Moments Build

All assets live on the existing Cloudinary account: **`dnlgohkcc`**.
Folder convention used by the new constants: **`streamline-site/{clients|automation|showreel}/…`**

Every URL below is currently a **placeholder** baked into the code as a `const`.
Once a real upload exists, edit the corresponding constant in the **"Path constant in code"** column.

> The `v0` segment in each placeholder URL is intentional — Cloudinary will
> overwrite that with the real version number once an asset is uploaded. You
> can either (a) replace the whole URL after upload, or (b) keep the URL
> structure and just rename the upload's public-id to match the path below.

---

## 1. Case-study mockups (homepage `CaseStudyCycler`)

Pre-baked browser-frame mockups. The cycler renders each as a full bleed image
inside a rounded card — the browser chrome should be part of the image itself.

| Path constant in code | Cloudinary upload path | Type | Dimensions | File size target | Notes |
|---|---|---|---|---|---|
| `BLOM_MOCKUP` (src/pages/HomeWhite.tsx) | `streamline-site/clients/blom-mockup` | WebP (or PNG) | 1600 × 1200 (4:3) | ≤ 280 KB | BLOM homepage screenshot inside a browser frame. URL bar reads `blomcosmetics.co.za`. |
| `RECKLESSBEAR_MOCKUP` (src/pages/HomeWhite.tsx) | `streamline-site/clients/recklessbear-mockup` | WebP (or PNG) | 1600 × 1200 (4:3) | ≤ 280 KB | RecklessBear quote engine or production dashboard. URL bar reads `recklessbear.co.za`. |
| `CW_MOCKUP` (src/pages/HomeWhite.tsx) | `streamline-site/clients/cw-mockup` | WebP (or PNG) | 1600 × 1200 (4:3) | ≤ 280 KB | CW Electronics storefront. URL bar reads `cw-electronics.co.za`. |
| `AMELI_MOCKUP` (src/pages/HomeWhite.tsx) | `streamline-site/clients/ameli-mockup` | WebP (or PNG) | 1600 × 1200 (4:3) | ≤ 280 KB | Ameli Designs portfolio hero. |

**Aspect ratio is locked at 4:3** by the cycler's container (`aspect-[4/3]`).
Anything wider or narrower will crop via `object-cover`.

---

## 2. Automation flow screens (`/systems` page, `AutomationFlow`)

Each image is composited **inside a static phone frame at render time** —
do NOT bake a phone bezel/notch into the image. Just the app/UI screen.

| Path constant in code | Cloudinary upload path | Type | Dimensions | File size target | Notes |
|---|---|---|---|---|---|
| `STAGE_1_SCREEN` (src/pages/Systems.tsx) | `streamline-site/automation/stage-1-quote-form` | WebP | 600 × 1300 (≈ 9:19.5) | ≤ 140 KB | Quote form UI on a phone-width screen — product, qty, deadline, upload field. |
| `STAGE_2_SCREEN` (src/pages/Systems.tsx) | `streamline-site/automation/stage-2-ai-quote` | WebP | 600 × 1300 | ≤ 140 KB | Voiceflow-style chat UI showing a generated price quote bubble. |
| `STAGE_3_SCREEN` (src/pages/Systems.tsx) | `streamline-site/automation/stage-3-crm` | WebP | 600 × 1300 | ≤ 140 KB | Airtable-style CRM with a highlighted new lead row and "auto-assigned to rep" badge. |
| `STAGE_4_SCREEN` (src/pages/Systems.tsx) | `streamline-site/automation/stage-4-trello` | WebP | 600 × 1300 | ≤ 140 KB | Trello-style production board with stages and one card mid-flow. |
| `STAGE_5_SCREEN` (src/pages/Systems.tsx) | `streamline-site/automation/stage-5-whatsapp` | WebP | 600 × 1300 | ≤ 140 KB | WhatsApp chat thread showing automated status messages from the business. |
| `STAGE_6_SCREEN` (src/pages/Systems.tsx) | `streamline-site/automation/stage-6-summary` | WebP | 600 × 1300 | ≤ 140 KB | Email-client view of a weekly CEO summary (numbers, conversion rate, bottlenecks). |

**Aspect ratio is locked at ~9:19.5** by the phone-frame screen container.
Anything else will crop via `object-cover`.

---

## 3. Featured walkthrough videos (homepage `FeaturedWork`)

Silent, looping, auto-playing in-viewport. **Mute is mandatory** (browsers
block autoplay with audio). Keep them short and looping seamlessly — 10–20s
each is plenty; cut to a clean repeat point.

| Path constant in code | Cloudinary upload path | Type | Dimensions | File size target | Notes |
|---|---|---|---|---|---|
| `BLOM_WALKTHROUGH_VIDEO` (src/components/white/home/FeaturedWork.tsx) | `streamline-site/showreel/blom-walkthrough` | MP4 / H.264 baseline, no audio | 1920 × 1200 (16:10) | ≤ 4 MB | Screen capture of BLOM site — homepage scroll → store → admin → automation glimpse. Loop seamlessly. |
| `AMELI_WALKTHROUGH_VIDEO` (src/components/white/home/FeaturedWork.tsx) | `streamline-site/showreel/ameli-walkthrough` | MP4 / H.264 baseline, no audio | 1920 × 1200 (16:10) | ≤ 3 MB | Screen capture of Ameli site — hero → portfolio scroll → contact form. Loop seamlessly. |

**Aspect ratio is locked at 16:10** by the card container. Anything off will
crop via `object-cover`. Cloudinary's `f_auto,q_auto` transform is recommended
for the served URL — but the placeholder constant points to the raw MP4, so
either swap the constant to a transformed URL after upload or rely on Cloudinary's
default delivery.

### Walkthrough poster JPGs (initial frame / reduced-motion fallback)

These are also the static images shown when a user has
`prefers-reduced-motion: reduce` set — pick a **representative frame**, not
a black/white card.

| Path constant in code | Cloudinary upload path | Type | Dimensions | File size target | Notes |
|---|---|---|---|---|---|
| `BLOM_WALKTHROUGH_POSTER` (src/components/white/home/FeaturedWork.tsx) | `streamline-site/showreel/blom-walkthrough-poster` | JPG (or WebP) | 1920 × 1200 (16:10) | ≤ 180 KB | Strong frame from the BLOM walkthrough — store hero or admin overview. |
| `AMELI_WALKTHROUGH_POSTER` (src/components/white/home/FeaturedWork.tsx) | `streamline-site/showreel/ameli-walkthrough-poster` | JPG (or WebP) | 1920 × 1200 (16:10) | ≤ 150 KB | Strong frame from the Ameli walkthrough — hero or portfolio grid. |

---

## Naming + path summary

```
streamline-site/
  clients/
    blom-mockup
    recklessbear-mockup
    cw-mockup
    ameli-mockup
  automation/
    stage-1-quote-form
    stage-2-ai-quote
    stage-3-crm
    stage-4-trello
    stage-5-whatsapp
    stage-6-summary
  showreel/
    blom-walkthrough              (video)
    blom-walkthrough-poster       (image)
    ameli-walkthrough             (video)
    ameli-walkthrough-poster      (image)
```

**14 assets total** — 4 client mockups, 6 automation screens, 2 videos, 2 video posters.

---

## After every upload

1. Open Cloudinary and copy the new full delivery URL (right-click → copy URL).
2. Find the matching `const` in the file noted under "Path constant in code".
3. Replace the placeholder URL string. The constant name does not change.
4. Save, hard-reload the dev server, verify the asset renders in the right slot.
5. Commit each replacement with a short message, e.g. `assets: upload BLOM case-study mockup`.

No other code changes are required when swapping URLs — the constants are the
single source of truth.
