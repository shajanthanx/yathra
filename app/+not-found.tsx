import { useRouter } from 'expo-router';
import { Button, MessageScreen } from '@/components';
import { useT } from '@/theme/ThemeProvider';

export default function NotFoundScreen() {
  const t = useT();
  const router = useRouter();

  return (
    <MessageScreen
      title={t('error.notFound.title')}
      body={t('error.notFound.body')}
      icon="compass"
      tint="violet"
    >
      <Button label={t('error.notFound.action')} onPress={() => router.replace('/')} />
    </MessageScreen>
  );
}
