/**
 * The single application store and every action that changes it.
 *
 * Rules that keep this predictable:
 *  - UI never mutates state directly; it calls an action here.
 *  - Every action produces a new state object and schedules exactly the
 *    collections it touched for persistence.
 *  - Selectors return values that live in state (or primitives), never freshly
 *    built objects, so components can subscribe narrowly. Derived values are
 *    computed in hooks with useMemo.
 */
import { taskId as newTaskId, pastPaperId, sessionId as newSessionId } from '@/domain/ids';
import { elapsedSeconds, isSessionWorthSaving } from '@/domain/studyTime';
import type { LanguageCode, LocalDate, StreamId, SubjectId } from '@/types/content';
import type {
  ActiveStudySession,
  Appearance,
  AppSettings,
  PastPaperRecord,
  PastPaperStatus,
  StudentProfile,
  StudySession,
  Task,
  TaskSource,
  TopicStatus,
  UserData,
} from '@/types/models';
import { emptyUserData, hydrate, persistence, resetAll, saveAll } from '@/storage/repository';
import type { StorageKey } from '@/storage/keys';
import { nowISO, todayLocal } from '@/utils/date';
import { createStore } from './createStore';

export type AppStatus = 'loading' | 'ready' | 'error';

export interface AppState {
  status: AppStatus;
  data: UserData;
  /** Collections that could not be read; drives the recovery screen. */
  corruptedKeys: StorageKey[];
  /** Set when a write fails, so the UI can warn that changes may not be saved. */
  writeFailed: boolean;
}

const initialState: AppState = {
  status: 'loading',
  data: emptyUserData(),
  corruptedKeys: [],
  writeFailed: false,
};

export const appStore = createStore<AppState>(initialState);

function update(mutator: (data: UserData) => UserData): void {
  appStore.setState((state) => ({ ...state, data: mutator(state.data) }));
}

// ---- lifecycle ----

persistence.onFailure(() => {
  appStore.setState((state) => (state.writeFailed ? state : { ...state, writeFailed: true }));
});

export async function loadApp(): Promise<void> {
  appStore.setState((state) => ({ ...state, status: 'loading' }));
  try {
    const result = await hydrate();
    appStore.setState(() => ({
      status: result.corruptedKeys.length > 0 ? 'error' : 'ready',
      data: result.data,
      corruptedKeys: result.corruptedKeys,
      writeFailed: false,
    }));
  } catch {
    appStore.setState(() => ({
      status: 'error',
      data: emptyUserData(),
      corruptedKeys: [],
      writeFailed: false,
    }));
  }
}

/** Accepts partially-recovered data and carries on. */
export function continueWithRecoveredData(): void {
  appStore.setState((state) => ({ ...state, status: 'ready', corruptedKeys: [] }));
}

export async function startFresh(): Promise<void> {
  await resetAll();
  appStore.setState(() => ({
    status: 'ready',
    data: emptyUserData(),
    corruptedKeys: [],
    writeFailed: false,
  }));
}

export async function flushPending(): Promise<void> {
  await persistence.flush();
}

// ---- settings ----

export function setLanguage(language: LanguageCode): void {
  update((data) => {
    const settings: AppSettings = { ...data.settings, language };
    persistence.saveSettings(settings);
    return { ...data, settings };
  });
}

export function setAppearance(appearance: Appearance): void {
  update((data) => {
    const settings: AppSettings = { ...data.settings, appearance };
    persistence.saveSettings(settings);
    return { ...data, settings };
  });
}

// ---- profile ----

export interface ProfileDraft {
  academicYearId: string;
  streamId: StreamId;
  subjectIds: SubjectId[];
}

export function completeOnboarding(draft: ProfileDraft): void {
  update((data) => {
    const timestamp = nowISO();
    const profile: StudentProfile = {
      academicYearId: draft.academicYearId,
      streamId: draft.streamId,
      subjectIds: [...draft.subjectIds],
      createdAt: data.profile?.createdAt ?? timestamp,
      updatedAt: timestamp,
    };
    const settings: AppSettings = { ...data.settings, onboardingComplete: true };
    persistence.saveProfile(profile);
    persistence.saveSettings(settings);
    return { ...data, profile, settings };
  });
}

/**
 * Updates the A/L profile. Progress for subjects that are dropped is kept on
 * the device: removing a subject hides it, and adding it back restores it.
 */
