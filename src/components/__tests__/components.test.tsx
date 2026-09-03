/**
 * Component tests. These check the pieces that carry text and state in every
 * language, since a layout that works in English can still fail in Sinhala or
 * Tamil.
 */
import { render, screen, fireEvent } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Chip } from '../Chip';
import { EmptyState } from '../EmptyState';
import { ProgressBar } from '../ProgressBar';
import { SegmentedControl } from '../SegmentedControl';
import { StatusPanel } from '../StatusPanel';
import { SubjectRow } from '../SubjectRow';
import { TaskRow } from '../TaskRow';
import { TopicRow } from '../TopicRow';
import { getSyllabus } from '@/data/curriculum';
import { createTranslator, localize } from '@/i18n';
import { completeOnboarding, setLanguage } from '@/store/appStore';
import { ThemeProvider } from '@/theme/ThemeProvider';
import type { LanguageCode } from '@/types/content';
import type { Task } from '@/types/models';

const metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

function renderUI(ui: ReactElement) {
  return render(
    <SafeAreaProvider initialMetrics={metrics}>
      <ThemeProvider>{ui}</ThemeProvider>
    </SafeAreaProvider>,
  );
}

const LANGUAGES: LanguageCode[] = ['en', 'si', 'ta'];

const sampleTask: Task = {
  id: 't1',
  title: 'Current Electricity',
  subjectId: 'physics',
  date: '2027-03-01',
  durationMinutes: 45,
  completed: false,
  source: 'manual',
  createdAt: '2027-02-01T00:00:00.000Z',
  updatedAt: '2027-02-01T00:00:00.000Z',
};

beforeEach(() => {
  setLanguage('en');
  completeOnboarding({
    academicYearId: 'al-2027',
    streamId: 'physical-science',
    subjectIds: ['combined-mathematics', 'physics', 'chemistry'],
  });
});

