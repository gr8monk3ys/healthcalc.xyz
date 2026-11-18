import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorCard from '@/components/CalculatorCard';
import { CALCULATOR_CHAINS } from '@/constants/calculatorChains';
import { CALCULATOR_CATALOG, CALCULATOR_HUBS } from '@/constants/calculatorCatalog';

const CALCULATOR_COUNT = CALCULATOR_CATALOG.length;
const HUB_ROWS = CALCULATOR_HUBS.map(hub => ({
  ...hub,
  count: CALCULATOR_CATALOG.filter(item => item.hub === hub.slug).length,
})).filter(hub => hub.count > 0);

export const metadata: Metadata = {
  title: 'HealthCalc - Free Body Fat, BMI, TDEE Calculators',
  description:
    'Free, accurate calculators for body fat percentage, BMI, TDEE, calorie deficit, and more. Evidence-based tools to help you achieve your health goals.',
  keywords:
    'body fat calculator, BMI calculator, TDEE calculator, calorie deficit calculator, weight loss calculator, fitness calculators, health calculators, waist-to-hip ratio, ABSI calculator',
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'HealthCalc - Free Body Fat, BMI, TDEE Calculators',
    description:
      'Free, accurate calculators for body fat percentage, BMI, TDEE, calorie deficit, and more. Evidence-based tools to help you achieve your health goals.',
    url: './',
    siteName: 'HealthCalc',
    type: 'website',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'HealthCalc' }],
  },
};

const featuredCalculators = [
  {
    title: 'Body Fat Calculator',
    description:
      'Calculate your body fat percentage using the Navy method, skinfold measurements, or BMI estimation.',
    path: '/body-fat',
  },
  {
    title: 'TDEE Calculator',
    description:
      'Find your Total Daily Energy Expenditure using Mifflin-St Jeor, Harris-Benedict, or Katch-McArdle.',
    path: '/tdee',
  },
  {
    title: 'BMI Calculator',
    description:
      'Calculate Body Mass Index for adults and children with age-appropriate percentile charts.',
    path: '/bmi',
  },
  {
    title: 'Calorie Deficit Calculator',
    description:
      'Build a sustainable calorie deficit plan based on your TDEE and weight loss timeline.',
    path: '/calorie-deficit',
  },
  {
    title: 'GLP-1/Ozempic Calculator',
    description:
      'Track GLP-1 medication dosing schedules, titration timelines, and expected outcomes.',
    path: '/glp1-calculator',
    badge: 'New',
  },
  {
    title: 'Army ACFT Calculator',
    description:
      'Score all six events of the Army Combat Fitness Test with age and gender adjustments.',
    path: '/acft-calculator',
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
    title: 'Peer-Reviewed Formulas',
    description:
      'Every calculator uses published equations like Mifflin-St Jeor for BMR, the Navy method for body fat, and WHO references for BMI.',
  },
  {
    title: 'Privacy First',
    description:
      'No account required. No data leaves your browser. Your measurements stay on your device, not on our servers.',
  },
  {
    title: 'Completely Free',
    description:
      'No paywalls, no premium tiers, no “unlock full results” gates. Ads keep the tools free — your numbers never sit behind one.',
  },
  {
    title: 'Open Source Formulas',
    description:
      'The calculation methodology behind every tool is transparent. You can see exactly which formula produced your result.',
  },
];

const sectionTitleClass = 'border-b-[10px] border-ink pb-2 text-3xl font-black md:text-4xl';

