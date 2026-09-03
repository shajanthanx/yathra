import {
  completionOf,
  dayLoad,
  countPlannedMinutes,
  groupByDay,
  isOverdue,
  laterTasks,
  overdueTasks,
  recentCompletion,
  sortTasks,
  summariseWeek,
  tasksForDay,
  tasksForWeek,
  weeklyCompletion,
} from '../tasks';
import { makeTask } from './fixtures';

const TODAY = '2027-08-04'; // a Wednesday

describe('overdue', () => {
  it('is overdue when incomplete and dated before today', () => {
    expect(isOverdue(makeTask({ date: '2027-08-03' }), TODAY)).toBe(true);
  });

  it('is not overdue on the day itself', () => {
    expect(isOverdue(makeTask({ date: TODAY }), TODAY)).toBe(false);
  });

  it('is never overdue once completed', () => {
    expect(isOverdue(makeTask({ date: '2027-01-01', completed: true }), TODAY)).toBe(false);
  });

  it('collects overdue tasks only', () => {
    const tasks = [
      makeTask({ date: '2027-08-01' }),
      makeTask({ date: '2027-08-02', completed: true }),
      makeTask({ date: TODAY }),
    ];
    expect(overdueTasks(tasks, TODAY)).toHaveLength(1);
  });
});

describe('day and week filters', () => {
  const tasks = [
    makeTask({ date: '2027-08-02' }),
    makeTask({ date: TODAY }),
    makeTask({ date: TODAY }),
    makeTask({ date: '2027-08-08' }),
    makeTask({ date: '2027-08-09' }),
  ];

  it('finds a single day', () => {
    expect(tasksForDay(tasks, TODAY)).toHaveLength(2);
  });

  it('finds the Monday-to-Sunday week', () => {
    expect(tasksForWeek(tasks, TODAY)).toHaveLength(4);
  });

  it('puts the following week in "later"', () => {
    const later = laterTasks(tasks, TODAY);
    expect(later).toHaveLength(1);
    expect(later[0]?.date).toBe('2027-08-09');
  });
});

describe('sorting', () => {
  it('puts incomplete tasks before completed ones', () => {
    const sorted = sortTasks([
      makeTask({ title: 'Done', completed: true }),
      makeTask({ title: 'Pending' }),
    ]);
    expect(sorted[0]?.title).toBe('Pending');
  });

  it('puts shorter tasks first', () => {
    const sorted = sortTasks([
      makeTask({ title: 'Long', durationMinutes: 90 }),
      makeTask({ title: 'Short', durationMinutes: 15 }),
    ]);
    expect(sorted[0]?.title).toBe('Short');
  });

  it('puts tasks with no duration last', () => {
    const sorted = sortTasks([makeTask({ title: 'Open' }), makeTask({ title: 'Timed', durationMinutes: 30 })]);
    expect(sorted[0]?.title).toBe('Timed');
  });
});

describe('grouping', () => {
  it('groups by day in date order', () => {
    const groups = groupByDay([
      makeTask({ date: '2027-08-09' }),
      makeTask({ date: '2027-08-08' }),
      makeTask({ date: '2027-08-09' }),
    ]);
    expect(groups.map((group) => group.date)).toEqual(['2027-08-08', '2027-08-09']);
    expect(groups[1]?.tasks).toHaveLength(2);
  });

  it('summarises a week as seven days', () => {
    const summary = summariseWeek([makeTask({ date: TODAY, completed: true })], '2027-08-02');
    expect(summary).toHaveLength(7);
    expect(summary[2]).toEqual({ date: TODAY, total: 1, completed: 1 });
    expect(summary[0]?.total).toBe(0);
  });
});

describe('completion', () => {
  it('is zero when nothing is planned', () => {
    expect(completionOf([])).toEqual({ total: 0, completed: 0, rate: 0 });
  });

  it('computes a rate', () => {
    const tasks = [makeTask({ completed: true }), makeTask({ completed: true }), makeTask()];
    expect(completionOf(tasks).rate).toBeCloseTo(2 / 3);
  });

  it('measures the current week', () => {
    const tasks = [makeTask({ date: TODAY, completed: true }), makeTask({ date: '2027-08-06' })];
    expect(weeklyCompletion(tasks, TODAY)).toEqual({ total: 2, completed: 1, rate: 0.5 });
  });

  it('measures a recent window ending today', () => {
    const tasks = [
      makeTask({ date: '2027-08-01', completed: true }),
      makeTask({ date: '2027-06-01', completed: false }),
    ];
    expect(recentCompletion(tasks, TODAY, 14)).toEqual({ total: 1, completed: 1, rate: 1 });
  });
});

describe('planned minutes', () => {
  it('adds durations and ignores tasks without one', () => {
    const tasks = [makeTask({ durationMinutes: 45 }), makeTask(), makeTask({ durationMinutes: 30 })];
    expect(countPlannedMinutes(tasks)).toBe(75);
  });
});

describe('dayLoad', () => {
  const week = ['2027-08-02', '2027-08-03', '2027-08-04', '2027-08-05'];

  it('sums planned minutes and counts per day', () => {
    const rows = dayLoad(
      [
        makeTask({ date: '2027-08-02', durationMinutes: 45 }),
        makeTask({ date: '2027-08-02', durationMinutes: 30, completed: true }),
        makeTask({ date: '2027-08-04', durationMinutes: 60 }),
      ],
      week,
    );

    expect(rows.map((row) => row.minutes)).toEqual([75, 0, 60, 0]);
    expect(rows.map((row) => row.tasks)).toEqual([2, 0, 1, 0]);
    expect(rows.map((row) => row.completed)).toEqual([1, 0, 0, 0]);
  });

  it('normalises intensity against the busiest day', () => {
    const rows = dayLoad(
      [
        makeTask({ date: '2027-08-02', durationMinutes: 100 }),
        makeTask({ date: '2027-08-03', durationMinutes: 50 }),
      ],
      week,
    );

    expect(rows.map((row) => row.intensity)).toEqual([1, 0.5, 0, 0]);
  });

  it('falls back to task counts rather than inventing a duration', () => {
    const rows = dayLoad(
      [
        makeTask({ date: '2027-08-02' }),
        makeTask({ date: '2027-08-02' }),
        makeTask({ date: '2027-08-03' }),
      ],
      week,
    );

    expect(rows.map((row) => row.minutes)).toEqual([0, 0, 0, 0]);
    expect(rows.map((row) => row.intensity)).toEqual([1, 0.5, 0, 0]);
  });

  it('is all zero for an empty week, with no division by zero', () => {
    const rows = dayLoad([], week);
    expect(rows).toHaveLength(4);
    expect(rows.every((row) => row.intensity === 0 && row.minutes === 0)).toBe(true);
  });

  it('returns one row per requested date, in order', () => {
    const rows = dayLoad([makeTask({ date: '2027-08-05' })], week);
    expect(rows.map((row) => row.date)).toEqual(week);
  });
});
