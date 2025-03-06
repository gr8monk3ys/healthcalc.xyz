export interface ChainStep {
  slug: string;
  label: string;
  description: string;
  /** Canonical field names this step can read from / produce into sharedData */
  sharedFields: string[];
}

export interface CalculatorChain {
  id: string;
  name: string;
  description: string;
  steps: ChainStep[];
}

export const CALCULATOR_CHAINS: CalculatorChain[] = [
  {
    id: 'weight-loss-journey',
    name: 'Weight Loss Journey',
    description: 'Assess your body, calculate energy needs, and build a deficit plan.',
    steps: [
      {
        slug: 'bmi',
        label: 'Assess',
        description: 'Find your starting BMI and weight category.',
        sharedFields: ['age', 'gender', 'height', 'weight'],
      },
      {
        slug: 'body-fat',
        label: 'Composition',
        description: 'Estimate body fat percentage for a fuller picture.',
        sharedFields: ['age', 'gender', 'height', 'weight'],
      },
      {
        slug: 'tdee',
        label: 'Energy',
        description: 'Calculate how many calories you burn each day.',
        sharedFields: ['age', 'gender', 'height', 'weight', 'activityLevel'],
      },
      {
        slug: 'calorie-deficit',
        label: 'Deficit',
        description: 'Set a sustainable calorie deficit for your goal.',
        sharedFields: ['age', 'gender', 'height', 'weight', 'activityLevel'],
      },
      {
        slug: 'macro',
        label: 'Macros',
        description: 'Split your calories into protein, carbs, and fat.',
        sharedFields: ['age', 'gender', 'height', 'weight', 'activityLevel'],
      },
    ],
  },
  {
    id: 'body-composition-deep-dive',
    name: 'Body Composition Deep Dive',
    description: 'Understand your body shape, fat-free mass, and ideal weight targets.',
    steps: [
      {
        slug: 'bmi',
        label: 'BMI',
        description: 'Start with your body mass index baseline.',
        sharedFields: ['age', 'gender', 'height', 'weight'],
      },
      {
        slug: 'body-fat',
        label: 'Body Fat',
        description: 'Estimate your body fat percentage.',
        sharedFields: ['age', 'gender', 'height', 'weight'],
      },
      {
        slug: 'ffmi',
        label: 'FFMI',
        description: 'Assess muscular development relative to height.',
        sharedFields: ['height', 'weight', 'bodyFatPercentage'],
      },
      {
        slug: 'ideal-weight',
        label: 'Ideal Weight',
        description: 'Find your recommended weight range.',
        sharedFields: ['gender', 'height'],
      },
    ],
  },
  {
    id: 'fitness-baseline',
    name: 'Fitness Baseline',
    description: 'Establish your cardio fitness metrics: heart rate and VO2 max.',
    steps: [
      {
        slug: 'max-heart-rate',
        label: 'Max HR',
        description: 'Estimate your maximum heart rate.',
        sharedFields: ['age'],
      },
      {
        slug: 'heart-rate-zones',
        label: 'HR Zones',
        description: 'Calculate your training heart rate zones.',
        sharedFields: ['age', 'restingHeartRate', 'maxHeartRate'],
      },
      {
        slug: 'vo2-max',
        label: 'VO2 Max',
        description: 'Estimate your aerobic fitness level.',
        sharedFields: ['age', 'gender', 'weight'],
      },
    ],
  },
  {
    id: 'nutrition-planning',
    name: 'Nutrition Planning',
    description: 'Calculate calories, set macro splits, and plan hydration.',
    steps: [
      {
        slug: 'tdee',
        label: 'Calories',
        description: 'Find your total daily energy expenditure.',
        sharedFields: ['age', 'gender', 'height', 'weight', 'activityLevel'],
      },
      {
        slug: 'macro',
        label: 'Macros',
        description: 'Break calories into protein, carbs, and fat.',
        sharedFields: ['age', 'gender', 'height', 'weight', 'activityLevel'],
      },
      {
        slug: 'protein',
        label: 'Protein',
        description: 'Dial in your daily protein target.',
        sharedFields: ['weight', 'activityLevel'],
      },
      {
        slug: 'water-intake',
        label: 'Hydration',
        description: 'Set a daily hydration goal.',
        sharedFields: ['weight', 'activityLevel'],
      },
    ],
  },
];

/** Look up a chain by its ID. */
export function getChainById(chainId: string): CalculatorChain | undefined {
  return CALCULATOR_CHAINS.find(c => c.id === chainId);
}

/** Get all chains that include a given calculator slug. */
export function getChainsForCalculator(slug: string): CalculatorChain[] {
  return CALCULATOR_CHAINS.filter(c => c.steps.some(s => s.slug === slug));
}

/** Get the set of all calculator slugs that participate in at least one chain. */
export function getChainCalculatorSlugs(): Set<string> {
  const slugs = new Set<string>();
  for (const chain of CALCULATOR_CHAINS) {
    for (const step of chain.steps) {
      slugs.add(step.slug);
    }
  }
  return slugs;
}
