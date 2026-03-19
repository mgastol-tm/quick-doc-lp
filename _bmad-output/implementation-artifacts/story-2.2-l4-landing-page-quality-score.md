# Story 2.2: L4 Landing Page Content Optimization for Quality Score 10/10

Status: ready-for-dev

## Story

As a **marketing operator**,
I want **the L4 landing page to score ABOVE_AVERAGE on Google's Landing Page Experience for all target keywords**,
so that **Quality Score reaches 10/10, reducing CPC by 16-50% and increasing impression share beyond the current 10%**.

## Context

The L4 landing page (`/zwolnienia-lekarskie-online-l4`) is the primary destination for Google Ads campaigns spending ~700 zł/week. Google reports BELOW_AVERAGE Landing Page Experience (LPE) on the top keywords:

| Keyword | QS | LPE | % of Spend |
|---------|---:|-----|----------:|
| L4 online | 7 | BELOW_AVERAGE | 48% |
| zwolnienie lekarskie online | 5 | BELOW_AVERAGE | 17% |
| e-zwolnienie lekarskie | 5 | BELOW_AVERAGE | — |
| zwolnienie L4 online | 5 | BELOW_AVERAGE | — |

Below-avg LPE increases CPC by ~16-50%. At 4.86 zł avg CPC, that's ~1 zł/click overpay = ~150 zł/week wasted.

## Current Page Problems

### 1. No H1 Tag
The page has no `<h1>`. The first heading is an `<h2>` ("Umów wizytę online") which is generic and doesn't mention "zwolnienie lekarskie" or "L4" at all. Google needs a clear H1 matching the search intent.

### 2. Hero Doesn't Match Search Intent
Someone searching "zwolnienie lekarskie online" lands on a page where the hero says "UMÓW WIZYTĘ" + "Umów wizytę online" — zero mention of zwolnienie, L4, e-ZLA. The message match is terrible.

### 3. No Content Above the Fold
The page goes: tiny label → generic H2 → checkout embed. There's no explanatory content, no value proposition, no reassurance before asking the user to commit. Google evaluates content relevance — an embed alone isn't content.

### 4. Thin Keyword-Relevant Content
The page body has almost no crawlable text about "zwolnienie lekarskie online". The checkout embed is an iframe (invisible to Google). The meaningful text-based content is:
- 3 "How it works" steps (brief)
- 4 pricing bullet points
- 5 FAQ items
- That's it. No explanatory paragraphs, no service description, no "what is e-ZLA" content.

### 5. Missing Structured Data
No FAQ schema (despite having FAQ content), no Medical service schema, no Organization schema. These help Google understand and score the page.

### 6. Meta Description Could Be Stronger
Current: "Uzyskaj e-zwolnienie lekarskie (e-ZLA) online — wygodnie, szybko i bez kolejek."
Missing: price, speed, legality — the key conversion drivers.

## Acceptance Criteria

1. Page has a proper `<h1>` containing "zwolnienie lekarskie online" (or close variant matching top keywords)
2. Hero section above the fold includes:
   - H1 matching search intent ("Zwolnienie lekarskie online" / "E-zwolnienie L4 online")
   - 1-2 sentence value proposition mentioning speed, legality, price
   - Trust signals (doctor count, rating, e-ZLA validity)
   - Clear CTA leading to checkout
3. New content section between hero and checkout explaining the service (150-300 words of keyword-rich, useful content)
4. FAQ schema markup (`application/ld+json`) for all FAQ items
5. Ad relevance keywords naturally present in H1, H2s, and body text: "zwolnienie lekarskie", "e-ZLA", "L4 online", "e-zwolnienie"
6. Page maintains current mobile responsiveness and load performance
7. No keyword stuffing — content must read naturally and be genuinely useful

## Tasks / Subtasks

