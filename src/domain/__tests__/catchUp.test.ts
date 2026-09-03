import {
  generateCatchUpPlan,
  MAX_MINUTES_PER_DAY,
  MAX_TASKS_PER_DAY,
  PLAN_DAYS,
  type CatchUpInput,
} from '../catchUp';
import { makeSyllabus, makeTask, progressOf, topicIds } from './fixtures';

const TODAY = '2027-03-01';

const physics = makeSyllabus('physics');
const chemistry = makeSyllabus('chemistry');

function input(overrides: Partial<CatchUpInput> = {}): CatchUpInput {
  return {
    today: TODAY,
    syllabi: [physics],
    progress: {},
    tasks: [],
    gap: 0.2,
    topicTitle: (topic) => topic.name.en,
    ...overrides,
  };
}

describe('an empty plan', () => {
  it('is empty when there is nothing left to do', () => {
    const done = progressOf(
      Object.fromEntries(topicIds(physics).map((id) => [id, 'completed' as const])),
    );
    const plan = generateCatchUpPlan(input({ progress: done }));
    expect(plan.isEmpty).toBe(true);
    expect(plan.totalItems).toBe(0);
    expect(plan.days).toHaveLength(0);
  });
});

describe('daily limits', () => {
  it('never puts more than the daily maximum on one day', () => {
    const tasks = Array.from({ length: 30 }, () => makeTask({ date: '2027-02-01' }));
    const plan = generateCatchUpPlan(input({ tasks }));
    for (const day of plan.days) {
      expect(day.items.length).toBeLessThanOrEqual(MAX_TASKS_PER_DAY);
      const minutes = day.items.reduce((sum, item) => sum + item.durationMinutes, 0);
      expect(minutes).toBeLessThanOrEqual(MAX_MINUTES_PER_DAY);
    }
  });

  it('never plans beyond seven days', () => {
    const tasks = Array.from({ length: 40 }, () => makeTask({ date: '2027-02-01' }));
    const plan = generateCatchUpPlan(input({ tasks }));
    expect(plan.days.length).toBeLessThanOrEqual(PLAN_DAYS);
    expect(plan.totalItems).toBeLessThanOrEqual(PLAN_DAYS * MAX_TASKS_PER_DAY);
  });

  it('starts today and runs forward', () => {
    const plan = generateCatchUpPlan(input());
    expect(plan.days[0]?.date).toBe(TODAY);
  });
});

describe('what goes into the plan', () => {
  it('moves overdue tasks first', () => {
    const overdue = makeTask({ date: '2027-02-01', title: 'Overdue work' });
    const plan = generateCatchUpPlan(input({ tasks: [overdue] }));
    expect(plan.rescheduledTaskIds).toContain(overdue.id);
    expect(plan.days[0]?.items[0]?.kind).toBe('reschedule');
  });

  it('leaves tasks that are not overdue alone', () => {
    const future = makeTask({ date: '2027-04-01' });
    const plan = generateCatchUpPlan(input({ tasks: [future] }));
    expect(plan.rescheduledTaskIds).not.toContain(future.id);
  });

  it('does not add a topic that already has an open task', () => {
    const firstTopic = topicIds(physics)[0]!;
    const plan = generateCatchUpPlan(input({ tasks: [makeTask({ topicId: firstTopic, date: '2027-03-05' })] }));
    const plannedTopics = plan.days.flatMap((day) => day.items.map((item) => item.topicId));
    expect(plannedTopics).not.toContain(firstTopic);
  });

  it('caps topics per subject when only slightly behind', () => {
    const plan = generateCatchUpPlan(input({ gap: 0.08 }));
    expect(plan.subjects[0]?.topics.length).toBeLessThanOrEqual(2);
  });

  it('allows more topics per subject when far behind', () => {
    const plan = generateCatchUpPlan(input({ gap: 0.3 }));
    expect(plan.subjects[0]?.topics.length).toBeLessThanOrEqual(4);
    expect(plan.subjects[0]?.topics.length).toBeGreaterThan(2);
  });

  it('spreads work across subjects rather than finishing one first', () => {
    const plan = generateCatchUpPlan(input({ syllabi: [physics, chemistry], gap: 0.3 }));
    const subjects = plan.days.flatMap((day) =>
      day.items.filter((item) => item.kind === 'topic').map((item) => item.subjectId),
    );
    expect(new Set(subjects).size).toBe(2);
    // The first two topic items should come from different subjects.
    expect(subjects[0]).not.toBe(subjects[1]);
  });

  it('serves the subject that is further behind first', () => {
    const ahead = progressOf(
      Object.fromEntries(topicIds(physics).slice(0, 3).map((id) => [id, 'completed' as const])),
    );
    const plan = generateCatchUpPlan(input({ syllabi: [physics, chemistry], progress: ahead, gap: 0.3 }));
    expect(plan.subjects[0]?.subjectId).toBe('chemistry');
  });
});

describe('determinism', () => {
  it('produces an identical plan for identical input', () => {
    const first = generateCatchUpPlan(input({ syllabi: [physics, chemistry] }));
    const second = generateCatchUpPlan(input({ syllabi: [physics, chemistry] }));
    expect(JSON.stringify(first)).toBe(JSON.stringify(second));
  });
});
