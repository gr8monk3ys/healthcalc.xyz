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

const NextSteps: React.FC<NextStepsProps> = ({ title = 'What to Do Next', steps, insight }) => {
  if (steps.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg">{title}</h3>

      {insight && <p className="mt-2 text-sm leading-relaxed text-ink-2">{insight}</p>}

      <ul className="mt-3">
        {steps.map(step => (
          <li key={step.href} className="border-t border-ink first:border-t-4">
            <Link href={step.href} className="group flex items-baseline justify-between gap-4 py-3">
              <span className="min-w-0">
                <span
                  className={`block underline-offset-4 group-hover:underline ${
                    step.highlight ? 'font-black' : 'font-bold'
                  }`}
                >
                  {step.label}
                </span>
                <span className="mt-0.5 block text-sm text-ink-2">{step.description}</span>
              </span>
              <span className="font-bold" aria-hidden="true">
                {'→'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NextSteps;
