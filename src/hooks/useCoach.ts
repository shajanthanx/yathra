/**
 * The coach line Home shows under the hero. The choice itself is a pure domain
 * function; this only gathers the state it needs and turns the chosen id into
 * localized copy.
 */
import { useMemo } from 'react';
import { selectCoachMessage } from '@/domain/coach';
import { plural, type PluralKey, type TranslationKey } from '@/i18n';
import { useT } from '@/theme/ThemeProvider';
import { useCountdown, useJourney, useOnTrack } from './useJourney';
import { useTodayTasks } from './usePlan';
import { useWeeklyReview } from './useReview';

export function useCoachMessage(): string {
  const t = useT();
  const onTrack = useOnTrack();
  const countdown = useCountdown();
  const journey = useJourney();
  const todayTasks = useTodayTasks();
  const review = useWeeklyReview();

  const completedToday = useMemo(
    () => todayTasks.filter((task) => task.completed).length,
    [todayTasks],
  );

  const message = useMemo(
    () =>
      selectCoachMessage({
        status: onTrack?.status ?? 'just_started',
        examPhase: countdown?.phase ?? 'before',
        notStarted: journey?.notStarted ?? false,
        tasksToday: todayTasks.length,
        tasksCompletedToday: completedToday,
        topicsCompletedThisWeek: review.topicsCompleted,
      }),
    [
      onTrack?.status,
      countdown?.phase,
      journey?.notStarted,
      todayTasks.length,
      completedToday,
      review.topicsCompleted,
    ],
  );

  // Only the two counted messages carry plural forms.
  return message.count === undefined
    ? t(`coach.${message.id}` as TranslationKey)
    : plural(t, `coach.${message.id}` as PluralKey, message.count);
}
