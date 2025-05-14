'use client';

import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import dynamic from 'next/dynamic';
import { createLogger } from '@/utils/logger';
import {
  calculateBMI,
  getBMICategory,
  calculateHealthyWeightRange,
  estimateBMIPercentile,
  getBMIPercentileCategory,
} from '@/utils/calculators/bmi';
import { BMIResult } from '@/types/bmi';
import { Gender } from '@/types/common';
import { validateAge, validateHeight, validateWeight, isEmpty } from '@/utils/validation';
import { convertWeight } from '@/utils/conversions';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import BMIInfo from '@/components/calculators/bmi/BMIInfo';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';
import { useLocale } from '@/context/LocaleContext';
import { toAbsoluteUrl } from '@/lib/site';
import { useChainPrefill } from '@/hooks/useChainPrefill';
import {
  requestCalculatorFormSubmit,
  useSharedResultPrefill,
} from '@/hooks/useSharedResultPrefill';
import type { BMIPageCopy } from '@/i18n/pages/bmi';
import type { SharedResultInputMap } from '@/utils/resultSharing';

const logger = createLogger({ component: 'BMICalculatorClient' });

const BMIUnderstanding = dynamic(() => import('@/components/calculators/bmi/BMIUnderstanding'));
const BMIResultDisplay = dynamic(() => import('@/components/calculators/bmi/BMIResult'));
const SaveResult = dynamic(() => import('@/components/SaveResult'));
const AffiliateLinks = dynamic(() => import('@/components/AffiliateLinks'));

const FALLBACK_RELATED_ARTICLES = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description:
      'Learn what body fat percentage ranges are healthy for men and women, how body composition differs from BMI, and why it matters for your health goals.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
  {
    title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
    description:
      'Discover how Total Daily Energy Expenditure (TDEE) works, which formula is most accurate for you, and how to use it for weight management.',
    slug: 'tdee-explained',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Metabolism',
  },
  {
    title: 'Waist-to-Hip Ratio Guide: What Your Measurements Reveal',
    description:
      'Discover how waist-to-hip ratio (WHR) indicates health risks, proper measurement techniques, and what healthy ratios look like for men and women.',
    slug: 'waist-to-hip-ratio-guide',
    date: 'February 12, 2025',
    readTime: '10 min read',
    category: 'Body Composition',
  },
];

function stripLabelSuffix(label: string): string {
  return label.replace(/[:：]\s*$/, '').trim();
}

function localizeBmiCategory(category: string, copy: BMIPageCopy): string {
  const lower = category.trim().toLowerCase();
  if (lower === 'underweight') return copy.result.gaugeLabels.underweight;
  if (lower === 'normal') return copy.result.gaugeLabels.normal;
  if (lower === 'overweight') return copy.result.gaugeLabels.overweight;
  if (lower === 'obese') return copy.result.gaugeLabels.obese;
  if (lower === 'healthy weight') {
    const fallback = copy.result.gaugeLabels.normal;
    const fromYouthCategories = copy.info.youthCategories[1]?.label;
    return fromYouthCategories ? stripLabelSuffix(fromYouthCategories) : fallback;
  }
  return category;
}

interface BMICalculatorState {
  age: number | '';
  gender: Gender;
  isChild: boolean;
  errors: {
    age?: string;
    height?: string;
    weight?: string;
  };
  result: BMIResult | null;
  showResult: boolean;
  calculationError: string | null;
}

type BMICalculatorAction =
  | { type: 'patch'; patch: Partial<BMICalculatorState> }
  | { type: 'reset' };

type BMIFormErrors = BMICalculatorState['errors'];

const initialBMICalculatorState: BMICalculatorState = {
  age: '',
  gender: 'male',
  isChild: false,
  errors: {},
  result: null,
  showResult: false,
  calculationError: null,
};

function bmiCalculatorReducer(
  state: BMICalculatorState,
  action: BMICalculatorAction
): BMICalculatorState {
  switch (action.type) {
    case 'patch':
      return { ...state, ...action.patch };
    case 'reset':
      return initialBMICalculatorState;
    default:
      return state;
  }
}

