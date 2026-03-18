# Story 1.4: Find Doctor + Checkout Embed Page

Status: Done

## Story

As a **visitor**, I want to **browse available specializations, pick a doctor and complete booking — all on the QuickDoc landing page** so that I can book any type of consultation without leaving the site.

## Dependencies

- **Telemedi Find-Doctor Widget** (`telemedi-find-doctor-widget.js`) — renders the specialization/doctor picker inline (not in iframe).
- **Telemedi Checkout Embed** (via `checkoutEmbedTarget`) — when user clicks CTA in the widget, a checkout iframe appears in a designated container on the same page.
- **Story 5.24** (Unified Find-Doctor + Checkout Embed Flow) on workspace-fe — provides the `checkoutEmbedTarget` option.

## Acceptance Criteria

1. New page at `/wizyty-lekarskie-online-umow-wizyte` with find-doctor widget + inline checkout.
2. Widget loads the `TelemediFindDoctorWidget` script from `telemedi.com` and mounts via JS API.
3. User can select any specialization (not locked to sickLeave like the L4 page).
4. CTA click opens checkout iframe inline (no page navigation) via `checkoutEmbedTarget`.
5. Page has same supporting sections as L4 checkout page: SocialProof, Partners, HowItWorks, Pricing, FAQ, FinalCTA.
6. Copy is generic (not L4-specific): "Znajdź lekarza i umów wizytę", "od 79 zł", etc.

## Tasks

- [x] Task 1: Create `EmbedFindDoctor.tsx` client component
  - Loads `telemedi-find-doctor-widget.js` script dynamically
  - Mounts `TelemediFindDoctorWidget` with `checkoutEmbedTarget`, `apiHost`, `hideGoOption`, `hideNfzOption`
  - Handles React strict mode (doesn't remove script on cleanup)
  - Forwards sessionStorage tracking params via `history.replaceState`
  - Fallback UI if script fails to load

- [x] Task 2: Create page at `/wizyty-lekarskie-online-umow-wizyte`
  - Same structure as `zwolnienia-lekarskie-l4-umow-wizyte`
  - Uses `EmbedFindDoctor` instead of `EmbedCheckout`
  - Generic copy for all specializations

## Additional Changes

- Reverted branding from "Doktor Teraz" back to "QuickDoc" across all pages
- Moved old `/zwolnienia-lekarskie-online-l4` content to `/zwolnienia-lekarskie-online-l4-info`
- Made `/zwolnienia-lekarskie-online-l4` mirror the checkout page (`zwolnienia-lekarskie-l4-umow-wizyte`)
- Removed iframe `margin-bottom: -250px` hack from `EmbedCheckout.tsx`

## New Files

- `src/components/EmbedFindDoctor.tsx` — find-doctor widget loader + mount component
- `src/app/wizyty-lekarskie-online-umow-wizyte/page.tsx` — new page
- `src/app/zwolnienia-lekarskie-online-l4-info/page.tsx` — old L4 info page (moved)

## Modified Files

- `src/components/EmbedCheckout.tsx` — removed iframe margin hack
- `src/components/Header.tsx` — QuickDoc branding
- `src/components/Footer.tsx` — QuickDoc branding
- `src/app/layout.tsx` — QuickDoc metadata
- `src/app/page.tsx` — DLACZEGO QUICKDOC
- `src/app/o-nas/page.tsx` — QuickDoc branding
- `src/app/kontakt/page.tsx` — quickdoc.pl emails
- `src/app/kariera/page.tsx` — quickdoc.pl emails
- `src/app/zwolnienia-lekarskie-online-l4/page.tsx` — now mirrors checkout page
- `src/app/zwolnienia-lekarskie-l4-umow-wizyte/page.tsx` — QuickDoc metadata
- `public/robots.txt` — quickdoc.pl sitemap URL

## Mount Config

```js
TelemediFindDoctorWidget.mount({
  containerId: 'find-doctor-widget',
  checkoutEmbedTarget: 'find-doctor-checkout',
  apiHost: 'https://telemedi.co',
  defaultChannel: 'phone',
  utmSource: 'quickdoc',
  utmMedium: 'embed',
  hideGoOption: true,
  hideNfzOption: true,
})
```
