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
  | 'calculator.results.announcement'
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
  | 'calculator.resultsShare.exportFailed'
  | 'calculator.resultsShare.copyFailed'
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
  | 'cookie.banner.summary'
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
  | 'newsletter.emailLabel'
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
  | 'savedResults.toast.restored'
  | 'savedResults.toast.undo'
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

/**
 * English strings. The only locale that ships (the proxy redirects other
 * locale prefixes to English), so it is the only dictionary in the client
 * bundle; the others live in messages.locales.ts and reach the client as
 * props only when a non-default locale is actually rendered.
 */
export const EN_MESSAGES: Record<MessageKey, string> = {
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
    'HealthCalc provides general informational content and tools only. Nothing on this website constitutes medical advice. Always consult a qualified healthcare professional before making changes to your diet, exercise, or health regimen.',
  'footer.rightsReserved': 'All rights reserved.',
  'auth.login': 'Sign In',
  'auth.signup': 'Sign Up',
  'breadcrumb.home': 'Home',
  'breadcrumb.aria': 'Breadcrumb',
  'calculatorCard.cta': 'Use Calculator',
  'calculator.embed.title': 'Embed This Calculator',
  'calculator.embed.poweredBy': 'Powered by {brand}',
  'calculator.relatedCalculators.title': 'Related Calculators',
  'calculator.relatedGuides.title': 'Related Guides',
  'calculator.relatedGuides.explore': 'Explore Guide →',
  'calculator.relatedArticles.title': 'Related Articles',
  'calculator.results.announcement': 'Your results are ready below.',
  'calculator.relatedArticles.viewAll': 'View All Articles →',
  'calculator.faq.titleTemplate': 'Frequently Asked Questions About {topic}',
  'calculator.resultsShare.title': 'Share Your Results',
  'calculator.resultsShare.description':
    'Copy a link to this calculator or export your result as an image.',
  'calculator.resultsShare.copyLink': 'Copy Link',
  'calculator.resultsShare.linkCopied': 'Link Copied',
  'calculator.resultsShare.downloadImage': 'Download Image',
  'calculator.resultsShare.exporting': 'Exporting…',
  'calculator.resultsShare.enableHint': 'Run a calculation to enable image export',
  'calculator.resultsShare.tipPrefix': 'Tip: When sharing on social, include this URL:',
  'calculator.resultsShare.exportFailed':
    'Couldn’t create the image. Try again, or take a screenshot instead.',
  'calculator.resultsShare.copyFailed':
    'Couldn’t copy the link. Select the URL below and copy it manually.',
  'calculatorForm.submit': 'Calculate',
  'calculatorForm.reset': 'Reset',
  'calculatorForm.embedToggle': 'Embed This Calculator',
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
  'unit.height.cm': 'e.g. 175…',
  'unit.height.ft': 'e.g. 5.8…',
  'unit.weight.kg': 'e.g. 70…',
  'unit.weight.lb': 'e.g. 155…',
  'cookie.banner.aria': 'Cookie consent',
  'cookie.banner.title': 'We value your privacy',
  'cookie.banner.summary': 'We use cookies to run the site and to measure and personalise ads.',
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
  'newsletter.emailPlaceholder': 'you@example.com…',
  'newsletter.emailLabel': 'Email address',
  'newsletter.validation.invalidEmail': 'Please enter a valid email address',
  'newsletter.status.loading': 'Subscribing…',
  'newsletter.error.generic': 'An error occurred. Please try again later.',
  'newsletter.privacy.prefix': 'By subscribing, you agree to our',
  'newsletter.privacy.privacyPolicy': 'Privacy Policy',
  'newsletter.privacy.and': 'and',
  'newsletter.privacy.terms': 'Terms of Service',
  'newsletter.privacy.suffix': '. We’ll never share your email with anyone else.',
  'savedResults.button.saved': 'Saved',
  'savedResults.button.save': 'Save Result',
  'savedResults.button.loginToSave': 'Sign In to Save',
  'savedResults.helper.loginInstruction':
    'Sign in from the top-right account button to save and sync results on this browser.',
  'savedResults.toast.alreadySaved': 'This result is already saved',
  'savedResults.toast.loginRequired': 'Sign in required to save results',
  'savedResults.toast.saved': 'Result saved successfully',
  'savedResults.toast.saveError':
    'Couldn’t save this result. Allow site storage in your browser settings, then try again.',
  'savedResults.toast.removed': 'Result removed',
  'savedResults.toast.removeError': 'Couldn’t remove this result. Reload the page and try again.',
  'savedResults.toast.cleared': 'All results cleared',
  'savedResults.toast.restored': 'Result restored',
  'savedResults.toast.undo': 'Undo',
  'savedResults.confirm.clearAll': 'Are you sure you want to clear all saved results?',
  'savedResults.list.emptyTitle': 'Saved Results',
  'savedResults.list.emptyBody': 'You haven’t saved any calculator results yet.',
  'savedResults.list.title': 'Saved Results',
  'savedResults.list.clearAll': 'Clear All',
  'savedResults.list.deleteAria': 'Delete result',
  'savedResults.list.goToCalculator': 'Go to Calculator',
  'savedResults.page.title': 'Saved Results',
  'savedResults.page.subtitle':
    'Keep your favorite calculator outputs here so you can revisit them any time. When you’re signed in, saved results can sync across devices.',
  'savedResults.page.signedOut.title': 'You are not signed in',
  'savedResults.page.signedOut.body':
    'Use the Sign In button in the header to sign in or create an account. You’ll be able to save results and access them later.',
  'savedResults.page.signedOut.cta': 'Go Back Home',
  'contactForm.success.title': 'Message Sent!',
  'contactForm.success.button': 'Send Another Message',
  'contactForm.label.name': 'Name',
  'contactForm.label.email': 'Email',
  'contactForm.label.subject': 'Subject',
  'contactForm.label.message': 'Message',
  'contactForm.placeholder.name': 'Jane Smith…',
  'contactForm.placeholder.email': 'you@example.com…',
  'contactForm.placeholder.message': 'e.g. A question about the TDEE calculator…',
  'contactForm.subject.placeholder': 'Select a subject',
  'contactForm.subject.question': 'General Question',
  'contactForm.subject.feedback': 'Feedback',
  'contactForm.subject.bug': 'Report a Bug',
  'contactForm.subject.feature': 'Feature Request',
  'contactForm.subject.other': 'Other',
  'contactForm.error.generic': 'Something went wrong. Please try again.',
  'contactForm.error.network': 'Network error. Please check your connection and try again.',
  'contactForm.button.sending': 'Sending…',
  'contactForm.button.send': 'Send Message',
};

export type LocaleMessages = Record<MessageKey, string>;

export function getMessage(key: MessageKey, messages?: Partial<LocaleMessages>): string {
  return messages?.[key] ?? EN_MESSAGES[key] ?? key;
}
