/**
 * More — settings and the things a student reaches for occasionally.
 *
 * It opens with the student's own cohort, stream and subject marks. That is
 * the only place in the app that states the whole profile in one line, and it
 * makes the screen feel like theirs rather than a list of preferences.
 */
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, ListRow, Screen, SectionHeader, SubjectMark, Text } from '@/components';
import { useAcademicYear, useLocalize, useSelectedSubjectIds, useStream } from '@/hooks/useContent';
import { LANGUAGES } from '@/i18n';
import { useSettings } from '@/store/useStore';
import { useT, useTheme } from '@/theme/ThemeProvider';

export default function MoreScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const settings = useSettings();
  const localize = useLocalize();
  const stream = useStream();
  const year = useAcademicYear();
  const subjectIds = useSelectedSubjectIds();

  const languageName = LANGUAGES.find((l) => l.code === settings.language)?.nativeName ?? '';
  const appearanceLabel = t(`settings.appearance.${settings.appearance}`);
  const profileValue = year ? t('onboarding.year.option', { year: year.examYear }) : undefined;

  return (
    <Screen topSafeArea>
      <Text variant="title" accessibilityRole="header" style={{ marginTop: theme.spacing.md }}>
        {t('more.title')}
      </Text>

      {year || stream || subjectIds.length > 0 ? (
        <View style={{ marginTop: theme.spacing.md }}>
          {year ? (
            <Text variant="body" tone="slate">
              {stream
                ? `${t('onboarding.year.option', { year: year.examYear })} · ${localize(stream.name)}`
                : t('onboarding.year.option', { year: year.examYear })}
            </Text>
          ) : null}
          {subjectIds.length > 0 ? (
            <View style={{ flexDirection: 'row', gap: theme.spacing.xs, marginTop: theme.spacing.sm }}>
              {subjectIds.map((id) => (
                <SubjectMark key={id} subjectId={id} size="sm" />
              ))}
            </View>
          ) : null}
        </View>
      ) : null}

      <View style={{ marginTop: theme.spacing.xxl }}>
        <SectionHeader title={t('settings.appearance.title')} />
        <ListRow
          title={t('more.language')}
          value={languageName}
          onPress={() => router.push('/settings/language')}
          showChevron
        />
        <ListRow
          title={t('more.appearance')}
          value={appearanceLabel}
          onPress={() => router.push('/settings/appearance')}
          showChevron
          last
        />
      </View>

      <View style={{ marginTop: theme.spacing.xxl }}>
        <SectionHeader title={t('more.profile')} />
        <ListRow
          title={t('settings.profile.title')}
          {...(profileValue === undefined ? {} : { value: profileValue })}
          {...(stream ? { subtitle: localize(stream.name) } : {})}
          onPress={() => router.push('/settings/profile')}
          showChevron
        />
        <ListRow
          title={t('more.exam')}
          onPress={() => router.push('/settings/exam')}
          showChevron
          last
        />
      </View>

      <View style={{ marginTop: theme.spacing.xxl }}>
        <SectionHeader title={t('tab.progress')} />
        <ListRow
          title={t('more.pastPapers')}
          onPress={() => router.push('/past-papers')}
          showChevron
        />
        <ListRow
          title={t('more.weeklyReview')}
          onPress={() => router.push('/weekly-review')}
          showChevron
          last
        />
      </View>

      <View style={{ marginTop: theme.spacing.xxl }}>
        <SectionHeader title={t('more.data')} />
        <ListRow
          title={t('settings.data.title')}
          onPress={() => router.push('/settings/data')}
          showChevron
        />
        <ListRow
          title={t('more.about')}
          onPress={() => router.push('/settings/about')}
          showChevron
          last
        />
      </View>

      <Card style={{ marginTop: theme.spacing.xxl }}>
        <Text variant="bodySmMedium">{t('more.privacyLine')}</Text>
        <Text variant="caption" tone="slate" style={{ marginTop: theme.spacing.xxs }}>
          {t('about.privacyBody')}
        </Text>
      </Card>
    </Screen>
  );
}
