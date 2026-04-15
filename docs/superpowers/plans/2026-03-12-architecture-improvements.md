# Architecture Improvements Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve LCP by server-rendering h1 tags, consolidate blog management from 4 files to 2, and merge redundant context providers.

**Architecture:** Three independent changes committed separately. Context merge removes 2 provider layers. Blog registry unifies post metadata + SEO data. LCP fix passes server-rendered JSX through client components via a `serverHeader` slot prop.

**Tech Stack:** Next.js 16, React 19 Server Components, TypeScript, TailwindCSS v4, Vitest

---

## Chunk 1: Context Provider Merge

### Task 1: Inline DarkMode and UnitSystem state into PreferencesContext

**Files:**

- Modify: `src/context/PreferencesContext.tsx`
- Delete: `src/context/DarkModeContext.tsx`
- Delete: `src/context/UnitSystemContext.tsx`
- Modify: `src/components/LayoutProviders.tsx`

- [ ] **Step 1: Update PreferencesContext to inline all state**

Replace the contents of `src/context/PreferencesContext.tsx` with a self-contained provider that manages dark mode, unit system, and additional preferences directly — no external context dependencies.

The key changes:

- Remove imports of `useDarkMode` and `useUnitSystem`
- Add `useLocalStorage` calls for `dark-mode-preferences` and `unit-system-preferences` (same localStorage keys as before)
- Add the `useEffect` for system dark mode detection and `document.documentElement.classList` toggling (from `DarkModeContext.tsx` lines 64-92)
- Add unit system setters with the metric/imperial auto-switch logic (from `UnitSystemContext.tsx` lines 65-83)
- Keep the existing `PreferencesContextType` interface unchanged
- Keep the storage error notification UI unchanged

```tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useLocalStorage, LocalStorageError } from '@/hooks/useLocalStorage';

interface UserPreferences {
  darkMode: boolean;
  unitSystem: 'metric' | 'imperial';
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lb';
  energyUnit: 'kcal' | 'kj';
  saveHistory: boolean;
  notificationsEnabled: boolean;
}

interface PreferencesContextType {
  preferences: UserPreferences;
  setDarkMode: (enabled: boolean) => void;
  toggleDarkMode: () => void;
  setUnitSystem: (system: 'metric' | 'imperial') => void;
  setHeightUnit: (unit: 'cm' | 'ft') => void;
  setWeightUnit: (unit: 'kg' | 'lb') => void;
  setEnergyUnit: (unit: 'kcal' | 'kj') => void;
  setSaveHistory: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  resetPreferences: () => void;
  isSystemDarkMode: boolean;
  storageError: LocalStorageError | null;
  dismissStorageError: () => void;
}

// localStorage shapes (same keys as before for backward compat)
interface DarkModePreferences {
  darkMode: boolean;
}
interface UnitSystemPreferences {
  unitSystem: 'metric' | 'imperial';
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lb';
  energyUnit: 'kcal' | 'kj';
}
interface AdditionalPreferences {
  saveHistory: boolean;
  notificationsEnabled: boolean;
}

const defaultDarkMode: DarkModePreferences = { darkMode: false };
const defaultUnits: UnitSystemPreferences = {
  unitSystem: 'metric',
  heightUnit: 'cm',
  weightUnit: 'kg',
  energyUnit: 'kcal',
};
const defaultAdditional: AdditionalPreferences = {
  saveHistory: true,
  notificationsEnabled: false,
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [displayedError, setDisplayedError] = useState<LocalStorageError | null>(null);
  const handleStorageError = useCallback((error: LocalStorageError) => {
    setDisplayedError(error);
  }, []);

  // Dark mode state
  const [storedDarkMode, setStoredDarkMode, , darkModeStorageError] =
    useLocalStorage<DarkModePreferences>('dark-mode-preferences', defaultDarkMode, {
      onError: handleStorageError,
    });
  const [darkMode, setDarkModeState] = useState<boolean>(storedDarkMode.darkMode);
  const [isSystemDarkMode, setIsSystemDarkMode] = useState(false);

  // Unit system state
  const [storedUnits, setStoredUnits, , unitStorageError] = useLocalStorage<UnitSystemPreferences>(
    'unit-system-preferences',
    defaultUnits,
    {
      onError: handleStorageError,
    }
  );

  // Additional preferences state
  const [storedAdditional, setStoredAdditional, , additionalStorageError] =
    useLocalStorage<AdditionalPreferences>('additional-preferences', defaultAdditional, {
      onError: handleStorageError,
    });

  // Dismiss all storage errors
  const dismissStorageError = useCallback(() => {
    setDisplayedError(null);
  }, []);

  // Dark mode: sync to localStorage + DOM
  useEffect(() => {
    setStoredDarkMode({ darkMode });
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, setStoredDarkMode]);

  // Dark mode: detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsSystemDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Setters
  const setDarkMode = useCallback((enabled: boolean) => setDarkModeState(enabled), []);
  const toggleDarkMode = useCallback(() => setDarkModeState(prev => !prev), []);

  const setUnitSystem = useCallback(
    (system: 'metric' | 'imperial') => {
      setStoredUnits(prev => ({
        ...prev,
        unitSystem: system,
        heightUnit: system === 'metric' ? 'cm' : 'ft',
        weightUnit: system === 'metric' ? 'kg' : 'lb',
      }));
    },
    [setStoredUnits]
  );

  const setHeightUnit = useCallback(
    (unit: 'cm' | 'ft') => {
      setStoredUnits(prev => ({ ...prev, heightUnit: unit }));
    },
    [setStoredUnits]
  );

  const setWeightUnit = useCallback(
    (unit: 'kg' | 'lb') => {
      setStoredUnits(prev => ({ ...prev, weightUnit: unit }));
    },
    [setStoredUnits]
  );

  const setEnergyUnit = useCallback(
    (unit: 'kcal' | 'kj') => {
      setStoredUnits(prev => ({ ...prev, energyUnit: unit }));
    },
    [setStoredUnits]
  );

  const setSaveHistory = useCallback(
    (enabled: boolean) => {
      setStoredAdditional(prev => ({ ...prev, saveHistory: enabled }));
    },
    [setStoredAdditional]
  );

  const setNotificationsEnabled = useCallback(
    (enabled: boolean) => {
      setStoredAdditional(prev => ({ ...prev, notificationsEnabled: enabled }));
      if (enabled && typeof window !== 'undefined' && 'Notification' in window) {
        Notification.requestPermission();
      }
    },
    [setStoredAdditional]
  );

  const resetPreferences = useCallback(() => {
    setDarkModeState(false);
    setStoredUnits(defaultUnits);
    setStoredAdditional(defaultAdditional);
  }, [setStoredUnits, setStoredAdditional]);

  const preferences: UserPreferences = {
    darkMode,
    unitSystem: storedUnits.unitSystem,
    heightUnit: storedUnits.heightUnit,
    weightUnit: storedUnits.weightUnit,
    energyUnit: storedUnits.energyUnit,
    saveHistory: storedAdditional.saveHistory,
    notificationsEnabled: storedAdditional.notificationsEnabled,
  };

  const combinedStorageError =
    displayedError || darkModeStorageError || unitStorageError || additionalStorageError;

  const contextValue: PreferencesContextType = {
    preferences,
    setDarkMode,
    toggleDarkMode,
    setUnitSystem,
    setHeightUnit,
    setWeightUnit,
    setEnergyUnit,
    setSaveHistory,
    setNotificationsEnabled,
    resetPreferences,
    isSystemDarkMode,
    storageError: combinedStorageError,
    dismissStorageError,
  };

  return (
    <PreferencesContext.Provider value={contextValue}>
      {children}
      {/* Storage error notification - same UI as before */}
      {combinedStorageError && (
        <div
          className="fixed bottom-4 right-4 max-w-sm bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 shadow-lg z-50"
          role="alert"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Preferences Not Saved
              </h3>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                {combinedStorageError.message}. Your preferences will reset when you leave.
              </p>
            </div>
            <button
              type="button"
              onClick={dismissStorageError}
              className="ml-auto -mx-1.5 -my-1.5 bg-yellow-50 dark:bg-yellow-900 text-yellow-500 rounded-lg p-1.5 hover:bg-yellow-100 dark:hover:bg-yellow-800 inline-flex h-8 w-8"
              aria-label="Dismiss notification"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </PreferencesContext.Provider>
  );
}

export function usePreferences(): PreferencesContextType {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
```

- [ ] **Step 2: Update LayoutProviders to remove DarkModeProvider and UnitSystemProvider**

In `src/components/LayoutProviders.tsx`, remove the 2 provider imports and simplify nesting:

```tsx
import React, { ReactNode } from 'react';
import { PreferencesProvider } from '@/context/PreferencesContext';
import { CookieConsentProvider } from '@/components/CookieConsent';
import { LocaleProvider } from '@/context/LocaleContext';
import { defaultLocale, type SupportedLocale } from '@/i18n/config';

export default function LayoutProviders({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: SupportedLocale;
}): React.JSX.Element {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <PreferencesProvider>
        <CookieConsentProvider>{children}</CookieConsentProvider>
      </PreferencesProvider>
    </LocaleProvider>
  );
}
```

