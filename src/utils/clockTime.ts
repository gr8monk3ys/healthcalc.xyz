/** Splits "HH:MM" into numbers; a missing part is NaN, matching `Number(undefined)`. */
export function parseClockTime(time: string): { hours: number; minutes: number } {
  const [hours, minutes] = time.split(':');
  return { hours: Number(hours), minutes: Number(minutes) };
}
