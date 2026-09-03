/**
 * A selectable card — the shape onboarding and the profile sheets use to pick
 * one thing from a short list. Selection is carried by a check mark as well as
 * by the border, so it never depends on colour alone.
 */
import { Pressable, View, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

export interface OptionCardProps {
  title: string;
  subtitle?: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function OptionCard({ title, subtitle, selected, onPress, style, testID }: OptionCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.sm,
          minHeight: theme.sizes.touchTarget,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.md,
          borderRadius: theme.radius.xl,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? theme.colors.primary : theme.colors.hairline,
          backgroundColor: pressed ? theme.colors.surface : theme.colors.surfaceRaised,
        },
        style,
      ]}
      testID={testID}
    >
      <View style={{ flex: 1 }}>
        <Text variant="subheading">{title}</Text>
        {subtitle ? (
          <Text variant="caption" tone="slate" style={{ marginTop: 2 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: theme.radius.full,
          borderWidth: selected ? 0 : 2,
          borderColor: theme.colors.hairlineStrong,
          backgroundColor: selected ? theme.colors.primary : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected ? <Feather name="check" size={16} color={theme.colors.onPrimary} /> : null}
      </View>
    </Pressable>
  );
}
