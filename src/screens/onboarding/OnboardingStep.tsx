/**
 * Shared frame for an onboarding step: a progress track, a title, a supporting
 * line, the step's content, and one primary action pinned above the safe area.
 */
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button, IconButton, Screen, StepIndicator, Text } from '@/components';
import { useT, useTheme } from '@/theme/ThemeProvider';

export const ONBOARDING_STEPS = 5;

export interface OnboardingStepProps {
  step: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  actionLabel: string;
  onAction: () => void;
  actionDisabled?: boolean;
  showBack?: boolean;
  /** Extra note shown just above the action, e.g. how many more to choose. */
  hint?: string;
}

export function OnboardingStep({
  step,
  title,
  subtitle,
  children,
  actionLabel,
  onAction,
  actionDisabled = false,
  showBack = true,
  hint,
}: OnboardingStepProps) {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.canvas }}>
      <View
        style={{
          paddingTop: insets.top + theme.spacing.xs,
          paddingHorizontal: theme.spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {showBack && router.canGoBack() ? (
          <IconButton
            icon="arrow-left"
            onPress={() => router.back()}
            accessibilityLabel={t('a11y.back')}
          />
        ) : (
          <View style={{ width: theme.sizes.iconButton }} />
        )}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <StepIndicator
            step={step}
            total={ONBOARDING_STEPS}
            accessibilityLabel={t('a11y.step', { step, total: ONBOARDING_STEPS })}
          />
        </View>
        <View style={{ width: theme.sizes.iconButton }} />
      </View>

      <Screen contentStyle={{ paddingTop: theme.spacing.xxl }}>
        <Text variant="microUppercase" uppercase tone="steel">
          {t('onboarding.step', { current: step, total: ONBOARDING_STEPS })}
        </Text>
        <Text variant="title" accessibilityRole="header" style={{ marginTop: theme.spacing.xs }}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="body" tone="slate" style={{ marginTop: theme.spacing.xs }}>
            {subtitle}
          </Text>
        ) : null}

        <View style={{ marginTop: theme.spacing.xl }}>{children}</View>
      </Screen>

      <View
        style={{
          paddingHorizontal: theme.spacing.md,
          paddingBottom: insets.bottom + theme.spacing.md,
          paddingTop: theme.spacing.sm,
          borderTopWidth: 1,
          borderTopColor: theme.colors.hairlineSoft,
          backgroundColor: theme.colors.canvas,
        }}
      >
        {hint ? (
          <Text
            variant="caption"
            tone="slate"
            align="center"
            style={{ marginBottom: theme.spacing.xs }}
          >
            {hint}
          </Text>
        ) : null}
        <Button label={actionLabel} onPress={onAction} disabled={actionDisabled} />
      </View>
    </View>
  );
}