type BMIFormFieldsArgs = {
  age: number | '';
  copy: BMIPageCopy;
  errors: BMIFormErrors;
  gender: Gender;
  height: ReturnType<typeof useHeight>;
  setAge: (value: number | '') => void;
  setGender: (value: Gender) => void;
  weight: ReturnType<typeof useWeight>;
};

function createBMIFormFields({
  age,
  copy,
  errors,
  gender,
  height,
  setAge,
  setGender,
  weight,
}: BMIFormFieldsArgs): React.ComponentProps<typeof CalculatorForm>['fields'] {
  return [
    {
      name: 'age',
      label: copy.form.ageLabel,
      type: 'number' as const,
      value: age,
      onChange: setAge,
      error: errors.age,
      placeholder: copy.form.agePlaceholder,
    },
    {
      name: 'gender',
      label: copy.form.genderLabel,
      type: 'radio' as const,
      value: gender,
      onChange: (value: string) => setGender(value as Gender),
      options: [
        { value: 'male', label: copy.form.genderMale },
        { value: 'female', label: copy.form.genderFemale },
      ],
    },
    createHeightField(height, errors.height),
    createWeightField(weight, errors.weight),
  ];
}

type BMIResultPanelProps = {
  copy: BMIPageCopy;
  gender: Gender;
  handleReset: () => void;
  isChild: boolean;
  localizedResult: BMIResult | null;
  result: BMIResult | null;
  showResult: boolean;
  weight: ReturnType<typeof useWeight>;
  age: number | '';
};

function BMIResultPanel({
  age,
  copy,
  gender,
  handleReset,
  isChild,
  localizedResult,
  result,
  showResult,
  weight,
}: BMIResultPanelProps): React.JSX.Element {
  return (
    <div className="md:col-span-2" id="bmi-result">
      {showResult && result && localizedResult ? (
        <>
          <BMIResultDisplay
            result={localizedResult}
            isChild={isChild}
            age={typeof age === 'number' ? age : undefined}
            gender={gender}
            weightUnit={weight.unit}
            copy={copy.result}
          />

          <div className="mt-6 flex items-center justify-between">
            <SaveResult
              calculatorType="bmi"
              calculatorName={copy.page.title}
              data={{
                bmi: result.bmi,
                category: result.category,
                healthyWeightRange: result.healthyWeightRange,
                isChild,
                ...(isChild && {
                  percentile: result.percentile,
                }),
              }}
            />

            <button
              onClick={handleReset}
              className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300"
            >
              {copy.form.newCalculation}
            </button>
          </div>
        </>
      ) : (
        <BMIInfo copy={copy.info} />
      )}

      {showResult && result ? (
        <AffiliateLinks
          calculatorType="bmi"
          title={copy.affiliate.title}
          maxProducts={6}
          showDisclosure={true}
          className="my-8"
        />
      ) : null}
    </div>
  );
}

type SubmitBMIFormArgs = {
  age: number | '';
  copy: BMIPageCopy;
  gender: Gender;
  height: ReturnType<typeof useHeight>;
  setCalculationError: (value: string | null) => void;
  setErrors: (value: BMIFormErrors) => void;
  setIsChild: (value: boolean) => void;
  setResult: (value: BMIResult | null) => void;
  setShowResult: (value: boolean) => void;
  weight: ReturnType<typeof useWeight>;
};

