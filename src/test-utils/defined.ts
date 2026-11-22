/** Narrows an indexed or optional value in a test, failing with a clear message when it is missing. */
export function defined<T>(value: T | undefined, what = 'value'): T {
  if (value === undefined) {
    throw new Error(`Expected ${what} to be defined`);
  }
  return value;
}
