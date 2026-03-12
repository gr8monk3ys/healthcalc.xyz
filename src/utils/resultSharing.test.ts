import { describe, expect, it, vi } from 'vitest';
import {
  buildSharedResultSummary,
  buildSharedResultToken,
  decodeSharedResultFromParamRecord,
  decodeSharedResultFromSearchParams,
  decodeSharedResultToken,
  encodeSharedResultToken,
  isSupportedShareCalculator,
  type ShareResultContext,
  type SharedResultPayload,
} from './resultSharing';

const BMI_PAYLOAD: SharedResultPayload<'bmi'> = {
  v: 1,
  c: 'bmi',
  i: {
    age: 30,
    gender: 'male',
    heightCm: 180,
    weightKg: 80,
  },
};

const TDEE_PAYLOAD: SharedResultPayload<'tdee'> = {
  v: 1,
  c: 'tdee',
  i: {
    age: 30,
    gender: 'male',
    heightCm: 180,
    weightKg: 80,
    activityLevel: 'moderately_active',
  },
};

const CALORIE_DEFICIT_PAYLOAD: SharedResultPayload<'calorie-deficit'> = {
  v: 1,
  c: 'calorie-deficit',
  i: {
    age: 30,
    gender: 'male',
    heightCm: 180,
    weightKg: 80,
    goalWeightKg: 72,
    activityLevel: 'moderately_active',
    deficitLevel: 'moderate',
  },
};

const BODY_FAT_PAYLOAD: SharedResultPayload<'body-fat'> = {
  v: 1,
  c: 'body-fat',
  i: {
    age: 34,
    gender: 'female',
    heightCm: 165,
    weightKg: 62,
    method: 'navy',
    waistCm: 74,
    neckCm: 33,
    hipsCm: 95,
  },
};

const MACRO_PAYLOAD: SharedResultPayload<'macro'> = {
  v: 1,
  c: 'macro',
  i: {
    age: 30,
    gender: 'male',
    heightCm: 180,
    weightKg: 80,
    activityLevel: 'moderately_active',
    goal: 'custom',
    customProteinPercent: 30,
    customCarbsPercent: 40,
    customFatPercent: 30,
  },
};

const FITNESS_AGE_PAYLOAD: SharedResultPayload<'fitness-age'> = {
  v: 1,
  c: 'fitness-age',
  i: {
    age: 34,
    gender: 'female',
    vo2Max: 41.2,
    restingHeartRate: 58,
    bmi: 22.8,
    bodyFatPercentage: 24,
    weeklyTrainingDays: 4,
    balanceScore: 4,
    flexibilityScore: 3,
  },
};

const SUPPORTED_PAYLOADS: SharedResultPayload[] = [
  BMI_PAYLOAD,
  TDEE_PAYLOAD,
  CALORIE_DEFICIT_PAYLOAD,
  BODY_FAT_PAYLOAD,
  MACRO_PAYLOAD,
  FITNESS_AGE_PAYLOAD,
];

const SUPPORTED_CONTEXTS: ShareResultContext[] = [
  { calculator: 'bmi', inputs: BMI_PAYLOAD.i },
  { calculator: 'tdee', inputs: TDEE_PAYLOAD.i },
  { calculator: 'calorie-deficit', inputs: CALORIE_DEFICIT_PAYLOAD.i },
  { calculator: 'body-fat', inputs: BODY_FAT_PAYLOAD.i },
  { calculator: 'macro', inputs: MACRO_PAYLOAD.i },
  { calculator: 'fitness-age', inputs: FITNESS_AGE_PAYLOAD.i },
];

