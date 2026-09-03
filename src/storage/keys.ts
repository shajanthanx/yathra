/** Storage keys. Every key the app writes starts with this prefix. */
export const KEY_PREFIX = 'yathra:';

export const StorageKeys = {
  meta: `${KEY_PREFIX}meta`,
  settings: `${KEY_PREFIX}settings`,
  profile: `${KEY_PREFIX}profile`,
  topicProgress: `${KEY_PREFIX}topicProgress`,
  tasks: `${KEY_PREFIX}tasks`,
  sessions: `${KEY_PREFIX}sessions`,
  activeSession: `${KEY_PREFIX}activeSession`,
  pastPapers: `${KEY_PREFIX}pastPapers`,
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];

export const ALL_STORAGE_KEYS: readonly StorageKey[] = Object.values(StorageKeys);
