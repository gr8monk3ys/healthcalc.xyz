import React from 'react';

export const metadata = {
  title: 'Privacy Policy | HealthCheck',
  description: 'HealthCheck privacy policy - how we handle your data and protect your privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <p className="mb-4">
          <strong>Last Updated:</strong> February 28, 2025
        </p>

        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          At HealthCheck, we take your privacy seriously. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit our website and use
          our calculators.
        </p>
        <p>
          Please read this privacy policy carefully. If you do not agree with the terms of this
          privacy policy, please do not access the site.
        </p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>

        <h3 className="text-xl font-medium mb-2">Calculator Inputs</h3>
        <p className="mb-4">
          When you use our calculators, you may input personal information such as:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Age</li>
          <li>Gender</li>
          <li>Height</li>
          <li>Weight</li>
          <li>Body measurements</li>
          <li>Activity levels</li>
        </ul>
        <p className="mb-4">
          <strong>Important:</strong> All calculations are performed locally in your browser. We do
          not store or transmit your personal measurement data to our servers.
        </p>

        <h3 className="text-xl font-medium mb-2">Automatically Collected Information</h3>
        <p className="mb-4">
          When you visit our website, we may automatically collect certain information about your
          device, including:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Operating system</li>
          <li>Pages visited</li>
          <li>Time and date of your visit</li>
          <li>Time spent on pages</li>
          <li>Referral sources</li>
        </ul>
        <p>
          This information is used for analytics purposes to improve our website and user
          experience.
        </p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect for various purposes, including:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>To provide and maintain our service</li>
          <li>To improve our website and user experience</li>
          <li>To analyze usage patterns and trends</li>
          <li>To communicate with you about updates or changes to our service</li>
          <li>To comply with legal obligations</li>
        </ul>
        <p>
          We do not use your calculator inputs for any purpose other than providing you with the
          calculation results in real-time.
        </p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
        <p className="mb-4">
          We use cookies and similar tracking technologies to track activity on our website and
          store certain information. Cookies are files with a small amount of data that may include
          an anonymous unique identifier.
        </p>
        <p className="mb-4">
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being
          sent. However, if you do not accept cookies, you may not be able to use some portions of
          our service.
        </p>
        <p>We use cookies for the following purposes:</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>To remember your preferences and settings</li>
          <li>To analyze site traffic and usage patterns</li>
          <li>To enable certain functions of the website</li>
        </ul>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
        <p className="mb-4">
          We may use third-party services such as Google Analytics to help us understand how our
          website is used. These third-party service providers have their own privacy policies
          addressing how they use such information.
        </p>
        <p>We do not share your personal calculator inputs with any third parties.</p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect the security of
          your personal information. However, please be aware that no method of transmission over
          the internet or method of electronic storage is 100% secure.
        </p>
        <p>
          As mentioned earlier, your calculator inputs are processed locally in your browser and are
          not transmitted to or stored on our servers, which significantly reduces data security
          risks.
        </p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
        <p>
          Our service is not directed to anyone under the age of 13. We do not knowingly collect
          personal information from children under 13. If you are a parent or guardian and you are
          aware that your child has provided us with personal information, please contact us so that
          we can take necessary actions.
        </p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page and updating the "Last Updated" date. You are
          advised to review this Privacy Policy periodically for any changes.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at
          privacy@heathcheck.info.
        </p>
      </div>
    </div>
  );
}
