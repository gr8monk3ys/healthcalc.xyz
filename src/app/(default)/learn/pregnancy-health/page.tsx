import React from 'react';
import Link from 'next/link';

export const metadata = {
  alternates: { canonical: './' },
  title: 'Pregnancy Health | HealthCalc',
  description:
    'How due dates are calculated from the last period or conception date, what full term means, and the IOM weight gain ranges by pre-pregnancy BMI.',
};

export default function PregnancyHealthGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Pregnancy Health</h1>
      <p className="text-gray-600 mb-6">
        Pregnancy calculators answer planning questions. When is the baby due? What week am I in?
        How much weight gain is typical? They are planning tools and nothing more. Your midwife or
        doctor will confirm dates, usually with an early ultrasound, and will give advice based on
        your own health. Below we explain how the calculations work and what the standard
        recommendations say, and list the signs that mean you should call your care team.
      </p>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">How a Due Date Is Calculated</h2>
        <p className="text-gray-600 mb-3">
          Pregnancy is conventionally dated from the first day of your last menstrual period (LMP),
          not from conception. Most people know when their last period started. Few know the exact
          day they conceived.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            <strong>From the LMP (Naegele&apos;s rule):</strong> add 280 days, or 40 weeks, to the
            first day of your last period. A shortcut is to add one year, subtract three months, and
            add seven days.
          </li>
          <li>
            <strong>From a known conception date:</strong> add 266 days, or 38 weeks. This applies
            to IVF transfers and to people tracking ovulation closely.
          </li>
        </ul>
        <p className="text-gray-600 mb-3">
          Worked example: if your last period started on January 10, 2026, your estimated due date
          is October 17, 2026. If conception happened on January 24, 2026, two weeks later, the
          conception method gives the same date.
        </p>
        <p className="text-gray-600 mb-3">
          Naegele&apos;s rule assumes a 28-day cycle with ovulation around day 14. If your cycles
          are regularly longer or shorter, your actual due date may shift by a few days. A
          first-trimester ultrasound measuring the embryo is the most accurate way to date a
          pregnancy, and the American College of Obstetricians and Gynecologists (ACOG) recommends
          using it to confirm or adjust the date.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">What Full Term Means</h2>
        <p className="text-gray-600 mb-3">
          A due date is an estimate, and only a minority of babies arrive on that exact day. ACOG
          defines term pregnancy in stages:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>Early term: 37 weeks 0 days to 38 weeks 6 days</li>
          <li>Full term: 39 weeks 0 days to 40 weeks 6 days</li>
          <li>Late term: 41 weeks 0 days to 41 weeks 6 days</li>
          <li>Postterm: 42 weeks 0 days and beyond</li>
        </ul>
        <p className="text-gray-600 mb-3">
          Birth before 37 weeks is preterm. It helps to know these ranges before the last few weeks,
          when each day past the due date can feel long.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Recommended Weight Gain</h2>
        <p className="text-gray-600 mb-3">
          In 2009 the Institute of Medicine (now the National Academy of Medicine) published weight
          gain recommendations based on pre-pregnancy BMI. For a single baby, the total recommended
          gain is:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>Underweight (BMI below 18.5): 28 to 40 lb (about 12.5 to 18 kg)</li>
          <li>Healthy weight (BMI 18.5 to 24.9): 25 to 35 lb (about 11 to 16 kg)</li>
          <li>Overweight (BMI 25.0 to 29.9): 15 to 25 lb (about 7 to 11 kg)</li>
          <li>Obesity (BMI 30.0 or higher): 11 to 20 lb (about 5 to 9 kg)</li>
        </ul>
        <p className="text-gray-600 mb-3">
          Ranges are higher for twins. For a healthy pre-pregnancy BMI, the twin range is 37 to 54
          lb.
        </p>
        <p className="text-gray-600 mb-3">
          Worked example: someone who weighed 65 kg at 1.68 m before pregnancy had a BMI of 65 ÷
          (1.68 × 1.68) = 23.0, so the recommended total gain is 25 to 35 lb. Most gain happens in
          the second and third trimesters; first-trimester gain is usually small.
        </p>
        <p className="text-gray-600 mb-3">
          Weight gained in pregnancy is not all fat. It includes the baby, placenta, amniotic fluid,
          increased blood and fluid volume, breast tissue, and the uterus, plus some energy stores
          for breastfeeding.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Eating for Pregnancy</h2>
        <p className="text-gray-600 mb-3">
          The idea of eating for two overstates actual needs. Energy needs usually do not rise in
          the first trimester. Estimates used in U.S. dietary guidance are roughly an extra 340
          calories per day in the second trimester and about 450 in the third for a single
          pregnancy, though individual needs vary. Nutrient needs rise more than calorie needs:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            <strong>Folic acid:</strong> the CDC recommends 400 micrograms daily for anyone who
            could become pregnant, starting at least a month before conception, to lower the risk of
            neural tube defects.
          </li>
          <li>
            <strong>Iron, iodine, and choline</strong> needs also increase. A prenatal vitamin
            covers several of these.
          </li>
          <li>
            <strong>Fish:</strong> choose options lower in mercury, and avoid high-mercury fish such
            as shark and swordfish.
          </li>
        </ul>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Ovulation and Planning</h2>
        <p className="text-gray-600 mb-3">
          If you are trying to conceive, ovulation usually happens about 14 days before your next
          period, not necessarily on day 14 of your cycle. The fertile window covers about six days:
          the five days before ovulation and the day of ovulation itself, because sperm can survive
          for several days. Ovulation calculators use your average cycle length to estimate this
          window. Ovulation tests or tracking basal temperature can narrow it further.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">When to Contact Your Care Team</h2>
        <p className="text-gray-600 mb-3">
          Book a prenatal appointment once you have a positive test. Contact your midwife or doctor
          promptly, or seek urgent care, if you have vaginal bleeding, severe abdominal pain, severe
          headache or vision changes, sudden swelling of the face or hands, fever, fluid leaking, or
          a noticeable decrease in the baby&apos;s movements later in pregnancy. Also talk to your
          provider before starting or changing an exercise or diet plan, and if your weight gain is
          well above or below the recommended range.
        </p>
      </section>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/pregnancy-due-date"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Pregnancy Due Date</h3>
            <p className="text-sm text-gray-600">Estimate due date from last period.</p>
          </Link>
          <Link
            href="/due-date-by-conception"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Due Date by Conception</h3>
            <p className="text-sm text-gray-600">Estimate due date from conception.</p>
          </Link>
          <Link
            href="/pregnancy-weight-gain"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Pregnancy Weight Gain</h3>
            <p className="text-sm text-gray-600">Recommended weight gain ranges.</p>
          </Link>
          <Link href="/ovulation" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Ovulation Calculator</h3>
            <p className="text-sm text-gray-600">Estimate fertile window.</p>
          </Link>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">References</h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>
            Institute of Medicine and National Research Council. Weight Gain During Pregnancy:
            Reexamining the Guidelines. Washington, DC: The National Academies Press; 2009.
          </li>
          <li>
            American College of Obstetricians and Gynecologists. Committee Opinion No. 579:
            Definition of term pregnancy. Obstet Gynecol. 2013;122(5):1139-1140.
          </li>
          <li>
            American College of Obstetricians and Gynecologists. Committee Opinion No. 700: Methods
            for estimating the due date. Obstet Gynecol. 2017.
          </li>
          <li>
            Wilcox AJ, Weinberg CR, Baird DD. Timing of sexual intercourse in relation to ovulation:
            effects on the probability of conception, survival of the pregnancy, and sex of the
            baby. N Engl J Med. 1995;333(23):1517-1521.
          </li>
          <li>Centers for Disease Control and Prevention. Folic Acid: Recommendations.</li>
          <li>
            U.S. Department of Agriculture and U.S. Department of Health and Human Services. Dietary
            Guidelines for Americans, 2020-2025.
          </li>
        </ul>
      </div>
    </div>
  );
}
