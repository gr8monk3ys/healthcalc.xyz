import React from 'react';

export const metadata = {
  title: 'Privacy Policy | HealthCalc',
  description: 'HealthCalc privacy policy - how we handle your data and protect your privacy.',
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
          HealthCalc is designed to minimize personal data collection. Most calculator functionality
          runs directly in your browser.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">What We Collect</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Calculator inputs/results:</strong> processed client-side in your browser. If
            you choose to save results while signed in, saved results are synced to our database so
            you can access them across devices.
          </li>
          <li>
            <strong>Optional account data:</strong> if you create an account, your name and email
            are managed securely by our authentication provider (Supabase). We do not store
            passwords.
          </li>
          <li>
            <strong>Form submissions:</strong> if you submit our contact form, newsletter signup, or
            an embed request, we receive the information you provide (such as name, email, message,
            website URL, and notes) to process your request.
          </li>
          <li>
            <strong>Usage analytics:</strong> we may collect aggregate site usage data (e.g., page
            views, browser type, approximate location by IP) through analytics providers.
          </li>
          <li>
            <strong>Error reports:</strong> when something on the site breaks, we send a report to
            our error monitoring provider, Sentry, so we can fix it. A report holds the error
            details, the page address without its query string, your browser, device type, language
            and time zone, and a short record of recent activity on the page, such as clicks,
            navigation and requests the page made. We set these reports up to leave out
            shared-result links, search terms, cookies and the values you type into a calculator,
            and we ask Sentry not to store your IP address. Error reports, and a simple count of
            visits, are sent whether or not you accept analytics cookies.
          </li>
          <li>
            <strong>Performance traces:</strong> if you accept analytics cookies, we also send
            Sentry timing data for a sample of page loads and navigations, set up the same way.
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
          Account authentication is handled by Supabase Auth, a third-party authentication provider.
          Your password is never stored on our servers or in your browser. Saved calculator results
          are stored locally in your browser for convenience and, when you are signed in, may be
          synced to our database so you can access them across devices.
        </p>
        <p>
          If you share a device, other users of that browser profile may access locally stored saved
          result data.
        </p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">Third-Party Services</h2>
        <p>
          We use third-party analytics and advertising tools, and Sentry for error monitoring. Their
          handling of data is governed by their own privacy policies.
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
            Google’s Ads Settings
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
