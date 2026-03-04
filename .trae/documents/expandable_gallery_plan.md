# Plan: Interactive Gallery & Ameli Page Updates

We will implement the interactive "expandable" gallery for the mobile phone screens, swap the hero image, and fix the CTA button link.

## 1. Hero Section Update
-   **Task:** Replace the current hero image (`ameli_long_scroll_fnptut.png`) with the **Mockup Image** (`Ameli_Portfolio_Mockup_2_r2tj1w.png`).
-   **Style:** Keep it full-screen width, raw (no borders/containers).

## 2. Interactive Mobile Gallery (`ExpandableGallery`)
-   **Component:** Create `src/components/ui/ExpandableGallery.tsx`.
-   **Functionality:**
    -   Displays 3 images in a responsive row.
    -   **Click/Tap:** Expands the selected image to center screen with a backdrop blur (Lightbox effect).
    -   **Animation:** Uses `framer-motion` layout transitions for smooth zooming.
-   **Assets:** Since we currently only have the single "3-phones" composite image, I will set up the component with **3 placeholder slots**.
    -   *Note:* To make this look perfect, you will need to provide the 3 individual phone screen images later. For now, I will use the composite image as a placeholder so you can see the interaction working.

## 3. Integration in `AmeliVanZyl.tsx`
-   Replace the static mobile image section with the new `<ExpandableGallery />`.
-   Pass the placeholder images (or duplicates of the current one) to it.

## 4. Fix CTA Button
-   **Task:** Update the "Start Your Project" button at the bottom of the page.
-   **Change:** Ensure `to="/contact"` is set correctly so it navigates to the contact page.

## 5. Execution Steps
1.  Create `src/components/ui/ExpandableGallery.tsx`.
2.  Modify `src/pages/portfolio/AmeliVanZyl.tsx` to:
    -   Swap the hero image.
    -   Import and use `ExpandableGallery`.
    -   Update the CTA button link.
3.  Verify animations and links.
