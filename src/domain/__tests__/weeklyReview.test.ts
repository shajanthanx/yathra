import { buildWeeklyReview } from '../weeklyReview';
import { makeSyllabus, makeTask, progressOf, topicIds } from './fixtures';

const MONDAY = '2027-08-02';
const WEDNESDAY = '2027-08-04';
const NEXT_MONDAY = '2027-08-09';

const physics = makeSyllabus('physics');
const chemistry = makeSyllabus('chemistry');
const [alpha, beta] = topicIds(physics) as [string, string];

function review(overrides: Parameters<typeof buildWeeklyReview>[0]) {
  return buildWeeklyReview(overrides);
}

describe('week boundaries', () => {
  it('reports the Monday-to-Sunday week containing the date', () => {
    const result = review({ date: WEDNESDAY, tasks: [], sessions: [], syllabi: [], progress: {} });
    expect(result.weekStart).toBe(MONDAY);
    expect(result.weekEnd).toBe('2027-08-08');
  });

  it('counts only tasks inside the week', () => {
    const tasks = [
      makeTask({ date: WEDNESDAY, completed: true }),
      makeTask({ date: NEXT_MONDAY, completed: true }),
    ];
    const result = review({ date: WEDNESDAY, tasks, sessions: [], syllabi: [], progress: {} });
    expect(result.planned).toBe(1);
    expect(result.completed).toBe(1);
  });
});

describe('completion', () => {
  it('is empty when nothing happened', () => {
    const result = review({ date: WEDNESDAY, tasks: [], sessions: [], syllabi: [], progress: {} });
    expect(result.isEmpty).toBe(true);
    expect(result.rate).toBe(0);
  });

  it('computes the overall rate', () => {
    const tasks = [
      makeTask({ date: MONDAY, completed: true }),
      makeTask({ date: WEDNESDAY, completed: true }),
      makeTask({ date: WEDNESDAY }),
      makeTask({ date: '2027-08-06' }),
    ];
    const result = review({ date: WEDNESDAY, tasks, sessions: [], syllabi: [], progress: {} });
    expect(result.planned).toBe(4);
    expect(result.completed).toBe(2);
    expect(result.rate).toBe(0.5);
  });
});

describe('subject verdicts', () => {
  it('marks a subject with most tasks done as going well', () => {
    const tasks = [
      makeTask({ date: MONDAY, subjectId: 'physics', completed: true }),
      makeTask({ date: MONDAY, subjectId: 'physics', completed: true }),
      makeTask({ date: MONDAY, subjectId: 'physics', completed: true }),
    ];
    const result = review({ date: WEDNESDAY, tasks, sessions: [], syllabi: [physics], progress: {} });
    expect(result.subjects[0]?.verdict).toBe('good');
  });

  it('flags a subject with little done as needing attention', () => {
    const tasks = [
      makeTask({ date: MONDAY, subjectId: 'physics', completed: false }),
      makeTask({ date: MONDAY, subjectId: 'physics', completed: false }),
      makeTask({ date: MONDAY, subjectId: 'physics', completed: true }),
    ];
    const result = review({ date: WEDNESDAY, tasks, sessions: [], syllabi: [physics], progress: {} });
    expect(result.subjects[0]?.verdict).toBe('attention');
  });

  it('marks a subject with nothing planned as quiet, not failing', () => {
    const result = review({ date: WEDNESDAY, tasks: [], sessions: [], syllabi: [physics], progress: {} });
    expect(result.subjects[0]?.verdict).toBe('quiet');
  });
});

describe('topics and study time', () => {
  it('counts topics completed during the week only', () => {
    const progress = {
      [alpha]: { topicId: alpha, status: 'completed' as const, updatedAt: '2027-08-04T09:00:00.000Z' },
      [beta]: { topicId: beta, status: 'completed' as const, updatedAt: '2027-07-01T09:00:00.000Z' },
    };
    const result = review({ date: WEDNESDAY, tasks: [], sessions: [], syllabi: [physics], progress });
    expect(result.topicsCompleted).toBe(1);
  });

  it('adds study seconds inside the week', () => {
    const sessions = [
      {
        id: 's1',
        subjectId: 'physics' as const,
        startedAt: '2027-08-04T09:00:00.000Z',
        endedAt: '2027-08-04T10:00:00.000Z',
        durationSeconds: 3600,
        markedTopicCompleted: false,
      },
    ];
    const result = review({ date: WEDNESDAY, tasks: [], sessions, syllabi: [physics], progress: {} });
    expect(result.studySeconds).toBe(3600);
    expect(result.isEmpty).toBe(false);
  });
});

describe('next focus', () => {
  it('suggests topics already in progress before untouched ones', () => {
    const progress = progressOf({ [beta]: 'practising' });
    const result = review({ date: WEDNESDAY, tasks: [], sessions: [], syllabi: [physics], progress });
    expect(result.nextFocus[0]?.id).toBe(beta);
  });

  it('suggests at most four topics', () => {
    const result = review({
      date: WEDNESDAY,
      tasks: [],
      sessions: [],
      syllabi: [physics, chemistry],
      progress: {},
    });
    expect(result.nextFocus.length).toBeLessThanOrEqual(4);
  });

  it('does not repeat a topic', () => {
    const result = review({
      date: WEDNESDAY,
      tasks: [],
      sessions: [],
      syllabi: [physics, chemistry],
      progress: {},
    });
    const ids = result.nextFocus.map((topic) => topic.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
