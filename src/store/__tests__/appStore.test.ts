/**
 * Integration tests over the real store, repository and storage layers, with
 * AsyncStorage mocked in memory. These cover the paths a student actually
 * takes: set up a profile, plan work, tick things off, and restart the app.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSyllabus } from '@/data/curriculum';
import { calculateSubjectProgress } from '@/domain/progress';
import {
  addTask,
  addTasks,
  appStore,
  clearPastPaper,
  completeOnboarding,
  deleteTask,
  discardStudySession,
  finishStudySession,
  flushPending,
  loadApp,
  pauseStudySession,
  rescheduleTask,
  resetEverything,
  resumeStudySession,
  setAppearance,
  setLanguage,
  setPastPaper,
  setTaskCompleted,
  setTopicStatus,
  startStudySession,
  updateProfile,
  updateTask,
} from '../appStore';
import { todayLocal } from '@/utils/date';

const store = AsyncStorage as unknown as { __reset: () => void };

const profileDraft = {
  academicYearId: 'al-2027',
  streamId: 'physical-science' as const,
  subjectIds: ['combined-mathematics', 'physics', 'chemistry'] as const,
};

async function freshApp() {
  store.__reset();
  await resetEverything();
  await loadApp();
}

function data() {
  return appStore.getState().data;
}

beforeEach(async () => {
  await freshApp();
});

describe('first launch', () => {
  it('starts with no profile and onboarding incomplete', () => {
    expect(data().profile).toBeNull();
    expect(data().settings.onboardingComplete).toBe(false);
    expect(appStore.getState().status).toBe('ready');
  });

  it('completes onboarding and remembers the profile', async () => {
    setLanguage('si');
    completeOnboarding({ ...profileDraft, subjectIds: [...profileDraft.subjectIds] });

    expect(data().settings.onboardingComplete).toBe(true);
    expect(data().profile?.streamId).toBe('physical-science');
    expect(data().profile?.subjectIds).toHaveLength(3);

    await flushPending();
    await loadApp();

    expect(data().settings.language).toBe('si');
    expect(data().settings.onboardingComplete).toBe(true);
    expect(data().profile?.academicYearId).toBe('al-2027');
  });
});

describe('settings', () => {
  it('persists a language change across a restart', async () => {
    setLanguage('ta');
    await flushPending();
    await loadApp();
    expect(data().settings.language).toBe('ta');
  });

  it('persists an appearance change', async () => {
    setAppearance('dark');
    await flushPending();
    await loadApp();
    expect(data().settings.appearance).toBe('dark');
  });
});

describe('tasks', () => {
  beforeEach(() => {
    completeOnboarding({ ...profileDraft, subjectIds: [...profileDraft.subjectIds] });
  });

  it('adds a task and marks it complete in one call', () => {
    const task = addTask({ title: 'Current Electricity', subjectId: 'physics', date: '2027-03-01' });
    expect(data().tasks).toHaveLength(1);

    setTaskCompleted(task.id, true);
    expect(data().tasks[0]?.completed).toBe(true);
    expect(data().tasks[0]?.completedAt).toBeDefined();

    setTaskCompleted(task.id, false);
    expect(data().tasks[0]?.completed).toBe(false);
    expect(data().tasks[0]?.completedAt).toBeUndefined();
  });

  it('trims the title', () => {
    const task = addTask({ title: '  Waves  ', subjectId: 'physics', date: '2027-03-01' });
    expect(task.title).toBe('Waves');
  });

  it('edits a task', () => {
    const task = addTask({ title: 'Old', subjectId: 'physics', date: '2027-03-01' });
    updateTask(task.id, { title: 'New', durationMinutes: 30 });
    expect(data().tasks[0]?.title).toBe('New');
    expect(data().tasks[0]?.durationMinutes).toBe(30);
  });

  it('reschedules a task', () => {
    const task = addTask({ title: 'Move me', subjectId: 'physics', date: '2027-03-01' });
    rescheduleTask(task.id, '2027-03-05');
    expect(data().tasks[0]?.date).toBe('2027-03-05');
  });

  it('deletes a task', () => {
    const task = addTask({ title: 'Remove me', subjectId: 'physics', date: '2027-03-01' });
    deleteTask(task.id);
    expect(data().tasks).toHaveLength(0);
  });

  it('adds a batch of catch-up tasks at once', () => {
    addTasks([
      { title: 'A', subjectId: 'physics', date: '2027-03-01', source: 'catch_up' },
      { title: 'B', subjectId: 'chemistry', date: '2027-03-02', source: 'catch_up' },
    ]);
    expect(data().tasks).toHaveLength(2);
    expect(data().tasks.every((task) => task.source === 'catch_up')).toBe(true);
  });

  it('survives a restart', async () => {
    addTask({ title: 'Persisted', subjectId: 'physics', date: '2027-03-01', durationMinutes: 45 });
    await flushPending();
    await loadApp();
    expect(data().tasks).toHaveLength(1);
    expect(data().tasks[0]?.title).toBe('Persisted');
  });
});

describe('syllabus progress', () => {
  const physics = getSyllabus('physics');
  const firstTopic = physics.units[0]!.topics[0]!;

  beforeEach(() => {
    completeOnboarding({ ...profileDraft, subjectIds: [...profileDraft.subjectIds] });
  });

  it('records a topic status and moves subject progress', () => {
    expect(calculateSubjectProgress(physics, data().topicProgress)).toBe(0);
    setTopicStatus(firstTopic.id, 'completed');
    expect(data().topicProgress[firstTopic.id]?.status).toBe('completed');
    expect(calculateSubjectProgress(physics, data().topicProgress)).toBeGreaterThan(0);
  });

  it('clears the record when a topic goes back to not started', () => {
    setTopicStatus(firstTopic.id, 'learning');
    expect(data().topicProgress[firstTopic.id]).toBeDefined();
    setTopicStatus(firstTopic.id, 'not_started');
    expect(data().topicProgress[firstTopic.id]).toBeUndefined();
  });

  it('survives a restart', async () => {
    setTopicStatus(firstTopic.id, 'practising');
    await flushPending();
    await loadApp();
    expect(data().topicProgress[firstTopic.id]?.status).toBe('practising');
  });
});

describe('study sessions', () => {
  beforeEach(() => {
    completeOnboarding({ ...profileDraft, subjectIds: [...profileDraft.subjectIds] });
  });

  it('starts, pauses, resumes and finishes', () => {
    startStudySession({ subjectId: 'physics', plannedSeconds: 2700 });
    expect(data().activeSession).not.toBeNull();
    expect(data().activeSession?.runningSince).not.toBeNull();

    pauseStudySession();
    expect(data().activeSession?.runningSince).toBeNull();

    resumeStudySession();
    expect(data().activeSession?.runningSince).not.toBeNull();

    const result = finishStudySession(false);
    expect(data().activeSession).toBeNull();
    // A session of a few milliseconds is below the one-minute floor.
    expect(result.saved).toBe(false);
    expect(data().sessions).toHaveLength(0);
  });

  it('records a session that is long enough', () => {
    startStudySession({ subjectId: 'physics', plannedSeconds: 2700 });
    // Rewind the start so the elapsed time clears the one-minute floor.
    const active = data().activeSession!;
    appStore.setState((state) => ({
      ...state,
      data: {
        ...state.data,
        activeSession: { ...active, runningSince: Date.now() - 5 * 60 * 1000 },
      },
    }));

    const result = finishStudySession(false);
    expect(result.saved).toBe(true);
    expect(data().sessions).toHaveLength(1);
    expect(data().sessions[0]?.durationSeconds).toBeGreaterThanOrEqual(300);
  });

  it('can mark the topic complete when the session ends', () => {
    const topic = getSyllabus('physics').units[0]!.topics[0]!;
    startStudySession({ subjectId: 'physics', topicId: topic.id, plannedSeconds: 60 });
    const active = data().activeSession!;
    appStore.setState((state) => ({
      ...state,
      data: {
        ...state.data,
        activeSession: { ...active, runningSince: Date.now() - 5 * 60 * 1000 },
      },
    }));

    finishStudySession(true);
    expect(data().topicProgress[topic.id]?.status).toBe('completed');
    expect(data().sessions[0]?.markedTopicCompleted).toBe(true);
  });

  it('discards a session without recording it', () => {
    startStudySession({ subjectId: 'physics', plannedSeconds: 2700 });
    discardStudySession();
    expect(data().activeSession).toBeNull();
    expect(data().sessions).toHaveLength(0);
  });

  it('restores an unfinished session after a restart', async () => {
    startStudySession({ subjectId: 'physics', plannedSeconds: 2700 });
    await flushPending();
    await loadApp();
    expect(data().activeSession?.subjectId).toBe('physics');
  });
});

describe('past papers', () => {
  beforeEach(() => {
    completeOnboarding({ ...profileDraft, subjectIds: [...profileDraft.subjectIds] });
  });

  it('records and updates a paper', () => {
    setPastPaper({ subjectId: 'physics', year: 2026, status: 'completed', score: 68 });
    expect(data().pastPapers['physics:2026']?.score).toBe(68);

    setPastPaper({ subjectId: 'physics', year: 2026, status: 'completed', score: 72 });
    expect(data().pastPapers['physics:2026']?.score).toBe(72);
  });

  it('drops an empty note rather than storing whitespace', () => {
    setPastPaper({ subjectId: 'physics', year: 2025, status: 'completed', note: '   ' });
    expect(data().pastPapers['physics:2025']?.note).toBeUndefined();
  });

  it('clears a paper', () => {
    setPastPaper({ subjectId: 'physics', year: 2024, status: 'completed', score: 50 });
    clearPastPaper('physics', 2024);
    expect(data().pastPapers['physics:2024']).toBeUndefined();
  });
});

describe('editing the profile', () => {
  beforeEach(() => {
    completeOnboarding({ ...profileDraft, subjectIds: [...profileDraft.subjectIds] });
  });

  it('keeps progress for a subject that is removed', () => {
    const chemistryTopic = getSyllabus('chemistry').units[0]!.topics[0]!;
    setTopicStatus(chemistryTopic.id, 'completed');

    updateProfile({ subjectIds: ['combined-mathematics', 'physics', 'ict'] });

    expect(data().profile?.subjectIds).toContain('ict');
    expect(data().profile?.subjectIds).not.toContain('chemistry');
    // The record is still on the device, ready if chemistry comes back.
    expect(data().topicProgress[chemistryTopic.id]?.status).toBe('completed');
  });

  it('sets and clears an exam date override', () => {
    updateProfile({ examDateOverride: '2027-09-01' });
    expect(data().profile?.examDateOverride).toBe('2027-09-01');

    updateProfile({ examDateOverride: null });
    expect(data().profile?.examDateOverride).toBeUndefined();
  });
});

describe('resetting', () => {
  it('removes everything and returns to onboarding', async () => {
    completeOnboarding({ ...profileDraft, subjectIds: [...profileDraft.subjectIds] });
    addTask({ title: 'Something', subjectId: 'physics', date: todayLocal() });
    await flushPending();

    await resetEverything();

    expect(data().profile).toBeNull();
    expect(data().tasks).toHaveLength(0);
    expect(data().settings.onboardingComplete).toBe(false);

    await loadApp();
    expect(data().profile).toBeNull();
    expect(data().tasks).toHaveLength(0);
  });
});

describe('recovering from damaged storage', () => {
  it('drops unreadable records instead of failing to start', async () => {
    store.__reset();
    await AsyncStorage.setItem('yathra:meta', JSON.stringify({ schemaVersion: 1 }));
    await AsyncStorage.setItem('yathra:tasks', 'this is not json');
    await AsyncStorage.setItem(
      'yathra:settings',
      JSON.stringify({ language: 'en', appearance: 'system', onboardingComplete: false }),
    );

    await loadApp();

    expect(data().tasks).toEqual([]);
    expect(appStore.getState().corruptedKeys).toContain('yathra:tasks');
  });
});
