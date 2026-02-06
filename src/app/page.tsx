import React from 'react';
import Link from 'next/link';
import CalculatorCard from '@/components/CalculatorCard';
import Search from '@/components/Search';

export const metadata = {
  title: 'HeathCheck - Free Body Fat, BMI, TDEE Calculators',
  description:
    'Free, accurate calculators for body fat percentage, BMI, TDEE, calorie deficit, and more. Evidence-based tools to help you achieve your health goals.',
  keywords:
    'body fat calculator, BMI calculator, TDEE calculator, calorie deficit calculator, weight loss calculator, fitness calculators, health calculators, waist-to-hip ratio, ABSI calculator',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HeathCheck - Free Body Fat, BMI, TDEE Calculators',
    description:
      'Free, accurate calculators for body fat percentage, BMI, TDEE, calorie deficit, and more. Evidence-based tools to help you achieve your health goals.',
    url: 'https://www.heathcheck.info/',
    siteName: 'HealthCheck',
    locale: 'en_US',
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
  weightManagement: (
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
  maxFatLoss: (
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
        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
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
  absi: (
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
  calorieBurn: (
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
        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
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
  whr: (
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
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  conversions: (
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
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    </svg>
  ),
  heartRateZones: (
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
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  idealWeight: (
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
        d="M9 12h6m-8 8h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  waterIntake: (
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
        d="M12 3l4 7a5 5 0 11-8 0l4-7z"
      />
    </svg>
  ),
  sleep: (
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
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      />
    </svg>
  ),
  bloodPressure: (
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
        d="M4 12h3l2 4 4-8 2 4h3"
      />
    </svg>
  ),
  bmr: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m-7-7h14" />
    </svg>
  ),
  vo2Max: (
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
        d="M4 12h4l2-4 4 8 2-4h4"
      />
    </svg>
  ),
  runningPace: (
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
        d="M5 12h4l2-4 4 8 2-4h4"
      />
    </svg>
  ),
  pregnancyDueDate: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
    </svg>
  ),
  ovulation: (
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
        d="M12 4c3.866 0 7 3.582 7 8s-3.134 8-7 8-7-3.582-7-8 3.134-8 7-8z"
      />
    </svg>
  ),
};

export default function Home() {
  const featuredCalculators = [
    {
      title: 'Body Fat Calculator',
      description:
        'Calculate your body fat percentage using various methods including Navy, skinfold, and BMI.',
      path: '/body-fat',
      icon: icons.bodyFat,
    },
    {
      title: 'Calorie Deficit Calculator',
      description: 'Estimate your daily calorie target for sustainable fat loss.',
      path: '/calorie-deficit',
      icon: icons.calorieDeficit,
    },
    {
      title: 'TDEE Calculator',
      description: 'Calculate your Total Daily Energy Expenditure to maintain your current weight.',
      path: '/tdee',
      icon: icons.tdee,
    },
    {
      title: 'BMI Calculator',
      description:
        'Calculate Body Mass Index for adults and children with age-appropriate insights.',
      path: '/bmi',
      icon: icons.bmi,
    },
    {
      title: 'Heart Rate Zones',
      description: 'Generate personalized training zones for endurance and cardio sessions.',
      path: '/heart-rate-zones',
      icon: icons.heartRateZones,
    },
    {
      title: 'Measurement Conversions',
      description: 'Convert weight, height, temperature, and more in one place.',
      path: '/conversions',
      icon: icons.conversions,
    },
  ];

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-accent/10 bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/60 px-6 py-14 md:px-12">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full border-8 border-accent/20 animate-pulse" />
        <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full border-8 border-blue-300/40" />

        <div className="relative mx-auto max-w-6xl">
          <p className="animate-fade-in text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            HealthCheck Platform
          </p>
          <h1 className="mt-4 animate-slide-up text-4xl font-extrabold leading-tight md:text-6xl">
            Smarter health calculators with a cleaner, faster experience
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-gray-700">
            Explore modern tools for body composition, calorie planning, and performance goals — now
            with improved visuals, stronger interactions, and easier navigation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/calculators"
              className="rounded-full bg-accent px-6 py-3 font-semibold text-white transition-all hover:translate-y-[-2px] hover:bg-accent-dark"
            >
              Browse calculators
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-accent/20 bg-white px-6 py-3 font-semibold text-accent transition-all hover:border-accent hover:bg-accent/5"
            >
              Read the blog
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-accent/15 bg-white p-3 shadow-lg">
            <Search
              placeholder="Search calculators, guides, and blog posts..."
              className="rounded-xl border border-accent/10"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Most popular calculators</h2>
            <p className="text-gray-600">Quickly jump into the tools users rely on most.</p>
          </div>
          <Link href="/calculators" className="text-sm font-semibold text-accent hover:underline">
            View all categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCalculators.map(calculator => (
            <CalculatorCard
              key={calculator.path}
              title={calculator.title}
              description={calculator.description}
              path={calculator.path}
              icon={calculator.icon}
            />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-accent/10 bg-white p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold">From the blog</h2>
          <p className="text-gray-600">Evidence-based explainers and practical guides.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              href: '/blog/calorie-deficit-myths',
              category: 'Weight Management',
              title: '5 Myths About Calorie Deficits Debunked',
              excerpt:
                'Discover why weight loss is not always linear and how to set realistic expectations.',
            },
            {
              href: '/blog/tdee-explained',
              category: 'Energy Expenditure',
              title: 'TDEE Explained: How Many Calories Do You Really Need?',
              excerpt: 'Understand each TDEE component and how it impacts your nutrition strategy.',
            },
            {
              href: '/blog/measuring-body-fat',
              category: 'Measurement Methods',
              title: 'The Pros and Cons of Different Body Fat Measurement Methods',
              excerpt:
                'Compare practical and clinical body fat methods by accuracy and convenience.',
            },
          ].map(post => (
            <Link
              key={post.href}
              href={post.href}
              className="group rounded-2xl border border-accent/10 bg-gradient-to-b from-white to-indigo-50/30 p-5 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
            >
              <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {post.category}
              </span>
              <h3 className="mt-3 text-lg font-bold">{post.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
              <p className="mt-4 text-sm font-semibold text-accent">Read article →</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex rounded-full border border-accent/20 px-6 py-3 font-semibold text-accent transition-colors hover:bg-accent/5"
          >
            Explore all blog articles
          </Link>
        </div>
      </section>
    </div>
  );
}
