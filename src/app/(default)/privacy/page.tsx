import React from 'react';

export const metadata = {
  title: 'Privacy Policy | HealthCheck',
  description: 'HealthCheck privacy policy - how we handle your data and protect your privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

      <div className="neumorph mb-8 rounded-lg p-6">
        <p className="mb-4">
          <strong>Last Updated:</strong> February 6, 2026
        </p>
        <p>
          HealthCheck is designed to minimize personal data collection. Most calculator
          functionality runs directly in your browser.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">What We Collect</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Calculator inputs/results:</strong> processed client-side in your browser.
          </li>
          <li>
            <strong>Optional account data:</strong> if you create an account, your name and email
            are managed securely by our authentication provider (Clerk). We do not store passwords.
          </li>
          <li>
            <strong>Usage analytics:</strong> we may collect aggregate site usage data (e.g., page
            views, browser type, approximate location by IP) through analytics providers.
          </li>
        </ul>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">How We Use Information</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>To provide calculators and show results.</li>
          <li>To allow signed-in users to save calculator results for later.</li>
          <li>To improve website reliability, performance, and content quality.</li>
        </ul>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Storage and Security</h2>
        <p className="mb-3">
          Account authentication is handled by Clerk, a secure third-party authentication provider.
          Your password is never stored on our servers or in your browser. Saved calculator results
          are stored locally in your browser for convenience.
        </p>
        <p>
          If you share a device, other users of that browser profile may access locally stored saved
          result data.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Third-Party Services</h2>
        <p>
          We use third-party analytics and advertising tools. Their handling of data is governed by
          their own privacy policies.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Advertising and Affiliate Links</h2>
        <p className="mb-3">
          We display advertisements through Google AdSense, which may use cookies and similar
          technologies to serve ads based on your prior visits to this or other websites. You can
          opt out of personalized advertising by visiting{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Google&apos;s Ads Settings
          </a>
          .
        </p>
        <p className="mb-3">
          Some pages on this site contain affiliate links to products we recommend. When you
          purchase through these links, we may earn a small commission at no additional cost to you.
          This helps support our free health calculators and content.
        </p>
        <p>
          We participate in the Amazon Services LLC Associates Program, an affiliate advertising
          program designed to provide a means for sites to earn advertising fees by advertising and
          linking to Amazon.com. We only recommend products we believe will be valuable to our
          users.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Cookies</h2>
        <p className="mb-3">
          We use cookies and similar technologies for analytics, advertising, and to remember your
          preferences (such as dark mode and unit system settings). Third-party services like Google
          Analytics and Google AdSense may also set cookies.
        </p>
        <p>
          You can manage cookie preferences through your browser settings. Disabling cookies may
          affect some site functionality.
        </p>
      </div>

      <div className="neumorph rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
        <p>Questions about this policy: info@healthcalc.xyz</p>
      </div>
    </div>
  );
}
