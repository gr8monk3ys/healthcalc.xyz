import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Heart Rate Training | HealthCheck',
  description: 'Use max heart rate, target zones, and resting heart rate to guide training.',
};

export default function HeartRateTrainingGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Heart Rate Training</h1>
      <p className="text-gray-600 mb-6">
        Heart rate zones help you train at the right intensity. Lower zones build endurance, while
        higher zones improve speed and conditioning.
      </p>

      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">How to Set Your Zones</h2>
        <p className="text-gray-600 mb-3">
          Start with a max heart rate estimate, then calculate a target range (typically 50-85%). If
          you know your resting heart rate, the Karvonen method gives a more personalized range.
        </p>
        <p className="text-gray-600">
          Track your resting heart rate over time—improvements often signal better cardiovascular
          fitness.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/max-heart-rate"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Max Heart Rate Calculator</h3>
            <p className="text-sm text-gray-600">Estimate max HR with common formulas.</p>
          </Link>
          <Link
            href="/target-heart-rate"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Target Heart Rate Calculator</h3>
            <p className="text-sm text-gray-600">Calculate your training zone range.</p>
          </Link>
          <Link
            href="/heart-rate-zones"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Heart Rate Zones Calculator</h3>
            <p className="text-sm text-gray-600">Zones with optional resting heart rate.</p>
          </Link>
          <Link
            href="/resting-heart-rate"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Resting Heart Rate Calculator</h3>
            <p className="text-sm text-gray-600">Evaluate fitness based on resting HR.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
