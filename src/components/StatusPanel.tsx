/**
 * The on-track panel. The wording is intentionally calm: being behind is a
 * prompt to simplify the next few days, never a verdict on the student.
 */
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { OnTrackStatus } from '@/domain/onTrack';
import { useT, useTheme } from '@/theme/ThemeProvider';
import { tintPair, type TintKey } from '@/theme/tokens';
import type { TranslationKey } from '@/i18n';
import { Badge } from './Badge';
import { Button } from './Button';
import { Text } from './Text';

export interface StatusPanelProps {
  status: OnTrackStatus;
  onCatchUp?: () => void;
}

const PRESENTATION: Record<
  OnTrackStatus,
  { tint: TintKey; icon: keyof typeof Feather.glyphMap; label: TranslationKey; message: TranslationKey }
> = {
  on_track: { tint: 'teal', icon: 'check-circle', label: 'status.onTrack.label', message: 'status.onTrack.message' },
  catching_up: { tint: 'amber', icon: 'trending-up', label: 'status.catchingUp.label', message: 'status.catchingUp.message' },
  behind: { tint: 'coral', icon: 'life-buoy', label: 'status.behind.label', message: 'status.behind.message' },
  just_started: { tint: 'violet', icon: 'flag', label: 'status.justStarted.label', message: 'status.justStarted.message' },
};

export function StatusPanel({ status, onCatchUp }: StatusPanelProps) {
  const theme = useTheme();
  const t = useT();
  const presentation = PRESENTATION[status];
  const { background, foreground } = tintPair(theme.colors, presentation.tint);
  const showCatchUp = Boolean(onCatchUp) && (status === 'catching_up' || status === 'behind');

  return (
    <View
      accessibilityRole="summary"
      style={{
        backgroundColor: background,
        borderRadius: theme.radius.xxxl,
        padding: theme.spacing.lg,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Feather name={presentation.icon} size={theme.sizes.iconSm} color={foreground} />
        <Text variant="subheading" color={foreground} style={{ marginLeft: theme.spacing.xs, flex: 1 }}>
          {t(presentation.label)}
        </Text>
      </View>
      <Text variant="bodySm" color={foreground} style={{ marginTop: theme.spacing.xxs, opacity: 0.9 }}>
        {t(presentation.message)}
      </Text>
      {showCatchUp && onCatchUp ? (
        <Button
          label={t('status.catchUpAction')}
          onPress={onCatchUp}
          variant="primary"
          size="sm"
          fullWidth={false}
          style={{ marginTop: theme.spacing.md }}
        />
      ) : null}
    </View>
  );
}

/**
 * The same status as a single pill, for the hero's inset card where the
 * sentence would duplicate the coach line directly beneath it.
 */
export interface StatusBadgeProps {
  status: OnTrackStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const t = useT();
  const presentation = PRESENTATION[status];

  return <Badge label={t(presentation.label)} tint={presentation.tint} icon={presentation.icon} />;
}
