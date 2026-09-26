/**
 * Locale-aware number/date formatting for display.
 *
 * The site renders English only (`<html lang="en">`), so formatting is pinned
 * to en-US: the server render and the browser then agree regardless of the
 * visitor's OS locale (no hydration mismatch), and thousands separators and
 * decimals come from Intl instead of hand-rolled toFixed()/string building.
 * Formatter instances are cached; constructing Intl objects is not free.
 */
const DISPLAY_LOCALE = 'en-US';

const numberFormatCache = new Map<string, Intl.NumberFormat>();
const dateFormatCache = new Map<string, Intl.DateTimeFormat>();

function getNumberFormat(options: Intl.NumberFormatOptions): Intl.NumberFormat {
  const key = JSON.stringify(options);
  let format = numberFormatCache.get(key);
  if (!format) {
    format = new Intl.NumberFormat(DISPLAY_LOCALE, options);
    numberFormatCache.set(key, format);
  }
  return format;
}

/**
 * Format a number for display.
 * @param fractionDigits exact number of decimals (like toFixed); omit for up
 *   to 3 decimals (like toLocaleString()).
 */
export function formatNumber(value: number, fractionDigits?: number): string {
  return getNumberFormat(
    fractionDigits === undefined
      ? { maximumFractionDigits: 3 }
      : { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }
  ).format(value);
}

/** Format a US-dollar amount, e.g. 1234.5 -> "$1,235" (whole dollars by default). */
export function formatCurrency(value: number, fractionDigits = 0): string {
  return getNumberFormat({
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

/** Format a date (Date or ISO string) for display with Intl.DateTimeFormat. */
export function formatDisplayDate(
  value: Date | string,
  options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
): string {
  const key = JSON.stringify(options);
  let format = dateFormatCache.get(key);
  if (!format) {
    format = new Intl.DateTimeFormat(DISPLAY_LOCALE, options);
    dateFormatCache.set(key, format);
  }
  return format.format(typeof value === 'string' ? new Date(value) : value);
}

const ordinalRules = new Intl.PluralRules(DISPLAY_LOCALE, { type: 'ordinal' });
const ORDINAL_SUFFIX: Record<Intl.LDMLPluralRule, string> = {
  zero: 'th',
  one: 'st',
  two: 'nd',
  few: 'rd',
  many: 'th',
  other: 'th',
};

/** 1 -> "1st", 22 -> "22nd", 23 -> "23rd", 11 -> "11th". */
export function formatOrdinal(value: number): string {
  return `${formatNumber(value, 0)}${ORDINAL_SUFFIX[ordinalRules.select(value)]}`;
}
