/**
 * Maximum Fat Loss Info Component
 */

import React from 'react';
import Card from '@/components/ui/Card';

export default function MaximumFatLossInfo() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          This calculator uses research-based science to determine the maximum calorie deficit you
          can sustain while primarily losing fat, not muscle. Based on Dr. Alpert's 2005 study,
          your body can only mobilize about 22-31 calories per pound of body fat per day.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Enter your stats and body fat percentage to find your optimal cutting calories that
          maximize fat loss while preserving lean muscle mass.
        </p>
      </Card>

      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20">
        <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
          Why This Approach Works
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>✓ Preserves muscle mass and strength</li>
          <li>✓ Prevents excessive metabolic slowdown</li>
          <li>✓ Improves body composition (not just weight)</li>
          <li>✓ More sustainable long-term</li>
          <li>✓ Reduces risk of weight regain</li>
        </ul>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-3">What You'll Get</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Maximum Safe Deficit</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Based on your body fat percentage
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Optimal Calorie Target</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Daily calories for maximum fat loss
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Protein Requirements</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Tailored to your lean body mass
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">12-Week Projection</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                See how your deficit adjusts as you lose fat
              </div>
            </div>
          </li>
        </ul>
      </Card>
    </div>
  );
}
