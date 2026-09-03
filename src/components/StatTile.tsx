/**
 * One figure with its label. Replaces three separate hand-rolled copies that
 * had drifted apart in past papers and the weekly review.
 */
import { View, type ViewStyle } from 'react-native';
import { Text, type TextTone } from './Text';
import type { TypographyVariant } from '@/theme/tokens';

export interface StatTileProps {
  value: string;
  label: string;
  /** Type step for the figure. Defaults to the mid-tier `stat`. */
  variant?: TypographyVariant;
  tone?: TextTone;
  accessibilityLabel?: string;
  style?: ViewStyle;
  testID?: string;
}

export function StatTile({
  value,
  label,
  variant = 'stat',
  tone = 'ink',
  accessibilityLabel,
  style,
  testID,
}: StatTileProps) {
  return (
    <View style={style} accessibilityLabel={accessibilityLabel} testID={testID}>
      <Text variant={variant} tone={tone}>
        {value}
      </Text>
      <Text variant="caption" tone="steel">
        {label}
      </Text>
    </View>
  );
}
