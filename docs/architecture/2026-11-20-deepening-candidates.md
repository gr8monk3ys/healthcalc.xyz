# Deepening candidates, 2026-11-20

An architecture pass in the style of Matt Pocock's `codebase-design` skill: look for **shallow modules** (an interface nearly as big as what it hides) and propose **deeper** ones (a lot of behaviour behind a small interface, placed at a clean **seam**, tested through that interface). The goal is **locality** (a change lands in one place) and **leverage** (one implementation pays back across many callers), which is also what makes the code quick for an agent to navigate.

This is a review, not a refactor. No source code changed. Nothing here is decided; see "Decisions for Lorenzo" at the end.

Read against `CLAUDE.md` and `docs/agents/`. The repo has no `CONTEXT.md` or `docs/adr/` yet, so the terms below are the ones the code already uses: **calculator**, **`CALCULATOR_CATALOG`** (the catalog), **hub**, **chain** / **chain step** / `sharedFields`, **saved result**, **shared result** (share token), **embed**, **blog registry** (`BLOG_REGISTRY`).

## Ranked candidates

| #   | Candidate                                            | Size | Risk       |
| --- | ---------------------------------------------------- | ---- | ---------- |
| 1   | Derive a calculator's page identity from the catalog | M    | Low–medium |
| 2   | One declaration of a calculator's inputs             | L    | Medium     |
| 3   | A saved-results store with two real adapters         | M    | Medium     |
| 4   | One embed module instead of two embed mechanisms     | S–M  | Low–medium |
| 5   | One guard for write API routes                       | S    | Low        |

---

## 1. Derive a calculator's page identity from the catalog (top pick)

**Modules involved:** `src/constants/calculatorCatalog.ts`, `src/constants/relatedCalculators.ts`, every `src/app/(default)/<slug>/layout.tsx`, `page.tsx` and `page.client.tsx`, `src/components/calculators/CalculatorPageLayout.tsx`, `src/utils/schema.ts`, `scripts/create-calculator.ts`.

**Why it is shallow today.** The catalog is called the single source of truth, but it only feeds the sitemap, search index, hub pages and `/calculator/[slug]`. Each real calculator route restates its own identity by hand, so `CalculatorPageLayout`'s interface is nearly as big as its job: callers must pass `title`, `description`, `calculatorSlug`, `structuredData`, `faqs` and `relatedArticles`, all of which are knowable from the slug.

Evidence:

- **One title, eleven copies.** "FFMI Calculator" is written 11 times across 6 files: the catalog, `relatedCalculators.ts`, `ffmi/layout.tsx` (×4: title, OG title, OG alt, Twitter title), `ffmi/page.tsx` (h1), `ffmi/page.client.tsx` (×2: layout `title`, structured-data `name`) and `body-fat/BodyFatResult.tsx` (×2, next-step labels). The description is copied the same way.
- **62 hand-written route `layout.tsx` files, 2,215 lines,** almost all of them a `Metadata` literal. 54 use `canonical: './'`; the scaffolder (`scripts/create-calculator.ts:163`) emits an absolute `https://www.healthcalc.xyz/<slug>` canonical instead, so new calculators already drift from old ones. The scaffolder also never touches `CALCULATOR_CATALOG` and doesn't use `useCalculatorForm`, contradicting `CLAUDE.md`.
- **56 inline `structuredData={{ ... }}` literals** with a hardcoded host, while `createCalculatorSchema` in `src/utils/schema.ts` exists and is used by 3 files.
- **Two sources for related calculators.** `catalog.detail.relatedCalculators` (10 entries, used by `/calculator/[slug]`) and `relatedMap` in `relatedCalculators.ts` (49 entries, used by `RelatedCalculators`), plus a second list of 50 cards repeating catalog titles and descriptions. `catalogIntegrity.test.ts` exists mainly to stop these copies diverging. That test is a symptom of the missing module.
- **93 inline related-article objects in 53 `page.client.tsx` files** restate blog metadata, and they have already drifted. `BLOG_REGISTRY` has `tdee-explained` as `January 7, 2026`, `10 min read`, category `Energy Expenditure`. The 35 inline copies say `February 15, 2025` (29) or `February 20, 2025` (6), `12 min read`, category `Metabolism`. Visitors see the stale values.

