/**
 * Loads and saves the student's data.
 *
 * `hydrate()` is called once at launch. It reads every collection, runs any
 * pending migration, validates each record and reports which collections (if
 * any) had to be replaced by defaults, so the UI can offer a recovery choice
 * instead of crashing.
 */
import {
  filterValid,
  filterValidPastPapers,
  filterValidTopicProgress,
  isActiveStudySession,
  isAppSettings,
  isStudentProfile,
  isStudySession,
  isTask,
} from '@/domain/validation';
import { DEFAULT_LANGUAGE } from '@/i18n/languages';
import type { AppSettings, UserData } from '@/types/models';
import { StorageKeys, type StorageKey } from './keys';
import { clearAll, createWriteQueue, readJSON, writeJSON } from './storage';
import { CURRENT_SCHEMA_VERSION, migrateSnapshot, parseMeta, type RawSnapshot } from './schema';

export const defaultSettings: AppSettings = {
  language: DEFAULT_LANGUAGE,
  appearance: 'system',
  onboardingComplete: false,
};

export function emptyUserData(): UserData {
  return {
    settings: { ...defaultSettings },
    profile: null,
    topicProgress: {},
    tasks: [],
    sessions: [],
    activeSession: null,
    pastPapers: {},
  };
}

export interface HydrateResult {
  data: UserData;
  /** Collections whose stored value could not be used. */
  corruptedKeys: StorageKey[];
  /** True when a stored snapshot was upgraded from an older schema version. */
  migrated: boolean;
  /** True when nothing at all was stored (a genuine first launch). */
  firstRun: boolean;
}

export async function hydrate(): Promise<HydrateResult> {
  const corruptedKeys: StorageKey[] = [];

  const meta = await readJSON(StorageKeys.meta, parseMeta, { schemaVersion: CURRENT_SCHEMA_VERSION });
  if (meta.corrupted) corruptedKeys.push(StorageKeys.meta);

  const raw: RawSnapshot = {};
  const rawReads = await Promise.all([
    readJSON<unknown>(StorageKeys.settings, (v) => v, undefined),
    readJSON<unknown>(StorageKeys.profile, (v) => v, undefined),
    readJSON<unknown>(StorageKeys.topicProgress, (v) => v, undefined),
    readJSON<unknown>(StorageKeys.tasks, (v) => v, undefined),
    readJSON<unknown>(StorageKeys.sessions, (v) => v, undefined),
    readJSON<unknown>(StorageKeys.activeSession, (v) => v, undefined),
    readJSON<unknown>(StorageKeys.pastPapers, (v) => v, undefined),
  ]);
  const keysInOrder: StorageKey[] = [
    StorageKeys.settings,
    StorageKeys.profile,
    StorageKeys.topicProgress,
    StorageKeys.tasks,
    StorageKeys.sessions,
    StorageKeys.activeSession,
    StorageKeys.pastPapers,
  ];
  const fields: (keyof RawSnapshot)[] = [
    'settings',
    'profile',
    'topicProgress',
    'tasks',
    'sessions',
    'activeSession',
    'pastPapers',
  ];
  rawReads.forEach((result, index) => {
    const field = fields[index];
    const key = keysInOrder[index];
    if (field !== undefined) raw[field] = result.value;
    if (result.corrupted && key !== undefined) corruptedKeys.push(key);
  });

  const firstRun = rawReads.every((r) => r.value === undefined) && !meta.corrupted;

  const { snapshot, migrated } = migrateSnapshot(raw, meta.value.schemaVersion);
  const data = adoptSnapshot(snapshot, corruptedKeys);

  if (migrated || meta.value.schemaVersion !== CURRENT_SCHEMA_VERSION) {
    await writeJSON(StorageKeys.meta, { schemaVersion: CURRENT_SCHEMA_VERSION });
  }

  return { data, corruptedKeys, migrated, firstRun };
}

/** Validates a raw snapshot into usable data, noting collections that failed. */
export function adoptSnapshot(snapshot: RawSnapshot, corruptedKeys: StorageKey[] = []): UserData {
  const data = emptyUserData();

  if (snapshot.settings !== undefined) {
    if (isAppSettings(snapshot.settings)) data.settings = snapshot.settings;
    else corruptedKeys.push(StorageKeys.settings);
  }

  if (snapshot.profile !== undefined && snapshot.profile !== null) {
    if (isStudentProfile(snapshot.profile)) data.profile = snapshot.profile;
    else corruptedKeys.push(StorageKeys.profile);
  }

  if (snapshot.topicProgress !== undefined) {
    data.topicProgress = filterValidTopicProgress(snapshot.topicProgress);
  }
  if (snapshot.tasks !== undefined) {
    data.tasks = filterValid(snapshot.tasks, isTask);
  }
  if (snapshot.sessions !== undefined) {
    data.sessions = filterValid(snapshot.sessions, isStudySession);
  }
  if (snapshot.activeSession !== undefined && snapshot.activeSession !== null) {
    data.activeSession = isActiveStudySession(snapshot.activeSession) ? snapshot.activeSession : null;
  }
  if (snapshot.pastPapers !== undefined) {
    data.pastPapers = filterValidPastPapers(snapshot.pastPapers);
  }

  // A profile without a completed onboarding (or the reverse) would leave the
  // app in an unreachable state, so treat that combination as "not set up".
  if (data.profile === null && data.settings.onboardingComplete) {
    data.settings = { ...data.settings, onboardingComplete: false };
  }

  return data;
}

const queue = createWriteQueue();

export const persistence = {
  saveSettings: (settings: UserData['settings']) => queue.enqueue(StorageKeys.settings, settings),
  saveProfile: (profile: UserData['profile']) => queue.enqueue(StorageKeys.profile, profile),
  saveTopicProgress: (progress: UserData['topicProgress']) =>
    queue.enqueue(StorageKeys.topicProgress, progress),
  saveTasks: (tasks: UserData['tasks']) => queue.enqueue(StorageKeys.tasks, tasks),
  saveSessions: (sessions: UserData['sessions']) => queue.enqueue(StorageKeys.sessions, sessions),
  saveActiveSession: (session: UserData['activeSession']) =>
    queue.enqueue(StorageKeys.activeSession, session),
  savePastPapers: (papers: UserData['pastPapers']) => queue.enqueue(StorageKeys.pastPapers, papers),
  flush: () => queue.flush(),
  onFailure: (handler: (key: StorageKey, error: unknown) => void) => queue.onFailure(handler),
};

/** Writes every collection at once — used by import and by "start fresh". */
export async function saveAll(data: UserData): Promise<void> {
  queue.cancel();
  await Promise.all([
    writeJSON(StorageKeys.meta, { schemaVersion: CURRENT_SCHEMA_VERSION }),
    writeJSON(StorageKeys.settings, data.settings),
    writeJSON(StorageKeys.profile, data.profile),
    writeJSON(StorageKeys.topicProgress, data.topicProgress),
    writeJSON(StorageKeys.tasks, data.tasks),
    writeJSON(StorageKeys.sessions, data.sessions),
    writeJSON(StorageKeys.activeSession, data.activeSession),
    writeJSON(StorageKeys.pastPapers, data.pastPapers),
  ]);
}

export async function resetAll(): Promise<void> {
  queue.cancel();
  await clearAll();
}
