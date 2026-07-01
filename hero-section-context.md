# Hero Section Context — Streamline Site V2

## Where we are

Building a new Higgsfield AI video hero to replace `HeroNetworkScroll.tsx`.

Concept: **"Website being built"** — dots scatter → connections form → wireframe assembles → wireframe powers up (neon).

---

## What's been generated

### 4 Keyframes (saved to scratchpad — also in Higgsfield dashboard)
- **Frame A** — 2 isolated glowing dots on black, sparse, cinematic
- **Frame B** — ~14 scattered purple/white dots, no connections yet
- **Frame C** — dots connected by thin purple lines, wireframe skeleton of a webpage layout
- **Frame D v2** — bright neon wireframe "powered up" — clean, no AI text (first Frame D had gibberish text, was regenerated)

Model used: `soul_cinematic` (Higgsfield CLI)

### 3 Video Clips (Kling 3.0, mode pro, sound off, 5s each)
- **Clip 1 — The Awakening** (Frame A → Frame B): dots appearing
  `https://d8j0ntlcm91z4.cloudfront.net/user_3FnuP7XNXd9KDozWClG0kx0zmiD/hf_20260630_164713_8e520310-4d5d-48bf-aa7b-549a080d58f0.mp4`
- **Clip 2 — The Connection** (Frame B → Frame C): dots connecting into wireframe
  `https://d8j0ntlcm91z4.cloudfront.net/user_3FnuP7XNXd9KDozWClG0kx0zmiD/hf_20260630_164713_1be6d2ba-5d15-456f-a786-604a7e209fda.mp4`
- **Clip 3 — The Render** (Frame C → Frame D v2): wireframe powers up neon
  `https://d8j0ntlcm91z4.cloudfront.net/user_3FnuP7XNXd9KDozWClG0kx0zmiD/hf_20260630_164714_86f7ffac-58c0-424d-8ba1-473a2097efe1.mp4`

**Christiaan has NOT reviewed the clips yet.** Review first before integrating.

---

## Next steps (in order)

1. **Christiaan watches all 3 clips** — confirm happy or flag what to regenerate
2. **Download all 3 MP4s** — `curl` or browser download
3. **Extract JPEG frame sequences** via ffmpeg:
   ```bash
   ffmpeg -i clip1.mp4 -vf fps=24 public/assets/hero-frames/%04d.jpg
   # merge all 3 clips into one sequence, ~360 frames total
   ```
4. **Build `HeroBuilderScroll.tsx`** — same pattern as `HeroVideoScroll.tsx`:
   - GSAP ScrollTrigger, `pinType: 'transform'`, `scrub: 0.5`
   - Canvas/img scrub through frame sequence on scroll
   - Text reveal at ~60% scroll progress
   - `data-header-dark=""` (nav light text over dark video)
   - `prefers-reduced-motion` fallback
5. **Update `src/site/pages/Home.tsx`** — swap `HeroNetworkScroll` → `HeroBuilderScroll`

---

## Key file paths

| File | Status |
|------|--------|
| `src/site/pages/Home.tsx` | Uses `HeroNetworkScroll` currently |
| `src/site/components/site/HeroNetworkScroll.tsx` | Active hero (canvas particle network) — will be replaced |
| `src/site/components/site/HeroVideoScroll.tsx` | Reference pattern for frame-sequence hero |
| `src/site/lib/gsap.ts` | Re-exports from `../../lib/gsap-setup` — use this import path |
| `public/assets/hero-frames/` | Where JPEG frames will go (create this folder) |

---

## Critical GSAP note
Pins must use `pinType: 'transform'` — the root `#top` div has `overflow-x: hidden` which breaks default fixed pinning.

---

## Higgsfield CLI (already set up)
- Auth: done (logged in)
- Skills: installed at `.agents/skills/higgsfield-generate/`
- To generate more: `higgsfield generate create --job-type kling3_0 --mode pro --sound off ...`