**Deletion test.** Delete `CalculatorPageLayout`'s identity props today and nothing absorbs them: the knowledge is spread over N callers. After deepening, deleting the new module would push catalog lookups back into 56 routes. That means the module is earning its keep.

**Proposed interface.**

```ts
// src/constants/calculatorCatalog.ts
export const CALCULATOR_CATALOG = [ /* ... */ ] as const satisfies readonly CalculatorCatalogItem[];
export type CalculatorSlug = (typeof CALCULATOR_CATALOG)[number]['slug'];

// src/lib/calculatorPage.ts: the deep module
export interface CalculatorPage {
  slug: CalculatorSlug;
  title: string;
  description: string;
  canonicalPath: `/${CalculatorSlug}`;
  structuredData: Record<string, unknown>[]; // calculator + FAQ schema
  faqs: { question: string; answer: string }[];
  relatedCalculators: { slug: CalculatorSlug; title: string; description: string }[];
  relatedArticles: BlogPostSummary[]; // looked up in BLOG_REGISTRY, never restated
}
export function getCalculatorPage(slug: CalculatorSlug): CalculatorPage;
export function calculatorMetadata(slug: CalculatorSlug): Metadata;

// each route's layout.tsx collapses to:
export const metadata = calculatorMetadata('ffmi');

// CalculatorPageLayout's identity props collapse to `slug`:
<CalculatorPageLayout slug="ffmi" showResultsCapture={showResult} understandingSection={...}>
```

`relatedCalculators.ts` and `catalog.detail.relatedCalculators` merge into a single `related: CalculatorSlug[]` on the catalog entry. A per-calculator copy override such as `shareTitle` can stay as an optional catalog field.

**What it makes easier.** One loop test over every slug (`calculatorMetadata` has a title, a canonical and an OG image that exists; every related slug and article resolves) replaces the cross-file integrity checks. Renaming a calculator or fixing a description becomes a one-line change. An agent finds a calculator's identity in one file. `CalculatorSlug` makes `useChainPrefill('ffmi')`, `calculatorSlug="ffmi"`, `CALCULATOR_METRICS` and `relatedMap` keys type-checked instead of free strings. It also gives candidate 2 its slug type.

**Dependency category:** in-process. No adapter needed; test the module directly.

**Size:** M. It's mostly mechanical and codemod-friendly: about 56 routes, roughly −2,000 lines of `layout.tsx`, about −750 lines of inline article objects and about −400 lines of structured-data literals. It can land one hub at a time.

**Risk:** low–medium. SEO output is the exposure. Mitigate by snapshotting `metadata` for every route before the change and diffing it after. The only intended diffs are drifted values (canonical form, article dates).

---

## 2. One declaration of a calculator's inputs

**Modules involved:** `src/hooks/useCalculatorForm.ts`, `src/utils/validation.ts`, `src/hooks/useCalculatorUnits.ts`, `src/hooks/useChainPrefill.ts`, `src/hooks/useChainState.ts`, `src/constants/calculatorChains.ts`, `src/utils/resultSharing.ts`, `src/hooks/useSharedResultPrefill.ts`, and the 60 `page.client.tsx` files.

**Why it is shallow today.** `useCalculatorForm` is a thin submit/reset state holder. Its interface is "pass me a `validate` closure and a `calculate` closure", so every page re-implements the actual work: required checks, unit conversion, range validation, chain prefill and chain output. A calculator's inputs (which fields, canonical unit, range, required) are declared in up to four places that don't know about each other:

