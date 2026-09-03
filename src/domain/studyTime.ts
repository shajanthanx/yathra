/** Study-session totals. */
import type { LocalDate, SubjectId } from '@/types/content';
import type { ActiveStudySession, StudySession } from '@/types/models';
import { endOfWeek, localDateOf, startOfWeek } from '@/utils/date';

/** Sessions shorter than this are not worth recording. */
export const MIN_SESSION_SECONDS = 60;

export function sessionsInRange(
  sessions: readonly StudySession[],
  from: LocalDate,
  to: LocalDate,
): StudySession[] {
  return sessions.filter((session) => {
    const date = localDateOf(session.startedAt);
    return date >= from && date <= to;
  });
}

export function totalSeconds(sessions: readonly StudySession[]): number {
  return sessions.reduce((sum, session) => sum + Math.max(0, session.durationSeconds), 0);
}

export function totalSecondsInRange(
  sessions: readonly StudySession[],
  from: LocalDate,
  to: LocalDate,
): number {
  return totalSeconds(sessionsInRange(sessions, from, to));
}

export function weekStudySeconds(sessions: readonly StudySession[], date: LocalDate): number {
  return totalSecondsInRange(sessions, startOfWeek(date), endOfWeek(date));
}

export function secondsBySubject(sessions: readonly StudySession[]): Map<SubjectId, number> {
  const map = new Map<SubjectId, number>();
  for (const session of sessions) {
    map.set(session.subjectId, (map.get(session.subjectId) ?? 0) + Math.max(0, session.durationSeconds));
  }
  return map;
}

/**
 * Seconds a running timer has accumulated, measured against the wall clock so
 * that time spent with the app in the background still counts.
 */
export function elapsedSeconds(session: ActiveStudySession, now: number = Date.now()): number {
  const running = session.runningSince === null ? 0 : Math.max(0, (now - session.runningSince) / 1000);
  return Math.floor(session.accumulatedSeconds + running);
}

export function remainingSeconds(session: ActiveStudySession, now: number = Date.now()): number {
  return Math.max(0, session.plannedSeconds - elapsedSeconds(session, now));
}

export function isSessionWorthSaving(seconds: number): boolean {
  return seconds >= MIN_SESSION_SECONDS;
}
