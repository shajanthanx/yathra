/**
 * The "am I on track?" model.
 *
 * Deliberately simple and deterministic: compare how far through the syllabus
 * the student should be with how far they actually are, then temper that with
 * how their recent tasks have gone. The wording it drives is encouraging by
 * design — the status exists to point at a next step, not to grade anyone.
 */
import type { AcademicYear, LocalDate } from '@/types/content';
import type { Task } from '@/types/models';
import { getExpectedProgress, getJourneyPosition } from './journey';
import { overdueTasks, recentCompletion } from './tasks';

export type OnTrackStatus = 'just_started' | 'on_track' | 'catching_up' | 'behind';

export interface OnTrackResult {
  status: OnTrackStatus;
  /** How far through the syllabus the student should be, 0–1. */
  expectedProgress: number;
  /** How far through they actually are, 0–1. */
  actualProgress: number;
  /** expected − actual, positive when behind. */
  gap: number;
  overdueCount: number;
  recentCompletionRate: number;
}

/** A journey younger than this counts as "just started". */
export const JUST_STARTED_DAYS = 14;
export const RECENT_WINDOW_DAYS = 14;

const ON_TRACK_GAP = 0.05;
const BEHIND_GAP = 0.15;
const SOFT_BEHIND_GAP = 0.1;
const ON_TRACK_OVERDUE = 2;
const BEHIND_OVERDUE = 8;
const LOW_COMPLETION = 0.5;

export interface OnTrackInput {
  year: AcademicYear;
  today: LocalDate;
  actualProgress: number;
  tasks: readonly Task[];
  examDateOverride?: LocalDate | undefined;
}

export function calculateOnTrackStatus(input: OnTrackInput): OnTrackResult {
  const { year, today, actualProgress, tasks, examDateOverride } = input;

  const journey = getJourneyPosition(year, today, examDateOverride);
  const expectedProgress = getExpectedProgress(year, today, examDateOverride);
  const gap = expectedProgress - actualProgress;
  const overdueCount = overdueTasks(tasks, today).length;
  const recent = recentCompletion(tasks, today, RECENT_WINDOW_DAYS);

  const base: Omit<OnTrackResult, 'status'> = {
    expectedProgress,
    actualProgress,
    gap,
    overdueCount,
    recentCompletionRate: recent.rate,
  };

  // Nothing meaningful to judge yet: a new cohort, or a student who has not
  // recorded anything. Saying "behind" here would be both wrong and unkind.
  if (journey.notStarted || journey.daysElapsed < JUST_STARTED_DAYS) {
    return { ...base, status: 'just_started' };
  }
  if (actualProgress === 0 && tasks.length === 0) {
    return { ...base, status: 'just_started' };
  }

  if (gap > BEHIND_GAP || overdueCount >= BEHIND_OVERDUE) {
    return { ...base, status: 'behind' };
  }
  if (gap > SOFT_BEHIND_GAP && recent.total > 0 && recent.rate < LOW_COMPLETION) {
    return { ...base, status: 'behind' };
  }
  if (gap <= ON_TRACK_GAP && overdueCount <= ON_TRACK_OVERDUE) {
    return { ...base, status: 'on_track' };
  }
  return { ...base, status: 'catching_up' };
}

export function needsCatchUp(status: OnTrackStatus): boolean {
  return status === 'catching_up' || status === 'behind';
}
