import React from 'react';

export default function CaloriesBurnedInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">How Calories Burned Is Estimated</h2>
      <p className="text-gray-600 mb-3">
        This calculator uses MET values (metabolic equivalents) to estimate how many calories you
        burn during an activity. METs represent the intensity of an activity compared to resting.
      </p>
      <p className="text-gray-600">
        Use the result as a guide. Wearables can help refine your personal burn rate based on heart
        rate and real-world training data.
      </p>
    </div>
  );
}
