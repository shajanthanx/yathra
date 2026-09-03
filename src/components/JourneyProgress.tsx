/**
 * Progress against the pace the syllabus actually needs.
 *
 * The app has always computed where a student should be by now and thrown that
 * number away, showing only a status word. This puts both on one axis: the
 * fill is what is done, the tick above it is where the syllabus expects them
 * to be. That is what makes "on track" mean something.
 *
 * A tick cannot be perceived by a screen reader, so the caller passes a label
 * naming both figures, and the pace is also written out underneath.
 */
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { clamp01 } from '@/utils/date';
import { ProgressBar } from './ProgressBar';
import { Text } from './Text';

export interface JourneyProgressProps {
  /** Fraction of the syllabus completed, 0-1. */
  actual: number;
  /** Fraction the cohort's calendar expects by now, 0-1. */
  expected: number;
  /** Localized wording for the marker, e.g. "Expected pace". */
  paceLabel: string;
  /** Must name both figures — the marker alone is invisible to a screen reader. */
  accessibilityLabel: string;
  color?: string;
  style?: ViewStyle;
  testID?: string;
}

export function JourneyProgress({
  actual,
  expected,
  paceLabel,
  accessibilityLabel,
  color,
  style,
  testID,
}: JourneyProgressProps) {
  const theme = useTheme();
  const pace = clamp01(expected);

  return (
    <View style={style} testID={testID}>
      {/* The tick sits above the track rather than on it: in the light theme
          the fill and the ink colour are the same near-black, so a marker
          drawn over the bar would vanish exactly where it matters most. */}
      <View>
        <View
          style={{
            position: 'absolute',
            left: `${pace * 100}%`,
            top: -9,
            width: 2,
            height: 8,
            borderRadius: theme.radius.full,
            backgroundColor: theme.colors.charcoal,
          }}
        />
        <ProgressBar
          value={actual}
          accessibilityLabel={accessibilityLabel}
          {...(color === undefined ? {} : { color })}
        />
      </View>

      <Text variant="micro" tone="steel" style={{ marginTop: theme.spacing.xs }}>
        {paceLabel}
      </Text>
    </View>
  );
}
