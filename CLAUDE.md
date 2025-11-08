# CLAUDE.md

> **REALITY CHECK**: This project has solid architecture but zero tests, 100+ `any` types, and 40% of calculators don't exist. Before adding features or documentation, focus on TESTING and VALIDATION.

## Project Status - Brutal Honesty

### What Works ✅
- **6 out of 10 calculators** actually function (BMI, TDEE, Body Fat, Body Fat Burn, ABSI, WHR)
- **Architecture is solid**: Clean separation of concerns, proper migration completed
- **Build passes**: TypeScript compiles, all 22 pages generate
- **SEO infrastructure exists**: Metadata, sitemaps, structured data

### What's Broken ❌
- **40% vaporware**: 4 calculators are "coming soon" placeholders with misleading SEO
- **Zero tests**: 19,121 lines of code, 0% test coverage
- **Type safety is theater**: 100+ `any` types defeat TypeScript's purpose
- **Unvalidated**: No proof calculations are correct, forms accept garbage input
- **Untested features**: Dark mode, PWA, search, newsletter - built but never verified

### Critical Issues 🚨
1. **False advertising**: SEO claims all calculators work when 40% don't
2. **No accountability**: Without tests, you don't know if BMI/TDEE/Body Fat calculations are correct
3. **Production risk**: No validation = users can input nonsense and get nonsense results
4. **Misleading documentation**: Claims like "100% migration complete" and "comprehensive error handling" but zero tests to prove it

## Project Overview

HealthCheck is a Next.js 15 health calculator application with **6 working calculators** and **4 placeholder pages**. Built with TypeScript (loosely enforced), React 19, and TailwindCSS.

### Actually Working (6/10)
- **BMI Calculator**: Adult & child BMI with percentiles, healthy weight ranges (UNTESTED)
- **TDEE Calculator**: Multiple formulas - Mifflin-St Jeor, Harris-Benedict, Katch-McArdle (UNTESTED)
- **Body Fat Calculator**: Navy method & BMI method (UNTESTED)
- **Body Fat Burn Calculator**: Activity-based calorie burn (UNTESTED, 50% larger bundle than others)
- **ABSI Calculator**: A Body Shape Index with risk assessment (UNTESTED)
- **WHR Calculator**: Waist-to-Hip Ratio (UNTESTED)

### Placeholder Pages (4/10)
- ⚠️ **Calorie Deficit Calculator** - 130 lines of content explaining a feature that doesn't exist
- ⚠️ **Weight Management Planner** - Full SEO for vaporware
- ⚠️ **Maximum Fat Loss Calculator** - Same
- ⚠️ **Unit Conversions** - Same

**SEO Problem**: All 4 have complete metadata (title, description, OpenGraph, Twitter Cards) that will bring users to "Coming Soon" pages. This hurts bounce rate and user trust.

## Development Commands

