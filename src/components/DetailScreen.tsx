/**
 * The shell every non-tab screen uses: a canvas-filled frame, an app bar and a
 * Screen body. This was written out by hand in thirteen places, which is why
 * the app bars had begun to drift apart.
 */
import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { AppBar } from './AppBar';
import { Screen } from './Screen';

export interface DetailScreenProps {
  title?: string;
  onBack?: () => void;
  onClose?: () => void;
  trailing?: ReactNode;
  borderless?: boolean;
  children: ReactNode;
  scroll?: boolean;
  edgeToEdge?: boolean;
  bottomInset?: number;
  contentStyle?: ViewStyle;
  /** Sheets and dialogs, rendered as siblings of the scrolling body. */
  overlay?: ReactNode;
  testID?: string;
}

export function DetailScreen({
  title,
  onBack,
  onClose,
  trailing,
  borderless,
  children,
  scroll,
  edgeToEdge,
  bottomInset,
  contentStyle,
  overlay,
  testID,
}: DetailScreenProps) {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.canvas }}>
      <AppBar
        {...(title === undefined ? {} : { title })}
        {...(onBack === undefined ? {} : { onBack })}
        {...(onClose === undefined ? {} : { onClose })}
        {...(trailing === undefined ? {} : { trailing })}
        {...(borderless === undefined ? {} : { borderless })}
      />
      <Screen
        {...(scroll === undefined ? {} : { scroll })}
        {...(edgeToEdge === undefined ? {} : { edgeToEdge })}
        {...(bottomInset === undefined ? {} : { bottomInset })}
        {...(contentStyle === undefined ? {} : { contentStyle })}
        {...(testID === undefined ? {} : { testID })}
      >
        {children}
      </Screen>
      {overlay}
    </View>
  );
}
