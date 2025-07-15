import React from 'react';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';

const ACFTScoringStandardsPageContent = (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        Military Fitness
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        ACFT Scoring Standards 2026: Passing, Excelling, and Maxing Out
      </h1>
      <p className="text-gray-500 italic">Published: January 22, 2026 &bull; 19 min read</p>
    </div>

    <div className="prose prose-lg max-w-none">
      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>
            You need 60 points minimum on every event and 360 total to pass. Fail one event and you
            fail the entire test, no matter how well you do on the other five.
          </li>
          <li>
            Gold standard (540+) requires averaging 90 points per event. That is a serious level of
            fitness across all six domains.
          </li>
          <li>
            The two-mile run has the highest failure rate of any event, followed by the plank. These
            two events end careers.
          </li>
          <li>
            ACFT scores count for promotion points. The difference between a 450 and a 540 can
            directly affect your career trajectory.
          </li>
          <li>
            Use the{' '}
            <Link href="/acft-calculator" className="text-accent hover:underline">
              ACFT calculator
            </Link>{' '}
            to find exactly where you stand and what you need to improve.
          </li>
        </ul>
      </div>

      <AdBlock format="horizontal" />

      <p>
        When the ACFT replaced the APFT, scoring went from simple to complex overnight. The old test
        had two events with push-ups and sit-ups and a two-mile run. Three events. One scoring
        table. Simple. The ACFT has six events, gender-normed scoring tables, age group adjustments,
        and a tiered category system. I have spent hours studying the scoring tables, and I still
        reference them regularly.
      </p>

      <p>
        This guide breaks down everything you need to know about ACFT scoring: the numbers you need
        to hit, what the tiers mean, how age and gender affect your standards, and where the danger
        zones are. I am going to give you the data straight with no padding. Bookmark this page. You
        will come back to it.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">The Basics: How ACFT Scoring Works</h2>

      <p>
        Each of the six events is scored on a 0-100 point scale. Your total score is the sum of all
        six, giving you a maximum possible score of 600. The minimum passing score is 60 points per
        event, with a total minimum of 360.
      </p>

      <p>
        The critical rule that soldiers miss: you must score 60 on every event. Not 60 on average.
        Every single one. Score 100 on five events and 55 on one, and you fail. This is not
        hypothetical. I have personally seen this happen to strong soldiers who neglected one event.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">Quick Math on Passing vs. Excelling</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Bare minimum pass:</strong> 60 on each event = 360 total. This means you are
            right on the edge in every event. Zero margin for error.
          </li>
          <li>
            <strong>Comfortable pass:</strong> 70 on each event = 420 total. You have a 10-point
            buffer per event. Much safer.
          </li>
          <li>
            <strong>Strong performer:</strong> 80 per event = 480 total (Silver). This puts you in
            the top third of most units.
          </li>
          <li>
            <strong>Elite:</strong> 90 per event = 540 total (Gold). Less than 10% of soldiers hit
            this level.
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Complete Scoring Tables by Gender</h2>

      <p>
        Below are the scoring breakpoints for each event. The ACFT uses gender-specific scoring for
        five of six events (the Plank is scored the same for everyone). Scores between breakpoints
        are interpolated, meaning if your performance falls between two listed values, your score
        will fall proportionally between the corresponding point values.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">3 Repetition Maximum Deadlift (MDL)</h3>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">MDL Scoring by Gender</caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Points
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Male (lbs)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Female (lbs)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                100
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">340</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">210</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gold</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                90
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">300</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">190</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gold</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                80
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">260</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">170</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Silver</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                70
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">230</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">150</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Bronze</td>
            </tr>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                60
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">200</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">130</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Pass</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                50
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">180</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">120</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                40
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">160</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">110</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                30
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">140</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">100</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                20
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">120</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">80</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                0
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">&lt;80</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">&lt;60</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Standing Power Throw (SPT)</h3>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">SPT Scoring by Gender</caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Points
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Male (meters)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Female (meters)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                100
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">12.5</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">8.5</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gold</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                90
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">11.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">7.5</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gold</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                80
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">6.5</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Silver</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                70
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">9.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5.8</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Bronze</td>
            </tr>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                60
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">8.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Pass</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                50
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">7.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">4.5</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                40
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">6.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">4.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                30
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3.5</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Hand-Release Push-Ups (HRP)</h3>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">HRP Scoring by Gender</caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Points
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Male (reps)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Female (reps)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                100
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">60</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">60</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gold</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                90
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">50</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">45</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gold</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                80
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">40</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">35</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Silver</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                70
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">35</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">28</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Bronze</td>
            </tr>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                60
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">30</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">20</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Pass</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                50
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">25</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">15</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                40
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">20</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">12</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                30
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">15</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Sprint-Drag-Carry (SDC)</h3>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">SDC Scoring by Gender</caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Points
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Male (min:sec)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Female (min:sec)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                100
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1:33</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1:58</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gold</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                90
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1:40</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:10</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gold</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                80
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1:50</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:20</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Silver</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                70
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:30</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Bronze</td>
            </tr>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                60
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:10</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:40</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Pass</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                50
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:20</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:55</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                40
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:35</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3:10</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                30
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:50</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3:30</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Plank (PLK)</h3>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">
            Plank Scoring (Same for Male and Female)
          </caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Points
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Time (min:sec)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                100
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3:40</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gold</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                90
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3:20</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gold</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                80
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Silver</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                70
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:40</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Bronze</td>
            </tr>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                60
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:20</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Pass</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                50
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                40
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1:40</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                30
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1:20</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                20
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Two-Mile Run (2MR)</h3>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">2MR Scoring by Gender</caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Points
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Male (min:sec)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Female (min:sec)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                100
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">13:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">15:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gold</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                90
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">14:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">16:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Gold</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                80
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">15:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">17:30</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Silver</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                70
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">16:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">18:30</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Bronze</td>
            </tr>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                60
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">17:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">20:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Pass</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                50
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">18:30</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">21:30</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                40
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">20:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">23:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                30
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">21:30</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">24:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Fail</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-8 mb-4">Age Group Breakdowns</h2>

      <p>
        The ACFT scoring tables account for age-related changes in physical performance. The Army
        recognizes ten age brackets: 17-21, 22-26, 27-31, 32-36, 37-41, 42-46, 47-51, 52-56, 57-61,
        and 62+.
      </p>

      <p>
        In practice, the scoring differences between adjacent age groups are small. A 26-year-old
        and a 27-year-old face nearly identical standards. The meaningful differences show up when
        you compare widely separated groups. A 22-year-old male needs to run two miles in about
        17:00 for 60 points. A 47-year-old male has a more generous standard.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">Key Age Group Facts</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>17-21 and 22-26:</strong> These are the hardest brackets. The Army expects peak
            physical performance in this range. If you are in this group, your standards are the
            most demanding.
          </li>
          <li>
            <strong>27-36:</strong> Slight relaxation in standards. The differences are minor but
            real. You might gain a few seconds on run time standards.
          </li>
          <li>
            <strong>37-46:</strong> More noticeable adjustments. The Army recognizes that natural
            age-related decline begins in the mid-to-late thirties. Strength standards hold
            relatively steady, but time-based events (SDC and 2MR) see moderate adjustments.
          </li>
          <li>
            <strong>47+:</strong> Significant adjustments across all events. The standards remain
            challenging, but they account for the reality that a 50-year-old soldier is not expected
            to match a 22-year-old in raw performance.
          </li>
        </ul>
      </div>

      <p>
        Important caveat: the scoring tables I have listed above use the baseline breakpoints from
        the standard ACFT scoring tables. The exact point thresholds shift slightly by age group.
        For precise scoring based on your specific age bracket, use our{' '}
        <Link href="/acft-calculator" className="text-accent hover:underline">
          ACFT calculator
        </Link>
        , which accounts for these variations.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">What "Gold" and "Black" Standards Mean</h2>

      <p>
        The ACFT uses a color-coded category system to classify overall performance beyond just
        pass/fail. These categories matter for how you are perceived by your chain of command and
        can influence evaluations.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
            <caption className="text-base font-semibold mb-2">ACFT Performance Categories</caption>
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Total Score
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Per Event Average
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Significance
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                  Gold
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">540-600</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">90-100</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Elite. Top physical fitness tier. Stands out on NCOERs and OERs.
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                  Silver
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">480-539</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">80-89</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Strong. Above-average fitness. Good evaluation bullet.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                  Bronze
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">420-479</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">70-79</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Competent. Meets expectations without standing out.
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                  Pass (Black)
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">360-419</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">60-69</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Minimum standard. Technically passing but signals room for improvement.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p>
        The "Black" designation for the minimum passing tier is worth understanding. It is not
        explicitly a negative mark, but in a competitive promotion environment, scoring in the Black
        tier while your peers are Silver and Gold puts you at a disadvantage. Senior leaders notice.
        If you are sitting at 380, your goal should be to get above 420 as quickly as possible.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">MOS-Specific Considerations</h2>

      <p>
        Not all MOSs have the same relationship with the ACFT. Combat arms soldiers (Infantry,
        Armor, Engineers, Field Artillery, and related specialties) face additional scrutiny on
        their fitness scores. An Infantry NCO scoring in the Black tier is going to have a harder
        time than a Finance NCO with the same score, in terms of career perception.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">MOS Categories and Fitness Expectations</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Combat Arms (11B, 11C, 12B, 13B, 19D, etc.):</strong> Unofficially expected to
            score Silver or above. The physical demands of the job align directly with the ACFT
            events. Deadlift strength, sprint speed, and carrying capacity are job-relevant.
          </li>
          <li>
            <strong>Combat Support (25-series, 35-series, 42A, etc.):</strong> Passing is the
            official standard, but high ACFT scores still help with promotion boards and competitive
            assignments.
          </li>
          <li>
            <strong>Combat Service Support (68-series, 88M, 92 series, etc.):</strong> Same official
            standards. The ACFT does not differentiate MOS in its scoring tables. But the
            expectations in your unit culture may differ.
          </li>
        </ul>
      </div>

      <p>
        Regardless of your MOS, one thing is true across the board: a failing ACFT score triggers
        mandatory retraining, flags, and potential administrative action. Two consecutive failures
        can lead to separation processing. The Army is serious about this test.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">How Scoring Changed from the Old APFT</h2>

      <p>
        If you served under the APFT, the transition to the ACFT was jarring. Here is how the two
        tests compare.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Feature
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                APFT
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                ACFT
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Events
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                3 (push-ups, sit-ups, 2-mile run)
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                6 (MDL, SPT, HRP, SDC, PLK, 2MR)
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Max score
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">300</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">600</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Min passing per event
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">60</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">60</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Min total passing
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">180</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">360</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Strength tested
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Minimal</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Significant (MDL, SPT, SDC carries)
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Power tested
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">None</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Standing Power Throw
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Anaerobic capacity
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Not directly
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Sprint-Drag-Carry
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Equipment needed
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">None</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Hex bar, weights, sled, kettlebells, med ball
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Time to administer
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                ~45 min per group
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                ~90-120 min per group
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Gender-normed
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Yes</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Yes (5 of 6 events)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The biggest shift is that the ACFT tests physical domains the APFT completely ignored. Under
        the APFT, you could be a fantastic runner and push-up machine while having zero lower body
        strength and still max the test. The ACFT does not allow that. You have to be strong
        (deadlift), powerful (power throw), endurant in both muscular and aerobic senses (push-ups,
        plank, two-mile run), and functionally fast under load (SDC).
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Which Events Soldiers Fail Most: The Data</h2>

      <p>
        Based on Army-wide data collected since the ACFT became the test of record, the failure
        patterns are clear.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">Failure Rates by Event (Approximate)</h3>

        <p className="font-semibold mt-2 mb-1">Two-Mile Run: Highest failure rate</p>
        <p className="mb-3">
          About 5% of male soldiers and 22% of female soldiers fail the two-mile run. This is the
          single biggest ACFT killer. The run comes last, after five physically draining events.
          Soldiers who would pass the run fresh cannot pass it with fatigued legs. If you are
          borderline on the run, you are in danger.
        </p>

        <p className="font-semibold mb-1">Plank (formerly Leg Tuck): Second highest failure rate</p>
        <p className="mb-3">
          When the test used the Leg Tuck, the failure rate for women was over 70%. After switching
          to the Plank as the primary option, that dropped to about 22%. For men, the plank failure
          rate is relatively low (under 5%). But soldiers who neglect core training still fail this
          event regularly. A 2:20 plank is not automatic if you have not trained for it.
        </p>

        <p className="font-semibold mb-1">Hand-Release Push-Ups: Moderate failure rate</p>
        <p className="mb-3">
          The hand-release version is harder than standard push-ups because you cannot rest in the
          up position without being in a full plank. The release-and-press motion takes longer per
          rep, which reduces the total number most soldiers can complete in two minutes.
        </p>

        <p className="font-semibold mb-1">Deadlift, Power Throw, SDC: Lower failure rates</p>
        <p>
          These events have relatively low failure rates. The deadlift minimum (200 lbs for men, 130
          lbs for women) is achievable for most soldiers who have spent any time in a gym. The power
          throw and SDC favor raw athleticism, which most young soldiers possess.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Quick-Reference Scoring Cards</h2>

      <p>Print these out or screenshot them for quick reference before your test.</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Male Soldiers: What You Need to Hit</h3>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">Male Quick-Reference Card</caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
                Event
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
                60 pts (Pass)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
                70 pts
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
                80 pts
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
                90 pts
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
                100 pts
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">
                MDL
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">200 lbs</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">230 lbs</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">260 lbs</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">300 lbs</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">340 lbs</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">
                SPT
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">8.0 m</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">9.0 m</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">10.0 m</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">11.0 m</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">12.5 m</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">
                HRP
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">30 reps</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">35 reps</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">40 reps</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">50 reps</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">60 reps</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">
                SDC
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">2:10</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">2:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">1:50</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">1:40</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">1:33</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">
                PLK
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">2:20</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">2:40</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">3:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">3:20</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">3:40</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">
                2MR
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">17:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">16:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">15:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">14:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">13:00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Female Soldiers: What You Need to Hit</h3>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">Female Quick-Reference Card</caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
                Event
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
                60 pts (Pass)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
                70 pts
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
                80 pts
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
                90 pts
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left">
                100 pts
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">
                MDL
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">130 lbs</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">150 lbs</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">170 lbs</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">190 lbs</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">210 lbs</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">
                SPT
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">5.0 m</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">5.8 m</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">6.5 m</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">7.5 m</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">8.5 m</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">
                HRP
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">20 reps</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">28 reps</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">35 reps</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">45 reps</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">60 reps</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">
                SDC
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">2:40</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">2:30</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">2:20</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">2:10</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">1:58</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">
                PLK
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">2:20</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">2:40</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">3:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">3:20</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">3:40</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold">
                2MR
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">20:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">18:30</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">17:30</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">16:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">15:00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-8 mb-4">Promotion Point Implications</h2>

      <p>
        ACFT scores feed directly into the promotion point system for enlisted soldiers. The
        specifics of how ACFT points convert to promotion points have evolved as the Army integrates
        the test into the broader evaluation framework, but the principle is straightforward: higher
        ACFT scores earn more promotion points.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">How ACFT Affects Promotions</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>For E-5 and E-6 promotions:</strong> ACFT scores are part of the
            semi-centralized promotion point calculation. A high ACFT score (500+) can give you a
            meaningful advantage over a competitor with a lower score. The exact point conversion
            changes periodically, so check your local S-1 for the current table.
          </li>
          <li>
            <strong>For NCOERs:</strong> Your ACFT category (Gold, Silver, Bronze, Black) will
            appear on your evaluation. A Gold-rated NCO signals to the board that this soldier takes
            physical fitness seriously. It is not the only factor, but it matters.
          </li>
          <li>
            <strong>For OERs:</strong> Same principle. Officers are expected to lead by example in
            physical fitness. A sub-par ACFT score on an OER is a red flag for board members.
          </li>
          <li>
            <strong>For competitive assignments:</strong> Special Forces Assessment and Selection,
            Ranger School, Sapper School, and other competitive programs all look at fitness test
            scores as part of the application. A 550+ ACFT opens doors that a 380 does not.
          </li>
        </ul>
      </div>

      <p>
        Let me put it plainly: two soldiers with identical education, experience, and job
        performance can have different promotion outcomes based on their ACFT scores. It is not the
        deciding factor, but it is a tiebreaker. And in the Army promotion system, tiebreakers
        matter.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Calculate Your Score Now</h2>

      <p>
        Stop guessing where you stand. Plug your current performance numbers into our{' '}
        <Link href="/acft-calculator" className="text-accent hover:underline">
          ACFT calculator
        </Link>{' '}
        and get an instant breakdown of your score by event, your overall category, and specific
        recommendations for which events to focus on. Whether you are trying to get from Fail to
        Pass or from Silver to Gold, the calculator shows you exactly what you need to hit.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <p className="mb-4">
          Enter your deadlift weight, power throw distance, push-up count, SDC time, plank time, and
          run time. The calculator does the rest, including gender-specific scoring and category
          assignment.
        </p>
        <p>
          <Link
            href="/acft-calculator"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Calculate Your ACFT Score
          </Link>
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>

      <p>
        The ACFT scoring system is more complex than the APFT, but that complexity exists for a
        reason. The test demands well-rounded fitness. You cannot hide behind one strong event and
        ignore the rest. The 60-point minimum per event is absolute, the category tiers carry real
        career weight, and the scoring tables are specific enough that knowing your numbers matters.
      </p>

      <p>
        Study the tables. Know what you need to hit for your target category. Identify which events
        give you the most room for improvement. Then train accordingly. The soldiers who treat the
        ACFT as a known problem with a clear solution perform far better than the ones who show up
        hoping for the best.
      </p>

      <p>
        And one more thing: test yourself regularly using the same standards you will be graded on.
        Practice the exact events with the exact equipment. Know your numbers cold before you step
        onto that test field. No surprises.
      </p>

      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">References</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>U.S. Army FM 7-22: Holistic Health and Fitness (2020). Department of the Army.</li>
          <li>
            ACFT Scoring Scales, effective March 23, 2022. U.S. Army Center for Initial Military
            Training.
          </li>
          <li>Army Regulation 350-1: Army Training and Leader Development (2022).</li>
          <li>Army Regulation 600-8-19: Enlisted Promotions and Reductions.</li>
          <li>
            Military.com. &quot;Nearly Half of Female Soldiers Still Failing New Army Fitness Test,
            While Males Pass Easily.&quot; May 2021.
          </li>
          <li>
            Military.com. &quot;More Female Soldiers Are Passing the ACFT, But Their Scores Still
            Trail Men&apos;s.&quot; May 2021.
          </li>
          <li>
            Army Times. &quot;New data shows performance divide on Army Combat Fitness Test.&quot;
            November 2019.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function ACFTScoringStandardsPage() {
  return ACFTScoringStandardsPageContent;
}