export function updateProfile(patch: Partial<ProfileDraft> & { examDateOverride?: LocalDate | null }): void {
  update((data) => {
    if (!data.profile) return data;
    const next: StudentProfile = {
      ...data.profile,
      ...(patch.academicYearId === undefined ? {} : { academicYearId: patch.academicYearId }),
      ...(patch.streamId === undefined ? {} : { streamId: patch.streamId }),
      ...(patch.subjectIds === undefined ? {} : { subjectIds: [...patch.subjectIds] }),
      updatedAt: nowISO(),
    };
    if (patch.examDateOverride === null) delete next.examDateOverride;
    else if (patch.examDateOverride !== undefined) next.examDateOverride = patch.examDateOverride;

    persistence.saveProfile(next);
    return { ...data, profile: next };
  });
}

// ---- syllabus progress ----

export function setTopicStatus(topicId: string, status: TopicStatus): void {
  update((data) => {
    const topicProgress = { ...data.topicProgress };
    if (status === 'not_started') delete topicProgress[topicId];
    else topicProgress[topicId] = { topicId, status, updatedAt: nowISO() };
    persistence.saveTopicProgress(topicProgress);
    return { ...data, topicProgress };
  });
}

// ---- tasks ----

export interface TaskDraft {
  title: string;
  subjectId: SubjectId;
  topicId?: string;
  date: LocalDate;
  durationMinutes?: number;
  source?: TaskSource;
}

