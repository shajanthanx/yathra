/**
 * Bottom sheet: a modal that slides up from the bottom with a drag handle and
 * top-only corners, over a scrim. Shadow is used here because a sheet is one of
 * the few things that genuinely floats above the page.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useT, useTheme } from '@/theme/ThemeProvider';
import { IconButton } from './IconButton';
import { Text } from './Text';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  /** Pinned below the scrollable content, e.g. a primary action. */
  footer?: ReactNode;
  testID?: string;
}

export function BottomSheet({ visible, onClose, title, children, footer, testID }: BottomSheetProps) {
  const theme = useTheme();
  const t = useT();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  // Created once, on first render, and never replaced.
  const [translateY] = useState(() => new Animated.Value(1));
  const reduceMotion = useRef(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (mounted) reduceMotion.current = enabled;
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      translateY.setValue(1);
      return;
    }
    if (reduceMotion.current) {
      translateY.setValue(0);
      return;
    }
    const animation = Animated.timing(translateY, {
      toValue: 0,
      duration: theme.motion.slow,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [visible, translateY, theme.motion.slow]);

  const maxHeight = windowHeight * 0.85;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      testID={testID}
    >
      <View style={styles.container}>
        <Pressable
          style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.scrim }]}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={t('a11y.close')}
        />
        <Animated.View
          style={[
            {
              backgroundColor: theme.colors.surfaceRaised,
              borderTopLeftRadius: theme.radius.xxl,
              borderTopRightRadius: theme.radius.xxl,
              paddingBottom: insets.bottom + theme.spacing.md,
              maxHeight,
              transform: [
                {
                  translateY: translateY.interpolate({ inputRange: [0, 1], outputRange: [0, 400] }),
                },
              ],
            },
            theme.overlayShadow,
          ]}
        >
          <View style={styles.handleArea}>
            <View
              style={{
                width: 36,
                height: 4,
                borderRadius: theme.radius.full,
                backgroundColor: theme.colors.hairlineStrong,
              }}
            />
          </View>

          {title ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: theme.spacing.md,
                paddingBottom: theme.spacing.xs,
              }}
            >
              <Text variant="heading" accessibilityRole="header" style={{ flex: 1 }} numberOfLines={2}>
                {title}
              </Text>
              <IconButton icon="x" onPress={onClose} accessibilityLabel={t('a11y.close')} />
            </View>
          ) : null}

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: theme.spacing.md, paddingBottom: theme.spacing.md }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>

          {footer ? <View style={{ paddingHorizontal: theme.spacing.md }}>{footer}</View> : null}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  handleArea: { alignItems: 'center', paddingTop: 10, paddingBottom: 6 },
});
