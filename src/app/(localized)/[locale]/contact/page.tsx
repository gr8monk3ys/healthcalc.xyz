import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import { defaultLocale, isSupportedLocale, type SupportedLocale } from '@/i18n/config';

interface LocalizedContactProps {
  params: Promise<{ locale: string }>;
}

type ContactCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  getInTouchTitle: string;
  getInTouchBody: string;
  infoTitle: string;
  infoEmailLabel: string;
  infoResponseTimeLabel: string;
  infoResponseTimeBody: string;
  faqTitle: string;
  faqs: Array<{ q: string; a: string }>;
};

const COPY: Record<SupportedLocale, ContactCopy> = {
  en: {
    metaTitle: 'Contact Us | HealthCheck',
    metaDescription: 'Get in touch with the HealthCheck team for questions, feedback, or support.',
    pageTitle: 'Contact Us',
    getInTouchTitle: 'Get in Touch',
    getInTouchBody:
      "Have questions, feedback, or suggestions? We'd love to hear from you! Fill out the form and we'll get back to you as soon as possible.",
    infoTitle: 'Contact Information',
    infoEmailLabel: 'Email',
    infoResponseTimeLabel: 'Response Time',
    infoResponseTimeBody: 'We aim to respond within 1-2 business days',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How accurate are your calculators?',
        a: 'Our calculators use scientifically validated formulas, but results should be considered estimates. For clinical accuracy, consult healthcare professionals.',
      },
      {
        q: 'Do you store my personal data?',
        a: "No, all calculations are performed locally in your browser. We don't store or transmit your personal measurement data to our servers.",
      },
      {
        q: 'Can I use your calculators for my clients?',
        a: 'Yes, fitness professionals are welcome to use our calculators with their clients. Please refer to our Terms of Service for commercial usage details.',
      },
      {
        q: 'I found a bug or have a feature request',
        a: 'Please use the contact form to report bugs or suggest features. We appreciate your feedback and continuously work to improve our calculators.',
      },
    ],
  },
  es: {
    metaTitle: 'Contáctanos | HealthCheck',
    metaDescription:
      'Ponte en contacto con el equipo de HealthCheck para preguntas, comentarios o soporte.',
    pageTitle: 'Contáctanos',
    getInTouchTitle: 'Ponte en contacto',
    getInTouchBody:
      '¿Tienes preguntas, comentarios o sugerencias? Nos encantará escucharte. Completa el formulario y te responderemos lo antes posible.',
    infoTitle: 'Información de contacto',
    infoEmailLabel: 'Correo electrónico',
    infoResponseTimeLabel: 'Tiempo de respuesta',
    infoResponseTimeBody: 'Intentamos responder en 1-2 días hábiles',
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Qué tan precisas son sus calculadoras?',
        a: 'Nuestras calculadoras usan fórmulas validadas científicamente, pero los resultados deben considerarse estimaciones. Para precisión clínica, consulta a profesionales de la salud.',
      },
      {
        q: '¿Almacenan mis datos personales?',
        a: 'No. Todos los cálculos se realizan localmente en tu navegador. No almacenamos ni transmitimos tus mediciones personales a nuestros servidores.',
      },
      {
        q: '¿Puedo usar sus calculadoras con mis clientes?',
        a: 'Sí. Los profesionales del fitness pueden usar nuestras calculadoras con sus clientes. Consulta nuestros Términos del servicio para detalles de uso comercial.',
      },
      {
        q: 'Encontré un error o tengo una solicitud de función',
        a: 'Usa el formulario de contacto para reportar errores o sugerir funciones. Agradecemos tus comentarios y trabajamos continuamente para mejorar nuestras calculadoras.',
      },
    ],
  },
  fr: {
    metaTitle: 'Contact | HealthCheck',
    metaDescription:
      'Contactez l’équipe HealthCheck pour des questions, des retours ou de l’assistance.',
    pageTitle: 'Contact',
    getInTouchTitle: 'Nous contacter',
    getInTouchBody:
      'Vous avez des questions, des retours ou des suggestions ? Nous serions ravis de vous lire. Remplissez le formulaire et nous vous répondrons dès que possible.',
    infoTitle: 'Informations de contact',
    infoEmailLabel: 'E-mail',
    infoResponseTimeLabel: 'Délai de réponse',
    infoResponseTimeBody: 'Nous répondons généralement sous 1 à 2 jours ouvrés',
    faqTitle: 'Questions fréquentes',
    faqs: [
      {
        q: 'Quelle est la précision de vos calculateurs ?',
        a: 'Nos calculateurs utilisent des formules validées scientifiquement, mais les résultats restent des estimations. Pour une précision clinique, consultez des professionnels de santé.',
      },
      {
        q: 'Stockez-vous mes données personnelles ?',
        a: 'Non. Tous les calculs sont effectués localement dans votre navigateur. Nous ne stockons ni ne transmettons vos mesures personnelles à nos serveurs.',
      },
      {
        q: 'Puis-je utiliser vos calculateurs avec mes clients ?',
        a: 'Oui. Les professionnels du fitness peuvent utiliser nos calculateurs avec leurs clients. Consultez nos Conditions d’utilisation pour les détails d’usage commercial.',
      },
      {
        q: 'J’ai trouvé un bug ou j’ai une demande de fonctionnalité',
        a: 'Utilisez le formulaire de contact pour signaler un bug ou suggérer une fonctionnalité. Merci pour vos retours, nous améliorons continuellement nos calculateurs.',
      },
    ],
  },
  de: {
    metaTitle: 'Kontakt | HealthCheck',
    metaDescription:
      'Kontaktieren Sie das HealthCheck-Team für Fragen, Feedback oder Unterstützung.',
    pageTitle: 'Kontakt',
    getInTouchTitle: 'Kontakt aufnehmen',
    getInTouchBody:
      'Haben Sie Fragen, Feedback oder Vorschläge? Wir freuen uns von Ihnen zu hören. Füllen Sie das Formular aus und wir melden uns so schnell wie möglich.',
    infoTitle: 'Kontaktinformationen',
    infoEmailLabel: 'E-Mail',
    infoResponseTimeLabel: 'Antwortzeit',
    infoResponseTimeBody: 'Wir antworten in der Regel innerhalb von 1-2 Werktagen',
    faqTitle: 'Häufige Fragen',
    faqs: [
      {
        q: 'Wie genau sind Ihre Rechner?',
        a: 'Unsere Rechner verwenden wissenschaftlich validierte Formeln, aber die Ergebnisse sind Schätzungen. Für klinische Genauigkeit wenden Sie sich an medizinisches Fachpersonal.',
      },
      {
        q: 'Speichern Sie meine persönlichen Daten?',
        a: 'Nein. Alle Berechnungen erfolgen lokal in Ihrem Browser. Wir speichern oder übertragen Ihre persönlichen Messdaten nicht an unsere Server.',
      },
      {
        q: 'Kann ich Ihre Rechner für meine Kunden verwenden?',
        a: 'Ja. Fitness-Profis können unsere Rechner mit ihren Kunden nutzen. Bitte beachten Sie unsere Nutzungsbedingungen für Details zur kommerziellen Nutzung.',
      },
      {
        q: 'Ich habe einen Bug gefunden oder habe einen Funktionswunsch',
        a: 'Bitte nutzen Sie das Kontaktformular, um Bugs zu melden oder Features vorzuschlagen. Wir schätzen Ihr Feedback und verbessern unsere Rechner kontinuierlich.',
      },
    ],
  },
  pt: {
    metaTitle: 'Contato | HealthCheck',
    metaDescription: 'Fale com a equipe da HealthCheck para dúvidas, feedback ou suporte.',
    pageTitle: 'Contato',
    getInTouchTitle: 'Fale com a gente',
    getInTouchBody:
      'Tem dúvidas, feedback ou sugestões? Vamos adorar ouvir você. Preencha o formulário e responderemos o mais rápido possível.',
    infoTitle: 'Informações de contato',
    infoEmailLabel: 'E-mail',
    infoResponseTimeLabel: 'Tempo de resposta',
    infoResponseTimeBody: 'Buscamos responder em até 1-2 dias úteis',
    faqTitle: 'Perguntas frequentes',
    faqs: [
      {
        q: 'Quão precisas são as calculadoras?',
        a: 'Nossas calculadoras usam fórmulas validadas cientificamente, mas os resultados devem ser considerados estimativas. Para precisão clínica, consulte profissionais de saúde.',
      },
      {
        q: 'Vocês armazenam meus dados pessoais?',
        a: 'Não. Todos os cálculos são feitos localmente no seu navegador. Não armazenamos nem transmitimos seus dados de medição pessoais para nossos servidores.',
      },
      {
        q: 'Posso usar as calculadoras com meus clientes?',
        a: 'Sim. Profissionais de fitness podem usar nossas calculadoras com seus clientes. Consulte nossos Termos de serviço para detalhes de uso comercial.',
      },
      {
        q: 'Encontrei um bug ou tenho uma solicitação de recurso',
        a: 'Use o formulário de contato para reportar bugs ou sugerir recursos. Agradecemos seu feedback e melhoramos nossas calculadoras continuamente.',
      },
    ],
  },
  zh: {
    metaTitle: '联系我们 | HealthCheck',
    metaDescription: '如有问题、反馈或需要支持，请联系 HealthCheck 团队。',
    pageTitle: '联系我们',
    getInTouchTitle: '与我们联系',
    getInTouchBody: '有问题、反馈或建议？我们很乐意听到你的声音。填写表单，我们会尽快回复。',
    infoTitle: '联系信息',
    infoEmailLabel: '邮箱',
    infoResponseTimeLabel: '响应时间',
    infoResponseTimeBody: '我们通常会在 1-2 个工作日内回复',
    faqTitle: '常见问题',
    faqs: [
      {
        q: '你们的计算器有多准确？',
        a: '我们的计算器使用经科学验证的公式，但结果应视为估算值。如需临床级准确性，请咨询医疗专业人士。',
      },
      {
        q: '你们会存储我的个人数据吗？',
        a: '不会。所有计算都在你的浏览器本地完成。我们不会在服务器端存储或传输你的个人测量数据。',
      },
      {
        q: '我可以把你们的计算器用于我的客户吗？',
        a: '可以。健身从业者可以将我们的计算器用于客户。商业用途细节请参考我们的服务条款。',
      },
      {
        q: '我发现了 bug 或有功能建议',
        a: '请使用联系表单报告 bug 或提出功能建议。感谢你的反馈，我们会持续改进计算器。',
      },
    ],
  },
};

export async function generateMetadata({ params }: LocalizedContactProps): Promise<Metadata> {
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

export default async function ContactPage({ params }: LocalizedContactProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/contact');
  }

  const copy = COPY[locale] ?? COPY.en;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{copy.pageTitle}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="neumorph p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{copy.getInTouchTitle}</h2>
          <p className="mb-6">{copy.getInTouchBody}</p>
          <ContactForm />
        </div>

        <div>
          <div className="neumorph p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">{copy.infoTitle}</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="h-5 w-5 text-accent"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{copy.infoEmailLabel}</p>
                  <p className="text-sm text-gray-600">info@healthcalc.xyz</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="h-5 w-5 text-accent"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{copy.infoResponseTimeLabel}</p>
                  <p className="text-sm text-gray-600">{copy.infoResponseTimeBody}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="neumorph p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{copy.faqTitle}</h2>
            <div className="space-y-4">
              {copy.faqs.map(item => (
                <div key={item.q}>
                  <h3 className="font-medium">{item.q}</h3>
                  <p className="text-sm text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
