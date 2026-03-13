# Architecture Improvements Design Spec

**Date:** 2026-03-12
**Scope:** 3 independent improvements — LCP fix, blog registry consolidation, context provider merge
**Constraint:** Lighthouse scores must remain 100/100

---

## 1. LCP Fix — Server-Render the `<h1>`

### Problem

All 52 calculator pages render `<h1>` inside `CalculatorPageLayout` (`'use client'`). The title text is static and known at build/request time, but it's blocked behind JS bundle download + hydration. This penalizes Largest Contentful Paint.

### Design

**Slot-based h1 injection into `CalculatorPageLayout`.**

Add an optional `serverHeader?: React.ReactNode` prop to `CalculatorPageLayoutProps`. When provided, the layout renders it verbatim and skips its own `<h1>` + `<p>` description. When absent, the existing `title`/`description` string props render as before (backward compatible).

Each server-side `page.tsx` passes a pre-rendered header:

```tsx
// src/app/(default)/bmi/page.tsx (server component)
export default function BMICalculatorPage() {
  return (
    <BMICalculatorClient
      copy={getBMICopy(defaultLocale)}
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">Calculate your Body Mass Index...</p>
        </>
      }
    />
  );
}
```

The client component threads `serverHeader` through to `CalculatorPageLayout`:

```tsx
// Inside BMICalculatorClient (client component)
<CalculatorPageLayout
  title="BMI Calculator"          // still needed for embed mode, social share, structured data
  description="Calculate your..."  // still needed for embed mode
  serverHeader={props.serverHeader}
  ...
>
```

**CalculatorPageLayout changes (line ~265):**

```tsx
// Normal (non-embed) mode:
{
  props.serverHeader ?? (
    <>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-6 dark:text-gray-400">{description}</p>
    </>
  );
}
```

**Embed mode** is unaffected — embed detection is client-side (`window.location.search`), so the `serverHeader` slot is only used in normal mode. Embed mode continues to render its own smaller h1 from the `title` prop. The implementation guards this:

```tsx
if (isEmbed) {
  // Embed mode: client-only, uses title/description props with smaller font
  return (...);
}

// Normal mode: prefer server-rendered header, fallback to client-rendered
return (
  <div>
    {props.serverHeader ?? (
      <>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-6 dark:text-gray-400">{description}</p>
      </>
    )}
    ...
  </div>
);
```

**Chain mode** renders a `ChainProgressBar` above the h1. After this change, the progress bar is still client-rendered while h1 is server-rendered. A minor layout shift may occur when chain state hydrates — this only affects users in multi-step workflows and is acceptable.

### Impact

- h1 is in the initial HTML payload (server-rendered), no longer blocked by JS hydration
- LCP improves because the largest text element is immediately visible
- No breaking changes — `title`/`description` props are still required for embed mode, social sharing, structured data, and FAQ title formatting

### Files Changed

- `src/components/calculators/CalculatorPageLayout.tsx` — add `serverHeader` prop
- All 52 `page.tsx` files — add `serverHeader` JSX
- All 52 client components — thread `serverHeader` prop through
- `scripts/create-calculator.ts` — update template to include `serverHeader`

---

## 2. Blog Registry Consolidation

### Problem

Adding a new blog post requires updating 4 separate files:

1. `src/lib/blog/posts.ts` — metadata array (title, slug, date, category, etc.)
2. `src/app/(default)/blog/[slug]/page.client.tsx` — slug-to-component dynamic import map
3. `src/constants/blogMetadata.ts` — SEO metadata (title, description, keywords, OG tags)
4. `src/constants/affiliates.ts` — only for affiliate posts

### Design

**Merge into a single `src/lib/blog/registry.ts` file.**

The new registry combines the post listing data and SEO metadata into one entry per post. The component mapping is derived by convention.

```tsx
// src/lib/blog/registry.ts
export interface BlogPostEntry {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
  affiliate?: boolean;
  reviewer?: Reviewer;
  // SEO overrides (optional — defaults derived from title/description)
  seoTitle?: string;
  keywords?: string;
}

export const BLOG_REGISTRY: BlogPostEntry[] = [
  {
    slug: 'understanding-body-fat-percentage',
    title: "Understanding Body Fat Percentage: What's Healthy and Why It Matters",
    description: 'Understand healthy body fat ranges...',
    date: 'January 3, 2026',
    readTime: '11 min read',
    category: 'Health & Science',
    image: '/images/blog/understanding-body-fat-percentage.jpg',
    featured: true,
    keywords: 'body fat percentage, healthy body fat, body composition...',
  },
  // ... all 66+ posts
];
```

**Auto-derived values:**

- **SEO metadata:** `generateBlogMetadata(slug)` reads from registry, uses `seoTitle ?? title` and `description` to build the full `Metadata` object. No separate `blogMetadata.ts` needed.
- **Affiliate flag:** `affiliate: true` replaces the `AFFILIATE_BLOG_SLUGS` set in `page.client.tsx`.

