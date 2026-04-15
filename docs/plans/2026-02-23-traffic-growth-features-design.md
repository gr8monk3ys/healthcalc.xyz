# Traffic Growth Features — Design Document

**Date:** 2026-02-23
**Goal:** Grow organic traffic and improve SEO for heathcalc.xyz
**Current state:** 52 calculators, 66+ blog posts, production-ready infrastructure

---

## Phase 1: Calculator Chains & Health Dashboard

**Status:** ~70% complete on `feature/health-dashboard-calculator-chains`

### What Exists

- 4 chains defined in `src/constants/calculatorChains.ts`:
  - Weight Loss Journey (BMI → Body Fat → TDEE → Calorie Deficit → Macros)
  - Body Composition Deep Dive (BMI → Body Fat → FFMI → Ideal Weight)
  - Fitness Baseline (Max HR → HR Zones → VO2 Max)
  - Nutrition Planning (TDEE → Macros → Protein → Water Intake)
- Chain UI components: `ChainSelector`, `ChainProgressBar`, `ChainContinueButton`
- Dashboard components: `HealthDashboard`, `MetricCard`, `TrendChart`, `QuickActions`
- State management: `useChainState` hook, `useChainPrefill` hook
- Metrics registry: `src/constants/calculatorMetrics.ts`

### Remaining Work

