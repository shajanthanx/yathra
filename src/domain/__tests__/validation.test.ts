import {
  DURATION_MAX,
  DURATION_MIN,
  NOTE_MAX,
  TASK_TITLE_MAX,
  filterValid,
  filterValidPastPapers,
  filterValidTopicProgress,
  isAppSettings,
  isPastPaperRecord,
  isStudentProfile,
  isTask,
  parseScore,
  validateNote,
  validateTaskInput,
} from '../validation';
import { makeTask } from './fixtures';

describe('task guard', () => {
  it('accepts a well-formed task', () => {
    expect(isTask(makeTask())).toBe(true);
  });

  it.each([
    ['an unknown subject', { subjectId: 'astrology' }],
    ['an invalid date', { date: '2027-02-30' }],
    ['an empty title', { title: '   ' }],
    ['a duration below the minimum', { durationMinutes: 1 }],
    ['a duration above the maximum', { durationMinutes: 5000 }],
    ['a non-boolean completed flag', { completed: 'yes' }],
    ['an unknown source', { source: 'imported' }],
  ])('rejects %s', (_label, patch) => {
    expect(isTask({ ...makeTask(), ...patch })).toBe(false);
  });

  it('rejects a non-object', () => {
    expect(isTask(null)).toBe(false);
    expect(isTask('task')).toBe(false);
  });
});

describe('settings guard', () => {
  it('accepts valid settings', () => {
    expect(isAppSettings({ language: 'si', appearance: 'dark', onboardingComplete: true })).toBe(true);
  });

  it('rejects an unsupported language', () => {
    expect(isAppSettings({ language: 'fr', appearance: 'dark', onboardingComplete: true })).toBe(false);
  });
});

describe('profile guard', () => {
  const profile = {
    academicYearId: 'al-2027',
    streamId: 'physical-science',
    subjectIds: ['combined-mathematics', 'physics', 'chemistry'],
    createdAt: '2027-01-01T00:00:00.000Z',
    updatedAt: '2027-01-01T00:00:00.000Z',
  };

  it('accepts a valid profile', () => {
    expect(isStudentProfile(profile)).toBe(true);
  });

  it('rejects an unknown academic year', () => {
    expect(isStudentProfile({ ...profile, academicYearId: 'al-1999' })).toBe(false);
  });

  it('rejects duplicate subjects', () => {
    expect(isStudentProfile({ ...profile, subjectIds: ['physics', 'physics', 'chemistry'] })).toBe(false);
  });

  it('rejects an invalid exam date override', () => {
    expect(isStudentProfile({ ...profile, examDateOverride: 'next August' })).toBe(false);
  });
});

describe('past paper guard', () => {
  const record = {
    id: 'physics:2026',
    subjectId: 'physics',
    year: 2026,
    status: 'completed',
    updatedAt: '2027-01-01T00:00:00.000Z',
  };

  it('accepts a valid record', () => {
    expect(isPastPaperRecord(record)).toBe(true);
  });

  it('rejects a score outside 0 to 100', () => {
    expect(isPastPaperRecord({ ...record, score: 120 })).toBe(false);
    expect(isPastPaperRecord({ ...record, score: -1 })).toBe(false);
  });

  it('rejects an over-long note', () => {
    expect(isPastPaperRecord({ ...record, note: 'x'.repeat(NOTE_MAX + 1) })).toBe(false);
  });
});

describe('filtering collections', () => {
  it('keeps only valid array entries', () => {
    const result = filterValid([makeTask(), { rubbish: true }, makeTask()], isTask);
    expect(result).toHaveLength(2);
  });

  it('returns an empty array for a non-array', () => {
    expect(filterValid({ not: 'an array' }, isTask)).toEqual([]);
  });

  it('drops topic progress whose key does not match its id', () => {
    const result = filterValidTopicProgress({
      good: { topicId: 'good', status: 'learning', updatedAt: '2027-01-01T00:00:00.000Z' },
      mismatched: { topicId: 'other', status: 'learning', updatedAt: '2027-01-01T00:00:00.000Z' },
      broken: { status: 'nonsense' },
    });
    expect(Object.keys(result)).toEqual(['good']);
  });

  it('drops past papers whose key does not match their id', () => {
    const result = filterValidPastPapers({
      'physics:2026': {
        id: 'physics:2026',
        subjectId: 'physics',
        year: 2026,
        status: 'completed',
        updatedAt: '2027-01-01T00:00:00.000Z',
      },
      wrongKey: {
        id: 'physics:2025',
        subjectId: 'physics',
        year: 2025,
        status: 'completed',
        updatedAt: '2027-01-01T00:00:00.000Z',
      },
    });
    expect(Object.keys(result)).toEqual(['physics:2026']);
  });
});

describe('task input validation', () => {
  const base = { title: 'Revise waves', subjectId: 'physics', date: '2027-03-01' };

  it('accepts valid input', () => {
    expect(validateTaskInput(base)).toEqual([]);
  });

  it('requires a title', () => {
    expect(validateTaskInput({ ...base, title: '   ' })).toContain('title_required');
  });

  it('limits the title length', () => {
    expect(validateTaskInput({ ...base, title: 'x'.repeat(TASK_TITLE_MAX + 1) })).toContain(
      'title_too_long',
    );
  });

  it('requires a subject', () => {
    expect(validateTaskInput({ ...base, subjectId: null })).toContain('subject_required');
  });

  it('requires a valid date', () => {
    expect(validateTaskInput({ ...base, date: 'tomorrow' })).toContain('date_invalid');
  });

  it('bounds the duration', () => {
    expect(validateTaskInput({ ...base, durationMinutes: DURATION_MIN - 1 })).toContain('duration_invalid');
    expect(validateTaskInput({ ...base, durationMinutes: DURATION_MAX + 1 })).toContain('duration_invalid');
    expect(validateTaskInput({ ...base, durationMinutes: 45 })).toEqual([]);
  });
});

describe('score parsing', () => {
  it('treats empty input as no score', () => {
    expect(parseScore('')).toBeUndefined();
    expect(parseScore('   ')).toBeUndefined();
  });

  it('accepts whole numbers in range', () => {
    expect(parseScore('0')).toBe(0);
    expect(parseScore('68')).toBe(68);
    expect(parseScore('100')).toBe(100);
  });

  it('accepts one decimal place', () => {
    expect(parseScore('67.5')).toBe(67.5);
  });

  it('rejects out-of-range and non-numeric input', () => {
    expect(parseScore('101')).toBeNull();
    expect(parseScore('-5')).toBeNull();
    expect(parseScore('sixty')).toBeNull();
    expect(parseScore('50%')).toBeNull();
  });
});

describe('note validation', () => {
  it('accepts a short note', () => {
    expect(validateNote('Ran out of time on paper II')).toEqual([]);
  });

  it('rejects an over-long note', () => {
    expect(validateNote('x'.repeat(NOTE_MAX + 1))).toContain('note_too_long');
  });
});
