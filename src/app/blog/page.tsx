import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health & Fitness Blog | HealthCheck',
  description:
    'Explore articles on weight management, body composition, nutrition, and fitness to help you make informed decisions about your health.',
  keywords:
    'health blog, fitness blog, weight loss articles, body fat, nutrition, TDEE, calorie deficit, body composition',
};

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    title: '5 Myths About Calorie Deficits Debunked',
    description:
      "Discover the truth behind common misconceptions about calorie deficits, weight loss, and metabolism. Learn why weight loss isn't always linear and how to set realistic expectations.",
    slug: 'calorie-deficit-myths',
    date: 'February 25, 2025',
    readTime: '8 min read',
    category: 'Weight Management',
  },
  {
    title: 'TDEE Explained: How Many Calories Do You Really Need?',
    description:
      "Understand the components of Total Daily Energy Expenditure (TDEE), how it's calculated, and why knowing your TDEE is crucial for effective weight management.",
    slug: 'tdee-explained',
    date: 'February 20, 2025',
    readTime: '10 min read',
    category: 'Energy Expenditure',
  },
  {
    title: 'The Pros and Cons of Different Body Fat Measurement Methods',
    description:
      'Compare the accuracy, accessibility, and practicality of various body fat assessment techniques, from DEXA scans to skinfold calipers to Navy method measurements.',
    slug: 'measuring-body-fat',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Measurement Methods',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Health & Fitness Blog</h1>
      <p className="text-gray-600 mb-8">
        Explore evidence-based articles on weight management, body composition, nutrition, and
        fitness to help you make informed decisions about your health.
      </p>

      <div className="space-y-8">
        {blogPosts.map(post => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="block neumorph rounded-lg p-6 transition-all hover:shadow-neumorph-inset"
          >
            <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full mb-2">
              {post.category}
            </span>
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>

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
