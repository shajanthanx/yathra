/**
 * Pill-shaped selectable chip, used for subject pickers, durations and filters.
 * Selection is carried by fill and by the accessibility state, never by colour
 * on its own.
 */
import { Pressable, View, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  /** Shown as a locked chip: chosen for the student and not changeable here. */
  locked?: boolean;
  icon?: keyof typeof Feather.glyphMap;
  style?: ViewStyle;
  testID?: string;
}

export function Chip({
  label,
  selected = false,
  onPress,
  disabled = false,
  locked = false,
  icon,
  style,
  testID,
}: ChipProps) {
  const theme = useTheme();
  const inactive = disabled && !selected;

  const background = selected
    ? theme.colors.primary
    : locked
      ? theme.colors.surface
      : theme.colors.surfaceRaised;
  const foreground = selected ? theme.colors.onPrimary : inactive ? theme.colors.muted : theme.colors.ink;
  const border = selected ? theme.colors.primary : theme.colors.hairlineStrong;

  const chipStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    minHeight: 44,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.full,
    backgroundColor: background,
    borderWidth: 1,
    borderColor: inactive ? theme.colors.hairline : border,
  };

  const body = (
    <>
      {icon ? (
        <Feather name={icon} size={16} color={foreground} style={{ marginRight: theme.spacing.xxs }} />
      ) : null}
      <Text variant="bodySmMedium" color={foreground} style={{ flexShrink: 1 }}>
        {label}
      </Text>
      {locked ? (
        <Feather
          name="check"
          size={16}
          color={theme.colors.steel}
          style={{ marginLeft: theme.spacing.xxs }}
        />
      ) : null}
    </>
  );

  if (!onPress || locked) {
    return (
      <View style={[chipStyle, style]} testID={testID}>
        {body}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={label}
      testID={testID}
      style={({ pressed }) => [
        chipStyle,
        pressed && !selected ? { backgroundColor: theme.colors.surface } : null,
        style,
      ]}
    >
      {body}
    </Pressable>
  );
}
