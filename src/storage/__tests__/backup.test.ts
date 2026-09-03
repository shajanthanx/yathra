import { buildBackup, parseBackup } from '../backup';
import { emptyUserData } from '../repository';
import { CURRENT_SCHEMA_VERSION } from '../schema';
import type { UserData } from '@/types/models';

function sampleData(): UserData {
  const data = emptyUserData();
  data.settings = { language: 'si', appearance: 'dark', onboardingComplete: true };
  data.profile = {
    academicYearId: 'al-2027',
    streamId: 'physical-science',
    subjectIds: ['combined-mathematics', 'physics', 'chemistry'],
    createdAt: '2027-01-01T00:00:00.000Z',
    updatedAt: '2027-01-01T00:00:00.000Z',
  };
  data.tasks = [
    {
      id: 't1',
      title: 'Revise waves',
      subjectId: 'physics',
      date: '2027-03-01',
      completed: false,
      source: 'manual',
      createdAt: '2027-02-01T00:00:00.000Z',
      updatedAt: '2027-02-01T00:00:00.000Z',
    },
  ];
  data.topicProgress = {
    'physics:measurement/dimensions': {
      topicId: 'physics:measurement/dimensions',
      status: 'completed',
      updatedAt: '2027-02-01T00:00:00.000Z',
    },
  };
  return data;
}

describe('building a backup', () => {
  it('stamps the app name and current schema version', () => {
    const backup = buildBackup(emptyUserData());
    expect(backup.app).toBe('yathra');
    expect(backup.schemaVersion).toBe(CURRENT_SCHEMA_VERSION);
    expect(typeof backup.exportedAt).toBe('string');
  });

  it('does not include the running timer', () => {
    const backup = buildBackup(emptyUserData()) as unknown as Record<string, unknown>;
    expect(backup.activeSession).toBeUndefined();
  });
});

describe('a round trip', () => {
  it('restores what was exported', () => {
    const original = sampleData();
    const text = JSON.stringify(buildBackup(original));
    const parsed = parseBackup(text);

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.value.data.settings).toEqual(original.settings);
    expect(parsed.value.data.profile).toEqual(original.profile);
    expect(parsed.value.data.tasks).toEqual(original.tasks);
    expect(parsed.value.taskCount).toBe(1);
    expect(parsed.value.topicCount).toBe(1);
  });
});

describe('rejecting bad input', () => {
  it('rejects text that is not JSON', () => {
    const result = parseBackup('not json at all');
    expect(result).toEqual({ ok: false, error: 'invalid_file' });
  });

  it('rejects JSON from another application', () => {
    const result = parseBackup(JSON.stringify({ app: 'something-else', schemaVersion: 1 }));
    expect(result).toEqual({ ok: false, error: 'invalid_file' });
  });

  it('rejects a missing schema version', () => {
    const result = parseBackup(JSON.stringify({ app: 'yathra' }));
    expect(result).toEqual({ ok: false, error: 'invalid_file' });
  });

  it('rejects a backup from a newer version of the app', () => {
    const result = parseBackup(
      JSON.stringify({ app: 'yathra', schemaVersion: CURRENT_SCHEMA_VERSION + 1 }),
    );
    expect(result).toEqual({ ok: false, error: 'newer_version' });
  });
});

describe('tolerating damaged content', () => {
  it('drops invalid records but keeps the good ones', () => {
    const backup = buildBackup(sampleData()) as unknown as Record<string, unknown>;
    backup.tasks = [
      ...(backup.tasks as unknown[]),
      { id: 'broken', title: '', subjectId: 'astrology' },
    ];
    const result = parseBackup(JSON.stringify(backup));

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.data.tasks).toHaveLength(1);
  });

  it('falls back to defaults when settings are unusable', () => {
    const backup = buildBackup(sampleData()) as unknown as Record<string, unknown>;
    backup.settings = { language: 'martian' };
    const result = parseBackup(JSON.stringify(backup));

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.data.settings.language).toBe('en');
  });

  it('clears onboarding when the profile cannot be read', () => {
    const backup = buildBackup(sampleData()) as unknown as Record<string, unknown>;
    backup.profile = { streamId: 'not-a-stream' };
    const result = parseBackup(JSON.stringify(backup));

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.data.profile).toBeNull();
    expect(result.value.data.settings.onboardingComplete).toBe(false);
  });
});

