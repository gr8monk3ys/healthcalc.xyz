import React from 'react';

export const metadata = {
  title: 'Terms of Service | HealthCheck',
  description: 'HealthCheck terms of service for using our health and fitness calculator tools.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>

      <div className="neumorph mb-8 rounded-lg p-6">
        <p className="mb-4">
          <strong>Last Updated:</strong> February 6, 2026
        </p>
        <p>
          By accessing and using HealthCheck, you agree to these Terms. If you do not agree, please
          do not use the site.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Service Description</h2>
        <p>
          HealthCheck provides informational calculators and educational content related to fitness,
          body composition, and nutrition.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Accounts and Saved Results</h2>
        <p className="mb-3">
          We offer account creation to save calculator results. Authentication is managed by Clerk,
          a secure third-party provider. Saved calculator results may be stored locally in your
          browser and, when you are signed in, synced to our database so you can access them across
          devices.
        </p>
        <p>
          You are responsible for safeguarding access to your account and for the activity
          associated with your use of the site.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Affiliate Links and Advertising</h2>
        <p className="mb-3">
          Some pages contain affiliate links to products and services. When you make a purchase
          through these links, we may earn a small commission at no extra cost to you. We are a
          participant in the Amazon Services LLC Associates Program.
        </p>
        <p>
          We also display advertisements through Google AdSense. These ads may use cookies to
          personalize content. Affiliate recommendations and advertisements do not constitute
          endorsements of specific medical treatments or products.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Acceptable Use</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Do not misuse, disrupt, or attempt unauthorized access to the service.</li>
          <li>Do not use the service for unlawful activities.</li>
          <li>Do not rely on calculators as medical diagnosis or treatment tools.</li>
        </ul>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">No Medical Relationship</h2>
        <p>
          Use of HealthCheck does not create a doctor-patient relationship. Content and calculator
          outputs are educational estimates only.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, HealthCheck and its operators are not liable for
          losses or damages resulting from use of the service or reliance on site content.
        </p>
      </div>

      <div className="neumorph rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
        <p>Questions about these Terms: info@healthcalc.xyz</p>
      </div>
    </div>
  );
}
