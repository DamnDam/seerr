import { shouldPolyfill as shouldPolyfillLocale } from '@formatjs/intl-locale/should-polyfill';
import { shouldPolyfill as shouldPolyfillPluralrules } from '@formatjs/intl-pluralrules/should-polyfill';

const polyfillLocale = async () => {
  if (shouldPolyfillLocale()) {
    await import('@formatjs/intl-locale/polyfill');
  }
};

const polyfillPluralRules = async (locale: string) => {
  const unsupportedLocale = shouldPolyfillPluralrules(locale);
  // This locale is supported
  if (!unsupportedLocale) {
    return;
  }
  // Load the polyfill 1st BEFORE loading data
  await import('@formatjs/intl-pluralrules/polyfill-force');
  await import(`@formatjs/intl-pluralrules/locale-data/${unsupportedLocale}`);
};

export const polyfillIntl = async (locale: string) => {
  await polyfillLocale();
  await polyfillPluralRules(locale);
};
