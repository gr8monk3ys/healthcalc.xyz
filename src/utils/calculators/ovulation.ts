import type { OvulationResult } from '@/types/ovulation';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

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

export function calculateOvulation(lastPeriodDate: string, cycleLength: number): OvulationResult {
  const lmp = parseDate(lastPeriodDate);
  const ovulationOffset = cycleLength - 14;
  const ovulationDate = addDays(lmp, ovulationOffset);
  const fertileWindowStart = addDays(ovulationDate, -5);
  const fertileWindowEnd = ovulationDate;
  const nextPeriodDate = addDays(lmp, cycleLength);

  return {
    lastPeriodDate,
    cycleLength,
    ovulationDate: formatDate(ovulationDate),
    fertileWindowStart: formatDate(fertileWindowStart),
    fertileWindowEnd: formatDate(fertileWindowEnd),
    nextPeriodDate: formatDate(nextPeriodDate),
  };
}