- [ ] **Step 3: Delete DarkModeContext.tsx and UnitSystemContext.tsx**

```bash
git rm src/context/DarkModeContext.tsx src/context/UnitSystemContext.tsx
```

- [ ] **Step 4: Run tests to verify nothing broke**

```bash
bun run test -- --run
```

Expected: All 1,877+ tests pass. The `usePreferences` API is unchanged so no consumers need updates.

- [ ] **Step 5: Run type-check**

```bash
bun run type-check
```

Expected: No errors. If any file imports `useDarkMode` or `useUnitSystem` directly (there should be none besides the deleted files), fix those imports.

- [ ] **Step 6: Commit**

```bash
git add src/context/PreferencesContext.tsx src/components/LayoutProviders.tsx
git commit -m "refactor: merge DarkMode + UnitSystem contexts into PreferencesProvider

Inline dark mode and unit system state directly into PreferencesProvider,
eliminating 2 redundant context layers. The usePreferences() API is unchanged.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 2: Blog Registry Consolidation

### Task 2: Create unified blog registry

**Files:**

- Create: `src/lib/blog/registry.ts`
- Modify: `src/app/(default)/blog/page.tsx`
- Modify: `src/app/(localized)/[locale]/blog/page.tsx`
- Modify: `src/app/(default)/blog/[slug]/layout.tsx`
- Modify: `src/app/(default)/blog/[slug]/page.client.tsx`
- Delete: `src/lib/blog/posts.ts`
- Delete: `src/constants/blogMetadata.ts`

- [ ] **Step 1: Create registry.ts merging posts.ts + blogMetadata.ts data**

Create `src/lib/blog/registry.ts` that:

1. Defines `BlogPostEntry` interface with all fields from both sources (slug, title, description, date, readTime, category, image, featured, affiliate, keywords, seoTitle)
2. Exports `BLOG_REGISTRY: BlogPostEntry[]` with all 66+ posts
3. Exports `generateBlogMetadata(slug: string): Metadata` helper that builds SEO metadata from registry entries (replaces `BLOG_METADATA` map)
4. Re-exports the `BlogPostEntry` type as `BlogPost` for backward compatibility

The `generateBlogMetadata` function reuses the same logic as the current `blogMeta()` helper in `blogMetadata.ts`:

```tsx
import type { Metadata } from 'next';
import { getPublicSiteUrl } from '@/lib/site';
import type { Reviewer } from '@/constants/reviewers';

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
  seoTitle?: string;
  keywords?: string;
}

// Backward-compatible type alias
export type BlogPost = BlogPostEntry;

export const BLOG_REGISTRY: BlogPostEntry[] = [
  // Merge ALL entries from src/lib/blog/posts.ts here,
  // adding keywords from src/constants/blogMetadata.ts and
  // affiliate: true for posts in AFFILIATE_BLOG_SLUGS.
  // seoTitle only needed when SEO title differs from display title.
];

