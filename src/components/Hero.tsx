/**
 * The gradient band at the top of Home.
 *
 * The design system does not define gradients, so this is a deliberate,
 * single-purpose extension: one expressive surface on one screen, with
 * everything below it staying in the flat hairline system.
 *
 * It is built in layers, each with one job:
 *
 *   1. a solid base in the gradient's darkest colour, so a rounding gap or a
 *      letterboxed edge is never a bright seam;
 *   2. the sky illustration, cropped to fill;
 *   3. the gradient, which doubles as the scrim that holds the text legible —
 *      the design system's answer for type over media — so the illustration
 *      reads as atmosphere rather than competing with the countdown.
 *
 * Three details are load-bearing:
 *
 * - The gradient runs top-to-bottom. On web expo-linear-gradient becomes a CSS
 *   `linear-gradient` whose angle is derived from the measured size, so a
 *   diagonal would shift once layout lands; a vertical one is correct on the
 *   first paint and therefore identical in the screenshot harness.
 * - The rounded bottom is a clipping wrapper with the layers filling it, not a
 *   border radius on the gradient view itself, which Android paints through.
 * - The top inset is floored. Desktop Chrome reports a zero safe-area inset,
 *   so an unfloored hero would be ~47px shorter in every captured screenshot
 *   than on a phone, and any device reporting no inset would crowd the text
 *   against the top of the display.
 *
 * Nothing here animates on mount. The screen's one orchestrated moment is the
 * progress filling; a hero that faded in would also be a hero that renders
 * blank if that animation ever failed to run.
 */
import type { ReactNode } from 'react';
import { Image, StyleSheet, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme/ThemeProvider';

/** How far the hero colour extends above itself, to cover an iOS overscroll. */
const OVERSCROLL_CAP = 600;

/**
 * Rasterised from `assets/sky.svg` by `devtools/sky.js`. The SVG itself cannot
 * be rendered on the device: most of its radial gradients inherit their stops
 * through `xlink:href`, which react-native-svg does not support, and it relies
 * on Gaussian blur filters.
 */
const SKY = require('../../assets/sky.png') as number;

export interface HeroProps {
  children: ReactNode;
  /** A raised card at the foot of the hero. */
  inset?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export function Hero({ children, inset, style, testID }: HeroProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={style}>
      {/* Pulling down past the top of the list would otherwise reveal the
          canvas above a dark hero. This sits in the scrolled content, so it
          is what gets exposed instead. */}
      <View
        style={{
          position: 'absolute',
          top: -OVERSCROLL_CAP,
          left: 0,
          right: 0,
          height: OVERSCROLL_CAP,
          backgroundColor: theme.colors.heroFrom,
        }}
      />

      <View
        style={{
          borderBottomLeftRadius: theme.radius.panel,
          borderBottomRightRadius: theme.radius.panel,
          overflow: 'hidden',
          backgroundColor: theme.colors.heroFrom,
        }}
        testID={testID}
      >
        <Image
          source={SKY}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
          accessible={false}
          // Decorative: it carries no information the text does not.
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        />

        <LinearGradient
          colors={[theme.colors.heroScrimFrom, theme.colors.heroScrimTo]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          // The inset card covers the foot of the hero, so a gradient that
          // finished at the very bottom would only ever show its darkest end
          // and read as a flat block. Complete it where the card begins.
          locations={[0, 0.62]}
          style={StyleSheet.absoluteFill}
        />

        <View
          style={{
            paddingTop: Math.max(insets.top, theme.spacing.xxl) + theme.spacing.md,
            paddingHorizontal: theme.spacing.md,
            paddingBottom: theme.spacing.lg,
          }}
        >
          {children}

          {inset ? (
            <View
              style={{
                marginTop: theme.spacing.lg,
                padding: theme.spacing.md,
                borderRadius: theme.radius.xl,
                backgroundColor: theme.colors.surfaceRaised,
                ...theme.elevation.level2,
              }}
            >
              {inset}
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
