/**
 * Progress figures derived from the syllabus and the student's topic statuses.
 * All the arithmetic lives in src/domain/progress.ts; these hooks only memoise.
 */
import { useMemo } from 'react';
import { getSyllabus } from '@/data/curriculum';
import {
  calculateOverallProgress,
  summariseSubject,
  type SubjectProgressSummary,
} from '@/domain/progress';
import { useTopicProgress } from '@/store/useStore';
import type { SubjectId } from '@/types/content';
import { useSelectedSubjectIds, useSelectedSyllabi } from './useContent';

export function useOverallProgress(): number {
  const syllabi = useSelectedSyllabi();
  const progress = useTopicProgress();
  return useMemo(() => calculateOverallProgress(syllabi, progress), [syllabi, progress]);
}

export function useSubjectSummaries(): SubjectProgressSummary[] {
  const subjectIds = useSelectedSubjectIds();
  const progress = useTopicProgress();
  return useMemo(
    () => subjectIds.map((id) => summariseSubject(getSyllabus(id), progress)),
    [subjectIds, progress],
  );
}

export function useSubjectSummary(subjectId: SubjectId): SubjectProgressSummary {
  const progress = useTopicProgress();
  return useMemo(() => summariseSubject(getSyllabus(subjectId), progress), [subjectId, progress]);
}
