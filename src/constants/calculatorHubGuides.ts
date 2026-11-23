export interface CalculatorHubGuide {
  sections: { heading: string; paragraphs: string[] }[];
  references: string[];
}

export const CALCULATOR_HUB_GUIDES: Record<string, CalculatorHubGuide> = {
  'weight-loss': {
    sections: [
      {
        heading: 'What these calculators plan',
        paragraphs: [
          'Weight loss comes down to energy balance. Eat fewer calories than you burn for weeks and months, and your body covers the gap from stored energy, mostly fat. The calculators in this category put numbers on that idea. They give you a daily calorie target and, if you have a goal weight, a rough date for reaching it.',
          'Each one starts from your maintenance calories, the intake that would keep your weight where it is. We estimate that from your age, sex, height, weight and activity level. The Mifflin-St Jeor equation gives your resting energy, and an activity multiplier scales it up to a full day.',
        ],
      },
      {
        heading: 'Which calculator to use',
        paragraphs: [
          'If you know how fast you want to lose, start with the Calorie Deficit Calculator. It gives the daily intake for that pace and shows how a bigger or smaller deficit moves your timeline.',
          'Have a goal weight and a deadline? The Weight Management Calculator works backwards from both to a daily intake, and it warns you when the plan would need an unusually aggressive deficit.',
          'The Maximum Fat Loss Calculator estimates the largest deficit your fat stores can cover in a day, based on research by Alpert (2005). Think of it as a ceiling. Eating right at that limit is hard to keep up and makes it more likely you lose muscle along with fat.',
          'The Body Fat Burn Calculator looks at a single activity and estimates the calories and fat it uses. It is a useful reality check on how much one workout adds up to next to a change in what you eat.',
        ],
      },
      {
        heading: 'How accurate the numbers are',
        paragraphs: [
          'Predictive equations describe averages. Two people with the same height, weight and age can burn a few hundred calories a day apart, so any target is a starting point. Weigh yourself for two to three weeks. If the trend does not match the plan, move your intake by 100 to 200 calories a day and watch again.',
          'Loss also slows as you go. A lighter body burns less energy, and your body adapts to eating less. Modelling by Hall and colleagues showed this is why the old rule of 3,500 calories per pound overstates long-term results. The first weeks usually move fastest, partly because you are losing water and glycogen.',
          'A common guideline is about 0.5 to 1 kilogram (1 to 2 pounds) a week. Slower loss is easier to stick with and helps you keep muscle, more so if you eat enough protein and do strength training two or more days a week. If a calculator hands you an intake you cannot imagine living on, pick a later date. A plan you can follow beats a faster one you quit in March.',
        ],
      },
      {
        heading: 'When to get professional advice',
        paragraphs: [
          'Talk to a doctor or registered dietitian before starting a large deficit if you are pregnant or breastfeeding, under 18, have diabetes or take medication that affects blood sugar, have a history of disordered eating, or have kidney, heart or liver disease. If you are losing weight without trying, get that checked too.',
        ],
      },
    ],
    references: [
      'Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247.',
      'Hall KD, Sacks G, Chandramohan D, et al. Quantification of the effect of energy imbalance on bodyweight. Lancet. 2011;378(9793):826-837.',
      'Alpert SS. A limit on the energy transfer rate from the human fat store in hypophagia. J Theor Biol. 2005;233(1):1-13.',
    ],
  },

  'body-composition': {
    sections: [
      {
        heading: 'What body composition tells you',
        paragraphs: [
          'Your weight does not say what that weight is made of. Two people with the same scale reading can carry very different amounts of fat and muscle. Where the fat sits matters too: fat around the waist is linked to higher cardiometabolic risk than fat stored elsewhere. The calculators here estimate your body fat and lean mass and compare your shape with the ranges used in research and clinical screening.',
        ],
      },
      {
        heading: 'Which calculator to use',
        paragraphs: [
          'The BMI Calculator is the quick screen. It sorts you into the WHO categories: under 18.5 is underweight, 18.5 to 24.9 is the healthy range, 25 to 29.9 is overweight and 30 or above is obesity. It only needs height and weight, and that is also its weakness. BMI cannot tell muscle from fat, so a muscular person can read as overweight.',
          "For a body fat percentage, the Body Fat Calculator applies the U.S. Navy circumference method (neck and waist, plus hips for women), and the Army Body Fat Calculator uses the Army's tape-test equations. Lean Body Mass and FFMI show how much non-fat mass you carry, which is handy if you are trying to build muscle. If you want to lose fat and gain muscle at once, the Body Recomposition Calculator plans for that.",
          'Waist-based measures look at where fat sits. The Waist-to-Height Ratio Calculator has one simple boundary, 0.5. The Waist-to-Hip Ratio Calculator uses the WHO cut-offs of 0.90 for men and 0.85 for women. The ABSI Calculator folds waist, height and BMI into a single index tied to mortality risk, and the Body Shape Calculator describes your overall proportions.',
          'The Ideal Weight Calculator puts the Devine, Hamwi, Robinson and Miller formulas side by side. Adjusted Body Weight and Body Surface Area (Mosteller formula) are clinical measures, used for some drug dosing and nutrition calculations. The Body Frame Size Calculator estimates your frame from wrist size and height.',
        ],
      },
      {
        heading: 'How accurate the estimates are',
        paragraphs: [
          'Tape-measure methods are estimates. The Navy equations were built from reference measurements of military personnel and usually land within a few percentage points of lab methods. Technique matters a lot here. Measure at the same spots and the same time of day, and keep the tape snug rather than tight. Lab methods such as DEXA are more precise, though they are not perfect either.',
          'We would pay more attention to the trend than to any one reading. A waist that shrinks over months tells you more than a single body fat number.',
          'Home bioelectrical impedance scales work differently. They send a small current through your body and estimate fat from the resistance, which shifts with hydration, a recent meal, alcohol and exercise. Readings can swing several percentage points from one day to the next. If you use one, weigh in under the same conditions each time, for example first thing in the morning before eating or drinking.',
        ],
      },
      {
        heading: 'When to get professional advice',
        paragraphs: [
          'Screening numbers do not diagnose anything. If a result puts you in a higher-risk range, a doctor can check your blood pressure, blood sugar and cholesterol, which say more about your health than body shape does. Any clinical use of adjusted body weight or body surface area should come from your care team.',
        ],
      },
    ],
    references: [
      'World Health Organization. Obesity: preventing and managing the global epidemic. WHO Technical Report Series 894. Geneva: WHO; 2000.',
      'Hodgdon JA, Beckett MB. Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center Report No. 84-11; 1984.',
      'Ashwell M, Gunn P, Gibson S. Waist-to-height ratio is a better screening tool than waist circumference and BMI for adult cardiometabolic risk factors: systematic review and meta-analysis. Obes Rev. 2012;13(3):275-286.',
      'Krakauer NY, Krakauer JC. A new body shape index predicts mortality hazard independently of body mass index. PLoS One. 2012;7(7):e39504.',
    ],
  },

  'metabolism-energy': {
    sections: [
      {
        heading: 'What metabolism calculators measure',
        paragraphs: [
          'Your body burns energy all day, even when you are lying still. Basal metabolic rate (BMR) is what it takes to keep you alive at rest: breathing, circulation, temperature and cell repair. For most people it is the biggest slice of daily energy use. Total daily energy expenditure (TDEE) is BMR plus everything else you do, including walking, exercise, your job, fidgeting and digesting food.',
          'These numbers give you a baseline. Eat close to your TDEE and your weight should hold roughly steady. Eat below it to lose, above it to gain.',
          'In less active people, BMR usually makes up around 60 to 70% of daily energy use. Digesting food adds roughly another 10%. Movement is the rest, and it is the part that varies most between people. Muscle does burn more at rest than fat, roughly three times as much per kilogram. Still, adding a few kilograms of muscle raises daily needs only by tens of calories. Changing how much you move usually matters more.',
        ],
      },
      {
        heading: 'Which calculator to use',
        paragraphs: [
          'The BMR Calculator estimates resting energy only. By default it uses the Mifflin-St Jeor equation, which needs age, sex, height and weight, and it also offers the revised Harris-Benedict equation. If you know your body fat percentage, try the Katch-McArdle formula. It works from lean mass, so it can be more accurate.',
          'The TDEE Calculator multiplies your BMR by an activity factor, sedentary at one end and very active at the other, to estimate what you burn on a typical day.',
          'The Calorie Calculator goes one step further. It turns TDEE into daily targets for maintaining, losing or gaining weight and puts them side by side.',
        ],
      },
      {
        heading: 'How accurate the estimates are',
        paragraphs: [
          'A systematic review by Frankenfield and colleagues found that Mifflin-St Jeor came within 10% of measured resting metabolic rate for more people than the other equations they compared. Some people still fall outside that range. It happens more often at very high or very low body weights, in older adults and in very muscular athletes.',
          'Activity multipliers add more uncertainty than the BMR formula does. Most people overrate how active they are, so if you are torn between two levels, pick the lower one. The most reliable way to find your real maintenance intake is to log food and body weight for a few weeks and see where your weight holds steady.',
          'Age changes energy needs less than most people assume. A large study led by Pontzer and colleagues found that, once you adjust for body size, daily energy expenditure stays fairly stable from about age 20 to 60 and declines gradually after that. Much of the midlife slowdown people notice comes from moving less and losing muscle.',
        ],
      },
      {
        heading: 'When to get professional advice',
        paragraphs: [
          'Thyroid conditions, some medications, pregnancy and recovery from illness can all shift energy needs. If your weight is changing in a way these estimates cannot explain, or you need precise numbers for a medical diet, ask a doctor or dietitian about indirect calorimetry. It measures resting energy directly.',
        ],
      },
    ],
    references: [
      'Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247.',
      'Roza AM, Shizgal HM. The Harris Benedict equation reevaluated: resting energy requirements and the body cell mass. Am J Clin Nutr. 1984;40(1):168-182.',
      'Frankenfield D, Roth-Yousey L, Compher C. Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults: a systematic review. J Am Diet Assoc. 2005;105(5):775-789.',
      'Pontzer H, Yamada Y, Sagayama H, et al. Daily energy expenditure through the human life course. Science. 2021;373(6556):808-812.',
    ],
  },

  nutrition: {
    sections: [
      {
        heading: 'What nutrition calculators set',
        paragraphs: [
          'Once you know roughly how many calories you need, the next question is where they come from. Protein helps repair muscle and keeps you full. Carbohydrate is the main fuel for hard exercise. Fat supports hormones and lets you absorb fat-soluble vitamins. The calculators in this category split your calorie target into gram targets you can actually track.',
        ],
      },
      {
        heading: 'Which calculator to use',
        paragraphs: [
          'Start with the Macro Calculator. Give it a calorie target and a goal, and it returns daily grams of protein, carbohydrate and fat. If you only care about one nutrient, the Protein Intake, Carb Intake and Fat Intake calculators each go into more detail on theirs.',
          'The Keto Macro Calculator sets the very low carbohydrate, high fat split of a ketogenic diet. The Intermittent Fasting Calculator plans eating and fasting windows for schedules like 16:8. The GLP-1 Weight Loss Calculator shows the weight-loss ranges reported in clinical trials of GLP-1 medications, so you can see what those studies actually found.',
        ],
      },
      {
        heading: 'How the targets are set',
        paragraphs: [
          'The National Academies set Acceptable Macronutrient Distribution Ranges for adults: 45 to 65% of calories from carbohydrate, 20 to 35% from fat and 10 to 35% from protein. The Recommended Dietary Allowance for protein is 0.8 grams per kilogram of body weight. That is the floor for avoiding deficiency, and active people generally do better with more. The International Society of Sports Nutrition suggests 1.4 to 2.0 g/kg a day if you exercise regularly.',
          'Treat all of these as ranges. Food labels and tracking apps have their own error, so landing near your targets most days is plenty. Nobody needs to hit them to the gram. Food quality still counts. The Dietary Guidelines for Americans recommend keeping saturated fat under 10% of calories and getting most carbohydrate from whole grains, fruit, vegetables and legumes.',
          'To turn percentages into grams, the calculators use standard energy values: about 4 calories per gram for protein and carbohydrate, and about 9 for fat. On a 2,000-calorie diet, 30% from protein is 600 calories, or 150 grams. The National Academies also set an adequate intake for fibre of 14 grams per 1,000 calories. For many women that comes to about 25 grams a day, and about 38 grams for many men.',
        ],
      },
      {
        heading: 'When to get professional advice',
        paragraphs: [
          'Check with a doctor or registered dietitian before changing your diet if you have kidney disease, since high protein intakes may not be appropriate. The same goes if you have diabetes or take insulin (low carbohydrate or fasting plans can cause low blood sugar), are pregnant, or have a history of disordered eating. GLP-1 medications are prescription drugs, and only a prescriber can say whether one is right for you.',
        ],
      },
    ],
    references: [
      'Institute of Medicine. Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids. Washington, DC: National Academies Press; 2005.',
      'Jäger R, Kerksick CM, Campbell BI, et al. International Society of Sports Nutrition position stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20.',
      'U.S. Department of Agriculture and U.S. Department of Health and Human Services. Dietary Guidelines for Americans, 2020-2025. 9th ed.',
    ],
  },

  performance: {
    sections: [
      {
        heading: 'What performance calculators measure',
        paragraphs: [
          'Training works best when the effort fits the goal. Easy runs should feel easy and hard intervals should feel hard. Strength work needs loads heavy enough to make progress without your form falling apart. The calculators in this category estimate the numbers behind those efforts, such as heart rate zones, aerobic fitness, strength, pace and the calories an activity uses.',
        ],
      },
      {
        heading: 'Which calculator to use',
        paragraphs: [
          'For heart rate training, start with the Max Heart Rate Calculator. It shows both the traditional 220 minus age formula and the Tanaka formula (208 minus 0.7 times age). The Heart Rate Zones and Target Heart Rate calculators turn that maximum into training ranges. If you know your resting heart rate, use the Karvonen method. It builds zones from your heart rate reserve (maximum minus resting) and fits trained people better.',
          'The VO2 Max Calculator estimates aerobic fitness from the Rockport one-mile walk test. Walk a mile as fast as you can, then enter your time and your heart rate at the finish. The One Rep Max Calculator estimates the heaviest weight you could lift once from a set of several reps, which lets you plan loads as a percentage of that maximum. For race planning, the Running Pace Calculator converts between time, distance and pace. The ACFT Score Calculator scores the Army Combat Fitness Test events.',
          'The Calories Burned calculators, with walking, running, cycling, swimming and steps versions, estimate the energy you use during exercise.',
          'Pace is the simplest of these numbers and one of the most useful. A 5 km run in 25 minutes is an average of 5:00 per kilometre, or about 8:03 per mile. Knowing your goal pace before a race keeps you from going out too fast, which is one of the most common reasons runners fade in the second half.',
        ],
      },
      {
        heading: 'How accurate the estimates are',
        paragraphs: [
          'Age-based maximum heart rate formulas describe group averages. Your real maximum can be 10 or more beats per minute away from the prediction, and that shifts every zone. If you want a measured value, a supervised exercise test will give you one.',
          'One-rep max formulas such as Epley and Brzycki are most reliable with sets of about 10 reps or fewer. Calorie estimates use MET values from the Compendium of Physical Activities, where one MET is roughly one calorie per kilogram of body weight per hour. Your actual burn depends on efficiency, terrain and fitness, so allow a margin of error of 10 to 20% or more. Fitness watches have similar limits.',
        ],
      },
      {
        heading: 'When to get professional advice',
        paragraphs: [
          'Check with a doctor before starting hard training if you have heart disease, high blood pressure or diabetes, if you get chest pain or dizziness during exercise, or if you have been inactive for a long time. Medications such as beta blockers lower heart rate, which makes heart rate zones unreliable. Stop and get help if you feel chest pain, severe breathlessness or faintness.',
        ],
      },
    ],
    references: [
      'Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll Cardiol. 2001;37(1):153-156.',
      'Kline GM, Porcari JP, Hintermeister R, et al. Estimation of VO2max from a one-mile track walk, gender, age, and body weight. Med Sci Sports Exerc. 1987;19(3):253-259.',
      'Brzycki M. Strength testing: predicting a one-rep max from reps-to-fatigue. J Phys Educ Recreat Dance. 1993;64(1):88-90.',
      'Ainsworth BE, Haskell WL, Herrmann SD, et al. 2011 Compendium of Physical Activities: a second update of codes and MET values. Med Sci Sports Exerc. 2011;43(8):1575-1581.',
    ],
  },

  'wellness-recovery': {
    sections: [
      {
        heading: 'What wellness calculators cover',
        paragraphs: [
          'Recovery happens between workouts and between days. Sleep and hydration do most of the work, along with the habits that add to or subtract from long-term health. The calculators here cover those basics and give a rough picture of how lifestyle choices relate to life expectancy.',
        ],
      },
      {
        heading: 'Which calculator to use',
        paragraphs: [
          'The Water Intake Calculator starts at 35 millilitres per kilogram of body weight and adds more if you are very active. For comparison, the National Academies put adequate total water intake at about 3.7 litres a day for men and 2.7 litres for women. That figure counts water from all drinks and food, and food usually supplies around a fifth of it.',
          'The Sleep Calculator suggests bedtimes or wake times built around 90-minute sleep cycles, with 15 minutes to fall asleep, so you are more likely to wake at the end of a cycle. The American Academy of Sleep Medicine and Sleep Research Society say adults need at least seven hours a night.',
          'The Caffeine Intake Calculator compares your intake with the FDA figure of about 400 milligrams a day for healthy adults, and estimates how much caffeine is still in your system at bedtime. The Life Expectancy Calculator and the Alcohol & Smoking Impact Calculator show how smoking, drinking, exercise and diet shift life expectancy in population studies.',
        ],
      },
      {
        heading: 'How to read the results',
        paragraphs: [
          'These are general guides. You need more water in heat, at altitude, when you sweat heavily and when you are ill. Thirst plus pale yellow urine is a decent everyday check. Sleep cycles vary from person to person and across the night, so treat 90 minutes as an average. Caffeine clearance varies a lot too. It lasts longer in pregnancy and with some medications, and clears faster in smokers.',
          'Life expectancy results come from an additive model built on national statistics and large cohort studies. They are good for comparing risk factors. They cannot tell you how long any one person will live.',
          'Thirst gets less reliable with age, so older adults may need to drink at set times instead of waiting until they feel thirsty.',
          'When you have caffeine matters as much as how much. Its half-life in healthy adults averages about five hours, so if you drink a coffee with 200 milligrams at 3 pm, roughly 100 milligrams may still be active around 8 pm. Pregnancy brings a lower limit: the American College of Obstetricians and Gynecologists advises keeping caffeine under 200 milligrams a day.',
        ],
      },
      {
        heading: 'When to get professional advice',
        paragraphs: [
          'See a doctor if you snore loudly or stop breathing during sleep, feel sleepy in the day despite enough time in bed, or have insomnia that will not go away. People with heart or kidney failure may be told to limit fluids; follow that advice over any calculator. If you want help cutting down on alcohol or quitting smoking, a doctor or a quitline can offer support with a track record.',
        ],
      },
    ],
    references: [
      'Institute of Medicine. Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate. Washington, DC: National Academies Press; 2005.',
      'Watson NF, Badr MS, Belenky G, et al. Recommended amount of sleep for a healthy adult: a joint consensus statement of the American Academy of Sleep Medicine and Sleep Research Society. Sleep. 2015;38(6):843-844.',
      'U.S. Food and Drug Administration. Spilling the Beans: How Much Caffeine Is Too Much? Consumer update.',
    ],
  },

  pregnancy: {
    sections: [
      {
        heading: 'What pregnancy calculators estimate',
        paragraphs: [
          'Pregnancy calculators help with dates: when you are most likely to conceive, when the baby is due, and how much weight gain is typical week by week. They follow the same conventions clinicians use, so the numbers should match what you hear at appointments. Your provider will confirm them.',
        ],
      },
      {
        heading: 'Which calculator to use',
        paragraphs: [
          'The Ovulation Calculator estimates your fertile window from the first day of your last period and your usual cycle length. It places ovulation 14 days before your next expected period. The fertile window is the six days ending on ovulation day, because sperm can survive several days while the egg lasts only about a day.',
          "The Pregnancy Due Date Calculator uses Naegele's rule, which counts 280 days (40 weeks) from the first day of your last menstrual period. If you know the date of conception, for example after IVF, the Due Date by Conception Calculator adds 266 days to that date instead.",
          'The Pregnancy Weight Gain Calculator follows the 2009 Institute of Medicine guidelines, which set ranges for a single baby by pre-pregnancy BMI. The ranges are 28 to 40 pounds for underweight, 25 to 35 for a healthy weight, 15 to 25 for overweight and 11 to 20 for obesity.',
        ],
      },
      {
        heading: 'How accurate the dates are',
        paragraphs: [
          'Cycle-based estimates assume a regular cycle with a 14-day second half. In reality the second half varies between people and from one cycle to the next. Ovulation tests or tracking basal body temperature tell you more about your own cycle than a calendar can.',
          'If your cycle length moves by more than a few days from month to month, the calendar estimate gets shakier, and tracking the signs of ovulation directly becomes more useful.',
          'A due date is an estimate too, and most babies are not born on it. The American College of Obstetricians and Gynecologists recommends confirming the date with a first-trimester ultrasound, the most accurate way to date a pregnancy. Once your provider sets a date, go with theirs.',
          'Weight gain is not spread evenly. The 2009 guidelines assume about 0.5 to 2 kilograms (1 to 4.4 pounds) in the first trimester, then a steadier rate: about 1 pound a week in the second and third trimesters if you started at a healthy weight. Ranges for twins are higher. For a healthy starting weight the provisional guideline is 37 to 54 pounds.',
        ],
      },
      {
        heading: 'When to get professional advice',
        paragraphs: [
          'Book an appointment as soon as you get a positive test. Call your provider promptly about bleeding, severe pain, a severe headache, vision changes, sudden swelling or reduced baby movements. If you have been trying to conceive for 12 months, or 6 months if you are 35 or older, a doctor can look for causes and talk through options.',
        ],
      },
    ],
    references: [
      'Institute of Medicine and National Research Council. Weight Gain During Pregnancy: Reexamining the Guidelines. Washington, DC: National Academies Press; 2009.',
      'American College of Obstetricians and Gynecologists. Committee Opinion No. 700: Methods for Estimating the Due Date. Obstet Gynecol. 2017;129(5):e150-e154.',
      'Wilcox AJ, Weinberg CR, Baird DD. Timing of sexual intercourse in relation to ovulation: effects on the probability of conception, survival of the pregnancy, and sex of the baby. N Engl J Med. 1995;333(23):1517-1521.',
    ],
  },

  'health-vitals': {
    sections: [
      {
        heading: 'What vital signs tell you',
        paragraphs: [
          'Blood pressure, resting heart rate and blood sugar are some of the most useful numbers for catching health risks early. High blood pressure and type 2 diabetes often cause no symptoms for years, which is why regular checks matter. The calculators in this category explain your readings using the same categories doctors use.',
          'Home readings between appointments give your doctor a fuller picture than one reading in a clinic, where nerves can push blood pressure up.',
        ],
      },
      {
        heading: 'Which calculator to use',
        paragraphs: [
          'The Blood Pressure Calculator sorts a reading into the 2017 ACC/AHA categories. Normal is below 120/80. Elevated is 120 to 129 systolic with diastolic below 80. Stage 1 hypertension is 130 to 139 systolic or 80 to 89 diastolic, and stage 2 is 140 or higher systolic or 90 or higher diastolic. A reading above 180 systolic or 120 diastolic needs urgent attention.',
          'The Resting Heart Rate Calculator compares your resting pulse with typical adult ranges. For most adults, 60 to 100 beats per minute is considered normal. Well-trained endurance athletes often sit lower.',
          'The Diabetes Risk Calculator scores your type 2 diabetes risk from factors in the American Diabetes Association risk test, such as age, family history, blood pressure, activity and weight. It also converts an A1C result into estimated average glucose with the ADAG study formula. An A1C of 7%, for example, corresponds to about 154 mg/dL.',
        ],
      },
      {
        heading: 'How to get reliable readings',
        paragraphs: [
          'One blood pressure reading can mislead you. Sit quietly for five minutes with your back supported, feet flat and arm resting at heart level, and use a cuff that fits. Skip caffeine, exercise and smoking for 30 minutes beforehand. Take two or more readings a minute apart and average them, ideally on several days. Resting heart rate works the same way and is best measured just after waking.',
          'A risk score only tells you whether testing is worth doing. Diabetes itself is diagnosed with blood tests such as fasting glucose or A1C. An A1C of 5.7 to 6.4% indicates prediabetes, and 6.5% or higher indicates diabetes.',
          'Lifestyle changes can lower blood pressure by a meaningful amount. The ACC/AHA guideline lists losing excess weight, a DASH-style eating pattern rich in fruit, vegetables and low-fat dairy, less sodium, more potassium from food, regular exercise and limiting alcohol. Combine several and systolic pressure can drop by as much as some medications achieve, though people with stage 2 hypertension usually need medication as well.',
        ],
      },
      {
        heading: 'When to get professional advice',
        paragraphs: [
          'Get emergency care for a reading above 180/120 with chest pain, shortness of breath, back pain, numbness, weakness, vision changes or difficulty speaking. See a doctor if your home readings regularly fall in the hypertension ranges, if your resting heart rate is often above 100 or below 50 and you are not an endurance athlete, or if your diabetes risk score is high.',
        ],
      },
    ],
    references: [
      'Whelton PK, Carey RM, Aronow WS, et al. 2017 ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA guideline for the prevention, detection, evaluation, and management of high blood pressure in adults. Hypertension. 2018;71(6):e13-e115.',
      'American Diabetes Association. Our 60-Second Type 2 Diabetes Risk Test.',
      'Nathan DM, Kuenen J, Borg R, et al. Translating the A1C assay into estimated average glucose values. Diabetes Care. 2008;31(8):1473-1478.',
    ],
  },

  utilities: {
    sections: [
      {
        heading: 'What the utility tools do',
        paragraphs: [
          'Health information comes in mixed units. A study may report kilograms while your scale shows pounds, a recipe uses ounces and your running app tracks kilometres. The tools here handle the conversions and date arithmetic the other calculators depend on, so you can switch between systems without mistakes.',
          'Small slips add up fast. Mix up pounds and kilograms and a weight is off by a factor of about 2.2, which throws off every result built on it, calorie needs and hydration targets included.',
        ],
      },
      {
        heading: 'Which tool to use',
        paragraphs: [
          'Measurement Conversions handles weight, height, distance, volume and similar units between metric and US customary. The Age Calculator finds your exact age in years, months and days, or the time between any two dates, with leap years accounted for. The Steps to Miles Calculator turns a step count into distance using your stride length.',
          'The Age Calculator also gives the total number of days between two dates. That is handy for counting how long you have stuck with a training programme or a new habit.',
        ],
      },
      {
        heading: 'How the conversions work',
        paragraphs: [
          'Conversions use exact definitions where they exist. By international agreement, one inch is exactly 2.54 centimetres and one pound is exactly 0.45359237 kilograms. One US fluid ounce is about 29.57 millilitres. We round results for display, so if you need more decimal places for a lab value or a drug calculation, use the unrounded figure from the source.',
          'Age calculations count calendar months and days instead of dividing by an average year length, so the result matches the way people count birthdays. For a birthday on 29 February, the calculator starts the new year of age on 1 March in non-leap years.',
          'To get distance from steps, multiply by stride length. A mile is 63,360 inches, so 2,000 steps at a 30-inch stride cover about 0.95 miles. Stride length changes with height, speed and terrain, and your own measurement will beat any default. Walk a known distance, count your steps and divide.',
          'Energy units differ between countries as well. US food labels list calories, which are kilocalories, while labels in Europe and Australia often show kilojoules. One kilocalorie equals 4.184 kilojoules, so a 2,000-calorie day is about 8,370 kilojoules. Step counts vary widely too. A review by Tudor-Locke and colleagues found healthy adults take roughly 4,000 to 18,000 steps a day and judged 10,000 a reasonable target.',
        ],
      },
      {
        heading: 'Tips for accurate results',
        paragraphs: [
          'Double-check units before you enter a number. Putting centimetres where inches are expected is one of the most common causes of strange results in any calculator. For medical uses, such as medication doses or clinical measurements, go with the units and figures your care team gives you.',
        ],
      },
    ],
    references: [
      'National Institute of Standards and Technology. Guide for the Use of the International System of Units (SI). NIST Special Publication 811.',
      'Tudor-Locke C, Craig CL, Brown WJ, et al. How many steps/day are enough? For adults. Int J Behav Nutr Phys Act. 2011;8:79.',
    ],
  },
};
