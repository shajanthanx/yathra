/**
 * The new presentation primitives.
 *
 * ProgressRing matters most here: it is the only component drawing with
 * react-native-svg, so this suite is what proves the dependency renders in the
 * test environment at all. The accessibility assertions are the other point —
 * a ring, a tick and a bar height all carry meaning that a screen reader
 * cannot see, so each one has to name its own value.
 */
import { render, screen } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { Text as RNText } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedNumber } from '../AnimatedNumber';
import { ChipGroup } from '../ChipGroup';
import { DayCells } from '../DayCells';
import { JourneyProgress } from '../JourneyProgress';
import { LoadBars } from '../LoadBars';
import { ProgressRing } from '../ProgressRing';
import { StatTile } from '../StatTile';
import { SubjectMark } from '../SubjectMark';
import { Text } from '../Text';
import { setLanguage } from '@/store/appStore';
import { ThemeProvider } from '@/theme/ThemeProvider';
import type { LanguageCode } from '@/types/content';

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

/** The week the plan fixtures use; 2027-08-02 is a Monday. */
const WEEK = [
  { date: '2027-08-02', tasks: 2, completed: 2, minutes: 90, intensity: 1 },
  { date: '2027-08-03', tasks: 3, completed: 1, minutes: 45, intensity: 0.5 },
  { date: '2027-08-04', tasks: 1, completed: 0, minutes: 30, intensity: 0.33 },
  { date: '2027-08-05', tasks: 0, completed: 0, minutes: 0, intensity: 0 },
];

beforeEach(() => {
  setLanguage('en');
});

describe('ProgressRing', () => {
  it('renders its centre content', () => {
    renderUI(
      <ProgressRing value={0.58}>
        <Text variant="heading">58%</Text>
      </ProgressRing>,
    );
    expect(screen.getByText('58%')).toBeTruthy();
  });

  it('reports progress to assistive technology as a percentage', () => {
    renderUI(<ProgressRing value={0.58} accessibilityLabel="Physics progress" />);
    const ring = screen.getByRole('progressbar', { name: 'Physics progress' });
    expect(ring.props.accessibilityValue).toEqual({ now: 58, min: 0, max: 100 });
  });

  it('clamps values outside 0 to 1 instead of drawing past the ring', () => {
    renderUI(<ProgressRing value={1.8} accessibilityLabel="Over" />);
    expect(screen.getByRole('progressbar', { name: 'Over' }).props.accessibilityValue.now).toBe(
      100,
    );
  });

  it('treats a value that is not a number as zero', () => {
    renderUI(<ProgressRing value={Number.NaN} accessibilityLabel="Not a number" />);
    expect(
      screen.getByRole('progressbar', { name: 'Not a number' }).props.accessibilityValue.now,
    ).toBe(0);
  });
});

describe('StatTile', () => {
  it('shows a figure with its label', () => {
    renderUI(<StatTile value="6h 30m" label="Study time" />);
    expect(screen.getByText('6h 30m')).toBeTruthy();
    expect(screen.getByText('Study time')).toBeTruthy();
  });
});

describe('AnimatedNumber', () => {
  it('renders the value through its formatter on first paint', () => {
    renderUI(<AnimatedNumber value={42} format={(value) => `${value}%`} />);
    expect(screen.getByText('42%')).toBeTruthy();
  });
});

describe('ChipGroup', () => {
  it('lays its children out in a wrapping row', () => {
    renderUI(
      <ChipGroup testID="group">
        <RNText>One</RNText>
        <RNText>Two</RNText>
      </ChipGroup>,
    );
    const style = screen.getByTestId('group').props.style;
    expect(Array.isArray(style) ? style.flat() : [style]).toEqual(
      expect.arrayContaining([expect.objectContaining({ flexWrap: 'wrap' })]),
    );
  });
});

