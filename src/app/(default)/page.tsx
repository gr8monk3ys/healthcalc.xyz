import React from 'react';
import Link from 'next/link';
import CalculatorCard from '@/components/CalculatorCard';
import { CALCULATOR_CHAINS } from '@/constants/calculatorChains';
import { CALCULATOR_CATALOG } from '@/constants/calculatorCatalog';

const CALCULATOR_COUNT = CALCULATOR_CATALOG.length;

export const metadata = {
  title: 'HealthCheck - Free Body Fat, BMI, TDEE Calculators',
  description:
    'Free, accurate calculators for body fat percentage, BMI, TDEE, calorie deficit, and more. Evidence-based tools to help you achieve your health goals.',
  keywords:
    'body fat calculator, BMI calculator, TDEE calculator, calorie deficit calculator, weight loss calculator, fitness calculators, health calculators, waist-to-hip ratio, ABSI calculator',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'HealthCheck - Free Body Fat, BMI, TDEE Calculators',
    description:
      'Free, accurate calculators for body fat percentage, BMI, TDEE, calorie deficit, and more. Evidence-based tools to help you achieve your health goals.',
    url: './',
    siteName: 'HealthCheck',
    type: 'website',
  },
};

// Icons for calculator cards
const icons = {
  bodyFat: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  calorieDeficit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  tdee: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      />
    </svg>
  ),
  bmi: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  glp1: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  ),
  acft: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
};

// "Why HealthCheck?" section icons (inline SVGs)
const whyIcons = {
  peerReviewed: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  ),
  privacy: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  ),
  free: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  transparent: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
};

const featuredCalculators = [
  {
    title: 'Body Fat Calculator',
    description:
      'Calculate your body fat percentage using the Navy method, skinfold measurements, or BMI estimation.',
    path: '/body-fat',
    icon: icons.bodyFat,
    tone: 'rose' as const,
  },
  {
    title: 'TDEE Calculator',
    description:
      'Find your Total Daily Energy Expenditure using Mifflin-St Jeor, Harris-Benedict, or Katch-McArdle.',
    path: '/tdee',
    icon: icons.tdee,
    tone: 'amber' as const,
  },
  {
    title: 'BMI Calculator',
    description:
      'Calculate Body Mass Index for adults and children with age-appropriate percentile charts.',
    path: '/bmi',
    icon: icons.bmi,
    tone: 'sky' as const,
  },
  {
    title: 'Calorie Deficit Calculator',
    description:
      'Build a sustainable calorie deficit plan based on your TDEE and weight loss timeline.',
    path: '/calorie-deficit',
    icon: icons.calorieDeficit,
    tone: 'indigo' as const,
  },
  {
    title: 'GLP-1/Ozempic Calculator',
    description:
      'Track GLP-1 medication dosing schedules, titration timelines, and expected outcomes.',
    path: '/glp1-calculator',
    icon: icons.glp1,
    tone: 'teal' as const,
    badge: 'New',
  },
  {
    title: 'Army ACFT Calculator',
    description:
      'Score all six events of the Army Combat Fitness Test with age and gender adjustments.',
    path: '/acft-calculator',
    icon: icons.acft,
    tone: 'emerald' as const,
    badge: 'New',
  },
];

const blogPosts = [
  {
    href: '/blog/understanding-body-fat-percentage',
    category: 'Body Composition',
    title: 'Understanding Body Fat Percentage: Ranges, Risks, and How to Measure',
    excerpt:
      'What the numbers actually mean for your health, how different ranges affect disease risk, and which measurement methods are worth your time.',
  },
  {
    href: '/blog/tdee-explained',
    category: 'Energy Expenditure',
    title: 'TDEE Explained: How Many Calories Do You Really Need?',
    excerpt:
      'Break down each component of your daily energy expenditure and learn how it shapes your nutrition strategy.',
  },
  {
    href: '/blog/calorie-deficit-myths',
    category: 'Weight Management',
    title: '5 Myths About Calorie Deficits Debunked',
    excerpt:
      'Why weight loss is not always linear, why starvation mode is overstated, and how to set expectations that actually hold up.',
  },
];

const whyReasons = [
  {
    icon: whyIcons.peerReviewed,
    chip: 'bg-gradient-to-br from-indigo-500/18 via-indigo-500/10 to-transparent text-indigo-600 dark:text-indigo-300',
    title: 'Peer-Reviewed Formulas',
    description:
      'Every calculator uses published equations like Mifflin-St Jeor for BMR, the Navy method for body fat, and WHO references for BMI.',
  },
  {
    icon: whyIcons.privacy,
    chip: 'bg-gradient-to-br from-teal-500/18 via-teal-500/10 to-transparent text-teal-600 dark:text-teal-300',
    title: 'Privacy First',
    description:
      'No account required. No data leaves your browser. Your measurements stay on your device, not on our servers.',
  },
  {
    icon: whyIcons.free,
    chip: 'bg-gradient-to-br from-emerald-500/18 via-emerald-500/10 to-transparent text-emerald-600 dark:text-emerald-300',
    title: 'Completely Free',
    description:
      'No paywalls, no premium tiers, no "unlock full results" gates. Ads keep the tools free — your numbers never sit behind one.',
  },
  {
    icon: whyIcons.transparent,
    chip: 'bg-gradient-to-br from-sky-500/18 via-sky-500/10 to-transparent text-sky-600 dark:text-sky-300',
    title: 'Open Source Formulas',
    description:
      'The calculation methodology behind every tool is transparent. You can see exactly which formula produced your result.',
  },
];

