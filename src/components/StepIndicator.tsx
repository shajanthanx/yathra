/**
 * Onboarding progress. A filled track rather than dots: it reads as distance
 * covered, and it scales to any number of steps without crowding.
 */
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

export interface StepIndicatorProps {
  /** One-based current step. */
  step: number;
  total: number;
  accessibilityLabel: string;
  style?: ViewStyle;
  testID?: string;
}

export function StepIndicator({
  step,
  total,
  accessibilityLabel,
  style,
  testID,
}: StepIndicatorProps) {
  const theme = useTheme();

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      accessibilityValue={{ now: step, min: 0, max: total }}
      style={[{ flexDirection: 'row', gap: theme.spacing.xxs, alignItems: 'center' }, style]}
      testID={testID}
    >
      {Array.from({ length: total }, (_, index) => (
        <View
          key={index}
          style={{
            width: index + 1 === step ? 24 : 12,
            height: 4,
            borderRadius: theme.radius.full,
            backgroundColor:
              index + 1 <= step ? theme.colors.primary : theme.colors.hairlineStrong,
          }}
        />
      ))}
    </View>
  );
}
