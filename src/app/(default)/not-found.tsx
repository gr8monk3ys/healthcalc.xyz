'use client';

import React from 'react';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';

// Popular calculator links to show on the 404 page
const popularCalculators = [
  { name: 'BMI Calculator', path: '/bmi', description: 'Calculate your Body Mass Index' },
  {
    name: 'Body Fat Calculator',
    path: '/body-fat',
    description: 'Estimate your body fat percentage',
  },
  {
    name: 'TDEE Calculator',
    path: '/tdee',
    description: 'Calculate your Total Daily Energy Expenditure',
  },
  {
    name: 'Body Fat Burn Calculator',
    path: '/body-fat-burn',
    description: 'Plan your fat loss journey',
  },
  {
    name: 'Sleep Calculator',
    path: '/sleep',
    description: 'Find optimal bedtimes or wake times',
  },
  {
    name: 'Blood Pressure Calculator',
    path: '/blood-pressure',
    description: 'Check your blood pressure category',
  },
];

// Popular blog posts to show on the 404 page
const popularBlogPosts = [
  {
    name: 'TDEE Explained',
    path: '/blog/tdee-explained',
    description: 'How many calories do you really need?',
  },
  {
    name: 'Measuring Body Fat',
    path: '/blog/measuring-body-fat',
    description: 'Pros and cons of different methods',
  },
  {
    name: 'Calorie Deficit Myths',
    path: '/blog/calorie-deficit-myths',
    description: '5 myths about calorie deficits debunked',
  },
];

export default function NotFound() {
  // Track 404 errors for SEO analysis
  React.useEffect(() => {
    // Only run in production and if analytics is available
    if (
      process.env.NODE_ENV === 'production' &&
      typeof window !== 'undefined' &&
      'gtag' in window
    ) {
      // @ts-expect-error - gtag is not typed
      window.gtag('event', '404_error', {
        event_category: 'error',
        event_label: window.location.pathname,
        non_interaction: true,
      });
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div className="neumorph p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Popular Calculators</h3>
          <ul className="space-y-4">
            {popularCalculators.map(calc => (
              <li key={calc.path}>
                <Link
                  href={calc.path}
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <span className="font-medium text-accent">{calc.name}</span>
                  <p className="text-sm text-gray-600 mt-1">{calc.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="neumorph p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Popular Articles</h3>
          <ul className="space-y-4">
            {popularBlogPosts.map(post => (
              <li key={post.path}>
                <Link
                  href={post.path}
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <span className="font-medium text-accent">{post.name}</span>
                  <p className="text-sm text-gray-600 mt-1">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link href="/blog" className="text-accent hover:underline flex items-center">
              View all articles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 neumorph rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Looking for Something Specific?</h3>
        <p className="mb-4">If you can't find what you're looking for, try one of these options:</p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Check the URL for typos</li>
          <li>Use the navigation menu at the top of the page</li>
          <li>
            Visit our{' '}
            <Link href="/sitemap" className="text-accent hover:underline">
              sitemap
            </Link>
          </li>
          <li>Contact us if you believe this is an error</li>
        </ul>
        <Link
          href="/contact"
          className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Contact Us
        </Link>
      </div>

      {/* Structured data for breadcrumb */}
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://www.healthcalc.xyz/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Page Not Found',
              item: 'https://www.healthcalc.xyz/404',
            },
          ],
        }}
      />
    </div>
  );
}
