/**
 * Design tokens ported from design-guidelines.md (the project's design system).
 * Components must reference these tokens, never raw values, so the light and
 * dark themes stay in sync.
 */
import type { TextStyle } from 'react-native';

export const lightColors = {
  primary: '#1c1c1e',
  primaryPressed: '#2c2c34',
  onPrimary: '#ffffff',
  accent: '#ffd02f',
  accentDeep: '#fcb900',
  accentSoft: '#fff4c4',
  accentOnSoft: '#746019',
  link: '#4262ff',
  linkPressed: '#2a41b6',
  focusRing: '#4262ff',
  tintAmber: '#fff8e0',
  tintAmberOn: '#746019',
  tintCoral: '#ffc6c6',
  tintCoralOn: '#600000',
  tintRose: '#fde0f0',
  tintRoseOn: '#050038',
  tintTeal: '#c3faf5',
  tintTealOn: '#187574',
  tintOrange: '#ffe6cd',
  tintOrangeOn: '#050038',
  tintViolet: '#f5f3ff',
  tintVioletOn: '#4262ff',
  accentCoral: '#ff9999',
  accentTeal: '#0fbcb0',
  canvas: '#ffffff',
  surface: '#f7f8fa',
  surfaceSoft: '#fafbfc',
  surfaceRaised: '#ffffff',
  surfaceEmphasis: '#f5f3ff',
  surfaceInverse: '#1c1c1e',
  onSurfaceInverse: '#ffffff',
  onSurfaceInverseMuted: '#a5a8b5',
  scrim: 'rgba(5, 0, 56, 0.55)',
  hairline: '#e0e2e8',
  hairlineSoft: '#eef0f3',
  hairlineStrong: '#c7cad5',
  inkDeep: '#050038',
  ink: '#1c1c1e',
  charcoal: '#2c2c34',
  slate: '#555a6a',
  steel: '#6b6f7e',
  stone: '#8e91a0',
  muted: '#a5a8b5',
  success: '#00b473',
  successSoft: '#d9f5e9',
  warning: '#fcb900',
  warningSoft: '#fff4c4',
  danger: '#d13c3c',
  dangerSoft: '#fbd4d4',
  dangerBorder: '#e3c5c5',
  info: '#4262ff',
  infoSoft: '#f5f3ff',
  /**
   * Hero band. The design system does not define gradients at all, so this is
   * a deliberate extension confined to a single role, carrying a light and a
   * dark value as the iteration guide requires. Light interpolates inkDeep
   * toward link; dark runs the dark infoSoft down toward the canvas.
   */
  heroFrom: '#050038',
  heroTo: '#3b3f8f',
  /**
   * The hero gradient is drawn over the sky illustration, so it doubles as the
   * scrim that holds the text legible - which is what the design system asks
   * for over media, rather than a shadow. The alpha is what keeps contrast
   * predictable: it is high enough that the composite stays close to the
   * opaque gradient, and the illustration reads as atmosphere through it.
   */
  heroScrimFrom: 'rgba(5, 0, 56, 0.82)',
  heroScrimTo: 'rgba(59, 63, 143, 0.62)',
  /**
   * The hero is dark in both themes, so onSurfaceInverse - which flips to dark
   * ink - cannot be used on it.
   *
   * Both are measured against the composited pixels of the sky illustration
   * under the scrim, not against a flat colour, by devtools/contrast.js over
   * the region of the artwork that actually sits behind the hero's text. Worst
   * case in the light theme: onHero 6.05:1, onHeroMuted 4.75:1; in the dark
   * theme 9.70:1 and 7.62:1. onHeroMuted is deliberately lighter than a
   * typical muted tone - it was the binding constraint on how far the scrim
   * could be lowered, and therefore on whether the illustration was visible at
   * all.
   */
  onHero: '#ffffff',
  onHeroMuted: '#e2e4e9',
} as const;

export type ColorTokens = { [K in keyof typeof lightColors]: string };

