/**
 * Progress — the figures that change what a student does next, and nothing
 * more.
 *
 * This is where the full on-track panel lives. Home shows the status as a
 * single word next to the journey bar, because the sentence would repeat the
 * coach line directly beneath it; here there is no coach line, so the panel
 * can say what the status means and offer the catch-up plan.
 */
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  AnimatedNumber,
  EmptyState,
  JourneyProgress,
  ListRow,
  ProgressBar,
  Screen,
  SectionHeader,
  StatTile,
  StatusPanel,
  SubjectRow,
  Text,
} from '@/components';
import { useOnTrack } from '@/hooks/useJourney';
import { useAllPapersSummary } from '@/hooks/usePapers';
import { useWeeklyCompletion } from '@/hooks/usePlan';
import { useOverallProgress, useSubjectSummaries } from '@/hooks/useProgress';
import { useWeekStudySeconds } from '@/hooks/useStudyStats';
import { plural } from '@/i18n';
import { formatSeconds, percentValue } from '@/i18n/format';
import { useT, useTheme } from '@/theme/ThemeProvider';

export default function ProgressScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();

  const overall = useOverallProgress();
  const onTrack = useOnTrack();
  const summaries = useSubjectSummaries();
  const week = useWeeklyCompletion();
  const studySeconds = useWeekStudySeconds();
  const papers = useAllPapersSummary();

  const nothingYet =
    overall === 0 && week.total === 0 && studySeconds === 0 && papers.completed === 0;

  return (
    <Screen topSafeArea>
      <Text variant="title" accessibilityRole="header" style={{ marginTop: theme.spacing.md }}>
        {t('progress.title')}
      </Text>

      {nothingYet ? (
        <View style={{ marginTop: theme.spacing.xl }}>
          <EmptyState
            title={t('progress.empty.title')}
            body={t('progress.empty.body')}
            icon="trending-up"
            tint="violet"
            actionLabel={t('tab.subjects')}
            onAction={() => router.push('/(tabs)/subjects')}
          />
        </View>
      ) : (
        <>
          <View style={{ marginTop: theme.spacing.lg }}>
            <AnimatedNumber
              value={percentValue(overall)}
              format={(value) => t('common.percent', { value })}
              variant="display"
              accessibilityLabel={t('a11y.progress', { value: percentValue(overall) })}
            />
            <Text variant="caption" tone="steel">
              {t('progress.overall')}
            </Text>

            {onTrack ? (
              <JourneyProgress
                actual={onTrack.actualProgress}
                expected={onTrack.expectedProgress}
                paceLabel={t('home.pace')}
                accessibilityLabel={t('a11y.pace', {
                  actual: percentValue(onTrack.actualProgress),
                  expected: percentValue(onTrack.expectedProgress),
                })}
                style={{ marginTop: theme.spacing.md }}
              />
            ) : (
              <ProgressBar value={overall} style={{ marginTop: theme.spacing.md }} />
            )}
          </View>

          {onTrack ? (
            <View style={{ marginTop: theme.spacing.xl }}>
              <StatusPanel status={onTrack.status} onCatchUp={() => router.push('/catch-up')} />
            </View>
          ) : null}

          <View style={{ marginTop: theme.spacing.xxl }}>
            <SectionHeader title={t('progress.thisWeek')} variant="heading" />
            <View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
              <StatTile
                style={{ flex: 1 }}
                value={t('common.of', { done: week.completed, total: week.total })}
                label={t('home.tasksDone')}
              />
              <StatTile
                style={{ flex: 1 }}
                value={formatSeconds(t, studySeconds)}
                label={t('progress.studyTime')}
              />
            </View>
          </View>

          {studySeconds === 0 ? (
            <View style={{ marginTop: theme.spacing.lg }}>
              <EmptyState
                title={t('progress.studyEmpty.title')}
                body={t('progress.studyEmpty.body')}
                icon="clock"
                tint="teal"
              />
            </View>
          ) : null}

          {summaries.length > 0 ? (
            <View style={{ marginTop: theme.spacing.xxl }}>
              <SectionHeader title={t('progress.subjects')} variant="heading" />
              {summaries.map((summary, index) => (
                <SubjectRow
                  key={summary.subjectId}
                  summary={summary}
                  last={index === summaries.length - 1}
                  onPress={(subjectId) => router.push(`/subject/${subjectId}`)}
                />
              ))}
            </View>
          ) : null}

          <View style={{ marginTop: theme.spacing.xxl }}>
            <ListRow
              title={t('progress.pastPapers')}
              value={plural(t, 'progress.pastPapersCount', papers.completed)}
              onPress={() => router.push('/past-papers')}
              showChevron
            />
            <ListRow
              title={t('progress.weeklyReview')}
              onPress={() => router.push('/weekly-review')}
              showChevron
              last
            />
          </View>
        </>
      )}
    </Screen>
  );
}
