export interface CalculatorMetricDef {
  key: string;
  label: string;
  unit?: string;
  category: 'body' | 'energy' | 'nutrition' | 'fitness' | 'wellness';
  higherIsBetter?: boolean;
  healthyRange?: { min: number; max: number };
}

/**
 * Maps each calculator type (SavedResult.calculatorType) to its primary
 * display metric. Only calculators with a clear single numeric output are
 * included — the dashboard gracefully omits unlisted types.
 */
export const CALCULATOR_METRICS: Record<string, CalculatorMetricDef> = {
  bmi: {
    key: 'bmi',
    label: 'BMI',
    category: 'body',
    higherIsBetter: false,
    healthyRange: { min: 18.5, max: 24.9 },
  },
  'body-fat': {
    key: 'bodyFatPercentage',
    label: 'Body Fat',
    unit: '%',
    category: 'body',
    higherIsBetter: false,
  },
  tdee: {
    key: 'tdee',
    label: 'TDEE',
    unit: 'kcal',
    category: 'energy',
    higherIsBetter: undefined,
  },
  bmr: {
    key: 'bmr',
    label: 'BMR',
    unit: 'kcal',
    category: 'energy',
    higherIsBetter: undefined,
  },
  'calorie-deficit': {
    key: 'dailyCalories',
    label: 'Calorie Target',
    unit: 'kcal',
    category: 'energy',
    higherIsBetter: undefined,
  },
  macro: {
    key: 'calories',
    label: 'Calories',
    unit: 'kcal',
    category: 'nutrition',
    higherIsBetter: undefined,
  },
  protein: {
    key: 'dailyProtein',
    label: 'Protein',
    unit: 'g',
    category: 'nutrition',
    higherIsBetter: undefined,
  },
  ffmi: {
    key: 'ffmi',
    label: 'FFMI',
    category: 'body',
    higherIsBetter: true,
  },
  'ideal-weight': {
    key: 'idealWeight',
    label: 'Ideal Weight',
    unit: 'kg',
    category: 'body',
    higherIsBetter: undefined,
  },
  'max-heart-rate': {
    key: 'maxHeartRate',
    label: 'Max HR',
    unit: 'bpm',
    category: 'fitness',
    higherIsBetter: undefined,
  },
  'vo2-max': {
    key: 'vo2Max',
    label: 'VO2 Max',
    unit: 'ml/kg/min',
    category: 'fitness',
    higherIsBetter: true,
  },
  'water-intake': {
    key: 'dailyWaterIntake',
    label: 'Water Intake',
    unit: 'ml',
    category: 'wellness',
    higherIsBetter: undefined,
  },
  'lean-body-mass': {
    key: 'leanBodyMass',
    label: 'Lean Mass',
    unit: 'kg',
    category: 'body',
    higherIsBetter: true,
  },
  'blood-pressure': {
    key: 'systolic',
    label: 'Systolic BP',
    unit: 'mmHg',
    category: 'wellness',
    higherIsBetter: false,
    healthyRange: { min: 90, max: 120 },
  },
  'resting-heart-rate': {
    key: 'restingHeartRate',
    label: 'Resting HR',
    unit: 'bpm',
    category: 'fitness',
    higherIsBetter: false,
    healthyRange: { min: 50, max: 80 },
  },
};

/**
 * Extract the primary numeric metric value from a saved result's data object.
 * Returns undefined if the metric key is not found or not numeric.
 */
export function extractMetricValue(
  calculatorType: string,
  data: Record<string, unknown>
): number | undefined {
  const def = CALCULATOR_METRICS[calculatorType];
  if (!def) return undefined;

  const raw = data[def.key];
  if (typeof raw === 'number' && isFinite(raw)) return raw;
  if (typeof raw === 'string') {
    const parsed = parseFloat(raw);
    if (isFinite(parsed)) return parsed;
  }
  return undefined;
}
