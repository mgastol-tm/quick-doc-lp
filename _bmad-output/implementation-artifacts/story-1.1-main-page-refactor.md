# Story 1.1: Refactor Main Page into Multi-Specialization Hub + L4 Subpage

## Summary

Move the current L4-focused main page (`/`) to a new SEO subpage at `/zwolnienia-lekarskie-online-l4`, and create a new broader main page that showcases all four specializations (Internista, Pediatra, Zwolnienie L4, Psychiatra). Maximize reuse of existing components and sections.

## Background

The current `/` page is entirely focused on sick leave (L4/e-ZLA). The business wants to position QuickDoc as a multi-specialization telehealth platform, with L4 as one of four services rather than the sole product.

## Acceptance Criteria

- [x] Current main page content lives at `/zwolnienia-lekarskie-online-l4` with proper SEO metadata
- [x] New `/` page has broader hero, specialization cards, generic how-it-works, and multi-service pricing
- [x] Header navigation updated: "Specjalizacje" link added, CTA changed to "Umów wizytę"
- [x] Anchor links resolve correctly on each page (subpage uses own section IDs)
- [x] Existing Header.tsx and Footer.tsx are reused (Header gets minor text changes only)
- [x] Responsive design (mobile-first) is maintained on both pages
- [x] All CTAs route correctly (`/wizyta` or specialization-specific links)
- [x] No broken links or visual regressions

---

## Codebase Patterns (MUST follow)

These patterns are used consistently across the existing codebase. Follow them exactly:

- **Container:** `const container = "max-w-[1240px] mx-auto w-full px-5 md:px-10";`
- **Scroll offset on anchor sections:** `scroll-mt-[72px]` (accounts for sticky header height `h-[72px]`)
- **Font classes:** `font-heading` (Space Grotesk) for headings, buttons, labels. `font-body` (Inter) for body text.
- **Responsive text sizing:** mobile-first, e.g. `text-[13px] md:text-sm`, `text-2xl md:text-[40px]`
- **Section spacing:** `py-12 md:py-20` for vertical padding
- **Section label pattern:** `<span className="font-heading text-[11px] md:text-[13px] font-semibold text-qd-primary tracking-[2px]">LABEL</span>`
- **All sections are defined as inline functions** in `page.tsx` (not separate files). Follow this same pattern for both pages.
- **Server components:** Current `page.tsx` is a server component (no `"use client"`). Keep both pages as server components.
- **Icons:** Import from `lucide-react`. Available icons for this story: `Stethoscope`, `Baby`, `Brain`, `FileCheck` (already imported), plus all existing ones.

---

## Implementation Plan

### Task 1: Create `/zwolnienia-lekarskie-online-l4` subpage

**File:** `src/app/zwolnienia-lekarskie-online-l4/page.tsx`

**What to do:**
- Copy the entire current `src/app/page.tsx` into this new file
- Keep all sections: Hero, HowItWorks, Doctors, Benefits, SocialProof, Pricing, FAQ, FinalCTA
- Copy the `container` const, all inline section functions, and all data arrays (`steps`, `doctors`, `benefits`, `testimonials`, `features`, `faqs`)
- Import `Header` from `@/components/Header` and `Footer` from `@/components/Footer`
- Add `metadata` export for L4-specific SEO:

```ts
export const metadata = {
  title: "Zwolnienie lekarskie online (L4) w 15 minut | QuickDoc",
  description: "Uzyskaj e-zwolnienie lekarskie (e-ZLA) online w 15 minut. Licencjonowani lekarze, ważne L4, bez kolejek. QuickDoc — szybko i wygodnie.",
};
```

- No changes to section content — this is the existing proven page preserved as-is

### Task 2: Rewrite the main page (`/`)

**File:** `src/app/page.tsx`

#### 2a. Hero — ADAPT existing

Replace L4-specific hero with broader version. Keep the entire layout structure (badge, h1, subtitle, mobile image, CTAs, trust row, desktop image).

