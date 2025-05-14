import React from 'react';

export default function MaxHeartRateInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">About Max Heart Rate</h2>
      <p className="text-gray-600 mb-3">
        Max heart rate is commonly estimated using age-based formulas. It helps set training zones
        for endurance and cardio workouts.
      </p>
      <p className="text-gray-600">
        Use this as a guideline—individual max heart rate can vary based on fitness and genetics.
      </p>
    </div>
  );
}
