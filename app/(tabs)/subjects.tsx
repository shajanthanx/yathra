/**
 * Subjects — the student's own curriculum.
 *
 * Each subject gets its own card rather than a row in a shared list: there are
 * only ever three, and giving each one a surface of its own is what makes this
 * read as "my subjects" instead of a settings list.
 */
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Card, EmptyState, Screen, SubjectRow, Text } from '@/components';
import { useOverallProgress, useSubjectSummaries } from '@/hooks/useProgress';
import { percentValue } from '@/i18n/format';
import { plural } from '@/i18n';
import { useT, useTheme } from '@/theme/ThemeProvider';

export default function SubjectsScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const summaries = useSubjectSummaries();
  const overall = useOverallProgress();

  const topicsLeft = summaries.reduce((total, summary) => total + summary.incompleteTopics, 0);

  return (
    <Screen topSafeArea>
      <Text variant="title" accessibilityRole="header" style={{ marginTop: theme.spacing.md }}>
        {t('subjects.title')}
      </Text>

      {summaries.length === 0 ? (
        <View style={{ marginTop: theme.spacing.xl }}>
          <EmptyState
            title={t('subjects.empty.title')}
            body={t('subjects.empty.body')}
            icon="book-open"
            actionLabel={t('settings.profile.changeSubjects')}
            onAction={() => router.push('/settings/profile')}
          />
        </View>
      ) : (
        <>
          <Text variant="body" tone="slate" style={{ marginTop: theme.spacing.xxs }}>
            {topicsLeft > 0
              ? `${t('common.percent', { value: percentValue(overall) })} · ${plural(
                  t,
                  'subjects.topicsLeft',
                  topicsLeft,
                )}`
              : t('subjects.allDone')}
          </Text>

          <View style={{ marginTop: theme.spacing.xl, gap: theme.spacing.sm }}>
            {summaries.map((summary) => (
              <Card key={summary.subjectId} padded={false}>
                <SubjectRow
                  summary={summary}
                  last
                  style={{ paddingHorizontal: theme.spacing.md }}
                  onPress={(subjectId) => router.push(`/subject/${subjectId}`)}
                />
              </Card>
            ))}
          </View>
        </>
      )}
    </Screen>
  );
}
