import { Gender } from '@/types/common';
import { calculateBMI, calculateHealthyWeightRange, getBMICategory } from '@/utils/calculators/bmi';
import { calculateBMR, calculateTDEE } from '@/utils/calculators/tdee';
import { calculateCalorieDeficit } from '@/utils/calculators/calorieDeficit';
import { calculateBMIMethodBodyFat, getBodyFatCategory } from '@/utils/calculators/bodyFat';
import { calculateMacros } from '@/utils/calculators/macro';

const LB_TO_KG = 0.45359237;
const KG_TO_LB = 1 / LB_TO_KG;
const IN_TO_CM = 2.54;

const PROGRAMMATIC_AGES = [18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70] as const;
const PROGRAMMATIC_WEIGHTS_LB = buildRange(100, 300, 10);
const PROGRAMMATIC_HEIGHTS_IN = buildRange(58, 76, 2);
const PROGRAMMATIC_MACRO_CALORIES = buildRange(1400, 3200, 200);

const GENDERS: ReadonlyArray<Gender> = ['male', 'female'];

const GENDER_LABEL: Record<Gender, string> = {
  male: 'Male',
  female: 'Female',
};

const BMI_REFERENCE_BY_GENDER: Record<
  Gender,
  Array<{ label: string; minAge: number; maxAge: number; averageBmi: number }>
> = {
  male: [
    { label: '18-29', minAge: 18, maxAge: 29, averageBmi: 26.1 },
    { label: '30-39', minAge: 30, maxAge: 39, averageBmi: 27.4 },
    { label: '40-49', minAge: 40, maxAge: 49, averageBmi: 28.2 },
    { label: '50-59', minAge: 50, maxAge: 59, averageBmi: 28.7 },
    { label: '60-70', minAge: 60, maxAge: 70, averageBmi: 28.1 },
  ],
  female: [
    { label: '18-29', minAge: 18, maxAge: 29, averageBmi: 25.7 },
    { label: '30-39', minAge: 30, maxAge: 39, averageBmi: 27.3 },
    { label: '40-49', minAge: 40, maxAge: 49, averageBmi: 28.4 },
    { label: '50-59', minAge: 50, maxAge: 59, averageBmi: 29.0 },
    { label: '60-70', minAge: 60, maxAge: 70, averageBmi: 28.7 },
  ],
};

const TDEE_REFERENCE_WEIGHTS_BY_GENDER: Record<
  Gender,
  Array<{ label: string; minAge: number; maxAge: number; averageWeightLb: number }>
> = {
  male: [
    { label: '18-29', minAge: 18, maxAge: 29, averageWeightLb: 184 },
    { label: '30-39', minAge: 30, maxAge: 39, averageWeightLb: 194 },
    { label: '40-49', minAge: 40, maxAge: 49, averageWeightLb: 198 },
    { label: '50-59', minAge: 50, maxAge: 59, averageWeightLb: 196 },
    { label: '60-70', minAge: 60, maxAge: 70, averageWeightLb: 190 },
  ],
  female: [
    { label: '18-29', minAge: 18, maxAge: 29, averageWeightLb: 155 },
    { label: '30-39', minAge: 30, maxAge: 39, averageWeightLb: 168 },
    { label: '40-49', minAge: 40, maxAge: 49, averageWeightLb: 176 },
    { label: '50-59', minAge: 50, maxAge: 59, averageWeightLb: 178 },
    { label: '60-70', minAge: 60, maxAge: 70, averageWeightLb: 173 },
  ],
};

const BODY_FAT_REFERENCE_BY_GENDER: Record<
  Gender,
  Array<{
    label: string;
    minAge: number;
    maxAge: number;
    averageBmi: number;
    averageBodyFat: number;
  }>
> = {
  male: [
    { label: '18-29', minAge: 18, maxAge: 29, averageBmi: 25.8, averageBodyFat: 18.5 },
    { label: '30-39', minAge: 30, maxAge: 39, averageBmi: 27.4, averageBodyFat: 21.6 },
    { label: '40-49', minAge: 40, maxAge: 49, averageBmi: 28.3, averageBodyFat: 24.2 },
    { label: '50-59', minAge: 50, maxAge: 59, averageBmi: 28.8, averageBodyFat: 26.2 },
    { label: '60-70', minAge: 60, maxAge: 70, averageBmi: 28.5, averageBodyFat: 27.3 },
  ],
  female: [
    { label: '18-29', minAge: 18, maxAge: 29, averageBmi: 25.3, averageBodyFat: 30.1 },
    { label: '30-39', minAge: 30, maxAge: 39, averageBmi: 27.1, averageBodyFat: 33.1 },
    { label: '40-49', minAge: 40, maxAge: 49, averageBmi: 28.3, averageBodyFat: 35.8 },
    { label: '50-59', minAge: 50, maxAge: 59, averageBmi: 29.0, averageBodyFat: 38.1 },
    { label: '60-70', minAge: 60, maxAge: 70, averageBmi: 28.8, averageBodyFat: 39.0 },
  ],
};

interface ProgrammaticTdeeActivity {
  slug: 'sedentary' | 'moderate' | 'active';
  label: string;
  activityMultiplier: number;
}

const PROGRAMMATIC_TDEE_ACTIVITIES: ReadonlyArray<ProgrammaticTdeeActivity> = [
  { slug: 'sedentary', label: 'Sedentary', activityMultiplier: 1.2 },
  { slug: 'moderate', label: 'Moderately Active', activityMultiplier: 1.55 },
  { slug: 'active', label: 'Active', activityMultiplier: 1.725 },
];

interface ProgrammaticDeficitRate {
  slug: 'mild' | 'moderate' | 'aggressive';
  label: string;
  weeklyLossLabel: string;
}

const PROGRAMMATIC_DEFICIT_RATES: ReadonlyArray<ProgrammaticDeficitRate> = [
  { slug: 'mild', label: 'Mild', weeklyLossLabel: '~0.8 lb/week' },
  { slug: 'moderate', label: 'Moderate', weeklyLossLabel: '~1.4 lb/week' },
  { slug: 'aggressive', label: 'Aggressive', weeklyLossLabel: '~1.9 lb/week' },
];

interface ProgrammaticMacroGoal {
  slug: 'weight-loss' | 'maintenance' | 'muscle-gain';
  label: string;
  averageCalories: number;
  calorieSd: number;
}

