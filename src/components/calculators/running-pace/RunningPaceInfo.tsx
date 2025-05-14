import React from 'react';

export default function RunningPaceInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">Using Pace for Training</h2>
      <p className="text-gray-600 mb-4">
        Pace helps you plan workouts, track progress, and set race goals. Convert between pace per
        mile and pace per kilometer to follow training plans worldwide.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Use pace to plan long runs, tempo runs, and intervals.</li>
        <li>Track your pace over time to see improvements.</li>
        <li>Adjust pace goals for heat, hills, or fatigue.</li>
      </ul>
    </div>
  );
}
