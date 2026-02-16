import 'server-only';

import type { SupportedLocale } from '@/i18n/config';

export type BMIPageFaq = {
  question: string;
  answer: string;
};

export type BMIPageRelatedArticle = {
  title: string;
  description: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
};

export type BMIPageCopy = {
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogAlt: string;
  };
  page: {
    title: string;
    description: string;
    shareTitle: string;
    shareDescription: string;
    shareHashtags: string[];
    faqTitle: string;
    newsletterDescription: string;
  };
  form: {
    title: string;
    ageLabel: string;
    agePlaceholder: string;
    genderLabel: string;
    genderMale: string;
    genderFemale: string;
    calculationErrorGeneric: string;
    newCalculation: string;
    errors: {
      ageRequired: string;
      heightRequired: string;
      weightRequired: string;
    };
  };
  result: {
    title: string;
    bmiValueLabel: string;
    gaugeLabels: {
      underweight: string;
      normal: string;
      overweight: string;
      obese: string;
    };
    classificationAdult: string;
    classificationChild: string;
    percentileTemplate: string;
    healthyWeightRangeTitle: string;
    whatThisMeansTitle: string;
    childIntroTemplate: string;
    childUnderweight: string;
    childHealthy: string;
    childOverweight: string;
    childObese: string;
    adultUnderweight: string;
    adultNormal: string;
    adultOverweight: string;
    adultObese: string;
    note: string;
  };
  info: {
    title: string;
    intro: string;
    adultCategoriesTitle: string;
    adultCategories: Array<{ label: string; body: string }>;
    youthTitle: string;
    youthIntro: string;
    youthCategories: Array<{ label: string; body: string }>;
    limitationsTitle: string;
    limitationsBody: string;
  };
  understanding: {
    title: string;
    intro: string;
    whyTitle: string;
    whyBody: string;
    whyList: string[];
    beyondTitle: string;
    beyondBody: string;
    beyondList: Array<{ label: string; body: string }>;
    outroPrefix: string;
    linkBodyFat: string;
    outroMiddle: string;
    linkAbsi: string;
    outroSuffix: string;
  };
  faqs: BMIPageFaq[];
  relatedArticles: BMIPageRelatedArticle[];
  affiliate: {
    title: string;
  };
};