const PROGRAMMATIC_MACRO_GOALS: ReadonlyArray<ProgrammaticMacroGoal> = [
  { slug: 'weight-loss', label: 'Weight Loss', averageCalories: 1800, calorieSd: 250 },
  { slug: 'maintenance', label: 'Maintenance', averageCalories: 2200, calorieSd: 300 },
  { slug: 'muscle-gain', label: 'Muscle Gain', averageCalories: 2700, calorieSd: 350 },
];

interface ProgrammaticMacroDiet {
  slug: 'balanced' | 'high-protein' | 'lower-carb' | 'higher-carb';
  label: string;
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
  description: string;
}

const PROGRAMMATIC_MACRO_DIETS: ReadonlyArray<ProgrammaticMacroDiet> = [
  {
    slug: 'balanced',
    label: 'Balanced',
    proteinPercent: 30,
    carbsPercent: 40,
    fatPercent: 30,
    description: 'Even distribution for general performance and adherence.',
  },
  {
    slug: 'high-protein',
    label: 'High Protein',
    proteinPercent: 40,
    carbsPercent: 30,
    fatPercent: 30,
    description: 'Higher protein to support satiety and lean-mass retention.',
  },
  {
    slug: 'lower-carb',
    label: 'Lower Carb',
    proteinPercent: 35,
    carbsPercent: 25,
    fatPercent: 40,
    description: 'Lower carb with higher fats for steadier appetite control.',
  },
  {
    slug: 'higher-carb',
    label: 'Higher Carb',
    proteinPercent: 25,
    carbsPercent: 50,
    fatPercent: 25,
    description: 'Carb-forward split for high training volume and glycolytic work.',
  },
];

const TDEE_REFERENCE_HEIGHT_CM: Record<Gender, number> = {
  male: 175,
  female: 162,
};

interface CalorieDeficitReferenceProfile {
  age: number;
  heightCm: number;
  activityLevel: 'moderately_active';
}

const CALORIE_DEFICIT_REFERENCE_BY_GENDER: Record<Gender, CalorieDeficitReferenceProfile> = {
  male: {
    age: 35,
    heightCm: 178,
    activityLevel: 'moderately_active',
  },
  female: {
    age: 35,
    heightCm: 165,
    activityLevel: 'moderately_active',
  },
};

export interface ProgrammaticTableColumn {
  key: string;
  label: string;
  align?: 'left' | 'right';
}

export interface ProgrammaticFaq {
  question: string;
  answer: string;
}

export interface ProgrammaticRelatedPage {
  title: string;
  href: string;
}

export interface ProgrammaticBreadcrumb {
  label: string;
  href?: string;
}

export interface ProgrammaticPageData {
  canonicalPath: string;
  metadataTitle: string;
  metadataDescription: string;
  ogImage: string;
  breadcrumbs: ProgrammaticBreadcrumb[];
  pageTitle: string;
  intro: string;
  heroValue: string;
  heroLabel: string;
  heroSummary: string;
  percentileText: string;
  comparisonTitle: string;
  comparisonDescription: string;
  comparisonColumns: ProgrammaticTableColumn[];
  comparisonRows: Array<Record<string, string>>;
  contextHeading: string;
  contextParagraphs: string[];
  faq: ProgrammaticFaq[];
  relatedPages: ProgrammaticRelatedPage[];
  cta: {
    label: string;
    href: string;
    description: string;
  };
}

export interface BmiResultSlugParams {
  heightIn: number;
  weightLb: number;
  gender: Gender;
}

export interface TdeeResultSlugParams {
  age: number;
  gender: Gender;
  weightLb: number;
  activity: ProgrammaticTdeeActivity['slug'];
}

export interface CalorieDeficitResultSlugParams {
  weightLb: number;
  gender: Gender;
  rate: ProgrammaticDeficitRate['slug'];
}

export interface BodyFatResultSlugParams {
  age: number;
  gender: Gender;
  method: 'bmi';
}

export interface MacroResultSlugParams {
  calories: number;
  goal: ProgrammaticMacroGoal['slug'];
  diet: ProgrammaticMacroDiet['slug'];
}

function buildRange(start: number, end: number, step: number): number[] {
  const values: number[] = [];
  for (let current = start; current <= end; current += step) {
    values.push(current);
  }
  return values;
}

function toKg(weightLb: number): number {
  return weightLb * LB_TO_KG;
}

function toLb(weightKg: number): number {
  return weightKg * KG_TO_LB;
}

function toCm(heightIn: number): number {
  return heightIn * IN_TO_CM;
}

function toPercentile(value: number, mean: number, sd: number): number {
  const z = (value - mean) / sd;
  const percentile = normalCdf(z) * 100;
  return clamp(Math.round(percentile), 1, 99);
}

function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const absoluteX = Math.abs(x);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1 / (1 + p * absoluteX);
  const y =
    1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absoluteX * absoluteX);

  return sign * y;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

function formatSigned(value: number, digits = 1): string {
  const rounded = Number(value.toFixed(digits));
  const sign = rounded > 0 ? '+' : '';
  return `${sign}${rounded.toFixed(digits)}`;
}

