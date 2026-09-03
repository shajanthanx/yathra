/**
 * 56px mobile app bar: optional back action, title, optional trailing action.
 */
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useT } from '@/theme/ThemeProvider';
import { IconButton } from './IconButton';
import { Text } from './Text';

export interface AppBarProps {
  title?: string;
  onBack?: () => void;
  onClose?: () => void;
  trailing?: ReactNode;
  /** Hides the bottom hairline where the screen below supplies its own edge. */
  borderless?: boolean;
}

export function AppBar({ title, onBack, onClose, trailing, borderless = false }: AppBarProps) {
  const theme = useTheme();
  const t = useT();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: theme.colors.canvas,
        borderBottomWidth: borderless ? 0 : 1,
        borderBottomColor: theme.colors.hairlineSoft,
      }}
    >
      <View
        style={{
          height: theme.sizes.appBarHeight,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.xs,
        }}
      >
        {onBack ? (
          <IconButton icon="arrow-left" onPress={onBack} accessibilityLabel={t('a11y.back')} />
        ) : onClose ? (
          <IconButton icon="x" onPress={onClose} accessibilityLabel={t('a11y.close')} />
        ) : (
          <View style={{ width: theme.spacing.xs }} />
        )}

        <View style={{ flex: 1, paddingHorizontal: theme.spacing.xs }}>
          {title ? (
            <Text variant="subheading" numberOfLines={1} accessibilityRole="header">
              {title}
            </Text>
          ) : null}
        </View>

        {trailing ?? <View style={{ width: theme.sizes.iconButton }} />}
      </View>
    </View>
  );
}
