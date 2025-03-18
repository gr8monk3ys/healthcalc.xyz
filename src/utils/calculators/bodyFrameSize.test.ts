import { describe, it, expect } from 'vitest';
import { calculateBodyFrameSize } from './bodyFrameSize';

describe('Body Frame Size Calculator', () => {
  it('throws when height or wrist is not positive', () => {
    expect(() => calculateBodyFrameSize({ gender: 'female', heightCm: 0, wristCm: 15 })).toThrow(
      'Height and wrist must be greater than 0'
    );
    expect(() => calculateBodyFrameSize({ gender: 'male', heightCm: 180, wristCm: -1 })).toThrow(
      'Height and wrist must be greater than 0'
    );
  });

  it('categorizes female frame sizes across thresholds', () => {
    const small = calculateBodyFrameSize({ gender: 'female', heightCm: 165, wristCm: 14 });
    const medium = calculateBodyFrameSize({ gender: 'female', heightCm: 165, wristCm: 15.5 });
    const large = calculateBodyFrameSize({ gender: 'female', heightCm: 165, wristCm: 17 });

    expect(small.category).toBe('Small frame');
    expect(small.guidance).toContain('Smaller bone structure');
    expect(medium.category).toBe('Medium frame');
    expect(large.category).toBe('Large frame');
  });

  it('categorizes male frame sizes across thresholds', () => {
    const small = calculateBodyFrameSize({ gender: 'male', heightCm: 180, wristCm: 16 });
    const medium = calculateBodyFrameSize({ gender: 'male', heightCm: 180, wristCm: 18.5 });
    const large = calculateBodyFrameSize({ gender: 'male', heightCm: 180, wristCm: 20 });

    expect(small.category).toBe('Small frame');
    expect(medium.category).toBe('Medium frame');
    expect(large.category).toBe('Large frame');
  });

  it('rounds frame ratio to one decimal place', () => {
    const result = calculateBodyFrameSize({ gender: 'female', heightCm: 170, wristCm: 15.3 });
    expect(result.ratio).toBeCloseTo(Math.round(result.ratio * 10) / 10, 10);
  });
});
