interface MetricDistribution {
  mean: number;
  sd: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Population-level approximations used for report percentile context.
// These are intentionally coarse and labeled as estimates in the UI.
const METRIC_DISTRIBUTIONS: Record<string, MetricDistribution> = {
  bmi: { mean: 27.5, sd: 4.6 },
  'body-fat': { mean: 25, sd: 9 },
  tdee: { mean: 2200, sd: 450 },
  bmr: { mean: 1600, sd: 300 },
  'calorie-deficit': { mean: 1900, sd: 350 },
  macro: { mean: 2200, sd: 400 },
  protein: { mean: 120, sd: 40 },
  ffmi: { mean: 20, sd: 2.5 },
  'ideal-weight': { mean: 75, sd: 15 },
  'max-heart-rate': { mean: 180, sd: 15 },
  'vo2-max': { mean: 38, sd: 10 },
  'water-intake': { mean: 2600, sd: 900 },
  'lean-body-mass': { mean: 55, sd: 12 },
  'blood-pressure': { mean: 120, sd: 15 },
  'resting-heart-rate': { mean: 70, sd: 12 },
};

/**
 * Approximate the standard normal cumulative distribution function.
 * Abramowitz and Stegun approximation.
 */
function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  let prob =
    d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) prob = 1 - prob;
  return prob;
}

/**
 * Returns an estimated percentile rank (1-99) for a metric value, or undefined
 * when no distribution model is defined for the calculator slug.
 */
export function estimateMetricPercentile(
  calculatorSlug: string,
  value: number
): number | undefined {
  const distribution = METRIC_DISTRIBUTIONS[calculatorSlug];
  if (!distribution) return undefined;

  const z = (value - distribution.mean) / distribution.sd;
  const percentile = Math.round(normalCdf(z) * 100);
  return clamp(percentile, 1, 99);
}
