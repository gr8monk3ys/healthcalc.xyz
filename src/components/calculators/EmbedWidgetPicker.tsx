'use client';

import React, { useMemo, useState } from 'react';
import { CALCULATOR_CATALOG } from '@/constants/calculatorCatalog';
import { buildEmbedCode } from '@/utils/embed';
import { toAbsoluteUrl } from '@/lib/site';
import { useLocale } from '@/context/LocaleContext';
import type { SupportedLocale } from '@/i18n/config';

const DEFAULT_HEIGHT = 680;

type EmbedWidgetStrings = {
  title: string;
  subtitle: string;
  copyCode: string;
  copied: string;
  labelCalculator: string;
  labelHeight: string;
  labelEmbedCode: string;
  labelLivePreview: string;
  requestTitle: string;
  labelName: string;
  placeholderName: string;
  labelEmail: string;
  placeholderEmail: string;
  labelWebsite: string;
  placeholderWebsite: string;
  labelNotes: string;
  placeholderNotes: string;
  submit: string;
  sending: string;
  reviewNote: string;
  success: string;
  error: string;
  previewSuffix: string;
};

function getEmbedWidgetStrings(locale: SupportedLocale): EmbedWidgetStrings {
  switch (locale) {
    case 'es':
      return {
        title: 'Incrusta calculadoras de HealthCheck',
        subtitle:
          'Elige una calculadora, copia el código de inserción y mantén el enlace de atribución.',
        copyCode: 'Copiar código de inserción',
        copied: '¡Copiado!',
        labelCalculator: 'Calculadora',
        labelHeight: 'Altura (px)',
        labelEmbedCode: 'Código de inserción',
        labelLivePreview: 'Vista previa',
        requestTitle: 'Solicitar aprobación de inserción',
        labelName: 'Nombre',
        placeholderName: 'Tu nombre',
        labelEmail: 'Correo',
        placeholderEmail: 'tu@ejemplo.com',
        labelWebsite: 'URL del sitio web',
        placeholderWebsite: 'https://ejemplo.com',
        labelNotes: 'Notas (opcional)',
        placeholderNotes: 'Cuéntanos cómo planeas usar la inserción.',
        submit: 'Solicitar aprobación',
        sending: 'Enviando...',
        reviewNote: 'Revisamos solicitudes en 1 a 2 días hábiles.',
        success: 'Solicitud enviada. Te contactaremos por correo.',
        error: 'Algo salió mal. Inténtalo de nuevo o escríbenos por correo.',
        previewSuffix: 'vista previa',
      };
    case 'fr':
      return {
        title: 'Intégrer les calculateurs HealthCheck',
        subtitle:
          'Choisissez un calculateur, copiez le code d’intégration et conservez le lien d’attribution.',
        copyCode: 'Copier le code d’intégration',
        copied: 'Copié !',
        labelCalculator: 'Calculateur',
        labelHeight: 'Hauteur (px)',
        labelEmbedCode: 'Code d’intégration',
        labelLivePreview: 'Aperçu',
        requestTitle: 'Demander l’approbation d’intégration',
        labelName: 'Nom',
        placeholderName: 'Votre nom',
        labelEmail: 'E-mail',
        placeholderEmail: 'vous@exemple.com',
        labelWebsite: 'URL du site',
        placeholderWebsite: 'https://exemple.com',
        labelNotes: 'Notes (facultatif)',
        placeholderNotes: 'Dites-nous comment vous comptez utiliser l’intégration.',
        submit: 'Demander l’approbation',
        sending: 'Envoi...',
        reviewNote: 'Nous examinons les demandes sous 1 à 2 jours ouvrés.',
        success: 'Demande envoyée. Nous vous répondrons par e-mail.',
        error: 'Une erreur s’est produite. Réessayez ou contactez-nous par e-mail.',
        previewSuffix: 'aperçu',
      };
    case 'de':
      return {
        title: 'HealthCheck-Rechner einbetten',
        subtitle:
          'Wählen Sie einen Rechner, kopieren Sie den Einbettungscode und lassen Sie den Attributionslink sichtbar.',
        copyCode: 'Einbettungscode kopieren',
        copied: 'Kopiert!',
        labelCalculator: 'Rechner',
        labelHeight: 'Höhe (px)',
        labelEmbedCode: 'Einbettungscode',
        labelLivePreview: 'Vorschau',
        requestTitle: 'Einbettungsfreigabe anfordern',
        labelName: 'Name',
        placeholderName: 'Ihr Name',
        labelEmail: 'E-Mail',
        placeholderEmail: 'sie@beispiel.de',
        labelWebsite: 'Website-URL',
        placeholderWebsite: 'https://beispiel.de',
        labelNotes: 'Notizen (optional)',
        placeholderNotes: 'Beschreiben Sie kurz, wie Sie das Embed nutzen möchten.',
        submit: 'Freigabe anfordern',
        sending: 'Senden...',
        reviewNote: 'Wir prüfen Anfragen innerhalb von 1-2 Werktagen.',
        success: 'Anfrage gesendet. Wir melden uns per E-Mail.',
        error:
          'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns per E-Mail.',
        previewSuffix: 'vorschau',
      };
    case 'pt':
      return {
        title: 'Incorporar calculadoras da HealthCheck',
        subtitle:
          'Escolha uma calculadora, copie o código de incorporação e mantenha o link de atribuição.',
        copyCode: 'Copiar código de incorporação',
        copied: 'Copiado!',
        labelCalculator: 'Calculadora',
        labelHeight: 'Altura (px)',
        labelEmbedCode: 'Código de incorporação',
        labelLivePreview: 'Pré-visualização',
        requestTitle: 'Solicitar aprovação de incorporação',
        labelName: 'Nome',
        placeholderName: 'Seu nome',
        labelEmail: 'Email',
        placeholderEmail: 'voce@exemplo.com',
        labelWebsite: 'URL do site',
        placeholderWebsite: 'https://exemplo.com',
        labelNotes: 'Observações (opcional)',
        placeholderNotes: 'Conte como você pretende usar a incorporação.',
        submit: 'Solicitar aprovação',
        sending: 'Enviando...',
        reviewNote: 'Analisamos solicitações em 1 a 2 dias úteis.',
        success: 'Solicitação enviada. Vamos responder por email.',
        error: 'Algo deu errado. Tente novamente ou fale conosco por email.',
        previewSuffix: 'prévia',
      };
    case 'zh':
      return {
        title: '嵌入 HealthCheck 计算器',
        subtitle: '选择一个计算器，复制嵌入代码，并保留署名链接。',
        copyCode: '复制嵌入代码',
        copied: '已复制',
        labelCalculator: '计算器',
        labelHeight: '高度（px）',
        labelEmbedCode: '嵌入代码',
        labelLivePreview: '实时预览',
        requestTitle: '申请嵌入审核',
        labelName: '姓名',
        placeholderName: '你的姓名',
        labelEmail: '邮箱',
        placeholderEmail: 'you@example.com',
        labelWebsite: '网站地址',
        placeholderWebsite: 'https://example.com',
        labelNotes: '备注（可选）',
        placeholderNotes: '告诉我们你打算如何使用嵌入。',
        submit: '提交申请',
        sending: '发送中...',
        reviewNote: '我们会在 1-2 个工作日内审核。',
        success: '申请已发送，我们会通过邮件联系你。',
        error: '出了点问题。请重试或直接发邮件联系我们。',
        previewSuffix: '预览',
      };
    case 'en':
    default:
      return {
        title: 'Embed HealthCheck Calculators',
        subtitle:
          'Choose a calculator, copy the embed code, and keep the attribution link included.',
        copyCode: 'Copy Embed Code',
        copied: 'Copied!',
        labelCalculator: 'Calculator',
        labelHeight: 'Height (px)',
        labelEmbedCode: 'Embed Code',
        labelLivePreview: 'Live Preview',
        requestTitle: 'Request Embed Approval',
        labelName: 'Name',
        placeholderName: 'Your name',
        labelEmail: 'Email',
        placeholderEmail: 'you@example.com',
        labelWebsite: 'Website URL',
        placeholderWebsite: 'https://example.com',
        labelNotes: 'Notes (optional)',
        placeholderNotes: 'Tell us how you plan to use the embed.',
        submit: 'Request Approval',
        sending: 'Sending...',
        reviewNote: 'We review requests within 1-2 business days.',
        success: 'Request sent. We’ll follow up by email.',
        error: 'Something went wrong. Please try again or email us directly.',
        previewSuffix: 'preview',
      };
  }
}

