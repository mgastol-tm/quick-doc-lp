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

---

### Update: Copy & Messaging Alignment (2026-03-24)

Aligned landing page copy with ezwolnienie-24.pl core messaging for stronger conversion focus.

#### Hero
- H1: "E-zwolnienie lekarskie **bez wizyty** w przychodni" (was: "Konsultacja ze zwolnieniem lekarskim L4 online")
- Subtitle: "Konsultacja lekarska ze zwolnieniem za **79 zł** — nawet w **2 godziny**. Wygodnie, bezpiecznie, bez kolejek."
- Badge: "Lekarze dostępni teraz"
- Stat changed: "~2h / Nawet w 2 godziny" (was: "15min / Śr. czas konsultacji")

#### How It Works — simplified to 3 clear steps
1. Wypełnij ankietę (2 minuty)
2. Opłać konsultację (79 zł, bez ukrytych kosztów)
3. Lekarz wystawia e-zwolnienie (automatycznie do ZUS)

#### Benefits — updated to match competitor messaging
- "Szybkość i wygoda — bez kolejek"
- "Bez wychodzenia z domu"
- "Wykwalifikowany personel medyczny"
- "Dostępność 24/7"
- Tagline: "Wygodnie, bezpiecznie, szybko — pod kontrolą wykwalifikowanych lekarzy."

#### CTA
- "Zamów konsultację z e-zwolnieniem" (was: "Rozpocznij wizytę 79 zł")
- "Bez wizyty w przychodni. Bez kolejek. Nawet w 2 godziny."

#### Reviews (SocialProof.tsx)
- Added 3 real competitor-style reviews as first entries (Bożena, Grzegorz, Kacper)
- Updated remaining reviews to emphasize speed, e-ZLA on IKP, no clinic visit, 24/7 availability, auto employer delivery

#### Footer & Widget
- Privacy policy and terms linked to local PDFs (`/polityka-prywatnosci.pdf`, `/regulamin.pdf`)
- `termsUrl` and `privacyPolicyUrl` passed to widget mount config
- Removed "Firma" section and "Regulamin organizacyjny" from footer

#### Files Modified
- `src/app/zwolnienia-lekarskie-online-l4/page.tsx` — hero, how-it-works, benefits, pricing, CTA copy
- `src/components/SocialProof.tsx` — all reviews rewritten
- `src/components/Footer.tsx` — local PDF links, removed Firma section
- `src/components/EmbedCheckoutStandalone.tsx` — termsUrl, privacyPolicyUrl
- `src/components/EmbedCheckout.tsx` — type definitions
- `public/regulamin.pdf` — added
- `public/polityka-prywatnosci.pdf` — added
