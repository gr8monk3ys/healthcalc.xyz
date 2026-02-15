import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Health Guides | HealthCheck',
  description: 'Quick guides that explain key health metrics and link to the right calculators.',
};

const guides = [
  {
    slug: 'calorie-basics',
    title: 'Calorie Basics',
    description: 'How calories work for maintenance, loss, and gain.',
  },
  {
    slug: 'macro-planning',
    title: 'Macro Planning',
    description: 'Set carb, fat, and protein targets that align with your goals.',
  },
  {
    slug: 'heart-rate-training',
    title: 'Heart Rate Training',
    description: 'Use zones and max heart rate to train smarter.',
  },
  {
    slug: 'body-composition-guide',
    title: 'Body Composition Guide',
    description: 'Understand BMI, body fat, and lean mass together.',
  },
  {
    slug: 'walking-running-energy',
    title: 'Walking & Running Energy',
    description: 'Estimate calories burned from walking or running.',
  },
  {
    slug: 'pregnancy-health',
    title: 'Pregnancy Health',
    description: 'Key calculators for due dates and weight gain guidance.',
  },
];

export default function LearnIndexPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Health Guides</h1>
      <p className="text-gray-600 mb-8">
        Quick educational hubs that explain each metric and point you to the right calculators.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map(guide => (
          <Link
            key={guide.slug}
            href={`/learn/${guide.slug}`}
            className="neumorph p-5 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h2 className="text-lg font-semibold text-accent">{guide.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
