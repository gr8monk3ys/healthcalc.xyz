import { describe, it, expect } from 'vitest';
import { calculateRestingHeartRate } from './restingHeartRate';

describe('Resting Heart Rate Calculator', () => {
  it('throws for non-positive heart rate values', () => {
    expect(() => calculateRestingHeartRate(0)).toThrow('Resting heart rate must be greater than 0');
    expect(() => calculateRestingHeartRate(-10)).toThrow(
      'Resting heart rate must be greater than 0'
    );
  });

  it('categorizes low resting heart rate as athletic', () => {
    const result = calculateRestingHeartRate(55);
    expect(result.category).toBe('Athletic / Low');
    expect(result.guidance).toContain('well-trained');
  });

  it('categorizes 60-79 bpm as normal', () => {
    const result60 = calculateRestingHeartRate(60);
    const result79 = calculateRestingHeartRate(79);

    expect(result60.category).toBe('Normal');
    expect(result79.category).toBe('Normal');
  });

  it('categorizes 80-100 bpm as elevated', () => {
    const result80 = calculateRestingHeartRate(80);
    const result100 = calculateRestingHeartRate(100);

    expect(result80.category).toBe('Elevated');
    expect(result100.category).toBe('Elevated');
    expect(result80.guidance).toContain('Elevated resting rates');
  });

  it('categorizes above 100 bpm as high', () => {
    const result = calculateRestingHeartRate(101);
    expect(result.category).toBe('High');
    expect(result.guidance).toContain('healthcare professional');
  });
});
