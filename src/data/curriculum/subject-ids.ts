/**
 * Identifiers of every subject bundled with the app. Only subjects with a
 * verified NIE syllabus file are listed; adding a subject means adding it here,
 * in ./subjects.ts and a syllabus file under ./syllabus/.
 */
export const SUBJECT_IDS = [
  'physics',
  'chemistry',
  'biology',
  'combined-mathematics',
  'ict',
  'accounting',
  'business-studies',
  'economics',
  'business-statistics',
  'agricultural-science',
  'engineering-technology',
  'bio-systems-technology',
  'science-for-technology',
] as const;

export type SubjectId = (typeof SUBJECT_IDS)[number];

export function isSubjectId(value: unknown): value is SubjectId {
  return typeof value === 'string' && (SUBJECT_IDS as readonly string[]).includes(value);
}
