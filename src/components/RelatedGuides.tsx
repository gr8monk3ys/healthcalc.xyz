'use client';

import React from 'react';
import Link from 'next/link';

const RELATED_GUIDES = [
  {
    title: 'Calorie Basics',
    description: 'Learn how calories drive maintenance, loss, and gain.',
    url: '/learn/calorie-basics',
  },
  {
    title: 'Macro Planning',
    description: 'Set protein, carb, and fat targets with confidence.',
    url: '/learn/macro-planning',
  },
  {
    title: 'Body Composition Guide',
    description: 'Understand BMI, body fat, and lean mass metrics.',
    url: '/learn/body-composition-guide',
  },
  {
    title: 'Heart Rate Training',
    description: 'Use heart-rate zones to train smarter.',
    url: '/learn/heart-rate-training',
  },
];

interface RelatedGuidesProps {
  title?: string;
  className?: string;
}

export default function RelatedGuides({
  title = 'Related Guides',
  className = '',
}: RelatedGuidesProps) {
  return (
    <section className={`my-8 ${className}`}>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {RELATED_GUIDES.map(guide => (
          <Link
            key={guide.url}
            href={guide.url}
            className="neumorph p-4 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-accent">{guide.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{guide.description}</p>
            <span className="text-sm text-accent mt-3 inline-block">Explore guide →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
