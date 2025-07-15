'use client';

import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Gender } from '@/types/common';
import { BodyFatMethod, BodyFatResult as BodyFatResultType } from '@/types/bodyFat';
import {
  calculateBodyFat,
  getBodyFatCategory,
  getHealthyBodyFatRange,
  calculateFatAndLeanMass,
} from '@/utils/calculators/bodyFat';
import { BODY_FAT_METHODS } from '@/constants/bodyFat';
import { calculateBMI } from '@/utils/calculators/bmi';
import {
  validateAge,
  validateHeight,
  validateWeight,
  validateWaist,
  validateNeck,
  validateHip,
  validateBodyFatPercentage,
  isEmpty,
} from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import BodyFatResultDisplay from '@/components/calculators/body-fat/BodyFatResult';
import BodyFatInfo from '@/components/calculators/body-fat/BodyFatInfo';
import AffiliateLinks from '@/components/AffiliateLinks';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';
import { useCalculatorForm } from '@/hooks/useCalculatorForm';
import { useChainPrefill } from '@/hooks/useChainPrefill';
import {
  requestCalculatorFormSubmit,
  useSharedResultPrefill,
} from '@/hooks/useSharedResultPrefill';
import type { SharedResultInputMap } from '@/utils/resultSharing';

// Dynamic imports for below-the-fold components
const BodyFatUnderstanding = dynamic(
  () => import('@/components/calculators/body-fat/BodyFatUnderstanding')
);

type BodyFatCalculatorState = {
  age: number | '';
  gender: Gender;
  method: BodyFatMethod;
  waist: number | '';
  neck: number | '';
  hips: number | '';
  bodyFatPercentage: number | '';
};

type BodyFatCalculatorAction =
  | { type: 'patch'; patch: Partial<BodyFatCalculatorState> }
  | { type: 'reset' };

const initialBodyFatCalculatorState: BodyFatCalculatorState = {
  age: '',
  gender: 'male',
  method: 'navy',
  waist: '',
  neck: '',
  hips: '',
  bodyFatPercentage: '',
};

function bodyFatCalculatorReducer(
  state: BodyFatCalculatorState,
  action: BodyFatCalculatorAction
): BodyFatCalculatorState {
  switch (action.type) {
    case 'patch':
      return { ...state, ...action.patch };
    case 'reset':
      return initialBodyFatCalculatorState;
    default:
      return state;
  }
}

type BodyFatFormFieldsArgs = {
  age: number | '';
  errors: Record<string, string>;
  gender: Gender;
  handleMethodChange: (value: string) => void;
  height: ReturnType<typeof useHeight>;
  hips: number | '';
  method: BodyFatMethod;
  setAge: (value: number | '') => void;
  setBodyFatPercentage: (value: number | '') => void;
  setGender: (value: Gender) => void;
  setHips: (value: number | '') => void;
  setNeck: (value: number | '') => void;
  setWaist: (value: number | '') => void;
  waist: number | '';
  neck: number | '';
  bodyFatPercentage: number | '';
  weight: ReturnType<typeof useWeight>;
};

function createBodyFatFormFields({
  age,
  errors,
  gender,
  handleMethodChange,
  height,
  hips,
  method,
  setAge,
  setBodyFatPercentage,
  setGender,
  setHips,
  setNeck,
  setWaist,
  waist,
  neck,
  bodyFatPercentage,
  weight,
}: BodyFatFormFieldsArgs): React.ComponentProps<typeof CalculatorForm>['fields'] {
  const methodFields: React.ComponentProps<typeof CalculatorForm>['fields'] = [];

  if (method === 'navy') {
    methodFields.push(
      {
        name: 'waist',
        label: 'Waist Circumference (cm)',
        type: 'number' as const,
        value: waist,
        onChange: setWaist,
        error: errors.waist,
        placeholder: 'Centimeters',
        step: '0.1',
      },
      {
        name: 'neck',
        label: 'Neck Circumference (cm)',
        type: 'number' as const,
        value: neck,
        onChange: setNeck,
        error: errors.neck,
        placeholder: 'Centimeters',
        step: '0.1',
      }
    );

    if (gender === 'female') {
      methodFields.push({
        name: 'hips',
        label: 'Hip Circumference (cm)',
        type: 'number' as const,
        value: hips,
        onChange: setHips,
        error: errors.hips,
        placeholder: 'Centimeters',
        step: '0.1',
      });
    }
  } else if (method === 'manual') {
    methodFields.push({
      name: 'bodyFatPercentage',
      label: 'Body Fat Percentage (%)',
      type: 'number' as const,
      value: bodyFatPercentage,
      onChange: setBodyFatPercentage,
      error: errors.bodyFatPercentage,
      placeholder: 'Percentage',
      step: '0.1',
    });
  }

  return [
    {
      name: 'gender',
      label: 'Gender',
      type: 'radio' as const,
      value: gender,
      onChange: (value: string) => setGender(value as Gender),
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ],
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number' as const,
      value: age,
      onChange: setAge,
      error: errors.age,
      placeholder: 'Years',
    },
    createHeightField(height, errors.height),
    createWeightField(weight, errors.weight),
    {
      name: 'method',
      label: 'Calculation Method',
      type: 'select' as const,
      value: method,
      onChange: handleMethodChange,
      options: BODY_FAT_METHODS.map(m => ({
        value: m.value,
        label: m.label,
        description: m.description,
      })),
    },
    ...methodFields,
  ];
}

