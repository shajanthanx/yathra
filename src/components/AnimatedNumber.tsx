/**
 * A figure that moves to its new value rather than jumping.
 *
 * React Native cannot animate text content, so this steps the number through
 * a short interval instead of driving an Animated.Value. That is a handful of
 * re-renders of a single Text, which is cheap, behaves identically on web, and
 * collapses to one step when reduced motion is on.
 */
import { useEffect, useRef, useState } from 'react';
import { useReduceMotion } from '@/hooks/useReduceMotion';
import { useTheme } from '@/theme/ThemeProvider';
import { Text, type TextTone } from './Text';
import type { TypographyVariant } from '@/theme/tokens';

const STEPS = 12;

export interface AnimatedNumberProps {
  /** The figure to show. Rendered through `format` so units stay localized. */
  value: number;
  format: (value: number) => string;
  variant?: TypographyVariant;
  tone?: TextTone;
  accessibilityLabel?: string;
  testID?: string;
}

export function AnimatedNumber({
  value,
  format,
  variant = 'display',
  tone = 'ink',
  accessibilityLabel,
  testID,
}: AnimatedNumberProps) {
  const theme = useTheme();
  const reduceMotion = useReduceMotion();
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const start = from.current;
    if (start === value) return;
    from.current = value;

    const steps = reduceMotion ? 1 : STEPS;
    let step = 0;

    const id = setInterval(
      () => {
        step += 1;
        setShown(Math.round(start + ((value - start) * step) / steps));
        if (step >= steps) clearInterval(id);
      },
      Math.max(16, Math.round(theme.motion.slow / steps)),
    );

    return () => clearInterval(id);
  }, [value, reduceMotion, theme.motion.slow]);

  return (
    <Text
      variant={variant}
      tone={tone}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {format(shown)}
    </Text>
  );
}
