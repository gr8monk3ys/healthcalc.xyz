import React from 'react';

export const metadata = {
  title: 'Medical Disclaimer | HealthCheck',
  description: 'Important medical disclaimer for HealthCheck calculators and content.',
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold">Medical Disclaimer</h1>

      <div className="neumorph mb-8 rounded-lg p-6">
        <p className="mb-4">
          <strong>Last Updated:</strong> February 6, 2026
        </p>
        <p>
          HealthCheck content and calculators are for informational and educational use only and are
          not medical advice.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Not a Substitute for Professional Care</h2>
        <p>
          Always consult a qualified healthcare professional for diagnosis, treatment, and health
          decisions. Do not delay care based on calculator results.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Results Are Estimates</h2>
        <p className="mb-3">
          Calculator outputs are model-based estimates and depend on your inputs. Individual
          biology, medical history, and testing method differences can cause significant variation.
        </p>
        <p>
          For clinical-grade assessment, seek professional evaluation and validated medical tests.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Use at Your Own Risk</h2>
        <p>
          Any decisions about diet, exercise, supplementation, or medication should be made with a
          licensed professional. You assume responsibility for how you use this information.
        </p>
      </div>

      <div className="neumorph rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
        <p>Questions about this disclaimer: info@heathcheck.info</p>
      </div>
    </div>
  );
}
