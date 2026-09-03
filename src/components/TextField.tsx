/**
 * Text input with a label above and helper or error text below. An error is
 * shown as a message as well as a border colour, never colour alone.
 */
import { forwardRef } from 'react';
import { TextInput, View, type TextInputProps, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

export interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helper?: string;
  containerStyle?: ViewStyle;
  multiline?: boolean;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { label, error, helper, containerStyle, multiline, ...rest },
  ref,
) {
  const theme = useTheme();
  const hasError = Boolean(error);

  return (
    <View style={containerStyle}>
      {label ? (
        <Text variant="bodySmMedium" style={{ marginBottom: theme.spacing.xxs }}>
          {label}
        </Text>
      ) : null}
      <TextInput
        ref={ref}
        placeholderTextColor={theme.colors.muted}
        accessibilityLabel={label}
        {...(hasError ? { 'aria-invalid': true } : null)}
        multiline={multiline}
        style={{
          minHeight: multiline ? 88 : theme.sizes.inputHeight,
          borderRadius: theme.radius.md,
          borderWidth: hasError ? 2 : 1,
          borderColor: hasError ? theme.colors.danger : theme.colors.hairlineStrong,
          backgroundColor: theme.colors.surfaceRaised,
          color: theme.colors.ink,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          textAlignVertical: multiline ? 'top' : 'center',
          ...theme.typography.body,
        }}
        {...rest}
      />
      {error ? (
        <Text variant="caption" tone="danger" style={{ marginTop: theme.spacing.xxs }}>
          {error}
        </Text>
      ) : helper ? (
        <Text variant="caption" tone="stone" style={{ marginTop: theme.spacing.xxs }}>
          {helper}
        </Text>
      ) : null}
    </View>
  );
});
