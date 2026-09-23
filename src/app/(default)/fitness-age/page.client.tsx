'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { ResultsShareBar, ResultsShareProvider } from '@/components/ResultsShare';
import { useLocale } from '@/context/LocaleContext';
import { calculateFitnessAge, type FitnessAgeResult } from '@/utils/calculators/fitnessAge';
import { buildSharedResultToken } from '@/utils/resultSharing';
import {
  requestCalculatorFormSubmit,
  useSharedResultPrefill,
} from '@/hooks/useSharedResultPrefill';
import { Gender } from '@/types/common';
import { formatNumber } from '@/utils/formatNumber';
import { focusFirstInvalidField } from '@/utils/focusFirstInvalidField';

type FitnessAgeFormState = {
  age: number | '';
  gender: Gender;
  vo2Max: number | '';
  restingHeartRate: number | '';
  bmi: number | '';
  bodyFatPercentage: number | '';
  weeklyTrainingDays: number | '';
  balanceScore: 1 | 2 | 3 | 4 | 5;
  flexibilityScore: 1 | 2 | 3 | 4 | 5;
};

const INITIAL_STATE: FitnessAgeFormState = {
  age: '',
  gender: 'female',
  vo2Max: '',
  restingHeartRate: '',
  bmi: '',
  bodyFatPercentage: '',
  weeklyTrainingDays: '',
  balanceScore: 3,
  flexibilityScore: 3,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

type FitnessAgeResultCardProps = {
  localizePath: ReturnType<typeof useLocale>['localizePath'];
  result: FitnessAgeResult | null;
  scorePercent: number;
};

function FitnessAgeResultCard({
  localizePath,
  result,
  scorePercent,
}: FitnessAgeResultCardProps): React.JSX.Element {
  return (
    <div className="glass-panel rounded-2xl p-6" id="fitness-age-result">
      <h2 className="mb-4 text-lg font-semibold">Your Result</h2>
      {result ? (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-300">Estimated Fitness Age</p>
          <p className="text-5xl font-bold leading-tight">{formatNumber(result.fitnessAge, 1)}</p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{result.summary}</p>

          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
              <span>Older profile</span>
              <span>Younger profile</span>
            </div>
            <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500"
                style={{ width: `${scorePercent}%` }}
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="neumorph-inset rounded-lg p-3">
              <p className="text-xs uppercase tracking-wide opacity-60">Age Gap</p>
              <p className="text-lg font-semibold">
                {result.ageGap >= 0 ? '+' : ''}
                {formatNumber(result.ageGap, 1)} years
              </p>
            </div>
            <div className="neumorph-inset rounded-lg p-3">
              <p className="text-xs uppercase tracking-wide opacity-60">Confidence</p>
              <p className="text-lg font-semibold capitalize">{result.confidenceLabel}</p>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-sm">
            <p className="font-medium">Component breakdown (years)</p>
            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
              <li>Aerobic capacity: {formatNumber(result.components.aerobicAdjustment, 1)}</li>
              <li>Resting HR: {formatNumber(result.components.heartRateAdjustment, 1)}</li>
              <li>Training volume: {formatNumber(result.components.trainingAdjustment, 1)}</li>
              <li>Mobility/balance: {formatNumber(result.components.mobilityAdjustment, 1)}</li>
              <li>BMI penalty: {formatNumber(result.components.bmiPenalty, 1)}</li>
              <li>Body-fat penalty: {formatNumber(result.components.bodyFatPenalty, 1)}</li>
            </ul>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Complete the quiz to get your estimated fitness age and a breakdown of what most
          influences it.
        </p>
      )}

      <div className="mt-6">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide opacity-60">
          Improve Inputs
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Link
            href={localizePath('/vo2-max')}
            className="glass-panel rounded-lg px-3 py-2 transition hover:border-accent/40 hover:text-accent"
          >
            VO2 Max
          </Link>
          <Link
            href={localizePath('/resting-heart-rate')}
            className="glass-panel rounded-lg px-3 py-2 transition hover:border-accent/40 hover:text-accent"
          >
            Resting HR
          </Link>
          <Link
            href={localizePath('/bmi')}
            className="glass-panel rounded-lg px-3 py-2 transition hover:border-accent/40 hover:text-accent"
          >
            BMI
          </Link>
          <Link
            href={localizePath('/body-fat')}
            className="glass-panel rounded-lg px-3 py-2 transition hover:border-accent/40 hover:text-accent"
          >
            Body Fat
          </Link>
        </div>
      </div>
    </div>
  );
}

type NumericField =
  'age' | 'vo2Max' | 'restingHeartRate' | 'bmi' | 'bodyFatPercentage' | 'weeklyTrainingDays';

type FieldErrors = Partial<Record<NumericField, string>>;

const FIELD_RULES: Record<NumericField, { label: string; min: number; max: number }> = {
  age: { label: 'your age', min: 14, max: 95 },
  vo2Max: { label: 'your VO2 max', min: 10, max: 85 },
  restingHeartRate: { label: 'your resting heart rate', min: 35, max: 130 },
  bmi: { label: 'your BMI', min: 12, max: 60 },
  bodyFatPercentage: { label: 'your body fat percentage', min: 3, max: 65 },
  weeklyTrainingDays: { label: 'training days per week', min: 0, max: 7 },
};

/** Per-field messages that say how to fix the value, shown next to each input. */
function validateFitnessAgeForm(form: FitnessAgeFormState): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of Object.keys(FIELD_RULES) as NumericField[]) {
    const { label, min, max } = FIELD_RULES[field];
    const value = form[field];
    if (typeof value !== 'number') {
      errors[field] = `Enter ${label}.`;
    } else if (value < min || value > max) {
      errors[field] = `Enter ${label} between ${min} and ${max}.`;
    }
  }
  return errors;
}