describe('resultSharing', () => {
  it('recognizes each supported share calculator', () => {
    for (const slug of ['bmi', 'tdee', 'calorie-deficit', 'body-fat', 'macro', 'fitness-age']) {
      expect(isSupportedShareCalculator(slug)).toBe(true);
    }
  });

  it('round-trips every supported payload via shared tokens', () => {
    for (const context of SUPPORTED_CONTEXTS) {
      const token = buildSharedResultToken(context);
      const decoded = decodeSharedResultToken(token);

      expect(decoded).toEqual({
        v: 1,
        c: context.calculator,
        i: context.inputs,
      });
    }
  });

  it('supports browser-style encoding and decoding when Buffer is unavailable', () => {
    vi.stubGlobal('Buffer', undefined);

    try {
      const token = buildSharedResultToken({ calculator: 'bmi', inputs: BMI_PAYLOAD.i });
      expect(decodeSharedResultToken(token)).toEqual(BMI_PAYLOAD);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('decodes tokens from URLSearchParams and enforces the expected calculator', () => {
    const token = encodeSharedResultToken(TDEE_PAYLOAD);
    const params = new URLSearchParams({ r: token });

    expect(decodeSharedResultFromSearchParams(params, 'tdee')).toEqual(TDEE_PAYLOAD);
    expect(decodeSharedResultFromSearchParams(params, 'bmi')).toBeNull();
  });

  it('decodes tokens from plain param records and uses the first array value', () => {
    const token = encodeSharedResultToken(MACRO_PAYLOAD);

    expect(decodeSharedResultFromParamRecord({ r: [token, 'ignored'] }, 'macro')).toEqual(
      MACRO_PAYLOAD
    );
    expect(decodeSharedResultFromParamRecord({ r: undefined }, 'macro')).toBeNull();
  });

  it('rejects payloads that fail per-calculator validation', () => {
    const invalidPayloads = [
      {
        ...BMI_PAYLOAD,
        i: {
          ...BMI_PAYLOAD.i,
          heightCm: 40,
        },
      },
      {
        ...TDEE_PAYLOAD,
        i: {
          ...TDEE_PAYLOAD.i,
          activityLevel: 'sprinting',
        },
      },
      {
        ...CALORIE_DEFICIT_PAYLOAD,
        i: {
          ...CALORIE_DEFICIT_PAYLOAD.i,
          goalWeightKg: 85,
        },
      },
      {
        ...BODY_FAT_PAYLOAD,
        i: {
          ...BODY_FAT_PAYLOAD.i,
          hipsCm: undefined,
        },
      },
      {
        ...MACRO_PAYLOAD,
        i: {
          ...MACRO_PAYLOAD.i,
          customProteinPercent: 10,
          customCarbsPercent: 10,
          customFatPercent: 10,
        },
      },
      {
        ...FITNESS_AGE_PAYLOAD,
        i: {
          ...FITNESS_AGE_PAYLOAD.i,
          weeklyTrainingDays: 9,
        },
      },
    ] as SharedResultPayload[];

    for (const payload of invalidPayloads) {
      expect(decodeSharedResultToken(encodeSharedResultToken(payload))).toBeNull();
    }
  });

  it('builds summary metadata for every supported payload', () => {
    const [bmi, tdee, calorieDeficit, bodyFat, macro, fitnessAge] =
      SUPPORTED_PAYLOADS.map(buildSharedResultSummary);

    expect(bmi.calculator).toBe('bmi');
    expect(bmi.title).toContain('BMI');
    expect(bmi.secondaryValue).toBeTruthy();

    expect(tdee.calculator).toBe('tdee');
    expect(tdee.primaryValue).toContain('kcal/day');
    expect(tdee.secondaryValue).toContain('BMR');

    expect(calorieDeficit.calculator).toBe('calorie-deficit');
    expect(calorieDeficit.title).toContain('Target');
    expect(calorieDeficit.secondaryValue).toContain('weeks');

    expect(bodyFat.calculator).toBe('body-fat');
    expect(bodyFat.title).toContain('Body Fat');
    expect(bodyFat.primaryValue).toContain('%');

    expect(macro.calculator).toBe('macro');
    expect(macro.title).toContain('Macros');
    expect(macro.primaryValue).toContain('g P');

    expect(fitnessAge.calculator).toBe('fitness-age');
    expect(fitnessAge.title).toContain('Fitness Age');
    expect(fitnessAge.primaryValue).toContain('years');
    expect(fitnessAge.secondaryValue).toContain('age gap');
  });
});
