import { papersForSubject, pastPaperYears, summarisePapers } from '../pastPapers';
import { pastPaperId } from '../ids';
import { testYear } from './fixtures';
import type { PastPaperMap, PastPaperRecord } from '@/types/models';

function paper(year: number, overrides: Partial<PastPaperRecord> = {}): PastPaperRecord {
  return {
    id: pastPaperId('physics', year),
    subjectId: 'physics',
    year,
    status: 'completed',
    updatedAt: '2027-03-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('paper years', () => {
  it('lists the sittings before the student\'s own, most recent first', () => {
    const years = pastPaperYears(testYear, 3);
    expect(years).toEqual([2026, 2025, 2024]);
  });

  it('never includes the student\'s own year', () => {
    expect(pastPaperYears(testYear)).not.toContain(testYear.examYear);
  });
});

describe('summary', () => {
  it('is empty with no papers', () => {
    const summary = summarisePapers([]);
    expect(summary).toEqual({
      completed: 0,
      inProgress: 0,
      average: undefined,
      best: undefined,
      scoredCount: 0,
    });
  });

  it('counts completed and in-progress papers separately', () => {
    const summary = summarisePapers([
      paper(2026),
      paper(2025),
      paper(2024, { status: 'in_progress' }),
      paper(2023, { status: 'not_started' }),
    ]);
    expect(summary.completed).toBe(2);
    expect(summary.inProgress).toBe(1);
  });

  it('averages recorded scores and rounds the result', () => {
    const summary = summarisePapers([
      paper(2026, { score: 70 }),
      paper(2025, { score: 61 }),
      paper(2024, { score: 55 }),
    ]);
    expect(summary.average).toBe(62);
    expect(summary.best).toBe(70);
    expect(summary.scoredCount).toBe(3);
  });

  it('ignores papers without a score when averaging', () => {
    const summary = summarisePapers([paper(2026, { score: 80 }), paper(2025)]);
    expect(summary.average).toBe(80);
    expect(summary.scoredCount).toBe(1);
    expect(summary.completed).toBe(2);
  });

  it('handles a score of zero as a real score', () => {
    const summary = summarisePapers([paper(2026, { score: 0 }), paper(2025, { score: 50 })]);
    expect(summary.average).toBe(25);
    expect(summary.scoredCount).toBe(2);
  });
});

describe('papersForSubject', () => {
  it('returns only that subject, newest year first', () => {
    const map: PastPaperMap = {
      [pastPaperId('physics', 2024)]: paper(2024),
      [pastPaperId('physics', 2026)]: paper(2026),
      [pastPaperId('chemistry', 2026)]: {
        ...paper(2026),
        id: pastPaperId('chemistry', 2026),
        subjectId: 'chemistry',
      },
    };
    const result = papersForSubject(map, 'physics');
    expect(result.map((item) => item.year)).toEqual([2026, 2024]);
  });
});
