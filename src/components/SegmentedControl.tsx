/**
 * Two-or-three-way pill switch (Today / This week / Later, and similar).
 * Segments wrap their text rather than truncating, so longer Sinhala and Tamil
 * labels stay readable.
 */
import { Pressable, View, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  style?: ViewStyle;
  testID?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  style,
  testID,
}: SegmentedControlProps<T>) {
  const theme = useTheme();

  return (
    <View
      accessibilityRole="tablist"
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.full,
          padding: 4,
        },
        style,
      ]}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={option.label}
            style={{
              flex: 1,
              minHeight: 40,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: theme.spacing.xs,
              paddingHorizontal: theme.spacing.xs,
              borderRadius: theme.radius.full,
              backgroundColor: selected ? theme.colors.primary : 'transparent',
            }}
          >
            <Text
              variant="bodySmMedium"
              color={selected ? theme.colors.onPrimary : theme.colors.steel}
              align="center"
              numberOfLines={2}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