export const darkColors: ColorTokens = {
  primary: '#ffffff',
  primaryPressed: '#e2e4e9',
  onPrimary: '#16161a',
  accent: '#ffd02f',
  accentDeep: '#fcb900',
  accentSoft: '#3b3008',
  accentOnSoft: '#ffe08a',
  link: '#6d84ff',
  linkPressed: '#4262ff',
  focusRing: '#6d84ff',
  tintAmber: '#382c07',
  tintAmberOn: '#ffe08a',
  tintCoral: '#4a2020',
  tintCoralOn: '#ffc6c6',
  tintRose: '#3d2536',
  tintRoseOn: '#fde0f0',
  tintTeal: '#10403d',
  tintTealOn: '#7fe9e0',
  tintOrange: '#402d18',
  tintOrangeOn: '#ffe6cd',
  tintViolet: '#1e2140',
  tintVioletOn: '#a9b6ff',
  accentCoral: '#ff9999',
  accentTeal: '#0fbcb0',
  canvas: '#121214',
  surface: '#1a1a1e',
  surfaceSoft: '#17171b',
  surfaceRaised: '#24242b',
  surfaceEmphasis: '#221f33',
  surfaceInverse: '#f4f5f7',
  onSurfaceInverse: '#16161a',
  onSurfaceInverseMuted: '#5c6070',
  scrim: 'rgba(0, 0, 0, 0.65)',
  hairline: '#2c2d34',
  hairlineSoft: '#23242a',
  hairlineStrong: '#414350',
  inkDeep: '#ffffff',
  ink: '#f4f5f7',
  charcoal: '#e2e4e9',
  slate: '#b3b7c2',
  steel: '#9296a3',
  stone: '#787c8a',
  muted: '#5c6070',
  success: '#2fd08a',
  successSoft: '#10321f',
  warning: '#ffd02f',
  warningSoft: '#382c07',
  danger: '#ff8a8a',
  dangerSoft: '#3a1c1c',
  dangerBorder: '#5a2a2a',
  info: '#6d84ff',
  infoSoft: '#1e2140',
  heroFrom: '#1e2140',
  heroTo: '#141428',
  heroScrimFrom: 'rgba(30, 33, 64, 0.80)',
  heroScrimTo: 'rgba(20, 20, 40, 0.58)',
  onHero: '#ffffff',
  onHeroMuted: '#e2e4e9',
};

export type TintKey = 'amber' | 'teal' | 'coral' | 'rose' | 'orange' | 'violet';

/** Background + paired foreground for a tint panel or chip. Always use the pair. */
export function tintPair(colors: ColorTokens, tint: TintKey): { background: string; foreground: string } {
  switch (tint) {
    case 'amber':
      return { background: colors.tintAmber, foreground: colors.tintAmberOn };
    case 'teal':
      return { background: colors.tintTeal, foreground: colors.tintTealOn };
    case 'coral':
      return { background: colors.tintCoral, foreground: colors.tintCoralOn };
    case 'rose':
      return { background: colors.tintRose, foreground: colors.tintRoseOn };
    case 'orange':
      return { background: colors.tintOrange, foreground: colors.tintOrangeOn };
    case 'violet':
      return { background: colors.tintViolet, foreground: colors.tintVioletOn };
  }
}

/** Order in which tints are handed to a student's selected subjects. */
export const SUBJECT_TINT_ORDER: readonly TintKey[] = ['violet', 'teal', 'coral', 'amber', 'orange', 'rose'];

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  section: 48,
} as const;

export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  xxxl: 28,
  panel: 32,
  full: 9999,
} as const;

export const motion = {
  fast: 120,
  base: 180,
  slow: 260,
} as const;

/**
 * The design system's easing curves, as control points for Easing.bezier.
 * Standard for state changes, enter for things arriving, exit for leaving.
 */
