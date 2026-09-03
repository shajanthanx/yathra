/**
 * Plan — Today, This week and Later.
 *
 * Overdue work is pinned above today's list with a one-tap way to move it
 * forward, so falling behind stays recoverable rather than accumulating out of
 * sight. The week view leads with the workload bars, which answer "which day
 * am I overloading?" before the day picker answers "what is on Thursday?".
 */
import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Button,
  EmptyState,
  LoadBars,
  Screen,
  SectionHeader,
  SegmentedControl,
  TaskRow,
  Text,
  WeekStrip,
} from '@/components';
import { countPlannedMinutes } from '@/domain/tasks';
import type { Task } from '@/types/models';
import {
  useLaterTasks,
  useOverdueTasks,
  useTasksForDay,
  useWeekLoad,
  useWeekSummary,
} from '@/hooks/usePlan';
import { useToday } from '@/hooks/useToday';
import { plural } from '@/i18n';
import { formatDayMonth, formatMinutes, formatRelativeDay, weekdayLong } from '@/i18n/format';
import { rescheduleTasks, setTaskCompleted } from '@/store/appStore';
import { useT, useTheme } from '@/theme/ThemeProvider';

type PlanTab = 'today' | 'week' | 'later';

export default function PlanScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const today = useToday();

  const [tab, setTab] = useState<PlanTab>('today');
  const [selectedDay, setSelectedDay] = useState(today);

  const overdue = useOverdueTasks();
  const todayTasks = useTasksForDay(today);
  const weekDays = useWeekSummary(today);
  const weekLoad = useWeekLoad(today);
  const selectedDayTasks = useTasksForDay(selectedDay);
  const later = useLaterTasks();

  const openTask = (taskId: string) => router.push({ pathname: '/task', params: { taskId } });
  const addTask = (date: string) => router.push({ pathname: '/task', params: { date } });

  /** "3 tasks · 2h 15m", or just the count when nothing carries a duration. */
  const loadSummary = (tasks: readonly Task[]) => {
    const minutes = countPlannedMinutes(tasks);
    const count = plural(t, 'plan.tasksCount', tasks.length);
    return minutes > 0
      ? t('home.todayLoad', { tasks: count, duration: formatMinutes(t, minutes) })
      : count;
  };

  return (
    <Screen topSafeArea bottomInset={theme.spacing.xxl}>
      <Text variant="title" accessibilityRole="header" style={{ marginTop: theme.spacing.md }}>
        {t('plan.title')}
      </Text>

      <SegmentedControl
        options={[
          { value: 'today', label: t('plan.today') },
          { value: 'week', label: t('plan.week') },
          { value: 'later', label: t('plan.later') },
        ]}
        value={tab}
        onChange={setTab}
        style={{ marginTop: theme.spacing.md }}
      />

      {tab === 'today' ? (
        <View style={{ marginTop: theme.spacing.xl }}>
          {overdue.length > 0 ? (
            <View style={{ marginBottom: theme.spacing.xl }}>
              <SectionHeader
                title={t('plan.fromEarlier')}
                trailing={
                  <Text variant="caption" tone="stone">
                    {plural(t, 'plan.tasksCount', overdue.length)}
                  </Text>
                }
              />
              {overdue.map((task, index) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  last={index === overdue.length - 1}
                  showDate={formatDayMonth(t, task.date)}
                  onToggle={(item) => setTaskCompleted(item.id, !item.completed)}
                  onPress={(item) => openTask(item.id)}
                />
              ))}
              {/* A full-width action rather than one inline with the heading:
                  the Sinhala and Tamil labels are far longer than the English. */}
              <Button
                label={t('plan.moveAllToToday')}
                icon="arrow-down"
                variant="secondary"
                size="sm"
                onPress={() => rescheduleTasks(
                  overdue.map((task) => task.id),
                  today,
                )}
                style={{ marginTop: theme.spacing.sm }}
              />
            </View>
          ) : null}

          <SectionHeader
            title={t('plan.today')}
            variant="heading"
            trailing={
              todayTasks.length > 0 ? (
                <Text variant="caption" tone="stone">
                  {loadSummary(todayTasks)}
                </Text>
              ) : undefined
            }
          />
          {todayTasks.length === 0 ? (
            <EmptyState
              title={t('plan.empty.today.title')}
              body={t('plan.empty.today.body')}
              icon="sun"
              tint="amber"
              actionLabel={t('plan.addTask')}
              onAction={() => addTask(today)}
            />
          ) : (
            todayTasks.map((task, index) => (
              <TaskRow
                key={task.id}
                task={task}
                last={index === todayTasks.length - 1}
                onToggle={(item) => setTaskCompleted(item.id, !item.completed)}
                onPress={(item) => openTask(item.id)}
              />
            ))
          )}
        </View>
      ) : null}

      {tab === 'week' ? (
        <View style={{ marginTop: theme.spacing.xl }}>
          <SectionHeader title={t('plan.workload')} />
          <LoadBars days={weekLoad} today={today} />

          <View style={{ marginTop: theme.spacing.xxl }}>
            <WeekStrip
              days={weekDays}
              selected={selectedDay}
              today={today}
              onSelect={setSelectedDay}
            />
          </View>

          <View style={{ marginTop: theme.spacing.xl }}>
            <SectionHeader
              title={weekdayLong(t, selectedDay)}
              variant="heading"
              trailing={
                selectedDayTasks.length > 0 ? (
                  <Text variant="caption" tone="stone">
                    {loadSummary(selectedDayTasks)}
                  </Text>
                ) : undefined
              }
            />
            {selectedDayTasks.length === 0 ? (
              <EmptyState
                title={t('plan.empty.day.title')}
                body={t('plan.empty.week.body')}
                icon="calendar"
                tint="violet"
                actionLabel={t('plan.addTask')}
                onAction={() => addTask(selectedDay)}
              />
            ) : (
              selectedDayTasks.map((task, index) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  last={index === selectedDayTasks.length - 1}
                  onToggle={(item) => setTaskCompleted(item.id, !item.completed)}
                  onPress={(item) => openTask(item.id)}
                />
              ))
            )}
          </View>
        </View>
      ) : null}

      {tab === 'later' ? (
        <View style={{ marginTop: theme.spacing.xl }}>
          {later.length === 0 ? (
            <EmptyState
              title={t('plan.empty.later.title')}
              body={t('plan.empty.later.body')}
              icon="clock"
              tint="teal"
            />
          ) : (
            later.map((group) => (
              <View key={group.date} style={{ marginBottom: theme.spacing.xl }}>
                <SectionHeader
                  title={formatRelativeDay(t, group.date, today)}
                  trailing={
                    <Text variant="caption" tone="stone">
                      {loadSummary(group.tasks)}
                    </Text>
                  }
                />
                {group.tasks.map((task, index) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    last={index === group.tasks.length - 1}
                    onToggle={(item) => setTaskCompleted(item.id, !item.completed)}
                    onPress={(item) => openTask(item.id)}
                  />
                ))}
              </View>
            ))
          )}
        </View>
      ) : null}

      <Button
        label={t('plan.addTask')}
        icon="plus"
        onPress={() => addTask(tab === 'week' ? selectedDay : today)}
        style={{ marginTop: theme.spacing.xxl }}
      />
    </Screen>
  );
}
