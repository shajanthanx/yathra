/**
 * A/L cohorts. A cohort is named by the year its examination is sat
 * ("A/L 2027"). Exam dates come from Department of Examinations announcements;
 * unconfirmed years use the recent pattern (exam begins in the first or second
 * week of August and runs about four weeks). Updating a date is a data change
 * here — no UI logic depends on a hard-coded year.
 *
 * Sources (verified 2026-09-03):
 * - 2026 A/L: 10 Aug – 5 Sep 2026 (DoE statement 8 Jun 2026; amended Aug 2026).
 * - 2027 A/L: 3 – 28 Aug 2027 (DoE notice 24 Aug 2026; MOE Circular 31/2026).
 * - 2028 cohort began Grade 12 on 6 Jul 2026 (MOE instruction, reported).
 */
import type { AcademicYear, LocalDate } from '@/types/content';
import { addDays } from '@/utils/date';

/** Revision time the on-track model reserves between finishing the syllabus and the exam. */
export const SYLLABUS_REVISION_DAYS = 42;

function defineYear(input: Omit<AcademicYear, 'syllabusTargetDate'>): AcademicYear {
  return { ...input, syllabusTargetDate: addDays(input.examStart, -SYLLABUS_REVISION_DAYS) };
}

export const ACADEMIC_YEARS: readonly AcademicYear[] = [
  defineYear({
    id: 'al-2026',
    examYear: 2026,
    journeyStart: '2024-07-01',
    journeyStartStatus: 'estimated',
    examStart: '2026-08-10',
    examEnd: '2026-09-05',
    examDateStatus: 'confirmed',
  }),
  defineYear({
    id: 'al-2027',
    examYear: 2027,
    journeyStart: '2025-08-01',
    journeyStartStatus: 'estimated',
    examStart: '2027-08-03',
    examEnd: '2027-08-28',
    examDateStatus: 'confirmed',
  }),
  defineYear({
    id: 'al-2028',
    examYear: 2028,
    journeyStart: '2026-07-06',
    journeyStartStatus: 'confirmed',
    examStart: '2028-08-07',
    examEnd: '2028-09-02',
    examDateStatus: 'estimated',
  }),
  defineYear({
    id: 'al-2029',
    examYear: 2029,
    journeyStart: '2027-07-05',
    journeyStartStatus: 'estimated',
    examStart: '2029-08-06',
    examEnd: '2029-09-01',
    examDateStatus: 'estimated',
  }),
];

const YEAR_BY_ID: ReadonlyMap<string, AcademicYear> = new Map(ACADEMIC_YEARS.map((y) => [y.id, y]));

export function findAcademicYear(id: string): AcademicYear | undefined {
  return YEAR_BY_ID.get(id);
}

export function isAcademicYearId(value: unknown): value is string {
  return typeof value === 'string' && YEAR_BY_ID.has(value);
}

/**
 * Cohorts a student can pick during onboarding: those whose exam has not
 * finished yet. A cohort that has already sat its exam disappears from the list.
 */
export function selectableAcademicYears(today: LocalDate): readonly AcademicYear[] {
  const open = ACADEMIC_YEARS.filter((y) => y.examEnd >= today);
  return open.length > 0 ? open : ACADEMIC_YEARS.slice(-1);
}

/** Year the cohort started A/L classes, for labels such as "started 2025". */
export function journeyStartYear(year: AcademicYear): number {
  return Number(year.journeyStart.slice(0, 4));
}