**Component map stays manual.** Webpack requires static import paths for code splitting — template literal dynamic imports (`import(\`@/app/blog/${slug}/content\`)`) won't produce proper chunks. The existing `BLOG_POSTS`component map in`page.client.tsx` remains, but is simplified to just slug→import entries (no metadata duplication). A comment at the top references the registry as the source of truth.

**Consumer changes:**

- `src/app/(default)/blog/page.tsx` — import from `@/lib/blog/registry` instead of `@/lib/blog/posts`
- `src/app/(default)/blog/[slug]/page.client.tsx` — remove `AFFILIATE_BLOG_SLUGS` set (use `registry.affiliate` flag), keep manual component map
- `src/app/(default)/blog/[slug]/layout.tsx` — use new `generateBlogMetadata()` helper
- `src/constants/blogMetadata.ts` — deleted (data moves to registry)
- `src/lib/blog/posts.ts` — deleted (data moves to registry)

**What stays separate:** `src/constants/affiliates.ts` — product data (Amazon links, prices, ratings) is fundamentally different from blog metadata and used by multiple components. It stays as-is.

### Impact

- Adding a blog post: **2 files** (registry entry + component map entry) + content.tsx + image. Down from 4 files.
- Zero runtime cost change — same dynamic imports, same metadata generation
- SEO output is identical — just generated from consolidated data

### Files Changed

- `src/lib/blog/registry.ts` — new single-source-of-truth registry
- `src/lib/blog/posts.ts` — deleted
- `src/constants/blogMetadata.ts` — deleted
- `src/app/(default)/blog/[slug]/page.client.tsx` — remove affiliate set, use registry flag
- `src/app/(default)/blog/[slug]/layout.tsx` — use registry for metadata
- `src/app/(default)/blog/page.tsx` — import from registry

---

## 3. Context Provider Merge

### Problem

`DarkModeProvider` and `UnitSystemProvider` exist as standalone contexts with their own files, but the **only consumer** of `useDarkMode()` and `useUnitSystem()` is `PreferencesContext.tsx` internally. No component in the app imports them directly. This creates unnecessary provider nesting (5 levels) and 2 extra context files.

### Design

**Inline dark mode and unit system state directly into `PreferencesProvider`.**

Move the `useState`/`useLocalStorage`/`useEffect` logic from `DarkModeContext.tsx` and `UnitSystemContext.tsx` into `PreferencesContext.tsx`. The `usePreferences()` hook API is unchanged — all 5 consumer files (`Header.tsx`, `DarkModeToggle.tsx`, `CookieConsent.tsx`, `useUnitPreferences.ts`, `PreferencesContext.tsx`) continue calling the same methods.

**LayoutProviders simplifies from:**

```tsx
<LocaleProvider>
  <DarkModeProvider>
    <UnitSystemProvider>
      <PreferencesProvider>
        <CookieConsentProvider>{children}</CookieConsentProvider>
      </PreferencesProvider>
    </UnitSystemProvider>
  </DarkModeProvider>
</LocaleProvider>
```

**To:**

```tsx
<LocaleProvider>
  <PreferencesProvider>
    <CookieConsentProvider>{children}</CookieConsentProvider>
  </PreferencesProvider>
</LocaleProvider>
```

### Impact

- Simpler provider hierarchy (3 levels vs 5)
- 2 files deleted (`DarkModeContext.tsx`, `UnitSystemContext.tsx`), less code to maintain
- Zero API changes for consumers — `usePreferences()` returns identical values
- Slightly smaller bundle (eliminate 2 `createContext` + provider components)

### Files Changed

- `src/context/PreferencesContext.tsx` — inline dark mode + unit system state
- `src/context/DarkModeContext.tsx` — deleted
- `src/context/UnitSystemContext.tsx` — deleted
- `src/components/LayoutProviders.tsx` — remove 2 provider imports/nesting

---

## Testing Strategy

1. **Existing tests pass** — all 1,877 unit tests must remain green
2. **New tests for registry** — verify `generateBlogMetadata()` produces correct SEO output
3. **Import migration** — update all imports of `BLOG_POSTS` from `@/lib/blog/posts` to `BLOG_REGISTRY` from `@/lib/blog/registry`; update type references `BlogPost` → `BlogPostEntry`
4. **E2E smoke tests** — all 52 calculator pages render h1, all blog posts load
5. **Lighthouse CI** — scores must remain 100/100 (Performance, Accessibility, Best Practices, SEO)
6. **Context tests** — verify `usePreferences` returns same values after merge
7. **Hydration check** — verify no React hydration warnings after serverHeader change

## Execution Order

1. **Context provider merge** (smallest blast radius, no visual changes)
2. **Blog registry consolidation** (medium scope, data migration)
3. **LCP fix** (largest scope — 52+ files, but mechanical changes)

Each can be committed independently.