export function addTask(draft: TaskDraft): Task {
  const timestamp = nowISO();
  const task: Task = {
    id: newTaskId(),
    title: draft.title.trim(),
    subjectId: draft.subjectId,
    ...(draft.topicId === undefined ? {} : { topicId: draft.topicId }),
    date: draft.date,
    ...(draft.durationMinutes === undefined ? {} : { durationMinutes: draft.durationMinutes }),
    completed: false,
    source: draft.source ?? 'manual',
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  update((data) => {
    const tasks = [...data.tasks, task];
    persistence.saveTasks(tasks);
    return { ...data, tasks };
  });
  return task;
}

export function addTasks(drafts: readonly TaskDraft[]): Task[] {
  const created: Task[] = [];
  update((data) => {
    const timestamp = nowISO();
    for (const draft of drafts) {
      created.push({
        id: newTaskId(),
        title: draft.title.trim(),
        subjectId: draft.subjectId,
        ...(draft.topicId === undefined ? {} : { topicId: draft.topicId }),
        date: draft.date,
        ...(draft.durationMinutes === undefined ? {} : { durationMinutes: draft.durationMinutes }),
        completed: false,
        source: draft.source ?? 'manual',
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    }
    const tasks = [...data.tasks, ...created];
    persistence.saveTasks(tasks);
    return { ...data, tasks };
  });
  return created;
}

export function updateTask(id: string, patch: Partial<Omit<Task, 'id' | 'createdAt'>>): void {
  update((data) => {
    let changed = false;
    const tasks = data.tasks.map((task) => {
      if (task.id !== id) return task;
      changed = true;
      const next: Task = { ...task, ...patch, updatedAt: nowISO() };
      if (patch.topicId === undefined && 'topicId' in patch) delete next.topicId;
      if (patch.durationMinutes === undefined && 'durationMinutes' in patch) delete next.durationMinutes;
      return next;
    });
    if (!changed) return data;
    persistence.saveTasks(tasks);
    return { ...data, tasks };
  });
}

export function setTaskCompleted(id: string, completed: boolean): void {
  update((data) => {
    const tasks = data.tasks.map((task) => {
      if (task.id !== id) return task;
      const next: Task = { ...task, completed, updatedAt: nowISO() };
      if (completed) next.completedAt = nowISO();
      else delete next.completedAt;
      return next;
    });
    persistence.saveTasks(tasks);
    return { ...data, tasks };
  });
}

export function rescheduleTask(id: string, date: LocalDate): void {
  updateTask(id, { date });
}

export function rescheduleTasks(ids: readonly string[], date: LocalDate): void {
  const idSet = new Set(ids);
  update((data) => {
    const timestamp = nowISO();
    const tasks = data.tasks.map((task) =>
      idSet.has(task.id) ? { ...task, date, updatedAt: timestamp } : task,
    );
    persistence.saveTasks(tasks);
    return { ...data, tasks };
  });
}

export function deleteTask(id: string): void {
  update((data) => {
    const tasks = data.tasks.filter((task) => task.id !== id);
    if (tasks.length === data.tasks.length) return data;
    persistence.saveTasks(tasks);
    return { ...data, tasks };
  });
}

// ---- study sessions ----

export function startStudySession(input: {
  subjectId: SubjectId;
  topicId?: string;
  plannedSeconds: number;
}): void {
  update((data) => {
    const session: ActiveStudySession = {
      id: newSessionId(),
      subjectId: input.subjectId,
      ...(input.topicId === undefined ? {} : { topicId: input.topicId }),
      plannedSeconds: input.plannedSeconds,
      accumulatedSeconds: 0,
      runningSince: Date.now(),
      startedAt: nowISO(),
    };
    persistence.saveActiveSession(session);
    return { ...data, activeSession: session };
  });
}

export function pauseStudySession(): void {
  update((data) => {
    const active = data.activeSession;
    if (!active || active.runningSince === null) return data;
    const session: ActiveStudySession = {
      ...active,
      accumulatedSeconds: elapsedSeconds(active),
      runningSince: null,
    };
    persistence.saveActiveSession(session);
    return { ...data, activeSession: session };
  });
}

export function resumeStudySession(): void {
  update((data) => {
    const active = data.activeSession;
    if (!active || active.runningSince !== null) return data;
    const session: ActiveStudySession = { ...active, runningSince: Date.now() };
    persistence.saveActiveSession(session);
    return { ...data, activeSession: session };
  });
}

export interface FinishSessionResult {
  seconds: number;
  saved: boolean;
}

/** Stops the timer and records the session when it is long enough to matter. */
export function finishStudySession(markTopicCompleted = false): FinishSessionResult {
  const active = appStore.getState().data.activeSession;
  if (!active) return { seconds: 0, saved: false };
  const seconds = elapsedSeconds(active);
  const saved = isSessionWorthSaving(seconds);

  update((data) => {
    const next: UserData = { ...data, activeSession: null };
    persistence.saveActiveSession(null);

    if (saved) {
      const session: StudySession = {
        id: active.id,
        subjectId: active.subjectId,
        ...(active.topicId === undefined ? {} : { topicId: active.topicId }),
        startedAt: active.startedAt,
        endedAt: nowISO(),
        durationSeconds: seconds,
        markedTopicCompleted: markTopicCompleted && active.topicId !== undefined,
      };
      next.sessions = [...data.sessions, session];
      persistence.saveSessions(next.sessions);
    }

    if (markTopicCompleted && active.topicId) {
      const topicProgress = {
        ...data.topicProgress,
        [active.topicId]: { topicId: active.topicId, status: 'completed' as const, updatedAt: nowISO() },
      };
      next.topicProgress = topicProgress;
      persistence.saveTopicProgress(topicProgress);
    }

    return next;
  });

  return { seconds, saved };
}

export function discardStudySession(): void {
  update((data) => {
    if (!data.activeSession) return data;
    persistence.saveActiveSession(null);
    return { ...data, activeSession: null };
  });
}

// ---- past papers ----

export function setPastPaper(input: {
  subjectId: SubjectId;
  year: number;
  status: PastPaperStatus;
  score?: number | undefined;
  note?: string | undefined;
}): void {
  update((data) => {
    const id = pastPaperId(input.subjectId, input.year);
    const record: PastPaperRecord = {
      id,
      subjectId: input.subjectId,
      year: input.year,
      status: input.status,
      ...(input.score === undefined ? {} : { score: input.score }),
      ...(input.note === undefined || input.note.trim().length === 0
        ? {}
        : { note: input.note.trim() }),
      updatedAt: nowISO(),
    };
    const pastPapers = { ...data.pastPapers, [id]: record };
    persistence.savePastPapers(pastPapers);
    return { ...data, pastPapers };
  });
}

export function clearPastPaper(subjectId: SubjectId, year: number): void {
  update((data) => {
    const id = pastPaperId(subjectId, year);
    if (!data.pastPapers[id]) return data;
    const pastPapers = { ...data.pastPapers };
    delete pastPapers[id];
    persistence.savePastPapers(pastPapers);
    return { ...data, pastPapers };
  });
}

// ---- data management ----

export async function replaceAllData(data: UserData): Promise<void> {
  await saveAll(data);
  appStore.setState(() => ({ status: 'ready', data, corruptedKeys: [], writeFailed: false }));
}

export async function resetEverything(): Promise<void> {
  await resetAll();
  appStore.setState(() => ({
    status: 'ready',
    data: emptyUserData(),
    corruptedKeys: [],
    writeFailed: false,
  }));
}

/** Today's date, read through the store so tests can rely on the same source. */
export function today(): LocalDate {
  return todayLocal();
}
