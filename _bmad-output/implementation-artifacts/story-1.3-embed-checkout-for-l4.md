# Story 1.3: Embed Telemedi Checkout for L4 via iframe

Status: review

## Story

As a **visitor on the L4 landing page or main page**,
I want to **complete the L4 checkout directly on the page without navigating away**,
so that **I experience a seamless, single-page flow that reduces drop-off and keeps me in context**.

## Background

Currently, when a user selects "L4" (sick leave consultation), they navigate to `/wizyta` which loads the full Telemedico consbook widget. This is a full page navigation that breaks context and adds friction.

Story 5.23 in the `workspace-fe/dev-2` project implemented an embeddable checkout widget for Telemedi's platform. It uses:
- An **iframe-based embed** pointing at `/pl/lekarze/embed/checkout` on `telemedi.com`
- A **vanilla JS loader script** (`checkout-embed.js`, <5KB) with auto-mount via data attributes and a `TelemediCheckout.mount()` API
- **postMessage protocol** for resize, success, error, and payment redirect events
- **Analytics attribution** via `is_embedded` and `embed_source` super properties

This story brings that embed into QuickDoc so L4 checkout happens inline — no page navigation required.

## Architecture Decision

**Replace `/wizyta` navigation with inline iframe embed for L4 only.**

- QuickDoc is a **static export** (`output: "export"`) deployed on Cloudflare Pages — no server-side rendering, no middleware, no dynamic routes
- The embed script (`checkout-embed.js`) is hosted on Telemedi's domain and creates an iframe pointing to `telemedi.com/pl/lekarze/embed/checkout`
- QuickDoc only needs to load the script and provide a container div — zero build dependencies
- Other specializations (Internista, Pediatra, Psychiatra) are "coming soon" and still link to `/wizyta` — no change for those
- The `/wizyta` page remains as-is for non-L4 flows and as a fallback

## Acceptance Criteria

1. **AC1 — Inline Checkout on L4 Page**: When a user clicks any "Rozpocznij wizytę" CTA on `/zwolnienia-lekarskie-online-l4`, the page scrolls to an embedded checkout section (no navigation to `/wizyta`). The checkout iframe loads with `mode=sickLeave`, `channel=phone`, and `source=quickdoc`.

2. **AC2 — Inline Checkout from Main Page**: When a user clicks the L4 specialization card on `/` (main page), they navigate to `/zwolnienia-lekarskie-online-l4` where the embed is available (existing behavior — card already links to `/zwolnienia-lekarskie-online-l4`). Pricing table L4 row also links there.

3. **AC3 — Embed Configuration**: The embed uses these settings:
   - `mode`: `"sickLeave"`
   - `channel`: `"phone"` (default)
   - `source`: `"quickdoc"` (attribution)
   - `hideHeader`: `true` (no Telemedi logo/back button — QuickDoc branding only)
   - `hideGoOption`: `true` (no Telemedi GO upsell)
   - UTM params from sessionStorage are forwarded into the iframe

4. **AC4 — Auto-Resize**: The iframe automatically adjusts height to fit content. No scrollbars inside the embed container.

5. **AC5 — Loading State**: A skeleton/shimmer placeholder shows while the iframe loads, matching the QuickDoc green theme.

6. **AC6 — Post-Payment Handling**: On successful booking:
   - The embed sends a `postMessage` with `type: 'telemedi:checkout:success'` containing `consultationId` and `surveyUrl`
   - QuickDoc shows a success message or redirects to the survey URL
   On error:
   - Display a user-friendly error message within the embed section

