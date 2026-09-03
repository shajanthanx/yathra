/**
 * Theme and language context.
 *
 * The theme follows the device by default and can be overridden in Settings,
 * as the design system asks. Language lives here too so a single hook gives a
 * component everything it needs to render text.
 */
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { createTranslator, type TranslateFn } from '@/i18n';
import { useSettings } from '@/store/useStore';
import type { LanguageCode } from '@/types/content';
import { darkTheme, lightTheme, type Theme } from './tokens';

interface ThemeContextValue {
  theme: Theme;
  language: LanguageCode;
  t: TranslateFn;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const settings = useSettings();
  const systemScheme = useColorScheme();

  const value = useMemo<ThemeContextValue>(() => {
    const scheme =
      settings.appearance === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : settings.appearance;
    return {
      theme: scheme === 'dark' ? darkTheme : lightTheme,
      language: settings.language,
      t: createTranslator(settings.language),
    };
  }, [settings.appearance, settings.language, systemScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('ThemeProvider is missing above this component');
  return context;
}

export function useTheme(): Theme {
  return useThemeContext().theme;
}

export function useT(): TranslateFn {
  return useThemeContext().t;
}

export function useLanguage(): LanguageCode {
  return useThemeContext().language;
}

/** Theme, translator and language in one call — what most screens need. */
export function useUI(): ThemeContextValue {
  return useThemeContext();
}
