import React from 'react';

export default function WaterIntakeInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">Hydration Basics</h2>
      <p className="text-gray-600 mb-4">
        Water supports energy, digestion, and temperature regulation. This calculator estimates a
        daily intake target based on body weight and activity level.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Increase intake during heat, high altitude, or intense workouts.</li>
        <li>Spread water throughout the day for better absorption.</li>
        <li>Pair hydration with electrolytes during long training sessions.</li>
      </ul>
    </div>
  );
}
