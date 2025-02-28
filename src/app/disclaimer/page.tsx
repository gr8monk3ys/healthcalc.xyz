import React from 'react';

export const metadata = {
  title: 'Disclaimer | HealthCheck',
  description: 'Important disclaimer information about HealthCheck calculators and health information.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
      
      <div className="neumorph p-6 mb-8 rounded-lg">
        <p className="mb-4">
          <strong>Last Updated:</strong> February 28, 2025
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">General Information Only</h2>
        <p className="mb-4">
          The information provided on HealthCheck is for general informational and educational purposes only. 
          The calculators, articles, and other content on this website are not intended to be a substitute 
          for professional medical advice, diagnosis, or treatment.
        </p>
        <p>
          Always seek the advice of your physician or other qualified health provider with any questions 
          you may have regarding a medical condition or before starting any diet, exercise, or health-related 
          program.
        </p>
      </div>
      
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Calculator Accuracy</h2>
        <p className="mb-4">
          While we strive to provide accurate calculators based on established scientific formulas, all 
          results should be considered estimates. The accuracy of our calculators depends on:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>The accuracy of the information you input</li>
          <li>Individual variations not accounted for in standardized formulas</li>
          <li>The inherent limitations of the calculation methods used</li>
        </ul>
        <p className="mb-4">
          For example, body fat percentage calculators use formulas that provide estimates based on 
          population averages and may not account for individual variations in body composition. Similarly, 
          calorie and metabolic rate calculators provide approximations that may vary from laboratory 
          measurements.
        </p>
        <p>
          For the most accurate assessment of your health metrics, consult with healthcare professionals 
          who can perform clinical measurements.
        </p>
      </div>
      
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Not Medical Advice</h2>
        <p className="mb-4">
          The content on HealthCheck, including calculator results, articles, and recommendations, does not 
          constitute medical advice. We do not diagnose conditions, prescribe treatments, or provide any 
          kind of healthcare services.
        </p>
        <p className="mb-4">
          Our calculators and content are designed to provide general guidance and education about health 
          and fitness topics. They are not personalized to your specific health situation.
        </p>
        <p>
          Never disregard professional medical advice or delay seeking it because of something you have 
          read or calculated on our website.
        </p>
      </div>
      
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Health and Fitness Risks</h2>
        <p className="mb-4">
          Before starting any diet, weight loss, or exercise program, consult with appropriate healthcare 
          professionals. There are risks associated with any fitness program, especially for people with 
          pre-existing health conditions.
        </p>
        <p className="mb-4">
          Extreme calorie restriction or rapid weight loss can be dangerous and is not recommended. Our 
          calculators may provide information about various calorie deficit levels, but this does not 
          constitute an endorsement of extreme approaches.
        </p>
        <p>
          We recommend moderate, sustainable approaches to health and fitness, and encourage you to work 
          with healthcare professionals to develop a plan that is safe and appropriate for your individual 
          circumstances.
        </p>
      </div>
      
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">No Guarantees</h2>
        <p className="mb-4">
          We make no guarantees regarding the results you may achieve from using our calculators or 
          following any information on our website. Health and fitness outcomes depend on numerous factors 
          beyond the scope of our calculators, including but not limited to:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Individual genetics</li>
          <li>Medical conditions</li>
          <li>Consistency in following a program</li>
          <li>Quality of nutrition</li>
          <li>Quality and quantity of sleep</li>
          <li>Stress levels</li>
          <li>Other lifestyle factors</li>
        </ul>
        <p>
          Results will vary from person to person, and we cannot guarantee that you will achieve any 
          specific result.
        </p>
      </div>
      
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">External Links</h2>
        <p>
          Our website may contain links to external websites that are not provided or maintained by us. 
          We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on 
          these external websites.
        </p>
      </div>
      
      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Changes to This Disclaimer</h2>
        <p>
          We may update our Disclaimer from time to time. We will notify you of any changes by posting 
          the new Disclaimer on this page and updating the "Last Updated" date. You are advised to review 
          this Disclaimer periodically for any changes.
        </p>
      </div>
      
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Disclaimer, please contact us at info@healthcheck.com.
        </p>
      </div>
    </div>
  );
}