function parseInteger(input: string): number | null {
  if (!/^\d+$/.test(input)) {
    return null;
  }

  const parsed = Number.parseInt(input, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

function isAllowedNumber(value: number, allowed: readonly number[]): boolean {
  return allowed.includes(value);
}

function getAverage(values: number[]): number {
  if (values.length === 0) return 0;
  const total = values.reduce((sum, value) => sum + value, 0);
  return total / values.length;
}

function getAgeBand<T extends { minAge: number; maxAge: number }>(
  age: number,
  bands: readonly T[]
): T {
  const matched = bands.find(band => age >= band.minAge && age <= band.maxAge);
  return matched ?? bands[bands.length - 1];
}

function uniqueBy<T>(items: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  const unique: T[] = [];

  for (const item of items) {
    const key = keyFn(item);
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    unique.push(item);
  }

  return unique;
}

function take<T>(items: T[], limit: number): T[] {
  return items.slice(0, limit);
}

function getTdeeActivity(slug: TdeeResultSlugParams['activity']): ProgrammaticTdeeActivity {
  return (
    PROGRAMMATIC_TDEE_ACTIVITIES.find(activity => activity.slug === slug) ??
    PROGRAMMATIC_TDEE_ACTIVITIES[0]
  );
}

function getDeficitRate(rate: CalorieDeficitResultSlugParams['rate']): ProgrammaticDeficitRate {
  return (
    PROGRAMMATIC_DEFICIT_RATES.find(option => option.slug === rate) ?? PROGRAMMATIC_DEFICIT_RATES[0]
  );
}

function getMacroGoal(goal: MacroResultSlugParams['goal']): ProgrammaticMacroGoal {
  return PROGRAMMATIC_MACRO_GOALS.find(item => item.slug === goal) ?? PROGRAMMATIC_MACRO_GOALS[0];
}

function getMacroDiet(diet: MacroResultSlugParams['diet']): ProgrammaticMacroDiet {
  return PROGRAMMATIC_MACRO_DIETS.find(item => item.slug === diet) ?? PROGRAMMATIC_MACRO_DIETS[0];
}

export function buildBmiResultSlug(params: BmiResultSlugParams): string {
  return `${params.heightIn}-${params.weightLb}-${params.gender}`;
}

export function parseBmiResultSlug(slug: string): BmiResultSlugParams | null {
  const match = /^(\d+)-(\d+)-(male|female)$/.exec(slug);
  if (!match) {
    return null;
  }

  const heightIn = parseInteger(match[1]);
  const weightLb = parseInteger(match[2]);
  const gender = match[3] as Gender;

  if (
    heightIn === null ||
    weightLb === null ||
    !isAllowedNumber(heightIn, PROGRAMMATIC_HEIGHTS_IN) ||
    !isAllowedNumber(weightLb, PROGRAMMATIC_WEIGHTS_LB)
  ) {
    return null;
  }

  return { heightIn, weightLb, gender };
}

export function buildTdeeResultSlug(params: TdeeResultSlugParams): string {
  return `${params.age}-year-old-${params.gender}-${params.weightLb}-lbs-${params.activity}`;
}

export function parseTdeeResultSlug(slug: string): TdeeResultSlugParams | null {
  const match = /^(\d+)-year-old-(male|female)-(\d+)-lbs-(sedentary|moderate|active)$/.exec(slug);
  if (!match) {
    return null;
  }

  const age = parseInteger(match[1]);
  const gender = match[2] as Gender;
  const weightLb = parseInteger(match[3]);
  const activity = match[4] as TdeeResultSlugParams['activity'];

  if (
    age === null ||
    weightLb === null ||
    !isAllowedNumber(age, PROGRAMMATIC_AGES) ||
    !isAllowedNumber(weightLb, PROGRAMMATIC_WEIGHTS_LB)
  ) {
    return null;
  }

  return {
    age,
    gender,
    weightLb,
    activity,
  };
}

export function buildCalorieDeficitResultSlug(params: CalorieDeficitResultSlugParams): string {
  return `${params.weightLb}-lbs-${params.gender}-lose-${params.rate}-per-week`;
}

export function parseCalorieDeficitResultSlug(slug: string): CalorieDeficitResultSlugParams | null {
  const match = /^(\d+)-lbs-(male|female)-lose-(mild|moderate|aggressive)-per-week$/.exec(slug);
  if (!match) {
    return null;
  }

  const weightLb = parseInteger(match[1]);
  const gender = match[2] as Gender;
  const rate = match[3] as CalorieDeficitResultSlugParams['rate'];

  if (weightLb === null || !isAllowedNumber(weightLb, PROGRAMMATIC_WEIGHTS_LB)) {
    return null;
  }

  return {
    weightLb,
    gender,
    rate,
  };
}

export function buildBodyFatResultSlug(params: BodyFatResultSlugParams): string {
  return `${params.age}-year-old-${params.gender}-${params.method}`;
}

export function parseBodyFatResultSlug(slug: string): BodyFatResultSlugParams | null {
  const match = /^(\d+)-year-old-(male|female)-(bmi)$/.exec(slug);
  if (!match) {
    return null;
  }

  const age = parseInteger(match[1]);
  const gender = match[2] as Gender;
  const method = match[3] as BodyFatResultSlugParams['method'];

  if (age === null || !isAllowedNumber(age, PROGRAMMATIC_AGES)) {
    return null;
  }

  return {
    age,
    gender,
    method,
  };
}

export function buildMacroResultSlug(params: MacroResultSlugParams): string {
  return `${params.calories}-calories-${params.goal}-${params.diet}`;
}

export function parseMacroResultSlug(slug: string): MacroResultSlugParams | null {
  const match =
    /^(\d+)-calories-(weight-loss|maintenance|muscle-gain)-(balanced|high-protein|lower-carb|higher-carb)$/.exec(
      slug
    );

  if (!match) {
    return null;
  }

  const calories = parseInteger(match[1]);
  const goal = match[2] as MacroResultSlugParams['goal'];
  const diet = match[3] as MacroResultSlugParams['diet'];

  if (calories === null || !isAllowedNumber(calories, PROGRAMMATIC_MACRO_CALORIES)) {
    return null;
  }

  return {
    calories,
    goal,
    diet,
  };
}

export function getBmiProgrammaticSlugs(): string[] {
  const slugs: string[] = [];

  for (const gender of GENDERS) {
    for (const heightIn of PROGRAMMATIC_HEIGHTS_IN) {
      for (const weightLb of PROGRAMMATIC_WEIGHTS_LB) {
        slugs.push(buildBmiResultSlug({ heightIn, weightLb, gender }));
      }
    }
  }

  return slugs;
}

export function getTdeeProgrammaticSlugs(limit = 500): string[] {
  const scored: Array<{ slug: string; score: number }> = [];

  for (const age of PROGRAMMATIC_AGES) {
    for (const gender of GENDERS) {
      for (const weightLb of PROGRAMMATIC_WEIGHTS_LB) {
        for (const activity of PROGRAMMATIC_TDEE_ACTIVITIES) {
          const referenceHeightIn = gender === 'male' ? 70 : 64;
          const bmi = calculateBMI(toCm(referenceHeightIn), toKg(weightLb));
          const bmiPenalty = Math.abs(bmi - 24);
          const agePenalty = Math.abs(age - 35) / 12;
          const activityPenalty =
            activity.slug === 'moderate' ? 0 : activity.slug === 'active' ? 0.35 : 0.5;
          const score = bmiPenalty + agePenalty + activityPenalty;

          scored.push({
            slug: buildTdeeResultSlug({ age, gender, weightLb, activity: activity.slug }),
            score,
          });
        }
      }
    }
  }

  return scored
    .sort((a, b) => {
      if (a.score !== b.score) {
        return a.score - b.score;
      }
      return a.slug.localeCompare(b.slug);
    })
    .slice(0, limit)
    .map(item => item.slug);
}

export function getCalorieDeficitProgrammaticSlugs(): string[] {
  const slugs: string[] = [];

  for (const weightLb of PROGRAMMATIC_WEIGHTS_LB) {
    for (const gender of GENDERS) {
      for (const rate of PROGRAMMATIC_DEFICIT_RATES) {
        slugs.push(buildCalorieDeficitResultSlug({ weightLb, gender, rate: rate.slug }));
      }
    }
  }

  return slugs;
}

export function getBodyFatProgrammaticSlugs(): string[] {
  const slugs: string[] = [];

  for (const age of PROGRAMMATIC_AGES) {
    for (const gender of GENDERS) {
      slugs.push(buildBodyFatResultSlug({ age, gender, method: 'bmi' }));
    }
  }

  return slugs;
}

export function getMacroProgrammaticSlugs(): string[] {
  const slugs: string[] = [];

  for (const calories of PROGRAMMATIC_MACRO_CALORIES) {
    for (const goal of PROGRAMMATIC_MACRO_GOALS) {
      for (const diet of PROGRAMMATIC_MACRO_DIETS) {
        slugs.push(
          buildMacroResultSlug({
            calories,
            goal: goal.slug,
            diet: diet.slug,
          })
        );
      }
    }
  }

  return slugs;
}

export function getAllProgrammaticPaths(): string[] {
  return [
    ...getBmiProgrammaticSlugs().map(slug => `/bmi/results/${slug}`),
    ...getTdeeProgrammaticSlugs().map(slug => `/tdee/results/${slug}`),
    ...getCalorieDeficitProgrammaticSlugs().map(slug => `/calorie-deficit/results/${slug}`),
    ...getBodyFatProgrammaticSlugs().map(slug => `/body-fat/results/${slug}`),
    ...getMacroProgrammaticSlugs().map(slug => `/macro/results/${slug}`),
  ];
}

export function buildBmiProgrammaticPage(slug: string): ProgrammaticPageData | null {
  const params = parseBmiResultSlug(slug);
  if (!params) {
    return null;
  }

  const { heightIn, weightLb, gender } = params;
  const heightCm = toCm(heightIn);
  const weightKg = toKg(weightLb);
  const bmi = roundToOneDecimal(calculateBMI(heightCm, weightKg));
  const category = getBMICategory(bmi).name;
  const healthyWeightRange = calculateHealthyWeightRange(heightCm);
  const healthyWeightRangeLb = {
    min: Math.round(toLb(healthyWeightRange.min)),
    max: Math.round(toLb(healthyWeightRange.max)),
  };

  const bmiReference = BMI_REFERENCE_BY_GENDER[gender];
  const populationMean = getAverage(bmiReference.map(item => item.averageBmi));
  const percentile = toPercentile(bmi, populationMean, 4.6);

  const relatedPages = uniqueBy(
    [
      { heightIn, weightLb: weightLb - 10, gender },
      { heightIn, weightLb: weightLb + 10, gender },
      { heightIn: heightIn - 2, weightLb, gender },
      { heightIn: heightIn + 2, weightLb, gender },
    ]
      .filter(candidate => parseBmiResultSlug(buildBmiResultSlug(candidate as BmiResultSlugParams)))
      .map(candidate => candidate as BmiResultSlugParams),
    candidate => buildBmiResultSlug(candidate)
  )
    .filter(candidate => buildBmiResultSlug(candidate) !== slug)
    .map(candidate => {
      const relatedSlug = buildBmiResultSlug(candidate);
      return {
        title: `BMI for ${candidate.heightIn}" and ${candidate.weightLb} lb`,
        href: `/bmi/results/${relatedSlug}`,
      };
    });

  return {
    canonicalPath: `/bmi/results/${slug}`,
    metadataTitle: `BMI ${bmi} (${category}) for ${heightIn}" ${weightLb} lb ${GENDER_LABEL[gender]} | HealthCheck`,
    metadataDescription: `Pre-calculated BMI result for ${heightIn}" and ${weightLb} lb (${gender}). See category, percentile estimate, and healthy weight context.`,
    ogImage: '/images/calculators/bmi-calculator.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'BMI Calculator', href: '/bmi' },
      { label: `${heightIn}" / ${weightLb} lb` },
    ],
    pageTitle: `BMI Result for ${heightIn}" and ${weightLb} lb (${GENDER_LABEL[gender]})`,
    intro:
      'This page pre-computes your BMI result using the same equation as the interactive calculator and adds comparison data for broader context.',
    heroValue: bmi.toFixed(1),
    heroLabel: `${category} BMI category`,
    heroSummary: `A BMI of ${bmi.toFixed(1)} is classified as ${category.toLowerCase()} for adults. At this height, the typical healthy-weight range is about ${healthyWeightRangeLb.min}-${healthyWeightRangeLb.max} lb.`,
    percentileText: `Estimated around the ${percentile}th percentile for ${gender} adults in population BMI distributions.`,
    comparisonTitle: `${GENDER_LABEL[gender]} BMI Averages by Age Group`,
    comparisonDescription:
      'The table compares this pre-computed BMI to reference averages across adult age groups.',
    comparisonColumns: [
      { key: 'ageGroup', label: 'Age Group' },
      { key: 'averageBmi', label: 'Avg BMI', align: 'right' },
      { key: 'difference', label: 'Difference', align: 'right' },
      { key: 'position', label: 'Position' },
    ],
    comparisonRows: bmiReference.map(reference => ({
      ageGroup: reference.label,
      averageBmi: reference.averageBmi.toFixed(1),
      difference: formatSigned(bmi - reference.averageBmi, 1),
      position: bmi >= reference.averageBmi ? 'Above average' : 'Below average',
    })),
    contextHeading: 'Health Context for This BMI Range',
    contextParagraphs: getBmiContextParagraphs({
      bmi,
      category,
      healthyWeightRangeLb,
    }),
    faq: [
      {
        question: `Is a BMI of ${bmi.toFixed(1)} considered healthy?`,
        answer: `For adults, BMI categories are standardized. Your result falls in the ${category.toLowerCase()} range. Use this as a screening signal, then pair it with waist and body-fat metrics for better individual context.`,
      },
      {
        question: `What weight range usually maps to a "normal" BMI at ${heightIn}"?`,
        answer: `At ${heightIn}" (about ${Math.round(heightCm)} cm), the normal-BMI band is roughly ${healthyWeightRangeLb.min}-${healthyWeightRangeLb.max} lb.`,
      },
      {
        question: 'Should I use BMI alone to make decisions?',
        answer:
          'BMI is helpful for broad risk stratification, but it does not separate fat from muscle. Combine it with body-fat percentage, waist measurements, and trend data over time.',
      },
    ],
    relatedPages: take(relatedPages, 4),
    cta: {
      label: 'Calculate your exact BMI',
      href: '/bmi',
      description:
        'Use the full BMI calculator to enter your exact stats, switch units, and save results for tracking.',
    },
  };
}

function getBmiContextParagraphs({
  bmi,
  category,
  healthyWeightRangeLb,
}: {
  bmi: number;
  category: string;
  healthyWeightRangeLb: { min: number; max: number };
}): string[] {
  const generic = [
    `BMI is a population-level screening metric, not a diagnosis. A result of ${bmi.toFixed(1)} can be directionally useful, especially when tracked consistently over time.`,
    `For this height, the normal BMI range maps to approximately ${healthyWeightRangeLb.min}-${healthyWeightRangeLb.max} lb. Small changes in weekly habits can move this number gradually without extreme dieting.`,
  ];

  if (category === 'Underweight') {
    return [
      ...generic,
      'If your BMI is persistently underweight, focus on nutrition adequacy, resistance training, and clinical follow-up to rule out underlying causes.',
    ];
  }

  if (category === 'Normal') {
    return [
      ...generic,
      'A normal-range BMI is generally associated with lower cardiometabolic risk. Prioritize consistency in activity, protein intake, and sleep to maintain momentum.',
    ];
  }

  if (category === 'Overweight') {
    return [
      ...generic,
      'A modest 5-10% weight reduction can materially improve blood pressure, blood glucose, and lipid markers for many adults.',
    ];
  }

  return [
    ...generic,
    'In the obese BMI range, structured nutrition planning, activity progression, and medical supervision can significantly improve long-term risk markers.',
  ];
}

export function buildTdeeProgrammaticPage(slug: string): ProgrammaticPageData | null {
  const params = parseTdeeResultSlug(slug);
  if (!params) {
    return null;
  }

  const { age, gender, weightLb, activity } = params;
  const activityOption = getTdeeActivity(activity);
  const referenceHeightCm = TDEE_REFERENCE_HEIGHT_CM[gender];

  const weightKg = toKg(weightLb);
  const bmr = Math.round(calculateBMR(gender, age, weightKg, referenceHeightCm));
  const tdee = Math.round(calculateTDEE(bmr, activityOption.activityMultiplier));

  const ageBands = TDEE_REFERENCE_WEIGHTS_BY_GENDER[gender];
  const currentAgeBand = getAgeBand(age, ageBands);

  const comparisonRows = ageBands.map(reference => {
    const midpointAge = Math.round((reference.minAge + reference.maxAge) / 2);
    const avgBmr = calculateBMR(
      gender,
      midpointAge,
      toKg(reference.averageWeightLb),
      referenceHeightCm
    );
    const avgTdee = Math.round(calculateTDEE(avgBmr, activityOption.activityMultiplier));

    return {
      ageGroup: reference.label,
      averageWeight: `${reference.averageWeightLb} lb`,
      averageTdee: `${avgTdee.toLocaleString()} kcal`,
      difference: `${formatSigned(tdee - avgTdee, 0)} kcal`,
    };
  });

  const currentRow =
    comparisonRows.find(row => row.ageGroup === currentAgeBand.label) ?? comparisonRows[0];
  const currentMeanTdee = Number.parseInt(currentRow.averageTdee.replace(/[^\d]/g, ''), 10);
  const percentile = toPercentile(tdee, currentMeanTdee, 260);

  const relatedCandidates: TdeeResultSlugParams[] = [
    { age: age - 5, gender, weightLb, activity },
    { age: age + 5, gender, weightLb, activity },
    { age, gender, weightLb: weightLb - 10, activity },
    { age, gender, weightLb: weightLb + 10, activity },
    { age, gender, weightLb, activity: 'moderate' },
    { age, gender, weightLb, activity: 'active' },
    { age, gender, weightLb, activity: 'sedentary' },
  ];

  const relatedPages = uniqueBy(
    relatedCandidates.filter(
      candidate => parseTdeeResultSlug(buildTdeeResultSlug(candidate)) !== null
    ),
    candidate => buildTdeeResultSlug(candidate)
  )
    .filter(candidate => buildTdeeResultSlug(candidate) !== slug)
    .map(candidate => ({
      title: `${candidate.age} y/o, ${candidate.weightLb} lb, ${getTdeeActivity(candidate.activity).label}`,
      href: `/tdee/results/${buildTdeeResultSlug(candidate)}`,
    }));

  const mildCut = Math.round(tdee * 0.9);
  const moderateCut = Math.round(tdee * 0.8);

  return {
    canonicalPath: `/tdee/results/${slug}`,
    metadataTitle: `TDEE ${tdee} kcal for ${age}-year-old ${gender} at ${weightLb} lb (${activityOption.label}) | HealthCheck`,
    metadataDescription: `Pre-calculated TDEE result: ${tdee} kcal/day for a ${age}-year-old ${gender} at ${weightLb} lb with ${activityOption.label.toLowerCase()} activity.`,
    ogImage: '/images/calculators/tdee-calculator.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'TDEE Calculator', href: '/tdee' },
      { label: `${age}y ${weightLb} lb ${activityOption.slug}` },
    ],
    pageTitle: `TDEE Result: ${age}-Year-Old ${GENDER_LABEL[gender]} at ${weightLb} lb (${activityOption.label})`,
    intro:
      'This page pre-calculates maintenance calories for a common profile and adds age-group comparisons to contextualize the output.',
    heroValue: `${tdee.toLocaleString()} kcal/day`,
    heroLabel: 'Estimated total daily energy expenditure',
    heroSummary: `Estimated BMR is ${bmr.toLocaleString()} kcal/day. At ${activityOption.label.toLowerCase()} activity, maintenance intake is around ${tdee.toLocaleString()} kcal/day, with common cutting targets near ${mildCut.toLocaleString()}-${moderateCut.toLocaleString()} kcal/day.`,
    percentileText: `Estimated around the ${percentile}th percentile versus same-gender adults in this age bracket at a similar activity level.`,
    comparisonTitle: `${GENDER_LABEL[gender]} TDEE Benchmarks (${activityOption.label})`,
    comparisonDescription:
      'Each row uses age-band average body weight with the same activity multiplier to show how this result compares.',
    comparisonColumns: [
      { key: 'ageGroup', label: 'Age Group' },
      { key: 'averageWeight', label: 'Avg Weight', align: 'right' },
      { key: 'averageTdee', label: 'Avg TDEE', align: 'right' },
      { key: 'difference', label: 'Difference', align: 'right' },
    ],
    comparisonRows,
    contextHeading: 'How to Use This TDEE Estimate',
    contextParagraphs: [
      `A TDEE of ${tdee.toLocaleString()} kcal/day is a practical maintenance starting point. Hold calories near this level for 2-3 weeks and adjust based on weight trend, not day-to-day fluctuations.`,
      `For fat loss, most people do well starting with a 10-20% deficit (${mildCut.toLocaleString()}-${moderateCut.toLocaleString()} kcal/day here). For muscle gain, add 250-400 kcal/day and monitor weekly averages.`,
      `${activityOption.label} assumptions can be off if daily movement differs from plan. Recalculate when body weight changes by about 10-15 lb.`,
    ],
    faq: [
      {
        question: `Should I eat exactly ${tdee.toLocaleString()} calories every day?`,
        answer:
          'Treat this as a target zone, not an exact prescription. Staying within roughly +/-150 calories while tracking weekly scale trends is usually sufficient.',
      },
      {
        question: 'What deficit should I use for sustainable fat loss?',
        answer: `A 10-20% deficit is commonly used for adherence and muscle retention. For this profile that lands around ${mildCut.toLocaleString()}-${moderateCut.toLocaleString()} kcal/day.`,
      },
      {
        question: 'Why can TDEE calculators disagree?',
        answer:
          'Different tools use different formulas, activity assumptions, and rounding. Use calculator output as a starting estimate, then calibrate from real-world results.',
      },
    ],
    relatedPages: take(relatedPages, 6),
    cta: {
      label: 'Calculate your exact TDEE',
      href: '/tdee',
      description:
        'Run the full calculator with your exact height, weight, and activity details to personalize maintenance and cut/bulk targets.',
    },
  };
}

