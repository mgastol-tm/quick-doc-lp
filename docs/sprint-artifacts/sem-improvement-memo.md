# DoktorTeraz SEM Improvement Memo
Date: 2026-03-19

## Performance Summary

### Google Ads (Last 7 Days)
| Campaign | Spend | Clicks | CTR | CPC | Conv (GA) |
|----------|------:|-------:|----:|----:|----------:|
| Konsultacja z L4 | 703.99 zł | 145 | 8.65% | 4.86 zł | 0 |
| Wizyta Lekarska Online | 51.23 zł | 11 | 11.22% | 4.66 zł | 0 |
| **Total** | **755.22 zł** | **156** | **8.79%** | **4.84 zł** | **0** |

### DB Ground Truth (Last 14 Days)
| Source | Conversions | Revenue | gclid capture |
|--------|------------:|--------:|--------------:|
| pl-lekarze-konsultacje-online (LP2) | 28 | 2,612 PLN | 100% |
| pl-lekarze-l4 | 7 | 553 PLN | 100% |
| quickdoc (homepage) | 2 | 158 PLN | 100% |
| **Total** | **37** | **3,323 PLN** | **100%** |

### Calculated KPIs
- **True CAC (all sources)**: ~40.8 zł (755/~18.5 conv in 7d)
- **ROAS**: ~2.2x (weak, needs to be >3x)
- **Impression share**: Only 10% on top keywords — massive headroom

## Tracking Gaps

**Critical: Google Ads reports 0 conversions.** The conversion tracking is completely broken for the new doktorteraz.pl domain. gclid is being captured (100% rate in DB) but Google Ads is not receiving any conversion signals. This is likely because:
1. GA4 purchase event is not configured for doktorteraz.pl
2. Google Ads conversion action is still linked to quickdoc.pl domain
3. The conversion tag may reference the old domain

**Impact**: Without conversion data, Smart Bidding cannot optimize. All bidding is essentially blind, wasting spend on low-intent clicks.

## Priority Issues (ranked by expected revenue impact)

### Issue 1: Conversion Tracking Broken — Zero Google Ads Conversions
- **Category**: Technical
- **Evidence**: Google Ads shows 0 conversions across both campaigns despite 37 DB-verified conversions in 14 days. The domain migration from quickdoc.pl to doktorteraz.pl broke the conversion pipeline.
- **Impact**: ~30-50% wasted spend due to blind bidding. Smart Bidding cannot optimize toward purchases. Estimated 200-400 zł/week wasted.
- **Recommendation**:
  1. Verify GA4 property is receiving events from doktorteraz.pl domain
  2. Update Google Ads conversion action to track doktorteraz.pl
  3. Verify the GA4 <> Google Ads link is active
  4. Check that the gtag/GA4 measurement ID is deployed on doktorteraz.pl pages
- **Files to modify**:
  - `src/app/layout.tsx` (GA4 script tag / measurement ID)
  - Google Ads UI: Conversion action settings
  - GA4 UI: Data streams, linked accounts

### Issue 2: Landing Page Experience — Below Average on Top Keywords
- **Category**: Quality Score
- **Evidence**:
  - "L4 online" (QS 7): LPE = BELOW_AVERAGE (top keyword, 48% of spend)
  - "zwolnienie lekarskie online" (QS 5): LPE = BELOW_AVERAGE (17% of spend)
  - "e-zwolnienie lekarskie" (QS 5): LPE = BELOW_AVERAGE
  - "zwolnienie L4 online" (QS 5): LPE = BELOW_AVERAGE
- **Impact**: Below-avg LPE increases CPC by ~16-50%. With 4.86 zł avg CPC, this could mean ~1 zł/click overpay = ~150 zł/week wasted.
- **Recommendation**:
  1. Improve page load speed (check Core Web Vitals)
  2. Ensure H1 matches search intent more directly ("Zwolnienie lekarskie online" not just generic)
  3. Add more relevant content above the fold matching search terms
  4. Reduce bounce rate — the checkout embed may be confusing for first-time visitors
- **Files to modify**:
  - `src/app/zwolnienia-lekarskie-online-l4/page.tsx` (hero section, content above fold)
  - `src/components/EmbedCheckout.tsx` (checkout UX)

### Issue 3: Ad Relevance — Below Average on Key Terms
- **Category**: Message Match
- **Evidence**:
  - "zwolnienie lekarskie online" (QS 5): Ad Relevance = BELOW_AVERAGE
  - "e-zwolnienie lekarskie" (QS 5): Ad Relevance = BELOW_AVERAGE
  - "zwolnienie L4 online" (QS 5): Ad Relevance = BELOW_AVERAGE
  - "zwolnienie od lekarza online" (QS 6): Ad Relevance = BELOW_AVERAGE
- **Impact**: Low ad relevance = lower ad rank, higher CPC, fewer impressions
- **Recommendation**: Create a dedicated ad group for "zwolnienie" terms with headlines specifically mentioning "zwolnienie lekarskie" rather than generic "konsultacja" language
- **Files to modify**: Google Ads UI (ad copy adjustment)

### Issue 4: Wasted Spend on Irrelevant Search Terms
- **Category**: Keywords
- **Evidence** (from search terms report):
  - "e zwolnienie z wf" — school excuse, not L4 (5.00 zł)
  - "zwolnienie lekarskie online studia" — student, not employee (4.98 zł)
  - "recepty24" — competitor brand (5.00 zł)
  - "gdzie kupić zwolnienie lekarskie" — illegal intent (4.90 zł)
  - "l4 kupno" — illegal intent (4.90 zł)
  - "pacjent gov zwolnienie lekarskie" — gov site lookup (4.96 zł)
  - "darmowa porada lekarska online" — freebie seekers (5.00 zł)
  - "radamed l4 opinię" — competitor research (4.99 zł)
  - "opieka na dziecko online" — not L4 (4.92 zł)
  - "zwolnienie lekarskie z wf online" — school excuse (4.90 zł)
- **Impact**: ~50 zł/14 days on clearly irrelevant terms
- **Recommendation**: Add negative keywords (see list below)

### Issue 5: 10% Impression Share — Massive Missed Opportunity
- **Category**: Budget/Bidding
- **Evidence**: All top keywords show ~10% impression share. We're only appearing in 1 out of 10 searches.
- **Impact**: 90% of potential traffic not captured. With 37 conversions from 10% share, full coverage could yield 200+ conversions/month.
- **Recommendation**: Gradually increase daily budget. Current ~100 zł/day could scale to 300-500 zł/day while maintaining CPA if conversion tracking is fixed first.

## Quick Wins (can implement in < 1 hour each)

- **Fix conversion tracking** — highest priority, everything else depends on this
- **Add negative keywords** (see below) — stop immediate waste
- **Pin L4-specific headline** to position 1 in the "Zwolnienie / L4 Online" ad group for better ad relevance

## Negative Keywords to Add

```
kupić zwolnienie
kupno zwolnienia
z wf
z wfu
studia zwolnienie
darmowa porada
darmowy lekarz
recepty24
radamed
pacjent.gov
pacjent gov
opieka na dziecko
zasiłek opiekuńczy
```
