import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { defaultLocale, isSupportedLocale, type SupportedLocale } from '@/i18n/config';

interface LocalizedTermsProps {
  params: Promise<{ locale: string }>;
}

type TermsCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  translationNotice?: string;
  intro: string;
  serviceTitle: string;
  serviceBody: string;
  accountsTitle: string;
  accountsP1: string;
  accountsP2: string;
  adsTitle: string;
  adsP1: string;
  adsP2: string;
  acceptableUseTitle: string;
  acceptableUseItems: string[];
  noMedicalTitle: string;
  noMedicalBody: string;
  liabilityTitle: string;
  liabilityBody: string;
  contactTitle: string;
  contactBody: string;
};

const COPY: Record<SupportedLocale, TermsCopy> = {
  en: {
    metaTitle: 'Terms of Service | HealthCheck',
    metaDescription:
      'HealthCheck terms of service for using our health and fitness calculator tools.',
    pageTitle: 'Terms of Service',
    lastUpdatedLabel: 'Last Updated:',
    lastUpdatedDate: 'February 6, 2026',
    intro:
      'By accessing and using HealthCheck, you agree to these Terms. If you do not agree, please do not use the site.',
    serviceTitle: 'Service Description',
    serviceBody:
      'HealthCheck provides informational calculators and educational content related to fitness, body composition, and nutrition.',
    accountsTitle: 'Accounts and Saved Results',
    accountsP1:
      'We offer account creation to save calculator results. Authentication is managed by Clerk, a secure third-party provider. Saved calculator results may be stored locally in your browser and, when you are signed in, synced to our database so you can access them across devices.',
    accountsP2:
      'You are responsible for safeguarding access to your account and for the activity associated with your use of the site.',
    adsTitle: 'Affiliate Links and Advertising',
    adsP1:
      'Some pages contain affiliate links to products and services. When you make a purchase through these links, we may earn a small commission at no extra cost to you. We are a participant in the Amazon Services LLC Associates Program.',
    adsP2:
      'We also display advertisements through Google AdSense. These ads may use cookies to personalize content. Affiliate recommendations and advertisements do not constitute endorsements of specific medical treatments or products.',
    acceptableUseTitle: 'Acceptable Use',
    acceptableUseItems: [
      'Do not misuse, disrupt, or attempt unauthorized access to the service.',
      'Do not use the service for unlawful activities.',
      'Do not rely on calculators as medical diagnosis or treatment tools.',
    ],
    noMedicalTitle: 'No Medical Relationship',
    noMedicalBody:
      'Use of HealthCheck does not create a doctor-patient relationship. Content and calculator outputs are educational estimates only.',
    liabilityTitle: 'Limitation of Liability',
    liabilityBody:
      'To the fullest extent permitted by law, HealthCheck and its operators are not liable for losses or damages resulting from use of the service or reliance on site content.',
    contactTitle: 'Contact',
    contactBody: 'Questions about these Terms: info@healthcalc.xyz',
  },
  es: {
    metaTitle: 'Términos de servicio | HealthCheck',
    metaDescription:
      'Términos de servicio de HealthCheck para el uso de nuestras calculadoras y contenidos.',
    pageTitle: 'Términos de servicio',
    lastUpdatedLabel: 'Última actualización:',
    lastUpdatedDate: '6 de febrero de 2026',
    translationNotice:
      'Esta traducción se proporciona solo por conveniencia. En caso de conflicto, la versión en inglés prevalece.',
    intro:
      'Al acceder y usar HealthCheck, aceptas estos Términos. Si no estás de acuerdo, no uses el sitio.',
    serviceTitle: 'Descripción del servicio',
    serviceBody:
      'HealthCheck ofrece calculadoras informativas y contenido educativo relacionado con fitness, composición corporal y nutrición.',
    accountsTitle: 'Cuentas y resultados guardados',
    accountsP1:
      'Ofrecemos la creación de cuentas para guardar resultados. La autenticación la gestiona Clerk, un proveedor externo seguro. Los resultados guardados pueden almacenarse localmente en tu navegador y, cuando estás conectado, sincronizarse con nuestra base de datos para que puedas acceder desde varios dispositivos.',
    accountsP2:
      'Eres responsable de proteger el acceso a tu cuenta y de la actividad asociada al uso del sitio.',
    adsTitle: 'Enlaces de afiliados y publicidad',
    adsP1:
      'Algunas páginas contienen enlaces de afiliados a productos y servicios. Si compras a través de estos enlaces, podemos ganar una pequeña comisión sin coste adicional para ti. Participamos en el programa Amazon Services LLC Associates.',
    adsP2:
      'También mostramos anuncios mediante Google AdSense. Estos anuncios pueden usar cookies para personalizar el contenido. Las recomendaciones de afiliados y los anuncios no constituyen un respaldo de tratamientos médicos o productos específicos.',
    acceptableUseTitle: 'Uso aceptable',
    acceptableUseItems: [
      'No hagas un uso indebido, no interrumpas ni intentes acceder sin autorización al servicio.',
      'No uses el servicio para actividades ilegales.',
      'No uses las calculadoras como herramientas de diagnóstico o tratamiento médico.',
    ],
    noMedicalTitle: 'Sin relación médica',
    noMedicalBody:
      'El uso de HealthCheck no crea una relación médico-paciente. El contenido y los resultados de las calculadoras son solo estimaciones educativas.',
    liabilityTitle: 'Limitación de responsabilidad',
    liabilityBody:
      'En la máxima medida permitida por la ley, HealthCheck y sus operadores no son responsables de pérdidas o daños derivados del uso del servicio o de la confianza en el contenido del sitio.',
    contactTitle: 'Contacto',
    contactBody: 'Preguntas sobre estos términos: info@healthcalc.xyz',
  },
  fr: {
    metaTitle: 'Conditions d’utilisation | HealthCheck',
    metaDescription:
      'Conditions d’utilisation de HealthCheck pour l’usage de nos calculateurs et contenus.',
    pageTitle: 'Conditions d’utilisation',
    lastUpdatedLabel: 'Dernière mise à jour :',
    lastUpdatedDate: '6 février 2026',
    translationNotice:
      'Cette traduction est fournie à titre de commodité. En cas de conflit, la version anglaise prévaut.',
    intro:
      'En accédant à HealthCheck et en l’utilisant, vous acceptez ces conditions. Si vous n’êtes pas d’accord, veuillez ne pas utiliser le site.',
    serviceTitle: 'Description du service',
    serviceBody:
      'HealthCheck fournit des calculateurs informatifs et du contenu éducatif liés au fitness, à la composition corporelle et à la nutrition.',
    accountsTitle: 'Comptes et résultats enregistrés',
    accountsP1:
      'Nous proposons la création de compte pour enregistrer des résultats. L’authentification est gérée par Clerk, un fournisseur tiers sécurisé. Les résultats enregistrés peuvent être stockés localement dans votre navigateur et, lorsque vous êtes connecté, synchronisés avec notre base de données pour un accès multi-appareils.',
    accountsP2:
      'Vous êtes responsable de la protection de l’accès à votre compte et des activités associées à votre utilisation du site.',
    adsTitle: 'Affiliation et publicité',
    adsP1:
      'Certaines pages contiennent des liens d’affiliation vers des produits et services. En cas d’achat via ces liens, nous pouvons percevoir une petite commission sans coût supplémentaire. Nous participons au programme Amazon Services LLC Associates.',
    adsP2:
      'Nous affichons également des publicités via Google AdSense. Ces publicités peuvent utiliser des cookies pour personnaliser le contenu. Les recommandations d’affiliation et les publicités ne constituent pas une approbation de traitements médicaux ou de produits spécifiques.',
    acceptableUseTitle: 'Utilisation acceptable',
    acceptableUseItems: [
      'Ne pas abuser du service, le perturber ou tenter un accès non autorisé.',
      'Ne pas utiliser le service à des fins illégales.',
      'Ne pas considérer les calculateurs comme des outils de diagnostic ou de traitement médical.',
    ],
    noMedicalTitle: 'Aucune relation médicale',
    noMedicalBody:
      'L’utilisation de HealthCheck ne crée pas de relation médecin-patient. Le contenu et les résultats des calculateurs sont des estimations éducatives.',
    liabilityTitle: 'Limitation de responsabilité',
    liabilityBody:
      'Dans la mesure maximale autorisée par la loi, HealthCheck et ses opérateurs ne sont pas responsables des pertes ou dommages résultant de l’utilisation du service ou de la confiance accordée au contenu du site.',
    contactTitle: 'Contact',
    contactBody: 'Questions sur ces conditions : info@healthcalc.xyz',
  },
  de: {
    metaTitle: 'Nutzungsbedingungen | HealthCheck',
    metaDescription:
      'Nutzungsbedingungen von HealthCheck für die Verwendung unserer Rechner und Inhalte.',
    pageTitle: 'Nutzungsbedingungen',
    lastUpdatedLabel: 'Zuletzt aktualisiert:',
    lastUpdatedDate: '6. Februar 2026',
    translationNotice:
      'Diese Übersetzung dient nur der Information. Im Falle von Abweichungen gilt die englische Version.',
    intro:
      'Durch den Zugriff auf und die Nutzung von HealthCheck stimmen Sie diesen Bedingungen zu. Wenn Sie nicht einverstanden sind, nutzen Sie die Website bitte nicht.',
    serviceTitle: 'Beschreibung des Dienstes',
    serviceBody:
      'HealthCheck bietet Informationsrechner und Bildungsinhalte rund um Fitness, Körperzusammensetzung und Ernährung.',
    accountsTitle: 'Konten und gespeicherte Ergebnisse',
    accountsP1:
      'Wir bieten Konten an, um Rechnerergebnisse zu speichern. Die Authentifizierung erfolgt über Clerk, einen sicheren Drittanbieter. Gespeicherte Ergebnisse können lokal im Browser abgelegt und, wenn Sie angemeldet sind, mit unserer Datenbank synchronisiert werden, damit Sie sie geräteübergreifend nutzen können.',
    accountsP2:
      'Sie sind dafür verantwortlich, den Zugriff auf Ihr Konto zu schützen und für Aktivitäten, die mit Ihrer Nutzung der Website verbunden sind.',
    adsTitle: 'Affiliate-Links und Werbung',
    adsP1:
      'Einige Seiten enthalten Affiliate-Links zu Produkten und Dienstleistungen. Bei Käufen über diese Links können wir eine kleine Provision ohne zusätzliche Kosten für Sie erhalten. Wir nehmen am Amazon Services LLC Associates Program teil.',
    adsP2:
      'Außerdem zeigen wir Werbung über Google AdSense an. Diese Anzeigen können Cookies zur Personalisierung verwenden. Affiliate-Empfehlungen und Werbung stellen keine Empfehlung bestimmter medizinischer Behandlungen oder Produkte dar.',
    acceptableUseTitle: 'Zulässige Nutzung',
    acceptableUseItems: [
      'Missbrauchen oder stören Sie den Dienst nicht und versuchen Sie keinen unbefugten Zugriff.',
      'Nutzen Sie den Dienst nicht für rechtswidrige Aktivitäten.',
      'Verlassen Sie sich nicht auf die Rechner als Diagnose- oder Behandlungstools.',
    ],
    noMedicalTitle: 'Keine medizinische Beziehung',
    noMedicalBody:
      'Die Nutzung von HealthCheck begründet keine Arzt-Patienten-Beziehung. Inhalte und Rechnerergebnisse sind ausschließlich edukative Schätzungen.',
    liabilityTitle: 'Haftungsbeschränkung',
    liabilityBody:
      'Soweit gesetzlich zulässig, haften HealthCheck und seine Betreiber nicht für Verluste oder Schäden, die aus der Nutzung des Dienstes oder dem Vertrauen in Inhalte der Website entstehen.',
    contactTitle: 'Kontakt',
    contactBody: 'Fragen zu diesen Bedingungen: info@healthcalc.xyz',
  },
  pt: {
    metaTitle: 'Termos de serviço | HealthCheck',
    metaDescription:
      'Termos de serviço da HealthCheck para o uso de nossas calculadoras e conteúdos.',
    pageTitle: 'Termos de serviço',
    lastUpdatedLabel: 'Última atualização:',
    lastUpdatedDate: '6 de fevereiro de 2026',
    translationNotice:
      'Esta tradução é fornecida apenas por conveniência. Em caso de conflito, a versão em inglês prevalece.',
    intro:
      'Ao acessar e usar a HealthCheck, você concorda com estes Termos. Se você não concorda, não utilize o site.',
    serviceTitle: 'Descrição do serviço',
    serviceBody:
      'A HealthCheck fornece calculadoras informativas e conteúdo educacional relacionado a fitness, composição corporal e nutrição.',
    accountsTitle: 'Contas e resultados salvos',
    accountsP1:
      'Oferecemos criação de conta para salvar resultados. A autenticação é gerenciada pela Clerk, um provedor terceirizado seguro. Resultados salvos podem ficar armazenados localmente no navegador e, quando você está logado, sincronizados com nosso banco de dados para acesso em outros dispositivos.',
    accountsP2:
      'Você é responsável por proteger o acesso à sua conta e pela atividade associada ao uso do site.',
    adsTitle: 'Links de afiliados e publicidade',
    adsP1:
      'Algumas páginas contêm links de afiliados para produtos e serviços. Ao comprar por esses links, podemos receber uma pequena comissão sem custo extra para você. Participamos do programa Amazon Services LLC Associates.',
    adsP2:
      'Também exibimos anúncios via Google AdSense. Esses anúncios podem usar cookies para personalizar conteúdo. Recomendações de afiliados e anúncios não constituem endosso de tratamentos médicos ou produtos específicos.',
    acceptableUseTitle: 'Uso aceitável',
    acceptableUseItems: [
      'Não faça uso indevido, não interrompa e não tente acessar o serviço sem autorização.',
      'Não use o serviço para atividades ilegais.',
      'Não use as calculadoras como ferramentas de diagnóstico ou tratamento médico.',
    ],
    noMedicalTitle: 'Sem relação médica',
    noMedicalBody:
      'O uso da HealthCheck não cria uma relação médico-paciente. O conteúdo e os resultados das calculadoras são apenas estimativas educacionais.',
    liabilityTitle: 'Limitação de responsabilidade',
    liabilityBody:
      'Na máxima extensão permitida por lei, a HealthCheck e seus operadores não são responsáveis por perdas ou danos resultantes do uso do serviço ou da confiança no conteúdo do site.',
    contactTitle: 'Contato',
    contactBody: 'Dúvidas sobre estes termos: info@healthcalc.xyz',
  },
  zh: {
    metaTitle: '服务条款 | HealthCheck',
    metaDescription: 'HealthCheck 服务条款：使用我们的计算器与内容的规则说明。',
    pageTitle: '服务条款',
    lastUpdatedLabel: '更新日期：',
    lastUpdatedDate: '2026 年 2 月 6 日',
    translationNotice: '此翻译仅供参考。如有冲突，以英文版本为准。',
    intro: '访问并使用 HealthCheck 即表示你同意本条款。如不同意，请不要使用本网站。',
    serviceTitle: '服务说明',
    serviceBody: 'HealthCheck 提供与健身、体成分与营养相关的信息型计算器与教育内容。',
    accountsTitle: '账户与已保存结果',
    accountsP1:
      '我们提供账户用于保存计算结果。认证由安全的第三方服务 Clerk 管理。已保存结果可能存储在你的浏览器本地；当你登录时，也可能同步到我们的数据库，以便你在不同设备上访问。',
    accountsP2: '你需要负责保护账户访问权限，并对与你使用本网站相关的活动负责。',
    adsTitle: '联盟链接与广告',
    adsP1:
      '部分页面包含产品或服务的联盟链接。你通过这些链接购买时，我们可能获得少量佣金，你无需支付额外费用。我们参与 Amazon Services LLC Associates Program。',
    adsP2:
      '我们也通过 Google AdSense 展示广告。广告可能使用 cookies 来个性化内容。联盟推荐与广告不构成对特定医疗治疗或产品的背书。',
    acceptableUseTitle: '可接受使用',
    acceptableUseItems: [
      '不得滥用、干扰或尝试未经授权访问服务。',
      '不得将服务用于非法活动。',
      '不得将计算器作为医疗诊断或治疗工具。',
    ],
    noMedicalTitle: '不构成医疗关系',
    noMedicalBody: '使用 HealthCheck 不会形成医患关系。内容与计算结果仅为教育性的估算。',
    liabilityTitle: '责任限制',
    liabilityBody:
      '在法律允许的最大范围内，HealthCheck 及其运营方不对因使用本服务或依赖网站内容而产生的损失或损害承担责任。',
    contactTitle: '联系',
    contactBody: '关于本条款的问题：info@healthcalc.xyz',
  },
};