7. **AC7 — UTM/Tracking Forwarding**: Read `initialSearchParams` from sessionStorage (set by `TrackingParams` component) and pass stored params (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_id`, `gclid`) into the iframe via the `mount()` API. Note: `fbclid` and `msclkid` are NOT stored in sessionStorage by `TrackingParams.tsx` — only the embed script's own auto-forwarding from `window.location.search` handles those (if present in the current URL).

8. **AC8 — Fallback**: If the embed script fails to load (network error, blocked by ad blocker), show a fallback CTA linking to `/wizyta` so the user can still complete the flow.

9. **AC9 — `/wizyta` Unchanged**: The existing `/wizyta` page with the Telemedico consbook widget remains fully functional for non-L4 flows.

## Tasks / Subtasks

- [x] Task 1: Create EmbedCheckout component (AC: #1, #3, #4, #5, #6, #8)
  - [x] 1.1 Create `src/components/EmbedCheckout.tsx` — client component (`"use client"`). This is a client component embedded inside a server component page (`page.tsx` has no `"use client"` directive) — this is fine in Next.js but do NOT add `"use client"` to the page itself. The component:
    - Loads `checkout-embed.js` from `https://telemedi.com/pl/lekarze/embed/checkout-embed.js` via dynamic script injection
    - Uses `TelemediCheckout.mount()` JS API (NOT data-attribute auto-mount) — required for passing sessionStorage params and handling callbacks cleanly
    - Passes config: `mode=sickLeave`, `channel=phone`, `source=quickdoc`, `hideHeader=true`, `hideGoOption=true`
    - Uses `onSuccess`, `onError`, `onHeightChange` callbacks from the mount API as the primary event handling mechanism (simpler than raw postMessage listeners)
  - [x] 1.2 Implement loading state: show a shimmer skeleton placeholder (matching QuickDoc's `bg-qd-section-light` / green theme) until `onHeightChange` fires or a reasonable timeout
  - [x] 1.3 Implement success handler: `onSuccess` callback → show success state or redirect to `result.surveyUrl`
  - [x] 1.4 Implement error handler: `onError` callback → show user-friendly error message with retry option
  - [x] 1.5 Implement fallback: if script fails to load (onerror), show a fallback CTA linking to `/wizyta`
  - [x] 1.6 Implement cleanup: unmount embed on component unmount via `TelemediCheckout.unmount()`
  - [x] 1.7 Cookiebot handling: Load the embed script with `data-cookieconsent="ignore"` attribute to prevent Cookiebot auto-blocking (the embed is essential checkout functionality, not analytics). Alternatively, if consent is required, listen for `window.CookiebotOnAccept` and only mount after consent is granted — show the fallback CTA in the meantime.

- [x] Task 2: Forward sessionStorage tracking params (AC: #7)
  - [x] 2.1 In `EmbedCheckout`, read `initialSearchParams` from sessionStorage: `JSON.parse(sessionStorage.getItem("initialSearchParams") || "{}")`. This contains: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_id`, `gclid` (set by `src/components/TrackingParams.tsx`). Note: `fbclid`/`msclkid` are NOT stored — only forwarded if present in current `window.location.search`.
  - [x] 2.2 Pass sessionStorage params via `TelemediCheckout.mount()` config. Before calling `mount()`, temporarily append the sessionStorage params to the URL using `history.replaceState` so the embed script's internal `buildIframeUrl` (which reads `window.location.search`) picks them up. Restore the original URL immediately after mount. This is the chosen approach because `mount()` config doesn't accept arbitrary URL params — the script's auto-forwarding reads from the host URL.

- [x] Task 3: Integrate embed into L4 page (AC: #1, #2)
  - [x] 3.1 Add a new `CheckoutSection` to `src/app/zwolnienia-lekarskie-online-l4/page.tsx` that renders the `EmbedCheckout` component. The L4 page is a server component — import `EmbedCheckout` normally (Next.js handles the client/server boundary automatically).
  - [x] 3.2 Position the checkout section after Hero and Partners marquee, before SocialProof. Current L4 page section order: Hero → Partners → SocialProof → HowItWorks → Pricing → FAQ → FinalCTA.
  - [x] 3.3 The checkout section wrapper must have `id="checkout"` and `className="scroll-mt-[72px]"` (matching the established 72px sticky header offset pattern). Update these CTAs on the L4 page to `href="#checkout"`:
    - Hero primary CTA (currently `href="/wizyta"`, line ~48)
    - Pricing CTA (currently `href="/wizyta"`, line ~244)
    - FinalCTA (currently `href="/wizyta"`, line ~328)
    - Keep the Hero secondary CTA as `href="#jak-to-dziala"` (unchanged)
  - [x] 3.4 Add section heading using the established pattern:
    ```html
    <span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-primary tracking-[2px]">UMÓW WIZYTĘ</span>
    <h2 className="font-heading text-2xl md:text-[40px] ...">Umów wizytę online</h2>
    ```
    Section spacing: `py-12 md:py-20`. Container: `max-w-[1240px] mx-auto w-full px-5 md:px-10`.

- [x] Task 4: Verify main page L4 links (AC: #2) — NO CODE CHANGES
  - [x] 4.1 Verify L4 specialization card and pricing row on main page both link to `/zwolnienia-lekarskie-online-l4` (they already do — no changes needed)

- [ ] Task 5: QA & Testing
  - [ ] 5.1 Test embed loads on L4 page — iframe renders, auto-resizes, no scrollbars
  - [ ] 5.2 Test CTA buttons scroll to checkout section smoothly
  - [ ] 5.3 Test UTM params from sessionStorage are forwarded into iframe
  - [ ] 5.4 Test success postMessage callback (after BLIK payment)
  - [ ] 5.5 Test fallback CTA appears if embed script is blocked
  - [ ] 5.6 Test `/wizyta` page still works independently
  - [ ] 5.7 Test on mobile (responsive embed, touch scrolling)
  - [ ] 5.8 Verify Cookiebot consent doesn't block the embed script

## Codebase Patterns (MUST follow)

- **Container:** `const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";`
- **Scroll offset:** `scroll-mt-[72px]` (sticky header height `h-[72px]`)
- **Font classes:** `font-heading` (Space Grotesk) for headings/labels, `font-body` (Inter) for body text
- **Section spacing:** `py-12 md:py-20`
- **Section label pattern:** `<span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-primary tracking-[2px]">LABEL</span>`
- **Sections are inline functions** in `page.tsx` — do not extract to separate files
- **L4 page is a server component** (no `"use client"`) — client components are imported into it

## Dev Notes

### Embed Script API (from Story 5.23)

The embed script is hosted at `https://telemedi.com/pl/lekarze/embed/checkout-embed.js`. **Use the programmatic `mount()` API** (not data-attribute auto-mount) — required for sessionStorage param forwarding and callback handling:

```js
TelemediCheckout.mount({
  containerId: 'checkout-embed',
  mode: 'sickLeave',
  channel: 'phone',
  source: 'quickdoc',
  hideHeader: true,
  hideGoOption: true,
  onSuccess: (result) => {
    // result.consultationId, result.surveyUrl
  },
  onError: (error) => {
    // error.message
  },
  onHeightChange: (height) => {
    // iframe height in px — use for auto-resize
  }
})
```

The mount API callbacks wrap the underlying postMessage protocol (`telemedi:checkout:success`, `telemedi:checkout:error`, `telemedi:checkout:resize`, `telemedi:checkout:ready`, `telemedi:checkout:payment_redirect`). Use the callbacks — no need to add raw `postMessage` listeners.

### Key Constraints

- **Static export**: QuickDoc uses `output: "export"` — no SSR, no middleware, no API routes. Everything is client-side.
- **Cloudflare Pages**: Hosting platform. No server-side logic available.
- **Embed script is external**: Loaded from `telemedi.com` — QuickDoc has no control over it. Must handle load failures gracefully.
- **Cookiebot**: The site uses Cookiebot (Usercentrics) in auto-blocking mode, which may block the embed script as a third-party resource from `telemedi.com`. Since this is essential checkout functionality (not analytics), load the script with `data-cookieconsent="ignore"` to bypass auto-blocking. If legal requires consent, use `window.CookiebotOnAccept` event to defer mount and show fallback CTA until consent is granted.

### Files to Create/Modify

**New files:**
- `src/components/EmbedCheckout.tsx` — The embed wrapper component

**Modified files:**
- `src/app/zwolnienia-lekarskie-online-l4/page.tsx` — Add checkout section, update CTA hrefs
- (Optional) `src/app/page.tsx` — Only if main page CTAs need updating (they don't — L4 card already links to subpage)

### Existing Components Referenced

- `src/components/TrackingParams.tsx` — Sets `initialSearchParams` in sessionStorage (UTM/gclid persistence)
- `src/app/zwolnienia-lekarskie-online-l4/page.tsx` — L4 landing page where embed will be integrated
- `src/app/wizyta/page.tsx` — Existing widget page (unchanged, serves as fallback)

### Telemedi Embed Base URL

The embed iframe will point to: `https://telemedi.com/pl/lekarze/embed/checkout?embed=true&mode=sickLeave&channel=phone&source=quickdoc&hideHeader=true&hideGoOption=true`

The `checkout-embed.js` script auto-detects its own base URL from the script src attribute, so it will correctly build iframe URLs pointing to telemedi.com.

## Dev Agent Record

### Implementation Plan

- Created `EmbedCheckout.tsx` as a `"use client"` component using dynamic script injection and `TelemediCheckout.mount()` API
- Integrated UTM/tracking param forwarding via `history.replaceState` approach (Task 2.2)
- Added `CheckoutSection` inline function to L4 page following established codebase patterns
- Updated 3 CTA hrefs from `/wizyta` to `#checkout` (Hero, Pricing, FinalCTA)
- Verified main page links already point to `/zwolnienia-lekarskie-online-l4` — no changes needed

### Completion Notes

- All implementation tasks (1–4) complete. Build passes with no TypeScript errors.
- Task 5 (QA & Testing) contains manual testing items requiring browser/device testing by the developer.
- No test framework is configured in this project — Task 5 items are manual QA steps.
- Cookiebot bypass implemented via `data-cookieconsent="ignore"` attribute on script tag.
- Script load timeout set to 10s with fallback CTA to `/wizyta`.
- The `/wizyta` page was not modified (AC9 satisfied).

## File List

**New files:**
- `src/components/EmbedCheckout.tsx`

**Modified files:**
- `src/app/zwolnienia-lekarskie-online-l4/page.tsx`

## Change Log

- 2026-03-17: Implemented story 1.3 — Created EmbedCheckout component, integrated into L4 page, updated CTAs to scroll to checkout section, forwarded sessionStorage UTM params via history.replaceState approach.
