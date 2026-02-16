'use client';

import React, { useCallback, useMemo, useState } from 'react';
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
import BMIResultDisplay from '@/components/calculators/bmi/BMIResult';
import BMIInfo from '@/components/calculators/bmi/BMIInfo';
import SaveResult from '@/components/SaveResult';
import AffiliateLinks from '@/components/AffiliateLinks';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';
import { useLocale } from '@/context/LocaleContext';
import { toAbsoluteUrl } from '@/lib/site';
import type { BMIPageCopy } from '@/i18n/pages/bmi';

const logger = createLogger({ component: 'BMICalculatorClient' });

const BMIUnderstanding = dynamic(() => import('@/components/calculators/bmi/BMIUnderstanding'));

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

export default function BMICalculatorClient({ copy }: { copy: BMIPageCopy }) {
  const { localizePath } = useLocale();

  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<Gender>('male');
  const height = useHeight();
  const weight = useWeight();
  const [isChild, setIsChild] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
  }>({});

  const [result, setResult] = useState<BMIResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);

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
      setCalculationError(null);

      const newErrors: {
        age?: string;
        height?: string;
        weight?: string;
      } = {};

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
        Object.keys(newErrors).length === 0 &&
        typeof age === 'number' &&
        heightCm !== null &&
        weightKg !== null
      ) {
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

          let bmiResult: BMIResult;

          if (childStatus) {
            const percentile = estimateBMIPercentile(bmi, age, gender);
            const { name: category, color } = getBMIPercentileCategory(percentile);

            bmiResult = {
              bmi: Math.round(bmi * 10) / 10,
              category,
              color,
              healthyWeightRange: displayHealthyWeightRange,
              percentile,
            };
          } else {
            const { name: category, color } = getBMICategory(bmi);

            bmiResult = {
              bmi: Math.round(bmi * 10) / 10,
              category,
              color,
              healthyWeightRange: displayHealthyWeightRange,
            };
          }

          setResult(bmiResult);
          setShowResult(true);

          setTimeout(() => {
            const resultElement = document.getElementById('bmi-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating BMI', error);
          setCalculationError(copy.form.calculationErrorGeneric);
        }
      }
    },
    [age, copy.form.calculationErrorGeneric, copy.form.errors, gender, height, weight]
  );

  const handleReset = useCallback(() => {
    setAge('');
    setGender('male');
    height.setValue('');
    weight.setValue('');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, [height, weight]);

  const formFields = useMemo(
    () => [
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
    ],
    [age, copy.form, errors, gender, height, weight]
  );

  return (
    <CalculatorPageLayout
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
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title={copy.form.title}
          fields={formFields}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />

        {calculationError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mt-4">
            {calculationError}
          </div>
        )}
      </div>

      <div className="md:col-span-2" id="bmi-result">
        {showResult && result && localizedResult ? (
          <>
            <BMIResultDisplay
              result={localizedResult}
              isChild={isChild}
              weightUnit={weight.unit}
              copy={copy.result}
            />

            <div className="mt-6 flex justify-between items-center">
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
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {copy.form.newCalculation}
              </button>
            </div>
          </>
        ) : (
          <BMIInfo copy={copy.info} />
        )}

        {showResult && result && (
          <AffiliateLinks
            calculatorType="bmi"
            title={copy.affiliate.title}
            maxProducts={6}
            showDisclosure={true}
            className="my-8"
          />
        )}
      </div>
    </CalculatorPageLayout>
  );
}
