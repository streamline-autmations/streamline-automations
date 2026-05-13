# Deployment Notes — Scroll Moments Build

Short doc covering everything you need to ship this change.

---

## Install

**No `npm install` required.** All three new libraries (`gsap`, `@gsap/react`,
`lenis`) were already pinned in `package.json` before this build started.
None were added, none were bumped.

If `node_modules` is stale (you haven't run anything in a while), do a clean
boot:

```bash
npm install
npm run dev
```

---

## Environment variables

**None changed.** No new env vars, no rotation. `VITE_POSTHOG_KEY` (analytics)
and existing Supabase vars work exactly as before.

---

## Vercel build settings

**No changes.** Same `vite build` command, same `dist/` output, same Node
version. The deploy hook on `main` will pick up the next commit and ship.

---

## Testing the `prefers-reduced-motion` fallback locally

Reduced-motion users get:

- Lenis disabled → native browser scroll
- CaseStudyCycler → static first slide (no pinning, no scrub)
- AutomationFlow → static first stage (no pinning, no scrub)
- VideoCards in FeaturedWork → poster `<img>` only, `<video>` never mounts

To verify in Chrome / Edge:

1. Open DevTools (F12).
2. Cmd/Ctrl + Shift + P → "Show Rendering".
3. In the Rendering panel, scroll to **"Emulate CSS media feature
   prefers-reduced-motion"**.
4. Set it to **`reduce`**.
5. Hard-reload (Cmd/Ctrl + Shift + R).
6. Scroll the homepage and `/systems` — you should see static fallback layouts
   and no pinning. The videos in Featured Work should render as still images.

To revert: set the dropdown back to **"No emulation"** and reload.

In Safari: same idea via the Develop menu → "Experimental Features" → "Prefers Reduced Motion".

---

## Testing the mobile fallback locally

Below `md` (768px) breakpoint, the cycler and the automation flow render as
stacked vertical cards with simple Framer Motion fade-ups instead of pinned
scroll moments.

1. Open DevTools.
2. Cmd/Ctrl + Shift + M → toggle device toolbar.
3. Set the width to **≤ 767px** (e.g. iPhone 14 → 390px, or use the
   "Responsive" dropdown).
4. Hard-reload.
5. Scroll the homepage — `CaseStudyCycler` should now be 4 stacked cards, and
   the section should not pin.
6. Repeat on `/systems` — `AutomationFlow` should now be 6 stacked phone-frame
   cards.

`LenisProvider` also disables smooth-scroll on touch / ≤768px so native
mobile scroll behaves correctly.

---

## What still needs uploading before the build looks "done"

All scroll moments will render and animate correctly with the current
placeholder Cloudinary URLs — but the placeholder URLs **point to assets that
don't exist yet**, so you'll see broken-image icons until upload.

See `ASSET_MANIFEST.md` (same folder as this file) for the upload checklist —
14 assets total: 4 case-study mockups, 6 automation screens, 2 walkthrough
videos, 2 walkthrough posters.

---

## Files changed in this build

```
M  src/App.tsx
M  src/components/providers/LenisProvider.tsx
M  src/components/white/home/FeaturedWork.tsx
M  src/pages/HomeWhite.tsx
M  src/pages/Systems.tsx
A  src/components/white/home/CaseStudyCycler.tsx
A  src/components/white/home/AutomationFlow.tsx
A  src/components/white/home/StatsStrip.tsx
A  src/components/white/ui/VideoCard.tsx
A  src/hooks/usePrefersReducedMotion.ts
A  src/types/case-study.ts
A  ASSET_MANIFEST.md
A  DEPLOYMENT_NOTES.md
```

**Preserved (not deleted, but no longer imported on `/`):**
`src/components/white/home/ShowcaseZoom.tsx` — keep for later relocation onto
the BLOM case-study page.

---

## Pre-flight before pushing

```bash
npm run lint
npm run build
npm run preview
```

`build` will type-check (the `build` script runs `tsc && vite build`). If
TypeScript errors surface from the new types or hook, they'll surface here
first.
