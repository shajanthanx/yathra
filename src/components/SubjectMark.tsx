/**
 * A subject's identity tile: its tint, holding its short mark.
 *
 * Every subject already owns a stable tint from the student's own subject
 * order; this is what makes that colour visible wherever a subject appears.
 * The mark is decorative — the subject's name is always adjacent in text — so
 * it is hidden from assistive technology rather than read out as initials.
 */
import { View, type ViewStyle } from 'react-native';
import { useSubjectMark, useSubjectPalette } from '@/hooks/useContent';
import { useTheme } from '@/theme/ThemeProvider';
import type { SubjectPalette } from '@/theme/tokens';
import type { SubjectId } from '@/types/content';
import { Text } from './Text';

export type SubjectMarkSize = 'sm' | 'md' | 'lg';

const DIMENSION: Record<SubjectMarkSize, number> = { sm: 30, md: 40, lg: 56 };

/**
 * The mark's type size is set here rather than taken from the scale. A Tamil
 * or Sinhala mark is two grapheme clusters wide, not two Latin letters, and at
 * the scale's 12px `micro` the widest of them overflowed a 28px tile and was
 * truncated to an ellipsis. These sizes are chosen to fit the widest mark in
 * every language.
 */
const MARK_TYPE: Record<SubjectMarkSize, { fontSize: number; lineHeight: number }> = {
  sm: { fontSize: 10, lineHeight: 14 },
  md: { fontSize: 13, lineHeight: 18 },
  lg: { fontSize: 17, lineHeight: 24 },
};

export interface SubjectMarkProps {
  subjectId: SubjectId;
  size?: SubjectMarkSize;
  /**
   * Overrides the colour the subject would get from the student's own subject
   * order. Onboarding needs this: the profile does not exist yet, so every
   * subject would otherwise resolve to the first colour.
   */
  palette?: SubjectPalette;
  style?: ViewStyle;
  testID?: string;
}

export function SubjectMark({ subjectId, size = 'md', palette, style, testID }: SubjectMarkProps) {
  const theme = useTheme();
  const subjectMark = useSubjectMark();
  const subjectPalette = useSubjectPalette();

  const colours = palette ?? subjectPalette(subjectId);
  const dimension = DIMENSION[size];

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          width: dimension,
          height: dimension,
          borderRadius: size === 'sm' ? theme.radius.md : theme.radius.lg,
          backgroundColor: colours.fill,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      testID={testID}
    >
      <Text
        variant="micro"
        color={colours.onFill}
        numberOfLines={1}
        // The mark is sized to the tile, so it must not grow with Dynamic Type.
        maxFontSizeMultiplier={1}
        style={MARK_TYPE[size]}
      >
        {subjectMark(subjectId)}
      </Text>
    </View>
  );
}