function createBodyFatShareResultContext({
  age,
  bodyFatPercentage,
  gender,
  height,
  hips,
  method,
  neck,
  showResult,
  waist,
  weight,
}: Pick<
  BodyFatCalculatorState,
  'age' | 'bodyFatPercentage' | 'gender' | 'hips' | 'method' | 'neck' | 'waist'
> & {
  height: ReturnType<typeof useHeight>;
  showResult: boolean;
  weight: ReturnType<typeof useWeight>;
}): React.ComponentProps<typeof CalculatorPageLayout>['shareResultContext'] {
  const heightCm = height.toCm();
  const weightKg = weight.toKg();

  if (!showResult || typeof age !== 'number' || heightCm === null || weightKg === null) {
    return undefined;
  }

  if (method === 'navy') {
    if (typeof waist !== 'number' || typeof neck !== 'number') {
      return undefined;
    }

    if (gender === 'female') {
      if (typeof hips !== 'number') {
        return undefined;
      }

      return {
        calculator: 'body-fat',
        inputs: {
          age,
          gender,
          heightCm,
          weightKg,
          method,
          waistCm: waist,
          neckCm: neck,
          hipsCm: hips,
        },
      };
    }

    return {
      calculator: 'body-fat',
      inputs: {
        age,
        gender,
        heightCm,
        weightKg,
        method,
        waistCm: waist,
        neckCm: neck,
      },
    };
  }

  if (method === 'manual') {
    if (typeof bodyFatPercentage !== 'number') {
      return undefined;
    }

    return {
      calculator: 'body-fat',
      inputs: {
        age,
        gender,
        heightCm,
        weightKg,
        method,
        bodyFatPercentage,
      },
    };
  }

  return {
    calculator: 'body-fat',
    inputs: {
      age,
      gender,
      heightCm,
      weightKg,
      method,
    },
  };
}
export default function BodyFatCalculator({
  serverHeader,
  initialSharedPrefill = null,
}: {
  serverHeader?: React.ReactNode;
  initialSharedPrefill?: SharedResultInputMap['body-fat'] | null;
}) {
  const [state, dispatchState] = useReducer(
    bodyFatCalculatorReducer,
    initialBodyFatCalculatorState
  );
  const { age, bodyFatPercentage, gender, hips, method, neck, waist } = state;
  const height = useHeight();
  const weight = useWeight();
  const chainPrefill = useChainPrefill('body-fat');
  const querySharedPrefill = useSharedResultPrefill('body-fat');
  const sharedPrefill = initialSharedPrefill ?? querySharedPrefill;
  const hasAppliedSharedPrefill = useRef(false);

  useEffect(() => {
    if (!chainPrefill) return;
    dispatchState({
      type: 'patch',
      patch: {
        ...(typeof chainPrefill.age === 'number' ? { age: chainPrefill.age } : {}),
        ...(chainPrefill.gender === 'male' || chainPrefill.gender === 'female'
          ? { gender: chainPrefill.gender as Gender }
          : {}),
      },
    });
    if (typeof chainPrefill.height === 'number') height.setValue(chainPrefill.height);
    if (typeof chainPrefill.weight === 'number') weight.setValue(chainPrefill.weight);
  }, [chainPrefill, height, weight]);

  useEffect(() => {
    if (!sharedPrefill || hasAppliedSharedPrefill.current) return;

    hasAppliedSharedPrefill.current = true;
    dispatchState({
      type: 'patch',
      patch: {
        gender: sharedPrefill.gender,
        age: sharedPrefill.age,
        method: sharedPrefill.method,
        waist: typeof sharedPrefill.waistCm === 'number' ? sharedPrefill.waistCm : '',
        neck: typeof sharedPrefill.neckCm === 'number' ? sharedPrefill.neckCm : '',
        hips: typeof sharedPrefill.hipsCm === 'number' ? sharedPrefill.hipsCm : '',
        bodyFatPercentage:
          typeof sharedPrefill.bodyFatPercentage === 'number'
            ? sharedPrefill.bodyFatPercentage
            : '',
      },
    });
    height.setValue(sharedPrefill.heightCm);
    weight.setValue(sharedPrefill.weightKg);
    requestCalculatorFormSubmit();
  }, [height, sharedPrefill, weight]);

  const chainResultData = useMemo(() => {
    const heightCm = height.toCm();
    const weightKg = weight.toKg();
    return {
      ...(typeof age === 'number' ? { age } : {}),
      gender,
      ...(heightCm !== null ? { height: heightCm } : {}),
      ...(weightKg !== null ? { weight: weightKg } : {}),
    };
  }, [age, gender, height, weight]);

  // Shared form boilerplate: errors, result, showResult, calculationError,
  // handleSubmit, handleReset — extracted into the shared hook.
  const { result, showResult, calculationError, errors, setErrors, handleSubmit, handleReset } =
    useCalculatorForm<BodyFatResultType>({
      validate: () => {
        const newErrors: Record<string, string> = {};

        // Validate age
        if (isEmpty(age)) {
          newErrors.age = 'Age is required';
        } else {
          const ageValidation = validateAge(age);
          if (!ageValidation.isValid) {
            newErrors.age = ageValidation.error ?? '';
          }
        }

        // Validate height (feet for imperial, cm for metric)
        if (isEmpty(height.value)) {
          newErrors.height = 'Height is required';
        } else {
          const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
          const heightValidation = validateHeight(height.value, unitSystem);
          if (!heightValidation.isValid) {
            newErrors.height = heightValidation.error ?? '';
          }
        }

        // Validate weight
        if (isEmpty(weight.value)) {
          newErrors.weight = 'Weight is required';
        } else {
          const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
          const weightValidation = validateWeight(weight.value, unitSystem);
          if (!weightValidation.isValid) {
            newErrors.weight = weightValidation.error ?? '';
          }
        }

        // Method-specific validations
        if (method === 'navy') {
          if (isEmpty(waist)) {
            newErrors.waist = 'Waist measurement is required';
          } else {
            const waistValidation = validateWaist(waist, 'metric');
            if (!waistValidation.isValid) {
              newErrors.waist = waistValidation.error ?? '';
            }
          }

          if (isEmpty(neck)) {
            newErrors.neck = 'Neck measurement is required';
          } else {
            const neckValidation = validateNeck(neck, 'metric');
            if (!neckValidation.isValid) {
              newErrors.neck = neckValidation.error ?? '';
            }
          }

          // Validate hips (female only)
          if (gender === 'female') {
            if (isEmpty(hips)) {
              newErrors.hips = 'Hip measurement is required for women';
            } else {
              const hipValidation = validateHip(hips, 'metric');
              if (!hipValidation.isValid) {
                newErrors.hips = hipValidation.error ?? '';
              }
            }
          }
        } else if (method === 'manual') {
          if (isEmpty(bodyFatPercentage)) {
            newErrors.bodyFatPercentage = 'Body fat percentage is required';
          } else {
            const bfValidation = validateBodyFatPercentage(bodyFatPercentage);
            if (!bfValidation.isValid) {
              newErrors.bodyFatPercentage = bfValidation.error ?? '';
            }
          }
        }

        return newErrors;
      },
      calculate: () => {
        const heightCm = height.toCm();
        const weightKg = weight.toKg();

        if (typeof age !== 'number' || heightCm === null || weightKg === null) {
          throw new Error('Invalid inputs');
        }

        const bmi = calculateBMI(heightCm, weightKg);

        const params = {
          gender,
          age,
          heightCm,
          weightKg,
          bmi,
          waistCm: typeof waist === 'number' ? waist : undefined,
          neckCm: typeof neck === 'number' ? neck : undefined,
          hipsCm: typeof hips === 'number' ? hips : undefined,
          bodyFatPercentage: typeof bodyFatPercentage === 'number' ? bodyFatPercentage : undefined,
        };

        const bodyFatPct = calculateBodyFat(method, params);
        const { name: category, color } = getBodyFatCategory(gender, bodyFatPct);
        const healthyRange = getHealthyBodyFatRange(gender);
        const { fatMass, leanMass } = calculateFatAndLeanMass(weightKg, bodyFatPct);

        const bodyFatResult: BodyFatResultType = {
          bodyFatPercentage: bodyFatPct,
          category,
          color,
          fatMass,
          leanMass,
          healthyRange,
        };

        // Scroll to result with smooth animation
        setTimeout(() => {
          const resultElement = document.getElementById('body-fat-result');
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);

        return bodyFatResult;
      },
    });

  // Wrap handleReset to also reset field state managed by this component
  const onReset = () => {
    handleReset(() => {
      dispatchState({ type: 'reset' });
      height.setValue('');
      weight.setValue('');
    });
  };

  const shareResultContext = useMemo(
    () =>
      createBodyFatShareResultContext({
        age,
        bodyFatPercentage,
        gender,
        height,
        hips,
        method,
        neck,
        showResult,
        waist,
        weight,
      }),
    [age, bodyFatPercentage, gender, height, hips, method, neck, showResult, waist, weight]
  );

  // Clear method-specific errors when changing methods.
  const handleMethodChange = useCallback(
    (newMethod: string) => {
      dispatchState({ type: 'patch', patch: { method: newMethod as BodyFatMethod } });
      setErrors(prev => {
        const updated = { ...prev };
        delete updated.waist;
        delete updated.neck;
        delete updated.hips;
        delete updated.bodyFatPercentage;
        return updated;
      });
    },
    [setErrors]
  );
  const formFields = useMemo(
    () =>
      createBodyFatFormFields({
        age,
        errors,
        gender,
        handleMethodChange,
        height,
        hips,
        method,
        setAge: value => dispatchState({ type: 'patch', patch: { age: value } }),
        setBodyFatPercentage: value =>
          dispatchState({ type: 'patch', patch: { bodyFatPercentage: value } }),
        setGender: value => dispatchState({ type: 'patch', patch: { gender: value } }),
        setHips: value => dispatchState({ type: 'patch', patch: { hips: value } }),
        setNeck: value => dispatchState({ type: 'patch', patch: { neck: value } }),
        setWaist: value => dispatchState({ type: 'patch', patch: { waist: value } }),
        waist,
        neck,
        bodyFatPercentage,
        weight,
      }),
    [
      age,
      errors,
      gender,
      handleMethodChange,
      height,
      hips,
      method,
      waist,
      neck,
      bodyFatPercentage,
      weight,
    ]
  );

  const methodLabel = BODY_FAT_METHODS.find(m => m.value === method)?.label || method;

  return renderBodyFatCalculatorView({
    serverHeader,
    age: typeof age === 'number' ? age : undefined,
    calculationError,
    chainResultData,
    formFields,
    gender,
    handleSubmit,
    methodLabel,
    onReset,
    result,
    shareResultContext,
    showResult,
    weight,
  });
}

type BodyFatCalculatorViewProps = {
  serverHeader?: React.ReactNode;
  age?: number;
  calculationError: string | null;
  chainResultData: Record<string, string | number>;
  formFields: React.ComponentProps<typeof CalculatorForm>['fields'];
  gender: Gender;
  handleSubmit: React.FormEventHandler<Element>;
  methodLabel: string;
  onReset: () => void;
  result: BodyFatResultType | null;
  shareResultContext: React.ComponentProps<typeof CalculatorPageLayout>['shareResultContext'];
  showResult: boolean;
  weight: ReturnType<typeof useWeight>;
};

function renderBodyFatCalculatorView({
  serverHeader,
  age,
  calculationError,
  chainResultData,
  formFields,
  gender,
  handleSubmit,
  methodLabel,
  onReset,
  result,
  shareResultContext,
  showResult,
  weight,
}: BodyFatCalculatorViewProps) {
  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
      title="Body Fat Calculator"
      description="Calculate your body fat percentage using various methods including Navy, skinfold, and BMI"
      calculatorSlug="body-fat"
      faqs={[]}
      relatedArticles={[]}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Body Fat Calculator',
        description:
          'Calculate your body fat percentage using various methods including Navy, skinfold, and BMI.',
        url: 'https://www.healthcalc.xyz/body-fat',
      }}
      understandingSection={<BodyFatUnderstanding />}
      showResultsCapture={showResult}
      chainResultData={chainResultData}
      shareResultContext={shareResultContext}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Enter Your Details"
          fields={formFields}
          onSubmit={handleSubmit}
          onReset={onReset}
        />

        {/* User-facing error state */}
        {calculationError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mt-4">
            {calculationError}
          </div>
        )}
      </div>

      <div className="md:col-span-2" id="body-fat-result">
        {showResult && result ? (
          <BodyFatResultDisplay
            result={result}
            age={age}
            gender={gender}
            weightUnit={weight.unit}
            method={methodLabel}
          />
        ) : (
          <BodyFatInfo />
        )}

        {/* Recommended Products - shown after calculation */}
        {showResult && result && (
          <AffiliateLinks
            calculatorType="body-fat"
            title="Recommended Products for Body Composition Tracking"
            maxProducts={6}
            showDisclosure={true}
            className="my-8"
          />
        )}
      </div>
    </CalculatorPageLayout>
  );
}
