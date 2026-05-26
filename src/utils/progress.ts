import { AppData, Exercise } from "../types";
import { formatDateKey, getDayName, getRecentDateKeys } from "./date";
import { resolveExerciseSlot } from "./exerciseSlot";

export function getCompletedCountForDay(
  appData: AppData,
  dateKey: string,
  exercises: Exercise[],
  slotChoice: Record<string, string> | undefined
): number {
  return exercises.filter((primary) => {
    const active = resolveExerciseSlot(primary, slotChoice);
    return appData.completedExercises[`${dateKey}_${active.id}`];
  }).length;
}

export function getCompletedWorkoutDates(appData: AppData): string[] {
  const dates = new Set<string>();

  Object.entries(appData.completedExercises).forEach(([key, completed]) => {
    if (!completed) return;
    dates.add(key.split("_")[0]);
  });

  return Array.from(dates).sort();
}

export function getWorkoutStreak(appData: AppData): number {
  const completedDateSet = new Set(getCompletedWorkoutDates(appData));

  if (completedDateSet.size === 0) {
    return 0;
  }

  let cursor = new Date();
  let streak = 0;
  let sawCompletedDay = false;

  for (let index = 0; index < 45; index += 1) {
    const dateKey = formatDateKey(cursor);
    const dayName = getDayName(cursor);

    if (dayName === "Sunday") {
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    if (completedDateSet.has(dateKey)) {
      streak += 1;
      sawCompletedDay = true;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    if (!sawCompletedDay) {
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    break;
  }

  return streak;
}

export function getWeeklyCompletionBars(appData: AppData) {
  return getRecentDateKeys(7).map((dateKey) => {
    let completed = 0;

    Object.entries(appData.completedExercises).forEach(([key, value]) => {
      if (value && key.startsWith(dateKey)) {
        completed += 1;
      }
    });

    return {
      label: new Date(`${dateKey}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      value: completed,
    };
  });
}

export function getStrengthSummary(appData: AppData, exerciseIds: string[]) {
  return exerciseIds.map((exerciseId) => {
    const history = appData.exerciseHistory[exerciseId] ?? [];
    const personalBest = history.reduce((best, item) => Math.max(best, item.weightKg), 0);
    const startingWeight = history[0]?.weightKg ?? 0;

    return {
      exerciseId,
      personalBest,
      improvement: Math.max(personalBest - startingWeight, 0),
    };
  });
}