const HomeContent = (
  <div className="space-y-14 md:space-y-20">
    {/* Hero Section */}
    <section className="hero-panel relative overflow-hidden rounded-[2rem] px-5 py-10 sm:px-6 sm:py-12 md:px-12 md:py-14">
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="section-eyebrow">HealthCheck Platform</p>
          <h1 className="mt-4 text-[2.15rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-white sm:text-4xl md:text-[3.4rem]">
            BMI, body fat, TDEE, and <span className="text-gradient">50+ more</span> health
            calculators
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-200 sm:text-lg">
            Free tools for calorie planning, body composition, GLP-1 tracking, Army fitness testing,
            and day-to-day health decisions.
          </p>

          {/* Trust Stats */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              {CALCULATOR_COUNT} Calculators
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Evidence-Based Formulas
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              100% Free
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              No Account Required
            </span>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/calculators"
              className="rounded-full bg-accent px-6 py-3 text-center font-semibold text-white shadow-xl shadow-accent/30 transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
            >
              Browse calculators
            </Link>
            <Link
              href="/blog"
              className="elevated-pill rounded-full px-6 py-3 text-center font-semibold text-accent transition-all hover:-translate-y-0.5 hover:border-accent/45"
            >
              Read the guides
            </Link>
          </div>

          {/* Search Bar */}
          <Link
            href="/search"
            className="hero-search-shell mt-6 block rounded-2xl p-3 transition-all hover:-translate-y-0.5 hover:border-accent/40"
          >
            <div className="flex items-center gap-3 rounded-xl border border-white/50 bg-white/35 px-4 py-3 dark:border-indigo-200/10 dark:bg-indigo-100/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z"
                />
              </svg>
              <span className="text-sm text-slate-500 dark:text-slate-300 sm:text-base">
                Search calculators, guides, and blog posts...
              </span>
            </div>
          </Link>
        </div>

        {/* Decorative results preview */}
        <div aria-hidden="true" className="relative hidden min-h-[26rem] select-none lg:block">
          <div className="hero-metric-card animate-float-slow absolute left-2 top-4 w-64 rotate-[-2deg] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Your BMI
            </p>
            <div className="mt-3 flex items-center gap-4">
              <svg viewBox="0 0 96 96" className="h-24 w-24 -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  strokeWidth="9"
                  className="stroke-[var(--surface-muted)]"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray="251"
                  strokeDashoffset="88"
                  stroke="url(#hero-gauge-gradient)"
                />
                <defs>
                  <linearGradient id="hero-gauge-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--accent-alt-light)" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <p className="text-3xl font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-white">
                  22.4
                </p>
                <span className="mt-1 inline-flex rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-300">
                  Healthy range
                </span>
              </div>
            </div>
          </div>

          <div className="hero-metric-card animate-float-slower absolute right-0 top-36 w-60 rotate-[2.5deg] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              TDEE
            </p>
            <p className="mt-2 text-3xl font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-white">
              2,340
              <span className="ml-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">
                kcal/day
              </span>
            </p>
            <div className="mt-3 flex h-12 items-end gap-1.5">
              <div className="w-full rounded-t-md bg-accent/25" style={{ height: '40%' }} />
              <div className="w-full rounded-t-md bg-accent/35" style={{ height: '62%' }} />
              <div className="w-full rounded-t-md bg-accent/50" style={{ height: '48%' }} />
              <div className="w-full rounded-t-md bg-accent" style={{ height: '86%' }} />
              <div className="w-full rounded-t-md bg-accent/45" style={{ height: '58%' }} />
              <div className="w-full rounded-t-md bg-accent/30" style={{ height: '70%' }} />
            </div>
          </div>

          <div className="hero-metric-card animate-float-slow absolute bottom-2 left-10 w-56 rotate-[1.5deg] p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Resting HR
              </p>
              <p className="text-lg font-extrabold tabular-nums text-slate-900 dark:text-white">
                62{' '}
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  bpm
                </span>
              </p>
            </div>
            <svg viewBox="0 0 200 48" className="hero-sparkline mt-3 h-12 w-full">
              <path
                d="M0 30 L28 30 L36 12 L46 42 L56 6 L66 34 L74 30 L112 30 L120 16 L130 40 L140 10 L150 33 L158 30 L200 30"
                fill="none"
                stroke="var(--accent-alt)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>

    {/* Featured Calculators Section */}
    <section className="perf-defer-section">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="section-eyebrow">Start here</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Most popular calculators
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Quickly jump into the tools users rely on most.
          </p>
        </div>
        <Link
          href="/calculators"
          className="hidden shrink-0 text-sm font-semibold text-accent hover:underline sm:block"
        >
          View all categories &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredCalculators.map(calculator => (
          <div key={calculator.path} className="relative">
            {calculator.badge && (
              <span className="absolute -right-1.5 -top-1.5 z-10 rounded-full bg-gradient-to-r from-accent to-accent-alt px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-white shadow-md shadow-accent/30">
                {calculator.badge}
              </span>
            )}
            <CalculatorCard
              title={calculator.title}
              description={calculator.description}
              path={calculator.path}
              icon={calculator.icon}
              tone={calculator.tone}
            />
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <Link href="/calculators" className="font-medium text-accent hover:underline">
          Browse all {CALCULATOR_COUNT} calculators
        </Link>{' '}
        across 10 categories including body composition, performance, nutrition, and pregnancy.
      </p>
    </section>

    {/* Guided Workflows */}
    <section className="perf-defer-section my-16">
      <div className="mb-8 text-center">
        <p className="section-eyebrow justify-center">Connected tools</p>
        <h2 className="mb-2 mt-2 text-3xl font-bold tracking-tight">Guided Health Workflows</h2>
        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
          Follow step-by-step workflows that connect multiple calculators. Enter your details once
          and get a complete health picture.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {CALCULATOR_CHAINS.map(chain => (
          <Link
            key={chain.id}
            href={`/chains?start=${chain.id}`}
            className="glass-panel-strong card-interactive group block rounded-2xl p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold tracking-tight">{chain.name}</h3>
              <span aria-hidden="true" className="flex gap-1 pt-2">
                {chain.steps.map((step, index) => (
                  <span
                    key={step.slug ?? index}
                    className="h-1.5 w-4 rounded-full bg-accent/25 transition-colors group-hover:bg-accent/60"
                  />
                ))}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">{chain.description}</p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent">
                {chain.steps.length} steps
              </span>
              <span className="font-semibold text-accent">
                Get started{' '}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  {'\u2192'}
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/* Why HealthCheck? Section */}
    <section className="perf-defer-section">
      <div className="mb-8 text-center">
        <p className="section-eyebrow justify-center">Our promise</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Why HealthCheck?
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
          Most health calculator sites hide the answer behind sign-up walls, pop-ups, and upsells.
          Here is what we do differently.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyReasons.map(reason => (
          <div key={reason.title} className="glass-panel-strong rounded-2xl p-6 text-center">
            <div
              className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${reason.chip}`}
            >
              {reason.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{reason.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* Guides & Research Section */}
    <section className="perf-defer-section glass-panel rounded-3xl p-8">
      <div className="mb-6 text-center">
        <p className="section-eyebrow justify-center">Go deeper</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Guides &amp; Research
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Evidence-based explainers to help you understand what the numbers mean.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {blogPosts.map(post => (
          <Link
            key={post.href}
            href={post.href}
            className="group rounded-2xl border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(229,233,255,0.7))] p-5 transition-all hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_14px_30px_rgba(66,72,182,0.22)] dark:border-indigo-200/10 dark:bg-[linear-gradient(180deg,rgba(28,32,69,0.82),rgba(17,20,49,0.74))]"
          >
            <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {post.category}
            </span>
            <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
            <p className="mt-4 text-sm font-semibold text-accent">
              Read article{' '}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="elevated-pill inline-flex rounded-full px-6 py-3 font-semibold text-accent transition-all hover:-translate-y-0.5 hover:border-accent/40"
        >
          Explore all guides and articles
        </Link>
      </div>
    </section>

    {/* Final CTA */}
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-accent via-accent-dark to-indigo-900 px-6 py-12 text-center text-white shadow-xl shadow-accent/25 md:px-12 md:py-16 dark:from-accent-dark dark:via-indigo-800 dark:to-indigo-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_-10%,rgba(45,212,191,0.25),transparent),radial-gradient(ellipse_40%_50%_at_10%_110%,rgba(255,255,255,0.12),transparent)]"
      />
      <div className="relative mx-auto max-w-2xl">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Ready to run your numbers?
        </h2>
        <p className="mt-3 text-base text-indigo-100 md:text-lg">
          It takes less than a minute. No sign-up, no data stored, no paywall — just answers.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/bmi"
            className="rounded-full bg-white px-7 py-3 font-bold text-accent-dark shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Try the BMI calculator
          </Link>
          <Link
            href="/calculators"
            className="rounded-full border border-white/40 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20"
          >
            See all calculators
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default function Home() {
  return HomeContent;
}
