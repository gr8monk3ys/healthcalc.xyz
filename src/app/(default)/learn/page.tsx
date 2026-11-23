import React from 'react';
import Link from 'next/link';

export const metadata = {
  alternates: { canonical: './' },
  title: 'Health Guides | HealthCalc',
  description:
    'Guides to calories, macros, body composition, heart rate training, walking and running energy, and pregnancy, with the formulas behind each calculator.',
};

const icons = {
  calories: (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  macros: (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9A9.004 9.004 0 0015 3.512V9h5.488z"
      />
    </svg>
  ),
  heart: (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l2-5 4 10 2-5h6" />
    </svg>
  ),
  composition: (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  walking: (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM11 21l1.5-5.5L9 13l1-5 3.5 2 2.5 3M9 21l1-3.5"
      />
    </svg>
  ),
  pregnancy: (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
};

interface Guide {
  slug: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  chip: string;
  topics: string[];
}

const guides: Guide[] = [
  {
    slug: 'calorie-basics',
    title: 'Calorie Basics',
    description: 'How calories work for maintenance, loss, and gain.',
    icon: icons.calories,
    chip: 'bg-gradient-to-br from-amber-500/18 via-amber-500/10 to-transparent text-amber-600 dark:text-amber-300',
    topics: ['TDEE', 'Deficit', 'Surplus'],
  },
  {
    slug: 'macro-planning',
    title: 'Macro Planning',
    description: 'Set carb, fat, and protein targets that align with your goals.',
    icon: icons.macros,
    chip: 'bg-gradient-to-br from-indigo-500/18 via-indigo-500/10 to-transparent text-indigo-600 dark:text-indigo-300',
    topics: ['Protein', 'Carbs', 'Fat'],
  },
  {
    slug: 'heart-rate-training',
    title: 'Heart Rate Training',
    description: 'Use zones and max heart rate to train smarter.',
    icon: icons.heart,
    chip: 'bg-gradient-to-br from-rose-500/18 via-rose-500/10 to-transparent text-rose-600 dark:text-rose-300',
    topics: ['Zones', 'Max HR', 'VO2 max'],
  },
  {
    slug: 'body-composition-guide',
    title: 'Body Composition Guide',
    description: 'Understand BMI, body fat, and lean mass together.',
    icon: icons.composition,
    chip: 'bg-gradient-to-br from-sky-500/18 via-sky-500/10 to-transparent text-sky-600 dark:text-sky-300',
    topics: ['BMI', 'Body fat', 'Lean mass'],
  },
  {
    slug: 'walking-running-energy',
    title: 'Walking & Running Energy',
    description: 'Estimate calories burned from walking or running.',
    icon: icons.walking,
    chip: 'bg-gradient-to-br from-emerald-500/18 via-emerald-500/10 to-transparent text-emerald-600 dark:text-emerald-300',
    topics: ['Steps', 'Pace', 'Calories'],
  },
  {
    slug: 'pregnancy-health',
    title: 'Pregnancy Health',
    description: 'Key calculators for due dates and weight gain guidance.',
    icon: icons.pregnancy,
    chip: 'bg-gradient-to-br from-teal-500/18 via-teal-500/10 to-transparent text-teal-600 dark:text-teal-300',
    topics: ['Due date', 'Weight gain'],
  },
];

export default function LearnIndexPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-10">
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
          Health Guides
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
          Short explainers that unpack what each metric actually measures, then point you at the
          calculator that puts a number on it.
        </p>
      </header>

      <section className="glass-panel mb-10 space-y-4 rounded-3xl p-6 text-slate-600 dark:text-slate-300">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          What These Guides Cover
        </h2>
        <p>
          Each guide takes one area of health and fitness, explains the measurements involved, and
          shows the formulas our calculators use, with a worked example you can check by hand. The
          calorie and macro guides cover energy balance, the Mifflin-St Jeor equation, activity
          multipliers, and the accepted ranges for protein, carbohydrate, and fat. The body
          composition guide compares BMI, body fat percentage, lean mass, and waist measurements.
          The heart rate guide explains maximum heart rate formulas and training zones, the walking
          and running guide covers MET-based calorie estimates and step counts, and the pregnancy
          guide covers due dates and weight gain recommendations.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          How to Read a Calculator Result
        </h2>
        <p>
          Every calculator on this site turns a few inputs into an estimate using a published
          equation or guideline. Those equations describe averages from research groups, so a result
          tells you where a typical person with your inputs would land, not exactly where you are. A
          maintenance calorie estimate can be off by a few hundred calories for an individual, and a
          maximum heart rate formula can miss by ten beats per minute or more. Treat it as a
          starting point. Act on it, watch what actually happens over a few weeks, then adjust.
        </p>
        <p>
          How you measure matters as much as which formula you use. Weigh yourself at the same time
          of day, measure your waist the same way each time, and keep the same device or method when
          you compare results over time. Small changes in technique often look like real progress or
          setbacks.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          When to See a Clinician
        </h2>
        <p>
          These guides are general education, not medical advice. Talk to a doctor, midwife, or
          registered dietitian before acting on a result if you are pregnant, have a chronic
          condition such as diabetes, heart disease, or kidney disease, take medication that affects
          heart rate or blood sugar, or have a history of disordered eating. Seek prompt care for
          symptoms such as chest pain, fainting, or unexplained weight change. Each guide ends with
          the references it draws on, so you can read the original sources.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {guides.map(guide => (
          <Link
            key={guide.slug}
            href={`/learn/${guide.slug}`}
            className="glass-panel-strong card-interactive group flex h-full flex-col rounded-3xl p-6"
          >
            <div className="mb-4 flex items-start gap-4">
              <span
                className={`shrink-0 rounded-2xl p-2.5 transition-transform duration-300 group-hover:scale-110 ${guide.chip}`}
              >
                {guide.icon}
              </span>
              <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                {guide.title}
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {guide.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {guide.topics.map(topic => (
                <span
                  key={topic}
                  className="rounded-full bg-[var(--surface-muted)] px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-300"
                >
                  {topic}
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm font-semibold text-accent">
              Read guide{' '}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 glass-panel rounded-3xl p-6 text-center">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Prefer to Jump Straight to a Number?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">
          Every guide links to the relevant tools, but you can also browse the full calculator
          library by category.
        </p>
        <Link
          href="/calculators"
          className="elevated-pill mt-5 inline-flex rounded-full px-6 py-3 font-semibold text-accent transition hover:-translate-y-0.5 hover:border-accent/40"
        >
          Browse all calculators
        </Link>
      </div>
    </div>
  );
}
