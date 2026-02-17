'use client';

import React, { useState, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'ACFTCalculator' });
import { calculateACFT } from '@/utils/calculators/acftCalculator';
import { ACFTResult, ACFTFormValues, ACFTAgeGroup } from '@/types/acftCalculator';
import { AGE_GROUP_LABELS, EVENT_NAMES } from '@/constants/acftCalculator';
import { isEmpty } from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import ACFTResultDisplay from '@/components/calculators/acftCalculator/ACFTResult';
import SaveResult from '@/components/SaveResult';

const faqs = [
  {
    question: 'What is the ACFT and how is it scored?',
    answer:
      "The Army Combat Fitness Test (ACFT) is the U.S. Army's official fitness assessment, replacing the older APFT. It consists of 6 events: 3 Repetition Maximum Deadlift, Standing Power Throw, Hand Release Push-Ups, Sprint-Drag-Carry, Plank, and 2-Mile Run. Each event is scored from 0-100 points, for a maximum total of 600. A minimum of 60 points per event is required to pass, and the overall minimum passing score is 360. Soldiers who score 540+ earn Gold tier, 480+ Silver, and 420+ Bronze.",
  },
  {
    question: 'What are the minimum passing standards for the ACFT?',
    answer:
      'To pass the ACFT, you must score at least 60 points on every event. There is no passing by total score alone. If you score 100 on five events but only 50 on one, you fail. The minimum passing total is 360 points (60 per event times 6 events). Standards differ by gender: for example, the male minimum deadlift for 60 points is approximately 200 lbs, while the female minimum is approximately 130 lbs.',
  },
  {
    question: 'How do age groups affect ACFT scoring?',
    answer:
      'As of the current ACFT implementation, the test uses gender-based scoring tables rather than age-specific tables for determining raw score-to-point conversions. However, age groups may affect promotion-board considerations and commander assessments. The 10 age groups range from 17-21 up to 62+. All soldiers, regardless of age, must meet the same minimum passing score of 60 points per event.',
  },
  {
    question: 'How should I prepare for the Sprint-Drag-Carry event?',
    answer:
      'The Sprint-Drag-Carry (SDC) is a complex event with five 50-meter shuttles: sprint, sled drag (90 lbs), lateral shuffle, hand-carry (two 40-lb kettlebells), and sprint. Train with actual sled drags if possible, farmer carries with heavy kettlebells or dumbbells, lateral agility drills, and short sprint intervals. Practice transitions between movements. Most soldiers lose time on the sled drag and carries, so prioritize grip strength and posterior chain conditioning.',
  },
  {
    question: 'What is the best way to improve my 2-Mile Run time?',
    answer:
      'Improving your 2-Mile Run requires a mix of training approaches. Run at least 3-4 times per week, mixing easy runs (conversational pace) for base building, tempo runs at your target pace, and interval sessions (400m or 800m repeats). Gradually increase weekly mileage by no more than 10% per week. Many soldiers also benefit from strength training for running economy, especially single-leg exercises and core work. Avoid running the same distance at the same pace every day.',
  },
  {
    question: 'How often should I take the ACFT?',
    answer:
      'The Army requires soldiers to take a record ACFT at least once per year (twice per year for most). You can take diagnostic (practice) tests more frequently to track progress. Allow at least 4-6 weeks of focused training between test attempts to see meaningful improvement. Taking a diagnostic monthly while training is a good strategy for identifying weaknesses and measuring progress without the pressure of a record test.',
  },
];

const blogArticles = [
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
];