export function buildCalorieDeficitProgrammaticPage(slug: string): ProgrammaticPageData | null {
  const params = parseCalorieDeficitResultSlug(slug);
  if (!params) {
    return null;
  }

  const { weightLb, gender, rate } = params;
  const rateOption = getDeficitRate(rate);
  const profile = CALORIE_DEFICIT_REFERENCE_BY_GENDER[gender];

  const weightKg = toKg(weightLb);
  const goalLossLb = Math.max(10, Math.round(weightLb * 0.1));
  const goalWeightKg = toKg(weightLb - goalLossLb);

  const result = calculateCalorieDeficit({
    gender,
    age: profile.age,
    heightCm: profile.heightCm,
    weightKg,
    activityLevel: profile.activityLevel,
    goalWeightKg,
    deficitLevel: rate,
  });

  const comparisonRows = PROGRAMMATIC_DEFICIT_RATES.map(option => {
    const comparison = calculateCalorieDeficit({
      gender,
      age: profile.age,
      heightCm: profile.heightCm,
      weightKg,
      activityLevel: profile.activityLevel,
      goalWeightKg,
      deficitLevel: option.slug,
    });

    return {
      plan: option.label,
      dailyTarget: `${comparison.dailyCalorieTarget.toLocaleString()} kcal`,
      weeklyLoss: `${(comparison.weeklyWeightLoss * 2.20462).toFixed(1)} lb`,
      eta: `${comparison.estimatedWeeks} weeks`,
      notes: comparison.warnings.length > 0 ? 'Needs monitoring' : 'Within typical range',
    };
  });

  const averageTarget = gender === 'male' ? 2200 : 1800;
  const percentile = toPercentile(result.dailyCalorieTarget, averageTarget, 250);

  const relatedCandidates: CalorieDeficitResultSlugParams[] = [
    { weightLb, gender, rate: 'mild' },
    { weightLb, gender, rate: 'moderate' },
    { weightLb, gender, rate: 'aggressive' },
    { weightLb: weightLb - 10, gender, rate },
    { weightLb: weightLb + 10, gender, rate },
  ];

  const relatedPages = uniqueBy(
    relatedCandidates.filter(
      candidate => parseCalorieDeficitResultSlug(buildCalorieDeficitResultSlug(candidate)) !== null
    ),
    candidate => buildCalorieDeficitResultSlug(candidate)
  )
    .filter(candidate => buildCalorieDeficitResultSlug(candidate) !== slug)
    .map(candidate => ({
      title: `${candidate.weightLb} lb ${GENDER_LABEL[candidate.gender]} (${getDeficitRate(candidate.rate).label})`,
      href: `/calorie-deficit/results/${buildCalorieDeficitResultSlug(candidate)}`,
    }));

  const targetDate = result.targetDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    canonicalPath: `/calorie-deficit/results/${slug}`,
    metadataTitle: `${rateOption.label} calorie deficit for ${weightLb} lb ${gender} | HealthCheck`,
    metadataDescription: `Pre-calculated ${rateOption.label.toLowerCase()} calorie deficit plan for ${weightLb} lb ${gender} profile with timeline and daily target calories.`,
    ogImage: '/images/calculators/calorie-deficit-calculator.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Calorie Deficit Calculator', href: '/calorie-deficit' },
      { label: `${weightLb} lb ${rateOption.slug}` },
    ],
    pageTitle: `Calorie Deficit Plan for ${weightLb} lb ${GENDER_LABEL[gender]} (${rateOption.label})`,
    intro:
      'This page pre-computes a fat-loss timeline for a common profile and highlights the calorie target, weekly loss pace, and safety context.',
    heroValue: `${result.dailyCalorieTarget.toLocaleString()} kcal/day`,
    heroLabel: `${rateOption.label} deficit target`,
    heroSummary: `Projected weekly loss is about ${(result.weeklyWeightLoss * 2.20462).toFixed(1)} lb/week, with an estimated timeline of ${result.estimatedWeeks} weeks to lose ${goalLossLb} lb (target date: ${targetDate}).`,
    percentileText: `Daily target is near the ${percentile}th percentile of typical intake levels for ${gender} adults.`,
    comparisonTitle: 'Deficit Plan Comparison',
    comparisonDescription:
      'All options below use the same starting profile and goal weight so pace and calorie differences are easy to compare.',
    comparisonColumns: [
      { key: 'plan', label: 'Plan' },
      { key: 'dailyTarget', label: 'Daily Target', align: 'right' },
      { key: 'weeklyLoss', label: 'Weekly Loss', align: 'right' },
      { key: 'eta', label: 'ETA', align: 'right' },
      { key: 'notes', label: 'Safety Note' },
    ],
    comparisonRows,
    contextHeading: 'Sustainability and Safety Context',
    contextParagraphs: [
      `${rateOption.label} pacing (${rateOption.weeklyLossLabel}) balances speed and adherence for many people, but exact progress depends on sleep, protein intake, and activity consistency.`,
      `For this profile, recommended protein intake is about ${result.recommendations.proteinGrams} g/day with hydration near ${result.recommendations.waterLiters.toFixed(1)} L/day.`,
      result.warnings.length > 0
        ? result.warnings[0]
        : 'No immediate safety flags were triggered for this profile, but calorie targets should still be adjusted from real-world progress trends.',
    ],
    faq: [
      {
        question: `How long will it take to lose ${goalLossLb} lb at this pace?`,
        answer: `The projection is about ${result.estimatedWeeks} weeks, ending near ${targetDate}. Real-world timelines can vary based on adherence and adaptive changes.`,
      },
      {
        question: `Is the ${rateOption.label.toLowerCase()} plan safe?`,
        answer:
          'Mild and moderate plans are generally easier to sustain. Aggressive deficits can work short term but usually require closer monitoring of recovery, hunger, and training quality.',
      },
      {
        question: 'What should I do if progress stalls?',
        answer:
          'Recalculate after 5-10 lb of loss, review tracking consistency, and adjust calories by 100-200/day only after 2-3 weeks of flat weekly averages.',
      },
    ],
    relatedPages: take(relatedPages, 6),
    cta: {
      label: 'Calculate your exact deficit',
      href: '/calorie-deficit',
      description:
        'Use the full calculator with your exact height, age, goal weight, and activity pattern to get personalized timelines and warnings.',
    },
  };
}

