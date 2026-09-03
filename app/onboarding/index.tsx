/** Step 1 — language. Offered in each language's own script. */
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { OptionCard } from '@/components';
import { LANGUAGES } from '@/i18n';
import { OnboardingStep } from '@/screens/onboarding/OnboardingStep';
import { setLanguage } from '@/store/appStore';
import { useSettings } from '@/store/useStore';
import { useT, useTheme } from '@/theme/ThemeProvider';

export default function LanguageStep() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const settings = useSettings();

  return (
    <OnboardingStep
      step={1}
      title={t('onboarding.language.title')}
      subtitle={t('onboarding.language.subtitle')}
      actionLabel={t('common.continue')}
      onAction={() => router.push('/onboarding/year')}
      showBack={false}
    >
      <View style={{ gap: theme.spacing.sm }}>
        {LANGUAGES.map((language) => (
          <OptionCard
            key={language.code}
            title={language.nativeName}
            subtitle={language.englishName}
            selected={settings.language === language.code}
            onPress={() => setLanguage(language.code)}
          />
        ))}
      </View>
    </OnboardingStep>
  );
}
