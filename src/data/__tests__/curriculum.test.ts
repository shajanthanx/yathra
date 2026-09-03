/**
 * Integrity checks on the bundled curriculum. These guard the data itself:
 * a duplicated id would silently merge two topics' progress, and a missing
 * translation would show English text inside a Sinhala or Tamil screen.
 */
import { ACADEMIC_YEARS, findAcademicYear, selectableAcademicYears } from '@/data/academic-years';
import { getStream, getSubject, getSyllabus, STREAMS, SUBJECTS, findTopic } from '@/data/curriculum';
import { SUBJECT_IDS } from '@/data/curriculum/subject-ids';
import { isSelectionComplete, validateSelection } from '@/domain/combinations';
import { daysBetween, isValidLocalDate } from '@/utils/date';
import type { LocalizedText } from '@/types/content';

const LANGUAGES = ['en', 'si', 'ta'] as const;

/** Every combination of `size` items, for exhaustively checking stream rules. */
function allCombinations<T>(items: T[], size: number): T[][] {
  if (size === 0) return [[]];
  const result: T[][] = [];
  for (let i = 0; i <= items.length - size; i += 1) {
    const head = items[i] as T;
    for (const tail of allCombinations(items.slice(i + 1), size - 1)) {
      result.push([head, ...tail]);
    }
  }
  return result;
}

function assertTranslated(text: LocalizedText, label: string) {
  for (const language of LANGUAGES) {
    const value = text[language];
    expect(typeof value === 'string' && value.trim().length > 0).toBe(true);
    if (!value) throw new Error(`${label} is missing ${language}`);
  }
}

