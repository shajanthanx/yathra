/**
 * Catch-up. Shows exactly what the next seven days would look like before
 * anything is created, and keeps the plan small on purpose: the point is to
 * make recovery feel possible, not to hand over a backlog.
 *
 * The heading is a tint panel rather than plain text, so the screen reads as
 * help being offered instead of a verdict being delivered.
 */
import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Button,
  DetailScreen,
  EmptyState,
  ListRow,
  MessageScreen,
  SectionHeader,
  SubjectMark,
  Text,
  TintPanel,
  useTintForeground,
} from '@/components';
import { MAX_TASKS_PER_DAY } from '@/domain/catchUp';
import { useSubjectName } from '@/hooks/useContent';
import { useOnTrack } from '@/hooks/useJourney';
import { useCatchUpPlan } from '@/hooks/useReview';
import { useToday } from '@/hooks/useToday';
import { plural } from '@/i18n';
import { formatMinutes, formatRelativeDay } from '@/i18n/format';
import { addTasks, rescheduleTasks } from '@/store/appStore';
import { useT, useTheme } from '@/theme/ThemeProvider';

export default function CatchUpScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const today = useToday();
  const subjectName = useSubjectName();
  const plan = useCatchUpPlan();
  const onTrack = useOnTrack();
  const panelText = useTintForeground('amber');
  const [created, setCreated] = useState(0);

  const farBehind = (onTrack?.gap ?? 0) > 0.15;

  const apply = () => {
    // Overdue tasks move to the day the plan gave them; new topic tasks are
    // created in place. Both happen in one step so the plan matches the preview.
    for (const day of plan.days) {
      const rescheduleIds = day.items
        .filter((item) => item.kind === 'reschedule' && item.taskId)
        .map((item) => item.taskId as string);
      if (rescheduleIds.length > 0) rescheduleTasks(rescheduleIds, day.date);

      const newTasks = day.items
        .filter((item) => item.kind === 'topic')
        .map((item) => ({
          title: item.title,
          subjectId: item.subjectId,
          ...(item.topicId === undefined ? {} : { topicId: item.topicId }),
          date: day.date,
          durationMinutes: item.durationMinutes,
          source: 'catch_up' as const,
        }));
      if (newTasks.length > 0) addTasks(newTasks);
    }
    setCreated(plan.totalItems);
  };

  if (created > 0) {
    return (
      <MessageScreen
        title={plural(t, 'catchUp.created', created)}
        icon="check-circle"
        tint="teal"
        appBar={{ title: t('catchUp.title'), onClose: () => router.back() }}
      >
        <Button label={t('home.viewPlan')} onPress={() => router.replace('/(tabs)/plan')} />
      </MessageScreen>
    );
  }

  return (
    <DetailScreen
      title={t('catchUp.title')}
      onBack={() => router.back()}
      bottomInset={theme.spacing.md}
    >
      {plan.isEmpty ? (
        <View style={{ marginTop: theme.spacing.xl }}>
          <EmptyState
            title={t('catchUp.nothing.title')}
            body={t('catchUp.nothing.body')}
            icon="check-circle"
            tint="teal"
          />
        </View>
      ) : (
        <>
          <TintPanel tint="amber" style={{ marginTop: theme.spacing.md }}>
            <Text variant="heading" color={panelText} accessibilityRole="header">
              {farBehind ? t('catchUp.headingFarBehind') : t('catchUp.headingBehind')}
            </Text>
            <Text
              variant="bodySm"
              color={panelText}
              style={{ marginTop: theme.spacing.xs, opacity: 0.9 }}
            >
              {t('catchUp.subtitle')}
            </Text>
          </TintPanel>

          {plan.subjects.length > 0 ? (
            <View style={{ marginTop: theme.spacing.xl }}>
              {plan.subjects.map((subject, index) => (
                <ListRow
                  key={subject.subjectId}
                  title={subjectName(subject.subjectId)}
                  value={plural(t, 'catchUp.topicsCount', subject.topics.length)}
                  last={index === plan.subjects.length - 1}
                  leading={
                    <SubjectMark
                      subjectId={subject.subjectId}
                      size="sm"
                      style={{ marginRight: theme.spacing.sm }}
                    />
                  }
                />
              ))}
            </View>
          ) : null}

          {plan.rescheduledTaskIds.length > 0 ? (
            <Text variant="bodySm" tone="slate" style={{ marginTop: theme.spacing.md }}>
              {plural(t, 'catchUp.overdueTasks', plan.rescheduledTaskIds.length)}
            </Text>
          ) : null}

          <View style={{ marginTop: theme.spacing.xxl }}>
            <SectionHeader title={t('catchUp.preview')} variant="heading" />
            {plan.days.map((day) => (
              <View
                key={day.date}
                style={{
                  paddingVertical: theme.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.hairlineSoft,
                }}
              >
                <Text variant="bodySmMedium">{formatRelativeDay(t, day.date, today)}</Text>
                {day.items.map((item, index) => (
                  <View
                    key={`${item.kind}-${item.taskId ?? item.topicId ?? index}`}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: theme.spacing.xs,
                      gap: theme.spacing.sm,
                    }}
                  >
                    <SubjectMark subjectId={item.subjectId} size="sm" />
                    <Text variant="bodySm" tone="slate" style={{ flex: 1 }} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text variant="caption" tone="stone">
                      {formatMinutes(t, item.durationMinutes)}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
            <Text variant="caption" tone="stone" style={{ marginTop: theme.spacing.sm }}>
              {t('catchUp.dailyLimitNote', { count: MAX_TASKS_PER_DAY })}
            </Text>
          </View>

          <Button
            label={t('catchUp.create')}
            onPress={apply}
            style={{ marginTop: theme.spacing.xxl }}
          />
        </>
      )}
    </DetailScreen>
  );
}
