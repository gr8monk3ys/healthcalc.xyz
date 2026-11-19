/** The gauge's segments and its marker share this one BMI domain. */
export const BMI_GAUGE_SEGMENTS = [
  { key: 'underweight', from: 10, to: 18.5 },
  { key: 'normal', from: 18.5, to: 25 },
  { key: 'overweight', from: 25, to: 30 },
  { key: 'obese', from: 30, to: 40 },
] as const;

export type BMIGaugeSegmentKey = (typeof BMI_GAUGE_SEGMENTS)[number]['key'];

export interface BMIGaugePosition {
  segment: BMIGaugeSegmentKey;
  /** How far through its segment the BMI sits, 0-100. */
  offset: number;
}

/**
 * Locates a BMI on the gauge. A boundary value belongs to the upper segment,
 * and values off either end pin to the nearest edge.
 */
export function getBMIGaugePosition(bmi: number): BMIGaugePosition {
  const segment =
    BMI_GAUGE_SEGMENTS.find(candidate => bmi < candidate.to) ??
    BMI_GAUGE_SEGMENTS[BMI_GAUGE_SEGMENTS.length - 1];
  const offset = ((bmi - segment.from) / (segment.to - segment.from)) * 100;

  return { segment: segment.key, offset: Math.min(Math.max(offset, 0), 100) };
}
