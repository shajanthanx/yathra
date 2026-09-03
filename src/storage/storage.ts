/**
 * Key-value persistence.
 *
 * The app only ever talks to the `KeyValueStore` interface, so the backing
 * implementation (AsyncStorage today) can be swapped in one place. Reads never
 * throw: a malformed value is reported and replaced by a fallback so a corrupt
 * record can never crash the app on launch.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_STORAGE_KEYS, type StorageKey } from './keys';

export interface KeyValueStore {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  multiRemove(keys: string[]): Promise<void>;
}

const asyncStorageAdapter: KeyValueStore = {
  getItem: (key) => AsyncStorage.getItem(key),
  setItem: (key, value) => AsyncStorage.setItem(key, value),
  removeItem: (key) => AsyncStorage.removeItem(key),
  multiRemove: async (keys) => {
    await AsyncStorage.multiRemove(keys);
  },
};

let store: KeyValueStore = asyncStorageAdapter;

/** Test seam: lets unit tests supply an in-memory store. */
export function setKeyValueStore(next: KeyValueStore): void {
  store = next;
}

export interface ReadResult<T> {
  value: T;
  /** True when a stored value existed but could not be used. */
  corrupted: boolean;
}

export async function readJSON<T>(
  key: StorageKey,
  parse: (raw: unknown) => T | undefined,
  fallback: T,
): Promise<ReadResult<T>> {
  let raw: string | null;
  try {
    raw = await store.getItem(key);
  } catch (error) {
    reportStorageIssue('read', key, error);
    return { value: fallback, corrupted: true };
  }
  if (raw === null) return { value: fallback, corrupted: false };

  let decoded: unknown;
  try {
    decoded = JSON.parse(raw);
  } catch (error) {
    reportStorageIssue('parse', key, error);
    return { value: fallback, corrupted: true };
  }

  try {
    const parsed = parse(decoded);
    if (parsed === undefined) {
      reportStorageIssue('validate', key, new Error('value did not match its expected shape'));
      return { value: fallback, corrupted: true };
    }
    return { value: parsed, corrupted: false };
  } catch (error) {
    reportStorageIssue('validate', key, error);
    return { value: fallback, corrupted: true };
  }
}

export async function writeJSON(key: StorageKey, value: unknown): Promise<void> {
  const serialised = JSON.stringify(value);
  await store.setItem(key, serialised);
}

export async function removeKey(key: StorageKey): Promise<void> {
  await store.removeItem(key);
}

export async function clearAll(): Promise<void> {
  await store.multiRemove([...ALL_STORAGE_KEYS]);
}

function reportStorageIssue(stage: string, key: string, error: unknown): void {
  if (__DEV__) {
    console.warn(`[yathra] storage ${stage} failed for ${key}:`, error);
  }
}

/**
 * Coalesces writes per key so a burst of edits (dragging a slider, ticking
 * several tasks) results in one write rather than many.
 */
export function createWriteQueue(delayMs = 250) {
  const pending = new Map<StorageKey, unknown>();
  const timers = new Map<StorageKey, ReturnType<typeof setTimeout>>();
  let failureHandler: ((key: StorageKey, error: unknown) => void) | undefined;

  async function flushKey(key: StorageKey): Promise<void> {
    const timer = timers.get(key);
    if (timer) {
      clearTimeout(timer);
      timers.delete(key);
    }
    if (!pending.has(key)) return;
    const value = pending.get(key);
    pending.delete(key);
    try {
      await writeJSON(key, value);
    } catch (error) {
      reportStorageIssue('write', key, error);
      failureHandler?.(key, error);
    }
  }

  return {
    enqueue(key: StorageKey, value: unknown): void {
      pending.set(key, value);
      const existing = timers.get(key);
      if (existing) clearTimeout(existing);
      timers.set(
        key,
        setTimeout(() => {
          void flushKey(key);
        }, delayMs),
      );
    },
    async flush(): Promise<void> {
      await Promise.all([...pending.keys()].map((key) => flushKey(key)));
    },
    onFailure(handler: (key: StorageKey, error: unknown) => void): void {
      failureHandler = handler;
    },
    cancel(): void {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
      pending.clear();
    },
  };
}
