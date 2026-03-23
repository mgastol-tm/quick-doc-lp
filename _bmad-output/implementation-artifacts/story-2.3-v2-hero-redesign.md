# Story 2.3 — V2 Hero Redesign for Standalone Checkout

## Summary
Created a v2 variant of the `/zwolnienia-lekarskie-online-l4/umow-wizyte` page at `/umow-wizyte-v2` with a redesigned hero section featuring a full-bleed photo background, sticky scroll effect, and transparent navigation.

## Tasks Completed

### Task 1: V2 Page Route
- Created new route at `/zwolnienia-lekarskie-online-l4/umow-wizyte-v2/page.tsx`
- Uses same sections as the L4 landing page (Partners, SocialProof, HowItWorks, PlatformStats, Benefits, EZLAExplainer, Pricing, FAQ, FinalCTA)
- Only the Hero section is different (v2 design)

### Task 2: Photo Background Hero
- Full-bleed hospital corridor photo as hero background (`/hero-doctors-bg.jpg`)
- Ocean blue gradient overlay for text legibility
- Left side: white text content with badge, headline, description, stats ribbon (15min / 24/7 / 100%)
- Right side: glass-card checkout form with mint green "79 zł" price badge
- Desktop: background + left text are sticky, form scrolls independently
- Mobile: stacked layout, form below text

### Task 3: Transparent Header (HeaderV2)
- Created `HeaderV2.tsx` — absolutely positioned, fully transparent
- White text and glass-style buttons that sit on top of the hero image
- Scrolls with the page as part of the layout

### Task 4: Design System Additions (globals.css)
- `.clinical-shadow` — ambient shadow (`0px 12px 32px rgba(27,28,28,0.06)`)
- `.glass-card` — frosted glass effect (92% white, 20px blur)
- `.hero-v2-bg` — gradient mesh background (unused, replaced by photo)
- `.gradient-cta` — green gradient for CTAs
- Blob animation keyframes (`blob-drift`, `blob-drift-alt`)

### Task 5: Atkinson Hyperlegible Font
- Added `Atkinson_Hyperlegible_Next` from Google Fonts to layout
- Available via CSS variable `--font-atkinson`

## Files Created
- `src/app/zwolnienia-lekarskie-online-l4/umow-wizyte-v2/page.tsx`
- `src/components/HeaderV2.tsx`
- `public/hero-doctors-bg.jpg`

## Files Modified
- `src/app/globals.css` — v2 design utilities
- `src/app/layout.tsx` — Atkinson Hyperlegible font import
