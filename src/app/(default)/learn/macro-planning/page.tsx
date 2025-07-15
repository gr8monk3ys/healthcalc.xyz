import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Macro Planning | HealthCheck',
  description: 'Set carb, fat, and protein targets that match your calorie goals.',
};

export default function MacroPlanningGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Macro Planning</h1>
      <p className="text-gray-600 mb-6">
        Macros (protein, carbs, fat) determine how your calories are distributed. A solid macro plan
        supports satiety, performance, and body composition.
      </p>

      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">How to Set Macros</h2>
        <p className="text-gray-600 mb-3">
          Start with a calorie target, then set protein first (1.6-2.2 g/kg bodyweight is common).
          Next, pick fat (20-35% of calories) and fill the rest with carbs.
        </p>
        <p className="text-gray-600">
          Adjust as needed based on energy levels, hunger, and training performance.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/macro" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Macro Calculator</h3>
            <p className="text-sm text-gray-600">Set protein, carbs, and fat targets.</p>
          </Link>
          <Link href="/protein" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Protein Intake Calculator</h3>
            <p className="text-sm text-gray-600">Estimate daily protein goals.</p>
          </Link>
          <Link href="/carb-intake" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Carb Intake Calculator</h3>
            <p className="text-sm text-gray-600">Convert carb percentage into grams.</p>
          </Link>
          <Link href="/fat-intake" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Fat Intake Calculator</h3>
            <p className="text-sm text-gray-600">Convert fat percentage into grams.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
