/**
 * Home — the student's A/L command centre.
 *
 * It answers three questions, in this order and with this much visual weight:
 * where am I (the hero: cohort, countdown, and progress against the pace the
 * syllabus actually needs), what should I do today (the plan), and how is the
 * week going (day cells and subjects).
 *
 * The hero is the screen's one expressive surface; everything below it stays
 * in the flat hairline system. `Screen` is edge-to-edge so the hero can be
 * full-bleed, and `topSafeArea` is deliberately absent — the hero owns the top
 * inset, and setting both would leave a band of dead space beneath it.
 */
import { Pressable, View } from 'react-native';
import { useIsFocused, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import {
  AnimatedNumber,
  Button,
  Card,
  CoachLine,
  DayCells,
  EmptyState,
  Hero,
  JourneyProgress,
  ProgressBar,
  Screen,
  SectionHeader,
  StatusBadge,
  SubjectCard,
  TaskRow,
  Text,
} from '@/components';
import { needsCatchUp } from '@/domain/onTrack';
import { countPlannedMinutes } from '@/domain/tasks';
import { useAcademicYear, useSubjectName } from '@/hooks/useContent';
import { useCountdown, useJourney, useOnTrack } from '@/hooks/useJourney';
import { useOverdueTasks, useTodayTasks, useWeekLoad, useWeeklyCompletion } from '@/hooks/usePlan';
import { useOverallProgress, useSubjectSummaries } from '@/hooks/useProgress';
import { useToday } from '@/hooks/useToday';
import { plural } from '@/i18n';
import { formatDayMonth, formatMinutes, monthShort, percentValue } from '@/i18n/format';
import { setTaskCompleted } from '@/store/appStore';
import { useActiveSession } from '@/store/useStore';
import { useT, useTheme } from '@/theme/ThemeProvider';
import { dateParts } from '@/utils/date';

export default function HomeScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const today = useToday();
  const focused = useIsFocused();

  const year = useAcademicYear();
  const journey = useJourney();
  const countdown = useCountdown();
  const onTrack = useOnTrack();
  const overall = useOverallProgress();
  const summaries = useSubjectSummaries();
  const todayTasks = useTodayTasks();
  const overdue = useOverdueTasks();
  const weekLoad = useWeekLoad();
  const weekCompletion = useWeeklyCompletion();
  const activeSession = useActiveSession();
  const subjectName = useSubjectName();

  const completedToday = todayTasks.filter((task) => task.completed).length;
  const plannedMinutes = countPlannedMinutes(todayTasks);
  const showCatchUp = onTrack ? needsCatchUp(onTrack.status) : false;

  return (
    <>
      {/* The hero is dark in both themes, so Home always wants light status
          bar content. Gating on focus matters: expo-router keeps this screen
          mounted behind a pushed route, and an ungated instance would sit at
          the top of the status-bar prop stack and leak onto light screens. */}
      {focused ? <StatusBar style="light" /> : null}

      <Screen edgeToEdge bottomInset={theme.spacing.md}>
        <Hero
          inset={
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
                <Text variant="microUppercase" uppercase tone="steel" style={{ flex: 1 }}>
                  {t('home.hero.journeyLabel')}
                </Text>
                {onTrack ? <StatusBadge status={onTrack.status} /> : null}
              </View>

              <AnimatedNumber
                value={percentValue(overall)}
                format={(value) => t('common.percent', { value })}
                variant="stat"
                accessibilityLabel={t('a11y.progress', { value: percentValue(overall) })}
              />

              {onTrack ? (
                <JourneyProgress
                  actual={onTrack.actualProgress}
                  expected={onTrack.expectedProgress}
                  paceLabel={t('home.pace')}
                  accessibilityLabel={t('a11y.pace', {
                    actual: percentValue(onTrack.actualProgress),
                    expected: percentValue(onTrack.expectedProgress),
                  })}
                  style={{ marginTop: theme.spacing.xs }}
                />
              ) : (
                <ProgressBar value={overall} style={{ marginTop: theme.spacing.xs }} />
              )}

              {showCatchUp ? (
                <Button
                  label={t('status.catchUpAction')}
                  icon="life-buoy"
                  variant="secondary"
                  size="sm"
                  fullWidth={false}
                  onPress={() => router.push('/catch-up')}
                  style={{ marginTop: theme.spacing.md }}
                />
              ) : null}
            </>
          }
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: theme.spacing.sm }}>
            <View style={{ flex: 1 }}>
              <Text variant="heading" color={theme.colors.onHero}>
                {year ? t('home.journeyTitle', { year: year.examYear }) : t('common.appName')}
              </Text>
              {journey ? (
                <Text variant="bodySm" color={theme.colors.onHero} style={{ marginTop: 2 }}>
                  {journey.notStarted && year
                    ? t('home.journeyNotStarted', { date: formatDayMonth(t, year.journeyStart) })
                    : plural(t, 'home.journeyMonths', journey.monthsElapsed)}
                </Text>
              ) : null}
            </View>

            {countdown ? (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.onHeroMuted,
                  borderRadius: theme.radius.full,
                  backgroundColor: theme.colors.heroChipFill,
                  paddingVertical: theme.spacing.xxs,
                  paddingHorizontal: theme.spacing.sm,
                }}
              >
                <Text variant="micro" color={theme.colors.onHero}>
                  {t('home.hero.examWindow', {
                    month: monthShort(t, dateParts(countdown.examStart).month),
                    year: dateParts(countdown.examStart).year,
                  })}
                </Text>
              </View>
            ) : null}
          </View>

          {countdown ? (
            <View style={{ marginTop: theme.spacing.xl }}>
              {countdown.phase === 'before' ? (
                <View style={{ flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <Text variant="heroStat" color={theme.colors.onHero}>
                    {String(countdown.daysLeft)}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    color={theme.colors.onHero}
                    style={{ marginLeft: theme.spacing.xs }}
                  >
                    {plural(t, 'home.countdown.daysLabel', countdown.daysLeft)}
                  </Text>
                </View>
              ) : (
                <Text variant="title" color={theme.colors.onHero}>
                  {countdown.phase === 'during'
                    ? t('home.countdown.examPeriod')
                    : t('home.countdown.examDone')}
                </Text>
              )}

              {countdown.isEstimated && countdown.phase === 'before' ? (
                <Text
                  variant="micro"
                  color={theme.colors.onHero}
                  style={{ marginTop: theme.spacing.xxs }}
                >
                  {t('home.countdown.estimatedNote')}
                </Text>
              ) : null}
            </View>
          ) : null}
        </Hero>

        <View style={{ paddingHorizontal: theme.spacing.md }}>
          <CoachLine style={{ marginTop: theme.spacing.lg }} />

          {activeSession ? (
            <Card
              onPress={() => router.push('/study')}
              accessibilityLabel={t('home.resume.title')}
              style={{ marginTop: theme.spacing.lg }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                <Feather name="play-circle" size={theme.sizes.icon} color={theme.colors.info} />
                <View style={{ flex: 1 }}>
                  <Text variant="bodyMedium">{t('home.resume.title')}</Text>
                  <Text variant="caption" tone="slate">
                    {subjectName(activeSession.subjectId, true)}
                  </Text>
                </View>
                <Text variant="bodySmMedium" tone="link">
                  {t('home.resume.action')}
                </Text>
              </View>
            </Card>
          ) : null}

          <View style={{ marginTop: theme.spacing.xxl }}>
            <SectionHeader
              title={t('home.today')}
              variant="heading"
              trailing={
                todayTasks.length > 0 ? (
                  <Text variant="caption" tone="stone">
                    {plannedMinutes > 0
                      ? t('home.todayLoad', {
                          tasks: plural(t, 'plan.tasksCount', todayTasks.length),
                          duration: formatMinutes(t, plannedMinutes),
                        })
                      : t('plan.completedCount', {
                          done: completedToday,
                          total: todayTasks.length,
                        })}
                  </Text>
                ) : undefined
              }
            />

            {overdue.length > 0 ? (
              <Button
                label={plural(t, 'home.overdue', overdue.length)}
                icon="clock"
                variant="secondary"
                size="sm"
                onPress={() => router.push('/(tabs)/plan')}
                style={{ marginBottom: theme.spacing.sm }}
              />
            ) : null}

            {todayTasks.length === 0 ? (
              <EmptyState
                title={t('home.todayEmpty.title')}
                body={t('home.todayEmpty.body')}
                icon="sun"
                tint="amber"
                actionLabel={t('home.addTask')}
                onAction={() => router.push({ pathname: '/task', params: { date: today } })}
              />
            ) : (
              todayTasks.map((task, index) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  last={index === todayTasks.length - 1}
                  onToggle={(item) => setTaskCompleted(item.id, !item.completed)}
                  onPress={(item) => router.push({ pathname: '/task', params: { taskId: item.id } })}
                />
              ))
            )}
          </View>

          <View style={{ marginTop: theme.spacing.xxl }}>
            <SectionHeader
              title={t('home.thisWeek')}
              variant="heading"
              trailing={
                <Pressable
                  onPress={() => router.push('/(tabs)/progress')}
                  accessibilityRole="link"
                  hitSlop={8}
                >
                  <Text variant="bodySmMedium" tone="link">
                    {t('home.seeProgress')}
                  </Text>
                </Pressable>
              }
            />
            <DayCells days={weekLoad} today={today} onSelect={() => router.push('/(tabs)/plan')} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: theme.spacing.sm,
              }}
            >
              <Text variant="caption" tone="steel">
                {t('home.tasksDone')}
              </Text>
              <Text variant="captionBold" tone="ink">
                {t('common.of', { done: weekCompletion.completed, total: weekCompletion.total })}
              </Text>
            </View>
          </View>

          {summaries.length > 0 ? (
            <View style={{ marginTop: theme.spacing.xxl }}>
              <SectionHeader
                title={t('subjects.title')}
                variant="heading"
                trailing={
                  <Pressable
                    onPress={() => router.push('/(tabs)/subjects')}
                    accessibilityRole="link"
                    hitSlop={8}
                  >
                    <Text variant="bodySmMedium" tone="link">
                      {t('home.seeAll')}
                    </Text>
                  </Pressable>
                }
              />
              <View style={{ flexDirection: 'row', gap: theme.spacing.xs }}>
                {summaries.map((summary) => (
                  <SubjectCard
                    key={summary.subjectId}
                    summary={summary}
                    onPress={(subjectId) => router.push(`/subject/${subjectId}`)}
                  />
                ))}
              </View>
            </View>
          ) : null}

          <View style={{ marginTop: theme.spacing.xxl, gap: theme.spacing.xs }}>
            <Button
              label={t('home.addTask')}
              icon="plus"
              onPress={() => router.push({ pathname: '/task', params: { date: today } })}
            />
            <Button
              label={t('home.startStudying')}
              icon="play"
              variant="secondary"
              onPress={() => router.push('/study')}
            />
          </View>
        </View>
      </Screen>
    </>
  );
}
