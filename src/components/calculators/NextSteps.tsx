'use client';

import React from 'react';
import Link from 'next/link';

interface NextStep {
  label: string;
  description: string;
  href: string;
  highlight?: boolean;
}

interface NextStepsProps {
  title?: string;
  steps: NextStep[];
  insight?: string;
}

const ArrowIcon: React.FC = () => (
  <svg
    className="w-5 h-5 text-accent flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

const NextSteps: React.FC<NextStepsProps> = ({ title = 'What to Do Next', steps, insight }) => {
  if (steps.length === 0) return null;

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 mt-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      {insight && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">{insight}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {steps.map(step => (
          <Link
            key={step.href}
            href={step.href}
            className={`glass-panel-strong rounded-2xl p-4 transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 flex items-start gap-3 ${
              step.highlight ? 'ring-1 ring-accent/30' : ''
            }`}
          >
            <ArrowIcon />
            <div className="min-w-0">
              <span className="font-medium text-accent block">{step.label}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 block">
                {step.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NextSteps;
