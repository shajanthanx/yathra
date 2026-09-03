/**
 * Shown when stored data could not be read. A corrupted local file must never
 * mean a crash loop, so the student is offered a retry and, failing that, a
 * clean start — and is told plainly which one removes data.
 */
import { useState } from 'react';
import { Button, ConfirmDialog, MessageScreen } from '@/components';
import { continueWithRecoveredData, loadApp, startFresh } from '@/store/appStore';
import { useT } from '@/theme/ThemeProvider';

export function RecoveryScreen() {
  const t = useT();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <>
      <MessageScreen
        title={t('error.storage.title')}
        body={t('error.storage.body')}
        icon="alert-circle"
        tint="amber"
      >
        <Button
          label={t('error.storage.retry')}
          loading={busy}
          onPress={() => {
            setBusy(true);
            void loadApp().finally(() => setBusy(false));
          }}
        />
        <Button
          label={t('common.continue')}
          variant="secondary"
          onPress={continueWithRecoveredData}
        />
        <Button
          label={t('error.storage.startFresh')}
          variant="ghost"
          onPress={() => setConfirming(true)}
        />
      </MessageScreen>

      <ConfirmDialog
        visible={confirming}
        title={t('error.storage.startFreshConfirm.title')}
        body={t('error.storage.startFreshConfirm.body')}
        confirmLabel={t('error.storage.startFresh')}
        destructive
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          void startFresh();
        }}
      />
    </>
  );
}
