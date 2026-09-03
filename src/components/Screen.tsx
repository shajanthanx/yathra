/**
 * Screen shell: canvas background, safe-area insets and the standard 16px
 * horizontal padding the design system specifies for mobile.
 */
import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';

export interface ScreenProps {
  children: ReactNode;
  /** Wraps content in a ScrollView (the default). */
  scroll?: boolean;
  /** Removes the standard horizontal padding, for full-bleed lists. */
  edgeToEdge?: boolean;
  /** Extra bottom space so content clears the tab bar or a pinned button. */
  bottomInset?: number;
  contentStyle?: ViewStyle;
  /** Adds top safe-area padding; screens with an AppBar handle it there. */
  topSafeArea?: boolean;
  testID?: string;
}

export function Screen({
  children,
  scroll = true,
  edgeToEdge = false,
  bottomInset = 0,
  contentStyle,
  topSafeArea = false,
  testID,
}: ScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const padding: ViewStyle = {
    paddingHorizontal: edgeToEdge ? 0 : theme.spacing.md,
    paddingBottom: insets.bottom + bottomInset + theme.spacing.lg,
    ...(topSafeArea ? { paddingTop: insets.top } : null),
  };

  const background = { backgroundColor: theme.colors.canvas };

  if (!scroll) {
    return (
      <View style={[styles.flex, background]} testID={testID}>
        <View style={[styles.flex, padding, contentStyle]}>{children}</View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, background]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      testID={testID}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[padding, contentStyle]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export { RefreshControl };

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
