import React from 'react';
import Link from 'next/link';
import CalculatorCard from '@/components/CalculatorCard';
import { CALCULATOR_CHAINS } from '@/constants/calculatorChains';

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
  },
  {
    title: 'TDEE Calculator',
    description:
      'Find your Total Daily Energy Expenditure using Mifflin-St Jeor, Harris-Benedict, or Katch-McArdle.',
    path: '/tdee',
    icon: icons.tdee,
  },
  {
    title: 'BMI Calculator',
    description:
      'Calculate Body Mass Index for adults and children with age-appropriate percentile charts.',
    path: '/bmi',
    icon: icons.bmi,
  },
  {
    title: 'Calorie Deficit Calculator',
    description:
      'Build a sustainable calorie deficit plan based on your TDEE and weight loss timeline.',
    path: '/calorie-deficit',
    icon: icons.calorieDeficit,
  },
  {
    title: 'GLP-1/Ozempic Calculator',
    description:
      'Track GLP-1 medication dosing schedules, titration timelines, and expected outcomes.',
    path: '/glp1-calculator',
    icon: icons.glp1,
    badge: 'New',
  },
  {
    title: 'Army ACFT Calculator',
    description:
      'Score all six events of the Army Combat Fitness Test with age and gender adjustments.',
    path: '/acft-calculator',
    icon: icons.acft,
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
    title: 'Peer-Reviewed Formulas',
    description:
      'Every calculator uses published equations like Mifflin-St Jeor for BMR, the Navy method for body fat, and WHO references for BMI.',
  },
  {
    icon: whyIcons.privacy,
    title: 'Privacy First',
    description:
      'No account required. No data leaves your browser. Your measurements stay on your device, not on our servers.',
  },
  {
    icon: whyIcons.free,
    title: 'Completely Free',
    description:
      'No paywalls, no premium tiers, no "unlock full results" gates. Every calculator and every feature is free.',
  },
  {
    icon: whyIcons.transparent,
    title: 'Open Source Formulas',
    description:
      'The calculation methodology behind every tool is transparent. You can see exactly which formula produced your result.',
  },
];

const HomeContent = (
  <div className="space-y-14 md:space-y-20">
    {/* Hero Section */}
    <section className="glass-panel-strong relative overflow-hidden rounded-[2rem] px-6 py-14 md:px-12">
      <div className="relative mx-auto max-w-6xl">
        <p className="animate-fade-in text-sm font-semibold uppercase tracking-[0.24em] text-accent/90">
          HealthCheck Platform
        </p>
        <h1 className="mt-4 animate-slide-up text-4xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-6xl">
          54+ free health calculators, from body composition to GLP-1 dosing
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-slate-700 dark:text-slate-200">
          Tools you will not find on generic health sites. Track Ozempic titration schedules, score
          the Army ACFT, estimate body recomposition timelines, dial in keto macros, and calculate
          caffeine half-life -- all backed by published clinical formulas.
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
            54+ Calculators
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
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/calculators"
            className="rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-xl shadow-accent/30 transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
          >
            Browse calculators
          </Link>
          <Link
            href="/blog"
            className="elevated-pill rounded-full px-6 py-3 font-semibold text-accent transition-all hover:-translate-y-0.5 hover:border-accent/45"
          >
            Read the guides
          </Link>
        </div>

        {/* Search Bar */}
        <Link
          href="/search"
          className="glass-panel mt-6 block rounded-2xl p-3 transition-all hover:-translate-y-0.5 hover:border-accent/40"
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
            <span className="text-slate-500 dark:text-slate-300">
              Search calculators, guides, and blog posts...
            </span>
          </div>
        </Link>
      </div>
    </section>

    {/* Featured Calculators Section */}
    <section>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Most popular calculators
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Quickly jump into the tools users rely on most.
          </p>
        </div>
        <Link href="/calculators" className="text-sm font-semibold text-accent hover:underline">
          View all categories &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredCalculators.map(calculator => (
          <div key={calculator.path} className="relative">
            {calculator.badge && (
              <span className="absolute -right-2 -top-2 z-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-indigo-500/30">
                {calculator.badge}
              </span>
            )}
            <CalculatorCard
              title={calculator.title}
              description={calculator.description}
              path={calculator.path}
              icon={calculator.icon}
            />
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <Link href="/calculators" className="font-medium text-accent hover:underline">
          Browse all 54+ calculators
        </Link>{' '}
        across 10 categories including body composition, performance, nutrition, and pregnancy.
      </p>
    </section>

    {/* Guided Workflows */}
    <section className="my-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Guided Health Workflows</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Follow step-by-step workflows that connect multiple calculators. Enter your details once
          and get a complete health picture.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CALCULATOR_CHAINS.map(chain => (
          <Link
            key={chain.id}
            href={`/chains?start=${chain.id}`}
            className="glass-panel rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg block"
          >
            <h3 className="font-semibold text-lg">{chain.name}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{chain.description}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-white">
                {chain.steps.length} steps
              </span>
              <span className="text-xs text-[var(--accent)] font-medium">
                Get started {'\u2192'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/* Why HealthCheck? Section */}
    <section>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why HealthCheck?</h2>
        <p className="mx-auto mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
          Most health calculator sites recycle the same BMI tool with ads plastered everywhere. Here
          is what we do differently.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyReasons.map(reason => (
          <div key={reason.title} className="glass-panel-strong rounded-2xl p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 via-accent/10 to-transparent text-accent">
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
    <section className="glass-panel rounded-3xl p-8">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Guides &amp; Research</h2>
        <p className="text-slate-600 dark:text-slate-300">
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
            <p className="mt-4 text-sm font-semibold text-accent">Read article &rarr;</p>
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
  </div>
);

export default function Home() {
  return HomeContent;
}
