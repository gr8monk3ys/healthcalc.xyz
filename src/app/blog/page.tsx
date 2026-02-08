import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import BlogIndexClient from '@/components/BlogIndexClient';

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
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Best Smart Scales for Body Composition Tracking in 2026',
    description:
      'Compare top smart scales for tracking body fat, muscle mass, BMI, and more. See which scale fits your goals.',
    slug: 'best-smart-scales-body-composition',
    date: 'February 2, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-smart-scales-body-composition.jpg',
  },
  {
    title: 'Best Fitness Trackers for Calorie Tracking in 2026',
    description:
      'Find the best fitness trackers for accurate calorie burn estimates, heart rate monitoring, and activity tracking.',
    slug: 'best-fitness-trackers-calorie-tracking',
    date: 'February 2, 2026',
    readTime: '15 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-fitness-trackers-calorie-tracking.jpg',
  },
  {
    title: 'Best Kitchen Scales for Portion Control and Calorie Tracking in 2026',
    description:
      'Compare top food scales for accurate portion control and calorie counting to stay on track with your macros.',
    slug: 'best-kitchen-scales-portion-control',
    date: 'February 2, 2026',
    readTime: '10 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-kitchen-scales-portion-control.jpg',
  },
  {
    title: 'Best Fitness Apps for Tracking Macros and Calories in 2026',
    description:
      'Compare the top calorie and macro tracking apps to find the right fit for consistent logging.',
    slug: 'best-fitness-apps-macro-tracking',
    date: 'February 2, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-fitness-apps-macro-tracking.jpg',
  },
  {
    title: 'Best Meal Delivery Services for Weight Loss in 2026',
    description:
      'Compare meal delivery services built for calorie control, portion consistency, and weight loss goals.',
    slug: 'meal-delivery-services-weight-loss',
    date: 'February 2, 2026',
    readTime: '14 min read',
    category: 'Product Reviews',
    image: '/images/blog/meal-delivery-services-weight-loss.jpg',
  },
  {
    title: 'Best Supplements for Your Fitness Goals in 2026',
    description:
      'From protein powder to creatine, discover the best supplements to support muscle growth, recovery, and overall fitness performance.',
    slug: 'best-supplements-fitness-goals',
    date: 'February 8, 2026',
    readTime: '12 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-supplements-fitness-goals.jpg',
  },
  {
    title: 'Best Home Gym Equipment for Beginners in 2026',
    description:
      'Build an effective home gym on any budget with these beginner-friendly picks for resistance bands, dumbbells, mats, and more.',
    slug: 'best-home-gym-equipment-beginners',
    date: 'February 8, 2026',
    readTime: '11 min read',
    category: 'Product Reviews',
    image: '/images/blog/best-home-gym-equipment-beginners.jpg',
  },
  {
    title: '5 Myths About Calorie Deficits Debunked',
    description:
      "Discover the truth behind common misconceptions about calorie deficits, weight loss, and metabolism. Learn why weight loss isn't always linear and how to set realistic expectations.",
    slug: 'calorie-deficit-myths',
    date: 'February 25, 2025',
    readTime: '8 min read',
    category: 'Weight Management',
    image: '/images/blog/calorie-deficit-myths.jpg',
  },
  {
    title: 'TDEE Explained: How Many Calories Do You Really Need?',
    description:
      "Understand the components of Total Daily Energy Expenditure (TDEE), how it's calculated, and why knowing your TDEE is crucial for effective weight management.",
    slug: 'tdee-explained',
    date: 'February 20, 2025',
    readTime: '10 min read',
    category: 'Energy Expenditure',
    image: '/images/blog/tdee-explained.jpg',
  },
  {
    title: 'The Pros and Cons of Different Body Fat Measurement Methods',
    description:
      'Compare the accuracy, accessibility, and practicality of various body fat assessment techniques, from DEXA scans to skinfold calipers to Navy method measurements.',
    slug: 'measuring-body-fat',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Measurement Methods',
    image: '/images/blog/measuring-body-fat.jpg',
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
      <BlogIndexClient posts={blogPosts} />

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
