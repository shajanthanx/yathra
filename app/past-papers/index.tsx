/**
 * Past papers overview. The app tracks what a student has worked through and
 * what they scored; it contains no papers and downloads nothing.
 */
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Card,
  DetailScreen,
  EmptyState,
  ListRow,
  StatTile,
  SubjectMark,
  Text,
} from '@/components';
import { useSelectedSubjectIds, useSubjectName } from '@/hooks/useContent';
import { useAllPapersSummary, useSubjectPaperSummary } from '@/hooks/usePapers';
import { useT, useTheme } from '@/theme/ThemeProvider';
import type { SubjectId } from '@/types/content';

export default function PastPapersScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const subjectIds = useSelectedSubjectIds();
  const overall = useAllPapersSummary();

  return (
    <DetailScreen title={t('papers.title')} onBack={() => router.back()}>
      <Text variant="body" tone="slate" style={{ marginTop: theme.spacing.md }}>
        {t('papers.subtitle')}
      </Text>

      {overall.completed === 0 && overall.scoredCount === 0 ? (
        <View style={{ marginTop: theme.spacing.xl }}>
          <EmptyState
            title={t('papers.empty.title')}
            body={t('papers.empty.body')}
            icon="file-text"
            tint="coral"
          />
        </View>
      ) : (
        <Card style={{ marginTop: theme.spacing.lg }}>
          <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
            <StatTile
              style={{ flex: 1 }}
              variant="heading"
              value={String(overall.completed)}
              label={t('papers.completedCount', { count: overall.completed })}
            />
            <StatTile
              style={{ flex: 1 }}
              variant="heading"
              value={
                overall.average === undefined
                  ? '—'
                  : t('common.percent', { value: overall.average })
              }
              label={t('papers.average')}
            />
            <StatTile
              style={{ flex: 1 }}
              variant="heading"
              value={
                overall.best === undefined ? '—' : t('common.percent', { value: overall.best })
              }
              label={t('papers.best')}
            />
          </View>
        </Card>
      )}

      <View style={{ marginTop: theme.spacing.xl }}>
        {subjectIds.map((subjectId, index) => (
          <SubjectPaperRow
            key={subjectId}
            subjectId={subjectId}
            last={index === subjectIds.length - 1}
            onPress={() => router.push(`/past-papers/${subjectId}`)}
          />
        ))}
      </View>

      <Text variant="caption" tone="stone" style={{ marginTop: theme.spacing.xl }}>
        {t('papers.noPapersNote')}
      </Text>
    </DetailScreen>
  );
}

function SubjectPaperRow({
  subjectId,
  last,
  onPress,
}: {
  subjectId: SubjectId;
  last: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();
  const t = useT();
  const subjectName = useSubjectName();
  const summary = useSubjectPaperSummary(subjectId);

  const value =
    summary.completed === 0
      ? t('papers.noScores')
      : summary.average === undefined
        ? t('papers.completedCount', { count: summary.completed })
        : `${t('papers.completedCount', { count: summary.completed })} · ${t('common.percent', {
            value: summary.average,
          })}`;

  return (
    <ListRow
      title={subjectName(subjectId)}
      value={value}
      onPress={onPress}
      showChevron
      last={last}
      leading={<SubjectMark subjectId={subjectId} size="sm" style={{ marginRight: theme.spacing.sm }} />}
    />
  );
}
