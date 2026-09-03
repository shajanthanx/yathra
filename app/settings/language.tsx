import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { DetailScreen, ListRow } from '@/components';
import { LANGUAGES } from '@/i18n';
import { setLanguage } from '@/store/appStore';
import { useSettings } from '@/store/useStore';
import { useT, useTheme } from '@/theme/ThemeProvider';

export default function LanguageSettings() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const settings = useSettings();

  return (
    <DetailScreen title={t('settings.language.title')} onBack={() => router.back()}>
      <View style={{ marginTop: theme.spacing.md }}>
        {LANGUAGES.map((language, index) => (
          <ListRow
            key={language.code}
            title={language.nativeName}
            subtitle={language.englishName}
            onPress={() => setLanguage(language.code)}
            last={index === LANGUAGES.length - 1}
            trailing={
              settings.language === language.code ? (
                <Feather name="check" size={theme.sizes.iconSm} color={theme.colors.primary} />
              ) : undefined
            }
          />
        ))}
      </View>
    </DetailScreen>
  );
}
