/**
 * Weekly review. Calculated from local data the moment it is opened — a
 * student never has to generate a report.
 *
 * It is meant to feel like a reward rather than a scorecard, so the week's
 * completion leads as a single ring and the per-subject verdicts sit below it
 * as ordinary rows with their own marks.
 */
import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {
  Badge,
  DetailScreen,
  EmptyState,
  ListRow,
  ProgressRing,
  SectionHeader,
  SegmentedControl,
  StatTile,
  SubjectMark,
  Text,
} from '@/components';
import type { SubjectWeek } from '@/domain/weeklyReview';
import { useLocalize, useSubjectName } from '@/hooks/useContent';
import { useWeeklyReview } from '@/hooks/useReview';
import { useToday } from '@/hooks/useToday';
import { formatSeconds, percentValue } from '@/i18n/format';
import { useT, useTheme } from '@/theme/ThemeProvider';
import { addDays } from '@/utils/date';

type Week = 'this' | 'last';

const VERDICT: Record<
  SubjectWeek['verdict'],
  { label: 'review.subjectGood' | 'review.subjectAttention' | 'review.subjectQuiet'; tone: 'success' | 'warning' | 'neutral'; icon: 'check' | 'alert-triangle' | 'minus' }
> = {
  good: { label: 'review.subjectGood', tone: 'success', icon: 'check' },
  attention: { label: 'review.subjectAttention', tone: 'warning', icon: 'alert-triangle' },
  quiet: { label: 'review.subjectQuiet', tone: 'neutral', icon: 'minus' },
};

export default function WeeklyReviewScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const today = useToday();
  const localize = useLocalize();
  const subjectName = useSubjectName();

  const [week, setWeek] = useState<Week>('this');
  const review = useWeeklyReview(week === 'this' ? today : addDays(today, -7));

  return (
    <DetailScreen title={t('review.title')} onBack={() => router.back()}>
      <SegmentedControl
        options={[
          { value: 'this', label: t('review.thisWeek') },
          { value: 'last', label: t('review.lastWeek') },
        ]}
        value={week}
        onChange={setWeek}
        style={{ marginTop: theme.spacing.md }}
      />

      {review.isEmpty ? (
        <View style={{ marginTop: theme.spacing.xl }}>
          <EmptyState
            title={t('review.empty.title')}
            body={t('review.empty.body')}
            icon="calendar"
            tint="violet"
          />
        </View>
      ) : (
        <>
          <View style={{ marginTop: theme.spacing.xxl, alignItems: 'center' }}>
            <ProgressRing
              value={review.rate}
              size={theme.sizes.ring}
              accessibilityLabel={t('a11y.progress', { value: percentValue(review.rate) })}
            >
              <Text variant="heading" maxFontSizeMultiplier={1.2}>
                {t('common.percent', { value: percentValue(review.rate) })}
              </Text>
            </ProgressRing>

            <Text
              variant="body"
              tone="slate"
              align="center"
              style={{ marginTop: theme.spacing.md }}
            >
              {review.planned === 0
                ? t('review.noTasks')
                : t('review.tasksLine', { done: review.completed, total: review.planned })}
            </Text>
          </View>

          <View
            style={{ marginTop: theme.spacing.xxl, flexDirection: 'row', gap: theme.spacing.md }}
          >
            <StatTile
              style={{ flex: 1 }}
              variant="heading"
              value={String(review.topicsCompleted)}
              label={t('review.topicsCompleted')}
            />
            <StatTile
              style={{ flex: 1 }}
              variant="heading"
              value={formatSeconds(t, review.studySeconds)}
              label={t('review.studyTime')}
            />
          </View>

          <View style={{ marginTop: theme.spacing.xxl }}>
            <SectionHeader title={t('progress.subjects')} variant="heading" />
            {review.subjects.map((subject, index) => {
              const verdict = VERDICT[subject.verdict];
              return (
                <ListRow
                  key={subject.subjectId}
                  title={subjectName(subject.subjectId)}
                  last={index === review.subjects.length - 1}
                  leading={
                    <SubjectMark
                      subjectId={subject.subjectId}
                      size="sm"
                      style={{ marginRight: theme.spacing.sm }}
                    />
                  }
                  trailing={
                    <Badge label={t(verdict.label)} tone={verdict.tone} icon={verdict.icon} />
                  }
                />
              );
            })}
          </View>

          <View style={{ marginTop: theme.spacing.xxl }}>
            <SectionHeader title={t('review.focusTitle')} variant="heading" />
            {review.nextFocus.length === 0 ? (
              <Text variant="bodySm" tone="slate">
                {t('review.focusEmpty')}
              </Text>
            ) : (
              review.nextFocus.map((topic) => (
                <View
                  key={topic.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: theme.spacing.xs,
                  }}
                >
                  <Feather name="arrow-right" size={16} color={theme.colors.steel} />
                  <Text variant="body" style={{ marginLeft: theme.spacing.xs, flex: 1 }}>
                    {localize(topic.name)}
                  </Text>
                </View>
              ))
            )}
          </View>
        </>
      )}
    </DetailScreen>
  );
}
