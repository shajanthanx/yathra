/**
 * The journey, the countdown and the on-track status — the three things Home
 * has to answer.
 */
import { useMemo } from 'react';
import { getExamCountdown, getJourneyPosition, type ExamCountdown, type JourneyPosition } from '@/domain/journey';
import { calculateOnTrackStatus, type OnTrackResult } from '@/domain/onTrack';
import { useProfile, useTasks } from '@/store/useStore';
import { useAcademicYear } from './useContent';
import { useOverallProgress } from './useProgress';
import { useToday } from './useToday';

export function useCountdown(): ExamCountdown | undefined {
  const year = useAcademicYear();
  const profile = useProfile();
  const today = useToday();
  return useMemo(
    () => (year ? getExamCountdown(year, today, profile?.examDateOverride) : undefined),
    [year, today, profile?.examDateOverride],
  );
}

export function useJourney(): JourneyPosition | undefined {
  const year = useAcademicYear();
  const profile = useProfile();
  const today = useToday();
  return useMemo(
    () => (year ? getJourneyPosition(year, today, profile?.examDateOverride) : undefined),
    [year, today, profile?.examDateOverride],
  );
}

export function useOnTrack(): OnTrackResult | undefined {
  const year = useAcademicYear();
  const profile = useProfile();
  const today = useToday();
  const tasks = useTasks();
  const actualProgress = useOverallProgress();

  const examDateOverride = profile?.examDateOverride;

  return useMemo(
    () =>
      year
        ? calculateOnTrackStatus({ year, today, actualProgress, tasks, examDateOverride })
        : undefined,
    [year, today, actualProgress, tasks, examDateOverride],
  );
}
