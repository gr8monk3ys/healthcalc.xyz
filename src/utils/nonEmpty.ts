/** A list the type system knows has at least one element, so `[0]` is never undefined. */
export type NonEmptyArray<T> = readonly [T, ...T[]];

export function lastOf<T>(items: NonEmptyArray<T>): T {
  const [first, ...rest] = items;
  return rest.at(-1) ?? first;
}
