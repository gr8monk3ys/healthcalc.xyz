import { describe, it, expect } from 'vitest';
import { calculateDueDateByConception } from './dueDateByConception';

describe('Due Date by Conception Calculator', () => {
  it('adds 266 days to conception date', () => {
    const result = calculateDueDateByConception('2025-01-01', '2025-01-10');
    expect(result.dueDate).toBe('2025-09-24');
    expect(result.daysRemaining).toBeGreaterThan(0);
  });
});
