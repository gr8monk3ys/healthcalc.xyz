import { describe, expect, it } from 'vitest';
import { computeSavedResultKey } from './savedResultsKey';

describe('computeSavedResultKey', () => {
  it('normalizes calculator names and stringifies nested data deterministically', () => {
    const left = computeSavedResultKey(' BMI ', {
      profile: {
        age: 30,
        gender: 'male',
      },
      measurements: [180, 80, { note: 'stable' }],
    });

    const right = computeSavedResultKey('bmi', {
      measurements: [180, 80, { note: 'stable' }],
      profile: {
        gender: 'male',
        age: 30,
      },
    });

    expect(left).toBe(right);
    expect(left).toMatch(/^bmi-/);
  });

  it('produces distinct keys for different payloads and supports fallback value types', () => {
    const functionKey = computeSavedResultKey('macro', {
      goal: 'custom',
      formatter: () => 'protein',
    });

    const changedDataKey = computeSavedResultKey('macro', {
      goal: 'maintenance',
      formatter: () => 'protein',
    });

    expect(functionKey).toMatch(/^macro-/);
    expect(changedDataKey).toMatch(/^macro-/);
    expect(functionKey).not.toBe(changedDataKey);
  });
});
