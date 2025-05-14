import React from 'react';

export default function Vo2MaxInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">About VO2 Max</h2>
      <p className="text-gray-600 mb-4">
        VO2 max is the maximum amount of oxygen your body can use during exercise. The Rockport walk
        test estimates VO2 max using a 1-mile walk, heart rate, and basic body metrics.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Use a flat track and walk as fast as possible for the test.</li>
        <li>Measure heart rate immediately after finishing.</li>
        <li>Repeat every few months to track progress.</li>
      </ul>
    </div>
  );
}
