/**
 * Progress bar. The fill animates so a change reads as movement, and it holds
 * its end state when the device asks for reduced motion.
 */
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, View, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

export interface ProgressBarProps {
  /** 0–1. */
  value: number;
  color?: string;
  trackColor?: string;
  height?: number;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export function ProgressBar({
  value,
  color,
  trackColor,
  height,
  style,
  accessibilityLabel,
}: ProgressBarProps) {
  const theme = useTheme();
  const clamped = Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
  // Created once, on first render, and never replaced.
  const [animated] = useState(() => new Animated.Value(clamped));
  // The bar starts at its real value, so only a later change is animated.
  const lastValue = useRef(clamped);
  const reduceMotion = useRef(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (mounted) reduceMotion.current = enabled;
      })
      .catch(() => {
        // Not available on every platform; the default (animate) is fine.
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (lastValue.current === clamped) return;
    lastValue.current = clamped;

    if (reduceMotion.current) {
      animated.setValue(clamped);
      return;
    }
    const animation = Animated.timing(animated, {
      toValue: clamped,
      duration: theme.motion.base,
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [animated, clamped, theme.motion.base]);

  const barHeight = height ?? theme.sizes.progressBar;

  return (
    <View
      accessible={accessibilityLabel !== undefined}
      {...(accessibilityLabel === undefined ? {} : { accessibilityLabel })}
      accessibilityRole="progressbar"
      accessibilityValue={{ now: Math.round(clamped * 100), min: 0, max: 100 }}
      style={[
        {
          height: barHeight,
          borderRadius: theme.radius.full,
          backgroundColor: trackColor ?? theme.colors.hairlineSoft,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          height: '100%',
          borderRadius: theme.radius.full,
          backgroundColor: color ?? theme.colors.primary,
          width: animated.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
        }}
      />
    </View>
  );
}
