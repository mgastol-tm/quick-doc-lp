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