**Changes only:**
- **Headline:** `"Lekarz online w kilka minut"` (was: "Uzyskaj zwolnienie lekarskie w 15 minut")
- **Subtitle:** `"Skonsultuj się z licencjonowanym lekarzem online. Internista, pediatra, psychiatra lub zwolnienie L4 — wszystko z domu, bez kolejek."` (was: L4-specific)
- **Primary CTA:** Keep `"Rozpocznij wizytę"` → `/wizyta` (unchanged)
- **Secondary CTA:** `"Sprawdź specjalizacje"` → `#specjalizacje` (was: "Jak to działa?" → #jak-to-dziala)
- **Trust row:** Change third item from `{ icon: FileCheck, text: "e-ZLA", textDesktop: "Ważne e-ZLA (L4)" }` to `{ icon: FileCheck, text: "4 specjalizacje", textDesktop: "4 specjalizacje medyczne" }`
- **Doctor image:** Reuse existing `doctor-hero.png` — no changes

#### 2b. Specializations — NEW section

**Position:** Between Hero and HowItWorks. Add `id="specjalizacje"` and `className="scroll-mt-[72px]"` for anchor navigation.

Four cards in a horizontal row (desktop `md:grid-cols-4`) / stacked (mobile). Use the section label pattern:

```
SPECJALIZACJE
Wybierz konsultację dla siebie
```

**Card data:**

| Card | Icon | Title | Description | Price | Link | Highlighted? |
|------|------|-------|-------------|-------|------|--------------|
| 1 | `Stethoscope` | Internista | Przeziębienie, grypa, bóle głowy, infekcje i inne dolegliwości ogólne. | od 79 zł | `/wizyta` | No |
| 2 | `Baby` | Pediatra | Konsultacje dla dzieci i młodzieży. Gorączka, wysypka, kaszel. | od 89 zł | `/wizyta` | No |
| 3 | `FileCheck` | Zwolnienie L4 | E-zwolnienie lekarskie w 15 minut. Wysyłka do ZUS automatycznie. | od 79 zł | `/zwolnienia-lekarskie-online-l4` | **Yes** |
| 4 | `Brain` | Psychiatra | Lęk, depresja, bezsenność. Recepta na leki psychiatryczne online. | od 149 zł | `/wizyta` | No |

**Normal card styling:** `bg-qd-section-light border border-qd-border rounded-2xl p-5 md:p-7` with icon, title, description, price, and an `<a>` link.
- Icon: `w-8 h-8 text-qd-primary`
- Title: `font-heading text-base md:text-lg font-semibold text-qd-text`
- Description: `font-body text-[13px] md:text-sm text-qd-text-secondary`
- Price: `font-heading text-xl md:text-2xl font-semibold text-qd-text`

**Highlighted card (L4) — explicit color overrides:**
- Card: `bg-qd-primary rounded-2xl p-5 md:p-7` (no border needed on green bg)
- Badge: Add `"Najpopularniejsze"` badge at top — `bg-white/20 text-white text-[11px] font-medium px-3 py-1 rounded-full w-fit`
- Icon: `w-8 h-8 text-white`
- Title: `font-heading text-base md:text-lg font-semibold text-white`
- Description: `font-body text-[13px] md:text-sm text-white/80`
- Price: `font-heading text-xl md:text-2xl font-semibold text-white`

Each card wraps in an `<a>` tag linking to its respective URL.

#### 2c. HowItWorks — ADAPT existing

Keep entire layout, step cards, and responsive patterns. Change text only:

- **Headline:** `"Trzy proste kroki do konsultacji"` (was: "...do zwolnienia")
- **Step 3 title:** `"Odbierz dokumenty"` (was: "Odbierz e-ZLA")
- **Step 3 desc:** `"Odbierz e-receptę, e-zwolnienie lub zalecenia lekarskie. Dokumenty wysyłane elektronicznie, natychmiast po konsultacji."` (was: L4-specific)

#### 2d. Doctors — REUSE AS-IS

No changes. Works for general platform context.

#### 2e. Benefits — ADAPT (not 100% reuse)

Keep layout and 3 of 4 cards unchanged. Update the second card (`Laptop` / "100% online"):

- **Description:** Change from `"Od formularza objawów po dostarczenie zwolnienia — wszystko odbywa się online. Bez dojazdów, bez kolejek."` to `"Od formularza objawów po dostarczenie dokumentów — wszystko odbywa się online. Bez dojazdów, bez kolejek."`

That's the only change — one word swap ("zwolnienia" → "dokumentów").

#### 2f. SocialProof — REUSE AS-IS

Keep unchanged. The first testimonial mentions "e-ZLA" but this is acceptable — it's a real patient review and adds authenticity. L4 is still the most popular service.

#### 2g. Pricing — RESTRUCTURE for multi-service

Replace the single-product pricing card with a multi-service table. Keep the same section structure (label, heading, subtitle).

- **Heading:** `"Prosty, przejrzysty cennik"` (unchanged)
- **Subtitle:** `"Jedna opłata za konsultację. Bez ukrytych kosztów, bez subskrypcji."` (minor tweak)

**Replace the single card with a pricing table/card list:**

| Service | Price | CTA Link |
|---------|-------|----------|
| Internista — konsultacja ogólna | od 79 zł | `/wizyta` |
| Pediatra — konsultacja dziecięca | od 89 zł | `/wizyta` |
| Zwolnienie L4 — e-ZLA w 15 min | od 79 zł | `/zwolnienia-lekarskie-online-l4` |
| Psychiatra — konsultacja psychiatryczna | od 149 zł | `/wizyta` |

Each row: service name + short descriptor on the left, price on the right, entire row is a clickable `<a>` link. Style each row as:
- `flex items-center justify-between py-4 md:py-5 border-b border-qd-border` (similar to FAQ item pattern)
- Service name: `font-heading text-sm md:text-base font-medium text-qd-text`
- Price: `font-heading text-base md:text-lg font-semibold text-qd-primary`
- On hover: `hover:bg-qd-section-light transition-colors rounded-lg`

Wrap in a `max-w-[600px]` card with `border border-qd-border rounded-2xl overflow-hidden p-6 md:p-8`.

Add a shared CTA button below: `"Rozpocznij wizytę"` → `/wizyta` (reuse existing button pattern).

**Remove** the L4-specific features list (e-ZLA bullet points, ZUS delivery) — these belong on the L4 subpage only.

#### 2h. FAQ — ADAPT existing

The current FAQ renders **question titles only** (no answer bodies, no expand functionality). Keep this same pattern — each item is a `<div>` with question text and a `ChevronDown` icon, separated by `border-b border-qd-border`.

**Replace the `faqs` array with broader questions:**

```ts
const faqs = [
  "Jak szybko mogę porozmawiać z lekarzem?",
  "Jakie specjalizacje są dostępne?",
  "Czy mogę otrzymać receptę podczas konsultacji?",
  "Czy e-zwolnienie (L4) jest prawnie ważne?",
  "Ile kosztuje konsultacja online?",
];
```

#### 2i. FinalCTA — ADAPT slightly

- **Headline:** Keep `"Źle się czujesz? Nie czekaj."` (unchanged)
- **Subtitle:** `"Skonsultuj się z lekarzem online w kilka minut. Internista, pediatra, psychiatra lub zwolnienie L4."` (was: L4-specific)
- **CTA:** Keep `"Rozpocznij wizytę"` → `/wizyta` (unchanged)
- **Sub-CTA text:** Keep `"Bez subskrypcji — płacisz tylko wtedy, gdy potrzebujesz"` (unchanged)

### Task 3: Update root layout metadata

**File:** `src/app/layout.tsx`

Change only the metadata export:

```ts
export const metadata = {
  title: "QuickDoc — Lekarz online w kilka minut",
  description: "Konsultacje medyczne online. Internista, pediatra, psychiatra, zwolnienie L4. Szybko, wygodnie, bez kolejek.",
};
```

No other changes to layout.tsx.

### Task 4: Update Header navigation

**File:** `src/components/Header.tsx`

**Concrete changes:**

1. **Add nav link:** Insert `"Specjalizacje"` as the FIRST nav item, linking to `/#specjalizacje`
2. **Keep existing links:** "Jak to działa" (`/#jak-to-dziala`), "Korzyści" (`/#korzysci`), "Cennik" (`/#cennik`), "FAQ" (`/#faq`)
3. **Change CTA button text:** `"Weź L4"` → `"Umów wizytę"` (keep same link `/wizyta`, same styling)
4. **Update mobile menu:** Same changes apply to the mobile nav items array

**Anchor behavior on subpages:** The Header links use absolute paths (`/#specjalizacje`, `/#jak-to-dziala`, etc.) which means they always navigate to the main page sections. This is **acceptable** — the subpage is an SEO landing page, and users navigating via header should land on the main hub. No context-aware header logic needed.

---

## Out of Scope

- Interactive FAQ accordion (currently static, remains static)
- Separate widget pages per specialization
- SEO subpages for other specializations (internista, pediatra, psychiatra)
- Analytics/tracking changes
- Extracting shared sections (Doctors, Benefits, SocialProof) into `src/components/` — acceptable to duplicate inline for now since content may diverge per page over time

---

## Status

review

---

## File List

- `src/app/zwolnienia-lekarskie-online-l4/page.tsx` — NEW: L4 subpage (copy of original main page with L4-specific SEO metadata)
- `src/app/page.tsx` — MODIFIED: Rewritten as multi-specialization hub with new Hero text, Specializations section, adapted HowItWorks/Benefits/Pricing/FAQ/FinalCTA
- `src/app/layout.tsx` — MODIFIED: Updated metadata to broader multi-specialization description
- `src/components/Header.tsx` — MODIFIED: Added "Specjalizacje" nav link, changed CTA from "Weź L4" to "Umów wizytę"
- `src/components/Footer.tsx` — MODIFIED: Added pngtree.com attribution line at bottom
- `src/components/FAQAccordion.tsx` — NEW: Working FAQ accordion (Radix UI) for main page with answers
- `src/components/FAQL4Accordion.tsx` — NEW: Working FAQ accordion for L4 subpage with L4-specific Q&A
- `src/app/globals.css` — MODIFIED: Added accordion animation keyframes
- `src/app/layout.tsx` — MODIFIED: Updated metadata, added Contentsquare script
- `src/components/CookieConsent.tsx` — NEW: Cookie consent banner with Google Consent Mode v2 integration
- `public/doctor-hero-main.png` — NEW: Main page hero doctor image (transparent bg)

---

## Change Log

- **2026-03-04:** Implemented Story 1.1 — Refactored main page into multi-specialization hub and created L4 SEO subpage
- **2026-03-04:** Post-implementation refinements: Added "Wkrótce" badges to Internista/Pediatra/Psychiatra specialization cards and pricing rows (not yet active). Updated prices: Internista 89 zł, Pediatra 95 zł, Psychiatra 269 zł, L4 79 zł. Removed "od" prefix from all prices. Renamed pricing row to "Konsultacja w sprawie zwolnienia L4". Added pngtree.com attribution in footer.
- **2026-03-04:** Copy accuracy pass: Added working FAQ accordions (Radix UI) on both pages with answer copy. Replaced "licencjonowanym lekarzem" → "lekarzem specjalistą", "Licencjonowani lekarze" → "Lekarze specjaliści". Removed all "w 15 minut" claims. Changed "100% online" → "Bez wychodzenia z domu" (consultation is phone/video/chat). Reframed L4 as consultation not product ("zwolnienie L4" → "konsultacja w sprawie zwolnienia L4"). Rewrote HowItWorks steps: 1) Telekonsultacja, 2) Opisz objawy, 3) Otrzymaj zalecenia i e-ZLA jeśli potrzeba. Updated layout title to "bez wychodzenia z domu".
- **2026-03-04:** Telemedi compliance pass: Updated consultation method to phone/video/chat (per telemedi.com). Added medical disclaimer under L4 pricing ("Decyzja o wystawieniu zwolnienia zawsze należy do lekarza"). Added legal reference (ustawa z 25.06.1999) to FAQ answers. Removed Doctors section from both pages. Removed PlatformStats section from L4 subpage.
- **2026-03-04:** UX & analytics: All main page CTAs now scroll to #specjalizacje instead of /wizyta. Header CTA uses /#specjalizacje for cross-page navigation. Added Contentsquare script (cookie consent + session recording) to layout.tsx.
- **2026-03-05:** Updated main page hero with new doctor image (transparent bg). L4 subpage: heading changed to "Konsultacja ze zwolnieniem lekarskim L4 online", CTA buttons show dimmed price "79 zł". Added cookie consent banner with Google Consent Mode v2 (same approach as telemedi.com/pl) — defaults all tracking to denied, updates to granted on accept.

