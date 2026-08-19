# Changelog

All notable changes to the HealthCheck project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 (2026-08-19)


### Features

* **app:** add calculator pages, blog routes, and API handlers ([5e1af50](https://github.com/gr8monk3ys/healthcalc.xyz/commit/5e1af5067ed8136cc9222eb47c8ab510d04eab33))
* **calculators:** define calculator catalog, types, and constants ([a2e61d1](https://github.com/gr8monk3ys/healthcalc.xyz/commit/a2e61d1818606ce98faefaf100b1a21eec733297))
* **calculators:** implement BMI, body fat, and TDEE calculation logic ([1bea96e](https://github.com/gr8monk3ys/healthcalc.xyz/commit/1bea96e855b414cf62a07e3405f0f4ad1b982604))
* **data:** add Supabase auth, dual-backend persistence, and blog registry ([45c5e8d](https://github.com/gr8monk3ys/healthcalc.xyz/commit/45c5e8d660cbef484a1d14e9b0c1b1a0676bfe28))
* **db:** add Postgres and SQLite migrations for submissions and saved results ([82af4f8](https://github.com/gr8monk3ys/healthcalc.xyz/commit/82af4f83db14b65b320deac00fcbd0eba17dc700))
* **i18n:** add locale routing, message catalog, and request proxy ([2efbaa6](https://github.com/gr8monk3ys/healthcalc.xyz/commit/2efbaa6f8cc4d00e8490d27cded9291c038782f3))
* **observability:** wire up Sentry instrumentation and error reporting ([c464d1e](https://github.com/gr8monk3ys/healthcalc.xyz/commit/c464d1eb2b322e656ad74ac2c6f1a5f3b5991121))
* **state:** add calculator form hooks and preferences context ([f2a4ebe](https://github.com/gr8monk3ys/healthcalc.xyz/commit/f2a4ebe5e5e24f8f275a131a4f606af0f051a4a0))
* **ui:** build calculator forms, result displays, and UI primitives ([95210f7](https://github.com/gr8monk3ys/healthcalc.xyz/commit/95210f73cd3d4b8e9f4e05f04a0be7921caad50c))
* **ui:** design system overhaul with dark mode fix and article typography ([#60](https://github.com/gr8monk3ys/healthcalc.xyz/issues/60)) ([eec8633](https://github.com/gr8monk3ys/healthcalc.xyz/commit/eec863367129af6830c0a65d3c1e293394e420bc))

## [Unreleased]

### Added

- PWA initialization component (`PWAInit.tsx`) for automatic service worker registration
- Service worker now automatically registers in production environments
- Update notifications for new app versions with user prompt to refresh
- Comprehensive error boundary system for better error handling:
  - `error.tsx` - Route-level error boundary for catching rendering errors
  - `global-error.tsx` - App-level error boundary for critical errors
  - `ErrorBoundary` component - Reusable error boundary for wrapping sections
  - `withErrorBoundary` HOC - Higher-order component for easy error boundary wrapping
  - User-friendly error messages with retry functionality
  - Development mode shows detailed error information for debugging
- Complete SEO metadata for all 10 calculator pages (100% coverage):
  - Created layout.tsx files for: Calorie Deficit, Weight Management, Maximum Fat Loss, Conversions
  - All pages now have: title, description, keywords, canonical URLs, OpenGraph tags, Twitter Cards
  - Improves search engine discoverability and social media sharing
  - Coming soon pages optimized for SEO while in development
- Scientific references and documentation for all calculator formulas:
  - BMI calculator: WHO, CDC, historical references
  - TDEE calculator: Mifflin-St Jeor (1990), Harris-Benedict (1984), Katch-McArdle citations
  - Body Fat calculator: U.S. Navy method (1984), BMI method references
  - All formulas now include proper scientific attribution and category documentation

### Changed

- README.md now includes comprehensive "Available Scripts" documentation
- Improved developer experience with clearly documented npm commands
- Layout.tsx updated to include PWAInit component for seamless PWA functionality
- Repository automation now uses Bun-first docs and repo-wide Prettier checks
- Dependabot now ignores ESLint semver-major bumps until the lint stack is compatible

### Improved

- PWA functionality now works out of the box without manual configuration
- Better user experience with automatic service worker updates
- Cookie consent now loads advertising scripts only after explicit consent
- Homepage hero and cookie banner spacing are more readable on small screens

### Fixed

- Resolved failing organization workflows caused by outdated `actions/checkout` pins
- Updated `actions/upload-artifact` pin in CI to match the latest safe Dependabot target
- Fixed the OSV workflow to use the valid `google/osv-scanner-action`
- Prevented duplicate CodeQL uploads by converting the extra org workflow into a no-op status job
- Fixed offline cached-page filtering logic in `public/offline.html`
- Replaced author bio `<img>` elements with `next/image` to satisfy lint rules

### Refactored

- Consolidated duplicate utility functions between `calculators.ts` and `conversions.ts`
  - Eliminated 7 duplicate functions (formatNumber, height/weight converters)
  - `calculators.ts` now re-exports from `conversions.ts` for better code organization
  - Maintained backward compatibility for all existing imports
  - `conversions.ts` is now the single source of truth for unit conversions (better error handling)

## [1.0.0] - 2024-10-29

### Added

- Initial release of HealthCheck calculator platform
- 10 health and fitness calculators:
  - BMI Calculator (with child percentile support)
  - Body Fat Calculator (Navy method, BMI method)
  - Body Fat Burn Calculator (activity-based)
  - TDEE Calculator
  - Calorie Deficit Calculator
  - Weight Management Planner
  - Maximum Fat Loss Calculator
  - ABSI Calculator (A Body Shape Index)
  - WHR Calculator (Waist-to-Hip Ratio)
  - Measurement Conversions
- Blog section with 6 health articles
- PWA support with offline functionality
- Service worker for improved performance
- Comprehensive SEO optimization
- Responsive neumorphic design
- Dark mode support (via preferences)
- User preferences system with localStorage persistence
- Result saving and history
- Multiple unit system support (metric/imperial)
- Social sharing capabilities
- Structured data (JSON-LD) for SEO
- OpenGraph and Twitter Card metadata
- Google Analytics integration (configurable)
- Google AdSense integration

### Developer Experience

- Comprehensive documentation:
  - [CLAUDE.md](CLAUDE.md) - Architecture guide
  - [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
  - [MIGRATION_STATUS.md](MIGRATION_STATUS.md) - Code migration tracking
  - [TODO.md](TODO.md) - Task management
- Full TypeScript support with strict mode
- ESLint and Prettier configuration
- Next.js 15 with App Router
- Clean code architecture:
  - Calculation logic in `src/utils/calculators/`
  - API routes as re-export layers
  - Proper separation of concerns
- 498 lines of calculation logic properly organized
- Complete migration of all calculators to utils (100%)
- Security:
  - All npm audit vulnerabilities resolved
  - Environment-based configuration
  - Secure headers configured
- Development scripts:
  - `npm run dev` - Development server
  - `npm run build` - Production build
  - `npm run lint` - Linting
  - `npm run lint:fix` - Auto-fix linting issues
  - `npm run format` - Format code
  - `npm run format:check` - Check formatting
  - `npm run type-check` - TypeScript type checking
  - `npm run validate` - Run all checks
  - `npm run clean` - Clean build artifacts
  - `npm run audit:fix` - Fix security vulnerabilities
  - `npm run update` - Update dependencies

### Technical Stack

- Next.js 15.2.0
- React 19.0.0
- TypeScript 5.8.2
- TailwindCSS 3.3.0
- Vercel Analytics
- Radix UI components

### Performance

- Optimized images (AVIF/WebP support)
- Code splitting and lazy loading
- Service worker caching
- Static site generation for all pages
- Middleware for URL canonicalization

### Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Screen reader compatible
- Responsive design for all devices

### SEO

- Sitemap.xml with image annotations
- Robots.txt configuration
- Canonical URLs
- Structured data (JSON-LD)
- OpenGraph tags
- Twitter Card tags
- Meta descriptions and keywords for all pages

## [0.1.0] - Development

### Initial Development

- Project scaffolding
- Basic calculator implementations
- UI component development
- Initial styling and theming

---

## Version History

- **1.0.0** - October 2024 - Initial production release
- **0.1.0** - Development phase

## Migration Notes

### Code Organization (October 2024)

All calculator logic has been migrated from `src/app/api/` to `src/utils/calculators/`:

- BMI Calculator ✅
- TDEE Calculator ✅
- Body Fat Burn Calculator ✅
- WHR Calculator ✅
- ABSI Calculator ✅
- Body Fat Calculator ✅

API routes now serve as clean re-export layers, improving testability and code organization.

See [MIGRATION_STATUS.md](MIGRATION_STATUS.md) for detailed migration information.
