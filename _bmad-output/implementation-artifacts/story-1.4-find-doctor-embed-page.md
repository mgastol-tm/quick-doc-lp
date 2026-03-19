# Story 1.4: Find Doctor + Checkout Embed Page

Status: Done

## Story

As a **visitor**, I want to **browse available specializations, pick a doctor and complete booking — all on the Doktor Teraz landing page** so that I can book any type of consultation without leaving the site.

## Dependencies

- **Telemedi Find-Doctor Widget** (`telemedi-find-doctor-widget.js`) — renders the specialization/doctor picker inline (not in iframe).
- **Telemedi Checkout Embed** (via `checkoutEmbed: true`) — when user clicks CTA in the widget, it replaces itself with the checkout iframe in-place.
- **Story 5.24** (Unified Find-Doctor + Checkout Embed Flow) on workspace-fe — provides the `checkoutEmbed` option.

## Acceptance Criteria

1. New page at `/wizyty-lekarskie-online-umow-wizyte` with find-doctor widget + inline checkout.
2. Widget loads the `TelemediFindDoctorWidget` script from `telemedi.com` and mounts via JS API.
3. User can select any specialization (not locked to sickLeave like the L4 page).
4. CTA click replaces widget with checkout iframe in-place (no page navigation) via `checkoutEmbed: true`.
5. Page has same supporting sections as L4 checkout page: SocialProof, Partners, HowItWorks, Pricing, FAQ, FinalCTA.
6. Copy is generic (not L4-specific): "Znajdź lekarza i umów wizytę", "od 79 zł", etc.

## Tasks

- [x] Task 1: Create `EmbedFindDoctor.tsx` client component
  - Loads `telemedi-find-doctor-widget.js` script dynamically
  - Mounts `TelemediFindDoctorWidget` with `checkoutEmbed: true`, `apiHost`, `hideGoOption`, `hideNfzOption`
  - Handles React strict mode (doesn't remove script on cleanup, checks for existing script tag)
  - Forwards sessionStorage tracking params via `history.replaceState`
  - Fallback UI if script fails to load

- [x] Task 2: Create page at `/wizyty-lekarskie-online-umow-wizyte`
  - Same structure as `zwolnienia-lekarskie-l4-umow-wizyte`
  - Uses `EmbedFindDoctor` instead of `EmbedCheckout`
  - Generic copy for all specializations

- [x] Task 3: Rebrand to "Doktor Teraz"
  - Changed all "QuickDoc" → "Doktor Teraz" across all pages
  - Updated emails to `@doktorteraz.pl`
  - Updated sitemap URL to `doktorteraz.pl`
  - Bound `doktorteraz.pl` and `www.doktorteraz.pl` as custom domains on Cloudflare Pages

## Additional Changes

- Moved old `/zwolnienia-lekarskie-online-l4` content to `/zwolnienia-lekarskie-online-l4-info`
- Made `/zwolnienia-lekarskie-online-l4` mirror the checkout page (`zwolnienia-lekarskie-l4-umow-wizyte`)
- Removed iframe `margin-bottom: -250px` hack from `EmbedCheckout.tsx`
- Updated SocialProof stats: "40 000+ Pacjentów miesięcznie", "500+ Lekarzy specjalistów", "4.9/5 Ocena pacjentów"
- Removed "receptę" references from find-doctor page copy
- Changed pricing feature to "E-zwolnienia i dokumenty medyczne"
- Fixed `EmbedFindDoctor` to use `checkoutEmbed: true` API (replaces widget in-place) instead of `checkoutEmbedTarget`

## New Files

- `src/components/EmbedFindDoctor.tsx` — find-doctor widget loader + mount component
- `src/app/wizyty-lekarskie-online-umow-wizyte/page.tsx` — new page
- `src/app/zwolnienia-lekarskie-online-l4-info/page.tsx` — old L4 info page (moved)

## Modified Files

- `src/components/SocialProof.tsx` — updated stats (40k patients, 500+ doctors)
- `src/components/EmbedCheckout.tsx` — removed iframe margin hack
- `src/components/Header.tsx` — Doktor Teraz branding
- `src/components/Footer.tsx` — Doktor Teraz branding
- `src/app/layout.tsx` — Doktor Teraz metadata
- `src/app/page.tsx` — DLACZEGO DOKTOR TERAZ
- `src/app/o-nas/page.tsx` — Doktor Teraz branding
- `src/app/kontakt/page.tsx` — doktorteraz.pl emails
- `src/app/kariera/page.tsx` — doktorteraz.pl emails
- `src/app/zwolnienia-lekarskie-online-l4/page.tsx` — now mirrors checkout page, Doktor Teraz metadata
- `src/app/zwolnienia-lekarskie-online-l4-info/page.tsx` — Doktor Teraz metadata
- `src/app/zwolnienia-lekarskie-l4-umow-wizyte/page.tsx` — Doktor Teraz metadata
- `src/app/wizyty-lekarskie-online-umow-wizyte/page.tsx` — Doktor Teraz metadata
- `public/robots.txt` — doktorteraz.pl sitemap URL

## Domain Setup

- `doktorteraz.pl` — added as custom domain on Cloudflare Pages (zone: `12813dab8378f33a1b4edb957cc083f2`)
- `www.doktorteraz.pl` — added as custom domain on Cloudflare Pages
- SSL provisioned automatically by Cloudflare (Google CA)
- `quickdoc.pl` — remains as legacy domain on the same Pages project

## Mount Config

```js
TelemediFindDoctorWidget.mount({
  containerId: 'find-doctor-widget',
  apiHost: 'https://telemedi.co',
  checkoutEmbed: true,
  hideGoOption: true,
  hideNfzOption: true,
  onCheckoutSuccess: function(result) {
    console.log('Booking success:', result.consultationId)
  },
})
```

## Note

`source: "quickdoc"` is kept in `EmbedCheckout.tsx` and `wizyta/page.tsx` as it's a Telemedi API attribution parameter, not user-facing branding.
