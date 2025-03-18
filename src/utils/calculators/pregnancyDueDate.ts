import type { PregnancyDueDateMethod, PregnancyDueDateResult } from '@/types/pregnancyDueDate';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const LMP_DUE_DAYS = 280;
const CONCEPTION_DUE_DAYS = 266;

function parseDate(value: string): Date {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return date;
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function calculateGestationalWeeks(lmpDate: Date): number {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - lmpDate.getTime()) / MS_PER_DAY);
  return Math.max(0, Math.round(diffDays / 7));
}

export function calculatePregnancyDueDate(
  inputDate: string,
  method: PregnancyDueDateMethod
): PregnancyDueDateResult {
  const baseDate = parseDate(inputDate);
  const dueDays = method === 'lmp' ? LMP_DUE_DAYS : CONCEPTION_DUE_DAYS;
  const dueDate = addDays(baseDate, dueDays);

  const firstTrimesterEnd = addDays(baseDate, 13 * 7);
  const secondTrimesterEnd = addDays(baseDate, 27 * 7);
  const thirdTrimesterStart = addDays(baseDate, 28 * 7);

  return {
    method,
    inputDate,
    dueDate: formatDate(dueDate),
    gestationalWeeks: method === 'lmp' ? calculateGestationalWeeks(baseDate) : undefined,
    milestones: {
      firstTrimesterEnd: formatDate(firstTrimesterEnd),
      secondTrimesterEnd: formatDate(secondTrimesterEnd),
      thirdTrimesterStart: formatDate(thirdTrimesterStart),
    },
  };
}
