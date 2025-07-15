import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import EmbedWidgetPicker from '@/components/calculators/EmbedWidgetPicker';
import { getEmbedPartners, getEmbedShowcase } from '@/data/embedShowcase';
import {
  defaultLocale,
  isSupportedLocale,
  prefixPathWithLocale,
  type SupportedLocale,
} from '@/i18n/config';

interface LocalizedCalculatorWidgetsProps {
  params: Promise<{ locale: string }>;
}

type CalculatorWidgetsCopy = {
  metaTitle: string;
  metaDescription: string;
  breadcrumbLabel: string;
  pageTitle: string;
  intro: string;
  partnersTitle: string;
  partnersBody: string;
  guidelinesTitle: string;
  guidelinesItems: string[];
  guidelinesFooterPrefix: string;
  guidelinesFooterLink: string;
  guidelinesFooterSuffix: string;
  recentlyTitle: string;
  recentlyBody: string;
};

const COPY: Record<SupportedLocale, CalculatorWidgetsCopy> = {
  en: {
    metaTitle: 'Calculator Widgets | HealthCheck',
    metaDescription:
      'Embed HealthCheck calculators on your site with an attribution link. Request approval, copy the code, and go live.',
    breadcrumbLabel: 'Calculator Widgets',
    pageTitle: 'Calculator Widgets',
    intro:
      'Add HealthCheck calculators to your site and keep the attribution link included. We review embed requests to ensure quality placements and accurate context.',
    partnersTitle: 'Featured Embed Partners',
    partnersBody:
      'Trusted by coaches, bloggers, and wellness teams who embed HealthCheck calculators.',
    guidelinesTitle: 'Embed Guidelines',
    guidelinesItems: [
      'Keep the “Powered by HealthCheck” attribution link visible below the widget.',
      'Don’t modify the embed code beyond width/height adjustments.',
      'Use the calculator in context so readers understand the inputs and outputs.',
      'We reserve the right to revoke embed access for misleading use cases.',
    ],
    guidelinesFooterPrefix: 'By embedding a calculator, you agree to our ',
    guidelinesFooterLink: 'Embed Terms',
    guidelinesFooterSuffix: '.',
    recentlyTitle: 'Recently Embedded',
    recentlyBody:
      'A few examples of partners using HealthCheck calculators (submit yours to be featured).',
  },
  es: {
    metaTitle: 'Widgets de calculadoras | HealthCheck',
    metaDescription:
      'Incrusta calculadoras de HealthCheck en tu sitio con un enlace de atribución. Solicita aprobación, copia el código y publícalo.',
    breadcrumbLabel: 'Widgets de calculadoras',
    pageTitle: 'Widgets de calculadoras',
    intro:
      'Añade calculadoras de HealthCheck a tu sitio y mantén el enlace de atribución visible. Revisamos las solicitudes de inserción para asegurar ubicaciones de calidad y un contexto preciso.',
    partnersTitle: 'Socios destacados',
    partnersBody:
      'De confianza para entrenadores, bloggers y equipos de bienestar que incrustan calculadoras de HealthCheck.',
    guidelinesTitle: 'Pautas de inserción',
    guidelinesItems: [
      'Mantén visible el enlace de atribución “Powered by HealthCheck” debajo del widget.',
      'No modifiques el código de inserción más allá de ajustes de ancho/alto.',
      'Usa la calculadora con contexto para que los lectores entiendan entradas y resultados.',
      'Nos reservamos el derecho de revocar el acceso por usos engañosos.',
    ],
    guidelinesFooterPrefix: 'Al incrustar una calculadora, aceptas nuestros ',
    guidelinesFooterLink: 'Términos de inserción',
    guidelinesFooterSuffix: '.',
    recentlyTitle: 'Recientemente incrustados',
    recentlyBody:
      'Algunos ejemplos de socios que usan calculadoras de HealthCheck (envía el tuyo para aparecer).',
  },
  fr: {
    metaTitle: 'Widgets de calculateurs | HealthCheck',
    metaDescription:
      'Intégrez des calculateurs HealthCheck sur votre site avec un lien d’attribution. Demandez l’approbation, copiez le code et publiez.',
    breadcrumbLabel: 'Widgets de calculateurs',
    pageTitle: 'Widgets de calculateurs',
    intro:
      'Ajoutez des calculateurs HealthCheck à votre site tout en conservant le lien d’attribution. Nous examinons les demandes d’intégration afin d’assurer des placements de qualité et un contexte fiable.',
    partnersTitle: 'Partenaires mis en avant',
    partnersBody:
      'Adopté par des coachs, des blogueurs et des équipes bien-être qui intègrent des calculateurs HealthCheck.',
    guidelinesTitle: 'Consignes d’intégration',
    guidelinesItems: [
      'Gardez le lien d’attribution « Powered by HealthCheck » visible sous le widget.',
      'Ne modifiez pas le code d’intégration au-delà des ajustements de largeur/hauteur.',
      'Intégrez le calculateur dans un contenu pertinent afin que les lecteurs comprennent les entrées et les résultats.',
      'Nous nous réservons le droit de révoquer l’accès en cas d’usage trompeur.',
    ],
    guidelinesFooterPrefix: 'En intégrant un calculateur, vous acceptez nos ',
    guidelinesFooterLink: 'Conditions d’intégration',
    guidelinesFooterSuffix: '.',
    recentlyTitle: 'Récemment intégré',
    recentlyBody:
      'Quelques exemples de partenaires utilisant des calculateurs HealthCheck (soumettez le vôtre pour être mis en avant).',
  },
  de: {
    metaTitle: 'Rechner-Widgets | HealthCheck',
    metaDescription:
      'Binden Sie HealthCheck-Rechner mit einem Attributionslink auf Ihrer Website ein. Freigabe anfragen, Code kopieren und live gehen.',
    breadcrumbLabel: 'Rechner-Widgets',
    pageTitle: 'Rechner-Widgets',
    intro:
      'Fügen Sie HealthCheck-Rechner zu Ihrer Website hinzu und lassen Sie den Attributionslink sichtbar. Wir prüfen Einbettungsanfragen, um hochwertige Platzierungen und einen passenden Kontext sicherzustellen.',
    partnersTitle: 'Ausgewählte Einbettungspartner',
    partnersBody:
      'Genutzt von Coaches, Bloggern und Wellness-Teams, die HealthCheck-Rechner einbetten.',
    guidelinesTitle: 'Einbettungsrichtlinien',
    guidelinesItems: [
      'Lassen Sie den Attributionslink „Powered by HealthCheck“ unter dem Widget sichtbar.',
      'Ändern Sie den Einbettungscode nur für Breite-/Höhenanpassungen.',
      'Binden Sie den Rechner im passenden Kontext ein, damit Leser Eingaben und Ergebnisse verstehen.',
      'Wir behalten uns vor, den Einbettungszugang bei irreführender Nutzung zu widerrufen.',
    ],
    guidelinesFooterPrefix: 'Durch das Einbetten eines Rechners stimmen Sie unseren ',
    guidelinesFooterLink: 'Einbettungsbedingungen',
    guidelinesFooterSuffix: ' zu.',
    recentlyTitle: 'Kürzlich eingebettet',
    recentlyBody:
      'Einige Beispiele von Partnern, die HealthCheck-Rechner nutzen (reichen Sie Ihre Einbettung ein, um vorgestellt zu werden).',
  },
  pt: {
    metaTitle: 'Widgets de calculadoras | HealthCheck',
    metaDescription:
      'Incorpore calculadoras da HealthCheck no seu site com um link de atribuição. Solicite aprovação, copie o código e publique.',
    breadcrumbLabel: 'Widgets de calculadoras',
    pageTitle: 'Widgets de calculadoras',
    intro:
      'Adicione calculadoras da HealthCheck ao seu site e mantenha o link de atribuição visível. Revisamos solicitações de incorporação para garantir boas colocações e contexto adequado.',
    partnersTitle: 'Parceiros em destaque',
    partnersBody:
      'Usado por coaches, blogueiros e equipes de bem-estar que incorporam calculadoras da HealthCheck.',
    guidelinesTitle: 'Diretrizes de incorporação',
    guidelinesItems: [
      'Mantenha o link de atribuição “Powered by HealthCheck” visível abaixo do widget.',
      'Não modifique o código de incorporação além de ajustes de largura/altura.',
      'Use a calculadora com contexto para que os leitores entendam entradas e resultados.',
      'Reservamo-nos o direito de revogar o acesso em casos de uso enganoso.',
    ],
    guidelinesFooterPrefix: 'Ao incorporar uma calculadora, você concorda com nossos ',
    guidelinesFooterLink: 'Termos de incorporação',
    guidelinesFooterSuffix: '.',
    recentlyTitle: 'Incorporados recentemente',
    recentlyBody:
      'Alguns exemplos de parceiros usando calculadoras da HealthCheck (envie o seu para aparecer).',
  },
  zh: {
    metaTitle: '计算器小组件 | HealthCheck',
    metaDescription:
      '在你的网站中嵌入 HealthCheck 计算器，并保留署名链接。申请审核、复制代码并上线。',
    breadcrumbLabel: '计算器小组件',
    pageTitle: '计算器小组件',
    intro:
      '将 HealthCheck 计算器添加到你的网站，并保留署名链接。我们会审核嵌入申请，以确保优质展示与准确语境。',
    partnersTitle: '精选合作伙伴',
    partnersBody: '受到教练、博主与健康团队信赖并使用 HealthCheck 计算器嵌入。',
    guidelinesTitle: '嵌入指南',
    guidelinesItems: [
      '请在小组件下方保持 “Powered by HealthCheck” 署名链接可见。',
      '除宽度/高度调整外，请勿修改嵌入代码。',
      '在相关内容中使用计算器，确保读者理解输入与输出。',
      '如出现误导性使用，我们保留撤销嵌入权限的权利。',
    ],
    guidelinesFooterPrefix: '嵌入计算器即表示你同意我们的',
    guidelinesFooterLink: '嵌入条款',
    guidelinesFooterSuffix: '。',
    recentlyTitle: '最近嵌入',
    recentlyBody: '一些合作伙伴使用 HealthCheck 计算器的示例（提交你的站点以便展示）。',
  },
};

