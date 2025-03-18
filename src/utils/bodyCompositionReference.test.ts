import { describe, expect, it } from 'vitest';
import { getBodyCompositionReference } from './bodyCompositionReference';

describe('getBodyCompositionReference', () => {
  it('uses legacy fallback when age and gender are missing', () => {
    expect(getBodyCompositionReference({})).toEqual({
      bmi: 22,
      bodyFatPercentage: 20,
    });
  });

  it('uses sex-adjusted fallback when only gender is available', () => {
    expect(getBodyCompositionReference({ gender: 'male' })).toEqual({
      bmi: 22,
      bodyFatPercentage: 16,
    });

    expect(getBodyCompositionReference({ gender: 'female' })).toEqual({
      bmi: 22,
      bodyFatPercentage: 24,
    });
  });

  it('returns age-and-sex-adjusted values for adults', () => {
    expect(getBodyCompositionReference({ age: 35, gender: 'male' })).toEqual({
      bmi: 22.4,
      bodyFatPercentage: 16,
    });

    expect(getBodyCompositionReference({ age: 52, gender: 'female' })).toEqual({
      bmi: 23.6,
      bodyFatPercentage: 28,
    });
  });

  it('uses age-only midpoint values when gender is missing', () => {
    expect(getBodyCompositionReference({ age: 42 })).toEqual({
      bmi: 23,
      bodyFatPercentage: 22,
    });
  });

  it('falls back for minors or invalid ages', () => {
    expect(getBodyCompositionReference({ age: 15, gender: 'female' })).toEqual({
      bmi: 22,
      bodyFatPercentage: 24,
    });

    expect(getBodyCompositionReference({ age: Number.NaN, gender: 'male' })).toEqual({
      bmi: 22,
      bodyFatPercentage: 16,
    });
  });
});
