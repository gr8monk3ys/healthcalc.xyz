import React from 'react';

export default function BMRInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">What is BMR?</h2>
      <p className="text-gray-600 mb-4">
        Basal Metabolic Rate (BMR) is the number of calories your body needs to maintain essential
        functions at rest. Use BMR to estimate total calorie needs and build nutrition plans.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Mifflin-St Jeor is considered the most accurate for most people.</li>
        <li>Katch-McArdle uses lean body mass when body fat percentage is known.</li>
        <li>BMR does not include activity or exercise calories.</li>
      </ul>
    </div>
  );
}
