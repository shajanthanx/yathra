/**
 * Tiny translation layer. No i18n library: three typed dictionaries, a
 * placeholder substitution and a one/other plural rule (which is correct for
 * English, Sinhala and Tamil) are all this app needs.
 */
import type { LanguageCode, LocalizedText } from '@/types/content';
import { en, type Dictionary, type TranslationKey } from './en';
import { si } from './si';
import { ta } from './ta';
import { DEFAULT_LANGUAGE } from './languages';

export type { TranslationKey, Dictionary };
export { LANGUAGES, DEFAULT_LANGUAGE, isLanguageCode, type LanguageOption } from './languages';

const DICTIONARIES: Record<LanguageCode, Dictionary> = { en, si, ta };

export function getDictionary(language: LanguageCode): Dictionary {
  return DICTIONARIES[language] ?? DICTIONARIES[DEFAULT_LANGUAGE];
}

export type TranslateParams = Record<string, string | number>;

const PLACEHOLDER = /\{(\w+)\}/g;

export function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template;
  return template.replace(PLACEHOLDER, (match, name: string) => {
    const value = params[name];
    return value === undefined ? match : String(value);
  });
}

export type TranslateFn = (key: TranslationKey, params?: TranslateParams) => string;

export function createTranslator(language: LanguageCode): TranslateFn {
  const dictionary = getDictionary(language);
  return (key, params) => {
    // Falling back to English keeps a screen readable if a key is ever missing.
    const template = dictionary[key] ?? en[key] ?? key;
    return interpolate(template, params);
  };
}

/**
 * Plural helper. `base` is a key stem: `plural(t, 'plan.tasksCount', n)` reads
 * `plan.tasksCount.one` or `plan.tasksCount.other` and passes {count}.
 */
type WithOne<K extends string> = K extends `${infer Base}.one` ? Base : never;
type WithOther<K extends string> = K extends `${infer Base}.other` ? Base : never;

/** Key stems that have both a `.one` and an `.other` form in every dictionary. */
export type PluralKey = WithOne<TranslationKey> & WithOther<TranslationKey>;

export function plural(
  t: TranslateFn,
  base: PluralKey,
  count: number,
  params?: TranslateParams,
): string {
  const key = (count === 1 ? `${base}.one` : `${base}.other`) as TranslationKey;
  return t(key, { count, ...params });
}

/** Resolves bundled content (subject, unit and topic names) for a language. */
export function localize(text: LocalizedText, language: LanguageCode): string {
  return text[language] || text.en;
}
