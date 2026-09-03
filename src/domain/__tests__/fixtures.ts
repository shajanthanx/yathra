/** Small hand-built fixtures so domain tests do not depend on bundled content. */
import { defineSyllabus } from '@/data/curriculum/syllabus/define';
import type { AcademicYear, SubjectSyllabus } from '@/types/content';
import type { Task, TopicProgressMap, TopicStatus } from '@/types/models';

function text(value: string) {
  return { en: value, si: value, ta: value };
}

/** Two units of two topics each — four topics of equal weight. */
export function makeSyllabus(subjectId: 'physics' | 'chemistry' | 'biology' = 'physics'): SubjectSyllabus {
  return defineSyllabus({
    subjectId,
    source: 'test',
    syllabusRevision: 2017,
    nameSource: 'official',
    units: [
      {
        name: text('Unit One'),
        periods: 10,
        grade: 12,
        topics: [{ name: text('Alpha') }, { name: text('Beta') }],
      },
      {
        name: text('Unit Two'),
        periods: 10,
        grade: 13,
        topics: [{ name: text('Gamma') }, { name: text('Delta') }],
      },
    ],
  });
}

export function topicIds(syllabus: SubjectSyllabus): string[] {
  return syllabus.units.flatMap((unit) => unit.topics.map((topic) => topic.id));
}

export function progressOf(entries: Record<string, TopicStatus>): TopicProgressMap {
  const map: TopicProgressMap = {};
  for (const [topicId, status] of Object.entries(entries)) {
    map[topicId] = { topicId, status, updatedAt: '2027-03-01T10:00:00.000Z' };
  }
  return map;
}

export const testYear: AcademicYear = {
  id: 'al-test',
  examYear: 2027,
  journeyStart: '2025-08-01',
  journeyStartStatus: 'confirmed',
  examStart: '2027-08-03',
  examEnd: '2027-08-28',
  examDateStatus: 'confirmed',
  syllabusTargetDate: '2027-06-22',
};

let taskCounter = 0;

export function makeTask(overrides: Partial<Task> = {}): Task {
  taskCounter += 1;
  return {
    id: `task-${taskCounter}`,
    title: `Task ${taskCounter}`,
    subjectId: 'physics',
    date: '2027-03-01',
    completed: false,
    source: 'manual',
    createdAt: '2027-02-01T00:00:00.000Z',
    updatedAt: '2027-02-01T00:00:00.000Z',
    ...overrides,
  };
}
