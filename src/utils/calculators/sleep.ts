import type { SleepMode, SleepResult, SleepTimeRecommendation } from '@/types/sleep';

const SLEEP_CYCLE_MINUTES = 90;
const FALL_ASLEEP_BUFFER_MINUTES = 15;
const CYCLE_OPTIONS = [6, 5, 4, 3];

function parseTime(value: string): number | null {
  if (!/^\d{2}:\d{2}$/.test(value)) return null;
  const [hours, minutes] = value.split(':').map(Number);
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  return hours * 60 + minutes;
}

function formatTime(totalMinutes: number): string {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function buildRecommendations(baseMinutes: number, mode: SleepMode): SleepTimeRecommendation[] {
  return CYCLE_OPTIONS.map(cycles => {
    const totalSleepMinutes = cycles * SLEEP_CYCLE_MINUTES + FALL_ASLEEP_BUFFER_MINUTES;
    const targetMinutes =
      mode === 'wake' ? baseMinutes - totalSleepMinutes : baseMinutes + totalSleepMinutes;

    return {
      cycles,
      time: formatTime(targetMinutes),
      hours: Number((cycles * 1.5).toFixed(1)),
    };
  });
}

export function calculateSleepTimes(inputTime: string, mode: SleepMode): SleepResult {
  const baseMinutes = parseTime(inputTime);
  if (baseMinutes === null) {
    throw new Error('Invalid time format');
  }

  const recommendations = buildRecommendations(baseMinutes, mode);
  const note =
    mode === 'wake'
      ? 'Bedtimes include 15 minutes to fall asleep.'
      : 'Wake times include 15 minutes to fall asleep before the first sleep cycle.';

  return {
    mode,
    inputTime,
    recommendations,
    note,
  };
}
