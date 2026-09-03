import { View } from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { Card, DetailScreen, SectionHeader, Text } from '@/components';
import { useT, useTheme } from '@/theme/ThemeProvider';

export default function AboutScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <DetailScreen title={t('about.title')} onBack={() => router.back()}>
      <View style={{ marginTop: theme.spacing.md }}>
        <Text variant="title">{t('common.appName')}</Text>
        <Text variant="body" tone="slate" style={{ marginTop: theme.spacing.xs }}>
          {t('about.tagline')}
        </Text>
      </View>

      <Card style={{ marginTop: theme.spacing.xl }}>
        <Text variant="subheading">{t('about.privacyTitle')}</Text>
        <Text variant="bodySm" tone="slate" style={{ marginTop: theme.spacing.xs }}>
          {t('about.privacyBody')}
        </Text>
      </Card>

      <View style={{ marginTop: theme.spacing.xxl }}>
        <SectionHeader title={t('about.contentTitle')} variant="heading" />
        <Text variant="bodySm" tone="slate">
          {t('about.contentBody')}
        </Text>
      </View>

      <Text variant="caption" tone="stone" style={{ marginTop: theme.spacing.xxl }}>
        {t('about.version', { version })}
      </Text>
    </DetailScreen>
  );
}
