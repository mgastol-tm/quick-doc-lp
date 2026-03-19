# Story 2.1: Fix Google Ads Conversion Tracking After Domain Migration

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **marketing operator**,
I want **Google Ads to receive conversion signals from doktorteraz.pl purchases**,
so that **Smart Bidding can optimize toward real conversions and stop wasting spend on blind bidding**.

## Context

After migrating from quickdoc.pl to doktorteraz.pl, Google Ads conversion tracking is completely broken. Google Ads reports 0 conversions across both campaigns despite 37 DB-verified paid consultations in the last 14 days (3,323 PLN revenue). gclid capture rate is 100% (working correctly), meaning the front-end URL parameter forwarding works, but no conversion events are reaching GA4 or Google Ads. Smart Bidding cannot optimize, resulting in estimated 200-400 PLN/week wasted spend. All other optimization work (bidding strategy, budget scaling, ad relevance) is blocked until this is resolved.

## Evidence

- Google Ads: 0 conversions reported (last 7 days) across both "Konsultacja z L4" and "Wizyta Lekarska Online" campaigns
- DB ground truth: 37 paid consultations, 3,323 PLN revenue (last 14 days)
- gclid capture rate: 100% (working correctly via `TrackingParams.tsx`)
- The conversion pipeline broke during the quickdoc.pl -> doktorteraz.pl domain migration
- Source: [docs/sprint-artifacts/sem-improvement-memo.md]

## Important: Conversion Happens Server-Side

**The conversion (payment + booking) is handled entirely server-side by Telemedi's API.** The `EmbedCheckout` component embeds Telemedi's checkout flow via iframe/JS SDK. The `onSuccess` callback fires client-side after the server has already processed the payment, but the actual conversion event needs to be sent from the server, not the client.

This means the fix is NOT about adding a client-side `gtag('event', 'purchase')` call. Instead:
1. **Server-side conversion import** — Use Google Ads offline conversion import via the gclid (already captured at 100% rate in the DB). Upload conversions from the Telemedi DB to Google Ads using the Conversions API.
2. **Or GA4 Measurement Protocol** — Send a server-side `purchase` event to GA4 using the Measurement Protocol, which then flows to Google Ads via the GA4 link.
3. The client-side `onSuccess` callback (EmbedCheckout.tsx:78) could fire a GA4 event as a supplementary signal, but it should NOT be the primary conversion tracking method.

## Additional Issues (from code review)

1. **No Google Ads conversion tag configured.** `layout.tsx` loads GA4 (`G-1JPTVN6VCT`) but has no `gtag('config', 'AW-XXXXXXXXX')` for Google Ads conversion linking.

2. **GA4 data stream may not include doktorteraz.pl.** The GA4 property was likely set up for quickdoc.pl. The data stream needs to include doktorteraz.pl as an accepted domain.

3. **GA4 <> Google Ads account linking status unknown.** The link between GA4 and the Google Ads account must be active for conversion import to work.

## Acceptance Criteria

1. `gtag('event', 'purchase', { value, currency, transaction_id })` fires on every successful checkout in `EmbedCheckout.tsx` `onSuccess` callback
2. Google Ads conversion tag ID (`AW-XXXXXXXXX`) is configured in `layout.tsx` alongside the GA4 tag
3. GA4 data stream includes doktorteraz.pl domain (verified in GA4 Admin > Data Streams)
4. GA4 <> Google Ads account linking is active (verified in GA4 Admin > Google Ads Links)
5. Google Ads conversion action is configured to import the GA4 purchase event
6. Conversion data appears in Google Ads within 48 hours of deployment
7. End-to-end test: visit doktorteraz.pl -> complete checkout -> verify purchase event in GA4 Real-time -> verify conversion in Google Ads

## Tasks / Subtasks

