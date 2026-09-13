# Product

<!-- impeccable:product-schema 1 -->

<!-- Written 2026-09-13 from repository evidence only (README.md, CLAUDE.md,
     src/app/(default)/about/page.tsx, layout metadata, calculatorCatalog.ts,
     calculatorHubs.ts, package.json). No product interview was possible.
     Every fact that is not a verbatim quote of shipped copy or code is marked
     "(inferred)" and should be confirmed or corrected by the owner. -->

## Platform

web

## Users

- People looking for a quick, free answer to a single health or fitness number: BMI, body fat, TDEE, calorie deficit, macros, heart-rate zones, running pace, due date, and so on. The hero copy calls this "day-to-day health decisions" (src/app/(default)/page.tsx). Arrival is mostly by search on a specific calculator name (inferred from the per-calculator routes, layouts with SEO metadata, sitemap generation, and an API mirror per calculator).
- Secondary audiences named by the hub taxonomy in `src/i18n/calculatorHubs.ts`: weight loss and management, body composition, metabolism and energy, nutrition and macros, performance and training, wellness and recovery, pregnancy and fertility, health and vitals. Specific niches the hero names: GLP-1 tracking and Army fitness testing (ACFT, Army body fat).
- Returning users who want history: results save to `localStorage`, and signed-in users (Supabase magic link) sync them to Postgres (`/saved-results`, `/dashboard`). Share of users who sign in is unknown (inferred: sign-in is optional; README says "The site runs with no environment variables").
- Site owners who embed a calculator via `/embed/<slug>` and `/calculator-widgets` (embed terms live at `/embed-terms`). Size of this audience is unknown.

## Product Purpose

HealthCalc (healthcalc.xyz) is a collection of free health and fitness calculators plus a blog. About-page copy: "Each one runs a published, peer-reviewed formula on the numbers you type in, and gives you a result you can actually use. ... No accounts required, no paywalls, no selling your data. The calculations happen in your browser."

Stated motivation (about page): "most online health calculators are either buried in ads or use outdated equations, and we thought that was a solvable problem."

Success (inferred): a visitor lands on a calculator, gets a correct result with an interpretation they trust, and either leaves satisfied or continues to a related calculator, guide, or saves the result. Ad revenue (Google AdSense) and affiliate links are the monetization; there is no paid tier (inferred from `src/lib/adsense.ts`, `AdUnit.tsx`, `AffiliateLinks.tsx`, `AffiliateDisclosure.tsx`, and the absence of any pricing or checkout route).

## Positioning

- Formula transparency: "Every calculator cites the specific formula it uses" (about page). The `/about/editorial` page lists the formulas (Mifflin-St Jeor, Harris-Benedict, Katch-McArdle, U.S. Navy circumference, Jackson-Pollock, and others).
- Correctness as an engineering discipline (README): every calculator is a pure function with a colocated test asserting against hand-computed reference values; `calculateBMR` / `calculateTDEE` are the single BMR/TDEE implementation that dependent calculators import.
- Breadth in one place: about 70 catalog entries (`src/constants/calculatorCatalog.ts`, 70 slugs; the about page says 52 and the hero says "50+", so the exact count in copy is stale (inferred)).
- Free, no account required, calculations run client-side.

## Operating Context

- Each calculator is a client page at `/<slug>` with an SEO layout, a JSON API at `/api/<slug>`, and an embeddable version at `/embed/<slug>`. Calculator chains (`/chains`) link several calculators into a flow; `/report` and `/share` produce shareable output; results can be exported as an image (`ResultsShare.tsx`, `hc-share-target`).
- Content: 68 blog posts (`src/lib/blog/registry.ts`), a `/learn` section, per-calculator FAQ sections, related guides and related calculators.
- Trust and compliance chrome present on pages: `MedicalDisclaimer` ("Info only. Not medical advice."), `ReviewedBy` bylines drawn from `src/constants/reviewers.ts`, `AffiliateDisclosure`, cookie consent (`CookieConsent.tsx`), `/privacy`, `/terms`, `/disclaimer`.
- Monetization: Google AdSense (`AdUnit`, publisher id in `src/lib/adsense.ts`) and affiliate links. Ads are a fixed part of every page layout; design work must not remove or move ad slots (owner instruction, 2026-09-13).
- Only English ships; locale-prefixed URLs redirect to English (`src/proxy.ts`, `src/i18n/`).
- Deployment target is Vercel (inferred from `@vercel/analytics` and `VercelAnalyticsGate.tsx`); Sentry and Google Analytics are optional via env.

