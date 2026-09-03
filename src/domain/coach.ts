/**
 * The one encouraging line Home shows under the hero.
 *
 * It is chosen deterministically from what the student has actually done, so
 * it is never a generic quote and never a reward for nothing. The order below
 * is the priority order: the exam itself outranks everything, finishing the
 * day's plan outranks the on-track status, and the status outranks a bare
 * count of work done.
 *
 * This returns an id rather than a translation key so the domain layer keeps
 * no dependency on the dictionaries; the hook that renders it maps id to key.
 * Nothing here shames the student for being behind - the brief is explicit
 * that falling behind is stated as a next step, not a judgement.
 */
import type { ExamPhase } from './journey';
import type { OnTrackStatus } from './onTrack';

export type CoachMessageId =
  | 'examDone'
  | 'examPeriod'
  | 'notStarted'
  | 'allDoneToday'
  | 'behind'
  | 'catchingUp'
  | 'someDoneToday'
  | 'topicsThisWeek'
  | 'justStarted'
  | 'onTrack'
  | 'quiet';

export interface CoachInput {
  status: OnTrackStatus;
  examPhase: ExamPhase;
  /** True before the cohort's journey has begun. */
  notStarted: boolean;
  tasksToday: number;
  tasksCompletedToday: number;
  topicsCompletedThisWeek: number;
}

export interface CoachMessage {
  id: CoachMessageId;
  /** Present only for the messages whose copy names a number. */
  count?: number;
}

export function selectCoachMessage(input: CoachInput): CoachMessage {
  const {
    status,
    examPhase,
    notStarted,
    tasksToday,
    tasksCompletedToday,
    topicsCompletedThisWeek,
  } = input;

  if (examPhase === 'after') return { id: 'examDone' };
  if (examPhase === 'during') return { id: 'examPeriod' };
  if (notStarted) return { id: 'notStarted' };

  if (tasksToday > 0 && tasksCompletedToday >= tasksToday) {
    return { id: 'allDoneToday' };
  }

  if (status === 'behind') return { id: 'behind' };
  if (status === 'catching_up') return { id: 'catchingUp' };

  if (tasksCompletedToday > 0) {
    return { id: 'someDoneToday', count: tasksCompletedToday };
  }
  if (topicsCompletedThisWeek > 0) {
    return { id: 'topicsThisWeek', count: topicsCompletedThisWeek };
  }

  if (status === 'just_started') return { id: 'justStarted' };
  if (status === 'on_track') return { id: 'onTrack' };

  return { id: 'quiet' };
}
