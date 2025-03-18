import { describe, it, expect, vi, afterEach } from 'vitest';
import { calculateAge } from './age';

describe('Age Calculator', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('calculates years, months, and days for exact anniversaries', () => {
    const result = calculateAge('2000-01-01', '2025-01-01');
    expect(result.years).toBe(25);
    expect(result.months).toBe(0);
    expect(result.days).toBe(0);
    expect(result.totalDays).toBeGreaterThan(9000);
  });

  it('handles month and day borrowing correctly', () => {
    const result = calculateAge('2000-12-31', '2025-01-01');
    expect(result.years).toBe(24);
    expect(result.months).toBe(0);
    expect(result.days).toBe(1);
  });

  it('handles leap-day birthdays consistently', () => {
    const result = calculateAge('2004-02-29', '2025-02-28');
    expect(result.years).toBe(20);
    expect(result.months).toBe(11);
    expect(result.days).toBe(30);
  });

  it('uses current date when reference date is omitted', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-15T00:00:00'));

    const result = calculateAge('2000-03-14');
    expect(result.years).toBe(25);
    expect(result.months).toBe(0);
    expect(result.days).toBe(1);
  });

  it('throws when birth date is missing', () => {
    expect(() => calculateAge('')).toThrow('Birth date is required');
  });

  it('throws when birth date is invalid', () => {
    expect(() => calculateAge('not-a-date', '2025-01-01')).toThrow('Invalid date');
  });

  it('throws when reference date is before birth date', () => {
    expect(() => calculateAge('2025-01-01', '2024-12-31')).toThrow(
      'Reference date must be after birth date'
    );
  });
});
