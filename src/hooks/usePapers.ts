/** Past-paper hooks. */
import { useMemo } from 'react';
import { papersForSubject, pastPaperYears, summarisePapers, summariseAllPapers, type PastPaperSummary } from '@/domain/pastPapers';
import { usePastPapers } from '@/store/useStore';
import type { SubjectId } from '@/types/content';
import { useAcademicYear } from './useContent';

export function usePastPaperYears(): number[] {
  const year = useAcademicYear();
  return useMemo(() => (year ? pastPaperYears(year) : []), [year]);
}

export function useSubjectPaperSummary(subjectId: SubjectId): PastPaperSummary {
  const papers = usePastPapers();
  return useMemo(() => summarisePapers(papersForSubject(papers, subjectId)), [papers, subjectId]);
}

export function useAllPapersSummary(): PastPaperSummary {
  const papers = usePastPapers();
  return useMemo(() => summariseAllPapers(papers), [papers]);
}
