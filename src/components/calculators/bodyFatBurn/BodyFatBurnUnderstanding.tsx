import React from 'react';
import Link from 'next/link';

export default function BodyFatBurnUnderstanding() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Understanding the Body Fat Burn Calculator</h2>

      <div className="neumorph p-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">What is the Body Fat Burn Calculator?</h3>
        <p className="mb-4">
          The Body Fat Burn Calculator is a tool designed to help you understand how physical
          activity contributes to weight loss. It calculates the calories burned during specific
          activities and estimates how long it would take to reach a weight loss goal through
          exercise alone.
        </p>
        <p>
          Unlike general calorie calculators, this tool focuses specifically on the relationship
          between exercise, energy expenditure, and fat loss, providing a realistic timeline for
          achieving your goals.
        </p>
      </div>

      <div className="neumorph p-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">The Science Behind the Calculator</h3>
        <p className="mb-4">This calculator uses several established scientific principles:</p>
        <ul className="list-disc list-inside space-y-3 mb-4">
          <li>
            <strong>Mifflin-St Jeor Formula:</strong> Used to calculate your Resting Energy
            Expenditure (REE), which is the number of calories your body burns at rest. This formula
            is considered the most accurate for estimating metabolic rate.
          </li>
          <li>
            <strong>MET (Metabolic Equivalent of Task):</strong> A measure of the energy cost of
            physical activities. The calculator uses MET values from the Compendium of Physical
            Activities, a standardized reference of energy costs for different activities.
          </li>
          <li>
            <strong>Energy Balance Equation:</strong> The principle that weight loss occurs when
            energy expenditure exceeds energy intake. The calculator uses the approximation that
            3,500 calories equals one pound of fat.
          </li>
        </ul>
        <p>
          While these principles provide a solid foundation for estimation, individual results may
          vary based on factors like genetics, body composition, and exercise efficiency.
        </p>
      </div>

      <div className="neumorph p-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">How to Use the Results</h3>
        <p className="mb-4">The calculator provides several key pieces of information:</p>
        <ul className="list-disc list-inside space-y-3 mb-4">
          <li>
            <strong>Energy Expenditure:</strong> Your resting energy expenditure and the calories
            burned during your selected activity.
          </li>
          <li>
            <strong>Time to Goal:</strong> An estimate of how long it will take to reach your weight
            loss goal through exercise alone.
          </li>
          <li>
            <strong>Exercise Plan:</strong> A summary of your selected activity, duration, and
            frequency.
          </li>
        </ul>
        <p className="mb-4">For optimal results, consider these recommendations:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Use this calculator as one tool in your weight management strategy, not as the sole
            approach.
          </li>
          <li>
            Combine exercise with dietary changes for more effective and sustainable weight loss.
          </li>
          <li>
            Start with realistic goals and gradually increase intensity as your fitness improves.
          </li>
          <li>Track your progress and adjust your plan as needed based on real-world results.</li>
        </ul>
      </div>

      <div className="neumorph p-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Related Calculators</h3>
        <p className="mb-4">
          For a comprehensive approach to weight management, consider using these related
          calculators:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <Link href="/tdee" className="text-accent hover:underline">
              TDEE Calculator
            </Link>{' '}
            - Calculate your Total Daily Energy Expenditure
          </li>
          <li>
            <Link href="/body-fat" className="text-accent hover:underline">
              Body Fat Calculator
            </Link>{' '}
            - Estimate your body fat percentage
          </li>
          <li>
            <Link href="/calorie-deficit" className="text-accent hover:underline">
              Calorie Deficit Calculator
            </Link>{' '}
            - Plan your weight loss with different calorie deficits
          </li>
          <li>
            <Link href="/maximum-fat-loss" className="text-accent hover:underline">
              Maximum Fat Loss Calculator
            </Link>{' '}
            - Find the optimal calorie intake for maximum fat loss
          </li>
        </ul>
      </div>

      <div className="neumorph p-5 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">References</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
          <li>
            Ainsworth BE, et al. 2011 Compendium of Physical Activities: a second update of codes
            and MET values. Medicine & Science in Sports & Exercise. 2011;43(8):1575-1581.
          </li>
          <li>
            Mifflin MD, et al. A new predictive equation for resting energy expenditure in healthy
            individuals. The American Journal of Clinical Nutrition. 1990;51(2):241-247.
          </li>
          <li>
            Hall KD, et al. Quantification of the effect of energy imbalance on bodyweight. The
            Lancet. 2011;378(9793):826-837.
          </li>
        </ul>
      </div>
    </div>
  );
}
