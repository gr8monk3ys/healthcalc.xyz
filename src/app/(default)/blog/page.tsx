import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import BlogIndexClient from '@/components/BlogIndexClient';
import { BLOG_REGISTRY as BLOG_POSTS } from '@/lib/blog/registry';

export const metadata: Metadata = {
  title: 'Health & Fitness Blog | HealthCheck',
  description:
    'Explore articles on weight management, body composition, nutrition, and fitness to help you make informed decisions about your health.',
  keywords:
    'health blog, fitness blog, weight loss articles, body fat, nutrition, TDEE, calorie deficit, body composition',
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl md:text-4xl font-bold">Health & Fitness Blog</h1>
        <Link
          href="/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
          title="Subscribe via RSS"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path d="M3.429 16.571a3.429 3.429 0 1 1 0 6.858 3.429 3.429 0 0 1 0-6.858zM0 23.429h3.429C3.429 14.929 9.071 9.286 17.571 9.286V5.857C7.143 5.857 0 13 0 23.429zM0 23.429h3.429c0-5.714 4.571-10.286 10.285-10.286V9.714C6.857 9.714 0 16.571 0 23.429z" />
          </svg>
          RSS Feed
        </Link>
      </div>
      <p className="text-gray-600 mb-8">
        Explore evidence-based articles on weight management, body composition, nutrition, and
        fitness to help you make informed decisions about your health.
      </p>
      <BlogIndexClient posts={BLOG_POSTS} />

      <div className="mt-12 neumorph p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Looking for Our Calculators?</h2>
        <p className="mb-4">
          Our health and fitness calculators can help you track and plan your fitness journey with
          precision.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/body-fat"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold">Body Fat Calculator</h3>
            <p className="text-sm text-gray-600">
              Calculate your body fat percentage using various methods
            </p>
          </Link>
          <Link
            href="/body-fat-burn"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold">Body Fat Burn Calculator</h3>
            <p className="text-sm text-gray-600">
              Calculate calories burned during activities and weight loss timeline
            </p>
          </Link>
          <Link
            href="/tdee"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold">TDEE Calculator</h3>
            <p className="text-sm text-gray-600">Calculate your Total Daily Energy Expenditure</p>
          </Link>
          <Link
            href="/calorie-deficit"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold">Calorie Deficit Calculator</h3>
            <p className="text-sm text-gray-600">Discover how long to reach your goal weight</p>
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/" className="text-accent hover:underline">
            View all calculators →
          </Link>
        </div>
      </div>
    </div>
  );
}