const HomeContent = (
  <div className="space-y-16 md:space-y-24">
    <section className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <h1 className="text-[2.5rem] leading-[0.98] sm:text-6xl lg:text-[4.25rem]">
          BMI, body fat, TDEE, and{' '}
          <span className="text-gradient">{CALCULATOR_COUNT - 3} more</span> health calculators
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-7 text-ink-2">
          Free tools for calorie planning, body composition, GLP-1 tracking, Army fitness testing,
          and day-to-day health decisions.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/calculators" className="ui-btn-primary px-6">
            Browse Calculators
          </Link>
          <Link href="/blog" className="ui-btn-soft px-6">
            Read the Guides
          </Link>
        </div>

        <Link
          href="/search"
          className="mt-6 flex min-h-12 max-w-xl items-center gap-3 border border-ink px-4 text-ink-2 hover:bg-paper-2"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-ink"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="square"
          >
            <path d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z" />
          </svg>
          Search calculators, guides, and blog posts…
        </Link>
      </div>

      <nav aria-label="Calculator categories" className="border border-ink p-4 sm:p-5">
        <h2 className="border-b-[10px] border-ink pb-1 text-4xl font-black tracking-[-0.03em]">
          Calculator Facts
        </h2>
        <p className="flex items-baseline justify-between border-b-4 border-ink py-2 font-black">
          <span>{CALCULATOR_COUNT} Calculators</span>
          <span className="text-sm font-bold">{HUB_ROWS.length} categories</span>
        </p>
        <ul>
          {HUB_ROWS.map(hub => (
            <li key={hub.slug} className="border-b border-ink">
              <Link
                href={`/calculators/${hub.slug}`}
                className="flex min-h-11 items-center justify-between gap-4 font-bold hover:bg-mark hover:text-[#0b0b0b]"
              >
                <span>{hub.title}</span>
                <span className="tabular-nums">{hub.count}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="border-t-4 border-ink pt-2 text-sm leading-snug">
          * Evidence-Based Formulas. 100% Free. No Account Required.
        </p>
      </nav>
    </section>

    <section className="perf-defer-section">
      <div className="mb-8">
        <h2 className={sectionTitleClass}>Most Popular Calculators</h2>
        <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-ink-2">
          Quickly jump into the tools users rely on most.
          <Link href="/calculators" className="text-accent">
            View All Categories &rarr;
          </Link>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredCalculators.map(calculator => (
          <div key={calculator.path} className="relative">
            {calculator.badge && (
              <span className="absolute right-0 top-3 bg-mark px-1.5 text-xs font-black uppercase text-[#0b0b0b]">
                {calculator.badge}
              </span>
            )}
            <CalculatorCard
              title={calculator.title}
              description={calculator.description}
              path={calculator.path}
            />
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-ink-2">
        <Link href="/calculators" className="text-accent">
          Browse all {CALCULATOR_COUNT} calculators
        </Link>{' '}
        across {HUB_ROWS.length} categories including body composition, performance, nutrition, and
        pregnancy.
      </p>
    </section>

    <section className="perf-defer-section">
      <h2 className={sectionTitleClass}>Guided Health Workflows</h2>
      <p className="mt-3 max-w-2xl text-ink-2">
        Follow step-by-step workflows that connect multiple calculators. Enter your details once and
        get a complete health picture.
      </p>
      <ul className="mt-6">
        {CALCULATOR_CHAINS.map(chain => (
          <li key={chain.id} className="border-b border-ink first:border-t-4">
            <Link
              href={`/chains?start=${chain.id}`}
              className="group grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,16rem)_1fr_auto] sm:items-baseline"
            >
              <h3 className="text-lg font-extrabold underline-offset-4 group-hover:underline">
                {chain.name}
              </h3>
              <p className="text-sm text-ink-2">{chain.description}</p>
              <p className="text-sm font-bold tabular-nums">
                {chain.steps.length} steps <span aria-hidden="true">{'→'}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>

    <section className="perf-defer-section">
      <h2 className={sectionTitleClass}>Why HealthCalc?</h2>
      <p className="mt-3 max-w-2xl text-ink-2">
        Most health calculator sites hide the answer behind sign-up walls, pop-ups, and upsells.
        Here is what we do differently.
      </p>
      <dl className="mt-6">
        {whyReasons.map(reason => (
          <div
            key={reason.title}
            className="grid gap-x-6 gap-y-1 border-b border-ink py-4 first:border-t-4 sm:grid-cols-[minmax(0,16rem)_1fr]"
          >
            <dt className="text-lg font-extrabold">{reason.title}</dt>
            <dd className="max-w-2xl text-ink-2">{reason.description}</dd>
          </div>
        ))}
      </dl>
    </section>

    <section className="perf-defer-section">
      <h2 className={sectionTitleClass}>Guides &amp; Research</h2>
      <p className="mt-3 text-ink-2">
        Evidence-based explainers to help you understand what the numbers mean.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
        {blogPosts.map(post => (
          <Link
            key={post.href}
            href={post.href}
            className="group flex flex-col border-t-4 border-ink pt-3"
          >
            <h3 className="text-lg font-extrabold underline-offset-4 group-hover:underline">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-ink-2">{post.excerpt}</p>
            <p className="mt-4 text-sm font-bold">
              {post.category} &middot; Read Article <span aria-hidden="true">&rarr;</span>
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/blog" className="ui-btn-soft px-6">
          Explore All Guides and Articles
        </Link>
      </div>
    </section>

    <section className="bg-ink px-6 py-12 text-paper md:px-12 md:py-16">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-black md:text-5xl">Ready to Run Your Numbers?</h2>
        <p className="mt-4 text-lg">
          It takes less than a minute. No sign-up, no data stored, no paywall — just answers.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/bmi"
            className="inline-flex min-h-12 items-center justify-center bg-mark px-7 font-black text-[#0b0b0b] hover:bg-paper hover:text-ink"
          >
            Try the BMI Calculator
          </Link>
          <Link
            href="/calculators"
            className="inline-flex min-h-12 items-center justify-center border border-paper px-7 font-bold hover:bg-paper hover:text-ink"
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
