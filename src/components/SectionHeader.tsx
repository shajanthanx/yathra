import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

export interface SectionHeaderProps {
  title: string;
  /** Small uppercase label, per the system's structural use of uppercase. */
  variant?: 'label' | 'heading';
  trailing?: ReactNode;
  style?: ViewStyle;
}

export function SectionHeader({ title, variant = 'label', trailing, style }: SectionHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.xs,
        },
        style,
      ]}
    >
      {variant === 'label' ? (
        <Text variant="microUppercase" tone="steel" uppercase accessibilityRole="header" style={{ flex: 1 }}>
          {title}
        </Text>
      ) : (
        <Text variant="heading" accessibilityRole="header" style={{ flex: 1 }}>
          {title}
        </Text>
      )}
      {trailing}
    </View>
  );
}