type FitnessAgeFormCardProps = {
  error: string | null;
  fieldErrors: FieldErrors;
  form: FitnessAgeFormState;
  handleCalculate: (event: React.FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  setForm: React.Dispatch<React.SetStateAction<FitnessAgeFormState>>;
};

function FitnessAgeFormCard({
  error,
  fieldErrors,
  form,
  handleCalculate,
  handleReset,
  setForm,
}: FitnessAgeFormCardProps): React.JSX.Element {
  return (
    <div className="neumorph rounded-2xl p-6">
      <h2 className="mb-4 text-lg font-semibold">Fitness Age Quiz Inputs</h2>

      <form className="space-y-4" data-calculator-form="1" onSubmit={handleCalculate}>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="mb-1 block font-medium">Age</span>
            <input
              name="age"
              aria-invalid={fieldErrors.age ? true : undefined}
              aria-describedby={fieldErrors.age ? 'fitness-age-error' : undefined}
              autoComplete="off"
              inputMode="decimal"
              type="number"
              className="w-full rounded-lg p-3 neumorph-inset"
              value={form.age}
              min={14}
              max={95}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  age: e.target.value === '' ? '' : Number(e.target.value),
                }))
              }
              placeholder="e.g. 35…"
            />
            {fieldErrors.age ? (
              <span
                id="fitness-age-error"
                role="alert"
                className="mt-1 block text-xs text-red-600 dark:text-red-400"
              >
                {fieldErrors.age}
              </span>
            ) : null}
          </label>

          <fieldset>
            <legend className="mb-1 block text-sm font-medium">Gender</legend>
            <div className="flex gap-4 pt-2">
              {(['female', 'male'] as const).map(value => (
                <label key={value} className="text-sm">
                  <input
                    name="gender"
                    value={value}
                    type="radio"
                    className="mr-2"
                    checked={form.gender === value}
                    onChange={() => setForm(prev => ({ ...prev, gender: value }))}
                  />
                  {value === 'female' ? 'Female' : 'Male'}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <label className="text-sm">
          <span className="mb-1 block font-medium">VO2 Max (ml/kg/min)</span>
          <input
            name="vo2Max"
            aria-invalid={fieldErrors.vo2Max ? true : undefined}
            aria-describedby={fieldErrors.vo2Max ? 'fitness-vo2Max-error' : undefined}
            autoComplete="off"
            inputMode="decimal"
            type="number"
            className="w-full rounded-lg p-3 neumorph-inset"
            value={form.vo2Max}
            min={10}
            max={85}
            step="0.1"
            onChange={e =>
              setForm(prev => ({
                ...prev,
                vo2Max: e.target.value === '' ? '' : Number(e.target.value),
              }))
            }
          />
          {fieldErrors.vo2Max ? (
            <span
              id="fitness-vo2Max-error"
              role="alert"
              className="mt-1 block text-xs text-red-600 dark:text-red-400"
            >
              {fieldErrors.vo2Max}
            </span>
          ) : null}
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium">Resting Heart Rate (bpm)</span>
          <input
            name="restingHeartRate"
            aria-invalid={fieldErrors.restingHeartRate ? true : undefined}
            aria-describedby={
              fieldErrors.restingHeartRate ? 'fitness-restingHeartRate-error' : undefined
            }
            autoComplete="off"
            inputMode="decimal"
            type="number"
            className="w-full rounded-lg p-3 neumorph-inset"
            value={form.restingHeartRate}
            min={35}
            max={130}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                restingHeartRate: e.target.value === '' ? '' : Number(e.target.value),
              }))
            }
          />
          {fieldErrors.restingHeartRate ? (
            <span
              id="fitness-restingHeartRate-error"
              role="alert"
              className="mt-1 block text-xs text-red-600 dark:text-red-400"
            >
              {fieldErrors.restingHeartRate}
            </span>
          ) : null}
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="mb-1 block font-medium">BMI</span>
            <input
              name="bmi"
              aria-invalid={fieldErrors.bmi ? true : undefined}
              aria-describedby={fieldErrors.bmi ? 'fitness-bmi-error' : undefined}
              autoComplete="off"
              inputMode="decimal"
              type="number"
              className="w-full rounded-lg p-3 neumorph-inset"
              value={form.bmi}
              min={12}
              max={60}
              step="0.1"
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  bmi: e.target.value === '' ? '' : Number(e.target.value),
                }))
              }
            />
            {fieldErrors.bmi ? (
              <span
                id="fitness-bmi-error"
                role="alert"
                className="mt-1 block text-xs text-red-600 dark:text-red-400"
              >
                {fieldErrors.bmi}
              </span>
            ) : null}
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-medium">Body Fat (%)</span>
            <input
              name="bodyFatPercentage"
              aria-invalid={fieldErrors.bodyFatPercentage ? true : undefined}
              aria-describedby={
                fieldErrors.bodyFatPercentage ? 'fitness-bodyFatPercentage-error' : undefined
              }
              autoComplete="off"
              inputMode="decimal"
              type="number"
              className="w-full rounded-lg p-3 neumorph-inset"
              value={form.bodyFatPercentage}
              min={3}
              max={65}
              step="0.1"
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  bodyFatPercentage: e.target.value === '' ? '' : Number(e.target.value),
                }))
              }
            />
            {fieldErrors.bodyFatPercentage ? (
              <span
                id="fitness-bodyFatPercentage-error"
                role="alert"
                className="mt-1 block text-xs text-red-600 dark:text-red-400"
              >
                {fieldErrors.bodyFatPercentage}
              </span>
            ) : null}
          </label>
        </div>

        <label className="text-sm">
          <span className="mb-1 block font-medium">Training Days per Week</span>
          <input
            name="weeklyTrainingDays"
            aria-invalid={fieldErrors.weeklyTrainingDays ? true : undefined}
            aria-describedby={
              fieldErrors.weeklyTrainingDays ? 'fitness-weeklyTrainingDays-error' : undefined
            }
            autoComplete="off"
            inputMode="decimal"
            type="number"
            className="w-full rounded-lg p-3 neumorph-inset"
            value={form.weeklyTrainingDays}
            min={0}
            max={7}
            onChange={e =>
              setForm(prev => ({
                ...prev,
                weeklyTrainingDays: e.target.value === '' ? '' : Number(e.target.value),
              }))
            }
          />
          {fieldErrors.weeklyTrainingDays ? (
            <span
              id="fitness-weeklyTrainingDays-error"
              role="alert"
              className="mt-1 block text-xs text-red-600 dark:text-red-400"
            >
              {fieldErrors.weeklyTrainingDays}
            </span>
          ) : null}
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="mb-1 block font-medium">Balance Self-Rating (1-5)</span>
            <select
              name="balanceScore"
              className="w-full rounded-lg p-3 neumorph-inset"
              value={form.balanceScore}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  balanceScore: Number(e.target.value) as 1 | 2 | 3 | 4 | 5,
                }))
              }
            >
              <option value={1}>1 - Very low</option>
              <option value={2}>2 - Below average</option>
              <option value={3}>3 - Average</option>
              <option value={4}>4 - Good</option>
              <option value={5}>5 - Excellent</option>
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-medium">Flexibility Self-Rating (1-5)</span>
            <select
              name="flexibilityScore"
              className="w-full rounded-lg p-3 neumorph-inset"
              value={form.flexibilityScore}
              onChange={e =>
                setForm(prev => ({
                  ...prev,
                  flexibilityScore: Number(e.target.value) as 1 | 2 | 3 | 4 | 5,
                }))
              }
            >
              <option value={1}>1 - Very low</option>
              <option value={2}>2 - Below average</option>
              <option value={3}>3 - Average</option>
              <option value={4}>4 - Good</option>
              <option value={5}>5 - Excellent</option>
            </select>
          </label>
        </div>

        {error ? (
          <div
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <button type="submit" className="ui-btn-primary">
            Calculate Fitness Age
          </button>
          <button type="button" className="ui-btn-soft" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default function FitnessAgePageClient(): React.JSX.Element {
  const { localizePath } = useLocale();
  const [form, setForm] = useState<FitnessAgeFormState>(INITIAL_STATE);
  const [result, setResult] = useState<FitnessAgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const sharedPrefill = useSharedResultPrefill('fitness-age');
  const hasAppliedSharedPrefill = useRef(false);

  useEffect(() => {
    if (!sharedPrefill || hasAppliedSharedPrefill.current) return;

    hasAppliedSharedPrefill.current = true;
    setForm({
      age: sharedPrefill.age,
      gender: sharedPrefill.gender,
      vo2Max: sharedPrefill.vo2Max,
      restingHeartRate: sharedPrefill.restingHeartRate,
      bmi: sharedPrefill.bmi,
      bodyFatPercentage: sharedPrefill.bodyFatPercentage,
      weeklyTrainingDays: sharedPrefill.weeklyTrainingDays,
      balanceScore: sharedPrefill.balanceScore,
      flexibilityScore: sharedPrefill.flexibilityScore,
    });

    requestCalculatorFormSubmit();
  }, [sharedPrefill]);

  const scorePercent = useMemo(() => {
    if (!result) return 50;
    return clamp(Math.round(((result.ageGap + 15) / 30) * 100), 0, 100);
  }, [result]);

  const shareToken = useMemo(() => {
    if (
      !result ||
      typeof form.age !== 'number' ||
      typeof form.vo2Max !== 'number' ||
      typeof form.restingHeartRate !== 'number' ||
      typeof form.bmi !== 'number' ||
      typeof form.bodyFatPercentage !== 'number' ||
      typeof form.weeklyTrainingDays !== 'number'
    ) {
      return undefined;
    }

    return buildSharedResultToken({
      calculator: 'fitness-age',
      inputs: {
        age: form.age,
        gender: form.gender,
        vo2Max: form.vo2Max,
        restingHeartRate: form.restingHeartRate,
        bmi: form.bmi,
        bodyFatPercentage: form.bodyFatPercentage,
        weeklyTrainingDays: form.weeklyTrainingDays,
        balanceScore: form.balanceScore,
        flexibilityScore: form.flexibilityScore,
      },
    });
  }, [form, result]);

  const handleCalculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const nextFieldErrors = validateFitnessAgeForm(form);
    setFieldErrors(nextFieldErrors);
    if (
      Object.keys(nextFieldErrors).length > 0 ||
      typeof form.age !== 'number' ||
      typeof form.vo2Max !== 'number' ||
      typeof form.restingHeartRate !== 'number' ||
      typeof form.bmi !== 'number' ||
      typeof form.bodyFatPercentage !== 'number' ||
      typeof form.weeklyTrainingDays !== 'number'
    ) {
      focusFirstInvalidField(event.currentTarget);
      return;
    }

    const computed = calculateFitnessAge({
      age: form.age,
      gender: form.gender,
      vo2Max: form.vo2Max,
      restingHeartRate: form.restingHeartRate,
      bmi: form.bmi,
      bodyFatPercentage: form.bodyFatPercentage,
      weeklyTrainingDays: form.weeklyTrainingDays,
      balanceScore: form.balanceScore,
      flexibilityScore: form.flexibilityScore,
    });

    setResult(computed);
  };

  const handleReset = () => {
    setForm(INITIAL_STATE);
    setResult(null);
    setError(null);
    setFieldErrors({});
  };

  return (
    <ResultsShareProvider>
      <div className="mx-auto max-w-5xl">
        <Breadcrumb />
        <h1 className="mb-2 text-3xl font-bold">What’s Your Fitness Age?</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          This estimate combines cardio capacity, resting heart rate, body composition, and movement
          habits into a single age-style score.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <FitnessAgeFormCard
            error={error}
            fieldErrors={fieldErrors}
            form={form}
            handleCalculate={handleCalculate}
            handleReset={handleReset}
            setForm={setForm}
          />
          <FitnessAgeResultCard
            localizePath={localizePath}
            result={result}
            scorePercent={scorePercent}
          />
        </div>

        {result && (
          <ResultsShareBar
            calculatorSlug="fitness-age"
            title={`Fitness Age ${formatNumber(result.fitnessAge, 1)} | HealthCalc`}
            shareToken={shareToken}
            className="mt-6"
          />
        )}
      </div>
    </ResultsShareProvider>
  );
}
