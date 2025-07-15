import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { defaultLocale, isSupportedLocale, type SupportedLocale } from '@/i18n/config';

interface LocalizedPrivacyProps {
  params: Promise<{ locale: string }>;
}

type PrivacyCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  translationNotice?: string;
  intro: string;
  collectTitle: string;
  collectItems: Array<{ label: string; text: string }>;
  useTitle: string;
  useItems: string[];
  storageTitle: string;
  storageP1: string;
  storageP2: string;
  thirdPartyTitle: string;
  thirdPartyBody: string;
  adsTitle: string;
  adsP1Prefix: string;
  adsP1LinkText: string;
  adsP1Suffix: string;
  adsP2: string;
  adsP3: string;
  cookiesTitle: string;
  cookiesP1: string;
  cookiesP2: string;
  contactTitle: string;
  contactBody: string;
};

const COPY: Record<SupportedLocale, PrivacyCopy> = {
  en: {
    metaTitle: 'Privacy Policy | HealthCheck',
    metaDescription:
      'HealthCheck privacy policy - how we handle your data and protect your privacy.',
    pageTitle: 'Privacy Policy',
    lastUpdatedLabel: 'Last Updated:',
    lastUpdatedDate: 'February 6, 2026',
    intro:
      'HealthCheck is designed to minimize personal data collection. Most calculator functionality runs directly in your browser.',
    collectTitle: 'What We Collect',
    collectItems: [
      {
        label: 'Calculator inputs/results',
        text: 'processed client-side in your browser. If you choose to save results while signed in, saved results are synced to our database so you can access them across devices.',
      },
      {
        label: 'Optional account data',
        text: 'if you create an account, your name and email are managed securely by our authentication provider (Clerk). We do not store passwords.',
      },
      {
        label: 'Form submissions',
        text: 'if you submit our contact form, newsletter signup, or an embed request, we receive the information you provide (such as name, email, message, website URL, and notes) to process your request.',
      },
      {
        label: 'Usage analytics',
        text: 'we may collect aggregate site usage data (e.g., page views, browser type, approximate location by IP) through analytics providers.',
      },
    ],
    useTitle: 'How We Use Information',
    useItems: [
      'To provide calculators and show results.',
      'To allow signed-in users to save calculator results for later.',
      'To respond to submissions and support requests.',
      'To improve website reliability, performance, and content quality.',
    ],
    storageTitle: 'Storage and Security',
    storageP1:
      'Account authentication is handled by Clerk, a secure third-party authentication provider. Your password is never stored on our servers or in your browser. Saved calculator results are stored locally in your browser for convenience and, when you are signed in, may be synced to our database so you can access them across devices.',
    storageP2:
      'If you share a device, other users of that browser profile may access locally stored saved result data.',
    thirdPartyTitle: 'Third-Party Services',
    thirdPartyBody:
      'We use third-party analytics and advertising tools. Their handling of data is governed by their own privacy policies.',
    adsTitle: 'Advertising and Affiliate Links',
    adsP1Prefix:
      'We display advertisements through Google AdSense, which may use cookies and similar technologies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising by visiting ',
    adsP1LinkText: "Google's Ads Settings",
    adsP1Suffix: '.',
    adsP2:
      'Some pages on this site contain affiliate links to products we recommend. When you purchase through these links, we may earn a small commission at no additional cost to you. This helps support our free health calculators and content.',
    adsP3:
      'We participate in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We only recommend products we believe will be valuable to our users.',
    cookiesTitle: 'Cookies',
    cookiesP1:
      'We use cookies and similar technologies for analytics, advertising, and to remember your preferences (such as dark mode and unit system settings). Third-party services like Google Analytics and Google AdSense may also set cookies.',
    cookiesP2:
      'You can manage cookie preferences through your browser settings. Disabling cookies may affect some site functionality.',
    contactTitle: 'Contact',
    contactBody: 'Questions about this policy: info@healthcalc.xyz',
  },
  es: {
    metaTitle: 'Política de privacidad | HealthCheck',
    metaDescription:
      'Política de privacidad de HealthCheck: cómo gestionamos tus datos y protegemos tu privacidad.',
    pageTitle: 'Política de privacidad',
    lastUpdatedLabel: 'Última actualización:',
    lastUpdatedDate: '6 de febrero de 2026',
    translationNotice:
      'Esta traducción se proporciona solo por conveniencia. En caso de conflicto, la versión en inglés prevalece.',
    intro:
      'HealthCheck está diseñado para minimizar la recopilación de datos personales. La mayoría de las funciones de las calculadoras se ejecutan directamente en tu navegador.',
    collectTitle: 'Qué recopilamos',
    collectItems: [
      {
        label: 'Entradas y resultados',
        text: 'se procesan en tu navegador. Si decides guardar resultados mientras estás conectado, los resultados guardados se sincronizan con nuestra base de datos para que puedas acceder a ellos desde varios dispositivos.',
      },
      {
        label: 'Datos de cuenta opcionales',
        text: 'si creas una cuenta, tu nombre y correo se gestionan de forma segura a través de nuestro proveedor de autenticación (Clerk). No almacenamos contraseñas.',
      },
      {
        label: 'Envíos de formularios',
        text: 'si envías nuestro formulario de contacto, suscripción al boletín o una solicitud de inserción, recibimos la información que proporcionas (por ejemplo: nombre, correo, mensaje, URL del sitio y notas) para procesar tu solicitud.',
      },
      {
        label: 'Analítica de uso',
        text: 'podemos recopilar datos agregados de uso del sitio (por ejemplo: páginas vistas, tipo de navegador, ubicación aproximada por IP) a través de proveedores de analítica.',
      },
    ],
    useTitle: 'Cómo usamos la información',
    useItems: [
      'Para ofrecer calculadoras y mostrar resultados.',
      'Para permitir que usuarios conectados guarden resultados para más tarde.',
      'Para responder a envíos y solicitudes de soporte.',
      'Para mejorar la fiabilidad, el rendimiento y la calidad del contenido.',
    ],
    storageTitle: 'Almacenamiento y seguridad',
    storageP1:
      'La autenticación de cuentas la gestiona Clerk, un proveedor externo seguro. Tu contraseña nunca se almacena en nuestros servidores ni en tu navegador. Los resultados guardados se almacenan localmente en tu navegador y, cuando estás conectado, también pueden sincronizarse con nuestra base de datos para que puedas acceder a ellos desde varios dispositivos.',
    storageP2:
      'Si compartes un dispositivo, otros usuarios de ese perfil del navegador pueden acceder a los resultados guardados localmente.',
    thirdPartyTitle: 'Servicios de terceros',
    thirdPartyBody:
      'Usamos herramientas de analítica y publicidad de terceros. El tratamiento de datos se rige por sus propias políticas de privacidad.',
    adsTitle: 'Publicidad y enlaces de afiliados',
    adsP1Prefix:
      'Mostramos anuncios mediante Google AdSense, que puede usar cookies y tecnologías similares para servir anuncios según tus visitas previas a este u otros sitios web. Puedes optar por no recibir publicidad personalizada visitando la ',
    adsP1LinkText: 'Configuración de anuncios de Google',
    adsP1Suffix: '.',
    adsP2:
      'Algunas páginas contienen enlaces de afiliados a productos que recomendamos. Si compras a través de estos enlaces, podemos ganar una pequeña comisión sin coste adicional para ti. Esto ayuda a mantener nuestras calculadoras y contenido gratuitos.',
    adsP3:
      'Participamos en el programa Amazon Services LLC Associates, un programa de afiliados diseñado para que los sitios ganen comisiones mediante publicidad y enlaces a Amazon.com. Solo recomendamos productos que creemos que serán valiosos para nuestros usuarios.',
    cookiesTitle: 'Cookies',
    cookiesP1:
      'Usamos cookies y tecnologías similares para analítica, publicidad y para recordar tus preferencias (como modo oscuro y sistema de unidades). Servicios de terceros como Google Analytics y Google AdSense también pueden establecer cookies.',
    cookiesP2:
      'Puedes gestionar las preferencias de cookies desde la configuración de tu navegador. Desactivar cookies puede afectar algunas funciones del sitio.',
    contactTitle: 'Contacto',
    contactBody: 'Preguntas sobre esta política: info@healthcalc.xyz',
  },
  fr: {
    metaTitle: 'Politique de confidentialité | HealthCheck',
    metaDescription:
      'Politique de confidentialité HealthCheck : comment nous gérons vos données et protégeons votre vie privée.',
    pageTitle: 'Politique de confidentialité',
    lastUpdatedLabel: 'Dernière mise à jour :',
    lastUpdatedDate: '6 février 2026',
    translationNotice:
      'Cette traduction est fournie à titre de commodité. En cas de conflit, la version anglaise prévaut.',
    intro:
      'HealthCheck est conçu pour limiter la collecte de données personnelles. La plupart des fonctionnalités des calculateurs s’exécutent directement dans votre navigateur.',
    collectTitle: 'Ce que nous collectons',
    collectItems: [
      {
        label: 'Saisies et résultats',
        text: 'traités côté client dans votre navigateur. Si vous choisissez d’enregistrer des résultats en étant connecté, ils sont synchronisés avec notre base de données pour un accès multi-appareils.',
      },
      {
        label: 'Données de compte (optionnelles)',
        text: 'si vous créez un compte, votre nom et votre e-mail sont gérés de manière sécurisée par notre fournisseur d’authentification (Clerk). Nous ne stockons pas de mots de passe.',
      },
      {
        label: 'Soumissions de formulaires',
        text: 'si vous envoyez notre formulaire de contact, l’inscription à la newsletter ou une demande d’intégration, nous recevons les informations fournies (nom, e-mail, message, URL du site, notes) pour traiter votre demande.',
      },
      {
        label: 'Analytique d’usage',
        text: 'nous pouvons collecter des données agrégées d’utilisation (pages vues, type de navigateur, localisation approximative par IP) via des fournisseurs d’analytique.',
      },
    ],
    useTitle: 'Comment nous utilisons les informations',
    useItems: [
      'Pour fournir les calculateurs et afficher les résultats.',
      'Pour permettre aux utilisateurs connectés d’enregistrer des résultats pour plus tard.',
      'Pour répondre aux soumissions et demandes d’assistance.',
      'Pour améliorer la fiabilité, les performances et la qualité du contenu.',
    ],
    storageTitle: 'Stockage et sécurité',
    storageP1:
      'L’authentification est gérée par Clerk, un fournisseur tiers sécurisé. Votre mot de passe n’est jamais stocké sur nos serveurs ni dans votre navigateur. Les résultats enregistrés sont stockés localement dans votre navigateur et, lorsque vous êtes connecté, peuvent aussi être synchronisés avec notre base de données pour un accès sur plusieurs appareils.',
    storageP2:
      'Si vous partagez un appareil, d’autres utilisateurs de ce profil de navigateur peuvent accéder aux résultats enregistrés localement.',
    thirdPartyTitle: 'Services tiers',
    thirdPartyBody:
      'Nous utilisons des outils tiers d’analytique et de publicité. Le traitement des données dépend de leurs propres politiques de confidentialité.',
    adsTitle: 'Publicité et liens d’affiliation',
    adsP1Prefix:
      'Nous affichons des publicités via Google AdSense, qui peut utiliser des cookies et des technologies similaires pour diffuser des annonces en fonction de vos visites précédentes sur ce site ou d’autres. Vous pouvez désactiver la personnalisation des annonces en visitant les ',
    adsP1LinkText: 'Paramètres des annonces Google',
    adsP1Suffix: '.',
    adsP2:
      'Certaines pages contiennent des liens d’affiliation vers des produits que nous recommandons. En achetant via ces liens, nous pouvons percevoir une petite commission sans coût supplémentaire pour vous. Cela aide à financer nos calculateurs et contenus gratuits.',
    adsP3:
      'Nous participons au programme Amazon Services LLC Associates, un programme d’affiliation permettant aux sites de gagner des commissions en faisant de la publicité et en créant des liens vers Amazon.com. Nous ne recommandons que des produits que nous jugeons utiles.',
    cookiesTitle: 'Cookies',
    cookiesP1:
      'Nous utilisons des cookies et des technologies similaires pour l’analytique, la publicité et pour mémoriser vos préférences (mode sombre, système d’unités). Des services tiers comme Google Analytics et Google AdSense peuvent également déposer des cookies.',
    cookiesP2:
      'Vous pouvez gérer les cookies via les paramètres de votre navigateur. La désactivation des cookies peut affecter certaines fonctionnalités du site.',
    contactTitle: 'Contact',
    contactBody: 'Questions sur cette politique : info@healthcalc.xyz',
  },
  de: {
    metaTitle: 'Datenschutzerklärung | HealthCheck',
    metaDescription:
      'Datenschutzerklärung von HealthCheck: wie wir Daten verarbeiten und Ihre Privatsphäre schützen.',
    pageTitle: 'Datenschutzerklärung',
    lastUpdatedLabel: 'Zuletzt aktualisiert:',
    lastUpdatedDate: '6. Februar 2026',
    translationNotice:
      'Diese Übersetzung dient nur der Information. Im Falle von Abweichungen gilt die englische Version.',
    intro:
      'HealthCheck ist darauf ausgelegt, so wenige personenbezogene Daten wie möglich zu erfassen. Die meisten Rechnerfunktionen laufen direkt in Ihrem Browser.',
    collectTitle: 'Was wir erfassen',
    collectItems: [
      {
        label: 'Eingaben und Ergebnisse',
        text: 'werden clientseitig in Ihrem Browser verarbeitet. Wenn Sie Ergebnisse speichern und angemeldet sind, werden gespeicherte Ergebnisse mit unserer Datenbank synchronisiert, damit Sie sie geräteübergreifend nutzen können.',
      },
      {
        label: 'Optionale Kontodaten',
        text: 'wenn Sie ein Konto erstellen, werden Name und E-Mail sicher über unseren Authentifizierungsanbieter (Clerk) verwaltet. Wir speichern keine Passwörter.',
      },
      {
        label: 'Formularübermittlungen',
        text: 'wenn Sie unser Kontaktformular, die Newsletter-Anmeldung oder eine Einbettungsanfrage senden, erhalten wir die von Ihnen bereitgestellten Informationen (z. B. Name, E-Mail, Nachricht, Website-URL und Notizen), um Ihre Anfrage zu bearbeiten.',
      },
      {
        label: 'Nutzungsanalyse',
        text: 'wir können aggregierte Nutzungsdaten (z. B. Seitenaufrufe, Browsertyp, ungefähre Standortdaten über IP) über Analyseanbieter erfassen.',
      },
    ],
    useTitle: 'Wie wir Informationen verwenden',
    useItems: [
      'Zur Bereitstellung der Rechner und Anzeige von Ergebnissen.',
      'Damit angemeldete Nutzer Ergebnisse speichern können.',
      'Zur Beantwortung von Anfragen und Supportfällen.',
      'Zur Verbesserung von Zuverlässigkeit, Performance und Inhaltsqualität.',
    ],
    storageTitle: 'Speicherung und Sicherheit',
    storageP1:
      'Die Kontoauthentifizierung erfolgt über Clerk, einen sicheren Drittanbieter. Ihr Passwort wird weder auf unseren Servern noch in Ihrem Browser gespeichert. Gespeicherte Ergebnisse werden lokal in Ihrem Browser abgelegt und können, wenn Sie angemeldet sind, zusätzlich mit unserer Datenbank synchronisiert werden, damit Sie sie auf mehreren Geräten abrufen können.',
    storageP2:
      'Wenn Sie ein Gerät teilen, können andere Nutzer dieses Browserprofils auf lokal gespeicherte Ergebnisse zugreifen.',
    thirdPartyTitle: 'Drittanbieter',
    thirdPartyBody:
      'Wir verwenden Analyse- und Werbetools von Drittanbietern. Deren Datenverarbeitung richtet sich nach den jeweiligen Datenschutzrichtlinien.',
    adsTitle: 'Werbung und Affiliate-Links',
    adsP1Prefix:
      'Wir zeigen Werbung über Google AdSense an. Dabei können Cookies und ähnliche Technologien verwendet werden, um Anzeigen basierend auf Ihren früheren Besuchen auf dieser oder anderen Websites auszuliefern. Sie können personalisierte Werbung deaktivieren, indem Sie die ',
    adsP1LinkText: 'Google-Anzeigeneinstellungen',
    adsP1Suffix: ' besuchen.',
    adsP2:
      'Einige Seiten enthalten Affiliate-Links zu Produkten, die wir empfehlen. Wenn Sie über diese Links kaufen, erhalten wir ggf. eine kleine Provision ohne zusätzliche Kosten für Sie. Das unterstützt unsere kostenlosen Rechner und Inhalte.',
    adsP3:
      'Wir nehmen am Amazon Services LLC Associates Program teil, einem Affiliate-Werbeprogramm, das Websites ermöglicht, Werbegebühren durch Werbung und Links zu Amazon.com zu verdienen. Wir empfehlen nur Produkte, die wir für nützlich halten.',
    cookiesTitle: 'Cookies',
    cookiesP1:
      'Wir verwenden Cookies und ähnliche Technologien für Analyse, Werbung und um Einstellungen zu speichern (z. B. Dark Mode und Einheitensystem). Drittanbieter wie Google Analytics und Google AdSense können ebenfalls Cookies setzen.',
    cookiesP2:
      'Sie können Cookie-Einstellungen über Ihren Browser verwalten. Das Deaktivieren von Cookies kann einige Funktionen beeinträchtigen.',
    contactTitle: 'Kontakt',
    contactBody: 'Fragen zu dieser Richtlinie: info@healthcalc.xyz',
  },
  pt: {
    metaTitle: 'Política de privacidade | HealthCheck',
    metaDescription:
      'Política de privacidade da HealthCheck: como lidamos com seus dados e protegemos sua privacidade.',
    pageTitle: 'Política de privacidade',
    lastUpdatedLabel: 'Última atualização:',
    lastUpdatedDate: '6 de fevereiro de 2026',
    translationNotice:
      'Esta tradução é fornecida apenas por conveniência. Em caso de conflito, a versão em inglês prevalece.',
    intro:
      'A HealthCheck foi projetada para minimizar a coleta de dados pessoais. A maior parte das calculadoras roda diretamente no seu navegador.',
    collectTitle: 'O que coletamos',
    collectItems: [
      {
        label: 'Entradas e resultados',
        text: 'processados no navegador (client-side). Se você optar por salvar resultados estando logado, os resultados salvos são sincronizados com nosso banco de dados para acesso em vários dispositivos.',
      },
      {
        label: 'Dados de conta (opcionais)',
        text: 'se você criar uma conta, seu nome e email são gerenciados de forma segura pelo nosso provedor de autenticação (Clerk). Não armazenamos senhas.',
      },
      {
        label: 'Envios de formulários',
        text: 'se você enviar o formulário de contato, inscrição na newsletter ou uma solicitação de incorporação, recebemos as informações fornecidas (como nome, email, mensagem, URL do site e notas) para processar sua solicitação.',
      },
      {
        label: 'Análise de uso',
        text: 'podemos coletar dados agregados de uso do site (por exemplo: páginas vistas, tipo de navegador, localização aproximada por IP) por meio de provedores de analytics.',
      },
    ],
    useTitle: 'Como usamos as informações',
    useItems: [
      'Para oferecer calculadoras e mostrar resultados.',
      'Para permitir que usuários logados salvem resultados para depois.',
      'Para responder a envios e solicitações de suporte.',
      'Para melhorar confiabilidade, desempenho e qualidade do conteúdo.',
    ],
    storageTitle: 'Armazenamento e segurança',
    storageP1:
      'A autenticação é feita pela Clerk, um provedor terceirizado seguro. Sua senha nunca é armazenada em nossos servidores nem no seu navegador. Resultados salvos ficam armazenados localmente no navegador e, quando você está logado, também podem ser sincronizados com nosso banco de dados para acesso em outros dispositivos.',
    storageP2:
      'Se você compartilha um dispositivo, outros usuários desse perfil do navegador podem acessar resultados salvos localmente.',
    thirdPartyTitle: 'Serviços de terceiros',
    thirdPartyBody:
      'Usamos ferramentas de analytics e publicidade de terceiros. O tratamento de dados é regido pelas políticas de privacidade desses provedores.',
    adsTitle: 'Publicidade e links de afiliados',
    adsP1Prefix:
      'Exibimos anúncios via Google AdSense, que pode usar cookies e tecnologias semelhantes para mostrar anúncios com base em visitas anteriores a este ou outros sites. Você pode desativar anúncios personalizados em ',
    adsP1LinkText: 'Configurações de anúncios do Google',
    adsP1Suffix: '.',
    adsP2:
      'Algumas páginas contêm links de afiliados para produtos que recomendamos. Ao comprar por esses links, podemos receber uma pequena comissão sem custo adicional para você. Isso ajuda a manter nossas calculadoras e conteúdos gratuitos.',
    adsP3:
      'Participamos do programa Amazon Services LLC Associates, um programa de afiliados que permite que sites ganhem comissões por meio de anúncios e links para a Amazon.com. Recomendamos apenas produtos que acreditamos serem úteis.',
    cookiesTitle: 'Cookies',
    cookiesP1:
      'Usamos cookies e tecnologias semelhantes para analytics, publicidade e para lembrar preferências (como modo escuro e sistema de unidades). Serviços de terceiros como Google Analytics e Google AdSense também podem definir cookies.',
    cookiesP2:
      'Você pode gerenciar cookies pelas configurações do navegador. Desativar cookies pode afetar algumas funcionalidades do site.',
    contactTitle: 'Contato',
    contactBody: 'Dúvidas sobre esta política: info@healthcalc.xyz',
  },
  zh: {
    metaTitle: '隐私政策 | HealthCheck',
    metaDescription: 'HealthCheck 隐私政策：我们如何处理数据并保护你的隐私。',
    pageTitle: '隐私政策',
    lastUpdatedLabel: '更新日期：',
    lastUpdatedDate: '2026 年 2 月 6 日',
    translationNotice: '此翻译仅供参考。如有冲突，以英文版本为准。',
    intro: 'HealthCheck 致力于尽量减少个人数据的收集。大多数计算器功能直接在你的浏览器中运行。',
    collectTitle: '我们收集什么',
    collectItems: [
      {
        label: '输入与结果',
        text: '在你的浏览器本地处理。如果你在登录状态下选择保存结果，已保存的结果会同步到我们的数据库，以便你在不同设备上访问。',
      },
      {
        label: '可选的账户信息',
        text: '如果你创建账户，你的姓名和邮箱由我们的认证服务提供商（Clerk）安全管理。我们不存储密码。',
      },
      {
        label: '表单提交',
        text: '如果你提交联系我们、订阅邮件或嵌入申请，我们会接收你提供的信息（如姓名、邮箱、消息、网站地址与备注）用于处理你的请求。',
      },
      {
        label: '使用分析',
        text: '我们可能通过分析服务收集聚合的站点使用数据（如页面浏览量、浏览器类型、基于 IP 的大致位置）。',
      },
    ],
    useTitle: '我们如何使用信息',
    useItems: [
      '提供计算器并展示结果。',
      '让登录用户保存结果以便日后查看。',
      '回应提交与支持请求。',
      '提升网站的稳定性、性能与内容质量。',
    ],
    storageTitle: '存储与安全',
    storageP1:
      '账户认证由安全的第三方服务 Clerk 负责。你的密码不会存储在我们的服务器或浏览器中。已保存的结果会保存在浏览器本地；当你登录时，这些结果也可能同步到我们的数据库，以便你在其他设备上访问。',
    storageP2: '如果你与他人共用设备，同一浏览器配置文件的其他用户可能访问本地保存的结果数据。',
    thirdPartyTitle: '第三方服务',
    thirdPartyBody: '我们使用第三方分析与广告工具。它们的数据处理方式以各自的隐私政策为准。',
    adsTitle: '广告与联盟链接',
    adsP1Prefix:
      '我们通过 Google AdSense 展示广告。AdSense 可能使用 cookies 等技术，根据你此前在本网站或其他网站的访问记录投放广告。你可以访问 ',
    adsP1LinkText: 'Google 广告设置',
    adsP1Suffix: ' 来关闭个性化广告。',
    adsP2:
      '本网站部分页面包含我们推荐产品的联盟链接。你通过这些链接购买时，我们可能获得少量佣金，你无需支付额外费用。这有助于支持我们免费提供计算器与内容。',
    adsP3:
      '我们参与 Amazon Services LLC Associates Program，这是一个联盟广告计划，允许网站通过推广并链接到 Amazon.com 来获得广告费用。我们只推荐我们认为对用户有价值的产品。',
    cookiesTitle: 'Cookies',
    cookiesP1:
      '我们使用 cookies 等技术用于分析、广告，以及记住你的偏好（如深色模式与单位系统）。Google Analytics 与 Google AdSense 等第三方服务也可能设置 cookies。',
    cookiesP2: '你可以在浏览器设置中管理 cookies。禁用 cookies 可能会影响部分功能。',
    contactTitle: '联系',
    contactBody: '关于本政策的问题：info@healthcalc.xyz',
  },
};