- [ ] Task 1: Fire `purchase` event on successful checkout (AC: #1)
  - [ ] 1.1 In `src/components/EmbedCheckout.tsx`, add `gtag('event', 'purchase', ...)` call inside the `onSuccess` callback (line ~78)
  - [ ] 1.2 Include `value` (consultation price, e.g. 79 or 89), `currency: 'PLN'`, and `transaction_id` from `result.consultationId`
  - [ ] 1.3 Add TypeScript declaration for `window.gtag` (or extend existing one in `CookieConsent.tsx`)
  - [ ] 1.4 If `EmbedFindDoctor.tsx` has an `onCheckoutSuccess` callback, add the same `gtag` purchase event there
  - [ ] 1.5 Respect Cookiebot consent: only fire gtag if analytics cookies are accepted (check `Cookiebot.consent.statistics`)

- [ ] Task 2: Add Google Ads conversion tag to layout (AC: #2)
  - [ ] 2.1 Get the Google Ads conversion ID (`AW-XXXXXXXXX`) from Google Ads account (Maciek to provide)
  - [ ] 2.2 Add `gtag('config', 'AW-XXXXXXXXX')` in `src/app/layout.tsx` after the GA4 config line (line ~38)
  - [ ] 2.3 Optionally add `gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/LABEL' })` for direct conversion tracking as backup

- [ ] Task 3: Verify GA4 data stream configuration (AC: #3)
  - [ ] 3.1 In GA4 Admin > Data Streams, verify the web stream includes doktorteraz.pl
  - [ ] 3.2 If stream only has quickdoc.pl, either add doktorteraz.pl as additional domain or create new stream
  - [ ] 3.3 Verify measurement ID `G-1JPTVN6VCT` is the correct one for the doktorteraz.pl stream

- [ ] Task 4: Verify GA4 <> Google Ads linking (AC: #4, #5)
  - [ ] 4.1 In GA4 Admin > Google Ads Links, verify the link is active
  - [ ] 4.2 In Google Ads > Tools > Conversions, verify conversion action imports GA4 purchase event
  - [ ] 4.3 If conversion action points to old quickdoc.pl domain, update it

- [ ] Task 5: End-to-end testing (AC: #6, #7)
  - [ ] 5.1 Deploy code changes to staging/preview
  - [ ] 5.2 Open doktorteraz.pl in Chrome with GA4 DebugView enabled
  - [ ] 5.3 Complete a test checkout flow
  - [ ] 5.4 Verify `purchase` event appears in GA4 Real-time report
  - [ ] 5.5 Verify conversion appears in Google Ads within 48 hours
  - [ ] 5.6 Check Google Ads Tag Assistant to confirm tag fires correctly

## Dev Notes

### Key Code Locations

- `src/app/layout.tsx` — GA4 script tag and measurement ID (`G-1JPTVN6VCT`). Add Google Ads tag here.
- `src/components/EmbedCheckout.tsx` — Telemedi checkout embed. `onSuccess` callback at line ~78 is where purchase event must fire.
- `src/components/EmbedFindDoctor.tsx` — Find-doctor widget with `onCheckoutSuccess`. May also need purchase event.
- `src/components/TrackingParams.tsx` — Captures gclid and UTM params to sessionStorage. Working correctly.
- `src/components/CookieConsent.tsx` — Has existing `window.gtag` type declaration and consent handling logic.

### Architecture Constraints

- Next.js 16 / React 19 / App Router — gtag calls must happen client-side only
- Cookiebot (`data-cbid: 52f980d9-6576-4679-a4cf-dfc63ab4b558`) manages consent — gtag must respect consent mode
- The `onSuccess` callback receives `{ consultationId, surveyUrl? }` — use `consultationId` as `transaction_id`
- Consultation price is not returned in `onSuccess` — may need to hardcode or derive from page context (L4 = 79 PLN, general = varies)

### External Configuration Required (Google Ads / GA4 UI)

- Google Ads conversion action settings must point to doktorteraz.pl
- GA4 data stream must include doktorteraz.pl domain
- GA4 <> Google Ads account link must be active
- These are UI-only changes, not code changes

### Previous Story Intelligence

From story 1.4 (find-doctor-embed-page):
- Domain rebrand from quickdoc.pl to doktorteraz.pl was completed
- `source: "quickdoc"` kept in EmbedCheckout as Telemedi API attribution (not user-facing)
- `detailedSource` uses `doktorteraz.pl${window.location.pathname}` format
- Cloudflare Pages serves both quickdoc.pl (legacy) and doktorteraz.pl domains

### References

- [Source: docs/sprint-artifacts/sem-improvement-memo.md#Issue 1]
- [Source: src/app/layout.tsx — GA4 tag configuration]
- [Source: src/components/EmbedCheckout.tsx — onSuccess callback missing purchase event]
- [Source: src/components/CookieConsent.tsx — existing gtag type declaration]

## Priority

Critical — all other SEM optimization work (Smart Bidding, budget scaling, ad relevance improvements) is blocked until conversion tracking works. Estimated 200-400 PLN/week wasted while unresolved.

## Files to Modify

- `src/app/layout.tsx` — Add Google Ads conversion tag (`AW-XXXXXXXXX`)
- `src/components/EmbedCheckout.tsx` — Fire `gtag('event', 'purchase', ...)` in `onSuccess`
- `src/components/EmbedFindDoctor.tsx` — Fire `gtag('event', 'purchase', ...)` in `onCheckoutSuccess` (if applicable)
- Google Ads UI: Conversion action settings (point to doktorteraz.pl)
- GA4 UI: Data streams (add doktorteraz.pl), linked accounts (verify Google Ads link)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

### Completion Notes List

- Ultimate context engine analysis completed — comprehensive developer guide created
- Root cause identified from direct code review: no purchase event firing + no Google Ads tag configured

### File List
