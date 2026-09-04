# HealthCheck (healthcalc.xyz) — Honest Repo Review

_Reviewed 2026-07-01. Method: an 11-dimension parallel audit (correctness, architecture,
UI/UX, accessibility, security, data, SEO/content, AI-slop, testing, performance, direction),
every critical/high finding independently re-verified by an adversarial second pass. Severities
below are the **post-verification** ones — several scary-sounding first-pass findings did **not**
survive, and I say so where relevant, because that's the honest part._

---

## TL;DR

This is a **competently engineered, genuinely designed** health-calculator site that is also,
underneath, an **AdSense + Amazon-affiliate SEO play** — and the SEO/content machinery is the part
most likely to sink it. The engineering is well above typical AI-generated output (real
single-sources-of-truth, parameterized SQL, CSRF+validation everywhere, a real accessibility
baseline, a self-aware `TODO.md`). But three themes drag it down:

1. **Fabricated medical precision.** Several calculators pair _real journal citations_ with
   _invented math_ and present the output as a health metric. This is the single most serious
   problem for a YMYL ("your money or your life") health site.
2. **A content strategy that maximizes exactly what Google penalizes** — ~1,188 thin programmatic
   pages, ~35 same-day affiliate clones, and fabricated "expert reviewers" with credentials and
   universities on AI-written posts.
3. **Sprawl.** 56 calculators, 71 blog posts, ~72 hand-maintained locale mirrors, 921 files, 153K
   LOC — for what is fundamentally a small tool. The breadth is a liability, not a moat.

Is it "AI slop"? **Partly, and honestly less than I expected.** The _texture_ is unmistakably
machine-generated (see §2). But it's unusually disciplined slop — the bones are good. The slop that
matters isn't the messy comments; it's the **fabricated science and fabricated expertise**.

---

## 1. Is this AI slop? (the headline question)

**Yes, it's AI-generated — the tells are everywhere — but the quality bimodal.**

Dead giveaways of unreviewed generation:

- **24 `// Rule:` prompt-echo comments across 7 files.** These are verbatim echoes of the generation
  rubric, not documentation — e.g. `bmi.ts:1` opens with `// Rule: Move calculation logic from
/app/api to /utils/calculators for better organization`. Worse, `SaveResult.tsx:190` carries
  `// Rule: Move localStorage logic to dedicated hooks/utilities` sitting directly above a line that
  **already calls** `useSavedResultsManager()`. The instruction was completed; the echo was never
  removed. This is the clearest single tell in the repo, and it violates the project's _own_
  `PROJECT-RULES.md` ("comments: when: non_obvious_logic_only").
- **134 restatement comments** (`// Convert`, `// Calculate`, `// Return`, `// Round to 1 decimal`)
  across 19 calculator files, plus JSDoc that merely restates the signature.
- **Template clones:** ~35 `best-*` affiliate posts share an identical scaffold (imports, metadata,
  OG/Twitter/JSON-LD block, per-product card, comparison table, "Final recommendations"), 675–881
  lines each. **31 of them share the exact same publish date** ("February 8, 2026").
- **Dead abstractions shipped as if used:** `useCalculatorFormWithState` (166 lines, **zero**
  callers — its own docstring says "Prefer useCalculatorForm above"), and all of
  `DynamicComponent.tsx` (121 lines, zero call sites).
- **Fabricated math wearing a lab coat** (the serious one) — see §3.

