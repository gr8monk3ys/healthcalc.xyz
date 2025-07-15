import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Walking & Running Energy | HealthCheck',
  description: 'Estimate calorie burn from walking and running sessions.',
};

export default function WalkingRunningEnergyGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Walking & Running Energy</h1>
      <p className="text-gray-600 mb-6">
        Calorie burn depends on speed, duration, and body weight. Walking tends to burn fewer
        calories per hour than running, but consistency matters most.
      </p>

      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">How to Estimate Burn</h2>
        <p className="text-gray-600 mb-3">
          Use your average speed and duration. If you are unsure, start with a conservative pace and
          adjust using wearable data over time.
        </p>
        <p className="text-gray-600">
          Combine these estimates with a daily calorie plan for better long-term results.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/calories-burned-walking"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Calories Burned Walking</h3>
            <p className="text-sm text-gray-600">Estimate walking calorie burn.</p>
          </Link>
          <Link
            href="/calories-burned-running"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Calories Burned Running</h3>
            <p className="text-sm text-gray-600">Estimate running calorie burn.</p>
          </Link>
          <Link
            href="/calories-burned"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Calories Burned Calculator</h3>
            <p className="text-sm text-gray-600">General workout calorie estimate.</p>
          </Link>
          <Link
            href="/steps-to-miles"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Steps to Miles</h3>
            <p className="text-sm text-gray-600">Convert steps into distance.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
