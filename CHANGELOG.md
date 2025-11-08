# Changelog

All notable changes to the HealthCheck project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

### Improved
- PWA functionality now works out of the box without manual configuration
- Better user experience with automatic service worker updates

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
