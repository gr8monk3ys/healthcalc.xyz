import React from 'react';
import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import { notFound, redirect } from 'next/navigation';
import { defaultLocale, isSupportedLocale, type SupportedLocale } from '@/i18n/config';

interface LocalizedEmbedTermsProps {
  params: Promise<{ locale: string }>;
}

type EmbedTermsCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumbLabel: string;
  pageTitle: string;
  sections: Array<{ title: string; body: string }>;
};

const COPY: Record<SupportedLocale, EmbedTermsCopy> = {
  en: {
    metaTitle: 'Embed Terms | HealthCheck',
    metaDescription: 'Terms for embedding HealthCheck calculators on external websites.',
    breadcrumbLabel: 'Embed Terms',
    pageTitle: 'Embed Terms',
    sections: [
      {
        title: 'Attribution Required',
        body: 'All embedded calculators must display the “Powered by HealthCheck” attribution link directly beneath the widget. Removing or obscuring attribution is not permitted.',
      },
      {
        title: 'Allowed Modifications',
        body: 'You may adjust iframe width and height to fit your layout. You may not alter calculator content, branding, or functionality, or remove tracking parameters.',
      },
      {
        title: 'Accuracy & Context',
        body: 'Embed calculators in relevant content so users understand inputs and outputs. Avoid misleading placement or claims that imply medical advice.',
      },
      {
        title: 'Revocation',
        body: 'We reserve the right to revoke embed access if placements are misleading, violate terms, or damage user trust. We may also update widgets or attribution requirements at any time.',
      },
      {
        title: 'Contact',
        body: 'Questions about embeds or partnerships? Email us at info@healthcalc.xyz.',
      },
    ],
  },
  es: {
    metaTitle: 'Términos de inserción | HealthCheck',
    metaDescription: 'Términos para incrustar calculadoras de HealthCheck en sitios externos.',
    breadcrumbLabel: 'Términos de inserción',
    pageTitle: 'Términos de inserción',
    sections: [
      {
        title: 'Atribución obligatoria',
        body: 'Todas las calculadoras incrustadas deben mostrar el enlace de atribución “Powered by HealthCheck” directamente debajo del widget. No se permite eliminar ni ocultar la atribución.',
      },
      {
        title: 'Modificaciones permitidas',
        body: 'Puedes ajustar el ancho y la altura del iframe para adaptarlo a tu diseño. No puedes alterar el contenido, la marca o la funcionalidad del calculador, ni eliminar parámetros de seguimiento.',
      },
      {
        title: 'Precisión y contexto',
        body: 'Incrusta calculadoras en contenido relevante para que los usuarios entiendan las entradas y los resultados. Evita ubicaciones engañosas o afirmaciones que impliquen consejo médico.',
      },
      {
        title: 'Revocación',
        body: 'Nos reservamos el derecho de revocar el acceso de inserción si las ubicaciones son engañosas, violan los términos o dañan la confianza de los usuarios. También podemos actualizar los widgets o los requisitos de atribución en cualquier momento.',
      },
      {
        title: 'Contacto',
        body: '¿Preguntas sobre inserciones o colaboraciones? Escríbenos a info@healthcalc.xyz.',
      },
    ],
  },
  fr: {
    metaTitle: 'Conditions d’intégration | HealthCheck',
    metaDescription:
      'Conditions pour intégrer les calculateurs HealthCheck sur des sites externes.',
    breadcrumbLabel: 'Conditions d’intégration',
    pageTitle: 'Conditions d’intégration',
    sections: [
      {
        title: 'Attribution obligatoire',
        body: 'Tous les calculateurs intégrés doivent afficher le lien d’attribution « Powered by HealthCheck » directement sous le widget. Supprimer ou masquer l’attribution est interdit.',
      },
      {
        title: 'Modifications autorisées',
        body: 'Vous pouvez ajuster la largeur et la hauteur de l’iframe pour l’adapter à votre mise en page. Vous ne pouvez pas modifier le contenu, la marque ou la fonctionnalité du calculateur, ni supprimer des paramètres de suivi.',
      },
      {
        title: 'Précision et contexte',
        body: 'Intégrez les calculateurs dans un contenu pertinent afin que les utilisateurs comprennent les entrées et les résultats. Évitez les placements trompeurs ou les affirmations suggérant un avis médical.',
      },
      {
        title: 'Révocation',
        body: 'Nous nous réservons le droit de révoquer l’accès d’intégration si les placements sont trompeurs, enfreignent les conditions ou nuisent à la confiance. Nous pouvons également mettre à jour les widgets ou les exigences d’attribution à tout moment.',
      },
      {
        title: 'Contact',
        body: 'Des questions sur les intégrations ou les partenariats ? Écrivez-nous à info@healthcalc.xyz.',
      },
    ],
  },
  de: {
    metaTitle: 'Einbettungsbedingungen | HealthCheck',
    metaDescription:
      'Bedingungen für das Einbetten von HealthCheck-Rechnern auf externen Websites.',
    breadcrumbLabel: 'Einbettungsbedingungen',
    pageTitle: 'Einbettungsbedingungen',
    sections: [
      {
        title: 'Attribution erforderlich',
        body: 'Alle eingebetteten Rechner müssen den Attributionslink „Powered by HealthCheck“ direkt unter dem Widget anzeigen. Das Entfernen oder Verdecken der Attribution ist nicht erlaubt.',
      },
      {
        title: 'Erlaubte Änderungen',
        body: 'Sie dürfen die Breite und Höhe des iframes an Ihr Layout anpassen. Sie dürfen keine Inhalte, das Branding oder die Funktionalität verändern oder Tracking-Parameter entfernen.',
      },
      {
        title: 'Genauigkeit und Kontext',
        body: 'Betten Sie Rechner in relevante Inhalte ein, damit Nutzer Eingaben und Ausgaben verstehen. Vermeiden Sie irreführende Platzierungen oder Aussagen, die medizinische Beratung implizieren.',
      },
      {
        title: 'Widerruf',
        body: 'Wir behalten uns vor, den Einbettungszugang zu widerrufen, wenn Platzierungen irreführend sind, gegen Bedingungen verstoßen oder das Vertrauen der Nutzer beeinträchtigen. Wir können Widgets oder Attributionsanforderungen jederzeit aktualisieren.',
      },
      {
        title: 'Kontakt',
        body: 'Fragen zu Einbettungen oder Partnerschaften? Schreiben Sie uns an info@healthcalc.xyz.',
      },
    ],
  },
  pt: {
    metaTitle: 'Termos de incorporação | HealthCheck',
    metaDescription: 'Termos para incorporar calculadoras da HealthCheck em sites externos.',
    breadcrumbLabel: 'Termos de incorporação',
    pageTitle: 'Termos de incorporação',
    sections: [
      {
        title: 'Atribuição obrigatória',
        body: 'Todas as calculadoras incorporadas devem exibir o link de atribuição “Powered by HealthCheck” diretamente abaixo do widget. Não é permitido remover ou ocultar a atribuição.',
      },
      {
        title: 'Modificações permitidas',
        body: 'Você pode ajustar a largura e a altura do iframe para adequar ao seu layout. Não é permitido alterar conteúdo, marca ou funcionalidade da calculadora, nem remover parâmetros de rastreamento.',
      },
      {
        title: 'Precisão e contexto',
        body: 'Incorpore calculadoras em conteúdo relevante para que os usuários entendam entradas e saídas. Evite colocação enganosa ou afirmações que sugiram orientação médica.',
      },
      {
        title: 'Revogação',
        body: 'Reservamo-nos o direito de revogar o acesso de incorporação se as colocações forem enganosas, violarem os termos ou prejudicarem a confiança do usuário. Também podemos atualizar widgets ou requisitos de atribuição a qualquer momento.',
      },
      {
        title: 'Contato',
        body: 'Dúvidas sobre incorporação ou parcerias? Envie um email para info@healthcalc.xyz.',
      },
    ],
  },
  zh: {
    metaTitle: '嵌入条款 | HealthCheck',
    metaDescription: '在外部网站上嵌入 HealthCheck 计算器的条款。',
    breadcrumbLabel: '嵌入条款',
    pageTitle: '嵌入条款',
    sections: [
      {
        title: '必须署名',
        body: '所有嵌入的计算器都必须在小组件下方直接显示 “Powered by HealthCheck” 署名链接。禁止移除或遮挡署名信息。',
      },
      {
        title: '允许的修改',
        body: '你可以调整 iframe 的宽度和高度以适配页面布局。不得修改计算器内容、品牌或功能，也不得移除跟踪参数。',
      },
      {
        title: '准确性与语境',
        body: '请在相关内容中嵌入计算器，确保用户理解输入与输出。避免误导性位置或暗示提供医疗建议的表述。',
      },
      {
        title: '撤销',
        body: '如果嵌入位置具有误导性、违反条款或损害用户信任，我们保留撤销嵌入权限的权利。我们也可能随时更新小组件或署名要求。',
      },
      {
        title: '联系',
        body: '关于嵌入或合作有疑问？请邮件联系 info@healthcalc.xyz。',
      },
    ],
  },
};

export async function generateMetadata({ params }: LocalizedEmbedTermsProps): Promise<Metadata> {
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

export default async function EmbedTermsPage({ params }: LocalizedEmbedTermsProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/embed-terms');
  }

  const copy = COPY[locale] ?? COPY.en;

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumb customItems={[{ name: copy.breadcrumbLabel, path: '/embed-terms' }]} />

      <h1 className="text-3xl font-bold mb-6">{copy.pageTitle}</h1>

      <div className="space-y-6 text-sm text-gray-600">
        {copy.sections.map(section => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
