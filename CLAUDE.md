# CLAUDE.md

HealthCalc (healthcalc.xyz): Next.js 16 / React 19 / TypeScript / Tailwind v4 site with health calculators (counted from `CALCULATOR_CATALOG`; never hardcode the number in copy) and a blog. Package manager is Bun (`bun.lock`). Default branch: `master`.

## Commands

- `bun install`; `bun run dev` (localhost:3000); `bun run build` (`next build --webpack`); `bun run start`
- `bun run lint` (ESLint, zero warnings), `bun run type-check`, `bun run format:check`
- `bun run test -- --run` (Vitest, jsdom); `bun run test -- path/to/file.test.ts` for one file
- `bun run test:e2e` / `bun run smoke` (Playwright; `npx playwright install chromium` first; no server may be running)
- `bun run check` (alias `validate`) = format:check + lint + type-check + `lint:boundaries` (dependency-cruiser, `.dependency-cruiser.cjs`) + test
- Types: `reset.d.ts` loads `@total-typescript/ts-reset` (`JSON.parse`/`.json()` return `unknown`; narrow them). Tests build partial fixtures with `fromPartial` from `@total-typescript/shoehorn`, not `as` casts. `noUncheckedIndexedAccess` is not on yet (287 errors).

## Where things live

- `src/constants/calculatorCatalog.ts` — single source of truth for calculators (slug, title, category, hub); 56 entries today. `src/app/(default)/sitemap.ts` builds `/sitemap.xml` from it and `src/lib/searchIndex.ts` builds `/search-index.json` from it and the blog registry; neither is a static file.
- `src/app/(default)/<slug>/` — per calculator: `page.tsx` (server shim: static header, re-exports metadata), `page.client.tsx` (the calculator; `bmi` and `conversions` keep theirs under `src/components/`) and `layout.tsx` (metadata). Every calculator renders through `CalculatorPageLayout`. There are no `/api/<slug>` routes; the only calculator API is `/api/embed/[calculator]`.
- `src/utils/calculators/` — pure calculation functions with colocated tests. `calculateBMR`/`calculateTDEE` in `tdee.ts` are shared; do not reimplement.
- `src/utils/validation.ts` (`validateAge`, `validateWeight`, ... return `{ isValid, error?, sanitized? }`) and `src/utils/conversions.ts` — the only places for input validation and unit conversion.
- `src/hooks/useCalculatorForm.ts` — shared submit/validate/result state, used by 54 of 56 calculators (all but `bmi` and `conversions`).
- `src/lib/blog/registry.ts` — blog post metadata; post bodies are TSX at `src/app/(default)/blog/<slug>/content.tsx`, registered in `blog/[slug]/postBodies.tsx`.
- `src/lib/<dir>/` (`blog`, `db`, `supabase`) are packages: files in a subfolder inside one are private; import only its root files from outside (enforced by `lint:boundaries`).
- `src/lib/db/` — submissions and saved results; Postgres (`pg`) in production, `node:sqlite` locally, selected by `SUBMISSIONS_DB_DRIVER`.
- `src/lib/supabase/` — magic-link auth; saved results use RLS.
- `src/proxy.ts` — the Next.js proxy (there is no `middleware.ts`): canonical-host and trailing-slash redirects, `/en/*` → unprefixed, other locale prefixes → English (302), and security headers (CSP, `X-Frame-Options: DENY` except embed routes).
- `src/i18n/` — locale config and message strings. Only English ships; there are no locale-prefixed pages.

## Adding a calculator

Add to `CALCULATOR_CATALOG`, create the route folder, types in `src/types/`, logic + tests in `src/utils/calculators/`, constants in `src/constants/`, and components in `src/components/calculators/<name>/`. `bun run create:calculator` scaffolds most of this. The smoke suite (`e2e/calculators-all.spec.ts`) iterates the catalog, so there is no slug list to update.

## Gotchas

- Playwright `getByLabel`/`getByRole` match substrings: use `{ exact: true }` for `'Age'`, `'Male'`, `'Calculate'`.
- Vitest excludes `e2e/`; zod v4 needs `server.deps.inline: ['zod']` (already set in `vitest.config.mjs`).
- CI is `.github/workflows/ci.yml`, one job `Code Quality & Testing` (required check); it also runs the build, smoke and E2E suites.

## Agent skills

### Issue tracker

GitHub Issues on `gr8monk3ys/healthcalc.xyz`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical roles, label string equal to role name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
