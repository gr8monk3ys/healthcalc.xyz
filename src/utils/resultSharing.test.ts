import { describe, expect, it } from 'vitest';
import {
  buildSharedResultSummary,
  decodeSharedResultToken,
  encodeSharedResultToken,
  isSupportedShareCalculator,
  type SharedResultPayload,
} from './resultSharing';

const FITNESS_AGE_PAYLOAD: SharedResultPayload<'fitness-age'> = {
  v: 1,
  c: 'fitness-age',
  i: {
    age: 34,
    gender: 'female',
    vo2Max: 41.2,
    restingHeartRate: 58,
    bmi: 22.8,
    bodyFatPercentage: 24,
    weeklyTrainingDays: 4,
    balanceScore: 4,
    flexibilityScore: 3,
  },
};

describe('resultSharing fitness-age support', () => {
  it('recognizes fitness-age as a supported share calculator', () => {
    expect(isSupportedShareCalculator('fitness-age')).toBe(true);
  });

  it('encodes and decodes fitness-age payload tokens', () => {
    const token = encodeSharedResultToken(FITNESS_AGE_PAYLOAD);
    const decoded = decodeSharedResultToken(token);

    expect(decoded).not.toBeNull();
    expect(decoded?.c).toBe('fitness-age');
    expect(decoded?.i).toEqual(FITNESS_AGE_PAYLOAD.i);
  });

  it('rejects fitness-age payloads outside validation ranges', () => {
    const invalidToken = encodeSharedResultToken({
      ...FITNESS_AGE_PAYLOAD,
      i: {
        ...FITNESS_AGE_PAYLOAD.i,
        weeklyTrainingDays: 9,
      },
    } as SharedResultPayload);

    expect(decodeSharedResultToken(invalidToken)).toBeNull();
  });

  it('builds summary metadata for fitness-age payloads', () => {
    const summary = buildSharedResultSummary(FITNESS_AGE_PAYLOAD);

    expect(summary.calculator).toBe('fitness-age');
    expect(summary.title).toContain('Fitness Age');
    expect(summary.primaryValue).toContain('years');
    expect(summary.secondaryValue).toContain('age gap');
  });
});
