'use client';

import React, { useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import {
  convertWeight,
  convertHeight,
  convertExtendedVolume,
  convertTemperature,
  convertEnergy,
} from '@/utils/conversions';
import type {
  ConversionWeightUnit,
  ConversionHeightUnit,
  ExtendedVolumeUnit,
  TemperatureUnit,
  EnergyUnit,
} from '@/types/common';
import { useLocale } from '@/context/LocaleContext';
import { useUrlSearchParam } from '@/hooks/useUrlSearchParam';
import { toAbsoluteUrl } from '@/lib/site';
import type { ConversionsPageCopy } from '@/i18n/pages/conversions';
import { formatNumber } from '@/utils/formatNumber';

type ConversionCategory = 'weight' | 'height' | 'volume' | 'temperature' | 'energy';

const CONVERSION_CATEGORIES = new Set<string>([
  'weight',
  'height',
  'volume',
  'temperature',
  'energy',
]);
const isConversionCategory = (value: string): value is ConversionCategory =>
  CONVERSION_CATEGORIES.has(value);

function formatTemplate(template: string, vars: Record<string, string>): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replaceAll(`{${key}}`, value);
  }
  return out;
}

function useMeasurementConversionsClientState(copy: ConversionsPageCopy) {
  // ?category= deep-links the selected converter.
  const [category, setCategory] = useUrlSearchParam<ConversionCategory>(
    'category',
    'weight',
    isConversionCategory
  );
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedFromUnit, setFromUnit] = useState<string>(copy.categories.weight.units[0] ?? 'kg');
  const [selectedToUnit, setToUnit] = useState<string>(copy.categories.weight.units[1] ?? 'lb');
  // Derive units valid for the current category (e.g. when it came from the URL).
  const units = copy.categories[category].units;
  const fromUnit = units.includes(selectedFromUnit) ? selectedFromUnit : units[0];
  const toUnit = units.includes(selectedToUnit) ? selectedToUnit : (units[1] ?? units[0]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  return {
    category,
    setCategory,
    inputValue,
    setInputValue,
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    result,
    setResult,
    error,
    setError,
  };
}
export default function MeasurementConversionsClient({
  copy,
  serverHeader,
}: {
  copy: ConversionsPageCopy;
  serverHeader?: React.ReactNode;
}): React.JSX.Element {
  const { localizePath } = useLocale();

  const {
    category,
    setCategory,
    inputValue,
    setInputValue,
    fromUnit,
    setFromUnit,
    toUnit,
    setToUnit,
    result,
    setResult,
    error,
    setError,
  } = useMeasurementConversionsClientState(copy);

  const handleCategoryChange = (newCategory: ConversionCategory) => {
    setCategory(newCategory);
    setFromUnit(copy.categories[newCategory].units[0]);
    setToUnit(copy.categories[newCategory].units[1]);
    setInputValue('');
    setResult(null);
    setError('');
  };

  const handleConvert = () => {
    const value = parseFloat(inputValue);

    if (isNaN(value) || inputValue === '') {
      setError(copy.ui.errorInvalidNumber);
      setResult(null);
      return;
    }

    if (category !== 'temperature' && value < 0) {
      setError(copy.ui.errorNonNegative);
      setResult(null);
      return;
    }

    try {
      let converted: number;

      switch (category) {
        case 'weight':
          converted = convertWeight(
            value,
            fromUnit as ConversionWeightUnit,
            toUnit as ConversionWeightUnit
          );
          break;
        case 'height':
          converted = convertHeight(
            value,
            fromUnit as ConversionHeightUnit,
            toUnit as ConversionHeightUnit
          );
          break;
        case 'volume':
          converted = convertExtendedVolume(
            value,
            fromUnit as ExtendedVolumeUnit,
            toUnit as ExtendedVolumeUnit
          );
          break;
        case 'temperature':
          converted = convertTemperature(
            value,
            fromUnit as TemperatureUnit,
            toUnit as TemperatureUnit
          );
          break;
        case 'energy':
          converted = convertEnergy(value, fromUnit as EnergyUnit, toUnit as EnergyUnit);
          break;
        default:
          throw new Error('Invalid category');
      }

      setResult(converted);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.ui.errorConversionFailed);
      setResult(null);
    }
  };

  const handleSwapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    setError('');
    if (result !== null) {
      setInputValue(result.toString());
      setResult(parseFloat(inputValue));
    }
  };

  const categoryConfig = copy.categories[category];
  const converterTitle = useMemo(() => {
    return formatTemplate(copy.ui.categoryConverterTitleTemplate, {
      category: categoryConfig.name,
    });
  }, [categoryConfig.name, copy.ui.categoryConverterTitleTemplate]);

  const educationalContent = useMemo(() => {
    return (
      <div className="mt-12 space-y-4">
        {copy.understanding.map(section => (
          <Accordion key={section.title} title={section.title}>
            <p className="mb-3">{section.intro}</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {section.items.map(item => (
                <li key={item.label}>
                  <span className="font-medium">{item.label}</span> {item.value}
                </li>
              ))}
            </ul>
            {section.note ? <p className="mt-2 text-sm">{section.note}</p> : null}
          </Accordion>
        ))}
      </div>
    );
  }, [copy.understanding]);

  const pageUrl = useMemo(() => {
    return toAbsoluteUrl(localizePath('/conversions'));
  }, [localizePath]);

  const structuredData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: copy.structuredDataName,
      description: copy.structuredDataDescription,
      url: pageUrl,
    };
  }, [copy.structuredDataDescription, copy.structuredDataName, pageUrl]);

  return (
    <MeasurementConversionsView
      copy={copy}
      serverHeader={serverHeader}
      category={category}
      categoryConfig={categoryConfig}
      converterTitle={converterTitle}
      educationalContent={educationalContent}
      structuredData={structuredData}
      result={result}
      error={error}
      inputValue={inputValue}
      fromUnit={fromUnit}
      toUnit={toUnit}
      handleCategoryChange={handleCategoryChange}
      setInputValue={setInputValue}
      setFromUnit={setFromUnit}
      setToUnit={setToUnit}
      handleSwapUnits={handleSwapUnits}
      handleConvert={handleConvert}
    />
  );
}