export function buildBodyFatProgrammaticPage(slug: string): ProgrammaticPageData | null {
  const params = parseBodyFatResultSlug(slug);
  if (!params) {
    return null;
  }

  const { age, gender } = params;
  const ageBands = BODY_FAT_REFERENCE_BY_GENDER[gender];
  const ageBand = getAgeBand(age, ageBands);

  const estimatedBodyFat = roundToOneDecimal(
    calculateBMIMethodBodyFat(gender, age, ageBand.averageBmi)
  );
  const category = getBodyFatCategory(gender, estimatedBodyFat).name;
  const percentile = toPercentile(estimatedBodyFat, ageBand.averageBodyFat, 5.0);

  const comparisonRows = ageBands.map(reference => ({
    ageGroup: reference.label,
    averageBodyFat: `${reference.averageBodyFat.toFixed(1)}%`,
    averageBmi: reference.averageBmi.toFixed(1),
    difference: `${formatSigned(estimatedBodyFat - reference.averageBodyFat, 1)}%`,
    position:
      estimatedBodyFat >= reference.averageBodyFat
        ? 'Above this group average'
        : 'Below this group average',
  }));

  const relatedCandidates: BodyFatResultSlugParams[] = [
    { age: age - 5, gender, method: 'bmi' },
    { age: age + 5, gender, method: 'bmi' },
    { age, gender: gender === 'male' ? 'female' : 'male', method: 'bmi' },
  ];

  const relatedPages = uniqueBy(
    relatedCandidates.filter(candidate =>
      parseBodyFatResultSlug(buildBodyFatResultSlug(candidate))
    ),
    candidate => buildBodyFatResultSlug(candidate)
  )
    .filter(candidate => buildBodyFatResultSlug(candidate) !== slug)
    .map(candidate => ({
      title: `${candidate.age}-year-old ${GENDER_LABEL[candidate.gender]} body fat estimate`,
      href: `/body-fat/results/${buildBodyFatResultSlug(candidate)}`,
    }));

  return {
    canonicalPath: `/body-fat/results/${slug}`,
    metadataTitle: `Body fat estimate for ${age}-year-old ${gender} (${category}) | HealthCheck`,
    metadataDescription: `Pre-calculated body-fat estimate for a ${age}-year-old ${gender} profile, with percentile and age-group comparison context.`,
    ogImage: '/images/calculators/body-fat-calculator.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Body Fat Calculator', href: '/body-fat' },
      { label: `${age}y ${gender}` },
    ],
    pageTitle: `Body Fat Estimate: ${age}-Year-Old ${GENDER_LABEL[gender]} (BMI Method)`,
    intro:
      'This page uses a reference profile for age and gender to pre-compute body-fat percentage with the BMI-based body-fat equation.',
    heroValue: `${estimatedBodyFat.toFixed(1)}%`,
    heroLabel: `${category} category estimate`,
    heroSummary: `Estimated body fat is ${estimatedBodyFat.toFixed(1)}% for this profile. The estimate uses age ${age}, a representative BMI, and standard BMI-to-body-fat conversion equations.`,
    percentileText: `Estimated around the ${percentile}th percentile versus same-gender adults in this age band.`,
    comparisonTitle: `${GENDER_LABEL[gender]} Body Fat Reference Ranges`,
    comparisonDescription:
      'Rows show typical body-fat averages by age group and the difference from this pre-computed estimate.',
    comparisonColumns: [
      { key: 'ageGroup', label: 'Age Group' },
      { key: 'averageBodyFat', label: 'Avg Body Fat', align: 'right' },
      { key: 'averageBmi', label: 'Avg BMI', align: 'right' },
      { key: 'difference', label: 'Difference', align: 'right' },
      { key: 'position', label: 'Position' },
    ],
    comparisonRows,
    contextHeading: 'Interpreting This Body Fat Estimate',
    contextParagraphs: [
      `At ${estimatedBodyFat.toFixed(1)}%, this profile sits in the ${category.toLowerCase()} band. Body-fat categories are useful for context but are still approximations.`,
      `The BMI method is practical for fast screening, but direct methods (DEXA, multi-site skinfolds, or consistent circumference tracking) can improve precision for individuals.`,
      `Use trend direction over time as the key signal. A steady decline with stable performance and recovery is usually more meaningful than one isolated reading.`,
    ],
    faq: [
      {
        question: 'Why is this page based on the BMI body-fat method?',
        answer:
          'BMI-derived body-fat estimates are reproducible and require minimal inputs, making them suitable for pre-computed comparison pages. The full calculator offers additional methods.',
      },
      {
        question: `What does ${estimatedBodyFat.toFixed(1)}% body fat imply?`,
        answer: `It places this profile in the ${category.toLowerCase()} category. Interpretation should include waist, performance, and metabolic markers where possible.`,
      },
      {
        question: 'How often should body fat be reassessed?',
        answer:
          'Every 2-4 weeks is common. Keep conditions consistent (time of day, hydration, and method) to improve comparability.',
      },
    ],
    relatedPages: take(relatedPages, 4),
    cta: {
      label: 'Calculate your exact body fat',
      href: '/body-fat',
      description:
        'Open the full body fat calculator to use your own measurements and compare multiple methods side-by-side.',
    },
  };
}

