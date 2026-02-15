import 'server-only';

import type { SupportedLocale } from '@/i18n/config';

export type ConversionCategoryKey = 'weight' | 'height' | 'volume' | 'temperature' | 'energy';

export type ConversionCategoryConfig = {
  name: string;
  units: string[];
  labels: Record<string, string>;
};

export type ConversionsFAQ = {
  question: string;
  answer: string;
};

export type ConversionsRelatedArticle = {
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
};

export type ConversionsUnderstandingSection = {
  title: string;
  intro: string;
  items: Array<{ label: string; value: string }>;
  note?: string;
};

export type ConversionsPageCopy = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogAlt: string;
  title: string;
  description: string;
  shareTitle: string;
  shareDescription: string;
  shareHashtags: string[];
  structuredDataName: string;
  structuredDataDescription: string;
  faqTitle: string;
  newsletterTitle: string;
  newsletterDescription: string;
  ui: {
    conversionCategory: string;
    categoryConverterTitleTemplate: string; // "{category} Converter"
    valueLabel: string;
    valuePlaceholder: string;
    fromLabel: string;
    toLabel: string;
    swapUnitsTitle: string;
    convertButton: string;
    errorInvalidNumber: string;
    errorNonNegative: string;
    errorConversionFailed: string;
    resultLabel: string;
    quickReference: string;
  };
  categories: Record<ConversionCategoryKey, ConversionCategoryConfig>;
  understanding: ConversionsUnderstandingSection[];
  quickReferenceLines: {
    weight: string[];
    height: string[];
    temperature: string[];
  };
  faqs: ConversionsFAQ[];
  relatedArticles: ConversionsRelatedArticle[];
};

const CATEGORY_UNITS: Record<ConversionCategoryKey, string[]> = {
  weight: ['kg', 'lb', 'g', 'oz', 'stone'],
  height: ['cm', 'in', 'ft', 'm'],
  volume: ['ml', 'l', 'cup', 'tbsp', 'tsp', 'floz', 'gal'],
  temperature: ['c', 'f'],
  energy: ['kcal', 'kj'],
};

// Keep dates consistent across locales until blog posts are localized.
const ARTICLE_DATES = {
  tdee: 'February 20, 2025',
  bodyFat: 'February 10, 2025',
  deficit: 'February 25, 2025',
};