function submitBMIForm({
  age,
  copy,
  gender,
  height,
  setCalculationError,
  setErrors,
  setIsChild,
  setResult,
  setShowResult,
  weight,
}: SubmitBMIFormArgs): void {
  setCalculationError(null);

  const newErrors: BMIFormErrors = {};

  if (isEmpty(age)) {
    newErrors.age = copy.form.errors.ageRequired;
  } else {
    const ageValidation = validateAge(age);
    if (!ageValidation.isValid) {
      newErrors.age = ageValidation.error;
    }
  }

  if (isEmpty(height.value)) {
    newErrors.height = copy.form.errors.heightRequired;
  } else {
    const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
    const heightValidation = validateHeight(height.value, unitSystem);
    if (!heightValidation.isValid) {
      newErrors.height = heightValidation.error;
    }
  }

  if (isEmpty(weight.value)) {
    newErrors.weight = copy.form.errors.weightRequired;
  } else {
    const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
    const weightValidation = validateWeight(weight.value, unitSystem);
    if (!weightValidation.isValid) {
      newErrors.weight = weightValidation.error;
    }
  }

  setErrors(newErrors);

  const heightCm = height.toCm();
  const weightKg = weight.toKg();

  if (
    Object.keys(newErrors).length !== 0 ||
    typeof age !== 'number' ||
    heightCm === null ||
    weightKg === null
  ) {
    return;
  }

  try {
    const childStatus = age < 20;
    setIsChild(childStatus);

    const bmi = calculateBMI(heightCm, weightKg);
    const healthyWeightRange = calculateHealthyWeightRange(heightCm);
    const displayHealthyWeightRange = {
      min:
        weight.unit === 'kg'
          ? healthyWeightRange.min
          : convertWeight(healthyWeightRange.min, 'kg', 'lb'),
      max:
        weight.unit === 'kg'
          ? healthyWeightRange.max
          : convertWeight(healthyWeightRange.max, 'kg', 'lb'),
    };

    const bmiResult = childStatus
      ? (() => {
          const percentile = estimateBMIPercentile(bmi, age, gender);
          const { name: category, color } = getBMIPercentileCategory(percentile);

          return {
            bmi: Math.round(bmi * 10) / 10,
            category,
            color,
            healthyWeightRange: displayHealthyWeightRange,
            percentile,
          };
        })()
      : (() => {
          const { name: category, color } = getBMICategory(bmi);

          return {
            bmi: Math.round(bmi * 10) / 10,
            category,
            color,
            healthyWeightRange: displayHealthyWeightRange,
          };
        })();

    setResult(bmiResult);
    setShowResult(true);

    setTimeout(() => {
      const resultElement = document.getElementById('bmi-result');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' });
        resultElement.focus({ preventScroll: true });
      }
    }, 100);
  } catch (error) {
    logger.logError('Error calculating BMI', error);
    setCalculationError(copy.form.calculationErrorGeneric);
  }
}

