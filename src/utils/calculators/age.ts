import type { AgeResult } from '@/types/age';

function parseDate(dateString: string): Date {
  return new Date(`${dateString}T00:00:00`);
}

function daysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function calculateAge(birthDate: string, referenceDate?: string): AgeResult {
  if (!birthDate) {
    throw new Error('Birth date is required');
  }

  const birth = parseDate(birthDate);
  const ref = referenceDate ? parseDate(referenceDate) : new Date();

  if (Number.isNaN(birth.getTime()) || Number.isNaN(ref.getTime())) {
    throw new Error('Invalid date');
  }

  if (ref < birth) {
    throw new Error('Reference date must be after birth date');
  }

  let years = ref.getFullYear() - birth.getFullYear();
  let months = ref.getMonth() - birth.getMonth();
  let days = ref.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthIndex = (ref.getMonth() - 1 + 12) % 12;
    const prevMonthYear = prevMonthIndex === 11 ? ref.getFullYear() - 1 : ref.getFullYear();
    days += daysInMonth(prevMonthYear, prevMonthIndex);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((ref.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays,
  };
}
