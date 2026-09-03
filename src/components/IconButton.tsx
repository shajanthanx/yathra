import { Pressable, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';

export interface IconButtonProps {
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  /** Required: an icon-only control must still announce what it does. */
  accessibilityLabel: string;
  variant?: 'plain' | 'outlined';
  tone?: 'ink' | 'steel' | 'danger';
  style?: ViewStyle;
  testID?: string;
}

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  variant = 'plain',
  tone = 'ink',
  style,
  testID,
}: IconButtonProps) {
  const theme = useTheme();
  const color = theme.colors[tone];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      hitSlop={8}
      style={({ pressed }) => [
        {
          width: theme.sizes.iconButton,
          height: theme.sizes.iconButton,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme.radius.full,
          backgroundColor: pressed ? theme.colors.surface : variant === 'outlined' ? theme.colors.canvas : 'transparent',
          borderWidth: variant === 'outlined' ? 1 : 0,
          borderColor: theme.colors.hairline,
        },
        style,
      ]}
    >
      <Feather name={icon} size={theme.sizes.icon} color={color} />
    </Pressable>
  );
}