1. Wire chain components into calculator page layouts (the `ChainContinueButton` and `ChainProgressBar` need to appear on each calculator's `page.client.tsx` when the user is in a chain flow)
2. Create a `/dashboard` route that renders `HealthDashboard`
3. Add chain entry points: a `/chains` index page or prominent CTAs on the homepage and calculator pages
4. Test chain data flow end-to-end (shared fields prefilling across steps)
5. Mobile responsiveness pass on dashboard grid and chain progress bar

### SEO Impact

- Internal linking: each chain step links to 3-4 other calculators, strengthening the site's link graph
- Pages per session: chains guide users through 3-5 calculators per visit (vs. 1 today)
- Return visits: dashboard with trend charts gives users a reason to come back

### Success Criteria

- Users can select a chain from any participating calculator page
- Shared fields (age, gender, height, weight) prefill automatically across chain steps
- Dashboard shows metric cards with trend arrows for calculators the user has used
- Trend charts render when 2+ data points exist for a metric

---

## Phase 2: Programmatic SEO Pages

### Concept

Generate pre-computed result pages for specific parameter combinations, targeting long-tail search queries that the 52 main calculator pages don't capture.

### URL Structure

```
/tdee/results/[age]-year-old-[gender]-[weight]-lbs-[activity]
/bmi/results/[height]-[weight]-[gender]
/calorie-deficit/results/[weight]-lbs-[gender]-lose-[rate]-per-week
/body-fat/results/[age]-year-old-[gender]-[method]
/macro/results/[calories]-calories-[goal]-[diet-type]
```

### Page Template

Each programmatic page includes:

1. **Hero result** — The pre-computed answer with health context (e.g., "A BMI of 24.1 falls in the Normal Weight category")
2. **Comparison table** — How this result compares to population averages by age group and gender
3. **Percentile ranking** — "This places you in the 62nd percentile for your age group"
4. **Health context** — 2-3 paragraphs of unique, medically-reviewed content specific to this result range
5. **Related pages** — Links to similar parameter combinations (different ages, weights, activity levels)
6. **CTA** — "Calculate your exact result" button linking to the full calculator
7. **FAQ** — Dynamically generated questions specific to the parameter combination

### Technical Architecture

- **Static generation with ISR** — Use `generateStaticParams()` for top 500-1000 combinations, ISR (`revalidate: 86400`) for the long tail
- **Parameter matrix** — Define sensible ranges per calculator:
  - Ages: 18-70 (step 5)
  - Weights: 100-300 lbs (step 10)
  - Heights: 58-76 inches (step 2)
  - Genders: male, female
  - Activity levels: sedentary, moderate, active
- **Canonical URLs** — Each page has a self-referencing canonical; the main calculator page is NOT the canonical (these are distinct content)
- **Sitemap extension** — Add programmatic pages to the dynamic sitemap in `src/app/(default)/sitemap.ts`
- **Content uniqueness** — Each page must have genuinely distinct content. The comparison tables, percentile data, and contextual health information ensure this. Pages are NOT doorway pages because they provide analysis the main calculator doesn't.

### Calculators to Start With

Start with the 5 highest-traffic calculators:

1. BMI — broadest appeal, most search volume
2. TDEE — high intent, many parameter combinations
3. Calorie Deficit — strong weight-loss intent queries
4. Body Fat — demographic-specific queries
5. Macro — diet-specific queries

### Estimated Page Count

| Calculator      | Parameters                                     | Combinations | Pages      |
| --------------- | ---------------------------------------------- | ------------ | ---------- |
| BMI             | age(11) × gender(2) × height(10) × weight(21)  | ~4,620       | ~500 (top) |
| TDEE            | age(11) × gender(2) × weight(21) × activity(4) | ~3,696       | ~500 (top) |
| Calorie Deficit | weight(21) × gender(2) × rate(3)               | ~126         | ~126       |
| Body Fat        | age(11) × gender(2)                            | ~22          | ~22        |
| Macro           | calories(10) × goal(3) × diet(4)               | ~120         | ~120       |
| **Total**       |                                                |              | **~1,268** |

### Risks & Mitigations

| Risk                          | Mitigation                                                                                           |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| Google treats as thin content | Each page has unique comparison data, percentile ranking, contextual paragraphs, and dynamic FAQ     |
| Crawl budget exhaustion       | XML sitemap includes only top 1,268 pages; use `priority` values to signal importance hierarchy      |
| Stale content                 | ISR with 24-hour revalidation; calculation logic is deterministic so results don't change            |
| URL structure changes         | Use `redirect` entries in `next.config.js` if URL format changes; canonical URLs prevent duplication |

### Success Criteria

- 1,000+ indexed programmatic pages within 60 days of launch
- Programmatic pages rank for 100+ long-tail keywords within 90 days
- 20%+ of organic traffic comes from programmatic pages within 6 months
- Bounce rate on programmatic pages < 60% (users click through to full calculator)

---

## Phase 3: Shareable Result Cards & Embeddable Widgets

### Features

#### 3a. Dynamic OG Image Generation

- **Route:** `/api/og/[calculator]` — accepts query params for result values
- **Tech:** `@vercel/og` (Satori-based, runs at the edge)
- **Design:** Branded card (1200×630) showing:
  - Calculator name and site branding
  - The primary result value (large, bold)
  - Category/classification (e.g., "Normal Weight", "Moderately Active")
  - A visual element (color bar, gauge, or comparison indicator)
- **Integration:** Each calculator's share URL includes OG image params so social previews are rich and specific

#### 3b. Share Buttons

- "Share my results" button on every calculator result section
- Generates a shareable URL with encoded results (URL params, not stored server-side)
- When visited, the share URL populates the calculator with those inputs and shows results
- Platform-specific share for Twitter, Facebook, LinkedIn, WhatsApp, and copy-to-clipboard
- The shared page uses the dynamic OG image for rich previews

#### 3c. Enhanced Embed System

- Build on existing `/api/embed/[calculator]/route.ts`
- Add "Embed this calculator" CTA visible below each calculator
- Generates copy-paste `<iframe>` code with customization options (width, theme)
- Each embed includes a "Powered by HealthCalc" link — a backlink from every embedding site
- Embed analytics: track how many sites embed each calculator

#### 3d. "Compare With Average" Feature

- Show where the user's result falls on a population distribution
- Visual: bell curve or horizontal bar with the user's position marked
- Data source: WHO, CDC, and NHANES reference data (already used in some calculators)
- Percentile text: "Your TDEE of 2,450 kcal is higher than 73% of men your age"
- This is the most shareable element — people love percentile comparisons

### Success Criteria

- Share buttons generate 50+ social shares per week within 30 days
- OG images render correctly on Twitter, Facebook, LinkedIn, and Slack
- 10+ external sites embed at least one calculator within 90 days
- "Compare with average" increases time-on-page by 15%+

---

## Phase 4: Interactive Content

### 4a. "What's Your Fitness Age?" Quiz

- Combines results from VO2 Max, Resting Heart Rate, BMI, Body Fat, and flexibility/balance self-assessments
- Produces a single "Fitness Age" number (e.g., "Your fitness age is 28 — 7 years younger than your chronological age!")
- Highly shareable — people love age-comparison content
- Links to each contributing calculator for deeper analysis
- New route: `/fitness-age`

### 4b. Printable Health Report (PDF)

- Aggregates all saved dashboard metrics into a branded PDF
- Sections: Body Composition, Nutrition, Cardiovascular Fitness, Hydration
- Each section shows the metric value, trend, and percentile
- "Share with your doctor or trainer" positioning
- Generated client-side using a library like `jspdf` or `@react-pdf/renderer`
- New route: `/report` (renders preview, "Download PDF" button)

### 4c. Interactive Body Composition Visual

- SVG body silhouette that adjusts proportions based on BMI/body fat inputs
- Color-coded regions showing fat distribution
- Side-by-side comparison: "Your body" vs. "Ideal for your age/height"
- Earns links from health and fitness blogs
- Integrates into the BMI and Body Fat calculator result sections

### 4d. Progress Timeline

- Animated timeline visualization of saved results over time
- Shows key milestones: "First calculation", "Biggest improvement", "Current streak"
- Gamification elements: badges for consistency ("7-day streak"), improvement ("BMI improved 2 points")
- Drives daily/weekly return visits
- Renders on the `/dashboard` route

### Success Criteria

- Fitness Age quiz generates 500+ completions per week within 30 days
- Health Report PDF is downloaded 100+ times per week
- Interactive visual earns 5+ external backlinks within 90 days
- Progress timeline increases return visit rate by 20%

---

## Architecture Notes

### Shared Infrastructure

All four phases build on existing patterns:

- **Calculation logic** — All in `src/utils/calculators/`. Programmatic pages and quizzes reuse these functions directly.
- **CALCULATOR_CATALOG** — Single source of truth. Programmatic pages and embeds reference it for metadata.
- **SavedResultsContext** — Dashboard, timeline, and PDF report all consume saved results.
- **Dynamic sitemap** — Extends naturally to include programmatic pages and quiz/report routes.

### New Dependencies (Estimated)

| Phase | New Packages                                                                  |
| ----- | ----------------------------------------------------------------------------- |
| 1     | None (already built)                                                          |
| 2     | None (Next.js ISR + existing calc logic)                                      |
| 3     | `@vercel/og` (OG images)                                                      |
| 4     | `jspdf` or `@react-pdf/renderer` (PDF), possibly `framer-motion` (animations) |

### Performance Budget

- Programmatic pages: < 200 kB (they're simpler than full calculator pages)
- OG image generation: < 500ms at the edge
- PDF generation: client-side, no server cost
- Interactive visual: lazy-loaded SVG, no impact on initial page load

---

## Timeline Estimate

| Phase     | Scope                                       | Sessions           |
| --------- | ------------------------------------------- | ------------------ |
| 1         | Finish chains & dashboard                   | 1-2                |
| 2         | Programmatic SEO pages (5 calculators)      | 3-5                |
| 3         | Share cards, OG images, embeds, comparisons | 2-3                |
| 4         | Quiz, PDF, visual, timeline                 | 4-6                |
| **Total** |                                             | **10-16 sessions** |