const COPY: Record<SupportedLocale, ConversionsPageCopy> = {
  en: {
    metaTitle: 'Unit Converter | Measurement Conversions | HealthCheck',
    metaDescription:
      'Convert weight, height, volume, temperature, and energy units quickly and accurately.',
    metaKeywords:
      'unit converter, measurement conversion, weight converter, height converter, metric to imperial, kg to lbs, cm to feet',
    ogAlt: 'Unit Converter',
    title: 'Measurement Conversions',
    description:
      'Convert between different units of measurement for weight, height, volume, and more',
    shareTitle: 'Measurement Conversions | Weight, Height, Volume & More',
    shareDescription:
      'Accurate unit converter for weight, height, volume, temperature, and energy. Perfect for health tracking, fitness planning, and nutrition calculations.',
    shareHashtags: ['conversions', 'measurements', 'health', 'fitness'],
    structuredDataName: 'Measurement Conversions Tool',
    structuredDataDescription:
      'Accurate unit converter for weight, height, volume, temperature, and energy. Perfect for health tracking, fitness planning, and nutrition calculations.',
    faqTitle: 'Frequently Asked Questions About Unit Conversions',
    newsletterTitle: 'Get Health & Fitness Tips',
    newsletterDescription:
      'Subscribe to receive the latest health calculators, conversion tools, fitness tips, and exclusive content to help you achieve your health goals.',
    ui: {
      conversionCategory: 'Conversion Category',
      categoryConverterTitleTemplate: '{category} Converter',
      valueLabel: 'Value',
      valuePlaceholder: 'Enter value',
      fromLabel: 'From',
      toLabel: 'To',
      swapUnitsTitle: 'Swap units',
      convertButton: 'Convert',
      errorInvalidNumber: 'Please enter a valid number',
      errorNonNegative: 'Please enter a value greater than or equal to 0',
      errorConversionFailed: 'Conversion failed',
      resultLabel: 'Result',
      quickReference: 'Quick Reference',
    },
    categories: {
      weight: {
        name: 'Weight / Mass',
        units: CATEGORY_UNITS.weight,
        labels: { kg: 'Kilograms', lb: 'Pounds', g: 'Grams', oz: 'Ounces', stone: 'Stones' },
      },
      height: {
        name: 'Height / Length',
        units: CATEGORY_UNITS.height,
        labels: { cm: 'Centimeters', in: 'Inches', ft: 'Feet', m: 'Meters' },
      },
      volume: {
        name: 'Volume',
        units: CATEGORY_UNITS.volume,
        labels: {
          ml: 'Milliliters',
          l: 'Liters',
          cup: 'Cups',
          tbsp: 'Tablespoons',
          tsp: 'Teaspoons',
          floz: 'Fluid Ounces',
          gal: 'Gallons',
        },
      },
      temperature: {
        name: 'Temperature',
        units: CATEGORY_UNITS.temperature,
        labels: { c: 'Celsius (°C)', f: 'Fahrenheit (°F)' },
      },
      energy: {
        name: 'Energy / Calories',
        units: CATEGORY_UNITS.energy,
        labels: { kcal: 'Kilocalories', kj: 'Kilojoules' },
      },
    },
    understanding: [
      {
        title: 'Weight Conversions',
        intro: 'Common weight conversions for health and fitness:',
        items: [
          { label: 'Kilograms to Pounds:', value: '1 kg = 2.20462 lb' },
          { label: 'Pounds to Kilograms:', value: '1 lb = 0.453592 kg' },
          { label: 'Stones to Kilograms:', value: '1 stone = 6.35029 kg' },
          { label: 'Grams to Ounces:', value: '1 g = 0.035274 oz' },
        ],
      },
      {
        title: 'Height and Length Conversions',
        intro: 'Common height and length conversions:',
        items: [
          { label: 'Centimeters to Inches:', value: '1 cm = 0.393701 in' },
          { label: 'Feet to Centimeters:', value: '1 ft = 30.48 cm' },
          { label: 'Meters to Feet:', value: '1 m = 3.28084 ft' },
        ],
      },
      {
        title: 'Volume Conversions',
        intro: 'Common volume conversions for cooking and nutrition:',
        items: [
          { label: 'Liters to Cups:', value: '1 L = 4.227 cups' },
          { label: 'Cups to Milliliters:', value: '1 cup = 236.588 ml' },
          { label: 'Tablespoons to Milliliters:', value: '1 tbsp = 14.787 ml' },
          { label: 'Teaspoons to Milliliters:', value: '1 tsp = 4.929 ml' },
        ],
      },
      {
        title: 'Temperature Conversions',
        intro: 'Temperature conversion formulas:',
        items: [
          { label: 'Celsius to Fahrenheit:', value: '°F = (°C × 9/5) + 32' },
          { label: 'Fahrenheit to Celsius:', value: '°C = (°F - 32) × 5/9' },
        ],
      },
      {
        title: 'Energy Conversions',
        intro: 'Energy conversion for nutrition:',
        items: [
          { label: 'Calories to Kilojoules:', value: '1 kcal = 4.184 kJ' },
          { label: 'Kilojoules to Calories:', value: '1 kJ = 0.239 kcal' },
        ],
        note: 'Note: In nutrition, "calorie" typically refers to kilocalorie (kcal).',
      },
    ],
    quickReferenceLines: {
      weight: ['1 kg = 2.205 lb = 35.274 oz', '1 stone = 14 lb = 6.350 kg'],
      height: ['1 ft = 12 in = 30.48 cm', '1 m = 3.281 ft = 100 cm'],
      temperature: [
        '0°C = 32°F (freezing)',
        '37°C = 98.6°F (body temp)',
        '100°C = 212°F (boiling)',
      ],
    },
    faqs: [
      {
        question: 'Why is it important to convert units accurately for health tracking?',
        answer:
          'Accurate unit conversions are critical for health and fitness tracking because small errors compound over time. For example, confusing pounds with kilograms in weight tracking could lead to misinterpreting weight loss progress. Inaccurate calorie conversions between kcal and kJ could result in under or overeating. When sharing health data with medical professionals, using the correct units ensures proper diagnosis and treatment. Our converter uses precise conversion factors (not rounded approximations) to maintain accuracy.',
      },
      {
        question: 'What is the difference between a calorie and a kilocalorie?',
        answer:
          'In nutrition, "calorie" (with lowercase c) typically refers to kilocalorie (kcal), also written as Calorie with uppercase C. 1 kilocalorie = 1,000 small calories (cal). This can be confusing because food labels might say "calories" but actually mean kilocalories. For example, a food labeled "200 calories" contains 200 kcal or 200,000 small calories. In scientific contexts, energy is often measured in kilojoules (kJ), where 1 kcal = 4.184 kJ. Most nutrition databases use kcal.',
      },
      {
        question: 'How do I convert my height from feet and inches to centimeters?',
        answer:
          'To convert height from feet and inches to centimeters: 1) Convert feet to inches (multiply feet by 12), 2) Add remaining inches, 3) Multiply total inches by 2.54 to get centimeters. For example, 5 feet 9 inches = (5 × 12) + 9 = 69 inches = 69 × 2.54 = 175.26 cm. Our converter handles this automatically. Note: Many health calculators require height in centimeters (metric) or total inches (imperial), not feet alone.',
      },
      {
        question: 'Which weight unit system should I use for fitness tracking?',
        answer:
          "Use whichever system you're most familiar with, but be consistent. Metric (kg) is used internationally and in scientific contexts, with finer precision for small changes (0.1 kg = 0.22 lb). Imperial (lb) is common in the US and UK. Stones are primarily British. For detailed tracking, kilograms are often preferred because 0.1 kg increments are easier to track than 0.2 lb increments. What matters most is consistency - don't switch systems mid-tracking, as this introduces conversion errors and makes trends harder to spot.",
      },
      {
        question: 'Are the conversion factors in this tool accurate enough for medical use?',
        answer:
          'Yes, our conversion factors use standard international definitions with high precision (4+ decimal places). For example: 1 kg = 2.20462 lb (not 2.2), 1 in = 2.54 cm (exact), 1 kcal = 4.184 kJ (thermochemical). These are suitable for health tracking, nutrition planning, and medical contexts. However, for clinical research or pharmaceutical applications requiring extreme precision, consult official NIST or BIPM standards. For everyday health and fitness use, these conversions are more than adequate.',
      },
    ],
    relatedArticles: [
      {
        title: 'TDEE Explained: How Many Calories Do You Really Need?',
        description:
          "Understand the components of Total Daily Energy Expenditure (TDEE), how it's calculated, and why knowing your TDEE is crucial for effective weight management.",
        slug: 'tdee-explained',
        date: ARTICLE_DATES.tdee,
        readTime: '10 min read',
        category: 'Energy Expenditure',
      },
      {
        title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
        description:
          'Learn what body fat percentage ranges are healthy for men and women, how body composition differs from BMI, and why it matters for your health goals.',
        slug: 'understanding-body-fat-percentage',
        date: ARTICLE_DATES.bodyFat,
        readTime: '9 min read',
        category: 'Body Composition',
      },
      {
        title: '5 Myths About Calorie Deficits Debunked',
        description:
          "Discover the truth behind common misconceptions about calorie deficits, weight loss, and metabolism. Learn why weight loss isn't always linear and how to set realistic expectations.",
        slug: 'calorie-deficit-myths',
        date: ARTICLE_DATES.deficit,
        readTime: '8 min read',
        category: 'Weight Management',
      },
    ],
  },
  es: {
    metaTitle: 'Conversor de unidades | Conversiones de medidas | HealthCheck',
    metaDescription:
      'Convierte unidades de peso, altura, volumen, temperatura y energía de forma rápida y precisa.',
    metaKeywords:
      'conversor de unidades, conversión de medidas, conversor de peso, conversor de altura, métrico a imperial, kg a lb, cm a pies',
    ogAlt: 'Conversor de unidades',
    title: 'Conversiones de medidas',
    description: 'Convierte entre distintas unidades de medida para peso, altura, volumen y más',
    shareTitle: 'Conversiones de medidas | Peso, altura, volumen y más',
    shareDescription:
      'Conversor de unidades preciso para peso, altura, volumen, temperatura y energía. Ideal para seguimiento de salud, planificación fitness y cálculos de nutrición.',
    shareHashtags: ['conversions', 'measurements', 'health', 'fitness'],
    structuredDataName: 'Herramienta de conversiones de medidas',
    structuredDataDescription:
      'Conversor de unidades preciso para peso, altura, volumen, temperatura y energía. Ideal para seguimiento de salud, planificación fitness y cálculos de nutrición.',
    faqTitle: 'Preguntas frecuentes sobre conversiones de unidades',
    newsletterTitle: 'Recibe consejos de salud y fitness',
    newsletterDescription:
      'Suscríbete para recibir las últimas calculadoras de salud, herramientas de conversión, consejos fitness y contenido exclusivo para ayudarte a lograr tus objetivos.',
    ui: {
      conversionCategory: 'Categoría de conversión',
      categoryConverterTitleTemplate: 'Convertidor de {category}',
      valueLabel: 'Valor',
      valuePlaceholder: 'Introduce un valor',
      fromLabel: 'De',
      toLabel: 'A',
      swapUnitsTitle: 'Intercambiar unidades',
      convertButton: 'Convertir',
      errorInvalidNumber: 'Introduce un número válido',
      errorNonNegative: 'Introduce un valor mayor o igual a 0',
      errorConversionFailed: 'La conversión falló',
      resultLabel: 'Resultado',
      quickReference: 'Referencia rápida',
    },
    categories: {
      weight: {
        name: 'Peso / masa',
        units: CATEGORY_UNITS.weight,
        labels: {
          kg: 'Kilogramos',
          lb: 'Libras',
          g: 'Gramos',
          oz: 'Onzas',
          stone: 'Stones (st)',
        },
      },
      height: {
        name: 'Altura / longitud',
        units: CATEGORY_UNITS.height,
        labels: { cm: 'Centímetros', in: 'Pulgadas', ft: 'Pies', m: 'Metros' },
      },
      volume: {
        name: 'Volumen',
        units: CATEGORY_UNITS.volume,
        labels: {
          ml: 'Mililitros',
          l: 'Litros',
          cup: 'Tazas',
          tbsp: 'Cucharadas',
          tsp: 'Cucharaditas',
          floz: 'Onzas líquidas',
          gal: 'Galones',
        },
      },
      temperature: {
        name: 'Temperatura',
        units: CATEGORY_UNITS.temperature,
        labels: { c: 'Celsius (°C)', f: 'Fahrenheit (°F)' },
      },
      energy: {
        name: 'Energía / calorías',
        units: CATEGORY_UNITS.energy,
        labels: { kcal: 'Kilocalorías', kj: 'Kilojulios' },
      },
    },
    understanding: [
      {
        title: 'Conversiones de peso',
        intro: 'Conversiones comunes de peso para salud y fitness:',
        items: [
          { label: 'Kilogramos a libras:', value: '1 kg = 2.20462 lb' },
          { label: 'Libras a kilogramos:', value: '1 lb = 0.453592 kg' },
          { label: 'Stones a kilogramos:', value: '1 stone = 6.35029 kg' },
          { label: 'Gramos a onzas:', value: '1 g = 0.035274 oz' },
        ],
      },
      {
        title: 'Conversiones de altura y longitud',
        intro: 'Conversiones comunes de altura y longitud:',
        items: [
          { label: 'Centímetros a pulgadas:', value: '1 cm = 0.393701 in' },
          { label: 'Pies a centímetros:', value: '1 ft = 30.48 cm' },
          { label: 'Metros a pies:', value: '1 m = 3.28084 ft' },
        ],
      },
      {
        title: 'Conversiones de volumen',
        intro: 'Conversiones comunes de volumen para cocina y nutrición:',
        items: [
          { label: 'Litros a tazas:', value: '1 L = 4.227 cups' },
          { label: 'Tazas a mililitros:', value: '1 cup = 236.588 ml' },
          { label: 'Cucharadas a mililitros:', value: '1 tbsp = 14.787 ml' },
          { label: 'Cucharaditas a mililitros:', value: '1 tsp = 4.929 ml' },
        ],
      },
      {
        title: 'Conversiones de temperatura',
        intro: 'Fórmulas de conversión de temperatura:',
        items: [
          { label: 'Celsius a Fahrenheit:', value: '°F = (°C × 9/5) + 32' },
          { label: 'Fahrenheit a Celsius:', value: '°C = (°F - 32) × 5/9' },
        ],
      },
      {
        title: 'Conversiones de energía',
        intro: 'Conversión de energía para nutrición:',
        items: [
          { label: 'Calorías a kilojulios:', value: '1 kcal = 4.184 kJ' },
          { label: 'Kilojulios a calorías:', value: '1 kJ = 0.239 kcal' },
        ],
        note: 'Nota: En nutrición, "caloría" suele referirse a kilocaloría (kcal).',
      },
    ],
    quickReferenceLines: {
      weight: ['1 kg = 2.205 lb = 35.274 oz', '1 stone = 14 lb = 6.350 kg'],
      height: ['1 ft = 12 in = 30.48 cm', '1 m = 3.281 ft = 100 cm'],
      temperature: [
        '0°C = 32°F (congelación)',
        '37°C = 98.6°F (temperatura corporal)',
        '100°C = 212°F (ebullición)',
      ],
    },
    faqs: [
      {
        question:
          '¿Por qué es importante convertir unidades con precisión para el seguimiento de la salud?',
        answer:
          'Las conversiones precisas son clave para el seguimiento de la salud y el fitness, porque pequeños errores se acumulan con el tiempo. Por ejemplo, confundir libras con kilogramos al registrar el peso puede llevar a interpretar mal el progreso de pérdida de peso. Una conversión incorrecta entre kcal y kJ puede resultar en comer de menos o de más. Al compartir datos con profesionales sanitarios, usar las unidades correctas ayuda a un diagnóstico y tratamiento adecuados. Nuestro conversor utiliza factores de conversión precisos (no aproximaciones redondeadas) para mantener la exactitud.',
      },
      {
        question: '¿Cuál es la diferencia entre una caloría y una kilocaloría?',
        answer:
          'En nutrición, "caloría" suele referirse a kilocaloría (kcal), también escrita como Calorie con C mayúscula. 1 kilocaloría = 1,000 calorías pequeñas (cal). Esto puede confundir porque las etiquetas pueden decir "calorías" pero en realidad se refieren a kilocalorías. Por ejemplo, un alimento con "200 calorías" contiene 200 kcal o 200,000 calorías pequeñas. En contextos científicos, la energía se mide a menudo en kilojulios (kJ), donde 1 kcal = 4.184 kJ. La mayoría de bases de datos de nutrición usan kcal.',
      },
      {
        question: '¿Cómo convierto mi altura de pies y pulgadas a centímetros?',
        answer:
          'Para convertir la altura de pies y pulgadas a centímetros: 1) Convierte los pies a pulgadas (multiplica los pies por 12), 2) Suma las pulgadas restantes, 3) Multiplica el total de pulgadas por 2.54 para obtener centímetros. Por ejemplo, 5 pies 9 pulgadas = (5 × 12) + 9 = 69 pulgadas = 69 × 2.54 = 175.26 cm. Nuestro conversor lo hace automáticamente. Nota: Muchas calculadoras de salud requieren la altura en centímetros (métrico) o pulgadas totales (imperial), no solo en pies.',
      },
      {
        question: '¿Qué sistema de unidades de peso debería usar para el seguimiento del fitness?',
        answer:
          'Usa el sistema que te resulte más familiar, pero sé consistente. El sistema métrico (kg) se usa internacionalmente y en contextos científicos, con más precisión para cambios pequeños (0.1 kg = 0.22 lb). El sistema imperial (lb) es común en EE. UU. y Reino Unido. Los stones se usan principalmente en el Reino Unido. Para un seguimiento detallado, suele preferirse el kilogramo porque los incrementos de 0.1 kg son más fáciles de registrar que los de 0.2 lb. Lo más importante es la consistencia: no cambies de sistema a mitad del seguimiento, ya que introduces errores de conversión y hace más difícil ver tendencias.',
      },
      {
        question:
          '¿Los factores de conversión de esta herramienta son lo suficientemente precisos para uso médico?',
        answer:
          'Sí. Nuestros factores de conversión usan definiciones internacionales estándar con alta precisión (4+ decimales). Por ejemplo: 1 kg = 2.20462 lb (no 2.2), 1 in = 2.54 cm (exacto), 1 kcal = 4.184 kJ (termoquímico). Son adecuados para seguimiento de salud, planificación nutricional y contextos médicos. Sin embargo, para investigación clínica o aplicaciones farmacéuticas que requieren precisión extrema, consulta estándares oficiales de NIST o BIPM. Para el uso diario en salud y fitness, estas conversiones son más que suficientes.',
      },
    ],
    relatedArticles: [
      {
        title: 'TDEE explicado: ¿cuántas calorías necesitas realmente?',
        description:
          'Comprende los componentes del gasto energético diario total (TDEE), cómo se calcula y por qué es clave para un control de peso efectivo.',
        slug: 'tdee-explained',
        date: ARTICLE_DATES.tdee,
        readTime: '10 min de lectura',
        category: 'Gasto energético',
      },
      {
        title: 'Entender el porcentaje de grasa corporal: qué significan tus números',
        description:
          'Aprende qué rangos de grasa corporal son saludables, en qué se diferencia la composición corporal del IMC y por qué importa para tus objetivos.',
        slug: 'understanding-body-fat-percentage',
        date: ARTICLE_DATES.bodyFat,
        readTime: '9 min de lectura',
        category: 'Composición corporal',
      },
      {
        title: '5 mitos sobre el déficit calórico, desmentidos',
        description:
          'Descubre la verdad detrás de ideas comunes sobre déficit calórico, pérdida de peso y metabolismo. Aprende por qué el progreso no siempre es lineal.',
        slug: 'calorie-deficit-myths',
        date: ARTICLE_DATES.deficit,
        readTime: '8 min de lectura',
        category: 'Control de peso',
      },
    ],
  },
  fr: {
    metaTitle: "Convertisseur d'unités | Conversions de mesures | HealthCheck",
    metaDescription:
      'Convertissez rapidement et précisément des unités de poids, taille, volume, température et énergie.',
    metaKeywords:
      "convertisseur d'unités, conversion de mesures, convertisseur de poids, convertisseur de taille, métrique vers impérial, kg en lb, cm en pieds",
    ogAlt: "Convertisseur d'unités",
    title: 'Conversions de mesures',
    description:
      'Convertissez entre différentes unités de mesure pour le poids, la taille, le volume et plus',
    shareTitle: 'Conversions de mesures | Poids, taille, volume et plus',
    shareDescription:
      "Convertisseur d'unités précis pour le poids, la taille, le volume, la température et l'énergie. Idéal pour le suivi santé, la planification fitness et la nutrition.",
    shareHashtags: ['conversions', 'measurements', 'health', 'fitness'],
    structuredDataName: 'Outil de conversion de mesures',
    structuredDataDescription:
      "Convertisseur d'unités précis pour le poids, la taille, le volume, la température et l'énergie. Idéal pour le suivi santé, la planification fitness et la nutrition.",
    faqTitle: "Questions fréquentes sur les conversions d'unités",
    newsletterTitle: 'Recevez des conseils santé et fitness',
    newsletterDescription:
      'Abonnez-vous pour recevoir les dernières calculatrices santé, des outils de conversion, des conseils fitness et du contenu exclusif pour atteindre vos objectifs.',
    ui: {
      conversionCategory: 'Catégorie de conversion',
      categoryConverterTitleTemplate: 'Convertisseur de {category}',
      valueLabel: 'Valeur',
      valuePlaceholder: 'Saisissez une valeur',
      fromLabel: 'De',
      toLabel: 'À',
      swapUnitsTitle: 'Inverser les unités',
      convertButton: 'Convertir',
      errorInvalidNumber: 'Veuillez saisir un nombre valide',
      errorNonNegative: 'Veuillez saisir une valeur supérieure ou égale à 0',
      errorConversionFailed: 'La conversion a échoué',
      resultLabel: 'Résultat',
      quickReference: 'Référence rapide',
    },
    categories: {
      weight: {
        name: 'Poids / masse',
        units: CATEGORY_UNITS.weight,
        labels: {
          kg: 'Kilogrammes',
          lb: 'Livres',
          g: 'Grammes',
          oz: 'Onces',
          stone: 'Stones (st)',
        },
      },
      height: {
        name: 'Taille / longueur',
        units: CATEGORY_UNITS.height,
        labels: { cm: 'Centimètres', in: 'Pouces', ft: 'Pieds', m: 'Mètres' },
      },
      volume: {
        name: 'Volume',
        units: CATEGORY_UNITS.volume,
        labels: {
          ml: 'Millilitres',
          l: 'Litres',
          cup: 'Tasses',
          tbsp: 'Cuillères à soupe',
          tsp: 'Cuillères à café',
          floz: 'Onces liquides',
          gal: 'Gallons',
        },
      },
      temperature: {
        name: 'Température',
        units: CATEGORY_UNITS.temperature,
        labels: { c: 'Celsius (°C)', f: 'Fahrenheit (°F)' },
      },
      energy: {
        name: 'Énergie / calories',
        units: CATEGORY_UNITS.energy,
        labels: { kcal: 'Kilocalories', kj: 'Kilojoules' },
      },
    },
    understanding: [
      {
        title: 'Conversions de poids',
        intro: 'Conversions de poids courantes pour la santé et le fitness :',
        items: [
          { label: 'Kilogrammes en livres :', value: '1 kg = 2.20462 lb' },
          { label: 'Livres en kilogrammes :', value: '1 lb = 0.453592 kg' },
          { label: 'Stones en kilogrammes :', value: '1 stone = 6.35029 kg' },
          { label: 'Grammes en onces :', value: '1 g = 0.035274 oz' },
        ],
      },
      {
        title: 'Conversions de taille et de longueur',
        intro: 'Conversions courantes de taille et de longueur :',
        items: [
          { label: 'Centimètres en pouces :', value: '1 cm = 0.393701 in' },
          { label: 'Pieds en centimètres :', value: '1 ft = 30.48 cm' },
          { label: 'Mètres en pieds :', value: '1 m = 3.28084 ft' },
        ],
      },
      {
        title: 'Conversions de volume',
        intro: 'Conversions de volume courantes pour la cuisine et la nutrition :',
        items: [
          { label: 'Litres en tasses :', value: '1 L = 4.227 cups' },
          { label: 'Tasses en millilitres :', value: '1 cup = 236.588 ml' },
          { label: 'Cuillères à soupe en millilitres :', value: '1 tbsp = 14.787 ml' },
          { label: 'Cuillères à café en millilitres :', value: '1 tsp = 4.929 ml' },
        ],
      },
      {
        title: 'Conversions de température',
        intro: 'Formules de conversion de température :',
        items: [
          { label: 'Celsius en Fahrenheit :', value: '°F = (°C × 9/5) + 32' },
          { label: 'Fahrenheit en Celsius :', value: '°C = (°F - 32) × 5/9' },
        ],
      },
      {
        title: "Conversions d'énergie",
        intro: "Conversion d'énergie en nutrition :",
        items: [
          { label: 'Calories en kilojoules :', value: '1 kcal = 4.184 kJ' },
          { label: 'Kilojoules en calories :', value: '1 kJ = 0.239 kcal' },
        ],
        note: 'Note : en nutrition, "calorie" désigne généralement la kilocalorie (kcal).',
      },
    ],
    quickReferenceLines: {
      weight: ['1 kg = 2.205 lb = 35.274 oz', '1 stone = 14 lb = 6.350 kg'],
      height: ['1 ft = 12 in = 30.48 cm', '1 m = 3.281 ft = 100 cm'],
      temperature: [
        '0°C = 32°F (gel)',
        '37°C = 98.6°F (temp. corporelle)',
        '100°C = 212°F (ébullition)',
      ],
    },
    faqs: [
      {
        question:
          'Pourquoi est-il important de convertir correctement les unités pour le suivi de la santé ?',
        answer:
          "Des conversions d'unités précises sont essentielles pour le suivi santé et fitness, car de petites erreurs s'additionnent avec le temps. Par exemple, confondre livres et kilogrammes lors du suivi du poids peut fausser l'interprétation de votre progression. Une conversion imprécise entre kcal et kJ peut conduire à manger trop ou pas assez. Et lorsque vous partagez des données avec des professionnels de santé, utiliser les bonnes unités facilite un diagnostic et une prise en charge appropriés. Notre convertisseur utilise des facteurs de conversion précis (pas des approximations arrondies) pour préserver l'exactitude.",
      },
      {
        question: 'Quelle est la différence entre une calorie et une kilocalorie ?',
        answer:
          'En nutrition, "calorie" désigne le plus souvent la kilocalorie (kcal), parfois écrite Calorie avec un C majuscule. 1 kilocalorie = 1,000 petites calories (cal). Cela peut prêter à confusion, car les étiquettes indiquent souvent "calories" alors qu’elles parlent de kilocalories. Par exemple, un produit affiché "200 calories" contient 200 kcal, soit 200,000 petites calories. Dans les contextes scientifiques, l’énergie est souvent exprimée en kilojoules (kJ), où 1 kcal = 4.184 kJ. La plupart des bases de données nutritionnelles utilisent les kcal.',
      },
      {
        question: 'Comment convertir ma taille de pieds et pouces en centimètres ?',
        answer:
          'Pour convertir une taille en pieds et pouces en centimètres : 1) Convertissez les pieds en pouces (pieds × 12), 2) Ajoutez les pouces restants, 3) Multipliez le total de pouces par 2.54 pour obtenir des centimètres. Exemple : 5 pieds 9 pouces = (5 × 12) + 9 = 69 pouces = 69 × 2.54 = 175.26 cm. Notre convertisseur le fait automatiquement. Remarque : beaucoup de calculateurs nécessitent une taille en centimètres (métrique) ou en pouces totaux (impérial), pas seulement en pieds.',
      },
      {
        question: 'Quel système de poids devrais-je utiliser pour le suivi fitness ?',
        answer:
          'Utilisez le système que vous connaissez le mieux, mais restez cohérent. Le système métrique (kg) est utilisé internationalement et en contexte scientifique, avec une meilleure précision pour de petits changements (0.1 kg = 0.22 lb). Le système impérial (lb) est courant aux États-Unis et au Royaume-Uni. Les stones sont surtout britanniques. Pour un suivi détaillé, les kilogrammes sont souvent préférés car des incréments de 0.1 kg sont plus simples à suivre que 0.2 lb. Le plus important est la cohérence : évitez de changer de système en cours de suivi, car cela introduit des erreurs et rend les tendances plus difficiles à repérer.',
      },
      {
        question:
          'Les facteurs de conversion de cet outil sont-ils assez précis pour un usage médical ?',
        answer:
          'Oui. Nos facteurs de conversion utilisent des définitions internationales standard avec une grande précision (4+ décimales). Par exemple : 1 kg = 2.20462 lb (pas 2.2), 1 in = 2.54 cm (exact), 1 kcal = 4.184 kJ (thermochimique). C’est adapté au suivi santé, à la planification nutritionnelle et à des contextes médicaux. Toutefois, pour la recherche clinique ou des applications pharmaceutiques exigeant une précision extrême, référez-vous aux standards officiels NIST ou BIPM. Pour un usage quotidien, ces conversions sont largement suffisantes.',
      },
    ],
    relatedArticles: [
      {
        title: 'TDEE expliqué : de combien de calories avez-vous vraiment besoin ?',
        description:
          'Comprenez les composantes du Total Daily Energy Expenditure (TDEE), son calcul, et pourquoi le connaître est essentiel pour gérer son poids.',
        slug: 'tdee-explained',
        date: ARTICLE_DATES.tdee,
        readTime: '10 min de lecture',
        category: 'Dépense énergétique',
      },
      {
        title: 'Comprendre le pourcentage de masse grasse : que signifient vos chiffres',
        description:
          "Découvrez les plages saines de masse grasse, la différence avec l'IMC et pourquoi la composition corporelle compte pour vos objectifs.",
        slug: 'understanding-body-fat-percentage',
        date: ARTICLE_DATES.bodyFat,
        readTime: '9 min de lecture',
        category: 'Composition corporelle',
      },
      {
        title: '5 mythes sur le déficit calorique démystifiés',
        description:
          "Découvrez la vérité sur des idées reçues concernant le déficit calorique, la perte de poids et le métabolisme. Apprenez pourquoi la perte de poids n'est pas toujours linéaire.",
        slug: 'calorie-deficit-myths',
        date: ARTICLE_DATES.deficit,
        readTime: '8 min de lecture',
        category: 'Gestion du poids',
      },
    ],
  },
  de: {
    metaTitle: 'Einheitenumrechner | Maßumrechnungen | HealthCheck',
    metaDescription:
      'Wandeln Sie Einheiten für Gewicht, Größe, Volumen, Temperatur und Energie schnell und präzise um.',
    metaKeywords:
      'einheitenumrechner, maßumrechnung, gewicht umrechnen, größe umrechnen, metrisch zu imperial, kg in lb, cm in fuß',
    ogAlt: 'Einheitenumrechner',
    title: 'Maßumrechnungen',
    description:
      'Rechnen Sie zwischen verschiedenen Maßeinheiten für Gewicht, Größe, Volumen und mehr um',
    shareTitle: 'Maßumrechnungen | Gewicht, Größe, Volumen und mehr',
    shareDescription:
      'Präziser Einheitenumrechner für Gewicht, Größe, Volumen, Temperatur und Energie. Ideal für Gesundheits-Tracking, Fitnessplanung und Ernährung.',
    shareHashtags: ['conversions', 'measurements', 'health', 'fitness'],
    structuredDataName: 'Tool für Maßumrechnungen',
    structuredDataDescription:
      'Präziser Einheitenumrechner für Gewicht, Größe, Volumen, Temperatur und Energie. Ideal für Gesundheits-Tracking, Fitnessplanung und Ernährung.',
    faqTitle: 'Häufige Fragen zu Einheitenumrechnungen',
    newsletterTitle: 'Erhalten Sie Gesundheits- und Fitness-Tipps',
    newsletterDescription:
      'Abonnieren Sie unseren Newsletter mit neuen Gesundheitsrechnern, Umrechnungstools, Fitness-Tipps und exklusiven Inhalten für Ihre Ziele.',
    ui: {
      conversionCategory: 'Umrechnungskategorie',
      categoryConverterTitleTemplate: 'Umrechner für {category}',
      valueLabel: 'Wert',
      valuePlaceholder: 'Wert eingeben',
      fromLabel: 'Von',
      toLabel: 'Nach',
      swapUnitsTitle: 'Einheiten tauschen',
      convertButton: 'Umrechnen',
      errorInvalidNumber: 'Bitte geben Sie eine gültige Zahl ein',
      errorNonNegative: 'Bitte geben Sie einen Wert größer oder gleich 0 ein',
      errorConversionFailed: 'Umrechnung fehlgeschlagen',
      resultLabel: 'Ergebnis',
      quickReference: 'Schnellreferenz',
    },
    categories: {
      weight: {
        name: 'Gewicht / Masse',
        units: CATEGORY_UNITS.weight,
        labels: { kg: 'Kilogramm', lb: 'Pfund', g: 'Gramm', oz: 'Unzen', stone: 'Stone (st)' },
      },
      height: {
        name: 'Größe / Länge',
        units: CATEGORY_UNITS.height,
        labels: { cm: 'Zentimeter', in: 'Zoll', ft: 'Fuß', m: 'Meter' },
      },
      volume: {
        name: 'Volumen',
        units: CATEGORY_UNITS.volume,
        labels: {
          ml: 'Milliliter',
          l: 'Liter',
          cup: 'Tassen',
          tbsp: 'Esslöffel',
          tsp: 'Teelöffel',
          floz: 'Flüssigunzen',
          gal: 'Gallonen',
        },
      },
      temperature: {
        name: 'Temperatur',
        units: CATEGORY_UNITS.temperature,
        labels: { c: 'Celsius (°C)', f: 'Fahrenheit (°F)' },
      },
      energy: {
        name: 'Energie / Kalorien',
        units: CATEGORY_UNITS.energy,
        labels: { kcal: 'Kilokalorien', kj: 'Kilojoule' },
      },
    },
    understanding: [
      {
        title: 'Gewicht umrechnen',
        intro: 'Häufige Gewichts-Umrechnungen für Gesundheit und Fitness:',
        items: [
          { label: 'Kilogramm in Pfund:', value: '1 kg = 2.20462 lb' },
          { label: 'Pfund in Kilogramm:', value: '1 lb = 0.453592 kg' },
          { label: 'Stone in Kilogramm:', value: '1 stone = 6.35029 kg' },
          { label: 'Gramm in Unzen:', value: '1 g = 0.035274 oz' },
        ],
      },
      {
        title: 'Größe und Länge umrechnen',
        intro: 'Häufige Umrechnungen für Größe und Länge:',
        items: [
          { label: 'Zentimeter in Zoll:', value: '1 cm = 0.393701 in' },
          { label: 'Fuß in Zentimeter:', value: '1 ft = 30.48 cm' },
          { label: 'Meter in Fuß:', value: '1 m = 3.28084 ft' },
        ],
      },
      {
        title: 'Volumen umrechnen',
        intro: 'Häufige Volumen-Umrechnungen für Kochen und Ernährung:',
        items: [
          { label: 'Liter in Tassen:', value: '1 L = 4.227 cups' },
          { label: 'Tassen in Milliliter:', value: '1 cup = 236.588 ml' },
          { label: 'Esslöffel in Milliliter:', value: '1 tbsp = 14.787 ml' },
          { label: 'Teelöffel in Milliliter:', value: '1 tsp = 4.929 ml' },
        ],
      },
      {
        title: 'Temperatur umrechnen',
        intro: 'Formeln zur Temperatur-Umrechnung:',
        items: [
          { label: 'Celsius in Fahrenheit:', value: '°F = (°C × 9/5) + 32' },
          { label: 'Fahrenheit in Celsius:', value: '°C = (°F - 32) × 5/9' },
        ],
      },
      {
        title: 'Energie umrechnen',
        intro: 'Energie-Umrechnung in der Ernährung:',
        items: [
          { label: 'Kalorien in Kilojoule:', value: '1 kcal = 4.184 kJ' },
          { label: 'Kilojoule in Kalorien:', value: '1 kJ = 0.239 kcal' },
        ],
        note: 'Hinweis: In der Ernährung meint "calorie" meist Kilokalorie (kcal).',
      },
    ],
    quickReferenceLines: {
      weight: ['1 kg = 2.205 lb = 35.274 oz', '1 stone = 14 lb = 6.350 kg'],
      height: ['1 ft = 12 in = 30.48 cm', '1 m = 3.281 ft = 100 cm'],
      temperature: [
        '0°C = 32°F (Gefrierpunkt)',
        '37°C = 98.6°F (Körpertemperatur)',
        '100°C = 212°F (Siedepunkt)',
      ],
    },
    faqs: [
      {
        question: 'Warum ist es wichtig, Einheiten beim Gesundheits-Tracking korrekt umzurechnen?',
        answer:
          'Genaue Umrechnungen sind wichtig für Gesundheits- und Fitness-Tracking, weil sich kleine Fehler mit der Zeit summieren. Wenn Sie zum Beispiel beim Gewicht Pfund mit Kilogramm verwechseln, können Sie Ihren Fortschritt falsch einschätzen. Ungenaue Umrechnungen zwischen kcal und kJ können dazu führen, dass Sie zu wenig oder zu viel essen. Und beim Teilen von Daten mit medizinischem Fachpersonal sorgen korrekte Einheiten für bessere Verständlichkeit. Unser Umrechner verwendet präzise Umrechnungsfaktoren (keine groben Rundungen), um die Genauigkeit zu erhalten.',
      },
      {
        question: 'Was ist der Unterschied zwischen einer Kalorie und einer Kilokalorie?',
        answer:
          'In der Ernährung meint "calorie" meist die Kilokalorie (kcal), manchmal auch als Calorie mit großem C geschrieben. 1 Kilokalorie = 1,000 kleine Kalorien (cal). Das ist verwirrend, weil auf Lebensmitteletiketten oft "Kalorien" steht, aber Kilokalorien gemeint sind. Ein Produkt mit "200 calories" enthält 200 kcal bzw. 200,000 kleine Kalorien. In wissenschaftlichen Kontexten wird Energie häufig in Kilojoule (kJ) angegeben, wobei 1 kcal = 4.184 kJ. Die meisten Ernährungsdatenbanken verwenden kcal.',
      },
      {
        question: 'Wie rechne ich meine Größe von Fuß und Zoll in Zentimeter um?',
        answer:
          'So rechnen Sie Fuß und Zoll in Zentimeter um: 1) Fuß in Zoll umrechnen (Fuß × 12), 2) die restlichen Zoll addieren, 3) die Gesamtzahl Zoll mit 2.54 multiplizieren. Beispiel: 5 Fuß 9 Zoll = (5 × 12) + 9 = 69 Zoll = 69 × 2.54 = 175.26 cm. Unser Umrechner erledigt das automatisch. Hinweis: Viele Gesundheitsrechner benötigen die Größe in Zentimetern (metrisch) oder Gesamtzoll (imperial), nicht nur Fuß.',
      },
      {
        question: 'Welches Gewichtssystem sollte ich fürs Fitness-Tracking verwenden?',
        answer:
          'Verwenden Sie das System, mit dem Sie am besten vertraut sind, bleiben Sie aber konsequent. Metrisch (kg) wird international und wissenschaftlich genutzt und erlaubt feinere Schritte (0.1 kg = 0.22 lb). Imperial (lb) ist in den USA und im Vereinigten Königreich verbreitet. Stone werden vor allem in Großbritannien verwendet. Für detailliertes Tracking sind Kilogramm oft praktischer, weil 0.1-kg-Schritte leichter zu verfolgen sind als 0.2-lb-Schritte. Entscheidend ist Konsistenz: Wechseln Sie das System nicht während des Trackings, da das Umrechnungsfehler erzeugt und Trends schwerer erkennbar macht.',
      },
      {
        question:
          'Sind die Umrechnungsfaktoren in diesem Tool genau genug für medizinische Zwecke?',
        answer:
          'Ja. Unsere Umrechnungsfaktoren basieren auf internationalen Standarddefinitionen mit hoher Präzision (4+ Dezimalstellen). Beispiele: 1 kg = 2.20462 lb (nicht 2.2), 1 in = 2.54 cm (exakt), 1 kcal = 4.184 kJ (thermochemisch). Das ist für Gesundheits-Tracking, Ernährungsplanung und viele medizinische Kontexte geeignet. Für klinische Forschung oder pharmazeutische Anwendungen mit extremen Genauigkeitsanforderungen sollten Sie offizielle NIST- oder BIPM-Standards konsultieren. Für den Alltag sind diese Umrechnungen mehr als ausreichend.',
      },
    ],
    relatedArticles: [
      {
        title: 'TDEE erklärt: Wie viele Kalorien brauchst du wirklich?',
        description:
          'Verstehe die Bestandteile des Total Daily Energy Expenditure (TDEE), wie er berechnet wird und warum er für Gewichtsmanagement wichtig ist.',
        slug: 'tdee-explained',
        date: ARTICLE_DATES.tdee,
        readTime: '10 Min. Lesezeit',
        category: 'Energieverbrauch',
      },
      {
        title: 'Körperfettanteil verstehen: Was bedeuten deine Werte?',
        description:
          'Lerne, welche Körperfettbereiche als gesund gelten, wie sich Körperzusammensetzung von BMI unterscheidet und warum das wichtig ist.',
        slug: 'understanding-body-fat-percentage',
        date: ARTICLE_DATES.bodyFat,
        readTime: '9 Min. Lesezeit',
        category: 'Körperzusammensetzung',
      },
      {
        title: '5 Mythen über Kaloriendefizite, entlarvt',
        description:
          'Entdecke die Wahrheit hinter häufigen Missverständnissen zu Kaloriendefiziten, Abnehmen und Stoffwechsel. Warum Fortschritt nicht immer linear ist.',
        slug: 'calorie-deficit-myths',
        date: ARTICLE_DATES.deficit,
        readTime: '8 Min. Lesezeit',
        category: 'Gewichtsmanagement',
      },
    ],
  },
  pt: {
    metaTitle: 'Conversor de unidades | Conversões de medidas | HealthCheck',
    metaDescription:
      'Converta unidades de peso, altura, volume, temperatura e energia de forma rápida e precisa.',
    metaKeywords:
      'conversor de unidades, conversão de medidas, conversor de peso, conversor de altura, métrico para imperial, kg para lb, cm para pés',
    ogAlt: 'Conversor de unidades',
    title: 'Conversões de medidas',
    description:
      'Converta entre diferentes unidades de medida para peso, altura, volume e muito mais',
    shareTitle: 'Conversões de medidas | Peso, altura, volume e mais',
    shareDescription:
      'Conversor de unidades preciso para peso, altura, volume, temperatura e energia. Perfeito para acompanhar saúde, planejar treino e ajustar a nutrição.',
    shareHashtags: ['conversions', 'measurements', 'health', 'fitness'],
    structuredDataName: 'Ferramenta de conversão de medidas',
    structuredDataDescription:
      'Conversor de unidades preciso para peso, altura, volume, temperatura e energia. Perfeito para acompanhar saúde, planejar treino e ajustar a nutrição.',
    faqTitle: 'Perguntas frequentes sobre conversões de unidades',
    newsletterTitle: 'Receba dicas de saúde e fitness',
    newsletterDescription:
      'Assine para receber as últimas calculadoras de saúde, ferramentas de conversão, dicas de treino e conteúdo exclusivo para alcançar seus objetivos.',
    ui: {
      conversionCategory: 'Categoria de conversão',
      categoryConverterTitleTemplate: 'Conversor de {category}',
      valueLabel: 'Valor',
      valuePlaceholder: 'Digite um valor',
      fromLabel: 'De',
      toLabel: 'Para',
      swapUnitsTitle: 'Trocar unidades',
      convertButton: 'Converter',
      errorInvalidNumber: 'Digite um número válido',
      errorNonNegative: 'Digite um valor maior ou igual a 0',
      errorConversionFailed: 'Falha na conversão',
      resultLabel: 'Resultado',
      quickReference: 'Referência rápida',
    },
    categories: {
      weight: {
        name: 'Peso / massa',
        units: CATEGORY_UNITS.weight,
        labels: {
          kg: 'Quilogramas',
          lb: 'Libras',
          g: 'Gramas',
          oz: 'Onças',
          stone: 'Stone (st)',
        },
      },
      height: {
        name: 'Altura / comprimento',
        units: CATEGORY_UNITS.height,
        labels: { cm: 'Centímetros', in: 'Polegadas', ft: 'Pés', m: 'Metros' },
      },
      volume: {
        name: 'Volume',
        units: CATEGORY_UNITS.volume,
        labels: {
          ml: 'Mililitros',
          l: 'Litros',
          cup: 'Xícaras',
          tbsp: 'Colheres de sopa',
          tsp: 'Colheres de chá',
          floz: 'Onças fluidas',
          gal: 'Galões',
        },
      },
      temperature: {
        name: 'Temperatura',
        units: CATEGORY_UNITS.temperature,
        labels: { c: 'Celsius (°C)', f: 'Fahrenheit (°F)' },
      },
      energy: {
        name: 'Energia / calorias',
        units: CATEGORY_UNITS.energy,
        labels: { kcal: 'Quilocalorias', kj: 'Quilojoules' },
      },
    },
    understanding: [
      {
        title: 'Conversões de peso',
        intro: 'Conversões comuns de peso para saúde e fitness:',
        items: [
          { label: 'Quilogramas para libras:', value: '1 kg = 2.20462 lb' },
          { label: 'Libras para quilogramas:', value: '1 lb = 0.453592 kg' },
          { label: 'Stone para quilogramas:', value: '1 stone = 6.35029 kg' },
          { label: 'Gramas para onças:', value: '1 g = 0.035274 oz' },
        ],
      },
      {
        title: 'Conversões de altura e comprimento',
        intro: 'Conversões comuns de altura e comprimento:',
        items: [
          { label: 'Centímetros para polegadas:', value: '1 cm = 0.393701 in' },
          { label: 'Pés para centímetros:', value: '1 ft = 30.48 cm' },
          { label: 'Metros para pés:', value: '1 m = 3.28084 ft' },
        ],
      },
      {
        title: 'Conversões de volume',
        intro: 'Conversões comuns de volume para culinária e nutrição:',
        items: [
          { label: 'Litros para xícaras:', value: '1 L = 4.227 cups' },
          { label: 'Xícaras para mililitros:', value: '1 cup = 236.588 ml' },
          { label: 'Colheres de sopa para mililitros:', value: '1 tbsp = 14.787 ml' },
          { label: 'Colheres de chá para mililitros:', value: '1 tsp = 4.929 ml' },
        ],
      },
      {
        title: 'Conversões de temperatura',
        intro: 'Fórmulas de conversão de temperatura:',
        items: [
          { label: 'Celsius para Fahrenheit:', value: '°F = (°C × 9/5) + 32' },
          { label: 'Fahrenheit para Celsius:', value: '°C = (°F - 32) × 5/9' },
        ],
      },
      {
        title: 'Conversões de energia',
        intro: 'Conversão de energia na nutrição:',
        items: [
          { label: 'Calorias para quilojoules:', value: '1 kcal = 4.184 kJ' },
          { label: 'Quilojoules para calorias:', value: '1 kJ = 0.239 kcal' },
        ],
        note: 'Observação: na nutrição, "calorie" geralmente se refere a quilocaloria (kcal).',
      },
    ],
    quickReferenceLines: {
      weight: ['1 kg = 2.205 lb = 35.274 oz', '1 stone = 14 lb = 6.350 kg'],
      height: ['1 ft = 12 in = 30.48 cm', '1 m = 3.281 ft = 100 cm'],
      temperature: [
        '0°C = 32°F (congelamento)',
        '37°C = 98.6°F (temp. corporal)',
        '100°C = 212°F (ebulição)',
      ],
    },
    faqs: [
      {
        question: 'Por que é importante converter unidades com precisão para acompanhar a saúde?',
        answer:
          'Conversões precisas são essenciais para acompanhar saúde e fitness, porque pequenos erros se acumulam ao longo do tempo. Por exemplo, confundir libras com quilogramas ao registrar o peso pode levar a interpretar errado o progresso. Conversões incorretas entre kcal e kJ podem resultar em comer menos ou mais do que o necessário. Ao compartilhar dados com profissionais de saúde, usar as unidades corretas ajuda na interpretação. Nosso conversor usa fatores de conversão precisos (não aproximações arredondadas) para manter a exatidão.',
      },
      {
        question: 'Qual é a diferença entre caloria e quilocaloria?',
        answer:
          'Em nutrição, "calorie" geralmente se refere à quilocaloria (kcal), às vezes escrita como Calorie com C maiúsculo. 1 quilocaloria = 1,000 calorias pequenas (cal). Isso pode confundir porque rótulos podem dizer "calorias" mas na verdade significam quilocalorias. Por exemplo, um alimento com "200 calorias" contém 200 kcal, ou 200,000 calorias pequenas. Em contextos científicos, a energia é frequentemente medida em quilojoules (kJ), onde 1 kcal = 4.184 kJ. A maioria dos bancos de dados de nutrição usa kcal.',
      },
      {
        question: 'Como converter minha altura de pés e polegadas para centímetros?',
        answer:
          'Para converter altura de pés e polegadas para centímetros: 1) Converta pés para polegadas (pés × 12), 2) Some as polegadas restantes, 3) Multiplique o total de polegadas por 2.54 para obter centímetros. Exemplo: 5 pés 9 polegadas = (5 × 12) + 9 = 69 polegadas = 69 × 2.54 = 175.26 cm. Nosso conversor faz isso automaticamente. Observação: muitas calculadoras exigem altura em centímetros (métrico) ou polegadas totais (imperial), não apenas pés.',
      },
      {
        question: 'Qual sistema de unidades de peso devo usar para acompanhar o fitness?',
        answer:
          'Use o sistema com o qual você tem mais familiaridade, mas seja consistente. O sistema métrico (kg) é usado internacionalmente e em contextos científicos, com maior precisão para pequenas variações (0.1 kg = 0.22 lb). O sistema imperial (lb) é comum nos EUA e no Reino Unido. Stone é mais usado no Reino Unido. Para um acompanhamento mais detalhado, quilogramas costumam ser preferidos porque incrementos de 0.1 kg são mais fáceis de acompanhar do que 0.2 lb. O mais importante é a consistência: evite trocar de sistema no meio do acompanhamento, pois isso introduz erros e dificulta enxergar tendências.',
      },
      {
        question:
          'Os fatores de conversão desta ferramenta são precisos o suficiente para uso médico?',
        answer:
          'Sim. Nossos fatores de conversão usam definições internacionais padrão com alta precisão (4+ casas decimais). Por exemplo: 1 kg = 2.20462 lb (não 2.2), 1 in = 2.54 cm (exato), 1 kcal = 4.184 kJ (termoquímico). Isso é adequado para acompanhamento de saúde, planejamento nutricional e contextos médicos. Porém, para pesquisa clínica ou aplicações farmacêuticas que exigem precisão extrema, consulte padrões oficiais do NIST ou BIPM. Para uso diário, essas conversões são mais do que suficientes.',
      },
    ],
    relatedArticles: [
      {
        title: 'TDEE explicado: de quantas calorias você realmente precisa?',
        description:
          'Entenda os componentes do gasto energético diário total (TDEE), como ele é calculado e por que é importante para o controle de peso.',
        slug: 'tdee-explained',
        date: ARTICLE_DATES.tdee,
        readTime: '10 min de leitura',
        category: 'Gasto energético',
      },
      {
        title: 'Entendendo o percentual de gordura corporal: o que seus números significam',
        description:
          'Veja quais faixas de gordura corporal são saudáveis, como a composição corporal difere do IMC e por que isso importa para seus objetivos.',
        slug: 'understanding-body-fat-percentage',
        date: ARTICLE_DATES.bodyFat,
        readTime: '9 min de leitura',
        category: 'Composição corporal',
      },
      {
        title: '5 mitos sobre déficit calórico, desmistificados',
        description:
          'Descubra a verdade sobre ideias comuns a respeito de déficit calórico, emagrecimento e metabolismo. Aprenda por que a perda de peso nem sempre é linear.',
        slug: 'calorie-deficit-myths',
        date: ARTICLE_DATES.deficit,
        readTime: '8 min de leitura',
        category: 'Controle de peso',
      },
    ],
  },
  zh: {
    metaTitle: '单位换算器 | 测量单位转换 | HealthCheck',
    metaDescription: '快速准确地换算体重、身高、体积、温度与能量等常见单位。',
    metaKeywords: '单位换算, 测量单位转换, 体重换算, 身高换算, 公制英制, kg转lb, cm转ft',
    ogAlt: '单位换算器',
    title: '测量单位转换',
    description: '在体重、身高、体积等不同测量单位之间快速换算',
    shareTitle: '测量单位转换 | 体重、身高、体积等',
    shareDescription:
      '用于体重、身高、体积、温度与能量的精确单位换算工具。适合健康记录、训练计划与营养计算。',
    shareHashtags: ['conversions', 'measurements', 'health', 'fitness'],
    structuredDataName: '测量单位换算工具',
    structuredDataDescription:
      '用于体重、身高、体积、温度与能量的精确单位换算工具。适合健康记录、训练计划与营养计算。',
    faqTitle: '单位换算常见问题',
    newsletterTitle: '获取健康与健身建议',
    newsletterDescription:
      '订阅即可获取最新健康计算器、换算工具、训练建议与独家内容，帮助你更高效地达成目标。',
    ui: {
      conversionCategory: '转换类别',
      categoryConverterTitleTemplate: '{category}转换器',
      valueLabel: '数值',
      valuePlaceholder: '输入数值',
      fromLabel: '从',
      toLabel: '到',
      swapUnitsTitle: '交换单位',
      convertButton: '换算',
      errorInvalidNumber: '请输入有效的数字',
      errorNonNegative: '请输入大于或等于 0 的数值',
      errorConversionFailed: '换算失败',
      resultLabel: '结果',
      quickReference: '快速参考',
    },
    categories: {
      weight: {
        name: '体重/质量',
        units: CATEGORY_UNITS.weight,
        labels: { kg: '千克', lb: '磅', g: '克', oz: '盎司', stone: '英石 (st)' },
      },
      height: {
        name: '身高/长度',
        units: CATEGORY_UNITS.height,
        labels: { cm: '厘米', in: '英寸', ft: '英尺', m: '米' },
      },
      volume: {
        name: '体积',
        units: CATEGORY_UNITS.volume,
        labels: {
          ml: '毫升',
          l: '升',
          cup: '杯',
          tbsp: '汤匙',
          tsp: '茶匙',
          floz: '液体盎司',
          gal: '加仑',
        },
      },
      temperature: {
        name: '温度',
        units: CATEGORY_UNITS.temperature,
        labels: { c: '摄氏度 (°C)', f: '华氏度 (°F)' },
      },
      energy: {
        name: '能量/热量',
        units: CATEGORY_UNITS.energy,
        labels: { kcal: '千卡', kj: '千焦' },
      },
    },
    understanding: [
      {
        title: '体重单位换算',
        intro: '健康与健身中常见的体重换算：',
        items: [
          { label: '千克换算为磅：', value: '1 kg = 2.20462 lb' },
          { label: '磅换算为千克：', value: '1 lb = 0.453592 kg' },
          { label: '英石换算为千克：', value: '1 stone = 6.35029 kg' },
          { label: '克换算为盎司：', value: '1 g = 0.035274 oz' },
        ],
      },
      {
        title: '身高与长度单位换算',
        intro: '常见的身高/长度换算：',
        items: [
          { label: '厘米换算为英寸：', value: '1 cm = 0.393701 in' },
          { label: '英尺换算为厘米：', value: '1 ft = 30.48 cm' },
          { label: '米换算为英尺：', value: '1 m = 3.28084 ft' },
        ],
      },
      {
        title: '体积单位换算',
        intro: '烹饪与营养中常见的体积换算：',
        items: [
          { label: '升换算为杯：', value: '1 L = 4.227 cups' },
          { label: '杯换算为毫升：', value: '1 cup = 236.588 ml' },
          { label: '汤匙换算为毫升：', value: '1 tbsp = 14.787 ml' },
          { label: '茶匙换算为毫升：', value: '1 tsp = 4.929 ml' },
        ],
      },
      {
        title: '温度单位换算',
        intro: '温度换算公式：',
        items: [
          { label: '摄氏度换算为华氏度：', value: '°F = (°C × 9/5) + 32' },
          { label: '华氏度换算为摄氏度：', value: '°C = (°F - 32) × 5/9' },
        ],
      },
      {
        title: '能量单位换算',
        intro: '营养中常用的能量换算：',
        items: [
          { label: '千卡换算为千焦：', value: '1 kcal = 4.184 kJ' },
          { label: '千焦换算为千卡：', value: '1 kJ = 0.239 kcal' },
        ],
        note: '提示：在营养学中，“calorie”通常指千卡 (kcal)。',
      },
    ],
    quickReferenceLines: {
      weight: ['1 kg = 2.205 lb = 35.274 oz', '1 stone = 14 lb = 6.350 kg'],
      height: ['1 ft = 12 in = 30.48 cm', '1 m = 3.281 ft = 100 cm'],
      temperature: ['0°C = 32°F（冰点）', '37°C = 98.6°F（体温）', '100°C = 212°F（沸点）'],
    },
    faqs: [
      {
        question: '为什么在健康记录中需要准确进行单位换算？',
        answer:
          '准确的单位换算对健康与健身记录非常关键，因为微小的误差会随着时间累积。例如，在体重记录中把磅当成千克，可能会导致你对减重进展产生错误判断。kcal 与 kJ 的换算不准确也可能造成热量摄入偏差，从而吃得过多或过少。当你与医疗专业人士分享健康数据时，使用正确的单位有助于更好地理解和沟通。本工具使用精确的换算系数（而非粗略取整）来保持准确性。',
      },
      {
        question: 'calorie（卡路里）和 kilocalorie（千卡）有什么区别？',
        answer:
          '在营养学语境中，"calorie" 通常指 kilocalorie（kcal，也常写作 Calorie）。1 kilocalorie = 1,000 小卡 (cal)。这很容易让人困惑，因为食品标签常写“卡路里”，但实际指的是千卡。例如标注“200 calories”的食物含有 200 kcal，也就是 200,000 小卡。在科学语境中，能量常以千焦 (kJ) 表示，其中 1 kcal = 4.184 kJ。大多数营养数据库使用 kcal。',
      },
      {
        question: '如何把身高从英尺和英寸换算为厘米？',
        answer:
          '将身高从英尺和英寸换算为厘米：1) 把英尺换算为英寸（英尺 × 12），2) 加上剩余的英寸，3) 用总英寸数乘以 2.54 得到厘米。例如：5 英尺 9 英寸 = (5 × 12) + 9 = 69 英寸 = 69 × 2.54 = 175.26 cm。本工具会自动完成。提示：很多健康计算器需要厘米（公制）或总英寸（英制），而不是仅输入英尺。',
      },
      {
        question: '健身记录应该使用哪种体重单位系统？',
        answer:
          '使用你最熟悉的单位系统即可，但要保持一致。公制（kg）在国际上和科学领域更常用，并且对小变化更敏感（0.1 kg = 0.22 lb）。英制（lb）在美国和英国较常见，英石主要在英国使用。进行更精细的记录时，千克常更方便，因为 0.1 kg 的变化比 0.2 lb 更容易追踪。最重要的是一致性：不要在记录过程中频繁切换单位系统，否则会引入换算误差并让趋势更难判断。',
      },
      {
        question: '这个工具的换算系数是否足够用于医疗场景？',
        answer:
          '是的。本工具使用国际标准定义的高精度换算系数（4 位以上小数）。例如：1 kg = 2.20462 lb（而不是 2.2），1 in = 2.54 cm（精确值），1 kcal = 4.184 kJ（热化学定义）。这对于健康记录、营养规划以及多数医疗沟通场景已经足够。不过，对于需要极高精度的临床研究或制药应用，建议参考 NIST 或 BIPM 等官方标准。对于日常健康与健身用途，这些换算绰绰有余。',
      },
    ],
    relatedArticles: [
      {
        title: 'TDEE 详解：你每天到底需要多少热量？',
        description:
          '了解每日总能量消耗（TDEE）的组成与计算方式，以及为什么知道 TDEE 对体重管理很重要。',
        slug: 'tdee-explained',
        date: ARTICLE_DATES.tdee,
        readTime: '阅读 10 分钟',
        category: '能量消耗',
      },
      {
        title: '体脂率解读：你的数字意味着什么？',
        description:
          '了解健康的体脂率范围、身体成分与 BMI 的区别，以及这些指标为何影响你的健康目标。',
        slug: 'understanding-body-fat-percentage',
        date: ARTICLE_DATES.bodyFat,
        readTime: '阅读 9 分钟',
        category: '身体成分',
      },
      {
        title: '热量缺口的 5 个误区：逐一澄清',
        description:
          '揭示关于热量缺口、减脂与代谢的常见误解，并了解为什么减重过程并非总是线性变化。',
        slug: 'calorie-deficit-myths',
        date: ARTICLE_DATES.deficit,
        readTime: '阅读 8 分钟',
        category: '体重管理',
      },
    ],
  },
};

export function getConversionsCopy(locale: SupportedLocale): ConversionsPageCopy {
  return COPY[locale] ?? COPY.en;
}
