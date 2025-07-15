import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
  defaultLocale,
  isSupportedLocale,
  prefixPathWithLocale,
  type SupportedLocale,
} from '@/i18n/config';

interface LocalizedAboutProps {
  params: Promise<{ locale: string }>;
}

type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  missionTitle: string;
  missionP1: string;
  missionP2: string;
  scienceTitle: string;
  scienceP1: string;
  scienceP2: string;
  scienceP3: string;
  approachTitle: string;
  approachIntro: string;
  approachBullets: Array<{ label: string; text: string }>;
  approachClosing: string;
  getStartedTitle: string;
  getStartedIntro: string;
  getStartedCards: Array<{ href: string; title: string; description: string }>;
};

const COPY: Record<SupportedLocale, AboutCopy> = {
  en: {
    metaTitle: 'About Us | HealthCheck',
    metaDescription:
      'Learn about HealthCheck, our mission, and the science behind our health and fitness calculators.',
    pageTitle: 'About HealthCheck',
    missionTitle: 'Our Mission',
    missionP1:
      'HealthCheck is your go-to resource for evidence-based health and fitness calculators. We believe in making health information accessible, accurate, and actionable for everyone.',
    missionP2:
      'Our suite of calculators helps you understand your body composition and calorie needs, empowering you to make informed decisions about your health based on your results.',
    scienceTitle: 'The Science Behind Our Calculators',
    scienceP1:
      'All our calculators are built on scientifically validated formulas and methodologies. We regularly review and update our calculations based on the latest research to ensure accuracy.',
    scienceP2:
      'Our body composition calculators use methods like the U.S. Navy formula, Jackson-Pollock skinfold equations, and BMI correlations to estimate body fat percentage. For energy expenditure, we implement the Mifflin-St Jeor equation, which research has shown to be the most accurate for most individuals.',
    scienceP3:
      'While these calculators provide valuable estimates, they are not substitutes for professional medical advice or laboratory measurements. We encourage users to consult with healthcare professionals for personalized guidance.',
    approachTitle: 'Our Approach',
    approachIntro: 'At HealthCheck, we believe in:',
    approachBullets: [
      {
        label: 'Accuracy',
        text: 'Using validated scientific formulas and methodologies',
      },
      {
        label: 'Education',
        text: 'Providing context and explanation alongside results',
      },
      {
        label: 'Accessibility',
        text: 'Making health information available to everyone',
      },
      {
        label: 'Transparency',
        text: 'Clearly explaining our calculation methods',
      },
      {
        label: 'Privacy',
        text: 'Respecting user data and performing calculations locally',
      },
    ],
    approachClosing:
      'We strive to provide tools that help you understand your body better and make informed decisions about your health and fitness journey.',
    getStartedTitle: 'Get Started',
    getStartedIntro:
      'Ready to learn more about your body composition and calorie needs? Check out our calculators:',
    getStartedCards: [
      {
        href: '/body-fat',
        title: 'Body Fat Calculator',
        description: 'Calculate your body fat percentage using various methods',
      },
      {
        href: '/bmi',
        title: 'BMI Calculator',
        description: 'Calculate your Body Mass Index',
      },
      {
        href: '/tdee',
        title: 'TDEE Calculator',
        description: 'Calculate your Total Daily Energy Expenditure',
      },
      {
        href: '/calorie-deficit',
        title: 'Calorie Deficit Calculator',
        description: 'Plan your weight loss journey',
      },
    ],
  },
  es: {
    metaTitle: 'Sobre nosotros | HealthCheck',
    metaDescription:
      'Conoce HealthCheck, nuestra misión y la ciencia detrás de nuestras calculadoras de salud y fitness.',
    pageTitle: 'Acerca de HealthCheck',
    missionTitle: 'Nuestra misión',
    missionP1:
      'HealthCheck es tu recurso de confianza para calculadoras de salud y fitness basadas en evidencia. Creemos en hacer que la información de salud sea accesible, precisa y accionable para todos.',
    missionP2:
      'Nuestra suite de calculadoras te ayuda a entender tu composición corporal y tus necesidades calóricas, para que puedas tomar decisiones informadas sobre tu salud a partir de tus resultados.',
    scienceTitle: 'La ciencia detrás de nuestras calculadoras',
    scienceP1:
      'Todas nuestras calculadoras se basan en fórmulas y metodologías validadas científicamente. Revisamos y actualizamos regularmente nuestros cálculos según la investigación más reciente para asegurar la precisión.',
    scienceP2:
      'Nuestras calculadoras de composición corporal utilizan métodos como la fórmula de la Marina de EE. UU., las ecuaciones de pliegues cutáneos Jackson-Pollock y correlaciones con el IMC para estimar el porcentaje de grasa corporal. Para el gasto energético, implementamos la ecuación de Mifflin-St Jeor, que la investigación ha mostrado como la más precisa para la mayoría de las personas.',
    scienceP3:
      'Aunque estas calculadoras proporcionan estimaciones valiosas, no sustituyen el consejo médico profesional ni las mediciones de laboratorio. Recomendamos consultar con profesionales de la salud para orientación personalizada.',
    approachTitle: 'Nuestro enfoque',
    approachIntro: 'En HealthCheck creemos en:',
    approachBullets: [
      { label: 'Exactitud', text: 'Usar fórmulas y metodologías científicas validadas' },
      { label: 'Educación', text: 'Ofrecer contexto y explicación junto con los resultados' },
      {
        label: 'Accesibilidad',
        text: 'Hacer que la información de salud esté disponible para todos',
      },
      { label: 'Transparencia', text: 'Explicar claramente nuestros métodos de cálculo' },
      {
        label: 'Privacidad',
        text: 'Respetar los datos del usuario y realizar los cálculos localmente',
      },
    ],
    approachClosing:
      'Nos esforzamos por ofrecer herramientas que te ayuden a entender mejor tu cuerpo y a tomar decisiones informadas en tu camino de salud y fitness.',
    getStartedTitle: 'Empieza',
    getStartedIntro:
      '¿Listo para conocer más sobre tu composición corporal y tus necesidades calóricas? Prueba nuestras calculadoras:',
    getStartedCards: [
      {
        href: '/body-fat',
        title: 'Calculadora de grasa corporal',
        description: 'Calcula tu porcentaje de grasa corporal con varios métodos',
      },
      {
        href: '/bmi',
        title: 'Calculadora de IMC',
        description: 'Calcula tu Índice de Masa Corporal',
      },
      {
        href: '/tdee',
        title: 'Calculadora de TDEE',
        description: 'Calcula tu gasto energético diario total',
      },
      {
        href: '/calorie-deficit',
        title: 'Calculadora de déficit calórico',
        description: 'Planifica tu proceso de pérdida de peso',
      },
    ],
  },
  fr: {
    metaTitle: 'À propos | HealthCheck',
    metaDescription:
      'Découvrez HealthCheck, notre mission et la science derrière nos calculateurs santé et fitness.',
    pageTitle: 'À propos de HealthCheck',
    missionTitle: 'Notre mission',
    missionP1:
      'HealthCheck est votre référence pour des calculateurs santé et fitness fondés sur des preuves. Nous croyons en une information santé accessible, précise et actionnable pour tous.',
    missionP2:
      'Notre suite de calculateurs vous aide à comprendre votre composition corporelle et vos besoins caloriques, pour prendre des décisions éclairées à partir de vos résultats.',
    scienceTitle: 'La science derrière nos calculateurs',
    scienceP1:
      'Tous nos calculateurs reposent sur des formules et méthodologies validées scientifiquement. Nous révisons et mettons à jour régulièrement nos calculs selon les dernières recherches afin d’assurer la précision.',
    scienceP2:
      'Nos calculateurs de composition corporelle utilisent des méthodes comme la formule U.S. Navy, les équations de plis cutanés Jackson-Pollock et des corrélations avec l’IMC pour estimer le pourcentage de masse grasse. Pour la dépense énergétique, nous utilisons l’équation de Mifflin-St Jeor, considérée comme la plus précise pour la plupart des personnes.',
    scienceP3:
      'Ces calculateurs fournissent des estimations utiles, mais ne remplacent pas un avis médical ni des mesures en laboratoire. Nous vous encourageons à consulter des professionnels de santé pour un accompagnement personnalisé.',
    approachTitle: 'Notre approche',
    approachIntro: 'Chez HealthCheck, nous croyons en :',
    approachBullets: [
      { label: 'Précision', text: 'Utiliser des formules et méthodologies scientifiques validées' },
      { label: 'Éducation', text: 'Fournir du contexte et des explications avec les résultats' },
      { label: 'Accessibilité', text: 'Rendre l’information santé disponible pour tous' },
      { label: 'Transparence', text: 'Expliquer clairement nos méthodes de calcul' },
      {
        label: 'Confidentialité',
        text: 'Respecter les données des utilisateurs et effectuer les calculs localement',
      },
    ],
    approachClosing:
      'Nous cherchons à vous proposer des outils pour mieux comprendre votre corps et prendre des décisions éclairées dans votre parcours santé et fitness.',
    getStartedTitle: 'Commencer',
    getStartedIntro:
      'Prêt à en apprendre plus sur votre composition corporelle et vos besoins caloriques ? Essayez nos calculateurs :',
    getStartedCards: [
      {
        href: '/body-fat',
        title: 'Calculateur de masse grasse',
        description: 'Calculez votre pourcentage de masse grasse avec plusieurs méthodes',
      },
      {
        href: '/bmi',
        title: 'Calculateur IMC',
        description: 'Calculez votre indice de masse corporelle',
      },
      {
        href: '/tdee',
        title: 'Calculateur TDEE',
        description: 'Calculez votre dépense énergétique quotidienne totale',
      },
      {
        href: '/calorie-deficit',
        title: 'Calculateur de déficit calorique',
        description: 'Planifiez votre parcours de perte de poids',
      },
    ],
  },
  de: {
    metaTitle: 'Über uns | HealthCheck',
    metaDescription:
      'Erfahren Sie mehr über HealthCheck, unsere Mission und die Wissenschaft hinter unseren Gesundheits- und Fitnessrechnern.',
    pageTitle: 'Über HealthCheck',
    missionTitle: 'Unsere Mission',
    missionP1:
      'HealthCheck ist Ihre Anlaufstelle für evidenzbasierte Gesundheits- und Fitnessrechner. Wir möchten Gesundheitsinformationen für alle zugänglich, präzise und umsetzbar machen.',
    missionP2:
      'Unsere Rechner helfen Ihnen, Ihre Körperzusammensetzung und Ihren Kalorienbedarf zu verstehen, damit Sie auf Basis Ihrer Ergebnisse informierte Entscheidungen treffen können.',
    scienceTitle: 'Die Wissenschaft hinter unseren Rechnern',
    scienceP1:
      'Alle unsere Rechner basieren auf wissenschaftlich validierten Formeln und Methoden. Wir überprüfen und aktualisieren unsere Berechnungen regelmäßig anhand aktueller Forschung, um die Genauigkeit sicherzustellen.',
    scienceP2:
      'Unsere Körperzusammensetzungs-Rechner verwenden Methoden wie die U.S.-Navy-Formel, Jackson-Pollock-Hautfalten-Gleichungen und BMI-Korrelationen, um den Körperfettanteil zu schätzen. Für den Energieverbrauch nutzen wir die Mifflin-St Jeor-Gleichung, die in Studien für die meisten Menschen als besonders genau gilt.',
    scienceP3:
      'Diese Rechner liefern hilfreiche Schätzungen, ersetzen jedoch keine medizinische Beratung oder Labor-Messungen. Wir empfehlen, für individuelle Empfehlungen medizinisches Fachpersonal zu konsultieren.',
    approachTitle: 'Unser Ansatz',
    approachIntro: 'Bei HealthCheck glauben wir an:',
    approachBullets: [
      {
        label: 'Genauigkeit',
        text: 'Verwendung validierter wissenschaftlicher Formeln und Methoden',
      },
      { label: 'Bildung', text: 'Kontext und Erklärungen zusätzlich zu den Ergebnissen' },
      { label: 'Zugänglichkeit', text: 'Gesundheitsinformationen für alle verfügbar machen' },
      { label: 'Transparenz', text: 'Unsere Berechnungsmethoden klar erklären' },
      { label: 'Datenschutz', text: 'Nutzerdaten respektieren und Berechnungen lokal durchführen' },
    ],
    approachClosing:
      'Wir möchten Tools bieten, die Ihnen helfen, Ihren Körper besser zu verstehen und fundierte Entscheidungen auf Ihrem Gesundheits- und Fitnessweg zu treffen.',
    getStartedTitle: 'Loslegen',
    getStartedIntro:
      'Bereit, mehr über Ihre Körperzusammensetzung und Ihren Kalorienbedarf zu erfahren? Schauen Sie sich unsere Rechner an:',
    getStartedCards: [
      {
        href: '/body-fat',
        title: 'Körperfett-Rechner',
        description: 'Berechnen Sie Ihren Körperfettanteil mit verschiedenen Methoden',
      },
      { href: '/bmi', title: 'BMI-Rechner', description: 'Berechnen Sie Ihren Body-Mass-Index' },
      {
        href: '/tdee',
        title: 'TDEE-Rechner',
        description: 'Berechnen Sie Ihren täglichen Gesamtenergieverbrauch',
      },
      {
        href: '/calorie-deficit',
        title: 'Kaloriendefizit-Rechner',
        description: 'Planen Sie Ihren Weg zur Gewichtsabnahme',
      },
    ],
  },
  pt: {
    metaTitle: 'Sobre nós | HealthCheck',
    metaDescription:
      'Saiba mais sobre a HealthCheck, nossa missão e a ciência por trás das nossas calculadoras de saúde e fitness.',
    pageTitle: 'Sobre a HealthCheck',
    missionTitle: 'Nossa missão',
    missionP1:
      'A HealthCheck é seu recurso principal para calculadoras de saúde e fitness baseadas em evidências. Acreditamos em tornar a informação de saúde acessível, precisa e prática para todos.',
    missionP2:
      'Nossa suíte de calculadoras ajuda você a entender sua composição corporal e suas necessidades calóricas, permitindo decisões mais informadas a partir dos resultados.',
    scienceTitle: 'A ciência por trás das nossas calculadoras',
    scienceP1:
      'Todas as nossas calculadoras são construídas com fórmulas e metodologias validadas cientificamente. Revisamos e atualizamos nossos cálculos regularmente com base nas pesquisas mais recentes para garantir precisão.',
    scienceP2:
      'Nossas calculadoras de composição corporal usam métodos como a fórmula da Marinha dos EUA, equações de dobras cutâneas Jackson-Pollock e correlações com o IMC para estimar o percentual de gordura. Para gasto energético, usamos a equação de Mifflin-St Jeor, considerada a mais precisa para a maioria das pessoas.',
    scienceP3:
      'Embora ofereçam estimativas valiosas, essas calculadoras não substituem orientação médica profissional nem medições laboratoriais. Recomendamos consultar profissionais de saúde para orientação personalizada.',
    approachTitle: 'Nossa abordagem',
    approachIntro: 'Na HealthCheck, acreditamos em:',
    approachBullets: [
      { label: 'Precisão', text: 'Usar fórmulas e metodologias científicas validadas' },
      { label: 'Educação', text: 'Oferecer contexto e explicação junto aos resultados' },
      { label: 'Acessibilidade', text: 'Tornar a informação de saúde disponível para todos' },
      { label: 'Transparência', text: 'Explicar claramente nossos métodos de cálculo' },
      {
        label: 'Privacidade',
        text: 'Respeitar os dados do usuário e realizar cálculos localmente',
      },
    ],
    approachClosing:
      'Buscamos oferecer ferramentas que ajudem você a entender melhor seu corpo e tomar decisões informadas na sua jornada de saúde e fitness.',
    getStartedTitle: 'Comece agora',
    getStartedIntro:
      'Pronto para aprender mais sobre sua composição corporal e necessidades calóricas? Confira nossas calculadoras:',
    getStartedCards: [
      {
        href: '/body-fat',
        title: 'Calculadora de gordura corporal',
        description: 'Calcule seu percentual de gordura corporal com vários métodos',
      },
      {
        href: '/bmi',
        title: 'Calculadora de IMC',
        description: 'Calcule seu Índice de Massa Corporal',
      },
      {
        href: '/tdee',
        title: 'Calculadora de TDEE',
        description: 'Calcule seu gasto energético diário total',
      },
      {
        href: '/calorie-deficit',
        title: 'Calculadora de déficit calórico',
        description: 'Planeje sua jornada de emagrecimento',
      },
    ],
  },
  zh: {
    metaTitle: '关于我们 | HealthCheck',
    metaDescription: '了解 HealthCheck、我们的使命，以及健康与健身计算器背后的科学。',
    pageTitle: '关于 HealthCheck',
    missionTitle: '我们的使命',
    missionP1:
      'HealthCheck 是基于证据的健康与健身计算器平台。我们相信应让健康信息更易获取、更准确、更可行动，服务每一个人。',
    missionP2: '我们的计算器帮助你了解体成分与热量需求，让你能够基于结果做出更明智的健康决策。',
    scienceTitle: '计算器背后的科学',
    scienceP1:
      '所有计算器都基于科学验证的公式与方法。我们会根据最新研究定期审查并更新计算方式，以确保准确性。',
    scienceP2:
      '体成分计算器使用了美国海军公式、Jackson-Pollock 皮褶公式以及 BMI 相关性等方法来估算体脂率。能量消耗方面，我们采用 Mifflin-St Jeor 方程，研究表明它对大多数人更准确。',
    scienceP3:
      '这些计算器提供有价值的估算，但不能替代专业医疗建议或实验室测量。我们建议你向医疗专业人士咨询以获得个性化指导。',
    approachTitle: '我们的方法',
    approachIntro: '在 HealthCheck，我们重视：',
    approachBullets: [
      { label: '准确性', text: '使用经验证的科学公式与方法' },
      { label: '教育性', text: '在结果旁提供背景与解释' },
      { label: '可获取性', text: '让健康信息对所有人可用' },
      { label: '透明性', text: '清晰说明我们的计算方法' },
      { label: '隐私', text: '尊重用户数据并在本地完成计算' },
    ],
    approachClosing: '我们希望提供帮助你更好理解身体、并在健康与健身旅程中做出明智决策的工具。',
    getStartedTitle: '开始使用',
    getStartedIntro: '准备了解更多关于体成分与热量需求的信息了吗？试试这些计算器：',
    getStartedCards: [
      { href: '/body-fat', title: '体脂计算器', description: '使用多种方法估算体脂率' },
      { href: '/bmi', title: 'BMI 计算器', description: '计算你的 BMI（身体质量指数）' },
      { href: '/tdee', title: 'TDEE 计算器', description: '计算每日总能量消耗' },
      { href: '/calorie-deficit', title: '热量缺口计算器', description: '规划你的减脂进程' },
    ],
  },
};

