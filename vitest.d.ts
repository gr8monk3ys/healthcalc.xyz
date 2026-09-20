// jest-dom's own `@testing-library/jest-dom/vitest` augmentation still declares
// `Assertion<T>` with one type parameter; vitest 5 declares `Assertion<R, T>`,
// so it no longer reaches expect(). Vitest's `Matchers<R, T>` is the supported
// extension point, so the matchers are attached there instead.
import 'vitest';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
  interface Matchers<R = void | Promise<void>, T = unknown> extends TestingLibraryMatchers<
    unknown,
    R
  > {}
}
