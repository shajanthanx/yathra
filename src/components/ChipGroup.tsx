/**
 * The wrapping row that chips sit in. This layout was copied inline in nine
 * places; long Sinhala and Tamil labels make the wrap behaviour matter, so it
 * belongs in one component.
 */
import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

export interface ChipGroupProps {
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export function ChipGroup({ children, style, testID }: ChipGroupProps) {
  const theme = useTheme();

  return (
    <View
      style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.xs }, style]}
      testID={testID}
    >
      {children}
    </View>
  );
}