export async function generateMetadata({
  params,
}: LocalizedCalculatorWidgetsProps): Promise<Metadata> {
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

export default async function CalculatorWidgetsPage({ params }: LocalizedCalculatorWidgetsProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/calculator-widgets');
  }

  const copy = COPY[locale] ?? COPY.en;
  const [partners, showcase] = await Promise.all([getEmbedPartners(), getEmbedShowcase()]);

  return (
    <div className="max-w-5xl mx-auto">
      <Breadcrumb customItems={[{ name: copy.breadcrumbLabel, path: '/calculator-widgets' }]} />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{copy.pageTitle}</h1>
        <p className="text-slate-700 dark:text-slate-200/80">{copy.intro}</p>
      </div>

      <EmbedWidgetPicker />

      <div className="glass-panel rounded-3xl p-7 md:p-8 mt-8">
        <h2 className="text-xl font-semibold mb-2">{copy.partnersTitle}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{copy.partnersBody}</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
          {partners.map(partner => (
            <div key={partner.name} className="flex items-center justify-center">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={180}
                height={48}
                className="h-12 w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-7 md:p-8 mt-8">
        <h2 className="text-xl font-semibold mb-2">{copy.guidelinesTitle}</h2>
        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 space-y-2">
          {copy.guidelinesItems.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
          {copy.guidelinesFooterPrefix}
          <Link
            href={prefixPathWithLocale('/embed-terms', locale)}
            className="text-accent hover:underline"
          >
            {copy.guidelinesFooterLink}
          </Link>
          {copy.guidelinesFooterSuffix}
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-7 md:p-8 mt-8">
        <h2 className="text-xl font-semibold mb-2">{copy.recentlyTitle}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{copy.recentlyBody}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {showcase.map(item => (
            <div key={item.name} className="glass-panel-strong rounded-2xl p-5">
              <div className="text-sm font-semibold">{item.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {item.calculator}
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-400/80 mt-2">{item.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
