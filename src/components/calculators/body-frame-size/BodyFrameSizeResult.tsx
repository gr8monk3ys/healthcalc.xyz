import React from 'react';
import type { BodyFrameSizeResult } from '@/types/bodyFrameSize';

interface BodyFrameSizeResultProps {
  result: BodyFrameSizeResult | null;
}

export default function BodyFrameSizeResult({ result }: BodyFrameSizeResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Body Frame Size Result</h2>
        <p className="text-gray-600">Enter height and wrist size to see your frame type.</p>
      </div>
    );
  }

  return (
    <div
      id="body-frame-size-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Body Frame Size</h2>
      <div className="neumorph-inset p-5 rounded-lg mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Frame Category</p>
        <p className="text-3xl font-bold text-accent">{result.category}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Height-to-wrist ratio: {result.ratio}
        </p>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{result.guidance}</p>
    </div>
  );
}
