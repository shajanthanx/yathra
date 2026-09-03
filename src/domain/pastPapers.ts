/**
 * Past-paper tracking. The app stores only what a student did and scored;
 * it never contains or fetches the papers themselves.
 */
import type { AcademicYear, SubjectId } from '@/types/content';
import type { PastPaperMap, PastPaperRecord } from '@/types/models';
import { pastPaperId } from './ids';

/** How many past years of papers to offer. */
export const PAST_PAPER_YEARS = 10;

/**
 * Years a student can track: the sittings before their own, most recent first.
 * Derived from the cohort so the list moves forward on its own each year.
 */
export function pastPaperYears(year: AcademicYear, count = PAST_PAPER_YEARS): number[] {
  const latest = year.examYear - 1;
  return Array.from({ length: count }, (_, i) => latest - i);
}

export function getPastPaper(
  papers: PastPaperMap,
  subjectId: SubjectId,
  year: number,
): PastPaperRecord | undefined {
  return papers[pastPaperId(subjectId, year)];
}

export function papersForSubject(papers: PastPaperMap, subjectId: SubjectId): PastPaperRecord[] {
  return Object.values(papers)
    .filter((paper) => paper.subjectId === subjectId)
    .sort((a, b) => b.year - a.year);
}

export interface PastPaperSummary {
  completed: number;
  inProgress: number;
  /** Mean of recorded scores, rounded; undefined when no score is recorded. */
  average: number | undefined;
  best: number | undefined;
  scoredCount: number;
}

export function summarisePapers(papers: readonly PastPaperRecord[]): PastPaperSummary {
  const completed = papers.filter((p) => p.status === 'completed');
  const inProgress = papers.filter((p) => p.status === 'in_progress');
  const scores = papers
    .map((p) => p.score)
    .filter((score): score is number => typeof score === 'number');

  const average =
    scores.length === 0 ? undefined : Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const best = scores.length === 0 ? undefined : Math.round(Math.max(...scores));

  return {
    completed: completed.length,
    inProgress: inProgress.length,
    average,
    best,
    scoredCount: scores.length,
  };
}

export function summariseAllPapers(papers: PastPaperMap): PastPaperSummary {
  return summarisePapers(Object.values(papers));
}