export default function BMICalculatorClient({
  copy,
  serverHeader,
  initialSharedPrefill = null,
}: {
  copy: BMIPageCopy;
  serverHeader?: React.ReactNode;
  initialSharedPrefill?: SharedResultInputMap['bmi'] | null;
}) {
  const { localizePath } = useLocale();
  const [state, dispatchState] = useReducer(bmiCalculatorReducer, initialBMICalculatorState);
  const { age, gender, isChild, errors, result, showResult, calculationError } = state;
  const height = useHeight();
  const weight = useWeight();
  const chainPrefill = useChainPrefill('bmi');
  const querySharedPrefill = useSharedResultPrefill('bmi');
  const sharedPrefill = initialSharedPrefill ?? querySharedPrefill;
  const hasAppliedSharedPrefill = useRef(false);

  useEffect(() => {
    if (!chainPrefill) return;
    if (typeof chainPrefill.age === 'number')
      dispatchState({ type: 'patch', patch: { age: chainPrefill.age } });
    if (chainPrefill.gender === 'male' || chainPrefill.gender === 'female')
      dispatchState({ type: 'patch', patch: { gender: chainPrefill.gender as Gender } });
    if (typeof chainPrefill.height === 'number') height.setValue(chainPrefill.height);
    if (typeof chainPrefill.weight === 'number') weight.setValue(chainPrefill.weight);
  }, [chainPrefill, height, weight]);

  useEffect(() => {
    if (!sharedPrefill || hasAppliedSharedPrefill.current) return;

    hasAppliedSharedPrefill.current = true;
    dispatchState({
      type: 'patch',
      patch: {
        age: sharedPrefill.age,
        gender: sharedPrefill.gender,
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

  const shareResultContext = useMemo(() => {
    const heightCm = height.toCm();
    const weightKg = weight.toKg();

    if (!showResult || typeof age !== 'number' || heightCm === null || weightKg === null) {
      return undefined;
    }

    return {
      calculator: 'bmi' as const,
      inputs: {
        age,
        gender,
        heightCm,
        weightKg,
      },
    };
  }, [age, gender, height, showResult, weight]);

  const setAge = useCallback((value: number | '') => {
    dispatchState({ type: 'patch', patch: { age: value } });
  }, []);

  const setGender = useCallback((value: Gender) => {
    dispatchState({ type: 'patch', patch: { gender: value } });
  }, []);

  const setIsChild = useCallback((value: boolean) => {
    dispatchState({ type: 'patch', patch: { isChild: value } });
  }, []);

  const setErrors = useCallback((value: BMICalculatorState['errors']) => {
    dispatchState({ type: 'patch', patch: { errors: value } });
  }, []);

  const setResult = useCallback((value: BMIResult | null) => {
    dispatchState({ type: 'patch', patch: { result: value } });
  }, []);

  const setShowResult = useCallback((value: boolean) => {
    dispatchState({ type: 'patch', patch: { showResult: value } });
  }, []);

  const setCalculationError = useCallback((value: string | null) => {
    dispatchState({ type: 'patch', patch: { calculationError: value } });
  }, []);

  const relatedArticles =
    copy.relatedArticles.length > 0 ? copy.relatedArticles : FALLBACK_RELATED_ARTICLES;

  const localizedResult = useMemo(() => {
    if (!result) return null;
    return {
      ...result,
      category: localizeBmiCategory(result.category, copy),
    };
  }, [copy, result]);

  const structuredDataUrl = useMemo(() => toAbsoluteUrl(localizePath('/bmi')), [localizePath]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      submitBMIForm({
        age,
        copy,
        gender,
        height,
        setCalculationError,
        setErrors,
        setIsChild,
        setResult,
        setShowResult,
        weight,
      });
    },
    [
      age,
      copy,
      gender,
      height,
      setCalculationError,
      setErrors,
      setIsChild,
      setResult,
      setShowResult,
      weight,
    ]
  );

  const handleReset = () => {
    dispatchState({ type: 'reset' });
    height.setValue('');
    weight.setValue('');
  };

  const formFields = useMemo(
    () =>
      createBMIFormFields({
        age,
        copy,
        errors,
        gender,
        height,
        setAge,
        setGender,
        weight,
      }),
    [age, copy, errors, gender, height, setAge, setGender, weight]
  );

  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
      title={copy.page.title}
      description={copy.page.description}
      calculatorSlug="bmi"
      shareTitle={copy.page.shareTitle}
      shareDescription={copy.page.shareDescription}
      shareHashtags={copy.page.shareHashtags}
      faqs={copy.faqs}
      faqTitle={copy.page.faqTitle}
      relatedArticles={relatedArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: copy.page.title,
        description: copy.page.shareDescription,
        url: structuredDataUrl,
      }}
      understandingSection={<BMIUnderstanding copy={copy.understanding} />}
      newsletterDescription={copy.page.newsletterDescription}
      showResultsCapture={showResult}
      chainResultData={chainResultData}
      shareResultContext={shareResultContext}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title={copy.form.title}
          fields={formFields}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />

        {calculationError && (
          <div
            className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mt-4"
            role="alert"
            aria-live="assertive"
          >
            {calculationError}
          </div>
        )}
      </div>
      <BMIResultPanel
        age={age}
        copy={copy}
        gender={gender}
        handleReset={handleReset}
        isChild={isChild}
        localizedResult={localizedResult}
        result={result}
        showResult={showResult}
        weight={weight}
      />
    </CalculatorPageLayout>
  );
}