function useEmbedWidgetPickerState() {
  const [selectedSlug, setSelectedSlug] = useState(CALCULATOR_CATALOG[0]?.slug ?? 'bmi');
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [copied, setCopied] = useState(false);
  const [requestName, setRequestName] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [requestSite, setRequestSite] = useState('');
  const [requestNotes, setRequestNotes] = useState('');
  const [websiteConfirm, setWebsiteConfirm] = useState('');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  );

  return {
    selectedSlug,
    setSelectedSlug,
    height,
    setHeight,
    copied,
    setCopied,
    requestName,
    setRequestName,
    requestEmail,
    setRequestEmail,
    requestSite,
    setRequestSite,
    requestNotes,
    setRequestNotes,
    websiteConfirm,
    setWebsiteConfirm,
    requestStatus,
    setRequestStatus,
  };
}
export default function EmbedWidgetPicker() {
  const { locale, localizePath } = useLocale();
  const strings = getEmbedWidgetStrings(locale);
  const {
    selectedSlug,
    setSelectedSlug,
    height,
    setHeight,
    copied,
    setCopied,
    requestName,
    setRequestName,
    requestEmail,
    setRequestEmail,
    requestSite,
    setRequestSite,
    requestNotes,
    setRequestNotes,
    websiteConfirm,
    setWebsiteConfirm,
    requestStatus,
    setRequestStatus,
  } = useEmbedWidgetPickerState();

  const selectedCalculator = useMemo(
    () => CALCULATOR_CATALOG.find(item => item.slug === selectedSlug),
    [selectedSlug]
  );

  const embedCode = useMemo(() => {
    if (!selectedCalculator) {
      return '';
    }
    return buildEmbedCode({
      slug: selectedCalculator.slug,
      title: selectedCalculator.title,
      height,
    });
  }, [height, selectedCalculator]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleRequestSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedCalculator) {
      return;
    }

    if (websiteConfirm) {
      setRequestStatus('error');
      return;
    }

    setRequestStatus('sending');

    try {
      const response = await fetch('/api/embed-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: requestName,
          email: requestEmail,
          website: requestSite,
          calculator: selectedCalculator.title,
          calculatorSlug: selectedCalculator.slug,
          notes: requestNotes,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setRequestStatus('success');
      setRequestNotes('');
    } catch {
      setRequestStatus('error');
    }
  };

  return (
    <section className="glass-panel-strong rounded-3xl p-7 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{strings.title}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">{strings.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="ui-btn-soft text-sm"
          disabled={!embedCode}
        >
          {copied ? strings.copied : strings.copyCode}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="embed-calculator">
            {strings.labelCalculator}
          </label>
          <select
            id="embed-calculator"
            className="ui-select w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
            value={selectedSlug}
            onChange={event => setSelectedSlug(event.target.value)}
          >
            {CALCULATOR_CATALOG.map(calculator => (
              <option key={calculator.slug} value={calculator.slug}>
                {calculator.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="embed-height">
            {strings.labelHeight}
          </label>
          <input
            id="embed-height"
            type="number"
            min={420}
            max={1400}
            value={height}
            onChange={event => setHeight(Number(event.target.value))}
            className="ui-input w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-1" htmlFor="embed-code">
            {strings.labelEmbedCode}
          </label>
          <textarea
            id="embed-code"
            readOnly
            className="ui-textarea w-full h-32 p-3 text-xs font-mono"
            value={embedCode}
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-1" htmlFor="embed-preview">
            {strings.labelLivePreview}
          </label>
          <div className="glass-panel rounded-2xl p-4">
            <iframe
              id="embed-preview"
              src={toAbsoluteUrl(`${localizePath(`/${selectedSlug}`)}?embed=1`)}
              title={`${selectedCalculator?.title ?? strings.labelCalculator} ${strings.previewSuffix}`}
              className="w-full"
              style={{ height: `${height}px`, border: 0 }}
              loading="lazy"
              sandbox="allow-forms allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>

      <div className="mt-7 border-t border-slate-200/70 dark:border-slate-700/60 pt-7">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
          {strings.requestTitle}
        </h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleRequestSubmit}>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="embed-request-website-confirm">Website (leave blank)</label>
            <input
              id="embed-request-website-confirm"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={websiteConfirm}
              onChange={event => setWebsiteConfirm(event.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="embed-request-name">
              {strings.labelName}
            </label>
            <input
              id="embed-request-name"
              type="text"
              className="ui-input w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder={strings.placeholderName}
              value={requestName}
              onChange={event => setRequestName(event.target.value)}
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="embed-request-email">
              {strings.labelEmail}
            </label>
            <input
              id="embed-request-email"
              type="email"
              className="ui-input w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder={strings.placeholderEmail}
              value={requestEmail}
              onChange={event => setRequestEmail(event.target.value)}
              autoComplete="email"
              inputMode="email"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="embed-request-site">
              {strings.labelWebsite}
            </label>
            <input
              id="embed-request-site"
              type="url"
              className="ui-input w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder={strings.placeholderWebsite}
              value={requestSite}
              onChange={event => setRequestSite(event.target.value)}
              autoComplete="url"
              inputMode="url"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="embed-request-notes">
              {strings.labelNotes}
            </label>
            <textarea
              id="embed-request-notes"
              rows={3}
              className="ui-textarea w-full p-3 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder={strings.placeholderNotes}
              value={requestNotes}
              onChange={event => setRequestNotes(event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <button
              type="submit"
              className="ui-btn-primary text-sm"
              disabled={requestStatus === 'sending'}
            >
              {requestStatus === 'sending' ? strings.sending : strings.submit}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400">{strings.reviewNote}</p>
          </div>
          {requestStatus === 'success' && (
            <p className="md:col-span-2 text-sm text-green-600" role="status" aria-live="polite">
              {strings.success}
            </p>
          )}
          {requestStatus === 'error' && (
            <p className="md:col-span-2 text-sm text-red-600" role="alert">
              {strings.error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
