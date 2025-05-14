import React from 'react';
import type { RunningPaceResult } from '@/types/runningPace';

interface RunningPaceResultProps {
  result: RunningPaceResult | null;
}

export default function RunningPaceResult({ result }: RunningPaceResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Running Pace Result</h2>
        <p className="text-gray-600">Enter your distance and time to calculate pace.</p>
      </div>
    );
  }

  return (
    <div className="neumorph p-6 rounded-lg" id="running-pace-result">
      <h2 className="text-xl font-semibold mb-2">Running Pace</h2>
      <div className="space-y-2">
        <p className="text-lg">
          Pace per mile: <span className="font-semibold">{result.pacePerMile} /mi</span>
        </p>
        <p className="text-lg">
          Pace per km: <span className="font-semibold">{result.pacePerKm} /km</span>
        </p>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          Speed: {result.speedMph} mph ({result.speedKph} kph)
        </p>
      </div>
    </div>
  );
}