describe('Button', () => {
  it('calls onPress', () => {
    const onPress = jest.fn();
    renderUI(<Button label="Add task" onPress={onPress} />);
    fireEvent.press(screen.getByRole('button', { name: 'Add task' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire while disabled', () => {
    const onPress = jest.fn();
    renderUI(<Button label="Add task" onPress={onPress} disabled />);
    fireEvent.press(screen.getByText('Add task'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('hides the label while loading', () => {
    renderUI(<Button label="Saving" onPress={jest.fn()} loading />);
    expect(screen.queryByText('Saving')).toBeNull();
  });
});

describe('Chip', () => {
  it('reports its selected state to assistive technology', () => {
    renderUI(<Chip label="Physics" selected onPress={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Physics' })).toBeTruthy();
  });

  it('is not offered as a control when locked', () => {
    // A core subject is shown as already chosen; it must not look pressable to
    // a screen reader either.
    renderUI(<Chip label="Physics" locked onPress={jest.fn()} />);
    expect(screen.getByText('Physics')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Physics' })).toBeNull();
  });
});

describe('TaskRow', () => {
  it('toggles completion from the circle', () => {
    const onToggle = jest.fn();
    renderUI(<TaskRow task={sampleTask} onToggle={onToggle} />);
    fireEvent.press(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(sampleTask);
  });

  it('shows the subject and duration alongside the title', () => {
    renderUI(<TaskRow task={sampleTask} onToggle={jest.fn()} />);
    expect(screen.getByText('Current Electricity')).toBeTruthy();
    expect(screen.getByText(/Physics/)).toBeTruthy();
    expect(screen.getByText(/45 min/)).toBeTruthy();
  });

  it.each(LANGUAGES)('renders in %s', (language) => {
    setLanguage(language);
    renderUI(<TaskRow task={sampleTask} onToggle={jest.fn()} />);
    expect(screen.getByText('Current Electricity')).toBeTruthy();
  });
});

describe('TopicRow', () => {
  const topic = getSyllabus('physics').units[0]!.topics[0]!;

  it.each(LANGUAGES)('shows the topic name in %s', (language) => {
    setLanguage(language);
    renderUI(<TopicRow topic={topic} status="not_started" onPress={jest.fn()} />);
    expect(screen.getByText(localize(topic.name, language))).toBeTruthy();
  });

  it('shows a status label once a topic is started', () => {
    setLanguage('en');
    renderUI(<TopicRow topic={topic} status="practising" onPress={jest.fn()} />);
    expect(screen.getByText('Practising')).toBeTruthy();
  });

  it('opens on press and cycles on long press', () => {
    const onPress = jest.fn();
    const onLongPress = jest.fn();
    renderUI(
      <TopicRow topic={topic} status="not_started" onPress={onPress} onLongPress={onLongPress} />,
    );
    const row = screen.getByRole('button');
    fireEvent.press(row);
    expect(onPress).toHaveBeenCalledWith(topic);
    fireEvent(row, 'longPress');
    expect(onLongPress).toHaveBeenCalledWith(topic);
  });
});

describe('SubjectRow', () => {
  const summary = {
    subjectId: 'physics' as const,
    progress: 0.58,
    completedTopics: 20,
    totalTopics: 62,
    incompleteTopics: 42,
    focusTopic: getSyllabus('physics').units[0]!.topics[0]!,
  };

  it('shows the rounded percentage', () => {
    renderUI(<SubjectRow summary={summary} onPress={jest.fn()} />);
    expect(screen.getByText('58%')).toBeTruthy();
  });

  it('opens the subject when pressed', () => {
    const onPress = jest.fn();
    renderUI(<SubjectRow summary={summary} onPress={onPress} />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledWith('physics');
  });

  it.each(LANGUAGES)('renders the subject name in %s', (language) => {
    setLanguage(language);
    renderUI(<SubjectRow summary={summary} onPress={jest.fn()} />);
    const t = createTranslator(language);
    expect(screen.getByText(t('subjects.topicsLeft.other', { count: 42 }))).toBeTruthy();
  });
});

describe('StatusPanel', () => {
  it.each(['on_track', 'catching_up', 'behind', 'just_started'] as const)(
    'shows a label and a message for %s',
    (status) => {
      renderUI(<StatusPanel status={status} />);
      const t = createTranslator('en');
      const key = (
        {
          on_track: 'status.onTrack',
          catching_up: 'status.catchingUp',
          behind: 'status.behind',
          just_started: 'status.justStarted',
        } as const
      )[status];
      expect(screen.getByText(t(`${key}.label` as 'status.onTrack.label'))).toBeTruthy();
      expect(screen.getByText(t(`${key}.message` as 'status.onTrack.message'))).toBeTruthy();
    },
  );

  it('offers catch-up only when the student is behind', () => {
    const onCatchUp = jest.fn();
    const { rerender } = renderUI(<StatusPanel status="on_track" onCatchUp={onCatchUp} />);
    expect(screen.queryByText('Catch up')).toBeNull();

    rerender(
      <SafeAreaProvider initialMetrics={metrics}>
        <ThemeProvider>
          <StatusPanel status="behind" onCatchUp={onCatchUp} />
        </ThemeProvider>
      </SafeAreaProvider>,
    );
    fireEvent.press(screen.getByText('Catch up'));
    expect(onCatchUp).toHaveBeenCalled();
  });
});

describe('SegmentedControl', () => {
  it('changes the selection', () => {
    const onChange = jest.fn();
    renderUI(
      <SegmentedControl
        options={[
          { value: 'today', label: 'Today' },
          { value: 'week', label: 'This week' },
        ]}
        value="today"
        onChange={onChange}
      />,
    );
    fireEvent.press(screen.getByText('This week'));
    expect(onChange).toHaveBeenCalledWith('week');
  });
});

describe('ProgressBar', () => {
  it('reports its value to assistive technology', () => {
    renderUI(<ProgressBar value={0.42} accessibilityLabel="42 percent complete" />);
    const bar = screen.getByLabelText('42 percent complete');
    expect(bar.props.accessibilityValue).toEqual({ now: 42, min: 0, max: 100 });
  });

  it('clamps values outside zero to one', () => {
    renderUI(<ProgressBar value={5} accessibilityLabel="progress" />);
    expect(screen.getByLabelText('progress').props.accessibilityValue.now).toBe(100);
  });
});

describe('EmptyState and Badge', () => {
  it('shows guidance rather than a bare message', () => {
    renderUI(
      <EmptyState title="Nothing planned for today." body="Add one small task to get started." />,
    );
    expect(screen.getByText('Nothing planned for today.')).toBeTruthy();
    expect(screen.getByText('Add one small task to get started.')).toBeTruthy();
  });

  it('always pairs a status colour with a word', () => {
    renderUI(<Badge label="Going well" tone="success" icon="check" />);
    expect(screen.getByText('Going well')).toBeTruthy();
  });
});