export async function generateMetadata({ params }: LocalizedTermsProps): Promise<Metadata> {
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

export default async function TermsPage({ params }: LocalizedTermsProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/terms');
  }

  const copy = COPY[locale] ?? COPY.en;

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold">{copy.pageTitle}</h1>

      <div className="neumorph mb-8 rounded-lg p-6">
        <p className="mb-4">
          <strong>{copy.lastUpdatedLabel}</strong> {copy.lastUpdatedDate}
        </p>
        {copy.translationNotice && (
          <p className="mb-4 text-sm text-gray-600">{copy.translationNotice}</p>
        )}
        <p>{copy.intro}</p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.serviceTitle}</h2>
        <p>{copy.serviceBody}</p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.accountsTitle}</h2>
        <p className="mb-3">{copy.accountsP1}</p>
        <p>{copy.accountsP2}</p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.adsTitle}</h2>
        <p className="mb-3">{copy.adsP1}</p>
        <p>{copy.adsP2}</p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.acceptableUseTitle}</h2>
        <ul className="list-disc space-y-2 pl-6">
          {copy.acceptableUseItems.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.noMedicalTitle}</h2>
        <p>{copy.noMedicalBody}</p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.liabilityTitle}</h2>
        <p>{copy.liabilityBody}</p>
      </div>

      <div className="neumorph rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.contactTitle}</h2>
        <p>{copy.contactBody}</p>
      </div>
    </div>
  );
}
