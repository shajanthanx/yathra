/**
 * Text with the design system's type scale and colour roles.
 *
 * No `fontFamily` is ever set: the platform's own font carries Sinhala and
 * Tamil glyphs, so text renders correctly in all three languages without
 * shipping or loading a single font file.
 */
import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import type { ColorTokens, TypographyVariant } from '@/theme/tokens';

export type TextTone = keyof Pick<
  ColorTokens,
  | 'ink'
  | 'inkDeep'
  | 'charcoal'
  | 'slate'
  | 'steel'
  | 'stone'
  | 'muted'
  | 'onPrimary'
  | 'link'
  | 'success'
  | 'danger'
  | 'warning'
  | 'accentOnSoft'
  | 'onSurfaceInverse'
>;

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  tone?: TextTone;
  /** Overrides `tone` — for text on a tint panel, which supplies its own pair. */
  color?: string;
  align?: TextStyle['textAlign'];
  uppercase?: boolean;
}

export function Text({
  variant = 'body',
  tone = 'ink',
  color,
  align,
  uppercase,
  style,
  maxFontSizeMultiplier = 1.6,
  ...rest
}: TextProps) {
  const theme = useTheme();
  const typography = theme.typography[variant];

  return (
    <RNText
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[
        typography as TextStyle,
        { color: color ?? theme.colors[tone] },
        align ? { textAlign: align } : null,
        uppercase ? { textTransform: 'uppercase' } : null,
        style,
      ]}
      {...rest}
    />
  );
}
