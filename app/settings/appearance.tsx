import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { DetailScreen, ListRow } from '@/components';
import { setAppearance } from '@/store/appStore';
import { useSettings } from '@/store/useStore';
import { useT, useTheme } from '@/theme/ThemeProvider';
import type { Appearance } from '@/types/models';

const OPTIONS: Appearance[] = ['system', 'light', 'dark'];

export default function AppearanceSettings() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const settings = useSettings();

  return (
    <DetailScreen title={t('settings.appearance.title')} onBack={() => router.back()}>
      <View style={{ marginTop: theme.spacing.md }}>
        {OPTIONS.map((option, index) => (
          <ListRow
            key={option}
            title={t(`settings.appearance.${option}`)}
            onPress={() => setAppearance(option)}
            last={index === OPTIONS.length - 1}
            trailing={
              settings.appearance === option ? (
                <Feather name="check" size={theme.sizes.iconSm} color={theme.colors.primary} />
              ) : undefined
            }
          />
        ))}
      </View>
    </DetailScreen>
  );
}