describe('JourneyProgress', () => {
  it('states both figures for assistive technology, because a tick is invisible to it', () => {
    renderUI(
      <JourneyProgress
        actual={0.42}
        expected={0.55}
        paceLabel="Expected pace"
        accessibilityLabel="42 percent done; 55 percent expected by now"
      />,
    );

    const bar = screen.getByRole('progressbar', {
      name: '42 percent done; 55 percent expected by now',
    });
    expect(bar.props.accessibilityValue).toEqual({ now: 42, min: 0, max: 100 });
    expect(screen.getByText('Expected pace')).toBeTruthy();
  });

  it('renders with an out-of-range pace without throwing', () => {
    renderUI(
      <JourneyProgress
        actual={0.2}
        expected={4}
        paceLabel="Expected pace"
        accessibilityLabel="pace"
        testID="journey"
      />,
    );
    expect(screen.getByTestId('journey')).toBeTruthy();
  });
});

describe('SubjectMark', () => {
  // The mark is hidden from assistive technology on purpose, so these queries
  // have to opt back into hidden elements to see it at all.
  const hidden = { includeHiddenElements: true } as const;

  it.each([
    ['en', 'PH'],
    ['si', 'භෞ'],
    ['ta', 'பௌ'],
  ])('shows the %s mark for a subject', (language, expected) => {
    setLanguage(language as LanguageCode);
    renderUI(<SubjectMark subjectId="physics" />);
    expect(screen.getByText(expected, hidden)).toBeTruthy();
  });

  it('is hidden from assistive technology, since the subject is named alongside it', () => {
    renderUI(<SubjectMark subjectId="chemistry" testID="mark" />);
    expect(screen.getByTestId('mark', hidden).props.accessibilityElementsHidden).toBe(true);
  });

  it('accepts a colour override, which onboarding needs before a profile exists', () => {
    renderUI(
      <SubjectMark
        subjectId="biology"
        palette={{
          fill: '#ff5d8f',
          onFill: '#050038',
          graphic: '#b44175',
          surface: '#ffeaf0',
          onSurface: '#b44175',
        }}
        testID="mark"
      />,
    );
    expect(screen.getByText('BI', hidden)).toBeTruthy();
  });

  it('keeps every mark to one line so it cannot be truncated mid-glyph', () => {
    renderUI(<SubjectMark subjectId="combined-mathematics" testID="mark" />);
    expect(screen.getByText('CM', hidden).props.numberOfLines).toBe(1);
  });
});

describe('DayCells', () => {
  it('labels each day with its own completion, not just a colour', () => {
    renderUI(<DayCells days={WEEK} today="2027-08-04" />);

    expect(screen.getByLabelText('M 2, 2/2 done')).toBeTruthy();
    expect(screen.getByLabelText('T 3, 1/3 done')).toBeTruthy();
    expect(screen.getByLabelText('W 4, 0/1 done')).toBeTruthy();
    expect(screen.getByLabelText('T 5, Nothing planned for this day.')).toBeTruthy();
  });

  it.each(['en', 'si', 'ta'])('renders a cell per day in %s', (language) => {
    setLanguage(language as LanguageCode);
    renderUI(<DayCells days={WEEK} today="2027-08-04" testID="cells" />);
    expect(screen.getByTestId('cells').children).toHaveLength(WEEK.length);
  });
});

describe('LoadBars', () => {
  it('names the workload of each day', () => {
    renderUI(<LoadBars days={WEEK} today="2027-08-02" />);

    expect(screen.getByLabelText('M, 2 tasks, 1h 30m')).toBeTruthy();
    expect(screen.getByLabelText('T, 3 tasks, 45 min')).toBeTruthy();
    // 2027-08-05 is a Thursday, so its initial repeats Tuesday's - the rest of
    // the label is what keeps the two apart.
    expect(screen.getByLabelText('T, Nothing planned for this day.')).toBeTruthy();
  });

  it.each(['en', 'si', 'ta'])('renders a bar per day in %s', (language) => {
    setLanguage(language as LanguageCode);
    renderUI(<LoadBars days={WEEK} today="2027-08-02" testID="bars" />);
    expect(screen.getByTestId('bars').children).toHaveLength(WEEK.length);
  });
});