## Capabilities and Constraints

- Stack: Next.js 16 (App Router, `next build --webpack`), React 19, TypeScript, Tailwind CSS v4, Bun. Default branch `master`.
- Quality gates: `bun run validate` (prettier, eslint with zero warnings, tsc, vitest) plus `next build`, Playwright smoke over every catalog route, and a fuller e2e suite; all run in CI on every push and PR.
- Shared form state in `src/hooks/useCalculatorForm.ts`; about a third of calculators still hand-roll it (CLAUDE.md). Validation and unit conversion live only in `src/utils/validation.ts` and `src/utils/conversions.ts`.
- Adding a calculator: catalog entry, route folder, types, logic + tests, constants, components, API route, e2e slug; `bun run create:calculator` scaffolds it.
- Terminology: "calculator" (never "tool" in routes), "hub" for a category landing page, "chain" for a linked multi-calculator flow, "result card" for the output panel.
- Undecided / unknown: whether any calculators are being retired; the true count to quote in copy; whether embed and API usage matters enough to design for.

## Brand Commitments

- Name: HealthCalc; domain healthcalc.xyz; canonical host www.healthcalc.xyz (owner brief).
- Voice as shipped: plain, direct, second person, short sentences, no hype ("That is the whole idea.", "These are still estimates. A DEXA scan will always beat a circumference formula."). Treat this as binding for new copy (inferred from about-page copy).
- The about page names three subject-matter reviewers with credentials (`src/constants/reviewers.ts`). Their existence and credentials are asserted by site copy only; the repository contains no independent evidence, so do not extend or embellish those claims.
- Visual identity is documented separately in DESIGN.md; the brief for this record did not make any visual constraint binding.

## Evidence on Hand

- `docs/screenshot.png`: home page screenshot used in the README.
- Formula citations on `/about` and `/about/editorial` (e.g. the 2005 Journal of the American Dietetic Association meta-analysis supporting Mifflin-St Jeor).
- 56 calculator test files with hand-computed reference values (README); 109 test files in `src/`.
- Home hero shows "Trust Stats" (`src/app/(default)/page.tsx`); the numbers are hard-coded in the page and were not verified against analytics (inferred).
- Absent: there are no testimonials, customer logos, case studies, press mentions, pricing, or usage metrics in the repository. Future work must not fabricate any.

## Product Principles

1. The number must be right, and the formula must be visible. Correctness and citation are the product; nothing on a result card should outrank the result and its source.
2. Answer first, then context. A visitor arriving from search should get the result with the fewest inputs possible; interpretation, related calculators, guides, and ads come after (inferred from the calculator page structure).
3. Free and frictionless. No account, no paywall, client-side math; sign-in is only ever an upgrade for saving history.
4. Estimates, honestly labeled. Every result is an estimate and says so; the medical disclaimer and reviewer byline are part of the page, not a footer afterthought.
5. Consistency across ~70 calculators beats novelty in one. Shared hooks, shared result components, shared validation; a new calculator should look and behave like the existing ones.

## Accessibility & Inclusion

- Established in code: skip link, `focus-visible` rings on all controls, 2.75rem minimum control height, `prefers-reduced-motion` handling, dark mode via a `.dark` class, `lang="en"`, semantic labels used by Playwright `getByLabel` tests. No formal conformance target (WCAG level) is recorded anywhere in the repository (inferred: none has been set).