- **Validation is restated per page.** 143 `'... is required'` strings. `validateHeight` has 24 call sites, `validateWeight` 30 and `validateAge` 22, each wrapped in the same `isEmpty → required, else validateX` block. Conventions differ by page: `ffmi` converts to kg and then validates with `'metric'`, while `protein` validates the raw display value with a derived unit system.
- **Shared results re-validate with different numbers.** `resultSharing.ts` (613 lines) has hand-written type guards whose ranges disagree with `VALIDATION_RANGES`: height 50–260 cm vs 30–300, weight 20–350 kg vs 2–600. A form input the page accepts (weight 400 kg) produces a share token that decodes to nothing.
- **Chain plumbing is copied.** 12 pages each carry the same `useChainPrefill` + `useEffect` + `chainResultData = useMemo(...)` block, keyed by untyped strings (`Record<string, string | number>`) that must match `sharedFields` in `calculatorChains.ts`.
- **A latent unit bug.** Chain data is stored in cm/kg, but prefill calls `weight.setValue(kg)` on a field whose unit might be lb. It works only because `useWeight`/`useHeight` always start metric. The `UnitToggle` preferences (`useUnitPreferences`) aren't wired into calculators. Wiring them in would silently prefill wrong values.

**Proposed interface.**

```ts
// src/lib/calculatorInputs.ts
const ffmiInputs = defineInputs({
  height: length({ required: true }),          // canonical cm, display cm|ft
  weight: mass({ required: true }),            // canonical kg, display kg|lb
  bodyFatPercentage: percent({ min: 1, max: 70 }),
});
type FFMIInputs = InferInputs<typeof ffmiInputs>; // { height: number; weight: number; bodyFatPercentage: number }

ffmiInputs.parse(raw: unknown):
  | { ok: true; value: FFMIInputs }
  | { ok: false; errors: Partial<Record<keyof FFMIInputs, string>> };

// one hook replaces useCalculatorForm + useHeight/useWeight + chain/share prefill glue
const form = useCalculatorForm('ffmi', ffmiInputs, (v: FFMIInputs) => processFFMICalculation(v));
form.field('weight');   // { value, unit, toggle, onChange, error, placeholder }
form.result; form.submit; form.reset;
// chain prefill/output and share encode/decode come from ffmiInputs, in canonical units
```

Ranges come from `VALIDATION_RANGES` once, so forms, share tokens and chain steps can't disagree.

**What it makes easier.** The pure `parse` is unit-testable without React, for every calculator in one table-driven test. A unit or range bug is fixed once. Adding a calculator no longer means writing about 100 lines of validation and prefill glue. `resultSharing.ts`'s per-calculator guards and `SharedResultInputMap` can be generated from the same declaration.

**Dependency category:** in-process.

**Size:** L in total, but incremental. Build the module plus one calculator (`ffmi`), then migrate a hub at a time. The old hook stays until the last page moves.

**Risk:** medium. It touches every calculator's form. `e2e/calculators-all.spec.ts` iterating the catalog is the safety net. Do candidate 1 first for `CalculatorSlug`.

---

## 3. A saved-results store with two real adapters

**Modules involved:** `src/context/SavedResultsContext.tsx` (467 lines), `src/hooks/useSavedResultsManager.ts`, `src/utils/savedResultsKey.ts`, `src/lib/db/savedResults.ts`, `src/app/(default)/api/saved-results/*`, `supabase/migrations/001_saved_results.sql`.

**Why it is shallow today.** The context's interface (`saveResult`, `removeResult`, `restoreResult`, `clearAllResults`, `confirmSync`) looks small. But the implementation branches on `isAuthenticated && user && supabaseEnabled` inside each of the five operations and picks between eight free functions (four Supabase, four `fetch('/api/saved-results')`). All remote writes are fire-and-forget `void` calls. The seam is real because two adapters already exist, but it's implicit, so no test can stand in for either.

Evidence:

