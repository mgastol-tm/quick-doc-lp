# Story 1.5: Standalone Checkout Widget Page (Shadow DOM)

Status: Done

## Story

As a **visitor**, I want to **complete an L4 sick leave booking using a fast, native checkout form** so that I get a better experience than the iframe-based embed (faster load, no cross-origin issues).

## Dependencies

- **Telemedi Standalone Checkout Widget** (`telemedi-checkout-widget.js`) — Shadow DOM bundle, no iframe, ~280KB gzipped
- **Story 5.26** (Standalone Checkout Widget Bundle) on workspace-fe — provides the widget bundle

## Acceptance Criteria

1. New page at `/zwolnienia-lekarskie-online-l4/umow-wizyte` with standalone checkout widget.
2. Widget loads `telemedi-checkout-widget.js` from `telemedi.com` and mounts via JS API.
3. Same layout as `/zwolnienia-lekarskie-online-l4` (Hero with form on right, Partners, SocialProof, HowItWorks, PlatformStats, Benefits, EZLAExplainer, Pricing, FAQ, FinalCTA).
4. On mobile, checkout form uses full width (no card padding) for better UX.
5. Telemedi Go option hidden (`hideGoOption: true`).
6. BLIK payment disabled (`blikEnabled: false`).
7. Shimmer skeleton shown while widget script loads.
8. `source` set to `doktorteraz.pl/{pathname}` for attribution.

## Tasks

- [x] Task 1: Create `EmbedCheckoutStandalone.tsx` client component
  - Loads `telemedi-checkout-widget.js` script dynamically
  - Mounts `TelemediCheckout` with `mode: "sickLeave"`, `hideHeader`, `hideGoOption`, `blikEnabled: false`
  - Handles React strict mode (checks for existing script tag)
  - Forwards sessionStorage tracking params via `history.replaceState`
  - Shimmer skeleton while loading
  - Fallback UI if script fails to load

- [x] Task 2: Create page at `/zwolnienia-lekarskie-online-l4/umow-wizyte`
  - Same full layout as `/zwolnienia-lekarskie-online-l4`
  - Uses `EmbedCheckoutStandalone` instead of `EmbedCheckout`
  - Mobile: form breaks out of container for full-width, no card padding
  - Desktop: form in white card with border and padding
  - JSON-LD structured data (FAQ, MedicalBusiness, Breadcrumb)

- [x] Task 3: UX polish
  - Changed mobile trust row label from "Lekarze" to "Specjaliści"
  - Removed `overflow-x-hidden` from `<main>` to fix sticky hero text on desktop
  - Left column (badge, heading, description, trust row) now sticks while scrolling through the checkout form

- [x] Task 4: Fix `blikEnabled` forwarding in workspace-fe
  - Added `blikEnabled` to `CheckoutMountConfig` interface
  - Forwarded `blikEnabled` from mount config to `setApiConfig()` call
  - Rebuilt standalone widget bundle

## New Files

- `src/components/EmbedCheckoutStandalone.tsx` — standalone checkout widget loader
- `src/app/zwolnienia-lekarskie-online-l4/umow-wizyte/page.tsx` — new page

## Modified Files (workspace-fe)

- `frontend/widget/checkout/index.tsx` — added `blikEnabled` to mount config and forwarded to `setApiConfig()`

## Modified Files (doktorteraz)

- `src/components/EmbedCheckout.tsx` — made `channel`, `hideGoOption` optional in type; added `onPaymentRedirect` to type

## Mount Config

```js
TelemediCheckout.mount({
  containerId: 'checkout-standalone',
  mode: 'sickLeave',
  source: 'doktorteraz.pl/zwolnienia-lekarskie-online-l4/umow-wizyte',
  hideHeader: true,
  hideGoOption: true,
  blikEnabled: false,
  onSuccess: function(result) { console.log('Checkout success:', result) },
  onError: function(error) { console.error('Checkout error:', error) },
  onPaymentRedirect: function(url) { window.location.href = url },
})
```

## Key Differences from iframe embed (EmbedCheckout)

| Feature | iframe embed | Standalone widget |
|---|---|---|
| Script | `checkout-embed.js` | `telemedi-checkout-widget.js` |
| Rendering | iframe | Shadow DOM |
| Cookie access | Cross-origin (limited) | Direct (same origin) |
| Load time | 3-6 seconds | <1 second |
| Bundle size | N/A (full page in iframe) | ~280KB gzipped |
| Height sync | `onHeightChange` callback | Native (Shadow DOM) |
