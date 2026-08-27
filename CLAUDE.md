# CLAUDE.md

HealthCalc (healthcalc.xyz): Next.js 16 / React 19 / TypeScript / Tailwind v4 site with ~60 health calculators and a blog. Package manager is Bun (`bun.lock`). Default branch: `master`.

## Commands

- `bun install`; `bun run dev` (localhost:3000); `bun run build` (`next build --webpack`); `bun run start`
- `bun run lint` (ESLint, zero warnings), `bun run type-check`, `bun run format:check`
- `bun run test -- --run` (Vitest, jsdom); `bun run test -- path/to/file.test.ts` for one file
- `bun run test:e2e` / `bun run smoke` (Playwright; `npx playwright install chromium` first; no server may be running)
- `bun run validate` = format:check + lint + type-check + test

## Where things live

- `src/constants/calculatorCatalog.ts` — single source of truth for calculators (slug, title, category, hub). `src/app/(default)/sitemap.ts` builds `/sitemap.xml` from it; there is no static sitemap.
- `src/app/(default)/<slug>/` — one `page.tsx` (client component) + `layout.tsx` (metadata) per calculator. API mirrors at `src/app/(default)/api/<slug>/route.ts`.
- `src/utils/calculators/` — pure calculation functions with colocated tests. `calculateBMR`/`calculateTDEE` in `tdee.ts` are shared; do not reimplement.
- `src/utils/validation.ts` (`validateAge`, `validateWeight`, ... return `{ isValid, error?, sanitized? }`) and `src/utils/conversions.ts` — the only places for input validation and unit conversion.
- `src/hooks/useCalculatorForm.ts` — shared form state; about a third of calculators still hand-roll it.
- `src/lib/blog/registry.ts` — blog post metadata; post bodies are TSX at `src/app/(default)/blog/<slug>/content.tsx`, registered in `blog/[slug]/page.client.tsx`.
- `src/lib/db/` — submissions and saved results; Postgres (`pg`) in production, `node:sqlite` locally, selected by `SUBMISSIONS_DB_DRIVER`.
- `src/lib/supabase/` — magic-link auth; saved results use RLS.
- `src/proxy.ts` — the Next.js proxy (there is no `middleware.ts`): canonical-host and trailing-slash redirects, `/en/*` → unprefixed, other locale prefixes → English (302), and security headers (CSP, `X-Frame-Options: DENY` except embed routes).
- `src/i18n/` — locale config and message strings. Only English ships; there are no locale-prefixed pages.

## Adding a calculator

Add to `CALCULATOR_CATALOG`, create the route folder, types in `src/types/`, logic + tests in `src/utils/calculators/`, constants in `src/constants/`, components in `src/components/calculators/<name>/`, the API route, and append the slug to `CALCULATOR_SLUGS` in `e2e/calculators-all.spec.ts`. `bun run create:calculator` scaffolds most of this.

## Gotchas

- Playwright `getByLabel`/`getByRole` match substrings: use `{ exact: true }` for `'Age'`, `'Male'`, `'Calculate'`.
- Vitest excludes `e2e/`; zod v4 needs `server.deps.inline: ['zod']` (already set in `vitest.config.mjs`).
- CI is `.github/workflows/ci.yml`, one job `Code Quality & Testing` (required check); it also runs the build, smoke and E2E suites.
