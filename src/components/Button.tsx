/**
 * Buttons. The pill is the design system's shape signature, so every variant
 * uses the full radius; only the fill changes.
 */
import { ActivityIndicator, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'inverse';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  /** Full width is the default for the main action on a mobile screen. */
  fullWidth?: boolean;
  icon?: keyof typeof Feather.glyphMap;
  size?: 'md' | 'sm';
  style?: ViewStyle;
  accessibilityHint?: string;
  testID?: string;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = true,
  icon,
  size = 'md',
  style,
  accessibilityHint,
  testID,
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  const palette = {
    primary: { bg: theme.colors.primary, pressedBg: theme.colors.primaryPressed, fg: theme.colors.onPrimary, border: 'transparent' },
    secondary: { bg: 'transparent', pressedBg: theme.colors.surface, fg: theme.colors.ink, border: theme.colors.hairlineStrong },
    ghost: { bg: 'transparent', pressedBg: theme.colors.surface, fg: theme.colors.ink, border: 'transparent' },
    danger: { bg: theme.colors.danger, pressedBg: theme.colors.danger, fg: '#ffffff', border: 'transparent' },
    inverse: { bg: theme.colors.onSurfaceInverse, pressedBg: theme.colors.onSurfaceInverse, fg: theme.colors.surfaceInverse, border: 'transparent' },
  }[variant];

  const height = size === 'sm' ? theme.sizes.buttonHeightSm : theme.sizes.buttonHeight;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      {...(accessibilityHint === undefined ? {} : { accessibilityHint })}
      testID={testID}
      style={({ pressed }) => [
        styles.base,
        {
          height,
          minHeight: height,
          borderRadius: theme.radius.full,
          paddingHorizontal: size === 'sm' ? theme.spacing.md : theme.spacing.xl,
          backgroundColor: isDisabled && variant === 'primary' ? theme.colors.hairline : pressed ? palette.pressedBg : palette.bg,
          borderColor: palette.border,
          borderWidth: variant === 'secondary' ? 1 : 0,
          opacity: isDisabled && variant !== 'primary' ? 0.5 : 1,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.fg} size="small" />
      ) : (
        <View style={styles.content}>
          {icon ? (
            <Feather
              name={icon}
              size={theme.sizes.iconSm}
              color={isDisabled && variant === 'primary' ? theme.colors.muted : palette.fg}
              style={{ marginRight: theme.spacing.xs }}
            />
          ) : null}
          <Text
            variant={size === 'sm' ? 'button' : 'buttonLg'}
            color={isDisabled && variant === 'primary' ? theme.colors.muted : palette.fg}
            numberOfLines={2}
            align="center"
            style={styles.label}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1,
  },
  label: {
    flexShrink: 1,
  },
});
