import { describe, it, expect } from 'vitest';
import { calculateOvulation } from './ovulation';

describe('Ovulation Calculator', () => {
  it('calculates ovulation 14 days before the next period for a 28-day cycle', () => {
    // ovulation = LMP + (28 − 14) = Jan 1 + 14 days = Jan 15
    // fertile window = ovulation − 5 days → Jan 10 through Jan 15
    // next period = LMP + 28 days = Jan 29
    const result = calculateOvulation('2025-01-01', 28);
    expect(result.ovulationDate).toBe('January 15, 2025');
    expect(result.fertileWindowStart).toBe('January 10, 2025');
    expect(result.fertileWindowEnd).toBe('January 15, 2025');
    expect(result.nextPeriodDate).toBe('January 29, 2025');
  });

  it('shifts ovulation later for a longer 30-day cycle', () => {
    // ovulation = Jan 1 + (30 − 14) = Jan 17; fertile window Jan 12–17; next period Jan 31
    const result = calculateOvulation('2025-01-01', 30);
    expect(result.ovulationDate).toBe('January 17, 2025');
    expect(result.fertileWindowStart).toBe('January 12, 2025');
    expect(result.fertileWindowEnd).toBe('January 17, 2025');
    expect(result.nextPeriodDate).toBe('January 31, 2025');
  });

  it('shifts ovulation earlier for a shorter 21-day cycle', () => {
    // ovulation = Jan 1 + (21 − 14) = Jan 8; fertile window Jan 3–8; next period Jan 22
    const result = calculateOvulation('2025-01-01', 21);
    expect(result.ovulationDate).toBe('January 8, 2025');
    expect(result.fertileWindowStart).toBe('January 3, 2025');
    expect(result.nextPeriodDate).toBe('January 22, 2025');
  });

  it('echoes the inputs back in the result', () => {
    const result = calculateOvulation('2025-01-01', 28);
    expect(result.lastPeriodDate).toBe('2025-01-01');
    expect(result.cycleLength).toBe(28);
  });

  it('throws on an invalid date string', () => {
    expect(() => calculateOvulation('not-a-date', 28)).toThrow('Invalid date');
    expect(() => calculateOvulation('', 28)).toThrow('Invalid date');
  });
});