export function generateBlogMetadata(slug: string): Metadata {
  const entry = BLOG_REGISTRY.find(p => p.slug === slug);
  if (!entry) {
    return {
      title: 'Blog Post | HealthCheck',
      description: 'Health and fitness articles from HealthCheck.',
    };
  }

  const siteUrl = getPublicSiteUrl();
  const seoTitle = entry.seoTitle ?? `${entry.title} | HealthCheck Blog`;
  const image = entry.image;

  return {
    title: seoTitle,
    description: entry.description,
    keywords: entry.keywords,
    openGraph: {
      title: seoTitle,
      description: entry.description,
      type: 'article',
      url: `${siteUrl}/blog/${slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: entry.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: entry.description,
      images: [image],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
  };
}
```

Populate `BLOG_REGISTRY` by merging data from:

- `src/lib/blog/posts.ts` (all 66+ entries with title, description, slug, date, readTime, category, image, featured)
- `src/constants/blogMetadata.ts` (keywords for each slug)
- `src/app/(default)/blog/[slug]/page.client.tsx` lines 399-413 (affiliate slugs → `affiliate: true`)

- [ ] **Step 2: Update blog index page to use registry**

In `src/app/(default)/blog/page.tsx` line 5, change:

```tsx
// Before:
import { BLOG_POSTS } from '@/lib/blog/posts';
// After:
import { BLOG_REGISTRY as BLOG_POSTS } from '@/lib/blog/registry';
```

Same change in `src/app/(localized)/[locale]/blog/page.tsx`.

- [ ] **Step 3: Update blog layout to use generateBlogMetadata**

In `src/app/(default)/blog/[slug]/layout.tsx`:

```tsx
// Before:
import { BLOG_METADATA } from '@/constants/blogMetadata';
// After:
import { generateBlogMetadata, BLOG_REGISTRY } from '@/lib/blog/registry';
```

Update `generateMetadata()`:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateBlogMetadata(slug);
}
```

Update `BlogPostLayout` to read from registry:

```tsx
const entry = BLOG_REGISTRY.find(p => p.slug === slug);
const title =
  entry?.seoTitle ?? (entry ? `${entry.title} | HealthCheck Blog` : 'Blog Post | HealthCheck');
const description = entry?.description ?? 'Health and fitness articles from HealthCheck.';
```

- [ ] **Step 4: Update page.client.tsx to use registry for affiliate flag**

In `src/app/(default)/blog/[slug]/page.client.tsx`:

```tsx
// Add import at top:
import { BLOG_REGISTRY } from '@/lib/blog/registry';

// Remove the AFFILIATE_BLOG_SLUGS set (lines 399-413)

// Change line 491 from:
{
  AFFILIATE_BLOG_SLUGS.has(slug) && <AffiliateDisclosure />;
}
// To:
{
  BLOG_REGISTRY.find(p => p.slug === slug)?.affiliate && <AffiliateDisclosure />;
}
```

Keep the `BLOG_POSTS` component map (manual dynamic imports) as-is.

- [ ] **Step 5: Delete old files**

```bash
git rm src/lib/blog/posts.ts src/constants/blogMetadata.ts
```

- [ ] **Step 6: Run tests and type-check**

```bash
bun run test -- --run && bun run type-check
```

Expected: All tests pass. Fix any import references to deleted files.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: consolidate blog metadata into single registry

Merge posts.ts and blogMetadata.ts into registry.ts. Adding a new blog
post now requires updating 2 files (registry + component map) instead of 4.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 3: LCP Fix — Server-Render h1

### Task 3: Add serverHeader prop to CalculatorPageLayout

**Files:**

- Modify: `src/components/calculators/CalculatorPageLayout.tsx`

- [ ] **Step 1: Add serverHeader prop to CalculatorPageLayoutProps**

Add to the interface (after line 105):

```tsx
/** Server-rendered header (h1 + description). When provided, replaces the client-rendered title/description in normal mode. */
serverHeader?: React.ReactNode;
```

- [ ] **Step 2: Use serverHeader in normal mode rendering**

In `CalculatorPageLayoutContent`, replace lines 265-266:

```tsx
// Before:
<h1 className="text-3xl font-bold mb-2">{title}</h1>
<p className="text-gray-600 mb-6 dark:text-gray-400">{description}</p>

// After:
{serverHeader ?? (
  <>
    <h1 className="text-3xl font-bold mb-2">{title}</h1>
    <p className="text-gray-600 mb-6 dark:text-gray-400">{description}</p>
  </>
)}
```

Add `serverHeader` to the destructured props in `CalculatorPageLayoutContent` (line 153).

Embed mode (lines 242-253) is unchanged — it always uses `title`/`description` props.

- [ ] **Step 3: Run tests**

```bash
bun run test -- --run
```

Expected: All tests pass (no behavior change — serverHeader is optional, defaults to existing rendering).

- [ ] **Step 4: Commit**

```bash
git add src/components/calculators/CalculatorPageLayout.tsx
git commit -m "feat: add serverHeader slot to CalculatorPageLayout for LCP

Optional prop that accepts server-rendered h1+description JSX.
When provided, replaces client-rendered title in normal mode.
Embed mode unchanged. Backward compatible.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Task 4: Thread serverHeader through all page.client.tsx files

**Files:**

- Modify: All ~50 `src/app/(default)/*/page.client.tsx` files that use `import PageClient from './page.client'` pattern

For each `page.client.tsx` that renders `<CalculatorPageLayout title="..." description="...">`:

- [ ] **Step 1: Add serverHeader prop to component**

Each page.client.tsx default export needs to accept an optional `serverHeader` prop and pass it to `CalculatorPageLayout`.

Pattern for most files (e.g. `tdee/page.client.tsx`):

```tsx
// Add to component props (or add a props interface if none exists):
export default function PageClient({ serverHeader }: { serverHeader?: React.ReactNode }) {
  // ... existing code ...
  return (
    <CalculatorPageLayout
      title="TDEE Calculator"
      description="Estimate your maintenance calories in seconds."
      serverHeader={serverHeader}  // ADD THIS LINE
      // ... rest of props unchanged ...
    >
```

For `BMICalculatorClient.tsx` which uses a `copy` prop:

```tsx
interface BMICalculatorClientProps {
  copy: BMIPageCopy;
  serverHeader?: React.ReactNode; // ADD
}
// Then pass serverHeader to CalculatorPageLayout
```

- [ ] **Step 2: Run type-check after each batch of ~10 files**

```bash
bun run type-check
```

- [ ] **Step 3: Commit batched changes**

```bash
git add src/app/\(default\)/*/page.client.tsx src/components/calculators/bmi/BMICalculatorClient.tsx src/components/conversions/MeasurementConversionsClient.tsx
git commit -m "refactor: thread serverHeader prop through all calculator clients

All 52 page.client.tsx files now accept and forward an optional
serverHeader prop to CalculatorPageLayout.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

### Task 5: Add serverHeader JSX to all page.tsx server components

**Files:**

- Modify: All ~50 `src/app/(default)/*/page.tsx` files

- [ ] **Step 1: Update each page.tsx to pass serverHeader**

Pattern for the `PageClient` style (majority of calculators):

```tsx
// src/app/(default)/tdee/page.tsx
import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">TDEE Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Estimate your maintenance calories in seconds.
          </p>
        </>
      }
    />
  );
}
```

For BMI (different pattern):

```tsx
// src/app/(default)/bmi/page.tsx
import BMICalculatorClient from '@/components/calculators/bmi/BMICalculatorClient';
import { defaultLocale } from '@/i18n/config';
import { getBMICopy } from '@/i18n/pages/bmi';
import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function BMICalculatorPage() {
  return (
    <BMICalculatorClient
      copy={getBMICopy(defaultLocale)}
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Find your BMI and healthy weight range.
          </p>
        </>
      }
    />
  );
}
```

Use exact title/description strings from each page.client.tsx's CalculatorPageLayout props (see explorer output for all 52 values).

- [ ] **Step 2: Update create-calculator.ts template**

In `scripts/create-calculator.ts`, update the `pageTemplate` function to include `serverHeader` in the generated page.tsx:

```tsx
function pageTemplate({ title, description, slug, pascal }: TemplateVars): string {
  return `import PageClient from './page.client';

import { metadata as routeMetadata } from './layout';
export const metadata = routeMetadata;

export default function Page() {
  return (
    <PageClient
      serverHeader={
        <>
          <h1 className="text-3xl font-bold mb-2">${title}</h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            ${description}
          </p>
        </>
      }
    />
  );
}
`;
}
```

- [ ] **Step 3: Run full test suite**

```bash
bun run test -- --run && bun run type-check
```

Expected: All tests pass.

- [ ] **Step 4: Build and verify**

```bash
bun run build
```

Expected: Clean build with no errors. Check that h1 appears in server-rendered HTML:

```bash
curl -s http://localhost:3000/bmi | grep -o '<h1[^>]*>[^<]*</h1>'
```

Expected: `<h1 class="text-3xl font-bold mb-2">BMI Calculator</h1>` appears in the initial HTML.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(default\)/*/page.tsx src/app/\(default\)/bmi/page.tsx scripts/create-calculator.ts
git commit -m "perf: server-render h1 on all calculator pages for LCP

Pass serverHeader JSX from server components to client CalculatorPageLayout.
The h1 and description are now in the initial HTML payload, improving
Largest Contentful Paint.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Chunk 4: Final Verification

### Task 6: Run full validation suite

- [ ] **Step 1: Run all checks**

```bash
bun run validate
```

Expected: format, lint, type-check, and all tests pass.

- [ ] **Step 2: Run E2E tests**

```bash
bun run test:e2e
```

Expected: All 84 E2E tests pass, including the 52-calculator smoke test.

- [ ] **Step 3: Lighthouse check**

Build and start production server, then run Lighthouse on a calculator page:

```bash
bun run build && bun run start &
npx lighthouse http://localhost:3000/bmi --output=json --quiet | jq '.categories | to_entries[] | "\(.key): \(.value.score * 100)"'
```

Expected: All 4 categories score 100.

- [ ] **Step 4: Verify h1 is in initial HTML**

```bash
curl -s http://localhost:3000/bmi | grep '<h1'
curl -s http://localhost:3000/tdee | grep '<h1'
curl -s http://localhost:3000/calorie-deficit | grep '<h1'
```

Expected: h1 tags visible in server HTML response (not requiring JS hydration).
