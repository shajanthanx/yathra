/**
 * The workhorse list row: 56px minimum height with a hairline underline,
 * as the design system specifies for settings and mobile lists.
 */
import type { ReactNode } from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { Text } from './Text';

export interface ListRowProps {
  title: string;
  subtitle?: string;
  value?: string;
  onPress?: () => void;
  leading?: ReactNode;
  trailing?: ReactNode;
  showChevron?: boolean;
  last?: boolean;
  destructive?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: ViewStyle;
  testID?: string;
}

export function ListRow({
  title,
  subtitle,
  value,
  onPress,
  leading,
  trailing,
  showChevron = false,
  last = false,
  destructive = false,
  accessibilityLabel,
  accessibilityHint,
  style,
  testID,
}: ListRowProps) {
  const theme = useTheme();

  const content = (
    <>
      {leading ? <View style={{ marginRight: theme.spacing.sm }}>{leading}</View> : null}
      <View style={{ flex: 1 }}>
        <Text variant="body" tone={destructive ? 'danger' : 'ink'}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="caption" tone="slate" style={{ marginTop: 2 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {value ? (
        <Text variant="bodySm" tone="slate" style={{ marginLeft: theme.spacing.sm }} numberOfLines={1}>
          {value}
        </Text>
      ) : null}
      {trailing ? <View style={{ marginLeft: theme.spacing.sm }}>{trailing}</View> : null}
      {showChevron ? (
        <Feather
          name="chevron-right"
          size={theme.sizes.iconSm}
          color={theme.colors.stone}
          style={{ marginLeft: theme.spacing.xs }}
        />
      ) : null}
    </>
  );

  const rowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: theme.sizes.listRowMinHeight,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: last ? 0 : 1,
    borderBottomColor: theme.colors.hairlineSoft,
  };

  if (!onPress) {
    return (
      <View style={[rowStyle, style]} testID={testID}>
        {content}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      {...(accessibilityHint === undefined ? {} : { accessibilityHint })}
      testID={testID}
      style={({ pressed }) => [
        rowStyle,
        pressed ? { backgroundColor: theme.colors.surface } : null,
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}