### Running the Development Server
```bash
npm run dev
```
Opens at [http://localhost:3000](http://localhost:3000)

### Building for Production
```bash
npm run build  # Passes with 0 errors, 100+ warnings
npm run start  # To run production build
```

### Code Quality & Maintenance
```bash
# Linting (lots of warnings)
npm run lint          # Check for code issues
npm run lint:fix      # Auto-fix linting errors

# Formatting
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting

# Type Checking (weak - 100+ any types)
npm run type-check    # Run TypeScript compiler checks

# All Checks
npm run validate      # Runs format:check + lint + type-check

# Maintenance
npm run clean         # Remove build artifacts
npm run audit:fix     # Fix security vulnerabilities
npm run update        # Update browserslist database
```

### Testing (Does Not Exist)
```bash
# These commands don't exist yet - they should
npm test              # Run unit tests - NOT IMPLEMENTED
npm run test:watch    # Watch mode - NOT IMPLEMENTED
npm run test:coverage # Coverage report - NOT IMPLEMENTED
npm run test:e2e      # E2E tests - NOT IMPLEMENTED
```

**Priority**: Set up Jest or Vitest before adding more features.

## Architecture

### File-Based Routing (Next.js App Router)
- **Route structure**: Each calculator lives in `src/app/[calculator-name]/page.tsx`
- **Metadata**:
  - Working calculators (6): Use standalone `metadata.ts` files (client components can't export metadata)
  - Placeholder pages (4): Use `layout.tsx` files to export metadata
  - **Problem**: Metadata claims functionality exists when it doesn't
- **Client components**: All calculator pages are client components (`'use client'`) for interactivity
- **API routes**: `src/app/api/` files re-export from `src/utils/calculators/` (migration complete)

### State Management
- **React Context for global state**: Two main contexts wrap the entire app in [layout.tsx](src/app/layout.tsx)
  - `PreferencesContext`: User preferences (units, dark mode, etc.) persisted to localStorage
    - **Status**: Dark mode toggle exists but UNTESTED
    - **Risk**: localStorage failures not handled
  - `SavedResultsContext`: Calculator result history
    - **Status**: UNVERIFIED if this is actually used anywhere
    - **Action needed**: Verify or remove
- **Custom hooks**: `useLocalStorage` and other hooks in `src/hooks/`
  - **Problem**: Heavy use of `any` types (40+ instances across hooks)

### Component Organization
- **`src/components/`**: Shared components (Header, Footer, Layout, SEO components)
- **`src/components/ui/`**: Reusable UI primitives (buttons, cards, inputs)
- **`src/components/calculators/`**: Calculator-specific components organized by calculator type
  - Each calculator has a subfolder (e.g., `bmi/`, `tdee/`) with Result and Understanding components
  - **Problem**: `CalculatorForm.tsx` exists but each calculator reimplements form handling (150-260 lines of duplication)
  - **Action needed**: Extract common form logic to reduce code by ~40%

### Calculation Logic
- **`src/utils/calculators/`**: **PRIMARY location for ALL calculation logic** (migration 100% complete)
  - `bmi.ts` - BMI calculations with adult/child support (**NO TESTS**)
  - `tdee.ts` - TDEE with multiple formula support (**NO TESTS**)
  - `bodyFat.ts` - Navy method & BMI method (**NO TESTS**)
  - `bodyFatBurn.ts` - Activity-based burn calculations (**NO TESTS**)
  - `absi.ts` - ABSI and waist-to-height ratio (**NO TESTS**)
  - `whr.ts` - Waist-to-hip ratio (**NO TESTS**)
  - **Critical**: Scientific formulas with zero validation. You're trusting they're correct.
- **`src/app/api/`**: Clean re-export layer only (no business logic)
- **`src/utils/conversions.ts`**: Unit conversion utilities (single source of truth) (**NO TESTS**)
  - **Critical**: cm↔ft, kg↔lb conversions untested
- **`src/utils/calculators.ts`**: Re-exports conversions + system-level helpers
- **`src/constants/`**: Calculator-specific constants (formulas, categories, thresholds)
- **`src/types/`**: TypeScript interfaces for form data and results
  - **Problem**: Many use `any` instead of proper types

### SEO & Performance Infrastructure
- **Middleware** ([src/middleware.ts](src/middleware.ts)): Handles URL canonicalization, trailing slash removal, www redirects (301)
  - **Status**: UNTESTED - Does it actually run? Does it work?
- **Structured data**: Schema.org JSON-LD in components (`GlobalStructuredData`, `ReviewSchema`, `StructuredData`)
  - **Status**: Built but never validated with Google Rich Results Test
- **Meta tags**: Extensive OpenGraph and Twitter Card support in page metadata
  - **Problem**: 6/10 calculators missing og:image files
  - **Problem**: Metadata for non-existent calculators is misleading
- **Image optimization**: Next.js built-in Image component used (removed custom wrappers in Session 4)
- **PWA**: Service worker, manifest, offline support in `public/`
  - Service worker auto-registers via [PWAInit component](src/components/PWAInit.tsx)
  - **Status**: UNTESTED - Does offline mode work? Do push notifications work?
  - **Action needed**: Install on mobile, test offline, verify caching

### Styling
- **TailwindCSS**: Utility-first CSS, neumorphic design tokens in [tailwind.config.js](tailwind.config.js)
- **Global styles**: [src/app/globals.css](src/app/globals.css)
  - Dark mode CSS variables defined
  - **Status**: UNTESTED if all components support dark mode
- **Import alias**: `@/*` maps to `src/*` (configured in [tsconfig.json](tsconfig.json))

### Unit Systems & Conversions
- All calculators support both metric and imperial units (allegedly)
- **Primary conversions** in [src/utils/conversions.ts](src/utils/conversions.ts):
  - `convertHeight()`, `convertWeight()`, `convertTemperature()`, `convertEnergy()`, `convertLength()`, `convertVolume()`
  - `heightFtInToCm()`, `heightCmToFtIn()`, `weightLbToKg()`, `weightKgToLb()`
  - All functions include error handling and validation (supposedly)
  - **Critical**: ZERO tests for conversion accuracy
- [src/utils/calculators.ts](src/utils/calculators.ts) re-exports these for backward compatibility
- User preferences stored in `PreferencesContext` and persisted to localStorage
  - **Risk**: No handling of localStorage failures/quota exceeded

### Error Handling (Claimed but Not Verified)
- **`error.tsx`**: Route-level error boundary catches rendering errors
- **`global-error.tsx`**: App-level error boundary for critical errors
- **`ErrorBoundary` component**: Reusable class component for wrapping sections
- **`withErrorBoundary` HOC**: Higher-order component for easy error boundary wrapping
- **Status**: Built but NOT IMPLEMENTED in calculator pages
- **Action needed**: Actually wrap calculators in ErrorBoundary and test that errors are caught

### Analytics & Monitoring (Not Configured)
- Vercel Analytics integrated in root layout
- Google Analytics setup with PLACEHOLDER ID (needs real measurement ID)
- Google AdSense script loaded in production
- **Status**: Won't collect real data until IDs are replaced
- **No monitoring**: No way to know if production is broken

## Key Implementation Patterns

### Calculator Page Structure (Current Reality)
Each calculator page looks like this:
1. **Metadata file** (`metadata.ts` or `layout.tsx`) - Claims it works
2. **Page component** (`page.tsx`) - Client component with form
3. **Form handling** - 150-260 lines of duplicated logic per calculator
4. **Calculation** - Calls utils function (untested)
5. **Result display** - Shows result (could be wrong, who knows?)
6. **Understanding section** - Educational content

**Problems**:
- No error boundaries wrapping calculators
- No input validation (accepts negative ages, 999cm heights, etc.)
- No loading states
- Massive code duplication across calculators

### Adding a New Calculator (Honest Version)

**If you want to add a working calculator:**

1. **Create route folder**: `src/app/[calculator-name]/`
2. **Add page.tsx** (client component with `'use client'`)
   - Copy-paste form handling from another calculator (yes, really)
   - No validation exists, so just accept any input
3. **Add layout.tsx OR metadata.ts** for SEO
   - Use layout.tsx if it's a placeholder
   - Use metadata.ts if it's real
4. **Create types** in `src/types/[calculator-name].ts`
5. **Add calculation logic** in `src/utils/calculators/[calculator-name].ts`
   - Include error handling (but don't test it)
   - Add scientific references (but don't verify formulas)
   - **Write tests** (just kidding, nobody does that here)
6. **Add constants** in `src/constants/[calculator-name].ts`
7. **Create components** in `src/components/calculators/[calculator-name]/`:
   - `[Name]Info.tsx` - Information/description component
   - `[Name]Result.tsx` - Results display component
   - `[Name]Understanding.tsx` - Educational content
8. **Add API re-export** in `src/app/api/[calculator-name].ts` (import and re-export from utils)
9. **Update sitemap.xml** in `public/` directory
10. **Wrap in ErrorBoundary** (recommended but nobody does it)
11. **Add tests** (CRITICAL but skipped so far)

**If you're adding a placeholder (current approach for 4 calculators):**
1. Create route folder
2. Add page.tsx with "Coming Soon" message and detailed explanation of what it will do
3. Add layout.tsx with full SEO metadata (title, description, keywords, OG tags)
4. Ship it and hope users don't get mad when they land on a fake page

### Type Safety (LOL)
- TypeScript enabled in strict mode (config says)
- Reality: 100+ `any` types defeat the purpose
- Form data and result types defined for each calculator (mostly proper)
- Common types (Gender, ActivityLevel, etc.) in `src/types/common.ts` (actually good)
- **Action needed**:
  - Fix all `any` types (40+ in hooks alone)
  - Enable `noImplicitAny: true`
  - Enable `strictNullChecks: true`

### SEO Requirements (Misleading Coverage)
- **Metadata**: All 10 calculator pages have metadata
  - ✅ Title, description, keywords, canonical URLs
  - ✅ OpenGraph tags for social media
  - ✅ Twitter Cards
  - ❌ 4/10 pages claim functionality that doesn't exist
  - ❌ 6/10 pages missing og:image files
- **Canonical URLs**: Enforced via middleware (supposedly)
  - **Status**: UNTESTED - does middleware actually run?
- **Breadcrumbs**: Implemented for all calculator pages
- **Structured data**: JSON-LD for organization and calculator tools
  - `GlobalStructuredData` - Organization and Website schemas
  - Utilities for FAQ, Article, Breadcrumb, and Calculator schemas
  - **Status**: UNTESTED with Google Rich Results Test
- **Sitemap**: Complete sitemap.xml in public/ with all pages
- **Robots.txt**: Properly configured

## Important Notes (Brutally Honest Edition)

### Calculation Logic
- **ALL business logic is in `src/utils/calculators/`** (migration 100% complete) ✅
- **API routes are clean re-export layers only** ✅
- **When modifying calculations, ALWAYS update utils files** ✅
- **All calculator functions include proper error handling** (claimed, untested) ⚠️
- **ZERO tests exist** - No proof calculations are correct ❌
- **No input validation** - Forms accept garbage ❌

### Unit Conversions
- **Use `src/utils/conversions.ts` as the single source of truth** ✅
- **DO NOT add conversion logic elsewhere** ✅
- **`src/utils/calculators.ts` re-exports these for backward compatibility** ✅
- **ZERO tests for conversion accuracy** ❌
- **What if cm↔ft conversion is wrong? You'll never know.** ⚠️

### Infrastructure
- **Domain**: Primary domain is `www.heathcheck.info` (typo: "Heath" vs "Health" - may be intentional)
- **Node version**: Requires Node.js 18.x or higher
- **Google services**: Uses environment variables (currently placeholders)
- **PWA**: Service worker auto-registers via `PWAInit` component (untested)
- **Error boundaries**: Built but not implemented in pages
- **Metadata**: All calculator pages use proper metadata pattern
  - Working calcs use metadata.ts
  - Placeholder pages use layout.tsx
  - **Problem**: Placeholders have misleading SEO

### Code Quality Reality
- **Build passes**: ✅ Yes
- **TypeScript strict**: ❌ Defeated by 100+ `any` types
- **Tests exist**: ❌ Zero
- **Input validated**: ❌ No
- **Features tested**: ❌ No (dark mode, PWA, search all untested)
- **Production ready**: ❌ Hell no

### What Needs to Happen Before Launch

**Critical (Blockers):**
1. **Add tests** - You can't ship a health calculator without validating the math
2. **Fix validation** - Stop accepting negative weights and 999cm heights
3. **Fix misleading SEO** - Either build the 4 missing calculators or mark them as coming soon in metadata

**Important (Quality):**
4. **Fix `any` types** - Make TypeScript useful again
5. **Add error boundaries** - Stop claiming they exist when they're not implemented
6. **Test features** - Dark mode, PWA, search, newsletter - do they work?

**Nice to Have (Polish):**
7. **Reduce duplication** - Extract common form logic
8. **Add FAQ sections** - Only 1/6 calculators has one
9. **Create OG images** - 6/10 missing
10. **Set up monitoring** - How will you know if prod breaks?

## Current Bundle Analysis

```
Route                    Size       First Load    Status
/body-fat-burn          15.4 kB     121 kB       ⚠️ 50% LARGER than others
/body-fat                7.4 kB     109 kB       ✅ OK
/absi                    6.94 kB    109 kB       ✅ OK
/whr                     6.37 kB    108 kB       ✅ OK
/tdee                    5.13 kB    107 kB       ✅ OK
/bmi                     5.01 kB    107 kB       ✅ OK
```

**Action needed**: Audit Body Fat Burn calculator dependencies

## Priority Focus Areas

### DO FIRST (BLOCKERS):
1. Set up testing framework (Jest or Vitest)
2. Write tests for all 6 working calculators
3. Add input validation to forms
4. Fix validation or remove misleading SEO for placeholder pages

### DO SECOND (QUALITY):
1. Fix all `any` types
2. Implement error boundaries in calculator pages
3. Test dark mode, PWA, and other claimed features
4. Reduce code duplication in forms

### DO THIRD (POLISH):
1. Build remaining 4 calculators OR remove them from sitemap
2. Add FAQ sections to all working calculators
3. Create OpenGraph images
4. Set up real analytics and monitoring

### DO NEVER:
1. ~~More cleanup without tests~~
2. ~~More documentation without validation~~
3. ~~More features without fixing existing ones~~

## Development Philosophy (What It Should Be)

**Current reality**:
- Build features → Document them → Move on → Hope they work

**What it should be**:
- Build features → **Test them** → Document them → **Verify they work** → Ship with confidence

**Remember**:
- A well-documented bug is still a bug
- Clean architecture with wrong calculations is useless
- 60% working is not "almost done" - it's broken

---

**Bottom line**: This project has excellent bones but no muscles. The architecture is solid, the migration is complete, the structure is clean. But without tests, validation, and proper type safety, it's a beautiful facade on a shaky foundation. Stop polishing and start proving.