export function buildMacroProgrammaticPage(slug: string): ProgrammaticPageData | null {
  const params = parseMacroResultSlug(slug);
  if (!params) {
    return null;
  }

  const { calories, goal, diet } = params;
  const goalOption = getMacroGoal(goal);
  const dietOption = getMacroDiet(diet);

  const macros = calculateMacros({
    targetCalories: calories,
    proteinPercent: dietOption.proteinPercent,
    carbsPercent: dietOption.carbsPercent,
    fatPercent: dietOption.fatPercent,
  });

  const percentile = toPercentile(calories, goalOption.averageCalories, goalOption.calorieSd);

  const comparisonRows = PROGRAMMATIC_MACRO_DIETS.map(option => {
    const rowMacros = calculateMacros({
      targetCalories: calories,
      proteinPercent: option.proteinPercent,
      carbsPercent: option.carbsPercent,
      fatPercent: option.fatPercent,
    });

    return {
      diet: option.label,
      ratio: `${option.proteinPercent}/${option.carbsPercent}/${option.fatPercent}`,
      protein: `${rowMacros.protein.grams} g`,
      carbs: `${rowMacros.carbs.grams} g`,
      fat: `${rowMacros.fat.grams} g`,
    };
  });

  const relatedCandidates: MacroResultSlugParams[] = [
    { calories: calories - 200, goal, diet },
    { calories: calories + 200, goal, diet },
    { calories, goal: 'weight-loss', diet },
    { calories, goal: 'maintenance', diet },
    { calories, goal: 'muscle-gain', diet },
    { calories, goal, diet: 'balanced' },
    { calories, goal, diet: 'high-protein' },
  ];

  const relatedPages = uniqueBy(
    relatedCandidates.filter(candidate => parseMacroResultSlug(buildMacroResultSlug(candidate))),
    candidate => buildMacroResultSlug(candidate)
  )
    .filter(candidate => buildMacroResultSlug(candidate) !== slug)
    .map(candidate => ({
      title: `${candidate.calories} kcal • ${getMacroGoal(candidate.goal).label} • ${getMacroDiet(candidate.diet).label}`,
      href: `/macro/results/${buildMacroResultSlug(candidate)}`,
    }));

  return {
    canonicalPath: `/macro/results/${slug}`,
    metadataTitle: `${calories} calorie macro split (${goalOption.label}, ${dietOption.label}) | HealthCheck`,
    metadataDescription: `Pre-calculated macros for ${calories} calories using a ${dietOption.label.toLowerCase()} split for ${goalOption.label.toLowerCase()}.`,
    ogImage: '/images/calculators/macro-calculator.jpg',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Macro Calculator', href: '/macro' },
      { label: `${calories} kcal ${goal}` },
    ],
    pageTitle: `Macro Plan at ${calories} Calories (${goalOption.label}, ${dietOption.label})`,
    intro:
      'This page pre-computes daily protein, carbs, and fat targets for a specific calorie level, goal, and diet style.',
    heroValue: `${macros.protein.grams}g P • ${macros.carbs.grams}g C • ${macros.fat.grams}g F`,
    heroLabel: `Daily macros at ${calories} kcal`,
    heroSummary: `${dietOption.label} uses a ${dietOption.proteinPercent}/${dietOption.carbsPercent}/${dietOption.fatPercent} split, giving ${macros.protein.grams} g protein, ${macros.carbs.grams} g carbs, and ${macros.fat.grams} g fat per day.`,
    percentileText: `This calorie target sits around the ${percentile}th percentile for typical ${goalOption.label.toLowerCase()} plans.`,
    comparisonTitle: `Diet Split Comparison at ${calories} Calories`,
    comparisonDescription:
      'Same calories, different macro distributions. Compare how grams shift across common diet styles.',
    comparisonColumns: [
      { key: 'diet', label: 'Diet Style' },
      { key: 'ratio', label: 'P/C/F %', align: 'right' },
      { key: 'protein', label: 'Protein', align: 'right' },
      { key: 'carbs', label: 'Carbs', align: 'right' },
      { key: 'fat', label: 'Fat', align: 'right' },
    ],
    comparisonRows,
    contextHeading: 'Macro Planning Context',
    contextParagraphs: [
      `${goalOption.label} plans work best when calorie intake, protein consistency, and training load are aligned. The calorie target drives weight trend; macros influence satiety, recovery, and performance.`,
      `${dietOption.description} At ${calories} kcal, this translates to ${macros.protein.grams} g protein, ${macros.carbs.grams} g carbs, and ${macros.fat.grams} g fat daily.`,
      'Use weekly averages and gym performance to iterate. If adherence drops, keep calories stable and shift macro distribution toward your food preferences.',
    ],
    faq: [
      {
        question: 'Are these macro targets per day or per meal?',
        answer:
          'Values shown here are daily totals. You can distribute them across meals based on appetite and training schedule while keeping the daily totals consistent.',
      },
      {
        question: 'Can I keep calories the same and change the ratio?',
        answer:
          'Yes. The comparison table shows alternative splits at the same calorie level so you can match preferences without changing total energy intake.',
      },
      {
        question: 'How do I choose between weight-loss, maintenance, and muscle-gain goals?',
        answer:
          'Choose based on your current objective and trend data. Weight loss generally requires a calorie deficit, maintenance holds weight stable, and muscle gain usually needs a controlled surplus.',
      },
    ],
    relatedPages: take(relatedPages, 6),
    cta: {
      label: 'Calculate your exact macros',
      href: '/macro',
      description:
        'Open the full calculator to personalize macros with your age, body size, activity, and preferred goal preset.',
    },
  };
}
