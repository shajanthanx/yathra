/**
 * Data management: export a backup, restore one, or reset everything. Nothing
 * here contacts a network — a backup is a file on the student's own device.
 */
import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {
  Button,
  Card,
  ConfirmDialog,
  DetailScreen,
  ListRow,
  SectionHeader,
  Text,
} from '@/components';
import { exportBackup, parseBackup, pickBackupText, type ParsedBackup } from '@/storage/backup';
import { flushPending, replaceAllData, resetEverything } from '@/store/appStore';
import { useAppState } from '@/store/useStore';
import { useT, useTheme } from '@/theme/ThemeProvider';

type NoteTone = 'busy' | 'success' | 'danger';

export default function DataScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const state = useAppState();

  const [busy, setBusy] = useState<'export' | 'import' | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingImport, setPendingImport] = useState<ParsedBackup | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const clearFeedback = () => {
    setMessage(null);
    setError(null);
  };

  const runExport = async () => {
    clearFeedback();
    setBusy('export');
    try {
      await flushPending();
      const shared = await exportBackup(state.data);
      if (shared) setMessage(t('settings.data.exportDone'));
      else setError(t('settings.data.error.unavailable'));
    } catch {
      setError(t('settings.data.error.exportFailed'));
    } finally {
      setBusy(null);
    }
  };

  const runImport = async () => {
    clearFeedback();
    setBusy('import');
    try {
      const text = await pickBackupText();
      if (text === null) return;
      const parsed = parseBackup(text);
      if (!parsed.ok) {
        setError(
          parsed.error === 'newer_version'
            ? t('settings.data.error.newerVersion')
            : t('settings.data.error.invalidFile'),
        );
        return;
      }
      setPendingImport(parsed.value);
    } catch {
      setError(t('settings.data.error.importFailed'));
    } finally {
      setBusy(null);
    }
  };

  return (
    <DetailScreen
      title={t('settings.data.title')}
      onBack={() => router.back()}
      overlay={
        <>
          <ConfirmDialog
            visible={pendingImport !== null}
            title={t('settings.data.importConfirm.title')}
            body={t('settings.data.importConfirm.body', {
              tasks: pendingImport?.taskCount ?? 0,
              topics: pendingImport?.topicCount ?? 0,
            })}
            confirmLabel={t('settings.data.importConfirm.action')}
            onCancel={() => setPendingImport(null)}
            onConfirm={() => {
              const data = pendingImport?.data;
              setPendingImport(null);
              if (!data) return;
              void replaceAllData(data).then(() => setMessage(t('settings.data.importDone')));
            }}
          />

          <ConfirmDialog
            visible={confirmReset}
            title={t('settings.data.resetConfirm.title')}
            body={t('settings.data.resetConfirm.body')}
            confirmLabel={t('settings.data.resetConfirm.action')}
            destructive
            onCancel={() => setConfirmReset(false)}
            onConfirm={() => {
              setConfirmReset(false);
              void resetEverything();
            }}
          />
        </>
      }
    >
      <Card style={{ marginTop: theme.spacing.md }}>
        <Text variant="bodySmMedium">{t('more.privacyLine')}</Text>
      </Card>

      <View style={{ marginTop: theme.spacing.xl }}>
        <ListRow
          title={t('settings.data.export')}
          subtitle={t('settings.data.exportBody')}
          onPress={() => void runExport()}
          showChevron
        />
        <ListRow
          title={t('settings.data.import')}
          subtitle={t('settings.data.importBody')}
          onPress={() => void runImport()}
          showChevron
          last
        />
      </View>

      {busy ? (
        <StatusNote
          tone="busy"
          text={busy === 'export' ? t('settings.data.export') : t('settings.data.import')}
        />
      ) : null}
      {message ? <StatusNote tone="success" text={message} /> : null}
      {error ? <StatusNote tone="danger" text={error} /> : null}

      <View style={{ marginTop: theme.spacing.xxl }}>
        <SectionHeader title={t('settings.data.reset')} variant="heading" />
        <Text variant="bodySm" tone="slate" style={{ marginBottom: theme.spacing.md }}>
          {t('settings.data.resetBody')}
        </Text>
        <Button
          label={t('settings.data.reset')}
          variant="secondary"
          onPress={() => setConfirmReset(true)}
        />
      </View>
    </DetailScreen>
  );
}

/**
 * An inline result surface, replacing three ad-hoc conditional lines of text.
 * The state is carried by an icon as well as the background, and the label
 * itself stays in `ink`: the semantic greens and reds are strong enough as
 * icon colours but do not reach 4.5:1 as body text on their own soft fills.
 */
function StatusNote({ tone, text }: { tone: NoteTone; text: string }) {
  const theme = useTheme();

  const background =
    tone === 'success'
      ? theme.colors.successSoft
      : tone === 'danger'
        ? theme.colors.dangerSoft
        : theme.colors.infoSoft;
  const accent =
    tone === 'success'
      ? theme.colors.success
      : tone === 'danger'
        ? theme.colors.danger
        : theme.colors.info;
  const icon = tone === 'success' ? 'check-circle' : tone === 'danger' ? 'alert-circle' : 'clock';

  return (
    <View
      accessibilityRole="alert"
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: theme.spacing.sm,
        marginTop: theme.spacing.md,
        padding: theme.spacing.sm,
        borderRadius: theme.radius.md,
        borderWidth: 1,
        borderColor: theme.colors.hairline,
        backgroundColor: background,
      }}
    >
      <Feather name={icon} size={16} color={accent} style={{ marginTop: 3 }} />
      <Text variant="bodySm" style={{ flex: 1 }}>
        {text}
      </Text>
    </View>
  );
}
