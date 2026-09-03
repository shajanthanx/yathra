/**
 * Hand-written type guards and input rules.
 *
 * Everything read back from storage or from an imported backup passes through
 * here, so a corrupted or hand-edited file can never put malformed records into
 * the running app. Guards are deliberately tolerant of unknown extra fields and
 * strict about the fields the app relies on.
 */
import { isAcademicYearId } from '@/data/academic-years';
import { isStreamId } from '@/data/curriculum/streams';
import { isSubjectId } from '@/data/curriculum/subject-ids';
import { isLanguageCode } from '@/i18n/languages';
import type {
  ActiveStudySession,
  Appearance,
  AppSettings,
  PastPaperMap,
  PastPaperRecord,
  PastPaperStatus,
  StudentProfile,
  StudySession,
  Task,
  TaskSource,
  TopicProgress,
  TopicProgressMap,
  TopicStatus,
} from '@/types/models';
import { isValidLocalDate } from '@/utils/date';

export const TASK_TITLE_MAX = 120;
export const NOTE_MAX = 280;
export const DURATION_MIN = 5;
export const DURATION_MAX = 600;
export const SCORE_MIN = 0;
export const SCORE_MAX = 100;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isISODateTime(value: unknown): value is string {
  if (typeof value !== 'string' || value.length < 10) return false;
  return !Number.isNaN(Date.parse(value));
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isTopicStatus(value: unknown): value is TopicStatus {
  return value === 'not_started' || value === 'learning' || value === 'practising' || value === 'completed';
}

export function isPastPaperStatus(value: unknown): value is PastPaperStatus {
  return value === 'not_started' || value === 'in_progress' || value === 'completed';
}

function isTaskSource(value: unknown): value is TaskSource {
  return value === 'manual' || value === 'catch_up' || value === 'topic';
}

function isAppearance(value: unknown): value is Appearance {
  return value === 'system' || value === 'light' || value === 'dark';
}

export function isAppSettings(value: unknown): value is AppSettings {
  if (!isObject(value)) return false;
  return (
    isLanguageCode(value.language) &&
    isAppearance(value.appearance) &&
    typeof value.onboardingComplete === 'boolean'
  );
}

export function isStudentProfile(value: unknown): value is StudentProfile {
  if (!isObject(value)) return false;
  if (!isAcademicYearId(value.academicYearId)) return false;
  if (!isStreamId(value.streamId)) return false;
  if (!Array.isArray(value.subjectIds)) return false;
  if (value.subjectIds.length === 0 || value.subjectIds.length > 6) return false;
  if (!value.subjectIds.every(isSubjectId)) return false;
  if (new Set(value.subjectIds).size !== value.subjectIds.length) return false;
  if (value.examDateOverride !== undefined && !isValidLocalDate(value.examDateOverride)) return false;
  return isISODateTime(value.createdAt) && isISODateTime(value.updatedAt);
}

export function isTopicProgress(value: unknown): value is TopicProgress {
  if (!isObject(value)) return false;
  return isNonEmptyString(value.topicId) && isTopicStatus(value.status) && isISODateTime(value.updatedAt);
}

export function isTask(value: unknown): value is Task {
  if (!isObject(value)) return false;
  if (!isNonEmptyString(value.id)) return false;
  if (!isNonEmptyString(value.title) || value.title.length > TASK_TITLE_MAX) return false;
  if (!isSubjectId(value.subjectId)) return false;
  if (value.topicId !== undefined && !isNonEmptyString(value.topicId)) return false;
  if (!isValidLocalDate(value.date)) return false;
  if (value.durationMinutes !== undefined) {
    if (!isFiniteNumber(value.durationMinutes)) return false;
    if (value.durationMinutes < DURATION_MIN || value.durationMinutes > DURATION_MAX) return false;
  }
  if (typeof value.completed !== 'boolean') return false;
  if (value.completedAt !== undefined && !isISODateTime(value.completedAt)) return false;
  if (!isTaskSource(value.source)) return false;
  return isISODateTime(value.createdAt) && isISODateTime(value.updatedAt);
}

export function isStudySession(value: unknown): value is StudySession {
  if (!isObject(value)) return false;
  if (!isNonEmptyString(value.id)) return false;
  if (!isSubjectId(value.subjectId)) return false;
  if (value.topicId !== undefined && !isNonEmptyString(value.topicId)) return false;
  if (!isISODateTime(value.startedAt) || !isISODateTime(value.endedAt)) return false;
  if (!isFiniteNumber(value.durationSeconds) || value.durationSeconds < 0) return false;
  return typeof value.markedTopicCompleted === 'boolean';
}

export function isActiveStudySession(value: unknown): value is ActiveStudySession {
  if (!isObject(value)) return false;
  if (!isNonEmptyString(value.id)) return false;
  if (!isSubjectId(value.subjectId)) return false;
  if (value.topicId !== undefined && !isNonEmptyString(value.topicId)) return false;
  if (!isFiniteNumber(value.plannedSeconds) || value.plannedSeconds < 0) return false;
  if (!isFiniteNumber(value.accumulatedSeconds) || value.accumulatedSeconds < 0) return false;
  if (value.runningSince !== null && !isFiniteNumber(value.runningSince)) return false;
  return isISODateTime(value.startedAt);
}

export function isPastPaperRecord(value: unknown): value is PastPaperRecord {
  if (!isObject(value)) return false;
  if (!isNonEmptyString(value.id)) return false;
  if (!isSubjectId(value.subjectId)) return false;
  if (!isFiniteNumber(value.year) || value.year < 1990 || value.year > 2100) return false;
  if (!isPastPaperStatus(value.status)) return false;
  if (value.score !== undefined) {
    if (!isFiniteNumber(value.score) || value.score < SCORE_MIN || value.score > SCORE_MAX) return false;
  }
  if (value.note !== undefined && (typeof value.note !== 'string' || value.note.length > NOTE_MAX)) return false;
  return isISODateTime(value.updatedAt);
}

/** Keeps the valid entries of an array and silently drops the rest. */
export function filterValid<T>(value: unknown, guard: (item: unknown) => item is T): T[] {
  if (!Array.isArray(value)) return [];
  return value.filter(guard);
}

export function filterValidTopicProgress(value: unknown): TopicProgressMap {
  if (!isObject(value)) return {};
  const result: TopicProgressMap = {};
  for (const [key, entry] of Object.entries(value)) {
    if (isTopicProgress(entry) && entry.topicId === key) result[key] = entry;
  }
  return result;
}

export function filterValidPastPapers(value: unknown): PastPaperMap {
  if (!isObject(value)) return {};
  const result: PastPaperMap = {};
  for (const [key, entry] of Object.entries(value)) {
    if (isPastPaperRecord(entry) && entry.id === key) result[key] = entry;
  }
  return result;
}

// ---- input validation for forms ----

export type FieldError =
  | 'title_required'
  | 'title_too_long'
  | 'subject_required'
  | 'date_invalid'
  | 'duration_invalid'
  | 'score_invalid'
  | 'note_too_long';

export interface TaskInput {
  title: string;
  subjectId: string | null;
  date: string;
  durationMinutes?: number;
}

export function validateTaskInput(input: TaskInput): FieldError[] {
  const errors: FieldError[] = [];
  const title = input.title.trim();
  if (title.length === 0) errors.push('title_required');
  else if (title.length > TASK_TITLE_MAX) errors.push('title_too_long');
  if (!isSubjectId(input.subjectId)) errors.push('subject_required');
  if (!isValidLocalDate(input.date)) errors.push('date_invalid');
  if (input.durationMinutes !== undefined) {
    const d = input.durationMinutes;
    if (!Number.isFinite(d) || d < DURATION_MIN || d > DURATION_MAX) errors.push('duration_invalid');
  }
  return errors;
}

/**
 * Parses a typed score. Empty input means "no score", which is valid.
 * Returns `undefined` for no score and `null` when the text is not a usable score.
 */
export function parseScore(text: string): number | undefined | null {
  const trimmed = text.trim();
  if (trimmed.length === 0) return undefined;
  if (!/^\d{1,3}(\.\d+)?$/.test(trimmed)) return null;
  const value = Number(trimmed);
  if (!Number.isFinite(value) || value < SCORE_MIN || value > SCORE_MAX) return null;
  return Math.round(value * 10) / 10;
}

export function validateNote(note: string): FieldError[] {
  return note.length > NOTE_MAX ? ['note_too_long'] : [];
}
