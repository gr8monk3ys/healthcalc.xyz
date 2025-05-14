import React from 'react';

export default function SleepInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">How Sleep Cycles Work</h2>
      <p className="text-gray-600 mb-4">
        Most sleep cycles last about 90 minutes. Waking up between cycles can help you feel more
        rested. This calculator suggests bedtimes or wake times based on common cycle lengths.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Aim for 4-6 cycles (6 to 9 hours) whenever possible.</li>
        <li>Keep a consistent schedule to improve sleep quality.</li>
        <li>Reduce screen time and caffeine close to bedtime.</li>
      </ul>
    </div>
  );
}