- **No tests.** There's no test for `SavedResultsContext` (`src/context/` has only `AuthContext.test.tsx`).
- **The H2 bug from `REVIEW.md` is still live.** `001_saved_results.sql:5` has `id text primary key` (global), `upsertResultToSupabase` upserts `onConflict: 'id'`, and the id is a 32-bit content hash. Two users saving the same input collide, RLS blocks the update and the save is silently lost.
- **The result key is computed twice.** `generateResultId` lives in the context and `computeSavedResultKey` is called separately in `useSavedResultsManager`, so the "already saved?" check and the write must agree by convention.
- **Guest sync clears local data before the remote write is known to have landed** (`confirmSync`).

**Proposed interface.**

```ts
// src/lib/savedResults/store.ts: the port
export interface SavedResultsStore {
  list(): Promise<SavedResult[]>;
  save(
    result: SavedResult
  ): Promise<{ ok: true } | { ok: false; reason: 'conflict' | 'unavailable' }>;
  remove(id: string): Promise<void>;
  clear(): Promise<void>;
}
export function createSupabaseStore(client: SupabaseClient, userId: string): SavedResultsStore;
export function createApiStore(fetchImpl: typeof fetch): SavedResultsStore;
export function createMemoryStore(seed?: SavedResult[]): SavedResultsStore; // tests

// src/lib/savedResults/sync.ts: pure merge and sync, tested against the memory store
export async function syncGuestResults(
  guest: SavedResult[],
  store: SavedResultsStore
): Promise<{ synced: SavedResult[]; failed: SavedResult[] }>;
```

The provider picks one store once and becomes a thin React binding. The result key is owned by the store module.

**What it makes easier.** Every sync rule (merge, dedupe, guest hand-over, the 30-item cap) becomes testable with `createMemoryStore`, and a failed write can surface instead of vanishing. A later decision to drop one backend means deleting one adapter.

**Dependency category:** remote but owned (the API route) plus true external (Supabase). Use ports and adapters with an in-memory adapter for tests.

**Size:** M. **Risk:** medium. It's user data, and fixing H2 needs a Supabase migration to a `(user_id, id)` key. Do the store refactor first with behaviour unchanged, then the migration.

---

## 4. One embed module instead of two embed mechanisms

**Modules involved:** `src/app/(default)/api/embed/[calculator]/route.ts` (658 lines) with `mifflinBmrJs.ts`, `src/components/calculators/CalculatorPageLayout.tsx` (`?embed=1` mode), `src/components/calculators/EmbedCalculator.tsx`, `src/components/calculators/EmbedWidgetPicker.tsx`, `src/components/EmbedCodeGenerator.tsx`, `src/components/calculators/CalculatorForm.tsx`, `src/app/(default)/embed/page.client.tsx`, `src/utils/embed.ts`.

**Why it is shallow today.** "Embed calculator X" has two implementations and four snippet builders:

- `/api/embed/<slug>` serves 4 calculators with the math **rewritten as vanilla-JS strings**: BMI categories, the healthy-weight range, US Navy body fat and the deficit plan. Only the Mifflin BMR snippet has a drift test against `calculateBMR`. The rest can silently disagree with `src/utils/calculators/`, which `CLAUDE.md` says must not be reimplemented.
- `/<slug>?embed=1` renders the real calculator for every slug, via `CalculatorPageLayout`.
- Iframe snippets are built in `utils/embed.ts` (`?embed=1`), `EmbedCodeGenerator.tsx`, `embed/page.client.tsx` (both `/api/embed`) and `EmbedCalculator.tsx`. The list of embeddable slugs is restated in the route, in `CalculatorForm.tsx` (`EMBEDDABLE_SLUGS`) and in `embed/page.client.tsx`.
- `CalculatorForm`'s `showEmbed` path to `EmbedCodeGenerator` has no caller that passes `showEmbed`, so it's dead.

**Proposed interface.**

