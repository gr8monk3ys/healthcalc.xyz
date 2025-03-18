import type { DueDateByConceptionResult } from '@/types/dueDateByConception';

function parseDate(dateString: string): Date {
  return new Date(`${dateString}T00:00:00`);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateDueDateByConception(
  conceptionDate: string,
  referenceDate?: string
): DueDateByConceptionResult {
  if (!conceptionDate) {
    throw new Error('Conception date is required');
  }

  const conception = parseDate(conceptionDate);
  if (Number.isNaN(conception.getTime())) {
    throw new Error('Invalid conception date');
  }

  const dueDate = new Date(conception);
  dueDate.setDate(dueDate.getDate() + 266);

  const reference = referenceDate ? parseDate(referenceDate) : new Date();
  const daysRemaining = Number.isNaN(reference.getTime())
    ? null
    : Math.ceil((dueDate.getTime() - reference.getTime()) / (1000 * 60 * 60 * 24));

  return {
    conceptionDate,
    dueDate: dueDate.toISOString().slice(0, 10),
    dueDateFormatted: formatDate(dueDate),
    daysRemaining: Number.isFinite(daysRemaining) ? daysRemaining : null,
  };
}
