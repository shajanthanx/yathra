/**
 * Storage schema version and migrations.
 *
 * Each stored collection is a plain JSON document. When the shape of any of
 * them changes, bump CURRENT_SCHEMA_VERSION and add one entry to `migrations`
 * that upgrades a snapshot from version N to N+1. Migrations receive and return
 * loosely-typed data because they run before validation.
 */
export const CURRENT_SCHEMA_VERSION = 1;

/** The raw shape a migration works on: one entry per stored collection. */
export interface RawSnapshot {
  settings?: unknown;
  profile?: unknown;
  topicProgress?: unknown;
  tasks?: unknown;
  sessions?: unknown;
  activeSession?: unknown;
  pastPapers?: unknown;
}

export type Migration = (snapshot: RawSnapshot) => RawSnapshot;

/**
 * Keyed by the version being migrated FROM. `migrations[1]` upgrades a
 * version-1 snapshot to version 2.
 */
export const migrations: Record<number, Migration> = {};

export interface MigrationResult {
  snapshot: RawSnapshot;
  /** True when the data came from an older version and was upgraded. */
  migrated: boolean;
}

export function migrateSnapshot(snapshot: RawSnapshot, fromVersion: number): MigrationResult {
  let current = snapshot;
  let version = fromVersion;
  let migrated = false;

  while (version < CURRENT_SCHEMA_VERSION) {
    const migration = migrations[version];
    if (!migration) break;
    current = migration(current);
    migrated = true;
    version += 1;
  }

  return { snapshot: current, migrated };
}

export interface StoredMeta {
  schemaVersion: number;
}

export function parseMeta(raw: unknown): StoredMeta | undefined {
  if (typeof raw !== 'object' || raw === null) return undefined;
  const version = (raw as { schemaVersion?: unknown }).schemaVersion;
  if (typeof version !== 'number' || !Number.isInteger(version) || version < 1) return undefined;
  return { schemaVersion: version };
}