export async function generateMetadata({ params }: LocalizedAboutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) return {};

  const copy = COPY[locale] ?? COPY.en;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: './' },
    openGraph: { title: copy.metaTitle, description: copy.metaDescription, url: './' },
  };
}

export default async function AboutPage({ params }: LocalizedAboutProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/about');
  }

  const copy = COPY[locale] ?? COPY.en;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{copy.pageTitle}</h1>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">{copy.missionTitle}</h2>
        <p className="mb-4">{copy.missionP1}</p>
        <p>{copy.missionP2}</p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">{copy.scienceTitle}</h2>
        <p className="mb-4">{copy.scienceP1}</p>
        <p className="mb-4">{copy.scienceP2}</p>
        <p>{copy.scienceP3}</p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">{copy.approachTitle}</h2>
        <p className="mb-4">{copy.approachIntro}</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          {copy.approachBullets.map(item => (
            <li key={item.label}>
              <strong>{item.label}:</strong> {item.text}
            </li>
          ))}
        </ul>
        <p>{copy.approachClosing}</p>
      </div>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">{copy.getStartedTitle}</h2>
        <p className="mb-4">{copy.getStartedIntro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {copy.getStartedCards.map(card => (
            <Link
              key={card.href}
              href={prefixPathWithLocale(card.href, locale)}
              className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
            >
              <h3 className="font-semibold text-accent">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
