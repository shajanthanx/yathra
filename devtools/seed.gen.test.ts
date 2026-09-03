/**
 * Development utility, not part of the test suite.
 *
 * Generates a realistic snapshot of student data for visual review of the web
 * build. Run it with:
 *   npx jest --testMatch "**\/devtools/*.gen.test.ts" devtools
 *
 * It writes seed-data.json next to this file; the screenshot harness loads that
 * into localStorage before opening a screen.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { getSyllabus } from '@/data/curriculum';
import { pastPaperId } from '@/domain/ids';
import type { PastPaperMap, Task, TopicProgressMap, StudySession } from '@/types/models';
import { addDays, todayLocal } from '@/utils/date';

// Dates are relative to the real current date, so the seeded snapshot always
// lands on "today" whenever the screenshots are taken.
const TODAY = todayLocal();
const iso = (date: string, hour = 9) => new Date(`${date}T0${hour}:00:00.000Z`).toISOString();

function topicIdsOf(subjectId: 'physics' | 'chemistry' | 'combined-mathematics'): string[] {
  return getSyllabus(subjectId).units.flatMap((unit) => unit.topics.map((topic) => topic.id));
}

it('writes a seed snapshot for visual review', () => {
  const physics = topicIdsOf('physics');
  const chemistry = topicIdsOf('chemistry');
  const maths = topicIdsOf('combined-mathematics');

  const topicProgress: TopicProgressMap = {};
  const mark = (ids: string[], count: number, status: 'completed' | 'practising' | 'learning') => {
    ids.slice(0, count).forEach((topicId) => {
      topicProgress[topicId] = { topicId, status, updatedAt: iso(addDays(TODAY, -10)) };
    });
  };

  // Maths ahead, Chemistry mid, Physics behind: enough spread to show the
  // progress bars, the focus lines and a meaningful on-track status.
  mark(maths, 22, 'completed');
  mark(maths.slice(22, 24), 2, 'practising');
  mark(chemistry, 24, 'completed');
  mark(chemistry.slice(24, 26), 2, 'learning');
  mark(physics, 18, 'completed');
  mark(physics.slice(18, 20), 2, 'practising');

  const tasks: Task[] = [
    {
      id: 't1',
      title: 'Current Electricity',
      subjectId: 'physics',
      topicId: physics[40],
      date: TODAY,
      durationMinutes: 45,
      completed: false,
      source: 'manual',
      createdAt: iso(addDays(TODAY, -2)),
      updatedAt: iso(addDays(TODAY, -2)),
    },
    {
      id: 't2',
      title: 'Chemical Equilibrium',
      subjectId: 'chemistry',
      topicId: chemistry[50],
      date: TODAY,
      durationMinutes: 30,
      completed: true,
      completedAt: iso(TODAY, 8),
      source: 'manual',
      createdAt: iso(addDays(TODAY, -2)),
      updatedAt: iso(TODAY, 8),
    },
    {
      id: 't3',
      title: 'Integration',
      subjectId: 'combined-mathematics',
      topicId: maths[20],
      date: TODAY,
      durationMinutes: 60,
      completed: false,
      source: 'manual',
      createdAt: iso(addDays(TODAY, -2)),
      updatedAt: iso(addDays(TODAY, -2)),
    },
    {
      id: 't4',
      title: 'Past paper 2024',
      subjectId: 'physics',
      date: addDays(TODAY, -3),
      durationMinutes: 90,
      completed: false,
      source: 'manual',
      createdAt: iso(addDays(TODAY, -10)),
      updatedAt: iso(addDays(TODAY, -10)),
    },
    {
      id: 't5',
      title: 'Thermal Physics revision',
      subjectId: 'physics',
      date: addDays(TODAY, -1),
      durationMinutes: 45,
      completed: false,
      source: 'manual',
      createdAt: iso(addDays(TODAY, -5)),
      updatedAt: iso(addDays(TODAY, -5)),
    },
    {
      id: 't6',
      title: 'Organic reactions',
      subjectId: 'chemistry',
      date: addDays(TODAY, 1),
      durationMinutes: 45,
      completed: false,
      source: 'manual',
      createdAt: iso(addDays(TODAY, -2)),
      updatedAt: iso(addDays(TODAY, -2)),
    },
    {
      id: 't7',
      title: 'Probability problems',
      subjectId: 'combined-mathematics',
      date: addDays(TODAY, 2),
      durationMinutes: 60,
      completed: false,
      source: 'manual',
      createdAt: iso(addDays(TODAY, -2)),
      updatedAt: iso(addDays(TODAY, -2)),
    },
    {
      id: 't8',
      title: 'Waves practice',
      subjectId: 'physics',
      date: addDays(TODAY, 9),
      durationMinutes: 45,
      completed: false,
      source: 'manual',
      createdAt: iso(addDays(TODAY, -2)),
      updatedAt: iso(addDays(TODAY, -2)),
    },
    {
      id: 't9',
      title: 'Titration calculations',
      subjectId: 'chemistry',
      date: addDays(TODAY, -2),
      durationMinutes: 30,
      completed: true,
      completedAt: iso(addDays(TODAY, -2)),
      source: 'manual',
      createdAt: iso(addDays(TODAY, -10)),
      updatedAt: iso(addDays(TODAY, -10)),
    },
  ];

  const sessions: StudySession[] = [
    {
      id: 's1',
      subjectId: 'physics',
      topicId: physics[40],
      startedAt: iso(addDays(TODAY, -1), 7),
      endedAt: iso(addDays(TODAY, -1), 8),
      durationSeconds: 2700,
      markedTopicCompleted: false,
    },
    {
      id: 's2',
      subjectId: 'chemistry',
      startedAt: iso(addDays(TODAY, -2), 7),
      endedAt: iso(addDays(TODAY, -2), 8),
      durationSeconds: 3600,
      markedTopicCompleted: true,
    },
    {
      id: 's3',
      subjectId: 'combined-mathematics',
      startedAt: iso(TODAY, 6),
      endedAt: iso(TODAY, 7),
      durationSeconds: 5400,
      markedTopicCompleted: false,
    },
  ];

  const pastPapers: PastPaperMap = {};
  const addPaper = (subjectId: 'physics' | 'chemistry', year: number, score?: number) => {
    const id = pastPaperId(subjectId, year);
    pastPapers[id] = {
      id,
      subjectId,
      year,
      status: score === undefined ? 'in_progress' : 'completed',
      ...(score === undefined ? {} : { score }),
      updatedAt: iso(addDays(TODAY, -15)),
    };
  };
  addPaper('physics', 2026, 68);
  addPaper('physics', 2025, 61);
  addPaper('physics', 2024, 74);
  addPaper('physics', 2023);
  addPaper('chemistry', 2026, 59);
  addPaper('chemistry', 2025, 66);
  addPaper('chemistry', 2024, 71);

  const snapshot = {
    'yathra:meta': { schemaVersion: 1 },
    'yathra:settings': { language: 'en', appearance: 'system', onboardingComplete: true },
    'yathra:profile': {
      academicYearId: 'al-2027',
      streamId: 'physical-science',
      subjectIds: ['combined-mathematics', 'physics', 'chemistry'],
      createdAt: iso(addDays(TODAY, -400)),
      updatedAt: iso(addDays(TODAY, -400)),
    },
    'yathra:topicProgress': topicProgress,
    'yathra:tasks': tasks,
    'yathra:sessions': sessions,
    'yathra:activeSession': null,
    'yathra:pastPapers': pastPapers,
  };

  writeFileSync(join(__dirname, 'seed-data.json'), JSON.stringify(snapshot, null, 2), 'utf8');
  expect(Object.keys(topicProgress).length).toBeGreaterThan(50);
});

