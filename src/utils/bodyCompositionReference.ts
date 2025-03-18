import type { Gender } from '@/types/common';

interface BodyCompositionReferenceBand {
  minAge: number;
  maxAge: number;
  bmi: number;
  bodyFat: Record<Gender, number>;
}

export interface BodyCompositionReferenceInput {
  age?: number | null;
  gender?: Gender | null;
}

export interface BodyCompositionReference {
  bmi: number;
  bodyFatPercentage: number;
}

const ADULT_REFERENCE_BANDS: BodyCompositionReferenceBand[] = [
  { minAge: 18, maxAge: 29, bmi: 21.8, bodyFat: { male: 14, female: 22 } },
  { minAge: 30, maxAge: 39, bmi: 22.4, bodyFat: { male: 16, female: 24 } },
  { minAge: 40, maxAge: 49, bmi: 23.0, bodyFat: { male: 18, female: 26 } },
  { minAge: 50, maxAge: 59, bmi: 23.6, bodyFat: { male: 20, female: 28 } },
  { minAge: 60, maxAge: 120, bmi: 24.1, bodyFat: { male: 22, female: 30 } },
];

const FALLBACK_REFERENCE: BodyCompositionReference = {
  bmi: 22,
  bodyFatPercentage: 20,
};

function roundToOne(value: number): number {
  return Math.round(value * 10) / 10;
}

function findAdultBand(age: number): BodyCompositionReferenceBand {
  return (
    ADULT_REFERENCE_BANDS.find(band => age >= band.minAge && age <= band.maxAge) ??
    ADULT_REFERENCE_BANDS[ADULT_REFERENCE_BANDS.length - 1]
  );
}

function getSexAdjustedFallback(gender: Gender | null | undefined): BodyCompositionReference {
  if (!gender) {
    return FALLBACK_REFERENCE;
  }

  return {
    bmi: FALLBACK_REFERENCE.bmi,
    bodyFatPercentage: gender === 'male' ? 16 : 24,
  };
}

export function getBodyCompositionReference({
  age,
  gender,
}: BodyCompositionReferenceInput): BodyCompositionReference {
  if (typeof age !== 'number' || Number.isNaN(age) || age < 18) {
    return getSexAdjustedFallback(gender);
  }

  const band = findAdultBand(age);

  if (!gender) {
    return {
      bmi: roundToOne(band.bmi),
      bodyFatPercentage: roundToOne((band.bodyFat.male + band.bodyFat.female) / 2),
    };
  }

  return {
    bmi: roundToOne(band.bmi),
    bodyFatPercentage: roundToOne(band.bodyFat[gender]),
  };
}
