import { describe, it, expect } from 'vitest';
import { calculatePregnancyDueDate } from './pregnancyDueDate';

describe('Pregnancy Due Date Calculator', () => {
  it('adds 280 days to LMP (Naegele rule)', () => {
    // Jan 1, 2025 + 280 days = day 281 of 2025 = Oct 8, 2025
    const result = calculatePregnancyDueDate('2025-01-01', 'lmp');
    expect(result.dueDate).toBe('October 8, 2025');
    expect(result.method).toBe('lmp');
    expect(result.inputDate).toBe('2025-01-01');
  });

  it('adds 266 days to conception date', () => {
    // Jan 1, 2025 + 266 days = day 267 of 2025 = Sep 24, 2025
    const result = calculatePregnancyDueDate('2025-01-01', 'conception');
    expect(result.dueDate).toBe('September 24, 2025');
    // Gestational weeks are only reported for the LMP method
    expect(result.gestationalWeeks).toBeUndefined();
  });

  it('computes trimester milestones from the base date', () => {
    // first trimester end = Jan 1 + 13×7 = 91 days → Apr 2, 2025
    // second trimester end = Jan 1 + 27×7 = 189 days → Jul 9, 2025
    // third trimester start = Jan 1 + 28×7 = 196 days → Jul 16, 2025
    const result = calculatePregnancyDueDate('2025-01-01', 'lmp');
    expect(result.milestones.firstTrimesterEnd).toBe('April 2, 2025');
    expect(result.milestones.secondTrimesterEnd).toBe('July 9, 2025');
    expect(result.milestones.thirdTrimesterStart).toBe('July 16, 2025');
  });

  it('reports non-negative gestational weeks for the LMP method', () => {
    // Exact value depends on the current date, so only assert shape and floor
    const result = calculatePregnancyDueDate('2025-01-01', 'lmp');
    expect(typeof result.gestationalWeeks).toBe('number');
    expect(result.gestationalWeeks).toBeGreaterThanOrEqual(0);
  });

  it('throws on an invalid date string', () => {
    expect(() => calculatePregnancyDueDate('not-a-date', 'lmp')).toThrow('Invalid date');
    expect(() => calculatePregnancyDueDate('', 'conception')).toThrow('Invalid date');
  });
});