```ts
// src/lib/embed.ts
export function isEmbeddable(slug: CalculatorSlug): boolean; // from the catalog
export function embedSnippet(
  slug: CalculatorSlug,
  opts?: { theme?: 'light' | 'dark'; height?: number }
): string;
export function embedUrl(slug: CalculatorSlug, opts?: { theme?: 'light' | 'dark' }): string;
```

All snippet builders call this module. Whether `/api/embed/<slug>` survives as a redirect to `/<slug>?embed=1` (existing third-party iframes keep working) or is kept, with its scripts generated from the TypeScript functions, is a product call.

**What it makes easier.** One place decides what an embed URL is. The calculator math has one implementation. The embed page and widget picker stop disagreeing about which calculators can be embedded.

**Dependency category:** in-process.

**Size:** S–M. **Risk:** low–medium. Iframes already pasted on other sites point at `/api/embed/*`, so keep that URL working.

---

## 5. One guard for write API routes

**Modules involved:** `src/app/(default)/api/{contact,newsletter,embed-request,client-errors,saved-results,saved-results/[id]}/route.ts`, `src/utils/csrf.ts`, `src/utils/rateLimit.ts`.

**Why it is shallow today.** Each write route repeats CSRF, then rate-limit, then `request.json()`, then `safeParse`, then the `{ success: false, error }` envelope with its own status codes. The rate limiter's interface leaks a rule callers must remember: pass a `routeKey`, or share the `'global'` bucket. `contact` and `newsletter` both call `rateLimit(request)` without one, so they share a bucket. Signing up for the newsletter spends the contact form's allowance, even though `rateLimit.ts`'s own doc example shows `routeKey: 'newsletter'`. Order also differs: `client-errors` rate-limits before checking CSRF, the others check CSRF first.

**Proposed interface.**

```ts
// src/lib/api/writeRoute.ts
export function writeRoute<S extends z.ZodType>(opts: {
  key: string; // required: becomes the rate-limit bucket
  schema: S;
  limit?: { limit: number; windowMs: number };
  handle: (input: z.infer<S>, req: NextRequest) => Promise<Response>;
}): (req: NextRequest) => Promise<Response>;

export const POST = writeRoute({ key: 'contact', schema: contactSchema, handle: sendContact });
```

**What it makes easier.** One test file covers 403, 429 and 400 behaviour for all routes. A route can't forget its bucket. Handlers shrink to their real work.

**Dependency category:** in-process (the rate limiter is in-memory).

**Size:** S. **Risk:** low.

---

## Notes

- **Open PR #129** (`claude/setup-matt-pocock-skills`, "Update the Matt Pocock skills setup to the current version") touches `CLAUDE.md` and `docs/agents/domain.md` only. It doesn't overlap this document or any file named above. If candidate 1 lands, `CLAUDE.md`'s "Where things live" and "Adding a calculator" sections will need updating, so sequence that edit after #129 merges.
- Out of scope here, because they're product or medical decisions rather than module shape: the programmatic SEO pages, fabricated reviewers and invented formulas flagged in `REVIEW.md`.
- The terms **calculator page identity** and **calculator inputs** aren't in any glossary yet. If either candidate goes ahead, they're worth pinning down with `/domain-modeling` (which would create `CONTEXT.md`).

## Decisions for Lorenzo

These two questions decide whether, and how, to do candidate 1:

1. **Where should a calculator's page copy live?** Option A: inside `CALCULATOR_CATALOG` (title, meta description, FAQs, related slugs). The catalog becomes the page's true single source, but grows large. Option B: a colocated `src/app/(default)/<slug>/calculator.ts` definition per route that the catalog only indexes. Option B keeps the catalog small, but adds a file per calculator.
2. **How should related articles be chosen?** Option A: keep a hand-picked list per calculator, but as blog slugs only, with title, date and read time looked up from `BLOG_REGISTRY`. Option B: derive them automatically from the registry by category or tag. Either way, the 93 inline copies go, and visitors will see the registry's dates and read times instead of the stale ones. Is that change in what's shown acceptable?
