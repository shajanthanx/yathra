/**
 * Confirmation dialog for anything destructive. Built in-app rather than with
 * `Alert` so it is styled, translated and testable on every platform.
 */
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useT, useTheme } from '@/theme/ThemeProvider';
import { Button } from './Button';
import { Text } from './Text';

export interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  body?: string;
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  testID?: string;
}

export function ConfirmDialog({
  visible,
  title,
  body,
  confirmLabel,
  cancelLabel,
  destructive = false,
  onConfirm,
  onCancel,
  testID,
}: ConfirmDialogProps) {
  const theme = useTheme();
  const t = useT();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel} statusBarTranslucent>
      <View style={styles.center}>
        <Pressable
          style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.scrim }]}
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel={cancelLabel ?? t('common.cancel')}
        />
        <View
          testID={testID}
          accessibilityViewIsModal
          style={[
            {
              width: '100%',
              maxWidth: 400,
              backgroundColor: theme.colors.surfaceRaised,
              borderRadius: theme.radius.xxl,
              padding: theme.spacing.xl,
            },
            theme.overlayShadow,
          ]}
        >
          <Text variant="heading" accessibilityRole="header">
            {title}
          </Text>
          {body ? (
            <Text variant="body" tone="slate" style={{ marginTop: theme.spacing.xs }}>
              {body}
            </Text>
          ) : null}

          <View style={{ marginTop: theme.spacing.xl, gap: theme.spacing.xs }}>
            <Button
              label={confirmLabel}
              onPress={onConfirm}
              variant={destructive ? 'danger' : 'primary'}
            />
            <Button label={cancelLabel ?? t('common.cancel')} onPress={onCancel} variant="ghost" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
});