const COPY: Record<SupportedLocale, BMIPageCopy> = {
  en: {
    meta: {
      title: 'BMI Calculator | HealthCheck',
      description:
        'Calculate your Body Mass Index (BMI) and healthy weight range with metric or imperial inputs.',
      keywords: 'BMI calculator, body mass index, healthy weight, weight calculator, BMI chart',
      ogAlt: 'BMI Calculator',
    },
    page: {
      title: 'BMI Calculator',
      description:
        'Calculate your Body Mass Index (BMI) and find your healthy weight range based on your height.',
      shareTitle: 'BMI Calculator | Body Mass Index & Healthy Weight Range',
      shareDescription:
        'Calculate your BMI and discover your healthy weight range. Free, accurate BMI calculator for adults and children with WHO-approved categories.',
      shareHashtags: ['BMI', 'healthyweight', 'bodymassindex', 'wellness'],
      faqTitle: 'Frequently Asked Questions About BMI',
      newsletterDescription:
        'Subscribe to receive the latest body composition insights, health calculators, and evidence-based wellness advice delivered to your inbox.',
    },
    form: {
      title: 'Enter Your Details',
      ageLabel: 'Age',
      agePlaceholder: 'Years',
      genderLabel: 'Gender',
      genderMale: 'Male',
      genderFemale: 'Female',
      calculationErrorGeneric:
        'An error occurred during calculation. Please check your inputs and try again.',
      newCalculation: 'New Calculation',
      errors: {
        ageRequired: 'Age is required',
        heightRequired: 'Height is required',
        weightRequired: 'Weight is required',
      },
    },
    result: {
      title: 'Your BMI Results',
      bmiValueLabel: 'BMI Value',
      gaugeLabels: {
        underweight: 'Underweight',
        normal: 'Normal',
        overweight: 'Overweight',
        obese: 'Obese',
      },
      classificationAdult: 'BMI Classification',
      classificationChild: 'BMI Percentile Classification',
      percentileTemplate: '{percentile}th Percentile - {category}',
      healthyWeightRangeTitle: 'Healthy Weight Range for Your Height',
      whatThisMeansTitle: 'What This Means',
      childIntroTemplate:
        "Your child's BMI is at the {percentile}th percentile for their age and sex.",
      childUnderweight:
        'This is considered underweight. Consult with a healthcare provider to ensure proper growth and nutrition.',
      childHealthy: 'This is within the healthy weight range.',
      childOverweight:
        'This is considered overweight. Consider discussing healthy lifestyle habits with a healthcare provider.',
      childObese:
        'This is considered obese. It is recommended to consult with a healthcare provider about healthy weight management strategies.',
      adultUnderweight:
        'Being underweight can be associated with certain health risks including nutrient deficiencies and immune system issues. Consider consulting with a healthcare provider.',
      adultNormal:
        'Your BMI is within the healthy range. Maintaining a healthy weight can lower your risk of developing serious health problems.',
      adultOverweight:
        'Being overweight increases your risk of developing health problems such as heart disease, high blood pressure, and type 2 diabetes.',
      adultObese:
        'Obesity is associated with higher risks for serious health conditions including heart disease, stroke, type 2 diabetes, and certain cancers.',
      note: 'Note: BMI is a screening tool but does not diagnose body fatness or health. Athletes may have a high BMI due to muscle mass. Consult a healthcare provider for a complete health assessment.',
    },
    info: {
      title: 'About BMI',
      intro:
        "Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared.",
      adultCategoriesTitle: 'BMI Categories for Adults:',
      adultCategories: [
        { label: 'Underweight:', body: 'BMI less than 18.5' },
        { label: 'Normal weight:', body: 'BMI 18.5 to 24.9' },
        { label: 'Overweight:', body: 'BMI 25 to 29.9' },
        { label: 'Obesity:', body: 'BMI 30 or greater' },
      ],
      youthTitle: 'For Children and Teens (2-19 years):',
      youthIntro:
        'BMI is calculated the same way, but the interpretation is different. Results are compared to typical values for other children of the same age and sex, using percentiles:',
      youthCategories: [
        { label: 'Underweight:', body: 'Less than the 5th percentile' },
        { label: 'Healthy weight:', body: '5th to 84th percentile' },
        { label: 'Overweight:', body: '85th to 94th percentile' },
        { label: 'Obesity:', body: '95th percentile or greater' },
      ],
      limitationsTitle: 'Limitations of BMI:',
      limitationsBody:
        "BMI is a useful screening tool, but it has limitations. It doesn't distinguish between muscle and fat, nor does it account for factors like age, sex, ethnicity, or muscle mass. Athletes and muscular individuals may have a high BMI without excess fat.",
    },
    understanding: {
      title: 'Understanding Your BMI',
      intro:
        'BMI provides a simple numeric measure of your weight relative to height. It was developed in the 19th century by Belgian mathematician Adolphe Quetelet and is widely used as a screening tool to categorize weight status.',
      whyTitle: 'Why BMI Matters',
      whyBody:
        'Research has shown that BMI correlates with direct measures of body fat and with various health risks. Higher BMIs are associated with increased risk for conditions like:',
      whyList: [
        'Heart disease and stroke',
        'Type 2 diabetes',
        'High blood pressure',
        'Certain types of cancer',
        'Sleep apnea and breathing problems',
        'Osteoarthritis',
      ],
      beyondTitle: 'Beyond BMI',
      beyondBody:
        "While BMI is useful for population studies and general screening, it doesn't tell the complete story about your health. Other factors to consider include:",
      beyondList: [
        { label: 'Body composition:', body: 'The ratio of fat to muscle in your body' },
        {
          label: 'Fat distribution:',
          body: 'Where fat is stored on your body (abdominal fat carries higher health risks)',
        },
        { label: 'Waist circumference:', body: 'A measurement of abdominal fat' },
        {
          label: 'Lifestyle factors:',
          body: 'Diet quality, physical activity, sleep, and stress',
        },
        { label: 'Family history:', body: 'Genetic predisposition to certain conditions' },
      ],
      outroPrefix:
        'For a more comprehensive assessment of your health status, consider using our other calculators like the ',
      linkBodyFat: 'Body Fat Calculator',
      outroMiddle: ' or ',
      linkAbsi: 'ABSI Calculator',
      outroSuffix: ', and consult with healthcare professionals.',
    },
    faqs: [
      {
        question: 'What is a healthy BMI range?',
        answer:
          "For adults, a healthy BMI typically ranges from 18.5 to 24.9 according to WHO standards. BMI under 18.5 is considered underweight, 25.0–29.9 is overweight, and 30.0 or higher is obese. BMI is a useful screening tool, but it doesn't distinguish muscle from fat and should be interpreted alongside other health markers.",
      },
      {
        question: 'Is BMI accurate for everyone?',
        answer:
          "BMI is helpful for population screening but has limitations. It may misclassify athletes with high muscle mass, and it doesn't account for fat distribution or differences by age and ethnicity. Consider pairing BMI with waist measurements or body fat percentage.",
      },
      {
        question: 'How do I calculate BMI manually?',
        answer:
          'BMI = weight (kg) / height² (m²). For imperial units: (weight in pounds / height in inches²) × 703. Example: (150 / 65²) × 703 = 24.9.',
      },
      {
        question: 'Can I have a normal BMI but still be unhealthy?',
        answer:
          'Yes. Some people have a normal BMI but higher visceral fat or low muscle mass. Waist circumference, body fat percentage, and metabolic markers (blood pressure, glucose, lipids) provide more context.',
      },
    ],
    relatedArticles: [
      {
        title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
        description:
          'Learn what body fat percentage ranges are healthy for men and women, how body composition differs from BMI, and why it matters for your health goals.',
        slug: 'understanding-body-fat-percentage',
        date: 'February 10, 2025',
        readTime: '9 min read',
        category: 'Body Composition',
      },
      {
        title: 'TDEE Explained: Calculate Your Daily Calorie Needs',
        description:
          'Discover how Total Daily Energy Expenditure (TDEE) works, which formula is most accurate for you, and how to use it for weight management.',
        slug: 'tdee-explained',
        date: 'February 15, 2025',
        readTime: '12 min read',
        category: 'Metabolism',
      },
      {
        title: 'Waist-to-Hip Ratio Guide: What Your Measurements Reveal',
        description:
          'Discover how waist-to-hip ratio (WHR) indicates health risks, proper measurement techniques, and what healthy ratios look like for men and women.',
        slug: 'waist-to-hip-ratio-guide',
        date: 'February 12, 2025',
        readTime: '10 min read',
        category: 'Body Composition',
      },
    ],
    affiliate: {
      title: 'Recommended Products for Your Health Journey',
    },
  },
  es: {
    meta: {
      title: 'Calculadora de IMC | HealthCheck',
      description:
        'Calcula tu Índice de Masa Corporal (IMC) y tu rango de peso saludable con unidades métricas o imperiales.',
      keywords:
        'calculadora IMC, índice de masa corporal, peso saludable, calculadora de peso, tabla IMC',
      ogAlt: 'Calculadora de IMC',
    },
    page: {
      title: 'Calculadora de IMC',
      description:
        'Calcula tu Índice de Masa Corporal (IMC) y descubre tu rango de peso saludable según tu altura.',
      shareTitle: 'Calculadora de IMC | Índice de Masa Corporal y peso saludable',
      shareDescription:
        'Calcula tu IMC y descubre tu rango de peso saludable. Calculadora gratuita y precisa para adultos y jóvenes con categorías basadas en la OMS.',
      shareHashtags: ['IMC', 'salud', 'peso', 'bienestar'],
      faqTitle: 'Preguntas frecuentes sobre el IMC',
      newsletterDescription:
        'Suscríbete para recibir información sobre composición corporal, nuevas calculadoras y consejos basados en evidencia.',
    },
    form: {
      title: 'Introduce tus datos',
      ageLabel: 'Edad',
      agePlaceholder: 'Años',
      genderLabel: 'Género',
      genderMale: 'Hombre',
      genderFemale: 'Mujer',
      calculationErrorGeneric:
        'Ocurrió un error durante el cálculo. Revisa tus datos e inténtalo de nuevo.',
      newCalculation: 'Nuevo cálculo',
      errors: {
        ageRequired: 'La edad es obligatoria',
        heightRequired: 'La altura es obligatoria',
        weightRequired: 'El peso es obligatorio',
      },
    },
    result: {
      title: 'Resultados de tu IMC',
      bmiValueLabel: 'Valor de IMC',
      gaugeLabels: {
        underweight: 'Bajo peso',
        normal: 'Normal',
        overweight: 'Sobrepeso',
        obese: 'Obesidad',
      },
      classificationAdult: 'Clasificación del IMC',
      classificationChild: 'Clasificación por percentiles',
      percentileTemplate: 'Percentil {percentile} - {category}',
      healthyWeightRangeTitle: 'Rango de peso saludable para tu altura',
      whatThisMeansTitle: 'Qué significa',
      childIntroTemplate:
        'El IMC de tu hijo/a está en el percentil {percentile} para su edad y sexo.',
      childUnderweight:
        'Se considera bajo peso. Consulta con un profesional de salud para asegurar un crecimiento y nutrición adecuados.',
      childHealthy: 'Está dentro del rango de peso saludable.',
      childOverweight:
        'Se considera sobrepeso. Considera hablar sobre hábitos saludables con un profesional de salud.',
      childObese:
        'Se considera obesidad. Se recomienda consultar con un profesional de salud sobre estrategias de manejo del peso.',
      adultUnderweight:
        'El bajo peso puede asociarse con riesgos como deficiencias nutricionales y problemas inmunitarios. Considera consultar con un profesional de salud.',
      adultNormal:
        'Tu IMC está dentro del rango saludable. Mantener un peso saludable puede reducir el riesgo de problemas de salud.',
      adultOverweight:
        'El sobrepeso aumenta el riesgo de problemas como cardiopatías, hipertensión y diabetes tipo 2.',
      adultObese:
        'La obesidad se asocia con mayores riesgos de afecciones graves como cardiopatías, ictus, diabetes tipo 2 y ciertos tipos de cáncer.',
      note: 'Nota: El IMC es una herramienta de cribado y no diagnostica la grasa corporal ni la salud. Personas con mucha masa muscular pueden tener un IMC alto. Consulta a un profesional de salud para una evaluación completa.',
    },
    info: {
      title: 'Acerca del IMC',
      intro:
        'El Índice de Masa Corporal (IMC) es un cálculo simple que relaciona altura y peso. La fórmula es IMC = kg/m², donde kg es el peso en kilogramos y m² es la altura en metros al cuadrado.',
      adultCategoriesTitle: 'Categorías de IMC en adultos:',
      adultCategories: [
        { label: 'Bajo peso:', body: 'IMC menor de 18,5' },
        { label: 'Peso normal:', body: 'IMC de 18,5 a 24,9' },
        { label: 'Sobrepeso:', body: 'IMC de 25 a 29,9' },
        { label: 'Obesidad:', body: 'IMC de 30 o más' },
      ],
      youthTitle: 'En niños y adolescentes (2-19 años):',
      youthIntro:
        'El IMC se calcula igual, pero se interpreta de forma diferente. Se compara con percentiles de niños/as de la misma edad y sexo:',
      youthCategories: [
        { label: 'Bajo peso:', body: 'Menor del percentil 5' },
        { label: 'Peso saludable:', body: 'Del percentil 5 al 84' },
        { label: 'Sobrepeso:', body: 'Del percentil 85 al 94' },
        { label: 'Obesidad:', body: 'Percentil 95 o superior' },
      ],
      limitationsTitle: 'Limitaciones del IMC:',
      limitationsBody:
        'El IMC es útil como cribado, pero tiene limitaciones: no distingue entre músculo y grasa y no considera factores como edad, sexo, etnia o masa muscular. Deportistas pueden tener un IMC alto sin exceso de grasa.',
    },
    understanding: {
      title: 'Entender tu IMC',
      intro:
        'El IMC ofrece una medida numérica sencilla del peso en relación con la altura. Se desarrolló en el siglo XIX y se utiliza ampliamente como herramienta de cribado para clasificar el estado de peso.',
      whyTitle: 'Por qué importa el IMC',
      whyBody:
        'Los estudios muestran que el IMC se relaciona con la grasa corporal y con ciertos riesgos de salud. Un IMC más alto se asocia con mayor riesgo de:',
      whyList: [
        'Enfermedad cardiovascular e ictus',
        'Diabetes tipo 2',
        'Hipertensión',
        'Algunos tipos de cáncer',
        'Apnea del sueño y problemas respiratorios',
        'Artrosis',
      ],
      beyondTitle: 'Más allá del IMC',
      beyondBody:
        'Aunque el IMC es útil, no cuenta toda la historia. Otros factores a considerar incluyen:',
      beyondList: [
        { label: 'Composición corporal:', body: 'Proporción de grasa y músculo' },
        { label: 'Distribución de grasa:', body: 'La grasa abdominal suele implicar mayor riesgo' },
        { label: 'Perímetro de cintura:', body: 'Medida indirecta de grasa abdominal' },
        { label: 'Estilo de vida:', body: 'Alimentación, actividad, sueño y estrés' },
        { label: 'Antecedentes familiares:', body: 'Predisposición genética' },
      ],
      outroPrefix: 'Para una evaluación más completa, prueba otras calculadoras como la ',
      linkBodyFat: 'Calculadora de grasa corporal',
      outroMiddle: ' o la ',
      linkAbsi: 'Calculadora ABSI',
      outroSuffix: ' y consulta con profesionales de salud.',
    },
    faqs: [
      {
        question: '¿Cuál es un rango de IMC saludable?',
        answer:
          'En adultos, un IMC saludable suele estar entre 18,5 y 24,9 según la OMS. Menos de 18,5 se considera bajo peso; 25–29,9, sobrepeso; y 30 o más, obesidad. Es una guía, no un diagnóstico.',
      },
      {
        question: '¿El IMC es preciso para todo el mundo?',
        answer:
          'No siempre. Puede sobreestimar el riesgo en personas muy musculadas y no refleja la distribución de grasa. Combínalo con medidas de cintura o porcentaje de grasa corporal.',
      },
      {
        question: '¿Cómo se calcula el IMC manualmente?',
        answer:
          'IMC = peso (kg) / altura² (m²). En unidades imperiales: (peso en libras / altura en pulgadas²) × 703.',
      },
      {
        question: '¿Puedo tener un IMC normal y aun así estar poco saludable?',
        answer:
          'Sí. Se puede tener IMC normal pero alta grasa visceral o poca masa muscular. La cintura, el porcentaje de grasa y marcadores metabólicos aportan contexto.',
      },
    ],
    relatedArticles: [],
    affiliate: {
      title: 'Productos recomendados para tu salud',
    },
  },
  fr: {
    meta: {
      title: 'Calculateur d’IMC | HealthCheck',
      description:
        'Calculez votre indice de masse corporelle (IMC) et votre fourchette de poids santé en unités métriques ou impériales.',
      keywords:
        'calculateur IMC, indice de masse corporelle, poids santé, calculateur de poids, tableau IMC',
      ogAlt: 'Calculateur d’IMC',
    },
    page: {
      title: 'Calculateur d’IMC',
      description:
        'Calculez votre indice de masse corporelle (IMC) et découvrez votre fourchette de poids santé selon votre taille.',
      shareTitle: 'Calculateur d’IMC | Indice de masse corporelle et poids santé',
      shareDescription:
        'Calculez votre IMC et votre fourchette de poids santé. Calculateur gratuit et fiable pour adultes et jeunes, basé sur les catégories de l’OMS.',
      shareHashtags: ['IMC', 'sante', 'poids', 'bienetre'],
      faqTitle: 'Questions fréquentes sur l’IMC',
      newsletterDescription:
        'Abonnez-vous pour recevoir des conseils fondés sur la science, des calculateurs et des infos sur la composition corporelle.',
    },
    form: {
      title: 'Entrez vos informations',
      ageLabel: 'Âge',
      agePlaceholder: 'Années',
      genderLabel: 'Sexe',
      genderMale: 'Homme',
      genderFemale: 'Femme',
      calculationErrorGeneric:
        'Une erreur est survenue pendant le calcul. Vérifiez vos informations et réessayez.',
      newCalculation: 'Nouveau calcul',
      errors: {
        ageRequired: 'L’âge est requis',
        heightRequired: 'La taille est requise',
        weightRequired: 'Le poids est requis',
      },
    },
    result: {
      title: 'Vos résultats IMC',
      bmiValueLabel: 'Valeur IMC',
      gaugeLabels: {
        underweight: 'Insuffisance pondérale',
        normal: 'Normal',
        overweight: 'Surpoids',
        obese: 'Obésité',
      },
      classificationAdult: 'Classification IMC',
      classificationChild: 'Classification par percentile',
      percentileTemplate: 'Percentile {percentile} - {category}',
      healthyWeightRangeTitle: 'Fourchette de poids santé pour votre taille',
      whatThisMeansTitle: 'Ce que cela signifie',
      childIntroTemplate:
        'L’IMC de votre enfant se situe au {percentile}e percentile pour son âge et son sexe.',
      childUnderweight:
        'Cela correspond à une insuffisance pondérale. Consultez un professionnel de santé pour assurer une croissance et une nutrition adaptées.',
      childHealthy: 'Cela se situe dans la plage de poids santé.',
      childOverweight:
        'Cela correspond au surpoids. Discutez des habitudes de vie avec un professionnel de santé.',
      childObese:
        'Cela correspond à l’obésité. Il est recommandé de consulter un professionnel de santé pour une prise en charge adaptée.',
      adultUnderweight:
        'Un poids insuffisant peut être associé à certains risques (carences, fragilité immunitaire). Envisagez d’en parler à un professionnel de santé.',
      adultNormal:
        'Votre IMC est dans la plage considérée comme saine. Maintenir un poids santé peut réduire le risque de problèmes de santé.',
      adultOverweight:
        'Le surpoids augmente le risque de problèmes comme les maladies cardiovasculaires, l’hypertension et le diabète de type 2.',
      adultObese:
        'L’obésité est associée à un risque accru de maladies graves (cardiopathies, AVC, diabète de type 2, certains cancers).',
      note: 'Remarque : l’IMC est un outil de dépistage, pas un diagnostic. Les personnes très musclées peuvent avoir un IMC élevé. Consultez un professionnel pour une évaluation complète.',
    },
    info: {
      title: 'À propos de l’IMC',
      intro:
        'L’indice de masse corporelle (IMC) est un calcul simple basé sur la taille et le poids. Formule : IMC = kg/m², où kg est le poids en kilogrammes et m² la taille en mètres au carré.',
      adultCategoriesTitle: 'Catégories d’IMC (adultes) :',
      adultCategories: [
        { label: 'Insuffisance pondérale :', body: 'IMC inférieur à 18,5' },
        { label: 'Poids normal :', body: 'IMC de 18,5 à 24,9' },
        { label: 'Surpoids :', body: 'IMC de 25 à 29,9' },
        { label: 'Obésité :', body: 'IMC de 30 ou plus' },
      ],
      youthTitle: 'Enfants et adolescents (2-19 ans) :',
      youthIntro:
        'L’IMC se calcule de la même façon, mais l’interprétation diffère. On utilise des percentiles selon l’âge et le sexe :',
      youthCategories: [
        { label: 'Insuffisance pondérale :', body: 'Moins du 5e percentile' },
        { label: 'Poids santé :', body: 'Du 5e au 84e percentile' },
        { label: 'Surpoids :', body: 'Du 85e au 94e percentile' },
        { label: 'Obésité :', body: '95e percentile ou plus' },
      ],
      limitationsTitle: 'Limites de l’IMC :',
      limitationsBody:
        'L’IMC est utile mais imparfait : il ne distingue pas la masse musculaire de la masse grasse et ne tient pas compte de l’âge, du sexe, de l’ethnie ou de la répartition de la graisse.',
    },
    understanding: {
      title: 'Comprendre votre IMC',
      intro:
        'L’IMC fournit une mesure simple du poids par rapport à la taille. Développé au XIXe siècle, il est largement utilisé pour classer le statut pondéral.',
      whyTitle: 'Pourquoi l’IMC compte',
      whyBody:
        'Les recherches montrent une corrélation entre l’IMC, la masse grasse et certains risques de santé. Un IMC élevé est associé à un risque accru de :',
      whyList: [
        'Maladies cardiovasculaires et AVC',
        'Diabète de type 2',
        'Hypertension artérielle',
        'Certains cancers',
        'Apnée du sommeil et troubles respiratoires',
        'Arthrose',
      ],
      beyondTitle: 'Au-delà de l’IMC',
      beyondBody: 'L’IMC ne suffit pas à lui seul. D’autres facteurs importants incluent :',
      beyondList: [
        { label: 'Composition corporelle :', body: 'Proportion de masse grasse et musculaire' },
        { label: 'Répartition des graisses :', body: 'La graisse abdominale est plus à risque' },
        { label: 'Tour de taille :', body: 'Indicateur de graisse abdominale' },
        { label: 'Mode de vie :', body: 'Alimentation, activité, sommeil, stress' },
        { label: 'Antécédents familiaux :', body: 'Prédispositions génétiques' },
      ],
      outroPrefix: 'Pour une évaluation plus complète, essayez aussi le ',
      linkBodyFat: 'calculateur de masse grasse',
      outroMiddle: ' ou le ',
      linkAbsi: 'calculateur ABSI',
      outroSuffix: ', et consultez un professionnel de santé.',
    },
    faqs: [
      {
        question: 'Quelle est une plage d’IMC saine ?',
        answer:
          'Chez l’adulte, une plage d’IMC dite saine se situe généralement entre 18,5 et 24,9 (OMS). En dessous : insuffisance pondérale ; 25–29,9 : surpoids ; ≥30 : obésité.',
      },
      {
        question: 'L’IMC est-il fiable pour tout le monde ?',
        answer:
          'Pas toujours. Il peut surestimer le risque chez les personnes très musclées et ne reflète pas la répartition des graisses. Combinez-le avec le tour de taille ou le pourcentage de masse grasse.',
      },
      {
        question: 'Comment calculer l’IMC manuellement ?',
        answer:
          'IMC = poids (kg) / taille² (m²). En unités impériales : (poids en livres / taille en pouces²) × 703.',
      },
      {
        question: 'Peut-on avoir un IMC normal et être en mauvaise santé ?',
        answer:
          'Oui. Un IMC normal peut coexister avec une graisse viscérale élevée ou une faible masse musculaire. Le tour de taille, le % de masse grasse et les marqueurs métaboliques sont utiles.',
      },
    ],
    relatedArticles: [],
    affiliate: {
      title: 'Produits recommandés',
    },
  },
  de: {
    meta: {
      title: 'BMI-Rechner | HealthCheck',
      description:
        'Berechnen Sie Ihren Body-Mass-Index (BMI) und Ihren gesunden Gewichtsbereich mit metrischen oder imperialen Einheiten.',
      keywords: 'BMI Rechner, Body Mass Index, gesundes Gewicht, Gewichtsrechner, BMI Tabelle',
      ogAlt: 'BMI-Rechner',
    },
    page: {
      title: 'BMI-Rechner',
      description:
        'Berechnen Sie Ihren Body-Mass-Index (BMI) und finden Sie Ihren gesunden Gewichtsbereich basierend auf Ihrer Größe.',
      shareTitle: 'BMI-Rechner | Body-Mass-Index & gesundes Gewicht',
      shareDescription:
        'Berechnen Sie Ihren BMI und entdecken Sie Ihren gesunden Gewichtsbereich. Kostenloser, genauer BMI-Rechner für Erwachsene und Jugendliche nach WHO-Kategorien.',
      shareHashtags: ['BMI', 'gesund', 'gewicht', 'wohlbefinden'],
      faqTitle: 'Häufige Fragen zum BMI',
      newsletterDescription:
        'Abonnieren Sie Updates zu Körperzusammensetzung, neuen Rechnern und evidenzbasierten Tipps.',
    },
    form: {
      title: 'Geben Sie Ihre Daten ein',
      ageLabel: 'Alter',
      agePlaceholder: 'Jahre',
      genderLabel: 'Geschlecht',
      genderMale: 'Mann',
      genderFemale: 'Frau',
      calculationErrorGeneric:
        'Beim Berechnen ist ein Fehler aufgetreten. Bitte prüfen Sie Ihre Eingaben und versuchen Sie es erneut.',
      newCalculation: 'Neue Berechnung',
      errors: {
        ageRequired: 'Alter ist erforderlich',
        heightRequired: 'Größe ist erforderlich',
        weightRequired: 'Gewicht ist erforderlich',
      },
    },
    result: {
      title: 'Ihre BMI-Ergebnisse',
      bmiValueLabel: 'BMI-Wert',
      gaugeLabels: {
        underweight: 'Untergewicht',
        normal: 'Normal',
        overweight: 'Übergewicht',
        obese: 'Adipositas',
      },
      classificationAdult: 'BMI-Klassifikation',
      classificationChild: 'Perzentil-Klassifikation',
      percentileTemplate: 'Perzentil {percentile} - {category}',
      healthyWeightRangeTitle: 'Gesunder Gewichtsbereich für Ihre Größe',
      whatThisMeansTitle: 'Bedeutung',
      childIntroTemplate:
        'Der BMI Ihres Kindes liegt im {percentile}. Perzentil für Alter und Geschlecht.',
      childUnderweight:
        'Das gilt als Untergewicht. Sprechen Sie mit einer Fachperson, um Wachstum und Ernährung zu beurteilen.',
      childHealthy: 'Das liegt im gesunden Bereich.',
      childOverweight:
        'Das gilt als Übergewicht. Erwägen Sie, gesunde Gewohnheiten mit einer Fachperson zu besprechen.',
      childObese:
        'Das gilt als Adipositas. Es wird empfohlen, eine Fachperson zur Gewichtsmanagement-Strategie zu konsultieren.',
      adultUnderweight:
        'Untergewicht kann mit Risiken wie Nährstoffmangel und Immunschwäche verbunden sein. Sprechen Sie ggf. mit einer Fachperson.',
      adultNormal:
        'Ihr BMI liegt im gesunden Bereich. Ein gesundes Gewicht kann das Risiko für ernsthafte Erkrankungen senken.',
      adultOverweight:
        'Übergewicht erhöht das Risiko für Probleme wie Herzkrankheiten, Bluthochdruck und Typ-2-Diabetes.',
      adultObese:
        'Adipositas ist mit einem erhöhten Risiko für schwere Erkrankungen verbunden, z. B. Herzkrankheiten, Schlaganfall, Typ-2-Diabetes und bestimmte Krebsarten.',
      note: 'Hinweis: Der BMI ist ein Screening-Wert und keine Diagnose. Athleten können durch Muskelmasse einen höheren BMI haben. Für eine vollständige Bewertung wenden Sie sich an eine Fachperson.',
    },
    info: {
      title: 'Über den BMI',
      intro:
        'Der Body-Mass-Index (BMI) ist eine einfache Berechnung aus Körpergröße und Gewicht. Die Formel lautet BMI = kg/m², wobei kg das Gewicht in Kilogramm und m² die Körpergröße in Metern zum Quadrat ist.',
      adultCategoriesTitle: 'BMI-Kategorien für Erwachsene:',
      adultCategories: [
        { label: 'Untergewicht:', body: 'BMI unter 18,5' },
        { label: 'Normalgewicht:', body: 'BMI 18,5 bis 24,9' },
        { label: 'Übergewicht:', body: 'BMI 25 bis 29,9' },
        { label: 'Adipositas:', body: 'BMI 30 oder höher' },
      ],
      youthTitle: 'Kinder und Jugendliche (2-19 Jahre):',
      youthIntro:
        'Der BMI wird gleich berechnet, aber anders interpretiert. Ergebnisse werden als Perzentile nach Alter und Geschlecht eingeordnet:',
      youthCategories: [
        { label: 'Untergewicht:', body: 'Unter dem 5. Perzentil' },
        { label: 'Gesundes Gewicht:', body: '5. bis 84. Perzentil' },
        { label: 'Übergewicht:', body: '85. bis 94. Perzentil' },
        { label: 'Adipositas:', body: '95. Perzentil oder höher' },
      ],
      limitationsTitle: 'Grenzen des BMI:',
      limitationsBody:
        'Der BMI ist hilfreich, hat aber Grenzen: Er unterscheidet nicht zwischen Muskel- und Fettmasse und berücksichtigt Faktoren wie Alter, Geschlecht, Ethnie oder Fettverteilung nicht.',
    },
    understanding: {
      title: 'BMI verstehen',
      intro:
        'Der BMI liefert eine einfache Kennzahl, die Gewicht und Größe in Beziehung setzt. Er wird häufig als Screening-Tool zur Einordnung des Gewichtsstatus verwendet.',
      whyTitle: 'Warum der BMI wichtig ist',
      whyBody:
        'Studien zeigen Zusammenhänge zwischen BMI, Körperfett und Gesundheitsrisiken. Ein höherer BMI ist u. a. mit erhöhtem Risiko verbunden für:',
      whyList: [
        'Herz-Kreislauf-Erkrankungen und Schlaganfall',
        'Typ-2-Diabetes',
        'Bluthochdruck',
        'Bestimmte Krebsarten',
        'Schlafapnoe und Atemprobleme',
        'Arthrose',
      ],
      beyondTitle: 'Mehr als nur BMI',
      beyondBody: 'Der BMI allein reicht nicht. Wichtige ergänzende Faktoren sind:',
      beyondList: [
        { label: 'Körperzusammensetzung:', body: 'Verhältnis von Fett- zu Muskelmasse' },
        { label: 'Fettverteilung:', body: 'Bauchfett ist oft risikoreicher' },
        { label: 'Taillenumfang:', body: 'Indikator für abdominales Fett' },
        { label: 'Lebensstil:', body: 'Ernährung, Bewegung, Schlaf, Stress' },
        { label: 'Familienanamnese:', body: 'Genetische Veranlagung' },
      ],
      outroPrefix: 'Für eine umfassendere Einschätzung nutzen Sie z. B. auch den ',
      linkBodyFat: 'Körperfett-Rechner',
      outroMiddle: ' oder den ',
      linkAbsi: 'ABSI-Rechner',
      outroSuffix: ' und lassen Sie sich ggf. fachlich beraten.',
    },
    faqs: [
      {
        question: 'Welcher BMI-Bereich gilt als gesund?',
        answer:
          'Für Erwachsene gilt nach WHO häufig 18,5 bis 24,9 als gesunder Bereich. Unter 18,5: Untergewicht; 25–29,9: Übergewicht; ab 30: Adipositas.',
      },
      {
        question: 'Ist der BMI für alle genau?',
        answer:
          'Nicht immer. Bei sehr muskulösen Personen kann der BMI das Risiko überschätzen. Er zeigt außerdem nicht, wo Fett gespeichert ist. Ergänzen Sie z. B. Taillenumfang oder Körperfettanteil.',
      },
      {
        question: 'Wie berechne ich den BMI manuell?',
        answer:
          'BMI = Gewicht (kg) / Größe² (m²). In imperialen Einheiten: (Gewicht in Pfund / Größe in Zoll²) × 703.',
      },
      {
        question: 'Kann man mit normalem BMI trotzdem ungesund sein?',
        answer:
          'Ja. Normaler BMI kann mit hoher viszeraler Fettmasse oder geringer Muskelmasse einhergehen. Taillenumfang, Körperfettanteil und Stoffwechselwerte geben mehr Kontext.',
      },
    ],
    relatedArticles: [],
    affiliate: {
      title: 'Empfohlene Produkte',
    },
  },
  pt: {
    meta: {
      title: 'Calculadora de IMC | HealthCheck',
      description:
        'Calcule seu Índice de Massa Corporal (IMC) e a faixa de peso saudável com unidades métricas ou imperiais.',
      keywords:
        'calculadora IMC, índice de massa corporal, peso saudável, calculadora de peso, tabela IMC',
      ogAlt: 'Calculadora de IMC',
    },
    page: {
      title: 'Calculadora de IMC',
      description:
        'Calcule seu Índice de Massa Corporal (IMC) e descubra sua faixa de peso saudável com base na altura.',
      shareTitle: 'Calculadora de IMC | Índice de Massa Corporal e peso saudável',
      shareDescription:
        'Calcule seu IMC e descubra sua faixa de peso saudável. Calculadora gratuita e precisa para adultos e jovens com categorias baseadas na OMS.',
      shareHashtags: ['IMC', 'saude', 'peso', 'bemestar'],
      faqTitle: 'Perguntas frequentes sobre IMC',
      newsletterDescription:
        'Assine para receber insights sobre composição corporal, novas calculadoras e dicas baseadas em evidências.',
    },
    form: {
      title: 'Informe seus dados',
      ageLabel: 'Idade',
      agePlaceholder: 'Anos',
      genderLabel: 'Sexo',
      genderMale: 'Homem',
      genderFemale: 'Mulher',
      calculationErrorGeneric:
        'Ocorreu um erro durante o cálculo. Verifique os dados e tente novamente.',
      newCalculation: 'Novo cálculo',
      errors: {
        ageRequired: 'A idade é obrigatória',
        heightRequired: 'A altura é obrigatória',
        weightRequired: 'O peso é obrigatório',
      },
    },
    result: {
      title: 'Resultados do seu IMC',
      bmiValueLabel: 'Valor do IMC',
      gaugeLabels: {
        underweight: 'Abaixo do peso',
        normal: 'Normal',
        overweight: 'Sobrepeso',
        obese: 'Obesidade',
      },
      classificationAdult: 'Classificação do IMC',
      classificationChild: 'Classificação por percentil',
      percentileTemplate: 'Percentil {percentile} - {category}',
      healthyWeightRangeTitle: 'Faixa de peso saudável para sua altura',
      whatThisMeansTitle: 'O que significa',
      childIntroTemplate: 'O IMC da criança está no percentil {percentile} para idade e sexo.',
      childUnderweight:
        'Isso é considerado abaixo do peso. Procure um profissional de saúde para avaliar crescimento e nutrição.',
      childHealthy: 'Está dentro da faixa de peso saudável.',
      childOverweight:
        'Isso é considerado sobrepeso. Considere conversar sobre hábitos saudáveis com um profissional de saúde.',
      childObese:
        'Isso é considerado obesidade. Recomenda-se procurar um profissional de saúde para estratégias de manejo do peso.',
      adultUnderweight:
        'Estar abaixo do peso pode estar associado a riscos como deficiências nutricionais e menor imunidade. Considere procurar um profissional de saúde.',
      adultNormal:
        'Seu IMC está na faixa saudável. Manter um peso saudável pode reduzir o risco de problemas de saúde.',
      adultOverweight:
        'O sobrepeso aumenta o risco de problemas como doença cardíaca, pressão alta e diabetes tipo 2.',
      adultObese:
        'A obesidade está associada a maior risco de condições graves como doença cardíaca, AVC, diabetes tipo 2 e alguns cânceres.',
      note: 'Observação: o IMC é uma ferramenta de triagem e não diagnostica gordura corporal ou saúde. Atletas podem ter IMC alto por causa da massa muscular. Consulte um profissional para avaliação completa.',
    },
    info: {
      title: 'Sobre o IMC',
      intro:
        'O Índice de Massa Corporal (IMC) é um cálculo simples usando altura e peso. Fórmula: IMC = kg/m², onde kg é o peso em quilogramas e m² é a altura em metros ao quadrado.',
      adultCategoriesTitle: 'Categorias de IMC para adultos:',
      adultCategories: [
        { label: 'Abaixo do peso:', body: 'IMC menor que 18,5' },
        { label: 'Peso normal:', body: 'IMC de 18,5 a 24,9' },
        { label: 'Sobrepeso:', body: 'IMC de 25 a 29,9' },
        { label: 'Obesidade:', body: 'IMC de 30 ou mais' },
      ],
      youthTitle: 'Crianças e adolescentes (2-19 anos):',
      youthIntro:
        'O IMC é calculado da mesma forma, mas a interpretação é diferente. Os resultados são comparados por percentis conforme idade e sexo:',
      youthCategories: [
        { label: 'Abaixo do peso:', body: 'Abaixo do 5º percentil' },
        { label: 'Peso saudável:', body: 'Do 5º ao 84º percentil' },
        { label: 'Sobrepeso:', body: 'Do 85º ao 94º percentil' },
        { label: 'Obesidade:', body: '95º percentil ou mais' },
      ],
      limitationsTitle: 'Limitações do IMC:',
      limitationsBody:
        'O IMC é útil, mas tem limitações: não distingue músculo e gordura e não considera fatores como idade, sexo, etnia ou composição corporal. Pessoas muito musculosas podem ter IMC alto sem excesso de gordura.',
    },
    understanding: {
      title: 'Entenda seu IMC',
      intro:
        'O IMC é uma medida numérica simples que relaciona peso e altura. É amplamente usado como ferramenta de triagem para classificar o estado de peso.',
      whyTitle: 'Por que o IMC importa',
      whyBody:
        'Pesquisas mostram que o IMC se relaciona com a gordura corporal e com alguns riscos à saúde. Um IMC mais alto está associado a maior risco de:',
      whyList: [
        'Doença cardíaca e AVC',
        'Diabetes tipo 2',
        'Pressão alta',
        'Alguns tipos de câncer',
        'Apneia do sono e problemas respiratórios',
        'Osteoartrite',
      ],
      beyondTitle: 'Além do IMC',
      beyondBody: 'Apesar de útil, o IMC não conta toda a história. Outros fatores incluem:',
      beyondList: [
        { label: 'Composição corporal:', body: 'Proporção de gordura e músculo' },
        { label: 'Distribuição de gordura:', body: 'Gordura abdominal costuma ser mais arriscada' },
        { label: 'Circunferência da cintura:', body: 'Indicador de gordura abdominal' },
        { label: 'Estilo de vida:', body: 'Alimentação, atividade, sono e estresse' },
        { label: 'Histórico familiar:', body: 'Predisposições genéticas' },
      ],
      outroPrefix: 'Para uma avaliação mais completa, use também a ',
      linkBodyFat: 'Calculadora de gordura corporal',
      outroMiddle: ' ou a ',
      linkAbsi: 'Calculadora de ABSI',
      outroSuffix: ' e consulte profissionais de saúde.',
    },
    faqs: [
      {
        question: 'Qual é uma faixa de IMC saudável?',
        answer:
          'Para adultos, a OMS geralmente considera 18,5–24,9 como faixa saudável. Abaixo de 18,5 é abaixo do peso; 25–29,9 é sobrepeso; e 30 ou mais é obesidade.',
      },
      {
        question: 'O IMC é preciso para todo mundo?',
        answer:
          'Nem sempre. Pode superestimar o risco em pessoas muito musculosas e não mostra onde a gordura está localizada. Combine com cintura ou percentual de gordura.',
      },
      {
        question: 'Como calcular IMC manualmente?',
        answer:
          'IMC = peso (kg) / altura² (m²). Em unidades imperiais: (peso em libras / altura em polegadas²) × 703.',
      },
      {
        question: 'Posso ter IMC normal e ainda assim estar pouco saudável?',
        answer:
          'Sim. Você pode ter IMC normal e ainda ter muita gordura visceral ou pouca massa muscular. Medidas como cintura, % de gordura e marcadores metabólicos ajudam.',
      },
    ],
    relatedArticles: [],
    affiliate: {
      title: 'Produtos recomendados',
    },
  },
  zh: {
    meta: {
      title: 'BMI 计算器 | HealthCheck',
      description: '使用公制或英制输入计算体质指数（BMI），并查看适合你身高的健康体重范围。',
      keywords: 'BMI 计算器, 体质指数, 健康体重, 体重计算器, BMI 标准',
      ogAlt: 'BMI 计算器',
    },
    page: {
      title: 'BMI 计算器',
      description: '计算你的体质指数（BMI），并根据身高查看健康体重范围。',
      shareTitle: 'BMI 计算器 | 体质指数与健康体重范围',
      shareDescription:
        '计算 BMI 并了解你的健康体重范围。免费、准确，适用于成人与青少年，参考 WHO 分类标准。',
      shareHashtags: ['BMI', '健康', '体重', '健身'],
      faqTitle: '关于 BMI 的常见问题',
      newsletterDescription: '订阅获取体成分科普、最新计算器与循证健康建议。',
    },
    form: {
      title: '填写信息',
      ageLabel: '年龄',
      agePlaceholder: '岁',
      genderLabel: '性别',
      genderMale: '男',
      genderFemale: '女',
      calculationErrorGeneric: '计算时发生错误。请检查输入后重试。',
      newCalculation: '重新计算',
      errors: {
        ageRequired: '请填写年龄',
        heightRequired: '请填写身高',
        weightRequired: '请填写体重',
      },
    },
    result: {
      title: '你的 BMI 结果',
      bmiValueLabel: 'BMI 数值',
      gaugeLabels: {
        underweight: '偏瘦',
        normal: '正常',
        overweight: '超重',
        obese: '肥胖',
      },
      classificationAdult: 'BMI 分类',
      classificationChild: '按百分位分类',
      percentileTemplate: '第 {percentile} 百分位 - {category}',
      healthyWeightRangeTitle: '适合你身高的健康体重范围',
      whatThisMeansTitle: '这意味着什么',
      childIntroTemplate: '孩子的 BMI 在同年龄与性别人群中处于第 {percentile} 百分位。',
      childUnderweight: '偏瘦。建议咨询专业人士，评估生长与营养是否合适。',
      childHealthy: '处于健康体重范围内。',
      childOverweight: '超重。可以与专业人士讨论更健康的生活方式。',
      childObese: '肥胖。建议咨询专业人士制定更安全的体重管理策略。',
      adultUnderweight: '偏瘦可能与营养不足、免疫功能下降等风险相关。建议咨询专业人士进行评估。',
      adultNormal: '你的 BMI 处于健康范围。维持健康体重通常有助于降低多种疾病风险。',
      adultOverweight: '超重会增加心血管疾病、高血压与 2 型糖尿病等风险。',
      adultObese: '肥胖与多种严重健康风险相关，包括心血管疾病、卒中、2 型糖尿病以及某些癌症。',
      note: '提示：BMI 是筛查工具，并不能直接诊断体脂或健康状况。肌肉量较高的人 BMI 可能偏高。建议结合更多指标并咨询专业人士。',
    },
    info: {
      title: '关于 BMI',
      intro: '体质指数（BMI）是用身高与体重计算的简单指标。公式：BMI = 体重(kg) / 身高(m)²。',
      adultCategoriesTitle: '成人 BMI 分类：',
      adultCategories: [
        { label: '偏瘦：', body: 'BMI < 18.5' },
        { label: '正常：', body: 'BMI 18.5–24.9' },
        { label: '超重：', body: 'BMI 25–29.9' },
        { label: '肥胖：', body: 'BMI ≥ 30' },
      ],
      youthTitle: '儿童与青少年（2–19 岁）：',
      youthIntro: 'BMI 计算方式相同，但解读不同。通常用“百分位”按年龄与性别进行比较：',
      youthCategories: [
        { label: '偏瘦：', body: '低于第 5 百分位' },
        { label: '健康体重：', body: '第 5–84 百分位' },
        { label: '超重：', body: '第 85–94 百分位' },
        { label: '肥胖：', body: '第 95 百分位及以上' },
      ],
      limitationsTitle: 'BMI 的局限：',
      limitationsBody:
        'BMI 是有用的筛查指标，但并不区分肌肉与脂肪，也不考虑年龄、性别、种族差异或脂肪分布等因素。运动员可能因肌肉量较高而 BMI 偏高。',
    },
    understanding: {
      title: '理解你的 BMI',
      intro: 'BMI 提供了体重与身高的简单数值关系，用于初步评估体重状态。',
      whyTitle: '为什么 BMI 重要',
      whyBody: '研究发现 BMI 与体脂及多种健康风险存在相关性。BMI 较高通常与以下风险增加有关：',
      whyList: [
        '心血管疾病与卒中',
        '2 型糖尿病',
        '高血压',
        '部分癌症',
        '睡眠呼吸暂停与呼吸问题',
        '骨关节炎',
      ],
      beyondTitle: '不要只看 BMI',
      beyondBody: 'BMI 并不能反映全部健康状况。还建议结合以下因素一起评估：',
      beyondList: [
        { label: '体成分：', body: '脂肪与肌肉的比例' },
        { label: '脂肪分布：', body: '腹部脂肪通常风险更高' },
        { label: '腰围：', body: '腹部脂肪的间接指标' },
        { label: '生活方式：', body: '饮食、运动、睡眠与压力' },
        { label: '家族史：', body: '遗传易感性' },
      ],
      outroPrefix: '如需更全面的评估，可结合使用 ',
      linkBodyFat: '体脂率计算器',
      outroMiddle: ' 或 ',
      linkAbsi: 'ABSI 计算器',
      outroSuffix: '，并咨询专业人士。',
    },
    faqs: [
      {
        question: '什么是健康的 BMI 范围？',
        answer:
          '成人常用的健康范围为 18.5–24.9（WHO）。低于 18.5 为偏瘦，25–29.9 为超重，≥30 为肥胖。BMI 是参考指标，不是诊断。',
      },
      {
        question: 'BMI 对所有人都准确吗？',
        answer:
          '不一定。BMI 可能会把肌肉量高的人误判为“偏高”，也无法反映脂肪分布。建议结合腰围、体脂率等指标。',
      },
      {
        question: '如何手动计算 BMI？',
        answer: 'BMI = 体重(kg) / 身高(m)²。英制： (体重(磅) / 身高(英寸)²) × 703。',
      },
      {
        question: 'BMI 正常也可能不健康吗？',
        answer:
          '可能。即使 BMI 正常，也可能存在内脏脂肪较高或肌肉量偏低等情况。腰围、体脂率与代谢指标能提供更多信息。',
      },
    ],
    relatedArticles: [],
    affiliate: {
      title: '推荐产品',
    },
  },
};

export function getBMICopy(locale: SupportedLocale): BMIPageCopy {
  return COPY[locale] ?? COPY.en;
}