export async function generateMetadata({ params }: LocalizedPrivacyProps): Promise<Metadata> {
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

export default async function PrivacyPolicyPage({ params }: LocalizedPrivacyProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/privacy');
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
        <h2 className="mb-4 text-2xl font-semibold">{copy.collectTitle}</h2>
        <ul className="list-disc space-y-2 pl-6">
          {copy.collectItems.map(item => (
            <li key={item.label}>
              <strong>{item.label}:</strong> {item.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.useTitle}</h2>
        <ul className="list-disc space-y-2 pl-6">
          {copy.useItems.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.storageTitle}</h2>
        <p className="mb-3">{copy.storageP1}</p>
        <p>{copy.storageP2}</p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.thirdPartyTitle}</h2>
        <p>{copy.thirdPartyBody}</p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.adsTitle}</h2>
        <p className="mb-3">
          {copy.adsP1Prefix}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {copy.adsP1LinkText}
          </a>
          {copy.adsP1Suffix}
        </p>
        <p className="mb-3">{copy.adsP2}</p>
        <p>{copy.adsP3}</p>
      </div>

      <div className="neumorph mb-8 rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.cookiesTitle}</h2>
        <p className="mb-3">{copy.cookiesP1}</p>
        <p>{copy.cookiesP2}</p>
      </div>

      <div className="neumorph rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.contactTitle}</h2>
        <p>{copy.contactBody}</p>
      </div>
    </div>
  );
}
