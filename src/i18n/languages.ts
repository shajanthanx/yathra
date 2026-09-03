import type { LanguageCode } from '@/types/content';

export interface LanguageOption {
  code: LanguageCode;
  /** Always shown in the language's own script, never translated. */
  nativeName: string;
  englishName: string;
}

export const LANGUAGES: readonly LanguageOption[] = [
  { code: 'en', nativeName: 'English', englishName: 'English' },
  { code: 'si', nativeName: 'සිංහල', englishName: 'Sinhala' },
  { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export function isLanguageCode(value: unknown): value is LanguageCode {
  return value === 'en' || value === 'si' || value === 'ta';
}
