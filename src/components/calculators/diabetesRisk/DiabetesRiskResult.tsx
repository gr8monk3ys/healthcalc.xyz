'use client';

import React from 'react';
import type { DiabetesRiskResult } from '@/types/diabetesRisk';
import { RISK_LEVEL_LABELS, RISK_LEVEL_COLORS } from '@/constants/diabetesRisk';

interface DiabetesRiskResultProps {
  result: DiabetesRiskResult | null;
}

const MAX_RISK_SCORE = 12;

export default function DiabetesRiskResultDisplay({ result }: DiabetesRiskResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Risk Assessment Result</h2>
        <p className="text-gray-600">
          Complete the risk assessment form to see your diabetes risk profile.
        </p>
      </div>
    );
  }

  const badgeColor = RISK_LEVEL_COLORS[result.riskLevel];
  const badgeLabel = RISK_LEVEL_LABELS[result.riskLevel];

  return (
    <div
      id="diabetes-risk-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Risk Assessment Result</h2>

      {/* Risk Level Badge */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className="inline-block px-4 py-2 rounded-full text-white text-sm font-semibold"
          style={{ backgroundColor: badgeColor }}
        >
          {badgeLabel}
        </span>
        <span className="text-sm text-gray-600">{result.riskPercentage}% estimated risk</span>
      </div>

      {/* Risk Score Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Risk Score</span>
          <span className="text-2xl font-bold">
            {result.riskScore} / {MAX_RISK_SCORE}
          </span>
        </div>
        <div className="relative h-4 neumorph-inset rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500 rounded-full"
            style={{
              width: `${Math.min((result.riskScore / MAX_RISK_SCORE) * 100, 100)}%`,
              backgroundColor: badgeColor,
            }}
          />
        </div>
      </div>

      {/* Risk Factors */}
      {result.riskFactors.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Risk Factors Identified</h3>
          <div className="neumorph-inset p-4 rounded-lg">
            <ul className="space-y-2">
              {result.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-red-500 mt-0.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Protective Factors */}
      {result.protectiveFactors.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Protective Factors</h3>
          <div className="neumorph-inset p-4 rounded-lg">
            <ul className="space-y-2">
              {result.protectiveFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Recommendations</h3>
          <div className="neumorph-inset p-4 rounded-lg">
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-accent mt-0.5 flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-600 border-t pt-4">
        <p>
          <strong>Disclaimer:</strong> This assessment is based on the ADA Type 2 Diabetes Risk Test
          and provides an estimate only. It does not replace laboratory testing or professional
          medical evaluation. Consult your healthcare provider for definitive screening.
        </p>
      </div>
    </div>
  );
}
