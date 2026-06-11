/**
 * Mifflin-St Jeor BMR as a vanilla-JS snippet for embed calculation scripts.
 *
 * The embed widgets run entirely client-side inside an iframe, so they cannot
 * import `calculateBMR` from `@/utils/calculators/tdee` directly. This snippet
 * is the single place the formula appears in embed code; a drift test in
 * `route.test.ts` evaluates it against the TypeScript implementation so the
 * two can never silently diverge.
 *
 * Expects `gender`, `age`, `height` (cm), and `weight` (kg) variables in
 * scope; declares `var bmr`.
 */
export const MIFFLIN_BMR_JS = `
        var bmr;
        if (gender === 'male') {
          bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
          bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }`;
