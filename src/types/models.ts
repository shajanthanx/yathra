/**
 * Persisted user data. Every type here is validated by src/domain/validation.ts
 * before it is trusted (storage reads and backup imports).
 */
import type { ISODateTime, LanguageCode, LocalDate, StreamId, SubjectId } from './content';

export interface StudentProfile {
  academicYearId: string;
  streamId: StreamId;
  subjectIds: SubjectId[];
  /** Student correction when the official timetable differs from bundled data. */
  examDateOverride?: LocalDate;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export type Appearance = 'system' | 'light' | 'dark';

export interface AppSettings {
  language: LanguageCode;
  appearance: Appearance;
  onboardingComplete: boolean;
}

export type TopicStatus = 'not_started' | 'learning' | 'practising' | 'completed';

export interface TopicProgress {
  topicId: string;
  status: TopicStatus;
  updatedAt: ISODateTime;
}

export type TaskSource = 'manual' | 'catch_up' | 'topic';

export interface Task {
  id: string;
  title: string;
  subjectId: SubjectId;
  topicId?: string;
  date: LocalDate;
  durationMinutes?: number;
  completed: boolean;
  completedAt?: ISODateTime;
  source: TaskSource;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface StudySession {
  id: string;
  subjectId: SubjectId;
  topicId?: string;
  startedAt: ISODateTime;
  endedAt: ISODateTime;
  durationSeconds: number;
  markedTopicCompleted: boolean;
}

/** Timer state kept while a study session is running or paused. */
export interface ActiveStudySession {
  id: string;
  subjectId: SubjectId;
  topicId?: string;
  plannedSeconds: number;
  /** Seconds accumulated while the timer was running, excluding the current run. */
  accumulatedSeconds: number;
  /** Epoch milliseconds when the current run started; null while paused. */
  runningSince: number | null;
  startedAt: ISODateTime;
}

export type PastPaperStatus = 'not_started' | 'in_progress' | 'completed';

export interface PastPaperRecord {
  /** `${subjectId}:${year}` */
  id: string;
  subjectId: SubjectId;
  year: number;
  status: PastPaperStatus;
  /** Percentage 0–100. */
  score?: number;
  note?: string;
  updatedAt: ISODateTime;
}

export type TopicProgressMap = Record<string, TopicProgress>;
export type PastPaperMap = Record<string, PastPaperRecord>;

/** Everything a student owns, as stored on the device and in a backup file. */
export interface UserData {
  settings: AppSettings;
  profile: StudentProfile | null;
  topicProgress: TopicProgressMap;
  tasks: Task[];
  sessions: StudySession[];
  activeSession: ActiveStudySession | null;
  pastPapers: PastPaperMap;
}

export interface BackupDocument {
  app: 'yathra';
  schemaVersion: number;
  exportedAt: ISODateTime;
  settings: AppSettings;
  profile: StudentProfile | null;
  topicProgress: TopicProgressMap;
  tasks: Task[];
  sessions: StudySession[];
  pastPapers: PastPaperMap;
}