---

## Dev Agent Record

### Implementation Notes

- **Task 1:** Created `/zwolnienia-lekarskie-online-l4/page.tsx` as exact copy of original page.tsx with L4-specific metadata export added. All sections preserved as-is.
- **Task 2a (Hero):** Updated headline, subtitle, secondary CTA (now links to #specjalizacje), and trust row third item to "4 specjalizacje".
- **Task 2b (Specializations):** New section with 4 cards (Internista, Pediatra, L4 highlighted, Psychiatra). L4 card has green bg with "Najpopularniejsze" badge. All cards wrap in `<a>` tags.
- **Task 2c (HowItWorks):** Changed headline to "konsultacji", Step 3 title to "Odbierz dokumenty" with broader description.
- **Task 2d (Doctors):** Reused as-is.
- **Task 2e (Benefits):** Changed "zwolnienia" to "dokumentów" in the 100% online card description.
- **Task 2f (SocialProof):** Reused as-is.
- **Task 2g (Pricing):** Replaced single-product pricing card with multi-service pricing table (4 rows with service names and prices). Added shared CTA below.
- **Task 2h (FAQ):** Replaced faqs array with broader multi-specialization questions.
- **Task 2i (FinalCTA):** Updated subtitle to broader multi-specialization text.
- **Task 3:** Updated layout.tsx metadata to "QuickDoc — Lekarz online w kilka minut".
- **Task 4:** Added "Specjalizacje" as first nav item in Header, changed CTA from "Weź L4" to "Umów wizytę" in both desktop and mobile nav.

### Build Verification

- Next.js build passes successfully with all routes generated: `/`, `/zwolnienia-lekarskie-online-l4`, plus existing routes.
- No TypeScript errors, no compilation warnings.
