import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Pregnancy Health | HealthCheck',
  description: 'Key pregnancy calculators for due dates and weight gain guidance.',
};

export default function PregnancyHealthGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Pregnancy Health</h1>
      <p className="text-gray-600 mb-6">
        Pregnancy calculators can help you plan timelines and monitor healthy weight gain. Always
        confirm results with your healthcare provider.
      </p>

      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Key Steps</h2>
        <p className="text-gray-600 mb-3">
          Use a due date calculator to estimate milestones, and weight gain guidance to stay within
          recommended ranges based on pre-pregnancy BMI.
        </p>
        <p className="text-gray-600">
          Track hydration and nutrition changes to support energy and recovery.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/pregnancy-due-date"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Pregnancy Due Date</h3>
            <p className="text-sm text-gray-600">Estimate due date from last period.</p>
          </Link>
          <Link
            href="/due-date-by-conception"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Due Date by Conception</h3>
            <p className="text-sm text-gray-600">Estimate due date from conception.</p>
          </Link>
          <Link
            href="/pregnancy-weight-gain"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Pregnancy Weight Gain</h3>
            <p className="text-sm text-gray-600">Recommended weight gain ranges.</p>
          </Link>
          <Link href="/ovulation" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Ovulation Calculator</h3>
            <p className="text-sm text-gray-600">Estimate fertile window.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
