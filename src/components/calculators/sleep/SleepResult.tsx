import React from 'react';
import type { SleepResult } from '@/types/sleep';

interface SleepResultProps {
  result: SleepResult | null;
}

export default function SleepResult({ result }: SleepResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Sleep Schedule</h2>
        <p className="text-gray-600">Choose a time to see recommended sleep or wake times.</p>
      </div>
    );
  }

  return (
    <div className="neumorph p-6 rounded-lg" id="sleep-result">
      <h2 className="text-xl font-semibold mb-2">Sleep Schedule</h2>
      <p className="text-sm text-gray-600">{result.note}</p>

      <div className="mt-4 space-y-3">
        {result.recommendations.map(item => (
          <div key={item.cycles} className="p-3 bg-gray-50 rounded-lg flex justify-between">
            <div>
              <p className="font-medium">{item.time}</p>
              <p className="text-xs text-gray-500">{item.hours} hours of sleep</p>
            </div>
            <span className="text-sm text-gray-600">{item.cycles} cycles</span>
          </div>
        ))}
      </div>
    </div>
  );
}
