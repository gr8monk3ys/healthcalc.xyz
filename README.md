# HealthCheck

HealthCheck is a comprehensive health and fitness calculator web application built with Next.js, TypeScript, and TailwindCSS. It features a modern neumorphic design and provides a variety of calculators to help users track and understand their health metrics.

![HealthCheck Screenshot](public/images/dashboard.png)

## Features

- **Multiple Health Calculators:**
  - BMI Calculator (for adults and children)
  - Body Fat Calculator
  - Body Fat Burn Calculator
  - TDEE (Total Daily Energy Expenditure) Calculator
  - Calorie Deficit Calculator
  - Weight Management Planner
  - Maximum Fat Loss Calculator
  - ABSI (A Body Shape Index) Calculator
  - Waist-to-Hip Ratio (WHR) Calculator
  - Measurement Conversions

- **Modern UI/UX:**
  - Neumorphic design elements
  - Responsive layout for all devices
  - Interactive components with real-time calculations
  - Smooth animations and transitions

- **Technical Features:**
  - Server-side rendering with Next.js
  - Type-safe code with TypeScript
  - Responsive styling with TailwindCSS
  - Progressive Web App (PWA) capabilities
  - SEO optimized with metadata
  - Accessibility focused

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) - React framework for server-side rendering
  - [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
  - [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [React](https://reactjs.org/) - UI library

- **Development Tools:**
  - [ESLint](https://eslint.org/) - Code linting
  - [Prettier](https://prettier.io/) - Code formatting

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Vercel Preview Domains (Important)

Vercel preview deployments only issue TLS certificates for the base preview host. Do **not** use a
`www.` subdomain on preview URLs or you will see `ERR_CERT_COMMON_NAME_INVALID`. Use the base URL
Vercel provides (for example, `https://your-project.vercel.app`) instead.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gr8monk3ys/healthcalc.xyz.git
   cd healthcalc.xyz
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## Available Scripts

In addition to the standard Next.js scripts, this project includes several helpful commands:

### Development

- `npm run dev` - Start development server on [http://localhost:3000](http://localhost:3000)
- `npm run build` - Build production-ready application
- `npm run start` - Start production server

### Code Quality

- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Automatically fix ESLint errors where possible
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted
- `npm run type-check` - Run TypeScript compiler to check for type errors
- `npm run validate` - Run all checks (format, lint, type-check) - **recommended before commits**
- `npm run smoke` - Run public route smoke checks for a target host (`SMOKE_BASE_URL`)
- `npm run readiness` - Verify `/api/health` readiness checks (`READINESS_BASE_URL`, defaults to `http://127.0.0.1:3000`)

### Maintenance

- `npm run clean` - Remove build artifacts (.next, out, cache)
- `npm run audit:fix` - Automatically fix security vulnerabilities
- `npm run update` - Update caniuse-lite and browserslist databases
- `npm run migrate:submissions` - Apply submission storage schema migrations (SQLite/Postgres)

### Submission Persistence

- Use `SUBMISSIONS_DB_DRIVER=postgres` in production with `SUBMISSIONS_POSTGRES_URL` (or `DATABASE_URL`) for durable managed storage.
- Use `SUBMISSIONS_DB_DRIVER=sqlite` for local/dev persistence.
- Optional controls:
  - `SUBMISSIONS_PERSISTENCE_STRICT=true` to fail API responses when persistence fails.
  - `SUBMISSIONS_RETENTION_DAYS=365` for automatic retention cleanup.

### Email Providers (Resend)

- Newsletter with Resend requires `RESEND_API_KEY` and `RESEND_AUDIENCE_ID`.
- Contact form with Resend requires `RESEND_API_KEY`.
- Optional:
  - `RESEND_FROM_EMAIL` to override the default sender for contact emails.
  - `CONTACT_EMAIL` to set recipient inbox for contact messages.

### Authentication (Clerk)

- Clerk is enabled only when both `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set.
- In production (`NODE_ENV=production`), test keys (`pk_test_*`, `sk_test_*`) are automatically rejected.
- If Clerk is misconfigured in production, sign-in/up routes show a safe unavailable state instead of loading with invalid keys.

### Affiliate Link Hardening

- `prebuild` runs `scripts/check-affiliate-links.js` to warn when placeholder partner links remain.
- Set `AFFILIATE_LINKS_STRICT=true` in CI if you want builds to fail when unresolved partner-link placeholders are detected.

### Recommended Workflow

Before committing changes:

```bash
npm run validate  # Ensures code passes all checks
```

## Project Structure

```
healthcheck/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── api/         # API routes and calculation functions
│   │   ├── bmi/         # BMI calculator page
│   │   ├── body-fat/    # Body fat calculator page
│   │   └── ...          # Other calculator pages
│   ├── components/      # Reusable React components
│   │   ├── ui/          # UI components (buttons, cards, etc.)
│   │   └── ...          # Other components
│   ├── constants/       # Constants and configuration
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── .eslintrc.json       # ESLint configuration
├── .gitignore           # Git ignore file
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Calculator Descriptions

### BMI Calculator

Calculate your Body Mass Index (BMI) and find your healthy weight range based on your height. Includes special calculations for children and teens using age and gender-specific percentiles.

### Body Fat Calculator

Estimate your body fat percentage using various methods including Navy method, skinfold measurements, and more.

### Body Fat Burn Calculator

Calculate how much body fat you can burn through various physical activities based on your personal metrics, activity type, duration, and frequency.

### TDEE Calculator

Calculate your Total Daily Energy Expenditure (TDEE) to determine your daily calorie needs based on your activity level.

### Calorie Deficit Calculator

Discover how long it will take to reach your goal weight with different calorie deficit levels.

### Weight Management Planner

Plan your weight loss or gain journey with a target date and get daily calorie recommendations.

### Maximum Fat Loss Calculator

Find the optimal calorie intake that maximizes fat loss while minimizing muscle loss.

### ABSI Calculator

Calculate your A Body Shape Index (ABSI) to assess health risks related to body shape and waist circumference.

### Waist-to-Hip Ratio Calculator

Determine your waist-to-hip ratio to assess health risks associated with abdominal fat.

### Measurement Conversions

Convert between different units of measurement for weight, height, volume, and more.

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Neumorphism UI Design](https://neumorphism.io/)
- Health calculation formulas from various scientific sources (referenced in the code)
