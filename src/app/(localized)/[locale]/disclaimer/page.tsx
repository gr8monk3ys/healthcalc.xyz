import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { defaultLocale, isSupportedLocale, type SupportedLocale } from '@/i18n/config';

interface LocalizedDisclaimerProps {
  params: Promise<{ locale: string }>;
}

type DisclaimerCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  translationNotice?: string;
  intro: string;
  sections: Array<{ title: string; body: string }>;
  contactTitle: string;
  contactBody: string;
};

const COPY: Record<SupportedLocale, DisclaimerCopy> = {
  en: {
    metaTitle: 'Medical Disclaimer | HealthCheck',
    metaDescription: 'Important medical disclaimer for HealthCheck calculators and content.',
    pageTitle: 'Medical Disclaimer',
    lastUpdatedLabel: 'Last Updated:',
    lastUpdatedDate: 'February 6, 2026',
    intro:
      'HealthCheck content and calculators are for informational and educational use only and are not medical advice.',
    sections: [
      {
        title: 'Not a Substitute for Professional Care',
        body: 'Always consult a qualified healthcare professional for diagnosis, treatment, and health decisions. Do not delay care based on calculator results.',
      },
      {
        title: 'Results Are Estimates',
        body: 'Calculator outputs are model-based estimates and depend on your inputs. Individual biology, medical history, and testing method differences can cause significant variation. For clinical-grade assessment, seek professional evaluation and validated medical tests.',
      },
      {
        title: 'Use at Your Own Risk',
        body: 'Any decisions about diet, exercise, supplementation, or medication should be made with a licensed professional. You assume responsibility for how you use this information.',
      },
    ],
    contactTitle: 'Contact',
    contactBody: 'Questions about this disclaimer: info@healthcalc.xyz',
  },
  es: {
    metaTitle: 'Aviso médico | HealthCheck',
    metaDescription:
      'Aviso médico importante sobre las calculadoras y el contenido de HealthCheck.',
    pageTitle: 'Aviso médico',
    lastUpdatedLabel: 'Última actualización:',
    lastUpdatedDate: '6 de febrero de 2026',
    translationNotice:
      'Esta traducción se proporciona solo por conveniencia. En caso de conflicto, la versión en inglés prevalece.',
    intro:
      'El contenido y las calculadoras de HealthCheck son solo para fines informativos y educativos; no constituyen consejo médico.',
    sections: [
      {
        title: 'No sustituye la atención profesional',
        body: 'Consulta siempre con un profesional de la salud cualificado para diagnósticos, tratamientos y decisiones relacionadas con tu salud. No retrases la atención médica basándote en resultados de calculadoras.',
      },
      {
        title: 'Los resultados son estimaciones',
        body: 'Los resultados son estimaciones basadas en modelos y dependen de tus entradas. La biología individual, el historial médico y diferencias en métodos de medición pueden causar variaciones significativas. Para una evaluación clínica, busca atención profesional y pruebas médicas validadas.',
      },
      {
        title: 'Uso bajo tu responsabilidad',
        body: 'Cualquier decisión sobre dieta, ejercicio, suplementos o medicación debe tomarse con un profesional autorizado. Tú asumes la responsabilidad del uso de esta información.',
      },
    ],
    contactTitle: 'Contacto',
    contactBody: 'Preguntas sobre este aviso: info@healthcalc.xyz',
  },
  fr: {
    metaTitle: 'Avertissement médical | HealthCheck',
    metaDescription:
      'Avertissement médical important concernant les calculateurs et le contenu de HealthCheck.',
    pageTitle: 'Avertissement médical',
    lastUpdatedLabel: 'Dernière mise à jour :',
    lastUpdatedDate: '6 février 2026',
    translationNotice:
      'Cette traduction est fournie à titre de commodité. En cas de conflit, la version anglaise prévaut.',
    intro:
      'Le contenu et les calculateurs HealthCheck sont fournis à des fins d’information et d’éducation uniquement et ne constituent pas un avis médical.',
    sections: [
      {
        title: 'Ne remplace pas un professionnel de santé',
        body: 'Consultez toujours un professionnel de santé qualifié pour le diagnostic, le traitement et les décisions liées à votre santé. Ne retardez pas des soins sur la base des résultats des calculateurs.',
      },
      {
        title: 'Les résultats sont des estimations',
        body: 'Les résultats sont des estimations basées sur des modèles et dépendent de vos saisies. La biologie individuelle, l’historique médical et les méthodes de mesure peuvent entraîner des variations importantes. Pour une évaluation clinique, consultez un professionnel et réalisez des examens validés.',
      },
      {
        title: 'Utilisation à vos risques',
        body: 'Toute décision concernant l’alimentation, l’exercice, les compléments ou les médicaments doit être prise avec un professionnel habilité. Vous assumez la responsabilité de l’usage de ces informations.',
      },
    ],
    contactTitle: 'Contact',
    contactBody: 'Questions sur cet avertissement : info@healthcalc.xyz',
  },
  de: {
    metaTitle: 'Medizinischer Hinweis | HealthCheck',
    metaDescription:
      'Wichtiger medizinischer Hinweis zu den Rechnern und Inhalten von HealthCheck.',
    pageTitle: 'Medizinischer Hinweis',
    lastUpdatedLabel: 'Zuletzt aktualisiert:',
    lastUpdatedDate: '6. Februar 2026',
    translationNotice:
      'Diese Übersetzung dient nur der Information. Im Falle von Abweichungen gilt die englische Version.',
    intro:
      'Inhalte und Rechner von HealthCheck dienen ausschließlich Informations- und Bildungszwecken und stellen keine medizinische Beratung dar.',
    sections: [
      {
        title: 'Kein Ersatz für professionelle Behandlung',
        body: 'Wenden Sie sich für Diagnose, Behandlung und Gesundheitsentscheidungen stets an qualifiziertes medizinisches Fachpersonal. Verzögern Sie keine Behandlung aufgrund von Rechnerergebnissen.',
      },
      {
        title: 'Ergebnisse sind Schätzungen',
        body: 'Rechnerausgaben sind modellbasierte Schätzungen und hängen von Ihren Eingaben ab. Individuelle Biologie, Krankengeschichte und Messmethoden können zu erheblichen Abweichungen führen. Für klinische Bewertungen sollten Sie eine professionelle Beurteilung und validierte medizinische Tests in Anspruch nehmen.',
      },
      {
        title: 'Nutzung auf eigenes Risiko',
        body: 'Entscheidungen zu Ernährung, Training, Supplementen oder Medikamenten sollten mit einer zugelassenen Fachkraft getroffen werden. Sie tragen die Verantwortung dafür, wie Sie diese Informationen verwenden.',
      },
    ],
    contactTitle: 'Kontakt',
    contactBody: 'Fragen zu diesem Hinweis: info@healthcalc.xyz',
  },
  pt: {
    metaTitle: 'Aviso médico | HealthCheck',
    metaDescription: 'Aviso médico importante sobre as calculadoras e o conteúdo da HealthCheck.',
    pageTitle: 'Aviso médico',
    lastUpdatedLabel: 'Última atualização:',
    lastUpdatedDate: '6 de fevereiro de 2026',
    translationNotice:
      'Esta tradução é fornecida apenas por conveniência. Em caso de conflito, a versão em inglês prevalece.',
    intro:
      'O conteúdo e as calculadoras da HealthCheck são apenas informativos e educacionais e não constituem aconselhamento médico.',
    sections: [
      {
        title: 'Não substitui cuidados profissionais',
        body: 'Consulte sempre um profissional de saúde qualificado para diagnóstico, tratamento e decisões de saúde. Não adie cuidados com base em resultados de calculadoras.',
      },
      {
        title: 'Resultados são estimativas',
        body: 'Os resultados são estimativas baseadas em modelos e dependem das suas entradas. Biologia individual, histórico médico e métodos de medição podem causar variações significativas. Para avaliação clínica, procure atendimento profissional e exames médicos validados.',
      },
      {
        title: 'Use por sua conta e risco',
        body: 'Qualquer decisão sobre dieta, exercícios, suplementos ou medicamentos deve ser tomada com um profissional habilitado. Você assume a responsabilidade pelo uso dessas informações.',
      },
    ],
    contactTitle: 'Contato',
    contactBody: 'Dúvidas sobre este aviso: info@healthcalc.xyz',
  },
  zh: {
    metaTitle: '医疗免责声明 | HealthCheck',
    metaDescription: 'HealthCheck 计算器与内容的重要医疗免责声明。',
    pageTitle: '医疗免责声明',
    lastUpdatedLabel: '更新日期：',
    lastUpdatedDate: '2026 年 2 月 6 日',
    translationNotice: '此翻译仅供参考。如有冲突，以英文版本为准。',
    intro: 'HealthCheck 的内容与计算器仅用于信息与教育目的，不构成医疗建议。',
    sections: [
      {
        title: '不替代专业医疗服务',
        body: '请始终咨询合格的医疗专业人士以进行诊断、治疗与健康决策。不要仅依据计算器结果而延误就医。',
      },
      {
        title: '结果为估算值',
        body: '计算器输出为基于模型的估算，取决于你的输入。个体差异、病史与检测方法差异可能导致显著偏差。如需临床级评估，请寻求专业评估并进行经过验证的医学检测。',
      },
      {
        title: '风险自担',
        body: '有关饮食、运动、补充剂或药物的任何决定都应与持证专业人士共同做出。你需对如何使用这些信息承担责任。',
      },
    ],
    contactTitle: '联系',
    contactBody: '关于本免责声明的问题：info@healthcalc.xyz',
  },
};

export async function generateMetadata({ params }: LocalizedDisclaimerProps): Promise<Metadata> {
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

export default async function DisclaimerPage({ params }: LocalizedDisclaimerProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/disclaimer');
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

      {copy.sections.map(section => (
        <div key={section.title} className="neumorph mb-8 rounded-lg p-6">
          <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
          <p>{section.body}</p>
        </div>
      ))}

      <div className="neumorph rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold">{copy.contactTitle}</h2>
        <p>{copy.contactBody}</p>
      </div>
    </div>
  );
}
