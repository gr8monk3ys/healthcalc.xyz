import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Calorie Basics | HealthCheck',
  description:
    'Learn how calories relate to maintenance, loss, and gain, plus tools to calculate targets.',
};

export default function CalorieBasicsGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Calorie Basics</h1>
      <p className="text-gray-600 mb-6">
        Calories are the energy your body uses every day. Maintenance calories keep weight stable,
        while a deficit or surplus moves weight down or up over time.
      </p>

      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">How to Use These Numbers</h2>
        <p className="text-gray-600 mb-3">
          Start by estimating maintenance calories using your height, weight, age, and activity
          level. For weight loss, reduce by 10-20%. For muscle gain, increase by 5-15%.
        </p>
        <p className="text-gray-600">
          Track results for 2-3 weeks and adjust by 100-200 calories if your progress stalls.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/calorie" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Calorie Calculator</h3>
            <p className="text-sm text-gray-600">Daily calories for maintenance, loss, or gain.</p>
          </Link>
          <Link href="/tdee" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">TDEE Calculator</h3>
            <p className="text-sm text-gray-600">Estimate total daily energy expenditure.</p>
          </Link>
          <Link
            href="/calorie-deficit"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Calorie Deficit Calculator</h3>
            <p className="text-sm text-gray-600">Plan a safe deficit and timeline.</p>
          </Link>
          <Link
            href="/weight-management"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Weight Management Calculator</h3>
            <p className="text-sm text-gray-600">Set a target date and daily intake.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