describe('subjects', () => {
  it('has an entry for every subject id', () => {
    expect(SUBJECTS.map((subject) => subject.id).sort()).toEqual([...SUBJECT_IDS].sort());
  });

  it('has unique Department of Examinations codes', () => {
    const codes = SUBJECTS.map((subject) => subject.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it('names every subject in all three languages', () => {
    for (const subject of SUBJECTS) {
      assertTranslated(subject.name, `${subject.id} name`);
      assertTranslated(subject.shortName, `${subject.id} short name`);
    }
  });
});

describe('streams', () => {
  it('names every stream in all three languages', () => {
    for (const stream of STREAMS) {
      assertTranslated(stream.name, `${stream.id} name`);
    }
  });

  it('only offers subjects that have a bundled syllabus', () => {
    for (const stream of STREAMS) {
      for (const subjectId of stream.subjectIds) {
        expect(SUBJECT_IDS).toContain(subjectId);
        expect(() => getSyllabus(subjectId)).not.toThrow();
      }
    }
  });

  it('includes every core and choosable subject in its own subject list', () => {
    for (const stream of STREAMS) {
      for (const subjectId of [...stream.rule.core, ...stream.rule.choose.from]) {
        expect(stream.subjectIds).toContain(subjectId);
      }
    }
  });

  it('can always form at least one valid combination', () => {
    for (const stream of STREAMS) {
      const valid = allCombinations([...stream.subjectIds], 3).filter((selection) =>
        isSelectionComplete(stream, selection),
      );
      expect(valid.length).toBeGreaterThan(0);
    }
  });

  it('rejects a combination with a subject from another stream', () => {
    const physical = getStream('physical-science');
    expect(validateSelection(physical, ['combined-mathematics', 'physics', 'accounting'])).not.toBeNull();
  });
});

describe('syllabi', () => {
  it.each([...SUBJECT_IDS])('%s has units and topics', (subjectId) => {
    const syllabus = getSyllabus(subjectId);
    expect(syllabus.subjectId).toBe(subjectId);
    expect(syllabus.units.length).toBeGreaterThan(0);
    for (const unit of syllabus.units) {
      expect(unit.topics.length).toBeGreaterThan(0);
    }
  });

  it.each([...SUBJECT_IDS])('%s names every unit and topic in all three languages', (subjectId) => {
    const syllabus = getSyllabus(subjectId);
    for (const unit of syllabus.units) {
      assertTranslated(unit.name, `${subjectId} unit ${unit.order}`);
      for (const topic of unit.topics) {
        assertTranslated(topic.name, `${subjectId} topic ${topic.id}`);
      }
    }
  });

  it('gives every topic a unique id across the whole curriculum', () => {
    const ids: string[] = [];
    for (const subjectId of SUBJECT_IDS) {
      for (const unit of getSyllabus(subjectId).units) {
        for (const topic of unit.topics) ids.push(topic.id);
      }
    }
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    expect(duplicates).toEqual([]);
    expect(ids.length).toBeGreaterThan(200);
  });

  it('gives every unit a unique id across the whole curriculum', () => {
    const ids = SUBJECT_IDS.flatMap((subjectId) => getSyllabus(subjectId).units.map((unit) => unit.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('numbers units and topics from one, in order', () => {
    for (const subjectId of SUBJECT_IDS) {
      const syllabus = getSyllabus(subjectId);
      syllabus.units.forEach((unit, index) => {
        expect(unit.order).toBe(index + 1);
        expect(unit.subjectId).toBe(subjectId);
        unit.topics.forEach((topic, topicIndex) => {
          expect(topic.order).toBe(topicIndex + 1);
          expect(topic.unitId).toBe(unit.id);
          expect(topic.weight).toBeGreaterThan(0);
        });
      });
    }
  });

  it('can look up any topic by id', () => {
    const first = getSyllabus('physics').units[0]?.topics[0];
    expect(first).toBeDefined();
    expect(findTopic(first!.id)?.id).toBe(first!.id);
    expect(findTopic('no-such-topic')).toBeUndefined();
  });

  it('records its source and revision', () => {
    for (const subjectId of SUBJECT_IDS) {
      const syllabus = getSyllabus(subjectId);
      expect(syllabus.source.length).toBeGreaterThan(10);
      expect(syllabus.syllabusRevision).toBe(2017);
      expect(['official', 'translated']).toContain(syllabus.nameSource);
    }
  });

  it('uses unit-level tracking only where sub-topics are unavailable', () => {
    expect(getSyllabus('engineering-technology').depth).toBe('units');
    expect(getSyllabus('business-statistics').depth).toBe('units');
    expect(getSyllabus('physics').depth).toBe('topics');
  });
});

describe('academic years', () => {
  it('has valid, ordered dates', () => {
    for (const year of ACADEMIC_YEARS) {
      expect(isValidLocalDate(year.journeyStart)).toBe(true);
      expect(isValidLocalDate(year.examStart)).toBe(true);
      expect(isValidLocalDate(year.examEnd)).toBe(true);
      expect(isValidLocalDate(year.syllabusTargetDate)).toBe(true);
      expect(year.journeyStart < year.syllabusTargetDate).toBe(true);
      expect(year.syllabusTargetDate < year.examStart).toBe(true);
      expect(year.examStart <= year.examEnd).toBe(true);
    }
  });

  it('leaves revision time between the syllabus target and the exam', () => {
    for (const year of ACADEMIC_YEARS) {
      expect(daysBetween(year.syllabusTargetDate, year.examStart)).toBe(42);
    }
  });

  it('names the cohort by its examination year', () => {
    for (const year of ACADEMIC_YEARS) {
      expect(year.id).toBe(`al-${year.examYear}`);
      expect(Number(year.examStart.slice(0, 4))).toBe(year.examYear);
    }
  });

  it('runs cohorts for roughly two years of classes', () => {
    for (const year of ACADEMIC_YEARS) {
      const days = daysBetween(year.journeyStart, year.examStart);
      expect(days).toBeGreaterThan(500);
      expect(days).toBeLessThan(900);
    }
  });

  it('looks up a year by id', () => {
    expect(findAcademicYear('al-2027')?.examYear).toBe(2027);
    expect(findAcademicYear('al-1999')).toBeUndefined();
  });

  it('offers only cohorts whose exam has not finished', () => {
    const selectable = selectableAcademicYears('2027-01-01');
    expect(selectable.map((year) => year.examYear)).not.toContain(2026);
    expect(selectable.map((year) => year.examYear)).toContain(2027);
  });

  it('always offers at least one cohort, even far in the future', () => {
    expect(selectableAcademicYears('2099-01-01').length).toBeGreaterThan(0);
  });
});

describe('subject lookup', () => {
  it('throws for an unknown subject rather than returning undefined', () => {
    expect(() => getSubject('astrology' as 'physics')).toThrow();
  });
});