interface MeasurementConversionsViewProps {
  copy: ConversionsPageCopy;
  serverHeader?: React.ReactNode;
  category: ConversionCategory;
  categoryConfig: ConversionsPageCopy['categories'][ConversionCategory];
  converterTitle: string;
  educationalContent: React.JSX.Element;
  structuredData: Record<string, unknown>;
  result: number | null;
  error: string;
  inputValue: string;
  fromUnit: string;
  toUnit: string;
  handleCategoryChange: (newCategory: ConversionCategory) => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setFromUnit: React.Dispatch<React.SetStateAction<string>>;
  setToUnit: React.Dispatch<React.SetStateAction<string>>;
  handleSwapUnits: () => void;
  handleConvert: () => void;
}

function MeasurementConversionsView({
  copy,
  serverHeader,
  category,
  categoryConfig,
  converterTitle,
  educationalContent,
  structuredData,
  result,
  error,
  inputValue,
  fromUnit,
  toUnit,
  handleCategoryChange,
  setInputValue,
  setFromUnit,
  setToUnit,
  handleSwapUnits,
  handleConvert,
}: MeasurementConversionsViewProps) {
  return (
    <CalculatorPageLayout
      serverHeader={serverHeader}
      title={copy.title}
      description={copy.description}
      calculatorSlug="conversions"
      shareTitle={copy.shareTitle}
      shareDescription={copy.shareDescription}
      shareHashtags={copy.shareHashtags}
      faqs={copy.faqs}
      faqTitle={copy.faqTitle}
      relatedArticles={copy.relatedArticles}
      structuredData={structuredData}
      understandingSection={educationalContent}
      newsletterTitle={copy.newsletterTitle}
      newsletterDescription={copy.newsletterDescription}
      showResultsCapture={result !== null}
    >
      <div className="md:col-span-1">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">{copy.ui.conversionCategory}</h2>
          <div className="space-y-2">
            {Object.entries(copy.categories).map(([key, config]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleCategoryChange(key as ConversionCategory)}
                aria-pressed={category === key}
                className={`w-full p-3 rounded-lg text-left transition ${
                  category === key
                    ? 'bg-accent text-white shadow-lg'
                    : 'neumorph hover:shadow-neumorph-inset'
                }`}
              >
                {config.name}
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">{converterTitle}</h2>

          <div className="space-y-4">
            {/* Input Value */}
            <div>
              <label htmlFor="conversion-value" className="block text-sm font-medium mb-2">
                {copy.ui.valueLabel}
              </label>
              <input
                id="conversion-value"
                name="value"
                autoComplete="off"
                inputMode="decimal"
                type="number"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleConvert()}
                placeholder={copy.ui.valuePlaceholder}
                className="w-full p-3 neumorph-inset rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                step="any"
              />
            </div>

            {/* From Unit */}
            <div>
              <label htmlFor="conversion-from" className="block text-sm font-medium mb-2">
                {copy.ui.fromLabel}
              </label>
              <select
                id="conversion-from"
                name="from"
                value={fromUnit}
                onChange={e => setFromUnit(e.target.value)}
                className="w-full p-3 neumorph-inset rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {categoryConfig.units.map((unit: string) => (
                  <option key={unit} value={unit}>
                    {categoryConfig.labels[unit]}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSwapUnits}
                className="p-3 neumorph rounded-lg hover:shadow-neumorph-inset transition"
                title={copy.ui.swapUnitsTitle}
                aria-label={copy.ui.swapUnitsTitle}
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
            </div>

            {/* To Unit */}
            <div>
              <label htmlFor="conversion-to" className="block text-sm font-medium mb-2">
                {copy.ui.toLabel}
              </label>
              <select
                id="conversion-to"
                name="to"
                value={toUnit}
                onChange={e => setToUnit(e.target.value)}
                className="w-full p-3 neumorph-inset rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {categoryConfig.units.map((unit: string) => (
                  <option key={unit} value={unit}>
                    {categoryConfig.labels[unit]}
                  </option>
                ))}
              </select>
            </div>

            {/* Convert Button */}
            <button
              onClick={handleConvert}
              className="w-full py-3 px-4 neumorph text-accent font-medium rounded-lg hover:shadow-neumorph-inset transition"
            >
              {copy.ui.convertButton}
            </button>

            {/* Error Message */}
            {error && (
              <div
                className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                role="alert"
              >
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Result (announced when it appears or changes) */}
            <div aria-live="polite">
              {result !== null && (
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {copy.ui.resultLabel}
                  </div>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {formatNumber(result, 4)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {categoryConfig.labels[toUnit]}
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                    {inputValue} {categoryConfig.labels[fromUnit]} = {formatNumber(result, 4)}{' '}
                    {categoryConfig.labels[toUnit]}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Quick Reference */}
        {category === 'weight' && (
          <Card className="p-4 mt-4 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold mb-2 text-sm">{copy.ui.quickReference}</h3>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              {copy.quickReferenceLines.weight.map(line => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </Card>
        )}

        {category === 'height' && (
          <Card className="p-4 mt-4 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold mb-2 text-sm">{copy.ui.quickReference}</h3>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              {copy.quickReferenceLines.height.map(line => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </Card>
        )}

        {category === 'temperature' && (
          <Card className="p-4 mt-4 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold mb-2 text-sm">{copy.ui.quickReference}</h3>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              {copy.quickReferenceLines.temperature.map(line => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </CalculatorPageLayout>
  );
}
