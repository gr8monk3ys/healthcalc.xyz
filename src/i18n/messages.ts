import type { SupportedLocale } from '@/i18n/config';

export type MessageKey =
  | 'layout.skipToMain'
  | 'language.label'
  | 'header.quick.calculators'
  | 'header.quick.blog'
  | 'header.quick.learn'
  | 'header.quick.saved'
  | 'header.quickLinksAria'
  | 'header.mobileNavAria'
  | 'header.openMenu'
  | 'header.closeMenu'
  | 'footer.tagline'
  | 'footer.section.calculators'
  | 'footer.section.company'
  | 'footer.section.legal'
  | 'footer.calc.bmi'
  | 'footer.calc.bodyFat'
  | 'footer.calc.calorieDeficit'
  | 'footer.calc.tdee'
  | 'footer.company.about'
  | 'footer.company.editorial'
  | 'footer.company.contact'
  | 'footer.company.blog'
  | 'footer.legal.privacy'
  | 'footer.legal.terms'
  | 'footer.legal.disclaimer'
  | 'footer.legal.cookies'
  | 'footer.trust.reviewed'
  | 'footer.trust.learnProcess'
  | 'footer.medicalDisclaimer'
  | 'footer.rightsReserved'
  | 'auth.login'
  | 'auth.signup'
  | 'breadcrumb.home'
  | 'breadcrumb.aria'
  | 'calculatorCard.cta'
  | 'calculator.embed.title'
  | 'calculator.embed.poweredBy'
  | 'calculator.relatedCalculators.title'
  | 'calculator.relatedGuides.title'
  | 'calculator.relatedGuides.explore'
  | 'calculator.relatedArticles.title'
  | 'calculator.relatedArticles.viewAll'
  | 'calculator.faq.titleTemplate'
  | 'calculator.resultsShare.title'
  | 'calculator.resultsShare.description'
  | 'calculator.resultsShare.copyLink'
  | 'calculator.resultsShare.linkCopied'
  | 'calculator.resultsShare.downloadImage'
  | 'calculator.resultsShare.exporting'
  | 'calculator.resultsShare.enableHint'
  | 'calculator.resultsShare.tipPrefix'
  | 'calculatorForm.submit'
  | 'calculatorForm.reset'
  | 'calculatorForm.embedToggle'
  | 'calculatorForm.unitToggleAriaTemplate'
  | 'socialShare.label'
  | 'socialShare.ariaTemplate'
  | 'socialShare.platform.twitter'
  | 'socialShare.platform.facebook'
  | 'socialShare.platform.linkedin'
  | 'socialShare.platform.pinterest'
  | 'socialShare.platform.reddit'
  | 'socialShare.platform.email'
  | 'form.label.height'
  | 'form.label.weight'
  | 'unit.height.cm'
  | 'unit.height.ft'
  | 'unit.weight.kg'
  | 'unit.weight.lb'
  | 'cookie.banner.aria'
  | 'cookie.banner.title'
  | 'cookie.banner.body'
  | 'cookie.option.essential.label'
  | 'cookie.option.essential.desc'
  | 'cookie.option.analytics.label'
  | 'cookie.option.analytics.desc'
  | 'cookie.option.advertising.label'
  | 'cookie.option.advertising.desc'
  | 'cookie.action.acceptAll'
  | 'cookie.action.savePreferences'
  | 'cookie.action.managePreferences'
  | 'cookie.action.rejectNonEssential'
  | 'cookie.note.tcf'
  | 'newsletter.title'
  | 'newsletter.description'
  | 'newsletter.button'
  | 'newsletter.emailPlaceholder'
  | 'newsletter.validation.invalidEmail'
  | 'newsletter.status.loading'
  | 'newsletter.error.generic'
  | 'newsletter.privacy.prefix'
  | 'newsletter.privacy.privacyPolicy'
  | 'newsletter.privacy.and'
  | 'newsletter.privacy.terms'
  | 'newsletter.privacy.suffix'
  | 'savedResults.button.saved'
  | 'savedResults.button.save'
  | 'savedResults.button.loginToSave'
  | 'savedResults.helper.loginInstruction'
  | 'savedResults.toast.alreadySaved'
  | 'savedResults.toast.loginRequired'
  | 'savedResults.toast.saved'
  | 'savedResults.toast.saveError'
  | 'savedResults.toast.removed'
  | 'savedResults.toast.removeError'
  | 'savedResults.toast.cleared'
  | 'savedResults.confirm.clearAll'
  | 'savedResults.list.emptyTitle'
  | 'savedResults.list.emptyBody'
  | 'savedResults.list.title'
  | 'savedResults.list.clearAll'
  | 'savedResults.list.deleteAria'
  | 'savedResults.list.goToCalculator'
  | 'savedResults.page.title'
  | 'savedResults.page.subtitle'
  | 'savedResults.page.signedOut.title'
  | 'savedResults.page.signedOut.body'
  | 'savedResults.page.signedOut.cta'
  | 'contactForm.success.title'
  | 'contactForm.success.button'
  | 'contactForm.label.name'
  | 'contactForm.label.email'
  | 'contactForm.label.subject'
  | 'contactForm.label.message'
  | 'contactForm.placeholder.name'
  | 'contactForm.placeholder.email'
  | 'contactForm.placeholder.message'
  | 'contactForm.subject.placeholder'
  | 'contactForm.subject.question'
  | 'contactForm.subject.feedback'
  | 'contactForm.subject.bug'
  | 'contactForm.subject.feature'
  | 'contactForm.subject.other'
  | 'contactForm.error.generic'
  | 'contactForm.error.network'
  | 'contactForm.button.sending'
  | 'contactForm.button.send';