The counter-evidence (why this isn't _lazy_ slop): a real catalog→sitemap single-source-of-truth,
`calculateBMR`/`calculateTDEE` genuinely reused rather than re-implemented, fully parameterized SQL
on both DB backends, a real ARIA baseline, and a `TODO.md` that already honestly lists half of these
issues. The security auditor's verdict was blunt: _"noticeably better than typical AI-generated
projects."_

**Verdict:** the machine-generated _texture_ is cosmetic and cheap to clean. The machine-generated
_substance problems_ — invented formulas and invented experts — are the ones that can actually hurt
users and the domain.

---

## 2. Code review — findings by severity (post-verification)

### 🔴 High — fix these

| #   | Finding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Where                                                                                   |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| H1  | **Fabricated child BMI percentile shown as a medical metric.** `estimateBMIPercentile` invents `medianBMI = 15 + age*0.4`, `sd = 2 + age*0.1`, and a **linear** map `50*(1 + z*0.7)` that the comment mislabels as a "normal distribution CDF." None of it comes from CDC LMS data (the file header cites "CDC Growth Charts"). It's live: `BMICalculatorClient` feeds it into the child Underweight/Healthy/Overweight/Obese classification. Tests only assert `0–100` bounds, so the wrong math is guarded by green checkmarks. **CONFIRMED.**                                                                                          | `src/utils/calculators/bmi.ts:121`                                                      |
| H2  | **Silent cross-user data loss in Supabase saved results.** The Supabase `saved_results` table uses a **32-bit content hash as a global primary key** (not composite with `user_id`). Two users saving the same input (e.g. BMI @ 175/70) produce the same `id`; the client upserts `onConflict: 'id'`, hits the _other_ user's row, RLS blocks the update (0 rows), and the save is **silently lost** with no error surfaced. (The parallel Postgres table correctly keys `(user_id, result_key)`.) Not a data _leak_ — RLS on SELECT holds — but a silent sync failure. **CONFIRMED.**                                                   | `supabase/migrations/001_saved_results.sql:5`, `src/context/SavedResultsContext.tsx:94` |
| H3  | **Fabricated "expert reviewers" on YMYL content (E-E-A-T / FTC risk).** `reviewers.ts` defines Sarah Chen (MS, CSCS, "University of Florida"), James Morton (RD, CSSD), Lisa Patel (PhD Epidemiology, "Emory University") — with a code comment asserting "verifiable credentials" — and auto-assigns them by slug to AI first-person posts about GLP-1 drugs and pregnancy nutrition. No photos, no bio pages, no external footprint, and the Article schema author is `Organization` while the visible byline is a named human. This is exactly the pattern Google's Helpful-Content / medical E-E-A-T systems penalize. **CONFIRMED.** | `src/constants/reviewers.ts:14`                                                         |
| H4  | **~1,188 near-duplicate programmatic pages in the sitemap (doorway-page risk).** BMI 420 + TDEE 500 + calorie-deficit 126 + body-fat 22 + macro 120, all from one skeleton differing only by interpolated numbers, emitted at priority 0.65. Textbook scaled-content under Google's spam policy; dilutes crawl budget and can drag the _legitimate_ calculators down with it. **CONFIRMED.**                                                                                                                                                                                                                                              | `src/utils/programmaticSeo.ts:637`, `sitemap.ts:241`                                    |

### 🟠 Medium

- **Fabricated point-systems presented as concrete outputs.** `lifeExpectancy.ts` sums fixed integer
  year-deltas into a one-decimal "life expectancy" + "health age" + "percentile rank," fronted by
  NEJM/Lancet/Circulation citations that map to _no_ coefficient in the code. Exercise weighting is
  even non-monotonic (`active +5` but `very-active +4`). `diabetesRisk` maps an ad-hoc score to
  round "probabilities" (5/17/33/50%). `ketoCalculator`'s `estimateBodyFat()` just `return`s a
  constant 20 (male) / 28 (female). `glp1Calculator` multiplies deficit-derived loss by an invented
  `1.3` "medication boost."
- **BMI lookup tables have reachable gaps.** Ranges like `{max: 24.9}` then `{min: 25}` mean a BMI of
  24.95 / 29.95 / 39.95 matches no row and silently scores 0. Present in `diabetesRisk` and
  `lifeExpectancy`. Fix with half-open intervals.
- **Ovulation fertile window is off by a day** — ends on ovulation day, omits the standard
  post-ovulation fertile day (`ovulation.ts:30`).
- **Postgres schema-init promise never resets on failure** — one transient failure of the first
  `CREATE TABLE` caches a rejected promise for the whole process, wedging _all_ submission writes
  until restart. `savedResults.ts` handles this correctly; `submissions.ts:273` doesn't.
- **Two divergent, non-interoperating backends for one "saved results" feature** (Supabase table vs
  Postgres `user_saved_results`) with different schemas — double the surface, and where H2 hides.
- **Guest→cloud sync clears local data before confirming the remote write landed**
  (`SavedResultsContext.tsx:286`, fire-and-forget upserts).
- **Security defense-in-depth gaps:** `?embed=1` deletes `X-Frame-Options` and relaxes
  `frame-ancestors` to `'self' https:` (any HTTPS site can frame the interactive calculator —
  clickjacking); CSP uses `script-src 'unsafe-inline'` with no nonce, so CSP is not a real XSS
  backstop. Both already noted in `TODO.md`.
- **SEO plumbing:** structured data injected client-side (`afterInteractive`) rather than
  server-rendered; affiliate disclosure renders _below_ every buy link and the newsletter widget
  (FTC wants it above/near links); `sitemap.ts` `BLOG_SLUGS` is a hardcoded 51-entry array that
  drifts from `BLOG_REGISTRY` and **omits ~15 live posts** (including the genuinely good GLP-1
  ones) while flooding in the 1,188 thin pages; hardcoded star ratings ("4.6 out of 5") and prices
  ("$23") present invented numbers as measured review data (and prices will rot within weeks).

### 🟡 Low / cleanup

- Dead code: `useCalculatorFormWithState` (166 lines), `DynamicComponent.tsx` (121 lines),
  `renderXView` 12-prop indirection in ~10 files, `.radio-dot` CSS.
- `computeSavedResultKey` uses a weak 32-bit djb2 hash (collision-prone even ignoring H2).
- Duplicate `id="bmi-result"` (lines 198 & 206) makes the post-calc `focus()` silently no-op — a
  _real_ a11y bug the accessibility auditor **missed** while filing two that weren't real (see §4).
- `calculateHealthyWeightRange` uses BMI 24.9 as the upper bound while the category boundary is `<25`
  — contradictory guidance on the same screen.
- 44 components exceed the project's own 200-line rule; only 5 are documented exceptions.
- API error envelopes are inconsistent (`{ ok: false }` in 3 routes, `{ success: false }` in 10).
- Stale docs/config drift: comments reference a non-existent `src/middleware.ts`; `.env.example` and
  `PROJECT-RULES.md` reference **Clerk** while auth is actually Supabase.

### ✅ What's genuinely good (don't lose this in the cleanup)

- **Core formulas are correct and faithfully cited:** BMI (Quetelet), Mifflin-St Jeor / Harris-
  Benedict / Katch-McArdle BMR, US Navy & US Army body fat, Mosteller BSA, ABSI, Epley/Brzycki/
  Lombardi 1RM (with proper domain guards), Tanaka/Rockport VO2max, ADAG A1C→eAG. `conversions.ts`
  round-trips through a single base unit with exact factors.
- **Security posture is real:** parameterized queries on both DB drivers, static DDL, CSRF
  (Origin/Referer, fails closed in prod) + rate-limit + Zod on every write route, only the Supabase
  _anon_ key ever reaches the client, no `dangerouslySetInnerHTML` anywhere, embed HTML built via
  `textContent`.
- **Real single-source-of-truth discipline:** `calculatorCatalog` drives the dynamic sitemap; 54/56
  calculators actually use the shared `useCalculatorForm` + `CalculatorPageLayout` spine.
- **A genuine accessibility baseline** (see §4).

---

## 3. UI/UX review

**This is a designed product, not a bare SEO shell** — a coherent glass/neumorphism language (1,541
usages), `:focus-visible` rings globally, 44px (2.75rem) minimum touch targets, a working skip link,
a thorough `prefers-reduced-motion` block, and smart mobile tuning (strips `backdrop-filter` and
heavy shadows on small screens). Result reveals are wrapped in `role="region"` + `aria-live`. That's
better than most production form code.

But the finish is inconsistent and **several intended interactions are silently dead:**

- **Tailwind v4 has no `@config` link, so config-defined keyframes never compile.** `animate-fade-in`
  / `slide-in-up` / `shimmer` (44+ components, including the primary result-reveal on every
  calculator) reference `@keyframes` that live only in the never-loaded `tailwind.config.js`. They do
  nothing. _(First filed "high"; verification **downgraded to low** — no element pairs `opacity-0`
  with the animation, so content still renders fully; it just appears instantly instead of fading.
  Real bug, cosmetic impact.)_
- **`hover:shadow-neumorph-inset` is an undefined utility (~200 uses).** The intended hover/press
  feedback on the Calculate/Reset buttons and every category card generates no CSS rule.
- **Inverted button hierarchy / two button systems.** There's a polished gradient primary
  (`.ui-btn-primary`) — but it's used for _share/subscribe_, while the single most important action,
  **"Calculate," uses a flat neumorph panel** nearly identical to the Reset button beside it.
- **The BMI gauge marker uses a different scale than its colored bands**, so the pointer can land in
  the wrong-colored zone — a correctness problem when the visual _is_ the message.
- **Dark-mode seams:** hardcoded `bg-gray-200` buttons with no `dark:` variant in several result
  components.
- **Monetization is front-loaded at peak engagement.** Right after a result: share bar → email
  capture → AdSense unit → up to **6 affiliate product cards** → _then_ the "what this means"
  education. The user who just wanted their BMI has to scroll past a store to understand it.

### Accessibility — a useful honesty note

The a11y auditor filed a **"critical"** (radio buttons lack focus rings) and a **"high"** (result
`tabIndex=-1` is a "keyboard trap"). **Both were refuted on verification:** the global
`input:focus-visible` rule _does_ match native radios, and `tabIndex=-1` is the _correct_ pattern for
programmatically focusing a result region, not a trap. The "unit toggle relies on color" finding was
downgraded (it also uses `font-bold`, a non-color cue, and 3 of the 4 cited toggles are dead code).
Real remaining a11y gaps are **medium polish**: no automated contrast/axe check in CI, missing
`aria-controls` on the mobile menu, and the search dropdown isn't a proper combobox. Net: the a11y
foundation is **better than the raw findings suggested** — a good example of why the adversarial
verification pass matters.

---

## 4. Performance

Solid fundamentals (Next 16 SSR, `next/image` AVIF/WebP, `next/font` with `swap`, dynamic imports for
jsPDF/html-to-image, server-rendered calculator headers). The perf auditor's top three findings
("critical" 400–500KB bundle; "high" eager Supabase on every page; "high" blog import map) were all
**downgraded or refuted** — the byte counts were uncompressed source size (gzipped it's ~26KB not
116KB), Supabase is already lazy/dynamic, the header is already an RSC, and `next/dynamic` code-splits
the blog posts correctly. So performance is **not** the crisis the first pass implied.

The **real, surviving** perf items are medium/low: the i18n `messages.ts` (1,046 lines, 6 locales) is
a single non-tree-shakeable table pulled by every `useLocale()` consumer; Sentry initializes eagerly
at module load; `PreferencesContext` reads `localStorage` synchronously on mount; there's no bundle
analyzer or perf budget in CI; and static info sections are needlessly `'use client'`.

---

## 5. Testing

1,143+ unit cases, all 56 calculators have a test file, and `tdee.test.ts` is a genuinely good model
(hand-computed expected values, multiple formula methods, edge cases). But quality is uneven:

- **Tests lock in the fabricated formulas.** `bmi.test.ts` asserts only that the child percentile is
  `0–100` and monotonic — so the invented math (H1) passes green and would _break_ if you substituted
  correct CDC data. "Medical misinformation guarded by green checkmarks." **CONFIRMED.**
- **Tautological tests** that re-derive the implementation's own formula instead of citing an external
  reference value.
- **Coverage thresholds aren't enforced** (`fail_ci_if_error: false`), and E2E is smoke-only ("does
  it 404?") for 50 of 56 calculators — including `diabetes-risk`, `blood-pressure`, `life-expectancy`.
- Honesty note: the "no component/integration tests" finding was **refuted** (there are 25
  unit-toggle tests and real error-display/save tests), and "blood pressure has only trivial tests"
  was **downgraded to medium** (the classification logic is actually correct against 2017 AHA/ACC).

---

## 6. Direction — where this repo should go

### The honest framing

Strip the presentation and this is an **ad/affiliate SEO property**. That's a legitimate business
model — but the _current execution_ optimizes for precisely the signals that Google's 2023–2024
Helpful-Content and core updates, and the FTC, exist to punish: scaled programmatic pages, same-day
mass-published affiliate clones, and fabricated expertise on health topics. **The content strategy is
currently a liability that endangers the good tool underneath it.**

### Competitive reality

You are entering a space owned by `calculator.net` (enormous authority, decades old),
`omnicalculator.com` (huge, well-funded, real named experts), and `Healthline`/`MDCalc` (real medical
authority) on the YMYL calculators. A young `.xyz` domain **cannot out-breadth them** — 56 mediocre
calculators lose to their 500 authoritative ones. The only defensible wedge is being the **best,
most trustworthy, best-executed** tool for a _focused_ set of calculators.

### The recommendation: narrow and deepen. Stop generating; start curating.

**Stop doing:**

- Generating programmatic doorway pages and dumping 1,188 of them in the sitemap.
- Publishing template-cloned affiliate roundups en masse (and reconsider whether 35 Amazon buying
  guides belong on a _health_ domain at all — they shift the site's topical identity toward affiliate
  spam and put the whole domain's trust at risk).
- Attaching invented credentials to invented reviewers.
- Shipping calculators whose math is fabricated.

**Start doing:**

- Pick **8–12 calculators** you can make genuinely best-in-class (BMI, TDEE, body-fat, macros,
  calorie-deficit, one-rep-max, heart-rate zones are your strongest, already-correct core) and make
  those _the_ reference implementation on the web — correct math, real citations you actually
  followed, beautiful UX, fast.
- For anything medical/actuarial (child percentile, diabetes risk, life expectancy, blood pressure):
  **either implement the real reference model or remove the feature.** A missing calculator is fine;
  a confidently-wrong health number is not.
- If you keep the blog, make it a _small_ set of genuinely expert, genuinely reviewed articles (the
  GLP-1/Ozempic post proves you can — it cites real STEP/SURMOUNT/SELECT trials).

### 90-day priorities

1. **Trust & safety of the numbers:** fix or delete H1 (child percentile) and the fabricated
   point-systems; fix the ovulation off-by-one, BMI table gaps, and BMI-gauge scale.
2. **Fix H2** (composite PK on Supabase saved results) — silent data loss is the worst kind.
3. **De-risk the domain:** `noindex` the programmatic pages, regenerate the sitemap from
   `BLOG_REGISTRY`, and resolve the fabricated-reviewer problem (real reviewers with `Person` schema,
   or drop the credentials and use "HealthCheck Editorial Team").
4. **Fix the dead UI:** Tailwind `@config`/keyframes + `neumorph-inset` utility + button hierarchy.
5. **Strip the slop:** remove all `// Rule:` comments, delete the two dead abstractions, add a lint
   rule to prevent recurrence.
6. **Make tests mean something:** add reference-value tests (published tables, not re-derived math)
   for every medical calculator; enforce coverage in CI.
7. **Decide the business question:** are you a _tool_ with a little affiliate revenue, or an affiliate
   site with a tool? The codebase is currently trying to be both and doing the second one in a way
   that jeopardizes the first.

---

_Full per-dimension findings with file:line evidence and verification verdicts are available in the
review workflow output; the items above are the post-verification, de-duplicated set._
