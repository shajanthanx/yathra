/**
 * Where the student is in the A/L journey, and how long is left.
 *
 * Every date comes from the bundled academic year (or the student's own
 * override), so correcting a timetable is a data change, not a code change.
 */
import type { AcademicYear, LocalDate } from '@/types/content';
import { addDays, clamp01, daysBetween, fractionElapsed, monthsBetween } from '@/utils/date';

export type ExamPhase = 'before' | 'during' | 'after';

export interface ExamCountdown {
  phase: ExamPhase;
  /** Days until the exam starts; 0 once it has started. */
  daysLeft: number;
  examStart: LocalDate;
  examEnd: LocalDate;
  isEstimated: boolean;
}

/** The exam start actually in force: the student's override wins over bundled data. */
export function effectiveExamStart(year: AcademicYear, override?: LocalDate): LocalDate {
  return override ?? year.examStart;
}

function effectiveExamEnd(year: AcademicYear, override?: LocalDate): LocalDate {
  if (!override) return year.examEnd;
  // Preserve the published length of the exam period when the start moves.
  const length = Math.max(0, daysBetween(year.examStart, year.examEnd));
  return addDays(override, length);
}

export function getExamCountdown(
  year: AcademicYear,
  today: LocalDate,
  override?: LocalDate,
): ExamCountdown {
  const examStart = effectiveExamStart(year, override);
  const examEnd = effectiveExamEnd(year, override);
  const daysLeft = daysBetween(today, examStart);

  const phase: ExamPhase = daysLeft > 0 ? 'before' : today <= examEnd ? 'during' : 'after';

  return {
    phase,
    daysLeft: Math.max(0, daysLeft),
    examStart,
    examEnd,
    isEstimated: override ? false : year.examDateStatus === 'estimated',
  };
}

export interface JourneyPosition {
  /** True before classes are due to start. */
  notStarted: boolean;
  daysElapsed: number;
  monthsElapsed: number;
  totalDays: number;
  /** 0–1 through the whole journey, start of classes to the exam. */
  fraction: number;
}

export function getJourneyPosition(
  year: AcademicYear,
  today: LocalDate,
  override?: LocalDate,
): JourneyPosition {
  const examStart = effectiveExamStart(year, override);
  const start = year.journeyStart;
  const daysElapsed = daysBetween(start, today);
  return {
    notStarted: daysElapsed < 0,
    daysElapsed: Math.max(0, daysElapsed),
    monthsElapsed: daysElapsed < 0 ? 0 : monthsBetween(start, today),
    totalDays: Math.max(0, daysBetween(start, examStart)),
    fraction: fractionElapsed(start, examStart, today),
  };
}

/**
 * How much of the syllabus a student would have covered by today if they were
 * spreading it evenly between the start of classes and the date the syllabus
 * should be finished (which leaves revision time before the exam).
 */
export function getExpectedProgress(year: AcademicYear, today: LocalDate, override?: LocalDate): number {
  const target = override ? addDays(override, -syllabusLeadDays(year)) : year.syllabusTargetDate;
  return clamp01(fractionElapsed(year.journeyStart, target, today));
}

function syllabusLeadDays(year: AcademicYear): number {
  return Math.max(0, daysBetween(year.syllabusTargetDate, year.examStart));
}

export function syllabusTargetDate(year: AcademicYear, override?: LocalDate): LocalDate {
  return override ? addDays(override, -syllabusLeadDays(year)) : year.syllabusTargetDate;
}
