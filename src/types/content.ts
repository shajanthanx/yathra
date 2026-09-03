/**
 * Types for bundled, read-only content (curriculum, academic calendar).
 * Nothing in this file is persisted; user data types live in ./models.ts.
 */
import type { SubjectId } from '@/data/curriculum/subject-ids';

export type LanguageCode = 'en' | 'si' | 'ta';

/** A user-facing string in all supported languages. */
export type LocalizedText = Readonly<Record<LanguageCode, string>>;

/** Calendar date in the device's local time zone, formatted YYYY-MM-DD. */
export type LocalDate = string;

/** Full timestamp, ISO 8601 (as produced by Date#toISOString). */
export type ISODateTime = string;

export type { SubjectId };

export type StreamId =
  | 'physical-science'
  | 'biological-science'
  | 'commerce'
  | 'arts'
  | 'engineering-technology'
  | 'bio-systems-technology';

export type DateStatus = 'confirmed' | 'estimated';

/** One A/L cohort, named by the year the examination is sat ("A/L 2027"). */
export interface AcademicYear {
  id: string;
  examYear: number;
  /** Typical Grade 12 start for the cohort. */
  journeyStart: LocalDate;
  journeyStartStatus: DateStatus;
  examStart: LocalDate;
  examEnd: LocalDate;
  examDateStatus: DateStatus;
  /** Date by which the syllabus should be finished to leave revision time. */
  syllabusTargetDate: LocalDate;
}

export interface Subject {
  id: SubjectId;
  /**
   * Two- or three-character identity mark, authored per language rather than
   * derived from the name: a Sinhala or Tamil leading "letter" is a grapheme
   * cluster of a base consonant plus dependent vowel signs, and slicing UTF-16
   * code units splits it into a broken glyph. The technology subjects use the
   * English initialisms that are standard in Sinhala and Tamil medium too.
   */
  mark: LocalizedText;
  /** Department of Examinations subject number. */
  code: string;
  name: LocalizedText;
  shortName: LocalizedText;
}

/**
 * Approved combination rule for a stream: every `core` subject is required,
 * exactly `choose.count` are picked from `choose.from`, and (optionally)
 * at least `atLeast.count` of the final three must come from `atLeast.from`.
 */
export interface CombinationRule {
  core: readonly SubjectId[];
  choose: { count: number; from: readonly SubjectId[] };
  atLeast?: { count: number; from: readonly SubjectId[] };
}

export interface Stream {
  id: StreamId;
  name: LocalizedText;
  /** Subjects that can appear in this stream's selection list. */
  subjectIds: readonly SubjectId[];
  rule: CombinationRule;
}

export interface SyllabusTopic {
  id: string;
  unitId: string;
  subjectId: SubjectId;
  order: number;
  name: LocalizedText;
  /** Relative size of the topic inside its unit (default 1). */
  weight: number;
}

export interface SyllabusUnit {
  id: string;
  subjectId: SubjectId;
  order: number;
  name: LocalizedText;
  /** NIE period allocation, when published. */
  periods?: number;
  grade?: 12 | 13;
  topics: readonly SyllabusTopic[];
}

export interface SubjectSyllabus {
  subjectId: SubjectId;
  /** 'units' means the syllabus is tracked at unit level (each unit has one topic). */
  depth: 'topics' | 'units';
  /** Whether Sinhala/Tamil unit names come from the official NIE editions or were translated. */
  nameSource: 'official' | 'translated';
  source: string;
  syllabusRevision: number;
  units: readonly SyllabusUnit[];
}
