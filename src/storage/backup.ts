/**
 * Local backup: export and import a JSON file.
 *
 * The file never leaves the device unless the student chooses to share it, and
 * an imported file is validated record by record before it is allowed to
 * replace anything.
 */
import { Platform } from 'react-native';
import { adoptSnapshot } from './repository';
import { CURRENT_SCHEMA_VERSION, migrateSnapshot, type RawSnapshot } from './schema';
import type { BackupDocument, UserData } from '@/types/models';
import { nowISO } from '@/utils/date';

export const BACKUP_FILENAME = 'yathra-backup.json';

export function buildBackup(data: UserData): BackupDocument {
  return {
    app: 'yathra',
    schemaVersion: CURRENT_SCHEMA_VERSION,
    exportedAt: nowISO(),
    settings: data.settings,
    profile: data.profile,
    topicProgress: data.topicProgress,
    tasks: data.tasks,
    sessions: data.sessions,
    pastPapers: data.pastPapers,
  };
}

export type BackupError = 'invalid_file' | 'newer_version';

export interface ParsedBackup {
  data: UserData;
  taskCount: number;
  topicCount: number;
}

/**
 * Parses and validates backup text. Returns an error code rather than throwing
 * so the caller can show a translated message.
 */
export function parseBackup(text: string): { ok: true; value: ParsedBackup } | { ok: false; error: BackupError } {
  let decoded: unknown;
  try {
    decoded = JSON.parse(text);
  } catch {
    return { ok: false, error: 'invalid_file' };
  }

  if (typeof decoded !== 'object' || decoded === null) return { ok: false, error: 'invalid_file' };
  const document = decoded as Partial<BackupDocument>;
  if (document.app !== 'yathra') return { ok: false, error: 'invalid_file' };

  const version = typeof document.schemaVersion === 'number' ? document.schemaVersion : 0;
  if (version < 1) return { ok: false, error: 'invalid_file' };
  if (version > CURRENT_SCHEMA_VERSION) return { ok: false, error: 'newer_version' };

  const raw: RawSnapshot = {
    settings: document.settings,
    profile: document.profile,
    topicProgress: document.topicProgress,
    tasks: document.tasks,
    sessions: document.sessions,
    pastPapers: document.pastPapers,
    activeSession: null,
  };

  const { snapshot } = migrateSnapshot(raw, version);
  const data = adoptSnapshot(snapshot);

  return {
    ok: true,
    value: {
      data,
      taskCount: data.tasks.length,
      topicCount: Object.keys(data.topicProgress).length,
    },
  };
}

/**
 * Writes the backup and hands it to the system share sheet. On web (used only
 * for development) it triggers a normal browser download, since expo-file-system
 * has no web implementation.
 */
export async function exportBackup(data: UserData): Promise<boolean> {
  const json = JSON.stringify(buildBackup(data), null, 2);

  if (Platform.OS === 'web') {
    const globalWithDocument = globalThis as { document?: Document; URL?: typeof URL };
    const doc = globalWithDocument.document;
    if (!doc) return false;
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    const anchor = doc.createElement('a');
    anchor.href = url;
    anchor.download = BACKUP_FILENAME;
    anchor.click();
    URL.revokeObjectURL(url);
    return true;
  }

  const { File, Paths } = await import('expo-file-system');
  const Sharing = await import('expo-sharing');

  const file = new File(Paths.cache, BACKUP_FILENAME);
  if (file.exists) file.delete();
  file.create();
  file.write(json);

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri, {
      mimeType: 'application/json',
      UTI: 'public.json',
      dialogTitle: BACKUP_FILENAME,
    });
    return true;
  }
  return false;
}

/** Opens a file picker and returns the file's text, or null if cancelled. */
export async function pickBackupText(): Promise<string | null> {
  const DocumentPicker = await import('expo-document-picker');
  const result = await DocumentPicker.getDocumentAsync({
    type: 'application/json',
    copyToCacheDirectory: true,
    multiple: false,
  });
  if (result.canceled) return null;

  const asset = result.assets[0];
  if (!asset) return null;

  if (Platform.OS === 'web') {
    return asset.file ? await asset.file.text() : null;
  }

  const { File } = await import('expo-file-system');
  return await new File(asset.uri).text();
}
