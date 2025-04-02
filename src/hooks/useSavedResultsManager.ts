'use client';

// Rule: Move localStorage logic to dedicated hooks/utilities for better separation of concerns

import { useSavedResults } from '@/context/SavedResultsContext';
import { useState } from 'react';
import { createLogger } from '@/utils/logger';
import { computeSavedResultKey } from '@/utils/savedResultsKey';
import { useLocale } from '@/context/LocaleContext';
import { localeToHtmlLang } from '@/i18n/config';

const logger = createLogger({ component: 'useSavedResultsManager' });

/**
 * Custom hook for managing saved calculator results
 * Provides functions to save, remove, and check saved results
 */
export function useSavedResultsManager() {
  const {
    savedResults,
    saveResult: saveResultToContext,
    removeResult: removeResultFromContext,
    clearAllResults,
    isResultSaved,
    canSaveResults,
  } = useSavedResults();
  const { locale, t } = useLocale();

  const [message, setMessage] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);

  /**
   * Save a calculator result
   * @param calculatorType Type of calculator (e.g., 'bmi', 'tdee')
   * @param calculatorName Human-readable name of calculator
   * @param data Result data to save
   * @returns True if saved successfully, false if already saved
   */
  function saveResult(
    calculatorType: string,
    calculatorName: string,
    data: Record<string, unknown>
  ): boolean {
    try {
      // Check if already saved
      const resultId = computeSavedResultKey(calculatorType, data);
      if (isResultSaved(resultId)) {
        showNotification(t('savedResults.toast.alreadySaved'));
        return false;
      }

      // Save to context (which handles localStorage)
      const didSave = saveResultToContext(calculatorType, calculatorName, data);
      if (!didSave) {
        showNotification(t('savedResults.toast.loginRequired'));
        return false;
      }

      showNotification(t('savedResults.toast.saved'));
      return true;
    } catch (error) {
      logger.logError('Error saving result', error);
      showNotification(t('savedResults.toast.saveError'));
      return false;
    }
  }

  /**
   * Remove a saved result
   * @param id Result ID to remove
   */
  function removeResult(id: string): void {
    try {
      removeResultFromContext(id);
      showNotification(t('savedResults.toast.removed'));
    } catch (error) {
      logger.logError('Error removing result', error);
      showNotification(t('savedResults.toast.removeError'));
    }
  }

  /**
   * Remove a saved result by calculator type and data
   * @param calculatorType Type of calculator
   * @param data Result data
   * @returns True if removed successfully
   */
  function removeResultByData(calculatorType: string, data: Record<string, unknown>): boolean {
    try {
      const resultId = computeSavedResultKey(calculatorType, data);
      if (!isResultSaved(resultId)) {
        return false;
      }

      removeResultFromContext(resultId);
      showNotification(t('savedResults.toast.removed'));
      return true;
    } catch (error) {
      logger.logError('Error removing result', error);
      showNotification(t('savedResults.toast.removeError'));
      return false;
    }
  }

  /**
   * Check if a result is saved
   * @param calculatorType Type of calculator
   * @param data Result data
   * @returns True if the result is saved
   */
  function isResultSavedByData(calculatorType: string, data: Record<string, unknown>): boolean {
    const resultId = computeSavedResultKey(calculatorType, data);
    return isResultSaved(resultId);
  }

  /**
   * Clear all saved results with confirmation
   * @returns True if cleared successfully
   */
  function clearAllResultsWithConfirmation(): boolean {
    if (window.confirm(t('savedResults.confirm.clearAll'))) {
      clearAllResults();
      showNotification(t('savedResults.toast.cleared'));
      return true;
    }
    return false;
  }

  /**
   * Format a date string
   * @param dateString ISO date string
   * @returns Formatted date string
   */
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    try {
      return new Intl.DateTimeFormat(localeToHtmlLang[locale], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date);
    } catch {
      return date.toISOString().slice(0, 10);
    }
  }

  /**
   * Show a notification message
   * @param msg Message to show
   * @param duration Duration in milliseconds
   */
  function showNotification(msg: string, duration: number = 3000): void {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), duration);
  }

  return {
    savedResults,
    canSaveResults,
    saveResult,
    removeResult,
    removeResultByData,
    isResultSaved: isResultSavedByData,
    clearAllResults: clearAllResultsWithConfirmation,
    formatDate,
    message,
    showMessage,
    showNotification,
  };
}