- [ ] Task 1: Add H1 hero section with search-intent-matched headline (AC: #1, #2)
  - [ ] 1.1 Replace current CheckoutSection header with a proper hero that includes:
    - `<h1>` with "Zwolnienie lekarskie online (L4)" or "E-zwolnienie lekarskie online — szybko i legalnie"
    - Subheadline: "Umów konsultację z lekarzem. Jeśli to uzasadnione — e-ZLA trafi na Twoje konto IKP w ciągu godziny."
    - Trust bar: "500+ lekarzy · 4.9/5 ocena · e-ZLA ważne prawnie"
    - CTA button scrolling to checkout embed
  - [ ] 1.2 Demote current `<h2>` tags appropriately

- [ ] Task 2: Add keyword-rich content section above checkout (AC: #3, #5)
  - [ ] 2.1 Create a "Czym jest e-zwolnienie lekarskie online?" section with:
    - What e-ZLA is and how it works
    - Legal basis (ustawa z dnia 25 czerwca 1999 r.)
    - How it reaches ZUS/pracodawca automatically
    - Who can get it (employed, self-employed)
  - [ ] 2.2 Keep it 150-300 words, naturally incorporating target keywords
  - [ ] 2.3 Place between hero and checkout embed (or between checkout and how-it-works)

- [ ] Task 3: Improve existing heading hierarchy (AC: #5)
  - [ ] 3.1 Current H2 "Umów wizytę online" → change to "Umów wizytę — zwolnienie lekarskie online"
  - [ ] 3.2 "Trzy proste kroki do konsultacji" → "Jak uzyskać zwolnienie lekarskie online?"
  - [ ] 3.3 "Prosty, przejrzysty cennik" → "Ile kosztuje zwolnienie lekarskie online?"
  - [ ] 3.4 "Najczęściej zadawane pytania" → "Zwolnienie lekarskie online — FAQ"

- [ ] Task 4: Add FAQ structured data (AC: #4)
  - [ ] 4.1 Add `<script type="application/ld+json">` with FAQPage schema containing all 5 FAQ items
  - [ ] 4.2 Can be added in the page component or layout

- [ ] Task 5: Strengthen meta description (AC: #6)
  - [ ] 5.1 Update to include price, speed, and legality: "Zwolnienie lekarskie online (e-ZLA) od 79 zł. Konsultacja z lekarzem w ciągu godziny. Ważne prawnie, automatycznie w ZUS. Doktor Teraz."

- [ ] Task 6: Add more FAQ items for keyword coverage
  - [ ] 6.1 Add 3-5 more questions targeting long-tail keywords:
    - "Ile kosztuje zwolnienie lekarskie online?" (price keyword)
    - "Jak długo trwa uzyskanie e-zwolnienia?" (speed keyword)
    - "Czy mogę dostać L4 online na więcej niż 3 dni?" (duration keyword)
    - "Czy e-zwolnienie online jest legalne?" (legality keyword)
    - "Jak sprawdzić e-ZLA na IKP?" (practical keyword)

## Dev Notes

### Key File
`src/app/zwolnienia-lekarskie-online-l4/page.tsx` — this is the only file that needs significant changes.

### Current Page Structure (top to bottom)
1. Header
2. CheckoutSection — "UMÓW WIZYTĘ" label + "Umów wizytę online" H2 + EmbedCheckout
3. SocialProof — stats (40k+ patients, 500+ doctors, 4.9/5) + testimonial carousel
4. Partners — logo marquee
5. HowItWorks — 3 steps
6. Pricing — 79 zł card
7. FAQ — 5 items (FAQL4Accordion component)
8. FinalCTA — "Źle się czujesz? Nie czekaj."
9. Footer

### Proposed New Structure
1. Header
2. **NEW: Hero section** with H1, value prop, trust bar, CTA anchor
3. **NEW: "Czym jest e-zwolnienie?" content section** (150-300 words)
4. CheckoutSection (with updated H2)
5. SocialProof
6. Partners
7. HowItWorks (with updated H2)
8. Pricing (with updated H2)
9. FAQ (with updated H2 + more items + JSON-LD schema)
10. FinalCTA
11. Footer

### Google's LPE Signals
- **Content relevance**: H1/H2/body text must match search query terms
- **Useful, original content**: Explain the service, don't just sell it
- **Easy to navigate**: Clear structure, no confusing UX
- **Transparency**: Price visible, business info clear, terms stated
- **Mobile-friendly**: Already good
- **Load speed**: Don't add heavy assets — text content is lightweight

### Keywords to Naturally Include
Primary: zwolnienie lekarskie online, e-zwolnienie, e-ZLA, L4 online
Secondary: lekarz online, konsultacja lekarska, zwolnienie od lekarza, e-zwolnienie lekarskie online
Long-tail: ile kosztuje zwolnienie lekarskie online, jak uzyskać L4 online, czy e-zwolnienie jest legalne

### What NOT to Do
- Don't keyword stuff — Google penalizes this
- Don't move the checkout embed below the fold on mobile
- Don't slow down the page with heavy images or scripts
- Don't duplicate content from other pages

## Files to Modify

- `src/app/zwolnienia-lekarskie-online-l4/page.tsx` — Hero, content section, heading updates, meta description, FAQ schema
- `src/components/FAQL4Accordion.tsx` — Add more FAQ items

## Priority

High — directly impacts CPC (saving ~150 zł/week) and impression share (currently only 10%). Combined with conversion tracking fix, this is the second lever for scaling profitably.

## References

- [Source: docs/sprint-artifacts/sem-improvement-memo.md#Issue 2]
- [Google Ads Quality Score documentation](https://support.google.com/google-ads/answer/6167118)