export const easing = {
  standard: [0.2, 0, 0, 1],
  enter: [0, 0, 0.2, 1],
  exit: [0.4, 0, 1, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

/** Minimum sizes from the design system's touch-target rules (Android: 48). */
export const sizes = {
  touchTarget: 48,
  buttonHeight: 48,
  buttonHeightSm: 40,
  inputHeight: 48,
  listRowMinHeight: 56,
  appBarHeight: 56,
  /**
   * The design system's 56px bar assumes one line of a Latin label under the
   * icon. This bar carries an active indicator above the icon and allows the
   * label two lines, because "Progress" in Tamil does not fit one line of a
   * fifth of a phone's width and was being truncated.
   */
  tabBarHeight: 86,
  iconButton: 44,
  icon: 24,
  iconSm: 20,
  progressBar: 8,
  progressBarThin: 6,
  ring: 96,
  ringSm: 64,
  ringThickness: 8,
} as const;

/**
 * Mobile type scale. The design system's scale is compressed for phone
 * screens: the 64px step is reserved for the Home hero countdown and the
 * study timer, and the 48px step for a screen's single headline stat.
 * Weights are limited to 400 / 500 / 600 as the system prescribes.
 *
 * Leading is a little more generous than the system's 1.5 body ratio. Sinhala
 * and Tamil stack vowel signs above and below the base glyph, and a line box
 * sized for Latin text clips them; the extra headroom costs a few pixels and
 * keeps all three languages legible in the same layout.
 */
export const typography = {
  heroStat: { fontSize: 64, fontWeight: '500', lineHeight: 76, letterSpacing: -1.5 },
  display: { fontSize: 48, fontWeight: '500', lineHeight: 62, letterSpacing: -1 },
  stat: { fontSize: 36, fontWeight: '500', lineHeight: 48, letterSpacing: -0.5 },
  title: { fontSize: 28, fontWeight: '500', lineHeight: 40 },
  heading: { fontSize: 22, fontWeight: '500', lineHeight: 32 },
  subheading: { fontSize: 18, fontWeight: '500', lineHeight: 28 },
  subtitle: { fontSize: 18, fontWeight: '400', lineHeight: 28 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 26 },
  bodyMedium: { fontSize: 16, fontWeight: '500', lineHeight: 26 },
  bodySm: { fontSize: 14, fontWeight: '400', lineHeight: 23 },
  bodySmMedium: { fontSize: 14, fontWeight: '500', lineHeight: 23 },
  caption: { fontSize: 13, fontWeight: '400', lineHeight: 21 },
  captionBold: { fontSize: 13, fontWeight: '600', lineHeight: 21 },
  micro: { fontSize: 12, fontWeight: '500', lineHeight: 19 },
  microUppercase: { fontSize: 11, fontWeight: '600', lineHeight: 18, letterSpacing: 0.5 },
  button: { fontSize: 14, fontWeight: '500', lineHeight: 22 },
  buttonLg: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;

/**
 * Shadow for the few things that genuinely float (sheets, dialogs).
 *
 * Expressed as `boxShadow` rather than the `shadow*` family: React Native
 * supports it on both platforms under the New Architecture, and
 * react-native-web deprecated the older props, which logged on every render.
 * It also replaces Android's `elevation`, so a shadow is described once
 * instead of twice.
 */
export const overlayShadow = {
  light: {
    boxShadow: [{ offsetX: 0, offsetY: 16, blurRadius: 24, color: 'rgba(5, 0, 56, 0.12)' }],
  },
  dark: {
    boxShadow: [{ offsetX: 0, offsetY: 16, blurRadius: 24, color: 'rgba(0, 0, 0, 0.56)' }],
  },
} as const;

/**
 * The design system's lower elevation levels. Level 2 is what it specifies for
 * mobile cards and detached surfaces; level 1 is for a tile that lifts on
 * press. Anything that genuinely floats uses overlayShadow instead.
 */
export const elevation = {
  light: {
    level1: { boxShadow: [{ offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(5, 0, 56, 0.04)' }] },
    level2: { boxShadow: [{ offsetX: 0, offsetY: 4, blurRadius: 12, color: 'rgba(5, 0, 56, 0.06)' }] },
  },
  dark: {
    level1: { boxShadow: [{ offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(0, 0, 0, 0.32)' }] },
    level2: { boxShadow: [{ offsetX: 0, offsetY: 4, blurRadius: 12, color: 'rgba(0, 0, 0, 0.4)' }] },
  },
} as const;

export interface Theme {
  scheme: 'light' | 'dark';
  colors: ColorTokens;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  motion: typeof motion;
  sizes: typeof sizes;
  easing: typeof easing;
  overlayShadow: (typeof overlayShadow)['light'] | (typeof overlayShadow)['dark'];
  elevation: (typeof elevation)['light'] | (typeof elevation)['dark'];
}

export const lightTheme: Theme = {
  scheme: 'light',
  colors: lightColors,
  spacing,
  radius,
  typography,
  motion,
  sizes,
  easing,
  overlayShadow: overlayShadow.light,
  elevation: elevation.light,
};

export const darkTheme: Theme = {
  scheme: 'dark',
  colors: darkColors,
  spacing,
  radius,
  typography,
  motion,
  sizes,
  easing,
  overlayShadow: overlayShadow.dark,
  elevation: elevation.dark,
};
