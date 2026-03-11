# Story 1.2: Add Hotjar (Contentsquare) Tracking

## Summary

Add Hotjar/Contentsquare session recording and heatmap tracking to the site by updating the Contentsquare script tag in the root layout.

## Background

Hotjar was acquired by Contentsquare. The new Contentsquare UXA script provides Hotjar functionality (heatmaps, session recordings, feedback) under the Contentsquare platform.

## Acceptance Criteria

- [x] Contentsquare script updated to new site ID `b16f5ad0f2797`
- [x] Old Contentsquare script ID `3b3217b57ca5d` removed
- [x] Script loads async in `<head>` of root layout
- [x] No other scripts affected (Cookiebot, GA4 remain unchanged)

---

## Tasks

### Task 1: Update Contentsquare Script ID

- [x] Replace `https://t.contentsquare.net/uxa/3b3217b57ca5d.js` with `https://t.contentsquare.net/uxa/b16f5ad0f2797.js` in `src/app/layout.tsx`

---

## Dev Agent Record

### Implementation Notes

- Updated Contentsquare script src in `src/app/layout.tsx` (line 40)
- No separate Hotjar snippet needed — Contentsquare UXA script includes Hotjar capabilities post-acquisition

### Files Changed

- `src/app/layout.tsx` — Updated Contentsquare script ID
