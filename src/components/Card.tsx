/**
 * Flat, hairline-bordered containers. The design system separates with borders
 * and reserves shadow for things that genuinely float, so no Card casts one.
 */
import type { ReactNode } from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { tintPair, type TintKey } from '@/theme/tokens';

export interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  padded?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
  testID?: string;
}

export function Card({ children, onPress, padded = true, style, accessibilityLabel, testID }: CardProps) {
  const theme = useTheme();

  const base: ViewStyle = {
    backgroundColor: theme.colors.surfaceRaised,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.hairlineSoft,
    padding: padded ? theme.spacing.md : 0,
  };

  if (!onPress) {
    return (
      <View style={[base, style]} testID={testID}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      {...(accessibilityLabel === undefined ? {} : { accessibilityLabel })}
      testID={testID}
      style={({ pressed }) => [base, pressed ? { backgroundColor: theme.colors.surface } : null, style]}
    >
      {children}
    </Pressable>
  );
}

export interface TintPanelProps {
  children: ReactNode;
  tint: TintKey;
  style?: ViewStyle;
  testID?: string;
}

/**
 * The system's accent container. Its paired foreground colour is returned by
 * `useTintForeground` so text on it never has to guess a colour.
 */
export function TintPanel({ children, tint, style, testID }: TintPanelProps) {
  const theme = useTheme();
  const { background } = tintPair(theme.colors, tint);

  return (
    <View
      testID={testID}
      style={[
        {
          backgroundColor: background,
          borderRadius: theme.radius.xxxl,
          padding: theme.spacing.lg,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function useTintForeground(tint: TintKey): string {
  const theme = useTheme();
  return tintPair(theme.colors, tint).foreground;
}