const MESSAGES: Record<SupportedLocale, Record<MessageKey, string>> = {
  en: {
    'layout.skipToMain': 'Skip to main content',
    'language.label': 'Language',
    'header.quick.calculators': 'Calculators',
    'header.quick.blog': 'Blog',
    'header.quick.learn': 'Learn',
    'header.quick.saved': 'Saved',
    'header.quickLinksAria': 'Primary quick links',
    'header.mobileNavAria': 'Mobile navigation',
    'header.openMenu': 'Open menu',
    'header.closeMenu': 'Close menu',
    'footer.tagline': 'Your go-to resource for health and fitness calculators',
    'footer.section.calculators': 'Calculators',
    'footer.section.company': 'Company',
    'footer.section.legal': 'Legal',
    'footer.calc.bmi': 'BMI Calculator',
    'footer.calc.bodyFat': 'Body Fat Calculator',
    'footer.calc.calorieDeficit': 'Calorie Deficit Calculator',
    'footer.calc.tdee': 'TDEE Calculator',
    'footer.company.about': 'About Us',
    'footer.company.editorial': 'Editorial Process',
    'footer.company.contact': 'Contact Us',
    'footer.company.blog': 'Blog',
    'footer.legal.privacy': 'Privacy Policy',
    'footer.legal.terms': 'Terms of Service',
    'footer.legal.disclaimer': 'Disclaimer',
    'footer.legal.cookies': 'Cookie Settings',
    'footer.trust.reviewed': 'Content reviewed by certified health and fitness professionals',
    'footer.trust.learnProcess': 'Learn about our process',
    'footer.medicalDisclaimer':
      'HealthCheck provides general informational content and tools only. Nothing on this website constitutes medical advice. Always consult a qualified healthcare professional before making changes to your diet, exercise, or health regimen.',
    'footer.rightsReserved': 'All rights reserved.',
    'auth.login': 'Log in',
    'auth.signup': 'Sign up',
    'breadcrumb.home': 'Home',
    'breadcrumb.aria': 'Breadcrumb',
    'calculatorCard.cta': 'Use Calculator',
    'calculator.embed.title': 'Embed This Calculator',
    'calculator.embed.poweredBy': 'Powered by {brand}',
    'calculator.relatedCalculators.title': 'Related Calculators',
    'calculator.relatedGuides.title': 'Related Guides',
    'calculator.relatedGuides.explore': 'Explore guide →',
    'calculator.relatedArticles.title': 'Related Articles',
    'calculator.relatedArticles.viewAll': 'View all articles →',
    'calculator.faq.titleTemplate': 'Frequently Asked Questions About {topic}',
    'calculator.resultsShare.title': 'Share your results',
    'calculator.resultsShare.description':
      'Copy a link to this calculator or export your result as an image.',
    'calculator.resultsShare.copyLink': 'Copy link',
    'calculator.resultsShare.linkCopied': 'Link copied',
    'calculator.resultsShare.downloadImage': 'Download image',
    'calculator.resultsShare.exporting': 'Exporting…',
    'calculator.resultsShare.enableHint': 'Run a calculation to enable image export',
    'calculator.resultsShare.tipPrefix': 'Tip: When sharing on social, include this URL:',
    'calculatorForm.submit': 'Calculate',
    'calculatorForm.reset': 'Reset',
    'calculatorForm.embedToggle': 'Embed this calculator',
    'calculatorForm.unitToggleAriaTemplate': 'Toggle {field} unit, currently {unit}',
    'socialShare.label': 'Share this page:',
    'socialShare.ariaTemplate': 'Share on {platform}',
    'socialShare.platform.twitter': 'Twitter',
    'socialShare.platform.facebook': 'Facebook',
    'socialShare.platform.linkedin': 'LinkedIn',
    'socialShare.platform.pinterest': 'Pinterest',
    'socialShare.platform.reddit': 'Reddit',
    'socialShare.platform.email': 'Email',
    'form.label.height': 'Height',
    'form.label.weight': 'Weight',
    'unit.height.cm': 'Centimeters',
    'unit.height.ft': 'Feet',
    'unit.weight.kg': 'Kilograms',
    'unit.weight.lb': 'Pounds',
    'cookie.banner.aria': 'Cookie consent',
    'cookie.banner.title': 'We value your privacy',
    'cookie.banner.body':
      'We use cookies to improve your experience, analyse site traffic, and serve personalised ads. Essential cookies are always active. You can choose which optional cookies to allow below.',
    'cookie.option.essential.label': 'Essential',
    'cookie.option.essential.desc': 'Required for the site to function. Cannot be disabled.',
    'cookie.option.analytics.label': 'Analytics',
    'cookie.option.analytics.desc':
      'Help us understand how visitors interact with the site via Google Analytics.',
    'cookie.option.advertising.label': 'Advertising',
    'cookie.option.advertising.desc':
      'Allow personalised ads through Google AdSense (TCF 2.2 compliant).',
    'cookie.action.acceptAll': 'Accept All',
    'cookie.action.savePreferences': 'Save Preferences',
    'cookie.action.managePreferences': 'Manage Preferences',
    'cookie.action.rejectNonEssential': 'Reject Non-Essential',
    'cookie.note.tcf':
      'This consent mechanism is compliant with IAB Transparency and Consent Framework (TCF) v2.2. You can change your preferences at any time from the footer.',
    'newsletter.title': 'Subscribe to Our Newsletter',
    'newsletter.description':
      'Get the latest health and fitness tips, calculator updates, and exclusive content delivered to your inbox.',
    'newsletter.button': 'Subscribe',
    'newsletter.emailPlaceholder': 'Your email address',
    'newsletter.validation.invalidEmail': 'Please enter a valid email address',
    'newsletter.status.loading': 'Subscribing...',
    'newsletter.error.generic': 'An error occurred. Please try again later.',
    'newsletter.privacy.prefix': 'By subscribing, you agree to our',
    'newsletter.privacy.privacyPolicy': 'Privacy Policy',
    'newsletter.privacy.and': 'and',
    'newsletter.privacy.terms': 'Terms of Service',
    'newsletter.privacy.suffix': ". We'll never share your email with anyone else.",
    'savedResults.button.saved': 'Saved',
    'savedResults.button.save': 'Save Result',
    'savedResults.button.loginToSave': 'Log in to Save',
    'savedResults.helper.loginInstruction':
      'Sign in from the top-right account button to save and sync results on this browser.',
    'savedResults.toast.alreadySaved': 'This result is already saved',
    'savedResults.toast.loginRequired': 'Sign in required to save results',
    'savedResults.toast.saved': 'Result saved successfully',
    'savedResults.toast.saveError': 'Error saving result',
    'savedResults.toast.removed': 'Result removed',
    'savedResults.toast.removeError': 'Error removing result',
    'savedResults.toast.cleared': 'All results cleared',
    'savedResults.confirm.clearAll': 'Are you sure you want to clear all saved results?',
    'savedResults.list.emptyTitle': 'Saved Results',
    'savedResults.list.emptyBody': "You haven't saved any calculator results yet.",
    'savedResults.list.title': 'Saved Results',
    'savedResults.list.clearAll': 'Clear All',
    'savedResults.list.deleteAria': 'Delete result',
    'savedResults.list.goToCalculator': 'Go to calculator',
    'savedResults.page.title': 'Saved Results',
    'savedResults.page.subtitle':
      "Keep your favorite calculator outputs here so you can revisit them any time. When you're signed in, saved results can sync across devices.",
    'savedResults.page.signedOut.title': 'You are not signed in',
    'savedResults.page.signedOut.body':
      "Use the Sign In button in the header to sign in or create an account. You'll be able to save results and access them later.",
    'savedResults.page.signedOut.cta': 'Go back home',
    'contactForm.success.title': 'Message Sent!',
    'contactForm.success.button': 'Send another message',
    'contactForm.label.name': 'Name',
    'contactForm.label.email': 'Email',
    'contactForm.label.subject': 'Subject',
    'contactForm.label.message': 'Message',
    'contactForm.placeholder.name': 'Your name',
    'contactForm.placeholder.email': 'your.email@example.com',
    'contactForm.placeholder.message': 'Your message here...',
    'contactForm.subject.placeholder': 'Select a subject',
    'contactForm.subject.question': 'General Question',
    'contactForm.subject.feedback': 'Feedback',
    'contactForm.subject.bug': 'Report a Bug',
    'contactForm.subject.feature': 'Feature Request',
    'contactForm.subject.other': 'Other',
    'contactForm.error.generic': 'Something went wrong. Please try again.',
    'contactForm.error.network': 'Network error. Please check your connection and try again.',
    'contactForm.button.sending': 'Sending...',
    'contactForm.button.send': 'Send Message',
  },
  es: {
    'layout.skipToMain': 'Saltar al contenido principal',
    'language.label': 'Idioma',
    'header.quick.calculators': 'Calculadoras',
    'header.quick.blog': 'Blog',
    'header.quick.learn': 'Aprender',
    'header.quick.saved': 'Guardados',
    'header.quickLinksAria': 'Enlaces rápidos principales',
    'header.mobileNavAria': 'Navegación móvil',
    'header.openMenu': 'Abrir menú',
    'header.closeMenu': 'Cerrar menú',
    'footer.tagline': 'Tu recurso de confianza para calculadoras de salud y fitness',
    'footer.section.calculators': 'Calculadoras',
    'footer.section.company': 'Empresa',
    'footer.section.legal': 'Legal',
    'footer.calc.bmi': 'Calculadora de IMC',
    'footer.calc.bodyFat': 'Calculadora de grasa corporal',
    'footer.calc.calorieDeficit': 'Calculadora de déficit calórico',
    'footer.calc.tdee': 'Calculadora de TDEE',
    'footer.company.about': 'Sobre nosotros',
    'footer.company.editorial': 'Proceso editorial',
    'footer.company.contact': 'Contáctanos',
    'footer.company.blog': 'Blog',
    'footer.legal.privacy': 'Política de privacidad',
    'footer.legal.terms': 'Términos del servicio',
    'footer.legal.disclaimer': 'Descargo de responsabilidad',
    'footer.legal.cookies': 'Configuración de cookies',
    'footer.trust.reviewed': 'Contenido revisado por profesionales certificados en salud y fitness',
    'footer.trust.learnProcess': 'Conoce nuestro proceso',
    'footer.medicalDisclaimer':
      'HealthCheck ofrece solo contenido y herramientas informativas generales. Nada en este sitio web constituye consejo médico. Consulta siempre a un profesional de la salud calificado antes de cambiar tu dieta, ejercicio o régimen de salud.',
    'footer.rightsReserved': 'Todos los derechos reservados.',
    'auth.login': 'Iniciar sesión',
    'auth.signup': 'Registrarse',
    'breadcrumb.home': 'Inicio',
    'breadcrumb.aria': 'Ruta de navegación',
    'calculatorCard.cta': 'Usar calculadora',
    'calculator.embed.title': 'Incrustar esta calculadora',
    'calculator.embed.poweredBy': 'Con tecnología de {brand}',
    'calculator.relatedCalculators.title': 'Calculadoras relacionadas',
    'calculator.relatedGuides.title': 'Guías relacionadas',
    'calculator.relatedGuides.explore': 'Explorar guía →',
    'calculator.relatedArticles.title': 'Artículos relacionados',
    'calculator.relatedArticles.viewAll': 'Ver todos los artículos →',
    'calculator.faq.titleTemplate': 'Preguntas frecuentes sobre {topic}',
    'calculator.resultsShare.title': 'Comparte tus resultados',
    'calculator.resultsShare.description':
      'Copia un enlace a esta calculadora o exporta tu resultado como imagen.',
    'calculator.resultsShare.copyLink': 'Copiar enlace',
    'calculator.resultsShare.linkCopied': 'Enlace copiado',
    'calculator.resultsShare.downloadImage': 'Descargar imagen',
    'calculator.resultsShare.exporting': 'Exportando…',
    'calculator.resultsShare.enableHint': 'Realiza un cálculo para habilitar la exportación',
    'calculator.resultsShare.tipPrefix': 'Consejo: al compartir en redes, incluye esta URL:',
    'calculatorForm.submit': 'Calcular',
    'calculatorForm.reset': 'Restablecer',
    'calculatorForm.embedToggle': 'Incrustar esta calculadora',
    'calculatorForm.unitToggleAriaTemplate': 'Cambiar la unidad de {field}, actualmente {unit}',
    'socialShare.label': 'Comparte esta página:',
    'socialShare.ariaTemplate': 'Compartir en {platform}',
    'socialShare.platform.twitter': 'Twitter',
    'socialShare.platform.facebook': 'Facebook',
    'socialShare.platform.linkedin': 'LinkedIn',
    'socialShare.platform.pinterest': 'Pinterest',
    'socialShare.platform.reddit': 'Reddit',
    'socialShare.platform.email': 'Correo',
    'form.label.height': 'Altura',
    'form.label.weight': 'Peso',
    'unit.height.cm': 'Centímetros',
    'unit.height.ft': 'Pies',
    'unit.weight.kg': 'Kilogramos',
    'unit.weight.lb': 'Libras',
    'cookie.banner.aria': 'Consentimiento de cookies',
    'cookie.banner.title': 'Valoramos tu privacidad',
    'cookie.banner.body':
      'Usamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y mostrar anuncios personalizados. Las cookies esenciales siempre están activas. Puedes elegir qué cookies opcionales permitir a continuación.',
    'cookie.option.essential.label': 'Esenciales',
    'cookie.option.essential.desc':
      'Necesarias para que el sitio funcione. No se pueden desactivar.',
    'cookie.option.analytics.label': 'Analíticas',
    'cookie.option.analytics.desc':
      'Nos ayudan a entender cómo interactúan los visitantes con el sitio mediante Google Analytics.',
    'cookie.option.advertising.label': 'Publicidad',
    'cookie.option.advertising.desc':
      'Permite anuncios personalizados a través de Google AdSense (compatible con TCF 2.2).',
    'cookie.action.acceptAll': 'Aceptar todo',
    'cookie.action.savePreferences': 'Guardar preferencias',
    'cookie.action.managePreferences': 'Gestionar preferencias',
    'cookie.action.rejectNonEssential': 'Rechazar no esenciales',
    'cookie.note.tcf':
      'Este mecanismo de consentimiento cumple con el Marco de Transparencia y Consentimiento (TCF) v2.2 de IAB. Puedes cambiar tus preferencias en cualquier momento desde el pie de página.',
    'newsletter.title': 'Suscríbete a nuestro boletín',
    'newsletter.description':
      'Recibe en tu correo los últimos consejos de salud y fitness, actualizaciones de calculadoras y contenido exclusivo.',
    'newsletter.button': 'Suscribirme',
    'newsletter.emailPlaceholder': 'Tu correo electrónico',
    'newsletter.validation.invalidEmail': 'Introduce un correo electrónico válido',
    'newsletter.status.loading': 'Suscribiendo...',
    'newsletter.error.generic': 'Ocurrió un error. Inténtalo de nuevo más tarde.',
    'newsletter.privacy.prefix': 'Al suscribirte, aceptas nuestra',
    'newsletter.privacy.privacyPolicy': 'Política de privacidad',
    'newsletter.privacy.and': 'y',
    'newsletter.privacy.terms': 'Términos del servicio',
    'newsletter.privacy.suffix': '. Nunca compartiremos tu correo con nadie.',
    'savedResults.button.saved': 'Guardado',
    'savedResults.button.save': 'Guardar resultado',
    'savedResults.button.loginToSave': 'Inicia sesión para guardar',
    'savedResults.helper.loginInstruction':
      'Inicia sesión desde el botón de cuenta en la esquina superior derecha para guardar y sincronizar resultados en este navegador.',
    'savedResults.toast.alreadySaved': 'Este resultado ya está guardado',
    'savedResults.toast.loginRequired': 'Necesitas iniciar sesión para guardar resultados',
    'savedResults.toast.saved': 'Resultado guardado',
    'savedResults.toast.saveError': 'Error al guardar el resultado',
    'savedResults.toast.removed': 'Resultado eliminado',
    'savedResults.toast.removeError': 'Error al eliminar el resultado',
    'savedResults.toast.cleared': 'Se borraron todos los resultados',
    'savedResults.confirm.clearAll': '¿Seguro que quieres borrar todos los resultados guardados?',
    'savedResults.list.emptyTitle': 'Resultados guardados',
    'savedResults.list.emptyBody': 'Aún no has guardado resultados de calculadoras.',
    'savedResults.list.title': 'Resultados guardados',
    'savedResults.list.clearAll': 'Borrar todo',
    'savedResults.list.deleteAria': 'Eliminar resultado',
    'savedResults.list.goToCalculator': 'Ir a la calculadora',
    'savedResults.page.title': 'Resultados guardados',
    'savedResults.page.subtitle':
      'Guarda aquí tus resultados favoritos para volver a verlos cuando quieras. Si inicias sesión, los resultados pueden sincronizarse entre dispositivos.',
    'savedResults.page.signedOut.title': 'No has iniciado sesión',
    'savedResults.page.signedOut.body':
      'Usa el botón Iniciar sesión en el encabezado para iniciar sesión o crear una cuenta. Podrás guardar resultados y acceder a ellos más tarde.',
    'savedResults.page.signedOut.cta': 'Volver al inicio',
    'contactForm.success.title': '¡Mensaje enviado!',
    'contactForm.success.button': 'Enviar otro mensaje',
    'contactForm.label.name': 'Nombre',
    'contactForm.label.email': 'Correo electrónico',
    'contactForm.label.subject': 'Asunto',
    'contactForm.label.message': 'Mensaje',
    'contactForm.placeholder.name': 'Tu nombre',
    'contactForm.placeholder.email': 'tu.correo@ejemplo.com',
    'contactForm.placeholder.message': 'Escribe tu mensaje aquí...',
    'contactForm.subject.placeholder': 'Selecciona un asunto',
    'contactForm.subject.question': 'Consulta general',
    'contactForm.subject.feedback': 'Comentarios',
    'contactForm.subject.bug': 'Reportar un error',
    'contactForm.subject.feature': 'Solicitud de función',
    'contactForm.subject.other': 'Otro',
    'contactForm.error.generic': 'Algo salió mal. Inténtalo de nuevo.',
    'contactForm.error.network': 'Error de red. Comprueba tu conexión e inténtalo de nuevo.',
    'contactForm.button.sending': 'Enviando...',
    'contactForm.button.send': 'Enviar mensaje',
  },
  fr: {
    'layout.skipToMain': 'Aller au contenu principal',
    'language.label': 'Langue',
    'header.quick.calculators': 'Calculateurs',
    'header.quick.blog': 'Blog',
    'header.quick.learn': 'Apprendre',
    'header.quick.saved': 'Sauvegardes',
    'header.quickLinksAria': 'Liens rapides principaux',
    'header.mobileNavAria': 'Navigation mobile',
    'header.openMenu': 'Ouvrir le menu',
    'header.closeMenu': 'Fermer le menu',
    'footer.tagline': 'Votre référence pour les calculateurs santé et fitness',
    'footer.section.calculators': 'Calculateurs',
    'footer.section.company': 'Entreprise',
    'footer.section.legal': 'Mentions légales',
    'footer.calc.bmi': 'Calculateur IMC',
    'footer.calc.bodyFat': 'Calculateur de masse grasse',
    'footer.calc.calorieDeficit': 'Calculateur de déficit calorique',
    'footer.calc.tdee': 'Calculateur TDEE',
    'footer.company.about': 'À propos',
    'footer.company.editorial': 'Processus éditorial',
    'footer.company.contact': 'Contact',
    'footer.company.blog': 'Blog',
    'footer.legal.privacy': 'Politique de confidentialité',
    'footer.legal.terms': "Conditions d'utilisation",
    'footer.legal.disclaimer': 'Avertissement',
    'footer.legal.cookies': 'Paramètres des cookies',
    'footer.trust.reviewed':
      'Contenu vérifié par des professionnels certifiés de la santé et du fitness',
    'footer.trust.learnProcess': 'En savoir plus sur notre processus',
    'footer.medicalDisclaimer':
      "HealthCheck fournit uniquement du contenu et des outils d'information générale. Rien sur ce site ne constitue un avis médical. Consultez toujours un professionnel de santé qualifié avant de modifier votre alimentation, votre exercice ou votre régime de santé.",
    'footer.rightsReserved': 'Tous droits réservés.',
    'auth.login': 'Se connecter',
    'auth.signup': "S'inscrire",
    'breadcrumb.home': 'Accueil',
    'breadcrumb.aria': "Fil d'Ariane",
    'calculatorCard.cta': 'Utiliser le calculateur',
    'calculator.embed.title': 'Intégrer ce calculateur',
    'calculator.embed.poweredBy': 'Propulsé par {brand}',
    'calculator.relatedCalculators.title': 'Calculateurs associés',
    'calculator.relatedGuides.title': 'Guides associés',
    'calculator.relatedGuides.explore': 'Explorer le guide →',
    'calculator.relatedArticles.title': 'Articles associés',
    'calculator.relatedArticles.viewAll': 'Voir tous les articles →',
    'calculator.faq.titleTemplate': 'Questions fréquentes sur {topic}',
    'calculator.resultsShare.title': 'Partagez vos résultats',
    'calculator.resultsShare.description':
      'Copiez un lien vers ce calculateur ou exportez votre résultat en image.',
    'calculator.resultsShare.copyLink': 'Copier le lien',
    'calculator.resultsShare.linkCopied': 'Lien copié',
    'calculator.resultsShare.downloadImage': "Télécharger l'image",
    'calculator.resultsShare.exporting': 'Export en cours…',
    'calculator.resultsShare.enableHint': "Lancez un calcul pour activer l'export d'image",
    'calculator.resultsShare.tipPrefix':
      'Astuce : en partageant sur les réseaux, incluez cette URL :',
    'calculatorForm.submit': 'Calculer',
    'calculatorForm.reset': 'Réinitialiser',
    'calculatorForm.embedToggle': 'Intégrer ce calculateur',
    'calculatorForm.unitToggleAriaTemplate': "Changer l'unité de {field}, actuellement {unit}",
    'socialShare.label': 'Partager cette page :',
    'socialShare.ariaTemplate': 'Partager sur {platform}',
    'socialShare.platform.twitter': 'Twitter',
    'socialShare.platform.facebook': 'Facebook',
    'socialShare.platform.linkedin': 'LinkedIn',
    'socialShare.platform.pinterest': 'Pinterest',
    'socialShare.platform.reddit': 'Reddit',
    'socialShare.platform.email': 'E-mail',
    'form.label.height': 'Taille',
    'form.label.weight': 'Poids',
    'unit.height.cm': 'Centimètres',
    'unit.height.ft': 'Pieds',
    'unit.weight.kg': 'Kilogrammes',
    'unit.weight.lb': 'Livres',
    'cookie.banner.aria': 'Consentement aux cookies',
    'cookie.banner.title': 'Nous respectons votre vie privée',
    'cookie.banner.body':
      'Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic du site et afficher des publicités personnalisées. Les cookies essentiels sont toujours actifs. Vous pouvez choisir ci-dessous les cookies optionnels à autoriser.',
    'cookie.option.essential.label': 'Essentiels',
    'cookie.option.essential.desc':
      'Nécessaires au fonctionnement du site. Impossible à désactiver.',
    'cookie.option.analytics.label': 'Analytique',
    'cookie.option.analytics.desc':
      'Nous aide à comprendre comment les visiteurs utilisent le site via Google Analytics.',
    'cookie.option.advertising.label': 'Publicité',
    'cookie.option.advertising.desc':
      'Autoriser des publicités personnalisées via Google AdSense (conforme TCF 2.2).',
    'cookie.action.acceptAll': 'Tout accepter',
    'cookie.action.savePreferences': 'Enregistrer les préférences',
    'cookie.action.managePreferences': 'Gérer les préférences',
    'cookie.action.rejectNonEssential': 'Refuser les non essentiels',
    'cookie.note.tcf':
      'Ce mécanisme de consentement est conforme au Transparency and Consent Framework (TCF) v2.2 de l’IAB. Vous pouvez modifier vos préférences à tout moment depuis le pied de page.',
    'newsletter.title': 'Abonnez-vous à notre newsletter',
    'newsletter.description':
      'Recevez les derniers conseils santé et fitness, les mises à jour des calculateurs et du contenu exclusif dans votre boîte mail.',
    'newsletter.button': 'S’abonner',
    'newsletter.emailPlaceholder': 'Votre adresse e-mail',
    'newsletter.validation.invalidEmail': 'Veuillez entrer une adresse e-mail valide',
    'newsletter.status.loading': 'Abonnement…',
    'newsletter.error.generic': 'Une erreur s’est produite. Veuillez réessayer plus tard.',
    'newsletter.privacy.prefix': 'En vous abonnant, vous acceptez notre',
    'newsletter.privacy.privacyPolicy': 'Politique de confidentialité',
    'newsletter.privacy.and': 'et nos',
    'newsletter.privacy.terms': 'Conditions d’utilisation',
    'newsletter.privacy.suffix': '. Nous ne partagerons jamais votre e-mail.',
    'savedResults.button.saved': 'Enregistré',
    'savedResults.button.save': 'Enregistrer le résultat',
    'savedResults.button.loginToSave': 'Connectez-vous pour enregistrer',
    'savedResults.helper.loginInstruction':
      'Connectez-vous via le bouton de compte en haut à droite pour enregistrer et synchroniser les résultats sur ce navigateur.',
    'savedResults.toast.alreadySaved': 'Ce résultat est déjà enregistré',
    'savedResults.toast.loginRequired': 'Connexion requise pour enregistrer des résultats',
    'savedResults.toast.saved': 'Résultat enregistré',
    'savedResults.toast.saveError': 'Erreur lors de l’enregistrement du résultat',
    'savedResults.toast.removed': 'Résultat supprimé',
    'savedResults.toast.removeError': 'Erreur lors de la suppression du résultat',
    'savedResults.toast.cleared': 'Tous les résultats ont été effacés',
    'savedResults.confirm.clearAll':
      'Voulez-vous vraiment effacer tous les résultats enregistrés ?',
    'savedResults.list.emptyTitle': 'Résultats enregistrés',
    'savedResults.list.emptyBody': 'Vous n’avez encore enregistré aucun résultat de calculateur.',
    'savedResults.list.title': 'Résultats enregistrés',
    'savedResults.list.clearAll': 'Tout effacer',
    'savedResults.list.deleteAria': 'Supprimer le résultat',
    'savedResults.list.goToCalculator': 'Aller au calculateur',
    'savedResults.page.title': 'Résultats enregistrés',
    'savedResults.page.subtitle':
      'Gardez ici vos résultats préférés pour les retrouver à tout moment. Une fois connecté, les résultats peuvent se synchroniser entre appareils.',
    'savedResults.page.signedOut.title': 'Vous n’êtes pas connecté',
    'savedResults.page.signedOut.body':
      'Utilisez le bouton Se connecter dans l’en-tête pour vous connecter ou créer un compte. Vous pourrez enregistrer vos résultats et y accéder plus tard.',
    'savedResults.page.signedOut.cta': 'Retour à l’accueil',
    'contactForm.success.title': 'Message envoyé !',
    'contactForm.success.button': 'Envoyer un autre message',
    'contactForm.label.name': 'Nom',
    'contactForm.label.email': 'E-mail',
    'contactForm.label.subject': 'Objet',
    'contactForm.label.message': 'Message',
    'contactForm.placeholder.name': 'Votre nom',
    'contactForm.placeholder.email': 'votre.email@exemple.com',
    'contactForm.placeholder.message': 'Votre message...',
    'contactForm.subject.placeholder': 'Choisissez un sujet',
    'contactForm.subject.question': 'Question générale',
    'contactForm.subject.feedback': 'Avis',
    'contactForm.subject.bug': 'Signaler un bug',
    'contactForm.subject.feature': 'Demande de fonctionnalité',
    'contactForm.subject.other': 'Autre',
    'contactForm.error.generic': 'Une erreur est survenue. Veuillez réessayer.',
    'contactForm.error.network': 'Erreur réseau. Vérifiez votre connexion et réessayez.',
    'contactForm.button.sending': 'Envoi…',
    'contactForm.button.send': 'Envoyer le message',
  },
  de: {
    'layout.skipToMain': 'Zum Hauptinhalt springen',
    'language.label': 'Sprache',
    'header.quick.calculators': 'Rechner',
    'header.quick.blog': 'Blog',
    'header.quick.learn': 'Lernen',
    'header.quick.saved': 'Gespeichert',
    'header.quickLinksAria': 'Primäre Schnelllinks',
    'header.mobileNavAria': 'Mobile Navigation',
    'header.openMenu': 'Menü öffnen',
    'header.closeMenu': 'Menü schließen',
    'footer.tagline': 'Ihre Anlaufstelle für Gesundheits- und Fitnessrechner',
    'footer.section.calculators': 'Rechner',
    'footer.section.company': 'Unternehmen',
    'footer.section.legal': 'Rechtliches',
    'footer.calc.bmi': 'BMI-Rechner',
    'footer.calc.bodyFat': 'Körperfett-Rechner',
    'footer.calc.calorieDeficit': 'Kaloriendefizit-Rechner',
    'footer.calc.tdee': 'TDEE-Rechner',
    'footer.company.about': 'Über uns',
    'footer.company.editorial': 'Redaktioneller Prozess',
    'footer.company.contact': 'Kontakt',
    'footer.company.blog': 'Blog',
    'footer.legal.privacy': 'Datenschutzrichtlinie',
    'footer.legal.terms': 'Nutzungsbedingungen',
    'footer.legal.disclaimer': 'Haftungsausschluss',
    'footer.legal.cookies': 'Cookie-Einstellungen',
    'footer.trust.reviewed':
      'Inhalte geprüft von zertifizierten Gesundheits- und Fitnessfachkräften',
    'footer.trust.learnProcess': 'Mehr ueber unseren Prozess',
    'footer.medicalDisclaimer':
      'HealthCheck bietet nur allgemeine Informationsinhalte und Tools. Nichts auf dieser Website stellt medizinischen Rat dar. Konsultieren Sie immer qualifiziertes medizinisches Fachpersonal, bevor Sie Ihre Ernährung, Ihr Training oder Ihr Gesundheitsprogramm ändern.',
    'footer.rightsReserved': 'Alle Rechte vorbehalten.',
    'auth.login': 'Anmelden',
    'auth.signup': 'Registrieren',
    'breadcrumb.home': 'Startseite',
    'breadcrumb.aria': 'Brotkrumen-Navigation',
    'calculatorCard.cta': 'Rechner nutzen',
    'calculator.embed.title': 'Diesen Rechner einbetten',
    'calculator.embed.poweredBy': 'Bereitgestellt von {brand}',
    'calculator.relatedCalculators.title': 'Ähnliche Rechner',
    'calculator.relatedGuides.title': 'Verwandte Guides',
    'calculator.relatedGuides.explore': 'Guide ansehen →',
    'calculator.relatedArticles.title': 'Ähnliche Artikel',
    'calculator.relatedArticles.viewAll': 'Alle Artikel anzeigen →',
    'calculator.faq.titleTemplate': 'Häufige Fragen zu {topic}',
    'calculator.resultsShare.title': 'Ergebnisse teilen',
    'calculator.resultsShare.description':
      'Kopieren Sie einen Link zu diesem Rechner oder exportieren Sie Ihr Ergebnis als Bild.',
    'calculator.resultsShare.copyLink': 'Link kopieren',
    'calculator.resultsShare.linkCopied': 'Link kopiert',
    'calculator.resultsShare.downloadImage': 'Bild herunterladen',
    'calculator.resultsShare.exporting': 'Export läuft…',
    'calculator.resultsShare.enableHint':
      'Fuehren Sie zuerst eine Berechnung durch, um den Bildexport zu aktivieren',
    'calculator.resultsShare.tipPrefix':
      'Tipp: Beim Teilen in sozialen Netzwerken diese URL einfuegen:',
    'calculatorForm.submit': 'Berechnen',
    'calculatorForm.reset': 'Zurücksetzen',
    'calculatorForm.embedToggle': 'Diesen Rechner einbetten',
    'calculatorForm.unitToggleAriaTemplate': 'Einheit für {field} wechseln (aktuell {unit})',
    'socialShare.label': 'Diese Seite teilen:',
    'socialShare.ariaTemplate': 'Auf {platform} teilen',
    'socialShare.platform.twitter': 'Twitter',
    'socialShare.platform.facebook': 'Facebook',
    'socialShare.platform.linkedin': 'LinkedIn',
    'socialShare.platform.pinterest': 'Pinterest',
    'socialShare.platform.reddit': 'Reddit',
    'socialShare.platform.email': 'E-Mail',
    'form.label.height': 'Größe',
    'form.label.weight': 'Gewicht',
    'unit.height.cm': 'Zentimeter',
    'unit.height.ft': 'Fuß',
    'unit.weight.kg': 'Kilogramm',
    'unit.weight.lb': 'Pfund',
    'cookie.banner.aria': 'Cookie-Einwilligung',
    'cookie.banner.title': 'Wir respektieren Ihre Privatsphäre',
    'cookie.banner.body':
      'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, den Website-Traffic zu analysieren und personalisierte Werbung zu zeigen. Essenzielle Cookies sind immer aktiv. Unten können Sie auswählen, welche optionalen Cookies Sie zulassen möchten.',
    'cookie.option.essential.label': 'Essenziell',
    'cookie.option.essential.desc':
      'Für die Funktion der Website erforderlich. Kann nicht deaktiviert werden.',
    'cookie.option.analytics.label': 'Analytics',
    'cookie.option.analytics.desc':
      'Hilft uns zu verstehen, wie Besucher mit der Website interagieren (über Google Analytics).',
    'cookie.option.advertising.label': 'Werbung',
    'cookie.option.advertising.desc':
      'Personalisierte Anzeigen über Google AdSense zulassen (TCF 2.2-konform).',
    'cookie.action.acceptAll': 'Alle akzeptieren',
    'cookie.action.savePreferences': 'Einstellungen speichern',
    'cookie.action.managePreferences': 'Einstellungen verwalten',
    'cookie.action.rejectNonEssential': 'Nicht essenzielle ablehnen',
    'cookie.note.tcf':
      'Dieser Einwilligungsmechanismus entspricht dem IAB Transparency and Consent Framework (TCF) v2.2. Sie können Ihre Einstellungen jederzeit im Footer ändern.',
    'newsletter.title': 'Newsletter abonnieren',
    'newsletter.description':
      'Erhalten Sie die neuesten Tipps zu Gesundheit und Fitness, Rechner-Updates und exklusive Inhalte direkt in Ihr Postfach.',
    'newsletter.button': 'Abonnieren',
    'newsletter.emailPlaceholder': 'Ihre E-Mail-Adresse',
    'newsletter.validation.invalidEmail': 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    'newsletter.status.loading': 'Wird abonniert…',
    'newsletter.error.generic': 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    'newsletter.privacy.prefix': 'Mit dem Abonnieren stimmen Sie unserer',
    'newsletter.privacy.privacyPolicy': 'Datenschutzerklärung',
    'newsletter.privacy.and': 'und den',
    'newsletter.privacy.terms': 'Nutzungsbedingungen',
    'newsletter.privacy.suffix': ' zu. Wir geben Ihre E-Mail niemals weiter.',
    'savedResults.button.saved': 'Gespeichert',
    'savedResults.button.save': 'Ergebnis speichern',
    'savedResults.button.loginToSave': 'Zum Speichern anmelden',
    'savedResults.helper.loginInstruction':
      'Melden Sie sich über die Konto-Schaltfläche oben rechts an, um Ergebnisse in diesem Browser zu speichern und zu synchronisieren.',
    'savedResults.toast.alreadySaved': 'Dieses Ergebnis ist bereits gespeichert',
    'savedResults.toast.loginRequired': 'Zum Speichern ist eine Anmeldung erforderlich',
    'savedResults.toast.saved': 'Ergebnis gespeichert',
    'savedResults.toast.saveError': 'Fehler beim Speichern des Ergebnisses',
    'savedResults.toast.removed': 'Ergebnis entfernt',
    'savedResults.toast.removeError': 'Fehler beim Entfernen des Ergebnisses',
    'savedResults.toast.cleared': 'Alle Ergebnisse wurden gelöscht',
    'savedResults.confirm.clearAll': 'Möchten Sie wirklich alle gespeicherten Ergebnisse löschen?',
    'savedResults.list.emptyTitle': 'Gespeicherte Ergebnisse',
    'savedResults.list.emptyBody': 'Sie haben noch keine Rechner-Ergebnisse gespeichert.',
    'savedResults.list.title': 'Gespeicherte Ergebnisse',
    'savedResults.list.clearAll': 'Alle löschen',
    'savedResults.list.deleteAria': 'Ergebnis löschen',
    'savedResults.list.goToCalculator': 'Zum Rechner',
    'savedResults.page.title': 'Gespeicherte Ergebnisse',
    'savedResults.page.subtitle':
      'Speichern Sie hier Ihre bevorzugten Ergebnisse, damit Sie jederzeit darauf zurückgreifen können. Wenn Sie angemeldet sind, können Ergebnisse geräteübergreifend synchronisiert werden.',
    'savedResults.page.signedOut.title': 'Sie sind nicht angemeldet',
    'savedResults.page.signedOut.body':
      'Verwenden Sie die Schaltfläche Anmelden im Header, um sich anzumelden oder ein Konto zu erstellen. Dann können Sie Ergebnisse speichern und später darauf zugreifen.',
    'savedResults.page.signedOut.cta': 'Zur Startseite',
    'contactForm.success.title': 'Nachricht gesendet!',
    'contactForm.success.button': 'Weitere Nachricht senden',
    'contactForm.label.name': 'Name',
    'contactForm.label.email': 'E-Mail',
    'contactForm.label.subject': 'Betreff',
    'contactForm.label.message': 'Nachricht',
    'contactForm.placeholder.name': 'Ihr Name',
    'contactForm.placeholder.email': 'ihre.email@beispiel.de',
    'contactForm.placeholder.message': 'Ihre Nachricht...',
    'contactForm.subject.placeholder': 'Betreff auswählen',
    'contactForm.subject.question': 'Allgemeine Frage',
    'contactForm.subject.feedback': 'Feedback',
    'contactForm.subject.bug': 'Fehler melden',
    'contactForm.subject.feature': 'Funktionswunsch',
    'contactForm.subject.other': 'Sonstiges',
    'contactForm.error.generic': 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
    'contactForm.error.network':
      'Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
    'contactForm.button.sending': 'Wird gesendet…',
    'contactForm.button.send': 'Nachricht senden',
  },
  pt: {
    'layout.skipToMain': 'Pular para o conteudo principal',
    'language.label': 'Idioma',
    'header.quick.calculators': 'Calculadoras',
    'header.quick.blog': 'Blog',
    'header.quick.learn': 'Aprender',
    'header.quick.saved': 'Salvos',
    'header.quickLinksAria': 'Links rápidos principais',
    'header.mobileNavAria': 'Navegacao mobile',
    'header.openMenu': 'Abrir menu',
    'header.closeMenu': 'Fechar menu',
    'footer.tagline': 'Seu recurso principal para calculadoras de saúde e fitness',
    'footer.section.calculators': 'Calculadoras',
    'footer.section.company': 'Empresa',
    'footer.section.legal': 'Legal',
    'footer.calc.bmi': 'Calculadora de IMC',
    'footer.calc.bodyFat': 'Calculadora de gordura corporal',
    'footer.calc.calorieDeficit': 'Calculadora de déficit calórico',
    'footer.calc.tdee': 'Calculadora de TDEE',
    'footer.company.about': 'Sobre nós',
    'footer.company.editorial': 'Processo editorial',
    'footer.company.contact': 'Contato',
    'footer.company.blog': 'Blog',
    'footer.legal.privacy': 'Política de privacidade',
    'footer.legal.terms': 'Termos de servico',
    'footer.legal.disclaimer': 'Isencao de responsabilidade',
    'footer.legal.cookies': 'Configuracoes de cookies',
    'footer.trust.reviewed': 'Conteudo revisado por profissionais certificados de saude e fitness',
    'footer.trust.learnProcess': 'Saiba mais sobre nosso processo',
    'footer.medicalDisclaimer':
      'A HealthCheck fornece apenas conteudo e ferramentas informativas gerais. Nada neste site constitui aconselhamento medico. Sempre consulte um profissional de saude qualificado antes de mudar sua dieta, exercicios ou rotina de saude.',
    'footer.rightsReserved': 'Todos os direitos reservados.',
    'auth.login': 'Entrar',
    'auth.signup': 'Cadastrar-se',
    'breadcrumb.home': 'Início',
    'breadcrumb.aria': 'Trilha de navegação',
    'calculatorCard.cta': 'Usar calculadora',
    'calculator.embed.title': 'Incorporar esta calculadora',
    'calculator.embed.poweredBy': 'Com tecnologia de {brand}',
    'calculator.relatedCalculators.title': 'Calculadoras relacionadas',
    'calculator.relatedGuides.title': 'Guias relacionados',
    'calculator.relatedGuides.explore': 'Explorar guia →',
    'calculator.relatedArticles.title': 'Artigos relacionados',
    'calculator.relatedArticles.viewAll': 'Ver todos os artigos →',
    'calculator.faq.titleTemplate': 'Perguntas frequentes sobre {topic}',
    'calculator.resultsShare.title': 'Compartilhe seus resultados',
    'calculator.resultsShare.description':
      'Copie um link desta calculadora ou exporte seu resultado como imagem.',
    'calculator.resultsShare.copyLink': 'Copiar link',
    'calculator.resultsShare.linkCopied': 'Link copiado',
    'calculator.resultsShare.downloadImage': 'Baixar imagem',
    'calculator.resultsShare.exporting': 'Exportando…',
    'calculator.resultsShare.enableHint': 'Faça um cálculo para habilitar a exportação da imagem',
    'calculator.resultsShare.tipPrefix': 'Dica: ao compartilhar nas redes, inclua esta URL:',
    'calculatorForm.submit': 'Calcular',
    'calculatorForm.reset': 'Redefinir',
    'calculatorForm.embedToggle': 'Incorporar esta calculadora',
    'calculatorForm.unitToggleAriaTemplate': 'Alternar unidade de {field}, atualmente {unit}',
    'socialShare.label': 'Compartilhe esta página:',
    'socialShare.ariaTemplate': 'Compartilhar no {platform}',
    'socialShare.platform.twitter': 'Twitter',
    'socialShare.platform.facebook': 'Facebook',
    'socialShare.platform.linkedin': 'LinkedIn',
    'socialShare.platform.pinterest': 'Pinterest',
    'socialShare.platform.reddit': 'Reddit',
    'socialShare.platform.email': 'E-mail',
    'form.label.height': 'Altura',
    'form.label.weight': 'Peso',
    'unit.height.cm': 'Centímetros',
    'unit.height.ft': 'Pés',
    'unit.weight.kg': 'Quilogramas',
    'unit.weight.lb': 'Libras',
    'cookie.banner.aria': 'Consentimento de cookies',
    'cookie.banner.title': 'Valorizamos sua privacidade',
    'cookie.banner.body':
      'Usamos cookies para melhorar sua experiência, analisar o tráfego do site e exibir anúncios personalizados. Cookies essenciais estão sempre ativos. Você pode escolher abaixo quais cookies opcionais permitir.',
    'cookie.option.essential.label': 'Essenciais',
    'cookie.option.essential.desc': 'Necessários para o site funcionar. Não podem ser desativados.',
    'cookie.option.analytics.label': 'Análises',
    'cookie.option.analytics.desc':
      'Ajuda a entender como os visitantes interagem com o site via Google Analytics.',
    'cookie.option.advertising.label': 'Publicidade',
    'cookie.option.advertising.desc':
      'Permite anúncios personalizados pelo Google AdSense (compatível com TCF 2.2).',
    'cookie.action.acceptAll': 'Aceitar tudo',
    'cookie.action.savePreferences': 'Salvar preferências',
    'cookie.action.managePreferences': 'Gerenciar preferências',
    'cookie.action.rejectNonEssential': 'Rejeitar não essenciais',
    'cookie.note.tcf':
      'Este mecanismo de consentimento é compatível com o Transparency and Consent Framework (TCF) v2.2 da IAB. Você pode alterar suas preferências a qualquer momento no rodapé.',
    'newsletter.title': 'Assine nossa newsletter',
    'newsletter.description':
      'Receba as últimas dicas de saúde e fitness, atualizações das calculadoras e conteúdo exclusivo no seu e-mail.',
    'newsletter.button': 'Assinar',
    'newsletter.emailPlaceholder': 'Seu e-mail',
    'newsletter.validation.invalidEmail': 'Informe um e-mail válido',
    'newsletter.status.loading': 'Assinando...',
    'newsletter.error.generic': 'Ocorreu um erro. Tente novamente mais tarde.',
    'newsletter.privacy.prefix': 'Ao assinar, você concorda com nossa',
    'newsletter.privacy.privacyPolicy': 'Política de privacidade',
    'newsletter.privacy.and': 'e com os',
    'newsletter.privacy.terms': 'Termos de serviço',
    'newsletter.privacy.suffix': '. Nunca compartilharemos seu e-mail com ninguém.',
    'savedResults.button.saved': 'Salvo',
    'savedResults.button.save': 'Salvar resultado',
    'savedResults.button.loginToSave': 'Entre para salvar',
    'savedResults.helper.loginInstruction':
      'Faça login pelo botão de conta no canto superior direito para salvar e sincronizar resultados neste navegador.',
    'savedResults.toast.alreadySaved': 'Este resultado já está salvo',
    'savedResults.toast.loginRequired': 'É necessário entrar para salvar resultados',
    'savedResults.toast.saved': 'Resultado salvo',
    'savedResults.toast.saveError': 'Erro ao salvar o resultado',
    'savedResults.toast.removed': 'Resultado removido',
    'savedResults.toast.removeError': 'Erro ao remover o resultado',
    'savedResults.toast.cleared': 'Todos os resultados foram limpos',
    'savedResults.confirm.clearAll': 'Tem certeza de que deseja limpar todos os resultados salvos?',
    'savedResults.list.emptyTitle': 'Resultados salvos',
    'savedResults.list.emptyBody': 'Você ainda não salvou nenhum resultado de calculadora.',
    'savedResults.list.title': 'Resultados salvos',
    'savedResults.list.clearAll': 'Limpar tudo',
    'savedResults.list.deleteAria': 'Excluir resultado',
    'savedResults.list.goToCalculator': 'Ir para a calculadora',
    'savedResults.page.title': 'Resultados salvos',
    'savedResults.page.subtitle':
      'Guarde aqui seus resultados favoritos para revisitá-los quando quiser. Ao entrar, os resultados podem ser sincronizados entre dispositivos.',
    'savedResults.page.signedOut.title': 'Você não está conectado',
    'savedResults.page.signedOut.body':
      'Use o botão Entrar no cabeçalho para entrar ou criar uma conta. Assim, você poderá salvar resultados e acessá-los depois.',
    'savedResults.page.signedOut.cta': 'Voltar para o início',
    'contactForm.success.title': 'Mensagem enviada!',
    'contactForm.success.button': 'Enviar outra mensagem',
    'contactForm.label.name': 'Nome',
    'contactForm.label.email': 'E-mail',
    'contactForm.label.subject': 'Assunto',
    'contactForm.label.message': 'Mensagem',
    'contactForm.placeholder.name': 'Seu nome',
    'contactForm.placeholder.email': 'seu.email@exemplo.com',
    'contactForm.placeholder.message': 'Sua mensagem...',
    'contactForm.subject.placeholder': 'Selecione um assunto',
    'contactForm.subject.question': 'Pergunta geral',
    'contactForm.subject.feedback': 'Feedback',
    'contactForm.subject.bug': 'Reportar um bug',
    'contactForm.subject.feature': 'Solicitação de recurso',
    'contactForm.subject.other': 'Outro',
    'contactForm.error.generic': 'Algo deu errado. Tente novamente.',
    'contactForm.error.network': 'Erro de rede. Verifique sua conexão e tente novamente.',
    'contactForm.button.sending': 'Enviando...',
    'contactForm.button.send': 'Enviar mensagem',
  },
  zh: {
    'layout.skipToMain': '跳转到主要内容',
    'language.label': '语言',
    'header.quick.calculators': '计算器',
    'header.quick.blog': '博客',
    'header.quick.learn': '学习',
    'header.quick.saved': '已保存',
    'header.quickLinksAria': '主要快速链接',
    'header.mobileNavAria': '移动导航',
    'header.openMenu': '打开菜单',
    'header.closeMenu': '关闭菜单',
    'footer.tagline': '你的健康与健身计算器平台',
    'footer.section.calculators': '计算器',
    'footer.section.company': '公司',
    'footer.section.legal': '法律',
    'footer.calc.bmi': 'BMI 计算器',
    'footer.calc.bodyFat': '体脂计算器',
    'footer.calc.calorieDeficit': '热量缺口计算器',
    'footer.calc.tdee': 'TDEE 计算器',
    'footer.company.about': '关于我们',
    'footer.company.editorial': '编辑流程',
    'footer.company.contact': '联系我们',
    'footer.company.blog': '博客',
    'footer.legal.privacy': '隐私政策',
    'footer.legal.terms': '服务条款',
    'footer.legal.disclaimer': '免责声明',
    'footer.legal.cookies': 'Cookie 设置',
    'footer.trust.reviewed': '内容由认证健康和健身专业人士审核',
    'footer.trust.learnProcess': '了解我们的流程',
    'footer.medicalDisclaimer':
      'HealthCheck 仅提供一般信息内容和工具。本站内容不构成医疗建议。在更改饮食、运动或健康方案前，请务必咨询合格的医疗专业人士。',
    'footer.rightsReserved': '保留所有权利。',
    'auth.login': '登录',
    'auth.signup': '注册',
    'breadcrumb.home': '首页',
    'breadcrumb.aria': '面包屑导航',
    'calculatorCard.cta': '使用计算器',
    'calculator.embed.title': '嵌入此计算器',
    'calculator.embed.poweredBy': '由{brand}提供支持',
    'calculator.relatedCalculators.title': '相关计算器',
    'calculator.relatedGuides.title': '相关指南',
    'calculator.relatedGuides.explore': '查看指南 →',
    'calculator.relatedArticles.title': '相关文章',
    'calculator.relatedArticles.viewAll': '查看全部文章 →',
    'calculator.faq.titleTemplate': '关于{topic}的常见问题',
    'calculator.resultsShare.title': '分享你的结果',
    'calculator.resultsShare.description': '复制此计算器链接，或将结果导出为图片。',
    'calculator.resultsShare.copyLink': '复制链接',
    'calculator.resultsShare.linkCopied': '链接已复制',
    'calculator.resultsShare.downloadImage': '下载图片',
    'calculator.resultsShare.exporting': '导出中…',
    'calculator.resultsShare.enableHint': '先完成一次计算后才能导出图片',
    'calculator.resultsShare.tipPrefix': '提示：在社交平台分享时，可附上此链接：',
    'calculatorForm.submit': '计算',
    'calculatorForm.reset': '重置',
    'calculatorForm.embedToggle': '嵌入此计算器',
    'calculatorForm.unitToggleAriaTemplate': '切换{field}单位（当前：{unit}）',
    'socialShare.label': '分享此页面：',
    'socialShare.ariaTemplate': '分享到{platform}',
    'socialShare.platform.twitter': 'Twitter',
    'socialShare.platform.facebook': 'Facebook',
    'socialShare.platform.linkedin': 'LinkedIn',
    'socialShare.platform.pinterest': 'Pinterest',
    'socialShare.platform.reddit': 'Reddit',
    'socialShare.platform.email': '邮件',
    'form.label.height': '身高',
    'form.label.weight': '体重',
    'unit.height.cm': '厘米',
    'unit.height.ft': '英尺',
    'unit.weight.kg': '千克',
    'unit.weight.lb': '磅',
    'cookie.banner.aria': 'Cookie 同意',
    'cookie.banner.title': '我们尊重你的隐私',
    'cookie.banner.body':
      '我们使用 Cookie 来提升体验、分析站点流量并提供个性化广告。必要 Cookie 始终启用。你可以在下方选择允许哪些可选 Cookie。',
    'cookie.option.essential.label': '必要',
    'cookie.option.essential.desc': '网站正常运行所必需，无法关闭。',
    'cookie.option.analytics.label': '分析',
    'cookie.option.analytics.desc': '通过 Google Analytics 帮助我们了解访客如何使用本站。',
    'cookie.option.advertising.label': '广告',
    'cookie.option.advertising.desc': '允许通过 Google AdSense 展示个性化广告（符合 TCF 2.2）。',
    'cookie.action.acceptAll': '全部接受',
    'cookie.action.savePreferences': '保存偏好',
    'cookie.action.managePreferences': '管理偏好',
    'cookie.action.rejectNonEssential': '拒绝非必要项',
    'cookie.note.tcf': '本同意机制符合 IAB 透明度与同意框架（TCF）v2.2。你可以随时在页脚更改偏好。',
    'newsletter.title': '订阅我们的通讯',
    'newsletter.description': '将最新的健康与健身建议、计算器更新和独家内容发送到你的邮箱。',
    'newsletter.button': '订阅',
    'newsletter.emailPlaceholder': '你的邮箱地址',
    'newsletter.validation.invalidEmail': '请输入有效的邮箱地址',
    'newsletter.status.loading': '正在订阅...',
    'newsletter.error.generic': '发生错误。请稍后再试。',
    'newsletter.privacy.prefix': '订阅即表示你同意我们的',
    'newsletter.privacy.privacyPolicy': '隐私政策',
    'newsletter.privacy.and': '和',
    'newsletter.privacy.terms': '服务条款',
    'newsletter.privacy.suffix': '。我们不会与任何人共享你的邮箱。',
    'savedResults.button.saved': '已保存',
    'savedResults.button.save': '保存结果',
    'savedResults.button.loginToSave': '登录后保存',
    'savedResults.helper.loginInstruction':
      '通过右上角的账户按钮登录，以在此浏览器中保存并同步结果。',
    'savedResults.toast.alreadySaved': '该结果已保存',
    'savedResults.toast.loginRequired': '需要登录才能保存结果',
    'savedResults.toast.saved': '结果已保存',
    'savedResults.toast.saveError': '保存结果时出错',
    'savedResults.toast.removed': '结果已移除',
    'savedResults.toast.removeError': '移除结果时出错',
    'savedResults.toast.cleared': '已清空所有结果',
    'savedResults.confirm.clearAll': '确定要清空所有已保存的结果吗？',
    'savedResults.list.emptyTitle': '已保存的结果',
    'savedResults.list.emptyBody': '你还没有保存任何计算结果。',
    'savedResults.list.title': '已保存的结果',
    'savedResults.list.clearAll': '全部清空',
    'savedResults.list.deleteAria': '删除结果',
    'savedResults.list.goToCalculator': '前往计算器',
    'savedResults.page.title': '已保存的结果',
    'savedResults.page.subtitle':
      '把常用的计算结果保存在这里，方便随时查看。登录后，结果可在不同设备间同步。',
    'savedResults.page.signedOut.title': '你尚未登录',
    'savedResults.page.signedOut.body':
      '使用页眉中的登录按钮登录或创建账户。之后你就可以保存结果并在以后访问它们。',
    'savedResults.page.signedOut.cta': '返回首页',
    'contactForm.success.title': '消息已发送！',
    'contactForm.success.button': '再发一条消息',
    'contactForm.label.name': '姓名',
    'contactForm.label.email': '邮箱',
    'contactForm.label.subject': '主题',
    'contactForm.label.message': '内容',
    'contactForm.placeholder.name': '你的姓名',
    'contactForm.placeholder.email': 'your.email@example.com',
    'contactForm.placeholder.message': '在这里输入你的消息...',
    'contactForm.subject.placeholder': '请选择主题',
    'contactForm.subject.question': '一般问题',
    'contactForm.subject.feedback': '反馈',
    'contactForm.subject.bug': '报告错误',
    'contactForm.subject.feature': '功能请求',
    'contactForm.subject.other': '其他',
    'contactForm.error.generic': '出现问题。请重试。',
    'contactForm.error.network': '网络错误。请检查连接后重试。',
    'contactForm.button.sending': '发送中...',
    'contactForm.button.send': '发送消息',
  },
};

export function getMessage(locale: SupportedLocale, key: MessageKey): string {
  return MESSAGES[locale][key] ?? MESSAGES.en[key] ?? key;
}
