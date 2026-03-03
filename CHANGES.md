# Changes Story

## 1. Extract shared Header & Footer components

Extracted `Header` and `Footer` from `src/app/page.tsx` into reusable components so subpages can share them.

- **`src/components/Header.tsx`** (new) — sticky header with QuickDoc logo (links to `/`), desktop nav, mobile hamburger
- **`src/components/Footer.tsx`** (new) — footer with brand, link columns, and copyright; "O nas", "Kontakt", "Kariera" links use `next/link` to actual routes
- **`src/app/page.tsx`** (modified) — removed inline `Header`, `Footer`, and `footerLinks`; imports shared components instead

## 2. Add O nas, Kontakt, Kariera subpages

Created three placeholder subpages with Header + content + Footer, all in Polish.

- **`src/app/o-nas/page.tsx`** (new) — "O nas" (About us) — mission statement and doctor credentials info
- **`src/app/kontakt/page.tsx`** (new) — "Kontakt" (Contact) — email, phone, support hours
- **`src/app/kariera/page.tsx`** (new) — "Kariera" (Career) — "no open positions" placeholder with CV email

## 3. Update footer links

Changed `href="#"` to actual routes in the shared Footer component:

| Link     | Route      |
|----------|------------|
| O nas    | `/o-nas`   |
| Kontakt  | `/kontakt` |
| Kariera  | `/kariera` |

## 4. Add Telemedico widget page (`/wizyta`)

Created a page that embeds the Telemedico consultation booking widget.

- **`src/app/wizyta/page.tsx`** (new) — client component using `next/script` to load `https://widget.telemedi.com/consbook-widget/widget.js` and initialize the widget with the sickleave configuration

## 5. Wire all CTA buttons to `/wizyta`

Updated every "Rozpocznij wizytę" / "Weź L4" button across the site to navigate to the widget page:

- **`src/components/Header.tsx`** — "Weź L4" → `/wizyta` (changed `<a>` to `<Link>`)
- **`src/app/page.tsx`** — 4 buttons updated (`href="#"` → `href="/wizyta"`):
  - Hero section "Rozpocznij wizytę"
  - Doctors section "Rozpocznij wizytę"
  - Pricing section "Rozpocznij wizytę"
  - Final CTA section "Rozpocznij wizytę"

## 6. Static export + Cloudflare Pages deployment

Configured Next.js for static export and deployed to Cloudflare Pages.

- **`next.config.ts`** (modified) — added `output: "export"` and `images: { unoptimized: true }`
- Created Cloudflare Pages project `quick-doc-lp` via `wrangler`
- Deployed static `out/` directory with `wrangler pages deploy`
- Bound custom domain `quickdoc.pl` to the Pages project via Cloudflare API
- DNS: home.pl nameservers changed to Cloudflare (`rudy.ns.cloudflare.com`, `vita.ns.cloudflare.com`)
- CNAME record `@ → quick-doc-lp.pages.dev` added in Cloudflare DNS

## 7. Replace doctors & reviews with real data from V4 database

Queried the Telemedi V4 production database (`v4` on `34.116.255.109:53117`) to populate the landing page with real data.

### Doctors section
Replaced 4 fictional doctors with top-rated doctors who have the "Konsultacja ze zwolnieniem" specialization, filtered by those with avatar images:

| Doctor                            | Rating | Consultations | Avatar file              |
|-----------------------------------|--------|---------------|--------------------------|
| Dr Dominika Żółcińska-Konieczna   | 5.0    | 8 144         | `/doctor-zolcinska.png`  |
| Dr Kamil Rozmus                   | 5.0    | 4 879         | `/doctor-rozmus.png`     |
| Dr Olga Frieman                   | 5.0    | 4 017         | `/doctor-frieman.png`    |
| Dr Marek Treppner                 | 4.7    | 5 547         | `/doctor-treppner.png`   |

Avatar images downloaded from `storage.googleapis.com/telemedi-os-prod/public/assets/avatars/` to `public/`.

### Social proof section
Replaced tag-based reviews with 6 real free-text patient reviews sourced from `consultation_rating` and `external_rating` tables, specifically for zwolnienie consultations. Each review is a genuine patient comment with varied content covering different aspects (speed, professionalism, empathy, convenience).

### Other changes
- Removed green online status dot from doctor avatars
- Updated "Obsłużonych pacjentów" stat from 50 000+ to 62 000+
- Made all review cards uniform height (340×270px desktop, 220px mobile) with author pinned to bottom
- Added bottom padding to Social Proof section for better spacing

## 8. Tailwind v4 theme migration (Turbopack CSS fix)

Migrated from CSS custom property arbitrary values (`text-[var(--qd-primary)]`) to Tailwind v4 `@theme` directive (`text-qd-primary`) across all files to fix a critical Turbopack CSS parsing bug where RSC serialization boundaries split class names.

- **`src/app/globals.css`** — replaced `:root` CSS variables with `@theme` block defining `--color-qd-*`
- All 94 occurrences of `[var(--qd-*)]` replaced with `qd-*` across 6 files

### Files modified
- **`src/app/page.tsx`** — updated doctors, testimonials, stats; removed avatar status dot; uniform card heights
- **`src/app/globals.css`** — Tailwind v4 `@theme` migration
- **`src/components/Header.tsx`** — theme utility migration
- **`src/components/Footer.tsx`** — theme utility migration
- **`src/app/o-nas/page.tsx`**, **`kontakt/page.tsx`**, **`kariera/page.tsx`** — theme utility migration
- **`public/doctor-zolcinska.png`** (new)
- **`public/doctor-treppner.png`** (new)
