/**
 * Circular progress. Used where a percentage has to read at a glance in a
 * small space: subject cards, the study timer, the weekly review.
 *
 * The sweep is driven from state fed by an Animated.Value listener rather than
 * by `Animated.createAnimatedComponent`. The wrapper works, but on web it
 * forces `collapsable={false}` onto the wrapped component, and
 * react-native-svg spreads unknown props straight onto the DOM node — so every
 * render logged a React DOM error about a non-boolean attribute. Listening to
 * the value costs one re-render of this component per frame while it animates,
 * which is the same thing react-native-web does internally anyway, and it
 * behaves identically on both platforms.
 *
 * The state starts at the real progress rather than at zero, so a platform
 * that cannot run the animation still draws the correct ring instead of an
 * empty one.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, Easing, View, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useReduceMotion } from '@/hooks/useReduceMotion';
import { useTheme } from '@/theme/ThemeProvider';
import { clamp01 } from '@/utils/date';

export interface ProgressRingProps {
  /** Progress as a fraction in [0, 1]. */
  value: number;
  size?: number;
  thickness?: number;
  color?: string;
  /**
   * Defaults to hairlineStrong. A thin arc needs a track that stays visible
   * against a raised card, and hairlineSoft does not in the dark theme -- at
   * zero progress the ring disappeared entirely.
   */
  trackColor?: string;
  /** Centre content — usually a percentage. */
  children?: ReactNode;
  accessibilityLabel?: string;
  style?: ViewStyle;
  testID?: string;
}

export function ProgressRing({
  value,
  size,
  thickness,
  color,
  trackColor,
  children,
  accessibilityLabel,
  style,
  testID,
}: ProgressRingProps) {
  const theme = useTheme();
  const reduceMotion = useReduceMotion();

  const diameter = size ?? theme.sizes.ring;
  const stroke = thickness ?? theme.sizes.ringThickness;
  const radius = (diameter - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const target = clamp01(value);

  const [progress] = useState(() => new Animated.Value(target));
  const [swept, setSwept] = useState(target);
  const lastValue = useRef(target);

  useEffect(() => {
    const id = progress.addListener((state) => setSwept(state.value));
    return () => progress.removeListener(id);
  }, [progress]);

  useEffect(() => {
    if (lastValue.current === target) return;
    lastValue.current = target;

    if (reduceMotion) {
      progress.setValue(target);
      return;
    }

    const animation = Animated.timing(progress, {
      toValue: target,
      duration: theme.motion.slow,
      easing: Easing.bezier(...theme.easing.standard),
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [target, reduceMotion, progress, theme.motion.slow, theme.easing.standard]);

  const drawn = reduceMotion ? target : clamp01(swept);

  return (
    <View
      style={[
        { width: diameter, height: diameter, alignItems: 'center', justifyContent: 'center' },
        style,
      ]}
      accessible={accessibilityLabel !== undefined}
      {...(accessibilityLabel === undefined ? {} : { accessibilityLabel })}
      accessibilityRole="progressbar"
      accessibilityValue={{ now: Math.round(target * 100), min: 0, max: 100 }}
      testID={testID}
    >
      {/* The sweep starts at twelve o'clock. Rotating the whole square canvas
          with an ordinary style transform keeps it off the circle's own props:
          `rotation`/`origin` become a `transform-origin` DOM attribute on web,
          which React rejects. The track is a full circle, so rotating it has
          no visible effect. */}
      <Svg
        width={diameter}
        height={diameter}
        style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}
      >
        <Circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          stroke={trackColor ?? theme.colors.hairlineStrong}
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          stroke={color ?? theme.colors.primary}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - drawn)}
        />
      </Svg>
      {children}
    </View>
  );
}
