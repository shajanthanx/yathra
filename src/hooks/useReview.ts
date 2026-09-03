/**
 * Weekly review and catch-up plan hooks. Both are pure derivations of local
 * data — nothing is generated ahead of time or stored.
 */
import { useMemo } from 'react';
import { generateCatchUpPlan, type CatchUpPlan } from '@/domain/catchUp';
import { buildWeeklyReview, type WeeklyReview } from '@/domain/weeklyReview';
import { localize } from '@/i18n';
import { useLanguage } from '@/theme/ThemeProvider';
import { useSessions, useTasks, useTopicProgress } from '@/store/useStore';
import type { LocalDate } from '@/types/content';
import { useSelectedSyllabi } from './useContent';
import { useOnTrack } from './useJourney';
import { useToday } from './useToday';

export function useWeeklyReview(date?: LocalDate): WeeklyReview {
  const today = useToday();
  const tasks = useTasks();
  const sessions = useSessions();
  const syllabi = useSelectedSyllabi();
  const progress = useTopicProgress();
  const anchor = date ?? today;

  return useMemo(
    () => buildWeeklyReview({ date: anchor, tasks, sessions, syllabi, progress }),
    [anchor, tasks, sessions, syllabi, progress],
  );
}

export function useCatchUpPlan(): CatchUpPlan {
  const today = useToday();
  const tasks = useTasks();
  const syllabi = useSelectedSyllabi();
  const progress = useTopicProgress();
  const onTrack = useOnTrack();
  const language = useLanguage();
  const gap = onTrack?.gap ?? 0;

  return useMemo(
    () =>
      generateCatchUpPlan({
        today,
        syllabi,
        progress,
        tasks,
        gap,
        topicTitle: (topic) => localize(topic.name, language),
      }),
    [today, syllabi, progress, tasks, gap, language],
  );
}
