import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Body Composition Guide | HealthCheck',
  description: 'Understand BMI, body fat percentage, and lean mass together.',
};

export default function BodyCompositionGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Body Composition Guide</h1>
      <p className="text-gray-600 mb-6">
        Body composition looks beyond scale weight. Pair BMI with body fat percentage and lean mass
        to see a clearer picture of health and progress.
      </p>

      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Key Metrics</h2>
        <p className="text-gray-600 mb-3">
          BMI is a quick screening tool, but it does not separate muscle from fat. Body fat
          percentage and lean mass provide more actionable insight for fitness goals.
        </p>
        <p className="text-gray-600">
          Use waist-based ratios to understand central fat, which can impact health risk.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/bmi" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">BMI Calculator</h3>
            <p className="text-sm text-gray-600">Body mass index screening tool.</p>
          </Link>
          <Link href="/body-fat" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Body Fat Calculator</h3>
            <p className="text-sm text-gray-600">Estimate body fat percentage.</p>
          </Link>
          <Link
            href="/lean-body-mass"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Lean Body Mass Calculator</h3>
            <p className="text-sm text-gray-600">Estimate lean mass and fat mass.</p>
          </Link>
          <Link
            href="/waist-to-height-ratio"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Waist-to-Height Ratio</h3>
            <p className="text-sm text-gray-600">Assess central fat distribution.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
