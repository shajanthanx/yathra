/**
 * Past papers for one subject: the years as a grid, and a sheet to record a
 * score and a note.
 *
 * A grid rather than a long list — a decade of years is a dozen rows of almost
 * nothing, whereas a grid shows the whole sitting history at once. Each tile
 * carries an icon as well as a colour, so status never depends on hue alone.
 */
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {
  BottomSheet,
  Button,
  Card,
  Chip,
  ChipGroup,
  DetailScreen,
  SectionHeader,
  StatTile,
  Text,
  TextField,
} from '@/components';
import { isSubjectId } from '@/data/curriculum/subject-ids';
import { getPastPaper } from '@/domain/pastPapers';
import { NOTE_MAX, parseScore, validateNote } from '@/domain/validation';
import { useSubjectName } from '@/hooks/useContent';
import { usePastPaperYears, useSubjectPaperSummary } from '@/hooks/usePapers';
import { clearPastPaper, setPastPaper } from '@/store/appStore';
import { usePastPapers } from '@/store/useStore';
import { useT, useTheme } from '@/theme/ThemeProvider';
import type { PastPaperStatus } from '@/types/models';

const STATUSES: PastPaperStatus[] = ['not_started', 'in_progress', 'completed'];

const STATUS_ICON: Record<PastPaperStatus, keyof typeof Feather.glyphMap> = {
  not_started: 'circle',
  in_progress: 'clock',
  completed: 'check-circle',
};

export default function SubjectPapersScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const subjectName = useSubjectName();
  const papers = usePastPapers();
  const years = usePastPaperYears();
  const { subjectId } = useLocalSearchParams<{ subjectId: string }>();

  const [openYear, setOpenYear] = useState<number | null>(null);
  const [status, setStatus] = useState<PastPaperStatus>('completed');
  const [scoreText, setScoreText] = useState('');
  const [note, setNote] = useState('');
  const [scoreError, setScoreError] = useState<string | undefined>(undefined);

  const valid = typeof subjectId === 'string' && isSubjectId(subjectId);
  const summary = useSubjectPaperSummary(valid ? subjectId : 'physics');

  const records = useMemo(() => {
    if (!valid) return new Map<number, ReturnType<typeof getPastPaper>>();
    return new Map(years.map((year) => [year, getPastPaper(papers, subjectId, year)]));
  }, [valid, years, papers, subjectId]);

  if (!valid) return <Redirect href="/past-papers" />;

  const openSheet = (year: number) => {
    const record = records.get(year);
    setOpenYear(year);
    setStatus(record?.status ?? 'completed');
    setScoreText(record?.score === undefined ? '' : String(record.score));
    setNote(record?.note ?? '');
    setScoreError(undefined);
  };

  const save = () => {
    if (openYear === null) return;
    const score = parseScore(scoreText);
    if (score === null) {
      setScoreError(t('papers.error.score'));
      return;
    }
    if (validateNote(note).length > 0) {
      setScoreError(t('papers.error.noteTooLong', { max: NOTE_MAX }));
      return;
    }
    setPastPaper({ subjectId, year: openYear, status, score, note });
    setOpenYear(null);
  };

  const statusColor = (value: PastPaperStatus) =>
    value === 'completed'
      ? theme.colors.success
      : value === 'in_progress'
        ? theme.colors.warning
        : theme.colors.stone;

  return (
    <DetailScreen
      title={subjectName(subjectId)}
      onBack={() => router.back()}
      overlay={
        <BottomSheet
          visible={openYear !== null}
          onClose={() => setOpenYear(null)}
          title={openYear === null ? undefined : t('papers.year', { year: openYear })}
          footer={
            <View style={{ gap: theme.spacing.xs, paddingBottom: theme.spacing.xs }}>
              <Button label={t('common.save')} onPress={save} />
              {openYear !== null && records.get(openYear) ? (
                <Button
                  label={t('common.delete')}
                  variant="ghost"
                  onPress={() => {
                    if (openYear !== null) clearPastPaper(subjectId, openYear);
                    setOpenYear(null);
                  }}
                />
              ) : null}
            </View>
          }
        >
          <SectionHeader title={t('papers.status')} />
          <ChipGroup>
            {STATUSES.map((option) => (
              <Chip
                key={option}
                label={t(`papers.status.${option}`)}
                selected={status === option}
                onPress={() => setStatus(option)}
              />
            ))}
          </ChipGroup>

          <TextField
            label={t('papers.scoreLabel')}
            placeholder={t('papers.scorePlaceholder')}
            value={scoreText}
            onChangeText={(text) => {
              setScoreText(text);
              setScoreError(undefined);
            }}
            keyboardType="number-pad"
            {...(scoreError === undefined ? {} : { error: scoreError })}
            containerStyle={{ marginTop: theme.spacing.xl }}
          />

          <TextField
            label={t('papers.noteLabel')}
            placeholder={t('papers.notePlaceholder')}
            value={note}
            onChangeText={setNote}
            multiline
            maxLength={NOTE_MAX}
            containerStyle={{ marginTop: theme.spacing.md, marginBottom: theme.spacing.md }}
          />
        </BottomSheet>
      }
    >
      <Card style={{ marginTop: theme.spacing.md }}>
        <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
          <StatTile
            style={{ flex: 1 }}
            variant="heading"
            value={String(summary.completed)}
            label={t('papers.status.completed')}
          />
          <StatTile
            style={{ flex: 1 }}
            variant="heading"
            value={
              summary.average === undefined
                ? '—'
                : t('common.percent', { value: summary.average })
            }
            label={t('papers.average')}
          />
          <StatTile
            style={{ flex: 1 }}
            variant="heading"
            value={summary.best === undefined ? '—' : t('common.percent', { value: summary.best })}
            label={t('papers.best')}
          />
        </View>
      </Card>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
          marginTop: theme.spacing.xl,
        }}
      >
        {years.map((year) => {
          const record = records.get(year);
          const recordStatus = record?.status ?? 'not_started';
          const detail =
            record?.score === undefined
              ? t(`papers.status.${recordStatus}`)
              : t('common.percent', { value: record.score });

          return (
            <Pressable
              key={year}
              onPress={() => openSheet(year)}
              accessibilityRole="button"
              accessibilityLabel={`${year}, ${detail}`}
              style={({ pressed }) => ({
                // Capped so a final orphan tile keeps its column width instead
                // of stretching across the whole row.
                flexGrow: 1,
                flexBasis: '28%',
                maxWidth: '33%',
                minHeight: theme.sizes.touchTarget,
                paddingVertical: theme.spacing.sm,
                paddingHorizontal: theme.spacing.sm,
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: theme.colors.hairline,
                backgroundColor: pressed ? theme.colors.surface : theme.colors.surfaceRaised,
              })}
            >
              <Text variant="bodyMedium">{String(year)}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: theme.spacing.xxs,
                  marginTop: 2,
                }}
              >
                <Feather
                  name={STATUS_ICON[recordStatus]}
                  size={14}
                  color={statusColor(recordStatus)}
                />
                <Text variant="caption" tone="slate" numberOfLines={1} style={{ flex: 1 }}>
                  {detail}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <Text variant="caption" tone="stone" style={{ marginTop: theme.spacing.xl }}>
        {t('papers.noPapersNote')}
      </Text>
    </DetailScreen>
  );
}