export default function ACFTCalculator() {
  // Form state
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [ageGroup, setAgeGroup] = useState<ACFTAgeGroup>('22-26');
  const [deadliftWeight, setDeadliftWeight] = useState<number | ''>('');
  const [standingPowerThrow, setStandingPowerThrow] = useState<number | ''>('');
  const [handReleasePushups, setHandReleasePushups] = useState<number | ''>('');
  const [sdcMinutes, setSdcMinutes] = useState<number | ''>('');
  const [sdcSeconds, setSdcSeconds] = useState<number | ''>('');
  const [plankMinutes, setPlankMinutes] = useState<number | ''>('');
  const [plankSeconds, setPlankSeconds] = useState<number | ''>('');
  const [tmrMinutes, setTmrMinutes] = useState<number | ''>('');
  const [tmrSeconds, setTmrSeconds] = useState<number | ''>('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Result state
  const [result, setResult] = useState<ACFTResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCalculationError(null);

      const newErrors: Record<string, string> = {};

      // Validate deadlift
      if (isEmpty(deadliftWeight)) {
        newErrors.deadliftWeight = 'Deadlift weight is required';
      } else if (Number(deadliftWeight) < 0 || Number(deadliftWeight) > 600) {
        newErrors.deadliftWeight = 'Enter a weight between 0 and 600 lbs';
      }

      // Validate standing power throw
      if (isEmpty(standingPowerThrow)) {
        newErrors.standingPowerThrow = 'Standing power throw distance is required';
      } else if (Number(standingPowerThrow) < 0 || Number(standingPowerThrow) > 15) {
        newErrors.standingPowerThrow = 'Enter a distance between 0 and 15 meters';
      }

      // Validate hand release push-ups
      if (isEmpty(handReleasePushups)) {
        newErrors.handReleasePushups = 'Push-up count is required';
      } else if (Number(handReleasePushups) < 0 || Number(handReleasePushups) > 100) {
        newErrors.handReleasePushups = 'Enter reps between 0 and 100';
      }

      // Validate sprint-drag-carry time
      if (isEmpty(sdcMinutes) && isEmpty(sdcSeconds)) {
        newErrors.sprintDragCarry = 'Sprint-Drag-Carry time is required';
      } else {
        const totalSdc = (Number(sdcMinutes) || 0) * 60 + (Number(sdcSeconds) || 0);
        if (totalSdc <= 0) {
          newErrors.sprintDragCarry = 'Enter a valid time';
        } else if (totalSdc > 600) {
          newErrors.sprintDragCarry = 'Time cannot exceed 10 minutes';
        }
      }

      // Validate plank time
      if (isEmpty(plankMinutes) && isEmpty(plankSeconds)) {
        newErrors.plank = 'Plank time is required';
      } else {
        const totalPlank = (Number(plankMinutes) || 0) * 60 + (Number(plankSeconds) || 0);
        if (totalPlank <= 0) {
          newErrors.plank = 'Enter a valid time';
        } else if (totalPlank > 600) {
          newErrors.plank = 'Time cannot exceed 10 minutes';
        }
      }

      // Validate two-mile run time
      if (isEmpty(tmrMinutes) && isEmpty(tmrSeconds)) {
        newErrors.twoMileRun = 'Two-Mile Run time is required';
      } else {
        const totalTmr = (Number(tmrMinutes) || 0) * 60 + (Number(tmrSeconds) || 0);
        if (totalTmr <= 0) {
          newErrors.twoMileRun = 'Enter a valid time';
        } else if (totalTmr > 2400) {
          newErrors.twoMileRun = 'Time cannot exceed 40 minutes';
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        try {
          const sprintDragCarryTime = (Number(sdcMinutes) || 0) * 60 + (Number(sdcSeconds) || 0);
          const plankTime = (Number(plankMinutes) || 0) * 60 + (Number(plankSeconds) || 0);
          const twoMileRunTime = (Number(tmrMinutes) || 0) * 60 + (Number(tmrSeconds) || 0);

          const formValues: ACFTFormValues = {
            gender,
            ageGroup,
            deadliftWeight: Number(deadliftWeight),
            standingPowerThrow: Number(standingPowerThrow),
            handReleasePushups: Number(handReleasePushups),
            sprintDragCarryTime,
            plankTime,
            twoMileRunTime,
          };

          const acftResult = calculateACFT(formValues);
          setResult(acftResult);
          setShowResult(true);

          setTimeout(() => {
            const resultElement = document.getElementById('acft-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating ACFT score', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [
      gender,
      ageGroup,
      deadliftWeight,
      standingPowerThrow,
      handReleasePushups,
      sdcMinutes,
      sdcSeconds,
      plankMinutes,
      plankSeconds,
      tmrMinutes,
      tmrSeconds,
    ]
  );

  const handleReset = useCallback(() => {
    setGender('male');
    setAgeGroup('22-26');
    setDeadliftWeight('');
    setStandingPowerThrow('');
    setHandReleasePushups('');
    setSdcMinutes('');
    setSdcSeconds('');
    setPlankMinutes('');
    setPlankSeconds('');
    setTmrMinutes('');
    setTmrSeconds('');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, []);

  return (
    <CalculatorPageLayout
      title="ACFT Score Calculator"
      description="Calculate your Army Combat Fitness Test score across all 6 events. Enter your raw performance values to get your total score, pass/fail status, category tier, and personalized training recommendations."
      calculatorSlug="acft-calculator"
      shareTitle="ACFT Score Calculator | Army Combat Fitness Test Scoring"
      shareDescription="Calculate your ACFT score instantly. Get event-by-event breakdowns, pass/fail status, and training recommendations for all 6 events."
      shareHashtags={['ACFT', 'ArmyFitness', 'MilitaryFitness', 'CombatFitness']}
      relatedArticles={blogArticles}
      faqs={faqs}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'ACFT Score Calculator',
        description:
          'Calculate your Army Combat Fitness Test (ACFT) score across all 6 events with instant results and training recommendations.',
        url: 'https://www.healthcalc.xyz/acft-calculator',
      }}
      showResultsCapture={showResult}
    >
      <div className="space-y-8">
        <form onSubmit={handleSubmit} className="neumorph p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold mb-4">Calculate Your ACFT Score</h2>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium mb-1">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={e => setGender(e.target.value as 'male' | 'female')}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Age Group */}
          <div>
            <label htmlFor="ageGroup" className="block text-sm font-medium mb-1">
              Age Group
            </label>
            <select
              id="ageGroup"
              value={ageGroup}
              onChange={e => setAgeGroup(e.target.value as ACFTAgeGroup)}
              className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {(Object.entries(AGE_GROUP_LABELS) as [ACFTAgeGroup, string][]).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                )
              )}
            </select>
          </div>

          {/* 3 Repetition Maximum Deadlift */}
          <div>
            <label htmlFor="deadliftWeight" className="block text-sm font-medium mb-1">
              {EVENT_NAMES.deadlift} (lbs)
            </label>
            <input
              type="number"
              id="deadliftWeight"
              value={deadliftWeight}
              onChange={e =>
                setDeadliftWeight(e.target.value === '' ? '' : parseFloat(e.target.value))
              }
              className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.deadliftWeight ? 'border border-red-500' : ''
              }`}
              placeholder="Enter weight in lbs"
              min="0"
              max="600"
              step="5"
            />
            {errors.deadliftWeight && (
              <p className="text-red-500 text-sm mt-1">{errors.deadliftWeight}</p>
            )}
          </div>

          {/* Standing Power Throw */}
          <div>
            <label htmlFor="standingPowerThrow" className="block text-sm font-medium mb-1">
              {EVENT_NAMES.standingPowerThrow} (meters)
            </label>
            <input
              type="number"
              id="standingPowerThrow"
              value={standingPowerThrow}
              onChange={e =>
                setStandingPowerThrow(e.target.value === '' ? '' : parseFloat(e.target.value))
              }
              className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.standingPowerThrow ? 'border border-red-500' : ''
              }`}
              placeholder="Enter distance in meters"
              min="0"
              max="15"
              step="0.1"
            />
            {errors.standingPowerThrow && (
              <p className="text-red-500 text-sm mt-1">{errors.standingPowerThrow}</p>
            )}
          </div>

          {/* Hand Release Push-Ups */}
          <div>
            <label htmlFor="handReleasePushups" className="block text-sm font-medium mb-1">
              {EVENT_NAMES.handReleasePushups} (reps)
            </label>
            <input
              type="number"
              id="handReleasePushups"
              value={handReleasePushups}
              onChange={e =>
                setHandReleasePushups(e.target.value === '' ? '' : parseInt(e.target.value, 10))
              }
              className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.handReleasePushups ? 'border border-red-500' : ''
              }`}
              placeholder="Enter number of reps"
              min="0"
              max="100"
              step="1"
            />
            {errors.handReleasePushups && (
              <p className="text-red-500 text-sm mt-1">{errors.handReleasePushups}</p>
            )}
          </div>

          {/* Sprint-Drag-Carry */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {EVENT_NAMES.sprintDragCarry} (time)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="sdcMinutes" className="block text-xs text-gray-600 mb-1">
                  Minutes
                </label>
                <input
                  type="number"
                  id="sdcMinutes"
                  value={sdcMinutes}
                  onChange={e =>
                    setSdcMinutes(e.target.value === '' ? '' : parseInt(e.target.value, 10))
                  }
                  className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.sprintDragCarry ? 'border border-red-500' : ''
                  }`}
                  placeholder="min"
                  min="0"
                  max="10"
                  step="1"
                />
              </div>
              <div className="flex items-end pb-3 text-lg font-medium">:</div>
              <div className="flex-1">
                <label htmlFor="sdcSeconds" className="block text-xs text-gray-600 mb-1">
                  Seconds
                </label>
                <input
                  type="number"
                  id="sdcSeconds"
                  value={sdcSeconds}
                  onChange={e =>
                    setSdcSeconds(e.target.value === '' ? '' : parseInt(e.target.value, 10))
                  }
                  className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.sprintDragCarry ? 'border border-red-500' : ''
                  }`}
                  placeholder="sec"
                  min="0"
                  max="59"
                  step="1"
                />
              </div>
            </div>
            {errors.sprintDragCarry && (
              <p className="text-red-500 text-sm mt-1">{errors.sprintDragCarry}</p>
            )}
          </div>

          {/* Plank */}
          <div>
            <label className="block text-sm font-medium mb-1">{EVENT_NAMES.plank} (time)</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="plankMinutes" className="block text-xs text-gray-600 mb-1">
                  Minutes
                </label>
                <input
                  type="number"
                  id="plankMinutes"
                  value={plankMinutes}
                  onChange={e =>
                    setPlankMinutes(e.target.value === '' ? '' : parseInt(e.target.value, 10))
                  }
                  className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.plank ? 'border border-red-500' : ''
                  }`}
                  placeholder="min"
                  min="0"
                  max="10"
                  step="1"
                />
              </div>
              <div className="flex items-end pb-3 text-lg font-medium">:</div>
              <div className="flex-1">
                <label htmlFor="plankSeconds" className="block text-xs text-gray-600 mb-1">
                  Seconds
                </label>
                <input
                  type="number"
                  id="plankSeconds"
                  value={plankSeconds}
                  onChange={e =>
                    setPlankSeconds(e.target.value === '' ? '' : parseInt(e.target.value, 10))
                  }
                  className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.plank ? 'border border-red-500' : ''
                  }`}
                  placeholder="sec"
                  min="0"
                  max="59"
                  step="1"
                />
              </div>
            </div>
            {errors.plank && <p className="text-red-500 text-sm mt-1">{errors.plank}</p>}
          </div>

          {/* Two-Mile Run */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {EVENT_NAMES.twoMileRun} (time)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="tmrMinutes" className="block text-xs text-gray-600 mb-1">
                  Minutes
                </label>
                <input
                  type="number"
                  id="tmrMinutes"
                  value={tmrMinutes}
                  onChange={e =>
                    setTmrMinutes(e.target.value === '' ? '' : parseInt(e.target.value, 10))
                  }
                  className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.twoMileRun ? 'border border-red-500' : ''
                  }`}
                  placeholder="min"
                  min="0"
                  max="40"
                  step="1"
                />
              </div>
              <div className="flex items-end pb-3 text-lg font-medium">:</div>
              <div className="flex-1">
                <label htmlFor="tmrSeconds" className="block text-xs text-gray-600 mb-1">
                  Seconds
                </label>
                <input
                  type="number"
                  id="tmrSeconds"
                  value={tmrSeconds}
                  onChange={e =>
                    setTmrSeconds(e.target.value === '' ? '' : parseInt(e.target.value, 10))
                  }
                  className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.twoMileRun ? 'border border-red-500' : ''
                  }`}
                  placeholder="sec"
                  min="0"
                  max="59"
                  step="1"
                />
              </div>
            </div>
            {errors.twoMileRun && <p className="text-red-500 text-sm mt-1">{errors.twoMileRun}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 neumorph px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Calculate ACFT Score
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 neumorph px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Reset
            </button>
          </div>
        </form>

        {calculationError && (
          <div className="neumorph-inset p-4 rounded-lg border-l-4 border-red-500">
            <p className="text-red-600">{calculationError}</p>
          </div>
        )}

        {showResult && result && (
          <div className="space-y-6">
            <ACFTResultDisplay result={result} />

            <SaveResult
              calculatorType="acft-calculator"
              calculatorName="ACFT Score Calculator"
              data={{
                totalScore: result.totalScore,
                overallCategory: result.overallCategory,
                passing: result.passing,
                eventScores: result.eventScores.map(e => ({
                  event: e.eventName,
                  points: e.points,
                  rawDisplay: e.rawDisplay,
                })),
              }}
            />

            <div className="neumorph p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Understanding Your ACFT Score</h3>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Scoring:</strong> Each of the 6 events is scored from 0-100 points, for a
                  maximum total of 600. You must score at least 60 points on every event to pass.
                </p>
                <p>
                  <strong>Category Tiers:</strong> Gold requires 540+ total (90+ avg per event),
                  Silver requires 480+ (80+ avg), Bronze requires 420+ (70+ avg), and Pass requires
                  360+ (60+ avg) with no event below 60.
                </p>
                <p>
                  <strong>Gender-Based Scoring:</strong> The ACFT uses separate scoring tables for
                  males and females. Raw performance values are converted to points using
                  gender-specific breakpoints that reflect physiological differences.
                </p>
                <p>
                  <strong>Training Focus:</strong> Prioritize your weakest events first. A balanced
                  approach across all 6 events is more effective than maxing out one or two events
                  while neglecting others.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorPageLayout>
  );
}
